define('client/tests/unit/utils/assets-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/utils/assets-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/assets-test.js should pass jshint.');
  });
});