define("client/routes/team", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),

    model: function model(params) {
      return this.get("store").findAll("user", {
        filter: {
          "school-id": this.get("global.school.id")
        }
      });
    },

    setupController: function setupController(controller, model) {
      controller.set('model', model);
    },

    actions: {
      willTransition: function willTransition(transition) {
        var user = {
          id: this.get("global.user.id"),
          name: this.get("global.user.first-name") + " " + this.get("global.user.last-name")
        };

        if (this.get("mission.team").indexOf(user) === -1) {
          this.get("mission.team").pushObject(user);
        }

        this.get("mission.updateRecord")("team", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
      },
      didTransition: function didTransition(transition) {
        if (this.get("mission.structure")) {
          this.get("mission.resetService")(this.get("mission"));
        }
      }
    }
  });
});