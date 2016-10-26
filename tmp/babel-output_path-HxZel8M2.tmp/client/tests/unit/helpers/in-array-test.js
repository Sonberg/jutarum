define('client/tests/unit/helpers/in-array-test', ['exports', 'client/helpers/in-array', 'qunit'], function (exports, _clientHelpersInArray, _qunit) {

  (0, _qunit.module)('Unit | Helper | in array');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientHelpersInArray.inArray)([42]);
    assert.ok(result);
  });
});