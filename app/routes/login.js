import Route from '@ember/routing/route';
import swal from 'sweetalert';
const { service } = Ember.inject;
export default Route.extend({
    session: service('session'),

    actions: {
      authenticate () {
        var identification = this.get('controller').get('identification');
        var password = this.get('controller').get('password');
        return this.get('session').authenticate('authenticator:devise',
         identification, password).catch(
             (reason) => {
                swal("Revisa tu correo o contraseña, por favor.")
        });
        
      }
    }
});

