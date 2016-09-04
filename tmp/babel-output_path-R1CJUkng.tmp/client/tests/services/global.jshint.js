define('client/tests/services/global.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/global.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/global.js should pass jshint.\nservices/global.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/global.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});