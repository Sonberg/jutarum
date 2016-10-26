define('client/tests/routes/write.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/write.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/write.js should pass jshint.\nroutes/write.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/write.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/write.js: line 6, col 13, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/write.js: line 11, col 44, Missing semicolon.\n\n4 errors');
  });
});