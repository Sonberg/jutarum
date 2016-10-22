define('client/tests/unit/initializers/component-router-injector-test', ['exports', 'ember', 'client/initializers/component-router-injector', 'qunit'], function (exports, _ember, _clientInitializersComponentRouterInjector, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | component router injector', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _clientInitializersComponentRouterInjector['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});