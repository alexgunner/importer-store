import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
          carts: this.get('store').findAll('cart'),
          host: this.get('store').adapterFor('application').get('host'),
        }); 
    },
});
