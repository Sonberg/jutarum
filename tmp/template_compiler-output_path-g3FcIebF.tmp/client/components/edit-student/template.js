export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 4,
            "column": 4
          },
          "end": {
            "line": 6,
            "column": 4
          }
        },
        "moduleName": "client/components/edit-student/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("b");
        dom.setAttribute(el1,"class","pb1");
        var el2 = dom.createTextNode("Redigera uppdrag");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

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
            "line": 6,
            "column": 4
          },
          "end": {
            "line": 8,
            "column": 4
          }
        },
        "moduleName": "client/components/edit-student/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("b");
        dom.setAttribute(el1,"class","pb1");
        var el2 = dom.createTextNode("Skapa nytt uppdrag");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child2 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 24,
            "column": 4
          },
          "end": {
            "line": 26,
            "column": 4
          }
        },
        "moduleName": "client/components/edit-student/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("input");
        dom.setAttribute(el1,"class","new-update-button float--center");
        dom.setAttribute(el1,"type","button");
        dom.setAttribute(el1,"name","name");
        dom.setAttribute(el1,"value","Skapa nytt");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [
        ["element","action",["clear"],[],["loc",[null,[25,99],[25,117]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child3 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 28,
            "column": 4
          },
          "end": {
            "line": 30,
            "column": 4
          }
        },
        "moduleName": "client/components/edit-student/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("input");
        dom.setAttribute(el1,"type","submit");
        dom.setAttribute(el1,"name","name");
        dom.setAttribute(el1,"value","Spara förändringar");
        dom.setAttribute(el1,"class","float--center new-update-button");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child4 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 30,
            "column": 4
          },
          "end": {
            "line": 34,
            "column": 4
          }
        },
        "moduleName": "client/components/edit-student/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("input");
        dom.setAttribute(el1,"type","submit");
        dom.setAttribute(el1,"name","name");
        dom.setAttribute(el1,"value","Skapa");
        dom.setAttribute(el1,"class","new-update-button");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
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
          "line": 37,
          "column": 6
        }
      },
      "moduleName": "client/components/edit-student/template.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","mission-updater p1");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("form");
      var el3 = dom.createTextNode("\n      ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","mb1");
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("        ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("input");
      dom.setAttribute(el3,"type","text");
      dom.setAttribute(el3,"name","name");
      dom.setAttribute(el3,"placeholder","Förnamn");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("input");
      dom.setAttribute(el3,"type","text");
      dom.setAttribute(el3,"name","name");
      dom.setAttribute(el3,"placeholder","Efternamn");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","image mb1");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("select");
      dom.setAttribute(el4,"class","select-image mb1");
      dom.setAttribute(el4,"name","image");
      dom.setAttribute(el4,"required","");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","structures");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("select");
      dom.setAttribute(el4,"class","select-structure-multiple mb1");
      dom.setAttribute(el4,"name","structures");
      dom.setAttribute(el4,"multiple","multiple");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    \n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("textarea");
      dom.setAttribute(el3,"name","body");
      dom.setAttribute(el3,"class","mt1");
      dom.setAttribute(el3,"rows","8");
      dom.setAttribute(el3,"cols","40");
      dom.setAttribute(el3,"placeholder","Beskrivning");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    \n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","display-flex");
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element1 = dom.childAt(fragment, [0, 1]);
      var element2 = dom.childAt(element1, [3]);
      var element3 = dom.childAt(element1, [5]);
      var element4 = dom.childAt(element1, [13]);
      var morphs = new Array(7);
      morphs[0] = dom.createElementMorph(element1);
      morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
      morphs[2] = dom.createAttrMorph(element2, 'value');
      morphs[3] = dom.createAttrMorph(element3, 'value');
      morphs[4] = dom.createMorphAt(dom.childAt(element1, [11]),0,0);
      morphs[5] = dom.createMorphAt(element4,1,1);
      morphs[6] = dom.createMorphAt(element4,3,3);
      return morphs;
    },
    statements: [
      ["element","action",["save"],["on","submit"],["loc",[null,[2,8],[2,37]]]],
      ["block","if",[["get","selected.id",["loc",[null,[4,10],[4,21]]]]],[],0,1,["loc",[null,[4,4],[8,11]]]],
      ["attribute","value",["get","selected.first-name",["loc",[null,[10,66],[10,85]]]]],
      ["attribute","value",["get","selected.last-name",["loc",[null,[11,68],[11,86]]]]],
      ["content","selected.body",["loc",[null,[21,83],[21,100]]]],
      ["block","if",[["get","selected.id",["loc",[null,[24,10],[24,21]]]]],[],2,null,["loc",[null,[24,4],[26,11]]]],
      ["block","if",[["get","selected.id",["loc",[null,[28,10],[28,21]]]]],[],3,4,["loc",[null,[28,4],[34,11]]]]
    ],
    locals: [],
    templates: [child0, child1, child2, child3, child4]
  };
}()));