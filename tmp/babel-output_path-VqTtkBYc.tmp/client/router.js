define('client/router', ['exports', 'ember', 'client/config/environment'], function (exports, _ember, _clientConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _clientConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('index', { path: '/' });
    this.route('rapports', { path: 'rapports' }, function () {
      this.route('rapport', { path: ':rapport_id', resetNamespace: true });
    });

    this.route('user', { path: 'users/:user_id', resetNamespace: true }, function () {});

    this.route('mission', { path: 'missions/:mission_id', resetNamespace: true }, function () {
      this.route('team', { path: '/team', resetNamespace: true });
      this.route('structure', { path: '/structure', resetNamespace: true });
      this.route('explore', { path: '/explore', resetNamespace: true });
      this.route('knowledge', { path: '/knowledge', resetNamespace: true });
      this.route('write', { path: '/write', resetNamespace: true });
    });

    /* Dashboard */
    this.route('dashboard', { path: 'admin' }, function () {
      this.route('dashboard-missions', { path: '/missions', resetNamespace: true });
      //this.route('dashboard-rapports', { path: '/rapports', resetNamespace: true });
      //this.route('dashboard-students', { path: '/students', resetNamespace: true });
    });
    /* 404 - Page not found */
    this.route('not-found', { path: '/*path' });
    this.route('login');
  });

  exports['default'] = Router;
});