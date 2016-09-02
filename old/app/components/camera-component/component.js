import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  
  mission: Ember.inject.service(),
  pictureTaken: false,
  index: null,
  classNames: ["camera-overlay"],
  webcam: null,

  _setup: function() {
    Webcam.set({
        width: 640,
        height: 480,
        dest_width: 640,
        dest_height: 480,
        image_format: 'jpeg',
        jpeg_quality: 90,
        force_flash: false,
        flip_horiz: true,
        fps: 45
    });
    Webcam.attach('#camera');
  }.on("didRender"),

  flipButtons: function() {
    Ember.$("#frozen").toggle();
    Ember.$("#snap").toggle();
  },

  actions: {
    snap: function() {
      Webcam.freeze();
      this.get("flipButtons")();
    },

    use: function() {
      var self = this;
        console.log(this.get("index"));
      Webcam.snap(function(data) {
        self.get("mission.structure." + self.get("index") + ".images").pushObject(data);
        self.get("close")(self.get("self"));
      });
    },

    retake: function() {
      Webcam.unfreeze();
      this.get("flipButtons")();
    }
  }
});
