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
    }
    
});
