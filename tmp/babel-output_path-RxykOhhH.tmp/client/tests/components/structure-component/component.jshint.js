define('client/tests/components/structure-component/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/structure-component/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/structure-component/component.js should pass jshint.\ncomponents/structure-component/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/structure-component/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/structure-component/component.js: line 9, col 7, Duplicate key \'type\'.\n\n3 errors');
  });
});