import DS from 'ember-data';

export default DS.Model.extend({
    orderdate: DS.attr('date'),
	client_id: DS.attr('number')
});
