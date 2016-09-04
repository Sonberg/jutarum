define('client/routes/rapport', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find("rapport", params.rapport_id);
    },

    renderTemplate: function renderTemplate() {
      this.render('rapport', {
        into: 'application'
      });
    }
  });
});