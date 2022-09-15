(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__8EBC8F6",
    appName: "uni-nav-bar 自定义导航栏示例",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.2",
    uniRuntimeVersion: "3.6.2",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__8EBC8F6",
      appName: "uni-nav-bar 自定义导航栏示例",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);

  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initUnknownHooks(mpOptions, vueOptions) {var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {return initHook$1(mpOptions, hook, excludes);});
}

function findHooks(vueOptions) {var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}

function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"uni-nav-bar 自定义导航栏示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ?
  event.detail.__args__ || [event.detail] :
  [event.detail];

  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }

  var extraObj = processEventExtra(vm, extra, event, __args__);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);
  initUnknownHooks(pageOptions.methods, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 12:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"uni-nav-bar 自定义导航栏示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"uni-nav-bar 自定义导航栏示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"uni-nav-bar 自定义导航栏示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"uni-nav-bar 自定义导航栏示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        triggerEvent.call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        });
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 49:
/*!*********************************************************************************************!*\
  !*** D:/reference/uni-nav-bar 自定义导航栏示例/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },
  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },
  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ }),

/***/ 5:
/*!****************************************************!*\
  !*** D:/reference/uni-nav-bar 自定义导航栏示例/pages.json ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 6:
/*!*****************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-push/dist/uni-push.es.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function _get(target, property, receiver) {if (typeof Reflect !== "undefined" && Reflect.get) {_get = Reflect.get;} else {_get = function _get(target, property, receiver) {var base = _superPropBase(target, property);if (!base) return;var desc = Object.getOwnPropertyDescriptor(base, property);if (desc.get) {return desc.get.call(receiver);}return desc.value;};}return _get(target, property, receiver || target);}function _superPropBase(object, property) {while (!Object.prototype.hasOwnProperty.call(object, property)) {object = _getPrototypeOf(object);if (object === null) break;}return object;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
  return fn(module, module.exports), module.exports;
}

/*! For license information please see gtpush-min.js.LICENSE.txt */

var gtpushMin = createCommonjsModule(function (module, exports) {
  (function t(e, r) {module.exports = r();})(self, function () {return function () {var t = { 4736: function _(t, e, r) {t = r.nmd(t);var i;var n = function (t) {var e = 1e7,r = 7,i = 9007199254740992,s = d(i),a = "0123456789abcdefghijklmnopqrstuvwxyz";var o = "function" === typeof BigInt;function u(t, e, r, i) {if ("undefined" === typeof t) return u[0];if ("undefined" !== typeof e) return 10 === +e && !r ? st(t) : X(t, e, r, i);return st(t);}function c(t, e) {this.value = t;this.sign = e;this.isSmall = false;}c.prototype = Object.create(u.prototype);function l(t) {this.value = t;this.sign = t < 0;this.isSmall = true;}l.prototype = Object.create(u.prototype);function f(t) {this.value = t;}f.prototype = Object.create(u.prototype);function h(t) {return -i < t && t < i;}function d(t) {if (t < 1e7) return [t];if (t < 1e14) return [t % 1e7, Math.floor(t / 1e7)];return [t % 1e7, Math.floor(t / 1e7) % 1e7, Math.floor(t / 1e14)];}function p(t) {v(t);var r = t.length;if (r < 4 && N(t, s) < 0) switch (r) {case 0:return 0;case 1:return t[0];case 2:return t[0] + t[1] * e;default:return t[0] + (t[1] + t[2] * e) * e;}return t;}function v(t) {var e = t.length;while (0 === t[--e]) {;}t.length = e + 1;}function g(t) {var e = new Array(t);var r = -1;while (++r < t) {e[r] = 0;}return e;}function y(t) {if (t > 0) return Math.floor(t);return Math.ceil(t);}function m(t, r) {var i = t.length,n = r.length,s = new Array(i),a = 0,o = e,u,c;for (c = 0; c < n; c++) {u = t[c] + r[c] + a;a = u >= o ? 1 : 0;s[c] = u - a * o;}while (c < i) {u = t[c] + a;a = u === o ? 1 : 0;s[c++] = u - a * o;}if (a > 0) s.push(a);return s;}function w(t, e) {if (t.length >= e.length) return m(t, e);return m(e, t);}function S(t, r) {var i = t.length,n = new Array(i),s = e,a,o;for (o = 0; o < i; o++) {a = t[o] - s + r;r = Math.floor(a / s);n[o] = a - r * s;r += 1;}while (r > 0) {n[o++] = r % s;r = Math.floor(r / s);}return n;}c.prototype.add = function (t) {var e = st(t);if (this.sign !== e.sign) return this.subtract(e.negate());var r = this.value,i = e.value;if (e.isSmall) return new c(S(r, Math.abs(i)), this.sign);return new c(w(r, i), this.sign);};c.prototype.plus = c.prototype.add;l.prototype.add = function (t) {var e = st(t);var r = this.value;if (r < 0 !== e.sign) return this.subtract(e.negate());var i = e.value;if (e.isSmall) {if (h(r + i)) return new l(r + i);i = d(Math.abs(i));}return new c(S(i, Math.abs(r)), r < 0);};l.prototype.plus = l.prototype.add;f.prototype.add = function (t) {return new f(this.value + st(t).value);};f.prototype.plus = f.prototype.add;function _(t, r) {var i = t.length,n = r.length,s = new Array(i),a = 0,o = e,u,c;for (u = 0; u < n; u++) {c = t[u] - a - r[u];if (c < 0) {c += o;a = 1;} else a = 0;s[u] = c;}for (u = n; u < i; u++) {c = t[u] - a;if (c < 0) c += o;else {s[u++] = c;break;}s[u] = c;}for (; u < i; u++) {s[u] = t[u];}v(s);return s;}function b(t, e, r) {var i;if (N(t, e) >= 0) i = _(t, e);else {i = _(e, t);r = !r;}i = p(i);if ("number" === typeof i) {if (r) i = -i;return new l(i);}return new c(i, r);}function E(t, r, i) {var n = t.length,s = new Array(n),a = -r,o = e,u,f;for (u = 0; u < n; u++) {f = t[u] + a;a = Math.floor(f / o);f %= o;s[u] = f < 0 ? f + o : f;}s = p(s);if ("number" === typeof s) {if (i) s = -s;return new l(s);}return new c(s, i);}c.prototype.subtract = function (t) {var e = st(t);if (this.sign !== e.sign) return this.add(e.negate());var r = this.value,i = e.value;if (e.isSmall) return E(r, Math.abs(i), this.sign);return b(r, i, this.sign);};c.prototype.minus = c.prototype.subtract;l.prototype.subtract = function (t) {var e = st(t);var r = this.value;if (r < 0 !== e.sign) return this.add(e.negate());var i = e.value;if (e.isSmall) return new l(r - i);return E(i, Math.abs(r), r >= 0);};l.prototype.minus = l.prototype.subtract;f.prototype.subtract = function (t) {return new f(this.value - st(t).value);};f.prototype.minus = f.prototype.subtract;c.prototype.negate = function () {return new c(this.value, !this.sign);};l.prototype.negate = function () {var t = this.sign;var e = new l(-this.value);e.sign = !t;return e;};f.prototype.negate = function () {return new f(-this.value);};c.prototype.abs = function () {return new c(this.value, false);};l.prototype.abs = function () {return new l(Math.abs(this.value));};f.prototype.abs = function () {return new f(this.value >= 0 ? this.value : -this.value);};function D(t, r) {var i = t.length,n = r.length,s = i + n,a = g(s),o = e,u,c,l,f,h;for (l = 0; l < i; ++l) {f = t[l];for (var d = 0; d < n; ++d) {h = r[d];u = f * h + a[l + d];c = Math.floor(u / o);a[l + d] = u - c * o;a[l + d + 1] += c;}}v(a);return a;}function M(t, r) {var i = t.length,n = new Array(i),s = e,a = 0,o,u;for (u = 0; u < i; u++) {o = t[u] * r + a;a = Math.floor(o / s);n[u] = o - a * s;}while (a > 0) {n[u++] = a % s;a = Math.floor(a / s);}return n;}function T(t, e) {var r = [];while (e-- > 0) {r.push(0);}return r.concat(t);}function I(t, e) {var r = Math.max(t.length, e.length);if (r <= 30) return D(t, e);r = Math.ceil(r / 2);var i = t.slice(r),n = t.slice(0, r),s = e.slice(r),a = e.slice(0, r);var o = I(n, a),u = I(i, s),c = I(w(n, i), w(a, s));var l = w(w(o, T(_(_(c, o), u), r)), T(u, 2 * r));v(l);return l;}function A(t, e) {return -.012 * t - .012 * e + 15e-6 * t * e > 0;}c.prototype.multiply = function (t) {var r = st(t),i = this.value,n = r.value,s = this.sign !== r.sign,a;if (r.isSmall) {if (0 === n) return u[0];if (1 === n) return this;if (-1 === n) return this.negate();a = Math.abs(n);if (a < e) return new c(M(i, a), s);n = d(a);}if (A(i.length, n.length)) return new c(I(i, n), s);return new c(D(i, n), s);};c.prototype.times = c.prototype.multiply;function x(t, r, i) {if (t < e) return new c(M(r, t), i);return new c(D(r, d(t)), i);}l.prototype._multiplyBySmall = function (t) {if (h(t.value * this.value)) return new l(t.value * this.value);return x(Math.abs(t.value), d(Math.abs(this.value)), this.sign !== t.sign);};c.prototype._multiplyBySmall = function (t) {if (0 === t.value) return u[0];if (1 === t.value) return this;if (-1 === t.value) return this.negate();return x(Math.abs(t.value), this.value, this.sign !== t.sign);};l.prototype.multiply = function (t) {return st(t)._multiplyBySmall(this);};l.prototype.times = l.prototype.multiply;f.prototype.multiply = function (t) {return new f(this.value * st(t).value);};f.prototype.times = f.prototype.multiply;function R(t) {var r = t.length,i = g(r + r),n = e,s,a,o,u,c;for (o = 0; o < r; o++) {u = t[o];a = 0 - u * u;for (var l = o; l < r; l++) {c = t[l];s = 2 * (u * c) + i[o + l] + a;a = Math.floor(s / n);i[o + l] = s - a * n;}i[o + r] = a;}v(i);return i;}c.prototype.square = function () {return new c(R(this.value), false);};l.prototype.square = function () {var t = this.value * this.value;if (h(t)) return new l(t);return new c(R(d(Math.abs(this.value))), false);};f.prototype.square = function (t) {return new f(this.value * this.value);};function B(t, r) {var i = t.length,n = r.length,s = e,a = g(r.length),o = r[n - 1],u = Math.ceil(s / (2 * o)),c = M(t, u),l = M(r, u),f,h,d,v,y,m,w;if (c.length <= i) c.push(0);l.push(0);o = l[n - 1];for (h = i - n; h >= 0; h--) {f = s - 1;if (c[h + n] !== o) f = Math.floor((c[h + n] * s + c[h + n - 1]) / o);d = 0;v = 0;m = l.length;for (y = 0; y < m; y++) {d += f * l[y];w = Math.floor(d / s);v += c[h + y] - (d - w * s);d = w;if (v < 0) {c[h + y] = v + s;v = -1;} else {c[h + y] = v;v = 0;}}while (0 !== v) {f -= 1;d = 0;for (y = 0; y < m; y++) {d += c[h + y] - s + l[y];if (d < 0) {c[h + y] = d + s;d = 0;} else {c[h + y] = d;d = 1;}}v += d;}a[h] = f;}c = k(c, u)[0];return [p(a), p(c)];}function O(t, r) {var i = t.length,n = r.length,s = [],a = [],o = e,u,c,l,f,h;while (i) {a.unshift(t[--i]);v(a);if (N(a, r) < 0) {s.push(0);continue;}c = a.length;l = a[c - 1] * o + a[c - 2];f = r[n - 1] * o + r[n - 2];if (c > n) l = (l + 1) * o;u = Math.ceil(l / f);do {h = M(r, u);if (N(h, a) <= 0) break;u--;} while (u);s.push(u);a = _(a, h);}s.reverse();return [p(s), p(a)];}function k(t, r) {var i = t.length,n = g(i),s = e,a,o,u,c;u = 0;for (a = i - 1; a >= 0; --a) {c = u * s + t[a];o = y(c / r);u = c - o * r;n[a] = 0 | o;}return [n, 0 | u];}function C(t, r) {var i,n = st(r);if (o) return [new f(t.value / n.value), new f(t.value % n.value)];var s = t.value,a = n.value;var h;if (0 === a) throw new Error("Cannot divide by zero");if (t.isSmall) {if (n.isSmall) return [new l(y(s / a)), new l(s % a)];return [u[0], t];}if (n.isSmall) {if (1 === a) return [t, u[0]];if (-1 == a) return [t.negate(), u[0]];var v = Math.abs(a);if (v < e) {i = k(s, v);h = p(i[0]);var g = i[1];if (t.sign) g = -g;if ("number" === typeof h) {if (t.sign !== n.sign) h = -h;return [new l(h), new l(g)];}return [new c(h, t.sign !== n.sign), new l(g)];}a = d(v);}var m = N(s, a);if (-1 === m) return [u[0], t];if (0 === m) return [u[t.sign === n.sign ? 1 : -1], u[0]];if (s.length + a.length <= 200) i = B(s, a);else i = O(s, a);h = i[0];var w = t.sign !== n.sign,S = i[1],_ = t.sign;if ("number" === typeof h) {if (w) h = -h;h = new l(h);} else h = new c(h, w);if ("number" === typeof S) {if (_) S = -S;S = new l(S);} else S = new c(S, _);return [h, S];}c.prototype.divmod = function (t) {var e = C(this, t);return { quotient: e[0], remainder: e[1] };};f.prototype.divmod = l.prototype.divmod = c.prototype.divmod;c.prototype.divide = function (t) {return C(this, t)[0];};f.prototype.over = f.prototype.divide = function (t) {return new f(this.value / st(t).value);};l.prototype.over = l.prototype.divide = c.prototype.over = c.prototype.divide;c.prototype.mod = function (t) {return C(this, t)[1];};f.prototype.mod = f.prototype.remainder = function (t) {return new f(this.value % st(t).value);};l.prototype.remainder = l.prototype.mod = c.prototype.remainder = c.prototype.mod;c.prototype.pow = function (t) {var e = st(t),r = this.value,i = e.value,n,s,a;if (0 === i) return u[1];if (0 === r) return u[0];if (1 === r) return u[1];if (-1 === r) return e.isEven() ? u[1] : u[-1];if (e.sign) return u[0];if (!e.isSmall) throw new Error("The exponent " + e.toString() + " is too large.");if (this.isSmall) if (h(n = Math.pow(r, i))) return new l(y(n));s = this;a = u[1];while (true) {if (i & 1 === 1) {a = a.times(s);--i;}if (0 === i) break;i /= 2;s = s.square();}return a;};l.prototype.pow = c.prototype.pow;f.prototype.pow = function (t) {var e = st(t);var r = this.value,i = e.value;var n = BigInt(0),s = BigInt(1),a = BigInt(2);if (i === n) return u[1];if (r === n) return u[0];if (r === s) return u[1];if (r === BigInt(-1)) return e.isEven() ? u[1] : u[-1];if (e.isNegative()) return new f(n);var o = this;var c = u[1];while (true) {if ((i & s) === s) {c = c.times(o);--i;}if (i === n) break;i /= a;o = o.square();}return c;};c.prototype.modPow = function (t, e) {t = st(t);e = st(e);if (e.isZero()) throw new Error("Cannot take modPow with modulus 0");var r = u[1],i = this.mod(e);if (t.isNegative()) {t = t.multiply(u[-1]);i = i.modInv(e);}while (t.isPositive()) {if (i.isZero()) return u[0];if (t.isOdd()) r = r.multiply(i).mod(e);t = t.divide(2);i = i.square().mod(e);}return r;};f.prototype.modPow = l.prototype.modPow = c.prototype.modPow;function N(t, e) {if (t.length !== e.length) return t.length > e.length ? 1 : -1;for (var r = t.length - 1; r >= 0; r--) {if (t[r] !== e[r]) return t[r] > e[r] ? 1 : -1;}return 0;}c.prototype.compareAbs = function (t) {var e = st(t),r = this.value,i = e.value;if (e.isSmall) return 1;return N(r, i);};l.prototype.compareAbs = function (t) {var e = st(t),r = Math.abs(this.value),i = e.value;if (e.isSmall) {i = Math.abs(i);return r === i ? 0 : r > i ? 1 : -1;}return -1;};f.prototype.compareAbs = function (t) {var e = this.value;var r = st(t).value;e = e >= 0 ? e : -e;r = r >= 0 ? r : -r;return e === r ? 0 : e > r ? 1 : -1;};c.prototype.compare = function (t) {if (t === 1 / 0) return -1;if (t === -1 / 0) return 1;var e = st(t),r = this.value,i = e.value;if (this.sign !== e.sign) return e.sign ? 1 : -1;if (e.isSmall) return this.sign ? -1 : 1;return N(r, i) * (this.sign ? -1 : 1);};c.prototype.compareTo = c.prototype.compare;l.prototype.compare = function (t) {if (t === 1 / 0) return -1;if (t === -1 / 0) return 1;var e = st(t),r = this.value,i = e.value;if (e.isSmall) return r == i ? 0 : r > i ? 1 : -1;if (r < 0 !== e.sign) return r < 0 ? -1 : 1;return r < 0 ? 1 : -1;};l.prototype.compareTo = l.prototype.compare;f.prototype.compare = function (t) {if (t === 1 / 0) return -1;if (t === -1 / 0) return 1;var e = this.value;var r = st(t).value;return e === r ? 0 : e > r ? 1 : -1;};f.prototype.compareTo = f.prototype.compare;c.prototype.equals = function (t) {return 0 === this.compare(t);};f.prototype.eq = f.prototype.equals = l.prototype.eq = l.prototype.equals = c.prototype.eq = c.prototype.equals;c.prototype.notEquals = function (t) {return 0 !== this.compare(t);};f.prototype.neq = f.prototype.notEquals = l.prototype.neq = l.prototype.notEquals = c.prototype.neq = c.prototype.notEquals;c.prototype.greater = function (t) {return this.compare(t) > 0;};f.prototype.gt = f.prototype.greater = l.prototype.gt = l.prototype.greater = c.prototype.gt = c.prototype.greater;c.prototype.lesser = function (t) {return this.compare(t) < 0;};f.prototype.lt = f.prototype.lesser = l.prototype.lt = l.prototype.lesser = c.prototype.lt = c.prototype.lesser;c.prototype.greaterOrEquals = function (t) {return this.compare(t) >= 0;};f.prototype.geq = f.prototype.greaterOrEquals = l.prototype.geq = l.prototype.greaterOrEquals = c.prototype.geq = c.prototype.greaterOrEquals;c.prototype.lesserOrEquals = function (t) {return this.compare(t) <= 0;};f.prototype.leq = f.prototype.lesserOrEquals = l.prototype.leq = l.prototype.lesserOrEquals = c.prototype.leq = c.prototype.lesserOrEquals;c.prototype.isEven = function () {return 0 === (1 & this.value[0]);};l.prototype.isEven = function () {return 0 === (1 & this.value);};f.prototype.isEven = function () {return (this.value & BigInt(1)) === BigInt(0);};c.prototype.isOdd = function () {return 1 === (1 & this.value[0]);};l.prototype.isOdd = function () {return 1 === (1 & this.value);};f.prototype.isOdd = function () {return (this.value & BigInt(1)) === BigInt(1);};c.prototype.isPositive = function () {return !this.sign;};l.prototype.isPositive = function () {return this.value > 0;};f.prototype.isPositive = l.prototype.isPositive;c.prototype.isNegative = function () {return this.sign;};l.prototype.isNegative = function () {return this.value < 0;};f.prototype.isNegative = l.prototype.isNegative;c.prototype.isUnit = function () {return false;};l.prototype.isUnit = function () {return 1 === Math.abs(this.value);};f.prototype.isUnit = function () {return this.abs().value === BigInt(1);};c.prototype.isZero = function () {return false;};l.prototype.isZero = function () {return 0 === this.value;};f.prototype.isZero = function () {return this.value === BigInt(0);};c.prototype.isDivisibleBy = function (t) {var e = st(t);if (e.isZero()) return false;if (e.isUnit()) return true;if (0 === e.compareAbs(2)) return this.isEven();return this.mod(e).isZero();};f.prototype.isDivisibleBy = l.prototype.isDivisibleBy = c.prototype.isDivisibleBy;function P(t) {var e = t.abs();if (e.isUnit()) return false;if (e.equals(2) || e.equals(3) || e.equals(5)) return true;if (e.isEven() || e.isDivisibleBy(3) || e.isDivisibleBy(5)) return false;if (e.lesser(49)) return true;}function V(t, e) {var r = t.prev(),i = r,s = 0,a,u,c;while (i.isEven()) {i = i.divide(2), s++;}t: for (u = 0; u < e.length; u++) {if (t.lesser(e[u])) continue;c = n(e[u]).modPow(i, t);if (c.isUnit() || c.equals(r)) continue;for (a = s - 1; 0 != a; a--) {c = c.square().mod(t);if (c.isUnit()) return false;if (c.equals(r)) continue t;}return false;}return true;}c.prototype.isPrime = function (e) {var r = P(this);if (r !== t) return r;var i = this.abs();var s = i.bitLength();if (s <= 64) return V(i, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);var a = Math.log(2) * s.toJSNumber();var o = Math.ceil(true === e ? 2 * Math.pow(a, 2) : a);for (var u = [], c = 0; c < o; c++) {u.push(n(c + 2));}return V(i, u);};f.prototype.isPrime = l.prototype.isPrime = c.prototype.isPrime;c.prototype.isProbablePrime = function (e, r) {var i = P(this);if (i !== t) return i;var s = this.abs();var a = e === t ? 5 : e;for (var o = [], u = 0; u < a; u++) {o.push(n.randBetween(2, s.minus(2), r));}return V(s, o);};f.prototype.isProbablePrime = l.prototype.isProbablePrime = c.prototype.isProbablePrime;c.prototype.modInv = function (t) {var e = n.zero,r = n.one,i = st(t),s = this.abs(),a,o,u;while (!s.isZero()) {a = i.divide(s);o = e;u = i;e = r;i = s;r = o.subtract(a.multiply(r));s = u.subtract(a.multiply(s));}if (!i.isUnit()) throw new Error(this.toString() + " and " + t.toString() + " are not co-prime");if (-1 === e.compare(0)) e = e.add(t);if (this.isNegative()) return e.negate();return e;};f.prototype.modInv = l.prototype.modInv = c.prototype.modInv;c.prototype.next = function () {var t = this.value;if (this.sign) return E(t, 1, this.sign);return new c(S(t, 1), this.sign);};l.prototype.next = function () {var t = this.value;if (t + 1 < i) return new l(t + 1);return new c(s, false);};f.prototype.next = function () {return new f(this.value + BigInt(1));};c.prototype.prev = function () {var t = this.value;if (this.sign) return new c(S(t, 1), true);return E(t, 1, this.sign);};l.prototype.prev = function () {var t = this.value;if (t - 1 > -i) return new l(t - 1);return new c(s, true);};f.prototype.prev = function () {return new f(this.value - BigInt(1));};var L = [1];while (2 * L[L.length - 1] <= e) {L.push(2 * L[L.length - 1]);}var H = L.length,K = L[H - 1];function U(t) {return Math.abs(t) <= e;}c.prototype.shiftLeft = function (t) {var e = st(t).toJSNumber();if (!U(e)) throw new Error(String(e) + " is too large for shifting.");if (e < 0) return this.shiftRight(-e);var r = this;if (r.isZero()) return r;while (e >= H) {r = r.multiply(K);e -= H - 1;}return r.multiply(L[e]);};f.prototype.shiftLeft = l.prototype.shiftLeft = c.prototype.shiftLeft;c.prototype.shiftRight = function (t) {var e;var r = st(t).toJSNumber();if (!U(r)) throw new Error(String(r) + " is too large for shifting.");if (r < 0) return this.shiftLeft(-r);var i = this;while (r >= H) {if (i.isZero() || i.isNegative() && i.isUnit()) return i;e = C(i, K);i = e[1].isNegative() ? e[0].prev() : e[0];r -= H - 1;}e = C(i, L[r]);return e[1].isNegative() ? e[0].prev() : e[0];};f.prototype.shiftRight = l.prototype.shiftRight = c.prototype.shiftRight;function j(t, e, r) {e = st(e);var i = t.isNegative(),s = e.isNegative();var a = i ? t.not() : t,o = s ? e.not() : e;var u = 0,c = 0;var l = null,f = null;var h = [];while (!a.isZero() || !o.isZero()) {l = C(a, K);u = l[1].toJSNumber();if (i) u = K - 1 - u;f = C(o, K);c = f[1].toJSNumber();if (s) c = K - 1 - c;a = l[0];o = f[0];h.push(r(u, c));}var d = 0 !== r(i ? 1 : 0, s ? 1 : 0) ? n(-1) : n(0);for (var p = h.length - 1; p >= 0; p -= 1) {d = d.multiply(K).add(n(h[p]));}return d;}c.prototype.not = function () {return this.negate().prev();};f.prototype.not = l.prototype.not = c.prototype.not;c.prototype.and = function (t) {return j(this, t, function (t, e) {return t & e;});};f.prototype.and = l.prototype.and = c.prototype.and;c.prototype.or = function (t) {return j(this, t, function (t, e) {return t | e;});};f.prototype.or = l.prototype.or = c.prototype.or;c.prototype.xor = function (t) {return j(this, t, function (t, e) {return t ^ e;});};f.prototype.xor = l.prototype.xor = c.prototype.xor;var q = 1 << 30,F = (e & -e) * (e & -e) | q;function z(t) {var r = t.value,i = "number" === typeof r ? r | q : "bigint" === typeof r ? r | BigInt(q) : r[0] + r[1] * e | F;return i & -i;}function G(t, e) {if (e.compareTo(t) <= 0) {var r = G(t, e.square(e));var i = r.p;var s = r.e;var a = i.multiply(e);return a.compareTo(t) <= 0 ? { p: a, e: 2 * s + 1 } : { p: i, e: 2 * s };}return { p: n(1), e: 0 };}c.prototype.bitLength = function () {var t = this;if (t.compareTo(n(0)) < 0) t = t.negate().subtract(n(1));if (0 === t.compareTo(n(0))) return n(0);return n(G(t, n(2)).e).add(n(1));};f.prototype.bitLength = l.prototype.bitLength = c.prototype.bitLength;function Y(t, e) {t = st(t);e = st(e);return t.greater(e) ? t : e;}function W(t, e) {t = st(t);e = st(e);return t.lesser(e) ? t : e;}function J(t, e) {t = st(t).abs();e = st(e).abs();if (t.equals(e)) return t;if (t.isZero()) return e;if (e.isZero()) return t;var r = u[1],i,n;while (t.isEven() && e.isEven()) {i = W(z(t), z(e));t = t.divide(i);e = e.divide(i);r = r.multiply(i);}while (t.isEven()) {t = t.divide(z(t));}do {while (e.isEven()) {e = e.divide(z(e));}if (t.greater(e)) {n = e;e = t;t = n;}e = e.subtract(t);} while (!e.isZero());return r.isUnit() ? t : t.multiply(r);}function Z(t, e) {t = st(t).abs();e = st(e).abs();return t.divide(J(t, e)).multiply(e);}function $(t, r, i) {t = st(t);r = st(r);var n = i || Math.random;var s = W(t, r),a = Y(t, r);var o = a.subtract(s).add(1);if (o.isSmall) return s.add(Math.floor(n() * o));var c = et(o, e).value;var l = [],f = true;for (var h = 0; h < c.length; h++) {var d = f ? c[h] + (h + 1 < c.length ? c[h + 1] / e : 0) : e;var p = y(n() * d);l.push(p);if (p < c[h]) f = false;}return s.add(u.fromArray(l, e, false));}var X = function X(t, e, r, i) {r = r || a;t = String(t);if (!i) {t = t.toLowerCase();r = r.toLowerCase();}var n = t.length;var s;var o = Math.abs(e);var u = {};for (s = 0; s < r.length; s++) {u[r[s]] = s;}for (s = 0; s < n; s++) {var c = t[s];if ("-" === c) continue;if (c in u) if (u[c] >= o) {if ("1" === c && 1 === o) continue;throw new Error(c + " is not a valid digit in base " + e + ".");}}e = st(e);var l = [];var f = "-" === t[0];for (s = f ? 1 : 0; s < t.length; s++) {var c = t[s];if (c in u) l.push(st(u[c]));else if ("<" === c) {var h = s;do {s++;} while (">" !== t[s] && s < t.length);l.push(st(t.slice(h + 1, s)));} else throw new Error(c + " is not a valid character");}return Q(l, e, f);};function Q(t, e, r) {var i = u[0],n = u[1],s;for (s = t.length - 1; s >= 0; s--) {i = i.add(t[s].times(n));n = n.times(e);}return r ? i.negate() : i;}function tt(t, e) {e = e || a;if (t < e.length) return e[t];return "<" + t + ">";}function et(t, e) {e = n(e);if (e.isZero()) {if (t.isZero()) return { value: [0], isNegative: false };throw new Error("Cannot convert nonzero numbers to base 0.");}if (e.equals(-1)) {if (t.isZero()) return { value: [0], isNegative: false };if (t.isNegative()) return { value: [].concat.apply([], Array.apply(null, Array(-t.toJSNumber())).map(Array.prototype.valueOf, [1, 0])), isNegative: false };var r = Array.apply(null, Array(t.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);r.unshift([1]);return { value: [].concat.apply([], r), isNegative: false };}var i = false;if (t.isNegative() && e.isPositive()) {i = true;t = t.abs();}if (e.isUnit()) {if (t.isZero()) return { value: [0], isNegative: false };return { value: Array.apply(null, Array(t.toJSNumber())).map(Number.prototype.valueOf, 1), isNegative: i };}var s = [];var a = t,o;while (a.isNegative() || a.compareAbs(e) >= 0) {o = a.divmod(e);a = o.quotient;var u = o.remainder;if (u.isNegative()) {u = e.minus(u).abs();a = a.next();}s.push(u.toJSNumber());}s.push(a.toJSNumber());return { value: s.reverse(), isNegative: i };}function rt(t, e, r) {var i = et(t, e);return (i.isNegative ? "-" : "") + i.value.map(function (t) {return tt(t, r);}).join("");}c.prototype.toArray = function (t) {return et(this, t);};l.prototype.toArray = function (t) {return et(this, t);};f.prototype.toArray = function (t) {return et(this, t);};c.prototype.toString = function (e, r) {if (e === t) e = 10;if (10 !== e) return rt(this, e, r);var i = this.value,n = i.length,s = String(i[--n]),a = "0000000",o;while (--n >= 0) {o = String(i[n]);s += a.slice(o.length) + o;}var u = this.sign ? "-" : "";return u + s;};l.prototype.toString = function (e, r) {if (e === t) e = 10;if (10 != e) return rt(this, e, r);return String(this.value);};f.prototype.toString = l.prototype.toString;f.prototype.toJSON = c.prototype.toJSON = l.prototype.toJSON = function () {return this.toString();};c.prototype.valueOf = function () {return parseInt(this.toString(), 10);};c.prototype.toJSNumber = c.prototype.valueOf;l.prototype.valueOf = function () {return this.value;};l.prototype.toJSNumber = l.prototype.valueOf;f.prototype.valueOf = f.prototype.toJSNumber = function () {return parseInt(this.toString(), 10);};function it(t) {if (h(+t)) {var e = +t;if (e === y(e)) return o ? new f(BigInt(e)) : new l(e);throw new Error("Invalid integer: " + t);}var i = "-" === t[0];if (i) t = t.slice(1);var n = t.split(/e/i);if (n.length > 2) throw new Error("Invalid integer: " + n.join("e"));if (2 === n.length) {var s = n[1];if ("+" === s[0]) s = s.slice(1);s = +s;if (s !== y(s) || !h(s)) throw new Error("Invalid integer: " + s + " is not a valid exponent.");var a = n[0];var u = a.indexOf(".");if (u >= 0) {s -= a.length - u - 1;a = a.slice(0, u) + a.slice(u + 1);}if (s < 0) throw new Error("Cannot include negative exponent part for integers");a += new Array(s + 1).join("0");t = a;}var d = /^([0-9][0-9]*)$/.test(t);if (!d) throw new Error("Invalid integer: " + t);if (o) return new f(BigInt(i ? "-" + t : t));var p = [],g = t.length,m = r,w = g - m;while (g > 0) {p.push(+t.slice(w, g));w -= m;if (w < 0) w = 0;g -= m;}v(p);return new c(p, i);}function nt(t) {if (o) return new f(BigInt(t));if (h(t)) {if (t !== y(t)) throw new Error(t + " is not an integer.");return new l(t);}return it(t.toString());}function st(t) {if ("number" === typeof t) return nt(t);if ("string" === typeof t) return it(t);if ("bigint" === typeof t) return new f(t);return t;}for (var at = 0; at < 1e3; at++) {u[at] = st(at);if (at > 0) u[-at] = st(-at);}u.one = u[1];u.zero = u[0];u.minusOne = u[-1];u.max = Y;u.min = W;u.gcd = J;u.lcm = Z;u.isInstance = function (t) {return t instanceof c || t instanceof l || t instanceof f;};u.randBetween = $;u.fromArray = function (t, e, r) {return Q(t.map(st), st(e || 10), r);};return u;}();if (t.hasOwnProperty("exports")) t.exports = n;i = function () {return n;}.call(e, r, e, t), void 0 !== i && (t.exports = i);}, 452: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(8269), r(8214), r(888), r(5109));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.BlockCipher;var n = e.algo;var s = [];var a = [];var o = [];var u = [];var c = [];var l = [];var f = [];var h = [];var d = [];var p = [];(function () {var t = [];for (var e = 0; e < 256; e++) {if (e < 128) t[e] = e << 1;else t[e] = e << 1 ^ 283;}var r = 0;var i = 0;for (var e = 0; e < 256; e++) {var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4;n = n >>> 8 ^ 255 & n ^ 99;s[r] = n;a[n] = r;var v = t[r];var g = t[v];var y = t[g];var m = 257 * t[n] ^ 16843008 * n;o[r] = m << 24 | m >>> 8;u[r] = m << 16 | m >>> 16;c[r] = m << 8 | m >>> 24;l[r] = m;var m = 16843009 * y ^ 65537 * g ^ 257 * v ^ 16843008 * r;f[n] = m << 24 | m >>> 8;h[n] = m << 16 | m >>> 16;d[n] = m << 8 | m >>> 24;p[n] = m;if (!r) r = i = 1;else {r = v ^ t[t[t[y ^ v]]];i ^= t[t[i]];}}})();var v = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];var g = n.AES = i.extend({ _doReset: function _doReset() {var t;if (this._nRounds && this._keyPriorReset === this._key) return;var e = this._keyPriorReset = this._key;var r = e.words;var i = e.sigBytes / 4;var n = this._nRounds = i + 6;var a = 4 * (n + 1);var o = this._keySchedule = [];for (var u = 0; u < a; u++) {if (u < i) o[u] = r[u];else {t = o[u - 1];if (!(u % i)) {t = t << 8 | t >>> 24;t = s[t >>> 24] << 24 | s[t >>> 16 & 255] << 16 | s[t >>> 8 & 255] << 8 | s[255 & t];t ^= v[u / i | 0] << 24;} else if (i > 6 && u % i == 4) t = s[t >>> 24] << 24 | s[t >>> 16 & 255] << 16 | s[t >>> 8 & 255] << 8 | s[255 & t];o[u] = o[u - i] ^ t;}}var c = this._invKeySchedule = [];for (var l = 0; l < a; l++) {var u = a - l;if (l % 4) var t = o[u];else var t = o[u - 4];if (l < 4 || u <= 4) c[l] = t;else c[l] = f[s[t >>> 24]] ^ h[s[t >>> 16 & 255]] ^ d[s[t >>> 8 & 255]] ^ p[s[255 & t]];}}, encryptBlock: function encryptBlock(t, e) {this._doCryptBlock(t, e, this._keySchedule, o, u, c, l, s);}, decryptBlock: function decryptBlock(t, e) {var r = t[e + 1];t[e + 1] = t[e + 3];t[e + 3] = r;this._doCryptBlock(t, e, this._invKeySchedule, f, h, d, p, a);var r = t[e + 1];t[e + 1] = t[e + 3];t[e + 3] = r;}, _doCryptBlock: function _doCryptBlock(t, e, r, i, n, s, a, o) {var u = this._nRounds;var c = t[e] ^ r[0];var l = t[e + 1] ^ r[1];var f = t[e + 2] ^ r[2];var h = t[e + 3] ^ r[3];var d = 4;for (var p = 1; p < u; p++) {var v = i[c >>> 24] ^ n[l >>> 16 & 255] ^ s[f >>> 8 & 255] ^ a[255 & h] ^ r[d++];var g = i[l >>> 24] ^ n[f >>> 16 & 255] ^ s[h >>> 8 & 255] ^ a[255 & c] ^ r[d++];var y = i[f >>> 24] ^ n[h >>> 16 & 255] ^ s[c >>> 8 & 255] ^ a[255 & l] ^ r[d++];var m = i[h >>> 24] ^ n[c >>> 16 & 255] ^ s[l >>> 8 & 255] ^ a[255 & f] ^ r[d++];c = v;l = g;f = y;h = m;}var v = (o[c >>> 24] << 24 | o[l >>> 16 & 255] << 16 | o[f >>> 8 & 255] << 8 | o[255 & h]) ^ r[d++];var g = (o[l >>> 24] << 24 | o[f >>> 16 & 255] << 16 | o[h >>> 8 & 255] << 8 | o[255 & c]) ^ r[d++];var y = (o[f >>> 24] << 24 | o[h >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & l]) ^ r[d++];var m = (o[h >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[l >>> 8 & 255] << 8 | o[255 & f]) ^ r[d++];t[e] = v;t[e + 1] = g;t[e + 2] = y;t[e + 3] = m;}, keySize: 256 / 32 });e.AES = i._createHelper(g);})();return t.AES;});}, 5109: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(888));})(this, function (t) {t.lib.Cipher || function (e) {var r = t;var i = r.lib;var n = i.Base;var s = i.WordArray;var a = i.BufferedBlockAlgorithm;var o = r.enc;o.Utf8;var c = o.Base64;var l = r.algo;var f = l.EvpKDF;var h = i.Cipher = a.extend({ cfg: n.extend(), createEncryptor: function createEncryptor(t, e) {return this.create(this._ENC_XFORM_MODE, t, e);}, createDecryptor: function createDecryptor(t, e) {return this.create(this._DEC_XFORM_MODE, t, e);}, init: function init(t, e, r) {this.cfg = this.cfg.extend(r);this._xformMode = t;this._key = e;this.reset();}, reset: function reset() {a.reset.call(this);this._doReset();}, process: function process(t) {this._append(t);return this._process();}, finalize: function finalize(t) {if (t) this._append(t);var e = this._doFinalize();return e;}, keySize: 128 / 32, ivSize: 128 / 32, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function () {function t(t) {if ("string" == typeof t) return T;else return E;}return function (e) {return { encrypt: function encrypt(r, i, n) {return t(i).encrypt(e, r, i, n);}, decrypt: function decrypt(r, i, n) {return t(i).decrypt(e, r, i, n);} };};}() });i.StreamCipher = h.extend({ _doFinalize: function _doFinalize() {var t = this._process(!!"flush");return t;}, blockSize: 1 });var p = r.mode = {};var v = i.BlockCipherMode = n.extend({ createEncryptor: function createEncryptor(t, e) {return this.Encryptor.create(t, e);}, createDecryptor: function createDecryptor(t, e) {return this.Decryptor.create(t, e);}, init: function init(t, e) {this._cipher = t;this._iv = e;} });var g = p.CBC = function () {var t = v.extend();t.Encryptor = t.extend({ processBlock: function processBlock(t, e) {var i = this._cipher;var n = i.blockSize;r.call(this, t, e, n);i.encryptBlock(t, e);this._prevBlock = t.slice(e, e + n);} });t.Decryptor = t.extend({ processBlock: function processBlock(t, e) {var i = this._cipher;var n = i.blockSize;var s = t.slice(e, e + n);i.decryptBlock(t, e);r.call(this, t, e, n);this._prevBlock = s;} });function r(t, r, i) {var n;var s = this._iv;if (s) {n = s;this._iv = e;} else n = this._prevBlock;for (var a = 0; a < i; a++) {t[r + a] ^= n[a];}}return t;}();var y = r.pad = {};var m = y.Pkcs7 = { pad: function pad(t, e) {var r = 4 * e;var i = r - t.sigBytes % r;var n = i << 24 | i << 16 | i << 8 | i;var a = [];for (var o = 0; o < i; o += 4) {a.push(n);}var u = s.create(a, i);t.concat(u);}, unpad: function unpad(t) {var e = 255 & t.words[t.sigBytes - 1 >>> 2];t.sigBytes -= e;} };i.BlockCipher = h.extend({ cfg: h.cfg.extend({ mode: g, padding: m }), reset: function reset() {var t;h.reset.call(this);var e = this.cfg;var r = e.iv;var i = e.mode;if (this._xformMode == this._ENC_XFORM_MODE) t = i.createEncryptor;else {t = i.createDecryptor;this._minBufferSize = 1;}if (this._mode && this._mode.__creator == t) this._mode.init(this, r && r.words);else {this._mode = t.call(i, this, r && r.words);this._mode.__creator = t;}}, _doProcessBlock: function _doProcessBlock(t, e) {this._mode.processBlock(t, e);}, _doFinalize: function _doFinalize() {var t;var e = this.cfg.padding;if (this._xformMode == this._ENC_XFORM_MODE) {e.pad(this._data, this.blockSize);t = this._process(!!"flush");} else {t = this._process(!!"flush");e.unpad(t);}return t;}, blockSize: 128 / 32 });var S = i.CipherParams = n.extend({ init: function init(t) {this.mixIn(t);}, toString: function toString(t) {return (t || this.formatter).stringify(this);} });var _ = r.format = {};var b = _.OpenSSL = { stringify: function stringify(t) {var e;var r = t.ciphertext;var i = t.salt;if (i) e = s.create([1398893684, 1701076831]).concat(i).concat(r);else e = r;return e.toString(c);}, parse: function parse(t) {var e;var r = c.parse(t);var i = r.words;if (1398893684 == i[0] && 1701076831 == i[1]) {e = s.create(i.slice(2, 4));i.splice(0, 4);r.sigBytes -= 16;}return S.create({ ciphertext: r, salt: e });} };var E = i.SerializableCipher = n.extend({ cfg: n.extend({ format: b }), encrypt: function encrypt(t, e, r, i) {i = this.cfg.extend(i);var n = t.createEncryptor(r, i);var s = n.finalize(e);var a = n.cfg;return S.create({ ciphertext: s, key: r, iv: a.iv, algorithm: t, mode: a.mode, padding: a.padding, blockSize: t.blockSize, formatter: i.format });}, decrypt: function decrypt(t, e, r, i) {i = this.cfg.extend(i);e = this._parse(e, i.format);var n = t.createDecryptor(r, i).finalize(e.ciphertext);return n;}, _parse: function _parse(t, e) {if ("string" == typeof t) return e.parse(t, this);else return t;} });var D = r.kdf = {};var M = D.OpenSSL = { execute: function execute(t, e, r, i) {if (!i) i = s.random(64 / 8);var n = f.create({ keySize: e + r }).compute(t, i);var a = s.create(n.words.slice(e), 4 * r);n.sigBytes = 4 * e;return S.create({ key: n, iv: a, salt: i });} };var T = i.PasswordBasedCipher = E.extend({ cfg: E.cfg.extend({ kdf: M }), encrypt: function encrypt(t, e, r, i) {i = this.cfg.extend(i);var n = i.kdf.execute(r, t.keySize, t.ivSize);i.iv = n.iv;var s = E.encrypt.call(this, t, e, n.key, i);s.mixIn(n);return s;}, decrypt: function decrypt(t, e, r, i) {i = this.cfg.extend(i);e = this._parse(e, i.format);var n = i.kdf.execute(r, t.keySize, t.ivSize, e.salt);i.iv = n.iv;var s = E.decrypt.call(this, t, e, n.key, i);return s;} });}();});}, 8249: function _(t, e, r) {(function (r, i) {t.exports = i();})(this, function () {var t = t || function (t, e) {var i;if ("undefined" !== typeof window && window.crypto) i = window.crypto;if ("undefined" !== typeof self && self.crypto) i = self.crypto;if ("undefined" !== typeof globalThis && globalThis.crypto) i = globalThis.crypto;if (!i && "undefined" !== typeof window && window.msCrypto) i = window.msCrypto;if (!i && "undefined" !== typeof r.g && r.g.crypto) i = r.g.crypto;if (!i && "function" === "function") try {i = r(2480);} catch (t) {}var n = function n() {if (i) {if ("function" === typeof i.getRandomValues) try {return i.getRandomValues(new Uint32Array(1))[0];} catch (t) {}if ("function" === typeof i.randomBytes) try {return i.randomBytes(4).readInt32LE();} catch (t) {}}throw new Error("Native crypto module could not be used to get secure random number.");};var s = Object.create || function () {function t() {}return function (e) {var r;t.prototype = e;r = new t();t.prototype = null;return r;};}();var a = {};var o = a.lib = {};var u = o.Base = function () {return { extend: function extend(t) {var e = s(this);if (t) e.mixIn(t);if (!e.hasOwnProperty("init") || this.init === e.init) e.init = function () {e.$super.init.apply(this, arguments);};e.init.prototype = e;e.$super = this;return e;}, create: function create() {var t = this.extend();t.init.apply(t, arguments);return t;}, init: function init() {}, mixIn: function mixIn(t) {for (var e in t) {if (t.hasOwnProperty(e)) this[e] = t[e];}if (t.hasOwnProperty("toString")) this.toString = t.toString;}, clone: function clone() {return this.init.prototype.extend(this);} };}();var c = o.WordArray = u.extend({ init: function init(t, r) {t = this.words = t || [];if (r != e) this.sigBytes = r;else this.sigBytes = 4 * t.length;}, toString: function toString(t) {return (t || f).stringify(this);}, concat: function concat(t) {var e = this.words;var r = t.words;var i = this.sigBytes;var n = t.sigBytes;this.clamp();if (i % 4) for (var s = 0; s < n; s++) {var a = r[s >>> 2] >>> 24 - s % 4 * 8 & 255;e[i + s >>> 2] |= a << 24 - (i + s) % 4 * 8;} else for (var o = 0; o < n; o += 4) {e[i + o >>> 2] = r[o >>> 2];}this.sigBytes += n;return this;}, clamp: function clamp() {var e = this.words;var r = this.sigBytes;e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8;e.length = t.ceil(r / 4);}, clone: function clone() {var t = u.clone.call(this);t.words = this.words.slice(0);return t;}, random: function random(t) {var e = [];for (var r = 0; r < t; r += 4) {e.push(n());}return new c.init(e, t);} });var l = a.enc = {};var f = l.Hex = { stringify: function stringify(t) {var e = t.words;var r = t.sigBytes;var i = [];for (var n = 0; n < r; n++) {var s = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;i.push((s >>> 4).toString(16));i.push((15 & s).toString(16));}return i.join("");}, parse: function parse(t) {var e = t.length;var r = [];for (var i = 0; i < e; i += 2) {r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;}return new c.init(r, e / 2);} };var h = l.Latin1 = { stringify: function stringify(t) {var e = t.words;var r = t.sigBytes;var i = [];for (var n = 0; n < r; n++) {var s = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;i.push(String.fromCharCode(s));}return i.join("");}, parse: function parse(t) {var e = t.length;var r = [];for (var i = 0; i < e; i++) {r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;}return new c.init(r, e);} };var d = l.Utf8 = { stringify: function stringify(t) {try {return decodeURIComponent(escape(h.stringify(t)));} catch (t) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(t) {return h.parse(unescape(encodeURIComponent(t)));} };var p = o.BufferedBlockAlgorithm = u.extend({ reset: function reset() {this._data = new c.init();this._nDataBytes = 0;}, _append: function _append(t) {if ("string" == typeof t) t = d.parse(t);this._data.concat(t);this._nDataBytes += t.sigBytes;}, _process: function _process(e) {var r;var i = this._data;var n = i.words;var s = i.sigBytes;var a = this.blockSize;var o = 4 * a;var u = s / o;if (e) u = t.ceil(u);else u = t.max((0 | u) - this._minBufferSize, 0);var l = u * a;var f = t.min(4 * l, s);if (l) {for (var h = 0; h < l; h += a) {this._doProcessBlock(n, h);}r = n.splice(0, l);i.sigBytes -= f;}return new c.init(r, f);}, clone: function clone() {var t = u.clone.call(this);t._data = this._data.clone();return t;}, _minBufferSize: 0 });o.Hasher = p.extend({ cfg: u.extend(), init: function init(t) {this.cfg = this.cfg.extend(t);this.reset();}, reset: function reset() {p.reset.call(this);this._doReset();}, update: function update(t) {this._append(t);this._process();return this;}, finalize: function finalize(t) {if (t) this._append(t);var e = this._doFinalize();return e;}, blockSize: 512 / 32, _createHelper: function _createHelper(t) {return function (e, r) {return new t.init(r).finalize(e);};}, _createHmacHelper: function _createHmacHelper(t) {return function (e, r) {return new g.HMAC.init(t, r).finalize(e);};} });var g = a.algo = {};return a;}(Math);return t;});}, 8269: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.WordArray;var n = e.enc;n.Base64 = { stringify: function stringify(t) {var e = t.words;var r = t.sigBytes;var i = this._map;t.clamp();var n = [];for (var s = 0; s < r; s += 3) {var a = e[s >>> 2] >>> 24 - s % 4 * 8 & 255;var o = e[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255;var u = e[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255;var c = a << 16 | o << 8 | u;for (var l = 0; l < 4 && s + .75 * l < r; l++) {n.push(i.charAt(c >>> 6 * (3 - l) & 63));}}var f = i.charAt(64);if (f) while (n.length % 4) {n.push(f);}return n.join("");}, parse: function parse(t) {var e = t.length;var r = this._map;var i = this._reverseMap;if (!i) {i = this._reverseMap = [];for (var n = 0; n < r.length; n++) {i[r.charCodeAt(n)] = n;}}var s = r.charAt(64);if (s) {var o = t.indexOf(s);if (-1 !== o) e = o;}return a(t, e, i);}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };function a(t, e, r) {var n = [];var s = 0;for (var a = 0; a < e; a++) {if (a % 4) {var o = r[t.charCodeAt(a - 1)] << a % 4 * 2;var u = r[t.charCodeAt(a)] >>> 6 - a % 4 * 2;var c = o | u;n[s >>> 2] |= c << 24 - s % 4 * 8;s++;}}return i.create(n, s);}})();return t.enc.Base64;});}, 3786: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.WordArray;var n = e.enc;n.Base64url = { stringify: function stringify(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var r = t.words;var i = t.sigBytes;var n = e ? this._safe_map : this._map;t.clamp();var s = [];for (var a = 0; a < i; a += 3) {var o = r[a >>> 2] >>> 24 - a % 4 * 8 & 255;var u = r[a + 1 >>> 2] >>> 24 - (a + 1) % 4 * 8 & 255;var c = r[a + 2 >>> 2] >>> 24 - (a + 2) % 4 * 8 & 255;var l = o << 16 | u << 8 | c;for (var f = 0; f < 4 && a + .75 * f < i; f++) {s.push(n.charAt(l >>> 6 * (3 - f) & 63));}}var h = n.charAt(64);if (h) while (s.length % 4) {s.push(h);}return s.join("");}, parse: function parse(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var r = t.length;var i = e ? this._safe_map : this._map;var n = this._reverseMap;if (!n) {n = this._reverseMap = [];for (var s = 0; s < i.length; s++) {n[i.charCodeAt(s)] = s;}}var o = i.charAt(64);if (o) {var u = t.indexOf(o);if (-1 !== u) r = u;}return a(t, r, n);}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" };function a(t, e, r) {var n = [];var s = 0;for (var a = 0; a < e; a++) {if (a % 4) {var o = r[t.charCodeAt(a - 1)] << a % 4 * 2;var u = r[t.charCodeAt(a)] >>> 6 - a % 4 * 2;var c = o | u;n[s >>> 2] |= c << 24 - s % 4 * 8;s++;}}return i.create(n, s);}})();return t.enc.Base64url;});}, 298: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.WordArray;var n = e.enc;n.Utf16 = n.Utf16BE = { stringify: function stringify(t) {var e = t.words;var r = t.sigBytes;var i = [];for (var n = 0; n < r; n += 2) {var s = e[n >>> 2] >>> 16 - n % 4 * 8 & 65535;i.push(String.fromCharCode(s));}return i.join("");}, parse: function parse(t) {var e = t.length;var r = [];for (var n = 0; n < e; n++) {r[n >>> 1] |= t.charCodeAt(n) << 16 - n % 2 * 16;}return i.create(r, 2 * e);} };n.Utf16LE = { stringify: function stringify(t) {var e = t.words;var r = t.sigBytes;var i = [];for (var n = 0; n < r; n += 2) {var s = a(e[n >>> 2] >>> 16 - n % 4 * 8 & 65535);i.push(String.fromCharCode(s));}return i.join("");}, parse: function parse(t) {var e = t.length;var r = [];for (var n = 0; n < e; n++) {r[n >>> 1] |= a(t.charCodeAt(n) << 16 - n % 2 * 16);}return i.create(r, 2 * e);} };function a(t) {return t << 8 & 4278255360 | t >>> 8 & 16711935;}})();return t.enc.Utf16;});}, 888: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(2783), r(9824));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.Base;var n = r.WordArray;var s = e.algo;var a = s.MD5;var o = s.EvpKDF = i.extend({ cfg: i.extend({ keySize: 128 / 32, hasher: a, iterations: 1 }), init: function init(t) {this.cfg = this.cfg.extend(t);}, compute: function compute(t, e) {var r;var i = this.cfg;var s = i.hasher.create();var a = n.create();var o = a.words;var u = i.keySize;var c = i.iterations;while (o.length < u) {if (r) s.update(r);r = s.update(t).finalize(e);s.reset();for (var l = 1; l < c; l++) {r = s.finalize(r);s.reset();}a.concat(r);}a.sigBytes = 4 * u;return a;} });e.EvpKDF = function (t, e, r) {return o.create(r).compute(t, e);};})();return t.EvpKDF;});}, 2209: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {(function (e) {var r = t;var i = r.lib;var n = i.CipherParams;var s = r.enc;var a = s.Hex;var o = r.format;o.Hex = { stringify: function stringify(t) {return t.ciphertext.toString(a);}, parse: function parse(t) {var e = a.parse(t);return n.create({ ciphertext: e });} };})();return t.format.Hex;});}, 9824: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.Base;var n = e.enc;var s = n.Utf8;var a = e.algo;a.HMAC = i.extend({ init: function init(t, e) {t = this._hasher = new t.init();if ("string" == typeof e) e = s.parse(e);var r = t.blockSize;var i = 4 * r;if (e.sigBytes > i) e = t.finalize(e);e.clamp();var n = this._oKey = e.clone();var a = this._iKey = e.clone();var o = n.words;var u = a.words;for (var c = 0; c < r; c++) {o[c] ^= 1549556828;u[c] ^= 909522486;}n.sigBytes = a.sigBytes = i;this.reset();}, reset: function reset() {var t = this._hasher;t.reset();t.update(this._iKey);}, update: function update(t) {this._hasher.update(t);return this;}, finalize: function finalize(t) {var e = this._hasher;var r = e.finalize(t);e.reset();var i = e.finalize(this._oKey.clone().concat(r));return i;} });})();});}, 1354: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(4938), r(4433), r(298), r(8269), r(3786), r(8214), r(2783), r(2153), r(7792), r(34), r(7460), r(3327), r(706), r(9824), r(2112), r(888), r(5109), r(8568), r(4242), r(9968), r(7660), r(1148), r(3615), r(2807), r(1077), r(6475), r(6991), r(2209), r(452), r(4253), r(1857), r(4454), r(3974));})(this, function (t) {return t;});}, 4433: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function () {if ("function" != typeof ArrayBuffer) return;var e = t;var r = e.lib;var i = r.WordArray;var n = i.init;var s = i.init = function (t) {if (t instanceof ArrayBuffer) t = new Uint8Array(t);if (t instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength);if (t instanceof Uint8Array) {var e = t.byteLength;var r = [];for (var i = 0; i < e; i++) {r[i >>> 2] |= t[i] << 24 - i % 4 * 8;}n.call(this, r, e);} else n.apply(this, arguments);};s.prototype = i;})();return t.lib.WordArray;});}, 8214: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function (e) {var r = t;var i = r.lib;var n = i.WordArray;var s = i.Hasher;var a = r.algo;var o = [];(function () {for (var t = 0; t < 64; t++) {o[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}})();var u = a.MD5 = s.extend({ _doReset: function _doReset() {this._hash = new n.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(t, e) {for (var r = 0; r < 16; r++) {var i = e + r;var n = t[i];t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);}var s = this._hash.words;var a = t[e + 0];var u = t[e + 1];var d = t[e + 2];var p = t[e + 3];var v = t[e + 4];var g = t[e + 5];var y = t[e + 6];var m = t[e + 7];var w = t[e + 8];var S = t[e + 9];var _ = t[e + 10];var b = t[e + 11];var E = t[e + 12];var D = t[e + 13];var M = t[e + 14];var T = t[e + 15];var I = s[0];var A = s[1];var x = s[2];var R = s[3];I = c(I, A, x, R, a, 7, o[0]);R = c(R, I, A, x, u, 12, o[1]);x = c(x, R, I, A, d, 17, o[2]);A = c(A, x, R, I, p, 22, o[3]);I = c(I, A, x, R, v, 7, o[4]);R = c(R, I, A, x, g, 12, o[5]);x = c(x, R, I, A, y, 17, o[6]);A = c(A, x, R, I, m, 22, o[7]);I = c(I, A, x, R, w, 7, o[8]);R = c(R, I, A, x, S, 12, o[9]);x = c(x, R, I, A, _, 17, o[10]);A = c(A, x, R, I, b, 22, o[11]);I = c(I, A, x, R, E, 7, o[12]);R = c(R, I, A, x, D, 12, o[13]);x = c(x, R, I, A, M, 17, o[14]);A = c(A, x, R, I, T, 22, o[15]);I = l(I, A, x, R, u, 5, o[16]);R = l(R, I, A, x, y, 9, o[17]);x = l(x, R, I, A, b, 14, o[18]);A = l(A, x, R, I, a, 20, o[19]);I = l(I, A, x, R, g, 5, o[20]);R = l(R, I, A, x, _, 9, o[21]);x = l(x, R, I, A, T, 14, o[22]);A = l(A, x, R, I, v, 20, o[23]);I = l(I, A, x, R, S, 5, o[24]);R = l(R, I, A, x, M, 9, o[25]);x = l(x, R, I, A, p, 14, o[26]);A = l(A, x, R, I, w, 20, o[27]);I = l(I, A, x, R, D, 5, o[28]);R = l(R, I, A, x, d, 9, o[29]);x = l(x, R, I, A, m, 14, o[30]);A = l(A, x, R, I, E, 20, o[31]);I = f(I, A, x, R, g, 4, o[32]);R = f(R, I, A, x, w, 11, o[33]);x = f(x, R, I, A, b, 16, o[34]);A = f(A, x, R, I, M, 23, o[35]);I = f(I, A, x, R, u, 4, o[36]);R = f(R, I, A, x, v, 11, o[37]);x = f(x, R, I, A, m, 16, o[38]);A = f(A, x, R, I, _, 23, o[39]);I = f(I, A, x, R, D, 4, o[40]);R = f(R, I, A, x, a, 11, o[41]);x = f(x, R, I, A, p, 16, o[42]);A = f(A, x, R, I, y, 23, o[43]);I = f(I, A, x, R, S, 4, o[44]);R = f(R, I, A, x, E, 11, o[45]);x = f(x, R, I, A, T, 16, o[46]);A = f(A, x, R, I, d, 23, o[47]);I = h(I, A, x, R, a, 6, o[48]);R = h(R, I, A, x, m, 10, o[49]);x = h(x, R, I, A, M, 15, o[50]);A = h(A, x, R, I, g, 21, o[51]);I = h(I, A, x, R, E, 6, o[52]);R = h(R, I, A, x, p, 10, o[53]);x = h(x, R, I, A, _, 15, o[54]);A = h(A, x, R, I, u, 21, o[55]);I = h(I, A, x, R, w, 6, o[56]);R = h(R, I, A, x, T, 10, o[57]);x = h(x, R, I, A, y, 15, o[58]);A = h(A, x, R, I, D, 21, o[59]);I = h(I, A, x, R, v, 6, o[60]);R = h(R, I, A, x, b, 10, o[61]);x = h(x, R, I, A, d, 15, o[62]);A = h(A, x, R, I, S, 21, o[63]);s[0] = s[0] + I | 0;s[1] = s[1] + A | 0;s[2] = s[2] + x | 0;s[3] = s[3] + R | 0;}, _doFinalize: function _doFinalize() {var t = this._data;var r = t.words;var i = 8 * this._nDataBytes;var n = 8 * t.sigBytes;r[n >>> 5] |= 128 << 24 - n % 32;var s = e.floor(i / 4294967296);var a = i;r[(n + 64 >>> 9 << 4) + 15] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);r[(n + 64 >>> 9 << 4) + 14] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);t.sigBytes = 4 * (r.length + 1);this._process();var o = this._hash;var u = o.words;for (var c = 0; c < 4; c++) {var l = u[c];u[c] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);}return o;}, clone: function clone() {var t = s.clone.call(this);t._hash = this._hash.clone();return t;} });function c(t, e, r, i, n, s, a) {var o = t + (e & r | ~e & i) + n + a;return (o << s | o >>> 32 - s) + e;}function l(t, e, r, i, n, s, a) {var o = t + (e & i | r & ~i) + n + a;return (o << s | o >>> 32 - s) + e;}function f(t, e, r, i, n, s, a) {var o = t + (e ^ r ^ i) + n + a;return (o << s | o >>> 32 - s) + e;}function h(t, e, r, i, n, s, a) {var o = t + (r ^ (e | ~i)) + n + a;return (o << s | o >>> 32 - s) + e;}r.MD5 = s._createHelper(u);r.HmacMD5 = s._createHmacHelper(u);})(Math);return t.MD5;});}, 8568: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.mode.CFB = function () {var e = t.lib.BlockCipherMode.extend();e.Encryptor = e.extend({ processBlock: function processBlock(t, e) {var i = this._cipher;var n = i.blockSize;r.call(this, t, e, n, i);this._prevBlock = t.slice(e, e + n);} });e.Decryptor = e.extend({ processBlock: function processBlock(t, e) {var i = this._cipher;var n = i.blockSize;var s = t.slice(e, e + n);r.call(this, t, e, n, i);this._prevBlock = s;} });function r(t, e, r, i) {var n;var s = this._iv;if (s) {n = s.slice(0);this._iv = void 0;} else n = this._prevBlock;i.encryptBlock(n, 0);for (var a = 0; a < r; a++) {t[e + a] ^= n[a];}}return e;}();return t.mode.CFB;});}, 9968: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.mode.CTRGladman = function () {var e = t.lib.BlockCipherMode.extend();function r(t) {if (255 === (t >> 24 & 255)) {var e = t >> 16 & 255;var r = t >> 8 & 255;var i = 255 & t;if (255 === e) {e = 0;if (255 === r) {r = 0;if (255 === i) i = 0;else ++i;} else ++r;} else ++e;t = 0;t += e << 16;t += r << 8;t += i;} else t += 1 << 24;return t;}function i(t) {if (0 === (t[0] = r(t[0]))) t[1] = r(t[1]);return t;}var n = e.Encryptor = e.extend({ processBlock: function processBlock(t, e) {var r = this._cipher;var n = r.blockSize;var s = this._iv;var a = this._counter;if (s) {a = this._counter = s.slice(0);this._iv = void 0;}i(a);var o = a.slice(0);r.encryptBlock(o, 0);for (var u = 0; u < n; u++) {t[e + u] ^= o[u];}} });e.Decryptor = n;return e;}();return t.mode.CTRGladman;});}, 4242: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.mode.CTR = function () {var e = t.lib.BlockCipherMode.extend();var r = e.Encryptor = e.extend({ processBlock: function processBlock(t, e) {var r = this._cipher;var i = r.blockSize;var n = this._iv;var s = this._counter;if (n) {s = this._counter = n.slice(0);this._iv = void 0;}var a = s.slice(0);r.encryptBlock(a, 0);s[i - 1] = s[i - 1] + 1 | 0;for (var o = 0; o < i; o++) {t[e + o] ^= a[o];}} });e.Decryptor = r;return e;}();return t.mode.CTR;});}, 1148: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.mode.ECB = function () {var e = t.lib.BlockCipherMode.extend();e.Encryptor = e.extend({ processBlock: function processBlock(t, e) {this._cipher.encryptBlock(t, e);} });e.Decryptor = e.extend({ processBlock: function processBlock(t, e) {this._cipher.decryptBlock(t, e);} });return e;}();return t.mode.ECB;});}, 7660: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.mode.OFB = function () {var e = t.lib.BlockCipherMode.extend();var r = e.Encryptor = e.extend({ processBlock: function processBlock(t, e) {var r = this._cipher;var i = r.blockSize;var n = this._iv;var s = this._keystream;if (n) {s = this._keystream = n.slice(0);this._iv = void 0;}r.encryptBlock(s, 0);for (var a = 0; a < i; a++) {t[e + a] ^= s[a];}} });e.Decryptor = r;return e;}();return t.mode.OFB;});}, 3615: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.pad.AnsiX923 = { pad: function pad(t, e) {var r = t.sigBytes;var i = 4 * e;var n = i - r % i;var s = r + n - 1;t.clamp();t.words[s >>> 2] |= n << 24 - s % 4 * 8;t.sigBytes += n;}, unpad: function unpad(t) {var e = 255 & t.words[t.sigBytes - 1 >>> 2];t.sigBytes -= e;} };return t.pad.Ansix923;});}, 2807: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.pad.Iso10126 = { pad: function pad(e, r) {var i = 4 * r;var n = i - e.sigBytes % i;e.concat(t.lib.WordArray.random(n - 1)).concat(t.lib.WordArray.create([n << 24], 1));}, unpad: function unpad(t) {var e = 255 & t.words[t.sigBytes - 1 >>> 2];t.sigBytes -= e;} };return t.pad.Iso10126;});}, 1077: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.pad.Iso97971 = { pad: function pad(e, r) {e.concat(t.lib.WordArray.create([2147483648], 1));t.pad.ZeroPadding.pad(e, r);}, unpad: function unpad(e) {t.pad.ZeroPadding.unpad(e);e.sigBytes--;} };return t.pad.Iso97971;});}, 6991: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.pad.NoPadding = { pad: function pad() {}, unpad: function unpad() {} };return t.pad.NoPadding;});}, 6475: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(5109));})(this, function (t) {t.pad.ZeroPadding = { pad: function pad(t, e) {var r = 4 * e;t.clamp();t.sigBytes += r - (t.sigBytes % r || r);}, unpad: function unpad(t) {var e = t.words;var r = t.sigBytes - 1;for (var r = t.sigBytes - 1; r >= 0; r--) {if (e[r >>> 2] >>> 24 - r % 4 * 8 & 255) {t.sigBytes = r + 1;break;}}} };return t.pad.ZeroPadding;});}, 2112: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(2783), r(9824));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.Base;var n = r.WordArray;var s = e.algo;var a = s.SHA1;var o = s.HMAC;var u = s.PBKDF2 = i.extend({ cfg: i.extend({ keySize: 128 / 32, hasher: a, iterations: 1 }), init: function init(t) {this.cfg = this.cfg.extend(t);}, compute: function compute(t, e) {var r = this.cfg;var i = o.create(r.hasher, t);var s = n.create();var a = n.create([1]);var u = s.words;var c = a.words;var l = r.keySize;var f = r.iterations;while (u.length < l) {var h = i.update(e).finalize(a);i.reset();var d = h.words;var p = d.length;var v = h;for (var g = 1; g < f; g++) {v = i.finalize(v);i.reset();var y = v.words;for (var m = 0; m < p; m++) {d[m] ^= y[m];}}s.concat(h);c[0]++;}s.sigBytes = 4 * l;return s;} });e.PBKDF2 = function (t, e, r) {return u.create(r).compute(t, e);};})();return t.PBKDF2;});}, 3974: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(8269), r(8214), r(888), r(5109));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.StreamCipher;var n = e.algo;var s = [];var a = [];var o = [];var u = n.RabbitLegacy = i.extend({ _doReset: function _doReset() {var t = this._key.words;var e = this.cfg.iv;var r = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16];var i = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];this._b = 0;for (var n = 0; n < 4; n++) {c.call(this);}for (var n = 0; n < 8; n++) {i[n] ^= r[n + 4 & 7];}if (e) {var s = e.words;var a = s[0];var o = s[1];var u = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);var l = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);var f = u >>> 16 | 4294901760 & l;var h = l << 16 | 65535 & u;i[0] ^= u;i[1] ^= f;i[2] ^= l;i[3] ^= h;i[4] ^= u;i[5] ^= f;i[6] ^= l;i[7] ^= h;for (var n = 0; n < 4; n++) {c.call(this);}}}, _doProcessBlock: function _doProcessBlock(t, e) {var r = this._X;c.call(this);s[0] = r[0] ^ r[5] >>> 16 ^ r[3] << 16;s[1] = r[2] ^ r[7] >>> 16 ^ r[5] << 16;s[2] = r[4] ^ r[1] >>> 16 ^ r[7] << 16;s[3] = r[6] ^ r[3] >>> 16 ^ r[1] << 16;for (var i = 0; i < 4; i++) {s[i] = 16711935 & (s[i] << 8 | s[i] >>> 24) | 4278255360 & (s[i] << 24 | s[i] >>> 8);t[e + i] ^= s[i];}}, blockSize: 128 / 32, ivSize: 64 / 32 });function c() {var t = this._X;var e = this._C;for (var r = 0; r < 8; r++) {a[r] = e[r];}e[0] = e[0] + 1295307597 + this._b | 0;e[1] = e[1] + 3545052371 + (e[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0;e[2] = e[2] + 886263092 + (e[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0;e[3] = e[3] + 1295307597 + (e[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0;e[4] = e[4] + 3545052371 + (e[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0;e[5] = e[5] + 886263092 + (e[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0;e[6] = e[6] + 1295307597 + (e[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0;e[7] = e[7] + 3545052371 + (e[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0;this._b = e[7] >>> 0 < a[7] >>> 0 ? 1 : 0;for (var r = 0; r < 8; r++) {var i = t[r] + e[r];var n = 65535 & i;var s = i >>> 16;var u = ((n * n >>> 17) + n * s >>> 15) + s * s;var c = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);o[r] = u ^ c;}t[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0;t[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0;t[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0;t[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0;t[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0;t[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0;t[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0;t[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0;}e.RabbitLegacy = i._createHelper(u);})();return t.RabbitLegacy;});}, 4454: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(8269), r(8214), r(888), r(5109));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.StreamCipher;var n = e.algo;var s = [];var a = [];var o = [];var u = n.Rabbit = i.extend({ _doReset: function _doReset() {var t = this._key.words;var e = this.cfg.iv;for (var r = 0; r < 4; r++) {t[r] = 16711935 & (t[r] << 8 | t[r] >>> 24) | 4278255360 & (t[r] << 24 | t[r] >>> 8);}var i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16];var n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];this._b = 0;for (var r = 0; r < 4; r++) {c.call(this);}for (var r = 0; r < 8; r++) {n[r] ^= i[r + 4 & 7];}if (e) {var s = e.words;var a = s[0];var o = s[1];var u = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);var l = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);var f = u >>> 16 | 4294901760 & l;var h = l << 16 | 65535 & u;n[0] ^= u;n[1] ^= f;n[2] ^= l;n[3] ^= h;n[4] ^= u;n[5] ^= f;n[6] ^= l;n[7] ^= h;for (var r = 0; r < 4; r++) {c.call(this);}}}, _doProcessBlock: function _doProcessBlock(t, e) {var r = this._X;c.call(this);s[0] = r[0] ^ r[5] >>> 16 ^ r[3] << 16;s[1] = r[2] ^ r[7] >>> 16 ^ r[5] << 16;s[2] = r[4] ^ r[1] >>> 16 ^ r[7] << 16;s[3] = r[6] ^ r[3] >>> 16 ^ r[1] << 16;for (var i = 0; i < 4; i++) {s[i] = 16711935 & (s[i] << 8 | s[i] >>> 24) | 4278255360 & (s[i] << 24 | s[i] >>> 8);t[e + i] ^= s[i];}}, blockSize: 128 / 32, ivSize: 64 / 32 });function c() {var t = this._X;var e = this._C;for (var r = 0; r < 8; r++) {a[r] = e[r];}e[0] = e[0] + 1295307597 + this._b | 0;e[1] = e[1] + 3545052371 + (e[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0;e[2] = e[2] + 886263092 + (e[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0;e[3] = e[3] + 1295307597 + (e[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0;e[4] = e[4] + 3545052371 + (e[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0;e[5] = e[5] + 886263092 + (e[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0;e[6] = e[6] + 1295307597 + (e[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0;e[7] = e[7] + 3545052371 + (e[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0;this._b = e[7] >>> 0 < a[7] >>> 0 ? 1 : 0;for (var r = 0; r < 8; r++) {var i = t[r] + e[r];var n = 65535 & i;var s = i >>> 16;var u = ((n * n >>> 17) + n * s >>> 15) + s * s;var c = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);o[r] = u ^ c;}t[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0;t[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0;t[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0;t[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0;t[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0;t[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0;t[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0;t[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0;}e.Rabbit = i._createHelper(u);})();return t.Rabbit;});}, 1857: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(8269), r(8214), r(888), r(5109));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.StreamCipher;var n = e.algo;var s = n.RC4 = i.extend({ _doReset: function _doReset() {var t = this._key;var e = t.words;var r = t.sigBytes;var i = this._S = [];for (var n = 0; n < 256; n++) {i[n] = n;}for (var n = 0, s = 0; n < 256; n++) {var a = n % r;var o = e[a >>> 2] >>> 24 - a % 4 * 8 & 255;s = (s + i[n] + o) % 256;var u = i[n];i[n] = i[s];i[s] = u;}this._i = this._j = 0;}, _doProcessBlock: function _doProcessBlock(t, e) {t[e] ^= a.call(this);}, keySize: 256 / 32, ivSize: 0 });function a() {var t = this._S;var e = this._i;var r = this._j;var i = 0;for (var n = 0; n < 4; n++) {e = (e + 1) % 256;r = (r + t[e]) % 256;var s = t[e];t[e] = t[r];t[r] = s;i |= t[(t[e] + t[r]) % 256] << 24 - 8 * n;}this._i = e;this._j = r;return i;}e.RC4 = i._createHelper(s);var o = n.RC4Drop = s.extend({ cfg: s.cfg.extend({ drop: 192 }), _doReset: function _doReset() {s._doReset.call(this);for (var t = this.cfg.drop; t > 0; t--) {a.call(this);}} });e.RC4Drop = i._createHelper(o);})();return t.RC4;});}, 706: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function (e) {var r = t;var i = r.lib;var n = i.WordArray;var s = i.Hasher;var a = r.algo;var o = n.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);var u = n.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);var c = n.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);var l = n.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);var f = n.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);var h = n.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);var d = a.RIPEMD160 = s.extend({ _doReset: function _doReset() {this._hash = n.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);}, _doProcessBlock: function _doProcessBlock(t, e) {for (var r = 0; r < 16; r++) {var i = e + r;var n = t[i];t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);}var s = this._hash.words;var a = f.words;var d = h.words;var S = o.words;var _ = u.words;var b = c.words;var E = l.words;var D, M, T, I, A;var x, R, B, O, k;x = D = s[0];R = M = s[1];B = T = s[2];O = I = s[3];k = A = s[4];var C;for (var r = 0; r < 80; r += 1) {C = D + t[e + S[r]] | 0;if (r < 16) C += p(M, T, I) + a[0];else if (r < 32) C += v(M, T, I) + a[1];else if (r < 48) C += g(M, T, I) + a[2];else if (r < 64) C += y(M, T, I) + a[3];else C += m(M, T, I) + a[4];C |= 0;C = w(C, b[r]);C = C + A | 0;D = A;A = I;I = w(T, 10);T = M;M = C;C = x + t[e + _[r]] | 0;if (r < 16) C += m(R, B, O) + d[0];else if (r < 32) C += y(R, B, O) + d[1];else if (r < 48) C += g(R, B, O) + d[2];else if (r < 64) C += v(R, B, O) + d[3];else C += p(R, B, O) + d[4];C |= 0;C = w(C, E[r]);C = C + k | 0;x = k;k = O;O = w(B, 10);B = R;R = C;}C = s[1] + T + O | 0;s[1] = s[2] + I + k | 0;s[2] = s[3] + A + x | 0;s[3] = s[4] + D + R | 0;s[4] = s[0] + M + B | 0;s[0] = C;}, _doFinalize: function _doFinalize() {var t = this._data;var e = t.words;var r = 8 * this._nDataBytes;var i = 8 * t.sigBytes;e[i >>> 5] |= 128 << 24 - i % 32;e[(i + 64 >>> 9 << 4) + 14] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);t.sigBytes = 4 * (e.length + 1);this._process();var n = this._hash;var s = n.words;for (var a = 0; a < 5; a++) {var o = s[a];s[a] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);}return n;}, clone: function clone() {var t = s.clone.call(this);t._hash = this._hash.clone();return t;} });function p(t, e, r) {return t ^ e ^ r;}function v(t, e, r) {return t & e | ~t & r;}function g(t, e, r) {return (t | ~e) ^ r;}function y(t, e, r) {return t & r | e & ~r;}function m(t, e, r) {return t ^ (e | ~r);}function w(t, e) {return t << e | t >>> 32 - e;}r.RIPEMD160 = s._createHelper(d);r.HmacRIPEMD160 = s._createHmacHelper(d);})();return t.RIPEMD160;});}, 2783: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.WordArray;var n = r.Hasher;var s = e.algo;var a = [];var o = s.SHA1 = n.extend({ _doReset: function _doReset() {this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);}, _doProcessBlock: function _doProcessBlock(t, e) {var r = this._hash.words;var i = r[0];var n = r[1];var s = r[2];var o = r[3];var u = r[4];for (var c = 0; c < 80; c++) {if (c < 16) a[c] = 0 | t[e + c];else {var l = a[c - 3] ^ a[c - 8] ^ a[c - 14] ^ a[c - 16];a[c] = l << 1 | l >>> 31;}var f = (i << 5 | i >>> 27) + u + a[c];if (c < 20) f += (n & s | ~n & o) + 1518500249;else if (c < 40) f += (n ^ s ^ o) + 1859775393;else if (c < 60) f += (n & s | n & o | s & o) - 1894007588;else f += (n ^ s ^ o) - 899497514;u = o;o = s;s = n << 30 | n >>> 2;n = i;i = f;}r[0] = r[0] + i | 0;r[1] = r[1] + n | 0;r[2] = r[2] + s | 0;r[3] = r[3] + o | 0;r[4] = r[4] + u | 0;}, _doFinalize: function _doFinalize() {var t = this._data;var e = t.words;var r = 8 * this._nDataBytes;var i = 8 * t.sigBytes;e[i >>> 5] |= 128 << 24 - i % 32;e[(i + 64 >>> 9 << 4) + 14] = Math.floor(r / 4294967296);e[(i + 64 >>> 9 << 4) + 15] = r;t.sigBytes = 4 * e.length;this._process();return this._hash;}, clone: function clone() {var t = n.clone.call(this);t._hash = this._hash.clone();return t;} });e.SHA1 = n._createHelper(o);e.HmacSHA1 = n._createHmacHelper(o);})();return t.SHA1;});}, 7792: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(2153));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.WordArray;var n = e.algo;var s = n.SHA256;var a = n.SHA224 = s.extend({ _doReset: function _doReset() {this._hash = new i.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);}, _doFinalize: function _doFinalize() {var t = s._doFinalize.call(this);t.sigBytes -= 4;return t;} });e.SHA224 = s._createHelper(a);e.HmacSHA224 = s._createHmacHelper(a);})();return t.SHA224;});}, 2153: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function (e) {var r = t;var i = r.lib;var n = i.WordArray;var s = i.Hasher;var a = r.algo;var o = [];var u = [];(function () {function t(t) {var r = e.sqrt(t);for (var i = 2; i <= r; i++) {if (!(t % i)) return false;}return true;}function r(t) {return 4294967296 * (t - (0 | t)) | 0;}var i = 2;var n = 0;while (n < 64) {if (t(i)) {if (n < 8) o[n] = r(e.pow(i, 1 / 2));u[n] = r(e.pow(i, 1 / 3));n++;}i++;}})();var c = [];var l = a.SHA256 = s.extend({ _doReset: function _doReset() {this._hash = new n.init(o.slice(0));}, _doProcessBlock: function _doProcessBlock(t, e) {var r = this._hash.words;var i = r[0];var n = r[1];var s = r[2];var a = r[3];var o = r[4];var l = r[5];var f = r[6];var h = r[7];for (var d = 0; d < 64; d++) {if (d < 16) c[d] = 0 | t[e + d];else {var p = c[d - 15];var v = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3;var g = c[d - 2];var y = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;c[d] = v + c[d - 7] + y + c[d - 16];}var m = o & l ^ ~o & f;var w = i & n ^ i & s ^ n & s;var S = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22);var _ = (o << 26 | o >>> 6) ^ (o << 21 | o >>> 11) ^ (o << 7 | o >>> 25);var b = h + _ + m + u[d] + c[d];var E = S + w;h = f;f = l;l = o;o = a + b | 0;a = s;s = n;n = i;i = b + E | 0;}r[0] = r[0] + i | 0;r[1] = r[1] + n | 0;r[2] = r[2] + s | 0;r[3] = r[3] + a | 0;r[4] = r[4] + o | 0;r[5] = r[5] + l | 0;r[6] = r[6] + f | 0;r[7] = r[7] + h | 0;}, _doFinalize: function _doFinalize() {var t = this._data;var r = t.words;var i = 8 * this._nDataBytes;var n = 8 * t.sigBytes;r[n >>> 5] |= 128 << 24 - n % 32;r[(n + 64 >>> 9 << 4) + 14] = e.floor(i / 4294967296);r[(n + 64 >>> 9 << 4) + 15] = i;t.sigBytes = 4 * r.length;this._process();return this._hash;}, clone: function clone() {var t = s.clone.call(this);t._hash = this._hash.clone();return t;} });r.SHA256 = s._createHelper(l);r.HmacSHA256 = s._createHmacHelper(l);})(Math);return t.SHA256;});}, 3327: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(4938));})(this, function (t) {(function (e) {var r = t;var i = r.lib;var n = i.WordArray;var s = i.Hasher;var a = r.x64;var o = a.Word;var u = r.algo;var c = [];var l = [];var f = [];(function () {var t = 1,e = 0;for (var r = 0; r < 24; r++) {c[t + 5 * e] = (r + 1) * (r + 2) / 2 % 64;var i = e % 5;var n = (2 * t + 3 * e) % 5;t = i;e = n;}for (var t = 0; t < 5; t++) {for (var e = 0; e < 5; e++) {l[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5;}}var s = 1;for (var a = 0; a < 24; a++) {var u = 0;var h = 0;for (var d = 0; d < 7; d++) {if (1 & s) {var p = (1 << d) - 1;if (p < 32) h ^= 1 << p;else u ^= 1 << p - 32;}if (128 & s) s = s << 1 ^ 113;else s <<= 1;}f[a] = o.create(u, h);}})();var h = [];(function () {for (var t = 0; t < 25; t++) {h[t] = o.create();}})();var d = u.SHA3 = s.extend({ cfg: s.cfg.extend({ outputLength: 512 }), _doReset: function _doReset() {var t = this._state = [];for (var e = 0; e < 25; e++) {t[e] = new o.init();}this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;}, _doProcessBlock: function _doProcessBlock(t, e) {var r = this._state;var i = this.blockSize / 2;for (var n = 0; n < i; n++) {var s = t[e + 2 * n];var a = t[e + 2 * n + 1];s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);var o = r[n];o.high ^= a;o.low ^= s;}for (var u = 0; u < 24; u++) {for (var d = 0; d < 5; d++) {var p = 0,v = 0;for (var g = 0; g < 5; g++) {var o = r[d + 5 * g];p ^= o.high;v ^= o.low;}var y = h[d];y.high = p;y.low = v;}for (var d = 0; d < 5; d++) {var m = h[(d + 4) % 5];var w = h[(d + 1) % 5];var S = w.high;var _ = w.low;var p = m.high ^ (S << 1 | _ >>> 31);var v = m.low ^ (_ << 1 | S >>> 31);for (var g = 0; g < 5; g++) {var o = r[d + 5 * g];o.high ^= p;o.low ^= v;}}for (var b = 1; b < 25; b++) {var p;var v;var o = r[b];var E = o.high;var D = o.low;var M = c[b];if (M < 32) {p = E << M | D >>> 32 - M;v = D << M | E >>> 32 - M;} else {p = D << M - 32 | E >>> 64 - M;v = E << M - 32 | D >>> 64 - M;}var T = h[l[b]];T.high = p;T.low = v;}var I = h[0];var A = r[0];I.high = A.high;I.low = A.low;for (var d = 0; d < 5; d++) {for (var g = 0; g < 5; g++) {var b = d + 5 * g;var o = r[b];var x = h[b];var R = h[(d + 1) % 5 + 5 * g];var B = h[(d + 2) % 5 + 5 * g];o.high = x.high ^ ~R.high & B.high;o.low = x.low ^ ~R.low & B.low;}}var o = r[0];var O = f[u];o.high ^= O.high;o.low ^= O.low;}}, _doFinalize: function _doFinalize() {var t = this._data;var r = t.words;8 * this._nDataBytes;var s = 8 * t.sigBytes;var a = 32 * this.blockSize;r[s >>> 5] |= 1 << 24 - s % 32;r[(e.ceil((s + 1) / a) * a >>> 5) - 1] |= 128;t.sigBytes = 4 * r.length;this._process();var o = this._state;var u = this.cfg.outputLength / 8;var c = u / 8;var l = [];for (var f = 0; f < c; f++) {var h = o[f];var d = h.high;var p = h.low;d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8);p = 16711935 & (p << 8 | p >>> 24) | 4278255360 & (p << 24 | p >>> 8);l.push(p);l.push(d);}return new n.init(l, u);}, clone: function clone() {var t = s.clone.call(this);var e = t._state = this._state.slice(0);for (var r = 0; r < 25; r++) {e[r] = e[r].clone();}return t;} });r.SHA3 = s._createHelper(d);r.HmacSHA3 = s._createHmacHelper(d);})(Math);return t.SHA3;});}, 7460: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(4938), r(34));})(this, function (t) {(function () {var e = t;var r = e.x64;var i = r.Word;var n = r.WordArray;var s = e.algo;var a = s.SHA512;var o = s.SHA384 = a.extend({ _doReset: function _doReset() {this._hash = new n.init([new i.init(3418070365, 3238371032), new i.init(1654270250, 914150663), new i.init(2438529370, 812702999), new i.init(355462360, 4144912697), new i.init(1731405415, 4290775857), new i.init(2394180231, 1750603025), new i.init(3675008525, 1694076839), new i.init(1203062813, 3204075428)]);}, _doFinalize: function _doFinalize() {var t = a._doFinalize.call(this);t.sigBytes -= 16;return t;} });e.SHA384 = a._createHelper(o);e.HmacSHA384 = a._createHmacHelper(o);})();return t.SHA384;});}, 34: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(4938));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.Hasher;var n = e.x64;var s = n.Word;var a = n.WordArray;var o = e.algo;function u() {return s.create.apply(s, arguments);}var c = [u(1116352408, 3609767458), u(1899447441, 602891725), u(3049323471, 3964484399), u(3921009573, 2173295548), u(961987163, 4081628472), u(1508970993, 3053834265), u(2453635748, 2937671579), u(2870763221, 3664609560), u(3624381080, 2734883394), u(310598401, 1164996542), u(607225278, 1323610764), u(1426881987, 3590304994), u(1925078388, 4068182383), u(2162078206, 991336113), u(2614888103, 633803317), u(3248222580, 3479774868), u(3835390401, 2666613458), u(4022224774, 944711139), u(264347078, 2341262773), u(604807628, 2007800933), u(770255983, 1495990901), u(1249150122, 1856431235), u(1555081692, 3175218132), u(1996064986, 2198950837), u(2554220882, 3999719339), u(2821834349, 766784016), u(2952996808, 2566594879), u(3210313671, 3203337956), u(3336571891, 1034457026), u(3584528711, 2466948901), u(113926993, 3758326383), u(338241895, 168717936), u(666307205, 1188179964), u(773529912, 1546045734), u(1294757372, 1522805485), u(1396182291, 2643833823), u(1695183700, 2343527390), u(1986661051, 1014477480), u(2177026350, 1206759142), u(2456956037, 344077627), u(2730485921, 1290863460), u(2820302411, 3158454273), u(3259730800, 3505952657), u(3345764771, 106217008), u(3516065817, 3606008344), u(3600352804, 1432725776), u(4094571909, 1467031594), u(275423344, 851169720), u(430227734, 3100823752), u(506948616, 1363258195), u(659060556, 3750685593), u(883997877, 3785050280), u(958139571, 3318307427), u(1322822218, 3812723403), u(1537002063, 2003034995), u(1747873779, 3602036899), u(1955562222, 1575990012), u(2024104815, 1125592928), u(2227730452, 2716904306), u(2361852424, 442776044), u(2428436474, 593698344), u(2756734187, 3733110249), u(3204031479, 2999351573), u(3329325298, 3815920427), u(3391569614, 3928383900), u(3515267271, 566280711), u(3940187606, 3454069534), u(4118630271, 4000239992), u(116418474, 1914138554), u(174292421, 2731055270), u(289380356, 3203993006), u(460393269, 320620315), u(685471733, 587496836), u(852142971, 1086792851), u(1017036298, 365543100), u(1126000580, 2618297676), u(1288033470, 3409855158), u(1501505948, 4234509866), u(1607167915, 987167468), u(1816402316, 1246189591)];var l = [];(function () {for (var t = 0; t < 80; t++) {l[t] = u();}})();var f = o.SHA512 = i.extend({ _doReset: function _doReset() {this._hash = new a.init([new s.init(1779033703, 4089235720), new s.init(3144134277, 2227873595), new s.init(1013904242, 4271175723), new s.init(2773480762, 1595750129), new s.init(1359893119, 2917565137), new s.init(2600822924, 725511199), new s.init(528734635, 4215389547), new s.init(1541459225, 327033209)]);}, _doProcessBlock: function _doProcessBlock(t, e) {var r = this._hash.words;var i = r[0];var n = r[1];var s = r[2];var a = r[3];var o = r[4];var u = r[5];var f = r[6];var h = r[7];var d = i.high;var p = i.low;var v = n.high;var g = n.low;var y = s.high;var m = s.low;var w = a.high;var S = a.low;var _ = o.high;var b = o.low;var E = u.high;var D = u.low;var M = f.high;var T = f.low;var I = h.high;var A = h.low;var x = d;var R = p;var B = v;var O = g;var k = y;var C = m;var N = w;var P = S;var V = _;var L = b;var H = E;var K = D;var U = M;var j = T;var q = I;var F = A;for (var z = 0; z < 80; z++) {var G;var Y;var W = l[z];if (z < 16) {Y = W.high = 0 | t[e + 2 * z];G = W.low = 0 | t[e + 2 * z + 1];} else {var J = l[z - 15];var Z = J.high;var $ = J.low;var X = (Z >>> 1 | $ << 31) ^ (Z >>> 8 | $ << 24) ^ Z >>> 7;var Q = ($ >>> 1 | Z << 31) ^ ($ >>> 8 | Z << 24) ^ ($ >>> 7 | Z << 25);var tt = l[z - 2];var et = tt.high;var rt = tt.low;var it = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ et >>> 6;var nt = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ (rt >>> 6 | et << 26);var st = l[z - 7];var at = st.high;var ot = st.low;var ut = l[z - 16];var ct = ut.high;var lt = ut.low;G = Q + ot;Y = X + at + (G >>> 0 < Q >>> 0 ? 1 : 0);G += nt;Y = Y + it + (G >>> 0 < nt >>> 0 ? 1 : 0);G += lt;Y = Y + ct + (G >>> 0 < lt >>> 0 ? 1 : 0);W.high = Y;W.low = G;}var ft = V & H ^ ~V & U;var ht = L & K ^ ~L & j;var dt = x & B ^ x & k ^ B & k;var pt = R & O ^ R & C ^ O & C;var vt = (x >>> 28 | R << 4) ^ (x << 30 | R >>> 2) ^ (x << 25 | R >>> 7);var gt = (R >>> 28 | x << 4) ^ (R << 30 | x >>> 2) ^ (R << 25 | x >>> 7);var yt = (V >>> 14 | L << 18) ^ (V >>> 18 | L << 14) ^ (V << 23 | L >>> 9);var mt = (L >>> 14 | V << 18) ^ (L >>> 18 | V << 14) ^ (L << 23 | V >>> 9);var wt = c[z];var St = wt.high;var _t = wt.low;var bt = F + mt;var Et = q + yt + (bt >>> 0 < F >>> 0 ? 1 : 0);var bt = bt + ht;var Et = Et + ft + (bt >>> 0 < ht >>> 0 ? 1 : 0);var bt = bt + _t;var Et = Et + St + (bt >>> 0 < _t >>> 0 ? 1 : 0);var bt = bt + G;var Et = Et + Y + (bt >>> 0 < G >>> 0 ? 1 : 0);var Dt = gt + pt;var Mt = vt + dt + (Dt >>> 0 < gt >>> 0 ? 1 : 0);q = U;F = j;U = H;j = K;H = V;K = L;L = P + bt | 0;V = N + Et + (L >>> 0 < P >>> 0 ? 1 : 0) | 0;N = k;P = C;k = B;C = O;B = x;O = R;R = bt + Dt | 0;x = Et + Mt + (R >>> 0 < bt >>> 0 ? 1 : 0) | 0;}p = i.low = p + R;i.high = d + x + (p >>> 0 < R >>> 0 ? 1 : 0);g = n.low = g + O;n.high = v + B + (g >>> 0 < O >>> 0 ? 1 : 0);m = s.low = m + C;s.high = y + k + (m >>> 0 < C >>> 0 ? 1 : 0);S = a.low = S + P;a.high = w + N + (S >>> 0 < P >>> 0 ? 1 : 0);b = o.low = b + L;o.high = _ + V + (b >>> 0 < L >>> 0 ? 1 : 0);D = u.low = D + K;u.high = E + H + (D >>> 0 < K >>> 0 ? 1 : 0);T = f.low = T + j;f.high = M + U + (T >>> 0 < j >>> 0 ? 1 : 0);A = h.low = A + F;h.high = I + q + (A >>> 0 < F >>> 0 ? 1 : 0);}, _doFinalize: function _doFinalize() {var t = this._data;var e = t.words;var r = 8 * this._nDataBytes;var i = 8 * t.sigBytes;e[i >>> 5] |= 128 << 24 - i % 32;e[(i + 128 >>> 10 << 5) + 30] = Math.floor(r / 4294967296);e[(i + 128 >>> 10 << 5) + 31] = r;t.sigBytes = 4 * e.length;this._process();var n = this._hash.toX32();return n;}, clone: function clone() {var t = i.clone.call(this);t._hash = this._hash.clone();return t;}, blockSize: 1024 / 32 });e.SHA512 = i._createHelper(f);e.HmacSHA512 = i._createHmacHelper(f);})();return t.SHA512;});}, 4253: function _(t, e, r) {(function (i, n, s) {t.exports = n(r(8249), r(8269), r(8214), r(888), r(5109));})(this, function (t) {(function () {var e = t;var r = e.lib;var i = r.WordArray;var n = r.BlockCipher;var s = e.algo;var a = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];var o = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];var u = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];var c = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }];var l = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];var f = s.DES = n.extend({ _doReset: function _doReset() {var t = this._key;var e = t.words;var r = [];for (var i = 0; i < 56; i++) {var n = a[i] - 1;r[i] = e[n >>> 5] >>> 31 - n % 32 & 1;}var s = this._subKeys = [];for (var c = 0; c < 16; c++) {var l = s[c] = [];var f = u[c];for (var i = 0; i < 24; i++) {l[i / 6 | 0] |= r[(o[i] - 1 + f) % 28] << 31 - i % 6;l[4 + (i / 6 | 0)] |= r[28 + (o[i + 24] - 1 + f) % 28] << 31 - i % 6;}l[0] = l[0] << 1 | l[0] >>> 31;for (var i = 1; i < 7; i++) {l[i] = l[i] >>> 4 * (i - 1) + 3;}l[7] = l[7] << 5 | l[7] >>> 27;}var h = this._invSubKeys = [];for (var i = 0; i < 16; i++) {h[i] = s[15 - i];}}, encryptBlock: function encryptBlock(t, e) {this._doCryptBlock(t, e, this._subKeys);}, decryptBlock: function decryptBlock(t, e) {this._doCryptBlock(t, e, this._invSubKeys);}, _doCryptBlock: function _doCryptBlock(t, e, r) {this._lBlock = t[e];this._rBlock = t[e + 1];h.call(this, 4, 252645135);h.call(this, 16, 65535);d.call(this, 2, 858993459);d.call(this, 8, 16711935);h.call(this, 1, 1431655765);for (var i = 0; i < 16; i++) {var n = r[i];var s = this._lBlock;var a = this._rBlock;var o = 0;for (var u = 0; u < 8; u++) {o |= c[u][((a ^ n[u]) & l[u]) >>> 0];}this._lBlock = a;this._rBlock = s ^ o;}var f = this._lBlock;this._lBlock = this._rBlock;this._rBlock = f;h.call(this, 1, 1431655765);d.call(this, 8, 16711935);d.call(this, 2, 858993459);h.call(this, 16, 65535);h.call(this, 4, 252645135);t[e] = this._lBlock;t[e + 1] = this._rBlock;}, keySize: 64 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });function h(t, e) {var r = (this._lBlock >>> t ^ this._rBlock) & e;this._rBlock ^= r;this._lBlock ^= r << t;}function d(t, e) {var r = (this._rBlock >>> t ^ this._lBlock) & e;this._lBlock ^= r;this._rBlock ^= r << t;}e.DES = n._createHelper(f);var p = s.TripleDES = n.extend({ _doReset: function _doReset() {var t = this._key;var e = t.words;if (2 !== e.length && 4 !== e.length && e.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");var r = e.slice(0, 2);var n = e.length < 4 ? e.slice(0, 2) : e.slice(2, 4);var s = e.length < 6 ? e.slice(0, 2) : e.slice(4, 6);this._des1 = f.createEncryptor(i.create(r));this._des2 = f.createEncryptor(i.create(n));this._des3 = f.createEncryptor(i.create(s));}, encryptBlock: function encryptBlock(t, e) {this._des1.encryptBlock(t, e);this._des2.decryptBlock(t, e);this._des3.encryptBlock(t, e);}, decryptBlock: function decryptBlock(t, e) {this._des3.decryptBlock(t, e);this._des2.encryptBlock(t, e);this._des1.decryptBlock(t, e);}, keySize: 192 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });e.TripleDES = n._createHelper(p);})();return t.TripleDES;});}, 4938: function _(t, e, r) {(function (i, n) {t.exports = n(r(8249));})(this, function (t) {(function (e) {var r = t;var i = r.lib;var n = i.Base;var s = i.WordArray;var a = r.x64 = {};a.Word = n.extend({ init: function init(t, e) {this.high = t;this.low = e;} });a.WordArray = n.extend({ init: function init(t, r) {t = this.words = t || [];if (r != e) this.sigBytes = r;else this.sigBytes = 8 * t.length;}, toX32: function toX32() {var t = this.words;var e = t.length;var r = [];for (var i = 0; i < e; i++) {var n = t[i];r.push(n.high);r.push(n.low);}return s.create(r, this.sigBytes);}, clone: function clone() {var t = n.clone.call(this);var e = t.words = this.words.slice(0);var r = e.length;for (var i = 0; i < r; i++) {e[i] = e[i].clone();}return t;} });})();return t;});}, 3118: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });e.ErrorCode = void 0;(function (t) {t[t["SUCCESS"] = 0] = "SUCCESS";t[t["CLIENT_ID_NOT_FOUND"] = 1] = "CLIENT_ID_NOT_FOUND";t[t["OPERATION_TOO_OFTEN"] = 2] = "OPERATION_TOO_OFTEN";t[t["REPEAT_MESSAGE"] = 3] = "REPEAT_MESSAGE";t[t["TIME_OUT"] = 4] = "TIME_OUT";})(e.ErrorCode || (e.ErrorCode = {}));}, 5987: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};var n = i(r(127));var s = i(r(1901));var a = i(r(1754));var o = i(r(1237));var u;(function (t) {function e(t) {o.default.debugMode = t;o.default.info("setDebugMode: ".concat(t));}t.setDebugMode = e;function r(t) {try {s.default.init(t);} catch (t) {o.default.error("init error", t);}}t.init = r;function i(t) {try {if (!t.url) throw new Error("invalid url");if (!t.key || !t.keyId) throw new Error("invalid key or keyId");a.default.socketUrl = t.url;a.default.publicKeyId = t.keyId;a.default.publicKey = t.key;} catch (t) {o.default.error("setSocketServer error", t);}}t.setSocketServer = i;function u(t) {try {s.default.enableSocket(t);} catch (t) {o.default.error("enableSocket error", t);}}t.enableSocket = u;function c() {return n.default.SDK_VERSION;}t.getVersion = c;})(u || (u = {}));t.exports = u;}, 2852: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(4806));var s = i(r(3396));var a = i(r(6565));var o = i(r(5912));var u = i(r(3174));var c = i(r(4698));var l = i(r(87));var f = i(r(523));var h = i(r(7252));var d = i(r(4668));var p = i(r(3072));var v = i(r(1996));var g = i(r(9342));var y = i(r(155));var m = i(r(3751));var w;(function (t) {var e;var r;var i;function w() {if ("undefined" != typeof uni) {e = new d.default();r = new p.default();i = new v.default();} else if ("undefined" != typeof tt) {e = new l.default();r = new f.default();i = new h.default();} else if ("undefined" != typeof my) {e = new n.default();r = new s.default();i = new a.default();} else if ("undefined" != typeof wx) {e = new g.default();r = new y.default();i = new m.default();} else if ("undefined" != typeof window) {e = new o.default();r = new u.default();i = new c.default();}}function S() {if (!e) w();return e;}t.getDevice = S;function _() {if (!r) w();return r;}t.getStorage = _;function b() {if (!i) w();return i;}t.getWebSocket = b;})(w || (w = {}));e["default"] = w;}, 7406: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(2852));var s;(function (t) {function e() {return n.default.getDevice().os();}t.os = e;function r() {return n.default.getDevice().osVersion();}t.osVersion = r;function i() {return n.default.getDevice().model();}t.model = i;function s() {return n.default.getDevice().brand();}t.brand = s;function a() {return n.default.getDevice().platform();}t.platform = a;function o() {return n.default.getDevice().platformVersion();}t.platformVersion = o;function u() {return n.default.getDevice().platformId();}t.platformId = u;function c() {return n.default.getDevice().language();}t.language = c;function l() {var t = n.default.getDevice().userAgent;if (t) return t();return "";}t.userAgent = l;function f(t) {n.default.getDevice().getNetworkType(t);}t.getNetworkType = f;function h(t) {n.default.getDevice().onNetworkStatusChange(t);}t.onNetworkStatusChange = h;})(s || (s = {}));e["default"] = s;}, 7071: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(1754));var s = i(r(358));var a = i(r(1236));var o = r(53);var u = i(r(1571));var c = i(r(1237));var l = i(r(2852));var f = i(r(9934));var h;(function (t) {var e;var r = false;var i = false;t.allowReconnect = true;function h() {return r && i;}t.isAvailable = h;function d(e) {if (!t.allowReconnect) return;setTimeout(function () {p();}, e);}t.reconnect = d;function p() {t.allowReconnect = true;if (!n.default.networkConnected) {c.default.info("connect failed, network is not available");return;}if (i || r) return;var s = n.default.socketUrl;try {var _t2 = f.default.getSync(f.default.KEY_REDIRECT_SERVER, "");if (_t2) {var _e = o.RedirectServerData.parse(_t2);var _r = _e.addressList[0].split(",");var _i = _r[0];var _n = Number(_r[1]);var _a = new Date().getTime();if (_a - _e.time < 1e3 * _n) s = _i;}} catch (t) {}e = l.default.getWebSocket().connect({ url: s, success: function success() {i = true;v();}, fail: function fail() {i = false;m();} });e.onOpen(w);e.onClose(b);e.onError(_);e.onMessage(S);}t.connect = p;function v() {if (i && r) {s.default.create().send();u.default.getInstance().start();}}function g(t) {var _e2;(_e2 = e) === null || _e2 === void 0 ? void 0 : _e2.close({ reason: t, success: function success(t) {}, fail: function fail(t) {m();} });}t.close = g;function y(t) {var _e3;if (r && r) (_e3 = e) === null || _e3 === void 0 ? void 0 : _e3.send({ data: t, success: function success(t) {}, fail: function fail(t) {} });else throw new Error("socket not connect");}t.send = y;function m(t) {i = false;r = false;u.default.getInstance().cancel();if (n.default.online) {var _n$default$onlineStat;n.default.online = false;(_n$default$onlineStat = n.default.onlineState) === null || _n$default$onlineStat === void 0 ? void 0 : _n$default$onlineStat.call(n.default.onlineState, { online: n.default.online });}if (n.default.online) {var _n$default$onlineStat2;n.default.online = false;(_n$default$onlineStat2 = n.default.onlineState) === null || _n$default$onlineStat2 === void 0 ? void 0 : _n$default$onlineStat2.call(n.default.onlineState, { online: n.default.online });}d(1e3);}var w = function w(t) {r = true;v();};var S = function S(t) {try {t.data;u.default.getInstance().refresh();a.default.receiveMessage(t.data);} catch (t) {}};var _ = function _(t) {g("socket error");};var b = function b(t) {m();};})(h || (h = {}));e["default"] = h;}, 9934: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(2852));var s;(function (t) {t.KEY_APPID = "getui_appid";t.KEY_CID = "getui_cid";t.KEY_SESSION = "getui_session";t.KEY_REGID = "getui_regid";t.KEY_SOCKET_URL = "getui_socket_url";t.KEY_DEVICE_ID = "getui_deviceid";t.KEY_ADD_PHONE_INFO_TIME = "getui_api_time";t.KEY_BIND_ALIAS_TIME = "getui_ba_time";t.KEY_SET_TAG_TIME = "getui_st_time";t.KEY_REDIRECT_SERVER = "getui_redirect_server";function e(t) {n.default.getStorage().set(t);}t.set = e;function r(t, e) {n.default.getStorage().setSync(t, e);}t.setSync = r;function i(t) {n.default.getStorage().get(t);}t.get = i;function s(t, e) {var r = n.default.getStorage().getSync(t);return r ? r : e;}t.getSync = s;})(s || (s = {}));e["default"] = s;}, 4806: function _(t) {var e = /*#__PURE__*/function () {"use strict";function e() {_classCallCheck(this, e);this.systemInfo = my.getSystemInfoSync();}_createClass(e, [{ key: "os", value: function os() {var _this$systemInfo;return (_this$systemInfo = this.systemInfo) === null || _this$systemInfo === void 0 ? void 0 : _this$systemInfo.platform;} }, { key: "osVersion", value: function osVersion() {var _this$systemInfo2;return (_this$systemInfo2 = this.systemInfo) === null || _this$systemInfo2 === void 0 ? void 0 : _this$systemInfo2.system;} }, { key: "model", value: function model() {var _this$systemInfo3;return (_this$systemInfo3 = this.systemInfo) === null || _this$systemInfo3 === void 0 ? void 0 : _this$systemInfo3.model;} }, { key: "brand", value: function brand() {var _this$systemInfo4;return (_this$systemInfo4 = this.systemInfo) === null || _this$systemInfo4 === void 0 ? void 0 : _this$systemInfo4.brand;} }, { key: "platform", value: function platform() {return "MP-ALIPAY";} }, { key: "platformVersion", value: function platformVersion() {return this.systemInfo.app + " " + this.systemInfo.version;} }, { key: "platformId", value: function platformId() {return my.getAppIdSync();} }, { key: "language", value: function language() {var _this$systemInfo5;return (_this$systemInfo5 = this.systemInfo) === null || _this$systemInfo5 === void 0 ? void 0 : _this$systemInfo5.language;} }, { key: "getNetworkType", value: function getNetworkType(t) {my.getNetworkType({ success: function success(e) {var _t$success;(_t$success = t.success) === null || _t$success === void 0 ? void 0 : _t$success.call(t.success, { networkType: e.networkType });}, fail: function fail() {var _t$fail;(_t$fail = t.fail) === null || _t$fail === void 0 ? void 0 : _t$fail.call(t.fail, "");} });} }, { key: "onNetworkStatusChange", value: function onNetworkStatusChange(t) {my.onNetworkStatusChange(t);} }]);return e;}();t.exports = e;}, 3396: function _(t) {var e = /*#__PURE__*/function () {"use strict";function e() {_classCallCheck(this, e);}_createClass(e, [{ key: "set", value: function set(t) {my.setStorage({ key: t.key, data: t.data, success: t.success, fail: t.fail });} }, { key: "setSync", value: function setSync(t, e) {my.setStorageSync({ key: t, data: e });} }, { key: "get", value: function get(t) {my.getStorage({ key: t.key, success: t.success, fail: t.fail, complete: t.complete });} }, { key: "getSync", value: function getSync(t) {return my.getStorageSync({ key: t }).data;} }]);return e;}();t.exports = e;}, 6565: function _(t) {var e = /*#__PURE__*/function () {"use strict";function e() {_classCallCheck(this, e);}_createClass(e, [{ key: "connect", value: function connect(t) {my.connectSocket({ url: t.url, header: t.header, method: t.method, success: t.success, fail: t.fail, complete: t.complete });return { onOpen: my.onSocketOpen, send: my.sendSocketMessage, onMessage: function onMessage(t) {my.onSocketMessage.call(my.onSocketMessage, function (e) {t.call(t, { data: e ? e.data : "" });});}, onError: my.onSocketError, onClose: my.onSocketClose, close: my.closeSocket };} }]);return e;}();t.exports = e;}, 5912: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "os", value: function os() {var t = window.navigator.userAgent.toLowerCase();if (t.indexOf("android") > 0 || t.indexOf("adr") > 0) return "android";if (!!t.match(/\(i[^;]+;( u;)? cpu.+mac os x/)) return "ios";if (t.indexOf("windows") > 0 || t.indexOf("win32") > 0 || t.indexOf("win64") > 0) return "windows";if (t.indexOf("macintosh") > 0 || t.indexOf("mac os") > 0) return "mac os";if (t.indexOf("linux") > 0) return "linux";if (t.indexOf("unix") > 0) return "linux";return "other";} }, { key: "osVersion", value: function osVersion() {var t = window.navigator.userAgent.toLowerCase();var e = t.substring(t.indexOf(";") + 1).trim();if (e.indexOf(";") > 0) return e.substring(0, e.indexOf(";")).trim();return e.substring(0, e.indexOf(")")).trim();} }, { key: "model", value: function model() {return "";} }, { key: "brand", value: function brand() {return "";} }, { key: "platform", value: function platform() {return "H5";} }, { key: "platformVersion", value: function platformVersion() {return "";} }, { key: "platformId", value: function platformId() {return "";} }, { key: "language", value: function language() {return window.navigator.language;} }, { key: "userAgent", value: function userAgent() {return window.navigator.userAgent;} }, { key: "getNetworkType", value: function getNetworkType(t) {var _t$success2;(_t$success2 = t.success) === null || _t$success2 === void 0 ? void 0 : _t$success2.call(t.success, { networkType: window.navigator.connection.type });} }, { key: "onNetworkStatusChange", value: function onNetworkStatusChange(t) {} }]);return r;}();e["default"] = r;}, 3174: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "set", value: function set(t) {var _t$success3;window.localStorage.setItem(t.key, t.data);(_t$success3 = t.success) === null || _t$success3 === void 0 ? void 0 : _t$success3.call(t.success, "");} }, { key: "setSync", value: function setSync(t, e) {window.localStorage.setItem(t, e);} }, { key: "get", value: function get(t) {var _t$success4;var e = window.localStorage.getItem(t.key);(_t$success4 = t.success) === null || _t$success4 === void 0 ? void 0 : _t$success4.call(t.success, e);} }, { key: "getSync", value: function getSync(t) {return window.localStorage.getItem(t);} }]);return r;}();e["default"] = r;}, 4698: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "connect", value: function connect(t) {var e = new WebSocket(t.url);return { send: function send(t) {try {var _t$success5;e.send(t.data);(_t$success5 = t.success) === null || _t$success5 === void 0 ? void 0 : _t$success5.call(t.success, { errMsg: "" });} catch (e) {var _t$fail2;(_t$fail2 = t.fail) === null || _t$fail2 === void 0 ? void 0 : _t$fail2.call(t.fail, { errMsg: e + "" });}}, close: function close(t) {try {var _t$success6;e.close(t.code, t.reason);(_t$success6 = t.success) === null || _t$success6 === void 0 ? void 0 : _t$success6.call(t.success, { errMsg: "" });} catch (e) {var _t$fail3;(_t$fail3 = t.fail) === null || _t$fail3 === void 0 ? void 0 : _t$fail3.call(t.fail, { errMsg: e + "" });}}, onOpen: function onOpen(r) {e.onopen = function (e) {var _t$success7;(_t$success7 = t.success) === null || _t$success7 === void 0 ? void 0 : _t$success7.call(t.success, "");r({ header: "" });};}, onError: function onError(r) {e.onerror = function (e) {var _t$fail4;(_t$fail4 = t.fail) === null || _t$fail4 === void 0 ? void 0 : _t$fail4.call(t.fail, "");r({ errMsg: "" });};}, onMessage: function onMessage(t) {e.onmessage = function (e) {t({ data: e.data });};}, onClose: function onClose(t) {e.onclose = function (e) {t(e);};} };} }]);return r;}();e["default"] = r;}, 87: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);this.systemInfo = tt.getSystemInfoSync();}_createClass(r, [{ key: "os", value: function os() {return this.systemInfo.platform;} }, { key: "osVersion", value: function osVersion() {return this.systemInfo.system;} }, { key: "model", value: function model() {return this.systemInfo.model;} }, { key: "brand", value: function brand() {return this.systemInfo.brand;} }, { key: "platform", value: function platform() {return "MP-TOUTIAO";} }, { key: "platformVersion", value: function platformVersion() {return this.systemInfo.appName + " " + this.systemInfo.version;} }, { key: "language", value: function language() {return "";} }, { key: "platformId", value: function platformId() {return "";} }, { key: "getNetworkType", value: function getNetworkType(t) {tt.getNetworkType(t);} }, { key: "onNetworkStatusChange", value: function onNetworkStatusChange(t) {tt.onNetworkStatusChange(t);} }]);return r;}();e["default"] = r;}, 523: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "set", value: function set(t) {tt.setStorage(t);} }, { key: "setSync", value: function setSync(t, e) {tt.setStorageSync(t, e);} }, { key: "get", value: function get(t) {tt.getStorage(t);} }, { key: "getSync", value: function getSync(t) {return tt.getStorageSync(t);} }]);return r;}();e["default"] = r;}, 7252: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "connect", value: function connect(t) {var e = tt.connectSocket({ url: t.url, header: t.header, protocols: t.protocols, success: t.success, fail: t.fail, complete: t.complete });return { onOpen: e.onOpen, send: e.send, onMessage: e.onMessage, onError: e.onError, onClose: e.onClose, close: e.close };} }]);return r;}();e["default"] = r;}, 4668: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);try {this.systemInfo = uni.getSystemInfoSync();this.accountInfo = uni.getAccountInfoSync();} catch (t) {}}_createClass(r, [{ key: "os", value: function os() {return this.systemInfo ? this.systemInfo.platform : "";} }, { key: "model", value: function model() {return this.systemInfo ? this.systemInfo.model : "";} }, { key: "brand", value: function brand() {var _this$systemInfo6;return ((_this$systemInfo6 = this.systemInfo) === null || _this$systemInfo6 === void 0 ? void 0 : _this$systemInfo6.brand) ? this.systemInfo.brand : "";} }, { key: "osVersion", value: function osVersion() {return this.systemInfo ? this.systemInfo.system : "";} }, { key: "platform", value: function platform() {var t = "";













                t = "MP-WEIXIN";




























                return t;} }, { key: "platformVersion", value: function platformVersion() {return this.systemInfo ? this.systemInfo.version : "";} }, { key: "platformId", value: function platformId() {return this.accountInfo ? this.accountInfo.miniProgram.appId : "";} }, { key: "language", value: function language() {var _this$systemInfo7;return ((_this$systemInfo7 = this.systemInfo) === null || _this$systemInfo7 === void 0 ? void 0 : _this$systemInfo7.language) ? this.systemInfo.language : "";} }, { key: "userAgent", value: function userAgent() {return window ? window.navigator.userAgent : "";} }, { key: "getNetworkType", value: function getNetworkType(t) {uni.getNetworkType(t);} }, { key: "onNetworkStatusChange", value: function onNetworkStatusChange(t) {uni.onNetworkStatusChange(t);} }]);return r;}();e["default"] = r;}, 3072: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "set", value: function set(t) {uni.setStorage(t);} }, { key: "setSync", value: function setSync(t, e) {uni.setStorageSync(t, e);} }, { key: "get", value: function get(t) {uni.getStorage(t);} }, { key: "getSync", value: function getSync(t) {return uni.getStorageSync(t);} }]);return r;}();e["default"] = r;}, 1996: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "connect", value: function connect(t) {var e = uni.connectSocket(t);return { send: function send(t) {




                    e === null || e === void 0 ? void 0 : e.send(t);

                  }, close: function close(t) {




                    e === null || e === void 0 ? void 0 : e.close(t);

                  }, onOpen: function onOpen(t) {




                    e === null || e === void 0 ? void 0 : e.onOpen(t);

                  }, onError: function onError(t) {




                    e === null || e === void 0 ? void 0 : e.onError(t);

                  }, onMessage: function onMessage(t) {




                    e === null || e === void 0 ? void 0 : e.onMessage(t);

                  }, onClose: function onClose(t) {




                    e === null || e === void 0 ? void 0 : e.onClose(t);

                  } };} }]);return r;}();e["default"] = r;}, 9342: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);this.systemInfo = wx.getSystemInfoSync();}_createClass(r, [{ key: "os", value: function os() {return this.systemInfo.platform;} }, { key: "osVersion", value: function osVersion() {return this.systemInfo.system;} }, { key: "model", value: function model() {return this.systemInfo.model;} }, { key: "brand", value: function brand() {return this.systemInfo.brand;} }, { key: "platform", value: function platform() {return "MP-WEIXIN";} }, { key: "platformVersion", value: function platformVersion() {return this.systemInfo.version;} }, { key: "language", value: function language() {return this.systemInfo.language;} }, { key: "platformId", value: function platformId() {if (wx.canIUse("getAccountInfoSync")) return wx.getAccountInfoSync().miniProgram.appId;return "";} }, { key: "getNetworkType", value: function getNetworkType(t) {wx.getNetworkType({ success: function success(e) {var _t$success8;(_t$success8 = t.success) === null || _t$success8 === void 0 ? void 0 : _t$success8.call(t.success, { networkType: e.networkType });}, fail: t.fail });} }, { key: "onNetworkStatusChange", value: function onNetworkStatusChange(t) {wx.onNetworkStatusChange(t);} }]);return r;}();e["default"] = r;}, 155: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "set", value: function set(t) {wx.setStorage(t);} }, { key: "setSync", value: function setSync(t, e) {wx.setStorageSync(t, e);} }, { key: "get", value: function get(t) {wx.getStorage(t);} }, { key: "getSync", value: function getSync(t) {return wx.getStorageSync(t);} }]);return r;}();e["default"] = r;}, 3751: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, [{ key: "connect", value: function connect(t) {var e = wx.connectSocket({ url: t.url, header: t.header, protocols: t.protocols, success: t.success, fail: t.fail, complete: t.complete });return { onOpen: e.onOpen, send: e.send, onMessage: e.onMessage, onError: e.onError, onClose: e.onClose, close: e.close };} }]);return r;}();e["default"] = r;}, 127: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r;(function (t) {t.SDK_VERSION = "GTMP-2.0.1.dcloud";t.DEFAULT_SOCKET_URL = "wss://wshz.getui.net:5223/nws";t.SOCKET_PROTOCOL_VERSION = "1.0";t.SERVER_PUBLIC_KEY = "MHwwDQYJKoZIhvcNAQEBBQADawAwaAJhAJp1rROuvBF7sBSnvLaesj2iFhMcY8aXyLvpnNLKs2wjL3JmEnyr++SlVa35liUlzi83tnAFkn3A9GB7pHBNzawyUkBh8WUhq5bnFIkk2RaDa6+5MpG84DEv52p7RR+aWwIDAQAB";t.SERVER_PUBLIC_KEY_ID = "69d747c4b9f641baf4004be4297e9f3b";})(r || (r = {}));e["default"] = r;}, 1901: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(7071));var s = i(r(1237));var a = i(r(1754));var o = /*#__PURE__*/function () {"use strict";function o() {_classCallCheck(this, o);}_createClass(o, null, [{ key: "init", value: function init(t) {if (this.inited) return;try {this.checkAppid(t.appid);this.inited = true;s.default.info("init: appid=".concat(t.appid));a.default.init(t);n.default.connect();} catch (e) {var _t$onError;this.inited = false;(_t$onError = t.onError) === null || _t$onError === void 0 ? void 0 : _t$onError.call(t.onError, { error: e });throw e;}} }, { key: "enableSocket", value: function enableSocket(t) {this.checkInit();n.default.allowReconnect = t;if (t) n.default.reconnect(0);else n.default.close("enableSocket ".concat(t));} }, { key: "checkInit", value: function checkInit() {if (!this.inited) throw new Error("not init, please invoke init method firstly");} }, { key: "checkAppid", value: function checkAppid(t) {if (null == t || void 0 == t || "" == t.trim()) throw new Error("invalid appid ".concat(t));} }]);return o;}();o.inited = false;e["default"] = o;}, 1754: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(323));var s = i(r(9934));var a = i(r(127));var o = i(r(7071));var u = i(r(1237));var c = i(r(5574));var l = i(r(7406));var f = /*#__PURE__*/function () {"use strict";function f() {_classCallCheck(this, f);}_createClass(f, null, [{ key: "init", value: function init(t) {var _this$onClientId;this.appid = c.default.to_getui(t.appid);u.default.info("getui appid: ".concat(this.appid));this.onError = t.onError;this.onClientId = t.onClientId;this.onlineState = t.onlineState;this.onPushMsg = t.onPushMsg;if (this.appid != s.default.getSync(s.default.KEY_APPID, this.appid)) {u.default.info("appid changed, clear session and cid");s.default.setSync(s.default.KEY_CID, "");s.default.setSync(s.default.KEY_SESSION, "");}s.default.setSync(s.default.KEY_APPID, this.appid);this.cid = s.default.getSync(s.default.KEY_CID, this.cid);if (this.cid) (_this$onClientId = this.onClientId) === null || _this$onClientId === void 0 ? void 0 : _this$onClientId.call(this.onClientId, { cid: f.cid });this.session = s.default.getSync(s.default.KEY_SESSION, this.session);this.deviceId = s.default.getSync(s.default.KEY_DEVICE_ID, this.deviceId);this.regId = s.default.getSync(s.default.KEY_REGID, this.regId);if (!this.regId) {this.regId = this.createRegId();s.default.set({ key: s.default.KEY_REGID, data: this.regId });}this.socketUrl = s.default.getSync(s.default.KEY_SOCKET_URL, this.socketUrl);var e = this;l.default.getNetworkType({ success: function success(t) {e.networkType = t.networkType;e.networkConnected = "none" != e.networkType && "" != e.networkType;} });l.default.onNetworkStatusChange(function (t) {e.networkConnected = t.isConnected;e.networkType = t.networkType;if (e.networkConnected) o.default.reconnect(0);});} }, { key: "createRegId", value: function createRegId() {return "M-V".concat(n.default.md5Hex(this.getUuid()), "-").concat(new Date().getTime());} }, { key: "getUuid", value: function getUuid() {return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {var e = 16 * Math.random() | 0,r = "x" === t ? e : 3 & e | 8;return r.toString(16);});} }]);return f;}();f.appid = "";f.cid = "";f.regId = "";f.session = "";f.deviceId = "";f.packetId = 1;f.online = false;f.socketUrl = a.default.DEFAULT_SOCKET_URL;f.publicKeyId = a.default.SERVER_PUBLIC_KEY_ID;f.publicKey = a.default.SERVER_PUBLIC_KEY;f.lastAliasTime = 0;f.networkConnected = true;f.networkType = "none";e["default"] = f;}, 9214: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};var n, s;Object.defineProperty(e, "__esModule", { value: true });var a = i(r(9800));var o = r(3118);var u = i(r(1754));var c = /*#__PURE__*/function (_a$default) {"use strict";_inherits(c, _a$default);var _super = _createSuper(c);function c() {var _this;_classCallCheck(this, c);_this = _super.apply(this, arguments);_this.actionMsgData = new l();return _this;}_createClass(c, [{ key: "send", value: function send() {var _this2 = this;setTimeout(function () {if (c.waitingLoginMsgMap.has(_this2.actionMsgData.msgId) || c.waitingResponseMsgMap.has(_this2.actionMsgData.msgId)) {var _this2$callback;c.waitingLoginMsgMap.delete(_this2.actionMsgData.msgId);c.waitingResponseMsgMap.delete(_this2.actionMsgData.msgId);(_this2$callback = _this2.callback) === null || _this2$callback === void 0 ? void 0 : _this2$callback.call(_this2.callback, { resultCode: o.ErrorCode.TIME_OUT, message: "waiting time out" });}}, 1e4);if (!u.default.online) {c.waitingLoginMsgMap.set(this.actionMsgData.msgId, this);return;}if (this.actionMsgData.msgAction != c.ClientAction.RECEIVED) c.waitingResponseMsgMap.set(this.actionMsgData.msgId, this);_get(_getPrototypeOf(c.prototype), "send", this).call(this);} }, { key: "receive", value: function receive() {} }], [{ key: "initActionMsg", value: function initActionMsg(t) {_get(_getPrototypeOf(c), "initMsg", this).call(this, t);t.command = a.default.Command.CLIENT_MSG;t.data = t.actionMsgData = l.create();return t;} }, { key: "parseActionMsg", value: function parseActionMsg(t, e) {_get(_getPrototypeOf(c), "parseMsg", this).call(this, t, e);t.actionMsgData = l.parse(t.data);return t;} }, { key: "sendWaitingMessages", value: function sendWaitingMessages() {var t = this.waitingLoginMsgMap.keys();var e;while (e = t.next(), !e.done) {var _t3 = this.waitingLoginMsgMap.get(e.value);this.waitingLoginMsgMap.delete(e.value);_t3 === null || _t3 === void 0 ? void 0 : _t3.send();}} }, { key: "getWaitingResponseMessage", value: function getWaitingResponseMessage(t) {return c.waitingResponseMsgMap.get(t);} }, { key: "removeWaitingResponseMessage", value: function removeWaitingResponseMessage(t) {var e = c.waitingResponseMsgMap.get(t);if (e) c.waitingResponseMsgMap.delete(t);return e;} }]);return c;}(a.default);c.ServerAction = (n = function n() {"use strict";_classCallCheck(this, n);}, n.PUSH_MESSAGE = "pushmessage", n.REDIRECT_SERVER = "redirect_server", n.ADD_PHONE_INFO_RESULT = "addphoneinfo", n.SET_MODE_RESULT = "set_mode_result", n.SET_TAG_RESULT = "settag_result", n.BIND_ALIAS_RESULT = "response_bind", n.UNBIND_ALIAS_RESULT = "response_unbind", n.FEED_BACK_RESULT = "pushmessage_feedback", n.RECEIVED = "received", n);c.ClientAction = (s = function s() {"use strict";_classCallCheck(this, s);}, s.ADD_PHONE_INFO = "addphoneinfo", s.SET_MODE = "set_mode", s.FEED_BACK = "pushmessage_feedback", s.SET_TAGS = "set_tag", s.BIND_ALIAS = "bind_alias", s.UNBIND_ALIAS = "unbind_alias", s.RECEIVED = "received", s);c.waitingLoginMsgMap = new Map();c.waitingResponseMsgMap = new Map();var l = /*#__PURE__*/function () {"use strict";function l() {_classCallCheck(this, l);this.appId = "";this.cid = "";this.msgId = "";this.msgAction = "";this.msgData = "";this.msgExtraData = "";}_createClass(l, null, [{ key: "create", value: function create() {var t = new l();t.appId = u.default.appid;t.cid = u.default.cid;t.msgId = (2147483647 & new Date().getTime()).toString();return t;} }, { key: "parse", value: function parse(t) {var e = new l();var r = JSON.parse(t);e.appId = r.appId;e.cid = r.cid;e.msgId = r.msgId;e.msgAction = r.msgAction;e.msgData = r.msgData;e.msgExtraData = r.msgExtraData;return e;} }]);return l;}();e["default"] = c;}, 708: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(7406));var s = i(r(9934));var a = i(r(127));var o = r(3118);var u = i(r(9214));var c = i(r(1754));var l = /*#__PURE__*/function (_u$default) {"use strict";_inherits(l, _u$default);var _super2 = _createSuper(l);function l() {var _this3;_classCallCheck(this, l);_this3 = _super2.apply(this, arguments);_this3.addPhoneInfoData = new f();return _this3;}_createClass(l, [{ key: "send", value: function send() {var t = new Date().getTime();var e = s.default.getSync(s.default.KEY_ADD_PHONE_INFO_TIME, 0);if (t - e < 24 * 60 * 60 * 1e3) return;_get(_getPrototypeOf(l.prototype), "send", this).call(this);} }], [{ key: "create", value: function create() {var t = new l();_get(_getPrototypeOf(l), "initActionMsg", this).call(this, t);t.callback = function (e) {if (e.resultCode != o.ErrorCode.SUCCESS && e.resultCode != o.ErrorCode.REPEAT_MESSAGE) setTimeout(function () {t.send();}, 30 * 1e3);else s.default.set({ key: s.default.KEY_ADD_PHONE_INFO_TIME, data: new Date().getTime() });};t.actionMsgData.msgAction = u.default.ClientAction.ADD_PHONE_INFO;t.addPhoneInfoData = f.create();t.actionMsgData.msgData = JSON.stringify(t.addPhoneInfoData);return t;} }]);return l;}(u.default);var f = /*#__PURE__*/function () {"use strict";function f() {_classCallCheck(this, f);this.model = "";this.brand = "";this.system_version = "";this.version = "";this.deviceid = "";this.type = "";}_createClass(f, null, [{ key: "create", value: function create() {var t = new f();t.model = n.default.model();t.brand = n.default.brand();t.system_version = n.default.osVersion();t.version = a.default.SDK_VERSION;t.device_token = "";t.imei = "";t.oaid = "";t.mac = "";t.idfa = "";t.type = "MINIPROGRAM";t.deviceid = "".concat(t.type, "-").concat(c.default.deviceId);t.extra = { os: n.default.os(), platform: n.default.platform(), platformVersion: n.default.platformVersion(), platformId: n.default.platformId(), language: n.default.language(), userAgent: n.default.userAgent() };return t;} }]);return f;}();e["default"] = l;}, 652: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};var n, s;Object.defineProperty(e, "__esModule", { value: true });var a = i(r(1754));var o = r(3118);var u = i(r(9214));var c = /*#__PURE__*/function (_u$default2) {"use strict";_inherits(c, _u$default2);var _super3 = _createSuper(c);function c() {var _this4;_classCallCheck(this, c);_this4 = _super3.apply(this, arguments);_this4.feedbackData = new l();return _this4;}_createClass(c, [{ key: "send", value: function send() {_get(_getPrototypeOf(c.prototype), "send", this).call(this);} }], [{ key: "create", value: function create(t, e) {var r = new c();_get(_getPrototypeOf(c), "initActionMsg", this).call(this, r);r.callback = function (t) {if (t.resultCode != o.ErrorCode.SUCCESS && t.resultCode != o.ErrorCode.REPEAT_MESSAGE) setTimeout(function () {r.send();}, 30 * 1e3);};r.feedbackData = l.create(t, e);r.actionMsgData.msgAction = u.default.ClientAction.FEED_BACK;r.actionMsgData.msgData = JSON.stringify(r.feedbackData);return r;} }]);return c;}(u.default);c.ActionId = (n = function n() {"use strict";_classCallCheck(this, n);}, n.RECEIVE = "0", n.MP_RECEIVE = "210000", n.WEB_RECEIVE = "220000", n.BEGIN = "1", n);c.RESULT = (s = function s() {"use strict";_classCallCheck(this, s);}, s.OK = "ok", s);var l = /*#__PURE__*/function () {"use strict";function l() {_classCallCheck(this, l);this.messageid = "";this.appkey = "";this.appid = "";this.taskid = "";this.actionid = "";this.result = "";this.timestamp = "";}_createClass(l, null, [{ key: "create", value: function create(t, e) {var r = new l();r.messageid = t.pushMessageData.messageid;r.appkey = t.pushMessageData.appKey;r.appid = a.default.appid;r.taskid = t.pushMessageData.taskId;r.actionid = e;r.result = c.RESULT.OK;r.timestamp = new Date().getTime().toString();return r;} }]);return l;}();e["default"] = c;}, 6561: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9800));var s = /*#__PURE__*/function (_n$default) {"use strict";_inherits(s, _n$default);var _super4 = _createSuper(s);function s() {_classCallCheck(this, s);return _super4.apply(this, arguments);}_createClass(s, null, [{ key: "create", value: function create() {var t = new s();_get(_getPrototypeOf(s), "initMsg", this).call(this, t);t.command = n.default.Command.HEART_BEAT;return t;} }]);return s;}(n.default);e["default"] = s;}, 358: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(323));var s = i(r(1754));var a = i(r(9800));var o = /*#__PURE__*/function (_a$default2) {"use strict";_inherits(o, _a$default2);var _super5 = _createSuper(o);function o() {var _this5;_classCallCheck(this, o);_this5 = _super5.apply(this, arguments);_this5.keyNegotiateData = new u();return _this5;}_createClass(o, [{ key: "send", value: function send() {_get(_getPrototypeOf(o.prototype), "send", this).call(this);} }], [{ key: "create", value: function create() {var t = new o();_get(_getPrototypeOf(o), "initMsg", this).call(this, t);t.command = a.default.Command.KEY_NEGOTIATE;n.default.resetKey();t.data = t.keyNegotiateData = u.create();return t;} }]);return o;}(a.default);var u = /*#__PURE__*/function () {"use strict";function u() {_classCallCheck(this, u);this.appId = "";this.rsaPublicKeyId = "";this.algorithm = "";this.secretKey = "";this.iv = "";}_createClass(u, null, [{ key: "create", value: function create() {var t = new u();t.appId = s.default.appid;t.rsaPublicKeyId = s.default.publicKeyId;t.algorithm = "AES";t.secretKey = n.default.getEncryptedSecretKey();t.iv = n.default.getEncryptedIV();return t;} }]);return u;}();e["default"] = o;}, 5301: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9800));var s = i(r(323));var a = i(r(2544));var o = i(r(1237));var u = i(r(1754));var c = /*#__PURE__*/function (_n$default2) {"use strict";_inherits(c, _n$default2);var _super6 = _createSuper(c);function c() {var _this6;_classCallCheck(this, c);_this6 = _super6.apply(this, arguments);_this6.keyNegotiateResultData = new l();return _this6;}_createClass(c, [{ key: "receive", value: function receive() {if (0 != this.keyNegotiateResultData.errorCode) {var _u$default$onError;o.default.error("key negotiate fail: ".concat(this.data));(_u$default$onError = u.default.onError) === null || _u$default$onError === void 0 ? void 0 : _u$default$onError.call(u.default.onError, { error: "key negotiate fail: ".concat(this.data) });return;}var t = this.keyNegotiateResultData.encryptType.split("/");if (!s.default.algorithmMap.has(t[0].trim().toLowerCase()) || !s.default.modeMap.has(t[1].trim().toLowerCase()) || !s.default.paddingMap.has(t[2].trim().toLowerCase())) {var _u$default$onError2;o.default.error("key negotiate fail: ".concat(this.data));(_u$default$onError2 = u.default.onError) === null || _u$default$onError2 === void 0 ? void 0 : _u$default$onError2.call(u.default.onError, { error: "key negotiate fail: ".concat(this.data) });return;}s.default.setEncryptParams(t[0].trim().toLowerCase(), t[1].trim().toLowerCase(), t[2].trim().toLowerCase());a.default.create().send();} }], [{ key: "parse", value: function parse(t) {var e = new c();_get(_getPrototypeOf(c), "parseMsg", this).call(this, e, t);e.keyNegotiateResultData = l.parse(e.data);return e;} }]);return c;}(n.default);var l = /*#__PURE__*/function () {"use strict";function l() {_classCallCheck(this, l);this.errorCode = -1;this.errorMsg = "";this.encryptType = "";}_createClass(l, null, [{ key: "parse", value: function parse(t) {var e = new l();var r = JSON.parse(t);e.errorCode = r.errorCode;e.errorMsg = r.errorMsg;e.encryptType = r.encryptType;return e;} }]);return l;}();e["default"] = c;}, 2544: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(1754));var s = i(r(323));var a = i(r(9800));var o = i(r(3527));var u = /*#__PURE__*/function (_a$default3) {"use strict";_inherits(u, _a$default3);var _super7 = _createSuper(u);function u() {var _this7;_classCallCheck(this, u);_this7 = _super7.apply(this, arguments);_this7.loginData = new c();return _this7;}_createClass(u, [{ key: "send", value: function send() {if (!this.loginData.session || n.default.cid != s.default.md5Hex(this.loginData.session)) {o.default.create().send();return;}_get(_getPrototypeOf(u.prototype), "send", this).call(this);} }], [{ key: "create", value: function create() {var t = new u();_get(_getPrototypeOf(u), "initMsg", this).call(this, t);t.command = a.default.Command.LOGIN;t.data = t.loginData = c.create();return t;} }]);return u;}(a.default);var c = /*#__PURE__*/function () {"use strict";function c() {_classCallCheck(this, c);this.appId = "";this.session = "";}_createClass(c, null, [{ key: "create", value: function create() {var t = new c();t.appId = n.default.appid;t.session = n.default.session;return t;} }]);return c;}();e["default"] = u;}, 8734: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9934));var s = i(r(9800));var a = i(r(1754));var o = i(r(9214));var u = i(r(708));var c = i(r(2544));var l = /*#__PURE__*/function (_s$default) {"use strict";_inherits(l, _s$default);var _super8 = _createSuper(l);function l() {var _this8;_classCallCheck(this, l);_this8 = _super8.apply(this, arguments);_this8.loginResultData = new f();return _this8;}_createClass(l, [{ key: "receive", value: function receive() {if (0 != this.loginResultData.errorCode) {this.data;a.default.session = a.default.cid = "";n.default.setSync(n.default.KEY_CID, "");n.default.setSync(n.default.KEY_SESSION, "");c.default.create().send();return;}if (!a.default.online) {var _a$default$onlineStat;a.default.online = true;(_a$default$onlineStat = a.default.onlineState) === null || _a$default$onlineStat === void 0 ? void 0 : _a$default$onlineStat.call(a.default.onlineState, { online: a.default.online });}o.default.sendWaitingMessages();u.default.create().send();} }], [{ key: "parse", value: function parse(t) {var e = new l();_get(_getPrototypeOf(l), "parseMsg", this).call(this, e, t);e.loginResultData = f.parse(e.data);return e;} }]);return l;}(s.default);var f = /*#__PURE__*/function () {"use strict";function f() {_classCallCheck(this, f);this.errorCode = -1;this.errorMsg = "";this.session = "";}_createClass(f, null, [{ key: "parse", value: function parse(t) {var e = new f();var r = JSON.parse(t);e.errorCode = r.errorCode;e.errorMsg = r.errorMsg;e.session = r.session;return e;} }]);return f;}();e["default"] = l;}, 9800: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};var n;Object.defineProperty(e, "__esModule", { value: true });var s = i(r(350));var a = i(r(7071));var o = i(r(127));var u = i(r(1754));var c = /*#__PURE__*/function () {"use strict";function c() {_classCallCheck(this, c);this.version = "";this.command = 0;this.packetId = 0;this.timeStamp = 0;this.data = "";this.signature = "";}_createClass(c, [{ key: "stringify", value: function stringify() {return JSON.stringify(this, ["version", "command", "packetId", "timeStamp", "data", "signature"]);} }, { key: "send", value: function send() {if (!a.default.isAvailable()) return;this.packetId = u.default.packetId++;this.data = JSON.stringify(this.data);this.stringify();if (this.command != c.Command.HEART_BEAT) {s.default.sign(this);if (this.data && this.command != c.Command.KEY_NEGOTIATE) s.default.encrypt(this);}a.default.send(this.stringify());} }], [{ key: "initMsg", value: function initMsg(t) {t.version = o.default.SOCKET_PROTOCOL_VERSION;t.command = 0;t.timeStamp = new Date().getTime();return t;} }, { key: "parseMsg", value: function parseMsg(t, e) {var r = JSON.parse(e);t.version = r.version;t.command = r.command;t.packetId = r.packetId;t.timeStamp = r.timeStamp;t.data = r.data;t.signature = r.signature;return t;} }]);return c;}();c.Command = (n = function n() {"use strict";_classCallCheck(this, n);}, n.HEART_BEAT = 0, n.KEY_NEGOTIATE = 1, n.KEY_NEGOTIATE_RESULT = 16, n.REGISTER = 2, n.REGISTER_RESULT = 32, n.LOGIN = 3, n.LOGIN_RESULT = 48, n.LOGOUT = 4, n.LOGOUT_RESULT = 64, n.CLIENT_MSG = 5, n.SERVER_MSG = 80, n.SERVER_CLOSE = 96, n.REDIRECT_SERVER = 112, n);e["default"] = c;}, 350: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(323));var s;(function (t) {function e(t) {t.data = n.default.encrypt(t.data);}t.encrypt = e;function r(t) {t.data = n.default.decrypt(t.data);}t.decrypt = r;function i(t) {t.signature = n.default.sha256("".concat(t.timeStamp).concat(t.packetId).concat(t.command).concat(t.data));}t.sign = i;function s(t) {var e = n.default.sha256("".concat(t.timeStamp).concat(t.packetId).concat(t.command).concat(t.data));if (t.signature != e) throw new Error("msg signature vierfy failed");}t.verify = s;})(s || (s = {}));e["default"] = s;}, 1236: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(5301));var s = i(r(8734));var a = i(r(9800));var o = i(r(7078));var u = i(r(538));var c = i(r(7821));var l = i(r(217));var f = i(r(7156));var h = i(r(53));var d = i(r(9214));var p = i(r(7303));var v = i(r(6063));var g = i(r(7923));var y = i(r(350));var m = i(r(9214));var w = i(r(6254));var S = i(r(5035));var _ = /*#__PURE__*/function () {"use strict";function _() {_classCallCheck(this, _);}_createClass(_, null, [{ key: "receiveMessage", value: function receiveMessage(t) {var e = a.default.parseMsg(new a.default(), t);if (e.command == a.default.Command.HEART_BEAT) return;if (e.command != a.default.Command.KEY_NEGOTIATE_RESULT && e.command != a.default.Command.SERVER_CLOSE && e.command != a.default.Command.REDIRECT_SERVER) y.default.decrypt(e);if (e.command != a.default.Command.SERVER_CLOSE && e.command != a.default.Command.REDIRECT_SERVER) y.default.verify(e);switch (e.command) {case a.default.Command.KEY_NEGOTIATE_RESULT:n.default.parse(e.stringify()).receive();break;case a.default.Command.REGISTER_RESULT:o.default.parse(e.stringify()).receive();break;case a.default.Command.LOGIN_RESULT:s.default.parse(e.stringify()).receive();break;case a.default.Command.SERVER_MSG:this.receiveActionMsg(e.stringify());break;case a.default.Command.SERVER_CLOSE:S.default.parse(e.stringify()).receive();break;case a.default.Command.REDIRECT_SERVER:h.default.parse(e.stringify()).receive();break;}} }, { key: "receiveActionMsg", value: function receiveActionMsg(t) {var e = m.default.parseActionMsg(new m.default(), t);if (e.actionMsgData.msgAction != d.default.ServerAction.RECEIVED && e.actionMsgData.msgAction != d.default.ServerAction.REDIRECT_SERVER) {var _t4 = JSON.parse(e.actionMsgData.msgData);w.default.create(_t4.id).send();}switch (e.actionMsgData.msgAction) {case d.default.ServerAction.PUSH_MESSAGE:f.default.parse(t).receive();break;case d.default.ServerAction.ADD_PHONE_INFO_RESULT:u.default.parse(t).receive();break;case d.default.ServerAction.SET_MODE_RESULT:p.default.parse(t).receive();break;case d.default.ServerAction.SET_TAG_RESULT:v.default.parse(t).receive();break;case d.default.ServerAction.BIND_ALIAS_RESULT:c.default.parse(t).receive();break;case d.default.ServerAction.UNBIND_ALIAS_RESULT:g.default.parse(t).receive();break;case d.default.ServerAction.FEED_BACK_RESULT:l.default.parse(t).receive();break;case d.default.ServerAction.RECEIVED:w.default.parse(t).receive();break;}} }]);return _;}();e["default"] = _;}, 6254: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = r(3118);var s = i(r(1754));var a = i(r(9214));var o = /*#__PURE__*/function (_a$default4) {"use strict";_inherits(o, _a$default4);var _super9 = _createSuper(o);function o() {var _this9;_classCallCheck(this, o);_this9 = _super9.apply(this, arguments);_this9.receivedData = new u();return _this9;}_createClass(o, [{ key: "receive", value: function receive() {var t = a.default.getWaitingResponseMessage(this.actionMsgData.msgId);if (t && t.actionMsgData.msgAction == a.default.ClientAction.ADD_PHONE_INFO || t && t.actionMsgData.msgAction == a.default.ClientAction.FEED_BACK) {var _t$callback;a.default.removeWaitingResponseMessage(t.actionMsgData.msgId);(_t$callback = t.callback) === null || _t$callback === void 0 ? void 0 : _t$callback.call(t.callback, { resultCode: n.ErrorCode.SUCCESS, message: "received" });}} }, { key: "send", value: function send() {_get(_getPrototypeOf(o.prototype), "send", this).call(this);} }], [{ key: "create", value: function create(t) {var e = new o();_get(_getPrototypeOf(o), "initActionMsg", this).call(this, e);e.callback = function (t) {if (t.resultCode != n.ErrorCode.SUCCESS && t.resultCode != n.ErrorCode.REPEAT_MESSAGE) setTimeout(function () {e.send();}, 3 * 1e3);};e.actionMsgData.msgAction = a.default.ClientAction.RECEIVED;e.receivedData = u.create(t);e.actionMsgData.msgData = JSON.stringify(e.receivedData);return e;} }, { key: "parse", value: function parse(t) {var e = new o();_get(_getPrototypeOf(o), "parseActionMsg", this).call(this, e, t);e.receivedData = u.parse(e.data);return e;} }]);return o;}(a.default);var u = /*#__PURE__*/function () {"use strict";function u() {_classCallCheck(this, u);this.msgId = "";this.cid = "";}_createClass(u, null, [{ key: "create", value: function create(t) {var e = new u();e.cid = s.default.cid;e.msgId = t;return e;} }, { key: "parse", value: function parse(t) {var e = new u();var r = JSON.parse(t);e.cid = r.cid;e.msgId = r.msgId;return e;} }]);return u;}();e["default"] = o;}, 53: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });e.RedirectServerData = void 0;var n = i(r(7071));var s = i(r(9934));var a = i(r(9800));var o = /*#__PURE__*/function (_a$default5) {"use strict";_inherits(o, _a$default5);var _super10 = _createSuper(o);function o() {var _this10;_classCallCheck(this, o);_this10 = _super10.apply(this, arguments);_this10.redirectServerData = new u();return _this10;}_createClass(o, [{ key: "receive", value: function receive() {this.redirectServerData;s.default.setSync(s.default.KEY_REDIRECT_SERVER, JSON.stringify(this.redirectServerData));n.default.close("redirect server");n.default.reconnect(this.redirectServerData.delay);} }], [{ key: "parse", value: function parse(t) {var e = new o();_get(_getPrototypeOf(o), "parseMsg", this).call(this, e, t);e.redirectServerData = u.parse(e.data);return e;} }]);return o;}(a.default);var u = /*#__PURE__*/function () {"use strict";function u() {_classCallCheck(this, u);this.addressList = [];this.delay = 0;this.loc = "";this.conf = "";this.time = 0;}_createClass(u, null, [{ key: "parse", value: function parse(t) {var e = new u();var r = JSON.parse(t);e.addressList = r.addressList;e.delay = r.delay;e.loc = r.loc;e.conf = r.conf;e.time = r.time ? r.time : new Date().getTime();return e;} }]);return u;}();e.RedirectServerData = u;e["default"] = o;}, 3527: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(1754));var s = i(r(9800));var a = /*#__PURE__*/function (_s$default2) {"use strict";_inherits(a, _s$default2);var _super11 = _createSuper(a);function a() {var _this11;_classCallCheck(this, a);_this11 = _super11.apply(this, arguments);_this11.registerData = new o();return _this11;}_createClass(a, [{ key: "send", value: function send() {_get(_getPrototypeOf(a.prototype), "send", this).call(this);} }], [{ key: "create", value: function create() {var t = new a();_get(_getPrototypeOf(a), "initMsg", this).call(this, t);t.command = s.default.Command.REGISTER;t.data = t.registerData = o.create();return t;} }]);return a;}(s.default);var o = /*#__PURE__*/function () {"use strict";function o() {_classCallCheck(this, o);this.appId = "";this.regId = "";}_createClass(o, null, [{ key: "create", value: function create() {var t = new o();t.appId = n.default.appid;t.regId = n.default.regId;return t;} }]);return o;}();e["default"] = a;}, 7078: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9800));var s = i(r(9934));var a = i(r(1754));var o = i(r(2544));var u = i(r(1237));var c = /*#__PURE__*/function (_n$default3) {"use strict";_inherits(c, _n$default3);var _super12 = _createSuper(c);function c() {var _this12;_classCallCheck(this, c);_this12 = _super12.apply(this, arguments);_this12.registerResultData = new l();return _this12;}_createClass(c, [{ key: "receive", value: function receive() {var _a$default$onClientId;if (0 != this.registerResultData.errorCode || !this.registerResultData.cid || !this.registerResultData.session) {var _a$default$onError;u.default.error("register fail: ".concat(this.data));(_a$default$onError = a.default.onError) === null || _a$default$onError === void 0 ? void 0 : _a$default$onError.call(a.default.onError, { error: "register fail: ".concat(this.data) });return;}if (a.default.cid != this.registerResultData.cid) s.default.setSync(s.default.KEY_ADD_PHONE_INFO_TIME, 0);a.default.cid = this.registerResultData.cid;(_a$default$onClientId = a.default.onClientId) === null || _a$default$onClientId === void 0 ? void 0 : _a$default$onClientId.call(a.default.onClientId, { cid: a.default.cid });s.default.set({ key: s.default.KEY_CID, data: a.default.cid });a.default.session = this.registerResultData.session;s.default.set({ key: s.default.KEY_SESSION, data: a.default.session });a.default.deviceId = this.registerResultData.deviceId;s.default.set({ key: s.default.KEY_DEVICE_ID, data: a.default.deviceId });o.default.create().send();} }], [{ key: "parse", value: function parse(t) {var e = new c();_get(_getPrototypeOf(c), "parseMsg", this).call(this, e, t);e.registerResultData = l.parse(e.data);return e;} }]);return c;}(n.default);var l = /*#__PURE__*/function () {"use strict";function l() {_classCallCheck(this, l);this.errorCode = -1;this.errorMsg = "";this.cid = "";this.session = "";this.deviceId = "";this.regId = "";}_createClass(l, null, [{ key: "parse", value: function parse(t) {var e = new l();var r = JSON.parse(t);e.errorCode = r.errorCode;e.errorMsg = r.errorMsg;e.cid = r.cid;e.session = r.session;e.deviceId = r.deviceId;e.regId = r.regId;return e;} }]);return l;}();e["default"] = c;}, 5035: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(7071));var s = i(r(9800));var a = /*#__PURE__*/function (_s$default3) {"use strict";_inherits(a, _s$default3);var _super13 = _createSuper(a);function a() {var _this13;_classCallCheck(this, a);_this13 = _super13.apply(this, arguments);_this13.serverCloseData = new o();return _this13;}_createClass(a, [{ key: "receive", value: function receive() {this.data;if (20 == this.serverCloseData.code || 23 == this.serverCloseData.code || 24 == this.serverCloseData.code) n.default.allowReconnect = false;n.default.close();} }], [{ key: "parse", value: function parse(t) {var e = new a();_get(_getPrototypeOf(a), "parseMsg", this).call(this, e, t);e.serverCloseData = o.parse(e.data);return e;} }]);return a;}(s.default);var o = /*#__PURE__*/function () {"use strict";function o() {_classCallCheck(this, o);this.code = -1;this.msg = "";}_createClass(o, null, [{ key: "parse", value: function parse(t) {var e = new o();var r = JSON.parse(t);e.code = r.code;e.msg = r.msg;return e;} }]);return o;}();e["default"] = a;}, 538: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9934));var s = i(r(9214));var a = /*#__PURE__*/function (_s$default4) {"use strict";_inherits(a, _s$default4);var _super14 = _createSuper(a);function a() {var _this14;_classCallCheck(this, a);_this14 = _super14.apply(this, arguments);_this14.addPhoneInfoResultData = new o();return _this14;}_createClass(a, [{ key: "receive", value: function receive() {var _t$callback2;this.addPhoneInfoResultData;var t = s.default.removeWaitingResponseMessage(this.actionMsgData.msgId);if (t) (_t$callback2 = t.callback) === null || _t$callback2 === void 0 ? void 0 : _t$callback2.call(t.callback, { resultCode: this.addPhoneInfoResultData.errorCode, message: this.addPhoneInfoResultData.errorMsg });n.default.set({ key: n.default.KEY_ADD_PHONE_INFO_TIME, data: new Date().getTime() });} }], [{ key: "parse", value: function parse(t) {var e = new a();_get(_getPrototypeOf(a), "parseActionMsg", this).call(this, e, t);e.addPhoneInfoResultData = o.parse(e.actionMsgData.msgData);return e;} }]);return a;}(s.default);var o = /*#__PURE__*/function () {"use strict";function o() {_classCallCheck(this, o);this.errorCode = -1;this.errorMsg = "";}_createClass(o, null, [{ key: "parse", value: function parse(t) {var e = new o();var r = JSON.parse(t);e.errorCode = r.errorCode;e.errorMsg = r.errorMsg;return e;} }]);return o;}();e["default"] = a;}, 7821: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9934));var s = i(r(1237));var a = i(r(9214));var o = /*#__PURE__*/function (_a$default6) {"use strict";_inherits(o, _a$default6);var _super15 = _createSuper(o);function o() {var _this15;_classCallCheck(this, o);_this15 = _super15.apply(this, arguments);_this15.bindAliasResultData = new u();return _this15;}_createClass(o, [{ key: "receive", value: function receive() {var _t$callback3;s.default.info("bind alias result", this.bindAliasResultData);var t = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);if (t) (_t$callback3 = t.callback) === null || _t$callback3 === void 0 ? void 0 : _t$callback3.call(t.callback, { resultCode: this.bindAliasResultData.errorCode, message: this.bindAliasResultData.errorMsg });n.default.set({ key: n.default.KEY_BIND_ALIAS_TIME, data: new Date().getTime() });} }], [{ key: "parse", value: function parse(t) {var e = new o();_get(_getPrototypeOf(o), "parseActionMsg", this).call(this, e, t);e.bindAliasResultData = u.parse(e.actionMsgData.msgData);return e;} }]);return o;}(a.default);var u = /*#__PURE__*/function () {"use strict";function u() {_classCallCheck(this, u);this.errorCode = -1;this.errorMsg = "";}_createClass(u, null, [{ key: "parse", value: function parse(t) {var e = new u();var r = JSON.parse(t);e.errorCode = r.errorCode;e.errorMsg = r.errorMsg;return e;} }]);return u;}();e["default"] = o;}, 217: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = r(3118);var s = i(r(9214));var a = /*#__PURE__*/function (_s$default5) {"use strict";_inherits(a, _s$default5);var _super16 = _createSuper(a);function a() {var _this16;_classCallCheck(this, a);_this16 = _super16.apply(this, arguments);_this16.feedbackResultData = new o();return _this16;}_createClass(a, [{ key: "receive", value: function receive() {var _t$callback4;this.feedbackResultData;var t = s.default.removeWaitingResponseMessage(this.actionMsgData.msgId);if (t) (_t$callback4 = t.callback) === null || _t$callback4 === void 0 ? void 0 : _t$callback4.call(t.callback, { resultCode: n.ErrorCode.SUCCESS, message: "received" });} }], [{ key: "parse", value: function parse(t) {var e = new a();_get(_getPrototypeOf(a), "parseActionMsg", this).call(this, e, t);e.feedbackResultData = o.parse(e.actionMsgData.msgData);return e;} }]);return a;}(s.default);var o = /*#__PURE__*/function () {"use strict";function o() {_classCallCheck(this, o);this.actionId = "";this.taskId = "";this.result = "";}_createClass(o, null, [{ key: "parse", value: function parse(t) {var e = new o();var r = JSON.parse(t);e.actionId = r.actionId;e.taskId = r.taskId;e.result = r.result;return e;} }]);return o;}();e["default"] = a;}, 7156: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};var n;Object.defineProperty(e, "__esModule", { value: true });var s = i(r(1754));var a = i(r(9214));var o = i(r(652));var u = /*#__PURE__*/function (_a$default7) {"use strict";_inherits(u, _a$default7);var _super17 = _createSuper(u);function u() {var _this17;_classCallCheck(this, u);_this17 = _super17.apply(this, arguments);_this17.pushMessageData = new c();return _this17;}_createClass(u, [{ key: "receive", value: function receive() {var _s$default$onPushMsg;this.pushMessageData;if (this.pushMessageData.appId != s.default.appid || !this.pushMessageData.messageid || !this.pushMessageData.taskId) this.stringify();o.default.create(this, o.default.ActionId.RECEIVE).send();o.default.create(this, o.default.ActionId.MP_RECEIVE).send();if (this.actionMsgData.msgExtraData && s.default.onPushMsg) (_s$default$onPushMsg = s.default.onPushMsg) === null || _s$default$onPushMsg === void 0 ? void 0 : _s$default$onPushMsg.call(s.default.onPushMsg, { message: this.actionMsgData.msgExtraData });} }], [{ key: "parse", value: function parse(t) {var e = new u();_get(_getPrototypeOf(u), "parseActionMsg", this).call(this, e, t);e.pushMessageData = c.parse(e.actionMsgData.msgData);return e;} }]);return u;}(a.default);var c = /*#__PURE__*/function () {"use strict";function c() {_classCallCheck(this, c);this.id = "";this.appKey = "";this.appId = "";this.messageid = "";this.taskId = "";this.actionChain = [];this.cdnType = "";}_createClass(c, null, [{ key: "parse", value: function parse(t) {var e = new c();var r = JSON.parse(t);e.id = r.id;e.appKey = r.appKey;e.appId = r.appId;e.messageid = r.messageid;e.taskId = r.taskId;e.actionChain = r.actionChain;e.cdnType = r.cdnType;return e;} }]);return c;}();n = function n() {"use strict";_classCallCheck(this, n);}, n.GO_TO = "goto", n.TRANSMIT = "transmit", n;e["default"] = u;}, 7303: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9214));var s = /*#__PURE__*/function (_n$default4) {"use strict";_inherits(s, _n$default4);var _super18 = _createSuper(s);function s() {var _this18;_classCallCheck(this, s);_this18 = _super18.apply(this, arguments);_this18.setModeResultData = new a();return _this18;}_createClass(s, [{ key: "receive", value: function receive() {var _t$callback5;this.setModeResultData;var t = n.default.removeWaitingResponseMessage(this.actionMsgData.msgId);if (t) (_t$callback5 = t.callback) === null || _t$callback5 === void 0 ? void 0 : _t$callback5.call(t.callback, { resultCode: this.setModeResultData.errorCode, message: this.setModeResultData.errorMsg });} }], [{ key: "parse", value: function parse(t) {var e = new s();_get(_getPrototypeOf(s), "parseActionMsg", this).call(this, e, t);e.setModeResultData = a.parse(e.actionMsgData.msgData);return e;} }]);return s;}(n.default);var a = /*#__PURE__*/function () {"use strict";function a() {_classCallCheck(this, a);this.errorCode = -1;this.errorMsg = "";}_createClass(a, null, [{ key: "parse", value: function parse(t) {var e = new a();var r = JSON.parse(t);e.errorCode = r.errorCode;e.errorMsg = r.errorMsg;return e;} }]);return a;}();e["default"] = s;}, 6063: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9934));var s = i(r(1237));var a = i(r(9214));var o = /*#__PURE__*/function (_a$default8) {"use strict";_inherits(o, _a$default8);var _super19 = _createSuper(o);function o() {var _this19;_classCallCheck(this, o);_this19 = _super19.apply(this, arguments);_this19.setTagResultData = new u();return _this19;}_createClass(o, [{ key: "receive", value: function receive() {var _t$callback6;s.default.info("set tag result", this.setTagResultData);var t = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);if (t) (_t$callback6 = t.callback) === null || _t$callback6 === void 0 ? void 0 : _t$callback6.call(t.callback, { resultCode: this.setTagResultData.errorCode, message: this.setTagResultData.errorMsg });n.default.set({ key: n.default.KEY_SET_TAG_TIME, data: new Date().getTime() });} }], [{ key: "parse", value: function parse(t) {var e = new o();_get(_getPrototypeOf(o), "parseActionMsg", this).call(this, e, t);e.setTagResultData = u.parse(e.actionMsgData.msgData);return e;} }]);return o;}(a.default);var u = /*#__PURE__*/function () {"use strict";function u() {_classCallCheck(this, u);this.errorCode = 0;this.errorMsg = "";}_createClass(u, null, [{ key: "parse", value: function parse(t) {var e = new u();var r = JSON.parse(t);e.errorCode = r.errorCode;e.errorMsg = r.errorMsg;return e;} }]);return u;}();e["default"] = o;}, 7923: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(9934));var s = i(r(1237));var a = i(r(9214));var o = /*#__PURE__*/function (_a$default9) {"use strict";_inherits(o, _a$default9);var _super20 = _createSuper(o);function o() {var _this20;_classCallCheck(this, o);_this20 = _super20.apply(this, arguments);_this20.unbindAliasResultData = new u();return _this20;}_createClass(o, [{ key: "receive", value: function receive() {var _t$callback7;s.default.info("unbind alias result", this.unbindAliasResultData);var t = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);if (t) (_t$callback7 = t.callback) === null || _t$callback7 === void 0 ? void 0 : _t$callback7.call(t.callback, { resultCode: this.unbindAliasResultData.errorCode, message: this.unbindAliasResultData.errorMsg });n.default.set({ key: n.default.KEY_BIND_ALIAS_TIME, data: new Date().getTime() });} }], [{ key: "parse", value: function parse(t) {var e = new o();_get(_getPrototypeOf(o), "parseActionMsg", this).call(this, e, t);e.unbindAliasResultData = u.parse(e.actionMsgData.msgData);return e;} }]);return o;}(a.default);var u = /*#__PURE__*/function () {"use strict";function u() {_classCallCheck(this, u);this.errorCode = -1;this.errorMsg = "";}_createClass(u, null, [{ key: "parse", value: function parse(t) {var e = new u();var r = JSON.parse(t);e.errorCode = r.errorCode;e.errorMsg = r.errorMsg;return e;} }]);return u;}();e["default"] = o;}, 9285: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r(t) {_classCallCheck(this, r);this.delay = 10;this.delay = t;}_createClass(r, [{ key: "start", value: function start() {this.cancel();var t = this;this.timer = setInterval(function () {t.run();}, this.delay);} }, { key: "cancel", value: function cancel() {if (this.timer) clearInterval(this.timer);} }]);return r;}();e["default"] = r;}, 1571: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};var n;Object.defineProperty(e, "__esModule", { value: true });var s = i(r(6561));var a = i(r(9285));var o = /*#__PURE__*/function (_a$default10) {"use strict";_inherits(o, _a$default10);var _super21 = _createSuper(o);function o() {_classCallCheck(this, o);return _super21.apply(this, arguments);}_createClass(o, [{ key: "run", value: function run() {s.default.create().send();} }, { key: "refresh", value: function refresh() {this.delay = 60 * 1e3;this.start();} }], [{ key: "getInstance", value: function getInstance() {return o.InstanceHolder.instance;} }]);return o;}(a.default);o.INTERVAL = 60 * 1e3;o.InstanceHolder = (n = function n() {"use strict";_classCallCheck(this, n);}, n.instance = new o(o.INTERVAL), n);e["default"] = o;}, 5574: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(4736));var s = i(r(323));var a;(function (t) {var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";var r = (0, n.default)("9223372036854775808");function i(t) {var e = a(t);var r = o(e);var i = r[1];var n = r[0];return u(i) + u(n);}t.to_getui = i;function a(t) {var e = s.default.md5Hex(t);var r = c(e);r[6] &= 15;r[6] |= 48;r[8] &= 63;r[8] |= 128;return r;}function o(t) {var e = (0, n.default)(0);var r = (0, n.default)(0);for (var _r2 = 0; _r2 < 8; _r2++) {e = e.multiply(256).plus((0, n.default)(255 & t[_r2]));}for (var _e4 = 8; _e4 < 16; _e4++) {r = r.multiply(256).plus((0, n.default)(255 & t[_e4]));}return [e, r];}function u(t) {if (t >= r) t = r.multiply(2).minus(t);var i = "";for (; t > (0, n.default)(0); t = t.divide(62)) {i += e.charAt(Number(t.divmod(62).remainder));}return i;}function c(t) {var e = t.length;if (e % 2 != 0) return [];var r = new Array();for (var _i2 = 0; _i2 < e; _i2 += 2) {r.push(parseInt(t.substring(_i2, _i2 + 2), 16));}return r;}})(a || (a = {}));e["default"] = a;}, 323: function _(t, e, r) {var i = this && this.__importDefault || function (t) {return t && t.__esModule ? t : { default: t };};Object.defineProperty(e, "__esModule", { value: true });var n = i(r(2620));var s = i(r(1354));var a = i(r(1754));var o;(function (t) {var e;var r;var i;var o;var u = new n.default();var c = s.default.mode.CBC;var l = s.default.pad.Pkcs7;var f = s.default.AES;t.algorithmMap = new Map([["aes", s.default.AES]]);t.modeMap = new Map([["cbc", s.default.mode.CBC], ["cfb", s.default.mode.CFB], ["cfb128", s.default.mode.CFB], ["ecb", s.default.mode.ECB], ["ofb", s.default.mode.OFB]]);t.paddingMap = new Map([["nopadding", s.default.pad.NoPadding], ["pkcs7", s.default.pad.Pkcs7]]);function h() {e = s.default.MD5(new Date().getTime().toString());r = s.default.MD5(e);u.setPublicKey(a.default.publicKey);e.toString(s.default.enc.Hex);r.toString(s.default.enc.Hex);i = u.encrypt(e.toString(s.default.enc.Hex));o = u.encrypt(r.toString(s.default.enc.Hex));}t.resetKey = h;function d(e, r, i) {f = t.algorithmMap.get(e);c = t.modeMap.get(r);l = t.paddingMap.get(i);}t.setEncryptParams = d;function p(t) {return f.encrypt(t, e, { iv: r, mode: c, padding: l }).toString();}t.encrypt = p;function v(t) {return f.decrypt(t, e, { iv: r, mode: c, padding: l }).toString(s.default.enc.Utf8);}t.decrypt = v;function g(t) {return s.default.SHA256(t).toString(s.default.enc.Base64);}t.sha256 = g;function y(t) {return s.default.MD5(t).toString(s.default.enc.Hex);}t.md5Hex = y;function m() {return i ? i : "";}t.getEncryptedSecretKey = m;function w() {return o ? o : "";}t.getEncryptedIV = w;})(o || (o = {}));e["default"] = o;}, 1237: function _(t, e) {Object.defineProperty(e, "__esModule", { value: true });var r = /*#__PURE__*/function () {"use strict";function r() {_classCallCheck(this, r);}_createClass(r, null, [{ key: "info", value: function info() {for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {t[_key] = arguments[_key];}if (this.debugMode) console.info("[GtPush]", t);} }, { key: "error", value: function error() {for (var _len2 = arguments.length, t = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {t[_key2] = arguments[_key2];}console.error("[GtPush]", t);} }]);return r;}();r.debugMode = false;e["default"] = r;}, 2620: function _(t, e, r) {r.r(e);r.d(e, { JSEncrypt: function JSEncrypt() {return wt;}, default: function _default() {return St;} });var i = "0123456789abcdefghijklmnopqrstuvwxyz";function n(t) {return i.charAt(t);}function s(t, e) {return t & e;}function a(t, e) {return t | e;}function o(t, e) {return t ^ e;}function u(t, e) {return t & ~e;}function c(t) {if (0 == t) return -1;var e = 0;if (0 == (65535 & t)) {t >>= 16;e += 16;}if (0 == (255 & t)) {t >>= 8;e += 8;}if (0 == (15 & t)) {t >>= 4;e += 4;}if (0 == (3 & t)) {t >>= 2;e += 2;}if (0 == (1 & t)) ++e;return e;}function l(t) {var e = 0;while (0 != t) {t &= t - 1;++e;}return e;}var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var h = "=";function d(t) {var e;var r;var i = "";for (e = 0; e + 3 <= t.length; e += 3) {r = parseInt(t.substring(e, e + 3), 16);i += f.charAt(r >> 6) + f.charAt(63 & r);}if (e + 1 == t.length) {r = parseInt(t.substring(e, e + 1), 16);i += f.charAt(r << 2);} else if (e + 2 == t.length) {r = parseInt(t.substring(e, e + 2), 16);i += f.charAt(r >> 2) + f.charAt((3 & r) << 4);}while ((3 & i.length) > 0) {i += h;}return i;}function p(t) {var e = "";var r;var i = 0;var s = 0;for (r = 0; r < t.length; ++r) {if (t.charAt(r) == h) break;var a = f.indexOf(t.charAt(r));if (a < 0) continue;if (0 == i) {e += n(a >> 2);s = 3 & a;i = 1;} else if (1 == i) {e += n(s << 2 | a >> 4);s = 15 & a;i = 2;} else if (2 == i) {e += n(s);e += n(a >> 2);s = 3 & a;i = 3;} else {e += n(s << 2 | a >> 4);e += n(15 & a);i = 0;}}if (1 == i) e += n(s << 2);return e;}var g;var y = { decode: function decode(t) {var e;if (void 0 === g) {var r = "0123456789ABCDEF";var i = " \f\n\r\t\xA0\u2028\u2029";g = {};for (e = 0; e < 16; ++e) {g[r.charAt(e)] = e;}r = r.toLowerCase();for (e = 10; e < 16; ++e) {g[r.charAt(e)] = e;}for (e = 0; e < i.length; ++e) {g[i.charAt(e)] = -1;}}var n = [];var s = 0;var a = 0;for (e = 0; e < t.length; ++e) {var o = t.charAt(e);if ("=" == o) break;o = g[o];if (-1 == o) continue;if (void 0 === o) throw new Error("Illegal character at offset " + e);s |= o;if (++a >= 2) {n[n.length] = s;s = 0;a = 0;} else s <<= 4;}if (a) throw new Error("Hex encoding incomplete: 4 bits missing");return n;} };var m;var w = { decode: function decode(t) {var e;if (void 0 === m) {var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var i = "= \f\n\r\t\xA0\u2028\u2029";m = Object.create(null);for (e = 0; e < 64; ++e) {m[r.charAt(e)] = e;}m["-"] = 62;m["_"] = 63;for (e = 0; e < i.length; ++e) {m[i.charAt(e)] = -1;}}var n = [];var s = 0;var a = 0;for (e = 0; e < t.length; ++e) {var o = t.charAt(e);if ("=" == o) break;o = m[o];if (-1 == o) continue;if (void 0 === o) throw new Error("Illegal character at offset " + e);s |= o;if (++a >= 4) {n[n.length] = s >> 16;n[n.length] = s >> 8 & 255;n[n.length] = 255 & s;s = 0;a = 0;} else s <<= 6;}switch (a) {case 1:throw new Error("Base64 encoding incomplete: at least 2 bits missing");case 2:n[n.length] = s >> 10;break;case 3:n[n.length] = s >> 16;n[n.length] = s >> 8 & 255;break;}return n;}, re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, unarmor: function unarmor(t) {var e = w.re.exec(t);if (e) if (e[1]) t = e[1];else if (e[2]) t = e[2];else throw new Error("RegExp out of sync");return w.decode(t);} };var S = 1e13;var _ = function () {function t(t) {this.buf = [+t || 0];}t.prototype.mulAdd = function (t, e) {var r = this.buf;var i = r.length;var n;var s;for (n = 0; n < i; ++n) {s = r[n] * t + e;if (s < S) e = 0;else {e = 0 | s / S;s -= e * S;}r[n] = s;}if (e > 0) r[n] = e;};t.prototype.sub = function (t) {var e = this.buf;var r = e.length;var i;var n;for (i = 0; i < r; ++i) {n = e[i] - t;if (n < 0) {n += S;t = 1;} else t = 0;e[i] = n;}while (0 === e[e.length - 1]) {e.pop();}};t.prototype.toString = function (t) {if (10 != (t || 10)) throw new Error("only base 10 is supported");var e = this.buf;var r = e[e.length - 1].toString();for (var i = e.length - 2; i >= 0; --i) {r += (S + e[i]).toString().substring(1);}return r;};t.prototype.valueOf = function () {var t = this.buf;var e = 0;for (var r = t.length - 1; r >= 0; --r) {e = e * S + t[r];}return e;};t.prototype.simplify = function () {var t = this.buf;return 1 == t.length ? t[0] : this;};return t;}();var b = "…";var E = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;var D = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;function M(t, e) {if (t.length > e) t = t.substring(0, e) + b;return t;}var T = function () {function t(e, r) {this.hexDigits = "0123456789ABCDEF";if (e instanceof t) {this.enc = e.enc;this.pos = e.pos;} else {this.enc = e;this.pos = r;}}t.prototype.get = function (t) {if (void 0 === t) t = this.pos++;if (t >= this.enc.length) throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);return "string" === typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t];};t.prototype.hexByte = function (t) {return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t);};t.prototype.hexDump = function (t, e, r) {var i = "";for (var n = t; n < e; ++n) {i += this.hexByte(this.get(n));if (true !== r) switch (15 & n) {case 7:i += "  ";break;case 15:i += "\n";break;default:i += " ";}}return i;};t.prototype.isASCII = function (t, e) {for (var r = t; r < e; ++r) {var i = this.get(r);if (i < 32 || i > 176) return false;}return true;};t.prototype.parseStringISO = function (t, e) {var r = "";for (var i = t; i < e; ++i) {r += String.fromCharCode(this.get(i));}return r;};t.prototype.parseStringUTF = function (t, e) {var r = "";for (var i = t; i < e;) {var n = this.get(i++);if (n < 128) r += String.fromCharCode(n);else if (n > 191 && n < 224) r += String.fromCharCode((31 & n) << 6 | 63 & this.get(i++));else r += String.fromCharCode((15 & n) << 12 | (63 & this.get(i++)) << 6 | 63 & this.get(i++));}return r;};t.prototype.parseStringBMP = function (t, e) {var r = "";var i;var n;for (var s = t; s < e;) {i = this.get(s++);n = this.get(s++);r += String.fromCharCode(i << 8 | n);}return r;};t.prototype.parseTime = function (t, e, r) {var i = this.parseStringISO(t, e);var n = (r ? E : D).exec(i);if (!n) return "Unrecognized time: " + i;if (r) {n[1] = +n[1];n[1] += +n[1] < 70 ? 2e3 : 1900;}i = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4];if (n[5]) {i += ":" + n[5];if (n[6]) {i += ":" + n[6];if (n[7]) i += "." + n[7];}}if (n[8]) {i += " UTC";if ("Z" != n[8]) {i += n[8];if (n[9]) i += ":" + n[9];}}return i;};t.prototype.parseInteger = function (t, e) {var r = this.get(t);var i = r > 127;var n = i ? 255 : 0;var s;var a = "";while (r == n && ++t < e) {r = this.get(t);}s = e - t;if (0 === s) return i ? -1 : 0;if (s > 4) {a = r;s <<= 3;while (0 == (128 & (+a ^ n))) {a = +a << 1;--s;}a = "(" + s + " bit)\n";}if (i) r -= 256;var o = new _(r);for (var u = t + 1; u < e; ++u) {o.mulAdd(256, this.get(u));}return a + o.toString();};t.prototype.parseBitString = function (t, e, r) {var i = this.get(t);var n = (e - t - 1 << 3) - i;var s = "(" + n + " bit)\n";var a = "";for (var o = t + 1; o < e; ++o) {var u = this.get(o);var c = o == e - 1 ? i : 0;for (var l = 7; l >= c; --l) {a += u >> l & 1 ? "1" : "0";}if (a.length > r) return s + M(a, r);}return s + a;};t.prototype.parseOctetString = function (t, e, r) {if (this.isASCII(t, e)) return M(this.parseStringISO(t, e), r);var i = e - t;var n = "(" + i + " byte)\n";r /= 2;if (i > r) e = t + r;for (var s = t; s < e; ++s) {n += this.hexByte(this.get(s));}if (i > r) n += b;return n;};t.prototype.parseOID = function (t, e, r) {var i = "";var n = new _();var s = 0;for (var a = t; a < e; ++a) {var o = this.get(a);n.mulAdd(128, 127 & o);s += 7;if (!(128 & o)) {if ("" === i) {n = n.simplify();if (n instanceof _) {n.sub(80);i = "2." + n.toString();} else {var u = n < 80 ? n < 40 ? 0 : 1 : 2;i = u + "." + (n - 40 * u);}} else i += "." + n.toString();if (i.length > r) return M(i, r);n = new _();s = 0;}}if (s > 0) i += ".incomplete";return i;};return t;}();var I = function () {function t(t, e, r, i, n) {if (!(i instanceof A)) throw new Error("Invalid tag value.");this.stream = t;this.header = e;this.length = r;this.tag = i;this.sub = n;}t.prototype.typeName = function () {switch (this.tag.tagClass) {case 0:switch (this.tag.tagNumber) {case 0:return "EOC";case 1:return "BOOLEAN";case 2:return "INTEGER";case 3:return "BIT_STRING";case 4:return "OCTET_STRING";case 5:return "NULL";case 6:return "OBJECT_IDENTIFIER";case 7:return "ObjectDescriptor";case 8:return "EXTERNAL";case 9:return "REAL";case 10:return "ENUMERATED";case 11:return "EMBEDDED_PDV";case 12:return "UTF8String";case 16:return "SEQUENCE";case 17:return "SET";case 18:return "NumericString";case 19:return "PrintableString";case 20:return "TeletexString";case 21:return "VideotexString";case 22:return "IA5String";case 23:return "UTCTime";case 24:return "GeneralizedTime";case 25:return "GraphicString";case 26:return "VisibleString";case 27:return "GeneralString";case 28:return "UniversalString";case 30:return "BMPString";}return "Universal_" + this.tag.tagNumber.toString();case 1:return "Application_" + this.tag.tagNumber.toString();case 2:return "[" + this.tag.tagNumber.toString() + "]";case 3:return "Private_" + this.tag.tagNumber.toString();}};t.prototype.content = function (t) {if (void 0 === this.tag) return null;if (void 0 === t) t = 1 / 0;var e = this.posContent();var r = Math.abs(this.length);if (!this.tag.isUniversal()) {if (null !== this.sub) return "(" + this.sub.length + " elem)";return this.stream.parseOctetString(e, e + r, t);}switch (this.tag.tagNumber) {case 1:return 0 === this.stream.get(e) ? "false" : "true";case 2:return this.stream.parseInteger(e, e + r);case 3:return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + r, t);case 4:return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);case 6:return this.stream.parseOID(e, e + r, t);case 16:case 17:if (null !== this.sub) return "(" + this.sub.length + " elem)";else return "(no elem)";case 12:return M(this.stream.parseStringUTF(e, e + r), t);case 18:case 19:case 20:case 21:case 22:case 26:return M(this.stream.parseStringISO(e, e + r), t);case 30:return M(this.stream.parseStringBMP(e, e + r), t);case 23:case 24:return this.stream.parseTime(e, e + r, 23 == this.tag.tagNumber);}return null;};t.prototype.toString = function () {return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]";};t.prototype.toPrettyString = function (t) {if (void 0 === t) t = "";var e = t + this.typeName() + " @" + this.stream.pos;if (this.length >= 0) e += "+";e += this.length;if (this.tag.tagConstructed) e += " (constructed)";else if (this.tag.isUniversal() && (3 == this.tag.tagNumber || 4 == this.tag.tagNumber) && null !== this.sub) e += " (encapsulates)";e += "\n";if (null !== this.sub) {t += "  ";for (var r = 0, i = this.sub.length; r < i; ++r) {e += this.sub[r].toPrettyString(t);}}return e;};t.prototype.posStart = function () {return this.stream.pos;};t.prototype.posContent = function () {return this.stream.pos + this.header;};t.prototype.posEnd = function () {return this.stream.pos + this.header + Math.abs(this.length);};t.prototype.toHexString = function () {return this.stream.hexDump(this.posStart(), this.posEnd(), true);};t.decodeLength = function (t) {var e = t.get();var r = 127 & e;if (r == e) return r;if (r > 6) throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));if (0 === r) return null;e = 0;for (var i = 0; i < r; ++i) {e = 256 * e + t.get();}return e;};t.prototype.getHexStringValue = function () {var t = this.toHexString();var e = 2 * this.header;var r = 2 * this.length;return t.substr(e, r);};t.decode = function (e) {var r;if (!(e instanceof T)) r = new T(e, 0);else r = e;var i = new T(r);var n = new A(r);var s = t.decodeLength(r);var a = r.pos;var o = a - i.pos;var u = null;var c = function c() {var e = [];if (null !== s) {var i = a + s;while (r.pos < i) {e[e.length] = t.decode(r);}if (r.pos != i) throw new Error("Content size is not correct for container starting at offset " + a);} else try {for (;;) {var n = t.decode(r);if (n.tag.isEOC()) break;e[e.length] = n;}s = a - r.pos;} catch (t) {throw new Error("Exception while decoding undefined length content: " + t);}return e;};if (n.tagConstructed) u = c();else if (n.isUniversal() && (3 == n.tagNumber || 4 == n.tagNumber)) try {if (3 == n.tagNumber) if (0 != r.get()) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");u = c();for (var l = 0; l < u.length; ++l) {if (u[l].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.");}} catch (t) {u = null;}if (null === u) {if (null === s) throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);r.pos = a + Math.abs(s);}return new t(i, o, s, n, u);};return t;}();var A = function () {function t(t) {var e = t.get();this.tagClass = e >> 6;this.tagConstructed = 0 !== (32 & e);this.tagNumber = 31 & e;if (31 == this.tagNumber) {var r = new _();do {e = t.get();r.mulAdd(128, 127 & e);} while (128 & e);this.tagNumber = r.simplify();}}t.prototype.isUniversal = function () {return 0 === this.tagClass;};t.prototype.isEOC = function () {return 0 === this.tagClass && 0 === this.tagNumber;};return t;}();var x;var R = 0xdeadbeefcafe;var B = 15715070 == (16777215 & R);var O = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];var k = (1 << 26) / O[O.length - 1];var C = function () {function t(t, e, r) {if (null != t) if ("number" == typeof t) this.fromNumber(t, e, r);else if (null == e && "string" != typeof t) this.fromString(t, 256);else this.fromString(t, e);}t.prototype.toString = function (t) {if (this.s < 0) return "-" + this.negate().toString(t);var e;if (16 == t) e = 4;else if (8 == t) e = 3;else if (2 == t) e = 1;else if (32 == t) e = 5;else if (4 == t) e = 2;else return this.toRadix(t);var r = (1 << e) - 1;var i;var s = false;var a = "";var o = this.t;var u = this.DB - o * this.DB % e;if (o-- > 0) {if (u < this.DB && (i = this[o] >> u) > 0) {s = true;a = n(i);}while (o >= 0) {if (u < e) {i = (this[o] & (1 << u) - 1) << e - u;i |= this[--o] >> (u += this.DB - e);} else {i = this[o] >> (u -= e) & r;if (u <= 0) {u += this.DB;--o;}}if (i > 0) s = true;if (s) a += n(i);}}return s ? a : "0";};t.prototype.negate = function () {var e = H();t.ZERO.subTo(this, e);return e;};t.prototype.abs = function () {return this.s < 0 ? this.negate() : this;};t.prototype.compareTo = function (t) {var e = this.s - t.s;if (0 != e) return e;var r = this.t;e = r - t.t;if (0 != e) return this.s < 0 ? -e : e;while (--r >= 0) {if (0 != (e = this[r] - t[r])) return e;}return 0;};t.prototype.bitLength = function () {if (this.t <= 0) return 0;return this.DB * (this.t - 1) + W(this[this.t - 1] ^ this.s & this.DM);};t.prototype.mod = function (e) {var r = H();this.abs().divRemTo(e, null, r);if (this.s < 0 && r.compareTo(t.ZERO) > 0) e.subTo(r, r);return r;};t.prototype.modPowInt = function (t, e) {var r;if (t < 256 || e.isEven()) r = new P(e);else r = new V(e);return this.exp(t, r);};t.prototype.clone = function () {var t = H();this.copyTo(t);return t;};t.prototype.intValue = function () {if (this.s < 0) {if (1 == this.t) return this[0] - this.DV;else if (0 == this.t) return -1;} else if (1 == this.t) return this[0];else if (0 == this.t) return 0;return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];};t.prototype.byteValue = function () {return 0 == this.t ? this.s : this[0] << 24 >> 24;};t.prototype.shortValue = function () {return 0 == this.t ? this.s : this[0] << 16 >> 16;};t.prototype.signum = function () {if (this.s < 0) return -1;else if (this.t <= 0 || 1 == this.t && this[0] <= 0) return 0;else return 1;};t.prototype.toByteArray = function () {var t = this.t;var e = [];e[0] = this.s;var r = this.DB - t * this.DB % 8;var i;var n = 0;if (t-- > 0) {if (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r) e[n++] = i | this.s << this.DB - r;while (t >= 0) {if (r < 8) {i = (this[t] & (1 << r) - 1) << 8 - r;i |= this[--t] >> (r += this.DB - 8);} else {i = this[t] >> (r -= 8) & 255;if (r <= 0) {r += this.DB;--t;}}if (0 != (128 & i)) i |= -256;if (0 == n && (128 & this.s) != (128 & i)) ++n;if (n > 0 || i != this.s) e[n++] = i;}}return e;};t.prototype.equals = function (t) {return 0 == this.compareTo(t);};t.prototype.min = function (t) {return this.compareTo(t) < 0 ? this : t;};t.prototype.max = function (t) {return this.compareTo(t) > 0 ? this : t;};t.prototype.and = function (t) {var e = H();this.bitwiseTo(t, s, e);return e;};t.prototype.or = function (t) {var e = H();this.bitwiseTo(t, a, e);return e;};t.prototype.xor = function (t) {var e = H();this.bitwiseTo(t, o, e);return e;};t.prototype.andNot = function (t) {var e = H();this.bitwiseTo(t, u, e);return e;};t.prototype.not = function () {var t = H();for (var e = 0; e < this.t; ++e) {t[e] = this.DM & ~this[e];}t.t = this.t;t.s = ~this.s;return t;};t.prototype.shiftLeft = function (t) {var e = H();if (t < 0) this.rShiftTo(-t, e);else this.lShiftTo(t, e);return e;};t.prototype.shiftRight = function (t) {var e = H();if (t < 0) this.lShiftTo(-t, e);else this.rShiftTo(t, e);return e;};t.prototype.getLowestSetBit = function () {for (var t = 0; t < this.t; ++t) {if (0 != this[t]) return t * this.DB + c(this[t]);}if (this.s < 0) return this.t * this.DB;return -1;};t.prototype.bitCount = function () {var t = 0;var e = this.s & this.DM;for (var r = 0; r < this.t; ++r) {t += l(this[r] ^ e);}return t;};t.prototype.testBit = function (t) {var e = Math.floor(t / this.DB);if (e >= this.t) return 0 != this.s;return 0 != (this[e] & 1 << t % this.DB);};t.prototype.setBit = function (t) {return this.changeBit(t, a);};t.prototype.clearBit = function (t) {return this.changeBit(t, u);};t.prototype.flipBit = function (t) {return this.changeBit(t, o);};t.prototype.add = function (t) {var e = H();this.addTo(t, e);return e;};t.prototype.subtract = function (t) {var e = H();this.subTo(t, e);return e;};t.prototype.multiply = function (t) {var e = H();this.multiplyTo(t, e);return e;};t.prototype.divide = function (t) {var e = H();this.divRemTo(t, e, null);return e;};t.prototype.remainder = function (t) {var e = H();this.divRemTo(t, null, e);return e;};t.prototype.divideAndRemainder = function (t) {var e = H();var r = H();this.divRemTo(t, e, r);return [e, r];};t.prototype.modPow = function (t, e) {var r = t.bitLength();var i;var n = Y(1);var s;if (r <= 0) return n;else if (r < 18) i = 1;else if (r < 48) i = 3;else if (r < 144) i = 4;else if (r < 768) i = 5;else i = 6;if (r < 8) s = new P(e);else if (e.isEven()) s = new L(e);else s = new V(e);var a = [];var o = 3;var u = i - 1;var c = (1 << i) - 1;a[1] = s.convert(this);if (i > 1) {var l = H();s.sqrTo(a[1], l);while (o <= c) {a[o] = H();s.mulTo(l, a[o - 2], a[o]);o += 2;}}var f = t.t - 1;var h;var d = true;var p = H();var v;r = W(t[f]) - 1;while (f >= 0) {if (r >= u) h = t[f] >> r - u & c;else {h = (t[f] & (1 << r + 1) - 1) << u - r;if (f > 0) h |= t[f - 1] >> this.DB + r - u;}o = i;while (0 == (1 & h)) {h >>= 1;--o;}if ((r -= o) < 0) {r += this.DB;--f;}if (d) {a[h].copyTo(n);d = false;} else {while (o > 1) {s.sqrTo(n, p);s.sqrTo(p, n);o -= 2;}if (o > 0) s.sqrTo(n, p);else {v = n;n = p;p = v;}s.mulTo(p, a[h], n);}while (f >= 0 && 0 == (t[f] & 1 << r)) {s.sqrTo(n, p);v = n;n = p;p = v;if (--r < 0) {r = this.DB - 1;--f;}}}return s.revert(n);};t.prototype.modInverse = function (e) {var r = e.isEven();if (this.isEven() && r || 0 == e.signum()) return t.ZERO;var i = e.clone();var n = this.clone();var s = Y(1);var a = Y(0);var o = Y(0);var u = Y(1);while (0 != i.signum()) {while (i.isEven()) {i.rShiftTo(1, i);if (r) {if (!s.isEven() || !a.isEven()) {s.addTo(this, s);a.subTo(e, a);}s.rShiftTo(1, s);} else if (!a.isEven()) a.subTo(e, a);a.rShiftTo(1, a);}while (n.isEven()) {n.rShiftTo(1, n);if (r) {if (!o.isEven() || !u.isEven()) {o.addTo(this, o);u.subTo(e, u);}o.rShiftTo(1, o);} else if (!u.isEven()) u.subTo(e, u);u.rShiftTo(1, u);}if (i.compareTo(n) >= 0) {i.subTo(n, i);if (r) s.subTo(o, s);a.subTo(u, a);} else {n.subTo(i, n);if (r) o.subTo(s, o);u.subTo(a, u);}}if (0 != n.compareTo(t.ONE)) return t.ZERO;if (u.compareTo(e) >= 0) return u.subtract(e);if (u.signum() < 0) u.addTo(e, u);else return u;if (u.signum() < 0) return u.add(e);else return u;};t.prototype.pow = function (t) {return this.exp(t, new N());};t.prototype.gcd = function (t) {var e = this.s < 0 ? this.negate() : this.clone();var r = t.s < 0 ? t.negate() : t.clone();if (e.compareTo(r) < 0) {var i = e;e = r;r = i;}var n = e.getLowestSetBit();var s = r.getLowestSetBit();if (s < 0) return e;if (n < s) s = n;if (s > 0) {e.rShiftTo(s, e);r.rShiftTo(s, r);}while (e.signum() > 0) {if ((n = e.getLowestSetBit()) > 0) e.rShiftTo(n, e);if ((n = r.getLowestSetBit()) > 0) r.rShiftTo(n, r);if (e.compareTo(r) >= 0) {e.subTo(r, e);e.rShiftTo(1, e);} else {r.subTo(e, r);r.rShiftTo(1, r);}}if (s > 0) r.lShiftTo(s, r);return r;};t.prototype.isProbablePrime = function (t) {var e;var r = this.abs();if (1 == r.t && r[0] <= O[O.length - 1]) {for (e = 0; e < O.length; ++e) {if (r[0] == O[e]) return true;}return false;}if (r.isEven()) return false;e = 1;while (e < O.length) {var i = O[e];var n = e + 1;while (n < O.length && i < k) {i *= O[n++];}i = r.modInt(i);while (e < n) {if (i % O[e++] == 0) return false;}}return r.millerRabin(t);};t.prototype.copyTo = function (t) {for (var e = this.t - 1; e >= 0; --e) {t[e] = this[e];}t.t = this.t;t.s = this.s;};t.prototype.fromInt = function (t) {this.t = 1;this.s = t < 0 ? -1 : 0;if (t > 0) this[0] = t;else if (t < -1) this[0] = t + this.DV;else this.t = 0;};t.prototype.fromString = function (e, r) {var i;if (16 == r) i = 4;else if (8 == r) i = 3;else if (256 == r) i = 8;else if (2 == r) i = 1;else if (32 == r) i = 5;else if (4 == r) i = 2;else {this.fromRadix(e, r);return;}this.t = 0;this.s = 0;var n = e.length;var s = false;var a = 0;while (--n >= 0) {var o = 8 == i ? 255 & +e[n] : G(e, n);if (o < 0) {if ("-" == e.charAt(n)) s = true;continue;}s = false;if (0 == a) this[this.t++] = o;else if (a + i > this.DB) {this[this.t - 1] |= (o & (1 << this.DB - a) - 1) << a;this[this.t++] = o >> this.DB - a;} else this[this.t - 1] |= o << a;a += i;if (a >= this.DB) a -= this.DB;}if (8 == i && 0 != (128 & +e[0])) {this.s = -1;if (a > 0) this[this.t - 1] |= (1 << this.DB - a) - 1 << a;}this.clamp();if (s) t.ZERO.subTo(this, this);};t.prototype.clamp = function () {var t = this.s & this.DM;while (this.t > 0 && this[this.t - 1] == t) {--this.t;}};t.prototype.dlShiftTo = function (t, e) {var r;for (r = this.t - 1; r >= 0; --r) {e[r + t] = this[r];}for (r = t - 1; r >= 0; --r) {e[r] = 0;}e.t = this.t + t;e.s = this.s;};t.prototype.drShiftTo = function (t, e) {for (var r = t; r < this.t; ++r) {e[r - t] = this[r];}e.t = Math.max(this.t - t, 0);e.s = this.s;};t.prototype.lShiftTo = function (t, e) {var r = t % this.DB;var i = this.DB - r;var n = (1 << i) - 1;var s = Math.floor(t / this.DB);var a = this.s << r & this.DM;for (var o = this.t - 1; o >= 0; --o) {e[o + s + 1] = this[o] >> i | a;a = (this[o] & n) << r;}for (var o = s - 1; o >= 0; --o) {e[o] = 0;}e[s] = a;e.t = this.t + s + 1;e.s = this.s;e.clamp();};t.prototype.rShiftTo = function (t, e) {e.s = this.s;var r = Math.floor(t / this.DB);if (r >= this.t) {e.t = 0;return;}var i = t % this.DB;var n = this.DB - i;var s = (1 << i) - 1;e[0] = this[r] >> i;for (var a = r + 1; a < this.t; ++a) {e[a - r - 1] |= (this[a] & s) << n;e[a - r] = this[a] >> i;}if (i > 0) e[this.t - r - 1] |= (this.s & s) << n;e.t = this.t - r;e.clamp();};t.prototype.subTo = function (t, e) {var r = 0;var i = 0;var n = Math.min(t.t, this.t);while (r < n) {i += this[r] - t[r];e[r++] = i & this.DM;i >>= this.DB;}if (t.t < this.t) {i -= t.s;while (r < this.t) {i += this[r];e[r++] = i & this.DM;i >>= this.DB;}i += this.s;} else {i += this.s;while (r < t.t) {i -= t[r];e[r++] = i & this.DM;i >>= this.DB;}i -= t.s;}e.s = i < 0 ? -1 : 0;if (i < -1) e[r++] = this.DV + i;else if (i > 0) e[r++] = i;e.t = r;e.clamp();};t.prototype.multiplyTo = function (e, r) {var i = this.abs();var n = e.abs();var s = i.t;r.t = s + n.t;while (--s >= 0) {r[s] = 0;}for (s = 0; s < n.t; ++s) {r[s + i.t] = i.am(0, n[s], r, s, 0, i.t);}r.s = 0;r.clamp();if (this.s != e.s) t.ZERO.subTo(r, r);};t.prototype.squareTo = function (t) {var e = this.abs();var r = t.t = 2 * e.t;while (--r >= 0) {t[r] = 0;}for (r = 0; r < e.t - 1; ++r) {var i = e.am(r, e[r], t, 2 * r, 0, 1);if ((t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, i, e.t - r - 1)) >= e.DV) {t[r + e.t] -= e.DV;t[r + e.t + 1] = 1;}}if (t.t > 0) t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1);t.s = 0;t.clamp();};t.prototype.divRemTo = function (e, r, i) {var n = e.abs();if (n.t <= 0) return;var s = this.abs();if (s.t < n.t) {if (null != r) r.fromInt(0);if (null != i) this.copyTo(i);return;}if (null == i) i = H();var a = H();var o = this.s;var u = e.s;var c = this.DB - W(n[n.t - 1]);if (c > 0) {n.lShiftTo(c, a);s.lShiftTo(c, i);} else {n.copyTo(a);s.copyTo(i);}var l = a.t;var f = a[l - 1];if (0 == f) return;var h = f * (1 << this.F1) + (l > 1 ? a[l - 2] >> this.F2 : 0);var d = this.FV / h;var p = (1 << this.F1) / h;var v = 1 << this.F2;var g = i.t;var y = g - l;var m = null == r ? H() : r;a.dlShiftTo(y, m);if (i.compareTo(m) >= 0) {i[i.t++] = 1;i.subTo(m, i);}t.ONE.dlShiftTo(l, m);m.subTo(a, a);while (a.t < l) {a[a.t++] = 0;}while (--y >= 0) {var w = i[--g] == f ? this.DM : Math.floor(i[g] * d + (i[g - 1] + v) * p);if ((i[g] += a.am(0, w, i, y, 0, l)) < w) {a.dlShiftTo(y, m);i.subTo(m, i);while (i[g] < --w) {i.subTo(m, i);}}}if (null != r) {i.drShiftTo(l, r);if (o != u) t.ZERO.subTo(r, r);}i.t = l;i.clamp();if (c > 0) i.rShiftTo(c, i);if (o < 0) t.ZERO.subTo(i, i);};t.prototype.invDigit = function () {if (this.t < 1) return 0;var t = this[0];if (0 == (1 & t)) return 0;var e = 3 & t;e = e * (2 - (15 & t) * e) & 15;e = e * (2 - (255 & t) * e) & 255;e = e * (2 - ((65535 & t) * e & 65535)) & 65535;e = e * (2 - t * e % this.DV) % this.DV;return e > 0 ? this.DV - e : -e;};t.prototype.isEven = function () {return 0 == (this.t > 0 ? 1 & this[0] : this.s);};t.prototype.exp = function (e, r) {if (e > 4294967295 || e < 1) return t.ONE;var i = H();var n = H();var s = r.convert(this);var a = W(e) - 1;s.copyTo(i);while (--a >= 0) {r.sqrTo(i, n);if ((e & 1 << a) > 0) r.mulTo(n, s, i);else {var o = i;i = n;n = o;}}return r.revert(i);};t.prototype.chunkSize = function (t) {return Math.floor(Math.LN2 * this.DB / Math.log(t));};t.prototype.toRadix = function (t) {if (null == t) t = 10;if (0 == this.signum() || t < 2 || t > 36) return "0";var e = this.chunkSize(t);var r = Math.pow(t, e);var i = Y(r);var n = H();var s = H();var a = "";this.divRemTo(i, n, s);while (n.signum() > 0) {a = (r + s.intValue()).toString(t).substr(1) + a;n.divRemTo(i, n, s);}return s.intValue().toString(t) + a;};t.prototype.fromRadix = function (e, r) {this.fromInt(0);if (null == r) r = 10;var i = this.chunkSize(r);var n = Math.pow(r, i);var s = false;var a = 0;var o = 0;for (var u = 0; u < e.length; ++u) {var c = G(e, u);if (c < 0) {if ("-" == e.charAt(u) && 0 == this.signum()) s = true;continue;}o = r * o + c;if (++a >= i) {this.dMultiply(n);this.dAddOffset(o, 0);a = 0;o = 0;}}if (a > 0) {this.dMultiply(Math.pow(r, a));this.dAddOffset(o, 0);}if (s) t.ZERO.subTo(this, this);};t.prototype.fromNumber = function (e, r, i) {if ("number" == typeof r) {if (e < 2) this.fromInt(1);else {this.fromNumber(e, i);if (!this.testBit(e - 1)) this.bitwiseTo(t.ONE.shiftLeft(e - 1), a, this);if (this.isEven()) this.dAddOffset(1, 0);while (!this.isProbablePrime(r)) {this.dAddOffset(2, 0);if (this.bitLength() > e) this.subTo(t.ONE.shiftLeft(e - 1), this);}}} else {var n = [];var s = 7 & e;n.length = (e >> 3) + 1;r.nextBytes(n);if (s > 0) n[0] &= (1 << s) - 1;else n[0] = 0;this.fromString(n, 256);}};t.prototype.bitwiseTo = function (t, e, r) {var i;var n;var s = Math.min(t.t, this.t);for (i = 0; i < s; ++i) {r[i] = e(this[i], t[i]);}if (t.t < this.t) {n = t.s & this.DM;for (i = s; i < this.t; ++i) {r[i] = e(this[i], n);}r.t = this.t;} else {n = this.s & this.DM;for (i = s; i < t.t; ++i) {r[i] = e(n, t[i]);}r.t = t.t;}r.s = e(this.s, t.s);r.clamp();};t.prototype.changeBit = function (e, r) {var i = t.ONE.shiftLeft(e);this.bitwiseTo(i, r, i);return i;};t.prototype.addTo = function (t, e) {var r = 0;var i = 0;var n = Math.min(t.t, this.t);while (r < n) {i += this[r] + t[r];e[r++] = i & this.DM;i >>= this.DB;}if (t.t < this.t) {i += t.s;while (r < this.t) {i += this[r];e[r++] = i & this.DM;i >>= this.DB;}i += this.s;} else {i += this.s;while (r < t.t) {i += t[r];e[r++] = i & this.DM;i >>= this.DB;}i += t.s;}e.s = i < 0 ? -1 : 0;if (i > 0) e[r++] = i;else if (i < -1) e[r++] = this.DV + i;e.t = r;e.clamp();};t.prototype.dMultiply = function (t) {this[this.t] = this.am(0, t - 1, this, 0, 0, this.t);++this.t;this.clamp();};t.prototype.dAddOffset = function (t, e) {if (0 == t) return;while (this.t <= e) {this[this.t++] = 0;}this[e] += t;while (this[e] >= this.DV) {this[e] -= this.DV;if (++e >= this.t) this[this.t++] = 0;++this[e];}};t.prototype.multiplyLowerTo = function (t, e, r) {var i = Math.min(this.t + t.t, e);r.s = 0;r.t = i;while (i > 0) {r[--i] = 0;}for (var n = r.t - this.t; i < n; ++i) {r[i + this.t] = this.am(0, t[i], r, i, 0, this.t);}for (var n = Math.min(t.t, e); i < n; ++i) {this.am(0, t[i], r, i, 0, e - i);}r.clamp();};t.prototype.multiplyUpperTo = function (t, e, r) {--e;var i = r.t = this.t + t.t - e;r.s = 0;while (--i >= 0) {r[i] = 0;}for (i = Math.max(e - this.t, 0); i < t.t; ++i) {r[this.t + i - e] = this.am(e - i, t[i], r, 0, 0, this.t + i - e);}r.clamp();r.drShiftTo(1, r);};t.prototype.modInt = function (t) {if (t <= 0) return 0;var e = this.DV % t;var r = this.s < 0 ? t - 1 : 0;if (this.t > 0) if (0 == e) r = this[0] % t;else for (var i = this.t - 1; i >= 0; --i) {r = (e * r + this[i]) % t;}return r;};t.prototype.millerRabin = function (e) {var r = this.subtract(t.ONE);var i = r.getLowestSetBit();if (i <= 0) return false;var n = r.shiftRight(i);e = e + 1 >> 1;if (e > O.length) e = O.length;var s = H();for (var a = 0; a < e; ++a) {s.fromInt(O[Math.floor(Math.random() * O.length)]);var o = s.modPow(n, this);if (0 != o.compareTo(t.ONE) && 0 != o.compareTo(r)) {var u = 1;while (u++ < i && 0 != o.compareTo(r)) {o = o.modPowInt(2, this);if (0 == o.compareTo(t.ONE)) return false;}if (0 != o.compareTo(r)) return false;}}return true;};t.prototype.square = function () {var t = H();this.squareTo(t);return t;};t.prototype.gcda = function (t, e) {var r = this.s < 0 ? this.negate() : this.clone();var i = t.s < 0 ? t.negate() : t.clone();if (r.compareTo(i) < 0) {var n = r;r = i;i = n;}var s = r.getLowestSetBit();var a = i.getLowestSetBit();if (a < 0) {e(r);return;}if (s < a) a = s;if (a > 0) {r.rShiftTo(a, r);i.rShiftTo(a, i);}var o = function o() {if ((s = r.getLowestSetBit()) > 0) r.rShiftTo(s, r);if ((s = i.getLowestSetBit()) > 0) i.rShiftTo(s, i);if (r.compareTo(i) >= 0) {r.subTo(i, r);r.rShiftTo(1, r);} else {i.subTo(r, i);i.rShiftTo(1, i);}if (!(r.signum() > 0)) {if (a > 0) i.lShiftTo(a, i);setTimeout(function () {e(i);}, 0);} else setTimeout(o, 0);};setTimeout(o, 10);};t.prototype.fromNumberAsync = function (e, r, i, n) {if ("number" == typeof r) {if (e < 2) this.fromInt(1);else {this.fromNumber(e, i);if (!this.testBit(e - 1)) this.bitwiseTo(t.ONE.shiftLeft(e - 1), a, this);if (this.isEven()) this.dAddOffset(1, 0);var s = this;var o = function o() {s.dAddOffset(2, 0);if (s.bitLength() > e) s.subTo(t.ONE.shiftLeft(e - 1), s);if (s.isProbablePrime(r)) setTimeout(function () {n();}, 0);else setTimeout(o, 0);};setTimeout(o, 0);}} else {var u = [];var c = 7 & e;u.length = (e >> 3) + 1;r.nextBytes(u);if (c > 0) u[0] &= (1 << c) - 1;else u[0] = 0;this.fromString(u, 256);}};return t;}();var N = function () {function t() {}t.prototype.convert = function (t) {return t;};t.prototype.revert = function (t) {return t;};t.prototype.mulTo = function (t, e, r) {t.multiplyTo(e, r);};t.prototype.sqrTo = function (t, e) {t.squareTo(e);};return t;}();var P = function () {function t(t) {this.m = t;}t.prototype.convert = function (t) {if (t.s < 0 || t.compareTo(this.m) >= 0) return t.mod(this.m);else return t;};t.prototype.revert = function (t) {return t;};t.prototype.reduce = function (t) {t.divRemTo(this.m, null, t);};t.prototype.mulTo = function (t, e, r) {t.multiplyTo(e, r);this.reduce(r);};t.prototype.sqrTo = function (t, e) {t.squareTo(e);this.reduce(e);};return t;}();var V = function () {function t(t) {this.m = t;this.mp = t.invDigit();this.mpl = 32767 & this.mp;this.mph = this.mp >> 15;this.um = (1 << t.DB - 15) - 1;this.mt2 = 2 * t.t;}t.prototype.convert = function (t) {var e = H();t.abs().dlShiftTo(this.m.t, e);e.divRemTo(this.m, null, e);if (t.s < 0 && e.compareTo(C.ZERO) > 0) this.m.subTo(e, e);return e;};t.prototype.revert = function (t) {var e = H();t.copyTo(e);this.reduce(e);return e;};t.prototype.reduce = function (t) {while (t.t <= this.mt2) {t[t.t++] = 0;}for (var e = 0; e < this.m.t; ++e) {var r = 32767 & t[e];var i = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;r = e + this.m.t;t[r] += this.m.am(0, i, t, e, 0, this.m.t);while (t[r] >= t.DV) {t[r] -= t.DV;t[++r]++;}}t.clamp();t.drShiftTo(this.m.t, t);if (t.compareTo(this.m) >= 0) t.subTo(this.m, t);};t.prototype.mulTo = function (t, e, r) {t.multiplyTo(e, r);this.reduce(r);};t.prototype.sqrTo = function (t, e) {t.squareTo(e);this.reduce(e);};return t;}();var L = function () {function t(t) {this.m = t;this.r2 = H();this.q3 = H();C.ONE.dlShiftTo(2 * t.t, this.r2);this.mu = this.r2.divide(t);}t.prototype.convert = function (t) {if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);else if (t.compareTo(this.m) < 0) return t;else {var e = H();t.copyTo(e);this.reduce(e);return e;}};t.prototype.revert = function (t) {return t;};t.prototype.reduce = function (t) {t.drShiftTo(this.m.t - 1, this.r2);if (t.t > this.m.t + 1) {t.t = this.m.t + 1;t.clamp();}this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);while (t.compareTo(this.r2) < 0) {t.dAddOffset(1, this.m.t + 1);}t.subTo(this.r2, t);while (t.compareTo(this.m) >= 0) {t.subTo(this.m, t);}};t.prototype.mulTo = function (t, e, r) {t.multiplyTo(e, r);this.reduce(r);};t.prototype.sqrTo = function (t, e) {t.squareTo(e);this.reduce(e);};return t;}();function H() {return new C(null);}function K(t, e) {return new C(t, e);}var U = "undefined" !== typeof navigator;if (U && B && "Microsoft Internet Explorer" == navigator.appName) {C.prototype.am = function t(e, r, i, n, s, a) {var o = 32767 & r;var u = r >> 15;while (--a >= 0) {var c = 32767 & this[e];var l = this[e++] >> 15;var f = u * c + l * o;c = o * c + ((32767 & f) << 15) + i[n] + (1073741823 & s);s = (c >>> 30) + (f >>> 15) + u * l + (s >>> 30);i[n++] = 1073741823 & c;}return s;};x = 30;} else if (U && B && "Netscape" != navigator.appName) {C.prototype.am = function t(e, r, i, n, s, a) {while (--a >= 0) {var o = r * this[e++] + i[n] + s;s = Math.floor(o / 67108864);i[n++] = 67108863 & o;}return s;};x = 26;} else {C.prototype.am = function t(e, r, i, n, s, a) {var o = 16383 & r;var u = r >> 14;while (--a >= 0) {var c = 16383 & this[e];var l = this[e++] >> 14;var f = u * c + l * o;c = o * c + ((16383 & f) << 14) + i[n] + s;s = (c >> 28) + (f >> 14) + u * l;i[n++] = 268435455 & c;}return s;};x = 28;}C.prototype.DB = x;C.prototype.DM = (1 << x) - 1;C.prototype.DV = 1 << x;var j = 52;C.prototype.FV = Math.pow(2, j);C.prototype.F1 = j - x;C.prototype.F2 = 2 * x - j;var q = [];var F;var z;F = "0".charCodeAt(0);for (z = 0; z <= 9; ++z) {q[F++] = z;}F = "a".charCodeAt(0);for (z = 10; z < 36; ++z) {q[F++] = z;}F = "A".charCodeAt(0);for (z = 10; z < 36; ++z) {q[F++] = z;}function G(t, e) {var r = q[t.charCodeAt(e)];return null == r ? -1 : r;}function Y(t) {var e = H();e.fromInt(t);return e;}function W(t) {var e = 1;var r;if (0 != (r = t >>> 16)) {t = r;e += 16;}if (0 != (r = t >> 8)) {t = r;e += 8;}if (0 != (r = t >> 4)) {t = r;e += 4;}if (0 != (r = t >> 2)) {t = r;e += 2;}if (0 != (r = t >> 1)) {t = r;e += 1;}return e;}C.ZERO = Y(0);C.ONE = Y(1);var J = function () {function t() {this.i = 0;this.j = 0;this.S = [];}t.prototype.init = function (t) {var e;var r;var i;for (e = 0; e < 256; ++e) {this.S[e] = e;}r = 0;for (e = 0; e < 256; ++e) {r = r + this.S[e] + t[e % t.length] & 255;i = this.S[e];this.S[e] = this.S[r];this.S[r] = i;}this.i = 0;this.j = 0;};t.prototype.next = function () {var t;this.i = this.i + 1 & 255;this.j = this.j + this.S[this.i] & 255;t = this.S[this.i];this.S[this.i] = this.S[this.j];this.S[this.j] = t;return this.S[t + this.S[this.i] & 255];};return t;}();function Z() {return new J();}var $ = 256;var X;var Q = null;var tt;if (null == Q) {Q = [];tt = 0;}function nt() {if (null == X) {X = Z();while (tt < $) {var t = Math.floor(65536 * Math.random());Q[tt++] = 255 & t;}X.init(Q);for (tt = 0; tt < Q.length; ++tt) {Q[tt] = 0;}tt = 0;}return X.next();}var st = function () {function t() {}t.prototype.nextBytes = function (t) {for (var e = 0; e < t.length; ++e) {t[e] = nt();}};return t;}();function at(t, e) {if (e < t.length + 22) {console.error("Message too long for RSA");return null;}var r = e - t.length - 6;var i = "";for (var n = 0; n < r; n += 2) {i += "ff";}var s = "0001" + i + "00" + t;return K(s, 16);}function ot(t, e) {if (e < t.length + 11) {console.error("Message too long for RSA");return null;}var r = [];var i = t.length - 1;while (i >= 0 && e > 0) {var n = t.charCodeAt(i--);if (n < 128) r[--e] = n;else if (n > 127 && n < 2048) {r[--e] = 63 & n | 128;r[--e] = n >> 6 | 192;} else {r[--e] = 63 & n | 128;r[--e] = n >> 6 & 63 | 128;r[--e] = n >> 12 | 224;}}r[--e] = 0;var s = new st();var a = [];while (e > 2) {a[0] = 0;while (0 == a[0]) {s.nextBytes(a);}r[--e] = a[0];}r[--e] = 2;r[--e] = 0;return new C(r);}var ut = function () {function t() {this.n = null;this.e = 0;this.d = null;this.p = null;this.q = null;this.dmp1 = null;this.dmq1 = null;this.coeff = null;}t.prototype.doPublic = function (t) {return t.modPowInt(this.e, this.n);};t.prototype.doPrivate = function (t) {if (null == this.p || null == this.q) return t.modPow(this.d, this.n);var e = t.mod(this.p).modPow(this.dmp1, this.p);var r = t.mod(this.q).modPow(this.dmq1, this.q);while (e.compareTo(r) < 0) {e = e.add(this.p);}return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r);};t.prototype.setPublic = function (t, e) {if (null != t && null != e && t.length > 0 && e.length > 0) {this.n = K(t, 16);this.e = parseInt(e, 16);} else console.error("Invalid RSA public key");};t.prototype.encrypt = function (t) {var e = this.n.bitLength() + 7 >> 3;var r = ot(t, e);if (null == r) return null;var i = this.doPublic(r);if (null == i) return null;var n = i.toString(16);var s = n.length;for (var a = 0; a < 2 * e - s; a++) {n = "0" + n;}return n;};t.prototype.setPrivate = function (t, e, r) {if (null != t && null != e && t.length > 0 && e.length > 0) {this.n = K(t, 16);this.e = parseInt(e, 16);this.d = K(r, 16);} else console.error("Invalid RSA private key");};t.prototype.setPrivateEx = function (t, e, r, i, n, s, a, o) {if (null != t && null != e && t.length > 0 && e.length > 0) {this.n = K(t, 16);this.e = parseInt(e, 16);this.d = K(r, 16);this.p = K(i, 16);this.q = K(n, 16);this.dmp1 = K(s, 16);this.dmq1 = K(a, 16);this.coeff = K(o, 16);} else console.error("Invalid RSA private key");};t.prototype.generate = function (t, e) {var r = new st();var i = t >> 1;this.e = parseInt(e, 16);var n = new C(e, 16);for (;;) {for (;;) {this.p = new C(t - i, 1, r);if (0 == this.p.subtract(C.ONE).gcd(n).compareTo(C.ONE) && this.p.isProbablePrime(10)) break;}for (;;) {this.q = new C(i, 1, r);if (0 == this.q.subtract(C.ONE).gcd(n).compareTo(C.ONE) && this.q.isProbablePrime(10)) break;}if (this.p.compareTo(this.q) <= 0) {var s = this.p;this.p = this.q;this.q = s;}var a = this.p.subtract(C.ONE);var o = this.q.subtract(C.ONE);var u = a.multiply(o);if (0 == u.gcd(n).compareTo(C.ONE)) {this.n = this.p.multiply(this.q);this.d = n.modInverse(u);this.dmp1 = this.d.mod(a);this.dmq1 = this.d.mod(o);this.coeff = this.q.modInverse(this.p);break;}}};t.prototype.decrypt = function (t) {var e = K(t, 16);var r = this.doPrivate(e);if (null == r) return null;return ct(r, this.n.bitLength() + 7 >> 3);};t.prototype.generateAsync = function (t, e, r) {var i = new st();var n = t >> 1;this.e = parseInt(e, 16);var s = new C(e, 16);var a = this;var o = function o() {var e = function e() {if (a.p.compareTo(a.q) <= 0) {var t = a.p;a.p = a.q;a.q = t;}var e = a.p.subtract(C.ONE);var i = a.q.subtract(C.ONE);var n = e.multiply(i);if (0 == n.gcd(s).compareTo(C.ONE)) {a.n = a.p.multiply(a.q);a.d = s.modInverse(n);a.dmp1 = a.d.mod(e);a.dmq1 = a.d.mod(i);a.coeff = a.q.modInverse(a.p);setTimeout(function () {r();}, 0);} else setTimeout(o, 0);};var u = function u() {a.q = H();a.q.fromNumberAsync(n, 1, i, function () {a.q.subtract(C.ONE).gcda(s, function (t) {if (0 == t.compareTo(C.ONE) && a.q.isProbablePrime(10)) setTimeout(e, 0);else setTimeout(u, 0);});});};var c = function c() {a.p = H();a.p.fromNumberAsync(t - n, 1, i, function () {a.p.subtract(C.ONE).gcda(s, function (t) {if (0 == t.compareTo(C.ONE) && a.p.isProbablePrime(10)) setTimeout(u, 0);else setTimeout(c, 0);});});};setTimeout(c, 0);};setTimeout(o, 0);};t.prototype.sign = function (t, e, r) {var i = ht(r);var n = i + e(t).toString();var s = at(n, this.n.bitLength() / 4);if (null == s) return null;var a = this.doPrivate(s);if (null == a) return null;var o = a.toString(16);if (0 == (1 & o.length)) return o;else return "0" + o;};t.prototype.verify = function (t, e, r) {var i = K(e, 16);var n = this.doPublic(i);if (null == n) return null;var s = n.toString(16).replace(/^1f+00/, "");var a = dt(s);return a == r(t).toString();};t.prototype.encryptLong = function (t) {var e = this;var r = "";var i = (this.n.bitLength() + 7 >> 3) - 11;var n = this.setSplitChn(t, i);n.forEach(function (t) {r += e.encrypt(t);});return r;};t.prototype.decryptLong = function (t) {var e = "";var r = this.n.bitLength() + 7 >> 3;var i = 2 * r;if (t.length > i) {var n = t.match(new RegExp(".{1," + i + "}", "g")) || [];var s = [];for (var a = 0; a < n.length; a++) {var o = K(n[a], 16);var u = this.doPrivate(o);if (null == u) return null;s.push(u);}e = lt(s, r);} else e = this.decrypt(t);return e;};t.prototype.setSplitChn = function (t, e, r) {if (void 0 === r) r = [];var i = t.split("");var n = 0;for (var s = 0; s < i.length; s++) {var a = i[s].charCodeAt(0);if (a <= 127) n += 1;else if (a <= 2047) n += 2;else if (a <= 65535) n += 3;else n += 4;if (n > e) {var o = t.substring(0, s);r.push(o);return this.setSplitChn(t.substring(s), e, r);}}r.push(t);return r;};return t;}();function ct(t, e) {var r = t.toByteArray();var i = 0;while (i < r.length && 0 == r[i]) {++i;}if (r.length - i != e - 1 || 2 != r[i]) return null;++i;while (0 != r[i]) {if (++i >= r.length) return null;}var n = "";while (++i < r.length) {var s = 255 & r[i];if (s < 128) n += String.fromCharCode(s);else if (s > 191 && s < 224) {n += String.fromCharCode((31 & s) << 6 | 63 & r[i + 1]);++i;} else {n += String.fromCharCode((15 & s) << 12 | (63 & r[i + 1]) << 6 | 63 & r[i + 2]);i += 2;}}return n;}function lt(t, e) {var r = [];for (var i = 0; i < t.length; i++) {var n = t[i];var s = n.toByteArray();var a = 0;while (a < s.length && 0 == s[a]) {++a;}if (s.length - a != e - 1 || 2 != s[a]) return null;++a;while (0 != s[a]) {if (++a >= s.length) return null;}r = r.concat(s.slice(a + 1));}var o = r;var u = -1;var c = "";while (++u < o.length) {var l = 255 & o[u];if (l < 128) c += String.fromCharCode(l);else if (l > 191 && l < 224) {c += String.fromCharCode((31 & l) << 6 | 63 & o[u + 1]);++u;} else {c += String.fromCharCode((15 & l) << 12 | (63 & o[u + 1]) << 6 | 63 & o[u + 2]);u += 2;}}return c;}var ft = { md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", ripemd160: "3021300906052b2403020105000414" };function ht(t) {return ft[t] || "";}function dt(t) {for (var e in ft) {if (ft.hasOwnProperty(e)) {var r = ft[e];var i = r.length;if (t.substr(0, i) == r) return t.substr(i);}}return t;}var pt = {};pt.lang = { extend: function extend(t, e, r) {if (!e || !t) throw new Error("YAHOO.lang.extend failed, please check that " + "all dependencies are included.");var i = function i() {};i.prototype = e.prototype;t.prototype = new i();t.prototype.constructor = t;t.superclass = e.prototype;if (e.prototype.constructor == Object.prototype.constructor) e.prototype.constructor = e;if (r) {var n;for (n in r) {t.prototype[n] = r[n];}var s = function s() {},a = ["toString", "valueOf"];try {if (/MSIE/.test(navigator.userAgent)) s = function s(t, e) {for (n = 0; n < a.length; n += 1) {var r = a[n],i = e[r];if ("function" === typeof i && i != Object.prototype[r]) t[r] = i;}};} catch (t) {}s(t.prototype, r);}} };var vt = {};if ("undefined" == typeof vt.asn1 || !vt.asn1) vt.asn1 = {};vt.asn1.ASN1Util = new function () {this.integerToByteHex = function (t) {var e = t.toString(16);if (e.length % 2 == 1) e = "0" + e;return e;};this.bigIntToMinTwosComplementsHex = function (t) {var e = t.toString(16);if ("-" != e.substr(0, 1)) {if (e.length % 2 == 1) e = "0" + e;else if (!e.match(/^[0-7]/)) e = "00" + e;} else {var r = e.substr(1);var i = r.length;if (i % 2 == 1) i += 1;else if (!e.match(/^[0-7]/)) i += 2;var n = "";for (var s = 0; s < i; s++) {n += "f";}var a = new C(n, 16);var o = a.xor(t).add(C.ONE);e = o.toString(16).replace(/^-/, "");}return e;};this.getPEMStringFromHex = function (t, e) {return hextopem(t, e);};this.newObject = function (t) {var e = vt,r = e.asn1,i = r.DERBoolean,n = r.DERInteger,s = r.DERBitString,a = r.DEROctetString,o = r.DERNull,u = r.DERObjectIdentifier,c = r.DEREnumerated,l = r.DERUTF8String,f = r.DERNumericString,h = r.DERPrintableString,d = r.DERTeletexString,p = r.DERIA5String,v = r.DERUTCTime,g = r.DERGeneralizedTime,y = r.DERSequence,m = r.DERSet,w = r.DERTaggedObject,S = r.ASN1Util.newObject;var _ = Object.keys(t);if (1 != _.length) throw "key of param shall be only one.";var b = _[0];if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + b + ":")) throw "undefined key: " + b;if ("bool" == b) return new i(t[b]);if ("int" == b) return new n(t[b]);if ("bitstr" == b) return new s(t[b]);if ("octstr" == b) return new a(t[b]);if ("null" == b) return new o(t[b]);if ("oid" == b) return new u(t[b]);if ("enum" == b) return new c(t[b]);if ("utf8str" == b) return new l(t[b]);if ("numstr" == b) return new f(t[b]);if ("prnstr" == b) return new h(t[b]);if ("telstr" == b) return new d(t[b]);if ("ia5str" == b) return new p(t[b]);if ("utctime" == b) return new v(t[b]);if ("gentime" == b) return new g(t[b]);if ("seq" == b) {var E = t[b];var D = [];for (var M = 0; M < E.length; M++) {var T = S(E[M]);D.push(T);}return new y({ array: D });}if ("set" == b) {var E = t[b];var D = [];for (var M = 0; M < E.length; M++) {var T = S(E[M]);D.push(T);}return new m({ array: D });}if ("tag" == b) {var I = t[b];if ("[object Array]" === Object.prototype.toString.call(I) && 3 == I.length) {var A = S(I[2]);return new w({ tag: I[0], explicit: I[1], obj: A });} else {var x = {};if (void 0 !== I.explicit) x.explicit = I.explicit;if (void 0 !== I.tag) x.tag = I.tag;if (void 0 === I.obj) throw "obj shall be specified for 'tag'.";x.obj = S(I.obj);return new w(x);}}};this.jsonToASN1HEX = function (t) {var e = this.newObject(t);return e.getEncodedHex();};}();vt.asn1.ASN1Util.oidHexToInt = function (t) {var e = "";var r = parseInt(t.substr(0, 2), 16);var i = Math.floor(r / 40);var n = r % 40;var e = i + "." + n;var s = "";for (var a = 2; a < t.length; a += 2) {var o = parseInt(t.substr(a, 2), 16);var u = ("00000000" + o.toString(2)).slice(-8);s += u.substr(1, 7);if ("0" == u.substr(0, 1)) {var c = new C(s, 2);e = e + "." + c.toString(10);s = "";}}return e;};vt.asn1.ASN1Util.oidIntToHex = function (t) {var e = function e(t) {var e = t.toString(16);if (1 == e.length) e = "0" + e;return e;};var r = function r(t) {var r = "";var i = new C(t, 10);var n = i.toString(2);var s = 7 - n.length % 7;if (7 == s) s = 0;var a = "";for (var o = 0; o < s; o++) {a += "0";}n = a + n;for (var o = 0; o < n.length - 1; o += 7) {var u = n.substr(o, 7);if (o != n.length - 7) u = "1" + u;r += e(parseInt(u, 2));}return r;};if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;var i = "";var n = t.split(".");var s = 40 * parseInt(n[0]) + parseInt(n[1]);i += e(s);n.splice(0, 2);for (var a = 0; a < n.length; a++) {i += r(n[a]);}return i;};vt.asn1.ASN1Object = function () {var n = "";this.getLengthHexFromValue = function () {if ("undefined" == typeof this.hV || null == this.hV) throw "this.hV is null or undefined.";if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + n.length + ",v=" + this.hV;var t = this.hV.length / 2;var e = t.toString(16);if (e.length % 2 == 1) e = "0" + e;if (t < 128) return e;else {var r = e.length / 2;if (r > 15) throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);var i = 128 + r;return i.toString(16) + e;}};this.getEncodedHex = function () {if (null == this.hTLV || this.isModified) {this.hV = this.getFreshValueHex();this.hL = this.getLengthHexFromValue();this.hTLV = this.hT + this.hL + this.hV;this.isModified = false;}return this.hTLV;};this.getValueHex = function () {this.getEncodedHex();return this.hV;};this.getFreshValueHex = function () {return "";};};vt.asn1.DERAbstractString = function (t) {vt.asn1.DERAbstractString.superclass.constructor.call(this);this.getString = function () {return this.s;};this.setString = function (t) {this.hTLV = null;this.isModified = true;this.s = t;this.hV = stohex(this.s);};this.setStringHex = function (t) {this.hTLV = null;this.isModified = true;this.s = null;this.hV = t;};this.getFreshValueHex = function () {return this.hV;};if ("undefined" != typeof t) if ("string" == typeof t) this.setString(t);else if ("undefined" != typeof t["str"]) this.setString(t["str"]);else if ("undefined" != typeof t["hex"]) this.setStringHex(t["hex"]);};pt.lang.extend(vt.asn1.DERAbstractString, vt.asn1.ASN1Object);vt.asn1.DERAbstractTime = function (t) {vt.asn1.DERAbstractTime.superclass.constructor.call(this);this.localDateToUTC = function (t) {utc = t.getTime() + 6e4 * t.getTimezoneOffset();var e = new Date(utc);return e;};this.formatDate = function (t, e, r) {var i = this.zeroPadding;var n = this.localDateToUTC(t);var s = String(n.getFullYear());if ("utc" == e) s = s.substr(2, 2);var a = i(String(n.getMonth() + 1), 2);var o = i(String(n.getDate()), 2);var u = i(String(n.getHours()), 2);var c = i(String(n.getMinutes()), 2);var l = i(String(n.getSeconds()), 2);var f = s + a + o + u + c + l;if (true === r) {var h = n.getMilliseconds();if (0 != h) {var d = i(String(h), 3);d = d.replace(/[0]+$/, "");f = f + "." + d;}}return f + "Z";};this.zeroPadding = function (t, e) {if (t.length >= e) return t;return new Array(e - t.length + 1).join("0") + t;};this.getString = function () {return this.s;};this.setString = function (t) {this.hTLV = null;this.isModified = true;this.s = t;this.hV = stohex(t);};this.setByDateValue = function (t, e, r, i, n, s) {var a = new Date(Date.UTC(t, e - 1, r, i, n, s, 0));this.setByDate(a);};this.getFreshValueHex = function () {return this.hV;};};pt.lang.extend(vt.asn1.DERAbstractTime, vt.asn1.ASN1Object);vt.asn1.DERAbstractStructured = function (t) {vt.asn1.DERAbstractString.superclass.constructor.call(this);this.setByASN1ObjectArray = function (t) {this.hTLV = null;this.isModified = true;this.asn1Array = t;};this.appendASN1Object = function (t) {this.hTLV = null;this.isModified = true;this.asn1Array.push(t);};this.asn1Array = new Array();if ("undefined" != typeof t) if ("undefined" != typeof t["array"]) this.asn1Array = t["array"];};pt.lang.extend(vt.asn1.DERAbstractStructured, vt.asn1.ASN1Object);vt.asn1.DERBoolean = function () {vt.asn1.DERBoolean.superclass.constructor.call(this);this.hT = "01";this.hTLV = "0101ff";};pt.lang.extend(vt.asn1.DERBoolean, vt.asn1.ASN1Object);vt.asn1.DERInteger = function (t) {vt.asn1.DERInteger.superclass.constructor.call(this);this.hT = "02";this.setByBigInteger = function (t) {this.hTLV = null;this.isModified = true;this.hV = vt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);};this.setByInteger = function (t) {var e = new C(String(t), 10);this.setByBigInteger(e);};this.setValueHex = function (t) {this.hV = t;};this.getFreshValueHex = function () {return this.hV;};if ("undefined" != typeof t) if ("undefined" != typeof t["bigint"]) this.setByBigInteger(t["bigint"]);else if ("undefined" != typeof t["int"]) this.setByInteger(t["int"]);else if ("number" == typeof t) this.setByInteger(t);else if ("undefined" != typeof t["hex"]) this.setValueHex(t["hex"]);};pt.lang.extend(vt.asn1.DERInteger, vt.asn1.ASN1Object);vt.asn1.DERBitString = function (t) {if (void 0 !== t && "undefined" !== typeof t.obj) {var e = vt.asn1.ASN1Util.newObject(t.obj);t.hex = "00" + e.getEncodedHex();}vt.asn1.DERBitString.superclass.constructor.call(this);this.hT = "03";this.setHexValueIncludingUnusedBits = function (t) {this.hTLV = null;this.isModified = true;this.hV = t;};this.setUnusedBitsAndHexValue = function (t, e) {if (t < 0 || 7 < t) throw "unused bits shall be from 0 to 7: u = " + t;var r = "0" + t;this.hTLV = null;this.isModified = true;this.hV = r + e;};this.setByBinaryString = function (t) {t = t.replace(/0+$/, "");var e = 8 - t.length % 8;if (8 == e) e = 0;for (var r = 0; r <= e; r++) {t += "0";}var i = "";for (var r = 0; r < t.length - 1; r += 8) {var n = t.substr(r, 8);var s = parseInt(n, 2).toString(16);if (1 == s.length) s = "0" + s;i += s;}this.hTLV = null;this.isModified = true;this.hV = "0" + e + i;};this.setByBooleanArray = function (t) {var e = "";for (var r = 0; r < t.length; r++) {if (true == t[r]) e += "1";else e += "0";}this.setByBinaryString(e);};this.newFalseArray = function (t) {var e = new Array(t);for (var r = 0; r < t; r++) {e[r] = false;}return e;};this.getFreshValueHex = function () {return this.hV;};if ("undefined" != typeof t) if ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/)) this.setHexValueIncludingUnusedBits(t);else if ("undefined" != typeof t["hex"]) this.setHexValueIncludingUnusedBits(t["hex"]);else if ("undefined" != typeof t["bin"]) this.setByBinaryString(t["bin"]);else if ("undefined" != typeof t["array"]) this.setByBooleanArray(t["array"]);};pt.lang.extend(vt.asn1.DERBitString, vt.asn1.ASN1Object);vt.asn1.DEROctetString = function (t) {if (void 0 !== t && "undefined" !== typeof t.obj) {var e = vt.asn1.ASN1Util.newObject(t.obj);t.hex = e.getEncodedHex();}vt.asn1.DEROctetString.superclass.constructor.call(this, t);this.hT = "04";};pt.lang.extend(vt.asn1.DEROctetString, vt.asn1.DERAbstractString);vt.asn1.DERNull = function () {vt.asn1.DERNull.superclass.constructor.call(this);this.hT = "05";this.hTLV = "0500";};pt.lang.extend(vt.asn1.DERNull, vt.asn1.ASN1Object);vt.asn1.DERObjectIdentifier = function (t) {var e = function e(t) {var e = t.toString(16);if (1 == e.length) e = "0" + e;return e;};var r = function r(t) {var r = "";var i = new C(t, 10);var n = i.toString(2);var s = 7 - n.length % 7;if (7 == s) s = 0;var a = "";for (var o = 0; o < s; o++) {a += "0";}n = a + n;for (var o = 0; o < n.length - 1; o += 7) {var u = n.substr(o, 7);if (o != n.length - 7) u = "1" + u;r += e(parseInt(u, 2));}return r;};vt.asn1.DERObjectIdentifier.superclass.constructor.call(this);this.hT = "06";this.setValueHex = function (t) {this.hTLV = null;this.isModified = true;this.s = null;this.hV = t;};this.setValueOidString = function (t) {if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;var i = "";var n = t.split(".");var s = 40 * parseInt(n[0]) + parseInt(n[1]);i += e(s);n.splice(0, 2);for (var a = 0; a < n.length; a++) {i += r(n[a]);}this.hTLV = null;this.isModified = true;this.s = null;this.hV = i;};this.setValueName = function (t) {var e = vt.asn1.x509.OID.name2oid(t);if ("" !== e) this.setValueOidString(e);else throw "DERObjectIdentifier oidName undefined: " + t;};this.getFreshValueHex = function () {return this.hV;};if (void 0 !== t) if ("string" === typeof t) {if (t.match(/^[0-2].[0-9.]+$/)) this.setValueOidString(t);else this.setValueName(t);} else if (void 0 !== t.oid) this.setValueOidString(t.oid);else if (void 0 !== t.hex) this.setValueHex(t.hex);else if (void 0 !== t.name) this.setValueName(t.name);};pt.lang.extend(vt.asn1.DERObjectIdentifier, vt.asn1.ASN1Object);vt.asn1.DEREnumerated = function (t) {vt.asn1.DEREnumerated.superclass.constructor.call(this);this.hT = "0a";this.setByBigInteger = function (t) {this.hTLV = null;this.isModified = true;this.hV = vt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);};this.setByInteger = function (t) {var e = new C(String(t), 10);this.setByBigInteger(e);};this.setValueHex = function (t) {this.hV = t;};this.getFreshValueHex = function () {return this.hV;};if ("undefined" != typeof t) if ("undefined" != typeof t["int"]) this.setByInteger(t["int"]);else if ("number" == typeof t) this.setByInteger(t);else if ("undefined" != typeof t["hex"]) this.setValueHex(t["hex"]);};pt.lang.extend(vt.asn1.DEREnumerated, vt.asn1.ASN1Object);vt.asn1.DERUTF8String = function (t) {vt.asn1.DERUTF8String.superclass.constructor.call(this, t);this.hT = "0c";};pt.lang.extend(vt.asn1.DERUTF8String, vt.asn1.DERAbstractString);vt.asn1.DERNumericString = function (t) {vt.asn1.DERNumericString.superclass.constructor.call(this, t);this.hT = "12";};pt.lang.extend(vt.asn1.DERNumericString, vt.asn1.DERAbstractString);vt.asn1.DERPrintableString = function (t) {vt.asn1.DERPrintableString.superclass.constructor.call(this, t);this.hT = "13";};pt.lang.extend(vt.asn1.DERPrintableString, vt.asn1.DERAbstractString);vt.asn1.DERTeletexString = function (t) {vt.asn1.DERTeletexString.superclass.constructor.call(this, t);this.hT = "14";};pt.lang.extend(vt.asn1.DERTeletexString, vt.asn1.DERAbstractString);vt.asn1.DERIA5String = function (t) {vt.asn1.DERIA5String.superclass.constructor.call(this, t);this.hT = "16";};pt.lang.extend(vt.asn1.DERIA5String, vt.asn1.DERAbstractString);vt.asn1.DERUTCTime = function (t) {vt.asn1.DERUTCTime.superclass.constructor.call(this, t);this.hT = "17";this.setByDate = function (t) {this.hTLV = null;this.isModified = true;this.date = t;this.s = this.formatDate(this.date, "utc");this.hV = stohex(this.s);};this.getFreshValueHex = function () {if ("undefined" == typeof this.date && "undefined" == typeof this.s) {this.date = new Date();this.s = this.formatDate(this.date, "utc");this.hV = stohex(this.s);}return this.hV;};if (void 0 !== t) if (void 0 !== t.str) this.setString(t.str);else if ("string" == typeof t && t.match(/^[0-9]{12}Z$/)) this.setString(t);else if (void 0 !== t.hex) this.setStringHex(t.hex);else if (void 0 !== t.date) this.setByDate(t.date);};pt.lang.extend(vt.asn1.DERUTCTime, vt.asn1.DERAbstractTime);vt.asn1.DERGeneralizedTime = function (t) {vt.asn1.DERGeneralizedTime.superclass.constructor.call(this, t);this.hT = "18";this.withMillis = false;this.setByDate = function (t) {this.hTLV = null;this.isModified = true;this.date = t;this.s = this.formatDate(this.date, "gen", this.withMillis);this.hV = stohex(this.s);};this.getFreshValueHex = function () {if (void 0 === this.date && void 0 === this.s) {this.date = new Date();this.s = this.formatDate(this.date, "gen", this.withMillis);this.hV = stohex(this.s);}return this.hV;};if (void 0 !== t) {if (void 0 !== t.str) this.setString(t.str);else if ("string" == typeof t && t.match(/^[0-9]{14}Z$/)) this.setString(t);else if (void 0 !== t.hex) this.setStringHex(t.hex);else if (void 0 !== t.date) this.setByDate(t.date);if (true === t.millis) this.withMillis = true;}};pt.lang.extend(vt.asn1.DERGeneralizedTime, vt.asn1.DERAbstractTime);vt.asn1.DERSequence = function (t) {vt.asn1.DERSequence.superclass.constructor.call(this, t);this.hT = "30";this.getFreshValueHex = function () {var t = "";for (var e = 0; e < this.asn1Array.length; e++) {var r = this.asn1Array[e];t += r.getEncodedHex();}this.hV = t;return this.hV;};};pt.lang.extend(vt.asn1.DERSequence, vt.asn1.DERAbstractStructured);vt.asn1.DERSet = function (t) {vt.asn1.DERSet.superclass.constructor.call(this, t);this.hT = "31";this.sortFlag = true;this.getFreshValueHex = function () {var t = new Array();for (var e = 0; e < this.asn1Array.length; e++) {var r = this.asn1Array[e];t.push(r.getEncodedHex());}if (true == this.sortFlag) t.sort();this.hV = t.join("");return this.hV;};if ("undefined" != typeof t) if ("undefined" != typeof t.sortflag && false == t.sortflag) this.sortFlag = false;};pt.lang.extend(vt.asn1.DERSet, vt.asn1.DERAbstractStructured);vt.asn1.DERTaggedObject = function (t) {vt.asn1.DERTaggedObject.superclass.constructor.call(this);this.hT = "a0";this.hV = "";this.isExplicit = true;this.asn1Object = null;this.setASN1Object = function (t, e, r) {this.hT = e;this.isExplicit = t;this.asn1Object = r;if (this.isExplicit) {this.hV = this.asn1Object.getEncodedHex();this.hTLV = null;this.isModified = true;} else {this.hV = null;this.hTLV = r.getEncodedHex();this.hTLV = this.hTLV.replace(/^../, e);this.isModified = false;}};this.getFreshValueHex = function () {return this.hV;};if ("undefined" != typeof t) {if ("undefined" != typeof t["tag"]) this.hT = t["tag"];if ("undefined" != typeof t["explicit"]) this.isExplicit = t["explicit"];if ("undefined" != typeof t["obj"]) {this.asn1Object = t["obj"];this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);}}};pt.lang.extend(vt.asn1.DERTaggedObject, vt.asn1.ASN1Object);var gt = function () {var _t5 = function t(e, r) {_t5 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, e) {t.__proto__ = e;} || function (t, e) {for (var r in e) {if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r];}};return _t5(e, r);};return function (e, r) {if ("function" !== typeof r && null !== r) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");_t5(e, r);function i() {this.constructor = e;}e.prototype = null === r ? Object.create(r) : (i.prototype = r.prototype, new i());};}();var yt = function (t) {gt(e, t);function e(r) {var i = t.call(this) || this;if (r) if ("string" === typeof r) i.parseKey(r);else if (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) i.parsePropertiesFrom(r);return i;}e.prototype.parseKey = function (t) {try {var e = 0;var r = 0;var i = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;var n = i.test(t) ? y.decode(t) : w.unarmor(t);var s = I.decode(n);if (3 === s.sub.length) s = s.sub[2].sub[0];if (9 === s.sub.length) {e = s.sub[1].getHexStringValue();this.n = K(e, 16);r = s.sub[2].getHexStringValue();this.e = parseInt(r, 16);var a = s.sub[3].getHexStringValue();this.d = K(a, 16);var o = s.sub[4].getHexStringValue();this.p = K(o, 16);var u = s.sub[5].getHexStringValue();this.q = K(u, 16);var c = s.sub[6].getHexStringValue();this.dmp1 = K(c, 16);var l = s.sub[7].getHexStringValue();this.dmq1 = K(l, 16);var f = s.sub[8].getHexStringValue();this.coeff = K(f, 16);} else if (2 === s.sub.length) {var h = s.sub[1];var d = h.sub[0];e = d.sub[0].getHexStringValue();this.n = K(e, 16);r = d.sub[1].getHexStringValue();this.e = parseInt(r, 16);} else return false;return true;} catch (t) {return false;}};e.prototype.getPrivateBaseKey = function () {var t = { array: [new vt.asn1.DERInteger({ int: 0 }), new vt.asn1.DERInteger({ bigint: this.n }), new vt.asn1.DERInteger({ int: this.e }), new vt.asn1.DERInteger({ bigint: this.d }), new vt.asn1.DERInteger({ bigint: this.p }), new vt.asn1.DERInteger({ bigint: this.q }), new vt.asn1.DERInteger({ bigint: this.dmp1 }), new vt.asn1.DERInteger({ bigint: this.dmq1 }), new vt.asn1.DERInteger({ bigint: this.coeff })] };var e = new vt.asn1.DERSequence(t);return e.getEncodedHex();};e.prototype.getPrivateBaseKeyB64 = function () {return d(this.getPrivateBaseKey());};e.prototype.getPublicBaseKey = function () {var t = new vt.asn1.DERSequence({ array: [new vt.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }), new vt.asn1.DERNull()] });var e = new vt.asn1.DERSequence({ array: [new vt.asn1.DERInteger({ bigint: this.n }), new vt.asn1.DERInteger({ int: this.e })] });var r = new vt.asn1.DERBitString({ hex: "00" + e.getEncodedHex() });var i = new vt.asn1.DERSequence({ array: [t, r] });return i.getEncodedHex();};e.prototype.getPublicBaseKeyB64 = function () {return d(this.getPublicBaseKey());};e.wordwrap = function (t, e) {e = e || 64;if (!t) return t;var r = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";return t.match(RegExp(r, "g")).join("\n");};e.prototype.getPrivateKey = function () {var t = "-----BEGIN RSA PRIVATE KEY-----\n";t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n";t += "-----END RSA PRIVATE KEY-----";return t;};e.prototype.getPublicKey = function () {var t = "-----BEGIN PUBLIC KEY-----\n";t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n";t += "-----END PUBLIC KEY-----";return t;};e.hasPublicKeyProperty = function (t) {t = t || {};return t.hasOwnProperty("n") && t.hasOwnProperty("e");};e.hasPrivateKeyProperty = function (t) {t = t || {};return t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff");};e.prototype.parsePropertiesFrom = function (t) {this.n = t.n;this.e = t.e;if (t.hasOwnProperty("d")) {this.d = t.d;this.p = t.p;this.q = t.q;this.dmp1 = t.dmp1;this.dmq1 = t.dmq1;this.coeff = t.coeff;}};return e;}(ut);var mt = { i: "3.2.1" };var wt = function () {function t(t) {if (void 0 === t) t = {};t = t || {};this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024;this.default_public_exponent = t.default_public_exponent || "010001";this.log = t.log || false;this.key = null;}t.prototype.setKey = function (t) {if (this.log && this.key) console.warn("A key was already set, overriding existing.");this.key = new yt(t);};t.prototype.setPrivateKey = function (t) {this.setKey(t);};t.prototype.setPublicKey = function (t) {this.setKey(t);};t.prototype.decrypt = function (t) {try {return this.getKey().decrypt(p(t));} catch (t) {return false;}};t.prototype.encrypt = function (t) {try {return this.getKey().encrypt(t);} catch (t) {return false;}};t.prototype.encryptLong = function (t) {try {return d(this.getKey().encryptLong(t));} catch (t) {return false;}};t.prototype.decryptLong = function (t) {try {return this.getKey().decryptLong(t);} catch (t) {return false;}};t.prototype.sign = function (t, e, r) {try {return d(this.getKey().sign(t, e, r));} catch (t) {return false;}};t.prototype.verify = function (t, e, r) {try {return this.getKey().verify(t, p(e), r);} catch (t) {return false;}};t.prototype.getKey = function (t) {if (!this.key) {this.key = new yt();if (t && "[object Function]" === {}.toString.call(t)) {this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);return;}this.key.generate(this.default_key_size, this.default_public_exponent);}return this.key;};t.prototype.getPrivateKey = function () {return this.getKey().getPrivateKey();};t.prototype.getPrivateKeyB64 = function () {return this.getKey().getPrivateBaseKeyB64();};t.prototype.getPublicKey = function () {return this.getKey().getPublicKey();};t.prototype.getPublicKeyB64 = function () {return this.getKey().getPublicBaseKeyB64();};t.version = mt.i;return t;}();var St = wt;}, 2480: function _() {} };var e = {};function r(i) {var n = e[i];if (void 0 !== n) return n.exports;var s = e[i] = { id: i, loaded: false, exports: {} };t[i].call(s.exports, s, s.exports, r);s.loaded = true;return s.exports;}(function () {r.d = function (t, e) {for (var i in e) {if (r.o(e, i) && !r.o(t, i)) Object.defineProperty(t, i, { enumerable: true, get: e[i] });}};})();(function () {r.g = function () {if ("object" === typeof globalThis) return globalThis;try {return this || new Function("return this")();} catch (t) {if ("object" === typeof window) return window;}}();})();(function () {r.o = function (t, e) {return Object.prototype.hasOwnProperty.call(t, e);};})();(function () {r.r = function (t) {if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });Object.defineProperty(t, "__esModule", { value: true });};})();(function () {r.nmd = function (t) {t.paths = [];if (!t.children) t.children = [];return t;};})();var i = r(5987);return i;}();});
});

var GtPush = /*@__PURE__*/getDefaultExportFromCjs(gtpushMin);

function initPushNotification() {
  // 仅 App 端
  if (typeof plus !== 'undefined' && plus.push) {
    plus.globalEvent.addEventListener('newPath', function (_ref) {var path = _ref.path;
      if (!path) {
        return;
      }
      // 指定的页面为当前页面
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage &&
      currentPage.$page &&
      currentPage.$page.fullPath === path) {
        return;
      }
      // 简单起见，先尝试 navigateTo 跳转，失败后，再尝试 tabBar 跳转
      uni.navigateTo({
        url: path,
        fail: function fail(res) {
          if (res.errMsg.indexOf('tabbar') > -1) {
            uni.switchTab({
              url: path,
              fail: function fail(res) {
                console.error(res.errMsg);
              } });

          } else
          {
            console.error(res.errMsg);
          }
        } });

    });
  }
}

// if (process.env.UNI_PUSH_DEBUG) {
//   GtPush.setDebugMode(true)
// }
// @ts-expect-error
uni.invokePushCallback({
  type: 'enabled' });

var appid = "__UNI__8EBC8F6";
if (!appid) {
  Promise.resolve().then(function () {
    // @ts-expect-error
    uni.invokePushCallback({
      type: 'clientId',
      cid: '',
      errMsg: 'manifest.json->appid is required' });

  });
} else
{



  GtPush.init({
    appid: appid,
    onError: function onError(res) {
      console.error(res.error);
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'clientId',
        cid: '',
        errMsg: res.error });

    },
    onClientId: function onClientId(res) {
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'clientId',
        cid: res.cid });

    },
    onlineState: function onlineState(res) {
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'lineState',
        online: res.online });

    },
    onPushMsg: function onPushMsg(res) {
      // @ts-expect-error
      uni.invokePushCallback({
        type: 'pushMsg',
        message: res.message });

    } });

  // 仅在 jssdk 中监听











}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map