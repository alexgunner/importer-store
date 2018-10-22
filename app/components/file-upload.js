import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  filesDidChange: function(files) {
    const uploader = EmberUploader.Uploader.create({
      url: 'http://localhost:3000/upload'
    });

    var user_id = this.get('reserve');

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0], { user_id });
    }
  }
});
