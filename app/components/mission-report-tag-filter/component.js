import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ["menu-margin"],
  params: null,
  _setup: function () {
    this.set("params", this.router.router.state.fullQueryParams);
  }.on("init"),
  
  missions: function() {
    return this.get("store").findAll("mission");
  }.property("missions"),

  users: function() {
    return this.get("store").findAll("user");
  }.property("users"),

  classes: function() {
    return this.get("store").findAll("class");
  }.property("classes"),
  
  actions : {
    filterMission: function(value) {
      this.router.transitionTo({ queryParams: { mission: value }});
    },
    filterUser: function(value) {
      this.router.transitionTo({ queryParams: { user: value }});
    },
    filterClass: function(value) {
      this.router.transitionTo({ queryParams: { class: value }});
    }
  }
});
