import Ember from 'ember';

export default Ember.Route.extend({
  global: Ember.inject.service(),
  actions: {
    didTransition: function() {
    //  if (this.controller.currentPath !== "login") {
        if (this.get("global.user") === null || this.get("global.school") === null) {
          console.log("login");
          this.transitionTo('login');
        }
      //}
    }
  }
});