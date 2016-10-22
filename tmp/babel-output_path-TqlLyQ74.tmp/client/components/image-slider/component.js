define("client/components/image-slider/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    store: _ember["default"].inject.service(),
    classNames: ["flex", "grey"],
    id: null,
    images: null,
    _setup: (function () {
      var self = this;
      console.log(this.get("id"));
      this.get("store").query("image", { "rapport-id": this.get("id") }).then(function (images) {
        self.set("images", images);
      });
    }).on("init").observes("id")
  });
});