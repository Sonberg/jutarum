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
    
    var missions = self.get("missions");
    var rapports = self.get("rapports");

    if (missions.length > 0) {
      self.set("new", Ember.A());
      self.set("old", Ember.A());
      self.get("missions").forEach(function(mission) {
        if (rapports) {
          self.get("inRapport")(rapports, mission, self);
        } else {
          self.get("new").pushObject(mission);
        }
        
        if (self.get("reloadBtn")) {
          self.get("reloadBtn").stop();
        }
      });
    }
    
  }.observes("missions.[]", "rapports.[]").on("init"),
  
  _refresh: function() {
    this.get("setup")();
  },

  rapports: Ember.computed('model.rapports.@each', function() {
    var model = this.get('model.rapports');
      var arr = model.filter(function(item, index, enumerable) {
        if (item.data["mission-id"] !== null) {
          return true;
        }
      }).map(function(rapport, index, enumerable) {
        return {
          id: rapport.get("id"),
          team: rapport.get("team"),
          "mission-id": rapport.get("mission-id")
        };
      });
      if (arr.length > 0) {
        return arr;
      }
  }),
  
  missions: Ember.computed('model.missions.@each', function() {
    var model = this.get('model.missions');
    var arr = model.map(function(mission, index, enumerable) {
      return mission;
    });
    return arr;
  }),

  inRapport: function(rapports, mission, self) {
    var id = parseInt(mission.get("id"));
    for (var i = 0; i < rapports.length; i++) {
      var rapport = rapports[i];
      var missionId = parseInt(rapport["mission-id"]);
      
      if (id === missionId) {
        var team = JSON.parse(rapport["team"]);
        if (team.length > 0) {
          for (var i = 0; i < team.length; i++) {
            var user = parseInt(team[i].id);
            var me = parseInt(self.cookie.getCookie('user'));
            
            if (me === user) {
              self.get("old").pushObject(mission);
              return true;
            }
          }
          console.log("is array");
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