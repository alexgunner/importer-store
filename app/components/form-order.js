import Component from '@ember/component';
var id;
const { service } = Ember.inject;
export default Component.extend({
    store: Ember.inject.service(),
    session: service('session'),

    form_name: Ember.computed(function(){
        return this.get('session.data.authenticated.name');
    }),
    form_ci: Ember.computed(function(){
        return this.get('session.data.authenticated.ci');
    }),
    form_address: Ember.computed(function(){
        return this.get('session.data.authenticated.address');
    }),
    form_phone: Ember.computed(function(){
        return this.get('session.data.authenticated.phone');
    }),
    form_cellphone: Ember.computed(function(){
        return this.get('session.data.authenticated.cellphone');
    }),
    form_cellwsp: Ember.computed(function(){
        return this.get('session.data.authenticated.cellwsp');
    }),
    form_nameinvoice: Ember.computed(function(){
        return this.get('session.data.authenticated.nameinvoice');
    }),
    form_nit: Ember.computed(function(){
        return this.get('session.data.authenticated.nit');
    }),

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
        save()
        {
            var store = this.get('store');
            let items = this.get('store').findAll('item');
            var pay = document.querySelector('#pagos');
            var delivery = document.querySelector('#opcion')
            var select = document.querySelector("#deliveries");

            //recover values
            const client = store.createRecord('client', {
                name: document.getElementById('new_name').value,
                ci: document.getElementById('new_ci').value,
                address: document.getElementById('new_address').value,
                phone: document.getElementById('new_phone').value,
                cellphone: document.getElementById('new_cellphone').value,
                cellwsp:document.getElementById('new_cellwsp').value,
                mail: this.get('session.data.authenticated.email'),
                nit: document.getElementById('new_nit').value,
                nameinvoice: document.getElementById('new_nameinvoice').value
                })
            console.log("guardo cliente");
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
                        url: "http://api.domusbolivia.com/total",
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
            timer: 10000,
            showConfirmButton: false
          }, function() {
            window.location.href = '/pay/'+ id;
          });
        },

        cancel() {
            this.transitionTo('/');
        }
    }
});
