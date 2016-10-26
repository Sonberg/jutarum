define("client/controllers/login", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    store: _ember["default"].inject.service(),
    global: _ember["default"].inject.service(),

    school: null,
    user: null,
    users: null,

    _fetch: (function () {
      var school = this.get("school");
      if (school) {
        var data = this.get("store").query("user", { schoolId: school });
        this.set("users", data);
      }
    }).observes("school"),

    init: function init() {
      this._super();

      _ember["default"].run.schedule("afterRender", this, function () {
        var school = this.cookie.getCookie('school');
        var user = this.cookie.getCookie('user');
        if (school && user) {
          this.set("global.school", this.get("store").find("school", school));
          this.set("global.user", this.get("store").find("user", user));
          this.transitionToRoute('index');
        }
      });
    },

    actions: {
      submit: function submit() {
        this.set("global.school", this.get("store").peekRecord("school", this.get("school")));
        this.set("global.user", this.get("store").peekRecord("user", this.get("user")));
        this.cookie.setCookie('school', this.get("school"), { expires: 7, path: '/' });
        this.cookie.setCookie('user', this.get("user"), { expires: 7, path: '/' });
      }
    }
  });
});