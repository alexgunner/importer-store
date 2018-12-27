import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    namecompany: DS.attr(),
    email: DS.attr(),
    ci: DS.attr(),
    phone: DS.attr(),
    cellphone: DS.attr(),
    cellwsp: DS.attr(),
    nameinvoice: DS.attr(),
    nit: DS.attr(),
    address: DS.attr(),
    image: DS.attr(),
    imageci: DS.attr(),
    password: DS.attr(),
    password_confirmation: DS.attr(),
    role: DS.attr()
});
