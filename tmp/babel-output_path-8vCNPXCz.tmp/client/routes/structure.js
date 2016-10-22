define("client/routes/structure", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    actions: {
      willTransition: function willTransition(transition) {
        if (this.get("mission.structure.length") === 0) {
          transition.abort();
        }
        this.get("mission.updateRecord")("structure", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
      }
    }
  });
});