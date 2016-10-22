import Ember from 'ember';

export default Ember.Controller.extend({
  global: Ember.inject.service(),
  store: Ember.inject.service(),
  new: Ember.A(),
  old: Ember.A(),

  _setup: function() {
    var self = this;
    console.log("setup");
    var rapports = this.get("store").findAll("rapport");
    this.get("store").findAll("mission").then(function(model) {
      self.set("new", Ember.A());
      self.set("old", Ember.A());
      model.forEach(function(mission) {
        self.get("inRapport")(mission, rapports, self);
      });
    });
  }.on("init"),

  inRapport: function(mission, rapports, self) {
  return rapports.forEach(function(rapport) {
    if (parseInt(mission.get("id")) === parseInt(rapport.data["mission-id"])) {
      var team = JSON.parse(rapport.data["team"]);
      for (var i = 0; i < team.length; i++) {
        if (parseInt(team[i].id) === parseInt(self.cookie.getCookie('user'))) {
          self.get("old").pushObject(mission);
          return true;
        }
      }
      self.get("new").pushObject(mission);
      return true;
    }
    self.get("new").pushObject(mission);
    return true;
  });
}
});

/*
var inRapport = function() {
  rapports.forEach(function(rapport) {
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
          return true;
        }
      }
    }
    inTeam = false;
  });
  return false;
}
*/