import Ember from 'ember';

export default Ember.Component.extend({
  mission: Ember.inject.service(),
  prefix: null,
  text: null,
  params: null,
  
  _setup: function() {
    this.set("text", this.get("mission." + this.get("prefix") + "Text"));
    this.set("params", this.get("mission." + this.get("prefix") + "Params"));
  }.on("init")
});
