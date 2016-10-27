import Ember from 'ember';

export default Ember.Component.extend({
  global: Ember.inject.service(),
  mission: Ember.inject.service(),
  activeTab: function() {
    return this.get("mission.tab");
  }.observes("mission.tab").on("init").property("activeTab"),

  _jQuery: function() {
    Ember.$('#menu-dropit').dropit({
      action: 'click',
      triggerEl: 'a'
    });
  }.on("didInsertElement"),
  
  actions: {
    logout: function() {
      this.cookie.removeCookie('user');
      this.cookie.removeCookie('school');
      this.set("global.user", null);
      this.set("global.school", null);
      window.location.reload(true);
    }
  }

});
