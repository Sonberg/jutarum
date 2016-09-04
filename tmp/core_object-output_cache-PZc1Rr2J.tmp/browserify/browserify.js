(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Applications/MAMP/htdocs/jutarum/node_modules/pdfobject/pdfobject.js":[function(require,module,exports){
/*global ActiveXObject, window, console, define, module, jQuery */
//jshint unused:false, strict: false

/*
    PDFObject v2.0.201604172
    https://github.com/pipwerks/PDFObject
    Copyright (c) 2008-2016 Philip Hutchison
    MIT-style license: http://pipwerks.mit-license.org/
    UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.PDFObject = factory();
  }
}(this, function () {

    "use strict";
    //jshint unused:true

    //PDFObject is designed for client-side (browsers), not server-side (node)
    //Will choke on undefined navigator and window vars when run on server
    //Return boolean false and exit function when running server-side

    if(typeof window === "undefined" || typeof navigator === "undefined"){ return false; }

    var pdfobjectversion = "2.0.201604172",
        supportsPDFs,

        //declare functions
        createAXO,
        isIE,
        supportsPdfMimeType = (typeof navigator.mimeTypes['application/pdf'] !== "undefined"),
        supportsPdfActiveX,
        buildFragmentString,
        log,
        embedError,
        embed,
        getTargetElement,
        generatePDFJSiframe,
        isIOS = (function (){ return (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())); })(),
        generateEmbedElement;


    /* ----------------------------------------------------
       Supporting functions
       ---------------------------------------------------- */

    createAXO = function (type){
        var ax;
        try {
            ax = new ActiveXObject(type);
        } catch (e) {
            ax = null; //ensure ax remains null
        }
        return ax;
    };

    //IE11 still uses ActiveX for Adobe Reader, but IE 11 doesn't expose
    //window.ActiveXObject the same way previous versions of IE did
    //window.ActiveXObject will evaluate to false in IE 11, but "ActiveXObject" in window evaluates to true
    //so check the first one for older IE, and the second for IE11
    //FWIW, MS Edge (replacing IE11) does not support ActiveX at all, both will evaluate false
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    isIE = function (){ return !!(window.ActiveXObject || "ActiveXObject" in window); };

    //If either ActiveX support for "AcroPDF.PDF" or "PDF.PdfCtrl" are found, return true
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    supportsPdfActiveX = function (){ return !!(createAXO("AcroPDF.PDF") || createAXO("PDF.PdfCtrl")); };

    //Determines whether PDF support is available
    supportsPDFs = (supportsPdfMimeType || (isIE() && supportsPdfActiveX()));

    //Create a fragment identifier for using PDF Open parameters when embedding PDF
    buildFragmentString = function(pdfParams){

        var string = "",
            prop;

        if(pdfParams){

            for (prop in pdfParams) {
                if (pdfParams.hasOwnProperty(prop)) {
                    string += encodeURIComponent(prop) + "=" + encodeURIComponent(pdfParams[prop]) + "&";
                }
            }

            //The string will be empty if no PDF Params found
            if(string){

                string = "#" + string;

                //Remove last ampersand
                string = string.slice(0, string.length - 1);

            }

        }

        return string;

    };

    log = function (msg){
        if(typeof console !== "undefined" && console.log){
            console.log("[PDFObject] " + msg);
        }
    };

    embedError = function (msg){
        log(msg);
        return false;
    };

    getTargetElement = function (targetSelector){

        //Default to body for full-browser PDF
        var targetNode = document.body;

        //If a targetSelector is specified, check to see whether
        //it's passing a selector, jQuery object, or an HTML element

        if(typeof targetSelector === "string"){

            //Is CSS selector
            targetNode = document.querySelector(targetSelector);

        } else if (typeof jQuery !== "undefined" && targetSelector instanceof jQuery && targetSelector.length) {

            //Is jQuery element. Extract HTML node
            targetNode = targetSelector.get(0);

        } else if (typeof targetSelector.nodeType !== "undefined" && targetSelector.nodeType === 1){

            //Is HTML element
            targetNode = targetSelector;

        }

        return targetNode;

    };

    generatePDFJSiframe = function (targetNode, url, pdfOpenFragment, PDFJS_URL, id){

        var fullURL = PDFJS_URL + "?file=" + encodeURIComponent(url) + pdfOpenFragment;
        var scrollfix = (isIOS) ? "-webkit-overflow-scrolling: touch; overflow-y: scroll; " : "overflow: hidden; ";
        var iframe = "<div style='" + scrollfix + "position: absolute; top: 0; right: 0; bottom: 0; left: 0;'><iframe  " + id + " src='" + fullURL + "' style='border: none; width: 100%; height: 100%;' frameborder='0'></iframe></div>";
        targetNode.className += " pdfobject-container";
        targetNode.style.position = "relative";
        targetNode.style.overflow = "auto";
        targetNode.innerHTML = iframe;
        return targetNode.getElementsByTagName("iframe")[0];

    };

    generateEmbedElement = function (targetNode, targetSelector, url, pdfOpenFragment, width, height, id){

        var style = "";

        if(targetSelector && targetSelector !== document.body){
            style = "width: " + width + "; height: " + height + ";";
        } else {
            style = "position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";
        }

        targetNode.className += " pdfobject-container";
        targetNode.innerHTML = "<embed " + id + " class='pdfobject' src='" + url + pdfOpenFragment + "' type='application/pdf' style='overflow: auto; " + style + "'/>";

        return targetNode.getElementsByTagName("embed")[0];

    };

    embed = function(url, targetSelector, options){

        //Ensure URL is available. If not, exit now.
        if(typeof url !== "string"){ return embedError("URL is not valid"); }

        //If targetSelector is not defined, convert to boolean
        targetSelector = (typeof targetSelector !== "undefined") ? targetSelector : false;

        //Ensure options object is not undefined -- enables easier error checking below
        options = (typeof options !== "undefined") ? options : {};

        //Get passed options, or set reasonable defaults
        var id = (options.id && typeof options.id === "string") ? "id='" + options.id + "'" : "",
            page = (options.page) ? options.page : false,
            pdfOpenParams = (options.pdfOpenParams) ? options.pdfOpenParams : {},
            fallbackLink = (typeof options.fallbackLink !== "undefined") ? options.fallbackLink : true,
            width = (options.width) ? options.width : "100%",
            height = (options.height) ? options.height : "100%",
            forcePDFJS = (typeof options.forcePDFJS === "boolean") ? options.forcePDFJS : false,
            PDFJS_URL = (options.PDFJS_URL) ? options.PDFJS_URL : false,
            targetNode = getTargetElement(targetSelector),
            fallbackHTML = "",
            pdfOpenFragment = "",
            fallbackHTML_default = "<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>";

        //If target element is specified but is not valid, exit without doing anything
        if(!targetNode){ return embedError("Target element cannot be determined"); }


        //page option overrides pdfOpenParams, if found
        if(page){
            pdfOpenParams.page = page;
        }

        //Stringify optional Adobe params for opening document (as fragment identifier)
        pdfOpenFragment = buildFragmentString(pdfOpenParams);

        //Do the dance
        if(forcePDFJS && PDFJS_URL){

            return generatePDFJSiframe(targetNode, url, pdfOpenFragment, PDFJS_URL, id);

        } else if(supportsPDFs){

            return generateEmbedElement(targetNode, targetSelector, url, pdfOpenFragment, width, height, id);

        } else {

            if(PDFJS_URL){

                return generatePDFJSiframe(targetNode, url, pdfOpenFragment, PDFJS_URL, id);

            } else if(fallbackLink){

                fallbackHTML = (typeof fallbackLink === "string") ? fallbackLink : fallbackHTML_default;
                targetNode.innerHTML = fallbackHTML.replace(/\[url\]/g, url);

            }

            return embedError("This browser does not support embedded PDFs");

        }

    };

    return {
        embed: function (a,b,c){ return embed(a,b,c); },
        pdfobjectversion: (function () { return pdfobjectversion; })(),
        supportsPDFs: (function (){ return supportsPDFs; })()
    };

}));
},{}],"/Applications/MAMP/htdocs/jutarum/node_modules/tether-drop/dist/js/drop.js":[function(require,module,exports){
/*! tether-drop 1.4.1 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["tether"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('tether'));
  } else {
    root.Drop = factory(root.Tether);
  }
}(this, function(Tether) {

/* global Tether */
'use strict';

var _bind = Function.prototype.bind;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Tether$Utils = Tether.Utils;
var extend = _Tether$Utils.extend;
var addClass = _Tether$Utils.addClass;
var removeClass = _Tether$Utils.removeClass;
var hasClass = _Tether$Utils.hasClass;
var Evented = _Tether$Utils.Evented;

function sortAttach(str) {
  var _str$split = str.split(' ');

  var _str$split2 = _slicedToArray(_str$split, 2);

  var first = _str$split2[0];
  var second = _str$split2[1];

  if (['left', 'right'].indexOf(first) >= 0) {
    var _ref = [second, first];
    first = _ref[0];
    second = _ref[1];
  }
  return [first, second].join(' ');
}

function removeFromArray(arr, item) {
  var index = undefined;
  var results = [];
  while ((index = arr.indexOf(item)) !== -1) {
    results.push(arr.splice(index, 1));
  }
  return results;
}

var clickEvents = ['click'];
if ('ontouchstart' in document.documentElement) {
  clickEvents.push('touchstart');
}

var transitionEndEvents = {
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'OTransition': 'otransitionend',
  'transition': 'transitionend'
};

var transitionEndEvent = '';
for (var _name in transitionEndEvents) {
  if (({}).hasOwnProperty.call(transitionEndEvents, _name)) {
    var tempEl = document.createElement('p');
    if (typeof tempEl.style[_name] !== 'undefined') {
      transitionEndEvent = transitionEndEvents[_name];
    }
  }
}

var MIRROR_ATTACH = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
  middle: 'middle',
  center: 'center'
};

var allDrops = {};

// Drop can be included in external libraries.  Calling createContext gives you a fresh
// copy of drop which won't interact with other copies on the page (beyond calling the document events).

function createContext() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var drop = function drop() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new (_bind.apply(DropInstance, [null].concat(args)))();
  };

  extend(drop, {
    createContext: createContext,
    drops: [],
    defaults: {}
  });

  var defaultOptions = {
    classPrefix: 'drop',
    defaults: {
      position: 'bottom left',
      openOn: 'click',
      beforeClose: null,
      constrainToScrollParent: true,
      constrainToWindow: true,
      classes: '',
      remove: false,
      openDelay: 0,
      closeDelay: 50,
      // inherited from openDelay and closeDelay if not explicitly defined
      focusDelay: null,
      blurDelay: null,
      hoverOpenDelay: null,
      hoverCloseDelay: null,
      tetherOptions: {}
    }
  };

  extend(drop, defaultOptions, options);
  extend(drop.defaults, defaultOptions.defaults, options.defaults);

  if (typeof allDrops[drop.classPrefix] === 'undefined') {
    allDrops[drop.classPrefix] = [];
  }

  drop.updateBodyClasses = function () {
    // There is only one body, so despite the context concept, we still iterate through all
    // drops which share our classPrefix.

    var anyOpen = false;
    var drops = allDrops[drop.classPrefix];
    var len = drops.length;
    for (var i = 0; i < len; ++i) {
      if (drops[i].isOpened()) {
        anyOpen = true;
        break;
      }
    }

    if (anyOpen) {
      addClass(document.body, drop.classPrefix + '-open');
    } else {
      removeClass(document.body, drop.classPrefix + '-open');
    }
  };

  var DropInstance = (function (_Evented) {
    _inherits(DropInstance, _Evented);

    function DropInstance(opts) {
      _classCallCheck(this, DropInstance);

      _get(Object.getPrototypeOf(DropInstance.prototype), 'constructor', this).call(this);
      this.options = extend({}, drop.defaults, opts);
      this.target = this.options.target;

      if (typeof this.target === 'undefined') {
        throw new Error('Drop Error: You must provide a target.');
      }

      var dataPrefix = 'data-' + drop.classPrefix;

      var contentAttr = this.target.getAttribute(dataPrefix);
      if (contentAttr && this.options.content == null) {
        this.options.content = contentAttr;
      }

      var attrsOverride = ['position', 'openOn'];
      for (var i = 0; i < attrsOverride.length; ++i) {

        var override = this.target.getAttribute(dataPrefix + '-' + attrsOverride[i]);
        if (override && this.options[attrsOverride[i]] == null) {
          this.options[attrsOverride[i]] = override;
        }
      }

      if (this.options.classes && this.options.addTargetClasses !== false) {
        addClass(this.target, this.options.classes);
      }

      drop.drops.push(this);
      allDrops[drop.classPrefix].push(this);

      this._boundEvents = [];
      this.bindMethods();
      this.setupElements();
      this.setupEvents();
      this.setupTether();
    }

    _createClass(DropInstance, [{
      key: '_on',
      value: function _on(element, event, handler) {
        this._boundEvents.push({ element: element, event: event, handler: handler });
        element.addEventListener(event, handler);
      }
    }, {
      key: 'bindMethods',
      value: function bindMethods() {
        this.transitionEndHandler = this._transitionEndHandler.bind(this);
      }
    }, {
      key: 'setupElements',
      value: function setupElements() {
        var _this = this;

        this.drop = document.createElement('div');
        addClass(this.drop, drop.classPrefix);

        if (this.options.classes) {
          addClass(this.drop, this.options.classes);
        }

        this.content = document.createElement('div');
        addClass(this.content, drop.classPrefix + '-content');

        if (typeof this.options.content === 'function') {
          var generateAndSetContent = function generateAndSetContent() {
            // content function might return a string or an element
            var contentElementOrHTML = _this.options.content.call(_this, _this);

            if (typeof contentElementOrHTML === 'string') {
              _this.content.innerHTML = contentElementOrHTML;
            } else if (typeof contentElementOrHTML === 'object') {
              _this.content.innerHTML = '';
              _this.content.appendChild(contentElementOrHTML);
            } else {
              throw new Error('Drop Error: Content function should return a string or HTMLElement.');
            }
          };

          generateAndSetContent();
          this.on('open', generateAndSetContent.bind(this));
        } else if (typeof this.options.content === 'object') {
          this.content.appendChild(this.options.content);
        } else {
          this.content.innerHTML = this.options.content;
        }

        this.drop.appendChild(this.content);
      }
    }, {
      key: 'setupTether',
      value: function setupTether() {
        // Tether expects two attachment points, one in the target element, one in the
        // drop.  We use a single one, and use the order as well, to allow us to put
        // the drop on either side of any of the four corners.  This magic converts between
        // the two:
        var dropAttach = this.options.position.split(' ');
        dropAttach[0] = MIRROR_ATTACH[dropAttach[0]];
        dropAttach = dropAttach.join(' ');

        var constraints = [];
        if (this.options.constrainToScrollParent) {
          constraints.push({
            to: 'scrollParent',
            pin: 'top, bottom',
            attachment: 'together none'
          });
        } else {
          // To get 'out of bounds' classes
          constraints.push({
            to: 'scrollParent'
          });
        }

        if (this.options.constrainToWindow !== false) {
          constraints.push({
            to: 'window',
            attachment: 'together'
          });
        } else {
          // To get 'out of bounds' classes
          constraints.push({
            to: 'window'
          });
        }

        var opts = {
          element: this.drop,
          target: this.target,
          attachment: sortAttach(dropAttach),
          targetAttachment: sortAttach(this.options.position),
          classPrefix: drop.classPrefix,
          offset: '0 0',
          targetOffset: '0 0',
          enabled: false,
          constraints: constraints,
          addTargetClasses: this.options.addTargetClasses
        };

        if (this.options.tetherOptions !== false) {
          this.tether = new Tether(extend({}, opts, this.options.tetherOptions));
        }
      }
    }, {
      key: 'setupEvents',
      value: function setupEvents() {
        var _this2 = this;

        if (!this.options.openOn) {
          return;
        }

        if (this.options.openOn === 'always') {
          setTimeout(this.open.bind(this));
          return;
        }

        var events = this.options.openOn.split(' ');

        if (events.indexOf('click') >= 0) {
          var openHandler = function openHandler(event) {
            _this2.toggle(event);
            event.preventDefault();
          };

          var closeHandler = function closeHandler(event) {
            if (!_this2.isOpened()) {
              return;
            }

            // Clicking inside dropdown
            if (event.target === _this2.drop || _this2.drop.contains(event.target)) {
              return;
            }

            // Clicking target
            if (event.target === _this2.target || _this2.target.contains(event.target)) {
              return;
            }

            _this2.close(event);
          };

          for (var i = 0; i < clickEvents.length; ++i) {
            var clickEvent = clickEvents[i];
            this._on(this.target, clickEvent, openHandler);
            this._on(document, clickEvent, closeHandler);
          }
        }

        var inTimeout = null;
        var outTimeout = null;

        var inHandler = function inHandler(event) {
          if (outTimeout !== null) {
            clearTimeout(outTimeout);
          } else {
            inTimeout = setTimeout(function () {
              _this2.open(event);
              inTimeout = null;
            }, (event.type === 'focus' ? _this2.options.focusDelay : _this2.options.hoverOpenDelay) || _this2.options.openDelay);
          }
        };

        var outHandler = function outHandler(event) {
          if (inTimeout !== null) {
            clearTimeout(inTimeout);
          } else {
            outTimeout = setTimeout(function () {
              _this2.close(event);
              outTimeout = null;
            }, (event.type === 'blur' ? _this2.options.blurDelay : _this2.options.hoverCloseDelay) || _this2.options.closeDelay);
          }
        };

        if (events.indexOf('hover') >= 0) {
          this._on(this.target, 'mouseover', inHandler);
          this._on(this.drop, 'mouseover', inHandler);
          this._on(this.target, 'mouseout', outHandler);
          this._on(this.drop, 'mouseout', outHandler);
        }

        if (events.indexOf('focus') >= 0) {
          this._on(this.target, 'focus', inHandler);
          this._on(this.drop, 'focus', inHandler);
          this._on(this.target, 'blur', outHandler);
          this._on(this.drop, 'blur', outHandler);
        }
      }
    }, {
      key: 'isOpened',
      value: function isOpened() {
        if (this.drop) {
          return hasClass(this.drop, drop.classPrefix + '-open');
        }
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        if (this.isOpened()) {
          this.close(event);
        } else {
          this.open(event);
        }
      }
    }, {
      key: 'open',
      value: function open(event) {
        var _this3 = this;

        /* eslint no-unused-vars: 0 */
        if (this.isOpened()) {
          return;
        }

        if (!this.drop.parentNode) {
          document.body.appendChild(this.drop);
        }

        if (typeof this.tether !== 'undefined') {
          this.tether.enable();
        }

        addClass(this.drop, drop.classPrefix + '-open');
        addClass(this.drop, drop.classPrefix + '-open-transitionend');

        setTimeout(function () {
          if (_this3.drop) {
            addClass(_this3.drop, drop.classPrefix + '-after-open');
          }
        });

        if (typeof this.tether !== 'undefined') {
          this.tether.position();
        }

        this.trigger('open');

        drop.updateBodyClasses();
      }
    }, {
      key: '_transitionEndHandler',
      value: function _transitionEndHandler(e) {
        if (e.target !== e.currentTarget) {
          return;
        }

        if (!hasClass(this.drop, drop.classPrefix + '-open')) {
          removeClass(this.drop, drop.classPrefix + '-open-transitionend');
        }
        this.drop.removeEventListener(transitionEndEvent, this.transitionEndHandler);
      }
    }, {
      key: 'beforeCloseHandler',
      value: function beforeCloseHandler(event) {
        var shouldClose = true;

        if (!this.isClosing && typeof this.options.beforeClose === 'function') {
          this.isClosing = true;
          shouldClose = this.options.beforeClose(event, this) !== false;
        }

        this.isClosing = false;

        return shouldClose;
      }
    }, {
      key: 'close',
      value: function close(event) {
        if (!this.isOpened()) {
          return;
        }

        if (!this.beforeCloseHandler(event)) {
          return;
        }

        removeClass(this.drop, drop.classPrefix + '-open');
        removeClass(this.drop, drop.classPrefix + '-after-open');

        this.drop.addEventListener(transitionEndEvent, this.transitionEndHandler);

        this.trigger('close');

        if (typeof this.tether !== 'undefined') {
          this.tether.disable();
        }

        drop.updateBodyClasses();

        if (this.options.remove) {
          this.remove(event);
        }
      }
    }, {
      key: 'remove',
      value: function remove(event) {
        this.close(event);
        if (this.drop.parentNode) {
          this.drop.parentNode.removeChild(this.drop);
        }
      }
    }, {
      key: 'position',
      value: function position() {
        if (this.isOpened() && typeof this.tether !== 'undefined') {
          this.tether.position();
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.remove();

        if (typeof this.tether !== 'undefined') {
          this.tether.destroy();
        }

        for (var i = 0; i < this._boundEvents.length; ++i) {
          var _boundEvents$i = this._boundEvents[i];
          var element = _boundEvents$i.element;
          var _event = _boundEvents$i.event;
          var handler = _boundEvents$i.handler;

          element.removeEventListener(_event, handler);
        }

        this._boundEvents = [];

        this.tether = null;
        this.drop = null;
        this.content = null;
        this.target = null;

        removeFromArray(allDrops[drop.classPrefix], this);
        removeFromArray(drop.drops, this);
      }
    }]);

    return DropInstance;
  })(Evented);

  return drop;
}

var Drop = createContext();

document.addEventListener('DOMContentLoaded', function () {
  Drop.updateBodyClasses();
});
return Drop;

}));

},{"tether":"/Applications/MAMP/htdocs/jutarum/node_modules/tether/dist/js/tether.js"}],"/Applications/MAMP/htdocs/jutarum/node_modules/tether/dist/js/tether.js":[function(require,module,exports){
/*! tether 1.3.6 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(_dereq_, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
// if the element lies within a nested document (<frame> or <iframe>-like).
function getActualBoundingClientRect(node) {
  var boundingRect = node.getBoundingClientRect();

  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = {};
  for (var k in boundingRect) {
    rect[k] = boundingRect[k];
  }

  if (node.ownerDocument !== document) {
    var _frameElement = node.ownerDocument.defaultView.frameElement;
    if (_frameElement) {
      var frameRect = getActualBoundingClientRect(_frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  return rect;
}

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(el.ownerDocument.body);

  // If the node is within a frame, account for the parent window scroll
  if (el.ownerDocument !== document) {
    parents.push(el.ownerDocument.defaultView);
  }

  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = getActualBoundingClientRect(node);

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = getActualBoundingClientRect(el);

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

function getScrollBarSize() {
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  return { width: width, height: width };
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
  // completely separately SVGAnimatedString base classes
  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getActualBoundingClientRect: getActualBoundingClientRect,
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== _this3.target.ownerDocument) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var doc = this.target.ownerDocument;
      var win = doc.defaultView;

      var scrollbarSize = undefined;
      if (win.innerHeight > doc.documentElement.clientHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (win.innerWidth > doc.documentElement.clientWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = doc.body.scrollHeight - top - height;
        next.page.right = doc.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          if (window.matchMedia) {
            // HubSpot/tether#207
            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
            if (!retina) {
              xPos = Math.round(xPos);
              yPos = Math.round(yPos);
            }
          }

          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        var offsetParentIsBody = true;
        var currentNode = this.element.parentNode;
        while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
          if (getComputedStyle(currentNode).position !== 'static') {
            offsetParentIsBody = false;
            break;
          }

          currentNode = currentNode.parentNode;
        }

        if (!offsetParentIsBody) {
          this.element.parentNode.removeChild(this.element);
          this.element.ownerDocument.body.appendChild(this.element);
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
          _this8.trigger('repositioned');
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var node = to;
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      // Account any parent Frames scroll offset
      if (node.ownerDocument !== document) {
        var win = node.ownerDocument.defaultView;
        to[0] += win.pageXOffset;
        to[1] += win.pageYOffset;
        to[2] += win.pageXOffset;
        to[3] += win.pageYOffset;
      }

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));

},{}],"/Applications/MAMP/htdocs/jutarum/tmp/core_object-input_staging-L82zutz2.tmp/browserify_stubs.js":[function(require,module,exports){
define('npm:pdfobject', function(){ return { 'default': require('pdfobject')};})
define('npm:tether-drop', function(){ return { 'default': require('tether-drop')};})
},{"pdfobject":"/Applications/MAMP/htdocs/jutarum/node_modules/pdfobject/pdfobject.js","tether-drop":"/Applications/MAMP/htdocs/jutarum/node_modules/tether-drop/dist/js/drop.js"}]},{},["/Applications/MAMP/htdocs/jutarum/tmp/core_object-input_staging-L82zutz2.tmp/browserify_stubs.js"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcGRmb2JqZWN0L3BkZm9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy90ZXRoZXItZHJvcC9kaXN0L2pzL2Ryb3AuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvdGV0aGVyL2Rpc3QvanMvdGV0aGVyLmpzIiwiYnJvd3NlcmlmeV9zdHVicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxd0RBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypnbG9iYWwgQWN0aXZlWE9iamVjdCwgd2luZG93LCBjb25zb2xlLCBkZWZpbmUsIG1vZHVsZSwgalF1ZXJ5ICovXG4vL2pzaGludCB1bnVzZWQ6ZmFsc2UsIHN0cmljdDogZmFsc2VcblxuLypcbiAgICBQREZPYmplY3QgdjIuMC4yMDE2MDQxNzJcbiAgICBodHRwczovL2dpdGh1Yi5jb20vcGlwd2Vya3MvUERGT2JqZWN0XG4gICAgQ29weXJpZ2h0IChjKSAyMDA4LTIwMTYgUGhpbGlwIEh1dGNoaXNvblxuICAgIE1JVC1zdHlsZSBsaWNlbnNlOiBodHRwOi8vcGlwd2Vya3MubWl0LWxpY2Vuc2Uub3JnL1xuICAgIFVNRCBtb2R1bGUgcGF0dGVybiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvdGVtcGxhdGVzL3JldHVybkV4cG9ydHMuanNcbiovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAgICAvLyBsaWtlIE5vZGUuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgICAgIHJvb3QuUERGT2JqZWN0ID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8vanNoaW50IHVudXNlZDp0cnVlXG5cbiAgICAvL1BERk9iamVjdCBpcyBkZXNpZ25lZCBmb3IgY2xpZW50LXNpZGUgKGJyb3dzZXJzKSwgbm90IHNlcnZlci1zaWRlIChub2RlKVxuICAgIC8vV2lsbCBjaG9rZSBvbiB1bmRlZmluZWQgbmF2aWdhdG9yIGFuZCB3aW5kb3cgdmFycyB3aGVuIHJ1biBvbiBzZXJ2ZXJcbiAgICAvL1JldHVybiBib29sZWFuIGZhbHNlIGFuZCBleGl0IGZ1bmN0aW9uIHdoZW4gcnVubmluZyBzZXJ2ZXItc2lkZVxuXG4gICAgaWYodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgbmF2aWdhdG9yID09PSBcInVuZGVmaW5lZFwiKXsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICB2YXIgcGRmb2JqZWN0dmVyc2lvbiA9IFwiMi4wLjIwMTYwNDE3MlwiLFxuICAgICAgICBzdXBwb3J0c1BERnMsXG5cbiAgICAgICAgLy9kZWNsYXJlIGZ1bmN0aW9uc1xuICAgICAgICBjcmVhdGVBWE8sXG4gICAgICAgIGlzSUUsXG4gICAgICAgIHN1cHBvcnRzUGRmTWltZVR5cGUgPSAodHlwZW9mIG5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3BkZiddICE9PSBcInVuZGVmaW5lZFwiKSxcbiAgICAgICAgc3VwcG9ydHNQZGZBY3RpdmVYLFxuICAgICAgICBidWlsZEZyYWdtZW50U3RyaW5nLFxuICAgICAgICBsb2csXG4gICAgICAgIGVtYmVkRXJyb3IsXG4gICAgICAgIGVtYmVkLFxuICAgICAgICBnZXRUYXJnZXRFbGVtZW50LFxuICAgICAgICBnZW5lcmF0ZVBERkpTaWZyYW1lLFxuICAgICAgICBpc0lPUyA9IChmdW5jdGlvbiAoKXsgcmV0dXJuICgvaXBob25lfGlwYWR8aXBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSk7IH0pKCksXG4gICAgICAgIGdlbmVyYXRlRW1iZWRFbGVtZW50O1xuXG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgU3VwcG9ydGluZyBmdW5jdGlvbnNcbiAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICBjcmVhdGVBWE8gPSBmdW5jdGlvbiAodHlwZSl7XG4gICAgICAgIHZhciBheDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF4ID0gbmV3IEFjdGl2ZVhPYmplY3QodHlwZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF4ID0gbnVsbDsgLy9lbnN1cmUgYXggcmVtYWlucyBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF4O1xuICAgIH07XG5cbiAgICAvL0lFMTEgc3RpbGwgdXNlcyBBY3RpdmVYIGZvciBBZG9iZSBSZWFkZXIsIGJ1dCBJRSAxMSBkb2Vzbid0IGV4cG9zZVxuICAgIC8vd2luZG93LkFjdGl2ZVhPYmplY3QgdGhlIHNhbWUgd2F5IHByZXZpb3VzIHZlcnNpb25zIG9mIElFIGRpZFxuICAgIC8vd2luZG93LkFjdGl2ZVhPYmplY3Qgd2lsbCBldmFsdWF0ZSB0byBmYWxzZSBpbiBJRSAxMSwgYnV0IFwiQWN0aXZlWE9iamVjdFwiIGluIHdpbmRvdyBldmFsdWF0ZXMgdG8gdHJ1ZVxuICAgIC8vc28gY2hlY2sgdGhlIGZpcnN0IG9uZSBmb3Igb2xkZXIgSUUsIGFuZCB0aGUgc2Vjb25kIGZvciBJRTExXG4gICAgLy9GV0lXLCBNUyBFZGdlIChyZXBsYWNpbmcgSUUxMSkgZG9lcyBub3Qgc3VwcG9ydCBBY3RpdmVYIGF0IGFsbCwgYm90aCB3aWxsIGV2YWx1YXRlIGZhbHNlXG4gICAgLy9Db25zdHJ1Y3RlZCBhcyBhIG1ldGhvZCAobm90IGEgcHJvcCkgdG8gYXZvaWQgdW5uZWNjZXNhcnJ5IG92ZXJoZWFkIC0tIHdpbGwgb25seSBiZSBldmFsdWF0ZWQgaWYgbmVlZGVkXG4gICAgaXNJRSA9IGZ1bmN0aW9uICgpeyByZXR1cm4gISEod2luZG93LkFjdGl2ZVhPYmplY3QgfHwgXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93KTsgfTtcblxuICAgIC8vSWYgZWl0aGVyIEFjdGl2ZVggc3VwcG9ydCBmb3IgXCJBY3JvUERGLlBERlwiIG9yIFwiUERGLlBkZkN0cmxcIiBhcmUgZm91bmQsIHJldHVybiB0cnVlXG4gICAgLy9Db25zdHJ1Y3RlZCBhcyBhIG1ldGhvZCAobm90IGEgcHJvcCkgdG8gYXZvaWQgdW5uZWNjZXNhcnJ5IG92ZXJoZWFkIC0tIHdpbGwgb25seSBiZSBldmFsdWF0ZWQgaWYgbmVlZGVkXG4gICAgc3VwcG9ydHNQZGZBY3RpdmVYID0gZnVuY3Rpb24gKCl7IHJldHVybiAhIShjcmVhdGVBWE8oXCJBY3JvUERGLlBERlwiKSB8fCBjcmVhdGVBWE8oXCJQREYuUGRmQ3RybFwiKSk7IH07XG5cbiAgICAvL0RldGVybWluZXMgd2hldGhlciBQREYgc3VwcG9ydCBpcyBhdmFpbGFibGVcbiAgICBzdXBwb3J0c1BERnMgPSAoc3VwcG9ydHNQZGZNaW1lVHlwZSB8fCAoaXNJRSgpICYmIHN1cHBvcnRzUGRmQWN0aXZlWCgpKSk7XG5cbiAgICAvL0NyZWF0ZSBhIGZyYWdtZW50IGlkZW50aWZpZXIgZm9yIHVzaW5nIFBERiBPcGVuIHBhcmFtZXRlcnMgd2hlbiBlbWJlZGRpbmcgUERGXG4gICAgYnVpbGRGcmFnbWVudFN0cmluZyA9IGZ1bmN0aW9uKHBkZlBhcmFtcyl7XG5cbiAgICAgICAgdmFyIHN0cmluZyA9IFwiXCIsXG4gICAgICAgICAgICBwcm9wO1xuXG4gICAgICAgIGlmKHBkZlBhcmFtcyl7XG5cbiAgICAgICAgICAgIGZvciAocHJvcCBpbiBwZGZQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAocGRmUGFyYW1zLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBlbmNvZGVVUklDb21wb25lbnQocHJvcCkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChwZGZQYXJhbXNbcHJvcF0pICsgXCImXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1RoZSBzdHJpbmcgd2lsbCBiZSBlbXB0eSBpZiBubyBQREYgUGFyYW1zIGZvdW5kXG4gICAgICAgICAgICBpZihzdHJpbmcpe1xuXG4gICAgICAgICAgICAgICAgc3RyaW5nID0gXCIjXCIgKyBzdHJpbmc7XG5cbiAgICAgICAgICAgICAgICAvL1JlbW92ZSBsYXN0IGFtcGVyc2FuZFxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZSgwLCBzdHJpbmcubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cmluZztcblxuICAgIH07XG5cbiAgICBsb2cgPSBmdW5jdGlvbiAobXNnKXtcbiAgICAgICAgaWYodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5sb2cpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbUERGT2JqZWN0XSBcIiArIG1zZyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1iZWRFcnJvciA9IGZ1bmN0aW9uIChtc2cpe1xuICAgICAgICBsb2cobXNnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBnZXRUYXJnZXRFbGVtZW50ID0gZnVuY3Rpb24gKHRhcmdldFNlbGVjdG9yKXtcblxuICAgICAgICAvL0RlZmF1bHQgdG8gYm9keSBmb3IgZnVsbC1icm93c2VyIFBERlxuICAgICAgICB2YXIgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgLy9JZiBhIHRhcmdldFNlbGVjdG9yIGlzIHNwZWNpZmllZCwgY2hlY2sgdG8gc2VlIHdoZXRoZXJcbiAgICAgICAgLy9pdCdzIHBhc3NpbmcgYSBzZWxlY3RvciwgalF1ZXJ5IG9iamVjdCwgb3IgYW4gSFRNTCBlbGVtZW50XG5cbiAgICAgICAgaWYodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSBcInN0cmluZ1wiKXtcblxuICAgICAgICAgICAgLy9JcyBDU1Mgc2VsZWN0b3JcbiAgICAgICAgICAgIHRhcmdldE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgdGFyZ2V0U2VsZWN0b3IgaW5zdGFuY2VvZiBqUXVlcnkgJiYgdGFyZ2V0U2VsZWN0b3IubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIC8vSXMgalF1ZXJ5IGVsZW1lbnQuIEV4dHJhY3QgSFRNTCBub2RlXG4gICAgICAgICAgICB0YXJnZXROb2RlID0gdGFyZ2V0U2VsZWN0b3IuZ2V0KDApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRhcmdldFNlbGVjdG9yLm5vZGVUeXBlICE9PSBcInVuZGVmaW5lZFwiICYmIHRhcmdldFNlbGVjdG9yLm5vZGVUeXBlID09PSAxKXtcblxuICAgICAgICAgICAgLy9JcyBIVE1MIGVsZW1lbnRcbiAgICAgICAgICAgIHRhcmdldE5vZGUgPSB0YXJnZXRTZWxlY3RvcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldE5vZGU7XG5cbiAgICB9O1xuXG4gICAgZ2VuZXJhdGVQREZKU2lmcmFtZSA9IGZ1bmN0aW9uICh0YXJnZXROb2RlLCB1cmwsIHBkZk9wZW5GcmFnbWVudCwgUERGSlNfVVJMLCBpZCl7XG5cbiAgICAgICAgdmFyIGZ1bGxVUkwgPSBQREZKU19VUkwgKyBcIj9maWxlPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkgKyBwZGZPcGVuRnJhZ21lbnQ7XG4gICAgICAgIHZhciBzY3JvbGxmaXggPSAoaXNJT1MpID8gXCItd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7IG92ZXJmbG93LXk6IHNjcm9sbDsgXCIgOiBcIm92ZXJmbG93OiBoaWRkZW47IFwiO1xuICAgICAgICB2YXIgaWZyYW1lID0gXCI8ZGl2IHN0eWxlPSdcIiArIHNjcm9sbGZpeCArIFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyBib3R0b206IDA7IGxlZnQ6IDA7Jz48aWZyYW1lICBcIiArIGlkICsgXCIgc3JjPSdcIiArIGZ1bGxVUkwgKyBcIicgc3R5bGU9J2JvcmRlcjogbm9uZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsnIGZyYW1lYm9yZGVyPScwJz48L2lmcmFtZT48L2Rpdj5cIjtcbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc05hbWUgKz0gXCIgcGRmb2JqZWN0LWNvbnRhaW5lclwiO1xuICAgICAgICB0YXJnZXROb2RlLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICB0YXJnZXROb2RlLnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICAgIHRhcmdldE5vZGUuaW5uZXJIVE1MID0gaWZyYW1lO1xuICAgICAgICByZXR1cm4gdGFyZ2V0Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlmcmFtZVwiKVswXTtcblxuICAgIH07XG5cbiAgICBnZW5lcmF0ZUVtYmVkRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXROb2RlLCB0YXJnZXRTZWxlY3RvciwgdXJsLCBwZGZPcGVuRnJhZ21lbnQsIHdpZHRoLCBoZWlnaHQsIGlkKXtcblxuICAgICAgICB2YXIgc3R5bGUgPSBcIlwiO1xuXG4gICAgICAgIGlmKHRhcmdldFNlbGVjdG9yICYmIHRhcmdldFNlbGVjdG9yICE9PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgICAgICAgIHN0eWxlID0gXCJ3aWR0aDogXCIgKyB3aWR0aCArIFwiOyBoZWlnaHQ6IFwiICsgaGVpZ2h0ICsgXCI7XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZSA9IFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyBib3R0b206IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXROb2RlLmNsYXNzTmFtZSArPSBcIiBwZGZvYmplY3QtY29udGFpbmVyXCI7XG4gICAgICAgIHRhcmdldE5vZGUuaW5uZXJIVE1MID0gXCI8ZW1iZWQgXCIgKyBpZCArIFwiIGNsYXNzPSdwZGZvYmplY3QnIHNyYz0nXCIgKyB1cmwgKyBwZGZPcGVuRnJhZ21lbnQgKyBcIicgdHlwZT0nYXBwbGljYXRpb24vcGRmJyBzdHlsZT0nb3ZlcmZsb3c6IGF1dG87IFwiICsgc3R5bGUgKyBcIicvPlwiO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZW1iZWRcIilbMF07XG5cbiAgICB9O1xuXG4gICAgZW1iZWQgPSBmdW5jdGlvbih1cmwsIHRhcmdldFNlbGVjdG9yLCBvcHRpb25zKXtcblxuICAgICAgICAvL0Vuc3VyZSBVUkwgaXMgYXZhaWxhYmxlLiBJZiBub3QsIGV4aXQgbm93LlxuICAgICAgICBpZih0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiKXsgcmV0dXJuIGVtYmVkRXJyb3IoXCJVUkwgaXMgbm90IHZhbGlkXCIpOyB9XG5cbiAgICAgICAgLy9JZiB0YXJnZXRTZWxlY3RvciBpcyBub3QgZGVmaW5lZCwgY29udmVydCB0byBib29sZWFuXG4gICAgICAgIHRhcmdldFNlbGVjdG9yID0gKHR5cGVvZiB0YXJnZXRTZWxlY3RvciAhPT0gXCJ1bmRlZmluZWRcIikgPyB0YXJnZXRTZWxlY3RvciA6IGZhbHNlO1xuXG4gICAgICAgIC8vRW5zdXJlIG9wdGlvbnMgb2JqZWN0IGlzIG5vdCB1bmRlZmluZWQgLS0gZW5hYmxlcyBlYXNpZXIgZXJyb3IgY2hlY2tpbmcgYmVsb3dcbiAgICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJ1bmRlZmluZWRcIikgPyBvcHRpb25zIDoge307XG5cbiAgICAgICAgLy9HZXQgcGFzc2VkIG9wdGlvbnMsIG9yIHNldCByZWFzb25hYmxlIGRlZmF1bHRzXG4gICAgICAgIHZhciBpZCA9IChvcHRpb25zLmlkICYmIHR5cGVvZiBvcHRpb25zLmlkID09PSBcInN0cmluZ1wiKSA/IFwiaWQ9J1wiICsgb3B0aW9ucy5pZCArIFwiJ1wiIDogXCJcIixcbiAgICAgICAgICAgIHBhZ2UgPSAob3B0aW9ucy5wYWdlKSA/IG9wdGlvbnMucGFnZSA6IGZhbHNlLFxuICAgICAgICAgICAgcGRmT3BlblBhcmFtcyA9IChvcHRpb25zLnBkZk9wZW5QYXJhbXMpID8gb3B0aW9ucy5wZGZPcGVuUGFyYW1zIDoge30sXG4gICAgICAgICAgICBmYWxsYmFja0xpbmsgPSAodHlwZW9mIG9wdGlvbnMuZmFsbGJhY2tMaW5rICE9PSBcInVuZGVmaW5lZFwiKSA/IG9wdGlvbnMuZmFsbGJhY2tMaW5rIDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoID0gKG9wdGlvbnMud2lkdGgpID8gb3B0aW9ucy53aWR0aCA6IFwiMTAwJVwiLFxuICAgICAgICAgICAgaGVpZ2h0ID0gKG9wdGlvbnMuaGVpZ2h0KSA/IG9wdGlvbnMuaGVpZ2h0IDogXCIxMDAlXCIsXG4gICAgICAgICAgICBmb3JjZVBERkpTID0gKHR5cGVvZiBvcHRpb25zLmZvcmNlUERGSlMgPT09IFwiYm9vbGVhblwiKSA/IG9wdGlvbnMuZm9yY2VQREZKUyA6IGZhbHNlLFxuICAgICAgICAgICAgUERGSlNfVVJMID0gKG9wdGlvbnMuUERGSlNfVVJMKSA/IG9wdGlvbnMuUERGSlNfVVJMIDogZmFsc2UsXG4gICAgICAgICAgICB0YXJnZXROb2RlID0gZ2V0VGFyZ2V0RWxlbWVudCh0YXJnZXRTZWxlY3RvciksXG4gICAgICAgICAgICBmYWxsYmFja0hUTUwgPSBcIlwiLFxuICAgICAgICAgICAgcGRmT3BlbkZyYWdtZW50ID0gXCJcIixcbiAgICAgICAgICAgIGZhbGxiYWNrSFRNTF9kZWZhdWx0ID0gXCI8cD5UaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBpbmxpbmUgUERGcy4gUGxlYXNlIGRvd25sb2FkIHRoZSBQREYgdG8gdmlldyBpdDogPGEgaHJlZj0nW3VybF0nPkRvd25sb2FkIFBERjwvYT48L3A+XCI7XG5cbiAgICAgICAgLy9JZiB0YXJnZXQgZWxlbWVudCBpcyBzcGVjaWZpZWQgYnV0IGlzIG5vdCB2YWxpZCwgZXhpdCB3aXRob3V0IGRvaW5nIGFueXRoaW5nXG4gICAgICAgIGlmKCF0YXJnZXROb2RlKXsgcmV0dXJuIGVtYmVkRXJyb3IoXCJUYXJnZXQgZWxlbWVudCBjYW5ub3QgYmUgZGV0ZXJtaW5lZFwiKTsgfVxuXG5cbiAgICAgICAgLy9wYWdlIG9wdGlvbiBvdmVycmlkZXMgcGRmT3BlblBhcmFtcywgaWYgZm91bmRcbiAgICAgICAgaWYocGFnZSl7XG4gICAgICAgICAgICBwZGZPcGVuUGFyYW1zLnBhZ2UgPSBwYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9TdHJpbmdpZnkgb3B0aW9uYWwgQWRvYmUgcGFyYW1zIGZvciBvcGVuaW5nIGRvY3VtZW50IChhcyBmcmFnbWVudCBpZGVudGlmaWVyKVxuICAgICAgICBwZGZPcGVuRnJhZ21lbnQgPSBidWlsZEZyYWdtZW50U3RyaW5nKHBkZk9wZW5QYXJhbXMpO1xuXG4gICAgICAgIC8vRG8gdGhlIGRhbmNlXG4gICAgICAgIGlmKGZvcmNlUERGSlMgJiYgUERGSlNfVVJMKXtcblxuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlUERGSlNpZnJhbWUodGFyZ2V0Tm9kZSwgdXJsLCBwZGZPcGVuRnJhZ21lbnQsIFBERkpTX1VSTCwgaWQpO1xuXG4gICAgICAgIH0gZWxzZSBpZihzdXBwb3J0c1BERnMpe1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVFbWJlZEVsZW1lbnQodGFyZ2V0Tm9kZSwgdGFyZ2V0U2VsZWN0b3IsIHVybCwgcGRmT3BlbkZyYWdtZW50LCB3aWR0aCwgaGVpZ2h0LCBpZCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYoUERGSlNfVVJMKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVBERkpTaWZyYW1lKHRhcmdldE5vZGUsIHVybCwgcGRmT3BlbkZyYWdtZW50LCBQREZKU19VUkwsIGlkKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKGZhbGxiYWNrTGluayl7XG5cbiAgICAgICAgICAgICAgICBmYWxsYmFja0hUTUwgPSAodHlwZW9mIGZhbGxiYWNrTGluayA9PT0gXCJzdHJpbmdcIikgPyBmYWxsYmFja0xpbmsgOiBmYWxsYmFja0hUTUxfZGVmYXVsdDtcbiAgICAgICAgICAgICAgICB0YXJnZXROb2RlLmlubmVySFRNTCA9IGZhbGxiYWNrSFRNTC5yZXBsYWNlKC9cXFt1cmxcXF0vZywgdXJsKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZW1iZWRFcnJvcihcIlRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGVtYmVkZGVkIFBERnNcIik7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGVtYmVkOiBmdW5jdGlvbiAoYSxiLGMpeyByZXR1cm4gZW1iZWQoYSxiLGMpOyB9LFxuICAgICAgICBwZGZvYmplY3R2ZXJzaW9uOiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gcGRmb2JqZWN0dmVyc2lvbjsgfSkoKSxcbiAgICAgICAgc3VwcG9ydHNQREZzOiAoZnVuY3Rpb24gKCl7IHJldHVybiBzdXBwb3J0c1BERnM7IH0pKClcbiAgICB9O1xuXG59KSk7IiwiLyohIHRldGhlci1kcm9wIDEuNC4xICovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW1widGV0aGVyXCJdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgndGV0aGVyJykpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuRHJvcCA9IGZhY3Rvcnkocm9vdC5UZXRoZXIpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uKFRldGhlcikge1xuXG4vKiBnbG9iYWwgVGV0aGVyICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlJyk7IH0gfTsgfSkoKTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gyLCBfeDMsIF94NCkgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeDIsIHByb3BlcnR5ID0gX3gzLCByZWNlaXZlciA9IF94NDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeDIgPSBwYXJlbnQ7IF94MyA9IHByb3BlcnR5OyBfeDQgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9UZXRoZXIkVXRpbHMgPSBUZXRoZXIuVXRpbHM7XG52YXIgZXh0ZW5kID0gX1RldGhlciRVdGlscy5leHRlbmQ7XG52YXIgYWRkQ2xhc3MgPSBfVGV0aGVyJFV0aWxzLmFkZENsYXNzO1xudmFyIHJlbW92ZUNsYXNzID0gX1RldGhlciRVdGlscy5yZW1vdmVDbGFzcztcbnZhciBoYXNDbGFzcyA9IF9UZXRoZXIkVXRpbHMuaGFzQ2xhc3M7XG52YXIgRXZlbnRlZCA9IF9UZXRoZXIkVXRpbHMuRXZlbnRlZDtcblxuZnVuY3Rpb24gc29ydEF0dGFjaChzdHIpIHtcbiAgdmFyIF9zdHIkc3BsaXQgPSBzdHIuc3BsaXQoJyAnKTtcblxuICB2YXIgX3N0ciRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfc3RyJHNwbGl0LCAyKTtcblxuICB2YXIgZmlyc3QgPSBfc3RyJHNwbGl0MlswXTtcbiAgdmFyIHNlY29uZCA9IF9zdHIkc3BsaXQyWzFdO1xuXG4gIGlmIChbJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKGZpcnN0KSA+PSAwKSB7XG4gICAgdmFyIF9yZWYgPSBbc2Vjb25kLCBmaXJzdF07XG4gICAgZmlyc3QgPSBfcmVmWzBdO1xuICAgIHNlY29uZCA9IF9yZWZbMV07XG4gIH1cbiAgcmV0dXJuIFtmaXJzdCwgc2Vjb25kXS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUZyb21BcnJheShhcnIsIGl0ZW0pIHtcbiAgdmFyIGluZGV4ID0gdW5kZWZpbmVkO1xuICB2YXIgcmVzdWx0cyA9IFtdO1xuICB3aGlsZSAoKGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSkpICE9PSAtMSkge1xuICAgIHJlc3VsdHMucHVzaChhcnIuc3BsaWNlKGluZGV4LCAxKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbnZhciBjbGlja0V2ZW50cyA9IFsnY2xpY2snXTtcbmlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgY2xpY2tFdmVudHMucHVzaCgndG91Y2hzdGFydCcpO1xufVxuXG52YXIgdHJhbnNpdGlvbkVuZEV2ZW50cyA9IHtcbiAgJ1dlYmtpdFRyYW5zaXRpb24nOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICdNb3pUcmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxuICAnT1RyYW5zaXRpb24nOiAnb3RyYW5zaXRpb25lbmQnLFxuICAndHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJ1xufTtcblxudmFyIHRyYW5zaXRpb25FbmRFdmVudCA9ICcnO1xuZm9yICh2YXIgX25hbWUgaW4gdHJhbnNpdGlvbkVuZEV2ZW50cykge1xuICBpZiAoKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRyYW5zaXRpb25FbmRFdmVudHMsIF9uYW1lKSkge1xuICAgIHZhciB0ZW1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgaWYgKHR5cGVvZiB0ZW1wRWwuc3R5bGVbX25hbWVdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdHJhbnNpdGlvbkVuZEV2ZW50ID0gdHJhbnNpdGlvbkVuZEV2ZW50c1tfbmFtZV07XG4gICAgfVxuICB9XG59XG5cbnZhciBNSVJST1JfQVRUQUNIID0ge1xuICBsZWZ0OiAncmlnaHQnLFxuICByaWdodDogJ2xlZnQnLFxuICB0b3A6ICdib3R0b20nLFxuICBib3R0b206ICd0b3AnLFxuICBtaWRkbGU6ICdtaWRkbGUnLFxuICBjZW50ZXI6ICdjZW50ZXInXG59O1xuXG52YXIgYWxsRHJvcHMgPSB7fTtcblxuLy8gRHJvcCBjYW4gYmUgaW5jbHVkZWQgaW4gZXh0ZXJuYWwgbGlicmFyaWVzLiAgQ2FsbGluZyBjcmVhdGVDb250ZXh0IGdpdmVzIHlvdSBhIGZyZXNoXG4vLyBjb3B5IG9mIGRyb3Agd2hpY2ggd29uJ3QgaW50ZXJhY3Qgd2l0aCBvdGhlciBjb3BpZXMgb24gdGhlIHBhZ2UgKGJleW9uZCBjYWxsaW5nIHRoZSBkb2N1bWVudCBldmVudHMpLlxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gIHZhciBkcm9wID0gZnVuY3Rpb24gZHJvcCgpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IChfYmluZC5hcHBseShEcm9wSW5zdGFuY2UsIFtudWxsXS5jb25jYXQoYXJncykpKSgpO1xuICB9O1xuXG4gIGV4dGVuZChkcm9wLCB7XG4gICAgY3JlYXRlQ29udGV4dDogY3JlYXRlQ29udGV4dCxcbiAgICBkcm9wczogW10sXG4gICAgZGVmYXVsdHM6IHt9XG4gIH0pO1xuXG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBjbGFzc1ByZWZpeDogJ2Ryb3AnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbSBsZWZ0JyxcbiAgICAgIG9wZW5PbjogJ2NsaWNrJyxcbiAgICAgIGJlZm9yZUNsb3NlOiBudWxsLFxuICAgICAgY29uc3RyYWluVG9TY3JvbGxQYXJlbnQ6IHRydWUsXG4gICAgICBjb25zdHJhaW5Ub1dpbmRvdzogdHJ1ZSxcbiAgICAgIGNsYXNzZXM6ICcnLFxuICAgICAgcmVtb3ZlOiBmYWxzZSxcbiAgICAgIG9wZW5EZWxheTogMCxcbiAgICAgIGNsb3NlRGVsYXk6IDUwLFxuICAgICAgLy8gaW5oZXJpdGVkIGZyb20gb3BlbkRlbGF5IGFuZCBjbG9zZURlbGF5IGlmIG5vdCBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgIGZvY3VzRGVsYXk6IG51bGwsXG4gICAgICBibHVyRGVsYXk6IG51bGwsXG4gICAgICBob3Zlck9wZW5EZWxheTogbnVsbCxcbiAgICAgIGhvdmVyQ2xvc2VEZWxheTogbnVsbCxcbiAgICAgIHRldGhlck9wdGlvbnM6IHt9XG4gICAgfVxuICB9O1xuXG4gIGV4dGVuZChkcm9wLCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gIGV4dGVuZChkcm9wLmRlZmF1bHRzLCBkZWZhdWx0T3B0aW9ucy5kZWZhdWx0cywgb3B0aW9ucy5kZWZhdWx0cyk7XG5cbiAgaWYgKHR5cGVvZiBhbGxEcm9wc1tkcm9wLmNsYXNzUHJlZml4XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBhbGxEcm9wc1tkcm9wLmNsYXNzUHJlZml4XSA9IFtdO1xuICB9XG5cbiAgZHJvcC51cGRhdGVCb2R5Q2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUaGVyZSBpcyBvbmx5IG9uZSBib2R5LCBzbyBkZXNwaXRlIHRoZSBjb250ZXh0IGNvbmNlcHQsIHdlIHN0aWxsIGl0ZXJhdGUgdGhyb3VnaCBhbGxcbiAgICAvLyBkcm9wcyB3aGljaCBzaGFyZSBvdXIgY2xhc3NQcmVmaXguXG5cbiAgICB2YXIgYW55T3BlbiA9IGZhbHNlO1xuICAgIHZhciBkcm9wcyA9IGFsbERyb3BzW2Ryb3AuY2xhc3NQcmVmaXhdO1xuICAgIHZhciBsZW4gPSBkcm9wcy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgaWYgKGRyb3BzW2ldLmlzT3BlbmVkKCkpIHtcbiAgICAgICAgYW55T3BlbiA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhbnlPcGVuKSB7XG4gICAgICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBkcm9wLmNsYXNzUHJlZml4ICsgJy1vcGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIGRyb3AuY2xhc3NQcmVmaXggKyAnLW9wZW4nKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIERyb3BJbnN0YW5jZSA9IChmdW5jdGlvbiAoX0V2ZW50ZWQpIHtcbiAgICBfaW5oZXJpdHMoRHJvcEluc3RhbmNlLCBfRXZlbnRlZCk7XG5cbiAgICBmdW5jdGlvbiBEcm9wSW5zdGFuY2Uob3B0cykge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERyb3BJbnN0YW5jZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BJbnN0YW5jZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKHt9LCBkcm9wLmRlZmF1bHRzLCBvcHRzKTtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5vcHRpb25zLnRhcmdldDtcblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEcm9wIEVycm9yOiBZb3UgbXVzdCBwcm92aWRlIGEgdGFyZ2V0LicpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0YVByZWZpeCA9ICdkYXRhLScgKyBkcm9wLmNsYXNzUHJlZml4O1xuXG4gICAgICB2YXIgY29udGVudEF0dHIgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoZGF0YVByZWZpeCk7XG4gICAgICBpZiAoY29udGVudEF0dHIgJiYgdGhpcy5vcHRpb25zLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGVudCA9IGNvbnRlbnRBdHRyO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXR0cnNPdmVycmlkZSA9IFsncG9zaXRpb24nLCAnb3Blbk9uJ107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJzT3ZlcnJpZGUubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICB2YXIgb3ZlcnJpZGUgPSB0aGlzLnRhcmdldC5nZXRBdHRyaWJ1dGUoZGF0YVByZWZpeCArICctJyArIGF0dHJzT3ZlcnJpZGVbaV0pO1xuICAgICAgICBpZiAob3ZlcnJpZGUgJiYgdGhpcy5vcHRpb25zW2F0dHJzT3ZlcnJpZGVbaV1dID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnNbYXR0cnNPdmVycmlkZVtpXV0gPSBvdmVycmlkZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNsYXNzZXMgJiYgdGhpcy5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgIT09IGZhbHNlKSB7XG4gICAgICAgIGFkZENsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLm9wdGlvbnMuY2xhc3Nlcyk7XG4gICAgICB9XG5cbiAgICAgIGRyb3AuZHJvcHMucHVzaCh0aGlzKTtcbiAgICAgIGFsbERyb3BzW2Ryb3AuY2xhc3NQcmVmaXhdLnB1c2godGhpcyk7XG5cbiAgICAgIHRoaXMuX2JvdW5kRXZlbnRzID0gW107XG4gICAgICB0aGlzLmJpbmRNZXRob2RzKCk7XG4gICAgICB0aGlzLnNldHVwRWxlbWVudHMoKTtcbiAgICAgIHRoaXMuc2V0dXBFdmVudHMoKTtcbiAgICAgIHRoaXMuc2V0dXBUZXRoZXIoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRHJvcEluc3RhbmNlLCBbe1xuICAgICAga2V5OiAnX29uJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBfb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fYm91bmRFdmVudHMucHVzaCh7IGVsZW1lbnQ6IGVsZW1lbnQsIGV2ZW50OiBldmVudCwgaGFuZGxlcjogaGFuZGxlciB9KTtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdiaW5kTWV0aG9kcycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYmluZE1ldGhvZHMoKSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXIgPSB0aGlzLl90cmFuc2l0aW9uRW5kSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3NldHVwRWxlbWVudHMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldHVwRWxlbWVudHMoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5kcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZENsYXNzKHRoaXMuZHJvcCwgZHJvcC5jbGFzc1ByZWZpeCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbGFzc2VzKSB7XG4gICAgICAgICAgYWRkQ2xhc3ModGhpcy5kcm9wLCB0aGlzLm9wdGlvbnMuY2xhc3Nlcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy5jb250ZW50LCBkcm9wLmNsYXNzUHJlZml4ICsgJy1jb250ZW50Jyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuY29udGVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBnZW5lcmF0ZUFuZFNldENvbnRlbnQgPSBmdW5jdGlvbiBnZW5lcmF0ZUFuZFNldENvbnRlbnQoKSB7XG4gICAgICAgICAgICAvLyBjb250ZW50IGZ1bmN0aW9uIG1pZ2h0IHJldHVybiBhIHN0cmluZyBvciBhbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgY29udGVudEVsZW1lbnRPckhUTUwgPSBfdGhpcy5vcHRpb25zLmNvbnRlbnQuY2FsbChfdGhpcywgX3RoaXMpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnRFbGVtZW50T3JIVE1MID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBfdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGNvbnRlbnRFbGVtZW50T3JIVE1MO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGVudEVsZW1lbnRPckhUTUwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgIF90aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgIF90aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnRPckhUTUwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEcm9wIEVycm9yOiBDb250ZW50IGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBzdHJpbmcgb3IgSFRNTEVsZW1lbnQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGdlbmVyYXRlQW5kU2V0Q29udGVudCgpO1xuICAgICAgICAgIHRoaXMub24oJ29wZW4nLCBnZW5lcmF0ZUFuZFNldENvbnRlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jb250ZW50ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLm9wdGlvbnMuY29udGVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHRoaXMub3B0aW9ucy5jb250ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcm9wLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc2V0dXBUZXRoZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldHVwVGV0aGVyKCkge1xuICAgICAgICAvLyBUZXRoZXIgZXhwZWN0cyB0d28gYXR0YWNobWVudCBwb2ludHMsIG9uZSBpbiB0aGUgdGFyZ2V0IGVsZW1lbnQsIG9uZSBpbiB0aGVcbiAgICAgICAgLy8gZHJvcC4gIFdlIHVzZSBhIHNpbmdsZSBvbmUsIGFuZCB1c2UgdGhlIG9yZGVyIGFzIHdlbGwsIHRvIGFsbG93IHVzIHRvIHB1dFxuICAgICAgICAvLyB0aGUgZHJvcCBvbiBlaXRoZXIgc2lkZSBvZiBhbnkgb2YgdGhlIGZvdXIgY29ybmVycy4gIFRoaXMgbWFnaWMgY29udmVydHMgYmV0d2VlblxuICAgICAgICAvLyB0aGUgdHdvOlxuICAgICAgICB2YXIgZHJvcEF0dGFjaCA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbi5zcGxpdCgnICcpO1xuICAgICAgICBkcm9wQXR0YWNoWzBdID0gTUlSUk9SX0FUVEFDSFtkcm9wQXR0YWNoWzBdXTtcbiAgICAgICAgZHJvcEF0dGFjaCA9IGRyb3BBdHRhY2guam9pbignICcpO1xuXG4gICAgICAgIHZhciBjb25zdHJhaW50cyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnN0cmFpblRvU2Nyb2xsUGFyZW50KSB7XG4gICAgICAgICAgY29uc3RyYWludHMucHVzaCh7XG4gICAgICAgICAgICB0bzogJ3Njcm9sbFBhcmVudCcsXG4gICAgICAgICAgICBwaW46ICd0b3AsIGJvdHRvbScsXG4gICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXIgbm9uZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUbyBnZXQgJ291dCBvZiBib3VuZHMnIGNsYXNzZXNcbiAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKHtcbiAgICAgICAgICAgIHRvOiAnc2Nyb2xsUGFyZW50J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb25zdHJhaW5Ub1dpbmRvdyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKHtcbiAgICAgICAgICAgIHRvOiAnd2luZG93JyxcbiAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b2dldGhlcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUbyBnZXQgJ291dCBvZiBib3VuZHMnIGNsYXNzZXNcbiAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKHtcbiAgICAgICAgICAgIHRvOiAnd2luZG93J1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9wdHMgPSB7XG4gICAgICAgICAgZWxlbWVudDogdGhpcy5kcm9wLFxuICAgICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXG4gICAgICAgICAgYXR0YWNobWVudDogc29ydEF0dGFjaChkcm9wQXR0YWNoKSxcbiAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiBzb3J0QXR0YWNoKHRoaXMub3B0aW9ucy5wb3NpdGlvbiksXG4gICAgICAgICAgY2xhc3NQcmVmaXg6IGRyb3AuY2xhc3NQcmVmaXgsXG4gICAgICAgICAgb2Zmc2V0OiAnMCAwJyxcbiAgICAgICAgICB0YXJnZXRPZmZzZXQ6ICcwIDAnLFxuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGNvbnN0cmFpbnRzOiBjb25zdHJhaW50cyxcbiAgICAgICAgICBhZGRUYXJnZXRDbGFzc2VzOiB0aGlzLm9wdGlvbnMuYWRkVGFyZ2V0Q2xhc3Nlc1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudGV0aGVyT3B0aW9ucyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnRldGhlciA9IG5ldyBUZXRoZXIoZXh0ZW5kKHt9LCBvcHRzLCB0aGlzLm9wdGlvbnMudGV0aGVyT3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnc2V0dXBFdmVudHMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldHVwRXZlbnRzKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5vcGVuT24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm9wZW5PbiA9PT0gJ2Fsd2F5cycpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub3Blbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5vcHRpb25zLm9wZW5Pbi5zcGxpdCgnICcpO1xuXG4gICAgICAgIGlmIChldmVudHMuaW5kZXhPZignY2xpY2snKSA+PSAwKSB7XG4gICAgICAgICAgdmFyIG9wZW5IYW5kbGVyID0gZnVuY3Rpb24gb3BlbkhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgICAgIF90aGlzMi50b2dnbGUoZXZlbnQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGNsb3NlSGFuZGxlciA9IGZ1bmN0aW9uIGNsb3NlSGFuZGxlcihldmVudCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpczIuaXNPcGVuZWQoKSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENsaWNraW5nIGluc2lkZSBkcm9wZG93blxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gX3RoaXMyLmRyb3AgfHwgX3RoaXMyLmRyb3AuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENsaWNraW5nIHRhcmdldFxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gX3RoaXMyLnRhcmdldCB8fCBfdGhpczIudGFyZ2V0LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfdGhpczIuY2xvc2UoZXZlbnQpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsaWNrRXZlbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGNsaWNrRXZlbnRzW2ldO1xuICAgICAgICAgICAgdGhpcy5fb24odGhpcy50YXJnZXQsIGNsaWNrRXZlbnQsIG9wZW5IYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuX29uKGRvY3VtZW50LCBjbGlja0V2ZW50LCBjbG9zZUhhbmRsZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpblRpbWVvdXQgPSBudWxsO1xuICAgICAgICB2YXIgb3V0VGltZW91dCA9IG51bGw7XG5cbiAgICAgICAgdmFyIGluSGFuZGxlciA9IGZ1bmN0aW9uIGluSGFuZGxlcihldmVudCkge1xuICAgICAgICAgIGlmIChvdXRUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQob3V0VGltZW91dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBfdGhpczIub3BlbihldmVudCk7XG4gICAgICAgICAgICAgIGluVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICB9LCAoZXZlbnQudHlwZSA9PT0gJ2ZvY3VzJyA/IF90aGlzMi5vcHRpb25zLmZvY3VzRGVsYXkgOiBfdGhpczIub3B0aW9ucy5ob3Zlck9wZW5EZWxheSkgfHwgX3RoaXMyLm9wdGlvbnMub3BlbkRlbGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG91dEhhbmRsZXIgPSBmdW5jdGlvbiBvdXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGluVGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGluVGltZW91dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgX3RoaXMyLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgICAgICAgb3V0VGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICB9LCAoZXZlbnQudHlwZSA9PT0gJ2JsdXInID8gX3RoaXMyLm9wdGlvbnMuYmx1ckRlbGF5IDogX3RoaXMyLm9wdGlvbnMuaG92ZXJDbG9zZURlbGF5KSB8fCBfdGhpczIub3B0aW9ucy5jbG9zZURlbGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5pbmRleE9mKCdob3ZlcicpID49IDApIHtcbiAgICAgICAgICB0aGlzLl9vbih0aGlzLnRhcmdldCwgJ21vdXNlb3ZlcicsIGluSGFuZGxlcik7XG4gICAgICAgICAgdGhpcy5fb24odGhpcy5kcm9wLCAnbW91c2VvdmVyJywgaW5IYW5kbGVyKTtcbiAgICAgICAgICB0aGlzLl9vbih0aGlzLnRhcmdldCwgJ21vdXNlb3V0Jywgb3V0SGFuZGxlcik7XG4gICAgICAgICAgdGhpcy5fb24odGhpcy5kcm9wLCAnbW91c2VvdXQnLCBvdXRIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMuaW5kZXhPZignZm9jdXMnKSA+PSAwKSB7XG4gICAgICAgICAgdGhpcy5fb24odGhpcy50YXJnZXQsICdmb2N1cycsIGluSGFuZGxlcik7XG4gICAgICAgICAgdGhpcy5fb24odGhpcy5kcm9wLCAnZm9jdXMnLCBpbkhhbmRsZXIpO1xuICAgICAgICAgIHRoaXMuX29uKHRoaXMudGFyZ2V0LCAnYmx1cicsIG91dEhhbmRsZXIpO1xuICAgICAgICAgIHRoaXMuX29uKHRoaXMuZHJvcCwgJ2JsdXInLCBvdXRIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2lzT3BlbmVkJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpc09wZW5lZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcCkge1xuICAgICAgICAgIHJldHVybiBoYXNDbGFzcyh0aGlzLmRyb3AsIGRyb3AuY2xhc3NQcmVmaXggKyAnLW9wZW4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3RvZ2dsZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3BlbmVkKCkpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9wZW4oZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb3BlbicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb3BlbihldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IDAgKi9cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kcm9wLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZHJvcCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMudGV0aGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXMudGV0aGVyLmVuYWJsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2xhc3ModGhpcy5kcm9wLCBkcm9wLmNsYXNzUHJlZml4ICsgJy1vcGVuJyk7XG4gICAgICAgIGFkZENsYXNzKHRoaXMuZHJvcCwgZHJvcC5jbGFzc1ByZWZpeCArICctb3Blbi10cmFuc2l0aW9uZW5kJyk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzMy5kcm9wKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyhfdGhpczMuZHJvcCwgZHJvcC5jbGFzc1ByZWZpeCArICctYWZ0ZXItb3BlbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnRldGhlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdvcGVuJyk7XG5cbiAgICAgICAgZHJvcC51cGRhdGVCb2R5Q2xhc3NlcygpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ190cmFuc2l0aW9uRW5kSGFuZGxlcicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gX3RyYW5zaXRpb25FbmRIYW5kbGVyKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0NsYXNzKHRoaXMuZHJvcCwgZHJvcC5jbGFzc1ByZWZpeCArICctb3BlbicpKSB7XG4gICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5kcm9wLCBkcm9wLmNsYXNzUHJlZml4ICsgJy1vcGVuLXRyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyb3AucmVtb3ZlRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kRXZlbnQsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXIpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2JlZm9yZUNsb3NlSGFuZGxlcicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYmVmb3JlQ2xvc2VIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIHZhciBzaG91bGRDbG9zZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ2xvc2luZyAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLmJlZm9yZUNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5pc0Nsb3NpbmcgPSB0cnVlO1xuICAgICAgICAgIHNob3VsZENsb3NlID0gdGhpcy5vcHRpb25zLmJlZm9yZUNsb3NlKGV2ZW50LCB0aGlzKSAhPT0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQ2xvc2luZyA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzaG91bGRDbG9zZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdjbG9zZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY2xvc2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3BlbmVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuYmVmb3JlQ2xvc2VIYW5kbGVyKGV2ZW50KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZHJvcCwgZHJvcC5jbGFzc1ByZWZpeCArICctb3BlbicpO1xuICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmRyb3AsIGRyb3AuY2xhc3NQcmVmaXggKyAnLWFmdGVyLW9wZW4nKTtcblxuICAgICAgICB0aGlzLmRyb3AuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kRXZlbnQsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXIpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcignY2xvc2UnKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMudGV0aGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXMudGV0aGVyLmRpc2FibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyb3AudXBkYXRlQm9keUNsYXNzZXMoKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3JlbW92ZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgICBpZiAodGhpcy5kcm9wLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aGlzLmRyb3AucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRyb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAncG9zaXRpb24nLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc09wZW5lZCgpICYmIHR5cGVvZiB0aGlzLnRldGhlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnZGVzdHJveScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMudGV0aGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXMudGV0aGVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYm91bmRFdmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICB2YXIgX2JvdW5kRXZlbnRzJGkgPSB0aGlzLl9ib3VuZEV2ZW50c1tpXTtcbiAgICAgICAgICB2YXIgZWxlbWVudCA9IF9ib3VuZEV2ZW50cyRpLmVsZW1lbnQ7XG4gICAgICAgICAgdmFyIF9ldmVudCA9IF9ib3VuZEV2ZW50cyRpLmV2ZW50O1xuICAgICAgICAgIHZhciBoYW5kbGVyID0gX2JvdW5kRXZlbnRzJGkuaGFuZGxlcjtcblxuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihfZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYm91bmRFdmVudHMgPSBbXTtcblxuICAgICAgICB0aGlzLnRldGhlciA9IG51bGw7XG4gICAgICAgIHRoaXMuZHJvcCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcblxuICAgICAgICByZW1vdmVGcm9tQXJyYXkoYWxsRHJvcHNbZHJvcC5jbGFzc1ByZWZpeF0sIHRoaXMpO1xuICAgICAgICByZW1vdmVGcm9tQXJyYXkoZHJvcC5kcm9wcywgdGhpcyk7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIERyb3BJbnN0YW5jZTtcbiAgfSkoRXZlbnRlZCk7XG5cbiAgcmV0dXJuIGRyb3A7XG59XG5cbnZhciBEcm9wID0gY3JlYXRlQ29udGV4dCgpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBEcm9wLnVwZGF0ZUJvZHlDbGFzc2VzKCk7XG59KTtcbnJldHVybiBEcm9wO1xuXG59KSk7XG4iLCIvKiEgdGV0aGVyIDEuMy42ICovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5UZXRoZXIgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24oX2RlcmVxXywgZXhwb3J0cywgbW9kdWxlKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBUZXRoZXJCYXNlID0gdW5kZWZpbmVkO1xuaWYgKHR5cGVvZiBUZXRoZXJCYXNlID09PSAndW5kZWZpbmVkJykge1xuICBUZXRoZXJCYXNlID0geyBtb2R1bGVzOiBbXSB9O1xufVxuXG52YXIgemVyb0VsZW1lbnQgPSBudWxsO1xuXG4vLyBTYW1lIGFzIG5hdGl2ZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QsIGV4Y2VwdCBpdCB0YWtlcyBpbnRvIGFjY291bnQgcGFyZW50IDxmcmFtZT4gb2Zmc2V0c1xuLy8gaWYgdGhlIGVsZW1lbnQgbGllcyB3aXRoaW4gYSBuZXN0ZWQgZG9jdW1lbnQgKDxmcmFtZT4gb3IgPGlmcmFtZT4tbGlrZSkuXG5mdW5jdGlvbiBnZXRBY3R1YWxCb3VuZGluZ0NsaWVudFJlY3Qobm9kZSkge1xuICB2YXIgYm91bmRpbmdSZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAvLyBUaGUgb3JpZ2luYWwgb2JqZWN0IHJldHVybmVkIGJ5IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpcyBpbW11dGFibGUsIHNvIHdlIGNsb25lIGl0XG4gIC8vIFdlIGNhbid0IHVzZSBleHRlbmQgYmVjYXVzZSB0aGUgcHJvcGVydGllcyBhcmUgbm90IGNvbnNpZGVyZWQgcGFydCBvZiB0aGUgb2JqZWN0IGJ5IGhhc093blByb3BlcnR5IGluIElFOVxuICB2YXIgcmVjdCA9IHt9O1xuICBmb3IgKHZhciBrIGluIGJvdW5kaW5nUmVjdCkge1xuICAgIHJlY3Rba10gPSBib3VuZGluZ1JlY3Rba107XG4gIH1cblxuICBpZiAobm9kZS5vd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCkge1xuICAgIHZhciBfZnJhbWVFbGVtZW50ID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmZyYW1lRWxlbWVudDtcbiAgICBpZiAoX2ZyYW1lRWxlbWVudCkge1xuICAgICAgdmFyIGZyYW1lUmVjdCA9IGdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdChfZnJhbWVFbGVtZW50KTtcbiAgICAgIHJlY3QudG9wICs9IGZyYW1lUmVjdC50b3A7XG4gICAgICByZWN0LmJvdHRvbSArPSBmcmFtZVJlY3QudG9wO1xuICAgICAgcmVjdC5sZWZ0ICs9IGZyYW1lUmVjdC5sZWZ0O1xuICAgICAgcmVjdC5yaWdodCArPSBmcmFtZVJlY3QubGVmdDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50cyhlbCkge1xuICAvLyBJbiBmaXJlZm94IGlmIHRoZSBlbCBpcyBpbnNpZGUgYW4gaWZyYW1lIHdpdGggZGlzcGxheTogbm9uZTsgd2luZG93LmdldENvbXB1dGVkU3R5bGUoKSB3aWxsIHJldHVybiBudWxsO1xuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKSB8fCB7fTtcbiAgdmFyIHBvc2l0aW9uID0gY29tcHV0ZWRTdHlsZS5wb3NpdGlvbjtcbiAgdmFyIHBhcmVudHMgPSBbXTtcblxuICBpZiAocG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gW2VsXTtcbiAgfVxuXG4gIHZhciBwYXJlbnQgPSBlbDtcbiAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkgJiYgcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSA9PT0gMSkge1xuICAgIHZhciBzdHlsZSA9IHVuZGVmaW5lZDtcbiAgICB0cnkge1xuICAgICAgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHBhcmVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ3VuZGVmaW5lZCcgfHwgc3R5bGUgPT09IG51bGwpIHtcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgcmV0dXJuIHBhcmVudHM7XG4gICAgfVxuXG4gICAgdmFyIF9zdHlsZSA9IHN0eWxlO1xuICAgIHZhciBvdmVyZmxvdyA9IF9zdHlsZS5vdmVyZmxvdztcbiAgICB2YXIgb3ZlcmZsb3dYID0gX3N0eWxlLm92ZXJmbG93WDtcbiAgICB2YXIgb3ZlcmZsb3dZID0gX3N0eWxlLm92ZXJmbG93WTtcblxuICAgIGlmICgvKGF1dG98c2Nyb2xsKS8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCkpIHtcbiAgICAgIGlmIChwb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyB8fCBbJ3JlbGF0aXZlJywgJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihzdHlsZS5wb3NpdGlvbikgPj0gMCkge1xuICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJlbnRzLnB1c2goZWwub3duZXJEb2N1bWVudC5ib2R5KTtcblxuICAvLyBJZiB0aGUgbm9kZSBpcyB3aXRoaW4gYSBmcmFtZSwgYWNjb3VudCBmb3IgdGhlIHBhcmVudCB3aW5kb3cgc2Nyb2xsXG4gIGlmIChlbC5vd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCkge1xuICAgIHBhcmVudHMucHVzaChlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KTtcbiAgfVxuXG4gIHJldHVybiBwYXJlbnRzO1xufVxuXG52YXIgdW5pcXVlSWQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiArK2lkO1xuICB9O1xufSkoKTtcblxudmFyIHplcm9Qb3NDYWNoZSA9IHt9O1xudmFyIGdldE9yaWdpbiA9IGZ1bmN0aW9uIGdldE9yaWdpbigpIHtcbiAgLy8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIHVuZm9ydHVuYXRlbHkgdG9vIGFjY3VyYXRlLiAgSXQgaW50cm9kdWNlcyBhIHBpeGVsIG9yIHR3byBvZlxuICAvLyBqaXR0ZXIgYXMgdGhlIHVzZXIgc2Nyb2xscyB0aGF0IG1lc3NlcyB3aXRoIG91ciBhYmlsaXR5IHRvIGRldGVjdCBpZiB0d28gcG9zaXRpb25zXG4gIC8vIGFyZSBlcXVpdmlsYW50IG9yIG5vdC4gIFdlIHBsYWNlIGFuIGVsZW1lbnQgYXQgdGhlIHRvcCBsZWZ0IG9mIHRoZSBwYWdlIHRoYXQgd2lsbFxuICAvLyBnZXQgdGhlIHNhbWUgaml0dGVyLCBzbyB3ZSBjYW4gY2FuY2VsIHRoZSB0d28gb3V0LlxuICB2YXIgbm9kZSA9IHplcm9FbGVtZW50O1xuICBpZiAoIW5vZGUpIHtcbiAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV0aGVyLWlkJywgdW5pcXVlSWQoKSk7XG4gICAgZXh0ZW5kKG5vZGUuc3R5bGUsIHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAgIHplcm9FbGVtZW50ID0gbm9kZTtcbiAgfVxuXG4gIHZhciBpZCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRldGhlci1pZCcpO1xuICBpZiAodHlwZW9mIHplcm9Qb3NDYWNoZVtpZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgemVyb1Bvc0NhY2hlW2lkXSA9IGdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdChub2RlKTtcblxuICAgIC8vIENsZWFyIHRoZSBjYWNoZSB3aGVuIHRoaXMgcG9zaXRpb24gY2FsbCBpcyBkb25lXG4gICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgZGVsZXRlIHplcm9Qb3NDYWNoZVtpZF07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gemVyb1Bvc0NhY2hlW2lkXTtcbn07XG5cbmZ1bmN0aW9uIHJlbW92ZVV0aWxFbGVtZW50cygpIHtcbiAgaWYgKHplcm9FbGVtZW50KSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh6ZXJvRWxlbWVudCk7XG4gIH1cbiAgemVyb0VsZW1lbnQgPSBudWxsO1xufTtcblxuZnVuY3Rpb24gZ2V0Qm91bmRzKGVsKSB7XG4gIHZhciBkb2MgPSB1bmRlZmluZWQ7XG4gIGlmIChlbCA9PT0gZG9jdW1lbnQpIHtcbiAgICBkb2MgPSBkb2N1bWVudDtcbiAgICBlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfSBlbHNlIHtcbiAgICBkb2MgPSBlbC5vd25lckRvY3VtZW50O1xuICB9XG5cbiAgdmFyIGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuICB2YXIgYm94ID0gZ2V0QWN0dWFsQm91bmRpbmdDbGllbnRSZWN0KGVsKTtcblxuICB2YXIgb3JpZ2luID0gZ2V0T3JpZ2luKCk7XG5cbiAgYm94LnRvcCAtPSBvcmlnaW4udG9wO1xuICBib3gubGVmdCAtPSBvcmlnaW4ubGVmdDtcblxuICBpZiAodHlwZW9mIGJveC53aWR0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBib3gud2lkdGggPSBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoIC0gYm94LmxlZnQgLSBib3gucmlnaHQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBib3guaGVpZ2h0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGJveC5oZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAtIGJveC50b3AgLSBib3guYm90dG9tO1xuICB9XG5cbiAgYm94LnRvcCA9IGJveC50b3AgLSBkb2NFbC5jbGllbnRUb3A7XG4gIGJveC5sZWZ0ID0gYm94LmxlZnQgLSBkb2NFbC5jbGllbnRMZWZ0O1xuICBib3gucmlnaHQgPSBkb2MuYm9keS5jbGllbnRXaWR0aCAtIGJveC53aWR0aCAtIGJveC5sZWZ0O1xuICBib3guYm90dG9tID0gZG9jLmJvZHkuY2xpZW50SGVpZ2h0IC0gYm94LmhlaWdodCAtIGJveC50b3A7XG5cbiAgcmV0dXJuIGJveDtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0UGFyZW50KGVsKSB7XG4gIHJldHVybiBlbC5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxCYXJTaXplKCkge1xuICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaW5uZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gIGlubmVyLnN0eWxlLmhlaWdodCA9ICcyMDBweCc7XG5cbiAgdmFyIG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGV4dGVuZChvdXRlci5zdHlsZSwge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICB3aWR0aDogJzIwMHB4JyxcbiAgICBoZWlnaHQ6ICcxNTBweCcsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gIH0pO1xuXG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcblxuICB2YXIgd2lkdGhDb250YWluZWQgPSBpbm5lci5vZmZzZXRXaWR0aDtcbiAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcbiAgdmFyIHdpZHRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG5cbiAgaWYgKHdpZHRoQ29udGFpbmVkID09PSB3aWR0aFNjcm9sbCkge1xuICAgIHdpZHRoU2Nyb2xsID0gb3V0ZXIuY2xpZW50V2lkdGg7XG4gIH1cblxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG91dGVyKTtcblxuICB2YXIgd2lkdGggPSB3aWR0aENvbnRhaW5lZCAtIHdpZHRoU2Nyb2xsO1xuXG4gIHJldHVybiB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiB3aWR0aCB9O1xufVxuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gIHZhciBvdXQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICB2YXIgYXJncyA9IFtdO1xuXG4gIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG5cbiAgYXJncy5zbGljZSgxKS5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmICgoe30pLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgb3V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWwsIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBlbC5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmFtZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNscykge1xuICAgICAgaWYgKGNscy50cmltKCkpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKCB8JCknLCAnZ2knKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKGVsKS5yZXBsYWNlKHJlZ2V4LCAnICcpO1xuICAgIHNldENsYXNzTmFtZShlbCwgY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbCwgbmFtZSkge1xuICBpZiAodHlwZW9mIGVsLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYW1lLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgICBpZiAoY2xzLnRyaW0oKSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlQ2xhc3MoZWwsIG5hbWUpO1xuICAgIHZhciBjbHMgPSBnZXRDbGFzc05hbWUoZWwpICsgKCcgJyArIG5hbWUpO1xuICAgIHNldENsYXNzTmFtZShlbCwgY2xzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbCwgbmFtZSkge1xuICBpZiAodHlwZW9mIGVsLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xuICB9XG4gIHZhciBjbGFzc05hbWUgPSBnZXRDbGFzc05hbWUoZWwpO1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoY2xhc3NOYW1lKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKGVsKSB7XG4gIC8vIENhbid0IHVzZSBqdXN0IFNWR0FuaW1hdGVkU3RyaW5nIGhlcmUgc2luY2Ugbm9kZXMgd2l0aGluIGEgRnJhbWUgaW4gSUUgaGF2ZVxuICAvLyBjb21wbGV0ZWx5IHNlcGFyYXRlbHkgU1ZHQW5pbWF0ZWRTdHJpbmcgYmFzZSBjbGFzc2VzXG4gIGlmIChlbC5jbGFzc05hbWUgaW5zdGFuY2VvZiBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LlNWR0FuaW1hdGVkU3RyaW5nKSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZS5iYXNlVmFsO1xuICB9XG4gIHJldHVybiBlbC5jbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIHNldENsYXNzTmFtZShlbCwgY2xhc3NOYW1lKSB7XG4gIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc05hbWUpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDbGFzc2VzKGVsLCBhZGQsIGFsbCkge1xuICAvLyBPZiB0aGUgc2V0IG9mICdhbGwnIGNsYXNzZXMsIHdlIG5lZWQgdGhlICdhZGQnIGNsYXNzZXMsIGFuZCBvbmx5IHRoZVxuICAvLyAnYWRkJyBjbGFzc2VzIHRvIGJlIHNldC5cbiAgYWxsLmZvckVhY2goZnVuY3Rpb24gKGNscykge1xuICAgIGlmIChhZGQuaW5kZXhPZihjbHMpID09PSAtMSAmJiBoYXNDbGFzcyhlbCwgY2xzKSkge1xuICAgICAgcmVtb3ZlQ2xhc3MoZWwsIGNscyk7XG4gICAgfVxuICB9KTtcblxuICBhZGQuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgaWYgKCFoYXNDbGFzcyhlbCwgY2xzKSkge1xuICAgICAgYWRkQ2xhc3MoZWwsIGNscyk7XG4gICAgfVxuICB9KTtcbn1cblxudmFyIGRlZmVycmVkID0gW107XG5cbnZhciBkZWZlciA9IGZ1bmN0aW9uIGRlZmVyKGZuKSB7XG4gIGRlZmVycmVkLnB1c2goZm4pO1xufTtcblxudmFyIGZsdXNoID0gZnVuY3Rpb24gZmx1c2goKSB7XG4gIHZhciBmbiA9IHVuZGVmaW5lZDtcbiAgd2hpbGUgKGZuID0gZGVmZXJyZWQucG9wKCkpIHtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgRXZlbnRlZCA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEV2ZW50ZWQoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50ZWQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEV2ZW50ZWQsIFt7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbihldmVudCwgaGFuZGxlciwgY3R4KSB7XG4gICAgICB2YXIgb25jZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzNdO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuYmluZGluZ3MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5iaW5kaW5nc1tldmVudF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3NbZXZlbnRdID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLmJpbmRpbmdzW2V2ZW50XS5wdXNoKHsgaGFuZGxlcjogaGFuZGxlciwgY3R4OiBjdHgsIG9uY2U6IG9uY2UgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25jZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGhhbmRsZXIsIGN0eCkge1xuICAgICAgdGhpcy5vbihldmVudCwgaGFuZGxlciwgY3R4LCB0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvZmYnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5iaW5kaW5ncyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHRoaXMuYmluZGluZ3NbZXZlbnRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYmluZGluZ3NbZXZlbnRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmJpbmRpbmdzW2V2ZW50XVtpXS5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihldmVudCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmJpbmRpbmdzICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmJpbmRpbmdzW2V2ZW50XSkge1xuICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBfYmluZGluZ3MkZXZlbnQkaSA9IHRoaXMuYmluZGluZ3NbZXZlbnRdW2ldO1xuICAgICAgICAgIHZhciBoYW5kbGVyID0gX2JpbmRpbmdzJGV2ZW50JGkuaGFuZGxlcjtcbiAgICAgICAgICB2YXIgY3R4ID0gX2JpbmRpbmdzJGV2ZW50JGkuY3R4O1xuICAgICAgICAgIHZhciBvbmNlID0gX2JpbmRpbmdzJGV2ZW50JGkub25jZTtcblxuICAgICAgICAgIHZhciBjb250ZXh0ID0gY3R4O1xuICAgICAgICAgIGlmICh0eXBlb2YgY29udGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGhhbmRsZXIuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cbiAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc1tldmVudF0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICArK2k7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEV2ZW50ZWQ7XG59KSgpO1xuXG5UZXRoZXJCYXNlLlV0aWxzID0ge1xuICBnZXRBY3R1YWxCb3VuZGluZ0NsaWVudFJlY3Q6IGdldEFjdHVhbEJvdW5kaW5nQ2xpZW50UmVjdCxcbiAgZ2V0U2Nyb2xsUGFyZW50czogZ2V0U2Nyb2xsUGFyZW50cyxcbiAgZ2V0Qm91bmRzOiBnZXRCb3VuZHMsXG4gIGdldE9mZnNldFBhcmVudDogZ2V0T2Zmc2V0UGFyZW50LFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgYWRkQ2xhc3M6IGFkZENsYXNzLFxuICByZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXG4gIGhhc0NsYXNzOiBoYXNDbGFzcyxcbiAgdXBkYXRlQ2xhc3NlczogdXBkYXRlQ2xhc3NlcyxcbiAgZGVmZXI6IGRlZmVyLFxuICBmbHVzaDogZmx1c2gsXG4gIHVuaXF1ZUlkOiB1bmlxdWVJZCxcbiAgRXZlbnRlZDogRXZlbnRlZCxcbiAgZ2V0U2Nyb2xsQmFyU2l6ZTogZ2V0U2Nyb2xsQmFyU2l6ZSxcbiAgcmVtb3ZlVXRpbEVsZW1lbnRzOiByZW1vdmVVdGlsRWxlbWVudHNcbn07XG4vKiBnbG9iYWxzIFRldGhlckJhc2UsIHBlcmZvcm1hbmNlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5ID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbJ3JldHVybiddKSBfaVsncmV0dXJuJ10oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZScpOyB9IH07IH0pKCk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94NiwgX3g3LCBfeDgpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3g2LCBwcm9wZXJ0eSA9IF94NywgcmVjZWl2ZXIgPSBfeDg7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3g2ID0gcGFyZW50OyBfeDcgPSBwcm9wZXJ0eTsgX3g4ID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmlmICh0eXBlb2YgVGV0aGVyQmFzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBpbmNsdWRlIHRoZSB1dGlscy5qcyBmaWxlIGJlZm9yZSB0ZXRoZXIuanMnKTtcbn1cblxudmFyIF9UZXRoZXJCYXNlJFV0aWxzID0gVGV0aGVyQmFzZS5VdGlscztcbnZhciBnZXRTY3JvbGxQYXJlbnRzID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0U2Nyb2xsUGFyZW50cztcbnZhciBnZXRCb3VuZHMgPSBfVGV0aGVyQmFzZSRVdGlscy5nZXRCb3VuZHM7XG52YXIgZ2V0T2Zmc2V0UGFyZW50ID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0T2Zmc2V0UGFyZW50O1xudmFyIGV4dGVuZCA9IF9UZXRoZXJCYXNlJFV0aWxzLmV4dGVuZDtcbnZhciBhZGRDbGFzcyA9IF9UZXRoZXJCYXNlJFV0aWxzLmFkZENsYXNzO1xudmFyIHJlbW92ZUNsYXNzID0gX1RldGhlckJhc2UkVXRpbHMucmVtb3ZlQ2xhc3M7XG52YXIgdXBkYXRlQ2xhc3NlcyA9IF9UZXRoZXJCYXNlJFV0aWxzLnVwZGF0ZUNsYXNzZXM7XG52YXIgZGVmZXIgPSBfVGV0aGVyQmFzZSRVdGlscy5kZWZlcjtcbnZhciBmbHVzaCA9IF9UZXRoZXJCYXNlJFV0aWxzLmZsdXNoO1xudmFyIGdldFNjcm9sbEJhclNpemUgPSBfVGV0aGVyQmFzZSRVdGlscy5nZXRTY3JvbGxCYXJTaXplO1xudmFyIHJlbW92ZVV0aWxFbGVtZW50cyA9IF9UZXRoZXJCYXNlJFV0aWxzLnJlbW92ZVV0aWxFbGVtZW50cztcblxuZnVuY3Rpb24gd2l0aGluKGEsIGIpIHtcbiAgdmFyIGRpZmYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyAxIDogYXJndW1lbnRzWzJdO1xuXG4gIHJldHVybiBhICsgZGlmZiA+PSBiICYmIGIgPj0gYSAtIGRpZmY7XG59XG5cbnZhciB0cmFuc2Zvcm1LZXkgPSAoZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICB2YXIgdHJhbnNmb3JtcyA9IFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdtc1RyYW5zZm9ybSddO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zZm9ybXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIga2V5ID0gdHJhbnNmb3Jtc1tpXTtcbiAgICBpZiAoZWwuc3R5bGVba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxufSkoKTtcblxudmFyIHRldGhlcnMgPSBbXTtcblxudmFyIHBvc2l0aW9uID0gZnVuY3Rpb24gcG9zaXRpb24oKSB7XG4gIHRldGhlcnMuZm9yRWFjaChmdW5jdGlvbiAodGV0aGVyKSB7XG4gICAgdGV0aGVyLnBvc2l0aW9uKGZhbHNlKTtcbiAgfSk7XG4gIGZsdXNoKCk7XG59O1xuXG5mdW5jdGlvbiBub3coKSB7XG4gIGlmICh0eXBlb2YgcGVyZm9ybWFuY2UgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwZXJmb3JtYW5jZS5ub3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICB9XG4gIHJldHVybiArbmV3IERhdGUoKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxhc3RDYWxsID0gbnVsbDtcbiAgdmFyIGxhc3REdXJhdGlvbiA9IG51bGw7XG4gIHZhciBwZW5kaW5nVGltZW91dCA9IG51bGw7XG5cbiAgdmFyIHRpY2sgPSBmdW5jdGlvbiB0aWNrKCkge1xuICAgIGlmICh0eXBlb2YgbGFzdER1cmF0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBsYXN0RHVyYXRpb24gPiAxNikge1xuICAgICAgLy8gV2Ugdm9sdW50YXJpbHkgdGhyb3R0bGUgb3Vyc2VsdmVzIGlmIHdlIGNhbid0IG1hbmFnZSA2MGZwc1xuICAgICAgbGFzdER1cmF0aW9uID0gTWF0aC5taW4obGFzdER1cmF0aW9uIC0gMTYsIDI1MCk7XG5cbiAgICAgIC8vIEp1c3QgaW4gY2FzZSB0aGlzIGlzIHRoZSBsYXN0IGV2ZW50LCByZW1lbWJlciB0byBwb3NpdGlvbiBqdXN0IG9uY2UgbW9yZVxuICAgICAgcGVuZGluZ1RpbWVvdXQgPSBzZXRUaW1lb3V0KHRpY2ssIDI1MCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBsYXN0Q2FsbCAhPT0gJ3VuZGVmaW5lZCcgJiYgbm93KCkgLSBsYXN0Q2FsbCA8IDEwKSB7XG4gICAgICAvLyBTb21lIGJyb3dzZXJzIGNhbGwgZXZlbnRzIGEgbGl0dGxlIHRvbyBmcmVxdWVudGx5LCByZWZ1c2UgdG8gcnVuIG1vcmUgdGhhbiBpcyByZWFzb25hYmxlXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHBlbmRpbmdUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dChwZW5kaW5nVGltZW91dCk7XG4gICAgICBwZW5kaW5nVGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgbGFzdENhbGwgPSBub3coKTtcbiAgICBwb3NpdGlvbigpO1xuICAgIGxhc3REdXJhdGlvbiA9IG5vdygpIC0gbGFzdENhbGw7XG4gIH07XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBbJ3Jlc2l6ZScsICdzY3JvbGwnLCAndG91Y2htb3ZlJ10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aWNrKTtcbiAgICB9KTtcbiAgfVxufSkoKTtcblxudmFyIE1JUlJPUl9MUiA9IHtcbiAgY2VudGVyOiAnY2VudGVyJyxcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0J1xufTtcblxudmFyIE1JUlJPUl9UQiA9IHtcbiAgbWlkZGxlOiAnbWlkZGxlJyxcbiAgdG9wOiAnYm90dG9tJyxcbiAgYm90dG9tOiAndG9wJ1xufTtcblxudmFyIE9GRlNFVF9NQVAgPSB7XG4gIHRvcDogMCxcbiAgbGVmdDogMCxcbiAgbWlkZGxlOiAnNTAlJyxcbiAgY2VudGVyOiAnNTAlJyxcbiAgYm90dG9tOiAnMTAwJScsXG4gIHJpZ2h0OiAnMTAwJSdcbn07XG5cbnZhciBhdXRvVG9GaXhlZEF0dGFjaG1lbnQgPSBmdW5jdGlvbiBhdXRvVG9GaXhlZEF0dGFjaG1lbnQoYXR0YWNobWVudCwgcmVsYXRpdmVUb0F0dGFjaG1lbnQpIHtcbiAgdmFyIGxlZnQgPSBhdHRhY2htZW50LmxlZnQ7XG4gIHZhciB0b3AgPSBhdHRhY2htZW50LnRvcDtcblxuICBpZiAobGVmdCA9PT0gJ2F1dG8nKSB7XG4gICAgbGVmdCA9IE1JUlJPUl9MUltyZWxhdGl2ZVRvQXR0YWNobWVudC5sZWZ0XTtcbiAgfVxuXG4gIGlmICh0b3AgPT09ICdhdXRvJykge1xuICAgIHRvcCA9IE1JUlJPUl9UQltyZWxhdGl2ZVRvQXR0YWNobWVudC50b3BdO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVmdDogbGVmdCwgdG9wOiB0b3AgfTtcbn07XG5cbnZhciBhdHRhY2htZW50VG9PZmZzZXQgPSBmdW5jdGlvbiBhdHRhY2htZW50VG9PZmZzZXQoYXR0YWNobWVudCkge1xuICB2YXIgbGVmdCA9IGF0dGFjaG1lbnQubGVmdDtcbiAgdmFyIHRvcCA9IGF0dGFjaG1lbnQudG9wO1xuXG4gIGlmICh0eXBlb2YgT0ZGU0VUX01BUFthdHRhY2htZW50LmxlZnRdICE9PSAndW5kZWZpbmVkJykge1xuICAgIGxlZnQgPSBPRkZTRVRfTUFQW2F0dGFjaG1lbnQubGVmdF07XG4gIH1cblxuICBpZiAodHlwZW9mIE9GRlNFVF9NQVBbYXR0YWNobWVudC50b3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRvcCA9IE9GRlNFVF9NQVBbYXR0YWNobWVudC50b3BdO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVmdDogbGVmdCwgdG9wOiB0b3AgfTtcbn07XG5cbmZ1bmN0aW9uIGFkZE9mZnNldCgpIHtcbiAgdmFyIG91dCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG9mZnNldHMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBvZmZzZXRzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgb2Zmc2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIHRvcCA9IF9yZWYudG9wO1xuICAgIHZhciBsZWZ0ID0gX3JlZi5sZWZ0O1xuXG4gICAgaWYgKHR5cGVvZiB0b3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0b3AgPSBwYXJzZUZsb2F0KHRvcCwgMTApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxlZnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZWZ0ID0gcGFyc2VGbG9hdChsZWZ0LCAxMCk7XG4gICAgfVxuXG4gICAgb3V0LnRvcCArPSB0b3A7XG4gICAgb3V0LmxlZnQgKz0gbGVmdDtcbiAgfSk7XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gb2Zmc2V0VG9QeChvZmZzZXQsIHNpemUpIHtcbiAgaWYgKHR5cGVvZiBvZmZzZXQubGVmdCA9PT0gJ3N0cmluZycgJiYgb2Zmc2V0LmxlZnQuaW5kZXhPZignJScpICE9PSAtMSkge1xuICAgIG9mZnNldC5sZWZ0ID0gcGFyc2VGbG9hdChvZmZzZXQubGVmdCwgMTApIC8gMTAwICogc2l6ZS53aWR0aDtcbiAgfVxuICBpZiAodHlwZW9mIG9mZnNldC50b3AgPT09ICdzdHJpbmcnICYmIG9mZnNldC50b3AuaW5kZXhPZignJScpICE9PSAtMSkge1xuICAgIG9mZnNldC50b3AgPSBwYXJzZUZsb2F0KG9mZnNldC50b3AsIDEwKSAvIDEwMCAqIHNpemUuaGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldDtcbn1cblxudmFyIHBhcnNlT2Zmc2V0ID0gZnVuY3Rpb24gcGFyc2VPZmZzZXQodmFsdWUpIHtcbiAgdmFyIF92YWx1ZSRzcGxpdCA9IHZhbHVlLnNwbGl0KCcgJyk7XG5cbiAgdmFyIF92YWx1ZSRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfdmFsdWUkc3BsaXQsIDIpO1xuXG4gIHZhciB0b3AgPSBfdmFsdWUkc3BsaXQyWzBdO1xuICB2YXIgbGVmdCA9IF92YWx1ZSRzcGxpdDJbMV07XG5cbiAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbn07XG52YXIgcGFyc2VBdHRhY2htZW50ID0gcGFyc2VPZmZzZXQ7XG5cbnZhciBUZXRoZXJDbGFzcyA9IChmdW5jdGlvbiAoX0V2ZW50ZWQpIHtcbiAgX2luaGVyaXRzKFRldGhlckNsYXNzLCBfRXZlbnRlZCk7XG5cbiAgZnVuY3Rpb24gVGV0aGVyQ2xhc3Mob3B0aW9ucykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGV0aGVyQ2xhc3MpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV0aGVyQ2xhc3MucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5iaW5kKHRoaXMpO1xuXG4gICAgdGV0aGVycy5wdXNoKHRoaXMpO1xuXG4gICAgdGhpcy5oaXN0b3J5ID0gW107XG5cbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucywgZmFsc2UpO1xuXG4gICAgVGV0aGVyQmFzZS5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgaWYgKHR5cGVvZiBtb2R1bGUuaW5pdGlhbGl6ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmluaXRpYWxpemUuY2FsbChfdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnBvc2l0aW9uKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGV0aGVyQ2xhc3MsIFt7XG4gICAga2V5OiAnZ2V0Q2xhc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbGFzcygpIHtcbiAgICAgIHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyAnJyA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBjbGFzc2VzID0gdGhpcy5vcHRpb25zLmNsYXNzZXM7XG5cbiAgICAgIGlmICh0eXBlb2YgY2xhc3NlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgY2xhc3Nlc1trZXldKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xhc3Nlc1trZXldO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY2xhc3NQcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jbGFzc1ByZWZpeCArICctJyArIGtleTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2V0T3B0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBwb3MgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIG9mZnNldDogJzAgMCcsXG4gICAgICAgIHRhcmdldE9mZnNldDogJzAgMCcsXG4gICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6ICdhdXRvIGF1dG8nLFxuICAgICAgICBjbGFzc1ByZWZpeDogJ3RldGhlcidcbiAgICAgIH07XG5cbiAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBfb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgIHZhciBlbGVtZW50ID0gX29wdGlvbnMuZWxlbWVudDtcbiAgICAgIHZhciB0YXJnZXQgPSBfb3B0aW9ucy50YXJnZXQ7XG4gICAgICB2YXIgdGFyZ2V0TW9kaWZpZXIgPSBfb3B0aW9ucy50YXJnZXRNb2RpZmllcjtcblxuICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgdGhpcy50YXJnZXRNb2RpZmllciA9IHRhcmdldE1vZGlmaWVyO1xuXG4gICAgICBpZiAodGhpcy50YXJnZXQgPT09ICd2aWV3cG9ydCcpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0aGlzLnRhcmdldE1vZGlmaWVyID0gJ3Zpc2libGUnO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnRhcmdldCA9PT0gJ3Njcm9sbC1oYW5kbGUnKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdGhpcy50YXJnZXRNb2RpZmllciA9ICdzY3JvbGwtaGFuZGxlJztcbiAgICAgIH1cblxuICAgICAgWydlbGVtZW50JywgJ3RhcmdldCddLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIF90aGlzMltrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGV0aGVyIEVycm9yOiBCb3RoIGVsZW1lbnQgYW5kIHRhcmdldCBtdXN0IGJlIGRlZmluZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgX3RoaXMyW2tleV0uanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIF90aGlzMltrZXldID0gX3RoaXMyW2tleV1bMF07XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGlzMltrZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIF90aGlzMltrZXldID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihfdGhpczJba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuZ2V0Q2xhc3MoJ2VsZW1lbnQnKSk7XG4gICAgICBpZiAoISh0aGlzLm9wdGlvbnMuYWRkVGFyZ2V0Q2xhc3NlcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgIGFkZENsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmdldENsYXNzKCd0YXJnZXQnKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmF0dGFjaG1lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXRoZXIgRXJyb3I6IFlvdSBtdXN0IHByb3ZpZGUgYW4gYXR0YWNobWVudCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhcmdldEF0dGFjaG1lbnQgPSBwYXJzZUF0dGFjaG1lbnQodGhpcy5vcHRpb25zLnRhcmdldEF0dGFjaG1lbnQpO1xuICAgICAgdGhpcy5hdHRhY2htZW50ID0gcGFyc2VBdHRhY2htZW50KHRoaXMub3B0aW9ucy5hdHRhY2htZW50KTtcbiAgICAgIHRoaXMub2Zmc2V0ID0gcGFyc2VPZmZzZXQodGhpcy5vcHRpb25zLm9mZnNldCk7XG4gICAgICB0aGlzLnRhcmdldE9mZnNldCA9IHBhcnNlT2Zmc2V0KHRoaXMub3B0aW9ucy50YXJnZXRPZmZzZXQpO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2Nyb2xsUGFyZW50cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnRhcmdldE1vZGlmaWVyID09PSAnc2Nyb2xsLWhhbmRsZScpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnRzID0gW3RoaXMudGFyZ2V0XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsUGFyZW50cyA9IGdldFNjcm9sbFBhcmVudHModGhpcy50YXJnZXQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoISh0aGlzLm9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlKHBvcyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0VGFyZ2V0Qm91bmRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VGFyZ2V0Qm91bmRzKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldE1vZGlmaWVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodGhpcy50YXJnZXRNb2RpZmllciA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4geyB0b3A6IHBhZ2VZT2Zmc2V0LCBsZWZ0OiBwYWdlWE9mZnNldCwgaGVpZ2h0OiBpbm5lckhlaWdodCwgd2lkdGg6IGlubmVyV2lkdGggfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IGdldEJvdW5kcyh0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgICAgIHZhciBvdXQgPSB7XG4gICAgICAgICAgICAgIGhlaWdodDogYm91bmRzLmhlaWdodCxcbiAgICAgICAgICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCxcbiAgICAgICAgICAgICAgdG9wOiBib3VuZHMudG9wLFxuICAgICAgICAgICAgICBsZWZ0OiBib3VuZHMubGVmdFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWluKG91dC5oZWlnaHQsIGJvdW5kcy5oZWlnaHQgLSAocGFnZVlPZmZzZXQgLSBib3VuZHMudG9wKSk7XG4gICAgICAgICAgICBvdXQuaGVpZ2h0ID0gTWF0aC5taW4ob3V0LmhlaWdodCwgYm91bmRzLmhlaWdodCAtIChib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAtIChwYWdlWU9mZnNldCArIGlubmVySGVpZ2h0KSkpO1xuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWluKGlubmVySGVpZ2h0LCBvdXQuaGVpZ2h0KTtcbiAgICAgICAgICAgIG91dC5oZWlnaHQgLT0gMjtcblxuICAgICAgICAgICAgb3V0LndpZHRoID0gTWF0aC5taW4ob3V0LndpZHRoLCBib3VuZHMud2lkdGggLSAocGFnZVhPZmZzZXQgLSBib3VuZHMubGVmdCkpO1xuICAgICAgICAgICAgb3V0LndpZHRoID0gTWF0aC5taW4ob3V0LndpZHRoLCBib3VuZHMud2lkdGggLSAoYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSAocGFnZVhPZmZzZXQgKyBpbm5lcldpZHRoKSkpO1xuICAgICAgICAgICAgb3V0LndpZHRoID0gTWF0aC5taW4oaW5uZXJXaWR0aCwgb3V0LndpZHRoKTtcbiAgICAgICAgICAgIG91dC53aWR0aCAtPSAyO1xuXG4gICAgICAgICAgICBpZiAob3V0LnRvcCA8IHBhZ2VZT2Zmc2V0KSB7XG4gICAgICAgICAgICAgIG91dC50b3AgPSBwYWdlWU9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvdXQubGVmdCA8IHBhZ2VYT2Zmc2V0KSB7XG4gICAgICAgICAgICAgIG91dC5sZWZ0ID0gcGFnZVhPZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0TW9kaWZpZXIgPT09ICdzY3JvbGwtaGFuZGxlJykge1xuICAgICAgICAgIHZhciBib3VuZHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgICAgICAgIGlmICh0YXJnZXQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgICAgICAgYm91bmRzID0ge1xuICAgICAgICAgICAgICBsZWZ0OiBwYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgdG9wOiBwYWdlWU9mZnNldCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBpbm5lckhlaWdodCxcbiAgICAgICAgICAgICAgd2lkdGg6IGlubmVyV2lkdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvdW5kcyA9IGdldEJvdW5kcyh0YXJnZXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcblxuICAgICAgICAgIHZhciBoYXNCb3R0b21TY3JvbGwgPSB0YXJnZXQuc2Nyb2xsV2lkdGggPiB0YXJnZXQuY2xpZW50V2lkdGggfHwgW3N0eWxlLm92ZXJmbG93LCBzdHlsZS5vdmVyZmxvd1hdLmluZGV4T2YoJ3Njcm9sbCcpID49IDAgfHwgdGhpcy50YXJnZXQgIT09IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgICB2YXIgc2Nyb2xsQm90dG9tID0gMDtcbiAgICAgICAgICBpZiAoaGFzQm90dG9tU2Nyb2xsKSB7XG4gICAgICAgICAgICBzY3JvbGxCb3R0b20gPSAxNTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gYm91bmRzLmhlaWdodCAtIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyVG9wV2lkdGgpIC0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJCb3R0b21XaWR0aCkgLSBzY3JvbGxCb3R0b207XG5cbiAgICAgICAgICB2YXIgb3V0ID0ge1xuICAgICAgICAgICAgd2lkdGg6IDE1LFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiAwLjk3NSAqIChoZWlnaHQgLyB0YXJnZXQuc2Nyb2xsSGVpZ2h0KSxcbiAgICAgICAgICAgIGxlZnQ6IGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoIC0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJMZWZ0V2lkdGgpIC0gMTVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGZpdEFkaiA9IDA7XG4gICAgICAgICAgaWYgKGhlaWdodCA8IDQwOCAmJiB0aGlzLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgZml0QWRqID0gLTAuMDAwMTEgKiBNYXRoLnBvdyhoZWlnaHQsIDIpIC0gMC4wMDcyNyAqIGhlaWdodCArIDIyLjU4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWF4KG91dC5oZWlnaHQsIDI0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc2Nyb2xsUGVyY2VudGFnZSA9IHRoaXMudGFyZ2V0LnNjcm9sbFRvcCAvICh0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0KTtcbiAgICAgICAgICBvdXQudG9wID0gc2Nyb2xsUGVyY2VudGFnZSAqIChoZWlnaHQgLSBvdXQuaGVpZ2h0IC0gZml0QWRqKSArIGJvdW5kcy50b3AgKyBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclRvcFdpZHRoKTtcblxuICAgICAgICAgIGlmICh0aGlzLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWF4KG91dC5oZWlnaHQsIDI0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0Qm91bmRzKHRoaXMudGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjbGVhckNhY2hlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2FjaGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYWNoZShrLCBnZXR0ZXIpIHtcbiAgICAgIC8vIE1vcmUgdGhhbiBvbmUgbW9kdWxlIHdpbGwgb2Z0ZW4gbmVlZCB0aGUgc2FtZSBET00gaW5mbywgc29cbiAgICAgIC8vIHdlIGtlZXAgYSBjYWNoZSB3aGljaCBpcyBjbGVhcmVkIG9uIGVhY2ggcG9zaXRpb24gY2FsbFxuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jYWNoZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jYWNoZVtrXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVba10gPSBnZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlW2tdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgcG9zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgaWYgKCEodGhpcy5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICBhZGRDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIH1cbiAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudCAhPT0gX3RoaXMzLnRhcmdldC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIF90aGlzMy5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAocG9zKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICByZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2Nyb2xsUGFyZW50cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBfdGhpczQucG9zaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB0aGlzLmRpc2FibGUoKTtcblxuICAgICAgdGV0aGVycy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXRoZXIsIGkpIHtcbiAgICAgICAgaWYgKHRldGhlciA9PT0gX3RoaXM1KSB7XG4gICAgICAgICAgdGV0aGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZW1vdmUgYW55IGVsZW1lbnRzIHdlIHdlcmUgdXNpbmcgZm9yIGNvbnZlbmllbmNlIGZyb20gdGhlIERPTVxuICAgICAgaWYgKHRldGhlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbW92ZVV0aWxFbGVtZW50cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZUF0dGFjaENsYXNzZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVBdHRhY2hDbGFzc2VzKGVsZW1lbnRBdHRhY2gsIHRhcmdldEF0dGFjaCkge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIGVsZW1lbnRBdHRhY2ggPSBlbGVtZW50QXR0YWNoIHx8IHRoaXMuYXR0YWNobWVudDtcbiAgICAgIHRhcmdldEF0dGFjaCA9IHRhcmdldEF0dGFjaCB8fCB0aGlzLnRhcmdldEF0dGFjaG1lbnQ7XG4gICAgICB2YXIgc2lkZXMgPSBbJ2xlZnQnLCAndG9wJywgJ2JvdHRvbScsICdyaWdodCcsICdtaWRkbGUnLCAnY2VudGVyJ107XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fYWRkQXR0YWNoQ2xhc3NlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gdXBkYXRlQXR0YWNoQ2xhc3NlcyBjYW4gYmUgY2FsbGVkIG1vcmUgdGhhbiBvbmNlIGluIGEgcG9zaXRpb24gY2FsbCwgc29cbiAgICAgICAgLy8gd2UgbmVlZCB0byBjbGVhbiB1cCBhZnRlciBvdXJzZWx2ZXMgc3VjaCB0aGF0IHdoZW4gdGhlIGxhc3QgZGVmZXIgZ2V0c1xuICAgICAgICAvLyByYW4gaXQgZG9lc24ndCBhZGQgYW55IGV4dHJhIGNsYXNzZXMgZnJvbSBwcmV2aW91cyBjYWxscy5cbiAgICAgICAgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5zcGxpY2UoMCwgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX2FkZEF0dGFjaENsYXNzZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuX2FkZEF0dGFjaENsYXNzZXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBhZGQgPSB0aGlzLl9hZGRBdHRhY2hDbGFzc2VzO1xuXG4gICAgICBpZiAoZWxlbWVudEF0dGFjaC50b3ApIHtcbiAgICAgICAgYWRkLnB1c2godGhpcy5nZXRDbGFzcygnZWxlbWVudC1hdHRhY2hlZCcpICsgJy0nICsgZWxlbWVudEF0dGFjaC50b3ApO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnRBdHRhY2gubGVmdCkge1xuICAgICAgICBhZGQucHVzaCh0aGlzLmdldENsYXNzKCdlbGVtZW50LWF0dGFjaGVkJykgKyAnLScgKyBlbGVtZW50QXR0YWNoLmxlZnQpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldEF0dGFjaC50b3ApIHtcbiAgICAgICAgYWRkLnB1c2godGhpcy5nZXRDbGFzcygndGFyZ2V0LWF0dGFjaGVkJykgKyAnLScgKyB0YXJnZXRBdHRhY2gudG9wKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRBdHRhY2gubGVmdCkge1xuICAgICAgICBhZGQucHVzaCh0aGlzLmdldENsYXNzKCd0YXJnZXQtYXR0YWNoZWQnKSArICctJyArIHRhcmdldEF0dGFjaC5sZWZ0KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFsbCA9IFtdO1xuICAgICAgc2lkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICBhbGwucHVzaChfdGhpczYuZ2V0Q2xhc3MoJ2VsZW1lbnQtYXR0YWNoZWQnKSArICctJyArIHNpZGUpO1xuICAgICAgICBhbGwucHVzaChfdGhpczYuZ2V0Q2xhc3MoJ3RhcmdldC1hdHRhY2hlZCcpICsgJy0nICsgc2lkZSk7XG4gICAgICB9KTtcblxuICAgICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISh0eXBlb2YgX3RoaXM2Ll9hZGRBdHRhY2hDbGFzc2VzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDbGFzc2VzKF90aGlzNi5lbGVtZW50LCBfdGhpczYuX2FkZEF0dGFjaENsYXNzZXMsIGFsbCk7XG4gICAgICAgIGlmICghKF90aGlzNi5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXM2LnRhcmdldCwgX3RoaXM2Ll9hZGRBdHRhY2hDbGFzc2VzLCBhbGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIF90aGlzNi5fYWRkQXR0YWNoQ2xhc3NlcztcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Bvc2l0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zaXRpb24oKSB7XG4gICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgdmFyIGZsdXNoQ2hhbmdlcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIC8vIGZsdXNoQ2hhbmdlcyBjb21taXRzIHRoZSBjaGFuZ2VzIGltbWVkaWF0ZWx5LCBsZWF2ZSB0cnVlIHVubGVzcyB5b3UgYXJlIHBvc2l0aW9uaW5nIG11bHRpcGxlXG4gICAgICAvLyB0ZXRoZXJzIChpbiB3aGljaCBjYXNlIGNhbGwgVGV0aGVyLlV0aWxzLmZsdXNoIHlvdXJzZWxmIHdoZW4geW91J3JlIGRvbmUpXG5cbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGVhckNhY2hlKCk7XG5cbiAgICAgIC8vIFR1cm4gJ2F1dG8nIGF0dGFjaG1lbnRzIGludG8gdGhlIGFwcHJvcHJpYXRlIGNvcm5lciBvciBlZGdlXG4gICAgICB2YXIgdGFyZ2V0QXR0YWNobWVudCA9IGF1dG9Ub0ZpeGVkQXR0YWNobWVudCh0aGlzLnRhcmdldEF0dGFjaG1lbnQsIHRoaXMuYXR0YWNobWVudCk7XG5cbiAgICAgIHRoaXMudXBkYXRlQXR0YWNoQ2xhc3Nlcyh0aGlzLmF0dGFjaG1lbnQsIHRhcmdldEF0dGFjaG1lbnQpO1xuXG4gICAgICB2YXIgZWxlbWVudFBvcyA9IHRoaXMuY2FjaGUoJ2VsZW1lbnQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0Qm91bmRzKF90aGlzNy5lbGVtZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgd2lkdGggPSBlbGVtZW50UG9zLndpZHRoO1xuICAgICAgdmFyIGhlaWdodCA9IGVsZW1lbnRQb3MuaGVpZ2h0O1xuXG4gICAgICBpZiAod2lkdGggPT09IDAgJiYgaGVpZ2h0ID09PSAwICYmIHR5cGVvZiB0aGlzLmxhc3RTaXplICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgX2xhc3RTaXplID0gdGhpcy5sYXN0U2l6ZTtcblxuICAgICAgICAvLyBXZSBjYWNoZSB0aGUgaGVpZ2h0IGFuZCB3aWR0aCB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIHBvc2l0aW9uIGVsZW1lbnRzIHRoYXQgYXJlXG4gICAgICAgIC8vIGdldHRpbmcgaGlkZGVuLlxuICAgICAgICB3aWR0aCA9IF9sYXN0U2l6ZS53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gX2xhc3RTaXplLmhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGFzdFNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldFBvcyA9IHRoaXMuY2FjaGUoJ3RhcmdldC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczcuZ2V0VGFyZ2V0Qm91bmRzKCk7XG4gICAgICB9KTtcbiAgICAgIHZhciB0YXJnZXRTaXplID0gdGFyZ2V0UG9zO1xuXG4gICAgICAvLyBHZXQgYW4gYWN0dWFsIHB4IG9mZnNldCBmcm9tIHRoZSBhdHRhY2htZW50XG4gICAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9QeChhdHRhY2htZW50VG9PZmZzZXQodGhpcy5hdHRhY2htZW50KSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgdmFyIHRhcmdldE9mZnNldCA9IG9mZnNldFRvUHgoYXR0YWNobWVudFRvT2Zmc2V0KHRhcmdldEF0dGFjaG1lbnQpLCB0YXJnZXRTaXplKTtcblxuICAgICAgdmFyIG1hbnVhbE9mZnNldCA9IG9mZnNldFRvUHgodGhpcy5vZmZzZXQsIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcbiAgICAgIHZhciBtYW51YWxUYXJnZXRPZmZzZXQgPSBvZmZzZXRUb1B4KHRoaXMudGFyZ2V0T2Zmc2V0LCB0YXJnZXRTaXplKTtcblxuICAgICAgLy8gQWRkIHRoZSBtYW51YWxseSBwcm92aWRlZCBvZmZzZXRcbiAgICAgIG9mZnNldCA9IGFkZE9mZnNldChvZmZzZXQsIG1hbnVhbE9mZnNldCk7XG4gICAgICB0YXJnZXRPZmZzZXQgPSBhZGRPZmZzZXQodGFyZ2V0T2Zmc2V0LCBtYW51YWxUYXJnZXRPZmZzZXQpO1xuXG4gICAgICAvLyBJdCdzIG5vdyBvdXIgZ29hbCB0byBtYWtlIChlbGVtZW50IHBvc2l0aW9uICsgb2Zmc2V0KSA9PSAodGFyZ2V0IHBvc2l0aW9uICsgdGFyZ2V0IG9mZnNldClcbiAgICAgIHZhciBsZWZ0ID0gdGFyZ2V0UG9zLmxlZnQgKyB0YXJnZXRPZmZzZXQubGVmdCAtIG9mZnNldC5sZWZ0O1xuICAgICAgdmFyIHRvcCA9IHRhcmdldFBvcy50b3AgKyB0YXJnZXRPZmZzZXQudG9wIC0gb2Zmc2V0LnRvcDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUZXRoZXJCYXNlLm1vZHVsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIF9tb2R1bGUyID0gVGV0aGVyQmFzZS5tb2R1bGVzW2ldO1xuICAgICAgICB2YXIgcmV0ID0gX21vZHVsZTIucG9zaXRpb24uY2FsbCh0aGlzLCB7XG4gICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiB0YXJnZXRBdHRhY2htZW50LFxuICAgICAgICAgIHRhcmdldFBvczogdGFyZ2V0UG9zLFxuICAgICAgICAgIGVsZW1lbnRQb3M6IGVsZW1lbnRQb3MsXG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgdGFyZ2V0T2Zmc2V0OiB0YXJnZXRPZmZzZXQsXG4gICAgICAgICAgbWFudWFsT2Zmc2V0OiBtYW51YWxPZmZzZXQsXG4gICAgICAgICAgbWFudWFsVGFyZ2V0T2Zmc2V0OiBtYW51YWxUYXJnZXRPZmZzZXQsXG4gICAgICAgICAgc2Nyb2xsYmFyU2l6ZTogc2Nyb2xsYmFyU2l6ZSxcbiAgICAgICAgICBhdHRhY2htZW50OiB0aGlzLmF0dGFjaG1lbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHJldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3AgPSByZXQudG9wO1xuICAgICAgICAgIGxlZnQgPSByZXQubGVmdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBXZSBkZXNjcmliZSB0aGUgcG9zaXRpb24gdGhyZWUgZGlmZmVyZW50IHdheXMgdG8gZ2l2ZSB0aGUgb3B0aW1pemVyXG4gICAgICAvLyBhIGNoYW5jZSB0byBkZWNpZGUgdGhlIGJlc3QgcG9zc2libGUgd2F5IHRvIHBvc2l0aW9uIHRoZSBlbGVtZW50XG4gICAgICAvLyB3aXRoIHRoZSBmZXdlc3QgcmVwYWludHMuXG4gICAgICB2YXIgbmV4dCA9IHtcbiAgICAgICAgLy8gSXQncyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgcGFnZSAoYWJzb2x1dGUgcG9zaXRpb25pbmcgd2hlblxuICAgICAgICAvLyB0aGUgZWxlbWVudCBpcyBhIGNoaWxkIG9mIHRoZSBib2R5KVxuICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEl0J3MgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0IChmaXhlZCBwb3NpdGlvbmluZylcbiAgICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgICB0b3A6IHRvcCAtIHBhZ2VZT2Zmc2V0LFxuICAgICAgICAgIGJvdHRvbTogcGFnZVlPZmZzZXQgLSB0b3AgLSBoZWlnaHQgKyBpbm5lckhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0IC0gcGFnZVhPZmZzZXQsXG4gICAgICAgICAgcmlnaHQ6IHBhZ2VYT2Zmc2V0IC0gbGVmdCAtIHdpZHRoICsgaW5uZXJXaWR0aFxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgZG9jID0gdGhpcy50YXJnZXQub3duZXJEb2N1bWVudDtcbiAgICAgIHZhciB3aW4gPSBkb2MuZGVmYXVsdFZpZXc7XG5cbiAgICAgIHZhciBzY3JvbGxiYXJTaXplID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKHdpbi5pbm5lckhlaWdodCA+IGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIHNjcm9sbGJhclNpemUgPSB0aGlzLmNhY2hlKCdzY3JvbGxiYXItc2l6ZScsIGdldFNjcm9sbEJhclNpemUpO1xuICAgICAgICBuZXh0LnZpZXdwb3J0LmJvdHRvbSAtPSBzY3JvbGxiYXJTaXplLmhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbi5pbm5lcldpZHRoID4gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkge1xuICAgICAgICBzY3JvbGxiYXJTaXplID0gdGhpcy5jYWNoZSgnc2Nyb2xsYmFyLXNpemUnLCBnZXRTY3JvbGxCYXJTaXplKTtcbiAgICAgICAgbmV4dC52aWV3cG9ydC5yaWdodCAtPSBzY3JvbGxiYXJTaXplLndpZHRoO1xuICAgICAgfVxuXG4gICAgICBpZiAoWycnLCAnc3RhdGljJ10uaW5kZXhPZihkb2MuYm9keS5zdHlsZS5wb3NpdGlvbikgPT09IC0xIHx8IFsnJywgJ3N0YXRpYyddLmluZGV4T2YoZG9jLmJvZHkucGFyZW50RWxlbWVudC5zdHlsZS5wb3NpdGlvbikgPT09IC0xKSB7XG4gICAgICAgIC8vIEFic29sdXRlIHBvc2l0aW9uaW5nIGluIHRoZSBib2R5IHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhlIHBhZ2UsIG5vdCB0aGUgJ2luaXRpYWwgY29udGFpbmluZyBibG9jaydcbiAgICAgICAgbmV4dC5wYWdlLmJvdHRvbSA9IGRvYy5ib2R5LnNjcm9sbEhlaWdodCAtIHRvcCAtIGhlaWdodDtcbiAgICAgICAgbmV4dC5wYWdlLnJpZ2h0ID0gZG9jLmJvZHkuc2Nyb2xsV2lkdGggLSBsZWZ0IC0gd2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9wdGltaXphdGlvbnMgIT09ICd1bmRlZmluZWQnICYmIHRoaXMub3B0aW9ucy5vcHRpbWl6YXRpb25zLm1vdmVFbGVtZW50ICE9PSBmYWxzZSAmJiAhKHR5cGVvZiB0aGlzLnRhcmdldE1vZGlmaWVyICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50ID0gX3RoaXM3LmNhY2hlKCd0YXJnZXQtb2Zmc2V0cGFyZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE9mZnNldFBhcmVudChfdGhpczcudGFyZ2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgb2Zmc2V0UG9zaXRpb24gPSBfdGhpczcuY2FjaGUoJ3RhcmdldC1vZmZzZXRwYXJlbnQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldEJvdW5kcyhvZmZzZXRQYXJlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KTtcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50U2l6ZSA9IG9mZnNldFBvc2l0aW9uO1xuXG4gICAgICAgICAgdmFyIG9mZnNldEJvcmRlciA9IHt9O1xuICAgICAgICAgIFsnVG9wJywgJ0xlZnQnLCAnQm90dG9tJywgJ1JpZ2h0J10uZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICAgICAgb2Zmc2V0Qm9yZGVyW3NpZGUudG9Mb3dlckNhc2UoKV0gPSBwYXJzZUZsb2F0KG9mZnNldFBhcmVudFN0eWxlWydib3JkZXInICsgc2lkZSArICdXaWR0aCddKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG9mZnNldFBvc2l0aW9uLnJpZ2h0ID0gZG9jLmJvZHkuc2Nyb2xsV2lkdGggLSBvZmZzZXRQb3NpdGlvbi5sZWZ0IC0gb2Zmc2V0UGFyZW50U2l6ZS53aWR0aCArIG9mZnNldEJvcmRlci5yaWdodDtcbiAgICAgICAgICBvZmZzZXRQb3NpdGlvbi5ib3R0b20gPSBkb2MuYm9keS5zY3JvbGxIZWlnaHQgLSBvZmZzZXRQb3NpdGlvbi50b3AgLSBvZmZzZXRQYXJlbnRTaXplLmhlaWdodCArIG9mZnNldEJvcmRlci5ib3R0b207XG5cbiAgICAgICAgICBpZiAobmV4dC5wYWdlLnRvcCA+PSBvZmZzZXRQb3NpdGlvbi50b3AgKyBvZmZzZXRCb3JkZXIudG9wICYmIG5leHQucGFnZS5ib3R0b20gPj0gb2Zmc2V0UG9zaXRpb24uYm90dG9tKSB7XG4gICAgICAgICAgICBpZiAobmV4dC5wYWdlLmxlZnQgPj0gb2Zmc2V0UG9zaXRpb24ubGVmdCArIG9mZnNldEJvcmRlci5sZWZ0ICYmIG5leHQucGFnZS5yaWdodCA+PSBvZmZzZXRQb3NpdGlvbi5yaWdodCkge1xuICAgICAgICAgICAgICAvLyBXZSdyZSB3aXRoaW4gdGhlIHZpc2libGUgcGFydCBvZiB0aGUgdGFyZ2V0J3Mgc2Nyb2xsIHBhcmVudFxuICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gb2Zmc2V0UGFyZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgdmFyIHNjcm9sbExlZnQgPSBvZmZzZXRQYXJlbnQuc2Nyb2xsTGVmdDtcblxuICAgICAgICAgICAgICAvLyBJdCdzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSB0YXJnZXQncyBvZmZzZXQgcGFyZW50IChhYnNvbHV0ZSBwb3NpdGlvbmluZyB3aGVuXG4gICAgICAgICAgICAgIC8vIHRoZSBlbGVtZW50IGlzIG1vdmVkIHRvIGJlIGEgY2hpbGQgb2YgdGhlIHRhcmdldCdzIG9mZnNldCBwYXJlbnQpLlxuICAgICAgICAgICAgICBuZXh0Lm9mZnNldCA9IHtcbiAgICAgICAgICAgICAgICB0b3A6IG5leHQucGFnZS50b3AgLSBvZmZzZXRQb3NpdGlvbi50b3AgKyBzY3JvbGxUb3AgLSBvZmZzZXRCb3JkZXIudG9wLFxuICAgICAgICAgICAgICAgIGxlZnQ6IG5leHQucGFnZS5sZWZ0IC0gb2Zmc2V0UG9zaXRpb24ubGVmdCArIHNjcm9sbExlZnQgLSBvZmZzZXRCb3JkZXIubGVmdFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2UgY291bGQgYWxzbyB0cmF2ZWwgdXAgdGhlIERPTSBhbmQgdHJ5IGVhY2ggY29udGFpbmluZyBjb250ZXh0LCByYXRoZXIgdGhhbiBvbmx5XG4gICAgICAvLyBsb29raW5nIGF0IHRoZSBib2R5LCBidXQgd2UncmUgZ29ubmEgZ2V0IGRpbWluaXNoaW5nIHJldHVybnMuXG5cbiAgICAgIHRoaXMubW92ZShuZXh0KTtcblxuICAgICAgdGhpcy5oaXN0b3J5LnVuc2hpZnQobmV4dCk7XG5cbiAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gMykge1xuICAgICAgICB0aGlzLmhpc3RvcnkucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmbHVzaENoYW5nZXMpIHtcbiAgICAgICAgZmx1c2goKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gVEhFIElTU1VFXG4gIH0sIHtcbiAgICBrZXk6ICdtb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZShwb3MpIHtcbiAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICBpZiAoISh0eXBlb2YgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzYW1lID0ge307XG5cbiAgICAgIGZvciAodmFyIHR5cGUgaW4gcG9zKSB7XG4gICAgICAgIHNhbWVbdHlwZV0gPSB7fTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcG9zW3R5cGVdKSB7XG4gICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGlzdG9yeS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5oaXN0b3J5W2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludFt0eXBlXSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpdGhpbihwb2ludFt0eXBlXVtrZXldLCBwb3NbdHlwZV1ba2V5XSkpIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICBzYW1lW3R5cGVdW2tleV0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgY3NzID0geyB0b3A6ICcnLCBsZWZ0OiAnJywgcmlnaHQ6ICcnLCBib3R0b206ICcnIH07XG5cbiAgICAgIHZhciB0cmFuc2NyaWJlID0gZnVuY3Rpb24gdHJhbnNjcmliZShfc2FtZSwgX3Bvcykge1xuICAgICAgICB2YXIgaGFzT3B0aW1pemF0aW9ucyA9IHR5cGVvZiBfdGhpczgub3B0aW9ucy5vcHRpbWl6YXRpb25zICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgdmFyIGdwdSA9IGhhc09wdGltaXphdGlvbnMgPyBfdGhpczgub3B0aW9ucy5vcHRpbWl6YXRpb25zLmdwdSA6IG51bGw7XG4gICAgICAgIGlmIChncHUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdmFyIHlQb3MgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHhQb3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKF9zYW1lLnRvcCkge1xuICAgICAgICAgICAgY3NzLnRvcCA9IDA7XG4gICAgICAgICAgICB5UG9zID0gX3Bvcy50b3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNzcy5ib3R0b20gPSAwO1xuICAgICAgICAgICAgeVBvcyA9IC1fcG9zLmJvdHRvbTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX3NhbWUubGVmdCkge1xuICAgICAgICAgICAgY3NzLmxlZnQgPSAwO1xuICAgICAgICAgICAgeFBvcyA9IF9wb3MubGVmdDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3NzLnJpZ2h0ID0gMDtcbiAgICAgICAgICAgIHhQb3MgPSAtX3Bvcy5yaWdodDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcbiAgICAgICAgICAgIC8vIEh1YlNwb3QvdGV0aGVyIzIwN1xuICAgICAgICAgICAgdmFyIHJldGluYSA9IHdpbmRvdy5tYXRjaE1lZGlhKCdvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxLjNkcHB4KScpLm1hdGNoZXMgfHwgd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpJykubWF0Y2hlcztcbiAgICAgICAgICAgIGlmICghcmV0aW5hKSB7XG4gICAgICAgICAgICAgIHhQb3MgPSBNYXRoLnJvdW5kKHhQb3MpO1xuICAgICAgICAgICAgICB5UG9zID0gTWF0aC5yb3VuZCh5UG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjc3NbdHJhbnNmb3JtS2V5XSA9ICd0cmFuc2xhdGVYKCcgKyB4UG9zICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyB5UG9zICsgJ3B4KSc7XG5cbiAgICAgICAgICBpZiAodHJhbnNmb3JtS2V5ICE9PSAnbXNUcmFuc2Zvcm0nKSB7XG4gICAgICAgICAgICAvLyBUaGUgWiB0cmFuc2Zvcm0gd2lsbCBrZWVwIHRoaXMgaW4gdGhlIEdQVSAoZmFzdGVyLCBhbmQgcHJldmVudHMgYXJ0aWZhY3RzKSxcbiAgICAgICAgICAgIC8vIGJ1dCBJRTkgZG9lc24ndCBzdXBwb3J0IDNkIHRyYW5zZm9ybXMgYW5kIHdpbGwgY2hva2UuXG4gICAgICAgICAgICBjc3NbdHJhbnNmb3JtS2V5XSArPSBcIiB0cmFuc2xhdGVaKDApXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfc2FtZS50b3ApIHtcbiAgICAgICAgICAgIGNzcy50b3AgPSBfcG9zLnRvcCArICdweCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNzcy5ib3R0b20gPSBfcG9zLmJvdHRvbSArICdweCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9zYW1lLmxlZnQpIHtcbiAgICAgICAgICAgIGNzcy5sZWZ0ID0gX3Bvcy5sZWZ0ICsgJ3B4JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3NzLnJpZ2h0ID0gX3Bvcy5yaWdodCArICdweCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgbW92ZWQgPSBmYWxzZTtcbiAgICAgIGlmICgoc2FtZS5wYWdlLnRvcCB8fCBzYW1lLnBhZ2UuYm90dG9tKSAmJiAoc2FtZS5wYWdlLmxlZnQgfHwgc2FtZS5wYWdlLnJpZ2h0KSkge1xuICAgICAgICBjc3MucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0cmFuc2NyaWJlKHNhbWUucGFnZSwgcG9zLnBhZ2UpO1xuICAgICAgfSBlbHNlIGlmICgoc2FtZS52aWV3cG9ydC50b3AgfHwgc2FtZS52aWV3cG9ydC5ib3R0b20pICYmIChzYW1lLnZpZXdwb3J0LmxlZnQgfHwgc2FtZS52aWV3cG9ydC5yaWdodCkpIHtcbiAgICAgICAgY3NzLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgdHJhbnNjcmliZShzYW1lLnZpZXdwb3J0LCBwb3Mudmlld3BvcnQpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2FtZS5vZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIHNhbWUub2Zmc2V0LnRvcCAmJiBzYW1lLm9mZnNldC5sZWZ0KSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY3NzLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50ID0gX3RoaXM4LmNhY2hlKCd0YXJnZXQtb2Zmc2V0cGFyZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE9mZnNldFBhcmVudChfdGhpczgudGFyZ2V0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChnZXRPZmZzZXRQYXJlbnQoX3RoaXM4LmVsZW1lbnQpICE9PSBvZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgX3RoaXM4LmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfdGhpczguZWxlbWVudCk7XG4gICAgICAgICAgICAgIG9mZnNldFBhcmVudC5hcHBlbmRDaGlsZChfdGhpczguZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0cmFuc2NyaWJlKHNhbWUub2Zmc2V0LCBwb3Mub2Zmc2V0KTtcbiAgICAgICAgICBtb3ZlZCA9IHRydWU7XG4gICAgICAgIH0pKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjc3MucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0cmFuc2NyaWJlKHsgdG9wOiB0cnVlLCBsZWZ0OiB0cnVlIH0sIHBvcy5wYWdlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFtb3ZlZCkge1xuICAgICAgICB2YXIgb2Zmc2V0UGFyZW50SXNCb2R5ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5lbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAmJiBjdXJyZW50Tm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBjdXJyZW50Tm9kZS50YWdOYW1lICE9PSAnQk9EWScpIHtcbiAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShjdXJyZW50Tm9kZSkucG9zaXRpb24gIT09ICdzdGF0aWMnKSB7XG4gICAgICAgICAgICBvZmZzZXRQYXJlbnRJc0JvZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb2Zmc2V0UGFyZW50SXNCb2R5KSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQW55IGNzcyBjaGFuZ2Ugd2lsbCB0cmlnZ2VyIGEgcmVwYWludCwgc28gbGV0J3MgYXZvaWQgb25lIGlmIG5vdGhpbmcgY2hhbmdlZFxuICAgICAgdmFyIHdyaXRlQ1NTID0ge307XG4gICAgICB2YXIgd3JpdGUgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBjc3MpIHtcbiAgICAgICAgdmFyIHZhbCA9IGNzc1trZXldO1xuICAgICAgICB2YXIgZWxWYWwgPSB0aGlzLmVsZW1lbnQuc3R5bGVba2V5XTtcblxuICAgICAgICBpZiAoZWxWYWwgIT09IHZhbCkge1xuICAgICAgICAgIHdyaXRlID0gdHJ1ZTtcbiAgICAgICAgICB3cml0ZUNTU1trZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh3cml0ZSkge1xuICAgICAgICBkZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXh0ZW5kKF90aGlzOC5lbGVtZW50LnN0eWxlLCB3cml0ZUNTUyk7XG4gICAgICAgICAgX3RoaXM4LnRyaWdnZXIoJ3JlcG9zaXRpb25lZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGV0aGVyQ2xhc3M7XG59KShFdmVudGVkKTtcblxuVGV0aGVyQ2xhc3MubW9kdWxlcyA9IFtdO1xuXG5UZXRoZXJCYXNlLnBvc2l0aW9uID0gcG9zaXRpb247XG5cbnZhciBUZXRoZXIgPSBleHRlbmQoVGV0aGVyQ2xhc3MsIFRldGhlckJhc2UpO1xuLyogZ2xvYmFscyBUZXRoZXJCYXNlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5ID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbJ3JldHVybiddKSBfaVsncmV0dXJuJ10oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZScpOyB9IH07IH0pKCk7XG5cbnZhciBfVGV0aGVyQmFzZSRVdGlscyA9IFRldGhlckJhc2UuVXRpbHM7XG52YXIgZ2V0Qm91bmRzID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0Qm91bmRzO1xudmFyIGV4dGVuZCA9IF9UZXRoZXJCYXNlJFV0aWxzLmV4dGVuZDtcbnZhciB1cGRhdGVDbGFzc2VzID0gX1RldGhlckJhc2UkVXRpbHMudXBkYXRlQ2xhc3NlcztcbnZhciBkZWZlciA9IF9UZXRoZXJCYXNlJFV0aWxzLmRlZmVyO1xuXG52YXIgQk9VTkRTX0ZPUk1BVCA9IFsnbGVmdCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJ107XG5cbmZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdCh0ZXRoZXIsIHRvKSB7XG4gIGlmICh0byA9PT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICB0byA9IHRldGhlci5zY3JvbGxQYXJlbnRzWzBdO1xuICB9IGVsc2UgaWYgKHRvID09PSAnd2luZG93Jykge1xuICAgIHRvID0gW3BhZ2VYT2Zmc2V0LCBwYWdlWU9mZnNldCwgaW5uZXJXaWR0aCArIHBhZ2VYT2Zmc2V0LCBpbm5lckhlaWdodCArIHBhZ2VZT2Zmc2V0XTtcbiAgfVxuXG4gIGlmICh0byA9PT0gZG9jdW1lbnQpIHtcbiAgICB0byA9IHRvLmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdG8ubm9kZVR5cGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBub2RlID0gdG87XG4gICAgICB2YXIgc2l6ZSA9IGdldEJvdW5kcyh0byk7XG4gICAgICB2YXIgcG9zID0gc2l6ZTtcbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodG8pO1xuXG4gICAgICB0byA9IFtwb3MubGVmdCwgcG9zLnRvcCwgc2l6ZS53aWR0aCArIHBvcy5sZWZ0LCBzaXplLmhlaWdodCArIHBvcy50b3BdO1xuXG4gICAgICAvLyBBY2NvdW50IGFueSBwYXJlbnQgRnJhbWVzIHNjcm9sbCBvZmZzZXRcbiAgICAgIGlmIChub2RlLm93bmVyRG9jdW1lbnQgIT09IGRvY3VtZW50KSB7XG4gICAgICAgIHZhciB3aW4gPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgICAgIHRvWzBdICs9IHdpbi5wYWdlWE9mZnNldDtcbiAgICAgICAgdG9bMV0gKz0gd2luLnBhZ2VZT2Zmc2V0O1xuICAgICAgICB0b1syXSArPSB3aW4ucGFnZVhPZmZzZXQ7XG4gICAgICAgIHRvWzNdICs9IHdpbi5wYWdlWU9mZnNldDtcbiAgICAgIH1cblxuICAgICAgQk9VTkRTX0ZPUk1BVC5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlLCBpKSB7XG4gICAgICAgIHNpZGUgPSBzaWRlWzBdLnRvVXBwZXJDYXNlKCkgKyBzaWRlLnN1YnN0cigxKTtcbiAgICAgICAgaWYgKHNpZGUgPT09ICdUb3AnIHx8IHNpZGUgPT09ICdMZWZ0Jykge1xuICAgICAgICAgIHRvW2ldICs9IHBhcnNlRmxvYXQoc3R5bGVbJ2JvcmRlcicgKyBzaWRlICsgJ1dpZHRoJ10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvW2ldIC09IHBhcnNlRmxvYXQoc3R5bGVbJ2JvcmRlcicgKyBzaWRlICsgJ1dpZHRoJ10pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9XG5cbiAgcmV0dXJuIHRvO1xufVxuXG5UZXRoZXJCYXNlLm1vZHVsZXMucHVzaCh7XG4gIHBvc2l0aW9uOiBmdW5jdGlvbiBwb3NpdGlvbihfcmVmKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciB0b3AgPSBfcmVmLnRvcDtcbiAgICB2YXIgbGVmdCA9IF9yZWYubGVmdDtcbiAgICB2YXIgdGFyZ2V0QXR0YWNobWVudCA9IF9yZWYudGFyZ2V0QXR0YWNobWVudDtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnN0cmFpbnRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgX2NhY2hlID0gdGhpcy5jYWNoZSgnZWxlbWVudC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ2V0Qm91bmRzKF90aGlzLmVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgdmFyIGhlaWdodCA9IF9jYWNoZS5oZWlnaHQ7XG4gICAgdmFyIHdpZHRoID0gX2NhY2hlLndpZHRoO1xuXG4gICAgaWYgKHdpZHRoID09PSAwICYmIGhlaWdodCA9PT0gMCAmJiB0eXBlb2YgdGhpcy5sYXN0U2l6ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBfbGFzdFNpemUgPSB0aGlzLmxhc3RTaXplO1xuXG4gICAgICAvLyBIYW5kbGUgdGhlIGl0ZW0gZ2V0dGluZyBoaWRkZW4gYXMgYSByZXN1bHQgb2Ygb3VyIHBvc2l0aW9uaW5nIHdpdGhvdXQgZ2xpdGNoaW5nXG4gICAgICAvLyB0aGUgY2xhc3NlcyBpbiBhbmQgb3V0XG4gICAgICB3aWR0aCA9IF9sYXN0U2l6ZS53aWR0aDtcbiAgICAgIGhlaWdodCA9IF9sYXN0U2l6ZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldFNpemUgPSB0aGlzLmNhY2hlKCd0YXJnZXQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLmdldFRhcmdldEJvdW5kcygpO1xuICAgIH0pO1xuXG4gICAgdmFyIHRhcmdldEhlaWdodCA9IHRhcmdldFNpemUuaGVpZ2h0O1xuICAgIHZhciB0YXJnZXRXaWR0aCA9IHRhcmdldFNpemUud2lkdGg7XG5cbiAgICB2YXIgYWxsQ2xhc3NlcyA9IFt0aGlzLmdldENsYXNzKCdwaW5uZWQnKSwgdGhpcy5nZXRDbGFzcygnb3V0LW9mLWJvdW5kcycpXTtcblxuICAgIHRoaXMub3B0aW9ucy5jb25zdHJhaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICB2YXIgb3V0T2ZCb3VuZHNDbGFzcyA9IGNvbnN0cmFpbnQub3V0T2ZCb3VuZHNDbGFzcztcbiAgICAgIHZhciBwaW5uZWRDbGFzcyA9IGNvbnN0cmFpbnQucGlubmVkQ2xhc3M7XG5cbiAgICAgIGlmIChvdXRPZkJvdW5kc0NsYXNzKSB7XG4gICAgICAgIGFsbENsYXNzZXMucHVzaChvdXRPZkJvdW5kc0NsYXNzKTtcbiAgICAgIH1cbiAgICAgIGlmIChwaW5uZWRDbGFzcykge1xuICAgICAgICBhbGxDbGFzc2VzLnB1c2gocGlubmVkQ2xhc3MpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWxsQ2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICAgIFsnbGVmdCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJ10uZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICBhbGxDbGFzc2VzLnB1c2goY2xzICsgJy0nICsgc2lkZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHZhciBhZGRDbGFzc2VzID0gW107XG5cbiAgICB2YXIgdEF0dGFjaG1lbnQgPSBleHRlbmQoe30sIHRhcmdldEF0dGFjaG1lbnQpO1xuICAgIHZhciBlQXR0YWNobWVudCA9IGV4dGVuZCh7fSwgdGhpcy5hdHRhY2htZW50KTtcblxuICAgIHRoaXMub3B0aW9ucy5jb25zdHJhaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICB2YXIgdG8gPSBjb25zdHJhaW50LnRvO1xuICAgICAgdmFyIGF0dGFjaG1lbnQgPSBjb25zdHJhaW50LmF0dGFjaG1lbnQ7XG4gICAgICB2YXIgcGluID0gY29uc3RyYWludC5waW47XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0YWNobWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgYXR0YWNobWVudCA9ICcnO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hhbmdlQXR0YWNoWCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICBjaGFuZ2VBdHRhY2hZID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGF0dGFjaG1lbnQuaW5kZXhPZignICcpID49IDApIHtcbiAgICAgICAgdmFyIF9hdHRhY2htZW50JHNwbGl0ID0gYXR0YWNobWVudC5zcGxpdCgnICcpO1xuXG4gICAgICAgIHZhciBfYXR0YWNobWVudCRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfYXR0YWNobWVudCRzcGxpdCwgMik7XG5cbiAgICAgICAgY2hhbmdlQXR0YWNoWSA9IF9hdHRhY2htZW50JHNwbGl0MlswXTtcbiAgICAgICAgY2hhbmdlQXR0YWNoWCA9IF9hdHRhY2htZW50JHNwbGl0MlsxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5nZUF0dGFjaFggPSBjaGFuZ2VBdHRhY2hZID0gYXR0YWNobWVudDtcbiAgICAgIH1cblxuICAgICAgdmFyIGJvdW5kcyA9IGdldEJvdW5kaW5nUmVjdChfdGhpcywgdG8pO1xuXG4gICAgICBpZiAoY2hhbmdlQXR0YWNoWSA9PT0gJ3RhcmdldCcgfHwgY2hhbmdlQXR0YWNoWSA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmICh0b3AgPCBib3VuZHNbMV0gJiYgdEF0dGFjaG1lbnQudG9wID09PSAndG9wJykge1xuICAgICAgICAgIHRvcCArPSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdICYmIHRBdHRhY2htZW50LnRvcCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICB0b3AgLT0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hZID09PSAndG9nZXRoZXInKSB7XG4gICAgICAgIGlmICh0QXR0YWNobWVudC50b3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LnRvcCA9PT0gJ2JvdHRvbScgJiYgdG9wIDwgYm91bmRzWzFdKSB7XG4gICAgICAgICAgICB0b3AgKz0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG5cbiAgICAgICAgICAgIHRvcCArPSBoZWlnaHQ7XG4gICAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAndG9wJztcbiAgICAgICAgICB9IGVsc2UgaWYgKGVBdHRhY2htZW50LnRvcCA9PT0gJ3RvcCcgJiYgdG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdICYmIHRvcCAtIChoZWlnaHQgLSB0YXJnZXRIZWlnaHQpID49IGJvdW5kc1sxXSkge1xuICAgICAgICAgICAgdG9wIC09IGhlaWdodCAtIHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuXG4gICAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAnYm90dG9tJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodEF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJykge1xuICAgICAgICAgIGlmIChlQXR0YWNobWVudC50b3AgPT09ICd0b3AnICYmIHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSkge1xuICAgICAgICAgICAgdG9wIC09IHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuXG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC50b3AgPT09ICdib3R0b20nICYmIHRvcCA8IGJvdW5kc1sxXSAmJiB0b3AgKyAoaGVpZ2h0ICogMiAtIHRhcmdldEhlaWdodCkgPD0gYm91bmRzWzNdKSB7XG4gICAgICAgICAgICB0b3AgKz0gaGVpZ2h0IC0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG5cbiAgICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0QXR0YWNobWVudC50b3AgPT09ICdtaWRkbGUnKSB7XG4gICAgICAgICAgaWYgKHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSAmJiBlQXR0YWNobWVudC50b3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG4gICAgICAgICAgfSBlbHNlIGlmICh0b3AgPCBib3VuZHNbMV0gJiYgZUF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlQXR0YWNoWCA9PT0gJ3RhcmdldCcgfHwgY2hhbmdlQXR0YWNoWCA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmIChsZWZ0IDwgYm91bmRzWzBdICYmIHRBdHRhY2htZW50LmxlZnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgIGxlZnQgKz0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgdEF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGVmdCArIHdpZHRoID4gYm91bmRzWzJdICYmIHRBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBsZWZ0IC09IHRhcmdldFdpZHRoO1xuICAgICAgICAgIHRBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZUF0dGFjaFggPT09ICd0b2dldGhlcicpIHtcbiAgICAgICAgaWYgKGxlZnQgPCBib3VuZHNbMF0gJiYgdEF0dGFjaG1lbnQubGVmdCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcblxuICAgICAgICAgICAgbGVmdCArPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcblxuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChsZWZ0ICsgd2lkdGggPiBib3VuZHNbMl0gJiYgdEF0dGFjaG1lbnQubGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuXG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBsZWZ0IC09IHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcblxuICAgICAgICAgICAgbGVmdCArPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRBdHRhY2htZW50LmxlZnQgPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgaWYgKGxlZnQgKyB3aWR0aCA+IGJvdW5kc1syXSAmJiBlQXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQgPCBib3VuZHNbMF0gJiYgZUF0dGFjaG1lbnQubGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgbGVmdCArPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hZID09PSAnZWxlbWVudCcgfHwgY2hhbmdlQXR0YWNoWSA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmICh0b3AgPCBib3VuZHNbMV0gJiYgZUF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJykge1xuICAgICAgICAgIHRvcCArPSBoZWlnaHQ7XG4gICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9wICsgaGVpZ2h0ID4gYm91bmRzWzNdICYmIGVBdHRhY2htZW50LnRvcCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hYID09PSAnZWxlbWVudCcgfHwgY2hhbmdlQXR0YWNoWCA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmIChsZWZ0IDwgYm91bmRzWzBdKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGggLyAyO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGVmdCArIHdpZHRoID4gYm91bmRzWzJdKSB7XG4gICAgICAgICAgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGggLyAyO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcGluID09PSAnc3RyaW5nJykge1xuICAgICAgICBwaW4gPSBwaW4uc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICByZXR1cm4gcC50cmltKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChwaW4gPT09IHRydWUpIHtcbiAgICAgICAgcGluID0gWyd0b3AnLCAnbGVmdCcsICdyaWdodCcsICdib3R0b20nXTtcbiAgICAgIH1cblxuICAgICAgcGluID0gcGluIHx8IFtdO1xuXG4gICAgICB2YXIgcGlubmVkID0gW107XG4gICAgICB2YXIgb29iID0gW107XG5cbiAgICAgIGlmICh0b3AgPCBib3VuZHNbMV0pIHtcbiAgICAgICAgaWYgKHBpbi5pbmRleE9mKCd0b3AnKSA+PSAwKSB7XG4gICAgICAgICAgdG9wID0gYm91bmRzWzFdO1xuICAgICAgICAgIHBpbm5lZC5wdXNoKCd0b3AnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvb2IucHVzaCgndG9wJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSkge1xuICAgICAgICBpZiAocGluLmluZGV4T2YoJ2JvdHRvbScpID49IDApIHtcbiAgICAgICAgICB0b3AgPSBib3VuZHNbM10gLSBoZWlnaHQ7XG4gICAgICAgICAgcGlubmVkLnB1c2goJ2JvdHRvbScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9vYi5wdXNoKCdib3R0b20nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobGVmdCA8IGJvdW5kc1swXSkge1xuICAgICAgICBpZiAocGluLmluZGV4T2YoJ2xlZnQnKSA+PSAwKSB7XG4gICAgICAgICAgbGVmdCA9IGJvdW5kc1swXTtcbiAgICAgICAgICBwaW5uZWQucHVzaCgnbGVmdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9vYi5wdXNoKCdsZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxlZnQgKyB3aWR0aCA+IGJvdW5kc1syXSkge1xuICAgICAgICBpZiAocGluLmluZGV4T2YoJ3JpZ2h0JykgPj0gMCkge1xuICAgICAgICAgIGxlZnQgPSBib3VuZHNbMl0gLSB3aWR0aDtcbiAgICAgICAgICBwaW5uZWQucHVzaCgncmlnaHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvb2IucHVzaCgncmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGlubmVkLmxlbmd0aCkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBwaW5uZWRDbGFzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLm9wdGlvbnMucGlubmVkQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwaW5uZWRDbGFzcyA9IF90aGlzLm9wdGlvbnMucGlubmVkQ2xhc3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBpbm5lZENsYXNzID0gX3RoaXMuZ2V0Q2xhc3MoJ3Bpbm5lZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFkZENsYXNzZXMucHVzaChwaW5uZWRDbGFzcyk7XG4gICAgICAgICAgcGlubmVkLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXMucHVzaChwaW5uZWRDbGFzcyArICctJyArIHNpZGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob29iLmxlbmd0aCkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBvb2JDbGFzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLm9wdGlvbnMub3V0T2ZCb3VuZHNDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9vYkNsYXNzID0gX3RoaXMub3B0aW9ucy5vdXRPZkJvdW5kc0NsYXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvb2JDbGFzcyA9IF90aGlzLmdldENsYXNzKCdvdXQtb2YtYm91bmRzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYWRkQ2xhc3Nlcy5wdXNoKG9vYkNsYXNzKTtcbiAgICAgICAgICBvb2IuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcy5wdXNoKG9vYkNsYXNzICsgJy0nICsgc2lkZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwaW5uZWQuaW5kZXhPZignbGVmdCcpID49IDAgfHwgcGlubmVkLmluZGV4T2YoJ3JpZ2h0JykgPj0gMCkge1xuICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gdEF0dGFjaG1lbnQubGVmdCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHBpbm5lZC5pbmRleE9mKCd0b3AnKSA+PSAwIHx8IHBpbm5lZC5pbmRleE9mKCdib3R0b20nKSA+PSAwKSB7XG4gICAgICAgIGVBdHRhY2htZW50LnRvcCA9IHRBdHRhY2htZW50LnRvcCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodEF0dGFjaG1lbnQudG9wICE9PSB0YXJnZXRBdHRhY2htZW50LnRvcCB8fCB0QXR0YWNobWVudC5sZWZ0ICE9PSB0YXJnZXRBdHRhY2htZW50LmxlZnQgfHwgZUF0dGFjaG1lbnQudG9wICE9PSBfdGhpcy5hdHRhY2htZW50LnRvcCB8fCBlQXR0YWNobWVudC5sZWZ0ICE9PSBfdGhpcy5hdHRhY2htZW50LmxlZnQpIHtcbiAgICAgICAgX3RoaXMudXBkYXRlQXR0YWNoQ2xhc3NlcyhlQXR0YWNobWVudCwgdEF0dGFjaG1lbnQpO1xuICAgICAgICBfdGhpcy50cmlnZ2VyKCd1cGRhdGUnLCB7XG4gICAgICAgICAgYXR0YWNobWVudDogZUF0dGFjaG1lbnQsXG4gICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogdEF0dGFjaG1lbnRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShfdGhpcy5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICB1cGRhdGVDbGFzc2VzKF90aGlzLnRhcmdldCwgYWRkQ2xhc3NlcywgYWxsQ2xhc3Nlcyk7XG4gICAgICB9XG4gICAgICB1cGRhdGVDbGFzc2VzKF90aGlzLmVsZW1lbnQsIGFkZENsYXNzZXMsIGFsbENsYXNzZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbiAgfVxufSk7XG4vKiBnbG9iYWxzIFRldGhlckJhc2UgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX1RldGhlckJhc2UkVXRpbHMgPSBUZXRoZXJCYXNlLlV0aWxzO1xudmFyIGdldEJvdW5kcyA9IF9UZXRoZXJCYXNlJFV0aWxzLmdldEJvdW5kcztcbnZhciB1cGRhdGVDbGFzc2VzID0gX1RldGhlckJhc2UkVXRpbHMudXBkYXRlQ2xhc3NlcztcbnZhciBkZWZlciA9IF9UZXRoZXJCYXNlJFV0aWxzLmRlZmVyO1xuXG5UZXRoZXJCYXNlLm1vZHVsZXMucHVzaCh7XG4gIHBvc2l0aW9uOiBmdW5jdGlvbiBwb3NpdGlvbihfcmVmKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciB0b3AgPSBfcmVmLnRvcDtcbiAgICB2YXIgbGVmdCA9IF9yZWYubGVmdDtcblxuICAgIHZhciBfY2FjaGUgPSB0aGlzLmNhY2hlKCdlbGVtZW50LWJvdW5kcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRCb3VuZHMoX3RoaXMuZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICB2YXIgaGVpZ2h0ID0gX2NhY2hlLmhlaWdodDtcbiAgICB2YXIgd2lkdGggPSBfY2FjaGUud2lkdGg7XG5cbiAgICB2YXIgdGFyZ2V0UG9zID0gdGhpcy5nZXRUYXJnZXRCb3VuZHMoKTtcblxuICAgIHZhciBib3R0b20gPSB0b3AgKyBoZWlnaHQ7XG4gICAgdmFyIHJpZ2h0ID0gbGVmdCArIHdpZHRoO1xuXG4gICAgdmFyIGFidXR0ZWQgPSBbXTtcbiAgICBpZiAodG9wIDw9IHRhcmdldFBvcy5ib3R0b20gJiYgYm90dG9tID49IHRhcmdldFBvcy50b3ApIHtcbiAgICAgIFsnbGVmdCcsICdyaWdodCddLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgdmFyIHRhcmdldFBvc1NpZGUgPSB0YXJnZXRQb3Nbc2lkZV07XG4gICAgICAgIGlmICh0YXJnZXRQb3NTaWRlID09PSBsZWZ0IHx8IHRhcmdldFBvc1NpZGUgPT09IHJpZ2h0KSB7XG4gICAgICAgICAgYWJ1dHRlZC5wdXNoKHNpZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobGVmdCA8PSB0YXJnZXRQb3MucmlnaHQgJiYgcmlnaHQgPj0gdGFyZ2V0UG9zLmxlZnQpIHtcbiAgICAgIFsndG9wJywgJ2JvdHRvbSddLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgdmFyIHRhcmdldFBvc1NpZGUgPSB0YXJnZXRQb3Nbc2lkZV07XG4gICAgICAgIGlmICh0YXJnZXRQb3NTaWRlID09PSB0b3AgfHwgdGFyZ2V0UG9zU2lkZSA9PT0gYm90dG9tKSB7XG4gICAgICAgICAgYWJ1dHRlZC5wdXNoKHNpZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgYWxsQ2xhc3NlcyA9IFtdO1xuICAgIHZhciBhZGRDbGFzc2VzID0gW107XG5cbiAgICB2YXIgc2lkZXMgPSBbJ2xlZnQnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbSddO1xuICAgIGFsbENsYXNzZXMucHVzaCh0aGlzLmdldENsYXNzKCdhYnV0dGVkJykpO1xuICAgIHNpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgIGFsbENsYXNzZXMucHVzaChfdGhpcy5nZXRDbGFzcygnYWJ1dHRlZCcpICsgJy0nICsgc2lkZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoYWJ1dHRlZC5sZW5ndGgpIHtcbiAgICAgIGFkZENsYXNzZXMucHVzaCh0aGlzLmdldENsYXNzKCdhYnV0dGVkJykpO1xuICAgIH1cblxuICAgIGFidXR0ZWQuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgYWRkQ2xhc3Nlcy5wdXNoKF90aGlzLmdldENsYXNzKCdhYnV0dGVkJykgKyAnLScgKyBzaWRlKTtcbiAgICB9KTtcblxuICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghKF90aGlzLm9wdGlvbnMuYWRkVGFyZ2V0Q2xhc3NlcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXMudGFyZ2V0LCBhZGRDbGFzc2VzLCBhbGxDbGFzc2VzKTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXMuZWxlbWVudCwgYWRkQ2xhc3NlcywgYWxsQ2xhc3Nlcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSk7XG4vKiBnbG9iYWxzIFRldGhlckJhc2UgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlJyk7IH0gfTsgfSkoKTtcblxuVGV0aGVyQmFzZS5tb2R1bGVzLnB1c2goe1xuICBwb3NpdGlvbjogZnVuY3Rpb24gcG9zaXRpb24oX3JlZikge1xuICAgIHZhciB0b3AgPSBfcmVmLnRvcDtcbiAgICB2YXIgbGVmdCA9IF9yZWYubGVmdDtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLnNoaWZ0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNoaWZ0ID0gdGhpcy5vcHRpb25zLnNoaWZ0O1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNoaWZ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzaGlmdCA9IHRoaXMub3B0aW9ucy5zaGlmdC5jYWxsKHRoaXMsIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfSk7XG4gICAgfVxuXG4gICAgdmFyIHNoaWZ0VG9wID0gdW5kZWZpbmVkLFxuICAgICAgICBzaGlmdExlZnQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHR5cGVvZiBzaGlmdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHNoaWZ0ID0gc2hpZnQuc3BsaXQoJyAnKTtcbiAgICAgIHNoaWZ0WzFdID0gc2hpZnRbMV0gfHwgc2hpZnRbMF07XG5cbiAgICAgIHZhciBfc2hpZnQgPSBzaGlmdDtcblxuICAgICAgdmFyIF9zaGlmdDIgPSBfc2xpY2VkVG9BcnJheShfc2hpZnQsIDIpO1xuXG4gICAgICBzaGlmdFRvcCA9IF9zaGlmdDJbMF07XG4gICAgICBzaGlmdExlZnQgPSBfc2hpZnQyWzFdO1xuXG4gICAgICBzaGlmdFRvcCA9IHBhcnNlRmxvYXQoc2hpZnRUb3AsIDEwKTtcbiAgICAgIHNoaWZ0TGVmdCA9IHBhcnNlRmxvYXQoc2hpZnRMZWZ0LCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNoaWZ0VG9wID0gc2hpZnQudG9wO1xuICAgICAgc2hpZnRMZWZ0ID0gc2hpZnQubGVmdDtcbiAgICB9XG5cbiAgICB0b3AgKz0gc2hpZnRUb3A7XG4gICAgbGVmdCArPSBzaGlmdExlZnQ7XG5cbiAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xuICB9XG59KTtcbnJldHVybiBUZXRoZXI7XG5cbn0pKTtcbiIsImRlZmluZSgnbnBtOnBkZm9iamVjdCcsIGZ1bmN0aW9uKCl7IHJldHVybiB7ICdkZWZhdWx0JzogcmVxdWlyZSgncGRmb2JqZWN0Jyl9O30pXG5kZWZpbmUoJ25wbTp0ZXRoZXItZHJvcCcsIGZ1bmN0aW9uKCl7IHJldHVybiB7ICdkZWZhdWx0JzogcmVxdWlyZSgndGV0aGVyLWRyb3AnKX07fSkiXX0=
