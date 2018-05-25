import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) { 
        return RSVP.hash({
          product: this.get('store').findRecord('product', params.id),
          host: this.get('store').adapterFor('application').get('host'),
        }); 
    },
      actions: {
        save() {
          const newCart = this.get('store').createRecord('cart', this.currentModel);
          newCart.save().then(() => {
            this.transitionTo('/');
        });
        },
        cancel() {
          this.transitionTo('/');
        }
      },
});
