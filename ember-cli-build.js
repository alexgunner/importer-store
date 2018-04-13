'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // CSS imports
  app.import('vendor/css/bootstrap.min.css');
  app.import('vendor/css/font-awesome.min.css');
  app.import('vendor/css/prettyPhoto.css');
  app.import('vendor/css/price-range.css');
  app.import('vendor/css/animate.css');
  app.import('vendor/css/main.css');  
  app.import('vendor/css/responsive.css');

  // JS imports
  app.import('vendor/js/jquery.js');
  app.import('vendor/js/bootstrap.min.js'); 
  app.import('vendor/js/jquery.scrollUp.min.js');
  app.import('vendor/js/price-range.js');
  app.import('vendor/js/jquery.prettyPhoto.js');
  app.import('vendor/js/main.js');

  // Fonts imports
  app.import('vendor/fonts/fontawesome-webfont.svg');
  app.import('vendor/fonts/fontawesome-webfont.woff');
  app.import('vendor/fonts/FontAwesome.otf');
  app.import('vendor/fonts/glyphicons-halflings-regular.svg');
  app.import('vendor/fonts/glyphicons-halflings-regular.woff');

  return app.toTree();
};
