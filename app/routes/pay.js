import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(){
    return RSVP.hash({
        products: this.get('store').findAll('product'),
        items: this.get('store').findAll('item'),
        orders: this.get('store').findAll('order')
      }); 
    }
    
});