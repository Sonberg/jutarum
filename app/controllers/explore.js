import Ember from 'ember';

export default Ember.Controller.extend({
  // Check if stuckture is choose
  mission: Ember.inject.service(),
  
  init: function () {
    this._super();
    if(this.get("mission.structure.length") === 0) {
      Ember.run.schedule("afterRender", this, function() {
          this.transitionToRoute('structure');
      });
    }
    
    Ember.run.schedule("render", this, function() {
        this.set("mission.tab", "Utforska");
    });
  }
});
