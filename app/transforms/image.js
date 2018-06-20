import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return "http://www.todo-construccion.com/" + serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
