define("client/routes/index", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    beforeModel: function beforeModel() {
      if (!this.get("global.school.id")) {
        //this.transitionTo("login");
        return false;
      }
    },
    model: function model(params) {
      if (this.get("global.school.id")) {
        return this.get("store").query("mission", { "school-id": this.get("global.school.id") });
      }
    },

    setupController: function setupController(controller, model) {
      controller.set('model', {
        "missions": this.get("store").query("mission", { "school-id": this.get("global.school.id") }),
        "rapports": this.get("store").query("rapport", { "school-id": this.get("global.school.id") })

      });
      //this.set("global.mission", model);
    }
  });
});