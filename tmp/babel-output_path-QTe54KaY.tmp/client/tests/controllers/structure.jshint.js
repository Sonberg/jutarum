define('client/tests/controllers/structure.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/structure.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/structure.js should pass jshint.\ncontrollers/structure.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/structure.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/structure.js: line 42, col 9, Missing semicolon.\n\n3 errors');
  });
});