import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  "name": attr('string'),
  "structure" : attr('string'),
  "body" : attr('string'),
  "mission" : belongsTo('mission'),
  "mission-id" : attr('number'),
  "school-id" : attr('number'),
  "team" : attr('string'),
  "created" : attr('date')
});
