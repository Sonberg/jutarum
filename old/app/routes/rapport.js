import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find("rapport", params.rapport_id);
  },
  
  renderTemplate: function() {
    this.render('rapport', {
      into: 'application'
    });
  }
});
