import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["animated-hover", "faa-parent", "button", "secondary", "mission"],
  isShowingModal: false,
  model: null,
  mouseOver: false,
  
  mouseEnter: function(e) {
    this.set("hoverActive", true);
  },
  mouseLeave: function(e) {
    this.set("hoverActive", false);
  },

  actions: {
    toggleModal: function() {
      console.log("toggle");
      this.toggleProperty('isShowingModal');
    }
  }
});
