define('ember-modal-dialog/components/modal-dialog', ['exports', 'ember', 'ember-modal-dialog/templates/components/modal-dialog'], function (exports, _ember, _emberModalDialogTemplatesComponentsModalDialog) {
  'use strict';

  var dasherize = _ember['default'].String.dasherize;
  var $ = _ember['default'].$;
  var computed = _ember['default'].computed;
  var inject = _ember['default'].inject;
  var oneWay = computed.oneWay;

  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  var computedJoin = function computedJoin(prop) {
    return computed(prop, function () {
      return this.get(prop).join(' ');
    });
  };

  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    layout: _emberModalDialogTemplatesComponentsModalDialog['default'],
    modalService: inject.service('modal-dialog'),
    destinationElementId: oneWay('modalService.destinationElementId'),

    // container-class - set this from templates
    containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition
    containerClassNamesString: computedJoin('containerClassNames'),

    // 'overlay-class - set this from templates
    overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition
    overlayClassNamesString: computedJoin('overlayClassNames'),

    // 'wrapper-class - set this from templates
    wrapperClassNames: ['ember-modal-wrapper'], // set this in a subclass definition
    wrapperClassNamesString: computedJoin('wrapperClassNames'),

    concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],

    targetAttachmentClass: computed('targetAttachment', function () {
      var targetAttachment = this.get('targetAttachment') || '';
      // Convert tether-styled values like 'middle right' to 'right'
      targetAttachment = targetAttachment.split(' ').slice(-1)[0];
      return 'ember-modal-dialog-target-attachment-' + dasherize(targetAttachment);
    }),

    target: 'body', // element, css selector, or view instance
    targetAttachment: 'middle center',

    translucentOverlay: false,
    clickOutsideToClose: false,
    renderInPlace: false,

    makeOverlayClickableOnIOS: _ember['default'].on('didInsertElement', function () {
      if (isIOS) {
        _ember['default'].$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
      }
    }),

    didInsertElement: function didInsertElement() {
      var _this = this;

      if (!this.get('clickOutsideToClose')) {
        return;
      }

      var handleClick = function handleClick(event) {
        if (!$(event.target).closest('.ember-modal-dialog').length) {
          _this.send('close');
        }
      };
      var registerClick = function registerClick() {
        return $(document).on('click.ember-modal-dialog', handleClick);
      };

      // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
      setTimeout(registerClick);
      this._super.apply(this, arguments);
    },
    willDestroyElement: function willDestroyElement() {
      $(document).off('click.ember-modal-dialog');
      this._super.apply(this, arguments);
    },

    actions: {
      close: function close() {
        this.sendAction('close');
      }
    }
  });
});