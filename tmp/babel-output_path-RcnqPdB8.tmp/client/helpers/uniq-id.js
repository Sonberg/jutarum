define("client/helpers/uniq-id", ["exports", "ember"], function (exports, _ember) {
  exports.uniqId = uniqId;

  function uniqId(params /*, hash*/) {
    var el = params[0];

    return "EmberEl" + el.elementId;
  }

  exports["default"] = _ember["default"].Helper.helper(uniqId);
});