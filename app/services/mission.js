import Ember from 'ember';
import _ from 'underscore';

export default Ember.Service.extend({
  global: Ember.inject.service(),
  store: Ember.inject.service(),
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
  save: function(data) {
    this.set("structure", data);
  },

  removeImages: function(self) {
    for (var i = 0; i < self.get("structure").length; i++) {
      self.set("structure." + i + ".images", null);
    }
    return self.get("structure");
  },

  updateRecord: function(attr, route, self, callback) {
    // Transition inside mission
    if (route === "mission" && attr) {
      console.log("route");
      // No rappoort created
      if (self.get("lastRapport") === null) {
        console.log("create");
        var rapport = self.get("store").createRecord("rapport", {
          "name": self.get("global.mission.name"),
          "mission-id": self.get("global.mission.id"),
          "school-id": self.get("global.school.id")
        });
        self.set("lastRapport", rapport);
      }

      var rapport = self.get("lastRapport");
      var data = _.uniq(self.get(attr), function(p){ return p.id; });
      console.log(data);
      rapport.set(attr, JSON.stringify(data));
    }

    if (callback) {
      callback(self.get("lastRapport"));
    }
  },

  resize: function(image) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;

    // limit the image to 150x100 maximum size
    var maxW = 500;
    var maxH = 500;
    var iw = img.width;
    var ih = img.height;
    var scale = Math.min((maxW / iw), (maxH / ih));
    var iwScaled = iw * scale;
    var ihScaled = ih * scale;
    canvas.width = iwScaled;
    canvas.height = ihScaled;
    ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
    return canvas.toDataURL();

  },

  resetService(self) {
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