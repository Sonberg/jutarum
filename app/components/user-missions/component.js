import Ember from 'ember';

export default Ember.Component.extend({
  global: Ember.inject.service(),
  store: Ember.inject.service(),
  mission: Ember.inject.service(),
  model: null,
  new: Ember.A(),
  old: Ember.A(),
  reloadBtn: null,

  setup: function(self) {
    if (this) {
      var self = this;  
    }
    console.log("setting up");
    var missions = self.get("missions");
    if (missions.length > 0) {
      self.set("new", Ember.A());
      self.set("old", Ember.A());
      self.get("missions").forEach(function(mission) {
        self.get("inRapport")(mission, self);
        if (self.get("reloadBtn")) {
          self.get("reloadBtn").stop();
        }
      });
    }
  }.observes("model.missions.[]", "model.rapports.[]").on("init"),

  rapports: Ember.computed('model.rapports.@each', function() {
    var model = this.get('model.rapports');
    var arr = model.map(function(rapport, index, enumerable) {
      return {
        id: rapport.get("id"),
        team: rapport.get("team"),
        "mission-id": rapport.get("mission-id")
      };
    });
    return arr;
  }),
  
  missions: Ember.computed('model.missions.@each', function() {
    var model = this.get('model.missions');
    var arr = model.map(function(mission, index, enumerable) {
      return mission;
    });
    return arr;
  }),

  inRapport: function(mission, self) {
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
  },
  
  _jQuery: function() {
    if (document.getElementById('reload')) {
        this.set("reloadBtn", Ladda.create(document.getElementById('reload')));
    }
  }.on("didInsertElement"),
  
  actions: {
    reload: function() {
      this.get("reloadBtn").start();
      this.get("setup")(this);
    }
  }
});