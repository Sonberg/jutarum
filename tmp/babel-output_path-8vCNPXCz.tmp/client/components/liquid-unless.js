define('client/components/liquid-unless', ['exports', 'client/components/liquid-if'], function (exports, _clientComponentsLiquidIf) {
  exports['default'] = _clientComponentsLiquidIf['default'].extend({
    helperName: 'liquid-unless',
    layoutName: 'components/liquid-if',
    inverted: true
  });
});