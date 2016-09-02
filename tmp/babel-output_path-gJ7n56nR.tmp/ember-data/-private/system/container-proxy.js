define('ember-data/-private/system/container-proxy', ['exports', 'ember-data/-private/debug'], function (exports, _emberDataPrivateDebug) {
  'use strict';

  exports['default'] = ContainerProxy;

  /*
    This is used internally to enable deprecation of container paths and provide
    a decent message to the user indicating how to fix the issue.
  
    @class ContainerProxy
    @namespace DS
    @private
  */
  function ContainerProxy(container) {
    this.container = container;
  }

  ContainerProxy.prototype.aliasedFactory = function (path, preLookup) {
    var _this = this;

    return {
      create: function create() {
        if (preLookup) {
          preLookup();
        }

        return _this.container.lookup(path);
      }
    };
  };

  ContainerProxy.prototype.registerAlias = function (source, dest, preLookup) {
    var factory = this.aliasedFactory(dest, preLookup);

    return this.container.register(source, factory);
  };

  ContainerProxy.prototype.registerDeprecation = function (deprecated, valid) {
    var preLookupCallback = function preLookupCallback() {};

    return this.registerAlias(deprecated, valid, preLookupCallback);
  };

  ContainerProxy.prototype.registerDeprecations = function (proxyPairs) {
    var i, proxyPair, deprecated, valid;

    for (i = proxyPairs.length; i > 0; i--) {
      proxyPair = proxyPairs[i - 1];
      deprecated = proxyPair['deprecated'];
      valid = proxyPair['valid'];

      this.registerDeprecation(deprecated, valid);
    }
  };
});