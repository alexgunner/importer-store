import Component from '@ember/component';
const { service } = Ember.inject;
export default Component.extend({
    session: service('session')
});
