import Ember from 'ember';

export default Ember.Component.extend({
  template: "chapter",
  actions: {
    select: function(obj) {
      this.set("parent.selected", obj);
    }
  }
});
