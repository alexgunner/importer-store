import Route from '@ember/routing/route';
import RSVP from 'rsvp';
const { service } = Ember.inject;
var id;
export default Route.extend({
    session: service('session'),
    model() {
       return RSVP.hash({
         host: this.get('store').adapterFor('application').get('host'),
         deliveries: this.get('store').findAll('delivery'),
         destinations: this.get('store').findAll('destination'),
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
        store.query('delivery', {
          filter: {
            destination_id: dest.value
          }
        }).then(function(deliveries) {
          deliveries.forEach(function(delivery){
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
        console.log("guardo el cliente");
        client.save().then(function(record){

           //create order
           var order = store.createRecord('order', {
            orderdate: new Date(),
            state: "Nuevo",
            client_id: record.id,
            delivery_id: select.value,
            typepay: pay.value,
            typedelivery: delivery.value
          });
          console.log("guardo orden");
          order.save().then(function(record){
          
          //create cart with items
          items.forEach(function(item){
            var cart = store.createRecord('cart', {
              quantity: item.get('quantity'),
              order_id: record.id,
              product_variant_id: item.get('variant_id'),
              role: item.get('role')
            });
            console.log("guardo todo");
            cart.save().then(function(){
              Ember.$.ajax({
                  url: "http://localhost:3000/total",
                  type: "POST",
                  contentType: 'application/json',
                  data: JSON.stringify({
                      id: record.id
                  })
              });
            });
          });
            id = record.id
            console.log(id);
          });
         
          });
          swal({
            title: "¡Hecho!",
            text: "Tu orden fue registrada, por favor espera mientras te reedigirimos para proceder con el pago.",
            type: "success",
            timer: 8000,
            showConfirmButton: false
          }, function() {
            window.location.href = '/pay/'+ id;
          }); 
        
      }
        
      },
      cancel() {
        this.transitionTo('/');
      }
  }
});
