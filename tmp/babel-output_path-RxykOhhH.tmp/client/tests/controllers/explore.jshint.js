define('client/tests/controllers/explore.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/explore.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/explore.js should pass jshint.\ncontrollers/explore.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/explore.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});