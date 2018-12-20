import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('categories');
  this.route('order', function() {});
  this.route('cart', function() {});
  this.route('pay', {path: 'pay/:id'});
  this.route('about-us');
  this.route('category-products', {path: 'category-products/:id'});
  this.route('products-offer');
  this.route('services');
  this.route('contact');
  this.route('register');
  this.route('login');
  this.route('history');
  this.route('product-details', {path: 'product-details/:id'});
  this.route('reset');
});

export default Router;
