import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    //return "http://todoconstruccion-api.herokuapp.com" + serialized;
    return "http://api.domusbolivia.com/" + serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
