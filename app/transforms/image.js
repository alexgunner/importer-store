import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return "http://localhost:3000" + serialized;
    //return "http://localhost:3000/" + serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
