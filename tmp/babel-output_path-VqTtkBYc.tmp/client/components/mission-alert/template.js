define("client/components/mission-alert/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.4.6",
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
        dom.setAttribute(el2, "class", "badge");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Du har 1 nytt uppdrag ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
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
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [2, 1]), 0, 0);
        morphs[2] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [["inline", "fa-icon", ["exclamation"], [], ["loc", [null, [1, 37], [1, 62]]]], ["content", "latest.name", ["loc", [null, [1, 119], [1, 134]]]], ["element", "action", ["close"], [], ["loc", [null, [2, 96], [2, 115]]]]],
      locals: [],
      templates: []
    };
  })());
});