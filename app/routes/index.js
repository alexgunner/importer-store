import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
	model() {
		return RSVP.hash({
			categories: this.get('store').findAll('category').then(results => results.sortBy('name')),
			manufacturers: this.get('store').findAll('manufacturer').then(results => results.sortBy('name')),
			products: this.get('store').findAll('product'),
			extras: this.get('store').findAll('extra'),
			contact: this.get('store').findAll('contact'),
			variants: this.get('store').findAll('product_variant'),
			host: this.get('store').adapterFor('application').get('host'),
		}); 
	},
	afterModel: function(model){
		return RSVP.hash({
			subcategories: model.categories.getEach('subcategories'),
		});
	}

});
