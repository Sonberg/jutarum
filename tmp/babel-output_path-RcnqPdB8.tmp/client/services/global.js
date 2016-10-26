define('client/services/global', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({
    school: null,
    user: null,
    mission: null
  });
});