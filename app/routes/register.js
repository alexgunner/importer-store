import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
          host: this.get('store').adapterFor('application').get('host')
         })
      },
     actions: {
         save() {
           const user = this.get('store').createRecord('user', this.currentModel);
           user.save().
           console.log("guardo usuario");
           this.transitionTo('/');
         },
         cancel() {
           this.transitionTo('/');
         }
     }
});
