import DS from 'ember-data';

export default DS.Model.extend({
    product_id: DS.attr('string'),
    quantity: DS.attr('number'),
});

