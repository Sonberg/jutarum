define("client/transitions/to-right", ["exports", "client/transitions/move-over"], function (exports, _clientTransitionsMoveOver) {
  exports["default"] = function (opts) {
    return _clientTransitionsMoveOver["default"].call(this, 'x', 1, opts);
  };
});