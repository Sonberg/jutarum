import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  host: 'https://makers-api.herokuapp.com/api/v1',
  shouldBackgroundReloadRecord: function(store, snapshotArray) {
    return true;
  }
});
