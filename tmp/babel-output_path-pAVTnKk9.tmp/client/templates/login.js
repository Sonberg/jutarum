define("client/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 6
            },
            "end": {
              "line": 11,
              "column": 6
            }
          },
          "moduleName": "client/templates/login.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element2, 'value');
          morphs[1] = dom.createMorphAt(element2, 0, 0);
          return morphs;
        },
        statements: [["attribute", "value", ["get", "school.id", ["loc", [null, [10, 24], [10, 33]]]]], ["content", "school.name", ["loc", [null, [10, 36], [10, 51]]]]],
        locals: ["school"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 6
            },
            "end": {
              "line": 19,
              "column": 6
            }
          },
          "moduleName": "client/templates/login.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element1, 'value');
          morphs[1] = dom.createMorphAt(element1, 0, 0);
          morphs[2] = dom.createMorphAt(element1, 2, 2);
          return morphs;
        },
        statements: [["attribute", "value", ["get", "user.id", ["loc", [null, [18, 24], [18, 31]]]]], ["content", "user.first-name", ["loc", [null, [18, 34], [18, 53]]]], ["content", "user.last-name", ["loc", [null, [18, 54], [18, 72]]]]],
        locals: ["user"],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 4
            },
            "end": {
              "line": 21,
              "column": 84
            }
          },
          "moduleName": "client/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "button");
          var el2 = dom.createTextNode("Logga in");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["submit"], [], ["loc", [null, [21, 47], [21, 66]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 6
          }
        },
        "moduleName": "client/templates/login.hbs"
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "login");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "content p3");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3, "class", "text-center");
        var el4 = dom.createTextNode("Jutarum Beta 1.0");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("select");
        dom.setAttribute(el3, "class", "mb2");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("option");
        dom.setAttribute(el4, "value", "default");
        dom.setAttribute(el4, "disabled", "true");
        dom.setAttribute(el4, "selected", "true");
        var el5 = dom.createTextNode("Vilken skola går du på?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    Finns du inte med i listan? Prata med din lärare\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("select");
        dom.setAttribute(el3, "class", "mb1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("option");
        dom.setAttribute(el4, "value", "default");
        dom.setAttribute(el4, "disabled", "true");
        dom.setAttribute(el4, "selected", "true");
        var el5 = dom.createTextNode("Vad heter du?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
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
        var element3 = dom.childAt(fragment, [2, 1]);
        var element4 = dom.childAt(element3, [3]);
        var element5 = dom.childAt(element3, [5]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element4, 'onchange');
        morphs[2] = dom.createMorphAt(element4, 3, 3);
        morphs[3] = dom.createAttrMorph(element5, 'onchange');
        morphs[4] = dom.createMorphAt(element5, 3, 3);
        morphs[5] = dom.createMorphAt(element3, 7, 7);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]], ["attribute", "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "school", ["loc", [null, [7, 47], [7, 53]]]]], [], ["loc", [null, [7, 42], [7, 54]]]]], ["value", "target.value"], ["loc", [null, [7, 33], [7, 77]]]]], ["block", "each", [["get", "model", ["loc", [null, [9, 14], [9, 19]]]]], [], 0, null, ["loc", [null, [9, 6], [11, 15]]]], ["attribute", "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "user", ["loc", [null, [15, 47], [15, 51]]]]], [], ["loc", [null, [15, 42], [15, 52]]]]], ["value", "target.value"], ["loc", [null, [15, 33], [15, 76]]]]], ["block", "each", [["get", "users", ["loc", [null, [17, 14], [17, 19]]]]], [], 1, null, ["loc", [null, [17, 6], [19, 15]]]], ["block", "link-to", ["index"], [], 2, null, ["loc", [null, [21, 4], [21, 96]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});