import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
          host: this.get('store').adapterFor('application').get('host')
         })
      },
     actions: {
         save() {
          // var store = this.get('store');
          // var u_name = this.get('controller').get('name');
          // var u_email = this.get('controller').get('email');
          // var u_password = this.get('controller').get('password');
          // var u_password_confirmation = this.get('controller').get('password_confirmation');
          // var file = document.getElementById('file-field').files[0];
          // this.get('controller').get('imagenit');
          // console.log(file);
          // var new_user = store.createRecord('user', {
          //   name : u_name,
          //   email: u_email,
          //   password: u_password,
          //   password_confirmation: u_password_confirmation,
          //   imagenit: file
          // });
          // new_user.save();
           const user = this.get('store').createRecord('user', this.currentModel);
           user.save();
           console.log("guardo usuario");
           //this.transitionTo('/');
         },
         cancel() {
           this.transitionTo('/');
         }
     }
});
