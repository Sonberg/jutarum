define("client/transitions/to-down", ["exports", "client/transitions/move-over"], function (exports, _clientTransitionsMoveOver) {
  exports["default"] = function (opts) {
    return _clientTransitionsMoveOver["default"].call(this, 'y', 1, opts);
  };
});