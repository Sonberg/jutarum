import Ember from 'ember';
import helper from '../utils/helper';

export default Ember.Controller.extend({
  global: Ember.inject.service(),
  isAuthenticated: false,
  _watch: function() {
    helper.removeHoverCSSRule();
    
    if (this.get("global.user") && this.get("global.school")) {
      this.set("isAuthenticated", true);  
    } else {
    this.set("isAuthenticated", false);
    }
  }.on("init").observes("global.user")
});
