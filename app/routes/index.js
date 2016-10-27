import Ember from 'ember';

export default Ember.Route.extend({
  global: Ember.inject.service(),
  beforeModel() {
    if (!this.get("global.school.id")) {
      return false;
    }
  },
  model(params) {
    if (this.get("global.school.id")) {
      return this.get("store").query("mission", {
        "school-id": this.get("global.school.id")
      })
    }
  },

  setupController: function(controller, model) {
    controller.set('model', {
      "missions": this.get("store").query("mission", {
        "school-id": this.get("global.school.id")
      }),
      "rapports": this.get("store").query("rapport", {
        "school-id": this.get("global.school.id")
      })

    });
    //this.set("global.mission", model);
  }
});