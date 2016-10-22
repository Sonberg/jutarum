QUnit.module('JSHint - routes/dashboard-students.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/dashboard-students.js should pass jshint.\nroutes/dashboard-students.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/dashboard-students.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/dashboard-students.js: line 5, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
});
