import Component from '@ember/component';
var ido;
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
        sleep: function (milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
              if ((new Date().getTime() - start) > milliseconds){
                break;
              }
            }
        },
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
    save()
    {
        //initialize values 
        document.getElementById("save-button").disabled = true
        var store = this.get('store');
        let items = this.get('store').findAll('item');
        var pay = document.querySelector('#pagos');
        var delivery = document.querySelector('#opcion')
        var select = document.querySelector("#deliveries");

       
        //recover values for create client
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
            client.save().then(function(record){
                //create order
                var order = store.createRecord('order', {
                    orderdate: new Date(),
                    state: "Nuevo",
                    client_id: record.id,
                    delivery_id: select.value,
                    typepay: pay.value,
                    typedelivery: delivery.value
                })
                order.save().then(function(record){
                    items.forEach(function(item){
                        //create cart with items
                        var cart = store.createRecord('cart', {
                            quantity: item.get('quantity'),
                            order_id: record.id,
                            product_variant_id: item.get('variant_id'),
                            role: item.get('role')
                        })
                        cart.save();
                        ido = record.id;
                    });
                }).then(function(){
                    //calculate total
                    Ember.$.ajax({
                        url: "http://localhost:3000/total",
                        type: "POST",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: ido
                            })
                    }).then(function(){
                        window.location.href = '/pay/'+ record.id;
                    });
                });
            }); 
        },

        cancel() {
            this.get('router').transitionTo('/');
        }
    }
});
