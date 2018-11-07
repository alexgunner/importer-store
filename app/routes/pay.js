import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params){
    return RSVP.hash({
        product_variants: this.get('store').findAll('product_variant'),
        items: this.get('store').findAll('item'),
        order: this.get('store').findRecord('order', params.id),
        host: this.get('store').adapterFor('application').get('host')
      }); 
    },
    actions: {
        clearCart(items, host, id){
            
        swal({
            title: "¡Hecho!",
            text: "Espera un momento. Te estamos redirigiendo a la terminal de pago con tarjeta.",
            type: "success",
            confirmButtonText: "OK",
            timer:3000
            },
            function(isConfirm){
            if (isConfirm) {
                window.location.href = host + '/pay/'+ id;
            }
        });
        items.forEach(function(item){
            item.deleteRecord();
            item.save();
        })
        }
        
    }
});
