import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    description: DS.attr(),
    url: DS.attr(),
    videolink: DS.attr()
});
