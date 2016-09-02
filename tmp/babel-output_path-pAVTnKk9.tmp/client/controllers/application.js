define("client/controllers/application", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    global: _ember["default"].inject.service(),
    isAuthenticated: false,
    _watch: (function () {
      console.log("watch");

      if (this.get("global.user") && this.get("global.school")) {
        this.set("isAuthenticated", true);
      } else {
        this.set("isAuthenticated", false);
      }
    }).on("init").observes("global.user")
  });
});