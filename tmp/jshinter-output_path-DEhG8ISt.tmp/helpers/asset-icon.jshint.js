QUnit.module('JSHint - helpers/asset-icon.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'helpers/asset-icon.js should pass jshint.\nhelpers/asset-icon.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/asset-icon.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/asset-icon.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/asset-icon.js: line 17, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
});
