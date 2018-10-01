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
          var store = this.get('store');
          var items = this.get('store').findAll('item');
          const client = this.get('store').createRecord('client', this.currentModel);
          console.log("entro al action");
          client.save().then(function(record){
            console.log("hizo el save");
            var order = store.createRecord('order', {
              orderdate: new Date(),
              client_id: record.id,
            });
            console.log("crea cliente");
              order.save().then(function(record){
                items.forEach(function(item){
                  var cart = store.createRecord('cart', {
                    quantity: item.get('quantity'),
                    order_id: record.id,
                    product_variant_id: item.get('variant_id')
                  });
                  console.log("creo todo");
                  cart.save();
                });
            });
           
          });
          this.transitionTo('/pay');
        },
        cancel() {
          this.transitionTo('/');
        }
    }
});
