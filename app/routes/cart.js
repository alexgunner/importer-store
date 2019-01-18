import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
    model() { 
      return RSVP.hash({
        product_variants: this.get('store').findAll('product_variant'),
        items: this.get('store').findAll('item')
      }); 
    },
    
    actions: {
      deleteAll(items){
        items.forEach(function(item){
          item.deleteRecord();
          item.save();
        })
      },

      changeBorder(){
        $(function() {
          $(".border-panel > div").click(function() {
          //Busca todos los elementos del Div asociado a la clase select que tengan la clase active y los elimina
        $(this).closest('.border-panel').find('div').removeClass('active-panel');
        //Al elemento seleccionado agrega la clase active
                $(this).addClass('active-panel');
            });
        });
    
      }
    }
});
