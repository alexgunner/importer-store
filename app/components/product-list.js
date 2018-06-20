import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
    store: Ember.inject.service(),
    
    actions: {

		addToCart(product) {
			var item = this.get('store').createRecord('item', {
			product_id: product.id,
			quantity: 1
			});
            item.save();
			this.get('router').transitionTo('/cart');
		}
	}
});
