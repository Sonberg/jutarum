define("client/controllers/dashboard", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    loaded: false,
    _animation: (function () {
      this.set("loaded", true);
    }).on("init")
  });
});