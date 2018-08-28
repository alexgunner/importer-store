import DS from 'ember-data';

export default DS.Model.extend({
    variant_size: DS.attr(),
    price: DS.attr(),
    product_id: DS.attr(), 
    description: DS.attr(),
    reference_code: DS.attr(),
    reposition: DS.attr(),
    reposition_date: DS.attr(),
    offer: DS.attr(),
    offer_price: DS.attr()
});
