define('client/tests/components/structure-block/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/structure-block/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/structure-block/component.js should pass jshint.\ncomponents/structure-block/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/structure-block/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/structure-block/component.js: line 63, col 20, \'self\' is already defined.\ncomponents/structure-block/component.js: line 76, col 31, \'self\' used out of scope.\ncomponents/structure-block/component.js: line 52, col 9, \'window\' is not defined.\ncomponents/structure-block/component.js: line 53, col 24, \'window\' is not defined.\ncomponents/structure-block/component.js: line 54, col 15, \'document\' is not defined.\ncomponents/structure-block/component.js: line 55, col 24, \'document\' is not defined.\ncomponents/structure-block/component.js: line 67, col 7, \'Webcam\' is not defined.\ncomponents/structure-block/component.js: line 69, col 7, \'Webcam\' is not defined.\n\n10 errors');
  });
});