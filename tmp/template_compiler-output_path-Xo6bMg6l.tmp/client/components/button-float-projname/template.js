export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "fragmentReason": {
        "name": "triple-curlies"
      },
      "revision": "Ember@2.4.6",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 116
        }
      },
      "moduleName": "client/components/button-float-projname/template.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","animated fadeIn btn-float drop-target btn-projname");
      var el2 = dom.createElement("p");
      var el3 = dom.createTextNode("Aktuellt uppdrag: ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("b");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(1);
      morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0, 1]),0,0);
      return morphs;
    },
    statements: [
      ["content","model.name",["loc",[null,[1,88],[1,102]]]]
    ],
    locals: [],
    templates: []
  };
}()));