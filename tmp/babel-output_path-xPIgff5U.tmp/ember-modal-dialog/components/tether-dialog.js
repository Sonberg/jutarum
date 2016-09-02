define('ember-modal-dialog/components/tether-dialog', ['exports', 'ember', 'ember-modal-dialog/components/modal-dialog', 'ember-modal-dialog/templates/components/tether-dialog'], function (exports, _ember, _emberModalDialogComponentsModalDialog, _emberModalDialogTemplatesComponentsTetherDialog) {
  'use strict';

  var dasherize = _ember['default'].String.dasherize;
  var computed = _ember['default'].computed;
  var get = _ember['default'].get;

  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  exports['default'] = _emberModalDialogComponentsModalDialog['default'].extend({
    layout: _emberModalDialogTemplatesComponentsTetherDialog['default'],

    targetAttachmentClass: computed('targetAttachment', function () {
      var targetAttachment = this.get('targetAttachment') || '';
      return 'ember-modal-dialog-target-attachment-' + dasherize(targetAttachment);
    }),

    targetAttachment: 'middle center',
    attachment: 'middle center',
    hasOverlay: true,
    target: 'viewport', // element, css selector, view instance, 'viewport', or 'scroll-handle'

    tetherClassPrefix: 'ember-tether',
    // offset - passed in
    // targetOffset - passed in
    // targetModifier - passed in

    makeOverlayClickableOnIOS: _ember['default'].on('didInsertElement', function () {
      if (isIOS && get(this, 'hasOverlay')) {
        _ember['default'].$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
      }
    })

  });
});