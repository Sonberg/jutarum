define("client/routes/index", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    beforeModel: function beforeModel() {
      if (!this.get("global.school.id")) {
        this.transitionTo("login");
        return false;
      }
    },
    model: function model(params) {
      console.log(params);
      if (this.get("global.school.id")) {
        this.get("store").query("rapport", { "school-id": this.get("global.school.id") });
        return this.get("store").query("mission", { "school-id": this.get("global.school.id") });
      }
    }
  });
});