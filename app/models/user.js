import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  "first-name": attr('string'),
  "last-name": attr('string'),
  "slug": "kalle-karlsson",
  "school-id": attr('number'),
  "type": attr('string'),
  "avatar": attr('string'),
  "updated": attr('string'),
  "created": attr('string'),
  
  "class": "3A",
  "adress": "Strandvägen 17",
  "postal": "30269",
  "city": "Halmstad"

});