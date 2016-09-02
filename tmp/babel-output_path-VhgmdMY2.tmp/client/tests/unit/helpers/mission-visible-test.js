define('client/tests/unit/helpers/mission-visible-test', ['exports', 'client/helpers/mission-visible', 'qunit'], function (exports, _clientHelpersMissionVisible, _qunit) {

  (0, _qunit.module)('Unit | Helper | mission visible');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientHelpersMissionVisible.missionVisible)([42]);
    assert.ok(result);
  });
});