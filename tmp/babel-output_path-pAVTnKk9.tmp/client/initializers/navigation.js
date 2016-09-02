define('client/initializers/navigation', ['exports', 'client/config/environment'], function (exports, _clientConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() /* application */{
    var application = arguments[1] || arguments[0];
    var uiNavigator = _clientConfigEnvironment['default'].uiNavigator;

    uiNavigator = uiNavigator || {};

    var _ref = uiNavigator || [];

    var injectionFactories = _ref.injectionFactories;

    application.register('config:navigator', uiNavigator, { instantiate: false });
    if (injectionFactories.length > 0) {
      application.inject('service:navigator', 'uiNavigator', 'config:navigator');

      injectionFactories.forEach(function (factory) {
        application.inject(factory, 'navigator', 'service:navigator');
      });
    }
  }

  exports['default'] = {
    name: 'navigator',
    initialize: initialize
  };
});