import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
		return RSVP.hash({
            products: this.get('store').findAll('product'),
            categories: this.get('store').findAll('category'),
			manufacturers: this.get('store').findAll('manufacturer'),
			subcategory: this.get('store').findRecord('subcategory', params.id),
			host: this.get('store').adapterFor('application').get('host'),
		}); 
    },
    
    afterModel: function(model){
		return RSVP.hash({
			subcategories: model.categories.getEach('subcategories'),
			//products: model.subcategory.products
		});
	}
});
