define("client/components/query-filter-thead/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    tagName: "th",
    attr: "",
    title: "",
    icon: "caret-up",
    dir: "desc",

    click: function click(e) {
      var params = this.router.router.state.queryParams;
      this.get("setOrder")(params, this);
      this.get("setClass")(this.element);
    },

    _check: (function () {
      var params = this.router.router.state.queryParams;

      // Set default
      if (params.sort === this.get("attr")) {
        this.get("setClass")(this.element);
      }

      this.get("setOrder")(params, this);
    }).on("didInsertElement"),

    setClass: function setClass(el) {
      _ember["default"].$(".caret").removeClass("caret");
      _ember["default"].$(el).addClass("caret");
    },

    setOrder: function setOrder(params, self) {
      console.log("setOrder");
      console.log(params);
      if (self.get("dir") === "desc") {
        self.set("icon", "caret-down");
        self.set("dir", "asc");
      } else {
        self.set("icon", "caret-up");
        self.set("dir", "desc");
      }
    }
  });
});