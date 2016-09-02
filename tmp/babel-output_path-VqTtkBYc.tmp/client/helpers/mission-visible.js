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