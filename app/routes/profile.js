import Route from '@ember/routing/route';
var link;
var link_ci;
export default Route.extend({
    firebaseApp: Ember.inject.service(),
    model(params){
        return this.get('store').findRecord('user', params.id)
    },

    actions:{
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
        save(id){
            //recover values
            var store = this.get('store');

            //find user and update
            store.findRecord('user', id).then(function(user) {
                var imagenit = user.get('image');
                var imageci = user.get('imageci');
                
                if (link != imagenit){
                    user.set('image', link);
                }
                if(link_ci != imageci){
                    user.set('imageci', link_ci);
                }
                user.set('name', document.getElementById('new_name').value);
                user.set('namecompany', document.getElementById('new_namecompany').value);
                user.set('ci', document.getElementById('new_ci').value);
                user.set('address', document.getElementById('new_address').value);
                user.set('phone', document.getElementById('new_phone').value);
                user.set('cellphone', document.getElementById('new_cellphone').value);
                user.set('cellwsp', document.getElementById('new_cellwsp').value);
                user.set('nameinvoice', document.getElementById('new_nameinvoice').value);
                user.set('nit', document.getElementById('new_nit').value);
                user.save(); // => PATCH to '/users/1'
            }).then(function() {
                swal({
                    title: "¡Hecho!",
                    text: "Tu información ha sido actualizada.",
                    type: "success",
                    confirmButtonText: "OK"
                  },
                  function(isConfirm){
                    if (isConfirm) {
                        location.reload(true);
                    }
                  });
            }
            );
            console.log("actualizo user");
        }
    }
});
