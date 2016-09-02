import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      "id" : 15,
      "name": "Kalle Karlsson",
      "slug" : "kalle-karlsson",
      "type" : "student",
      "avatar" : "giraff",
      "school": "Jutarumskolan",
      "class" : "3A",
      "adress" : "Strandvägen 17",
      "postal" : "30269",
      "city" : "Halmstad"
    };
  }
});