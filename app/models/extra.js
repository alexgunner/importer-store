import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    services: DS.attr(),
    banner: DS.attr('image'),
    logo: DS.attr('image')
});
