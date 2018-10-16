import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
	//host: 'http://todoconstruccion-api.herokuapp.com',
	 host: 'http://localhost:3000',
	 authorizer: 'authorizer:devise'

});
