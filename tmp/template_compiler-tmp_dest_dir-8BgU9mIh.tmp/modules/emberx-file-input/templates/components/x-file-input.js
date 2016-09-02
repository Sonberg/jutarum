export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 5,
            "column": 2
          },
          "end": {
            "line": 7,
            "column": 2
          }
        }
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[6,4],[6,13]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 7,
            "column": 2
          },
          "end": {
            "line": 9,
            "column": 2
          }
        }
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["content","alt",["loc",[null,[8,4],[8,11]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "wrong-type",
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
          "line": 11,
          "column": 0
        }
      }
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("label");
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [2]);
      var morphs = new Array(3);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createAttrMorph(element0, 'for');
      morphs[2] = dom.createMorphAt(element0,1,1);
      dom.insertBoundary(fragment, 0);
      return morphs;
    },
    statements: [
      ["inline","input",[],["id",["subexpr","@mut",[["get","randomId",["loc",[null,[1,11],[1,19]]]]],[],[]],"type","file","class","x-file--input","name",["subexpr","@mut",[["get","name",["loc",[null,[1,59],[1,63]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[2,11],[2,19]]]]],[],[]],"multiple",["subexpr","@mut",[["get","multiple",["loc",[null,[2,29],[2,37]]]]],[],[]],"tabindex",["subexpr","@mut",[["get","tabindex",["loc",[null,[2,47],[2,55]]]]],[],[]],"accept",["subexpr","@mut",[["get","accept",["loc",[null,[2,63],[2,69]]]]],[],[]]],["loc",[null,[1,0],[2,71]]]],
      ["attribute","for",["concat",[["get","randomId",["loc",[null,[4,14],[4,22]]]]]]],
      ["block","if",[["get","hasBlock",["loc",[null,[5,8],[5,16]]]]],[],0,1,["loc",[null,[5,2],[9,9]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));