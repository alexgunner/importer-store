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
         items: this.get('store').findAll('item')
        })
     },
     actions: {
      selected()
      {
        var opt = document.querySelector("#opcion");
        console.log(opt.value);
         if(opt.value=="Domicilio"){
             $('#deliv').show();
         }
         else{
           $('#deliv').hide();
         }
      },
      save() {
        var store = this.get('store');
        let items = this.get('store').findAll('item');
        var pay = document.querySelector('#pagos');
        var delivery = document.querySelector('#opcion')
        var select = document.querySelector("#deliveries");
        if(this.get('session.isAuthenticated'))
        {
          const client = store.createRecord('client', {
            name: this.get('session.data.authenticated.name'),
            lastname: this.get('session.data.authenticated.lastname'),
            nit: this.get('session.data.authenticated.nit'),
            address: this.get('session.data.authenticated.address'),
            phone: this.get('session.data.authenticated.phone'),
            mail: this.get('session.data.authenticated.email')
            })
            console.log("entro al action");
            client.save().then(function(record){
              console.log("hizo el save");
              var order = store.createRecord('order', {
                orderdate: new Date(),
                client_id: record.id,
                delivery_id: select.value,
                typepay: pay.value,
                typedelivery: delivery.value
              });
              console.log("crea cliente");
                order.save().then(function(record){
                  items.forEach(function(item){
                    var cart = store.createRecord('cart', {
                      quantity: item.get('quantity'),
                      order_id: record.id,
                      product_variant_id: item.get('variant_id'),
                      role: item.get('role')
                    });
                    console.log("creo todo");
                    cart.save();
                  });
                id = record.id
                console.log(id);
              });
             
              });
              swal({
                title: "¡Hecho!",
                text: "Tu orden fue registrada, por continua a proceder con el pago.",
                type: "success",
                confirmButtonText: "OK"
              },
              function(isConfirm){
                if (isConfirm) {
                  window.location.href = '/pay/'+ id;
                }
              });
        }
      else{
        const client = this.get('store').createRecord('client', this.currentModel);
        if (client.get('name') == null || client.get('lastname') == null
      || client.get('nit') == null || client.get('address') == null
    || client.get('phone') == null || client.get('mail') == null)
      { 
        swal({
          title: "¡Error!",
          text: "Por favor completa todos los datos.",
          type: "error"
        })
      }
      else
      {
        console.log("entro al action");
        client.save().then(function(record){
          console.log("hizo el save");
          var order = store.createRecord('order', {
            orderdate: new Date(),
            client_id: record.id,
            delivery_id: select.value,
            typepay: pay.value,
            typedelivery: delivery.value
          });
          console.log("crea cliente");
            order.save().then(function(record){
              items.forEach(function(item){
                var cart = store.createRecord('cart', {
                  quantity: item.get('quantity'),
                  order_id: record.id,
                  product_variant_id: item.get('variant_id'),
                  role: item.get('role')
                });
                console.log("creo todo");
                cart.save();
              });
            id = record.id
            console.log(id);
          });
         
          });
          swal({
            title: "¡Hecho!",
            text: "Tu orden fue registrada, por continua a proceder con el pago.",
            type: "success",
            confirmButtonText: "OK"
          },
          function(isConfirm){
            if (isConfirm) {
              window.location.href = '/pay/'+ id;
            }
          });
        
        
      }
        
      }
        
      },
      cancel() {
        this.transitionTo('/');
      }
  }
});
