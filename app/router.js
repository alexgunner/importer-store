import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('categories');
  this.route('subcategory-products',{path: 'subcategory-products/:id'});

  this.route('order', function() {});

  this.route('cart');
  this.route('pay');
  this.route('about-us');
  this.route('category-products', {path: 'category-products/:id'});
  this.route('products-offer');
  this.route('services');
  this.route('contact');
});

export default Router;
