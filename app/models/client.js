import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
	lastname: DS.attr('string'),
    address: DS.attr('string'),
    phone: DS.attr('number'),
    mail: DS.attr('string'),
    nit: DS.attr('number'),
    count: DS.attr('number'),
    orders: DS.hasMany('orders')
});
