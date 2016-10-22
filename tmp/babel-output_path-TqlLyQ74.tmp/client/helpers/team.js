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