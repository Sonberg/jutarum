define('client/models/image', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    name: (0, _emberDataAttr['default'])('string'),
    rapport_id: (0, _emberDataAttr['default'])('number'),
    image: (0, _emberDataAttr['default'])('string')
  });
});