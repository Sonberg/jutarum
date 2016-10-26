import Ember from 'ember';
import layout from '../templates/components/ember-load-remover';

var inject = Ember.inject;

export default Ember.Component.extend({
  layout: layout,
  'ember-load-config': inject.service(),
  didInsertElement: function didInsertElement() {
    this._super.apply(this, arguments);
    var loadingIndicatorClass = this.get('ember-load-config.loadingIndicatorClass') || 'ember-load-indicator';
  }
});