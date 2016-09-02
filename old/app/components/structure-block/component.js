import Ember from 'ember';

export default Ember.Component.extend({
  mission: Ember.inject.service(),
  classNames: ["block"],
  index: null,
  cameraVisible: false,

  data: function() {
    return this.get("mission.structure." + this.get("index"));
  }.on("init").observes("mission.structure.[]").property("data"),

  editable: function() {
    if (this.get("data")) {
      return true;
    }
    return false;
  }.on("init").property("contenteditable"),

  rows: function() {
    var data = this.get("data." + this.get("type"));
    if (data.length === 0) {
      return [""];
    } else {
      return data;
    }
  }.on("init").property("inputs"),

  keyDown: function(e) {

    // Cant remove last dot
    if (e.keyCode === 8 || e.keyCode === 46 ) {
      if (Ember.$(this.element)[0].children[2].children.length === 1 ) {
        if (Ember.$(this.element)[0].children[2].children[0].textContent.length === 0) {
          e.preventDefault();
        }
      }
    }

    // Disable dubble enter
    if(e.keyCode === 13) {
      var text = this.get("returnString")(this);
      if (text.anchorNode.nodeType === 3) {
        return true;
      }
      return false;
    }
  },

  returnString: function (self) {
    var selectedText = "";
    if (window.getSelection) {
        selectedText = window.getSelection();
    } else if(document.selection) {
        selectedText = document.selection.createRange().text;
    }
    if (self) {
      self.set("selection", selectedText);
    }
    return selectedText;
  },
  toggleModal: function(self) {
    if(this) { var self = this; }
    self.toggleProperty("cameraVisible");

    if (self.get("cameraVisible")) {
      Webcam.on();
    } else {
      Webcam.reset();
    }
  },

  actions: {
    toggleModal: function() {
      if(this) { var self = this; }
      this.get("toggleModal")(self);
    },
     
     delete: function(img, index) {
       this.get("mission.structure." + index + ".images").removeObject(img);
     }
  }
});
