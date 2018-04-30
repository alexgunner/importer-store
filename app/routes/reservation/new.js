import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
        //return {};
        host: this.get('store').adapterFor('application').get('host')
        })
      },
      actions: {
        save() {
          const newReservation = this.get('store').createRecord('reservation', this.currentModel);
          newReservation.save().then((reservation) => {
            this.transitionTo('reservation', reservation);
          });
        },
        cancel() {
          this.transitionTo('reservations');
        }
      }
});
