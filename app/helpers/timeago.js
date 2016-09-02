import Ember from 'ember';

export function timeago(params/*, hash*/) {
  moment.locale('sv');
  var date = params[0];
  var time = moment(date, "YYYYMMDD");
  if (time.isValid()) {
    return time.fromNow();
  }
  return "";
}

export default Ember.Helper.helper(timeago);
