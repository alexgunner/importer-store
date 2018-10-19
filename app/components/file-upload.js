import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
   filesDidChange: function() {
        let uploadUrl = this.get('url'),
        files = this.get('files'),
        uploader = EmberUploader.S3Uploader.create({
            url: "http://localhost:3000/upload" }); 
    if (!Ember.isEmpty(files))
        uploader.upload(files[0]);
    }.observes('files')
});