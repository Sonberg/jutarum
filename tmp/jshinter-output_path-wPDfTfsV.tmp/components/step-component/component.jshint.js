QUnit.module('JSHint - components/step-component/component.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/step-component/component.js should pass jshint.\ncomponents/step-component/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/step-component/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/step-component/component.js: line 10, col 28, Missing semicolon.\ncomponents/step-component/component.js: line 17, col 5, \'history\' is not defined.\n\n4 errors');
});
