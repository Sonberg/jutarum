define('client/tests/services/mission.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/mission.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/mission.js should pass jshint.\nservices/mission.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/mission.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nservices/mission.js: line 51, col 11, \'rapport\' is already defined.\nservices/mission.js: line 81, col 13, \'rapport\' is already defined.\nservices/mission.js: line 92, col 12, \'rapport\' used out of scope.\nservices/mission.js: line 112, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/mission.js: line 63, col 9, \'title\' is not defined.\nservices/mission.js: line 74, col 27, \'title\' is not defined.\nservices/mission.js: line 82, col 19, \'title\' is not defined.\nservices/mission.js: line 68, col 9, \'body\' is not defined.\nservices/mission.js: line 76, col 27, \'body\' is not defined.\nservices/mission.js: line 80, col 11, \'body\' is not defined.\nservices/mission.js: line 86, col 19, \'body\' is not defined.\nservices/mission.js: line 87, col 34, \'team\' is not defined.\n\n14 errors');
  });
});