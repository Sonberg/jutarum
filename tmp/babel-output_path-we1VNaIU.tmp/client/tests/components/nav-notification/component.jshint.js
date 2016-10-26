define('client/tests/components/nav-notification/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/nav-notification/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/nav-notification/component.js should pass jshint.\ncomponents/nav-notification/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/nav-notification/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});