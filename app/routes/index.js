import Ember from 'ember';

export default Ember.Route.extend({
  global: Ember.inject.service(),
  beforeModel() {
    if (!this.get("global.school.id")) {
      this.transitionTo("login");
      return false;
    }
  },
  model(params) {
    console.log(params);
    if (this.get("global.school.id")) {
        this.get("store").query("rapport", { "school-id" : this.get("global.school.id")});
        return this.get("store").query("mission", { "school-id" : this.get("global.school.id")});
    }
  }
});
