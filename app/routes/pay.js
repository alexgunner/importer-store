import Route from '@ember/routing/route';
import RSVP from 'rsvp';
var ido;
export default Route.extend({
    firebaseApp: Ember.inject.service(),
    model(params){
    return RSVP.hash({
        product_variants: this.get('store').findAll('product_variant'),
        order: this.get('store').findRecord('order', ido=params.id),
        banks: this.get('store').findAll('bank'),
        host: this.get('store').adapterFor('application').get('host')
    })
    },
    actions: {
        creditPay(host, id){
        swal({
            title: "¡Espera!",
            text: "Espera un momento. Te estamos redirigiendo a la terminal de pago con tarjeta.",
            type: "success",
            timer: 8000,
            showConfirmButton: false
            }, function() {
            window.location.href = host + '/pay/'+ id;
        });
        },
        didSelectImage(files){
            var store = this.get('store');
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

            var storageRef = this.get('firebaseApp').storage().ref(`/depositos/`);
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
                store.findRecord('order', ido).then(function(order) {
                    order.set('image', downloadURL);
                    order.save(); // => PATCH to '/orders/1'
                });
            });
            });
            //debugger;
            reader.readAsDataURL(files[0]);        
        },
        clearCart2(items){
            swal({
                title: "¡Espera!",
                type: "success",
                confirmButtonText: "OK",
                timer:3000
                },
                function(isConfirm){
                if (isConfirm) {
                    window.location.href = '/';
                }
            });
            items.forEach(function(item){
                item.deleteRecord();
                item.save();
            })
        },
        cancelAll(id){
            var store = this.get('store');
            store.findRecord('order', id).then(function(order) {
                order.set('state', "Cancelado");
                order.save();
            })
            swal({
                title: "¡Bueno!",
                text: "Tu orden fue cancelada. Esperamos que continues navegando por nuestra tienda.",
                type: "success",
                confirmButtonText: "OK"
              },
              function(isConfirm){
                if (isConfirm) {
                  window.location.href = '/';
                }
              });
        }
    }
});
