import DS from 'ember-data';

export default DS.Model.extend({
    phone: DS.attr(),
    address: DS.attr(),
    email: DS.attr(),
    facebook: DS.attr(),
    about: DS.attr(),
    mission: DS.attr(),
    vision: DS.attr(),
    lat: DS.attr(),
    long: DS.attr(),
    picture: DS.attr('image')
});
