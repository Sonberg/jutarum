define('client/tests/routes/dashboard-rapports.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/dashboard-rapports.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/dashboard-rapports.js should pass jshint.\nroutes/dashboard-rapports.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/dashboard-rapports.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/dashboard-rapports.js: line 4, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
  });
});