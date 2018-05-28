import DS from 'ember-data';

export default DS.Model.extend({
	quantity: DS.attr(),
	order: DS.belongsTo('order'),
	product: DS.belongsTo('product')
});
