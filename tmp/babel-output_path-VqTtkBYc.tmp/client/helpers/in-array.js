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