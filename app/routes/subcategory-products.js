import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
		return RSVP.hash({
            categories: this.get('store').findAll('category').then(results => results.sortBy('name')),
			manufacturers: this.get('store').findAll('manufacturer').then(results => results.sortBy('name')),
            extras: this.get('store').findAll('extra'),
            subcategory: this.get('store').findRecord('subcategory', params.id),
            products: this.get('store').findAll('product')
        })
    }
});
