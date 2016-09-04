define("client/controllers/index", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    global: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    "new": _ember["default"].A(),
    old: _ember["default"].A(),

    _setup: (function () {
      var self = this;
      var model = this.get("store").peekAll("mission");
      var rapports = this.get("store").peekAll("rapport");

      model.forEach(function (mission) {
        rapports.forEach(function (rapport) {
          var team = JSON.parse(rapport.get("team"));
          var inTeam = false;
          for (var i = 0; i < team.length; i++) {
            if (team[i].id === self.get("global.user.id")) {
              inTeam = true;
            }
          }

          if (!inTeam) {
            if (parseInt(rapport.get("mission-id")) && parseInt(mission.get("id"))) {
              if (parseInt(rapport.get("mission-id")) !== parseInt(mission.get("id"))) {
                self.get("new").pushObject(mission);
              }
            }
          }
          inTeam = false;
        });
      });
    }).on("init")
  });
});