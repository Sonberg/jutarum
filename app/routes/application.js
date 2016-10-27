import Ember from 'ember';

export default Ember.Route.extend({
  global: Ember.inject.service(),
  store: Ember.inject.service(),
  transition: null,
  beforeModel: function(transition) {
    this.set("transition", transition)
    this.get("check")(this.controllerFor('application'), transition);
  },
  check: function(self, transition) {
    
    if (self.cookie) {
      if (self.get("global.user") === null || self.get("global.school") === null) {
        var school = self.cookie.getCookie('school');
        var user = self.cookie.getCookie('user');
        if (school && user) {
          self.set("global.school", self.get("store").find("school", school));
          self.set("global.user", self.get("store").find("user", user));

          if (transition.targetName === "login") {
            self.transitionToRoute('index');
          }
        } else {
          self.transitionToRoute('login');
        }
      }
    }
  },
  
  setupController: function(controller, model) {
    var transition = this.get("transition");
    if (transition) {
        if (transition.handlerInfos.length > 1) {
          var path = transition.handlerInfos[1].name;
          controller.set("path", path);
        }
      
    }
  },

  actions: {
    didTransition: function() {
      this.get("check")(this, null);
    }
  }
});