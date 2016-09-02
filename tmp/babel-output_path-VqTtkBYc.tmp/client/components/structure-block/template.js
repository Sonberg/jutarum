define("client/components/structure-block/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
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
                "line": 9,
                "column": 4
              }
            },
            "moduleName": "client/components/structure-block/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "thumb");
            dom.setAttribute(el1, "contenteditable", "false");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "delete");
            var el3 = dom.createTextNode("x");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("img");
            dom.setAttribute(el2, "alt", "");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var element2 = dom.childAt(element1, [1]);
            var element3 = dom.childAt(element1, [3]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element2);
            morphs[1] = dom.createAttrMorph(element3, 'src');
            return morphs;
          },
          statements: [["element", "action", ["delete", ["get", "img", ["loc", [null, [6, 48], [6, 51]]]], ["get", "index", ["loc", [null, [6, 52], [6, 57]]]]], [], ["loc", [null, [6, 29], [6, 60]]]], ["attribute", "src", ["get", "img", ["loc", [null, [7, 19], [7, 22]]]]]],
          locals: ["img"],
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
                "line": 10,
                "column": 4
              },
              "end": {
                "line": 14,
                "column": 4
              }
            },
            "moduleName": "client/components/structure-block/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "btn-camera");
            var el2 = dom.createTextNode("\n        Camera\n      ");
            dom.appendChild(el1, el2);
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
          statements: [["element", "action", ["toggleModal"], [], ["loc", [null, [11, 31], [11, 57]]]]],
          locals: [],
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
                "line": 18,
                "column": 4
              },
              "end": {
                "line": 20,
                "column": 4
              }
            },
            "moduleName": "client/components/structure-block/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "row", ["loc", [null, [19, 8], [19, 15]]]]],
          locals: ["row"],
          templates: []
        };
      })();
      var child3 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.4.6",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 27,
                    "column": 8
                  },
                  "end": {
                    "line": 29,
                    "column": 8
                  }
                },
                "moduleName": "client/components/structure-block/template.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("          ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("li");
                var el2 = dom.createComment("");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
                return morphs;
              },
              statements: [["content", "prev", ["loc", [null, [28, 14], [28, 22]]]]],
              locals: ["prev"],
              templates: []
            };
          })();
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
                  "line": 31,
                  "column": 4
                }
              },
              "moduleName": "client/components/structure-block/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("ul");
              dom.setAttribute(el1, "class", "knowledge");
              dom.setAttribute(el1, "contenteditable", "false");
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("b");
              var el3 = dom.createTextNode("Förkunskaper");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("      ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 3, 3);
              return morphs;
            },
            statements: [["block", "each", [["get", "data.knowledge", ["loc", [null, [27, 16], [27, 30]]]]], [], 0, null, ["loc", [null, [27, 8], [29, 17]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.6",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 2
              },
              "end": {
                "line": 32,
                "column": 2
              }
            },
            "moduleName": "client/components/structure-block/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "gt", [["get", "data.knowledge.length", ["loc", [null, [24, 14], [24, 35]]]], 0], [], ["loc", [null, [24, 10], [24, 38]]]]], [], 0, null, ["loc", [null, [24, 4], [31, 11]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes", "wrong-type"]
          },
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 33,
              "column": 0
            }
          },
          "moduleName": "client/components/structure-block/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "title");
          dom.setAttribute(el1, "contenteditable", "false");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "camera-wrapper");
          dom.setAttribute(el1, "contenteditable", "false");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [3]);
          var element5 = dom.childAt(fragment, [5]);
          var morphs = new Array(7);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(element4, 1, 1);
          morphs[2] = dom.createMorphAt(element4, 2, 2);
          morphs[3] = dom.createAttrMorph(element5, 'id');
          morphs[4] = dom.createAttrMorph(element5, 'contenteditable');
          morphs[5] = dom.createMorphAt(element5, 1, 1);
          morphs[6] = dom.createMorphAt(fragment, 7, 7, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["content", "data.title", ["loc", [null, [2, 45], [2, 59]]]], ["block", "each", [["get", "data.images", ["loc", [null, [4, 12], [4, 23]]]]], [], 0, null, ["loc", [null, [4, 4], [9, 13]]]], ["block", "if", [["subexpr", "eq", [["get", "type", ["loc", [null, [10, 14], [10, 18]]]], "explore"], [], ["loc", [null, [10, 10], [10, 29]]]]], [], 1, null, ["loc", [null, [10, 4], [14, 11]]]], ["attribute", "id", ["get", "data.title", ["loc", [null, [17, 11], [17, 21]]]]], ["attribute", "contenteditable", ["get", "editable", ["loc", [null, [17, 42], [17, 50]]]]], ["block", "each", [["get", "rows", ["loc", [null, [18, 12], [18, 16]]]]], [], 2, null, ["loc", [null, [18, 4], [20, 13]]]], ["block", "if", [["subexpr", "eq", [["get", "type", ["loc", [null, [23, 12], [23, 16]]]], "explore"], [], ["loc", [null, [23, 8], [23, 27]]]]], [], 3, null, ["loc", [null, [23, 2], [32, 9]]]]],
        locals: [],
        templates: [child0, child1, child2, child3]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.6",
              "loc": {
                "source": null,
                "start": {
                  "line": 37,
                  "column": 4
                },
                "end": {
                  "line": 39,
                  "column": 4
                }
              },
              "moduleName": "client/components/structure-block/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "camera-component", [], ["index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [38, 31], [38, 36]]]]], [], []], "close", ["subexpr", "@mut", [["get", "toggleModal", ["loc", [null, [38, 43], [38, 54]]]]], [], []], "self", ["subexpr", "@mut", [["get", "this", ["loc", [null, [38, 60], [38, 64]]]]], [], []]], ["loc", [null, [38, 6], [38, 67]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.6",
            "loc": {
              "source": null,
              "start": {
                "line": 36,
                "column": 2
              },
              "end": {
                "line": 40,
                "column": 2
              }
            },
            "moduleName": "client/components/structure-block/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "modal-dialog", [], ["close", "toggleModal", "container-class", "camera-modal", "translucentOverlay", true], 0, null, ["loc", [null, [37, 4], [39, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 0
            },
            "end": {
              "line": 41,
              "column": 0
            }
          },
          "moduleName": "client/components/structure-block/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "cameraVisible", ["loc", [null, [36, 8], [36, 21]]]]], [], 0, null, ["loc", [null, [36, 2], [40, 9]]]]],
        locals: [],
        templates: [child0]
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
            "line": 42,
            "column": 0
          }
        },
        "moduleName": "client/components/structure-block/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "data", ["loc", [null, [1, 6], [1, 10]]]]], [], 0, null, ["loc", [null, [1, 0], [33, 7]]]], ["block", "if", [["get", "camera", ["loc", [null, [35, 6], [35, 12]]]]], [], 1, null, ["loc", [null, [35, 0], [41, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});