define('client/tests/helpers/mission-visible.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/mission-visible.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/mission-visible.js should pass jshint.\nhelpers/mission-visible.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/mission-visible.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/mission-visible.js: line 13, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });
});