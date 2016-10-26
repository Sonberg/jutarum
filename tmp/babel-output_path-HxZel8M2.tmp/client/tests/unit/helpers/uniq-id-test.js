define('client/tests/unit/helpers/uniq-id-test', ['exports', 'client/helpers/uniq-id', 'qunit'], function (exports, _clientHelpersUniqId, _qunit) {

  (0, _qunit.module)('Unit | Helper | uniq id');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientHelpersUniqId.uniqId)([42]);
    assert.ok(result);
  });
});