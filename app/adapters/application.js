import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
	host: 'http://api.domusbolivia.com',
	
	 authorize(xhr) {
		let { email, token } = this.get('session.data.authenticated');
		let authData = `Token token="${token}", email="${email}"`;
		xhr.setRequestHeader('Authorization', authData);
	 }

});
