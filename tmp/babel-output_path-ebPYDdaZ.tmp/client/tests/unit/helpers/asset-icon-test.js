define('client/tests/unit/helpers/asset-icon-test', ['exports', 'client/helpers/asset-icon', 'qunit'], function (exports, _clientHelpersAssetIcon, _qunit) {

  (0, _qunit.module)('Unit | Helper | asset icon');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientHelpersAssetIcon.assetIcon)([42]);
    assert.ok(result);
  });
});