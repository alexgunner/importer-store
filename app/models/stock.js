import DS from 'ember-data';

export default DS.Model.extend({
    quantity: DS.attr(),
	limit: DS.attr(),
    store: DS.belongsTo('store'),
    products: DS.hasMany('products'),
    product_variants: DS.hasMany('product_variants')
});
