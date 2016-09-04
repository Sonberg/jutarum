define("client/components/mission-component/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    mission: _ember["default"].inject.service(),
    route: null,
    _setup: (function () {
      if (this.get("mission.routes").indexOf(this.get("mission.route")) > -1) {
        this.set("mission.activeTab", this.get("mission.route"));
      } else if (false) {} else {
        //this.transitionTo('/missions/10/not-found');
      }

      if (this.get("mission.route") === "write") {
        this.set("mission.steps.6.title", "Spara och stäng");
        _ember["default"].$(".next").addClass("ready");
      } else {
        this.set("mission.steps.6.title", "Vidare");
        _ember["default"].$(".next").removeClass("ready");
      }
    }).on("init").observes("mission.route")
  });
});