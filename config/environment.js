'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'importer-store',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'connect-src': "*"
    },

    firebase: {
      apiKey: 'AIzaSyCYgaXj24QRp7nKm5ARl7ZANt3GnaCtrno',
      authDomain: '',
      databaseURL: '',
      storageBucket: 'importer-store-1537766216237.appspot.com',
    }
  };
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index'
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV['ember-google-maps'] = {
    //   key: 'AIzaSyAy4PzSIG77OtqMciXyhMuTD9tQSICh0LM' // Using .env files in this example
    //   // client: undefined,
    //   // channel: undefined,
    //   // baseUrl: '//maps.googleapis.com/maps/api/js'
    // },
    
    
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    
  }
  
  return ENV;
};
