QUnit.module('JSHint - helpers/parse.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'helpers/parse.js should pass jshint.\nhelpers/parse.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/parse.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/parse.js: line 7, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});
