import Ember from 'ember';

export default Ember.Component.extend({
  type: null,
  mission: Ember.inject.service(),
  missing: 0,
  structures: null,
  content: [[],[],[],[]],
  type: null,

  _setup: function() {
    var arr = this.get("mission.structure");
    var miss = 4-arr.length;
    this.set("missing", miss);
    this.set("structures", arr);
  }.on("init"),

  keyUp: function(e) {
    var selected = this.get("structures");
    for (var ul = 0; ul < selected.length; ul++) {
      var nodes = Ember.$("#" + selected[ul].title)[0].children;
      for (var li = 0; li < nodes.length; li++) {

        var text = this.get("nodeToText")(nodes[li]);
        if (text.length > 0) {
          if (this.get("mission.structure." + ul + "." + this.get("type"))) {
            this.set("mission.structure." + ul + "." + this.get("type") + "." + li, text);
          } else {
            this.get("mission.structure." + ul + "." + this.get("type")).push(text);
          }
        }
      }
    }
  },

  nodeToText: function(node) {
    var fetchText = function(node) {
      if (node.innerText !== undefined && node.innerText.length !== 0 && node.innerText !== "") {
        return node.innerText;
      } else if (node.data !== undefined && node.data.length !== 0 && node.data !== "") {
        return node.data;
      }
      return "";
    };

    var text = fetchText(node);
    for (var i = 0; i < 20; i++) {
      text = text.replace("X", "").replace("↵", "").trim();
    }
    return text;
  }
});
