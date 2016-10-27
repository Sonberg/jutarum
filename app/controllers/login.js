import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  global: Ember.inject.service(),
  
  school: null,
  user: null,
  users: null,
  
  _fetch: function() {
    var school = this.get("school");
    if (school) {
      var data = this.get("store").query("user", {schoolId : school}); 
      this.set("users", data);
    }
  }.observes("school"),
  
  init: function () {
    this._super();
    
    Ember.run.schedule("afterRender", this, function() {
      var school = this.cookie.getCookie('school');
      var user =  this.cookie.getCookie('user');
      if (school && user) {
        this.set("global.school", this.get("store").find("school", school));
        this.set("global.user", this.get("store").find("user", user));
        this.transitionToRoute('index');
      }
    });
  },
  
  actions: {
    submit: function() {
      this.set("global.school", this.get("store").peekRecord("school", this.get("school")));
      this.set("global.user", this.get("store").peekRecord("user", this.get("user")));
      this.cookie.setCookie('school', this.get("school"), { expires: 7, path: '/' });
      this.cookie.setCookie('user', this.get("user"), { expires: 7, path: '/' });
      window.location.reload(true);
    }
  }
});
