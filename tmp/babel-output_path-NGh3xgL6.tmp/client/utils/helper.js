define('client/utils/helper', ['exports'], function (exports) {
  exports['default'] = {
    hasFlash: function hasFlash() {
      var hasFlash = false;
      try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (fo) {
          hasFlash = true;
        }
      } catch (e) {
        if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
          hasFlash = true;
        }
      }

      return hasFlash;
    },

    removeTouchHover: function removeTouchHover() {
      Ember.$("body").addClass("no-hover");
    },

    clearUpload: function clearUpload(e) {
      e.target.replaceWith(e.target = e.target.clone(true));
    }
  };
});