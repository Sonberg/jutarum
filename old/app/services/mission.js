import Ember from 'ember';

export default Ember.Service.extend({
  global: Ember.inject.service(),
  store: Ember.inject.service(),
  model: null,
  routes: ["index", "team", "structure", "knowledge", "explore", "write", "index"], 
  lastRapport: null,
  lastRoute: null,
  tab: "",
  
  nextText: "Next",
  nextParams: {
    route: "structure"
  },
  backText: "Back",
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

  createRecord: function(self) {
    
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
      rapport.set("team",JSON.stringify);
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
    
    return rapport.save().then(function(newRapport) {
      if (newRapport.get("id")) {
        
        for (var i = 0; i < self.get("images").length; i++) {
          /* Spara bilder */
          var image = self.get("store").createRecord('image', {
            name: self.get("images." + i + ".name"),
            rapport_id: newRapport.get("id"),
            image: self.get("images." + i + ".image")
          });
          image.save();
        }
        self.get("resetService")(self);
        return newRapport.get("id");
      }
      return false;
    });
    
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