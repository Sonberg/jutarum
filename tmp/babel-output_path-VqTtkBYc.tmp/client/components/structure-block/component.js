define("client/components/structure-block/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    mission: _ember["default"].inject.service(),
    classNames: ["block"],
    index: null,
    cameraVisible: false,

    data: (function () {
      return this.get("mission.structure." + this.get("index"));
    }).on("init").observes("mission.structure.[]").property("data"),

    editable: (function () {
      if (this.get("data")) {
        return true;
      }
      return false;
    }).on("init").property("contenteditable"),

    rows: (function () {
      var data = this.get("data." + this.get("type"));
      if (data.length === 0) {
        return [""];
      } else {
        return data;
      }
    }).on("init").property("inputs"),

    keyDown: function keyDown(e) {

      // Cant remove last dot
      if (e.keyCode === 8 || e.keyCode === 46) {
        if (_ember["default"].$(this.element)[0].children[2].children.length === 1) {
          if (_ember["default"].$(this.element)[0].children[2].children[0].textContent.length === 0) {
            e.preventDefault();
          }
        }
      }

      // Disable dubble enter
      if (e.keyCode === 13) {
        var text = this.get("returnString")(this);
        if (text.anchorNode.nodeType === 3) {
          return true;
        }
        return false;
      }
    },

    returnString: function returnString(self) {
      var selectedText = "";
      if (window.getSelection) {
        selectedText = window.getSelection();
      } else if (document.selection) {
        selectedText = document.selection.createRange().text;
      }
      if (self) {
        self.set("selection", selectedText);
      }
      return selectedText;
    },
    toggleModal: function toggleModal(self) {
      if (this) {
        var self = this;
      }
      self.toggleProperty("cameraVisible");

      if (self.get("cameraVisible")) {
        Webcam.on();
      } else {
        Webcam.reset();
      }
    },

    actions: {
      toggleModal: function toggleModal() {
        if (this) {
          var self = this;
        }
        this.get("toggleModal")(self);
      },

      "delete": function _delete(img, index) {
        this.get("mission.structure." + index + ".images").removeObject(img);
      }
    }
  });
});