define("client/controllers/write", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    mission: _ember["default"].inject.service(),

    init: function init() {
      this._super();
      _ember["default"].run.schedule("afterRender", this, function () {
        this.set("mission.tab", "Rapport");
      });
    },

    data: (function () {
      // Transition in strucutre is mission
      if (this.get("mission.structure.length") === 0) {
        this.get('router').transitionTo('mission', 'structure');
      }
      return this.get("mission.structure");
    }).on("init").property("data"),

    actions: {
      save: function save() {
        this.get("mission.createRecord")(this.get("mission"));
      },

      add: function add(index, title, img) {
        // Max 4 images
        if (this.get("mission.images.length") <= 4) {

          this.get("mission.images").pushObject({
            "name": title,
            "image": img,
            "index": index
          });
          this.get("mission.structure." + index + ".images").removeObject(img);
        }
      },

      remove: function remove(index, img) {
        var findImage = function findImage(img, arr) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].image === img) {
              console.log(arr[i]);
              return arr[i];
            }
          }
        };

        // Remove image
        this.get("mission.images").removeObject(findImage(img, this.get("mission.images")));
        this.get("mission.structure." + index + ".images").pushObject(img);
      }
    }
  });
});