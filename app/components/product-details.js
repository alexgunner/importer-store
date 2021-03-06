import Component from '@ember/component';
const { service } = Ember.inject;
export default Component.extend({
	session: service('session'),
	store: Ember.inject.service(),
	actions: {
		addToCart(variant, role_user, items) {
			var state = false;
			if (role_user != null){
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
						quantity: 1,
						role: role_user
					});
				item.save();
				this.get('router').transitionTo('/cart');
				}
				
			}else{
				swal({
					title: "Para añadir productos al carrito, primero debes iniciar sesión o registrarte si eres nuevo.",
					type: "warning",
					confirmButtonText: "Iniciar sesión",
					showCancelButton    : true,
					showConfirmButton : true,
					cancelButtonText: "¿Eres nuevo?",
					},
					function(isConfirm){
						if (isConfirm) {
							window.location.href = '/login';
						}else{
							window.location.href = '/register';
						}
				});
			}
			
			
		}
  }
});
