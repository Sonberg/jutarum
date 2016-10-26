define("client/controllers/team", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    global: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    model: null,
    //group: [],
    selected: [],

    init: function init() {
      this._super();
      var self = this;

      _ember["default"].run.schedule("afterRender", this, function () {
        this.set("mission.tab", "Arbetsgrupp");
        this.set("selected", this.get("mission.team"));
      });
    },

    group: _ember["default"].computed('model.@each', function () {
      var model = this.get('model');
      var arr = model.filterBy('type', "student").map(function (user, index, enumerable) {
        return {
          id: user.get("id"),
          name: user.get("first-name") + " " + user.get("last-name")
        };
      });

      return arr;
    }),

    save: function save(self) {
      console.log("save");
      var selected = self.get("selected");
      self.set("mission.team", selected);
    },
    actions: {
      select: function select(person) {
        var index = this.get("group").indexOf(person);
        this.get("selected").pushObject(person);

        if (index > -1) {
          this.get("group").removeObject(person);
        }
        this.get("save")(this);
      },
      remove: function remove(person) {
        var index = this.get("selected").indexOf(person);
        this.get("group").pushObject(person);

        if (index > -1) {
          this.get("selected").removeObject(person);
        }
        this.get("save")(this);
      }
    }
  });
});