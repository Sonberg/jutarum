QUnit.module('JSHint - controllers/user.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/user.js should pass jshint.\ncontrollers/user.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/user.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/user.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/user.js: line 19, col 15, \'document\' is not defined.\ncontrollers/user.js: line 35, col 20, \'$\' is not defined.\n\n5 errors');
});
