define('client/tests/unit/utils/helper-test', ['exports', 'client/utils/helper', 'qunit'], function (exports, _clientUtilsHelper, _qunit) {

  (0, _qunit.module)('Unit | Utility | helper');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientUtilsHelper['default'])();
    assert.ok(result);
  });
});