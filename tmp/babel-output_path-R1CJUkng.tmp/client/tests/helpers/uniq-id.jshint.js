define('client/tests/helpers/uniq-id.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/uniq-id.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/uniq-id.js should pass jshint.\nhelpers/uniq-id.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/uniq-id.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/uniq-id.js: line 9, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});