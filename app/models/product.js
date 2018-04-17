import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	description: DS.attr(),
	price: DS.attr(),
	color: DS.attr(),
	code: DS.attr(),
	picture: DS.attr('image'),
	measure: DS.belongsTo('measure'),
	provider: DS.belongsTo('provider'),
	manufacturer: DS.belongsTo('manufacturer'),
	category: DS.belongsTo('category'),
	subcategory: DS.belongsTo('subcategory'),
});
