define('client/tests/components/mission-alert/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/mission-alert/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/mission-alert/component.js should pass jshint.\ncomponents/mission-alert/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/mission-alert/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/mission-alert/component.js: line 18, col 40, Missing semicolon.\ncomponents/mission-alert/component.js: line 29, col 12, Missing semicolon.\ncomponents/mission-alert/component.js: line 44, col 11, Missing semicolon.\n\n5 errors');
  });
});