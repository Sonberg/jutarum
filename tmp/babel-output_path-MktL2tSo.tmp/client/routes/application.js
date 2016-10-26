define('client/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    global: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),
    beforeModel: function beforeModel(transition) {
      this.get("check")(this.controllerFor('application'), transition);
    },

    afterModel: function afterModel() {
      console.log("after");
      var loadingIndicatorClass = this.get('ember-load-config.loadingIndicatorClass') || 'ember-load-indicator';
      _ember['default'].$('.' + loadingIndicatorClass).remove();
    },
    check: function check(self, transition) {
      if (self.cookie) {
        if (self.get("global.user") === null || self.get("global.school") === null) {
          var school = self.cookie.getCookie('school');
          var user = self.cookie.getCookie('user');
          if (school && user) {
            self.set("global.school", self.get("store").find("school", school));
            self.set("global.user", self.get("store").find("user", user));

            if (transition.targetName === "login") {
              console.log("go to index");
              self.transitionToRoute('index');
            }
          } else {
            self.transitionToRoute('login');
          }
        }
      }
    },

    actions: {
      didTransition: function didTransition() {
        this.get("check")(this, null);
      }
    }
  });
});