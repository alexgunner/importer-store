import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
    model() {
		return RSVP.hash({
            offices: this.get('store').findAll('office').then(results => results.sortBy('name')),
            categories: this.get('store').findAll('category').then(results => results.sortBy('name')),
			manufacturers: this.get('store').findAll('manufacturer').then(results => results.sortBy('name')),
            extras: this.get('store').findAll('extra')
		}); 
	}
});
