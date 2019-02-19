import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
    model() {
       return RSVP.hash({
         host: this.get('store').adapterFor('application').get('host')
        })
     }
});
