import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
var computed = Ember.computed;
var observer = Ember.observer;
var $ = Ember.$;
var run = Ember.run;
var on = Ember.on;
var typeOf = Ember.typeOf;
// jshint ignore:line
var get = Ember.get;
var set = Ember.set;
// jshint ignore:line
var a = Ember.A; // jshint ignore:line

export default Ember.Service.extend({
  init: function init() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._super(args);
    this.set('applicationController', getOwner(this).lookup('controller:application'));
    this.set('dRoute', getOwner(this).lookup('route:animals.animal.size'));
  },
  currentPath: computed.alias('applicationController.currentPath'),
  currentRouteName: computed.alias('applicationController.currentRouteName'),
  currentNode: computed('currentPath', function () {
    var chain = this.get('currentPath').split('.');
    var leaf = chain.pop();
    return leaf === 'index' ? chain.pop() : leaf;
  }),
  isIndexRoute: computed('currentPath', function () {
    return this.get('currentPath').split('.').pop() === 'index';
  }),
  primaryRoute: computed('currentPath', function () {
    var currentPath = this.get('currentPath').split('.');
    return currentPath[0] !== 'index' ? currentPath[0] : null;
  }),
  secondaryRoute: computed('currentPath', function () {
    var currentPath = this.get('currentPath').split('.');
    var length = currentPath.length;
    return currentPath[1] !== 'index' && length > 1 ? currentPath[1] : null;
  }),
  routeParts: computed('currentPath', function () {
    return this.get('currentPath').split('.').filter(function (p) {
      return p !== 'index';
    });
  }),
  routeContexts: computed('currentPath', '_contextMutex', function () {
    var _this = this;

    var parts = this.get('routeParts');
    // this._removeListeners();
    return parts.map(function (p, i) {
      var dottedNotation = parts.slice(0, i + 1).join('.');
      var route = getOwner(_this).lookup('route:' + dottedNotation);
      var context = undefined;
      if (route && get(route, 'context')) {
        // this._addListener(dottedNotation);
        context = get(route, 'context');
      } else {
        context = {};
      }

      return { part: p, path: dottedNotation, context: context };
    });
  }),
  signature: computed('routeContexts', function () {
    return this.get('routeContexts').map(function (part) {
      var context = get(part, 'context');
      if (Object.keys(context).length !== 0) {
        return context[Object.keys(context)[0]];
      } else {
        return get(part, 'part');
      }
    }).join('.');
  }),

  /**
   * A trigger mechanism for when a route's "dynamic segments" change but not the route itself
   */
  _contextMutex: false,
  refresh: function refresh() {
    this.toggleProperty('_contextMutex');
  },
  _listeners: computed(function () {
    return new Ember.Object();
  })
});
// _addListener(path) {
//   console.log('path: ', path);
//   const route = getOwner(this).lookup(`route:${path}`);
//   const context = get(route, 'context');
//   const param = Object.keys(context)[0];
//   const listeners = this.get('_listeners');
//   listeners[snake(path)] = route;
//
//   console.log('listeners: ', snake(path), listeners);
//   this.addObserver(`_listeners.${snake(path)}.context.${param}`, this._mutateContext);
// },
// _removeListeners() {
//   Object.keys(this._listeners).map(path => {
//     const context = getOwner(this).lookup(`route:${path}.context`);
//     // this.removeObserver(context, this, this._listeners[path]);
//   });
// },
// _mutateContext() {
//   console.log('mutating context');
//   // const mutexValue = Object.keys(this._listeners).map(k=>`${k}::${this._listeners[k]}`).join(',');
//   // this.set('_contextMutex', mutexValue);
//   this.toggleProperty('_contextMutex');
// }