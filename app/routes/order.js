import Route from '@ember/routing/route';
import RSVP from 'rsvp';
var id;
export default Route.extend({
    model() {
       return RSVP.hash({
         host: this.get('store').adapterFor('application').get('host'),
         deliveries: this.get('store').findAll('delivery'),
        })
     },
    actions: {
        save() {
          var store = this.get('store');
          let items = this.get('store').findAll('item');
          var select = document.querySelector("#deliveries");
          var valor = select.value;
          console.log(valor);

          const client = this.get('store').createRecord('client', this.currentModel);
          console.log("entro al action");
          client.save().then(function(record){
            console.log("hizo el save");
            var order = store.createRecord('order', {
              orderdate: new Date(),
              client_id: record.id,
              delivery_id: valor
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
         
        },
        cancel() {
          this.transitionTo('/');
        },
        ok(){
          this.transitionTo('/pay/'+ id);
        }
    }
});
