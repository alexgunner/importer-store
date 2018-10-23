import DS from 'ember-data';

export default DS.Model.extend({
    orderdate: DS.attr('date'),
    client_id: DS.attr('number'),
    amount: DS.attr('number'),
    delivery_id: DS.attr('number')
});
