/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    'ember-load': {
      // This is the default value, if you don't set this opton
      loadingIndicatorClass: 'ember-load-indicator'
    },
    googleFonts: [
      'Raleway',
      'Baloo+Paaji'
    ],
    contentSecurityPolicy: {
      'font-src': "'self' fonts.gstatic.com",
      'style-src': "'self' fonts.googleapis.com"
    },

    modulePrefix: 'client',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    uiNavigator: {
      injectionFactories: ['component']
    },
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
      name: "Jutarum"
    }
  };

  if (environment === 'development') {
    /*
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    */
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/jutarum/dist/';
    ENV.locationType = 'none';

    // keep test console output quieter
    //ENV.APP.LOG_ACTIVE_GENERATION = false;
    //ENV.APP.LOG_VIEW_LOOKUPS = false;

    //ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.locationType = 'hash';
    ENV.rootURL = '/jutarum/';
    minifyCSS: {
      enabled: false
    }
    minifyJS: {
      enabled: true
    }
  }

  return ENV;
}