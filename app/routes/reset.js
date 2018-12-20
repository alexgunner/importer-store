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
            });
            console.log("post");
        }
    }
});
