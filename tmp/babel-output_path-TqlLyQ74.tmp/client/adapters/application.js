define('client/adapters/application', ['exports', 'ember-data/adapters/json-api'], function (exports, _emberDataAdaptersJsonApi) {
  exports['default'] = _emberDataAdaptersJsonApi['default'].extend({
    host: 'https://makers-api.herokuapp.com/api/v1',
    shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord(store, snapshotArray) {
      return true;
    }
  });
});