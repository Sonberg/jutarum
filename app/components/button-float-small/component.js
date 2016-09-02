import Ember from 'ember';
import Drop from 'npm:tether-drop';

export default Ember.Component.extend({
  mission: Ember.inject.service(),
  prefix: null,
  text: null,
  params: null,
  _jQuery: function() {
    let dropInstance = new Drop({
      target: document.querySelector('.drop-target'),
      content: 'Welcome to the future',
      classes: 'drop-theme-arrows',
      position: 'top center',
      openOn: 'hover',
      hoverCloseDelay: 50
    })
  }.on("didInsertElement")
});