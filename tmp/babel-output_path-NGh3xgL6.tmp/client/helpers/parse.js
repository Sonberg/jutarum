define('client/helpers/parse', ['exports', 'ember'], function (exports, _ember) {
  exports.parse = parse;

  function parse(params /*, hash*/) {
    return JSON.parse(params[0]);
  }

  exports['default'] = _ember['default'].Helper.helper(parse);
});