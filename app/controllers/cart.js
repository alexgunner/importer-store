import Ember from 'ember';

export default Ember.Controller.extend({
    suma: Ember.computed(function(){
      var variants = this.get('model.product_variants');
      var total = 0;
      this.get('model.items').forEach(function(item){
        variants.forEach(function(variant){
          if(variant.get('id') == item.get('variant_id')){
            total += (variant.get('price')*(item).get('quantity'));
          }
        });
      }); 
      return total.toFixed(2);
      }),
  actions: {
    addQuantity(item, variant) {
      //updating the quantity
      if (item.incrementProperty('quantity') >= 0){
        item.save();

        //updating the total
        var total = this.get('suma');
        total = parseFloat(total);
        this.set('suma', (total + variant.get('price')).toFixed(2));
      }
    },

    restQuantity(item, variant){
      //updating the quantity
      if (item.decrementProperty('quantity') >= 0){
        item.save();

        //updating the total
        var total = this.get('suma');
        total = parseFloat(total);
        this.set('suma', (total - variant.get('price')).toFixed(2));

      }
    },

    deleteToCart(item, variant){
      item.deleteRecord();
      item.save();

      //updating the total
      var total = this.get('suma');
      total = parseFloat(total);
      this.set('suma', (total - (variant.get('price')) * item.get('quantity')).toFixed(2));

    },

    updateQuantity(item, quantity){
      this.set(item.get('quantity'),quantity);
      item.save();

      //recalculate the total
      var variants = this.get('model.product_variants');
      var total = 0;
      this.get('model.items').forEach(function(item){
        variants.forEach(function(variant){
          if(variant.get('id') == item.get('variant_id')){
            total += (variant.get('price')*(item).get('quantity'));
          }
        });
      }); 

      //updating the total
      total = parseFloat(total);
      this.set('suma', total);
    }

  }
})