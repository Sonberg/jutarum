define("client/components/time-ago/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    tagName: "p",
    classNames: ["date"],
    model: null,
    text: null,
    time: 10000,
    timer: null,
    _watch: (function () {
      moment.locale('sv');
      var self = this;
      this.set("timer", setInterval(self.get("update"), self.get("time"), self));
      self.get("update")(self);
    }).on("init").observes("model.hasDirtyAttributes"),

    update: function update(self) {
      var model = self.get("model");
      if (model) {
        if (model.get("updated")) {
          var date = model.get("updated");
          var str = "Uppdaterades " + moment(date, "YYYYMMDD").fromNow();
        } else {
          var date = model.get("created");
          var str = "Skapades " + moment(date, "YYYYMMDD").fromNow();
        }
        self.set("time", self.get("time") * 1.5);
        self.set("text", str);
      }
    }
  });
});