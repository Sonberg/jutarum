import Ember from 'ember';

export default Ember.Controller.extend({
  model: null,
  queryParams: ['mission', 'class', 'user'],
  updating: false,
  rapports: null,
  _watch: function() {
    var model = this.get('model');
    if (model) {
      var self = this;
      if (parseInt(self.mission) > 0) {
        model = model.filterBy("mission-id", parseInt(self.mission));
      }

      if (parseInt(self.user) > 0) {
        model = model.filter(function(item, index, enumerable) {
          var team = JSON.parse(item.get("team"));
          for (var i = 0; i < team.length; i++) {
            if (parseInt(team[i].id) === parseInt(self.user)) {
              return true;
            }
          }
        });
      }

      if (parseInt(self.class) > 0) {
        model = model.filterBy("class-id", parseInt(self.class))
      }

      var arr = model.map(function(rapport, index, enumerable) {
        return rapport;
      });
    }
    this.set("rapports", arr);
  }.observes("model.@each", "mission", "class", "user").on("init")
});