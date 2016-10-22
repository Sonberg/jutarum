import Ember from 'ember';

export default Ember.Controller.extend({
  global: Ember.inject.service(),
  mission: Ember.inject.service(),
  store: Ember.inject.service(),
  model: null,
  //group: [],
  selected: [],

  init: function() {
    this._super();
    var self = this;

    Ember.run.schedule("afterRender", this, function() {
      this.set("mission.tab", "Arbetsgrupp");
      this.set("selected", this.get("mission.team"));
    });
  },

  group: Ember.computed('model.@each', function() {
    var model = this.get('model');
    var arr = model.filterBy('type', "student").map(function(user, index, enumerable) {
      return {
        id: user.get("id"),
        name: user.get("first-name") + " " + user.get("last-name")
      };
    });

    return arr;
  }),

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