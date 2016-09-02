define("client/transitions/to-left", ["exports", "client/transitions/move-over"], function (exports, _clientTransitionsMoveOver) {
  exports["default"] = function (opts) {
    return _clientTransitionsMoveOver["default"].call(this, 'x', -1, opts);
  };
});