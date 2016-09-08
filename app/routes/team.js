import Ember from 'ember';

export default Ember.Route.extend({
  global: Ember.inject.service(),
  mission: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    willTransition: function(transition) {
      var user = {
        id: this.get("global.user.id"),
        name: this.get("global.user.first-name") + " " + this.get("global.user.last-name")
      };
      
      if(this.get("mission.team").indexOf(user) === -1) {
        this.get("mission.team").pushObject(user);
      }
      
      this.get("mission.updateRecord")("team", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
    },
    didTransition: function(transition) {
      if (this.get("mission.structure")) {
        this.get("mission.resetService")(this.get("mission"));
      }
    } 
  }
});