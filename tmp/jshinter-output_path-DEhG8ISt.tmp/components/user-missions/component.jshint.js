QUnit.module('JSHint - components/user-missions/component.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/user-missions/component.js should pass jshint.\ncomponents/user-missions/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/user-missions/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/user-missions/component.js: line 49, col 38, [\'team\'] is better written in dot notation.\ncomponents/user-missions/component.js: line 50, col 18, \'i\' is already defined.\n\n4 errors');
});
