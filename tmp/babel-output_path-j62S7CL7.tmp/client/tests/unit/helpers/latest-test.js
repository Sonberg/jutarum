define('client/tests/unit/helpers/latest-test', ['exports', 'client/helpers/latest', 'qunit'], function (exports, _clientHelpersLatest, _qunit) {

  (0, _qunit.module)('Unit | Helper | latest');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientHelpersLatest.latest)([42]);
    assert.ok(result);
  });
});