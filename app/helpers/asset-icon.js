import Ember from 'ember';
import assets from '../utils/assets';

export function assetIcon(params/*, hash*/) {
  var path = assets.path("icons");
  var ex = assets.ext();
  var image = params[0];
  
  return "<img src='" + path + image + ex + "'/>";
}

export default Ember.Helper.helper(assetIcon);
