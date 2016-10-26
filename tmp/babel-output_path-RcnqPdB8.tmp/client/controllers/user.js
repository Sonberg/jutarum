define('client/controllers/user', ['exports', 'ember', 'client/utils/assets'], function (exports, _ember, _clientUtilsAssets) {
  exports['default'] = _ember['default'].Controller.extend({
    avatars: [],
    init: function init() {
      this._super();
      console.log("setup");
      var arr = [];
      var images = _clientUtilsAssets['default'].avatars();
      for (var i = 0; i < images.length; i++) {
        arr.push(images[i].name);
      }
      this.set("avatars", arr);
      console.log(arr);
      _ember['default'].run.schedule("render", this, function () {
        console.log("setup");
        var self = this;
        _ember['default'].$(document).ready(function () {
          _ember['default'].$(".select-avatar").select2({
            minimumResultsForSearch: Infinity,
            placeholder: "Välj bild",
            data: self.get("avatars"),
            templateSelection: self.get("formatImage"),
            templateResult: self.get("formatImage")
          });
        });
      });
    },

    formatImage: function formatImage(state) {
      var path = _clientUtilsAssets['default'].path("avatars");
      var ex = _clientUtilsAssets['default'].ext();
      if (!state.loading) {
        var $state = $("<span class='ava'><img src=" + path + state.text + ex + " /></span>");
        return $state;
      }
    }
  });
});