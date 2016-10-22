/*globals document */
var hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementId, id) {
  if (!hasDOM) {
    return;
  }

  if (document.getElementById(id)) {
    return;
  }

  var rootEl = document.querySelector(rootElementId);
  var modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

export default function () {
  var application = arguments[1] || arguments[0];
  var emberModalDialog = application.emberModalDialog || {};
  var modalContainerElId = emberModalDialog.modalRootElementId || 'modal-overlays';

  application.register('config:modals-container-id', modalContainerElId, { instantiate: false });

  application.inject('service:modal-dialog', 'destinationElementId', 'config:modals-container-id');

  appendContainerElement(application.rootElement, modalContainerElId);
}