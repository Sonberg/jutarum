import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findAll("rapport");
  },
  queryParams: {
    mission: {
      refreshModel: true
    },
    user: {
      refreshModel: true
    },
    class: {
      refreshModel: true
    }
  }
});
