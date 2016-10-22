define('client/tests/helpers/in-array.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/in-array.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/in-array.js should pass jshint.\nhelpers/in-array.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/in-array.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/in-array.js: line 16, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});