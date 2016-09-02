import Ember from 'ember';

export default Ember.Controller.extend({
  global: Ember.inject.service(),
  store: Ember.inject.service(),
  new: Ember.A(),
  old: Ember.A(),

  _setup: function() {
    var self = this;
    var model = this.get("store").peekAll("mission");
    var rapports = this.get("store").peekAll("rapport");
    
    rapports.forEach(function(rapport) {
      model.forEach(function(mission) {
        var team = JSON.parse(rapport.get("team"));
        var inTeam = false;
        for (var i = 0; i < team.length; i++) {
          if(team[i].id === self.get("global.user.id")) {
            inTeam = true;
          }
        }
        if (inTeam) {
          if (parseInt(rapport.get("mission-id")) === parseInt(mission.get("id"))) {
            self.get("old").pushObject(mission);
          } else {
            self.get("new").pushObject(mission);
          }
        } else {
          self.get("new").pushObject(mission);
        }
      });
    });
  }.on("init")
});