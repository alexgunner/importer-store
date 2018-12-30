import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        return this.get('store').findRecord('user', params.id)
    },

    actions:{
        save(id){

            //recover values
            var store = this.get('store');

            //find user and update
            store.findRecord('user', id).then(function(user) {
                console.log("encontro");
                user.set('name', document.getElementById('new_name').value);
                user.save(); // => PATCH to '/users/1'
            });
            console.log("actualizo user");
        }

    }
});
