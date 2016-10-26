define('client/models/mission', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "name": (0, _emberDataAttr['default'])('string'),
    "body": (0, _emberDataAttr['default'])('string'),
    "structures": (0, _emberDataAttr['default'])(),
    "image": (0, _emberDataAttr['default'])('string'),
    "school-id": (0, _emberDataAttr['default'])('number'),
    "created": (0, _emberDataAttr['default'])('string'),
    "updated": (0, _emberDataAttr['default'])('string')
  });
});