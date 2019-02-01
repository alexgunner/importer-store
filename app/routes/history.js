import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
		return RSVP.hash({
			orders: this.get('store').findAll('order'),
			product_variants: this.get('store').findAll('product_variant')
		}); 
	}
});
