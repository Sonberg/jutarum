define('client/tests/components/nav-bar/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/nav-bar/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-bar/component.js should pass jshint.');
  });
});