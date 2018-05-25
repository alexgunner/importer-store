import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('categories');
  this.route('subcategory-products',{path: 'subcategory-products/:id'});

  this.route('order', function() {
    this.route('new');
  });

  this.route('cart',{path: 'cart/:id'});
  this.route('carts');
});

export default Router;
