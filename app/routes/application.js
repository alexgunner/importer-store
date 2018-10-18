import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { service } = Ember.inject;

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service('current-user'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  },
	model() {
		return RSVP.hash({
			items: this.get('store').findAll('item'),
			contact: this.get('store').findAll('contact'),
			extras: this.get('store').findAll('extra')
		});
	}
});