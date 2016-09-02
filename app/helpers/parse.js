import Ember from 'ember';

export function parse(params/*, hash*/) {
  return JSON.parse(params[0]);
}

export default Ember.Helper.helper(parse);
