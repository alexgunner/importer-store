import Component from '@ember/component';
const { service } = Ember.inject;
export default Component.extend({
	session: service('session'),
	store: Ember.inject.service(),
	actions: {
		addToCart(variant) {
			var item = this.get('store').createRecord('item', {
			variant_id: variant.id,
			quantity: 1
			});
            item.save();
			this.get('router').transitionTo('/cart');
		}
	}
});
