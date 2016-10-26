define("client/components/navigation-global/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    global: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    activeTab: (function () {
      return this.get("mission.tab");
    }).observes("mission.tab").on("init").property("activeTab"),

    _jQuery: (function () {
      _ember["default"].$('#menu-dropit').dropit({
        action: 'click',
        triggerEl: 'a'
      });
    }).on("didInsertElement"),

    actions: {
      logout: function logout() {
        this.set("global.user", null);
        this.set("global.school", null);
      }
    }

  });
});