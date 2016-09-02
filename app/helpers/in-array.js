import Ember from 'ember';

export function inArray(params/*, hash*/) {
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

export default Ember.Helper.helper(inArray);
