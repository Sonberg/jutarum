define('client/models/rapport', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "name": (0, _emberDataAttr['default'])('string'),
    "structure": (0, _emberDataAttr['default'])('string'),
    "body": (0, _emberDataAttr['default'])('string'),
    "mission": (0, _emberDataRelationships.belongsTo)('mission'),
    "mission-id": (0, _emberDataAttr['default'])('number'),
    "school-id": (0, _emberDataAttr['default'])('number'),
    "team": (0, _emberDataAttr['default'])('string')
  });
});