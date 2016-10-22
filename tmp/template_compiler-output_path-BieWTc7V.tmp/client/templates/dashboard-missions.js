export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes"
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
          "line": 8,
          "column": 0
        }
      },
      "moduleName": "client/templates/dashboard-missions.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createTextNode("\n  ");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","columns large-8");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n  ");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","columns large-4");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(2);
      morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]),1,1);
      return morphs;
    },
    statements: [
      ["inline","display-list",[],["model",["subexpr","@mut",[["get","model",["loc",[null,[3,25],[3,30]]]]],[],[]],"icon","edit","parent",["subexpr","@mut",[["get","this",["loc",[null,[3,50],[3,54]]]]],[],[]]],["loc",[null,[3,4],[3,56]]]],
      ["inline","edit-mission",[],["selected",["subexpr","@mut",[["get","selected",["loc",[null,[6,28],[6,36]]]]],[],[]],"icons",["subexpr","@mut",[["get","icons",["loc",[null,[6,43],[6,48]]]]],[],[]]],["loc",[null,[6,4],[6,50]]]]
    ],
    locals: [],
    templates: []
  };
}()));