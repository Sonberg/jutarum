import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  
  classNames: ["p1", "grey", "br", "mb1", "position-relative"],
  
  model: null,
  latest: null,
  _setup: function() {
    var arr = this.get("model");
    //this.set("latest", this.get("store").find("mission", arr.content[4].id));
  }.on("init"),
  actions: {
    close: function() {
      var el = this.element;
      Ember.$(el).animate({left: "-3000"}, 500, function() {
        Ember.$(el).slideUp(function() {
          Ember.$(el).remove();
        }) 
      });
    }
  }
});
