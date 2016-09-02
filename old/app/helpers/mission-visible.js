import Ember from 'ember';

export function missionVisible(params/*, hash*/) {
    var visiblOn = ["index", "rapport", "rapports.index"];
    if (params[0]) {
      if (visiblOn.indexOf(params[0]) !== -1) {
        return true;
      }
    }
    return false;
}

export default Ember.Helper.helper(missionVisible);
