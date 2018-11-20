import Component from '@ember/component';
export default Component.extend({
    store: Ember.inject.service(),
    actions: {
		addToCart(variant, items) {
			var state = false;
			console.log(items.length);
			items.forEach(function(item){
				if (variant.id == item.get('variant_id')){
					state = true;
					swal({
						title: "Ya lo tienes en carrito",
						type: "warning",
						confirmButtonText: "Ir a Carrito",
						showCancelButton    : true,
						cancelButtonText: "Cerrar"
					  },
					  function(isConfirm){
						if (isConfirm) {
						  window.location.href = '/cart';
						}
					  });
				}
			});
			if (state == false){
				var item = this.get('store').createRecord('item', {
				variant_id: variant.id,
				quantity: 1
				});
            item.save();
			this.get('router').transitionTo('/cart');
			}
		}
	}
});
