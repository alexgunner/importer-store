import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    acount: DS.attr(),
    nameaccount: DS.attr(),
    typemoney: DS.attr()
});
