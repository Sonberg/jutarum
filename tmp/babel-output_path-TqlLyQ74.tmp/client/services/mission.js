define("client/services/mission", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Service.extend({
    global: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    model: null,
    routes: ["index", "team", "structure", "knowledge", "explore", "write", "index"],
    lastRapport: null,
    lastRoute: null,
    tab: "",

    nextText: "Nästa",
    nextParams: {
      route: "structure"
    },
    backText: "Tillbaka",
    backParams: {
      route: "index"
    },

    title: null,
    body: null,
    structure: [],
    team: [],
    images: [],
    save: function save(data) {
      this.set("structure", data);
    },

    removeImages: function removeImages(self) {
      for (var i = 0; i < self.get("structure").length; i++) {
        self.set("structure." + i + ".images", null);
      }
      return self.get("structure");
    },

    updateRecord: function updateRecord(attr, route, self, callback) {
      // Transition inside mission
      if (route === "mission" && attr) {

        // No rappoort created
        if (!self.get("lastRapport")) {
          var rapport = self.get("store").createRecord("rapport", {
            "mission-id": self.get("model.id"),
            "school-id": self.get("global.school.id")
          });
          self.set("lastRapport", rapport);
        }

        var rapport = self.get("lastRapport");
        rapport.set(attr, JSON.stringify(self.get(attr)));
      }

      if (callback) {
        callback(self.get("lastRapport"));
      }
    },

    /* Not using */
    createRecord: function createRecord(self) {

      /* Validate input */
      if (title.length < 5) {
        return false;
      }

      if (body.length < 5) {
        return false;
      }

      if (self.get("lastRapport")) {
        var rapport = self.get("store").peekRecord('rapport', self.get("lastRapport"));
        rapport.set("name", title);
        rapport.set("structure", JSON.stringify(self.get("removeImages")(self)));
        rapport.set("body", body);
        rapport.set("school-id", self.get("global.school.id"));
        rapport.set("team", JSON.stringify);
      } else {
        if (body) {
          var rapport = self.get("store").createRecord('rapport', {
            "name": title,
            "mission-id": self.get("model.id"),
            "structure": JSON.stringify(self.get("removeImages")(self)),
            "school-id": self.get("global.school.id"),
            "body": body,
            "team": JSON.stringify(team)
          });
        }
      }
      console.log(self.get("images"));
      return rapport.save().then(function (newRapport) {
        console.log("save");
        if (newRapport.get("id")) {
          console.log("got id");
          console.log(self.get("images"));
          for (var i = 0; i < self.get("images.length"); i++) {
            console.log(self.get("images." + i + ".image.length"));
            var pic = self.get("resize")(self.get("images." + i + ".image"));
            console.log(pic.length);

            /* Spara bilder */
            var image = self.get("store").createRecord('image', {
              name: self.get("images." + i + ".name"),
              rapport_id: newRapport.get("id"),
              image: pic
            });
            image.save();
          }
          self.get("resetService")(self);
          return newRapport.get("id");
        }
        return false;
      });
    },

    resize: function resize(image) {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var cw = canvas.width;
      var ch = canvas.height;

      // limit the image to 150x100 maximum size
      var maxW = 500;
      var maxH = 500;
      var iw = img.width;
      var ih = img.height;
      var scale = Math.min(maxW / iw, maxH / ih);
      var iwScaled = iw * scale;
      var ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
      return canvas.toDataURL();
    },

    resetService: function resetService(self) {
      self.set("structure", []);
      self.set("team", []);
      self.set("images", []);
      self.set("model", null);
      self.set("lastRoute", null);
      self.set("lastRapport", null);
    }
  });

  /*
  steps: [{
    active: true,
    isDisabled: false,
    title: "Välj studiekamrat",
    classNames: "",
    linkTo: "team",
    linkParams: "",
    action: null
  }, {
    active: false,
    isDisabled: false,
    title: "Välj stödstruktur",
    classNames: "",
    linkTo: "structure",
    linkParams: "",
    action: null
  }, {
    active: false,
    title: "Fyll i förkunskaper",
    classNames: "",
    linkTo: "knowledge",
    linkParams: "",
    action: null
  }, {
    active: false,
    isDisabled: false,
    title: "Samla information",
    classNames: "",
    linkTo: "explore",
    linkParams: "",
    action: null
  }, {
    active: false,
    isDisabled: false,
    title: "Rapport",
    classNames: "",
    linkTo: "write",
    linkParams: "",
    action: null
  }, {
    active: false,
    isDisabled: false,
    title: "Vidare",
    classNames: "next",
    linkTo: "mission",
    linkParams: null,
    action: "next"
  }],
  */
});