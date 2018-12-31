import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        reset(){
            var mail = this.get('controller').get('mail');
            Ember.$.ajax({
                url: "http://api.domusbolivia.com/password_resets",
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
