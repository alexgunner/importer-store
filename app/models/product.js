import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	description: DS.attr(),
	code: DS.attr(),
	picture: DS.attr('image'),
	picture2: DS.attr('image'),
	picture3: DS.attr('image'),
	picture4: DS.attr('image'),
	offer: DS.attr(),
	details: DS.attr(),
	measure: DS.belongsTo('measure'),
	provider: DS.belongsTo('provider'),
	manufacturer: DS.belongsTo('manufacturer'),
	category: DS.belongsTo('category'),
	subcategory: DS.belongsTo('subcategory'),
	product_variants: DS.hasMany('product_variants')
});
