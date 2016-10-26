define('client/tests/routes/structure.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/structure.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/structure.js should pass jshint.\nroutes/structure.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/structure.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});