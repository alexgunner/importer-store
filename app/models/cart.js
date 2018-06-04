import DS from 'ember-data';

export default DS.Model.extend({
	quantity: DS.attr('number'),
	product_id: DS.attr('string'),
	order_id: DS.attr('string')
});
