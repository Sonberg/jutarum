import Ember from 'ember';

export default Ember.Route.extend({
  mission: Ember.inject.service(),
  store: Ember.inject.service(),
  actions: {
    willTransition: function(transition) {
      this.get("mission.updateRecord")("structure", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
      
      if(transition.targetName === "write") {
        this.set("mission.nextText", "Spara");
      } else {
        this.set("mission.nextText", "Nästa");
      }
    }
  }
});
