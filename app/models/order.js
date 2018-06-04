import DS from 'ember-data';

export default DS.Model.extend({
    orderdate: DS.attr(),
	client: DS.attr(),
	confirmed: DS.attr()
});
