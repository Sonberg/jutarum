define("client/components/mission-alert/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    store: _ember["default"].inject.service(),

    classNames: ["p1", "grey", "br", "mb1", "position-relative"],

    model: null,
    latest: null,
    _setup: (function () {
      var arr = this.get("model");
      //this.set("latest", this.get("store").find("mission", arr.content[4].id));
    }).on("init"),
    actions: {
      close: function close() {
        var el = this.element;
        _ember["default"].$(el).animate({ left: "-3000" }, 500, function () {
          _ember["default"].$(el).slideUp(function () {
            _ember["default"].$(el).remove();
          });
        });
      }
    }
  });
});