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
      this.get("mission.resetService")(this.get("mission"));
      
      this.cookie.setCookie('school', null, { expires: 7, path: '/' });
      this.cookie.setCookie('user', null, { expires: 7, path: '/' });
      this.cookie.removeCookie('user');
      this.cookie.removeCookie('school');
      
      Cookies.remove('user', { path: '' });
      Cookies.remove('school', { path: '' });
      Cookies.remove('user');
      Cookies.remove('school');
      Cookies.remove('user', { path: '/' });
      Cookies.remove('school', { path: '/' });
      Cookies.remove('user', { path: 'jutarum/' });
      Cookies.remove('school', { path: 'jutarum/' });
      this.set("global.user", null);
      this.set("global.school", null);
      this.router.transitionTo('login');
    }
  }

});
