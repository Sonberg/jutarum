define('client/controllers/knowledge', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    // Check if stuckture is choose
    mission: _ember['default'].inject.service(),
    init: function init() {
      this._super();
      if (this.get("mission.structure.length") === 0) {
        this.get('router').transitionTo('structure');
      }

      _ember['default'].run.schedule("afterRender", this, function () {
        this.set("mission.tab", "Förkunskaper");
      });
    }
  });
});