define('client/controllers/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    global: _ember['default'].inject.service()
  });
});