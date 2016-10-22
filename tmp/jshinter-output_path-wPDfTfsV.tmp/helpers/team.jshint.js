QUnit.module('JSHint - helpers/team.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'helpers/team.js should pass jshint.\nhelpers/team.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/team.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/team.js: line 27, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});
