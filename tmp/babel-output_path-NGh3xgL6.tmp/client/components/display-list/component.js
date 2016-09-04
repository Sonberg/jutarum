define("client/components/display-list/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    template: "chapter",
    actions: {
      select: function select(obj) {
        this.set("parent.selected", obj);
      }
    }
  });
});