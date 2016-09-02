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
            "column": 6
          },
          "end": {
            "line": 4,
            "column": 29
          }
        },
        "moduleName": "client/components/navigation-global/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Hem");
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
            "line": 7,
            "column": 6
          },
          "end": {
            "line": 7,
            "column": 36
          }
        },
        "moduleName": "client/components/navigation-global/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Banken");
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
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 28
            },
            "end": {
              "line": 19,
              "column": 69
            }
          },
          "moduleName": "client/components/navigation-global/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Uppdrag");
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
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 11,
            "column": 4
          },
          "end": {
            "line": 26,
            "column": 4
          }
        },
        "moduleName": "client/components/navigation-global/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"class","account menu float--right");
        var el2 = dom.createTextNode("\n\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        dom.setAttribute(el2,"class","");
        var el3 = dom.createTextNode("\n            ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"id","menu-dropit2");
        dom.setAttribute(el3,"class","menu");
        var el4 = dom.createTextNode("\n                ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n                    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("b");
        var el6 = dom.createTextNode("För lärare ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        var el6 = dom.createTextNode("\n                        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("<li>Studenter</li> ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
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
        var element0 = dom.childAt(fragment, [1, 1, 1, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 1]),0,0);
        return morphs;
      },
      statements: [
        ["inline","fa-icon",["angle-down"],[],["loc",[null,[17,34],[17,58]]]],
        ["block","link-to",["dashboard-missions"],[],0,null,["loc",[null,[19,28],[19,81]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child3 = (function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.6",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 14
              },
              "end": {
                "line": 35,
                "column": 108
              }
            },
            "moduleName": "client/components/navigation-global/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Återgå till senste uppdraget");
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
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 8
            },
            "end": {
              "line": 37,
              "column": 8
            }
          },
          "moduleName": "client/components/navigation-global/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","pr2");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["block","link-to",[["get","mission.lastRoute",["loc",[null,[35,25],[35,42]]]],["get","mission.model.id",["loc",[null,[35,43],[35,59]]]]],["classNames","last"],0,null,["loc",[null,[35,14],[35,120]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 32,
            "column": 6
          },
          "end": {
            "line": 38,
            "column": 6
          }
        },
        "moduleName": "client/components/navigation-global/template.hbs"
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
        ["block","if",[["subexpr","missionVisible",[["get","router.currentRouteName",["loc",[null,[33,30],[33,53]]]]],[],["loc",[null,[33,14],[33,54]]]]],[],0,null,["loc",[null,[33,8],[37,15]]]]
      ],
      locals: [],
      templates: [child0]
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
            "line": 47,
            "column": 16
          },
          "end": {
            "line": 47,
            "column": 53
          }
        },
        "moduleName": "client/components/navigation-global/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Min profil");
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
  var child5 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 48,
            "column": 74
          },
          "end": {
            "line": 48,
            "column": 123
          }
        },
        "moduleName": "client/components/navigation-global/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Logga ut ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","fa-icon",["logout"],[],["loc",[null,[48,103],[48,123]]]]
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
          "line": 54,
          "column": 6
        }
      },
      "moduleName": "client/components/navigation-global/template.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","top-bar display-flex");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("ul");
      dom.setAttribute(el2,"class","float--left menu ml2");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("li");
      dom.setAttribute(el3,"class","active");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("li");
      dom.setAttribute(el3,"class","active");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("ul");
      dom.setAttribute(el2,"class","mission-nav float--center menu");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("li");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("h4");
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("ul");
      dom.setAttribute(el2,"class","account menu float--right");
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("        ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("ul");
      dom.setAttribute(el2,"class","account menu float--right");
      var el3 = dom.createTextNode("\n\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("li");
      dom.setAttribute(el3,"class","");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("ul");
      dom.setAttribute(el4,"id","menu-dropit");
      dom.setAttribute(el4,"class","menu");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("li");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("b");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode(" Välkommen, ");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode(" ");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("! ");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("ul");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("li");
      var el8 = dom.createComment("");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("li");
      var el8 = dom.createElement("button");
      dom.setAttribute(el8,"type","logout");
      dom.setAttribute(el8,"name","button");
      var el9 = dom.createComment("");
      dom.appendChild(el8, el9);
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
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
      var element1 = dom.childAt(fragment, [0]);
      var element2 = dom.childAt(element1, [1]);
      var element3 = dom.childAt(element1, [9, 1, 1, 1]);
      var element4 = dom.childAt(element3, [1]);
      var element5 = dom.childAt(element3, [3]);
      var element6 = dom.childAt(element5, [3, 0]);
      var morphs = new Array(12);
      morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]),1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]),1,1);
      morphs[2] = dom.createMorphAt(element1,3,3);
      morphs[3] = dom.createMorphAt(dom.childAt(element1, [5, 1, 1]),0,0);
      morphs[4] = dom.createMorphAt(dom.childAt(element1, [7]),1,1);
      morphs[5] = dom.createUnsafeMorphAt(element4,0,0);
      morphs[6] = dom.createMorphAt(element4,2,2);
      morphs[7] = dom.createMorphAt(element4,4,4);
      morphs[8] = dom.createMorphAt(element4,6,6);
      morphs[9] = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
      morphs[10] = dom.createElementMorph(element6);
      morphs[11] = dom.createMorphAt(element6,0,0);
      return morphs;
    },
    statements: [
      ["block","link-to",["index"],[],0,null,["loc",[null,[4,6],[4,41]]]],
      ["block","link-to",["rapports"],[],1,null,["loc",[null,[7,6],[7,48]]]],
      ["block","if",[["subexpr","eq",[["get","global.user.type",["loc",[null,[11,14],[11,30]]]],"admin"],[],["loc",[null,[11,10],[11,39]]]]],[],2,null,["loc",[null,[11,4],[26,11]]]],
      ["content","mission.tab",["loc",[null,[29,10],[29,25]]]],
      ["block","if",[["get","mission.lastRapport",["loc",[null,[32,12],[32,31]]]]],[],3,null,["loc",[null,[32,6],[38,13]]]],
      ["inline","asset-avatar",[["get","global.user.avatar",["loc",[null,[45,29],[45,47]]]]],[],["loc",[null,[45,13],[45,50]]]],
      ["content","global.user.first-name",["loc",[null,[45,62],[45,88]]]],
      ["content","global.user.last-name",["loc",[null,[45,89],[45,114]]]],
      ["inline","fa-icon",["angle-down"],[],["loc",[null,[45,116],[45,140]]]],
      ["block","link-to",["user","kalle"],[],4,null,["loc",[null,[47,16],[47,65]]]],
      ["element","action",["logout"],[],["loc",[null,[48,52],[48,73]]]],
      ["block","link-to",["login"],[],5,null,["loc",[null,[48,74],[48,135]]]]
    ],
    locals: [],
    templates: [child0, child1, child2, child3, child4, child5]
  };
}()));