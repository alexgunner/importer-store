import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() { 
      return RSVP.hash({
        product_variants: this.get('store').findAll('product_variant'),
        items: this.get('store').findAll('item')
      }); 
    },

    actions: {
      addQuantity(item){
        item.incrementProperty('quantity');
        item.save();
      },

      restQuantity(item){
        item.decrementProperty('quantity');
        item.save();
      },

      deleteToCart(item){
        item.deleteRecord();
        item.save();
      },

      deleteAll(items){
        items.forEach(function(item){
          item.deleteRecord();
          item.save();
        })
      },
      updateQuantity(item, quantity){
        this.set(item.get('quantity'),quantity);
        item.save();
      }
    }
});
