import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	description: DS.attr(),
	category: DS.belongsTo('category'),
	products: DS.hasMany('product')
});