define("client/routes/dashboard-rapports", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model(params) {
      return this.get("store").findAll("rapport");
    }
  });
});