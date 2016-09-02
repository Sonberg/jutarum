define('client/helpers/asset-avatar', ['exports', 'ember', 'client/utils/assets'], function (exports, _ember, _clientUtilsAssets) {
  exports.assetIcon = assetIcon;

  function assetIcon(params /*, hash*/) {
    var path = _clientUtilsAssets['default'].path("avatars");
    var ex = _clientUtilsAssets['default'].ext();
    var image = params[0];

    return "<img src='" + path + image + ex + "'/>";
  }

  exports['default'] = _ember['default'].Helper.helper(assetIcon);
});