import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(){
        return RSVP.hash({
            categories: this.get('store').findAll('category'),
			manufacturers: this.get('store').findAll('manufacturer'),
			host: this.get('store').adapterFor('application').get('host'),
            contact: this.get('store').findAll('contact'),
            training: this.get('store').findAll('training'),
        }); 
    }
});
