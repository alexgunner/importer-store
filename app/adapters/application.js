import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
	host: 'http://todoconstruccion-api.herokuapp.com',
	// host: 'http://localhost:3000'
});
