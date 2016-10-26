QUnit.module('JSHint - routes/rapport.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/rapport.js should pass jshint.\nroutes/rapport.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/rapport.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/rapport.js: line 4, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
});
