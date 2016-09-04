define('client/tests/unit/utils/assets-test', ['exports', 'client/utils/assets', 'qunit'], function (exports, _clientUtilsAssets, _qunit) {

  (0, _qunit.module)('Unit | Utility | assets');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientUtilsAssets['default'])();
    assert.ok(result);
  });
});