define("client/routes/write", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    actions: {
      didTransition: function didTransition() {},
      willTransition: function willTransition(transition) {
        var self = this;
        var title = _ember["default"].$("#parse--title").html().trim();
        var body = _ember["default"].$("#parse--hook").html().trim();

        this.set("nextText", "Nästa");

        if (transition.targetName === "index") {
          this.get("mission.updateRecord")(null, this.router.router.currentHandlerInfos[1].name, this.get("mission"), function (rapport) {
            var structure = self.get("mission.removeImages")(self.get("mission"));
            rapport.set("name", title);
            rapport.set("body", body);
            rapport.set("structure", JSON.stringify(structure));
            rapport.save().then(function (newRapport) {
              if (newRapport.get("id")) {
                for (var i = 0; i < self.get("mission.images").length; i++) {
                  /* Spara bilder */
                  var image = self.get("store").createRecord('image', {
                    name: self.get("mission.images." + i + ".name"),
                    rapport_id: newRapport.get("id"),
                    image: self.get("mission.images." + i + ".image")
                  });
                  image.save();
                }
                self.get("mission.resetService")(self.get("mission"));
                return newRapport.get("id");
              }
              return false;
            });
          });
        } else {
          var rapport = this.get("mission.lastRapport");
          this.set("mission.nextText", "Nästa");
          rapport.set("name", title);
          rapport.set("body", body);
        }
      }
    }
  });
});