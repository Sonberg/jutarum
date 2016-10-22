define('client/models/user', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    "first-name": (0, _emberDataAttr['default'])('string'),
    "last-name": (0, _emberDataAttr['default'])('string'),
    "slug": "kalle-karlsson",
    "school-id": (0, _emberDataAttr['default'])('number'),
    "type": (0, _emberDataAttr['default'])('string'),
    "avatar": (0, _emberDataAttr['default'])('string'),
    "updated": (0, _emberDataAttr['default'])('string'),
    "created": (0, _emberDataAttr['default'])('string'),

    "class": "3A",
    "adress": "Strandvägen 17",
    "postal": "30269",
    "city": "Halmstad"

  });
});