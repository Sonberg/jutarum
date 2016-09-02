import Ember from 'ember';

export default Ember.Controller.extend({
  mission: Ember.inject.service(),
  group: [
    "Utseende",
    "Fortplantning",
    "Föda",
    "Bostad",
    "Fiender"
  ],
  selected: [

  ],
  
  init: function () {
    this._super();
    Ember.run.schedule("afterRender", this, function() {
      this.set("mission.tab", "Stödstruktur");
      this.set("selected", []);
      for (var i = 0; i < this.get("mission.structure.length"); i++) {
        this.get("selected").push(this.get("mission.structure." + i + ".title"));
      }
    });
  },
  
  
  save: function(self) {
    var arr = [];
    var selected = self.get("selected");
    for (var i = 0; i < selected.length; i++) {
      arr.push({
        "title" : selected[i],
        "images" : [],
        "knowledge" : [],
        "explore" : []
      })
    }

    self.set("mission.structure", arr);
  },

  actions: {
    select: function(name) {
      if (this.get("selected.length") < 4) {
        var index = this.get("group").indexOf(name);
        this.get("selected").pushObject(name);

        if (index > -1) {
          this.get("group").removeObject(this.get("group." + index));
        }

        this.get("save")(this);
      }
    },
    remove: function(name) {
      var index = this.get("selected").indexOf(name);
      this.get("group").pushObject(name);

      if (index > -1) {
        this.get("selected").removeObject(this.get("selected." + index));
      }
      this.get("save")(this);
    }
  }
});
