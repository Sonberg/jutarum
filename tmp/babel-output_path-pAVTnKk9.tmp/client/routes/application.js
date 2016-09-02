define("client/routes/application", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    actions: {
      didTransition: function didTransition() {
        //  if (this.controller.currentPath !== "login") {
        if (this.get("global.user") === null || this.get("global.school") === null) {
          console.log("login");
          this.transitionTo('login');
        }
        //}
      }
    }
  });
});