define("client/routes/explore", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    actions: {
      willTransition: function willTransition(transition) {
        this.get("mission.updateRecord")("structure", this.router.router.currentHandlerInfos[1].name, this.get("mission"));

        if (transition.targetName === "write") {
          this.set("mission.nextText", "Spara");
        } else {
          this.set("mission.nextText", "Nästa");
        }
      }
    }
  });
});