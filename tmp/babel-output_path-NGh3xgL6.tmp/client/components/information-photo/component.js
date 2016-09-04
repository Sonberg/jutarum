define("client/components/information-photo/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    classNames: ["information-photo"],
    attributeBindings: ["contenteditable"],
    contenteditable: false,
    url: null,
    placeholder: "+"
  });
});