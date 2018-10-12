import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
		return RSVP.hash({
			categories: this.get('store').findAll('category'),
			manufacturers: this.get('store').findAll('manufacturer'),
            extras: this.get('store').findAll('extra'),
            products: this.get('store').findAll('product')
		}); 
	},
	
});
