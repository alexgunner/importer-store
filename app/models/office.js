import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    city: DS.attr(),
    phone: DS.attr(),
    cellphone: DS.attr(),
    cellwsp: DS.attr(),
    address: DS.attr(),
    email: DS.attr(),
    picture: DS.attr('image'),
    lat: DS.attr(),
    long: DS.attr()
});
