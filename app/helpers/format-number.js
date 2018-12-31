import Ember from 'ember';

export function formatNumber(params) {
  var number = params
  return number.toFixed(2);
}

export default Ember.Helper.helper(formatNumber);