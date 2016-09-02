import Ember from 'ember';

export default Ember.Component.extend({
  global: Ember.inject.service(),
  mission: Ember.inject.service(),
  activeTab: function() {
    return this.get("mission.tab");
  }.observes("mission.tab").on("init").property("activeTab"),

  _jQuery: function() {
    $('#menu-dropit').dropit({
      action: 'mouseenter',
      triggerEl: 'b', // The trigger element
    });
  }.on("didInsertElement"),

  _jQueasdry: function() {
    $('#menu-dropit2').dropit({
      action: 'mouseenter',
      triggerEl: 'b', // The trigger element
    });
  }.on("didInsertElement"),
  
  actions: {
    logout: function() {
      this.set("global.user", null);
      this.set("global.school", null);
    }
  }

});
