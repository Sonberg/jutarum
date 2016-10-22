define('client/tests/helpers/asset-avatar.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/asset-avatar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/asset-avatar.js should pass jshint.\nhelpers/asset-avatar.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/asset-avatar.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/asset-avatar.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/asset-avatar.js: line 12, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});