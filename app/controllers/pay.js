import Ember from 'ember';

export default Ember.Controller.extend({
    suma: Ember.computed(function(){
        var order = this.get('model.order');
        var items = this.get('store').findAll('item');
        var total = 0;
        items.forEach(function(item){
            console.log(item.get('quantity'));
        })
        
        order.get('carts').forEach(function(cart){
            //console.log(cart.product_variant_id);
           console.log(cart.quantity);
            if(cart.get('role')== "Minorista" || cart.get('role') == null)
            {
        
              if(cart.get('product_variant').get('offerprice') == null)
              {
                total += (cart.get('product_variant').get('price'));
              }
              else
              {
                total += (cart.get('offerprice')*cart.quantity);
              }
            }
            console.log(total);
          
        })
        return total.toFixed(2);
    })
})