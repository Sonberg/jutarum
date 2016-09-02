QUnit.module('JSHint - routes/write.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/write.js should pass jshint.\nroutes/write.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/write.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/write.js: line 6, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/write.js: line 8, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/write.js: line 13, col 36, Missing semicolon.\n\n5 errors');
});
