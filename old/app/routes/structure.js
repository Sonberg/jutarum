import Ember from 'ember';

export default Ember.Route.extend({
  mission: Ember.inject.service(),
  store: Ember.inject.service(),
  actions: {
    willTransition: function(transition) {
      if (this.get("mission.structure.length") === 0) {
          transition.abort();
      }
      this.get("mission.updateRecord")("structure", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
    }
  }
});
