define('client/tests/components/user-missions/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/user-missions/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/user-missions/component.js should pass jshint.\ncomponents/user-missions/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/user-missions/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/user-missions/component.js: line 14, col 11, \'self\' is already defined.\ncomponents/user-missions/component.js: line 56, col 38, [\'team\'] is better written in dot notation.\ncomponents/user-missions/component.js: line 57, col 18, \'i\' is already defined.\ncomponents/user-missions/component.js: line 70, col 27, \'Ladda\' is not defined.\ncomponents/user-missions/component.js: line 70, col 40, \'document\' is not defined.\n\n7 errors');
  });
});