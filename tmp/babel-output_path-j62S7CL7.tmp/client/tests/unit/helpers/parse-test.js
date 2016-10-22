define('client/tests/unit/helpers/parse-test', ['exports', 'client/helpers/parse', 'qunit'], function (exports, _clientHelpersParse, _qunit) {

  (0, _qunit.module)('Unit | Helper | parse');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientHelpersParse.parse)([42]);
    assert.ok(result);
  });
});