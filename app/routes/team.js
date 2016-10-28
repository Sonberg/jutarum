import Ember from 'ember';

export default Ember.Route.extend({
  global: Ember.inject.service(),
  mission: Ember.inject.service(),
  store: Ember.inject.service(),

  model(params) {
    return this.get("store").findAll("user", {
      filter: {
        "school-id": this.get("global.school.id")
      }
    });
  },

  setupController(controller, model) {
    controller.set('model', model);
  },
  
  actions: {
    willTransition: function(transition) {
      var user = {
        id: this.get("global.user.id"),
        name: this.get("global.user.first-name") + " " + this.get("global.user.last-name")
      };

      if (this.get("mission.team").indexOf(user) === -1) {
        this.get("mission.team").pushObject(user);
      }

      this.get("mission.updateRecord")("team", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
    }
  }
});