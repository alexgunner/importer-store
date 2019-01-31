import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    city: DS.attr(),
    country: DS.attr(),
    cash: DS.attr(),
    deliveries: DS.hasMany('deliveries')
});
