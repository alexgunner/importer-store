import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  //serverTokenEndpoint: 'http://localhost:3000/api/users/sign_in'
  serverTokenEndpoint: 'http://api.domusbolivia.com/api/users/sign_in'
});