import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() { 
      return RSVP.hash({
        products: this.get('store').findAll('product'),
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
    }
});
