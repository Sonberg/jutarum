define("client/controllers/team", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    global: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    users: null,
    group: [],
    selected: [],

    init: function init() {
      this._super();
      var self = this;

      /* Retrive users from server */
      if (this.get("global.school.id")) {
        var users = this.get("store").peekAll("user");
        users.forEach(function (user) {
          if (user.get("type") !== "admin") {
            self.get("group").pushObject({
              id: user.get("id"),
              name: user.get("first-name") + " " + user.get("last-name")
            });
          }
        });
      }

      _ember["default"].run.schedule("afterRender", this, function () {
        this.set("mission.tab", "Arbetsgrupp");
        this.set("selected", this.get("mission.team"));
      });
    },

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