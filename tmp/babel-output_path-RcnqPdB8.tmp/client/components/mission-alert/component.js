define("client/components/mission-alert/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    classNames: ["p1", "grey", "br", "mx2", "position-relative"],
    model: null,
    latest: (function () {
      if (this.get("model")) {
        console.log(this.get("model"));
        return this.get("missions");
      }
    }).observes("model.[]").on("init").property("latest"),

    missions: _ember["default"].computed('model.@each', function () {
      var model = this.get('model');
      if (model) {
        var arr = model.map(function (mission, index, enumerable) {
          if (index === 0) {
            return mission.get("name");
          }
        });
        return arr;
      }
    }),

    actions: {
      close: function close() {
        var el = this.element;
        _ember["default"].$(el).animate({
          left: "-3000"
        }, 500, function () {
          _ember["default"].$(el).slideUp(function () {
            _ember["default"].$(el).remove();
          });
        });
      }
    }
  });
});