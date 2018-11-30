import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
    model(params) {
		return RSVP.hash({
			categories: this.get('store').findAll('category'),
			manufacturers: this.get('store').findAll('manufacturer'),
            extras: this.get('store').findAll('extra'),
            product: this.get('store').findRecord('product', params.id),
            product_variants: this.get('store').findAll('product_variant'),
            items: this.get('store').findAll('item'),
            measures: this.get('store').findAll('measure'),
            host: this.get('store').adapterFor('application').get('host')
        }); 
	}
});
