import Ember from 'ember';
import assets from '../../utils/assets';
import PDFObject from "npm:pdfobject";

export default Ember.Component.extend({
  store: Ember.inject.service(),

  structures: [
    "Utseende",
    "Fortplantning",
    "Föda",
    "Bostad",
    "Fiender"
  ],
  selected: null,
  icons: [],

  _setup: function() {
    var arr = [];
    var images = assets.icons();
    for (var i = 0; i < images.length; i++) {
      arr.push(images[i].name);
    }
    this.set("icons", arr);
    console.log(this.get("selected.planning"));
  }.on("init").observes("selected"),

  _jQuery: function() {

    /* Image */
    Ember.$(".select-image").select2({
      minimumResultsForSearch: Infinity,
      placeholder: "Välj bild",
      data: this.get("icons"),
      templateResult: this.get("formatImage")
    });

    Ember.$(".select-image").val([]).select2();
    if (this.get("selected.image")) {
      Ember.$(".select-image").val([this.get("selected.image")]).select2();
    }

    /* Struktur */
    Ember.$(".select-structure-multiple").select2({
      minimumResultsForSearch: Infinity,
      placeholder: "Välj tillgängliga stödstrukturer",
      data: this.get("structures")
    });
    Ember.$(".select-structure-multiple").val([]).select2();

    if (this.get("selected.structures")) {
      var struc = JSON.parse(this.get("selected.structures"));
      Ember.$(".select-structure-multiple").val(struc).select2();
    }
  }.on("didInsertElement").observes("selected"),

  formatImage: function(state) {
    var path = assets.path("icons");
    var ex = assets.ext();
    if (!state.loading) {
      console.log(state);
      var $state = $(
        "<span><img src=" + path + state.text + ex + " />" + state.text + "</span>"
      );
      return $state;
    }
  },

  actions: {
    clear: function() {
      this.set("selected", null);
    },
    save: function() {
      var name = Ember.$("input[name='name']").val();
      var body = Ember.$("textarea[name='body']").val();
      var image = Ember.$(".select-image").val();
      var structures = Ember.$(".select-structure-multiple").val();

      // Save current
      if (this.get("selected.id")) {
        console.log("update");
        var mission = this.get("selected");
        mission.set("name", name);
        mission.set("body", body);
        mission.set("image", image);
        mission.set("structures", JSON.stringify(structures));
        mission.save();
      }

      //Create new
      else if (name && structures && body) {
        var mission = this.get("store").createRecord("mission", {
          "name": name,
          "body": body,
          "image": image,
          "structures": JSON.stringify(structures)
        });
        mission.save();
      }
    },

}
});