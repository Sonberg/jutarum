define('client/tests/components/mission-alert/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/mission-alert/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/mission-alert/component.js should pass jshint.\ncomponents/mission-alert/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/mission-alert/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/mission-alert/component.js: line 11, col 9, \'arr\' is defined but never used.\ncomponents/mission-alert/component.js: line 20, col 11, Missing semicolon.\n\n4 errors');
  });
});