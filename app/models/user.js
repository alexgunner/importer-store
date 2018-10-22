import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    lastname: DS.attr(),
    email: DS.attr(),
    ci: DS.attr(),
    phone: DS.attr(),
    nit: DS.attr(),
    address: DS.attr(),
    image: DS.attr(),
    password: DS.attr(),
    password_confirmation: DS.attr()
});
