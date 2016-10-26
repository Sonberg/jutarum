define('client/tests/controllers/dashboard-missions.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/dashboard-missions.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard-missions.js should pass jshint.\ncontrollers/dashboard-missions.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/dashboard-missions.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});