define('client/tests/initializers/component-router-injector.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/component-router-injector.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'initializers/component-router-injector.js should pass jshint.\ninitializers/component-router-injector.js: line 1, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ninitializers/component-router-injector.js: line 6, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});