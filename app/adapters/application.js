import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  host: 'https://makers-api.herokuapp.com/api/v1',
  shouldReloadRecord: function(store, snapshot) {
    return false;
  },

  shouldReloadAll: function(store, snapshot) {
    return false;
  },

  shouldBackgroundReloadRecord: function(store, snapshot) {
    return true;
  },

  shouldBackgroundReloadAll: function(store, snapshot) {
    return true;
  }
});
