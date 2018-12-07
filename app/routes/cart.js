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
      deleteAll(items){
        items.forEach(function(item){
          item.deleteRecord();
          item.save();
        })
      }
    }
});
