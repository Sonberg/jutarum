define('client/tests/components/edit-student/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/edit-student/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-student/component.js should pass jshint.\ncomponents/edit-student/component.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/edit-student/component.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/edit-student/component.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/edit-student/component.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/edit-student/component.js: line 92, col 13, \'mission\' is already defined.\ncomponents/edit-student/component.js: line 62, col 20, \'$\' is not defined.\ncomponents/edit-student/component.js: line 3, col 8, \'PDFObject\' is defined but never used.\n\n7 errors');
  });
});