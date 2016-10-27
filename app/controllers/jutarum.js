import Ember from 'ember';

export default Ember.Controller.extend({
  init: function () {
    this._super();
    Ember.run.schedule("afterRender", this, function() {
        this.transitionToRoute('index');
    });
  },
});
