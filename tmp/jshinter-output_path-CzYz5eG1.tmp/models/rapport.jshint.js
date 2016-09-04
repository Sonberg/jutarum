QUnit.module('JSHint - models/rapport.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/rapport.js should pass jshint.\nmodels/rapport.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/rapport.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/rapport.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/rapport.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nmodels/rapport.js: line 3, col 21, \'hasMany\' is defined but never used.\n\n5 errors');
});
