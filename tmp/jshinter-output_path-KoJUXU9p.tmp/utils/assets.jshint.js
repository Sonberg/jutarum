QUnit.module('JSHint - utils/assets.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'utils/assets.js should pass jshint.\nutils/assets.js: line 1, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nutils/assets.js: line 2, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nutils/assets.js: line 6, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nutils/assets.js: line 10, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nutils/assets.js: line 31, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nutils/assets.js: line 59, col 2, Missing semicolon.\n\n6 errors');
});
