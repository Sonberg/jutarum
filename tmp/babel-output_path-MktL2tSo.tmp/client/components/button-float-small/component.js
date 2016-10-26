define('client/components/button-float-small/component', ['exports', 'ember', 'npm:tether-drop'], function (exports, _ember, _npmTetherDrop) {
  exports['default'] = _ember['default'].Component.extend({
    mission: _ember['default'].inject.service(),
    prefix: null,
    text: null,
    params: null,
    _jQuery: (function () {
      var dropInstance = new _npmTetherDrop['default']({
        target: document.querySelector('.drop-target'),
        content: 'Welcome to the future',
        classes: 'drop-theme-arrows',
        position: 'top center',
        openOn: 'hover',
        hoverCloseDelay: 50
      });
    }).on("didInsertElement")
  });
});