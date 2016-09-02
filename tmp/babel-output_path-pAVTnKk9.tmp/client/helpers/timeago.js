define('client/helpers/timeago', ['exports', 'ember'], function (exports, _ember) {
  exports.timeago = timeago;

  function timeago(params /*, hash*/) {
    moment.locale('sv');
    var date = params[0];
    var time = moment(date, "YYYYMMDD");
    if (time.isValid()) {
      return time.fromNow();
    }
    return "";
  }

  exports['default'] = _ember['default'].Helper.helper(timeago);
});