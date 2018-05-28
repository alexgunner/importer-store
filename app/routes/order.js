import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        save() {
          const newOrder = this.get('store').createRecord('order', this.currentModel);
          newOrder.save()
        },
        cancel() {
          this.transitionTo('/');
        }
    }
});
