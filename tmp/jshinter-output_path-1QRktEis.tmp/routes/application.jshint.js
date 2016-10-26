QUnit.module('JSHint - routes/application.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/application.js should pass jshint.\nroutes/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/application.js: line 12, col 5, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/application.js: line 13, col 13, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
});
