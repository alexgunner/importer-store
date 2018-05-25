import Component from '@ember/component';
import Ember from "ember";
//import {inject as service} from '@ember/service';

export default Component.extend({
    store: Ember.inject.service(),
    
    actions: {

		addToCart(product) {
			var item = this.get('store').createRecord('item', {
			product_id: product.id,
        	quantity: 1
		});
            item.save()
            //console.log("save")
			//this.transitionTo('/');
		}
	}
});
