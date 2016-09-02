define("client/routes/dashboard-students", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    model: function model(params) {
      return this.get("store").query("user", { schoolId: this.get("global.school.id"), type: "student" });
    }
  });
});