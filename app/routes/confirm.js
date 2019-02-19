import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
    model(params) {
        return RSVP.hash({
          host: this.get('store').adapterFor('application').get('host'),
          deliveries: this.get('store').findAll('delivery'),
          destinations: this.get('store').findAll('destination').then(results => results.sortBy('name')),
          offices: this.get('store').findAll('office'),
          order: this.get('store').findRecord('order', params.id)
         })
      }
});
