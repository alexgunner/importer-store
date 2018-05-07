import DS from 'ember-data';

export default DS.Model.extend({
    product: DS.attr(),
	quantity: DS.attr(),
	order: DS.belongsTo('order'),
	product: DS.belongsTo('product')
	
});
