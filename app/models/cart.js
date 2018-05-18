import DS from 'ember-data';

export default DS.Model.extend({
	quantity: DS.attr(),
	order_id: DS.attr(),
	product: DS.belongsTo('product')
});
