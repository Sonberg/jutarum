define('client/tests/unit/routes/write-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/write-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/write-test.js should pass jshint.');
  });
});