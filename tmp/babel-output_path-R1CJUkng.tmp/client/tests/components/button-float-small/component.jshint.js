define('client/tests/components/button-float-small/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/button-float-small/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/button-float-small/component.js should pass jshint.\ncomponents/button-float-small/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/button-float-small/component.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/button-float-small/component.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/button-float-small/component.js: line 10, col 5, \'let\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/button-float-small/component.js: line 17, col 7, Missing semicolon.\ncomponents/button-float-small/component.js: line 10, col 9, \'dropInstance\' is defined but never used.\ncomponents/button-float-small/component.js: line 11, col 15, \'document\' is not defined.\n\n7 errors');
  });
});