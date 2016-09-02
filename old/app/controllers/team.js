import Ember from 'ember';

export default Ember.Controller.extend({
  global: Ember.inject.service(),
  mission: Ember.inject.service(),
  store: Ember.inject.service(),
  users: null,
  group: [],
  selected: [],

  init: function() {
    this._super();
    var self = this;

    /* Retrive users from server */
    if (this.get("global.school.id")) {
      var users = this.get("store").peekAll("user");
      users.forEach(function(user) {
          if(user.get("type") !== "admin") {
            self.get("group").pushObject({
              id: user.get("id"),
              name: user.get("first-name") + " " + user.get("last-name")
            });
          }
      });
    }

    Ember.run.schedule("afterRender", this, function() {
      this.set("mission.tab", "Arbetsgrupp");
      this.set("selected", this.get("mission.team"));
    });
  },

  save: function(self) {
    console.log("save");
    var selected = self.get("selected");
    self.set("mission.team", selected);
  },
  actions: {
    select: function(person) {
      var index = this.get("group").indexOf(person);
      this.get("selected").pushObject(person);

      if (index > -1) {
        this.get("group").removeObject(person);
      }
      this.get("save")(this);
    },
    remove: function(person) {
      var index = this.get("selected").indexOf(person);
      this.get("group").pushObject(person);

      if (index > -1) {
        this.get("selected").removeObject(person);
      }
      this.get("save")(this);
    }
  }
});