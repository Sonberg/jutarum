define("client/components/step-component/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    navigator: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    route: null,
    model: null,

    next: (function (self) {
      if (this) {
        self = this;
      }
      var index = self.get("mission.routes").indexOf(self.get("router.currentRouteName")) + 1;
      var next = self.get("mission.steps." + index + ".linkTo");
      self.set("mission.steps.5.linkTo", next);
    }).on("init").observes("router.currentRouteName"),

    back: function back(self) {
      history.back();
    },

    actions: {
      choose: function choose(step) {
        if (step.action === "next") {
          this.get("next")(this);
        } else if (step === "back") {
          this.get("back")(this);
        }
      },

      createRecord: function createRecord() {
        this.get("mission.createRecord")(this.get("mission"));
      }
    }
  });
});