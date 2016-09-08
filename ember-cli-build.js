/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
    includePaths: [
    ]
  }
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

  // Foundation Sites
  app.import('bower_components/foundation-sites/dist/foundation.min.js');
  app.import('bower_components/font-awesome-animation/dist/font-awesome-animation.min.css');
  //AnimateCss
  app.import('bower_components/animate.css/animate.min.css');

  // Semantic ui step
  app.import('bower_components/semantic-ui-step/step.min.css');

  // Webcam.js
  app.import('bower_components/webcamjs/webcam.js');

  // Dropit
  app.import('bower_components/dropit/dropit.js');
  
  // Select2
  app.import('bower_components/select2/dist/css/select2.min.css');
  app.import('bower_components/select2/dist/js/select2.min.js');
  app.import('bower_components/select2/dist/js/i18n/sv.js');
  
  /* Moment.js */
  app.import('bower_components/moment/moment.js');
  app.import('bower_components/moment/locale/sv.js');
  app.import('bower_components/moment/min/moment-with-locales.js');
  
  // Lz string
  app.import("bower_components/lz-string/libs/lz-string.min.js");
  
  return app.toTree();
};
