import Ember from 'ember';

export default Ember.Route.extend({
  global: Ember.inject.service(),
  model(params) {
    return this.get("store").query("user", { schoolId: this.get("global.school.id"), type : "student"});
  }
});
