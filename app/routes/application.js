import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
	model() {
		return RSVP.hash({
			items: this.get('store').findAll('item'),
			contact: this.get('store').findAll('contact'),
			extras: this.get('store').findAll('extra')
		});
	}
});