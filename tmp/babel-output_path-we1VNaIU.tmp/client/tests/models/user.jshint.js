define('client/tests/models/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/user.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nmodels/user.js: line 3, col 10, \'belongsTo\' is defined but never used.\nmodels/user.js: line 3, col 21, \'hasMany\' is defined but never used.\n\n6 errors');
  });
});