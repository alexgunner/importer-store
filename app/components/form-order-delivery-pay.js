import Component from '@ember/component';
const { service } = Ember.inject;
export default Component.extend({
    store: Ember.inject.service(),
    actions:{
        save(id){
            var store = this.get('store');
            var typedelivery = document.querySelector('#entregas');
            var deliveryid = document.querySelector('#deliveries');
            store.findRecord('order', id).then(function(order) {
                order.set('deliveryid', deliveryid.value);
                order.set('typepay', $('input[name="pay"]:checked').value());
                order.set('typedelivery', typedelivery.value);
                //order.set('office',);
                order.save().then(function(){
                    this.get('router').transitionTo('/pay/'+id);
                }); // => PATCH to '/orders/1'
            });
            
        },

        cancel(){
            this.get('router').transitionTo('/');
        }
    }
});
