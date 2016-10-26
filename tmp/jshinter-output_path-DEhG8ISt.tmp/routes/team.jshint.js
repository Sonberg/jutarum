QUnit.module('JSHint - routes/team.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/team.js should pass jshint.\nroutes/team.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/team.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/team.js: line 8, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/team.js: line 16, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
});
