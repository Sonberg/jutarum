define('client/components/mission-report/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    model: null,
    buttonClass: "animated-hover faa-parent",
    tags: ['Engelska', 'Vår', '3e']
  });
});