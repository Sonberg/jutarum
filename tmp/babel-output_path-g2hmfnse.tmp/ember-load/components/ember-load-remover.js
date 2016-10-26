define('ember-load/components/ember-load-remover', ['exports', 'ember', 'ember-load/templates/components/ember-load-remover'], function (exports, _ember, _emberLoadTemplatesComponentsEmberLoadRemover) {
  'use strict';

  var inject = _ember['default'].inject;

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberLoadTemplatesComponentsEmberLoadRemover['default'],
    'ember-load-config': inject.service(),
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var loadingIndicatorClass = this.get('ember-load-config.loadingIndicatorClass') || 'ember-load-indicator';
    }
  });
});