QUnit.module('JSHint - components/time-ago/component.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/time-ago/component.js should pass jshint.\ncomponents/time-ago/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/time-ago/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/time-ago/component.js: line 24, col 13, \'date\' is already defined.\ncomponents/time-ago/component.js: line 25, col 13, \'str\' is already defined.\ncomponents/time-ago/component.js: line 28, col 24, \'str\' used out of scope.\ncomponents/time-ago/component.js: line 11, col 5, \'moment\' is not defined.\ncomponents/time-ago/component.js: line 22, col 37, \'moment\' is not defined.\ncomponents/time-ago/component.js: line 25, col 33, \'moment\' is not defined.\n\n8 errors');
});
