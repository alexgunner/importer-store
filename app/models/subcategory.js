import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	description: DS.attr(),
	picture: DS.attr('image'),
	category: DS.belongsTo('category'),
	products: DS.hasMany('product')
});
