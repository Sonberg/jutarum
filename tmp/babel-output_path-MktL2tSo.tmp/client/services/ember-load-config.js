define('client/services/ember-load-config', ['exports', 'ember-load/services/ember-load-config', 'client/config/environment'], function (exports, _emberLoadServicesEmberLoadConfig, _clientConfigEnvironment) {
  var userConfig = _clientConfigEnvironment['default']['ember-load'] || {};

  exports['default'] = _emberLoadServicesEmberLoadConfig['default'].extend({
    loadingIndicatorClass: userConfig.loadingIndicatorClass
  });
});