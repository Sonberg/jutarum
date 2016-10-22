define("client/components/button-float/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    mission: _ember["default"].inject.service(),
    prefix: null,
    text: null,
    params: null,

    _setup: (function () {
      this.set("text", this.get("mission." + this.get("prefix") + "Text"));
      this.set("params", this.get("mission." + this.get("prefix") + "Params"));
    }).on("init").observes("mission.nextText", "mission.backText")
  });
});