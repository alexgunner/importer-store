import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import swal from 'sweetalert';
var link = "no";
var link_ci = "no";
export default Route.extend({
  firebaseApp: Ember.inject.service(),
    model() {
        return RSVP.hash({
          host: this.get('store').adapterFor('application').get('host')
         })
      },
     actions: {
        didSelectImage(files){
        let reader = new FileReader();
        // Ember.run.bind
         reader.onloadend = Ember.run.bind(this, function(){
         var dataURL = reader.result;
         var output = document.getElementById('output');
         output.src = dataURL;
         this.set('file', files[0]);
         var metadata = {
          contentType: 'image/png'
          };

        var storageRef = this.get('firebaseApp').storage().ref(`/usuarios/nit/`);
        var path = this.get(`file`).name;
        var uploadTask = storageRef.child(path).put(this.get(`file`), metadata);
  
        uploadTask.on('state_changed', function(snapshot){
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress = Math.round(progress);
          var elMensaje = document.getElementById('mensaje');
          var textoMensaje = '<p>Porcentaje de subida: ' + progress + '%</p>';
          elMensaje.innerHTML = textoMensaje;
          console.log('Upload is ' + progress + '% done');
          console.log(snapshot.state);
          }, function(error) {
          }, function() {
         var downloadURL = uploadTask.snapshot.downloadURL;
          console.log(downloadURL);
          link = downloadURL;
          });
         });
         //debugger;
         reader.readAsDataURL(files[0]);
         
         
         
         },
         didSelectImage2(files){
          let reader = new FileReader();
          // Ember.run.bind
           reader.onloadend = Ember.run.bind(this, function(){
           var dataURL = reader.result;
           var output = document.getElementById('output2');
           output.src = dataURL;
           this.set('file', files[0]);
           var metadata = {
            contentType: 'image/png'
            };
  
          var storageRef = this.get('firebaseApp').storage().ref(`/usuarios/ci/`);
          var path = this.get(`file`).name;
          var uploadTask = storageRef.child(path).put(this.get(`file`), metadata);
    
          uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress = Math.round(progress);
            var elMensaje = document.getElementById('mensaje2');
            var textoMensaje = '<p>Porcentaje de subida: ' + progress + '%</p>';
            elMensaje.innerHTML = textoMensaje;
            console.log('Upload is ' + progress + '% done');
            console.log(snapshot.state);
            }, function(error) {
            }, function() {
           var downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL);
            link_ci = downloadURL;
            });
           });
           //debugger;
           reader.readAsDataURL(files[0]);
           },
         save() {

          //recover values
          var store = this.get('store');
          var u_name = this.get('controller').get('name');
          var u_namecompany = this.get('controller').get('namecompany');
          var u_ci = this.get('controller').get('ci');
          var u_nit = this.get('controller').get('nit');
          var u_nameinvoice = this.get('controller').get('nameinvoice');
          var u_address = this.get('controller').get('address');
          var u_phone = this.get('controller').get('phone');
          var u_cellphone = this.get('controller').get('cellphone');
          var u_cellwsp = this.get('controller').get('cellwsp');
          var u_email = this.get('controller').get('email');
          var u_password = this.get('controller').get('password');
          var u_password_confirmation = this.get('controller').get('password_confirmation');
          
          //check if some is null
          if(u_name == null || u_ci == null  || u_cellphone == null || u_cellwsp == null ||
          u_address == null || u_phone == null || u_email == null || u_password == null || u_password_confirmation == null)
          {
            swal({
              title: "¡Error!",
              text: "Por favor completa todos los campos requeridos.",
              type: "error"
            })

          }else{

            //check password is the same
            if(u_password != u_password_confirmation)
            {
              swal({
                title: "¡Error!",
                text: "Las contraseñas no coinciden.",
                type: "error"
              })
            }
            else{
              //expresion to password
              var re = new RegExp(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16})/);
              if(!re.test(u_password))
              {
                swal({
                  title: "¡Error!",
                  text: "Tu contraseña debe tener entre 8 a 16 caracteres, donde debe haber una mayúscula, una minúscula y al menos un número.",
                  type: "error"
                })

              }else{
                var new_user = store.createRecord('user', {
                  name : u_name,
                  namecompany: u_namecompany,
                  ci: u_ci,
                  nameinvoice: u_nameinvoice,
                  nit: u_nit,
                  address: u_address,
                  phone: u_phone,
                  cellphone: u_cellphone,
                  cellwsp: u_cellwsp,
                  email: u_email,
                  password: u_password,
                  password_confirmation: u_password_confirmation,
                  image: link,
                  imageci: link_ci,
                  role: "Cliente Minorista "
                });
              new_user.save();
              console.log("guardo usuario");
              swal("¡Espera!", "Gracias por registrarte. Por favor espera unos minutos antes de sesión para que verifiquemos tus datos.", "success");
              this.transitionTo('/');
                
              }
              
            }
           
          }
          
          },
         cancel() {
           this.transitionTo('/');
         },
         showModal(){
          swal({ 
            html:true,
            title: "Instructivo de registro",
            text: "<h3 align='justify'>Estas a punto de crear una cuenta en nuestro portal, por favor toma en cuenta las siguientes indicaciones para que ingreses los datos según el tipo de cliente al cual correspondes." +
            "<br/><br/><b>Minorista (Ventas por unidades  docenas a clientes no frecuentes, omitir datos de rubro)</b>" + 
            "<br/><br/><b>Especialista (Profesionales del rubro; constructores, arquitectos, plomeros, carpinteros)</b>"+
            "<br/><br/><b>Mayorista (Negocios del rubro; Ferreterias, comerciales, supermerados y grandes superficies)</b>"+
            "<br/><br/><b>Cliente DOMUS (Cliente especial con beneficios de descuentos)</b></h3>",
            type: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "¡Entendido!",
            closeOnConfirm: false })
          }
     }
});
