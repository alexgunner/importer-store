import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    address: DS.attr('string'),
    phone: DS.attr('number'),
    cellphone: DS.attr('number'),
    cellwsp: DS.attr('number'),
    mail: DS.attr('string'),
    ci: DS.attr('number'),
    nit: DS.attr('number'),
    nameinvoice: DS.attr('string'),
    count: DS.attr('number'),
    role: DS.attr('string'),
    orders: DS.hasMany('orders')
});
