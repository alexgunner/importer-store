import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
	lastname: DS.attr('string'),
    address: DS.attr('string'),
    phone: DS.attr('number'),
    mail: DS.attr('string'),
    ci: DS.attr('number'),
    nit: DS.attr('number'),
    nameinvoice: DS.attr('string'),
    count: DS.attr('number'),
    orders: DS.hasMany('orders')
});
