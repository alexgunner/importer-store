import DS from 'ember-data';

export default DS.Model.extend({
    variant_id: DS.attr('string'),
    quantity: DS.attr('number')
});

