import Component from '@ember/component';

export default Component.extend({
    model() {
        return this.get('store').findAll('category')
    }
});
