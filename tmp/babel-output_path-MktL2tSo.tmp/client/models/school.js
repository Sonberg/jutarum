define('client/models/school', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "name": (0, _emberDataAttr['default'])('string'),
    "updated": (0, _emberDataAttr['default'])('string'),
    "created": (0, _emberDataAttr['default'])('string')
  });
});