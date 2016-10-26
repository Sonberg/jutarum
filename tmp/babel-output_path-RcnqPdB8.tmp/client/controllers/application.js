define('client/controllers/application', ['exports', 'ember', 'client/utils/helper'], function (exports, _ember, _clientUtilsHelper) {
  exports['default'] = _ember['default'].Controller.extend({
    global: _ember['default'].inject.service(),
    isAuthenticated: false,
    _watch: (function () {
      _clientUtilsHelper['default'].removeHoverCSSRule();

      if (this.get("global.user") && this.get("global.school")) {
        this.set("isAuthenticated", true);
      } else {
        this.set("isAuthenticated", false);
      }
    }).on("init").observes("global.user")
  });
});