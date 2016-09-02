define('client/tests/unit/helpers/team-test', ['exports', 'client/helpers/team', 'qunit'], function (exports, _clientHelpersTeam, _qunit) {

  (0, _qunit.module)('Unit | Helper | team');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _clientHelpersTeam.team)([42]);
    assert.ok(result);
  });
});