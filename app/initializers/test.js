export function initialize(container, application) {
    application.inject('controller', 'cookie', 'cookie:main');
    application.inject('component', 'cookie', 'cookie:main');
}

export default {
    name: 'test-initializer',
    after: ['cookie'],
    initialize: initialize
}