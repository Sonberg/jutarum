define('client/tests/integration/components/news-component/component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/news-component/component-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/news-component/component-test.js should pass jshint.');
  });
});