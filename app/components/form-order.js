import Component from '@ember/component';
var id;
const { service } = Ember.inject;
export default Component.extend({
    store: Ember.inject.service(),
    session: service('session')
});
