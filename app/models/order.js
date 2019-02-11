import DS from 'ember-data';

export default DS.Model.extend({
    orderdate: DS.attr('date'),
    client_id: DS.attr('number'),
    delivery_id: DS.attr('number'),
    client: DS.belongsTo('client'),
    carts: DS.hasMany('carts'),
    delivery: DS.belongsTo('delivery'),
    state: DS.attr(),
    typepay: DS.attr(),
    typedelivery: DS.attr(),
    image: DS.attr('string'),
    total: DS.attr(),
    userid: DS.attr(),
    office: DS.attr(),
    cost: DS.attr()
});
