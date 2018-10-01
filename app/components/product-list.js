import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
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
