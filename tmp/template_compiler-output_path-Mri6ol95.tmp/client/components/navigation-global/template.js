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
              "line": 11,
              "column": 10
            },
            "end": {
              "line": 11,
              "column": 60
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
          var el1 = dom.createTextNode("Redigera uppdrag");
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
            "line": 9,
            "column": 4
          },
          "end": {
            "line": 13,
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
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("li");
        var el2 = dom.createTextNode("\n          ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
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
        ["block","link-to",["dashboard-missions"],[],0,null,["loc",[null,[11,10],[11,72]]]]
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
                "line": 23,
                "column": 10
              },
              "end": {
                "line": 23,
                "column": 98
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
            var el1 = dom.createTextNode("Återgå till uppdraget");
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
              "line": 21,
              "column": 6
            },
            "end": {
              "line": 25,
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
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","pr2");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
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
          ["block","link-to",[["get","mission.lastRoute",["loc",[null,[23,21],[23,38]]]],["get","global.mission.id",["loc",[null,[23,39],[23,56]]]]],["classNames","last"],0,null,["loc",[null,[23,10],[23,110]]]]
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
            "line": 20,
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
        ["block","if",[["subexpr","missionVisible",[["get","router.currentRouteName",["loc",[null,[21,28],[21,51]]]]],[],["loc",[null,[21,12],[21,52]]]]],[],0,null,["loc",[null,[21,6],[25,13]]]]
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
            "line": 33,
            "column": 74
          },
          "end": {
            "line": 33,
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
        ["inline","fa-icon",["logout"],[],["loc",[null,[33,103],[33,123]]]]
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
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","top-bar display-flex");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("ul");
      dom.setAttribute(el2,"class","float--left menu");
      dom.setAttribute(el2,"id","menu-dropit2");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("li");
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
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
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
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("ul");
      dom.setAttribute(el2,"class","account menu float--right");
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("ul");
      dom.setAttribute(el2,"class","account menu float--right");
      dom.setAttribute(el2,"id","menu-dropit");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("li");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("a");
      dom.setAttribute(el4,"href","#");
      var el5 = dom.createElement("b");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode(" Välkommen, ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("! ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("ul");
      dom.setAttribute(el4,"class","menu dropit");
      var el5 = dom.createTextNode("\n          ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("ul");
      var el6 = dom.createTextNode("\n            ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("li");
      var el7 = dom.createElement("button");
      dom.setAttribute(el7,"type","logout");
      dom.setAttribute(el7,"name","button");
      var el8 = dom.createComment("");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
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
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [1]);
      var element2 = dom.childAt(element0, [7, 1]);
      var element3 = dom.childAt(element2, [1, 0]);
      var element4 = dom.childAt(element2, [3, 1, 1, 0]);
      var morphs = new Array(10);
      morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
      morphs[2] = dom.createMorphAt(element1,5,5);
      morphs[3] = dom.createMorphAt(dom.childAt(element0, [3, 1, 1]),0,0);
      morphs[4] = dom.createMorphAt(dom.childAt(element0, [5]),1,1);
      morphs[5] = dom.createUnsafeMorphAt(element3,0,0);
      morphs[6] = dom.createMorphAt(element3,2,2);
      morphs[7] = dom.createMorphAt(element3,4,4);
      morphs[8] = dom.createElementMorph(element4);
      morphs[9] = dom.createMorphAt(element4,0,0);
      return morphs;
    },
    statements: [
      ["block","link-to",["index"],[],0,null,["loc",[null,[4,6],[4,41]]]],
      ["block","link-to",["rapports"],[],1,null,["loc",[null,[7,6],[7,48]]]],
      ["block","if",[["subexpr","eq",[["get","global.user.type",["loc",[null,[9,14],[9,30]]]],"admin"],[],["loc",[null,[9,10],[9,39]]]]],[],2,null,["loc",[null,[9,4],[13,11]]]],
      ["content","mission.tab",["loc",[null,[17,10],[17,25]]]],
      ["block","if",[["get","mission.lastRapport",["loc",[null,[20,10],[20,29]]]]],[],3,null,["loc",[null,[20,4],[26,11]]]],
      ["inline","asset-avatar",[["get","global.user.avatar",["loc",[null,[30,37],[30,55]]]]],[],["loc",[null,[30,21],[30,58]]]],
      ["content","global.user.first-name",["loc",[null,[30,70],[30,96]]]],
      ["inline","fa-icon",["angle-down"],[],["loc",[null,[30,98],[30,122]]]],
      ["element","action",["logout"],[],["loc",[null,[33,52],[33,73]]]],
      ["block","link-to",["login"],[],4,null,["loc",[null,[33,74],[33,135]]]]
    ],
    locals: [],
    templates: [child0, child1, child2, child3, child4]
  };
}()));