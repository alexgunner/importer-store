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
    form_city: Ember.computed(function(){
        return this.get('session.data.authenticated.city');
    }),

    actions: {

    loadSends(){
        var store = this.get('store');
        var destino = document.querySelector('#destinos');
        store.findRecord('destination', destino.value).then(function(destination){
            $("#entrega option[value='Tienda']").remove();
            $("#pagos option[value='Contraentrega']").remove();
            console.log(destination.get('cash'));
            if(destination.get('cash')){
                $('#entrega').append('<option value="Tienda">Para recoger en tienda o sucursal</option>');
                $('#pagos').append('<option value="Contraentrega">Al momento de la entrega</option>');
            }  
        })
    },

    selected()
    {
        var entrega = document.querySelector('#entrega');
        var store = this.get('store');
        var dest = document.querySelector('#destinos');
        if(entrega.value=="Tienda"){
            //$('#tien').show();
            $('#deliv').hide();
            $("#mensaje").show();
        }
        
        if(entrega.value != "Tienda"){
            $("#mensaje").hide();
            $('#deliv').show();
             //find destination
            store.findRecord('destination', dest.value).then(function(destination){
                $('#deliveries').empty();
                //show deliveries of destination
                $('#deliveries').append('<option value="0">Elige un delivery</option>');
                destination.get('deliveries').forEach(function(delivery){
                    if(delivery.get('shipping') == entrega.value){
                        $('#deliveries').append('<option value="'+delivery.get('id')+'">'+delivery.get('name')+' // '+'Costo mínimo:'+delivery.get('costmin')+' Bs.'+'Costo por (kg) o distancia:'+delivery.get('cost')+' Bs.'+'</option>');
                    }
                });
            });  
        }  
    },

    save()
    {
        //initialize values 
        var store = this.get('store');
        let items = this.get('store').findAll('item');
        var pay = document.querySelector('#pagos');
        var destino = document.querySelector('#destinos');
        var delivery = document.querySelector('#entrega');
        var select = document.querySelector("#deliveries");
        var tienda = document.querySelector('#tiendas');
        var id = this.get('session.data.authenticated.id');
        
        if(destino.value == "0" || delivery.value == "0" || pay.value == "0"){
            swal({
                title: "Por favor elige tu destino, entrega y forma de pago.",
                type: "error",
                confirmButtonText: "Entendido",
                showConfirmButton : true,
                cancelButtonText: "¿Eres nuevo?",
                },
                function(isConfirm){
                    if (isConfirm) {
                        window.location.href = '/order';
                    }
            });
        }else{
            //recover values for create client
            document.getElementById("save-button").disabled = true
            const client = store.createRecord('client', {
            name: document.getElementById('new_name').value,
            ci: document.getElementById('new_ci').value,
            address: document.getElementById('new_address').value,
            phone: document.getElementById('new_phone').value,
            cellphone: document.getElementById('new_cellphone').value,
            cellwsp:document.getElementById('new_cellwsp').value,
            mail: this.get('session.data.authenticated.email'),
            nit: document.getElementById('new_nit').value,
            nameinvoice: document.getElementById('new_nameinvoice').value,
            role: this.get('session.data.authenticated.role')
            })
            client.save().then(function(record){
                console.log("cliente guardado");
                //create order
                var order = store.createRecord('order', {
                    orderdate: new Date(),
                    state: "Nuevo",
                    client_id: record.id,
                    delivery_id: select.value,
                    typepay: pay.value,
                    typedelivery: delivery.value,
                    office: tienda.value
                })
                order.save().then(function(record){
                    console.log("orden guardada");
                    items.forEach(function(item){
                        //create cart with items
                        var cart = store.createRecord('cart', {
                            quantity: item.get('quantity'),
                            order_id: record.id,
                            product_variant_id: item.get('variant_id'),
                            role: item.get('role')
                        })
                        cart.save().then(function(){
                            item.deleteRecord();
                            item.save();
                            ido = record.id
                            console.log(ido);
                            Ember.$.ajax({
                                url: "http://api.domusbolivia.com/total",
                                type: "POST",
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    id: record.id
                                })
                            
                            });
                        })
                            
                    }).then(function(){
                        window.location.href = '/pay/'+ido;
                    });
                });
            });
            
        }
       
        },

        cancel() {
            this.get('router').transitionTo('/');
        }
    }
});
