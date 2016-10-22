QUnit.module('JSHint - controllers/team.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/team.js should pass jshint.\ncontrollers/team.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/team.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
