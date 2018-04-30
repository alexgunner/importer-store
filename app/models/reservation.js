import DS from 'ember-data';

export default DS.Model.extend({
    reserve_date: DS.attr('string'),
    client: DS.attr('string'),
    confirmed: DS.attr('string')
});
