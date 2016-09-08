import Ember from 'ember';
import assets from '../utils/assets';

export function assetIcon(params/*, hash*/) {
  var path = assets.path("icons"),
  ex = assets.ext(),
  image = params[0],
  className;
  
  if (params[1] !== null) {
    className = params[1];
  }
  
  return "<img src='" + path + image + ex + "' class='" + className + "'/>";
}

export default Ember.Helper.helper(assetIcon);
