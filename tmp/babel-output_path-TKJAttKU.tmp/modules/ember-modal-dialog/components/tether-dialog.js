import Ember from 'ember';
import ModalDialog from './modal-dialog';
import layout from '../templates/components/tether-dialog';

var dasherize = Ember.String.dasherize;
var computed = Ember.computed;
var get = Ember.get;

var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

export default ModalDialog.extend({
  layout: layout,

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

  makeOverlayClickableOnIOS: Ember.on('didInsertElement', function () {
    if (isIOS && get(this, 'hasOverlay')) {
      Ember.$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
    }
  })

});