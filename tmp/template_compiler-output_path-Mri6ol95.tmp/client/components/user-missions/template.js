export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.6",
              "loc": {
                "source": null,
                "start": {
                  "line": 8,
                  "column": 10
                },
                "end": {
                  "line": 10,
                  "column": 10
                }
              },
              "moduleName": "client/components/user-missions/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("            ");
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
              ["inline","mission-button",[],["model",["subexpr","@mut",[["get","newMission",["loc",[null,[9,35],[9,45]]]]],[],[]],"text","Återgå till uppdrag"],["loc",[null,[9,12],[9,74]]]]
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
                  "line": 10,
                  "column": 10
                },
                "end": {
                  "line": 12,
                  "column": 10
                }
              },
              "moduleName": "client/components/user-missions/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("            ");
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
              ["inline","mission-button",[],["model",["subexpr","@mut",[["get","newMission",["loc",[null,[11,35],[11,45]]]]],[],[]],"text","Starta uppdrag"],["loc",[null,[11,12],[11,69]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.6",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 8
              },
              "end": {
                "line": 13,
                "column": 8
              }
            },
            "moduleName": "client/components/user-missions/template.hbs"
          },
          isEmpty: false,
          arity: 1,
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
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["subexpr","eq",[["get","newMission.id",["loc",[null,[8,20],[8,33]]]],["get","mission.lastRapport.mission-id",["loc",[null,[8,34],[8,64]]]]],[],["loc",[null,[8,16],[8,65]]]]],[],0,1,["loc",[null,[8,10],[12,17]]]]
          ],
          locals: ["newMission"],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 16,
              "column": 2
            }
          },
          "moduleName": "client/components/user-missions/template.hbs"
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
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","row fullwidth bb0 mr2 ml2 mt1");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","medium-12 large-12 float-right mr1");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h1");
          dom.setAttribute(el3,"class","jr--title ml1 mb0");
          var el4 = dom.createTextNode("Nya uppdrag");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3, 1]),3,3);
          return morphs;
        },
        statements: [
          ["inline","mission-alert",[],["model",["subexpr","@mut",[["get","new",["loc",[null,[3,26],[3,29]]]]],[],[]]],["loc",[null,[3,4],[3,31]]]],
          ["block","each",[["get","new",["loc",[null,[7,16],[7,19]]]]],[],0,null,["loc",[null,[7,8],[13,17]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.6",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 8
              },
              "end": {
                "line": 24,
                "column": 8
              }
            },
            "moduleName": "client/components/user-missions/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
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
            ["inline","mission-button",[],["model",["subexpr","@mut",[["get","mission",["loc",[null,[23,33],[23,40]]]]],[],[]],"text","Utför uppdraget igen"],["loc",[null,[23,10],[23,70]]]]
          ],
          locals: ["mission"],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 2
            },
            "end": {
              "line": 27,
              "column": 2
            }
          },
          "moduleName": "client/components/user-missions/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","row fullwidth mt3 mr3 ml1");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","medium-12 large-12");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h1");
          dom.setAttribute(el3,"class","jr--title pl1 mb0");
          var el4 = dom.createTextNode("Avslutade uppdrag");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),3,3);
          return morphs;
        },
        statements: [
          ["block","each",[["get","old",["loc",[null,[22,16],[22,19]]]]],[],0,null,["loc",[null,[22,8],[24,17]]]]
        ],
        locals: [],
        templates: [child0]
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
            "line": 28,
            "column": 0
          }
        },
        "moduleName": "client/components/user-missions/template.hbs"
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
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","new",["loc",[null,[2,8],[2,11]]]]],[],0,null,["loc",[null,[2,2],[16,9]]]],
        ["block","if",[["get","old",["loc",[null,[18,8],[18,11]]]]],[],1,null,["loc",[null,[18,2],[27,9]]]]
      ],
      locals: [],
      templates: [child0, child1]
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
            "line": 28,
            "column": 0
          },
          "end": {
            "line": 31,
            "column": 0
          }
        },
        "moduleName": "client/components/user-missions/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1,"class","text-center");
        var el2 = dom.createTextNode("Du har slutfört alla dina uppdrag!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1,"class","ladda-button");
        dom.setAttribute(el1,"id","reload");
        dom.setAttribute(el1,"data-style","expand-right");
        var el2 = dom.createElement("span");
        dom.setAttribute(el2,"class","ladda-label");
        var el3 = dom.createTextNode("Uppdatera");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [3]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [
        ["element","action",["reload"],[],["loc",[null,[30,69],[30,88]]]]
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
          "line": 31,
          "column": 7
        }
      },
      "moduleName": "client/components/user-missions/template.hbs"
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
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["block","if",[["subexpr","not-eq",[["get","missions.length",["loc",[null,[1,14],[1,29]]]],0],[],["loc",[null,[1,6],[1,32]]]]],[],0,1,["loc",[null,[1,0],[31,7]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));