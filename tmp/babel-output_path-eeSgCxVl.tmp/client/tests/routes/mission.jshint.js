define('client/tests/routes/mission.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/mission.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/mission.js should pass jshint.\nroutes/mission.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/mission.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/mission.js: line 6, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/mission.js: line 22, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/mission.js: line 36, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/mission.js: line 58, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/mission.js: line 62, col 39, Expected \'!==\' and instead saw \'!=\'.\nroutes/mission.js: line 40, col 13, \'self\' is not defined.\nroutes/mission.js: line 41, col 22, \'self\' is not defined.\nroutes/mission.js: line 43, col 13, \'self\' is not defined.\n\n10 errors');
  });
});