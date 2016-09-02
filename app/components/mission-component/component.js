import Ember from 'ember';

export default Ember.Component.extend({
  mission: Ember.inject.service(),
  route: null,
  _setup: function() {
    if (this.get("mission.routes").indexOf(this.get("mission.route")) > -1) {
      this.set("mission.activeTab", this.get("mission.route"));

    } else if (false) {

    } else {
       //this.transitionTo('/missions/10/not-found');
     }

     if (this.get("mission.route") === "write") {
       this.set("mission.steps.6.title", "Spara och stäng");
       Ember.$(".next").addClass("ready");
     } else {
       this.set("mission.steps.6.title", "Vidare");
       Ember.$(".next").removeClass("ready");
     }
  }.on("init").observes("mission.route")
});
