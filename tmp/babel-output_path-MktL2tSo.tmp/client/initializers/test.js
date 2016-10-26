define('client/initializers/test', ['exports'], function (exports) {
    exports.initialize = initialize;

    function initialize(container, application) {
        application.inject('controller', 'cookie', 'cookie:main');
        application.inject('component', 'cookie', 'cookie:main');
    }

    exports['default'] = {
        name: 'test-initializer',
        after: ['cookie'],
        initialize: initialize
    };
});