define('client/tests/components/news-component/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/news-component/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/news-component/component.js should pass jshint.\ncomponents/news-component/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/news-component/component.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});