import DS from 'ember-data';

export default DS.Model.extend({
    id: DS.attr(),
    picture: DS.attr('image'),
    main: DS.attr()
});
