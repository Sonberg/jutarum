define('client/tests/unit/helpers/parse-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/helpers/parse-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/parse-test.js should pass jshint.');
  });
});