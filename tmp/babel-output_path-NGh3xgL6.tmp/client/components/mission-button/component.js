define("client/components/mission-button/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    classNames: ["animated-hover", "faa-parent", "button", "secondary", "mission"],
    isShowingModal: false,
    model: null,
    mouseOver: false,

    mouseEnter: function mouseEnter(e) {
      this.set("hoverActive", true);
    },
    mouseLeave: function mouseLeave(e) {
      this.set("hoverActive", false);
    },

    actions: {
      toggleModal: function toggleModal() {
        console.log("toggle");
        this.toggleProperty('isShowingModal');
      }
    }
  });
});