define('client/helpers/asset-icon', ['exports', 'ember', 'client/utils/assets'], function (exports, _ember, _clientUtilsAssets) {
  exports.assetIcon = assetIcon;

  function assetIcon(params /*, hash*/) {
    var path = _clientUtilsAssets['default'].path("icons"),
        ex = _clientUtilsAssets['default'].ext(),
        image = params[0],
        className;

    if (params[1] !== null) {
      className = params[1];
    }

    return "<img src='" + path + image + ex + "' class='" + className + "'/>";
  }

  exports['default'] = _ember['default'].Helper.helper(assetIcon);
});