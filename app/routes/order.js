import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
    model() {
       return RSVP.hash({
         host: this.get('store').adapterFor('application').get('host'),
         deliveries: this.get('store').findAll('delivery'),
         destinations: this.get('store').findAll('destination').then(results => results.sortBy('name')),
         items: this.get('store').findAll('item'),
         offices: this.get('store').findAll('office')
        })
     }
});
