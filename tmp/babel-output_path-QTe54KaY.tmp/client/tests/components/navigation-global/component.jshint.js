define('client/tests/components/navigation-global/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/navigation-global/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/navigation-global/component.js should pass jshint.\ncomponents/navigation-global/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/navigation-global/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});