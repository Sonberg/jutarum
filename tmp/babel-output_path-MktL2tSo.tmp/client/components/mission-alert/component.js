define("client/components/mission-alert/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    mission: _ember["default"].inject.service(),
    classNames: ["p1", "grey", "br", "mx2", "position-relative"],
    model: null,
    isVisible: (function () {
      var lastRapport = parseInt(this.get("mission.lastRapport.mission-id"));
      var lastestId = parseInt(this.get("latest").id);
      if (lastestId === lastRapport) {
        return false;
      }
      return true;
    }).observes("latest").on("init").property("isVisible"),
    latest: (function () {
      if (this.get("model")) {
        var missions = this.get("missions");
        return missions.get("lastObject");
      }
    }).observes("model.[]").on("init").property("latest"),

    missions: _ember["default"].computed('model.@each', function () {
      var model = this.get('model');
      if (model) {
        var arr = model.map(function (mission, index, enumerable) {
          return {
            "id": mission.get("id"),
            "name": mission.get("name")
          };
        });
        return arr;
      }
    }),

    actions: {
      close: function close() {
        var el = this.element;
        _ember["default"].$(el).animate({
          left: "-3000"
        }, 500, function () {
          _ember["default"].$(el).slideUp(function () {
            _ember["default"].$(el).remove();
          });
        });
      }
    }
  });
});