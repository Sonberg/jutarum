define('emberx-file-input/components/x-file-input', ['exports', 'ember', 'emberx-file-input/templates/components/x-file-input'], function (exports, _ember, _emberxFileInputTemplatesComponentsXFileInput) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    classNameBindings: [':x-file-input', 'disabled:x-file-input--disabled'],
    attributeBindings: ['accept'],
    tagName: 'span',
    layout: _emberxFileInputTemplatesComponentsXFileInput['default'],
    tabindex: 0,

    /**
     * Listens for change events on the native file input and dispatches
     * the corresponding action up the context chain.
     *
     * @private
     * @method
     * @param {$.Event} e Native change event
     */
    change: function change(e) {
      this.sendAction("action", e.target.files);
    },

    randomId: _ember['default'].computed(function () {
      return Math.random().toString(36).substring(7);
    })
  });
});