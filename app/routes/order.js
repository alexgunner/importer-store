import Route from '@ember/routing/route';
import RSVP from 'rsvp';
const { service } = Ember.inject;
var ido;
export default Route.extend({
    session: service('session'),
    model() {
       return RSVP.hash({
         host: this.get('store').adapterFor('application').get('host'),
         deliveries: this.get('store').findAll('delivery'),
         destinations: this.get('store').findAll('destination').then(results => results.sortBy('name')),
         items: this.get('store').findAll('item')
        })
     },
     actions: {
      selected()
      {
        var opt = document.querySelector("#opcion");
        console.log(opt.value);
         if(opt.value=="Domicilio"){
             $('#dest').show();
             $('#deliv').show();
         }
         else{
           $('#dest').hide();
           $('#deliv').hide();
         }       
      },

      loadDeliveries(){
        var store = this.get('store');
        var dest = document.querySelector('#destinos');
        //find destination
        store.findRecord('destination', dest.value).then(function(destination){
        $('#deliveries').empty();
        //show deliveries of destination
        destination.get('deliveries').forEach(function(delivery){
            $('#deliveries').append('<option value="'+delivery.get('id')+'">'+delivery.get('name')+' '+'Costo:'+delivery.get('cost')+'</option>');
        });
    });
      },
      save() {

        //initialize values
        var store = this.get('store');
        let items = this.get('store').findAll('item');
        var pay = document.querySelector('#pagos');
        var delivery = document.querySelector('#opcion')
        var select = document.querySelector("#deliveries");

        //create client with values from form 
        const client = this.get('store').createRecord('client', this.currentModel);
       
        //check if values are correct
        if (client.get('name') == null || client.get('ci') == null || client.get('address') == null
            || client.get('phone') == null || client.get('mail') == null ||
            client.get('nameinvoice') == null || client.get('nit') == null || client.get('cellphone') == null
          || client.get('cellwsp') == null)
        { 
          swal({
            title: "¡Error!",
            text: "Por favor completa todos los datos.",
            type: "error"
          })
        }
      else
      {
        client.save().then(function(record){
          console.log("guardo cliente");
          //create order
          var order = store.createRecord('order', {
              orderdate: new Date(),
              state: "Nuevo",
              client_id: record.id,
              delivery_id: select.value,
              typepay: pay.value,
              typedelivery: delivery.value
          });
          order.save().then(function(record){
              console.log("guardo orden");
              //create cart with items
              items.forEach(function(item){
                  console.log("item");
                  var cart = store.createRecord('cart', {
                      quantity: item.get('quantity'),
                      order_id: record.id,
                      product_variant_id: item.get('variant_id'),
                      role: item.get('role')
                  });
                  cart.save().then(function(){
                    //calculate total
                    Ember.$.ajax({
                        url: "http://localhost:3000/total",
                        type: "POST",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: record.id
                            })
                    });
                      ido = record.id;
                  }).then(function(){
                      window.location.href = '/pay/'+ ido;
                  });
            });
          }); 
      });
    }
      console.log("guardo todo");
    },
      cancel() {
        this.transitionTo('/');
      }
  }
});
