define('client/components/edit-mission/component', ['exports', 'ember', 'client/utils/assets', 'npm:pdfobject'], function (exports, _ember, _clientUtilsAssets, _npmPdfobject) {
  exports['default'] = _ember['default'].Component.extend({
    global: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),

    structures: ["Utseende", "Fortplantning", "Föda", "Bostad", "Fiender"],
    selected: null,
    icons: [],

    _setup: (function () {
      var arr = [];
      var images = _clientUtilsAssets['default'].icons();
      for (var i = 0; i < images.length; i++) {
        arr.push(images[i].name);
      }
      this.set("icons", arr);
      console.log(this.get("selected.planning"));
    }).on("init").observes("selected"),

    _jQuery: (function () {

      /* Image */
      _ember['default'].$(".select-image").select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Välj bild",
        data: this.get("icons"),
        templateResult: this.get("formatImage")
      });

      _ember['default'].$(".select-image").val([]).select2();
      if (this.get("selected.image")) {
        _ember['default'].$(".select-image").val([this.get("selected.image")]).select2();
      }

      /* Struktur */
      _ember['default'].$(".select-structure-multiple").select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Välj tillgängliga stödstrukturer",
        data: this.get("structures")
      });
      _ember['default'].$(".select-structure-multiple").val([]).select2();

      if (this.get("selected.structures")) {
        var struc = JSON.parse(this.get("selected.structures"));
        _ember['default'].$(".select-structure-multiple").val(struc).select2();
      }
    }).on("didInsertElement").observes("selected"),

    formatImage: function formatImage(state) {
      var path = _clientUtilsAssets['default'].path("icons");
      var ex = _clientUtilsAssets['default'].ext();
      if (!state.loading) {
        console.log(state);
        var $state = $("<span><img src=" + path + state.text + ex + " />" + state.text + "</span>");
        return $state;
      }
    },

    actions: {
      clear: function clear() {
        this.set("selected", null);
      },
      save: function save() {
        var name = _ember['default'].$("input[name='name']").val();
        var body = _ember['default'].$("textarea[name='body']").val();
        var image = _ember['default'].$(".select-image").val();
        var structures = _ember['default'].$(".select-structure-multiple").val();

        // Save current
        if (this.get("selected.id")) {
          console.log("update");
          var mission = this.get("selected");
          mission.set("name", name);
          mission.set("body", body);
          mission.set("image", image);
          mission.set("school-id", this.get("global.school.id"));
          mission.set("structures", JSON.stringify(structures));
          mission.save();
        }

        //Create new
        else if (name && structures) {
            var mission = this.get("store").createRecord("mission", {
              "name": name,
              "body": body,
              "image": image,
              "structures": JSON.stringify(structures)
            });
            mission.save();
          }
      }

    }
  });
});