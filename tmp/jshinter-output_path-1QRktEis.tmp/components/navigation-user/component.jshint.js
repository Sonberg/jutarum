QUnit.module('JSHint - components/navigation-user/component.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/navigation-user/component.js should pass jshint.\ncomponents/navigation-user/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/navigation-user/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
