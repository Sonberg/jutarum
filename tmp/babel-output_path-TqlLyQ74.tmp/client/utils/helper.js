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

    removeHoverCSSRule: function removeHoverCSSRule() {
      console.log("remove hover");
      if ('createTouch' in document) {
        try {
          Ember.$("body").addClass("no-hover");
          var ignore = /:hover/;
          for (var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (!sheet.cssRules) {
              continue;
            }
            for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
              var rule = sheet.cssRules[j];
              if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
                sheet.deleteRule(j);
              }
            }
          }
        } catch (e) {}
      }
    },

    clearUpload: function clearUpload(e) {
      e.target.replaceWith(e.target = e.target.clone(true));
    }
  };
});