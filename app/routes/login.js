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
          text: "<h3 align='justify'>Estas a punto de crear una cuenta en nuestro portal, por favor toma en cuenta las siguientes indicaciones para que ingreses los datos según el tipo de cliente al cual correspondes." +
          "<br/><br/><b>Minorista (Ventas por unidades  docenas a clientes no frecuentes, omitir datos de rubro)</b>" + 
          "<br/><br/><b>Especialista (Profesionales del rubro; constructores, arquitectos, plomeros, carpinteros)</b>"+
          "<br/><br/><b>Mayorista (Negocios del rubo; Ferreterias, comerciales, supermerados y grandes superficies)</b>"+
          "<br/><br/><b>Cliente DOMUS (Cliente especial con beneficios de descuentos)</b></h3>",
          type: "warning",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "¡Entendido!",
          closeOnConfirm: false })
        this.transitionTo('register');
      }
    }
});

