import Component from '@ember/component';
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

        save()
        {
            //initialize values 
            var store = this.get('store');
            let items = this.get('store').findAll('item');
            var id = this.get('session.data.authenticated.id');
            
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
                nameinvoice: document.getElementById('new_nameinvoice').value,
                role: this.get('session.data.authenticated.role')
            })
            console.log("aqui");
            client.save().then(function(record){
                console.log("cliente guardado");
                //create order
                var order = store.createRecord('order', {
                    orderdate: new Date(),
                    state: "Nuevo",
                    client_id: record.id,
                    userid: id
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
                            item.save().then(function(){
                                if (items.length == 0)
                                {
                                    window.location.href = '/confirm/'+record.id;
                                }
                            });
                        });            
                    })   
                });        
            });       
        },
        cancel() {
            this.get('router').transitionTo('/');
        }
    }
});
