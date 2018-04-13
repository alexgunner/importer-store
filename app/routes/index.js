import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
	model() {
		return RSVP.hash({
			categories: this.get('store').findAll('category', {include: 'subcategories'}),
			subcategories: this.get('store').findAll('subcategory', {include: 'category'})
		});
	}
});
