define('client/tests/utils/helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - utils/helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'utils/helper.js should pass jshint.\nutils/helper.js: line 1, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nutils/helper.js: line 11, col 64, Expected \'!==\' and instead saw \'!=\'.\nutils/helper.js: line 45, col 2, Missing semicolon.\nutils/helper.js: line 5, col 20, \'ActiveXObject\' is not defined.\nutils/helper.js: line 10, col 11, \'navigator\' is not defined.\nutils/helper.js: line 11, col 9, \'navigator\' is not defined.\nutils/helper.js: line 12, col 9, \'navigator\' is not defined.\nutils/helper.js: line 22, col 26, \'document\' is not defined.\nutils/helper.js: line 26, col 29, \'document\' is not defined.\nutils/helper.js: line 27, col 23, \'document\' is not defined.\nutils/helper.js: line 24, col 9, \'Ember\' is not defined.\nutils/helper.js: line 33, col 31, \'CSSRule\' is not defined.\n\n12 errors');
  });
});