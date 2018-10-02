import DS from 'ember-data';

export default DS.Model.extend({
    firstName: DS.attr(),
    lastName: DS.attr(),
    mail: DS.attr(),
    ci: DS.attr(),
    phone: DS.attr(),
    nit: DS.attr(),
    address: DS.attr(),
    imagenit: DS.attr('image'),
    imageci: DS.attr('image'),
    encrypted_password: DS.attr()
});
