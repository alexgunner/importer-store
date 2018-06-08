import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
	lastName: DS.attr('string'),
    address: DS.attr('string'),
    phone: DS.attr('number'),
    mail: DS.attr('string'),
    nit: DS.attr('number')
});
