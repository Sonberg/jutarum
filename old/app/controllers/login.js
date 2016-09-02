import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  global: Ember.inject.service(),
  
  school: null,
  user: null,
  users: null,
  
  _fetch: function() {
    var school = this.get("school");
    console.log(school);
    if (school) {
      var data = this.get("store").query("user", {schoolId : school}); 
      this.set("users", data);
    }
  }.observes("school"),
  
  actions: {
    submit: function() {
      this.set("global.school", this.get("store").peekRecord("school", this.get("school")));
      this.set("global.user", this.get("store").peekRecord("user", this.get("user")));
      console.log("submit");
    }
  }
});
