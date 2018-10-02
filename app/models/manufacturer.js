import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	description: DS.attr(),
	address: DS.attr(),
	email: DS.attr(),
	phone: DS.attr(),
	country: DS.attr(),
	city: DS.attr(),
	products: DS.hasMany('product')
});
