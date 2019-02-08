import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    phone: DS.attr(),
    address: DS.attr(),
    cost: DS.attr(),
    shipping: DS.attr(),
    costmin: DS.attr(),
    destinations: DS.belongsTo('destination'),
    orders: DS.hasMany('orders')
});
