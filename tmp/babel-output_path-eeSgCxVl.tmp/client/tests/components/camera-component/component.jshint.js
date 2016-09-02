define('client/tests/components/camera-component/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/camera-component/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/camera-component/component.js should pass jshint.\ncomponents/camera-component/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/camera-component/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/camera-component/component.js: line 13, col 5, \'Webcam\' is not defined.\ncomponents/camera-component/component.js: line 24, col 5, \'Webcam\' is not defined.\ncomponents/camera-component/component.js: line 34, col 7, \'Webcam\' is not defined.\ncomponents/camera-component/component.js: line 41, col 7, \'Webcam\' is not defined.\ncomponents/camera-component/component.js: line 48, col 7, \'Webcam\' is not defined.\n\n7 errors');
  });
});