define("client/controllers/structure", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    mission: _ember["default"].inject.service(),
    group: ["Utseende", "Fortplantning", "Föda", "Bostad", "Fiender"],
    selected: [],

    init: function init() {
      this._super();
      _ember["default"].run.schedule("afterRender", this, function () {
        this.set("mission.tab", "Stödstruktur");
        this.set("selected", []);
        for (var i = 0; i < this.get("mission.structure.length"); i++) {
          this.get("selected").push(this.get("mission.structure." + i + ".title"));
        }
      });
    },

    save: function save(self) {
      var arr = [];
      var selected = self.get("selected");
      for (var i = 0; i < selected.length; i++) {
        arr.push({
          "title": selected[i],
          "images": [],
          "knowledge": [],
          "explore": []
        });
      }

      self.set("mission.structure", arr);
    },

    actions: {
      select: function select(name) {
        if (this.get("selected.length") < 4) {
          var index = this.get("group").indexOf(name);
          this.get("selected").pushObject(name);

          if (index > -1) {
            this.get("group").removeObject(this.get("group." + index));
          }

          this.get("save")(this);
        }
      },
      remove: function remove(name) {
        var index = this.get("selected").indexOf(name);
        this.get("group").pushObject(name);

        if (index > -1) {
          this.get("selected").removeObject(this.get("selected." + index));
        }
        this.get("save")(this);
      }
    }
  });
});