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
        },

        searchProduct() {
            var productname = this.get('name').toLowerCase();
            productname = productname.replace(/ /g, "%20" );
            console.log("El nombre es:", productname);
            //this.sendAction('afterSearch', productname);
        }
    }
});
