define('client/tests/helpers/timeago.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/timeago.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/timeago.js should pass jshint.\nhelpers/timeago.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/timeago.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/timeago.js: line 13, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/timeago.js: line 4, col 3, \'moment\' is not defined.\nhelpers/timeago.js: line 6, col 14, \'moment\' is not defined.\n\n5 errors');
  });
});