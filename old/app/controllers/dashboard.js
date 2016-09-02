import Ember from 'ember';

export default Ember.Controller.extend({
  loaded: false,
  _animation: function() {
    this.set("loaded", true);
  }.on("init")
});
