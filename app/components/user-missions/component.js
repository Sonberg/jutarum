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

    if (missions.length > 0 && rapports !== null) {
      self.set("new", Ember.A());
      self.set("old", Ember.A());
      for (var i = 0; i < missions.length; i++) {
        console.log("miss");
        if (self.get("new.length") + self.get("old.length") <= missions.length) {
          if (rapports) {
            console.log("got rapport");
            self.get("inRapport")(rapports, missions[i], self);
          } else {
            self.get("new").pushObject(missions[i]);
          }
          
          if (self.get("reloadBtn")) {
            self.get("reloadBtn").stop();
          }
        }
      }
    }
    
  }.observes("missions.[]").on("init"),
  
  _refresh: function() {
    this.get("setup")();
  },

  rapports: Ember.computed('model.rapports.@each', function() {

      var arr = this.get('store').peekAll("rapport").filter(function(item, index, enumerable) {
        if (item.data["mission-id"] !== null) {
          return true;
        }
      }).map(function(rapport, index, enumerable) {
        console.log(rapport);
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
    if (Object.prototype.toString.call(rapports) === '[object Array]' ) {
      for (var i = 0; i < rapports.length; i++) {
        var rapport = rapports[i];
        var missionId = parseInt(rapport["mission-id"]);
        
        if (id === missionId) {
          var team = JSON.parse(rapport["team"]);
          if (Object.prototype.toString.call(team) === '[object Array]' ) {
            for (var t = 0; t < team.length; t++) {
              var user = parseInt(team[t].id);
              var me = parseInt(self.cookie.getCookie('user'));
              if (me === user) {
                self.get("old").pushObject(mission);
                return true;
              }
            }
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