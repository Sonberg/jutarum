define('client/tests/unit/routes/structure-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/structure-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/structure-test.js should pass jshint.');
  });
});