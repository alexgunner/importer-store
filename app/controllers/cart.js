import Ember from 'ember';

export default Ember.Controller.extend({
    suma: Ember.computed(function(){
      var variants = this.get('model.product_variants');
      var total = 0;
      this.get('model.items').forEach(function(item){
        variants.forEach(function(variant){
          if(variant.get('id') == item.get('variant_id')){
            if(item.get('role') == "Minorista " || item.get('role') == null)
            {
              if(variant.get('offerprice') == null)
              {
                total += (variant.get('price')*(item).get('quantity'));
              }
              else
              {
                total += (variant.get('offerprice')*(item).get('quantity'));
              }
            }
            else
            {
              if(item.get('role') == "Mayorista ")
              {
                total += (variant.get('wholesaleprice')*(item).get('quantity'));
              }
              if(item.get('role') == "Especialista ")
              {
                total += (variant.get('specialistprice')*(item).get('quantity'));
              }
              if(item.get('role') == "Distribuidor ")
              {
                total += (variant.get('importerprice')*(item).get('quantity'));
              }
            }
            
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
        if(item.get('role') == "Minorista " || item.get('role') == null)
        {
          if(variant.get('offerprice') == null)
          {
            this.set('suma', (total + variant.get('price')).toFixed(2));
          }
          else
          {
            this.set('suma', (total + variant.get('offerprice')).toFixed(2));
          }
        }
        else
        {
          if(item.get('role') == "Mayorista ")
          {
            this.set('suma', (total + variant.get('wholesaleprice')).toFixed(2));
          }
          if(item.get('role') == "Especialista ")
          {
            this.set('suma', (total + variant.get('specialistprice')).toFixed(2));
          }
          if(item.get('role') == "Distribuidor ")
          {
            this.set('suma', (total + variant.get('importerprice')).toFixed(2));
          }
        }
      }
    },

    restQuantity(item, variant){
      //updating the quantity
      if (item.decrementProperty('quantity') >= 0){
        item.save();

        //updating the total
        var total = this.get('suma');
        total = parseFloat(total);
        if(item.get('role') == "Minorista " || item.get('role') == null)
        {
          if(variant.get('offerprice') == null)
          {
            this.set('suma', (total - variant.get('price')).toFixed(2));
          }
          else
          {
            this.set('suma', (total - variant.get('offerprice')).toFixed(2));
          }
        }
        else
        {
          if(item.get('role') == "Mayorista ")
          {
            this.set('suma', (total - variant.get('wholesaleprice')).toFixed(2));
          }
          if(item.get('role') == "Especialista ")
          {
            this.set('suma', (total - variant.get('specialistprice')).toFixed(2));
          }
          if(item.get('role') == "Distribuidor ")
          {
            this.set('suma', (total - variant.get('importerprice')).toFixed(2));
          }
        }
      }
    },

    deleteToCart(item, variant){
      item.deleteRecord();
      item.save();

      //updating the total
      var total = this.get('suma');
      total = parseFloat(total);
      if(item.get('role') == "Minorista " || item.get('role') == null)
      {
        if(variant.get('offerprice') == null)
        {
          this.set('suma', (total - variant.get('price')* item.get('quantity')).toFixed(2));
        }
        else
        {
          this.set('suma', (total - variant.get('offerprice') * item.get('quantity')).toFixed(2));
        }
      }
      else
      {
        if(item.get('role') == "Mayorista ")
        {
          this.set('suma', (total - variant.get('wholesaleprice')* item.get('quantity')).toFixed(2));
        }
        if(item.get('role') == "Especialista ")
        {
          this.set('suma', (total - variant.get('specialistprice')* item.get('quantity')).toFixed(2));
        }
        if(item.get('role') == "Distribuidor ")
        {
          this.set('suma', (total - variant.get('importerprice')* item.get('quantity')).toFixed(2));
        }
      }
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
            if(item.get('role') == "Minorista " || item.get('role') == null)
            {
              if(variant.get('offerprice') == null)
              {
                total += (variant.get('price')*(item).get('quantity'));
              }
              else
              {
                total += (variant.get('offerprice')*(item).get('quantity'));
              }
            }
            else
            {
              if(item.get('role') == "Mayorista ")
              {
                total += (variant.get('wholesaleprice')*(item).get('quantity'));
              }
              if(item.get('role') == "Especialista ")
              {
                total += (variant.get('specialistprice')*(item).get('quantity'));
              }
              if(item.get('role') == "Distribuidor ")
              {
                total += (variant.get('importerprice')*(item).get('quantity'));
              }
            }
            
          }
        });
      }); 

      //updating the total
      total = parseFloat(total);
      this.set('suma', total);
    }

  }
})