import Component from '@ember/component';
const { service } = Ember.inject;
export default Component.extend({
    session: service('session'),
    actions: {
        logout(items) {
        items.forEach(function(item){
            item.deleteRecord();
            item.save();
        })
        this.get('session').invalidate();
        }
    }
});
