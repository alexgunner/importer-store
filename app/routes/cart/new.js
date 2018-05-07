import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
          orders: this.get('store').findAll('order'),
          host: this.get('store').adapterFor('application').get('host'),
        }); 
    },
      actions: {
        save() {
          const newCart = this.get('store').createRecord('cart', this.currentModel);
          newCart.save()
        },
        cancel() {
          this.transitionTo('/');
        }
      },
});