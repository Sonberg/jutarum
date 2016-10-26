export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes",
          "wrong-type"
        ]
      },
      "revision": "Ember@2.4.6",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 6,
          "column": 29
        }
      },
      "moduleName": "client/templates/index.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","row fullwidth mt3 mr3 ml2 bb0 animated bounceInDown");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","medium-12 large-12");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("h1");
      dom.setAttribute(el3,"class","jr--title-header text-center");
      var el4 = dom.createTextNode("Välkommen ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("!");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(2);
      morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1]),1,1);
      morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["content","global.user.first-name",["loc",[null,[3,55],[3,81]]]],
      ["inline","user-missions",[],["model",["subexpr","@mut",[["get","model",["loc",[null,[6,22],[6,27]]]]],[],[]]],["loc",[null,[6,0],[6,29]]]]
    ],
    locals: [],
    templates: []
  };
}()));