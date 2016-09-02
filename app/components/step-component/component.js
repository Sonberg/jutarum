import Ember from 'ember';

export default Ember.Component.extend({
  navigator: Ember.inject.service(),
  mission: Ember.inject.service(),
  route: null,
  model: null,

  next: function(self) {
    if (this) { self = this }
    var index = self.get("mission.routes").indexOf(self.get("router.currentRouteName")) + 1;
    var next = self.get("mission.steps." + index + ".linkTo");
    self.set("mission.steps.5.linkTo", next);
  }.on("init").observes("router.currentRouteName"),

  back: function(self) {
    history.back();
  },

  actions: {
    choose: function(step) {
      if (step.action === "next") {
          this.get("next")(this);
      } else if(step === "back") {
        this.get("back")(this);
      }
    },
    
    createRecord: function() {
      this.get("mission.createRecord")(this.get("mission"));
    }
  }
});
