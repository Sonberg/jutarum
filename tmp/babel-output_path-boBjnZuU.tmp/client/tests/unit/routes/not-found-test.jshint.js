define('client/tests/unit/routes/not-found-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/not-found-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/not-found-test.js should pass jshint.');
  });
});