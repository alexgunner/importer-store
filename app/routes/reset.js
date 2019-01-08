import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        reset(){
            var mail = this.get('controller').get('mail');
            Ember.$.ajax({
                url: "http://localhost:3000/password_resets",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    email: mail 
                })
            }).then(function(){
                console.log("post");
                swal({
                    title: "¡Espera!",
                    text: "En unos minutos revisa tu bandeja de entrada, hemos enviado un correo con un link para poder ayudarte.",
                    type: "success",
                    showConfirmButton: true
                  }, function() {
                    window.location.href = '/';
                  }); 
            });
            
        }
    }
});
