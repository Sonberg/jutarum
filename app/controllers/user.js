import Ember from 'ember';
import assets from '../utils/assets';

export default Ember.Controller.extend({
  avatars: [],
  init: function() {
    this._super();
    console.log("setup");
    var arr = [];
    var images = assets.avatars();
    for (var i = 0; i < images.length; i++) {
      arr.push(images[i].name);
    }
    this.set("avatars", arr);
    console.log(arr);
    Ember.run.schedule("render", this, function() {
      console.log("setup");
      var self = this;
      Ember.$(document).ready(function() {
        Ember.$(".select-avatar").select2({
          minimumResultsForSearch: Infinity,
          placeholder: "Välj bild",
          data: self.get("avatars"),
          templateSelection: self.get("formatImage"),
          templateResult: self.get("formatImage")
        });
      });
    });
  },

  formatImage: function(state) {
    var path = assets.path("avatars");
    var ex = assets.ext();
    if (!state.loading) {
      var $state = $(
        "<span class='ava'><img src=" + path + state.text + ex + " /></span>"
      );
      return $state;
    }
  },
});