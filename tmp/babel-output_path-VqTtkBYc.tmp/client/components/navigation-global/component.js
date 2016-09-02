define("client/components/navigation-global/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    global: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    activeTab: (function () {
      return this.get("mission.tab");
    }).observes("mission.tab").on("init").property("activeTab"),

    _jQuery: (function () {
      $('#menu-dropit').dropit({
        action: 'mouseenter',
        triggerEl: 'b' });
    }). // The trigger element
    on("didInsertElement"),

    _jQueasdry: (function () {
      $('#menu-dropit2').dropit({
        action: 'mouseenter',
        triggerEl: 'b' });
    }). // The trigger element
    on("didInsertElement"),

    actions: {
      logout: function logout() {
        this.set("global.user", null);
        this.set("global.school", null);
      }
    }

  });
});