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
        
      },

      showModal(){
        swal({ 
          html:true,
          title: "Instructivo de registro",
          text: "<h3 align='justify'>La información que ingresaras es confidencial, será utilizada para identificarte como Cliente DOMUS, hacer llegar tus compras al domicilio que definas y contar con la información necesaria para emitir la Factura Fiscal correspondiente." +
          "<br/><br/>Muchas gracias por tu confianza.",
          type: "warning",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "¡Entendido!",
          closeOnConfirm: false })
        this.transitionTo('register');
      }
    }
});

