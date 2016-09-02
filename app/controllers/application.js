import Ember from 'ember';

export default Ember.Controller.extend({
  global: Ember.inject.service(),
  isAuthenticated: false,
  _watch: function() {
    console.log("watch");
    
    if (this.get("global.user") && this.get("global.school")) {
      this.set("isAuthenticated", true);  
    } else {
    this.set("isAuthenticated", false);
    }
  }.on("init").observes("global.user")
});
