import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  serverTokenEndpoint: 'http://todoconstruccion-api.herokuapp.com/api/users/sign_in'
});