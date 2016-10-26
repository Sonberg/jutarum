define('client/initializers/cookie', ['exports', 'client/lib/cookie'], function (exports, _clientLibCookie) {
  exports['default'] = {
    name: 'cookie',
    initialize: function initialize() {
      var app = arguments[1] || arguments[0];
      app.register('cookie:main', _clientLibCookie['default']);
    }
  };
});