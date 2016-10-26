define("client/routes/mission", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    global: _ember["default"].inject.service(),

    model: function model(params) {
      var model = this.store.find("mission", params.mission_id);
      this.set("mission.model", model);
      return model;
    },

    beforeModel: function beforeModel(transition) {
      if (this.get("mission.lastRapport") === null) {
        this.transitionTo('team');
      }
    },

    setupController: function setupController(controller, model) {
      controller.set('model', model);
      this.set("global.mission", model);
    },

    checkRoute: function checkRoute(transition, self) {
      /* Validate input before contiune */
      if (self.get("mission.team.length") === 0) {
        console.log("sending to team");
        self.transitionTo('team');
        return true;
      }
      if (self.get("mission.structure.length") === 0 && transition.targetName !== "knowledge") {
        self.transitionTo('structure');
        return true;
      }
    },

    actions: {
      willTransition: function willTransition(transition) {
        // Transition from route outside mission
        if (this.router.router.currentHandlerInfos[1].name !== "mission") {
          // Return to last known location
          if (self.get("mission.lastRoute")) {
            var last = self.get("mission.lastRoute");
            if (last !== "index") {
              self.transitionTo(last);
            }
          }
        }

        this.get("checkRoute")(transition, this);

        if (transition.targetName === "index") {
          this.set("mission.tab", "");
          //  this.get("mission.createRecord")(this.get("mission"));
        }
      },

      didTransition: function didTransition(transition) {
        var routes = this.get("mission.routes");
        console.log(this.router.router.currentHandlerInfos);
        if (this.router.router.currentHandlerInfos[2].name) {
          var current = this.router.router.currentHandlerInfos[2].name;
          if (routes.indexOf(current) != -1) {
            var index = routes.indexOf(current);
            this.set("mission.backParams.route", routes[index - 1]);
            this.set("mission.nextParams.route", routes[index + 1]);
          }
          if (current !== "index") {

            this.set("mission.tab", "");
          }
          this.set("mission.lastRoute", current);
          return true;
        }
      }
    }

  });
});