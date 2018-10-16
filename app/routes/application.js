import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
	
	model() {
		return RSVP.hash({
			items: this.get('store').findAll('item'),
			contact: this.get('store').findAll('contact'),
			extras: this.get('store').findAll('extra')
		});
	}
});