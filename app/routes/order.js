import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
       return RSVP.hash({
         host: this.get('store').adapterFor('application').get('host')
        })
     },
    actions: {
        save() {
          var items = this.get('store').findAll('item');
          const newOrder = this.get('store').createRecord('order', this.currentModel);

          newOrder.save().then(function(record){
            items.forEach(function(item){
              var cart_item = this.get('store').createRecord('cart', {
                quantity: item.quantity,
                order_id: record.id,
                product_id: item.product_id
              });
              console.log("lo crea?")
              cart_item.save();
            });
          });
          //this.transitionTo('/pay');
        },
        cancel() {
          this.transitionTo('/');
        }
    }
});
