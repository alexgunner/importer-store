import Component from '@ember/component';
const { service } = Ember.inject;
export default Component.extend({
	session: service('session'),
	store: Ember.inject.service(),
	actions: {
		addToCart(variant, role_user) {
			var item = this.get('store').createRecord('item', {
			variant_id: variant.id,
			quantity: 1,
			role: role_user
			});
            item.save();
			this.get('router').transitionTo('/cart');
		}
	}
});
