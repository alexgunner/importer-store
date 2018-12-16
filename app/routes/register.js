import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import swal from 'sweetalert';
var link = "no";
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

        var storageRef = this.get('firebaseApp').storage().ref(`/usuarios/`);
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
         save() {

          //recover values
          var store = this.get('store');
          var u_name = this.get('controller').get('name');
          var u_lastname = this.get('controller').get('lastname');
          var u_ci = this.get('controller').get('ci');
          var u_nit = this.get('controller').get('nit');
          var u_address = this.get('controller').get('address');
          var u_phone = this.get('controller').get('phone');
          var u_email = this.get('controller').get('email');
          var u_password = this.get('controller').get('password');
          var u_password_confirmation = this.get('controller').get('password_confirmation');
          
          //check if some is null
          if(u_name == null || u_lastname == null || u_ci == null  || 
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
              var re = new RegExp("((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16})");
              if(!re.test(u_password))
              {
                swal({
                  title: "¡Error!",
                  text: "Tu contraseña debe tener entre 6 a 16 caracteres, donde debe haber una mayúscula, una minúscula y al menos un número.",
                  type: "error"
                })

              }else{
                var new_user = store.createRecord('user', {
                  name : u_name,
                  lastname: u_lastname,
                  ci: u_ci,
                  nit: u_nit,
                  address: u_address,
                  phone: u_phone,
                  email: u_email,
                  password: u_password,
                  password_confirmation: u_password_confirmation,
                  image: link
                });
              new_user.save();
              console.log("guardo usuario");
              swal("¡Hecho!", "Gracias por registrarte. Por favor espera unos minutos antes de sesión para que verifiquemos tus datos.", "success");
              this.transitionTo('/');
                
              }
              
            }
           
          }
          
          },
         cancel() {
           this.transitionTo('/');
         }
     }
});
