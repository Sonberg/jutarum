import Ember from 'ember';

export function uniqId(params/*, hash*/) {
  var el = params[0];
  
  return "EmberEl" + el.elementId;
}

export default Ember.Helper.helper(uniqId);
