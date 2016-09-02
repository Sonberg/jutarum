define('client/components/camera-component/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),

    mission: _ember['default'].inject.service(),
    pictureTaken: false,
    index: null,
    classNames: ["camera-overlay"],
    webcam: null,

    _setup: (function () {
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
    }).on("didRender"),

    flipButtons: function flipButtons() {
      _ember['default'].$("#frozen").toggle();
      _ember['default'].$("#snap").toggle();
    },

    actions: {
      snap: function snap() {
        Webcam.freeze();
        this.get("flipButtons")();
      },

      use: function use() {
        var self = this;
        console.log(this.get("index"));
        Webcam.snap(function (data) {
          self.get("mission.structure." + self.get("index") + ".images").pushObject(data);
          self.get("close")(self.get("self"));
        });
      },

      retake: function retake() {
        Webcam.unfreeze();
        this.get("flipButtons")();
      }
    }
  });
});