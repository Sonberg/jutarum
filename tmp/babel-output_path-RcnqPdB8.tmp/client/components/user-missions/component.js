define("client/components/user-missions/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    global: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    model: null,
    "new": _ember["default"].A(),
    old: _ember["default"].A(),

    _setup: (function () {
      var self = this;
      console.log("setting up");
      var missions = self.get("missions");
      if (missions.length > 0) {
        self.set("new", _ember["default"].A());
        self.set("old", _ember["default"].A());
        self.get("missions").forEach(function (mission) {
          self.get("inRapport")(mission, self);
        });
      }
    }).observes("model.missions.[]", "model.rapports.[]").on("init"),

    rapports: _ember["default"].computed('model.rapports.@each', function () {
      var model = this.get('model.rapports');
      var arr = model.map(function (rapport, index, enumerable) {
        return {
          id: rapport.get("id"),
          team: rapport.get("team"),
          "mission-id": rapport.get("mission-id")
        };
      });
      return arr;
    }),

    missions: _ember["default"].computed('model.missions.@each', function () {
      var model = this.get('model.missions');
      var arr = model.map(function (mission, index, enumerable) {
        return mission;
      });
      return arr;
    }),

    inRapport: function inRapport(mission, self) {
      var id = parseInt(mission.get("id"));
      var rapports = self.get("rapports");
      for (var i = 0; i < rapports.length; i++) {
        var rapport = rapports[i];
        if (id === parseInt(rapport["mission-id"])) {
          var team = JSON.parse(rapport["team"]);
          for (var i = 0; i < team.length; i++) {
            if (parseInt(team[i].id) === parseInt(self.cookie.getCookie('user'))) {
              self.get("old").pushObject(mission);
              return true;
            }
          }
        }
      }
      self.get("new").pushObject(mission);
      return true;
    }
  });
});