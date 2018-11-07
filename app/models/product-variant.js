import DS from 'ember-data';

export default DS.Model.extend({
    size: DS.attr(),
    price: DS.attr(),
    specialistprice: DS.attr(),
    wholesaleprice: DS.attr(),
    description: DS.attr(),
    code: DS.attr(),
    reposition: DS.attr(),
    repositiondate: DS.attr(),
    offerprice: DS.attr(),
    product: DS.belongsTo('product'),
    carts: DS.hasMany('carts'),
    importerprice: DS.attr()
});
