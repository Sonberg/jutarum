"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('client/adapters/application', ['exports', 'ember-data/adapters/json-api'], function (exports, _emberDataAdaptersJsonApi) {
  exports['default'] = _emberDataAdaptersJsonApi['default'].extend({
    host: 'https://makers-api.herokuapp.com/api/v1',
    shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord(store, snapshotArray) {
      return true;
    }
  });
});
define('client/app', ['exports', 'ember', 'client/resolver', 'ember-load-initializers', 'client/config/environment'], function (exports, _ember, _clientResolver, _emberLoadInitializers, _clientConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _clientConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _clientConfigEnvironment['default'].podModulePrefix,
    Resolver: _clientResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _clientConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define("client/components/-lf-get-outlet-state", ["exports", "liquid-fire/components/-lf-get-outlet-state"], function (exports, _liquidFireComponentsLfGetOutletState) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLfGetOutletState["default"];
    }
  });
});
define('client/components/button-float-projname/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define("client/components/button-float-projname/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 157
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
        dom.setAttribute(el1, "class", "animated fadeIn btn-float drop-target btn-projname hide-for-small-only hide-for-medium-only");
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
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0, 1]), 0, 0);
        return morphs;
      },
      statements: [["content", "model.name", ["loc", [null, [1, 129], [1, 143]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('client/components/button-float-small/component', ['exports', 'ember', 'npm:tether-drop'], function (exports, _ember, _npmTetherDrop) {
  exports['default'] = _ember['default'].Component.extend({
    mission: _ember['default'].inject.service(),
    prefix: null,
    text: null,
    params: null,
    _jQuery: (function () {
      var dropInstance = new _npmTetherDrop['default']({
        target: document.querySelector('.drop-target'),
        content: 'Welcome to the future',
        classes: 'drop-theme-arrows',
        position: 'top center',
        openOn: 'hover',
        hoverCloseDelay: 50
      });
    }).on("didInsertElement")
  });
});
define("client/components/button-float-small/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 96
          }
        },
        "moduleName": "client/components/button-float-small/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [0]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["animated fadeIn btn-float ", ["get", "class", ["loc", [null, [1, 40], [1, 45]]], 0, 0, 0, 0], " drop-target"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["inline", "fa-icon", ["question"], [], ["loc", [null, [1, 64], [1, 86]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/button-float/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    mission: _ember["default"].inject.service(),
    prefix: null,
    text: null,
    params: null,

    _setup: (function () {
      this.set("text", this.get("mission." + this.get("prefix") + "Text"));
      this.set("params", this.get("mission." + this.get("prefix") + "Params"));
    }).on("init").observes("mission.nextText", "mission.backText")
  });
});
define("client/components/button-float/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 88
            }
          },
          "moduleName": "client/components/button-float/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["animated fadeIn btn-float ", ["get", "class", ["loc", [null, [1, 65], [1, 70]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["content", "text", ["loc", [null, [1, 74], [1, 82]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/components/button-float/template.hbs"
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "link-to", [["get", "params.route", ["loc", [null, [1, 11], [1, 23]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [1, 100]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('client/components/camera-component/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),

    mission: _ember['default'].inject.service(),
    pictureTaken: false,
    index: null,
    classNames: ["camera-overlay"],
    webcam: null,

    _setup: (function () {
      Webcam.set({
        width: 640,
        height: 480,
        dest_width: 640,
        dest_height: 480,
        image_format: 'jpeg',
        jpeg_quality: 90,
        force_flash: false,
        flip_horiz: true,
        fps: 45
      });
      Webcam.attach('#camera');
    }).on("didRender"),

    flipButtons: function flipButtons() {
      _ember['default'].$("#frozen").toggle();
      _ember['default'].$("#snap").toggle();
    },

    actions: {
      snap: function snap() {
        Webcam.freeze();
        this.get("flipButtons")();
      },

      use: function use() {
        var self = this;
        console.log(this.get("index"));
        Webcam.snap(function (data) {
          self.get("mission.structure." + self.get("index") + ".images").pushObject(data);
          self.get("close")(self.get("self"));
        });
      },

      retake: function retake() {
        Webcam.unfreeze();
        this.get("flipButtons")();
      }
    }
  });
});
define("client/components/camera-component/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "client/components/camera-component/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "content");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "camera");
        dom.setAttribute(el2, "style", "width:640px; height:480px;");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "buttons");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "frozen");
        dom.setAttribute(el3, "style", "display:none");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        var el5 = dom.createTextNode("Använda bild");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        var el5 = dom.createTextNode("Kasta bilden");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "snap");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        var el5 = dom.createTextNode("Ta bild");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 3]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var element4 = dom.childAt(element0, [3, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element2);
        morphs[1] = dom.createElementMorph(element3);
        morphs[2] = dom.createElementMorph(element4);
        return morphs;
      },
      statements: [["element", "action", ["use"], [], ["loc", [null, [5, 14], [5, 31]]], 0, 0], ["element", "action", ["retake"], [], ["loc", [null, [6, 14], [6, 34]]], 0, 0], ["element", "action", ["snap"], [], ["loc", [null, [9, 14], [9, 32]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/display-list/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    template: "chapter",
    actions: {
      select: function select(obj) {
        this.set("parent.selected", obj);
      }
    }
  });
});
define("client/components/display-list/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 10
              },
              "end": {
                "line": 16,
                "column": 10
              }
            },
            "moduleName": "client/components/display-list/template.hbs"
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
            morphs[0] = dom.createUnsafeMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "asset-icon", [["get", "node.image", ["loc", [null, [15, 26], [15, 36]]], 0, 0, 0, 0]], [], ["loc", [null, [15, 12], [15, 39]]], 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 21,
                  "column": 12
                },
                "end": {
                  "line": 23,
                  "column": 12
                }
              },
              "moduleName": "client/components/display-list/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
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
            statements: [["content", "node.name", ["loc", [null, [22, 14], [22, 27]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 23,
                  "column": 12
                },
                "end": {
                  "line": 25,
                  "column": 12
                }
              },
              "moduleName": "client/components/display-list/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode(" ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
              return morphs;
            },
            statements: [["content", "node.first-name", ["loc", [null, [24, 14], [24, 33]]], 0, 0, 0, 0], ["content", "node.last-name", ["loc", [null, [24, 34], [24, 52]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 10
              },
              "end": {
                "line": 26,
                "column": 10
              }
            },
            "moduleName": "client/components/display-list/template.hbs"
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
          statements: [["block", "if", [["get", "node.name", ["loc", [null, [21, 18], [21, 27]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [21, 12], [25, 19]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 4
            },
            "end": {
              "line": 39,
              "column": 4
            }
          },
          "moduleName": "client/components/display-list/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "text-right text-small width-full");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "text-right");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [7, 1]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5, 1]), 1, 1);
          morphs[3] = dom.createElementMorph(element1);
          morphs[4] = dom.createMorphAt(element1, 1, 1);
          return morphs;
        },
        statements: [["block", "if", [["get", "node.image", ["loc", [null, [14, 16], [14, 26]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [14, 10], [16, 17]]]], ["block", "link-to", ["mission", ["get", "node.id", ["loc", [null, [20, 31], [20, 38]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [20, 10], [26, 22]]]], ["inline", "time-ago", [], ["model", ["subexpr", "@mut", [["get", "node", ["loc", [null, [30, 29], [30, 33]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [30, 12], [30, 35]]], 0, 0], ["element", "action", ["select", ["get", "node", ["loc", [null, [34, 33], [34, 37]]], 0, 0, 0, 0]], [], ["loc", [null, [34, 15], [34, 39]]], 0, 0], ["inline", "fa-icon", [["get", "icon", ["loc", [null, [35, 22], [35, 26]]], 0, 0, 0, 0]], [], ["loc", [null, [35, 12], [35, 28]]], 0, 0]],
        locals: ["node"],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 8
          }
        },
        "moduleName": "client/components/display-list/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("table");
        dom.setAttribute(el1, "class", "table new-mission");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("th");
        var el4 = dom.createTextNode("\n\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("th");
        var el4 = dom.createTextNode("\n\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(element2, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element3, 3, 3);
        morphs[1] = dom.createMorphAt(element3, 5, 5);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        return morphs;
      },
      statements: [["inline", "query-filter-thead", [], ["attr", "name", "title", "Namn"], ["loc", [null, [5, 10], [5, 57]]], 0, 0], ["inline", "query-filter-thead", [], ["attr", "created", "classNames", "text-right", "title", "Senast uppdaterad"], ["loc", [null, [5, 58], [5, 145]]], 0, 0], ["block", "each", [["get", "model", ["loc", [null, [11, 12], [11, 17]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [11, 4], [39, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('client/components/edit-mission/component', ['exports', 'ember', 'client/utils/assets'], function (exports, _ember, _clientUtilsAssets) {
  exports['default'] = _ember['default'].Component.extend({
    global: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),

    structures: ["Utseende", "Fortplantning", "Föda", "Bostad", "Fiender"],
    selected: null,
    icons: [],

    _setup: (function () {
      var arr = [];
      var images = _clientUtilsAssets['default'].icons();
      for (var i = 0; i < images.length; i++) {
        arr.push(images[i].name);
      }
      this.set("icons", arr);
      console.log(this.get("selected.planning"));
    }).on("init").observes("selected"),

    _jQuery: (function () {

      /* Image */
      _ember['default'].$(".select-image").select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Välj bild",
        data: this.get("icons"),
        templateResult: this.get("formatImage")
      });

      _ember['default'].$(".select-image").val([]).select2();
      if (this.get("selected.image")) {
        _ember['default'].$(".select-image").val([this.get("selected.image")]).select2();
      }

      /* Struktur */
      _ember['default'].$(".select-structure-multiple").select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Välj tillgängliga stödstrukturer",
        data: this.get("structures")
      });
      _ember['default'].$(".select-structure-multiple").val([]).select2();

      if (this.get("selected.structures")) {
        var struc = JSON.parse(this.get("selected.structures"));
        _ember['default'].$(".select-structure-multiple").val(struc).select2();
      }
    }).on("didInsertElement").observes("selected"),

    formatImage: function formatImage(state) {
      var path = _clientUtilsAssets['default'].path("icons");
      var ex = _clientUtilsAssets['default'].ext();
      if (!state.loading) {
        console.log(state);
        var $state = $("<span><img src=" + path + state.text + ex + " />" + state.text + "</span>");
        return $state;
      }
    },

    actions: {
      clear: function clear() {
        this.set("selected", null);
      },
      save: function save() {
        var name = _ember['default'].$("input[name='name']").val();
        var body = _ember['default'].$("textarea[name='body']").val();
        var image = _ember['default'].$(".select-image").val();
        var structures = _ember['default'].$(".select-structure-multiple").val();

        // Save current
        if (this.get("selected.id")) {
          console.log("update");
          var mission = this.get("selected");
          mission.set("name", name);
          mission.set("body", body);
          mission.set("image", image);
          mission.set("school-id", this.get("global.school.id"));
          mission.set("structures", JSON.stringify(structures));
          mission.save();
        }

        //Create new
        else if (name && structures) {
            var mission = this.get("store").createRecord("mission", {
              "name": name,
              "body": body,
              "image": image,
              "structures": JSON.stringify(structures)
            });
            mission.save();
          }
      }

    }
  });
});
define("client/components/edit-mission/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          "moduleName": "client/components/edit-mission/template.hbs"
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
          dom.setAttribute(el1, "class", "pb1");
          var el2 = dom.createTextNode("Redigera uppdrag");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          "moduleName": "client/components/edit-mission/template.hbs"
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
          dom.setAttribute(el1, "class", "pb1");
          var el2 = dom.createTextNode("Skapa nytt uppdrag");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 4
            },
            "end": {
              "line": 25,
              "column": 4
            }
          },
          "moduleName": "client/components/edit-mission/template.hbs"
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
          dom.setAttribute(el1, "class", "new-update-button float--center");
          dom.setAttribute(el1, "type", "button");
          dom.setAttribute(el1, "name", "name");
          dom.setAttribute(el1, "value", "Skapa nytt");
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
        statements: [["element", "action", ["clear"], [], ["loc", [null, [24, 99], [24, 117]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 4
            },
            "end": {
              "line": 29,
              "column": 4
            }
          },
          "moduleName": "client/components/edit-mission/template.hbs"
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
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "name", "name");
          dom.setAttribute(el1, "value", "Spara förändringar");
          dom.setAttribute(el1, "class", "float--center new-update-button");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 4
            },
            "end": {
              "line": 33,
              "column": 4
            }
          },
          "moduleName": "client/components/edit-mission/template.hbs"
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
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "name", "name");
          dom.setAttribute(el1, "value", "Skapa");
          dom.setAttribute(el1, "class", "new-update-button");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 36,
            "column": 6
          }
        },
        "moduleName": "client/components/edit-mission/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "mission-updater p1");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mb1");
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
        dom.setAttribute(el3, "type", "text");
        dom.setAttribute(el3, "name", "name");
        dom.setAttribute(el3, "placeholder", "Namn");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "image mb1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4, "class", "select-image mb1");
        dom.setAttribute(el4, "name", "image");
        dom.setAttribute(el4, "required", "");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "structures");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4, "class", "select-structure-multiple mb1");
        dom.setAttribute(el4, "name", "structures");
        dom.setAttribute(el4, "multiple", "multiple");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("textarea");
        dom.setAttribute(el3, "name", "body");
        dom.setAttribute(el3, "class", "mt1");
        dom.setAttribute(el3, "rows", "8");
        dom.setAttribute(el3, "cols", "40");
        dom.setAttribute(el3, "placeholder", "Beskrivning");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "display-flex");
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
        var element3 = dom.childAt(element1, [11]);
        var morphs = new Array(6);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[2] = dom.createAttrMorph(element2, 'value');
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [9]), 0, 0);
        morphs[4] = dom.createMorphAt(element3, 1, 1);
        morphs[5] = dom.createMorphAt(element3, 3, 3);
        return morphs;
      },
      statements: [["element", "action", ["save"], ["on", "submit"], ["loc", [null, [2, 8], [2, 37]]], 0, 0], ["block", "if", [["get", "selected.id", ["loc", [null, [4, 10], [4, 21]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [4, 4], [8, 11]]]], ["attribute", "value", ["get", "selected.name", ["loc", [null, [10, 63], [10, 76]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "selected.body", ["loc", [null, [20, 83], [20, 100]]], 0, 0, 0, 0], ["block", "if", [["get", "selected.id", ["loc", [null, [23, 10], [23, 21]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [23, 4], [25, 11]]]], ["block", "if", [["get", "selected.id", ["loc", [null, [27, 10], [27, 21]]], 0, 0, 0, 0]], [], 3, 4, ["loc", [null, [27, 4], [33, 11]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define('client/components/edit-student/component', ['exports', 'ember', 'client/utils/assets', 'npm:pdfobject'], function (exports, _ember, _clientUtilsAssets, _npmPdfobject) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),

    structures: ["Utseende", "Fortplantning", "Föda", "Bostad", "Fiender"],
    selected: null,
    icons: [],

    _setup: (function () {
      var arr = [];
      var images = _clientUtilsAssets['default'].icons();
      for (var i = 0; i < images.length; i++) {
        arr.push(images[i].name);
      }
      this.set("icons", arr);
      console.log(this.get("selected.planning"));
    }).on("init").observes("selected"),

    _jQuery: (function () {

      /* Image */
      _ember['default'].$(".select-image").select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Välj bild",
        data: this.get("icons"),
        templateResult: this.get("formatImage")
      });

      _ember['default'].$(".select-image").val([]).select2();
      if (this.get("selected.image")) {
        _ember['default'].$(".select-image").val([this.get("selected.image")]).select2();
      }

      /* Struktur */
      _ember['default'].$(".select-structure-multiple").select2({
        minimumResultsForSearch: Infinity,
        placeholder: "Välj tillgängliga stödstrukturer",
        data: this.get("structures")
      });
      _ember['default'].$(".select-structure-multiple").val([]).select2();

      if (this.get("selected.structures")) {
        var struc = JSON.parse(this.get("selected.structures"));
        _ember['default'].$(".select-structure-multiple").val(struc).select2();
      }
    }).on("didInsertElement").observes("selected"),

    formatImage: function formatImage(state) {
      var path = _clientUtilsAssets['default'].path("icons");
      var ex = _clientUtilsAssets['default'].ext();
      if (!state.loading) {
        console.log(state);
        var $state = $("<span><img src=" + path + state.text + ex + " />" + state.text + "</span>");
        return $state;
      }
    },

    actions: {
      clear: function clear() {
        this.set("selected", null);
      },
      save: function save() {
        var name = _ember['default'].$("input[name='name']").val();
        var body = _ember['default'].$("textarea[name='body']").val();
        var image = _ember['default'].$(".select-image").val();
        var structures = _ember['default'].$(".select-structure-multiple").val();

        // Save current
        if (this.get("selected.id")) {
          console.log("update");
          var mission = this.get("selected");
          mission.set("name", name);
          mission.set("body", body);
          mission.set("image", image);
          mission.set("structures", JSON.stringify(structures));
          mission.save();
        }

        //Create new
        else if (name && structures && body) {
            var mission = this.get("store").createRecord("mission", {
              "name": name,
              "body": body,
              "image": image,
              "structures": JSON.stringify(structures)
            });
            mission.save();
          }
      }

    }
  });
});
define("client/components/edit-student/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          dom.setAttribute(el1, "class", "pb1");
          var el2 = dom.createTextNode("Redigera uppdrag");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          dom.setAttribute(el1, "class", "pb1");
          var el2 = dom.createTextNode("Skapa nytt uppdrag");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          dom.setAttribute(el1, "class", "new-update-button float--center");
          dom.setAttribute(el1, "type", "button");
          dom.setAttribute(el1, "name", "name");
          dom.setAttribute(el1, "value", "Skapa nytt");
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
        statements: [["element", "action", ["clear"], [], ["loc", [null, [25, 99], [25, 117]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "name", "name");
          dom.setAttribute(el1, "value", "Spara förändringar");
          dom.setAttribute(el1, "class", "float--center new-update-button");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "name", "name");
          dom.setAttribute(el1, "value", "Skapa");
          dom.setAttribute(el1, "class", "new-update-button");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
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
        dom.setAttribute(el1, "class", "mission-updater p1");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mb1");
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
        dom.setAttribute(el3, "type", "text");
        dom.setAttribute(el3, "name", "name");
        dom.setAttribute(el3, "placeholder", "Förnamn");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("input");
        dom.setAttribute(el3, "type", "text");
        dom.setAttribute(el3, "name", "name");
        dom.setAttribute(el3, "placeholder", "Efternamn");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "image mb1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4, "class", "select-image mb1");
        dom.setAttribute(el4, "name", "image");
        dom.setAttribute(el4, "required", "");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "structures");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4, "class", "select-structure-multiple mb1");
        dom.setAttribute(el4, "name", "structures");
        dom.setAttribute(el4, "multiple", "multiple");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("textarea");
        dom.setAttribute(el3, "name", "body");
        dom.setAttribute(el3, "class", "mt1");
        dom.setAttribute(el3, "rows", "8");
        dom.setAttribute(el3, "cols", "40");
        dom.setAttribute(el3, "placeholder", "Beskrivning");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "display-flex");
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
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[2] = dom.createAttrMorph(element2, 'value');
        morphs[3] = dom.createAttrMorph(element3, 'value');
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [11]), 0, 0);
        morphs[5] = dom.createMorphAt(element4, 1, 1);
        morphs[6] = dom.createMorphAt(element4, 3, 3);
        return morphs;
      },
      statements: [["element", "action", ["save"], ["on", "submit"], ["loc", [null, [2, 8], [2, 37]]], 0, 0], ["block", "if", [["get", "selected.id", ["loc", [null, [4, 10], [4, 21]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [4, 4], [8, 11]]]], ["attribute", "value", ["get", "selected.first-name", ["loc", [null, [10, 66], [10, 85]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "value", ["get", "selected.last-name", ["loc", [null, [11, 68], [11, 86]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "selected.body", ["loc", [null, [21, 83], [21, 100]]], 0, 0, 0, 0], ["block", "if", [["get", "selected.id", ["loc", [null, [24, 10], [24, 21]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [24, 4], [26, 11]]]], ["block", "if", [["get", "selected.id", ["loc", [null, [28, 10], [28, 21]]], 0, 0, 0, 0]], [], 3, 4, ["loc", [null, [28, 4], [34, 11]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define('client/components/ember-load-remover', ['exports', 'ember-load/components/ember-load-remover'], function (exports, _emberLoadComponentsEmberLoadRemover) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLoadComponentsEmberLoadRemover['default'];
    }
  });
});
define('client/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _emberFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('client/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _emberFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaList['default'];
    }
  });
});
define('client/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _emberFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaStack['default'];
    }
  });
});
define("client/components/illiquid-model", ["exports", "liquid-fire/components/illiquid-model"], function (exports, _liquidFireComponentsIlliquidModel) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsIlliquidModel["default"];
    }
  });
});
define("client/components/image-slider/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    store: _ember["default"].inject.service(),
    classNames: ["flex", "grey"],
    id: null,
    images: null,
    _setup: (function () {
      var self = this;
      console.log(this.get("id"));
      this.get("store").query("image", { "rapport-id": this.get("id") }).then(function (images) {
        self.set("images", images);
      });
    }).on("init").observes("id")
  });
});
define("client/components/image-slider/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "client/components/image-slider/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "class", "float-center");
          dom.setAttribute(el1, "style", "max-height: 450px;");
          dom.setAttribute(el1, "alt", "");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'src');
          return morphs;
        },
        statements: [["attribute", "src", ["get", "img.image", ["loc", [null, [2, 13], [2, 22]]], 0, 0, 0, 0], 0, 0, 0, 0]],
        locals: ["img"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 9
          }
        },
        "moduleName": "client/components/image-slider/template.hbs"
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
      statements: [["block", "each", [["get", "images", ["loc", [null, [1, 8], [1, 14]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [3, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("client/components/information-photo/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    classNames: ["information-photo"],
    attributeBindings: ["contenteditable"],
    contenteditable: false,
    url: null,
    placeholder: "+"
  });
});
define("client/components/information-photo/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "client/components/information-photo/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "placeholder");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.setAttribute(el1, "height", "100");
        dom.setAttribute(el1, "width", "100");
        dom.setAttribute(el1, "alt", "");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element0, 'src');
        return morphs;
      },
      statements: [["content", "placeholder", ["loc", [null, [2, 2], [2, 17]]], 0, 0, 0, 0], ["attribute", "src", ["concat", [["get", "url", ["loc", [null, [4, 12], [4, 15]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/information-structure/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "client/components/information-structure/template.hbs"
      },
      isEmpty: true,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/liquid-bind", ["exports", "liquid-fire/components/liquid-bind"], function (exports, _liquidFireComponentsLiquidBind) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidBind["default"];
    }
  });
});
define("client/components/liquid-child", ["exports", "liquid-fire/components/liquid-child"], function (exports, _liquidFireComponentsLiquidChild) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidChild["default"];
    }
  });
});
define("client/components/liquid-container", ["exports", "liquid-fire/components/liquid-container"], function (exports, _liquidFireComponentsLiquidContainer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidContainer["default"];
    }
  });
});
define("client/components/liquid-if", ["exports", "liquid-fire/components/liquid-if"], function (exports, _liquidFireComponentsLiquidIf) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidIf["default"];
    }
  });
});
define("client/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidFireComponentsLiquidMeasured) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured["default"];
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured.measure;
    }
  });
});
define("client/components/liquid-outlet", ["exports", "liquid-fire/components/liquid-outlet"], function (exports, _liquidFireComponentsLiquidOutlet) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidOutlet["default"];
    }
  });
});
define("client/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidFireComponentsLiquidSpacer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSpacer["default"];
    }
  });
});
define('client/components/liquid-sync', ['exports', 'liquid-fire/components/liquid-sync'], function (exports, _liquidFireComponentsLiquidSync) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSync['default'];
    }
  });
});
define("client/components/liquid-unless", ["exports", "liquid-fire/components/liquid-unless"], function (exports, _liquidFireComponentsLiquidUnless) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidUnless["default"];
    }
  });
});
define("client/components/liquid-versions", ["exports", "liquid-fire/components/liquid-versions"], function (exports, _liquidFireComponentsLiquidVersions) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidVersions["default"];
    }
  });
});
define("client/components/mission-alert/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    mission: _ember["default"].inject.service(),
    classNames: ["p1", "grey", "br", "mx2", "position-relative"],
    model: null,
    isVisible: (function () {
      var lastRapport = parseInt(this.get("mission.lastRapport.mission-id"));
      var lastestId = parseInt(this.get("latest").id);
      if (lastestId === lastRapport) {
        return false;
      }
      return true;
    }).observes("latest").on("init").property("isVisible"),
    latest: (function () {
      if (this.get("model")) {
        var missions = this.get("missions");
        return missions.get("lastObject");
      }
    }).observes("model.[]").on("init").property("latest"),

    missions: _ember["default"].computed('model.@each', function () {
      var model = this.get('model');
      if (model) {
        var arr = model.map(function (mission, index, enumerable) {
          return {
            "id": mission.get("id"),
            "name": mission.get("name")
          };
        });
        return arr;
      }
    }),

    actions: {
      close: function close() {
        var el = this.element;
        _ember["default"].$(el).animate({
          left: "-3000"
        }, 500, function () {
          _ember["default"].$(el).slideUp(function () {
            _ember["default"].$(el).remove();
          });
        });
      }
    }
  });
});
define("client/components/mission-alert/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 11
          }
        },
        "moduleName": "client/components/mission-alert/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "pl1");
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "badge mr1");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "m0");
        var el3 = dom.createTextNode("Uppdraget ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("b");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" finns nu tillgängligt! Lycka till med rapporten\n    och uppgiften!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "class", "close-button");
        dom.setAttribute(el1, "aria-label", "Close alert");
        dom.setAttribute(el1, "type", "button");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "aria-hidden", "true");
        var el3 = dom.createTextNode("×");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 0, 0);
        morphs[2] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [["inline", "fa-icon", ["exclamation"], [], ["loc", [null, [1, 41], [1, 66]]], 0, 0], ["content", "latest.name", ["loc", [null, [1, 103], [1, 118]]], 0, 0, 0, 0], ["element", "action", ["close"], [], ["loc", [null, [2, 99], [2, 118]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/mission-button/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    classNames: ["animated-hover", "faa-parent", "button", "secondary", "mission"],
    isShowingModal: false,
    model: null,
    mouseOver: false,

    mouseEnter: function mouseEnter(e) {
      this.set("hoverActive", true);
    },
    mouseLeave: function mouseLeave(e) {
      this.set("hoverActive", false);
    },

    actions: {
      toggleModal: function toggleModal() {
        console.log("toggle");
        this.toggleProperty('isShowingModal');
      }
    }
  });
});
define("client/components/mission-button/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "client/components/mission-button/template.hbs"
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
            morphs[0] = dom.createUnsafeMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "asset-icon", [["get", "model.image", ["loc", [null, [4, 20], [4, 31]]], 0, 0, 0, 0], "hide-for-small-only"], [], ["loc", [null, [4, 6], [4, 56]]], 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "client/components/mission-button/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "m--content-wrapper animated fadeIn");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "m--title pt1");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "m--cta-start pt1");
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var element1 = dom.childAt(element0, [5]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(element0, 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [0]), 0, 0);
          morphs[3] = dom.createMorphAt(element1, 2, 2);
          return morphs;
        },
        statements: [["block", "if", [["get", "model.image", ["loc", [null, [3, 10], [3, 21]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [3, 4], [5, 11]]]], ["content", "model.name", ["loc", [null, [6, 30], [6, 44]]], 0, 0, 0, 0], ["content", "text", ["loc", [null, [7, 35], [7, 43]]], 0, 0, 0, 0], ["inline", "fa-icon", ["angle-right faa-horizontal m--icon"], ["pull", "right"], ["loc", [null, [7, 49], [7, 110]]], 0, 0]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "client/components/mission-button/template.hbs"
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
      statements: [["block", "link-to", ["team", ["get", "model.id", ["loc", [null, [1, 18], [1, 26]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [9, 12]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("client/components/mission-component/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    mission: _ember["default"].inject.service(),
    route: null,
    _setup: (function () {
      if (this.get("mission.routes").indexOf(this.get("mission.route")) > -1) {
        this.set("mission.activeTab", this.get("mission.route"));
      } else if (false) {} else {
        //this.transitionTo('/missions/10/not-found');
      }

      if (this.get("mission.route") === "write") {
        this.set("mission.steps.6.title", "Spara och stäng");
        _ember["default"].$(".next").addClass("ready");
      } else {
        this.set("mission.steps.6.title", "Vidare");
        _ember["default"].$(".next").removeClass("ready");
      }
    }).on("init").observes("mission.route")
  });
});
define("client/components/mission-component/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "client/components/mission-component/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
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
        statements: [["content", "mission.mission-team", ["loc", [null, [4, 2], [4, 26]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "client/components/mission-component/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
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
        statements: [["content", "mission.mission-structure", ["loc", [null, [9, 2], [9, 31]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 0
            },
            "end": {
              "line": 16,
              "column": 0
            }
          },
          "moduleName": "client/components/mission-component/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
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
        statements: [["content", "mission.mission-knowledge", ["loc", [null, [15, 2], [15, 31]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 0
            },
            "end": {
              "line": 22,
              "column": 0
            }
          },
          "moduleName": "client/components/mission-component/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
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
        statements: [["content", "mission.mission-explore", ["loc", [null, [21, 2], [21, 29]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 0
            },
            "end": {
              "line": 27,
              "column": 0
            }
          },
          "moduleName": "client/components/mission-component/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
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
        statements: [["content", "mission.mission-write", ["loc", [null, [26, 2], [26, 27]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
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
        "moduleName": "client/components/mission-component/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" TEAM ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" STRUCTURE ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" KNOWLEDGE ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" EXPLORE ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" WRITE ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 7, 7, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 11, 11, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 19, 19, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "liquid-if", [["subexpr", "eq", [["get", "mission.route", ["loc", [null, [3, 17], [3, 30]]], 0, 0, 0, 0], "team"], [], ["loc", [null, [3, 13], [3, 38]]], 0, 0]], ["class", "tab"], 0, null, ["loc", [null, [3, 0], [5, 14]]]], ["block", "liquid-if", [["subexpr", "eq", [["get", "mission.route", ["loc", [null, [8, 17], [8, 30]]], 0, 0, 0, 0], "structure"], [], ["loc", [null, [8, 13], [8, 43]]], 0, 0]], ["class", "tab"], 1, null, ["loc", [null, [8, 0], [10, 14]]]], ["block", "liquid-if", [["subexpr", "eq", [["get", "mission.route", ["loc", [null, [14, 17], [14, 30]]], 0, 0, 0, 0], "knowledge"], [], ["loc", [null, [14, 13], [14, 43]]], 0, 0]], ["class", "tab"], 2, null, ["loc", [null, [14, 0], [16, 14]]]], ["block", "liquid-if", [["subexpr", "eq", [["get", "mission.route", ["loc", [null, [20, 17], [20, 30]]], 0, 0, 0, 0], "explore"], [], ["loc", [null, [20, 13], [20, 41]]], 0, 0]], ["class", "tab"], 3, null, ["loc", [null, [20, 0], [22, 14]]]], ["block", "liquid-if", [["subexpr", "eq", [["get", "mission.route", ["loc", [null, [25, 17], [25, 30]]], 0, 0, 0, 0], "write"], [], ["loc", [null, [25, 13], [25, 39]]], 0, 0]], ["class", "tab"], 4, null, ["loc", [null, [25, 0], [27, 14]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("client/components/mission-report-tag-filter/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    store: _ember["default"].inject.service(),
    classNames: ["menu-margin"],
    params: null,
    _setup: (function () {
      this.set("params", this.router.router.state.fullQueryParams);
    }).on("init"),

    missions: (function () {
      return this.get("store").findAll("mission");
    }).property("missions"),

    users: (function () {
      return this.get("store").findAll("user");
    }).property("users"),

    classes: (function () {
      return this.get("store").findAll("class");
    }).property("classes"),

    actions: {
      filterMission: function filterMission(value) {
        this.router.transitionTo({ queryParams: { mission: value } });
      },
      filterUser: function filterUser(value) {
        this.router.transitionTo({ queryParams: { user: value } });
      },
      filterClass: function filterClass(value) {
        this.router.transitionTo({ queryParams: { "class": value } });
      }
    }
  });
});
define("client/components/mission-report-tag-filter/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 6
            },
            "end": {
              "line": 7,
              "column": 6
            }
          },
          "moduleName": "client/components/mission-report-tag-filter/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
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
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element2, 'value');
          morphs[1] = dom.createAttrMorph(element2, 'selected');
          morphs[2] = dom.createMorphAt(element2, 0, 0);
          return morphs;
        },
        statements: [["attribute", "value", ["concat", [["get", "mission.id", ["loc", [null, [6, 27], [6, 37]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "selected", ["subexpr", "eq", [["get", "params.mission", ["loc", [null, [6, 55], [6, 69]]], 0, 0, 0, 0], ["get", "mission.id", ["loc", [null, [6, 70], [6, 80]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [6, 82]]], 0, 0], 0, 0, 0, 0], ["content", "mission.name", ["loc", [null, [6, 83], [6, 99]]], 0, 0, 0, 0]],
        locals: ["mission"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 6
            },
            "end": {
              "line": 17,
              "column": 6
            }
          },
          "moduleName": "client/components/mission-report-tag-filter/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
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
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element1, 'value');
          morphs[1] = dom.createAttrMorph(element1, 'selected');
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          morphs[3] = dom.createMorphAt(element1, 2, 2);
          return morphs;
        },
        statements: [["attribute", "value", ["concat", [["get", "user.id", ["loc", [null, [16, 27], [16, 34]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "selected", ["subexpr", "eq", [["get", "params.user", ["loc", [null, [16, 52], [16, 63]]], 0, 0, 0, 0], ["get", "user.id", ["loc", [null, [16, 64], [16, 71]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [16, 73]]], 0, 0], 0, 0, 0, 0], ["content", "user.first-name", ["loc", [null, [16, 74], [16, 93]]], 0, 0, 0, 0], ["content", "user.last-name", ["loc", [null, [16, 94], [16, 112]]], 0, 0, 0, 0]],
        locals: ["user"],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 6
            },
            "end": {
              "line": 28,
              "column": 6
            }
          },
          "moduleName": "client/components/mission-report-tag-filter/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
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
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createAttrMorph(element0, 'selected');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "value", ["concat", [["get", "class.id", ["loc", [null, [27, 27], [27, 35]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "selected", ["subexpr", "eq", [["get", "params.class", ["loc", [null, [27, 53], [27, 65]]], 0, 0, 0, 0], ["get", "class.id", ["loc", [null, [27, 66], [27, 74]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [27, 76]]], 0, 0], 0, 0, 0, 0], ["content", "class.title", ["loc", [null, [27, 77], [27, 92]]], 0, 0, 0, 0]],
        locals: ["class"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
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
        "moduleName": "client/components/mission-report-tag-filter/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "medium-4 columns");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        dom.setAttribute(el2, "class", "jr--title");
        var el3 = dom.createTextNode("Uppdrag");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("select");
        dom.setAttribute(el2, "class", "mission");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("option");
        dom.setAttribute(el3, "value", "undefined");
        var el4 = dom.createTextNode("Alla");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "medium-4 columns");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        dom.setAttribute(el2, "class", "jr--title");
        var el3 = dom.createTextNode("Elev");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("select");
        dom.setAttribute(el2, "class", "user");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("option");
        dom.setAttribute(el3, "value", "undefined");
        var el4 = dom.createTextNode("Alla");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "medium-4 columns");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        dom.setAttribute(el2, "class", "jr--title");
        var el3 = dom.createTextNode("Årskurs");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("select");
        dom.setAttribute(el2, "class", "klass");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("option");
        dom.setAttribute(el3, "value", "undefined");
        var el4 = dom.createTextNode("Alla");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0, 3]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(fragment, [2, 3]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(fragment, [4, 3]);
        var element8 = dom.childAt(element7, [1]);
        var morphs = new Array(9);
        morphs[0] = dom.createAttrMorph(element3, 'onchange');
        morphs[1] = dom.createAttrMorph(element4, 'selected');
        morphs[2] = dom.createMorphAt(element3, 3, 3);
        morphs[3] = dom.createAttrMorph(element5, 'onchange');
        morphs[4] = dom.createAttrMorph(element6, 'selected');
        morphs[5] = dom.createMorphAt(element5, 3, 3);
        morphs[6] = dom.createAttrMorph(element7, 'onchange');
        morphs[7] = dom.createAttrMorph(element8, 'selected');
        morphs[8] = dom.createMorphAt(element7, 3, 3);
        return morphs;
      },
      statements: [["attribute", "onchange", ["subexpr", "action", ["filterMission"], ["value", "target.value"], ["loc", [null, [null, null], [3, 85]]], 0, 0], 0, 0, 0, 0], ["attribute", "selected", ["subexpr", "eq", [["get", "params.mission", ["loc", [null, [4, 44], [4, 58]]], 0, 0, 0, 0], 0], [], ["loc", [null, [null, null], [4, 62]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "missions", ["loc", [null, [5, 14], [5, 22]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [5, 6], [7, 15]]]], ["attribute", "onchange", ["subexpr", "action", ["filterUser"], ["value", "target.value"], ["loc", [null, [null, null], [13, 77]]], 0, 0], 0, 0, 0, 0], ["attribute", "selected", ["subexpr", "eq", [["get", "params.user", ["loc", [null, [14, 44], [14, 55]]], 0, 0, 0, 0], 0], [], ["loc", [null, [null, null], [14, 59]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "users", ["loc", [null, [15, 14], [15, 19]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [15, 6], [17, 15]]]], ["attribute", "onchange", ["subexpr", "action", ["filterClass"], ["value", "target.value"], ["loc", [null, [null, null], [24, 81]]], 0, 0], 0, 0, 0, 0], ["attribute", "selected", ["subexpr", "eq", [["get", "params.class", ["loc", [null, [25, 44], [25, 56]]], 0, 0, 0, 0], 0], [], ["loc", [null, [null, null], [25, 60]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "classes", ["loc", [null, [26, 14], [26, 21]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [26, 6], [28, 15]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define('client/components/mission-report/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    model: null,
    buttonClass: "animated-hover faa-parent",
    tags: ['Engelska', 'Vår', '3e']
  });
});
define("client/components/mission-report/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 4
              },
              "end": {
                "line": 13,
                "column": 4
              }
            },
            "moduleName": "client/components/mission-report/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "m--tag");
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
          statements: [["content", "tag", ["loc", [null, [12, 25], [12, 32]]], 0, 0, 0, 0]],
          locals: ["tag"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 17,
              "column": 2
            }
          },
          "moduleName": "client/components/mission-report/template.hbs"
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
          dom.setAttribute(el1, "class", "row flex");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "text");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "m--title ml2");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns text hide-for-small-only");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "m--under");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "text columns text-right hide-for-small-only");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
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
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createUnsafeMorphAt(dom.childAt(element0, [1, 1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 1]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
          morphs[3] = dom.createMorphAt(element0, 7, 7);
          return morphs;
        },
        statements: [["content", "model.name", ["loc", [null, [4, 33], [4, 49]]], 0, 0, 0, 0], ["inline", "team", [["get", "model.team", ["loc", [null, [7, 38], [7, 48]]], 0, 0, 0, 0]], [], ["loc", [null, [7, 31], [7, 50]]], 0, 0], ["block", "each", [["get", "tags", ["loc", [null, [11, 12], [11, 16]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [11, 4], [13, 13]]]], ["inline", "fa-icon", ["angle-right faa-horizontal m--icon mr2"], ["pull", "right"], ["loc", [null, [15, 4], [15, 69]]], 0, 0]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 14
          }
        },
        "moduleName": "client/components/mission-report/template.hbs"
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
      statements: [["block", "link-to", ["rapport", ["get", "model.id", ["loc", [null, [1, 21], [1, 29]]], 0, 0, 0, 0]], ["class", ["subexpr", "@mut", [["get", "buttonClass", ["loc", [null, [1, 36], [1, 47]]], 0, 0, 0, 0]], [], [], 0, 0]], 0, null, ["loc", [null, [1, 0], [17, 14]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('client/components/nav-notification/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    count: 4,
    tagName: 'li'
  });
});
define("client/components/nav-notification/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/components/nav-notification/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "alert badge");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        return morphs;
      },
      statements: [["content", "count", ["loc", [null, [1, 26], [1, 35]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/navigation-global/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    global: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    activeTab: (function () {
      return this.get("mission.tab");
    }).observes("mission.tab").on("init").property("activeTab"),

    _jQuery: (function () {
      _ember["default"].$('#menu-dropit').dropit({
        action: 'click',
        triggerEl: 'a'
      });
    }).on("didInsertElement"),

    actions: {
      logout: function logout() {
        this.cookie.removeCookie('user');
        this.cookie.removeCookie('school');
        this.set("global.user", null);
        this.set("global.school", null);
        window.location.reload(true);
      }
    }

  });
});
define("client/components/navigation-global/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
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
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["dashboard-missions"], [], 0, null, ["loc", [null, [11, 10], [11, 72]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
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
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
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
            dom.setAttribute(el1, "class", "pr2");
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
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["block", "link-to", [["get", "mission.lastRoute", ["loc", [null, [23, 21], [23, 38]]], 0, 0, 0, 0], ["get", "global.mission.id", ["loc", [null, [23, 39], [23, 56]]], 0, 0, 0, 0]], ["classNames", "last"], 0, null, ["loc", [null, [23, 10], [23, 110]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "missionVisible", [["get", "router.currentRouteName", ["loc", [null, [21, 28], [21, 51]]], 0, 0, 0, 0]], [], ["loc", [null, [21, 12], [21, 52]]], 0, 0]], [], 0, null, ["loc", [null, [21, 6], [25, 13]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
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
        dom.setAttribute(el1, "class", "top-bar display-flex");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2, "class", "float--left menu");
        dom.setAttribute(el2, "id", "menu-dropit2");
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
        dom.setAttribute(el2, "class", "mission-nav float--center menu");
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
        dom.setAttribute(el2, "class", "account menu float--right");
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
        dom.setAttribute(el2, "class", "account menu float--right");
        dom.setAttribute(el2, "id", "menu-dropit");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#");
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
        dom.setAttribute(el4, "class", "menu dropit");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("button");
        dom.setAttribute(el7, "type", "logout");
        dom.setAttribute(el7, "name", "button");
        var el8 = dom.createTextNode("Logga ut ");
        dom.appendChild(el7, el8);
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
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(element1, 5, 5);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [3, 1, 1]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
        morphs[5] = dom.createUnsafeMorphAt(element3, 0, 0);
        morphs[6] = dom.createMorphAt(element3, 2, 2);
        morphs[7] = dom.createMorphAt(element3, 4, 4);
        morphs[8] = dom.createElementMorph(element4);
        morphs[9] = dom.createMorphAt(element4, 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], [], 0, null, ["loc", [null, [4, 6], [4, 41]]]], ["block", "link-to", ["rapports"], [], 1, null, ["loc", [null, [7, 6], [7, 48]]]], ["block", "if", [["subexpr", "eq", [["get", "global.user.type", ["loc", [null, [9, 14], [9, 30]]], 0, 0, 0, 0], "admin"], [], ["loc", [null, [9, 10], [9, 39]]], 0, 0]], [], 2, null, ["loc", [null, [9, 4], [13, 11]]]], ["content", "mission.tab", ["loc", [null, [17, 10], [17, 25]]], 0, 0, 0, 0], ["block", "if", [["get", "mission.lastRapport", ["loc", [null, [20, 10], [20, 29]]], 0, 0, 0, 0]], [], 3, null, ["loc", [null, [20, 4], [26, 11]]]], ["inline", "asset-avatar", [["get", "global.user.avatar", ["loc", [null, [30, 37], [30, 55]]], 0, 0, 0, 0]], [], ["loc", [null, [30, 21], [30, 58]]], 0, 0], ["content", "global.user.first-name", ["loc", [null, [30, 70], [30, 96]]], 0, 0, 0, 0], ["inline", "fa-icon", ["angle-down"], [], ["loc", [null, [30, 98], [30, 122]]], 0, 0], ["element", "action", ["logout"], [], ["loc", [null, [33, 52], [33, 73]]], 0, 0], ["inline", "fa-icon", ["logout"], [], ["loc", [null, [33, 104], [33, 124]]], 0, 0]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define('client/components/navigation-user/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define("client/components/navigation-user/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/components/navigation-user/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("kalle Karlsson ");
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
      statements: [["inline", "fa-icon", ["chevron-down"], [], ["loc", [null, [1, 15], [1, 41]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('client/components/news-component/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['news'],
    data: null
  });
});
define("client/components/news-component/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/components/news-component/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "title size--large");
        var el2 = dom.createTextNode("Välkommen, Karl");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/query-filter-thead/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    tagName: "th",
    attr: "",
    title: "",
    icon: "caret-up",
    dir: "desc",

    click: function click(e) {
      var params = this.router.router.state.queryParams;
      this.get("setOrder")(params, this);
      this.get("setClass")(this.element);
    },

    _check: (function () {
      var params = this.router.router.state.queryParams;

      // Set default
      if (params.sort === this.get("attr")) {
        this.get("setClass")(this.element);
      }

      this.get("setOrder")(params, this);
    }).on("didInsertElement"),

    setClass: function setClass(el) {
      _ember["default"].$(".caret").removeClass("caret");
      _ember["default"].$(el).addClass("caret");
    },

    setOrder: function setOrder(params, self) {
      console.log("setOrder");
      console.log(params);
      if (self.get("dir") === "desc") {
        self.set("icon", "caret-down");
        self.set("dir", "asc");
      } else {
        self.set("icon", "caret-up");
        self.set("dir", "desc");
      }
    }
  });
});
define("client/components/query-filter-thead/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 74
            }
          },
          "moduleName": "client/components/query-filter-thead/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
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
        statements: [["content", "title", ["loc", [null, [1, 48], [1, 57]]], 0, 0, 0, 0], ["inline", "fa-icon", [["get", "icon", ["loc", [null, [1, 68], [1, 72]]], 0, 0, 0, 0]], [], ["loc", [null, [1, 58], [1, 74]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 86
          }
        },
        "moduleName": "client/components/query-filter-thead/template.hbs"
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
      statements: [["block", "link-to", [["subexpr", "query-params", [], ["sort", ["get", "attr", ["loc", [null, [1, 30], [1, 34]]], 0, 0, 0, 0], "order", ["get", "dir", ["loc", [null, [1, 41], [1, 44]]], 0, 0, 0, 0]], ["loc", [null, [1, 11], [1, 46]]], 0, 0]], [], 0, null, ["loc", [null, [1, 0], [1, 86]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("client/components/scroll-view/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    tagName: ""
  });
});
define("client/components/scroll-view/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 6
          }
        },
        "moduleName": "client/components/scroll-view/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "scroll");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [2, 2], [2, 11]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/step-component/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    navigator: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    route: null,
    model: null,

    next: (function (self) {
      if (this) {
        self = this;
      }
      var index = self.get("mission.routes").indexOf(self.get("router.currentRouteName")) + 1;
      var next = self.get("mission.steps." + index + ".linkTo");
      self.set("mission.steps.5.linkTo", next);
    }).on("init").observes("router.currentRouteName"),

    back: function back(self) {
      history.back();
    },

    actions: {
      choose: function choose(step) {
        if (step.action === "next") {
          this.get("next")(this);
        } else if (step === "back") {
          this.get("back")(this);
        }
      },

      createRecord: function createRecord() {
        this.get("mission.createRecord")(this.get("mission"));
      }
    }
  });
});
define("client/components/step-component/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 6,
                  "column": 14
                },
                "end": {
                  "line": 8,
                  "column": 14
                }
              },
              "moduleName": "client/components/step-component/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "title");
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
            statements: [["content", "step.title", ["loc", [null, [7, 33], [7, 47]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 11,
                "column": 4
              }
            },
            "moduleName": "client/components/step-component/template.hbs"
          },
          isEmpty: false,
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "content");
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("          ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var element3 = dom.childAt(element2, [1]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element2, 'class');
            morphs[1] = dom.createElementMorph(element3);
            morphs[2] = dom.createMorphAt(element3, 1, 1);
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["step ", ["get", "step.classNames", ["loc", [null, [4, 25], [4, 40]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["choose", ["get", "step", ["loc", [null, [5, 50], [5, 54]]], 0, 0, 0, 0]], [], ["loc", [null, [5, 31], [5, 57]]], 0, 0], ["block", "link-to", [["get", "step.linkTo", ["loc", [null, [6, 25], [6, 36]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [6, 14], [8, 26]]]]],
          locals: ["step", "index"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "client/components/step-component/template.hbs"
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
        statements: [["block", "each", [["get", "mission.steps", ["loc", [null, [3, 12], [3, 25]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [3, 4], [11, 13]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 4
              },
              "end": {
                "line": 18,
                "column": 4
              }
            },
            "moduleName": "client/components/step-component/template.hbs"
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
            dom.setAttribute(el1, "class", "content");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "title");
            var el3 = dom.createTextNode("Gå tillbaka");
            dom.appendChild(el2, el3);
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
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element1);
            return morphs;
          },
          statements: [["element", "action", ["choose", "back"], [], ["loc", [null, [15, 27], [15, 56]]], 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
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
            "moduleName": "client/components/step-component/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "content");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "title");
            var el3 = dom.createTextNode("Spara och stäng");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
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
          statements: [["element", "action", ["createRecord"], [], ["loc", [null, [22, 29], [22, 56]]], 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 2
            },
            "end": {
              "line": 27,
              "column": 2
            }
          },
          "moduleName": "client/components/step-component/template.hbs"
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
          dom.setAttribute(el1, "class", "step back");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "step next ready");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["index"], [], 0, null, ["loc", [null, [14, 4], [18, 16]]]], ["block", "link-to", ["index"], [], 1, null, ["loc", [null, [21, 6], [25, 18]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 29,
            "column": 0
          }
        },
        "moduleName": "client/components/step-component/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui seven small steps");
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
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["subexpr", "not-eq", [["get", "router.currentRouteName", ["loc", [null, [2, 16], [2, 39]]], 0, 0, 0, 0], "write"], [], ["loc", [null, [2, 8], [2, 48]]], 0, 0]], [], 0, 1, ["loc", [null, [2, 2], [27, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('client/components/structure-block/component', ['exports', 'ember', 'client/utils/helper'], function (exports, _ember, _clientUtilsHelper) {
  exports['default'] = _ember['default'].Component.extend({
    mission: _ember['default'].inject.service(),

    classNames: ["block"],
    index: null,
    cameraVisible: false,
    hasFlash: true,

    _setup: (function () {
      this.set("hasFlash", _clientUtilsHelper['default'].hasFlash());
    }).on("init"),

    data: (function () {
      return this.get("mission.structure." + this.get("index"));
    }).on("init").observes("mission.structure.[]").property("data"),

    editable: (function () {
      if (this.get("data")) {
        return true;
      }
      return false;
    }).on("init").property("contenteditable"),

    rows: (function () {
      var data = this.get("data." + this.get("type"));
      if (data.length === 0) {
        return [""];
      } else {
        return data;
      }
    }).on("init").property("inputs"),

    keyDown: function keyDown(e) {

      // Cant remove last dot
      if (e.keyCode === 8 || e.keyCode === 46) {
        if (_ember['default'].$(this.element)[0].children[2].children.length === 1) {
          if (_ember['default'].$(this.element)[0].children[2].children[0].textContent.length === 0) {
            e.preventDefault();
          }
        }
      }

      // Disable dubble enter
      if (e.keyCode === 13) {
        var text = this.get("returnString")(this);
        if (text.anchorNode.nodeType === 3) {
          return true;
        }
        return false;
      }
    },

    returnString: function returnString(self) {
      var selectedText = "";
      if (window.getSelection) {
        selectedText = window.getSelection();
      } else if (document.selection) {
        selectedText = document.selection.createRange().text;
      }
      if (self) {
        self.set("selection", selectedText);
      }
      return selectedText;
    },
    toggleModal: function toggleModal(self) {
      if (this) {
        var self = this;
      }
      self.toggleProperty("cameraVisible");

      if (self.get("cameraVisible")) {
        Webcam.on();
      } else {
        Webcam.reset();
      }
    },

    actions: {
      upload: function upload(e) {
        var self = this;
        var input = e.target;
        if (input.files && input.files[0]) {
          var that = this;

          var reader = new FileReader();
          reader.onload = function (e) {
            var data = e.target.result;
            self.get("mission.structure." + self.get("index") + ".images").pushObject(data);
          };
          reader.readAsDataURL(input.files[0]);
        }
      },

      toggleModal: function toggleModal() {
        if (this) {
          var self = this;
        }
        this.get("toggleModal")(self);
      },

      'delete': function _delete(img, index) {
        this.get("mission.structure." + index + ".images").removeObject(img);
      }
    }
  });
});
define("client/components/structure-block/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
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
            var element2 = dom.childAt(fragment, [1]);
            var element3 = dom.childAt(element2, [1]);
            var element4 = dom.childAt(element2, [3]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element3);
            morphs[1] = dom.createAttrMorph(element4, 'src');
            return morphs;
          },
          statements: [["element", "action", ["delete", ["get", "img", ["loc", [null, [6, 48], [6, 51]]], 0, 0, 0, 0], ["get", "index", ["loc", [null, [6, 52], [6, 57]]], 0, 0, 0, 0]], [], ["loc", [null, [6, 29], [6, 60]]], 0, 0], ["attribute", "src", ["get", "img", ["loc", [null, [7, 20], [7, 23]]], 0, 0, 0, 0], 0, 0, 0, 0]],
          locals: ["img"],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 4
              },
              "end": {
                "line": 23,
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
            var el1 = dom.createComment("\n        <div class=\"btn-camera\" {{ action \"toggleModal\" }}>\n          {{fa-icon \"picture-o\"}}\n        </div>\n      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("label");
            dom.setAttribute(el1, "class", "btn-camera m0");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("input");
            dom.setAttribute(el1, "type", "file");
            dom.setAttribute(el1, "capture", "camera");
            dom.setAttribute(el1, "accept", "image/*");
            dom.setAttribute(el1, "class", "hidden");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [4]);
            var element1 = dom.childAt(fragment, [6]);
            var morphs = new Array(5);
            morphs[0] = dom.createAttrMorph(element0, 'for');
            morphs[1] = dom.createMorphAt(element0, 1, 1);
            morphs[2] = dom.createAttrMorph(element1, 'id');
            morphs[3] = dom.createAttrMorph(element1, 'name');
            morphs[4] = dom.createAttrMorph(element1, 'onchange');
            return morphs;
          },
          statements: [["attribute", "for", ["subexpr", "uniqId", [["get", "this", ["loc", [null, [18, 29], [18, 33]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [18, 35]]], 0, 0], 0, 0, 0, 0], ["inline", "fa-icon", ["file-image-o"], ["size", 1], ["loc", [null, [19, 10], [19, 43]]], 0, 0], ["attribute", "id", ["subexpr", "uniqId", [["get", "this", ["loc", [null, [21, 74], [21, 78]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [21, 80]]], 0, 0], 0, 0, 0, 0], ["attribute", "name", ["subexpr", "uniqId", [["get", "this", ["loc", [null, [21, 96], [21, 100]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [21, 102]]], 0, 0], 0, 0, 0, 0], ["attribute", "onchange", ["subexpr", "action", ["upload"], [], ["loc", [null, [null, null], [21, 133]]], 0, 0], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 4
              },
              "end": {
                "line": 29,
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
          statements: [["content", "row", ["loc", [null, [28, 10], [28, 17]]], 0, 0, 0, 0]],
          locals: ["row"],
          templates: []
        };
      })();
      var child3 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 36,
                    "column": 8
                  },
                  "end": {
                    "line": 38,
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
              statements: [["content", "prev", ["loc", [null, [37, 14], [37, 22]]], 0, 0, 0, 0]],
              locals: ["prev"],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 33,
                  "column": 4
                },
                "end": {
                  "line": 40,
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
            statements: [["block", "each", [["get", "data.knowledge", ["loc", [null, [36, 16], [36, 30]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [36, 8], [38, 17]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 32,
                "column": 2
              },
              "end": {
                "line": 41,
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
          statements: [["block", "if", [["subexpr", "gt", [["get", "data.knowledge.length", ["loc", [null, [33, 14], [33, 35]]], 0, 0, 0, 0], 0], [], ["loc", [null, [33, 10], [33, 38]]], 0, 0]], [], 0, null, ["loc", [null, [33, 4], [40, 11]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          var element5 = dom.childAt(fragment, [3]);
          var element6 = dom.childAt(fragment, [5]);
          var morphs = new Array(7);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(element5, 1, 1);
          morphs[2] = dom.createMorphAt(element5, 2, 2);
          morphs[3] = dom.createAttrMorph(element6, 'id');
          morphs[4] = dom.createAttrMorph(element6, 'contenteditable');
          morphs[5] = dom.createMorphAt(element6, 1, 1);
          morphs[6] = dom.createMorphAt(fragment, 7, 7, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["content", "data.title", ["loc", [null, [2, 45], [2, 59]]], 0, 0, 0, 0], ["block", "each", [["get", "data.images", ["loc", [null, [4, 12], [4, 23]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 4], [9, 13]]]], ["block", "if", [["subexpr", "eq", [["get", "type", ["loc", [null, [10, 14], [10, 18]]], 0, 0, 0, 0], "explore"], [], ["loc", [null, [10, 10], [10, 29]]], 0, 0]], [], 1, null, ["loc", [null, [10, 4], [23, 11]]]], ["attribute", "id", ["get", "data.title", ["loc", [null, [26, 12], [26, 22]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "contenteditable", ["get", "editable", ["loc", [null, [26, 44], [26, 52]]], 0, 0, 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "rows", ["loc", [null, [27, 12], [27, 16]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [27, 4], [29, 13]]]], ["block", "if", [["subexpr", "eq", [["get", "type", ["loc", [null, [32, 12], [32, 16]]], 0, 0, 0, 0], "explore"], [], ["loc", [null, [32, 8], [32, 27]]], 0, 0]], [], 3, null, ["loc", [null, [32, 2], [41, 9]]]]],
        locals: [],
        templates: [child0, child1, child2, child3]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 46,
                  "column": 4
                },
                "end": {
                  "line": 48,
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
            statements: [["inline", "camera-component", [], ["index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [47, 31], [47, 36]]], 0, 0, 0, 0]], [], [], 0, 0], "close", ["subexpr", "@mut", [["get", "toggleModal", ["loc", [null, [47, 43], [47, 54]]], 0, 0, 0, 0]], [], [], 0, 0], "self", ["subexpr", "@mut", [["get", "this", ["loc", [null, [47, 60], [47, 64]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [47, 6], [47, 67]]], 0, 0]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 45,
                "column": 2
              },
              "end": {
                "line": 49,
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
          statements: [["block", "modal-dialog", [], ["close", "toggleModal", "container-class", "camera-modal", "translucentOverlay", true], 0, null, ["loc", [null, [46, 4], [48, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 44,
              "column": 0
            },
            "end": {
              "line": 50,
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
        statements: [["block", "if", [["get", "cameraVisible", ["loc", [null, [45, 8], [45, 21]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [45, 2], [49, 9]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 50,
            "column": 7
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
      statements: [["block", "if", [["get", "data", ["loc", [null, [1, 6], [1, 10]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [42, 7]]]], ["block", "if", [["get", "camera", ["loc", [null, [44, 6], [44, 12]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [44, 0], [50, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("client/components/structure-component/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    type: null,
    mission: _ember["default"].inject.service(),
    missing: 0,
    structures: null,
    content: [[], [], [], []],
    type: null,

    _setup: (function () {
      var arr = this.get("mission.structure");
      var miss = 4 - arr.length;
      this.set("missing", miss);
      this.set("structures", arr);
    }).on("init"),

    keyUp: function keyUp(e) {
      var selected = this.get("structures");
      for (var ul = 0; ul < selected.length; ul++) {
        var nodes = _ember["default"].$("#" + selected[ul].title)[0].children;
        for (var li = 0; li < nodes.length; li++) {

          var text = this.get("nodeToText")(nodes[li]);
          if (text.length > 0) {
            if (this.get("mission.structure." + ul + "." + this.get("type"))) {
              this.set("mission.structure." + ul + "." + this.get("type") + "." + li, text);
            } else {
              this.get("mission.structure." + ul + "." + this.get("type")).push(text);
            }
          }
        }
      }
    },

    nodeToText: function nodeToText(node) {
      var fetchText = function fetchText(node) {
        if (node.innerText !== undefined && node.innerText.length !== 0 && node.innerText !== "") {
          return node.innerText;
        } else if (node.data !== undefined && node.data.length !== 0 && node.data !== "") {
          return node.data;
        }
        return "";
      };

      var text = fetchText(node);
      for (var i = 0; i < 20; i++) {
        text = text.replace("X", "").replace("↵", "").trim();
      }
      return text;
    }
  });
});
define("client/components/structure-component/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "client/components/structure-component/template.hbs"
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
          statements: [["inline", "structure-block", [], ["type", ["subexpr", "@mut", [["get", "type", ["loc", [null, [4, 29], [4, 33]]], 0, 0, 0, 0]], [], [], 0, 0], "classNames", "height-full", "camera", ["subexpr", "@mut", [["get", "camera", ["loc", [null, [4, 66], [4, 72]]], 0, 0, 0, 0]], [], [], 0, 0], "index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [4, 79], [4, 84]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [4, 6], [4, 86]]], 0, 0]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 4
              },
              "end": {
                "line": 7,
                "column": 4
              }
            },
            "moduleName": "client/components/structure-component/template.hbs"
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
          statements: [["inline", "structure-block", [], ["type", ["subexpr", "@mut", [["get", "type", ["loc", [null, [6, 29], [6, 33]]], 0, 0, 0, 0]], [], [], 0, 0], "camera", ["subexpr", "@mut", [["get", "camera", ["loc", [null, [6, 41], [6, 47]]], 0, 0, 0, 0]], [], [], 0, 0], "index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [6, 54], [6, 59]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [6, 6], [6, 61]]], 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 8,
              "column": 2
            }
          },
          "moduleName": "client/components/structure-component/template.hbs"
        },
        isEmpty: false,
        arity: 2,
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
        statements: [["block", "if", [["subexpr", "eq", [["get", "missing", ["loc", [null, [3, 14], [3, 21]]], 0, 0, 0, 0], 2], [], ["loc", [null, [3, 10], [3, 24]]], 0, 0]], [], 0, 1, ["loc", [null, [3, 4], [7, 11]]]]],
        locals: ["data", "index"],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 2
            },
            "end": {
              "line": 11,
              "column": 2
            }
          },
          "moduleName": "client/components/structure-component/template.hbs"
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
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "structure-block", ["loc", [null, [10, 4], [10, 24]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 2
            },
            "end": {
              "line": 18,
              "column": 2
            }
          },
          "moduleName": "client/components/structure-component/template.hbs"
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
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          return morphs;
        },
        statements: [["content", "structure-block", ["loc", [null, [15, 4], [15, 24]]], 0, 0, 0, 0], ["content", "structure-block", ["loc", [null, [16, 4], [16, 24]]], 0, 0, 0, 0], ["content", "structure-block", ["loc", [null, [17, 4], [17, 24]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "client/components/structure-component/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "information");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 2, 2);
        morphs[2] = dom.createMorphAt(element0, 4, 4);
        return morphs;
      },
      statements: [["block", "each", [["get", "structures", ["loc", [null, [2, 10], [2, 20]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [8, 11]]]], ["block", "if", [["subexpr", "eq", [["get", "missing", ["loc", [null, [9, 12], [9, 19]]], 0, 0, 0, 0], 1], [], ["loc", [null, [9, 8], [9, 22]]], 0, 0]], [], 1, null, ["loc", [null, [9, 2], [11, 9]]]], ["block", "if", [["subexpr", "eq", [["get", "missing", ["loc", [null, [14, 12], [14, 19]]], 0, 0, 0, 0], 3], [], ["loc", [null, [14, 8], [14, 22]]], 0, 0]], [], 2, null, ["loc", [null, [14, 2], [18, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("client/components/time-ago/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    tagName: "p",
    classNames: ["date"],
    model: null,
    text: null,
    time: 10000,
    timer: null,
    _watch: (function () {
      moment.locale('sv');
      var self = this;
      this.set("timer", setInterval(self.get("update"), self.get("time"), self));
      self.get("update")(self);
    }).on("init").observes("model.hasDirtyAttributes"),

    update: function update(self) {
      var model = self.get("model");
      if (model) {
        if (model.get("updated")) {
          var date = model.get("updated");
          var str = "Uppdaterades " + moment(date, "YYYYMMDD").fromNow();
        } else {
          var date = model.get("created");
          var str = "Skapades " + moment(date, "YYYYMMDD").fromNow();
        }
        self.set("time", self.get("time") * 1.5);
        self.set("text", str);
      }
    }
  });
});
define("client/components/time-ago/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 8
          }
        },
        "moduleName": "client/components/time-ago/template.hbs"
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
      statements: [["content", "text", ["loc", [null, [1, 0], [1, 8]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/components/user-missions/component", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    global: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    model: null,
    "new": _ember["default"].A(),
    old: _ember["default"].A(),
    reloadBtn: null,

    setup: (function (self) {
      if (this) {
        var self = this;
      }
      console.log("setting up");
      var missions = self.get("missions");
      if (missions.length > 0) {
        self.set("new", _ember["default"].A());
        self.set("old", _ember["default"].A());
        self.get("missions").forEach(function (mission) {
          self.get("inRapport")(mission, self);
          if (self.get("reloadBtn")) {
            self.get("reloadBtn").stop();
          }
        });
      }
    }).observes("model.missions.[]", "model.rapports.[]").on("init"),

    rapports: _ember["default"].computed('model.rapports.@each', function () {
      var model = this.get('model.rapports');
      var arr = model.map(function (rapport, index, enumerable) {
        return {
          id: rapport.get("id"),
          team: rapport.get("team"),
          "mission-id": rapport.get("mission-id")
        };
      });
      return arr;
    }),

    missions: _ember["default"].computed('model.missions.@each', function () {
      var model = this.get('model.missions');
      var arr = model.map(function (mission, index, enumerable) {
        return mission;
      });
      return arr;
    }),

    inRapport: function inRapport(mission, self) {
      var id = parseInt(mission.get("id"));
      var rapports = self.get("rapports");
      for (var i = 0; i < rapports.length; i++) {
        var rapport = rapports[i];
        if (id === parseInt(rapport["mission-id"])) {
          var team = JSON.parse(rapport["team"]);
          for (var i = 0; i < team.length; i++) {
            if (parseInt(team[i].id) === parseInt(self.cookie.getCookie('user'))) {
              self.get("old").pushObject(mission);
              return true;
            }
          }
        }
      }
      self.get("new").pushObject(mission);
      return true;
    },

    _jQuery: (function () {
      if (document.getElementById('reload')) {
        this.set("reloadBtn", Ladda.create(document.getElementById('reload')));
      }
    }).on("didInsertElement"),

    actions: {
      reload: function reload() {
        this.get("reloadBtn").start();
        this.get("setup")(this);
      }
    }
  });
});
define("client/components/user-missions/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
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
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["inline", "mission-button", [], ["model", ["subexpr", "@mut", [["get", "newMission", ["loc", [null, [9, 35], [9, 45]]], 0, 0, 0, 0]], [], [], 0, 0], "text", "Återgå till uppdrag"], ["loc", [null, [9, 12], [9, 74]]], 0, 0]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
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
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["inline", "mission-button", [], ["model", ["subexpr", "@mut", [["get", "newMission", ["loc", [null, [11, 35], [11, 45]]], 0, 0, 0, 0]], [], [], 0, 0], "text", "Starta uppdrag"], ["loc", [null, [11, 12], [11, 69]]], 0, 0]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@2.9.0",
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
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["subexpr", "eq", [["get", "newMission.id", ["loc", [null, [8, 20], [8, 33]]], 0, 0, 0, 0], ["get", "mission.lastRapport.mission-id", ["loc", [null, [8, 34], [8, 64]]], 0, 0, 0, 0]], [], ["loc", [null, [8, 16], [8, 65]]], 0, 0]], [], 0, 1, ["loc", [null, [8, 10], [12, 17]]]]],
            locals: ["newMission"],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
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
            dom.setAttribute(el1, "class", "row fullwidth bb0 mr2 ml2 mt1");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "medium-12 large-12 float-right mr1");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("h1");
            dom.setAttribute(el3, "class", "jr--title ml1 mb0");
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
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3, 1]), 3, 3);
            return morphs;
          },
          statements: [["inline", "mission-alert", [], ["model", ["subexpr", "@mut", [["get", "new", ["loc", [null, [3, 26], [3, 29]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [3, 4], [3, 31]]], 0, 0], ["block", "each", [["get", "new", ["loc", [null, [7, 16], [7, 19]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [7, 8], [13, 17]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
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
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "mission-button", [], ["model", ["subexpr", "@mut", [["get", "mission", ["loc", [null, [23, 33], [23, 40]]], 0, 0, 0, 0]], [], [], 0, 0], "text", "Utför uppdraget igen"], ["loc", [null, [23, 10], [23, 70]]], 0, 0]],
            locals: ["mission"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
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
            dom.setAttribute(el1, "class", "row fullwidth mt3 mr3 ml1");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "medium-12 large-12");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("h1");
            dom.setAttribute(el3, "class", "jr--title pl1 mb0");
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
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 3, 3);
            return morphs;
          },
          statements: [["block", "each", [["get", "old", ["loc", [null, [22, 16], [22, 19]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [22, 8], [24, 17]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "new", ["loc", [null, [2, 8], [2, 11]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [16, 9]]]], ["block", "if", [["get", "old", ["loc", [null, [18, 8], [18, 11]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [18, 2], [27, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          dom.setAttribute(el1, "class", "text-center");
          var el2 = dom.createTextNode("Du har slutfört alla dina uppdrag!");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "ladda-button");
          dom.setAttribute(el1, "id", "reload");
          dom.setAttribute(el1, "data-style", "expand-right");
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "class", "ladda-label");
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
        statements: [["element", "action", ["reload"], [], ["loc", [null, [30, 69], [30, 88]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
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
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["subexpr", "not-eq", [["get", "missions.length", ["loc", [null, [1, 14], [1, 29]]], 0, 0, 0, 0], 0], [], ["loc", [null, [1, 6], [1, 32]]], 0, 0]], [], 0, 1, ["loc", [null, [1, 0], [31, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('client/controllers/application', ['exports', 'ember', 'client/utils/helper'], function (exports, _ember, _clientUtilsHelper) {
  exports['default'] = _ember['default'].Controller.extend({
    global: _ember['default'].inject.service(),
    isAuthenticated: false,
    _watch: (function () {
      _clientUtilsHelper['default'].removeHoverCSSRule();

      if (this.get("global.user") && this.get("global.school")) {
        this.set("isAuthenticated", true);
      } else {
        this.set("isAuthenticated", false);
      }
    }).on("init").observes("global.user")
  });
});
define('client/controllers/dashboard-missions', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    selected: {}
  });
});
define("client/controllers/dashboard", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    loaded: false,
    _animation: (function () {
      this.set("loaded", true);
    }).on("init")
  });
});
define('client/controllers/explore', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    // Check if stuckture is choose
    mission: _ember['default'].inject.service(),

    init: function init() {
      this._super();
      if (this.get("mission.structure.length") === 0) {
        this.get('router').transitionTo('structure');
      }

      _ember['default'].run.schedule("render", this, function () {
        this.set("mission.tab", "Utforska");
      });
    }
  });
});
define('client/controllers/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    global: _ember['default'].inject.service()
  });
});
define('client/controllers/jutarum', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    init: function init() {
      this._super();
      _ember['default'].run.schedule("afterRender", this, function () {
        this.transitionToRoute('index');
      });
    }
  });
});
define('client/controllers/knowledge', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    // Check if stuckture is choose
    mission: _ember['default'].inject.service(),
    init: function init() {
      this._super();
      if (this.get("mission.structure.length") === 0) {
        this.get('router').transitionTo('structure');
      }

      _ember['default'].run.schedule("afterRender", this, function () {
        this.set("mission.tab", "Förkunskaper");
      });
    }
  });
});
define("client/controllers/login", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    store: _ember["default"].inject.service(),
    global: _ember["default"].inject.service(),

    school: null,
    user: null,
    users: null,

    _fetch: (function () {
      var school = this.get("school");
      if (school) {
        var data = this.get("store").query("user", { schoolId: school });
        this.set("users", data);
      }
    }).observes("school"),

    init: function init() {
      this._super();

      _ember["default"].run.schedule("afterRender", this, function () {
        var school = this.cookie.getCookie('school');
        var user = this.cookie.getCookie('user');
        if (school && user) {
          this.set("global.school", this.get("store").find("school", school));
          this.set("global.user", this.get("store").find("user", user));
          this.transitionToRoute('index');
        }
      });
    },

    actions: {
      submit: function submit() {
        this.set("global.school", this.get("store").peekRecord("school", this.get("school")));
        this.set("global.user", this.get("store").peekRecord("user", this.get("user")));
        this.cookie.setCookie('school', this.get("school"), { expires: 7, path: '/' });
        this.cookie.setCookie('user', this.get("user"), { expires: 7, path: '/' });
        window.location.reload(true);
      }
    }
  });
});
define('client/controllers/rapports', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    model: null,
    queryParams: ['mission', 'class', 'user'],
    updating: false,
    rapports: null,
    _watch: (function () {
      var model = this.get('model');
      if (model) {
        var self = this;
        if (parseInt(self.mission) > 0) {
          model = model.filterBy("mission-id", parseInt(self.mission));
        }

        if (parseInt(self.user) > 0) {
          model = model.filter(function (item, index, enumerable) {
            var team = JSON.parse(item.get("team"));
            for (var i = 0; i < team.length; i++) {
              if (parseInt(team[i].id) === parseInt(self.user)) {
                return true;
              }
            }
          });
        }

        if (parseInt(self['class']) > 0) {
          model = model.filterBy("class-id", parseInt(self['class']));
        }

        var arr = model.map(function (rapport, index, enumerable) {
          return rapport;
        });
      }
      this.set("rapports", arr);
    }).observes("model.@each", "mission", "class", "user").on("init")
  });
});
define("client/controllers/structure", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    store: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    global: _ember["default"].inject.service(),
    group: [],
    selected: [],

    init: function init() {
      this._super();

      _ember["default"].run.schedule("afterRender", this, function () {
        if (this.get("global.mission.structures")) {
          this.set("selected", _ember["default"].$.parseJSON(this.get("global.mission.structures")));
        } else {
          this.set("group", ["Utseende", "Fortplantning", "Föda", "Bostad", "Fiender"]);
        }

        this.get("save")(this);
        this.set("mission.tab", "Stödstruktur");
        this.set("selected", []);
        for (var i = 0; i < this.get("mission.structure.length"); i++) {
          this.get("selected").push(this.get("mission.structure." + i + ".title"));
        }
      });
    },

    save: function save(self) {
      var arr = [];
      var selected = self.get("selected");
      for (var i = 0; i < selected.length; i++) {
        arr.push({
          "title": selected[i],
          "images": [],
          "knowledge": [],
          "explore": []
        });
      }

      self.set("mission.structure", arr);
    },

    actions: {
      select: function select(name) {
        if (this.get("selected.length") < 4) {
          var index = this.get("group").indexOf(name);
          this.get("selected").pushObject(name);

          if (index > -1) {
            this.get("group").removeObject(this.get("group." + index));
          }

          this.get("save")(this);
        }
      },
      remove: function remove(name) {
        var index = this.get("selected").indexOf(name);
        this.get("group").pushObject(name);

        if (index > -1) {
          this.get("selected").removeObject(this.get("selected." + index));
        }
        this.get("save")(this);
      }
    }
  });
});
define("client/controllers/team", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    global: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    model: null,
    //group: [],
    selected: [],

    init: function init() {
      this._super();
      var self = this;

      _ember["default"].run.schedule("afterRender", this, function () {
        this.set("mission.tab", "Arbetsgrupp");
        this.set("selected", this.get("mission.team"));
      });
    },

    group: _ember["default"].computed('model.@each', function () {
      var user = this.get("global.user");
      var model = this.get('model');

      var arr = model.filterBy('type', "student").filterBy('class-id', user.content.data["class-id"]).map(function (user, index, enumerable) {
        return {
          id: user.get("id"),
          name: user.get("first-name") + " " + user.get("last-name")
        };
      });

      return arr;
    }),

    save: function save(self) {
      console.log("save");
      var selected = self.get("selected");
      self.set("mission.team", selected);
    },
    actions: {
      select: function select(person) {
        var index = this.get("group").indexOf(person);
        this.get("selected").pushObject(person);

        if (index > -1) {
          this.get("group").removeObject(person);
        }
        this.get("save")(this);
      },
      remove: function remove(person) {
        var index = this.get("selected").indexOf(person);
        this.get("group").pushObject(person);

        if (index > -1) {
          this.get("selected").removeObject(person);
        }
        this.get("save")(this);
      }
    }
  });
});
define('client/controllers/user', ['exports', 'ember', 'client/utils/assets'], function (exports, _ember, _clientUtilsAssets) {
  exports['default'] = _ember['default'].Controller.extend({
    avatars: [],
    init: function init() {
      this._super();
      console.log("setup");
      var arr = [];
      var images = _clientUtilsAssets['default'].avatars();
      for (var i = 0; i < images.length; i++) {
        arr.push(images[i].name);
      }
      this.set("avatars", arr);
      console.log(arr);
      _ember['default'].run.schedule("render", this, function () {
        console.log("setup");
        var self = this;
        _ember['default'].$(document).ready(function () {
          _ember['default'].$(".select-avatar").select2({
            minimumResultsForSearch: Infinity,
            placeholder: "Välj bild",
            data: self.get("avatars"),
            templateSelection: self.get("formatImage"),
            templateResult: self.get("formatImage")
          });
        });
      });
    },

    formatImage: function formatImage(state) {
      var path = _clientUtilsAssets['default'].path("avatars");
      var ex = _clientUtilsAssets['default'].ext();
      if (!state.loading) {
        var $state = $("<span class='ava'><img src=" + path + state.text + ex + " /></span>");
        return $state;
      }
    }
  });
});
define("client/controllers/write", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    mission: _ember["default"].inject.service(),

    init: function init() {
      this._super();
      _ember["default"].run.schedule("afterRender", this, function () {
        this.set("mission.tab", "Rapport");
      });
    },

    data: (function () {
      // Transition in strucutre is mission
      if (this.get("mission.structure.length") === 0) {
        this.get('router').transitionTo('mission', 'structure');
      }
      return this.get("mission.structure");
    }).on("init").property("data"),

    actions: {
      save: function save() {
        this.get("mission.createRecord")(this.get("mission"));
      },

      add: function add(index, title, img) {
        // Max 4 images
        if (this.get("mission.images.length") <= 4) {

          this.get("mission.images").pushObject({
            "name": title,
            "image": img,
            "index": index
          });
          this.get("mission.structure." + index + ".images").removeObject(img);
        }
      },

      remove: function remove(index, img) {
        var findImage = function findImage(img, arr) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].image === img) {
              console.log(arr[i]);
              return arr[i];
            }
          }
        };

        // Remove image
        this.get("mission.images").removeObject(findImage(img, this.get("mission.images")));
        this.get("mission.structure." + index + ".images").pushObject(img);
      }
    }
  });
});
define('client/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('client/helpers/app-version', ['exports', 'ember', 'client/config/environment'], function (exports, _ember, _clientConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _clientConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('client/helpers/asset-avatar', ['exports', 'ember', 'client/utils/assets'], function (exports, _ember, _clientUtilsAssets) {
  exports.assetIcon = assetIcon;

  function assetIcon(params /*, hash*/) {
    var path = _clientUtilsAssets['default'].path("avatars");
    var ex = _clientUtilsAssets['default'].ext();
    var image = params[0];

    return "<img src='" + path + image + ex + "'/>";
  }

  exports['default'] = _ember['default'].Helper.helper(assetIcon);
});
define('client/helpers/asset-icon', ['exports', 'ember', 'client/utils/assets'], function (exports, _ember, _clientUtilsAssets) {
  exports.assetIcon = assetIcon;

  function assetIcon(params /*, hash*/) {
    var path = _clientUtilsAssets['default'].path("icons"),
        ex = _clientUtilsAssets['default'].ext(),
        image = params[0],
        className;

    if (params[1] !== null) {
      className = params[1];
    }

    return "<img src='" + path + image + ex + "' class='" + className + "'/>";
  }

  exports['default'] = _ember['default'].Helper.helper(assetIcon);
});
define('client/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('client/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('client/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define("client/helpers/in-array", ["exports", "ember"], function (exports, _ember) {
  exports.inArray = inArray;

  function inArray(params /*, hash*/) {
    if (params[0]) {
      var arr = JSON.parse(params[0]);
      var str = params[1];

      if (arr.indexOf(str) !== -1) {
        return "true";
      }
      return null;
    }
    return null;
  }

  exports["default"] = _ember["default"].Helper.helper(inArray);
});
define('client/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('client/helpers/lf-lock-model', ['exports', 'liquid-fire/helpers/lf-lock-model'], function (exports, _liquidFireHelpersLfLockModel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel['default'];
    }
  });
  Object.defineProperty(exports, 'lfLockModel', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel.lfLockModel;
    }
  });
});
define('client/helpers/lf-or', ['exports', 'liquid-fire/helpers/lf-or'], function (exports, _liquidFireHelpersLfOr) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr['default'];
    }
  });
  Object.defineProperty(exports, 'lfOr', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr.lfOr;
    }
  });
});
define('client/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('client/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define("client/helpers/mission-visible", ["exports", "ember"], function (exports, _ember) {
  exports.missionVisible = missionVisible;

  function missionVisible(params /*, hash*/) {
    var visiblOn = ["index", "rapport", "rapports.index"];
    if (params[0]) {
      if (visiblOn.indexOf(params[0]) !== -1) {
        return true;
      }
    }
    return false;
  }

  exports["default"] = _ember["default"].Helper.helper(missionVisible);
});
define('client/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('client/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('client/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('client/helpers/parse', ['exports', 'ember'], function (exports, _ember) {
  exports.parse = parse;

  function parse(params /*, hash*/) {
    return JSON.parse(params[0]);
  }

  exports['default'] = _ember['default'].Helper.helper(parse);
});
define('client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("client/helpers/team", ["exports", "ember"], function (exports, _ember) {
  exports.team = team;

  function team(params /*, hash*/) {
    if (params[0]) {
      var str = "";
      var team = JSON.parse(params[0]);

      if (team.length === 1) {
        return team[0].name;
      }

      for (var i = 0; i < team.length; i++) {
        if (i + 2 === team.length) {
          str += team[i].name + " & ";
        } else if (i + 2 === team.length) {
          str += team[i].name;
        } else {
          str += team[i].name + ", ";
        }
      }

      return str;
    }
    return params;
  }

  exports["default"] = _ember["default"].Helper.helper(team);
});
define('client/helpers/timeago', ['exports', 'ember'], function (exports, _ember) {
  exports.timeago = timeago;

  function timeago(params /*, hash*/) {
    moment.locale('sv');
    var date = params[0];
    var time = moment(date, "YYYYMMDD");
    if (time.isValid()) {
      return time.fromNow();
    }
    return "";
  }

  exports['default'] = _ember['default'].Helper.helper(timeago);
});
define("client/helpers/uniq-id", ["exports", "ember"], function (exports, _ember) {
  exports.uniqId = uniqId;

  function uniqId(params /*, hash*/) {
    var el = params[0];

    return "EmberEl" + el.elementId;
  }

  exports["default"] = _ember["default"].Helper.helper(uniqId);
});
define('client/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'client/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _clientConfigEnvironment) {
  var _config$APP = _clientConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('client/initializers/component-router-injector', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize(application) {
    // Injects all Ember components with a router object:
    application.inject('component', 'router', 'router:main');
    //application.inject('controller', 'router', 'router:main');
  }

  exports['default'] = {
    name: 'component-router-injector',
    initialize: initialize
  };
});
define('client/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('client/initializers/cookie', ['exports', 'client/lib/cookie'], function (exports, _clientLibCookie) {
  exports['default'] = {
    name: 'cookie',
    initialize: function initialize() {
      var app = arguments[1] || arguments[0];
      app.register('cookie:main', _clientLibCookie['default']);
    }
  };
});
define('client/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('client/initializers/export-application-global', ['exports', 'ember', 'client/config/environment'], function (exports, _ember, _clientConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_clientConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _clientConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_clientConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('client/initializers/hide-loading-screen', ['exports', 'client/instance-initializers/hide-loading-screen', 'ember'], function (exports, _clientInstanceInitializersHideLoadingScreen, _ember) {
  exports.initialize = initialize;

  var EMBER_VERSION_REGEX = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:(?:\-(alpha|beta)\.([0-9]+)(?:\.([0-9]+))?)?)?(?:\+(canary))?(?:\.([0-9abcdef]+))?(?:\-([A-Za-z0-9\.\-]+))?(?:\+([A-Za-z0-9\.\-]+))?$/;

  /**
   * VERSION_INFO[i] is as follows:
   *
   * 0  complete version string
   * 1  major version
   * 2  minor version
   * 3  trivial version
   * 4  pre-release type (optional: "alpha" or "beta" or undefined for stable releases)
   * 5  pre-release version (optional)
   * 6  pre-release sub-version (optional)
   * 7  canary (optional: "canary", or undefined for stable releases)
   * 8  SHA (optional)
   */
  var VERSION_INFO = EMBER_VERSION_REGEX.exec(_ember['default'].VERSION);
  var isPre111 = parseInt(VERSION_INFO[1], 10) < 2 && parseInt(VERSION_INFO[2], 10) < 12;

  function initialize() {
    if (isPre111) {
      var registry = arguments[0];
      var application = arguments[1];
      _clientInstanceInitializersHideLoadingScreen['default'].initialize(registry, application);
    }
  }

  exports['default'] = {
    name: 'hide-loading-screen',
    initialize: initialize
  };
});
define('client/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("client/initializers/liquid-fire", ["exports", "liquid-fire/ember-internals"], function (exports, _liquidFireEmberInternals) {

  (0, _liquidFireEmberInternals.initialize)();

  exports["default"] = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
define('client/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('client/initializers/test', ['exports'], function (exports) {
    exports.initialize = initialize;

    function initialize(container, application) {
        application.inject('controller', 'cookie', 'cookie:main');
        application.inject('component', 'cookie', 'cookie:main');
    }

    exports['default'] = {
        name: 'test-initializer',
        after: ['cookie'],
        initialize: initialize
    };
});
define('client/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('client/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("client/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('client/instance-initializers/hide-loading-screen', ['exports', 'client/config/environment'], function (exports, _clientConfigEnvironment) {
  exports.initialize = initialize;

  var userConfig = _clientConfigEnvironment['default']['ember-load'] || {};

  function initialize() {
    var instance = arguments[1] || arguments[0];
    var container = !!arguments[1] ? arguments[0] : instance.container;

    if (Ember.View) {
      var ApplicationView = container.lookupFactory ? container.lookupFactory('view:application') : instance.resolveRegistration('view:application');

      ApplicationView = ApplicationView.reopen({
        didInsertElement: function didInsertElement() {
          this._super.apply(this, arguments);

          var loadingIndicatorClass = userConfig.loadingIndicatorClass || 'ember-load-indicator';

          Ember.$('.' + loadingIndicatorClass).remove();
        }
      });
    }
  }

  exports['default'] = {
    name: 'hide-loading-screen-instance',
    initialize: initialize
  };
});
define('client/lib/cookie', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Object.extend({
    setCookie: function setCookie(key, value, options) {
      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        try {
          _ember['default'].$.cookie(key, value, options);
          _ember['default'].run(null, resolve);
        } catch (e) {
          _ember['default'].run(null, reject, e);
        }
      });
    },

    getCookie: function getCookie(key) {
      return _ember['default'].$.cookie(key);
    },

    removeCookie: function removeCookie(key, options) {
      return _ember['default'].$.removeCookie(key, options);
    }
  });
});
define('client/models/class', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "title": (0, _emberDataAttr['default'])('string'),
    "school-id": (0, _emberDataAttr['default'])('number'),
    "class-id": (0, _emberDataAttr['default'])('number'),
    "updated": (0, _emberDataAttr['default'])('string'),
    "created": (0, _emberDataAttr['default'])('string')
  });
});
define('client/models/image', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    name: (0, _emberDataAttr['default'])('string'),
    rapport_id: (0, _emberDataAttr['default'])('number'),
    image: (0, _emberDataAttr['default'])('string')
  });
});
define('client/models/mission', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "name": (0, _emberDataAttr['default'])('string'),
    "body": (0, _emberDataAttr['default'])('string'),
    "structures": (0, _emberDataAttr['default'])(),
    "image": (0, _emberDataAttr['default'])('string'),
    "school-id": (0, _emberDataAttr['default'])('number'),
    "created": (0, _emberDataAttr['default'])('string'),
    "updated": (0, _emberDataAttr['default'])('string')
  });
});
define('client/models/rapport', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "name": (0, _emberDataAttr['default'])('string'),
    "structure": (0, _emberDataAttr['default'])('string'),
    "body": (0, _emberDataAttr['default'])('string'),
    "mission": (0, _emberDataRelationships.belongsTo)('mission'),
    "mission-id": (0, _emberDataAttr['default'])('number'),
    "school-id": (0, _emberDataAttr['default'])('number'),
    "team": (0, _emberDataAttr['default'])('string')
  });
});
define('client/models/school', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "name": (0, _emberDataAttr['default'])('string'),
    "updated": (0, _emberDataAttr['default'])('string'),
    "created": (0, _emberDataAttr['default'])('string')
  });
});
define('client/models/subject', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    name: (0, _emberDataAttr['default'])('string')
  });
});
define('client/models/user', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "first-name": (0, _emberDataAttr['default'])('string'),
    "last-name": (0, _emberDataAttr['default'])('string'),
    "slug": "kalle-karlsson",
    "school-id": (0, _emberDataAttr['default'])('number'),
    "class-id": (0, _emberDataAttr['default'])('number'),
    "type": (0, _emberDataAttr['default'])('string'),
    "avatar": (0, _emberDataAttr['default'])('string'),
    "updated": (0, _emberDataAttr['default'])('string'),
    "created": (0, _emberDataAttr['default'])('string')
  });
});
define('client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('client/router', ['exports', 'ember', 'client/config/environment'], function (exports, _ember, _clientConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _clientConfigEnvironment['default'].locationType,
    rootURL: _clientConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('index', { path: '/' });
    this.route('rapports', { path: 'rapports' }, function () {
      this.route('rapport', { path: ':rapport_id', resetNamespace: true });
    });

    this.route('user', { path: 'users/:user_id', resetNamespace: true }, function () {});

    this.route('mission', { path: 'missions/:mission_id', resetNamespace: true }, function () {
      this.route('team', { path: '/team', resetNamespace: true });
      this.route('structure', { path: '/structure', resetNamespace: true });
      this.route('explore', { path: '/explore', resetNamespace: true });
      this.route('knowledge', { path: '/knowledge', resetNamespace: true });
      this.route('write', { path: '/write', resetNamespace: true });
    });

    /* Dashboard */
    this.route('dashboard', { path: 'admin' }, function () {
      this.route('dashboard-missions', { path: '/missions', resetNamespace: true });
      //this.route('dashboard-rapports', { path: '/rapports', resetNamespace: true });
      //this.route('dashboard-students', { path: '/students', resetNamespace: true });
    });
    /* 404 - Page not found */
    this.route('not-found', { path: '/*path' });
    this.route('login');
    this.route('jutarum');
  });

  exports['default'] = Router;
});
define("client/routes/application", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    transition: null,
    beforeModel: function beforeModel(transition) {
      this.set("transition", transition);
      this.get("check")(this.controllerFor('application'), transition);
    },
    check: function check(self, transition) {

      if (self.cookie) {
        if (self.get("global.user") === null || self.get("global.school") === null) {
          var school = self.cookie.getCookie('school');
          var user = self.cookie.getCookie('user');
          if (school && user) {
            self.set("global.school", self.get("store").find("school", school));
            self.set("global.user", self.get("store").find("user", user));

            if (transition.targetName === "login") {
              self.transitionToRoute('index');
            }
          } else {
            self.transitionToRoute('login');
          }
        }
      }
    },

    setupController: function setupController(controller, model) {
      var transition = this.get("transition");
      if (transition) {
        if (transition.handlerInfos.length > 1) {
          var path = transition.handlerInfos[1].name;
          controller.set("path", path);
        }
      }
    },

    actions: {
      didTransition: function didTransition() {
        this.get("check")(this, null);
      }
    }
  });
});
define("client/routes/dashboard-missions", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model(params) {
      return this.get("store").findAll("mission");
    }
  });
});
define("client/routes/dashboard-rapports", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model(params) {
      return this.get("store").findAll("rapport");
    }
  });
});
define("client/routes/dashboard-students", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    model: function model(params) {
      return this.get("store").query("user", { schoolId: this.get("global.school.id"), type: "student" });
    }
  });
});
define('client/routes/dashboard', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("client/routes/explore", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    actions: {
      willTransition: function willTransition(transition) {
        this.get("mission.updateRecord")("structure", this.router.router.currentHandlerInfos[1].name, this.get("mission"));

        if (transition.targetName === "write") {
          this.set("mission.nextText", "Spara");
        } else {
          this.set("mission.nextText", "Nästa");
        }
      }
    }
  });
});
define("client/routes/index", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    beforeModel: function beforeModel() {
      if (!this.get("global.school.id")) {
        return false;
      }
    },
    model: function model(params) {
      if (this.get("global.school.id")) {
        return this.get("store").query("mission", {
          "school-id": this.get("global.school.id")
        });
      }
    },

    setupController: function setupController(controller, model) {
      controller.set('model', {
        "missions": this.get("store").query("mission", {
          "school-id": this.get("global.school.id")
        }),
        "rapports": this.get("store").query("rapport", {
          "school-id": this.get("global.school.id")
        })

      });
      //this.set("global.mission", model);
    }
  });
});
define('client/routes/jutarum', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("client/routes/knowledge", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    actions: {
      willTransition: function willTransition(transition) {
        if (this.get("mission.structure.length") === 0) {
          console.log(transition);
        }
        this.get("mission.updateRecord")("structure", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
      }
    }
  });
});
define("client/routes/login", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model(params) {
      return this.get("store").findAll("school");
    }
  });
});
define("client/routes/mission", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    global: _ember["default"].inject.service(),

    model: function model(params) {
      var model = this.store.find("mission", params.mission_id);
      this.set("mission.model", model);
      return model;
    },

    beforeModel: function beforeModel(transition) {
      if (this.get("mission.lastRapport") === null) {
        this.transitionTo('team');
      }
    },

    setupController: function setupController(controller, model) {
      controller.set('model', model);
      this.set("global.mission", model);
    },

    checkRoute: function checkRoute(transition, self) {
      /* Validate input before contiune */
      if (self.get("mission.team.length") === 0) {
        console.log("sending to team");
        self.transitionTo('team');
        return true;
      }
      if (self.get("mission.structure.length") === 0 && transition.targetName !== "knowledge") {
        self.transitionTo('structure');
        return true;
      }
    },

    actions: {
      willTransition: function willTransition(transition) {
        // Transition from route outside mission
        if (this.router.router.currentHandlerInfos[1].name !== "mission") {
          // Return to last known location
          if (self.get("mission.lastRoute")) {
            var last = self.get("mission.lastRoute");
            if (last !== "index") {
              self.transitionTo(last);
            }
          }
        }

        this.get("checkRoute")(transition, this);

        if (transition.targetName === "index") {
          this.set("mission.tab", "");
          //  this.get("mission.createRecord")(this.get("mission"));
        }
      },

      didTransition: function didTransition(transition) {
        var routes = this.get("mission.routes");
        console.log(this.router.router.currentHandlerInfos);
        if (this.router.router.currentHandlerInfos[2].name) {
          var current = this.router.router.currentHandlerInfos[2].name;
          if (routes.indexOf(current) != -1) {
            var index = routes.indexOf(current);
            this.set("mission.backParams.route", routes[index - 1]);
            this.set("mission.nextParams.route", routes[index + 1]);
          }
          if (current !== "index") {

            this.set("mission.tab", "");
          }
          this.set("mission.lastRoute", current);
          return true;
        }
      }
    }

  });
});
define('client/routes/missions', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('client/routes/not-found', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('client/routes/rapport', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find("rapport", params.rapport_id);
    },

    renderTemplate: function renderTemplate() {
      this.render('rapport', {
        into: 'application'
      });
    }
  });
});
define("client/routes/rapports", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model(params) {
      return this.store.findAll("rapport");
    },
    queryParams: {
      mission: {
        refreshModel: true
      },
      user: {
        refreshModel: true
      },
      "class": {
        refreshModel: true
      }
    }
  });
});
define('client/routes/step', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("client/routes/structure", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    actions: {
      willTransition: function willTransition(transition) {
        if (this.get("mission.structure.length") === 0) {
          transition.abort();
        }
        this.get("mission.updateRecord")("structure", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
      }
    }
  });
});
define("client/routes/team", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    global: _ember["default"].inject.service(),
    mission: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),

    model: function model(params) {
      return this.get("store").findAll("user", {
        filter: {
          "school-id": this.get("global.school.id")
        }
      });
    },

    setupController: function setupController(controller, model) {
      controller.set('model', model);
    },

    actions: {
      willTransition: function willTransition(transition) {
        var user = {
          id: this.get("global.user.id"),
          name: this.get("global.user.first-name") + " " + this.get("global.user.last-name")
        };

        if (this.get("mission.team").indexOf(user) === -1) {
          this.get("mission.team").pushObject(user);
        }

        this.get("mission.updateRecord")("team", this.router.router.currentHandlerInfos[1].name, this.get("mission"));
      },
      didTransition: function didTransition(transition) {
        if (this.get("mission.structure")) {
          this.get("mission.resetService")(this.get("mission"));
        }
      }
    }
  });
});
define("client/routes/user", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model(params) {
      return {
        "id": 15,
        "name": "Kalle Karlsson",
        "slug": "kalle-karlsson",
        "type": "student",
        "avatar": "giraff",
        "school": "Jutarumskolan",
        "class": "3A",
        "adress": "Strandvägen 17",
        "postal": "30269",
        "city": "Halmstad"
      };
    }
  });
});
define("client/routes/write", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    mission: _ember["default"].inject.service(),
    actions: {
      willTransition: function willTransition(transition) {
        var self = this;
        var title = _ember["default"].$("#parse--title").html().trim();
        var body = _ember["default"].$("#parse--hook").html().trim();

        this.set("nextText", "Nästa");

        if (transition.targetName === "index") {
          /* Validate input */
          if (title.length < 5) {
            transition.abort();
          }

          if (body.length < 5) {
            transition.abort();
          }

          this.get("mission.updateRecord")(null, this.router.router.currentHandlerInfos[1].name, this.get("mission"), function (rapport) {
            var structure = self.get("mission.removeImages")(self.get("mission"));
            rapport.set("name", title);
            rapport.set("body", body);
            rapport.set("structure", JSON.stringify(structure));
            rapport.save().then(function (newRapport) {
              if (newRapport.get("id")) {
                for (var i = 0; i < self.get("mission.images").length; i++) {

                  /* Spara bilder */
                  var compressed = self.get("mission.images." + i + ".image");
                  var image = self.get("store").createRecord('image', {
                    name: self.get("mission.images." + i + ".name"),
                    rapport_id: newRapport.get("id"),
                    image: compressed
                  });
                  image.save();
                }
                self.get("mission.resetService")(self.get("mission"));
                return newRapport.get("id");
              }
              return false;
            });
          });
        } else {
          var rapport = this.get("mission.lastRapport");
          this.set("mission.nextText", "Nästa");
          rapport.set("name", title);
          rapport.set("body", body);
        }
      }
    }
  });
});
define('client/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('client/services/ember-load-config', ['exports', 'ember-load/services/ember-load-config', 'client/config/environment'], function (exports, _emberLoadServicesEmberLoadConfig, _clientConfigEnvironment) {
  var userConfig = _clientConfigEnvironment['default']['ember-load'] || {};

  exports['default'] = _emberLoadServicesEmberLoadConfig['default'].extend({
    loadingIndicatorClass: userConfig.loadingIndicatorClass
  });
});
define('client/services/global', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({
    school: null,
    user: null,
    mission: null
  });
});
define("client/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _liquidFireTransitionMap) {
  exports["default"] = _liquidFireTransitionMap["default"];
});
define("client/services/mission", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Service.extend({
    global: _ember["default"].inject.service(),
    store: _ember["default"].inject.service(),
    model: null,
    routes: ["index", "team", "structure", "knowledge", "explore", "write", "index"],
    lastRapport: null,
    lastRoute: null,
    tab: "",

    nextText: "Nästa",
    nextParams: {
      route: "structure"
    },
    backText: "Tillbaka",
    backParams: {
      route: "index"
    },

    title: null,
    body: null,
    structure: [],
    team: [],
    images: [],
    save: function save(data) {
      this.set("structure", data);
    },

    removeImages: function removeImages(self) {
      for (var i = 0; i < self.get("structure").length; i++) {
        self.set("structure." + i + ".images", null);
      }
      return self.get("structure");
    },

    updateRecord: function updateRecord(attr, route, self, callback) {
      // Transition inside mission
      if (route === "mission" && attr) {

        // No rappoort created
        if (!self.get("lastRapport")) {
          var rapport = self.get("store").createRecord("rapport", {
            "mission-id": self.get("global.mission.id"),
            "school-id": self.get("global.school.id")
          });
          self.set("lastRapport", rapport);
        }

        var rapport = self.get("lastRapport");
        rapport.set(attr, JSON.stringify(self.get(attr)));
      }

      if (callback) {
        callback(self.get("lastRapport"));
      }
    },

    /* Not using */
    createRecord: function createRecord(self) {

      /* Validate input */
      if (title.length < 5) {
        return false;
      }

      if (body.length < 5) {
        return false;
      }

      if (self.get("lastRapport")) {
        var rapport = self.get("store").peekRecord('rapport', self.get("lastRapport"));
        rapport.set("name", self.get("global.mission.name"));
        rapport.set("structure", JSON.stringify(self.get("removeImages")(self)));
        rapport.set("body", body);
        rapport.set("school-id", self.get("global.school.id"));
        rapport.set("team", JSON.stringify);
      } else {
        if (body) {
          var rapport = self.get("store").createRecord('rapport', {
            "name": title,
            "mission-id": self.get("model.id"),
            "structure": JSON.stringify(self.get("removeImages")(self)),
            "school-id": self.get("global.school.id"),
            "body": body,
            "team": JSON.stringify(team)
          });
        }
      }
      console.log(self.get("images"));
      return rapport.save().then(function (newRapport) {
        console.log("save");
        if (newRapport.get("id")) {
          console.log("got id");
          console.log(self.get("images"));
          for (var i = 0; i < self.get("images.length"); i++) {
            console.log(self.get("images." + i + ".image.length"));
            var pic = self.get("resize")(self.get("images." + i + ".image"));
            console.log(pic.length);

            /* Spara bilder */
            var image = self.get("store").createRecord('image', {
              name: self.get("images." + i + ".name"),
              rapport_id: newRapport.get("id"),
              image: pic
            });
            image.save();
          }
          self.get("resetService")(self);
          return newRapport.get("id");
        }
        return false;
      });
    },

    resize: function resize(image) {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var cw = canvas.width;
      var ch = canvas.height;

      // limit the image to 150x100 maximum size
      var maxW = 500;
      var maxH = 500;
      var iw = img.width;
      var ih = img.height;
      var scale = Math.min(maxW / iw, maxH / ih);
      var iwScaled = iw * scale;
      var ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
      return canvas.toDataURL();
    },

    resetService: function resetService(self) {
      self.set("structure", []);
      self.set("team", []);
      self.set("images", []);
      self.set("model", null);
      self.set("lastRoute", null);
      self.set("lastRapport", null);
    }
  });

  /*
  steps: [{
    active: true,
    isDisabled: false,
    title: "Välj studiekamrat",
    classNames: "",
    linkTo: "team",
    linkParams: "",
    action: null
  }, {
    active: false,
    isDisabled: false,
    title: "Välj stödstruktur",
    classNames: "",
    linkTo: "structure",
    linkParams: "",
    action: null
  }, {
    active: false,
    title: "Fyll i förkunskaper",
    classNames: "",
    linkTo: "knowledge",
    linkParams: "",
    action: null
  }, {
    active: false,
    isDisabled: false,
    title: "Samla information",
    classNames: "",
    linkTo: "explore",
    linkParams: "",
    action: null
  }, {
    active: false,
    isDisabled: false,
    title: "Rapport",
    classNames: "",
    linkTo: "write",
    linkParams: "",
    action: null
  }, {
    active: false,
    isDisabled: false,
    title: "Vidare",
    classNames: "next",
    linkTo: "mission",
    linkParams: null,
    action: "next"
  }],
  */
});
define("client/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "client/templates/application.hbs"
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
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "navigation-global", ["loc", [null, [3, 4], [3, 25]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "client/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "menu-margin");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
          morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "if", [["get", "isAuthenticated", ["loc", [null, [2, 8], [2, 23]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [4, 9]]]], ["inline", "liquid-outlet", [], ["class", "reset-transform"], ["loc", [null, [6, 4], [6, 45]]], 0, 0], ["content", "ember-load-remover", ["loc", [null, [9, 2], [9, 24]]], 0, 0, 0, 0]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 19,
              "column": 0
            }
          },
          "moduleName": "client/templates/application.hbs"
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
          dom.setAttribute(el1, "class", "ember-load-indicator");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "mask-loading");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "spinner");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "double-bounce1");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "double-bounce2");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 7
          }
        },
        "moduleName": "client/templates/application.hbs"
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
      statements: [["block", "if", [["subexpr", "or", [["get", "global.user", ["loc", [null, [1, 10], [1, 21]]], 0, 0, 0, 0], ["subexpr", "eq", [["get", "path", ["loc", [null, [1, 26], [1, 30]]], 0, 0, 0, 0], "login"], [], ["loc", [null, [1, 22], [1, 39]]], 0, 0]], [], ["loc", [null, [1, 6], [1, 40]]], 0, 0]], [], 0, 1, ["loc", [null, [1, 0], [19, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("client/templates/dashboard-missions", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
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
        dom.setAttribute(el1, "class", "columns large-8");
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
        dom.setAttribute(el1, "class", "columns large-4");
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
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
        return morphs;
      },
      statements: [["inline", "display-list", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [3, 25], [3, 30]]], 0, 0, 0, 0]], [], [], 0, 0], "icon", "edit", "parent", ["subexpr", "@mut", [["get", "this", ["loc", [null, [3, 50], [3, 54]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [3, 4], [3, 56]]], 0, 0], ["inline", "edit-mission", [], ["selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [6, 28], [6, 36]]], 0, 0, 0, 0]], [], [], 0, 0], "icons", ["subexpr", "@mut", [["get", "icons", ["loc", [null, [6, 43], [6, 48]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [6, 4], [6, 50]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/dashboard-rapports", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 47
          }
        },
        "moduleName": "client/templates/dashboard-rapports.hbs"
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
      statements: [["inline", "display-list", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 21], [1, 26]]], 0, 0, 0, 0]], [], [], 0, 0], "icon", "caret-right"], ["loc", [null, [1, 0], [1, 47]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/dashboard-students", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 6
          }
        },
        "moduleName": "client/templates/dashboard-students.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "columns large-8");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "columns large-4");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["inline", "display-list", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [2, 23], [2, 28]]], 0, 0, 0, 0]], [], [], 0, 0], "icon", "edit", "parent", ["subexpr", "@mut", [["get", "this", ["loc", [null, [2, 48], [2, 52]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [2, 2], [2, 54]]], 0, 0], ["inline", "edit-student", [], ["selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [5, 26], [5, 34]]], 0, 0, 0, 0]], [], [], 0, 0], "icons", ["subexpr", "@mut", [["get", "icons", ["loc", [null, [5, 41], [5, 46]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [5, 2], [5, 48]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/dashboard", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 6
          }
        },
        "moduleName": "client/templates/dashboard.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row mt3");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["content", "liquid-outlet", ["loc", [null, [2, 2], [2, 19]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/explore", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 52
          }
        },
        "moduleName": "client/templates/explore.hbs"
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
      statements: [["inline", "structure-component", [], ["type", "explore", "camera", "true"], ["loc", [null, [1, 0], [1, 52]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
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
        dom.setAttribute(el1, "class", "row fullwidth mt3 mr3 ml2 bb0 animated bounceInDown");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-12 large-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3, "class", "jr--title-header text-center");
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
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "global.user.first-name", ["loc", [null, [3, 55], [3, 81]]], 0, 0, 0, 0], ["inline", "user-missions", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [6, 22], [6, 27]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [6, 0], [6, 29]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/jutarum", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/templates/jutarum.hbs"
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/knowledge", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/templates/knowledge.hbs"
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "structure-component", [], ["type", "knowledge"], ["loc", [null, [1, 0], [1, 40]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
        statements: [["attribute", "value", ["get", "school.id", ["loc", [null, [10, 24], [10, 33]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "school.name", ["loc", [null, [10, 36], [10, 51]]], 0, 0, 0, 0]],
        locals: ["school"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 6
            },
            "end": {
              "line": 18,
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
        statements: [["attribute", "value", ["get", "user.id", ["loc", [null, [17, 24], [17, 31]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "user.first-name", ["loc", [null, [17, 34], [17, 53]]], 0, 0, 0, 0], ["content", "user.last-name", ["loc", [null, [17, 54], [17, 72]]], 0, 0, 0, 0]],
        locals: ["user"],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 4
            },
            "end": {
              "line": 20,
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
        statements: [["element", "action", ["submit"], [], ["loc", [null, [20, 47], [20, 66]]], 0, 0]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
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
        dom.setAttribute(el2, "class", "content p2");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3, "class", "text-center");
        var el4 = dom.createTextNode("Jutarum");
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
        var el3 = dom.createTextNode("\n    \n    ");
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
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["attribute", "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "school", ["loc", [null, [7, 47], [7, 53]]], 0, 0, 0, 0]], [], ["loc", [null, [7, 42], [7, 54]]], 0, 0]], ["value", "target.value"], ["loc", [null, [null, null], [7, 77]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "model", ["loc", [null, [9, 14], [9, 19]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [9, 6], [11, 15]]]], ["attribute", "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "user", ["loc", [null, [14, 47], [14, 51]]], 0, 0, 0, 0]], [], ["loc", [null, [14, 42], [14, 52]]], 0, 0]], ["value", "target.value"], ["loc", [null, [null, null], [14, 76]]], 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "users", ["loc", [null, [16, 14], [16, 19]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [16, 6], [18, 15]]]], ["block", "link-to", ["index"], [], 2, null, ["loc", [null, [20, 4], [20, 96]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("client/templates/mission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 50
          }
        },
        "moduleName": "client/templates/mission.hbs"
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["inline", "button-float", [], ["class", "fixed-left", "prefix", "back"], ["loc", [null, [2, 0], [2, 49]]], 0, 0], ["inline", "button-float-projname", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [3, 30], [3, 35]]], 0, 0, 0, 0]], [], [], 0, 0], "class", "fixed-center"], ["loc", [null, [3, 0], [3, 58]]], 0, 0], ["inline", "button-float", [], ["class", "fixed-right", "prefix", "next"], ["loc", [null, [4, 0], [4, 50]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/missions", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 10
          }
        },
        "moduleName": "client/templates/missions.hbs"
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
      statements: [["inline", "step-component", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 23], [1, 28]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [1, 0], [1, 30]]], 0, 0], ["content", "outlet", ["loc", [null, [2, 0], [2, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/not-found", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "client/templates/not-found.hbs"
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
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1, "class", "text-center");
        var el2 = dom.createTextNode("404, Oh nothing to see here!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/rapport", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 6
            },
            "end": {
              "line": 18,
              "column": 6
            }
          },
          "moduleName": "client/templates/rapport.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "m--tag");
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
        statements: [["content", "tag.title", ["loc", [null, [17, 29], [17, 42]]], 0, 0, 0, 0]],
        locals: ["tag"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 6
          }
        },
        "moduleName": "client/templates/rapport.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "width-full text-center ");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "text-center");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Title ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "jr--title text-center mb0 mt1");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Team ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "text-bold m0");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Tags ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "m0");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mt3");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
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
        var element0 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createUnsafeMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [7]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [11]), 1, 1);
        morphs[4] = dom.createUnsafeMorphAt(dom.childAt(element0, [13]), 1, 1);
        return morphs;
      },
      statements: [["inline", "image-slider", [], ["id", ["subexpr", "@mut", [["get", "model.id", ["loc", [null, [2, 20], [2, 28]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [2, 2], [2, 30]]], 0, 0], ["content", "model.name", ["loc", [null, [7, 47], [7, 63]]], 0, 0, 0, 0], ["inline", "team", [["get", "model.team", ["loc", [null, [11, 13], [11, 23]]], 0, 0, 0, 0]], [], ["loc", [null, [11, 6], [11, 25]]], 0, 0], ["block", "each", [["subexpr", "parse", [["get", "model.structure", ["loc", [null, [16, 21], [16, 36]]], 0, 0, 0, 0]], [], ["loc", [null, [16, 14], [16, 37]]], 0, 0]], [], 0, null, ["loc", [null, [16, 6], [18, 15]]]], ["content", "model.body", ["loc", [null, [22, 6], [22, 22]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("client/templates/rapports", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 10,
                    "column": 12
                  },
                  "end": {
                    "line": 12,
                    "column": 12
                  }
                },
                "moduleName": "client/templates/rapports.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("              ");
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
              statements: [["inline", "mission-report", [], ["model", ["subexpr", "@mut", [["get", "node", ["loc", [null, [11, 41], [11, 45]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [11, 18], [11, 47]]], 0, 0]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 9,
                  "column": 10
                },
                "end": {
                  "line": 13,
                  "column": 10
                }
              },
              "moduleName": "client/templates/rapports.hbs"
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
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["get", "node.id", ["loc", [null, [10, 18], [10, 25]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [10, 12], [12, 19]]]]],
            locals: ["node"],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 8
              },
              "end": {
                "line": 14,
                "column": 8
              }
            },
            "moduleName": "client/templates/rapports.hbs"
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
          statements: [["block", "each", [["get", "rapports", ["loc", [null, [9, 18], [9, 26]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [9, 10], [13, 19]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 8
              },
              "end": {
                "line": 16,
                "column": 8
              }
            },
            "moduleName": "client/templates/rapports.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h3");
            dom.setAttribute(el1, "class", "text-center p3");
            var el2 = dom.createTextNode("Inga träffar");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 6
            },
            "end": {
              "line": 17,
              "column": 6
            }
          },
          "moduleName": "client/templates/rapports.hbs"
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
        statements: [["block", "if", [["get", "rapports", ["loc", [null, [8, 14], [8, 22]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [8, 8], [16, 15]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          "moduleName": "client/templates/rapports.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          dom.setAttribute(el1, "class", "text-center p3");
          var el2 = dom.createTextNode("Det finns inga rapporter ännu");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 6
          }
        },
        "moduleName": "client/templates/rapports.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "no-border");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "mission-list mt2");
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
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "mission-report-tag-filter", ["loc", [null, [2, 2], [2, 31]]], 0, 0, 0, 0], ["block", "if", [["get", "model", ["loc", [null, [7, 12], [7, 17]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [7, 6], [19, 13]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("client/templates/step", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/templates/step.hbs"
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/structure", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 6
            },
            "end": {
              "line": 6,
              "column": 6
            }
          },
          "moduleName": "client/templates/structure.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
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
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(element1, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["select", ["get", "structure", ["loc", [null, [5, 31], [5, 40]]], 0, 0, 0, 0]], [], ["loc", [null, [5, 12], [5, 43]]], 0, 0], ["content", "structure", ["loc", [null, [5, 44], [5, 57]]], 0, 0, 0, 0]],
        locals: ["structure"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 6
            },
            "end": {
              "line": 13,
              "column": 6
            }
          },
          "moduleName": "client/templates/structure.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
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
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["remove", ["get", "structure", ["loc", [null, [12, 31], [12, 40]]], 0, 0, 0, 0]], [], ["loc", [null, [12, 12], [12, 43]]], 0, 0], ["content", "structure", ["loc", [null, [12, 44], [12, 57]]], 0, 0, 0, 0]],
        locals: ["structure"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 6
          }
        },
        "moduleName": "client/templates/structure.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "columns-divided");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns rows--2");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "vertical--menu p1");
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
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns rows--2");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "vertical--menu selected p1");
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
        var element2 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [3, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "group", ["loc", [null, [4, 14], [4, 19]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 6], [6, 15]]]], ["block", "each", [["get", "selected", ["loc", [null, [11, 14], [11, 22]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [11, 6], [13, 15]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("client/templates/team", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.9.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 7,
                    "column": 10
                  },
                  "end": {
                    "line": 9,
                    "column": 10
                  }
                },
                "moduleName": "client/templates/team.hbs"
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
                var el2 = dom.createComment("");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element1 = dom.childAt(fragment, [1]);
                var morphs = new Array(2);
                morphs[0] = dom.createElementMorph(element1);
                morphs[1] = dom.createMorphAt(element1, 0, 0);
                return morphs;
              },
              statements: [["element", "action", ["select", ["get", "person", ["loc", [null, [8, 35], [8, 41]]], 0, 0, 0, 0]], [], ["loc", [null, [8, 16], [8, 44]]], 0, 0], ["content", "person.name", ["loc", [null, [8, 45], [8, 60]]], 0, 0, 0, 0]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 6,
                  "column": 8
                },
                "end": {
                  "line": 10,
                  "column": 8
                }
              },
              "moduleName": "client/templates/team.hbs"
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
            statements: [["block", "if", [["subexpr", "not-eq", [["get", "person.id", ["loc", [null, [7, 24], [7, 33]]], 0, 0, 0, 0], "null"], [], ["loc", [null, [7, 16], [7, 41]]], 0, 0]], [], 0, null, ["loc", [null, [7, 10], [9, 17]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 6
              },
              "end": {
                "line": 11,
                "column": 6
              }
            },
            "moduleName": "client/templates/team.hbs"
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
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "not-eq", [["get", "person.id", ["loc", [null, [6, 22], [6, 31]]], 0, 0, 0, 0], ["get", "global.user.id", ["loc", [null, [6, 32], [6, 46]]], 0, 0, 0, 0]], [], ["loc", [null, [6, 14], [6, 47]]], 0, 0]], [], 0, null, ["loc", [null, [6, 8], [10, 15]]]]],
          locals: ["person"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 6
            },
            "end": {
              "line": 12,
              "column": 6
            }
          },
          "moduleName": "client/templates/team.hbs"
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
        statements: [["block", "each", [["get", "group", ["loc", [null, [5, 14], [5, 19]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [5, 6], [11, 15]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 8
              },
              "end": {
                "line": 22,
                "column": 8
              }
            },
            "moduleName": "client/templates/team.hbs"
          },
          isEmpty: false,
          arity: 0,
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
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createMorphAt(element0, 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["remove", ["get", "person", ["loc", [null, [21, 33], [21, 39]]], 0, 0, 0, 0]], [], ["loc", [null, [21, 14], [21, 42]]], 0, 0], ["content", "person.name", ["loc", [null, [21, 43], [21, 58]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 6
            },
            "end": {
              "line": 23,
              "column": 6
            }
          },
          "moduleName": "client/templates/team.hbs"
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "not-eq", [["get", "person.id", ["loc", [null, [20, 22], [20, 31]]], 0, 0, 0, 0], "null"], [], ["loc", [null, [20, 14], [20, 39]]], 0, 0]], [], 0, null, ["loc", [null, [20, 8], [22, 15]]]]],
        locals: ["person"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 6
          }
        },
        "moduleName": "client/templates/team.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "columns-divided");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns rows--2 pb3");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "vertical--menu p1");
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
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns rows--2 pb3");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "vertical--menu selected p1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
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
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(element2, [3, 1]);
        var element4 = dom.childAt(element3, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(element4, 0, 0);
        morphs[2] = dom.createMorphAt(element4, 2, 2);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        return morphs;
      },
      statements: [["block", "if", [["get", "model", ["loc", [null, [4, 12], [4, 17]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 6], [12, 13]]]], ["content", "global.user.first-name", ["loc", [null, [18, 10], [18, 36]]], 0, 0, 0, 0], ["content", "global.user.last-name", ["loc", [null, [18, 37], [18, 62]]], 0, 0, 0, 0], ["block", "each", [["get", "selected", ["loc", [null, [19, 14], [19, 22]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [19, 6], [23, 15]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("client/templates/user", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 6
          }
        },
        "moduleName": "client/templates/user.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row fullwidth mt3 mr3 ml2");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-12 large-12");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "columns large-1 avatar mb1 text-right p0");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4, "class", "select-avatar");
        dom.setAttribute(el4, "name", "");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "columns large-11");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        dom.setAttribute(el4, "class", "jr--title-header pl1");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      \n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "pl1");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 3, 1]), 0, 0);
        return morphs;
      },
      statements: [["content", "model.name", ["loc", [null, [7, 41], [7, 55]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("client/templates/write", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 8
              },
              "end": {
                "line": 10,
                "column": 8
              }
            },
            "moduleName": "client/templates/write.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "thumb");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("img");
            dom.setAttribute(el2, "alt", "");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "m--tag display-block br0");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element3 = dom.childAt(fragment, [1]);
            var element4 = dom.childAt(element3, [1]);
            var morphs = new Array(3);
            morphs[0] = dom.createElementMorph(element3);
            morphs[1] = dom.createAttrMorph(element4, 'src');
            morphs[2] = dom.createMorphAt(dom.childAt(element3, [3]), 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["remove", ["get", "img.index", ["loc", [null, [6, 47], [6, 56]]], 0, 0, 0, 0], ["get", "img.image", ["loc", [null, [6, 58], [6, 67]]], 0, 0, 0, 0]], [], ["loc", [null, [6, 29], [6, 70]]], 0, 0], ["attribute", "src", ["get", "img.image", ["loc", [null, [7, 24], [7, 33]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "img.name", ["loc", [null, [8, 51], [8, 63]]], 0, 0, 0, 0]],
          locals: ["img"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 4
            },
            "end": {
              "line": 12,
              "column": 4
            }
          },
          "moduleName": "client/templates/write.hbs"
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
          dom.setAttribute(el1, "class", "display-flex text-center mb3");
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
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "mission.images", ["loc", [null, [5, 16], [5, 30]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [5, 8], [10, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 6
            },
            "end": {
              "line": 17,
              "column": 6
            }
          },
          "moduleName": "client/templates/write.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createUnsafeMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "mission.lastRapport.body", ["loc", [null, [16, 8], [16, 38]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.0",
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
          "moduleName": "client/templates/write.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        Skriv texten här!\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 8
              },
              "end": {
                "line": 31,
                "column": 8
              }
            },
            "moduleName": "client/templates/write.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "thumb");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("img");
            dom.setAttribute(el2, "alt", "");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createAttrMorph(element1, 'src');
            return morphs;
          },
          statements: [["element", "action", ["add", ["get", "index", ["loc", [null, [28, 44], [28, 49]]], 0, 0, 0, 0], ["get", "structure.title", ["loc", [null, [28, 50], [28, 65]]], 0, 0, 0, 0], ["get", "img", ["loc", [null, [28, 66], [28, 69]]], 0, 0, 0, 0]], [], ["loc", [null, [28, 29], [28, 72]]], 0, 0], ["attribute", "src", ["get", "img", ["loc", [null, [29, 24], [29, 27]]], 0, 0, 0, 0], 0, 0, 0, 0]],
          locals: ["img"],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 33,
                "column": 6
              },
              "end": {
                "line": 35,
                "column": 6
              }
            },
            "moduleName": "client/templates/write.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "text");
            var el2 = dom.createTextNode("Klicka på bilden för att lägga till den i rapporten");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 40,
                  "column": 10
                },
                "end": {
                  "line": 42,
                  "column": 10
                }
              },
              "moduleName": "client/templates/write.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("            ");
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
            statements: [["content", "e", ["loc", [null, [41, 16], [41, 21]]], 0, 0, 0, 0]],
            locals: ["e"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 37,
                "column": 8
              },
              "end": {
                "line": 44,
                "column": 8
              }
            },
            "moduleName": "client/templates/write.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "explore mb1");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("b");
            var el3 = dom.createTextNode("Utforska");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("        ");
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
          statements: [["block", "each", [["get", "structure.explore", ["loc", [null, [40, 18], [40, 35]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [40, 10], [42, 19]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child3 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.9.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 48,
                  "column": 10
                },
                "end": {
                  "line": 50,
                  "column": 10
                }
              },
              "moduleName": "client/templates/write.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("            ");
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
            statements: [["content", "k", ["loc", [null, [49, 16], [49, 21]]], 0, 0, 0, 0]],
            locals: ["k"],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.9.0",
            "loc": {
              "source": null,
              "start": {
                "line": 45,
                "column": 8
              },
              "end": {
                "line": 52,
                "column": 8
              }
            },
            "moduleName": "client/templates/write.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "knowledge");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("b");
            var el3 = dom.createTextNode("Förkunskaper");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("        ");
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
          statements: [["block", "each", [["get", "structure.knowledge", ["loc", [null, [48, 18], [48, 37]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [48, 10], [50, 19]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.0",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 4
            },
            "end": {
              "line": 54,
              "column": 4
            }
          },
          "moduleName": "client/templates/write.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "jr--title size--large");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "camera-wrapper");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1, "class", "margin--bottom--large");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
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
          var element2 = dom.childAt(fragment, [7]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          morphs[3] = dom.createMorphAt(element2, 1, 1);
          morphs[4] = dom.createMorphAt(element2, 2, 2);
          return morphs;
        },
        statements: [["content", "structure.title", ["loc", [null, [24, 42], [24, 61]]], 0, 0, 0, 0], ["block", "each", [["get", "structure.images", ["loc", [null, [27, 16], [27, 32]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [27, 8], [31, 17]]]], ["block", "if", [["get", "structure.images", ["loc", [null, [33, 12], [33, 28]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [33, 6], [35, 13]]]], ["block", "if", [["subexpr", "gt", [["get", "structure.explore.length", ["loc", [null, [37, 18], [37, 42]]], 0, 0, 0, 0], 0], [], ["loc", [null, [37, 14], [37, 45]]], 0, 0]], [], 2, null, ["loc", [null, [37, 8], [44, 15]]]], ["block", "if", [["subexpr", "gt", [["get", "structure.knowledge.length", ["loc", [null, [45, 18], [45, 44]]], 0, 0, 0, 0], 0], [], ["loc", [null, [45, 14], [45, 47]]], 0, 0]], [], 3, null, ["loc", [null, [45, 8], [52, 15]]]]],
        locals: ["structure", "index"],
        templates: [child0, child1, child2, child3]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 56,
            "column": 6
          }
        },
        "moduleName": "client/templates/write.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "columns-divided");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "rows--2 float--left padding--medium outline--none write");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3, "contenteditable", "true");
        dom.setAttribute(el3, "data-text", "Title");
        dom.setAttribute(el3, "id", "parse--title");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "outline--none");
        dom.setAttribute(el3, "contenteditable", "true");
        dom.setAttribute(el3, "id", "parse--hook");
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
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "rows--2 float--right padding--medium");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [0]);
        var element6 = dom.childAt(element5, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element6, 1, 1);
        morphs[1] = dom.createUnsafeMorphAt(dom.childAt(element6, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element6, [5]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element5, [3]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["get", "mission.images", ["loc", [null, [3, 10], [3, 24]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [3, 4], [12, 11]]]], ["content", "mission.lastRapport.name", ["loc", [null, [13, 67], [13, 97]]], 0, 0, 0, 0], ["block", "if", [["get", "mission.lastRapport.body", ["loc", [null, [15, 12], [15, 36]]], 0, 0, 0, 0]], [], 1, 2, ["loc", [null, [15, 6], [19, 13]]]], ["block", "each", [["get", "data", ["loc", [null, [23, 12], [23, 16]]], 0, 0, 0, 0]], [], 3, null, ["loc", [null, [23, 4], [54, 13]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define('client/transitions', ['exports'], function (exports) {
  exports['default'] = function () {
    this.transition(this.fromRoute('index'), this.toRoute('rapports'), this.use('toLeft'), this.reverse('toRight'));

    this.transition(this.fromRoute('rapports'), this.toRoute('rapport'), this.use('toUp'), this.reverse('toUp'));

    this.transition(this.hasClass('tab'), this.use('fade'));
  };

  ;
});
define('client/transitions/cross-fade', ['exports', 'liquid-fire/transitions/cross-fade'], function (exports, _liquidFireTransitionsCrossFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsCrossFade['default'];
    }
  });
});
define('client/transitions/default', ['exports', 'liquid-fire/transitions/default'], function (exports, _liquidFireTransitionsDefault) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsDefault['default'];
    }
  });
});
define('client/transitions/explode', ['exports', 'liquid-fire/transitions/explode'], function (exports, _liquidFireTransitionsExplode) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsExplode['default'];
    }
  });
});
define('client/transitions/fade', ['exports', 'liquid-fire/transitions/fade'], function (exports, _liquidFireTransitionsFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFade['default'];
    }
  });
});
define('client/transitions/flex-grow', ['exports', 'liquid-fire/transitions/flex-grow'], function (exports, _liquidFireTransitionsFlexGrow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlexGrow['default'];
    }
  });
});
define('client/transitions/fly-to', ['exports', 'liquid-fire/transitions/fly-to'], function (exports, _liquidFireTransitionsFlyTo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlyTo['default'];
    }
  });
});
define('client/transitions/move-over', ['exports', 'liquid-fire/transitions/move-over'], function (exports, _liquidFireTransitionsMoveOver) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsMoveOver['default'];
    }
  });
});
define('client/transitions/scale', ['exports', 'liquid-fire/transitions/scale'], function (exports, _liquidFireTransitionsScale) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScale['default'];
    }
  });
});
define('client/transitions/scroll-then', ['exports', 'liquid-fire/transitions/scroll-then'], function (exports, _liquidFireTransitionsScrollThen) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScrollThen['default'];
    }
  });
});
define('client/transitions/to-down', ['exports', 'liquid-fire/transitions/to-down'], function (exports, _liquidFireTransitionsToDown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToDown['default'];
    }
  });
});
define('client/transitions/to-left', ['exports', 'liquid-fire/transitions/to-left'], function (exports, _liquidFireTransitionsToLeft) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToLeft['default'];
    }
  });
});
define('client/transitions/to-right', ['exports', 'liquid-fire/transitions/to-right'], function (exports, _liquidFireTransitionsToRight) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToRight['default'];
    }
  });
});
define('client/transitions/to-up', ['exports', 'liquid-fire/transitions/to-up'], function (exports, _liquidFireTransitionsToUp) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToUp['default'];
    }
  });
});
define('client/transitions/wait', ['exports', 'liquid-fire/transitions/wait'], function (exports, _liquidFireTransitionsWait) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsWait['default'];
    }
  });
});
define("client/utils/assets", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = {
    path: function path(type) {
      return "https://s3-eu-west-1.amazonaws.com/jutarum/images/" + type + "/";
    },

    ext: function ext() {
      return ".svg";
    },

    avatars: function avatars() {
      return [{ "name": "boy", "text": "" }, { "name": "boy-1", "text": "" }, { "name": "boy-2", "text": "" }, { "name": "boy-3", "text": "" }, { "name": "boy-4", "text": "" }, { "name": "boy-5", "text": "" }, { "name": "girl", "text": "" }, { "name": "girl-1", "text": "" }, { "name": "girl-2", "text": "" }, { "name": "girl-3", "text": "" }, { "name": "girl-4", "text": "" }, { "name": "girl-5", "text": "" }, { "name": "girl-6", "text": "" }, { "name": "girl-7", "text": "" }, { "name": "man", "text": "" }, { "name": "man-1", "text": "" }];
    },

    icons: function icons() {
      return [{ "name": "bonfire", "text": "Äld" }, { "name": "bug", "text": "Kryp" }, { "name": "butterfly", "text": "Fjäril" }, { "name": "cactus", "text": "Kaktus" }, { "name": "camel-1", "text": "Kaktus" }, { "name": "camel", "text": "Kamel" }, { "name": "deer", "text": "Hjort" }, { "name": "fish", "text": "FisK" }, { "name": "flower", "text": "Blomma" }, { "name": "forest", "text": "Skog" }, { "name": "igloo", "text": "Iglo" }, { "name": "mountain", "text": "Berg" }, { "name": "mountain-1", "text": "Berg" }, { "name": "polar-bear", "text": "Isbjörn" }, { "name": "scorpion", "text": "Skorpinjon" }, { "name": "seagull", "text": "Fiskmås" }, { "name": "squirrel", "text": "Ekorre" }, { "name": "tent-1", "text": "Tält" }, { "name": "tent", "text": "Tält" }, { "name": "tree-1", "text": "Träd" }, { "name": "tree-2", "text": "Träd" }, { "name": "tree-3", "text": "Träd" }, { "name": "tree-4", "text": "Träd" }, { "name": "tree", "text": "Träd" }];
    }
  };
});
define('client/utils/helper', ['exports'], function (exports) {
  exports['default'] = {
    hasFlash: function hasFlash() {
      var hasFlash = false;
      try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (fo) {
          hasFlash = true;
        }
      } catch (e) {
        if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
          hasFlash = true;
        }
      }

      return hasFlash;
    },

    removeHoverCSSRule: function removeHoverCSSRule() {
      console.log("remove hover");
      if ('createTouch' in document) {
        try {
          Ember.$("body").addClass("no-hover");
          var ignore = /:hover/;
          for (var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (!sheet.cssRules) {
              continue;
            }
            for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
              var rule = sheet.cssRules[j];
              if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
                sheet.deleteRule(j);
              }
            }
          }
        } catch (e) {}
      }
    },

    clearUpload: function clearUpload(e) {
      e.target.replaceWith(e.target = e.target.clone(true));
    }
  };
});
define('client/views/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('client/config/environment', ['ember'], function(Ember) {
  var prefix = 'client';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("client/app")["default"].create({"name":"Jutarum","version":"0.0.0+559fee6f"});
}

/* jshint ignore:end */
//# sourceMappingURL=client.map
