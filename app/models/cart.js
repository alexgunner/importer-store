import DS from 'ember-data';

export default DS.Model.extend({
	quantity: DS.attr('number'),
	product_variant_id: DS.attr('number'),
	order_id: DS.attr('number'),
	role: DS.attr('string'),
	order: DS.belongsTo('order'),
	product_variant: DS.belongsTo('product_variant')
});
