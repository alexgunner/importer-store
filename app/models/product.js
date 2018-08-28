import DS from 'ember-data';
import product_variant from './product_variant';

export default DS.Model.extend({
	name: DS.attr(),
	description: DS.attr(),
	reference_code: DS.attr(),
	picture: DS.attr('image'),
	offer: DS.attr(),
	details: DS.attr(),
	measure: DS.belongsTo('measure'),
	provider: DS.belongsTo('provider'),
	manufacturer: DS.belongsTo('manufacturer'),
	category: DS.belongsTo('category'),
	subcategory: DS.belongsTo('subcategory'),
	carts: DS.hasMany('carts'),
	product_variants: DS.hasMany('product_variant')
});
