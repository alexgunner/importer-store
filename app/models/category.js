import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	description: DS.attr(),
	picture: DS.attr('image'),
	products: DS.hasMany('products'),
	subcategories: DS.hasMany('subcategory')
});
