define('client/tests/unit/initializers/cookie-test', ['exports', 'ember', 'client/initializers/cookie', 'qunit'], function (exports, _ember, _clientInitializersCookie, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | cookie', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _clientInitializersCookie['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});