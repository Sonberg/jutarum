define('client/tests/initializers/test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'initializers/test.js should pass jshint.\ninitializers/test.js: line 1, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ninitializers/test.js: line 6, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ninitializers/test.js: line 10, col 2, Missing semicolon.\n\n3 errors');
  });
});