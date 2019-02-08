import Ember from 'ember';

export function multiplication(params) {
  return params.reduce((a, b) => {
    return (a * b).toFixed(2);
  });
}

export default Ember.Helper.helper(multiplication);