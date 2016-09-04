define('ember-modal-dialog/components/modal-dialog-overlay', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    attributeBindings: ['data-ember-modal-dialog-overlay'],
    'data-ember-modal-dialog-overlay': true,

    // trigger only when clicking the overlay itself, not its children
    click: function click(event) {
      if (event.target === this.get('element')) {
        this.sendAction();
      }
    }
  });
});