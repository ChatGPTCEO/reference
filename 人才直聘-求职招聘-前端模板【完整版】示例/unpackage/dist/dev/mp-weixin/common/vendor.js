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
    appId: "__UNI__91E4A5F",
    appName: "人才直聘-求职招聘-前端模板【完整版】示例",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.4",
    uniRuntimeVersion: "3.6.4",
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
      appId: "__UNI__91E4A5F",
      appName: "人才直聘-求职招聘-前端模板【完整版】示例",
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"人才直聘-求职招聘-前端模板【完整版】示例","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);

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

/***/ 10:
/*!***************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/lib/imservice.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _restapi = _interopRequireDefault(__webpack_require__(/*! ./restapi */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function Friend(_id, name, avatar) {
  this._id = _id;
  this.name = name;
  this.avatar = avatar;
}

function Group(_id, name, avatar) {
  this._id = _id;
  this.name = name;
  this.avatar = avatar;
}

function IMService(goEasy, GoEasy) {
  //当前用户
  this.currentUser = null;
  //我的群
  this.groups = {};

  // GoEasy 模块
  this.GoEasy = GoEasy;

  //goEasy 实例对象
  this.goEasy = goEasy;

  //私聊消息记录，map格式，每个好友对应一个数组
  this.privateMessages = {};

  //群聊消息记录，map格式，每个群对应一个数组
  this.groupMessages = {};

  /*
                            * 监听器们
                            *
                            * 可以在页面里，根据需求，重写以下监听器，
                            * 便于当各种事件触发时，页面能够执行对应的响应
                            *
                            */
  //收到一条私聊消息
  this.onNewPrivateMessageReceive = function (friendId, message) {};
  //收到一条群聊消息
  this.onNewGroupMessageReceive = function (groupId, message) {};

}

//获取群成员
IMService.prototype.getGroupMembers = function (groupId) {
  var members = _restapi.default.findGroupMembers(groupId);
  var membersMap = {};
  members.map(function (item) {
    membersMap[item._id] = item;
  });
  return membersMap;
};

IMService.prototype.findGroupById = function (groupId) {
  var group = _restapi.default.findGroupById(groupId);
  return new Group(group._id, group.name, group.avatar);
};

IMService.prototype.findFriendById = function (userId) {
  var user = _restapi.default.findUserById(userId);
  return new Friend(user._id, user.name, user.avatar);
};

IMService.prototype.getGroupMessages = function (groupId) {
  if (!this.groupMessages[groupId]) {
    this.groupMessages[groupId] = [];
  }
  return this.groupMessages[groupId];
};

IMService.prototype.getPrivateMessages = function (friendId) {
  if (!this.privateMessages[friendId]) {
    this.privateMessages[friendId] = [];
  }
  return this.privateMessages[friendId];
};

//连接GoEasy
IMService.prototype.connect = function (currentUser) {
  console.log("currentUser==", currentUser);
  this.currentUser = currentUser;
  var userData = {
    name: this.currentUser.name,
    avatar: this.currentUser.avatar };

  //初始化相关的监听器
  this.initialListeners();
  this.goEasy.connect({
    id: this.currentUser.memberSn,
    data: userData,
    onSuccess: function onSuccess() {
      //连接成功
      console.log("GoEasy connect successfully.id===", currentUser.memberSn);
    },
    onFailed: function onFailed(error) {
      //连接失败
      console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
    },
    onProgress: function onProgress(attempts) {//连接或自动重连中
      console.log("GoEasy is connecting", attempts);
    } });

  this.subscribeGroupMessage(currentUser);
};

//断开GoEasy
IMService.prototype.disconnect = function () {
  this.goEasy.disconnect({
    onSuccess: function onSuccess() {
      console.log('GoEasy disconnect successfully.');
    },
    onFailed: function onFailed(error) {
      console.log('Failed to disconnect GoEasy, code:' + error.code + ',error:' + error.content);
    } });

};

IMService.prototype.subscribeGroupMessage = function () {
  var groups = _restapi.default.findGroups(this.currentUser);
  var groupIds = groups.map(function (item) {return item._id;});
  this.goEasy.im.subscribeGroup({
    groupIds: groupIds,
    onSuccess: function onSuccess() {
      //订阅成功
      console.log('订阅群消息成功');
    },
    onFailed: function onFailed(error) {
      //订阅失败
      console.log('订阅群消息失败');
    } });

};

//初始化监听器
IMService.prototype.initialListeners = function () {var _this = this;
  //监听私聊消息
  this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, function (message) {
    //更新私聊消息记录
    var friendId;
    if (_this.currentUser._id === message.senderId) {
      friendId = message.receiverId;
    } else {
      friendId = message.senderId;
    }
    var friendMessages = _this.getPrivateMessages(friendId);
    friendMessages.push(message);
    //如果页面传入了相应的listener，执行listener
    _this.onNewPrivateMessageReceive(friendId, message);
  });

  //监听群聊消息
  this.goEasy.im.on(this.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, function (message) {
    var groupId = message.groupId;
    //更新群聊消息记录
    var groupMessages = _this.getGroupMessages(groupId);
    groupMessages.push(message);
    //如果页面传入了相应的listener，执行listener
    _this.onNewGroupMessageReceive(groupId, message);
  });
};var _default =

IMService;exports.default = _default;

/***/ }),

/***/ 1008:
/*!******************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/lsj-upload/components/lsj-upload/LsjFile.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.LsjFile = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var LsjFile = /*#__PURE__*/function () {
  function LsjFile(data) {_classCallCheck(this, LsjFile);
    this.isInit = false;
    this.dom = null;
    // files.type = waiting（等待上传）|| loading（上传中）|| success（成功） || fail（失败）
    this.files = new Map();
    this.debug = data.debug || false;
    this.id = data.id;
    this.width = data.width;
    this.height = data.height;
    this.option = data.option;
    this.instantly = data.instantly;
    this.prohibited = data.prohibited;
    this.onchange = data.onchange;
    this.onprogress = data.onprogress;
    this.uploadHandle = this._uploadHandle;

    this.uploadHandle = this._uploadHandleWX;

  }


  /**
     * 创建File节点
     * @param {string}path webview地址
     */_createClass(LsjFile, [{ key: "create", value: function create(
    path) {
      if (!this.dom) {



































        return this.dom;
      }
    }

    /**
       * 设置上传参数
       * @param {object}option 上传参数
       */ }, { key: "setData", value: function setData()
    {var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(this.option, option);











    }

    /**
       * 上传
       * @param {string}name 文件名称
       */ }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var name,_iterator,_step,item,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                name = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';if (
                this.option.url) {_context.next = 3;break;}throw (
                  Error('未设置上传地址'));case 3:if (!(



                name && this.files.has(name))) {_context.next = 8;break;}_context.next = 6;return (
                  this.uploadHandle(this.files.get(name)));case 6:_context.next = 26;break;case 8:_iterator = _createForOfIteratorHelper(


                this.files.values());_context.prev = 9;_iterator.s();case 11:if ((_step = _iterator.n()).done) {_context.next = 18;break;}item = _step.value;if (!(
                item.type === 'waiting' || item.type === 'fail')) {_context.next = 16;break;}_context.next = 16;return (
                  this.uploadHandle(item));case 16:_context.next = 11;break;case 18:_context.next = 23;break;case 20:_context.prev = 20;_context.t0 = _context["catch"](9);_iterator.e(_context.t0);case 23:_context.prev = 23;_iterator.f();return _context.finish(23);case 26:case "end":return _context.stop();}}}, _callee, this, [[9, 20, 23, 26]]);}));function upload() {return _upload.apply(this, arguments);}return upload;}()










    // 选择文件change
  }, { key: "addFile", value: function addFile(event) {





      var file = event;


      var name = file.name;
      this.debug && console.log('文件名称', name, '大小', file.size);

      if (file) {
        // 限制文件格式
        var suffix = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
        var formats = this.prohibited.formats.toLowerCase();
        if (formats.includes(suffix)) {
          this.toast("\u4E0D\u652F\u6301\u4E0A\u4F20".concat(suffix.toUpperCase(), "\u683C\u5F0F\u6587\u4EF6"));
          return false;
        }
        // 限制文件大小
        if (file.size > 1024 * 1024 * Math.abs(this.prohibited.size)) {
          this.toast("\u9644\u4EF6\u5927\u5C0F\u8BF7\u52FF\u8D85\u8FC7".concat(this.prohibited.size, "M"));
          return false;
        }
        this.files.set(file.name, { file: file, name: file.name, size: file.size, progress: 0, type: 'waiting' });







        return true;

      }
    }

    /**
       * 移除文件
       * @param {string}name 不传name默认移除所有文件，传入name移除指定name的文件
       */ }, { key: "clear", value: function clear()
    {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';




      if (!name) {
        this.files.clear();
      } else
      {
        this.files.delete(name);
      }
      return this.onchange(this.files);
    }

    /**
       * 提示框
       * @param {string}msg 轻提示内容
       */ }, { key: "toast", value: function toast(
    msg) {
      uni.showToast({
        title: msg,
        icon: 'none' });

    }

    /**
       * 微信小程序选择文件
       * @param {number}count 可选择文件数量
       */ }, { key: "chooseMessageFile", value: function chooseMessageFile(
    count) {var _this2 = this;

      wx.chooseMessageFile({
        count: count,
        type: 'file',
        success: function success(_ref) {var tempFiles = _ref.tempFiles;var _iterator2 = _createForOfIteratorHelper(
          tempFiles),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var file = _step2.value;
              var next = _this2.addFile(file);
              if (!next) {return;}
            }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
          _this2.onchange(_this2.files);
          _this2.instantly && _this2.upload();
        },
        fail: function fail(res) {
          console.error(res);
          _this2.toast("\u6253\u5F00\u5931\u8D25");
        } });


    } }, { key: "_overrideUrlLoading", value: function _overrideUrlLoading()

    {var _this3 = this;
      this.dom.overrideUrlLoading({ mode: 'reject' }, function (e) {var _this3$_getRequest =
        _this3._getRequest(
        e.url),retype = _this3$_getRequest.retype,item = _this3$_getRequest.item,files = _this3$_getRequest.files;

        var _this = _this3;
        switch (retype) {
          case 'change':
            try {
              _this.files = new Map(JSON.parse(unescape(files)));
            } catch (e) {
              return console.error('出错了，请检查代码');
            }
            _this.onchange(_this3.files);
            break;
          case 'progress':
            try {
              item = JSON.parse(unescape(item));
            } catch (e) {
              return console.error('出错了，请检查代码');
            }
            _this._changeFilesItem(item);
            break;
          default:
            break;}

      });
    } }, { key: "_getRequest", value: function _getRequest(

    url) {
      var theRequest = new Object();
      var index = url.indexOf('?');
      if (index != -1) {
        var str = url.substring(index + 1);
        var strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        }
      }
      return theRequest;
    } }, { key: "_changeFilesItem", value: function _changeFilesItem(

    item) {
      this.onprogress(item);
      this.files.set(item.name, item);
      this.debug && console.log('onprogress', JSON.stringify(item));
    } }, { key: "_uploadHandle", value: function _uploadHandle(

    item) {var _this4 = this;
      item.type = 'loading';
      delete item.responseText;
      return new Promise(function (resolve, reject) {
        _this4.debug && console.log('option', JSON.stringify(_this4.option));var _this4$option =
        _this4.option,url = _this4$option.url,name = _this4$option.name,_this4$option$method = _this4$option.method,method = _this4$option$method === void 0 ? 'POST' : _this4$option$method,header = _this4$option.header,formData = _this4$option.formData;
        var form = new FormData();
        for (var keys in formData) {
          form.append(keys, formData[keys]);
        }
        form.append(name, item.file);
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open(method, url, true);
        for (var _keys in header) {
          xmlRequest.setRequestHeader(_keys, header[_keys]);
        }

        xmlRequest.upload.addEventListener(
        'progress',
        function (event) {
          if (event.lengthComputable) {
            var progress = Math.ceil(event.loaded * 100 / event.total);
            if (progress <= 100) {
              item.progress = progress;
              _this4._changeFilesItem(item);
            }
          }
        },
        false);


        xmlRequest.ontimeout = function () {
          console.error('请求超时');
          item.type = 'fail';
          _this4._changeFilesItem(item);
          return resolve(false);
        };

        xmlRequest.onreadystatechange = function (ev) {
          if (xmlRequest.readyState == 4) {
            if (xmlRequest.status == 200) {
              _this4.debug && console.log('上传完成：' + xmlRequest.responseText);
              item['responseText'] = xmlRequest.responseText;
              item.type = 'success';
              _this4._changeFilesItem(item);
              return resolve(true);
            } else if (xmlRequest.status == 0) {
              console.error('status = 0 :请检查请求头Content-Type与服务端是否匹配，服务端已正确开启跨域，并且nginx未拦截阻止请求');
            }
            console.error('--ERROR--：status = ' + xmlRequest.status);
            item.type = 'fail';
            _this4._changeFilesItem(item);
            return resolve(false);
          }
        };
        xmlRequest.send(form);
      });
    } }, { key: "_uploadHandleWX", value: function _uploadHandleWX(

    item) {var _this5 = this;
      item.type = 'loading';
      delete item.responseText;
      return new Promise(function (resolve, reject) {
        _this5.debug && console.log('option', JSON.stringify(_this5.option));
        var form = _objectSpread({ filePath: item.file.path }, _this5.option);
        form['fail'] = function (_ref2) {var _ref2$errMsg = _ref2.errMsg,errMsg = _ref2$errMsg === void 0 ? '' : _ref2$errMsg;
          console.error('--ERROR--：' + errMsg);
          item.type = 'fail';
          _this5._changeFilesItem(item);
          return resolve(false);
        };
        form['success'] = function (res) {
          if (res.statusCode == 200) {
            _this5.debug && console.log('上传完成,微信端返回不一定是字符串，根据接口返回格式判断是否需要JSON.parse：' + res.data);
            item['responseText'] = res.data;
            item.type = 'success';
            _this5._changeFilesItem(item);
            return resolve(true);
          }
          item.type = 'fail';
          _this5._changeFilesItem(item);
          return resolve(false);
        };

        var xmlRequest = uni.uploadFile(form);
        xmlRequest.onProgressUpdate(function (_ref3) {var _ref3$progress = _ref3.progress,progress = _ref3$progress === void 0 ? 0 : _ref3$progress;
          if (progress <= 100) {
            item.progress = progress;
            _this5._changeFilesItem(item);
          }
        });
      });
    } }]);return LsjFile;}();exports.LsjFile = LsjFile;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 102:
/*!******************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/lib/EmojiDecoder.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @Author: jack.lu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @Date: 2020/9/11
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @Last Modified by: jack.lu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @Last Modified time: 2020/9/11 4:35 下午
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */var

EmojiDecoder = /*#__PURE__*/function () {





  function EmojiDecoder(url, emojiMap) {_classCallCheck(this, EmojiDecoder);_defineProperty(this, "emojiMap", null);_defineProperty(this, "url", "");_defineProperty(this, "patterns", []);_defineProperty(this, "metaChars", /[[\]{}()*+?.\\|^$\-,&#\s]/g);
    this.url = url || '';
    this.emojiMap = emojiMap || {};
    for (var i in this.emojiMap) {
      if (this.emojiMap.hasOwnProperty(i)) {
        this.patterns.push('(' + i.replace(this.metaChars, "\\$&") + ')');
      }
    }
  }_createClass(EmojiDecoder, [{ key: "decode", value: function decode(

    text) {var _this = this;
      return text.replace(new RegExp(this.patterns.join('|'), 'g'), function (match) {
        return typeof _this.emojiMap[match] != 'undefined' ? '<img height="20rpx" width="20rpx" src="' + _this.url + _this.emojiMap[match] + '" />' : match;
      });
    } }]);return EmojiDecoder;}();var _default =


EmojiDecoder;exports.default = _default;

/***/ }),

/***/ 103:
/*!*************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/date.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatDate = formatDate;exports.str2Date = str2Date;exports.calYear = calYear;exports.calCurrentYear = calCurrentYear;exports.calDay = calDay; // date.js
function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds() };

  for (var k in o) {
    if (new RegExp("(".concat(k, ")")).test(fmt)) {
      var str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

function str2Date(dateStr, separator) {
  if (!separator) {
    separator = "-";
  }
  var dateArr = dateStr.split(separator);
  var year = parseInt(dateArr[0]);
  var month;
  //处理月份为04这样的情况
  if (dateArr[1].indexOf("0") == 0) {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  var day = parseInt(dateArr[2]);
  var date = new Date(year, month - 1, day);
  return date;
}


/**
   * 计算两个日期相隔年限，用于计算年龄等
   * @param {Object} date1
   * @param {Object} date2
   */
function calYear(date1, date2) {
  var a = new Date(date1).getFullYear();
  var b = new Date(date2).getFullYear();
  console.log(b - a);
  return b - a;
}

/**
   * 计算两个日期相隔年限，用于计算年龄等
   * @param {Object} date1
   * @param {Object} date2
   */
function calCurrentYear(date) {
  var a = new Date(date).getFullYear();
  var b = new Date().getFullYear();
  console.log(b - a);
  return b - a;
}


/**
   * 计算两个日期相隔日期，用于计算天数等,开始跟结尾只包含了一天
   * @param {Object} date1
   * @param {Object} date2
   */
function calDay(date1, date2) {
  var a = new Date(date1).getTime();
  var b = new Date(date2).getTime();
  var diff = b - a;
  var diffDay = diff / (1000 * 60 * 60 * 24);
  return parseInt(diffDay);
}

/***/ }),

/***/ 11:
/*!*************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/lib/restapi.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //用户数据示例
var users = [
{
  "uuid": "08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a",
  "name": "Mattie",
  "password": "123",
  "avatar": '/static/images/Avatar-1.png' },

{
  "uuid": "3bb179af-bcc5-4fe0-9dac-c05688484649",
  "name": "Wallace",
  "password": "123",
  "avatar": '/static/images/Avatar-2.png' },

{
  "uuid": "fdee46b0-4b01-4590-bdba-6586d7617f95",
  "name": "Tracy",
  "password": "123",
  "avatar": '/static/images/Avatar-3.png' },

{
  "uuid": "33c3693b-dbb0-4bc9-99c6-fa77b9eb763f",
  "name": "Juanita",
  "password": "123",
  "avatar": '/static/images/Avatar-4.png' }];



//群数据示例
var groups = [
{
  "uuid": "group-a42b-47b2-bb1e-15e0f5f9a19a",
  "name": "小程序交流群",
  "avatar": '/static/images/wx.png',
  "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649', 'fdee46b0-4b01-4590-bdba-6586d7617f95', '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f'] },

{
  "uuid": "group-4b01-4590-bdba-6586d7617f95",
  "name": "UniApp交流群",
  "avatar": '/static/images/uniapp.png',
  "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', 'fdee46b0-4b01-4590-bdba-6586d7617f95', '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f'] },

{
  "uuid": "group-dbb0-4bc9-99c6-fa77b9eb763f",
  "name": "GoEasy交流群",
  "avatar": '/static/images/goeasy.jpeg',
  "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649'] }];




function RestApi() {

}

RestApi.prototype.findFriends = function (user) {
  var friendList = users.filter(function (v) {return v.uuid != user.uuid;});
  return friendList;
};

RestApi.prototype.findGroups = function (user) {
  var groupList = groups.filter(function (v) {return v.userList.find(function (id) {return id == user.uuid;});});
  return groupList;
};

RestApi.prototype.findUser = function (username, password) {
  var user = users.find(function (user) {return user.name === username && user.password === password;});
  if (user) {
    return {
      uuid: user.uuid,
      avatar: user.avatar,
      name: user.name };

  }
  return user;
};

RestApi.prototype.findGroupById = function (groupId) {
  var group = groups.find(function (group) {return group.uuid == groupId;});
  return group;
};


RestApi.prototype.findUserById = function (userId) {
  var user = users.find(function (user) {return user.uuid == userId;});
  return user;
};



RestApi.prototype.findGroupMembers = function (groupId) {
  var members = [];
  var group = groups.find(function (v) {return v.uuid == groupId;});
  users.map(function (user) {
    if (group.userList.find(function (v) {return v == user.uuid;})) {
      members.push(user);
    }
  });
  return members;
};var _default =

new RestApi();exports.default = _default;

/***/ }),

/***/ 1107:
/*!**************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \**************************************************************************************************************************/
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

/***/ 1127:
/*!**********************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
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

/***/ 15:
/*!*************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/store/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 9));
var _indexConfig = _interopRequireDefault(__webpack_require__(/*! @/config/index.config.js */ 16));
var _routesConfig = _interopRequireDefault(__webpack_require__(/*! @/config/routes.config.js */ 17));
var _router = _interopRequireDefault(__webpack_require__(/*! @/common/router.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

// uni.setStorageSync("token", "oVG1b1Bgrb");
// uni.setStorageSync("openId", "oVG1b1Bgrb-l6jNYCUr6sYpQ5F-U");

var TOKEN = uni.getStorageSync("token") || "";
var OPENID = uni.getStorageSync("openId") || "";
var USER_INFO = uni.getStorageSync("userInfo") || {};
var CUSTOMER_INFO = uni.getStorageSync("customerInfo") || {};

var store = new _vuex.default.Store({
  state: {
    // 是否強制登录
    forcedLogin: _indexConfig.default.forcedLogin,
    // 前端token
    token: TOKEN,
    // 用户openid
    openId: OPENID,
    // 用户信息 头像 昵称
    userInfo: USER_INFO,
    // 用户的商户信息
    customerInfo: CUSTOMER_INFO },

  getters: {
    // 用户是否登录
    hasLogin: function hasLogin(state) {
      if (state.token) {
        return true;
      } else {
        return false;
      }
    } },

  mutations: {
    SET_TOKEN: function SET_TOKEN(state, token) {
      state.token = token;
      uni.setStorageSync("token", token);
    },
    SET_OPENID: function SET_OPENID(state, openId) {
      state.openId = openId;
      uni.setStorageSync("openId", openId);
    },
    SET_USERINFO: function SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      uni.setStorageSync("userInfo", userInfo);
    },
    SET_CUSTOMERINFO: function SET_CUSTOMERINFO(state, customerInfo) {
      state.customerInfo = customerInfo;
      uni.setStorageSync("customerInfo", customerInfo);
    },
    SET_LOGOUT: function SET_LOGOUT(state) {
      state.token = "";
      uni.setStorageSync("token", "");
    } },

  actions: {
    // 登录过期 重新登录
    reLogin: function reLogin(_ref,

    info) {var commit = _ref.commit;
      commit("SET_TOKEN", "");
      _router.default.redirectTo({
        route: _routesConfig.default.login });

    } } });var _default =



store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!*********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/config/index.config.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var CONFIG = {
  //开发环境配置
  development: {
    loginTitleTxt: "欢迎使用人才直聘", // 登录页标题
    copyrightTxt: "人才直聘v1.0", // 版本信息
    assetsPath: "/static/img", // 静态资源路径
    // baseUrl: "http://localhost:8099/api,//小程序请选用该地址调试"
    baseUrl: "/api", //H5请选用该地址调试
    tokenKey: "WECHAT_TRADE", // 登录标识
    testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
    forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
    touristMode: true // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
  },

  //生产环境配置
  production: {
    loginTitleTxt: "人才直聘", // 登录页标题
    copyrightTxt: "人才直聘v1.0", // 版本信息
    assetsPath: "/static/img", // 静态资源路径
    // baseUrl: "http://192.168.0.106:8092/api",
    baseUrl: "https://job.qinkonglan.cn/api",
    tokenKey: "WECHAT_TRADE", // 登录标识
    testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
    forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
    touristMode: true // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
  } };var _default =


CONFIG["development"];exports.default = _default;

/***/ }),

/***/ 17:
/*!**********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/config/routes.config.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 
                                                                                                      * 路由表对象：
                                                                                                      * 该文件挂载在Vue原型中 $mRoutesConfig
                                                                                                      * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
                                                                                                      * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
                                                                                                      * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
                                                                                                      * 
                                                                                                      * 配置参数项说明： 
                                                                                                      * name:可选配置 （路由名称）
                                                                                                      * path:必填配置 （路由地址）
                                                                                                      * requiresAuth:可选配置 （是否权限路由）
                                                                                                      */var _default =

{
  index: {
    name: "首页",
    path: "/pages/index/index" },


  search: {
    name: "搜索",
    path: "/pages/index/search" },


  type: {
    name: "分类",
    path: "/pages/type/type" },


  industry: {
    name: "行业选择",
    path: "/pages/common/industry" },


  post: {
    name: "职位选择",
    path: "/pages/common/post" },


  positionList: {
    name: "岗位列表",
    path: "/pages/position/list" },


  shareList: {
    name: "共享用工",
    path: "/pages/position/shareList" },


  taskList: {
    name: "外包任务",
    path: "/pages/position/taskList" },


  taskDetail: {
    name: "外包任务详情",
    path: "/pages/position/taskDetail" },


  taskApply: {
    name: "立即报名",
    path: "/pages/position/taskApply" },


  positionDetail: {
    name: "职位详情",
    path: "/pages/position/detail" },


  positionSearch: {
    name: "职位搜索",
    path: "/pages/position/search" },


  companyList: {
    name: "公司列表",
    path: "/pages/company/list" },


  resumeList: {
    name: "简历列表",
    path: "/pages/company/resumeList" },


  companyDetail: {
    name: "公司详情",
    path: "/pages/company/detail" },


  //个人简历相关
  personReume: {
    name: "个人简历",
    path: "/pages/user/person/resume",
    requiresAuth: true },


  resumeFile: {
    name: "附件简历",
    path: "/pages/user/person/resume-file",
    requiresAuth: true },


  resumeDetail: {
    name: "个人简历",
    path: "/pages/user/person/resumeDetail",
    requiresAuth: true },

  resumePreview: {
    name: "简历预览",
    path: "/pages/user/person/resume-preview",
    requiresAuth: true },

  editSkill: {
    name: "个人优势",
    path: "/pages/user/person/edit-skill",
    requiresAuth: true },

  editExpect: {
    name: "求职期望",
    path: "/pages/user/person/edit-expect",
    requiresAuth: true },

  editWork: {
    name: "工作经历",
    path: "/pages/user/person/edit-work",
    requiresAuth: true },

  editWorkContent: {
    name: "工作内容",
    path: "/pages/user/person/edit-work-content",
    requiresAuth: true },

  editPro: {
    name: "项目经历",
    path: "/pages/user/person/edit-pro",
    requiresAuth: true },

  editProContent: {
    name: "添加项目内容",
    path: "/pages/user/person/edit-pro-content" },

  editEdu: {
    name: "教育经历",
    path: "/pages/user/person/edit-edu" },

  editCert: {
    name: "资格证书",
    path: "/pages/user/person/edit-cert" },


  enter: {
    name: "公司入驻",
    path: "/pages/user/company/enter",
    requiresAuth: true },

  companyAuth: {
    name: "公司认证",
    path: "/pages/user/company/auth",
    requiresAuth: true },

  company: {
    name: "公司信息",
    path: "/pages/user/company/company" },

  positions: {
    name: "职位管理",
    path: "/pages/user/company/positions" },

  positionEdit: {
    name: "职位编辑",
    path: "/pages/user/company/position-edit" },

  positionPreview: {
    name: "职位预览",
    path: "/pages/user/company/position-preview" },


  tasks: {
    name: "外包任务管理",
    path: "/pages/user/company/tasks" },

  taskPreview: {
    name: "外包任务预览",
    path: "/pages/user/company/task-preview" },

  taskEdit: {
    name: "外包任务编辑",
    path: "/pages/user/company/task-edit" },


  courseList: {
    name: "课程列表",
    path: "/pages/course/list" },


  courseDetail: {
    name: "课程详情",
    path: "/pages/course/detail" },


  login: {
    name: "登录",
    path: "/pages/login/login" },

  loginPwd: {
    name: "密码登录",
    path: "/pages/login/loginPwd" },


  forgetPwd: {
    name: "忘记密码",
    path: "/pages/login/forgetPwd" },

  resetPwd: {
    name: "重置密码",
    path: "/pages/login/resetPwd",
    requiresAuth: true },

  reg: {
    name: "注册",
    path: "/pages/login/reg" },


  wallet: {
    name: "我的钱包",
    path: "/pages/user/finance/wallet",
    requiresAuth: true },

  rule: {
    name: "提现规则",
    path: "/pages/user/finance/rule",
    requiresAuth: true },

  withdraw: {
    name: "提现",
    path: "/pages/user/finance/withdraw",
    requiresAuth: true },

  withdrawLog: {
    name: "提现记录",
    path: "/pages/user/finance/withdrawLog",
    requiresAuth: true },

  records: {
    name: "交易明细",
    path: "/pages/user/finance/records",
    requiresAuth: true },



  // 权限路由
  user: {
    name: "个人中心",
    path: "/pages/user/user",
    requiresAuth: true },


  userInfo: {
    name: "基本信息",
    path: "/pages/user/userInfo",
    requiresAuth: true },

  uUserInfo: {
    name: "修改基本信息",
    path: "/pages/user/uUserInfo",
    requiresAuth: true },


  system: {
    name: "系统设置",
    path: "/pages/user/common/system" },


  aboutUs: {
    name: "关于我们",
    path: "/pages/user/common/aboutUs" },


  contactUs: {
    name: "联系我们",
    path: "/pages/user/common/contactUs" },


  collect: {
    name: "我的收藏",
    path: "/pages/user/common/collect",
    requiresAuth: true },


  connected: {
    name: "已沟通过",
    path: "/pages/user/common/connected",
    requiresAuth: true },


  browse: {
    name: "浏览记录",
    path: "/pages/user/common/browse",
    requiresAuth: true },


  apply: {
    name: "我的投递",
    path: "/pages/user/common/apply",
    requiresAuth: true },

  course: {
    name: "我的课程",
    path: "/pages/user/common/course",
    requiresAuth: true },

  share: {
    name: "我的分享",
    path: "/pages/user/common/share",
    requiresAuth: true },

  task: {
    name: "我的任务",
    path: "/pages/user/common/task",
    requiresAuth: true },

  visitme: {
    name: "谁看过我",
    path: "/pages/user/common/visitme",
    requiresAuth: true },

  terms: {
    name: "用户协议",
    path: "/pages/user/common/terms" },

  privacy: {
    name: "隐私政策",
    path: "/pages/user/common/privacy" },

  hideSetting: {
    name: "隐藏设置",
    path: "/pages/user/common/hideSetting" },

  robot: {
    name: "自动客服",
    path: "/pages/user/service/robot" },


  addShield: {
    name: "添加屏蔽公司",
    path: "/pages/user/common/addShield" },

  officePreview: {
    name: "文件预览",
    path: "/pages/user/common/office-preview" },

  notices: {
    name: "系统消息",
    path: "/pages/chat/notice/notices",
    requiresAuth: true },

  noticeDetail: {
    name: "消息详情",
    path: "/pages/chat/notice/noticeDetail",
    requiresAuth: true },

  privateChat: {
    name: "聊天",
    path: "/pages/chat/privateChat",
    requiresAuth: true },


  lawList: {
    name: "技能知识",
    path: "/pages/law/law",
    requiresAuth: false },


  lawDetail: {
    name: "详情",
    path: "/pages/law/lawDetail",
    requiresAuth: false } };exports.default = _default;

/***/ }),

/***/ 18:
/*!***************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/router.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 中心思想：需要路由鉴权,由于uni-app没有vue中的全局钩子函数，所以封装了Router对象。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 说明：应用中的路由跳转尽量使用该Router的方法，并配合config中的路由表对象进行跳转。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */var
Router = /*#__PURE__*/function () {
  function Router(arg) {_classCallCheck(this, Router);

    this.callBack = function () {};
  }_createClass(Router, [{ key: "beforeEach", value: function beforeEach(

    callBack) {
      if (callBack instanceof Function) this.callBack = callBack;
    } }, { key: "push", value: function push(

    to) {
      this.callBack("navigateTo", to);
    } }, { key: "redirectTo", value: function redirectTo(

    to) {
      this.callBack("redirectTo", to);
    } }, { key: "reLaunch", value: function reLaunch(

    to) {
      this.callBack("reLaunch", to);
    } }, { key: "switchTab", value: function switchTab(

    to) {
      this.callBack("switchTab", to);
    } }, { key: "back", value: function back(

    delta) {
      uni.navigateBack({
        delta: delta });

    } }]);return Router;}();var _default =


new Router();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!***********************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/db.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.get = get;exports.set = set;
//取值
function get(key) {var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  try {
    if (sync) {
      return uni.getStorageSync(key);
    } else {
      var data = '';
      uni.getStorage({
        key: key,
        success: function success(res) {
          data = res.data;
        } });

      return data;
    }
  } catch (e) {
    return false;
  }
}

//赋值
function set(key, value) {var sync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  try {
    if (sync) {
      return uni.setStorageSync(key, value);
    } else {
      uni.setStorage({
        key: key,
        data: value });

    }
  } catch (e) {

  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

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

/***/ 20:
/*!********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/AppEntryController.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}

/* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * APP入口页面控制器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 中心思想：动态入口解决方案 描述见：http://ask.dcloud.net.cn/question/63270
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */var

AppEntryController = /*#__PURE__*/function (_Vue) {_inherits(AppEntryController, _Vue);var _super = _createSuper(AppEntryController);
  function AppEntryController(arg) {_classCallCheck(this, AppEntryController);return _super.call(this);

  }

  // 在应用的首页调用main方法 控制路由入口
  _createClass(AppEntryController, [{ key: "main", value: function () {var _main = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(query) {var _this = this;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt("return",
                new Promise(function (resolve, reject) {

                  // H5环境保存openId














                  // 读取配置文件 判断APP是否开启了游客模式 如果开启了无需判断是否登录逻辑
                  if (_this.$mConfig.touristMode && typeof _this.$mConfig.touristMode === "boolean") {




                    resolve("可以加载首页数据");
                    return;
                  }


                  // 若APP没有开启游客模式 则检测是否登录? 去登录...
                  if (!_this.$store.getters.hasLogin) {
                    _this.$mRouter.redirectTo({
                      route: _this.$mRoutesConfig.login,
                      query: query });







                    reject("APP当前不是游客模式,请先登录后进入");
                  }
                }));case 1:case "end":return _context.stop();}}}, _callee);}));function main(_x) {return _main.apply(this, arguments);}return main;}()


    // 小程序端获取openId
  }, { key: "getWeChatOpenId", value: function getWeChatOpenId() {








      // 登录微信小程序 获取openID
      this.$store.commit("SET_OPENID", this.$mConfig.testOpenId);


    }

    // 处理H5端 直接通过地址栏访问地址的情况 需要鉴权
  }, { key: "handleH5BrowserAddressBarAuth", value: function handleH5BrowserAddressBarAuth() {





















    }

    /*
       * 用途：商户状态拦截器
       * 说明：当store中的商户状态为 审核中 || 审核失败 的情况 拦截器会向服务器发送请求查询最新的商户状态。
       * 场景：点击某一个功能按钮时需要校验商户状态，只有审核成功的商户方可进入，否则跳转到状态提示页面。
       */ }, { key: "customerStatusInterceptor", value: function () {var _customerStatusInterceptor = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var _this2 = this;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:return _context3.abrupt("return",

                new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve, reject) {var $storeCustomerStatus, serverCustomerStatus;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:

                            // store中的状态
                            $storeCustomerStatus = _this2.$store.state.customerInfo.status;if (!(
                            $storeCustomerStatus == "SUCCESS")) {_context2.next = 4;break;}
                            // 商户状态：审核通过
                            resolve($storeCustomerStatus);return _context2.abrupt("return");case 4:_context2.prev = 4;_context2.next = 7;return (





                              _this2.$apis.getCustomerStatus());case 7:serverCustomerStatus = _context2.sent;
                            resolve(serverCustomerStatus);_context2.next = 14;break;case 11:_context2.prev = 11;_context2.t0 = _context2["catch"](4);

                            reject(_context2.t0);case 14:case "end":return _context2.stop();}}}, _callee2, null, [[4, 11]]);}));return function (_x2, _x3) {return _ref.apply(this, arguments);};}()));case 1:case "end":return _context3.stop();}}}, _callee3);}));function customerStatusInterceptor() {return _customerStatusInterceptor.apply(this, arguments);}return customerStatusInterceptor;}()




    /* 
                                                                                                                                                                                                                                                                                                                                                                                                          * 登录状态下 全局路由获取商户信息
                                                                                                                                                                                                                                                                                                                                                                                                          * 说明：APP打开后向服务器拉取最新商户信息，以及商户审核状态,保存在本地store中使用。
                                                                                                                                                                                                                                                                                                                                                                                                          * 场景：H5端 每个页面打开后执行 APP或小程序打开后执行
                                                                                                                                                                                                                                                                                                                                                                                                          */

    /* async getCustomerInfo() {
                                                                                                                                                                                                                                                                                                                                                                                                             	if (!this.$store.getters.hasLogin) return;
                                                                                                                                                                                                                                                                                                                                                                                                             	let customerInfo = await this.$apis.getCustomer();
                                                                                                                                                                                                                                                                                                                                                                                                             	this.$store.commit("SET_CUSTOMERINFO", customerInfo);
                                                                                                                                                                                                                                                                                                                                                                                                             } */ }]);return AppEntryController;}(_vue.default);var _default =


new AppEntryController();exports.default = _default;

/***/ }),

/***/ 21:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 22);

/***/ }),

/***/ 22:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 23);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 23:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 24:
/*!************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/apis/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.deleteShieldById = exports.updateShield = exports.getShieldList = exports.getLawDetail = exports.getLawList = exports.withdrawApply = exports.getAccountDetail = exports.getWithdrawList = exports.getFinanceList = exports.deleteShareById = exports.updateShare = exports.getShareDetail = exports.getShareList = exports.deleteCommById = exports.updateComm = exports.getCommDetail = exports.getCommList = exports.deleteBrowseById = exports.updateBrowse = exports.getBrowseDetail = exports.getVisitList = exports.getBrowseList = exports.updateApplyRead = exports.deleteApplyById = exports.updateApplyStatus = exports.updateApply = exports.getApplyDetail = exports.getApplyList = exports.deleteCollectById = exports.updateCollect = exports.getCollectDetail = exports.getCollectList = exports.getApplyTaskList = exports.applyTask = exports.deleteTaskById = exports.updateTask = exports.getTaskDetail = exports.getMyTaskList = exports.getTaskList = exports.getApplyCourseList = exports.applyCourse = exports.getCourseDetail = exports.getCourseList = exports.getPositionList = exports.deletePositionById = exports.getCompanyPositionList = exports.getPositionDetail = exports.updateCompanyAuth = exports.updatePosition = exports.getCompanyDetail = exports.updateCompany = exports.getCompanyListForSelect = exports.getCompanyList = exports.deleteEduExpById = exports.updateEduExp = exports.getEduExpDetail = exports.getEduExpList = exports.deleteProExpById = exports.updateProExp = exports.getProExpDetail = exports.getProExpList = exports.deleteWorkExpById = exports.updateWorkExp = exports.getWorkExpDetail = exports.getWorkExpList = exports.deleteResumeFileById = exports.getResumeFileList = exports.exportResumeWord = exports.deleteJobExpectById = exports.updateJobExpect = exports.getJobExpectDetail = exports.getJobExpectList = exports.updateResumeBasic = exports.getResumeInfo = exports.getResume = exports.getResumeList = exports.getSchoolList = exports.getCityList = exports.getPostPageList = exports.getWelfareList = exports.getHotPostList = exports.getPostList = exports.getIndustryList = exports.getFeedbackAdd = exports.getNoticeDetail = exports.getNoticeList = exports.getHelpDetail = exports.getContactUs = exports.getAboutUs = exports.getBanners = exports.resetPwd = exports.switchRole = exports.getMemberBySn = exports.getUserInfo = exports.getVerifyCode = exports.memberLoginForCode = exports.memberLogin = exports.xcxUserLogin = exports.bindPhoneForWx = exports.getOpenId = void 0;exports.downloadImg = exports.upload = exports.getCardBin = exports.postRegCode = exports.getMsgCode = exports.postLogin = exports.uploadResumeFile = exports.uploadFile = exports.addRobotLog = exports.getRobotLogList = exports.getChatReply = exports.getChatAskList = void 0;var _http = _interopRequireDefault(__webpack_require__(/*! ./http.js */ 25));
var _indexConfig = _interopRequireDefault(__webpack_require__(/*! @/config/index.config.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 获取OpenId
var getOpenId = function getOpenId(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/getOpenId"), data);};
// 绑定手机号
exports.getOpenId = getOpenId;var bindPhoneForWx = function bindPhoneForWx(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/bindPhoneForWx"), data);};
// 小程序授权登录
exports.bindPhoneForWx = bindPhoneForWx;var xcxUserLogin = function xcxUserLogin(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/xcxUserLogin"), data);};
// 账号密码登录
exports.xcxUserLogin = xcxUserLogin;var memberLogin = function memberLogin(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/memberLogin"), data);};
// 手机号验证码登录
exports.memberLogin = memberLogin;var memberLoginForCode = function memberLoginForCode(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/memberLoginForCode"), data);};
// 获取验证码
exports.memberLoginForCode = memberLoginForCode;var getVerifyCode = function getVerifyCode(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/getVerifyCode"), data);};

// 获取用户资料
exports.getVerifyCode = getVerifyCode;var getUserInfo = function getUserInfo(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/getMember"), data);};
// 获取用户资料
exports.getUserInfo = getUserInfo;var getMemberBySn = function getMemberBySn(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/getMemberBySn"), data);};

// 用户角色切换
exports.getMemberBySn = getMemberBySn;var switchRole = function switchRole(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/ums/switchRole"), data);};
// 重新设置密码
exports.switchRole = switchRole;var resetPwd = function resetPwd(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/ums/resetPwd"), data);};


// 查询轮播图
exports.resetPwd = resetPwd;var getBanners = function getBanners(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/ad/list"), data);};
// 关于我们
exports.getBanners = getBanners;var getAboutUs = function getAboutUs(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/aboutUs/detail"), data);};
// 联系我们
exports.getAboutUs = getAboutUs;var getContactUs = function getContactUs(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/contactUs/detail"), data);};
// 平台说明内容
exports.getContactUs = getContactUs;var getHelpDetail = function getHelpDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/help/detail"), data);};
// 查询公告列表
exports.getHelpDetail = getHelpDetail;var getNoticeList = function getNoticeList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/notice/list"), data);};
// 查询公告详情
exports.getNoticeList = getNoticeList;var getNoticeDetail = function getNoticeDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/notice/detail"), data);};
// 添加意见反馈
exports.getNoticeDetail = getNoticeDetail;var getFeedbackAdd = function getFeedbackAdd(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/feedback/add"), data);};


// 查询行业列表
exports.getFeedbackAdd = getFeedbackAdd;var getIndustryList = function getIndustryList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/bms/getIndustryList"), data);};
// 查询职位列表
exports.getIndustryList = getIndustryList;var getPostList = function getPostList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/bms/getPostList"), data);};
// 查询热门职位列表
exports.getPostList = getPostList;var getHotPostList = function getHotPostList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/bms/getHotPostList"), data);};
// 查询福利列表
exports.getHotPostList = getHotPostList;var getWelfareList = function getWelfareList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/bms/getWelfareList"), data);};
// 查询职位列表
exports.getWelfareList = getWelfareList;var getPostPageList = function getPostPageList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/bms/getPostPageList"), data);};
// 查询城市列表
exports.getPostPageList = getPostPageList;var getCityList = function getCityList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/bms/getCityList"), data);};
// 查询学校列表
exports.getCityList = getCityList;var getSchoolList = function getSchoolList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/bms/getSchoolList"), data);};



// 查询简历信息
exports.getSchoolList = getSchoolList;var getResumeList = function getResumeList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getResumeList"), data);};
// 查询简历完整信息
exports.getResumeList = getResumeList;var getResume = function getResume(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getResume"), data);};
// 查询简历基本信息
exports.getResume = getResume;var getResumeInfo = function getResumeInfo(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getResumeInfo"), data);};
//更新简历基本信息
exports.getResumeInfo = getResumeInfo;var updateResumeBasic = function updateResumeBasic(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/wms/updateResumeBasic"), data);};

// 查询期望职位列表
exports.updateResumeBasic = updateResumeBasic;var getJobExpectList = function getJobExpectList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getJobExpectList"), data);};
// 查询期望职位详情
exports.getJobExpectList = getJobExpectList;var getJobExpectDetail = function getJobExpectDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getJobExpectDetail"), data);};
// 新增/更新期望职位
exports.getJobExpectDetail = getJobExpectDetail;var updateJobExpect = function updateJobExpect(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/wms/updateJobExpect"), data);};
// 删除期望职位
exports.updateJobExpect = updateJobExpect;var deleteJobExpectById = function deleteJobExpectById(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/deleteJobExpectById"), data);};
// 导出简历
exports.deleteJobExpectById = deleteJobExpectById;var exportResumeWord = function exportResumeWord(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/exportWord"), data);};
// 查询附件简历列表
exports.exportResumeWord = exportResumeWord;var getResumeFileList = function getResumeFileList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getResumeFileList"), data);};
// 删除附件简历
exports.getResumeFileList = getResumeFileList;var deleteResumeFileById = function deleteResumeFileById(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/deleteResumeFileById"), data);};


// 查询工作经历列表
exports.deleteResumeFileById = deleteResumeFileById;var getWorkExpList = function getWorkExpList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getWorkExpList"), data);};
// 查询工作经历详情
exports.getWorkExpList = getWorkExpList;var getWorkExpDetail = function getWorkExpDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getWorkExpDetail"), data);};
// 新增/更新工作经历
exports.getWorkExpDetail = getWorkExpDetail;var updateWorkExp = function updateWorkExp(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/wms/updateWorkExp"), data);};
// 删除工作经历
exports.updateWorkExp = updateWorkExp;var deleteWorkExpById = function deleteWorkExpById(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/deleteWorkExpById"), data);};

// 查询项目经历列表
exports.deleteWorkExpById = deleteWorkExpById;var getProExpList = function getProExpList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getProExpList"), data);};
// 查询项目经历详情
exports.getProExpList = getProExpList;var getProExpDetail = function getProExpDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getProExpDetail"), data);};
// 新增/更新项目经历
exports.getProExpDetail = getProExpDetail;var updateProExp = function updateProExp(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/wms/updateProExp"), data);};
// 删除项目经历
exports.updateProExp = updateProExp;var deleteProExpById = function deleteProExpById(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/deleteProExpById"), data);};

// 查询教育经历列表
exports.deleteProExpById = deleteProExpById;var getEduExpList = function getEduExpList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getEduExpList"), data);};
// 查询教育经历详情
exports.getEduExpList = getEduExpList;var getEduExpDetail = function getEduExpDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/getEduExpDetail"), data);};
// 新增/更新教育经历
exports.getEduExpDetail = getEduExpDetail;var updateEduExp = function updateEduExp(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/wms/updateEduExp"), data);};
// 删除教育经历
exports.updateEduExp = updateEduExp;var deleteEduExpById = function deleteEduExpById(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/wms/deleteEduExpById"), data);};

// 查询公司列表
exports.deleteEduExpById = deleteEduExpById;var getCompanyList = function getCompanyList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/rms/getCompanyList"), data);};
// 查询公司列表(字段精简)
exports.getCompanyList = getCompanyList;var getCompanyListForSelect = function getCompanyListForSelect(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/rms/getCompanyListForSelect"), data);};

// 新增/更新公司信息
exports.getCompanyListForSelect = getCompanyListForSelect;var updateCompany = function updateCompany(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/rms/updateCompany"), data);};
// 查询公司信息
exports.updateCompany = updateCompany;var getCompanyDetail = function getCompanyDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/rms/getCompanyDetail"), data);};
// 新增/更新职位信息
exports.getCompanyDetail = getCompanyDetail;var updatePosition = function updatePosition(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/rms/updatePosition"), data);};
// 公司认证
exports.updatePosition = updatePosition;var updateCompanyAuth = function updateCompanyAuth(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/rms/updateAuth"), data);};


// 查询职位信息
exports.updateCompanyAuth = updateCompanyAuth;var getPositionDetail = function getPositionDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/rms/getPositionDetail"), data);};
// 查询公司职位列表
exports.getPositionDetail = getPositionDetail;var getCompanyPositionList = function getCompanyPositionList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/rms/getCompanyPositionList"), data);};
// 删除公司职位
exports.getCompanyPositionList = getCompanyPositionList;var deletePositionById = function deletePositionById(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/rms/deletePositionById"), data);};
// 查询职位列表
exports.deletePositionById = deletePositionById;var getPositionList = function getPositionList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/rms/getPositionList"), data);};

// 查询课程列表
exports.getPositionList = getPositionList;var getCourseList = function getCourseList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/course/getCourseList"), data);};
// 查询课程详情
exports.getCourseList = getCourseList;var getCourseDetail = function getCourseDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/course/getCourseDetail"), data);};
// 课程报名
exports.getCourseDetail = getCourseDetail;var applyCourse = function applyCourse(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/course/applyCourse"), data);};
// 查询我的课程列表
exports.applyCourse = applyCourse;var getApplyCourseList = function getApplyCourseList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/course/getApplyCourseList"), data);};


// 查询外包任务列表
exports.getApplyCourseList = getApplyCourseList;var getTaskList = function getTaskList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/task/getTaskList"), data);};
// 查询外包任务列表
exports.getTaskList = getTaskList;var getMyTaskList = function getMyTaskList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/task/getMyTaskList"), data);};

// 查询外包任务详情
exports.getMyTaskList = getMyTaskList;var getTaskDetail = function getTaskDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/task/getTaskDetail"), data);};
// 新增/更新外包任务信息
exports.getTaskDetail = getTaskDetail;var updateTask = function updateTask(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/task/addOrUpdateTask"), data);};
// 删除外包任务
exports.updateTask = updateTask;var deleteTaskById = function deleteTaskById(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/task/deleteTask"), data);};
// 外包任务报名
exports.deleteTaskById = deleteTaskById;var applyTask = function applyTask(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/task/applyTask"), data);};
// 查询我的任务列表
exports.applyTask = applyTask;var getApplyTaskList = function getApplyTaskList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/task/getApplyTaskList"), data);};

// 查询收藏列表
exports.getApplyTaskList = getApplyTaskList;var getCollectList = function getCollectList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/collect/getCollectList"), data);};
// 查询收藏详情
exports.getCollectList = getCollectList;var getCollectDetail = function getCollectDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/collect/getCollectDetail"), data);};
// 新增/更新收藏信息
exports.getCollectDetail = getCollectDetail;var updateCollect = function updateCollect(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/collect/addOrUpdateCollect"), data);};
// 删除收藏
exports.updateCollect = updateCollect;var deleteCollectById = function deleteCollectById(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/collect/deleteCollect"), data);};

// 查询职位申请列表
exports.deleteCollectById = deleteCollectById;var getApplyList = function getApplyList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/apply/getApplyList"), data);};
// 查询职位申请详情
exports.getApplyList = getApplyList;var getApplyDetail = function getApplyDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/apply/getApplyDetail"), data);};
// 新增/更新职位申请
exports.getApplyDetail = getApplyDetail;var updateApply = function updateApply(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/apply/addOrUpdateApply"), data);};
// 更新简历状态
exports.updateApply = updateApply;var updateApplyStatus = function updateApplyStatus(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/apply/updateApplyStatus"), data);};
// 删除职位申请
exports.updateApplyStatus = updateApplyStatus;var deleteApplyById = function deleteApplyById(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/apply/deleteApply"), data);};
// 添加职位申请查看记录
exports.deleteApplyById = deleteApplyById;var updateApplyRead = function updateApplyRead(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/apply/addApplyRead"), data);};


// 查询浏览记录列表
exports.updateApplyRead = updateApplyRead;var getBrowseList = function getBrowseList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/browse/getBrowseList"), data);};
// 查询看过我列表
exports.getBrowseList = getBrowseList;var getVisitList = function getVisitList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/browse/getVisitList"), data);};
// 查询浏览记录详情
exports.getVisitList = getVisitList;var getBrowseDetail = function getBrowseDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/browse/getBrowseDetail"), data);};
// 新增/更新浏览记录
exports.getBrowseDetail = getBrowseDetail;var updateBrowse = function updateBrowse(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/browse/addOrUpdateBrowse"), data);};
// 删除浏览记录
exports.updateBrowse = updateBrowse;var deleteBrowseById = function deleteBrowseById(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/browse/deleteBrowse"), data);};

// 查询沟通记录列表
exports.deleteBrowseById = deleteBrowseById;var getCommList = function getCommList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/comm/getCommList"), data);};
// 查询沟通记录详情
exports.getCommList = getCommList;var getCommDetail = function getCommDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/comm/getCommDetail"), data);};
// 新增/更新沟通记录
exports.getCommDetail = getCommDetail;var updateComm = function updateComm(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/comm/addOrUpdateComm"), data);};
// 删除沟通记录
exports.updateComm = updateComm;var deleteCommById = function deleteCommById(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/comm/deleteComm"), data);};

// 查询分享记录列表
exports.deleteCommById = deleteCommById;var getShareList = function getShareList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/share/getShareList"), data);};
// 查询分享记录详情
exports.getShareList = getShareList;var getShareDetail = function getShareDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/share/getShareDetail"), data);};
// 新增/更新分享记录
exports.getShareDetail = getShareDetail;var updateShare = function updateShare(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/share/addOrUpdateShare"), data);};
// 删除分享记录
exports.updateShare = updateShare;var deleteShareById = function deleteShareById(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/share/deleteShare"), data);};

// 查询交易明细
exports.deleteShareById = deleteShareById;var getFinanceList = function getFinanceList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/finance/getFinanceList"), data);};
// 查询提现记录
exports.getFinanceList = getFinanceList;var getWithdrawList = function getWithdrawList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/finance/getWithdrawList"), data);};
// 查询账户余额
exports.getWithdrawList = getWithdrawList;var getAccountDetail = function getAccountDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/finance/getAccountDetail"), data);};
// 提现申请
exports.getAccountDetail = getAccountDetail;var withdrawApply = function withdrawApply(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/finance/withdrawApply"), data);};

// 查询法律法规列表
exports.withdrawApply = withdrawApply;var getLawList = function getLawList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/law/list"), data);};
// 查询法律法规列详情
exports.getLawList = getLawList;var getLawDetail = function getLawDetail(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/cms/law/detail"), data);};

// 查询屏蔽公司列表
exports.getLawDetail = getLawDetail;var getShieldList = function getShieldList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/shield/getShieldList"), data);};
// 新增/更新屏蔽公司
exports.getShieldList = getShieldList;var updateShield = function updateShield(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/shield/addOrUpdateShield"), data);};
// 删除屏蔽公司
exports.updateShield = updateShield;var deleteShieldById = function deleteShieldById(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/shield/deleteShield"), data);};

// 查询常见问题列表
exports.deleteShieldById = deleteShieldById;var getChatAskList = function getChatAskList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/chat/getChatAskList"), data);};
// 查询回复信息
exports.getChatAskList = getChatAskList;var getChatReply = function getChatReply(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/chat/getChatReply"), data);};
// 查询智能聊天记录
exports.getChatReply = getChatReply;var getRobotLogList = function getRobotLogList(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/chat/getRobotLogList"), data);};
// 新增智能聊天记录
exports.getRobotLogList = getRobotLogList;var addRobotLog = function addRobotLog(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/chat/addRobotLog"), data);};

// 文件上传
exports.addRobotLog = addRobotLog;var uploadFile = function uploadFile(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/file/upload"), data);};
// 简历附件上传
exports.uploadFile = uploadFile;var uploadResumeFile = function uploadResumeFile(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/file/uploadResumeFile"), data);};

// 用户登录
exports.uploadResumeFile = uploadResumeFile;var postLogin = function postLogin(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/ums/xcxUserLogin"), data);};
// 获取短信验证码
exports.postLogin = postLogin;var getMsgCode = function getMsgCode(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/register/sendMsg"), data);};
// 校验注册验证码
exports.getMsgCode = getMsgCode;var postRegCode = function postRegCode(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/register/verifySMSCode"), data);};


// 获取卡片信息
exports.postRegCode = postRegCode;var getCardBin = function getCardBin(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/card/getCardBin"), data);};
// 图片上传
exports.getCardBin = getCardBin;var upload = function upload(data) {return _http.default.POST("".concat(_indexConfig.default.baseUrl, "/register/upImg"), data);};
// 图片下载
exports.upload = upload;var downloadImg = function downloadImg(data) {return _http.default.GET("".concat(_indexConfig.default.baseUrl, "/my/downloadImg"), data);};exports.downloadImg = downloadImg;

/***/ }),

/***/ 25:
/*!***********************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/apis/http.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
function HTTP(obj, config) {

  var defaultConfig = {
    isRes: false,
    loading: false };


  config = _objectSpread(_objectSpread({}, defaultConfig),
  config);



  // 如果需要显示loading,mask防止点击穿透
  config.loading && uni.showLoading({
    title: '加载中',
    mask: true });


  return new Promise(function (resolve, reject) {

    var options = {
      url: "",
      method: "GET",
      data: {},
      dataType: "json",
      header: {
        "content-type": "application/json",
        "X-requested-With": "XMLHttpRequest" },

      success: function success(res) {
        console.log("HTTP请求结果：", res);
        uni.hideLoading();
        // 状态码为200
        if (res.statusCode == 200) {
          var data = res.data;

          //自动校验用户是否登录过期
          if (data.code == "01") {
            _store.default.dispatch("reLogin");
            return;
          }

          //返回 { code:10000,msg:"消息",data:[] }
          if (config.isRes) {
            resolve(data);
          }
          // 返回 data:[]
          else {
              if (data.code == "200") {
                resolve(data.data || true);
              } else {
                wx.showToast({
                  title: data.message,
                  icon: "none",
                  duration: 2000 });

                reject(data.message);
              }
            }
        } else {
          reject("HTTP:状态码异常！");
        }
      },
      fail: function fail(err) {
        uni.hideLoading();
        uni.showToast({
          title: "网络异常，请稍后再试!",
          icon: "none" });

        reject("网络异常，请稍后再试!");
      },
      complete: function complete() {} };


    options = _objectSpread(_objectSpread({}, options),
    obj);


    var OPENID = uni.getStorageSync("openId");
    var Token = uni.getStorageSync("token");
    // const location=uni.getStorageSync("location");
    // if(location){
    // 	//所有接口带上当前位置信息
    // 	options["data"]["latitude"] = location.latitude;
    // 	options["data"]["longitude"] = location.longitude;
    // 	options["data"]["pcitycode"] = location.pcitycode;
    // }
    console.log("Token===" + Token);
    if (OPENID) options["header"]["openId"] = OPENID;
    if (Token) options["header"]["token"] = Token;
    if (options.url && options.method) {
      wx.request(options);
    } else {
      wx.showToast({
        title: 'HTTP：缺失参数',
        icon: "none",
        duration: 2000 });

    }
  });

}var _default =



{
  GET: function GET(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 ? arguments[2] : undefined;
    return HTTP({
      url: url,
      data: data,
      method: "GET" },
    config);
  },
  POST: function POST(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 ? arguments[2] : undefined;
    return HTTP({
      url: url,
      data: data,
      method: "POST" },
    config);
  },

  POSTformdata: function POSTformdata(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 ? arguments[2] : undefined;
    return HTTP({
      url: url,
      data: data,
      method: "POST" },
    config);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 26:
/*!**************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/utils.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var innerAudioContext = uni.createInnerAudioContext();var _default =
{

  /**
   * 获取两个经纬度之间的距离
   * @param lat1 第一点的纬度
   * @param lng1 第一点的经度
   * @param lat2 第二点的纬度
   * @param lng2 第二点的经度
   * @returns {Number}
   */
  getDistance: function getDistance(lat11, lng11, lat22, lng22) {
    //格式转换，避免输入的string字符
    var lat1 = parseFloat(lat11);
    var lng1 = parseFloat(lng11);
    var lat2 = parseFloat(lat22);
    var lng2 = parseFloat(lng22);
    //相等的直接返回
    if (lat1 == lat2 && lng1 == lng2) {
      return 0;
    }
    var f = this.getRad((lat1 + lat2) / 2);
    var g = this.getRad((lat1 - lat2) / 2);
    var l = this.getRad((lng1 - lng2) / 2);
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    var s, c, w, r, d, h1, h2;
    var a = 6378137.0; //The Radius of eath in meter.   
    var fl = 1 / 298.257;
    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;
    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;
    s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
    s = s / 1000;
    s = s.toFixed(2); //指定小数点后的位数。   
    return s;
  },

  getRad: function getRad(d) {
    var PI = Math.PI;
    return d * PI / 180.0;
  },

  /**
      * 当前位置与指定位置的距离
      * @param lat1 第一点的纬度
      * @param lng1 第一点的经度
      * @returns {Number}
      */
  getCurrentDistance: function getCurrentDistance(lat, lng) {
    var location = getApp().globalData.currentLocation;
    if (location) {
      return this.getDistance(lat, lng, location.latitude, location.longitude);
    }
    return 0;
  },

  /**
      * 当前位置与指定位置的距离
      * @param lat1 第一点的纬度
      * @param lng1 第一点的经度
      * @returns {Number}
      */
  getCurrentDistanceStr: function getCurrentDistanceStr(lat, lng) {
    var distance = this.getCurrentDistance(lat, lng);
    var strDistance = '';
    if (distance < 1) {//一公里以内的
      strDistance = distance * 1000 + "m";
    } else {
      strDistance = distance + "km";
    }
    return strDistance;
  },


  phoneHiden: function phoneHiden(cellValue) {
    if (Number(cellValue) && String(cellValue).length === 11) {
      var mobile = String(cellValue);
      var reg = /^(\d{3})\d{4}(\d{4})$/;
      return mobile.replace(reg, '$1****$2');
    } else {
      return cellValue;
    }
  },

  playAudio: function playAudio(src) {
    if (innerAudioContext) {
      innerAudioContext.stop();
    }
    // 为了防止苹果手机静音无法播放
    wx.setInnerAudioOption({
      obeyMuteSwitch: false });

    innerAudioContext.src = encodeURI(src);
    console.log("开始播放");
    innerAudioContext.play();
    innerAudioContext.onEnded(function (res) {
      console.log("自然播放结束");
      // callback("onEnded");
    });
    innerAudioContext.onStop(function (res) {
      console.log("播放停止");
      // callback("onStop");
    });
    innerAudioContext.onError(function (res) {
      console.log("播放错误", res);
      // callback("onError");
    });
  },

  stopAudioPlay: function stopAudioPlay() {
    console.log("stopAudioPlay", innerAudioContext);
    if (innerAudioContext) {
      console.log("stopAudioPlay");
      innerAudioContext.stop();
    }
  },


  /* 
      * 将cityNo 转 cityName
      * cityData:原数据
      * cityNo：二级地区编码
      */
  getCityName: function getCityName(cityData, cityNo) {
    if (!cityNo) return;
    if (!(cityData instanceof Array)) return;
    // 9112
    cityNo += "";
    for (var i = 0; i < cityData.length; i++) {
      var sheng = cityData[i];
      for (var j = 0; j < sheng.children.length; j++) {
        var shi = sheng.children[j];
        if (shi.value == cityNo) {
          // 使用return 终止循环
          return "".concat(sheng.label, "-").concat(shi.label);
        }
      }
    }
  },

  /* 
      * obj 转 params字符串参数  
      * 例子：{a:1,b:2} => a=1&b=2
      */
  objParseParam: function objParseParam(obj) {
    var paramsStr = "";
    if (obj instanceof Array) return paramsStr;
    if (!(obj instanceof Object)) return paramsStr;
    for (var key in obj) {
      paramsStr += "".concat(key, "=").concat(obj[key], "&");
    }
    return paramsStr.substring(0, paramsStr.length - 1);
  },

  /* 
      * obj 转 路由地址带参数
      * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
      */
  objParseUrlAndParam: function objParseUrlAndParam(path, obj) {
    var url = path || "/";
    var paramsStr = "";
    if (obj instanceof Array) return url;
    if (!(obj instanceof Object)) return url;
    paramsStr = this.objParseParam(obj);
    paramsStr && (url += "?");
    url += paramsStr;
    return url;
  },

  /* 
      * 获取url字符串参数
      */
  getRequestParameters: function getRequestParameters(locationhref) {
    var href = locationhref || "";
    var theRequest = new Object();
    var str = href.split("?")[1];
    if (str != undefined) {
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
    }
    return theRequest;
  },

  /* 
      * 银行卡每四位空格
      */
  formatCardNo: function formatCardNo(cardNo) {
    cardNo += "";
    return cardNo.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  },

  /**
      * 乘法，解决js精度损失问题
      * @param {*} arg1 
      * @param {*} arg2 
      */
  accMul: function accMul(arg1, arg2) {
    arg1 = arg1 || 0;
    var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 27:
/*!**********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/config/assets.config.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _indexConfig = _interopRequireDefault(__webpack_require__(/*! ./index.config.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var PATH = _indexConfig.default.assetsPath;

/* 
                                             * 图片静态资源表，所有图片资源路径在这统一管理，不应该写死在页面中，该数据挂载到Vue原型中。
                                             * 页面使用：this.$mAssetsPath.grid_1
                                             * CSS背景：应尽量使用:style="" 行内样式设置背景图
                                             * PATH说明：本地路径或者服务器路径
                                             * 
                                             * 举例：<image :src="grid_1">  需要在data中映射 grid_1: this.$mAssetsPath.grid_1
                                             * 
                                             * 特别注意：经测试小程序中不支持 <image :src="$mAssetsPath.grid_1"> 该用法
                                             */var _default =

{

  // 首页grid的图标
  grid_1: PATH + "/grid-1.png",
  grid_2: PATH + "/grid-2.png",
  grid_3: PATH + "/grid-3.png",
  grid_4: PATH + "/grid-4.png",
  grid_5: PATH + "/grid-5.png",
  grid_6: PATH + "/grid-6.png",
  grid_7: PATH + "/grid-7.png",
  grid_8: PATH + "/grid-8.png",
  grid_9: PATH + "/grid-9.png",
  grid_10: PATH + "/grid-10.png",

  // 注册引导页的图片
  reg_img: PATH + "/register@3x.png",

  // 注册引导页的图标
  t_1: PATH + "/13@3x.png",
  t_2: PATH + "/14@3x.png",
  t_3: PATH + "/15@3x.png",
  t_4: PATH + "/16@3x.png",

  // 首页广告位的两个图片
  ad_1: PATH + "/ad-1.png",
  ad_2: PATH + "/ad-2.png",

  // 默认头像
  headImg: PATH + "/head.png",

  // 首页信用卡信息图
  ka_1: PATH + "/ka-1.png",
  ka_2: PATH + "/ka-2.png",

  // 暂无数据
  no_order_1: PATH + "/noOrder.png",

  // 首頁banner图
  banner_1: PATH + "/s1.png",

  //高薪职位
  job_high: PATH + "/job-high.png",
  //最新职位
  // job_new: PATH + "/job-new.png",
  job_new: PATH + "/job-new.png",

  // 图片上传示例图
  upload_1: PATH + "/upload-50.png",
  upload_2: PATH + "/upload-51.png",
  upload_3: PATH + "/upload-52.png",

  // logo图
  logo: PATH + "/logo.jpg",

  // fail提示图
  fail_icon: PATH + "/pay_unopen.png",

  // 注册成功icon图
  regSuccessIcon: PATH + "/succ.jpg" };exports.default = _default;

/***/ }),

/***/ 28:
/*!*************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/config/constData.config.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {

  // 商户审核状态字典
  status: {
    SUCCESS: "审核通过",
    WAIT_AUDIT: "审核中",
    REJECT: "审核拒绝" } };exports.default = _default;

/***/ }),

/***/ 29:
/*!********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/modalHelper.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = function (bodyCls) {
  var scrollTop;
  return {
    open: function open() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';

      document.querySelector('.uni-page-head').style.top = 0;
    },
    close: function close() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
      document.body.style.top = "auto";
    } };

}('modal-open');exports.default = _default;

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

/***/ 30:
/*!**********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/lib/goeasy-2.4.7.min.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {return function (e) {var t = {};function n(o) {if (t[o]) return t[o].exports;var r = t[o] = { i: o, l: !1, exports: {} };return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports;}return n.m = e, n.c = t, n.d = function (e, t, o) {n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });}, n.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });}, n.t = function (e, t) {if (1 & t && (e = n(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var o = Object.create(null);if (n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var r in e) {n.d(o, r, function (t) {return e[t];}.bind(null, r));}return o;}, n.n = function (e) {var t = e && e.__esModule ? function () {return e["default"];} : function () {return e;};return n.d(t, "a", t), t;}, n.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, n.p = "", n(n.s = 2);}([function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.noop = t.GoEasyDomainNumber = t.goEasyArray = t.UUID = t.calibrator = undefined;var o = n(31),r = n(89),i = n(93),s = n(52);t.calibrator = o.calibrator, t.UUID = r.UUID, t.goEasyArray = i.goEasyArray, t.GoEasyDomainNumber = s.GoEasyDomainNumber, t.noop = function () {};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t["default"] = { WRITE: "WRITE", READ: "READ", NONE: "NONE" };}, function (e, t, n) {"use strict";t.__esModule = !0, t.GoEasyIM = t.PubSub = t.ConversationDTO = t.MessageStatus = t.Scene = t.CallBackOptions = void 0;var o,r = n(12),i = n(66),s = n(0),a = n(98),u = n(6),c = n(160),l = n(161),f = n(162),p = n(163),h = n(165),d = n(167),y = n(16),m = n(8),v = n(10),g = function () {return function () {};}();t.CallBackOptions = g, function (e) {e.PRIVATE = "private", e.GROUP = "group", e.SYSTEM = "system";}(o = t.Scene || (t.Scene = {})), function (e) {e.NEW = "new", e.SENDING = "sending", e.SUCCESS = "success", e.FAIL = "fail";}(t.MessageStatus || (t.MessageStatus = {}));var b = function () {return function () {};}();t.ConversationDTO = b;var E = function () {function e(e) {this.neverConnect = !0, this.options = e;}return e.prototype.initialGoEasySocket = function (e) {this.goEasySocket = e, this.subscriber.initialGoEasySocket(), this.presence.initialGoEasySocket();}, e.prototype.initialBeforeConnect = function () {this.neverConnect = !1, this.publisher = new f["default"](this), this.subscriber = new p["default"](this), this.histories = new c["default"](this), this.presence = new h["default"](this), this.hereNows = new l["default"](this);}, e.prototype.validateOptions = function () {var e = this.options;if (!e.modules || !e.modules.includes(a.ModuleTypes.PUBSUB)) throw { code: 400, content: "Invalid options: module '" + a.ModuleTypes.PUBSUB + "' is not enabled" };}, e.prototype.publish = function (e) {this.validateOptions(), this.publisher.publish(e);}, e.prototype.subscribe = function (e) {this.validateOptions(), this.subscriber.subscribe(e);}, e.prototype.unsubscribe = function (e) {this.validateOptions(), this.subscriber.unsubscribe(e);}, e.prototype.subscribePresence = function (e) {this.validateOptions(), this.presence.subscribePresence(e);}, e.prototype.unsubscribePresence = function (e) {this.validateOptions(), this.presence.unsubscribePresence(e);}, e.prototype.history = function (e) {this.validateOptions(), this.histories.get(e);}, e.prototype.hereNow = function (e) {this.validateOptions(), this.hereNows.byChannel(e);}, e.prototype.hereNowByUserIds = function (e) {this.validateOptions(), this.hereNows.byUserId(e);}, e;}();t.PubSub = E;var _ = function () {function e(e) {this.options = e;}return e.prototype.initialBeforeConnect = function (e) {u.im.initialBeforeConnect(e);}, e.prototype.initialAfterConnect = function () {u.im.initialAfterConnect();}, e.prototype.initialGoEasySocket = function (e) {u.im.initialGoEasySocket(e);}, e.prototype.validateOptions = function () {var e = this.options;if (!e.modules || !e.modules.includes(a.ModuleTypes.IM)) throw Error("Invalid options: module '" + a.ModuleTypes.IM + "' is not enabled");}, e.prototype.validateMessageToData = function (e) {if (!s.calibrator.isObject(e.to)) throw { code: 400, content: "TypeError: to requires an object." };if (!s.calibrator.isObject(e.to.data)) throw { code: 400, content: "TypeError: to.data requires an object." };}, e.prototype.on = function (e, t) {this.validateOptions(), u.im.on(e, t);}, e.prototype.createTextMessage = function (e) {return this.validateOptions(), this.validateMessageToData(e), u.im.createTextMessage(e);}, e.prototype.createImageMessage = function (e) {return this.validateOptions(), this.validateMessageToData(e), u.im.createImageMessage(e);}, e.prototype.createFileMessage = function (e) {return this.validateOptions(), this.validateMessageToData(e), u.im.createFileMessage(e);}, e.prototype.createAudioMessage = function (e) {return this.validateOptions(), this.validateMessageToData(e), u.im.createAudioMessage(e);}, e.prototype.createVideoMessage = function (e) {return this.validateOptions(), this.validateMessageToData(e), u.im.createVideoMessage(e);}, e.prototype.createCustomMessage = function (e) {return this.validateOptions(), this.validateMessageToData(e), u.im.createCustomMessage(e);}, e.prototype.sendMessage = function (e) {this.validateOptions(), u.im.sendMessage(e);}, e.prototype.recallMessage = function (e) {this.validateOptions(), u.im.recallMessage(e);}, e.prototype.deleteMessage = function (e) {this.validateOptions(), u.im.deleteMessage(e);}, e.prototype.markGroupMessageAsRead = function (e) {this.validateOptions(), u.im.groupMarkAsRead(e);}, e.prototype.markPrivateMessageAsRead = function (e) {this.validateOptions(), u.im.privateMarkAsRead(e);}, e.prototype.latestConversations = function (e) {this.validateOptions(), u.im.latestConversations().then(function (t) {m.CallbackUtils.onSuccess(e, t);})["catch"](function (t) {m.CallbackUtils.onFailed(e, t);});}, e.prototype.removePrivateConversation = function (e) {this.validateOptions(), u.im.removePrivateConversation(e);}, e.prototype.removeGroupConversation = function (e) {this.validateOptions(), u.im.removeGroupConversation(e);}, e.prototype.topPrivateConversation = function (e) {this.validateOptions(), u.im.topPrivateConversation(e);}, e.prototype.topGroupConversation = function (e) {this.validateOptions(), u.im.topGroupConversation(e);}, e.prototype.history = function (e) {this.validateOptions(), u.im.history(e);}, e.prototype.subscribeUserPresence = function (e) {this.validateOptions(), u.im.subscribeUserPresence(e.userIds).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.unsubscribeUserPresence = function (e) {this.validateOptions(), u.im.unsubscribeUserPresence(e.userId).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.hereNow = function (e) {this.validateOptions(), u.im.hereNow(e).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.subscribeGroup = function (e) {this.validateOptions(), u.im.subscribeGroup(e).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.unsubscribeGroup = function (e) {this.validateOptions(), u.im.unsubscribeGroup(e.groupId).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.subscribeGroupPresence = function (e) {this.validateOptions(), u.im.subscribeGroupPresence(e.groupIds).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.unsubscribeGroupPresence = function (e) {this.validateOptions(), u.im.unsubscribeGroupPresence(e.groupId).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.groupHereNow = function (e) {this.validateOptions(), u.im.groupHereNow(e.groupId).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.groupOnlineCount = function (e) {this.validateOptions(), u.im.groupOnlineCount(e.groupId).then(function (t) {s.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);})["catch"](function (t) {s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e;}();t.GoEasyIM = _;var S = function () {function e(t) {if (s.calibrator.isDef(e.instance) && e.instance.getConnectionStatus() !== r["default"].DISCONNECTED) return e.instance;this.validateOptions(t), this.options = t, this.pubsub = new E(this.options), this.im = new _(this.options), this.notification = new d.GoEasyNotification(this.options.allowNotification);}return e.getInstance = function (t) {return s.calibrator.isUndef(e.instance) && (e.instance = new e(t)), e.instance;}, e.prototype.connect = function (e) {this.getConnectionStatus() !== r["default"].DISCONNECTED && s.calibrator.isObject(e) && s.calibrator.isFunction(e.onFailed) ? e.onFailed({ code: 408, content: "It is already connected, don't try again until disconnect() is called. " }) : (this.confirmUserId(e), v.GoEasyEventCenter.initial(), this.notification.listenNewMessage(), this.pubsub.initialBeforeConnect(), this.im.initialBeforeConnect({ id: e.id, data: e.data }), this.goEasySocket = new i["default"](this.options, e), this.im.initialGoEasySocket(this.goEasySocket), this.goEasySocket.connect(this.notification), this.pubsub.initialGoEasySocket(this.goEasySocket), this.im.initialAfterConnect());}, e.prototype.disconnect = function (e) {this.goEasySocket.disconnect(e).then(function () {s.calibrator.isObject(e) && s.calibrator.isFunction(e.onSuccess) && e.onSuccess();})["catch"](function (t) {s.calibrator.isObject(e) && s.calibrator.isFunction(e.onFailed) && e.onFailed(t);});}, e.prototype.getConnectionStatus = function () {return this.goEasySocket ? this.goEasySocket.getStatus() : r["default"].DISCONNECTED;}, e.prototype.validateOptions = function (e) {var t = "";if (!s.calibrator.isObject(e)) throw t = "options is require an object.", Error(t);if (!s.calibrator.isPrimitive(e.appkey) || 0 == e.appkey.length) throw t = "Invalid options:'host' is empty.", Error(t);if (!s.calibrator.isPrimitive(e.host) || 0 == e.host.length) throw t = "Invalid options:'host' is empty.", Error(t);if (!s.calibrator.isArray(e.modules)) throw t = "Invalid options: 'modules' must be nonempty array", Error(t);var n = [a.ModuleTypes.IM, a.ModuleTypes.PUBSUB],o = e.modules.map(function (e) {var o = e.toUpperCase();if (!n.includes(o)) throw t = "Invalid options: module '" + e + "' is not support", Error(t);return o;});e.modules = o;}, e.prototype.onClickNotification = function (e) {this.notification.onClickNotification(e);}, e.prototype.confirmUserId = function (e) {if (this.options.modules.includes(a.ModuleTypes.IM) && (s.calibrator.isEmpty(e.id) || !s.calibrator.isStringOrNumber(e.id))) throw { code: 400, content: "TypeError: id requires number or string." };if ("string" == typeof e.id && e.id.length > 60) throw { code: 400, content: "id over max length 60" };}, e.version = "2.4.7", e.IM_EVENT = y.ImApiEvents, e.IM_SCENE = o, e;}();t["default"] = S;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o,r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),i = n(0),s = n(1),a = (o = s) && o.__esModule ? o : { "default": o };var u = function () {function e(t) {var n = this;!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.uuid = null, this.name = "", this.params = null, this.success = null, this.fail = null, this.permission = a["default"].NONE, this.singleTimeout = 0, this.totalTimeout = 0, this.startTime = 0, this.complete = !1, this.retried = 0, this.unique = !1, this.uuid = i.UUID.get(), this.name = t.name, this.params = t.params, this.permission = t.permission, this.totalTimeout = t.totalTimeout, this.singleTimeout = t.singleTimeout, t.unique && (this.unique = t.unique), this.success = function (e) {n.complete || (n.complete = !0, t.success(e));}, this.fail = function (e) {n.complete || (n.complete = !0, t.fail(e));};}return r(e, [{ key: "start", value: function value() {this.startTime = Date.now();} }, { key: "isTimeout", value: function value() {return this.startTime + this.totalTimeout < Date.now();} }]), e;}();t["default"] = u;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.SocketTimeout = { connect: 1500, reconnectionDelayMax: 3e3, commonQuerySingle: 2500, commonQueryTotal: 12e3, commonRequestSingle: 1700, commonRequestTotal: 12e3, commonInfiniteSingle: 1700, commonInfiniteTotal: 864e5 };}, function (e, t, n) {"use strict";t.__esModule = !0, t.RocketTypes = void 0, function (e) {e.authorize = "authorize", e.manualDisconnect = "manualDisconnect", e.subscribe = "subscribe", e.unsubscribe = "unsubscribe", e.publish = "publish", e.ack = "ack", e.historyMessages = "historyMessages", e.hereNow = "hereNow", e.hereNowByUserIds = "hereNowByUserIds", e.imLastConversations = "imLastConversations", e.markPrivateMessageAsRead = "markPrivateMessageAsRead", e.markGroupMessageAsRead = "markGroupMessageAsRead", e.imGroupOnlineCount = "imGroupOnlineCount", e.imHereNow = "imHereNow", e.imGroupHereNow = "imGroupHereNow", e.publishIM = "publishIM", e.subscribeUserPresence = "subscribeUserPresence", e.unsubscribeUserPresence = "unsubscribeUserPresence", e.subscribeGroupPresence = "subscribeGroupPresence", e.unsubscribeGroupPresence = "unsubscribeGroupPresence", e.removeConversation = "removeConversation", e.topConversation = "topConversation", e.imData = "imData", e.subscribeGroups = "subscribeGroups", e.unsubscribeGroup = "unsubscribeGroup", e.IM_DELETE_MESSAGE = "IM_DELETE_MESSAGE", e.IM_HISTORY = "IM_HISTORY", e.IM_HISTORY_CHANGE = "IM_HISTORY_CHANGE", e.IM_RECALL_MESSAGE = "IM_RECALL_MESSAGE";}(t.RocketTypes || (t.RocketTypes = {}));}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.im = t.IM = undefined;var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = E(n(54)),i = E(n(109)),s = E(n(110)),a = E(n(111)),u = E(n(112)),c = E(n(113)),l = E(n(114)),f = E(n(116)),p = E(n(118)),h = n(119),d = E(n(134)),y = n(2),m = n(139),v = E(n(140)),g = n(19),b = n(8);function E(e) {return e && e.__esModule ? e : { "default": e };}var _ = t.IM = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this._event = m.eventCenter, this.goEasyUploader = null, this._goEasySocket = null, this._dataCache = null, this.messageSender = null, this.conversations = null, this._iMReceiver = null, this.groupMessageSubscriber = null, this._groupPresenceSubscriber = null, this._groupOnlineCount = null, this._groupHereNow = null, this._userPresenceSubscriber = null, this._userHereNow = null;}return o(e, [{ key: "on", value: function value(e, t) {this._event.on(e, t);} }, { key: "initialBeforeConnect", value: function value(t) {e.userId = t.id ? t.id.toString() : t.id, e.userData = t.data, this._dataCache = new p["default"](t), this.messageSender = new d["default"](), this.goEasyUploader = new r["default"](), this._userHereNow = new c["default"](this), this._groupHereNow = new l["default"](this), this._groupOnlineCount = new s["default"](this);} }, { key: "initialAfterConnect", value: function value() {this._iMReceiver = new f["default"](this), this.conversations = new v["default"](this), this._groupPresenceSubscriber = new a["default"](this), this.groupMessageSubscriber = new i["default"](), this._userPresenceSubscriber = new u["default"](this);} }, { key: "initialGoEasySocket", value: function value(e) {this._goEasySocket = e;} }, { key: "catch", value: function value(e, t) {try {e();} catch (n) {b.CallbackUtils.onFailed(t, n);}} }, { key: "createTextMessage", value: function value(e) {return h.iMMessageBuilder.buildMessage(g.MessageType.TEXT, e);} }, { key: "createImageMessage", value: function value(e) {return h.iMMessageBuilder.buildMessage(g.MessageType.IMAGE, e);} }, { key: "createFileMessage", value: function value(e) {return h.iMMessageBuilder.buildMessage(g.MessageType.FILE, e);} }, { key: "createAudioMessage", value: function value(e) {return h.iMMessageBuilder.buildMessage(g.MessageType.AUDIO, e);} }, { key: "createVideoMessage", value: function value(e) {return h.iMMessageBuilder.buildMessage(g.MessageType.VIDEO, e);} }, { key: "createCustomMessage", value: function value(e) {return h.iMMessageBuilder.buildMessage(e.type, e);} }, { key: "latestConversations", value: function value() {return this.conversations ? this.conversations.latestConversations() : Promise.reject({ code: 500, content: "Please connect GoEasyIM first." });} }, { key: "groupMarkAsRead", value: function value(e) {var t = this;this["catch"](function () {return t.conversations.groupMarkAsRead(e);}, e);} }, { key: "privateMarkAsRead", value: function value(e) {var t = this;this["catch"](function () {return t.conversations.privateMarkAsRead(e);}, e);} }, { key: "removePrivateConversation", value: function value(e) {return this.conversations.removePrivateConversation(e);} }, { key: "removeGroupConversation", value: function value(e) {return this.conversations.removeGroupConversation(e);} }, { key: "topPrivateConversation", value: function value(e) {return this.conversations.topPrivateConversation(e);} }, { key: "topGroupConversation", value: function value(e) {return this.conversations.topGroupConversation(e);} }, { key: "history", value: function value(e) {var t = this;this["catch"](function () {t.conversations.history(e);}, e);} }, { key: "upload", value: function value(e, t, n) {return this.goEasyUploader.upload(e, t, n);} }, { key: "sendSystemMessage", value: function value(e, t) {return this.messageSender.send(e, t, y.Scene.SYSTEM);} }, { key: "sendMessage", value: function value(e) {this.messageSender.send(e);} }, { key: "subscribeUserPresence", value: function value(e) {return this._userPresenceSubscriber.presence(e);} }, { key: "unsubscribeUserPresence", value: function value(e) {return this._userPresenceSubscriber.unPresence(e);} }, { key: "hereNow", value: function value(e) {return this._userHereNow.hereNow(e, y.Scene.PRIVATE);} }, { key: "recallMessage", value: function value(e) {var t = this;this["catch"](function () {t.conversations.recallMessage(e);}, e);} }, { key: "deleteMessage", value: function value(e) {var t = this;this["catch"](function () {t.conversations.deleteMessage(e);}, e);} }, { key: "subscribeGroup", value: function value(e) {return this.groupMessageSubscriber.subscribe(e);} }, { key: "unsubscribeGroup", value: function value(e) {return this.groupMessageSubscriber.unsubscribe(e);} }, { key: "subscribeGroupPresence", value: function value(e) {return this._groupPresenceSubscriber.presence(e);} }, { key: "unsubscribeGroupPresence", value: function value(e) {return this._groupPresenceSubscriber.unPresence(e);} }, { key: "groupHereNow", value: function value(e) {return this._groupHereNow.hereNow(e);} }, { key: "groupOnlineCount", value: function value(e) {return this._groupOnlineCount.get(e);} }]), e;}();_.version = null, _.userId = undefined, _.userData = null;var S = new _();t.im = S;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.str = t.noop = t.GoEasyDomainNumber = t.goEasyArray = t.UUID = t.calibrator = undefined;var o = n(115),r = n(0);t.calibrator = r.calibrator, t.UUID = r.UUID, t.goEasyArray = r.goEasyArray, t.GoEasyDomainNumber = r.GoEasyDomainNumber, t.noop = r.noop, t.str = o.str;}, function (e, t, n) {"use strict";t.__esModule = !0, t.CallbackUtils = void 0;var o = n(31),r = function () {function e() {}return e.onSuccess = function (e, t) {o.calibrator.isFunction(e.onSuccess) && e.onSuccess(t);}, e.onFailed = function (e, t) {if (!o.calibrator.isObject(e) || !o.calibrator.isFunction(e.onFailed)) throw t;e.onFailed(t);}, e.validateCallbackOptions = function (e) {if (o.calibrator.isUndef(e) || !o.calibrator.isObject(e)) throw { code: 400, content: "bad parameters" };}, e;}();t.CallbackUtils = r;}, function (e, t, n) {"use strict";e.exports = function () {return function () {};};}, function (e, t, n) {"use strict";t.__esModule = !0, t.GoEasyEventCenter = void 0;var o = n(117),r = function () {function e() {}return e.initial = function () {this.eventDriver = new o.EmitterEventDriver();}, e.on = function (e, t) {this.eventDriver.on(e, t);}, e.fire = function (e, t) {this.eventDriver.fire(e, t);}, e;}();t.GoEasyEventCenter = r;}, function (e, t, n) {"use strict";t.__esModule = !0, t.AbstractPayloadBuilder = void 0;var o = function () {function e() {}return e.prototype.build = function (e) {this.validate(e.createOptions);var t = this.create();return this.setPayload(e, t), t;}, e;}();t.AbstractPayloadBuilder = o;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t["default"] = { DISCONNECTED: "disconnected", DISCONNECTING: "disconnecting", CONNECTING: "connecting", CONNECTED: "connected", RECONNECTING: "reconnecting", RECONNECTED: "reconnected", EXPIRED_RECONNECTED: "reconnected", CONNECT_FAILED: "connect_failed" };}, function (e, t, n) {function o(e) {if (e) return function (e) {for (var t in o.prototype) {e[t] = o.prototype[t];}return e;}(e);}e.exports = o, o.prototype.on = o.prototype.addEventListener = function (e, t) {return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;}, o.prototype.once = function (e, t) {function n() {this.off(e, n), t.apply(this, arguments);}return n.fn = t, this.on(e, n), this;}, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function (e, t) {if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n,o = this._callbacks["$" + e];if (!o) return this;if (1 == arguments.length) return delete this._callbacks["$" + e], this;for (var r = 0; r < o.length; r++) {if ((n = o[r]) === t || n.fn === t) {o.splice(r, 1);break;}}return this;}, o.prototype.emit = function (e) {this._callbacks = this._callbacks || {};var t = [].slice.call(arguments, 1),n = this._callbacks["$" + e];if (n) for (var o = 0, r = (n = n.slice(0)).length; o < r; ++o) {n[o].apply(this, t);}return this;}, o.prototype.listeners = function (e) {return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];}, o.prototype.hasListeners = function (e) {return !!this.listeners(e).length;};}, function (e, t, n) {"use strict";var o = n(74),r = n(45),i = n(78),s = n(79);"undefined" != typeof navigator && /Android/i.test(navigator.userAgent), "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent);t.protocol = 3;var a = t.packets = { open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6 },u = o(a),c = { type: "error", data: "parser error" },l = n(80);t.encodePacket = function (e, t, n, o) {"function" == typeof t && (o = t, t = !1), "function" == typeof n && (o = n, n = null);e.data === undefined ? undefined : e.data.buffer || e.data;var r = a[e.type];return undefined !== e.data && (r += n ? s.encode(String(e.data), { strict: !1 }) : String(e.data)), o("" + r);}, t.decodePacket = function (e, t, n) {if (e === undefined) return c;if ("string" == typeof e) {if (n && !1 === (e = function (e) {try {e = s.decode(e, { strict: !1 });} catch (t) {return !1;}return e;}(e))) return c;var o = e.charAt(0);return Number(o) == o && u[o] ? e.length > 1 ? { type: u[o], data: e.substring(1) } : { type: u[o] } : c;}o = new Uint8Array(e)[0];var r = sliceBuffer(e, 1);return l && "blob" === t && (r = new l([r])), { type: u[o], data: r };}, t.encodePayload = function (e, n, o) {"function" == typeof n && (o = n, n = null);var s = r(e);if (!e.length) return o("0:");!function (e, t, n) {for (var o = new Array(e.length), r = i(e.length, n), s = function s(e, n, r) {t(n, function (t, n) {o[e] = n, r(t, o);});}, a = 0; a < e.length; a++) {s(a, e[a], r);}}(e, function (e, o) {t.encodePacket(e, !!s && n, !0, function (e) {o(null, function (e) {return e.length + ":" + e;}(e));});}, function (e, t) {return o(t.join(""));});}, t.decodePayload = function (e, n, o) {var r;if ("function" == typeof n && (o = n, n = null), "" === e) return o(c, 0, 1);for (var i, s, a = "", u = 0, l = e.length; u < l; u++) {var f = e.charAt(u);if (":" === f) {if ("" === a || a != (i = Number(a))) return o(c, 0, 1);if (a != (s = e.substr(u + 1, i)).length) return o(c, 0, 1);if (s.length) {if (r = t.decodePacket(s, n, !0), c.type === r.type && c.data === r.data) return o(c, 0, 1);if (!1 === o(r, u + i, l)) return;}u += i, a = "";} else a += f;}return "" !== a ? o(c, 0, 1) : void 0;};}, function (e, t, n) {"use strict";t.__esModule = !0, t.RemoteEvents = void 0, function (e) {e.message = "message", e.imMessage = "imMessage", e.userPresence = "userPresence", e.groupPresence = "groupPresence", e.IM_MSG_READ = "IM_MSG_READ", e.IM_MSG_DELETED = "IM_MSG_DELETED", e.IM_MSG_RECALLED = "IM_MSG_RECALLED";}(t.RemoteEvents || (t.RemoteEvents = {}));}, function (e, t, n) {"use strict";t.__esModule = !0, t.ImApiEvents = void 0, function (e) {e.PRIVATE_MESSAGE_RECEIVED = "PRIVATE_MESSAGE_RECEIVED", e.GROUP_MESSAGE_RECEIVED = "GROUP_MESSAGE_RECEIVED", e.SYSTEM_MESSAGE_RECEIVED = "SYSTEM_MESSAGE_RECEIVED", e.CONVERSATIONS_UPDATED = "CONVERSATIONS_UPDATED", e.USER_PRESENCE = "USER_PRESENCE", e.GROUP_PRESENCE = "GROUP_PRESENCE", e.MESSAGE_DELETED = "MESSAGE_DELETED", e.MESSAGE_READ = "MESSAGE_READ", e.MESSAGE_RECALLED = "MESSAGE_RECALLED";}(t.ImApiEvents || (t.ImApiEvents = {}));}, function (e, t, n) {"use strict";t.__esModule = !0, t.Target = void 0;var o = n(2),r = n(6),i = n(7),s = n(63),a = function () {function e(e, t) {this.scene = e, this.id = t.toString();}return e.byScene = function (t, n) {return new e(t, n);}, e.byIds = function (t, n) {var r = o.Scene.PRIVATE,s = t;return i.calibrator.isDef(n) && (r = o.Scene.GROUP, s = n), e.byScene(r, s);}, e.byIMMessage = function (t) {var n,i = t.scene();if (i === o.Scene.PRIVATE) {var s = t.senderId,a = t.targetId();n = r.IM.userId === s ? a : s;} else i === o.Scene.GROUP && (n = t.targetId());return new e(i, n);}, e.byMessageReadRemoteEvent = function (t) {var n,i = t.scene,s = t.targetId,a = t.markerId;return i === o.Scene.PRIVATE ? n = r.IM.userId === a ? s : a : i === o.Scene.GROUP && (n = s), new e(i, n);}, e.byIMMessageDeletedEvent = function (t) {var n = t.scene,i = t.deleterId;return n === o.Scene.PRIVATE ? new e(n, r.IM.userId === i ? t.targetId : i) : n === o.Scene.GROUP ? new e(n, t.targetId) : void 0;}, e.byMessageRecalledRemoteEvent = function (t) {var n = t.scene;return new e(n, s["default"].targetId(n, t.conversationId));}, e;}();t.Target = a;}, function (e, t, n) {"use strict";(function (e) {var o = this && this.__values || function (e) {var t = "function" == typeof Symbol && Symbol.iterator,n = t && e[t],o = 0;if (n) return n.call(e);if (e && "number" == typeof e.length) return { next: function next() {return e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e };} };throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");};t.__esModule = !0, t.FrameworkDetector = t.Framework = void 0;var r,i = n(23);!function (e) {e.UNIAPP = "UNIAPP", e.REACT_NATIVE = "REACT_NATIVE", e.TARO = "TARO", e.IONIC = "IONIC", e.NATIVE_APPLET_WX = "NATIVE_APPLET_WX", e.NATIVE_APPLET_ALIPAY = "NATIVE_APPLET_ALIPAY", e.UNKNOWN = "UNKNOWN";}(r = t.Framework || (t.Framework = {}));var s = function () {function t() {var e, t, n;this.framework = null, this.methods = ((e = {})[r.UNIAPP] = this.isUniApp, e[r.REACT_NATIVE] = this.isReactNative, e[r.NATIVE_APPLET_WX] = this.isWXApplet, e);var i = this.methods,s = Object.keys(i);try {for (var a = o(s), u = a.next(); !u.done; u = a.next()) {var c = u.value;if ((0, i[c])()) {this.framework = c;break;}}} catch (l) {t = { error: l };} finally {try {u && !u.done && (n = a["return"]) && n.call(a);} finally {if (t) throw t.error;}}this.framework = this.framework || r.UNKNOWN, this.framework;}return t.currentFramework = function () {return this.instance.framework;}, t.prototype.isUniApp = function () {return "object" == typeof uni && !!uni.getSystemInfoSync;}, t.prototype.isReactNative = function () {return void 0 !== e && e.__fbGenNativeModule;}, t.prototype.isTaro = function () {return !1;}, t.prototype.isWXApplet = function () {return i.PlatformDetector.currentPlatform() === i.Platform.APPLET_WX && "undefined" == typeof uni;}, t.instance = new t(), t;}();t.FrameworkDetector = s;}).call(this, n(28));}, function (e, t, n) {"use strict";t.__esModule = !0, t.MessageType = void 0, function (e) {e.TEXT = "text", e.IMAGE = "image", e.FILE = "file", e.VIDEO = "video", e.AUDIO = "audio";}(t.MessageType || (t.MessageType = {}));}, function (e, t, n) {"use strict";t.__esModule = !0, t.IM_INTERNAL_EVENTS = void 0, function (e) {e.MESSAGE_SENDING = "IM_INTERNAL_MESSAGE_SENDING", e.MESSAGE_SEND_SUCCESS = "IM_INTERNAL_MESSAGE_SEND_SUCCESS", e.MESSAGE_RECEIVED = "IM_INTERNAL_MESSAGE_RECEIVED", e.REMOTE_MESSAGE_READ = "IM_INTERNAL_REMOTE_MESSAGE_READ", e.REMOTE_MESSAGE_DELETED = "IM_INTERNAL_REMOTE_MESSAGE_DELETED", e.MAX_MESSAGE_CHANGED = "IM_INTERNAL_MAX_MESSAGE_CHANGED", e.UNREAD_MESSAGE_CHANGED = "IM_INTERNAL_UNREAD_MESSAGE_CHANGED", e.REMOTE_MESSAGE_RECALLED = "IM_INTERNAL_REMOTE_MESSAGE_RECALLED";}(t.IM_INTERNAL_EVENTS || (t.IM_INTERNAL_EVENTS = {}));}, function (e, t, n) {"use strict";t.__esModule = !0, t.AbstractMessage = void 0;var o = function () {function e() {}return e.prototype.clearUseLessAttribute = function () {delete this.buildOptions;}, e;}();t.AbstractMessage = o;}, function (e, t, n) {"use strict";var _o,r = this && this.__extends || (_o = function o(e, t) {return (_o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.FileMessagePayload = void 0;var i = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t.contentType = "", t.name = "", t.size = 0, t.url = "", t;}return r(t, e), t;}(n(25).AbstractMessagePayload);t.FileMessagePayload = i;}, function (e, t, n) {"use strict";var o,r = this && this.__values || function (e) {var t = "function" == typeof Symbol && Symbol.iterator,n = t && e[t],o = 0;if (n) return n.call(e);if (e && "number" == typeof e.length) return { next: function next() {return e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e };} };throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");};t.__esModule = !0, t.PlatformDetector = t.Platform = void 0, function (e) {e.BROWSER = "BROWSER", e.UNKNOWN = "UNKNOWN", e.APP_IOS = "APP_IOS", e.APP_ANDROID = "APP_ANDROID", e.APPLET_WX = "APPLET_WX", e.APPLET_WX_GAME = "APPLET_WX_GAME", e.APPLET_ALIPAY = "APPLET_ALIPAY", e.APPLET_BYTEDANCE = "APPLET_BYTEDANCE";}(o = t.Platform || (t.Platform = {}));var i = function () {function e() {var e, t, n;this.platform = null, this.methods = ((e = {})[o.BROWSER] = this.isBrowser, e[o.APP_IOS] = this.isAppiOS, e[o.APP_ANDROID] = this.isAppAndroid, e[o.APPLET_WX] = this.isWXApplet, e[o.APPLET_WX_GAME] = this.isWXGameApplet, e);var i = this.methods,s = Object.keys(i);try {for (var a = r(s), u = a.next(); !u.done; u = a.next()) {var c = u.value;if ((0, i[c])()) {this.platform = c;break;}}} catch (l) {t = { error: l };} finally {try {u && !u.done && (n = a["return"]) && n.call(a);} finally {if (t) throw t.error;}}this.platform = this.platform || o.UNKNOWN, this.platform;}return e.currentPlatform = function () {return e.instance.platform;}, e.prototype.isBrowser = function () {return "undefined" != typeof navigator && "undefined" != typeof document && !!document.getElementById && "undefined" == typeof GameGlobal;}, e.prototype.isAppiOS = function () {return "object" == typeof uni && !!uni.getSystemInfoSync && "ios" === uni.getSystemInfoSync().platform && "object" == typeof plus;}, e.prototype.isAppAndroid = function () {return "object" == typeof uni && !!uni.getSystemInfoSync && "android" === uni.getSystemInfoSync().platform && "object" == typeof plus;}, e.prototype.isWXApplet = function () {return "object" == typeof wx && !!wx.getSystemInfoSync && "undefined" == typeof WebSocket && "undefined" == typeof XMLHttpRequest && "undefined" == typeof plus;}, e.prototype.isWXGameApplet = function () {return "object" == typeof GameGlobal;}, e.prototype.isAlipayApplet = function () {return !1;}, e.prototype.isBytedanceApplet = function () {return !1;}, e.prototype.isQQApplet = function () {return !1;}, e.prototype.isBaiduApplet = function () {return !1;}, e.instance = new e(), e;}();t.PlatformDetector = i;}, function (e, t) {t.encode = function (e) {var t = "";for (var n in e) {e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));}return t;}, t.decode = function (e) {for (var t = {}, n = e.split("&"), o = 0, r = n.length; o < r; o++) {var i = n[o].split("=");t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);}return t;};}, function (e, t, n) {"use strict";t.__esModule = !0, t.AbstractMessagePayload = void 0;var o = function () {return function () {};}();t.AbstractMessagePayload = o;}, function (e, t, n) {"use strict";n(9)("socket.io-parser");var o = n(13),r = n(42);function i() {}t.protocol = 4, t.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], t.CONNECT = 0, t.DISCONNECT = 1, t.EVENT = 2, t.ACK = 3, t.ERROR = 4, t.BINARY_EVENT = 5, t.BINARY_ACK = 6, t.Encoder = i, t.Decoder = a;var s = t.ERROR + '"encode error"';function a() {this.reconstructor = null;}function u(e) {this.reconPack = e, this.buffers = [];}function c(e) {return { type: t.ERROR, data: "parser error: " + e };}i.prototype.encode = function (e, n) {n([function (e) {var n = "" + e.type;t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type || (n += e.attachments + "-");e.nsp && "/" !== e.nsp && (n += e.nsp + ",");null != e.id && (n += e.id);if (null != e.data) {var o = function (e) {try {return JSON.stringify(e);} catch (t) {return !1;}}(e.data);if (!1 === o) return s;n += o;}return n;}(e)]);}, o(a.prototype), a.prototype.add = function (e) {var n;if ("string" != typeof e) throw new Error("Unknown type: " + e);n = function (e) {var n = 0,o = { type: Number(e.charAt(0)) };if (null == t.types[o.type]) return c("unknown packet type " + o.type);if (t.BINARY_EVENT === o.type || t.BINARY_ACK === o.type) {for (var i = ""; "-" !== e.charAt(++n) && (i += e.charAt(n), n != e.length);) {;}if (i != Number(i) || "-" !== e.charAt(n)) throw new Error("Illegal attachments");o.attachments = Number(i);}if ("/" === e.charAt(n + 1)) for (o.nsp = ""; ++n;) {var s = e.charAt(n);if ("," === s) break;if (o.nsp += s, n === e.length) break;} else o.nsp = "/";var a = e.charAt(n + 1);if ("" !== a && Number(a) == a) {for (o.id = ""; ++n;) {var s = e.charAt(n);if (null == s || Number(s) != s) {--n;break;}if (o.id += e.charAt(n), n === e.length) break;}o.id = Number(o.id);}if (e.charAt(++n)) {var u = function (e) {try {return JSON.parse(e);} catch (t) {return !1;}}(e.substr(n)),l = !1 !== u && (o.type === t.ERROR || r(u));if (!l) return c("invalid payload");o.data = u;}return o;}(e), this.emit("decoded", n);}, a.prototype.destroy = function () {this.reconstructor && this.reconstructor.finishedReconstruction();}, u.prototype.takeBinaryData = function (e) {if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {var t = binary.reconstructPacket(this.reconPack, this.buffers);return this.finishedReconstruction(), t;}return null;}, u.prototype.finishedReconstruction = function () {this.reconPack = null, this.buffers = [];};}, function (e, t, n) {"use strict";t.__esModule = !0, t.uniApp = void 0;var o = n(18),r = new (function () {function e() {this.uniAppRunningBackend = !1, this.listenAppRunning();}return e.prototype.listenAppRunning = function () {var e = this;o.FrameworkDetector.currentFramework() === o.Framework.UNIAPP && "object" == typeof plus && (plus.globalEvent.addEventListener("resume", function () {e.uniAppRunningBackend = !1, e.uniAppRunningBackend;}, !1), plus.globalEvent.addEventListener("pause", function () {e.uniAppRunningBackend = !0, e.uniAppRunningBackend;}, !1));}, e.prototype.runningBackend = function () {return this.uniAppRunningBackend;}, e;}())();t.uniApp = r;}, function (e, t) {var n;n = function () {return this;}();try {n = n || new Function("return this")();} catch (o) {"object" == typeof window && (n = window);}e.exports = n;}, function (e, t, n) {"use strict";var o = n(14),r = n(13);function i(e) {this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.forceNode = e.forceNode, this.isReactNative = e.isReactNative, this.extraHeaders = e.extraHeaders, this.localAddress = e.localAddress;}e.exports = i, r(i.prototype), i.prototype.onError = function (e, t) {var n = new Error(e);return n.type = "TransportError", n.description = t, this.emit("error", n), this;}, i.prototype.open = function () {return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this;}, i.prototype.close = function () {return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this;}, i.prototype.send = function (e) {if ("open" !== this.readyState) throw new Error("Transport not open");this.write(e);}, i.prototype.onOpen = function () {this.readyState = "open", this.writable = !0, this.emit("open");}, i.prototype.onData = function (e) {var t = o.decodePacket(e, this.socket.binaryType);this.onPacket(t);}, i.prototype.onPacket = function (e) {this.emit("packet", e);}, i.prototype.onClose = function () {this.readyState = "closed", this.emit("close");};}, function (e, t) {e.exports = function (e, t) {var n = function n() {};n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}();var i = new (function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e);}return r(e, [{ key: "isUndef", value: function value(e) {return e === undefined || null === e;} }, { key: "isTrue", value: function value(e) {return !0 === e;} }, { key: "isFalse", value: function value(e) {return !1 === e;} }, { key: "isPrimitive", value: function value(e) {return "string" == typeof e || "number" == typeof e || "symbol" === (void 0 === e ? "undefined" : o(e)) || "boolean" == typeof e;} }, { key: "isDef", value: function value(e) {return e !== undefined && null !== e;} }, { key: "isObject", value: function value(e) {return null !== e && "object" === (void 0 === e ? "undefined" : o(e));} }, { key: "isPlainObject", value: function value(e) {return "[object Object]" === Object.prototype.toString.call(e);} }, { key: "isRegExp", value: function value(e) {return "[object RegExp]" === Object.prototype.toString.call(e);} }, { key: "isValidArrayIndex", value: function value(e) {var t = parseFloat(String(e));return t >= 0 && Math.floor(t) === t && isFinite(e);} }, { key: "isStringOrNumber", value: function value(e) {return "string" == typeof e || "number" == typeof e;} }, { key: "isString", value: function value(e) {return "string" == typeof e;} }, { key: "isNumber", value: function value(e) {return "number" == typeof e;} }, { key: "isArray", value: function value(e) {return "[object Array]" === Object.prototype.toString.call(e);} }, { key: "isEmpty", value: function value(e) {return this.isArray(e) ? 0 == e.length : this.isObject(e) ? !this.isDef(e) : !this.isNumber(e) && (this.isString(e) ? "" == e.trim() : !this.isDef(e));} }, { key: "isNative", value: function value(e) {return "function" == typeof e && /native code/.test(e.toString());} }, { key: "isFunction", value: function value(e) {return "function" == typeof e;} }, { key: "isBoolean", value: function value(e) {return "boolean" == typeof e;} }]), e;}())();t.calibrator = i;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}();var r = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e);}return o(e, [{ key: "upload", value: function value(e) {throw Error("Not implementation yet.");} }]), e;}();t["default"] = r;}, function (e, t, n) {"use strict";t.__esModule = !0, t.RemoteAbbrMessageBuilder = void 0;var o = n(2),r = n(58),i = n(59),s = function () {function e() {}return e.prototype.build = function (e) {var t;return e.t === o.Scene.PRIVATE ? ((t = new r.PrivateMessage()).read = !1, t.receiverId = e.r) : e.t === o.Scene.GROUP && ((t = new i.GroupMessage()).groupId = e.r, t.senderData = e.d ? JSON.parse(e.d) : {}), t.senderId = e.s, t.messageId = e.i, t.timestamp = e.ts, t.type = e.mt, t.payload = JSON.parse(e.p), t.recalled = e.rc, t.status = o.MessageStatus.SUCCESS, t;}, e;}();t.RemoteAbbrMessageBuilder = s;}, function (e, t, n) {"use strict";var _o2,r = this && this.__extends || (_o2 = function o(e, t) {return (_o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o2(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.ImageMessagePayload = void 0;var i = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t.width = 0, t.height = 0, t;}return r(t, e), t;}(n(22).FileMessagePayload);t.ImageMessagePayload = i;}, function (e, t, n) {"use strict";var _o3,r = this && this.__extends || (_o3 = function o(e, t) {return (_o3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o3(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(11),s = n(22),a = n(0),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new s.FileMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = t,o = e.createOptions.file;n.url = o.path, n.name = o.name, n.size = o.size, n.contentType = o.type, e.complete = Promise.resolve();}, t.prototype.validate = function (e) {if (!a.calibrator.isObject(e)) throw Error("it is an empty message.");if (!a.calibrator.isDef(e.file)) throw Error("file is empty.");}, t;}(i.AbstractPayloadBuilder);t["default"] = u;}, function (e, t, n) {"use strict";var _o4,r = this && this.__extends || (_o4 = function o(e, t) {return (_o4 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o4(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.AudioMessagePayload = void 0;var i = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t.duration = 0, t;}return r(t, e), t;}(n(22).FileMessagePayload);t.AudioMessagePayload = i;}, function (e, t, n) {"use strict";var _o5,r = this && this.__extends || (_o5 = function o(e, t) {return (_o5 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o5(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.VideoMessagePayload = void 0;var i = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t.video = new a(), t.thumbnail = new s(), t;}return r(t, e), t;}(n(25).AbstractMessagePayload);t.VideoMessagePayload = i;var s = function () {return function () {this.name = "", this.url = "", this.width = 0, this.height = 0, this.contentType = "";};}(),a = function () {return function () {this.name = "", this.url = "", this.width = 0, this.height = 0, this.contentType = "", this.size = 0, this.duration = 0;};}();}, function (e, t, n) {"use strict";var _o6,r = this && this.__extends || (_o6 = function o(e, t) {return (_o6 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o6(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(11),s = n(22),a = n(0),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new s.FileMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = t,o = e.createOptions.file;n.url = o.fullPath, n.name = o.name, n.size = o.size, n.contentType = o.type, o.type, e.complete = Promise.resolve();}, t.prototype.validate = function (e) {if (!a.calibrator.isObject(e)) throw Error("it is an empty message.");if (!a.calibrator.isDef(e.file)) throw Error("file is empty.");}, t;}(i.AbstractPayloadBuilder);t["default"] = u;}, function (e, t, n) {"use strict";var _o7,r = this && this.__extends || (_o7 = function o(e, t) {return (_o7 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o7(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(11),s = n(22),a = n(7),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new s.FileMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = t,o = e.createOptions.file,r = window.URL || window.webkitURL;n.url = r.createObjectURL(o), n.name = o.name, n.size = o.size, n.contentType = o.type;}, t.prototype.validate = function (e) {if (!a.calibrator.isObject(e)) throw Error("it is an empty message.");if (!(e.file instanceof File)) throw Error("wrong file type.");if (0 == e.file.size) throw Error("File size is 0.");if (e.file.size > 31457280) throw Error("message-length limit 30mib");}, t;}(i.AbstractPayloadBuilder);t["default"] = u;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = c(n(12)),i = c(n(1)),s = c(n(67)),a = c(n(68)),u = n(0);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.io = a["default"], this.status = r["default"].DISCONNECTED, this.permissions = [i["default"].NONE], this.emitter = null, this.connectedObservers = [], this.disconnectedObservers = [], this.emitter = new s["default"](this);}return o(e, [{ key: "connect", value: function value() {this.status = r["default"].CONNECTING;} }, { key: "emit", value: function value(e) {this.emitter.emit(e);} }, { key: "doEmit", value: function value(e, t, n) {} }, { key: "on", value: function value(e, t) {this.io.on(e, t);} }, { key: "disconnect", value: function value() {this.io.disconnect();} }, { key: "getStatus", value: function value() {return this.status;} }, { key: "addConnectedObserver", value: function value(e) {u.calibrator.isFunction(e) && this.connectedObservers.push(e);} }, { key: "addDisconnectedObserver", value: function value(e) {u.calibrator.isFunction(e) && this.disconnectedObservers.push(e);} }, { key: "notify", value: function value(e, t) {for (var n = 0; n < e.length; n++) {e[n](t);}} }]), e;}();t["default"] = l;}, function (e, t) {var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];e.exports = function (e) {var t = e,r = e.indexOf("["),i = e.indexOf("]");-1 != r && -1 != i && (e = e.substring(0, r) + e.substring(r, i).replace(/:/g, ";") + e.substring(i, e.length));for (var s = n.exec(e || ""), a = {}, u = 14; u--;) {a[o[u]] = s[u] || "";}return -1 != r && -1 != i && (a.source = t, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a;};}, function (e, t) {var n = {}.toString;e.exports = Array.isArray || function (e) {return "[object Array]" == n.call(e);};}, function (e, t, n) {"use strict";var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},r = n(27),i = n(70),s = n(49),a = n(13),u = n(26),c = n(50),l = n(51),f = (n(9)("socket.io-client:manager"), n(48)),p = n(86),h = n(52).GoEasyDomainNumber,d = Object.prototype.hasOwnProperty;function y(e, t) {if (!(this instanceof y)) return new y(e, t);e && "object" === (void 0 === e ? "undefined" : o(e)) && (t = e, e = undefined), (t = t || {}).path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || Infinity), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new p({ min: this.reconnectionDelay(), max: this.reconnectionDelayMax(), jitter: this.randomizationFactor() }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];var n = t.parser || u;this.encoder = new n.Encoder(), this.decoder = new n.Decoder(), this.autoConnect = !1 !== t.autoConnect, this.autoConnect && this.open();}function m() {var e = !1;return "object" === ("undefined" == typeof uni ? "undefined" : o(uni)) && uni.getSystemInfo && (e = !0), e && r.uniApp.runningBackend();}e.exports = y, y.prototype.emitAll = function () {for (var e in this.emit.apply(this, arguments), this.nsps) {d.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments);}}, y.prototype.updateSocketIds = function () {for (var e in this.nsps) {d.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e));}}, y.prototype.generateId = function (e) {return ("/" === e ? "" : e + "#") + this.engine.id;}, a(y.prototype), y.prototype.reconnection = function (e) {return arguments.length ? (this._reconnection = !!e, this) : this._reconnection;}, y.prototype.reconnectionAttempts = function (e) {return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts;}, y.prototype.reconnectionDelay = function (e) {return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay;}, y.prototype.randomizationFactor = function (e) {return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor;}, y.prototype.reconnectionDelayMax = function (e) {return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax;}, y.prototype.timeout = function (e) {return arguments.length ? (this._timeout = e, this) : this._timeout;}, y.prototype.maybeReconnectOnOpen = function () {!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();}, y.prototype.open = y.prototype.connect = function (e, t) {if (this.readyState, ~this.readyState.indexOf("open")) return this;this.uri, this.engine = i(this.uri, this.opts);var n = this.engine,o = this;this.readyState = "opening", this.skipReconnect = !1;var r = c(n, "open", function () {o.onopen(), e && e();}),s = c(n, "error", function (t) {if ("undefined" != typeof window) {var n = parseInt(o.uri.match(/[1-9][0-9]*/g)[0]),r = h.refreshNumber();o.uri = o.uri.replace(n, r);}if (o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", t), e) {var i = new Error("Connection error");i.data = t, e(i);} else o.maybeReconnectOnOpen();});if (!1 !== this._timeout) {var a = this._timeout,u = setTimeout(function () {r.destroy(), n.close(), n.emit("error", "timeout"), o.emitAll("connect_timeout", a);}, a);this.subs.push({ destroy: function destroy() {clearTimeout(u);} });}return this.subs.push(r), this.subs.push(s), this;}, y.prototype.onopen = function () {this.cleanup(), this.readyState = "open", this.emit("open");var e = this.engine;this.subs.push(c(e, "data", l(this, "ondata"))), this.subs.push(c(e, "ping", l(this, "onping"))), this.subs.push(c(e, "pong", l(this, "onpong"))), this.subs.push(c(e, "error", l(this, "onerror"))), this.subs.push(c(e, "close", l(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", l(this, "ondecoded")));}, y.prototype.onping = function () {this.lastPing = new Date(), this.emitAll("ping");}, y.prototype.onpong = function () {this.emitAll("pong", new Date() - this.lastPing);}, y.prototype.ondata = function (e) {this.decoder.add(e);}, y.prototype.ondecoded = function (e) {this.emit("packet", e);}, y.prototype.onerror = function (e) {this.emitAll("error", e);}, y.prototype.socket = function (e, t) {var n = this.nsps[e];if (!n) {n = new s(this, e, t), this.nsps[e] = n;var o = this;n.on("connecting", r), n.on("connect", function () {n.id = o.generateId(e);}), this.autoConnect && r();}function r() {~f(o.connecting, n) || o.connecting.push(n);}return n;}, y.prototype.destroy = function (e) {var t = f(this.connecting, e);~t && this.connecting.splice(t, 1), this.connecting.length || this.close();}, y.prototype.packet = function (e) {var t = this;e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, function (n) {for (var o = 0; o < n.length; o++) {t.engine.write(n[o], e.options);}t.encoding = !1, t.processPacketQueue();}));}, y.prototype.processPacketQueue = function () {if (this.packetBuffer.length > 0 && !this.encoding) {var e = this.packetBuffer.shift();this.packet(e);}}, y.prototype.cleanup = function () {for (var e = this.subs.length, t = 0; t < e; t++) {this.subs.shift().destroy();}this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();}, y.prototype.close = y.prototype.disconnect = function () {this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();}, y.prototype.onclose = function (e) {this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect();}, y.prototype.reconnect = function () {if (m(), this.reconnecting || this.skipReconnect) return this;var e = this;if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;else {var t = this.backoff.duration();this.reconnecting = !0;var n = setTimeout(function () {e.skipReconnect || (e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || (m() ? (e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", "Uniapp running backend, skipped reconnect...")) : e.open(function (t) {t ? (e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : e.onreconnect();})));}, t);this.subs.push({ destroy: function destroy() {clearTimeout(n);} });}}, y.prototype.onreconnect = function () {var e = this.backoff.attempts;this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e);};}, function (e, t, n) {"use strict";var o = n(72),r = n(83);t.polling = function (e) {var t = !1,n = !1;e.jsonp;if ("undefined" != typeof location) {var r = "https:" === location.protocol,i = location.port;i || (i = r ? 443 : 80), t = e.hostname !== location.hostname || i !== e.port, n = e.secure !== r;}return e.xdomain = t, e.xscheme = n, new o(e);}, t.websocket = r;}, function (e, t, n) {(function (t) {var o = n(42),r = Object.prototype.toString,i = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === r.call(Blob),s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === r.call(File);e.exports = function a(e) {if (!e || "object" != typeof e) return !1;if (o(e)) {for (var n = 0, r = e.length; n < r; n++) {if (a(e[n])) return !0;}return !1;}if ("function" == typeof t && t.isBuffer && t.isBuffer(e) || "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || i && e instanceof Blob || s && e instanceof File) return !0;if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return a(e.toJSON(), !0);for (var u in e) {if (Object.prototype.hasOwnProperty.call(e, u) && a(e[u])) return !0;}return !1;};}).call(this, n(46).Buffer);}, function (e, t, n) {"use strict";(function (e) {var o = n(75),r = n(76),i = n(77);function s() {return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;}function a(e, t) {if (s() < t) throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = u.prototype : (null === e && (e = new u(t)), e.length = t), e;}function u(e, t, n) {if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(e, t, n);if ("number" == typeof e) {if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");return f(this, e);}return c(this, e, t, n);}function c(e, t, n, o) {if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, n, o) {if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");if (t.byteLength < n + (o || 0)) throw new RangeError("'length' is out of bounds");t = n === undefined && o === undefined ? new Uint8Array(t) : o === undefined ? new Uint8Array(t, n) : new Uint8Array(t, n, o);u.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = u.prototype : e = p(e, t);return e;}(e, t, n, o) : "string" == typeof t ? function (e, t, n) {"string" == typeof n && "" !== n || (n = "utf8");if (!u.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');var o = 0 | d(t, n),r = (e = a(e, o)).write(t, n);r !== o && (e = e.slice(0, r));return e;}(e, t, n) : function (e, t) {if (u.isBuffer(t)) {var n = 0 | h(t.length);return 0 === (e = a(e, n)).length ? e : (t.copy(e, 0, 0, n), e);}if (t) {if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (o = t.length) != o ? a(e, 0) : p(e, t);if ("Buffer" === t.type && i(t.data)) return p(e, t.data);}var o;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");}(e, t);}function l(e) {if ("number" != typeof e) throw new TypeError('"size" argument must be a number');if (e < 0) throw new RangeError('"size" argument must not be negative');}function f(e, t) {if (l(t), e = a(e, t < 0 ? 0 : 0 | h(t)), !u.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) {e[n] = 0;}return e;}function p(e, t) {var n = t.length < 0 ? 0 : 0 | h(t.length);e = a(e, n);for (var o = 0; o < n; o += 1) {e[o] = 255 & t[o];}return e;}function h(e) {if (e >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");return 0 | e;}function d(e, t) {if (u.isBuffer(e)) return e.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;"string" != typeof e && (e = "" + e);var n = e.length;if (0 === n) return 0;for (var o = !1;;) {switch (t) {case "ascii":case "latin1":case "binary":return n;case "utf8":case "utf-8":case undefined:return G(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return 2 * n;case "hex":return n >>> 1;case "base64":return L(e).length;default:if (o) return G(e).length;t = ("" + t).toLowerCase(), o = !0;}}}function y(e, t, n) {var o = e[t];e[t] = e[n], e[n] = o;}function m(e, t, n, o, r) {if (0 === e.length) return -1;if ("string" == typeof n ? (o = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = r ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {if (r) return -1;n = e.length - 1;} else if (n < 0) {if (!r) return -1;n = 0;}if ("string" == typeof t && (t = u.from(t, o)), u.isBuffer(t)) return 0 === t.length ? -1 : v(e, t, n, o, r);if ("number" == typeof t) return t &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? r ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : v(e, [t], n, o, r);throw new TypeError("val must be string, number or Buffer");}function v(e, t, n, o, r) {var i,s = 1,a = e.length,u = t.length;if (o !== undefined && ("ucs2" === (o = String(o).toLowerCase()) || "ucs-2" === o || "utf16le" === o || "utf-16le" === o)) {if (e.length < 2 || t.length < 2) return -1;s = 2, a /= 2, u /= 2, n /= 2;}function c(e, t) {return 1 === s ? e[t] : e.readUInt16BE(t * s);}if (r) {var l = -1;for (i = n; i < a; i++) {if (c(e, i) === c(t, -1 === l ? 0 : i - l)) {if (-1 === l && (l = i), i - l + 1 === u) return l * s;} else -1 !== l && (i -= i - l), l = -1;}} else for (n + u > a && (n = a - u), i = n; i >= 0; i--) {for (var f = !0, p = 0; p < u; p++) {if (c(e, i + p) !== c(t, p)) {f = !1;break;}}if (f) return i;}return -1;}function g(e, t, n, o) {n = Number(n) || 0;var r = e.length - n;o ? (o = Number(o)) > r && (o = r) : o = r;var i = t.length;if (i % 2 != 0) throw new TypeError("Invalid hex string");o > i / 2 && (o = i / 2);for (var s = 0; s < o; ++s) {var a = parseInt(t.substr(2 * s, 2), 16);if (isNaN(a)) return s;e[n + s] = a;}return s;}function b(e, t, n, o) {return q(G(t, e.length - n), e, n, o);}function E(e, t, n, o) {return q(function (e) {for (var t = [], n = 0; n < e.length; ++n) {t.push(255 & e.charCodeAt(n));}return t;}(t), e, n, o);}function _(e, t, n, o) {return E(e, t, n, o);}function S(e, t, n, o) {return q(L(t), e, n, o);}function w(e, t, n, o) {return q(function (e, t) {for (var n, o, r, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) {n = e.charCodeAt(s), o = n >> 8, r = n % 256, i.push(r), i.push(o);}return i;}(t, e.length - n), e, n, o);}function O(e, t, n) {return 0 === t && n === e.length ? o.fromByteArray(e) : o.fromByteArray(e.slice(t, n));}function M(e, t, n) {n = Math.min(e.length, n);for (var o = [], r = t; r < n;) {var i,s,a,u,c = e[r],l = null,f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;if (r + f <= n) switch (f) {case 1:c < 128 && (l = c);break;case 2:128 == (192 & (i = e[r + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (l = u);break;case 3:i = e[r + 1], s = e[r + 2], 128 == (192 & i) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (l = u);break;case 4:i = e[r + 1], s = e[r + 2], a = e[r + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (l = u);}null === l ? (l = 65533, f = 1) : l > 65535 && (l -= 65536, o.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), o.push(l), r += f;}return function (e) {var t = e.length;if (t <= T) return String.fromCharCode.apply(String, e);var n = "",o = 0;for (; o < t;) {n += String.fromCharCode.apply(String, e.slice(o, o += T));}return n;}(o);}t.Buffer = u, t.SlowBuffer = function (e) {+e != e && (e = 0);return u.alloc(+e);}, t.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = e.TYPED_ARRAY_SUPPORT !== undefined ? e.TYPED_ARRAY_SUPPORT : function () {try {var e = new Uint8Array(1);return e.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {return 42;} }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;} catch (t) {return !1;}}(), t.kMaxLength = s(), u.poolSize = 8192, u._augment = function (e) {return e.__proto__ = u.prototype, e;}, u.from = function (e, t, n) {return c(null, e, t, n);}, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, { value: null, configurable: !0 })), u.alloc = function (e, t, n) {return function (e, t, n, o) {return l(t), t <= 0 ? a(e, t) : n !== undefined ? "string" == typeof o ? a(e, t).fill(n, o) : a(e, t).fill(n) : a(e, t);}(null, e, t, n);}, u.allocUnsafe = function (e) {return f(null, e);}, u.allocUnsafeSlow = function (e) {return f(null, e);}, u.isBuffer = function (e) {return !(null == e || !e._isBuffer);}, u.compare = function (e, t) {if (!u.isBuffer(e) || !u.isBuffer(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var n = e.length, o = t.length, r = 0, i = Math.min(n, o); r < i; ++r) {if (e[r] !== t[r]) {n = e[r], o = t[r];break;}}return n < o ? -1 : o < n ? 1 : 0;}, u.isEncoding = function (e) {switch (String(e).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return !0;default:return !1;}}, u.concat = function (e, t) {if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === e.length) return u.alloc(0);var n;if (t === undefined) for (t = 0, n = 0; n < e.length; ++n) {t += e[n].length;}var o = u.allocUnsafe(t),r = 0;for (n = 0; n < e.length; ++n) {var s = e[n];if (!u.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');s.copy(o, r), r += s.length;}return o;}, u.byteLength = d, u.prototype._isBuffer = !0, u.prototype.swap16 = function () {var e = this.length;if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var t = 0; t < e; t += 2) {y(this, t, t + 1);}return this;}, u.prototype.swap32 = function () {var e = this.length;if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var t = 0; t < e; t += 4) {y(this, t, t + 3), y(this, t + 1, t + 2);}return this;}, u.prototype.swap64 = function () {var e = this.length;if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var t = 0; t < e; t += 8) {y(this, t, t + 7), y(this, t + 1, t + 6), y(this, t + 2, t + 5), y(this, t + 3, t + 4);}return this;}, u.prototype.toString = function () {var e = 0 | this.length;return 0 === e ? "" : 0 === arguments.length ? M(this, 0, e) : function (e, t, n) {var o = !1;if ((t === undefined || t < 0) && (t = 0), t > this.length) return "";if ((n === undefined || n > this.length) && (n = this.length), n <= 0) return "";if ((n >>>= 0) <= (t >>>= 0)) return "";for (e || (e = "utf8");;) {switch (e) {case "hex":return P(this, t, n);case "utf8":case "utf-8":return M(this, t, n);case "ascii":return k(this, t, n);case "latin1":case "binary":return I(this, t, n);case "base64":return O(this, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return A(this, t, n);default:if (o) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), o = !0;}}}.apply(this, arguments);}, u.prototype.equals = function (e) {if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");return this === e || 0 === u.compare(this, e);}, u.prototype.inspect = function () {var e = "",n = t.INSPECT_MAX_BYTES;return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (e += " ... ")), "<Buffer " + e + ">";}, u.prototype.compare = function (e, t, n, o, r) {if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");if (t === undefined && (t = 0), n === undefined && (n = e ? e.length : 0), o === undefined && (o = 0), r === undefined && (r = this.length), t < 0 || n > e.length || o < 0 || r > this.length) throw new RangeError("out of range index");if (o >= r && t >= n) return 0;if (o >= r) return -1;if (t >= n) return 1;if (t >>>= 0, n >>>= 0, o >>>= 0, r >>>= 0, this === e) return 0;for (var i = r - o, s = n - t, a = Math.min(i, s), c = this.slice(o, r), l = e.slice(t, n), f = 0; f < a; ++f) {if (c[f] !== l[f]) {i = c[f], s = l[f];break;}}return i < s ? -1 : s < i ? 1 : 0;}, u.prototype.includes = function (e, t, n) {return -1 !== this.indexOf(e, t, n);}, u.prototype.indexOf = function (e, t, n) {return m(this, e, t, n, !0);}, u.prototype.lastIndexOf = function (e, t, n) {return m(this, e, t, n, !1);}, u.prototype.write = function (e, t, n, o) {if (t === undefined) o = "utf8", n = this.length, t = 0;else if (n === undefined && "string" == typeof t) o = t, n = this.length, t = 0;else {if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t |= 0, isFinite(n) ? (n |= 0, o === undefined && (o = "utf8")) : (o = n, n = undefined);}var r = this.length - t;if ((n === undefined || n > r) && (n = r), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");o || (o = "utf8");for (var i = !1;;) {switch (o) {case "hex":return g(this, e, t, n);case "utf8":case "utf-8":return b(this, e, t, n);case "ascii":return E(this, e, t, n);case "latin1":case "binary":return _(this, e, t, n);case "base64":return S(this, e, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return w(this, e, t, n);default:if (i) throw new TypeError("Unknown encoding: " + o);o = ("" + o).toLowerCase(), i = !0;}}}, u.prototype.toJSON = function () {return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };};var T = 4096;function k(e, t, n) {var o = "";n = Math.min(e.length, n);for (var r = t; r < n; ++r) {o += String.fromCharCode(127 & e[r]);}return o;}function I(e, t, n) {var o = "";n = Math.min(e.length, n);for (var r = t; r < n; ++r) {o += String.fromCharCode(e[r]);}return o;}function P(e, t, n) {var o = e.length;(!t || t < 0) && (t = 0), (!n || n < 0 || n > o) && (n = o);for (var r = "", i = t; i < n; ++i) {r += B(e[i]);}return r;}function A(e, t, n) {for (var o = e.slice(t, n), r = "", i = 0; i < o.length; i += 2) {r += String.fromCharCode(o[i] + 256 * o[i + 1]);}return r;}function C(e, t, n) {if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");if (e + t > n) throw new RangeError("Trying to access beyond buffer length");}function R(e, t, n, o, r, i) {if (!u.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');if (t > r || t < i) throw new RangeError('"value" argument is out of bounds');if (n + o > e.length) throw new RangeError("Index out of range");}function N(e, t, n, o) {t < 0 && (t = 65535 + t + 1);for (var r = 0, i = Math.min(e.length - n, 2); r < i; ++r) {e[n + r] = (t & 255 << 8 * (o ? r : 1 - r)) >>> 8 * (o ? r : 1 - r);}}function D(e, t, n, o) {t < 0 && (t = 4294967295 + t + 1);for (var r = 0, i = Math.min(e.length - n, 4); r < i; ++r) {e[n + r] = t >>> 8 * (o ? r : 3 - r) & 255;}}function x(e, t, n, o, r, i) {if (n + o > e.length) throw new RangeError("Index out of range");if (n < 0) throw new RangeError("Index out of range");}function U(e, t, n, o, i) {return i || x(e, 0, n, 4), r.write(e, t, n, o, 23, 4), n + 4;}function j(e, t, n, o, i) {return i || x(e, 0, n, 8), r.write(e, t, n, o, 52, 8), n + 8;}u.prototype.slice = function (e, t) {var n,o = this.length;if (e = ~~e, t = t === undefined ? o : ~~t, e < 0 ? (e += o) < 0 && (e = 0) : e > o && (e = o), t < 0 ? (t += o) < 0 && (t = 0) : t > o && (t = o), t < e && (t = e), u.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = u.prototype;else {var r = t - e;n = new u(r, undefined);for (var i = 0; i < r; ++i) {n[i] = this[i + e];}}return n;}, u.prototype.readUIntLE = function (e, t, n) {e |= 0, t |= 0, n || C(e, t, this.length);for (var o = this[e], r = 1, i = 0; ++i < t && (r *= 256);) {o += this[e + i] * r;}return o;}, u.prototype.readUIntBE = function (e, t, n) {e |= 0, t |= 0, n || C(e, t, this.length);for (var o = this[e + --t], r = 1; t > 0 && (r *= 256);) {o += this[e + --t] * r;}return o;}, u.prototype.readUInt8 = function (e, t) {return t || C(e, 1, this.length), this[e];}, u.prototype.readUInt16LE = function (e, t) {return t || C(e, 2, this.length), this[e] | this[e + 1] << 8;}, u.prototype.readUInt16BE = function (e, t) {return t || C(e, 2, this.length), this[e] << 8 | this[e + 1];}, u.prototype.readUInt32LE = function (e, t) {return t || C(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];}, u.prototype.readUInt32BE = function (e, t) {return t || C(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);}, u.prototype.readIntLE = function (e, t, n) {e |= 0, t |= 0, n || C(e, t, this.length);for (var o = this[e], r = 1, i = 0; ++i < t && (r *= 256);) {o += this[e + i] * r;}return o >= (r *= 128) && (o -= Math.pow(2, 8 * t)), o;}, u.prototype.readIntBE = function (e, t, n) {e |= 0, t |= 0, n || C(e, t, this.length);for (var o = t, r = 1, i = this[e + --o]; o > 0 && (r *= 256);) {i += this[e + --o] * r;}return i >= (r *= 128) && (i -= Math.pow(2, 8 * t)), i;}, u.prototype.readInt8 = function (e, t) {return t || C(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];}, u.prototype.readInt16LE = function (e, t) {t || C(e, 2, this.length);var n = this[e] | this[e + 1] << 8;return 32768 & n ? 4294901760 | n : n;}, u.prototype.readInt16BE = function (e, t) {t || C(e, 2, this.length);var n = this[e + 1] | this[e] << 8;return 32768 & n ? 4294901760 | n : n;}, u.prototype.readInt32LE = function (e, t) {return t || C(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;}, u.prototype.readInt32BE = function (e, t) {return t || C(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];}, u.prototype.readFloatLE = function (e, t) {return t || C(e, 4, this.length), r.read(this, e, !0, 23, 4);}, u.prototype.readFloatBE = function (e, t) {return t || C(e, 4, this.length), r.read(this, e, !1, 23, 4);}, u.prototype.readDoubleLE = function (e, t) {return t || C(e, 8, this.length), r.read(this, e, !0, 52, 8);}, u.prototype.readDoubleBE = function (e, t) {return t || C(e, 8, this.length), r.read(this, e, !1, 52, 8);}, u.prototype.writeUIntLE = function (e, t, n, o) {(e = +e, t |= 0, n |= 0, o) || R(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);var r = 1,i = 0;for (this[t] = 255 & e; ++i < n && (r *= 256);) {this[t + i] = e / r & 255;}return t + n;}, u.prototype.writeUIntBE = function (e, t, n, o) {(e = +e, t |= 0, n |= 0, o) || R(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);var r = n - 1,i = 1;for (this[t + r] = 255 & e; --r >= 0 && (i *= 256);) {this[t + r] = e / i & 255;}return t + n;}, u.prototype.writeUInt8 = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;}, u.prototype.writeUInt16LE = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : N(this, e, t, !0), t + 2;}, u.prototype.writeUInt16BE = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : N(this, e, t, !1), t + 2;}, u.prototype.writeUInt32LE = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : D(this, e, t, !0), t + 4;}, u.prototype.writeUInt32BE = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : D(this, e, t, !1), t + 4;}, u.prototype.writeIntLE = function (e, t, n, o) {if (e = +e, t |= 0, !o) {var r = Math.pow(2, 8 * n - 1);R(this, e, t, n, r - 1, -r);}var i = 0,s = 1,a = 0;for (this[t] = 255 & e; ++i < n && (s *= 256);) {e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;}return t + n;}, u.prototype.writeIntBE = function (e, t, n, o) {if (e = +e, t |= 0, !o) {var r = Math.pow(2, 8 * n - 1);R(this, e, t, n, r - 1, -r);}var i = n - 1,s = 1,a = 0;for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) {e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;}return t + n;}, u.prototype.writeInt8 = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;}, u.prototype.writeInt16LE = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : N(this, e, t, !0), t + 2;}, u.prototype.writeInt16BE = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : N(this, e, t, !1), t + 2;}, u.prototype.writeInt32LE = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : D(this, e, t, !0), t + 4;}, u.prototype.writeInt32BE = function (e, t, n) {return e = +e, t |= 0, n || R(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : D(this, e, t, !1), t + 4;}, u.prototype.writeFloatLE = function (e, t, n) {return U(this, e, t, !0, n);}, u.prototype.writeFloatBE = function (e, t, n) {return U(this, e, t, !1, n);}, u.prototype.writeDoubleLE = function (e, t, n) {return j(this, e, t, !0, n);}, u.prototype.writeDoubleBE = function (e, t, n) {return j(this, e, t, !1, n);}, u.prototype.copy = function (e, t, n, o) {if (n || (n = 0), o || 0 === o || (o = this.length), t >= e.length && (t = e.length), t || (t = 0), o > 0 && o < n && (o = n), o === n) return 0;if (0 === e.length || 0 === this.length) return 0;if (t < 0) throw new RangeError("targetStart out of bounds");if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");if (o < 0) throw new RangeError("sourceEnd out of bounds");o > this.length && (o = this.length), e.length - t < o - n && (o = e.length - t + n);var r,i = o - n;if (this === e && n < t && t < o) for (r = i - 1; r >= 0; --r) {e[r + t] = this[r + n];} else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (r = 0; r < i; ++r) {e[r + t] = this[r + n];} else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);return i;}, u.prototype.fill = function (e, t, n, o) {if ("string" == typeof e) {if ("string" == typeof t ? (o = t, t = 0, n = this.length) : "string" == typeof n && (o = n, n = this.length), 1 === e.length) {var r = e.charCodeAt(0);r < 256 && (e = r);}if (o !== undefined && "string" != typeof o) throw new TypeError("encoding must be a string");if ("string" == typeof o && !u.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);} else "number" == typeof e && (e &= 255);if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");if (n <= t) return this;var i;if (t >>>= 0, n = n === undefined ? this.length : n >>> 0, e || (e = 0), "number" == typeof e) for (i = t; i < n; ++i) {this[i] = e;} else {var s = u.isBuffer(e) ? e : G(new u(e, o).toString()),a = s.length;for (i = 0; i < n - t; ++i) {this[i + t] = s[i % a];}}return this;};var F = /[^+\/0-9A-Za-z-_]/g;function B(e) {return e < 16 ? "0" + e.toString(16) : e.toString(16);}function G(e, t) {var n;t = t || Infinity;for (var o = e.length, r = null, i = [], s = 0; s < o; ++s) {if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {if (!r) {if (n > 56319) {(t -= 3) > -1 && i.push(239, 191, 189);continue;}if (s + 1 === o) {(t -= 3) > -1 && i.push(239, 191, 189);continue;}r = n;continue;}if (n < 56320) {(t -= 3) > -1 && i.push(239, 191, 189), r = n;continue;}n = 65536 + (r - 55296 << 10 | n - 56320);} else r && (t -= 3) > -1 && i.push(239, 191, 189);if (r = null, n < 128) {if ((t -= 1) < 0) break;i.push(n);} else if (n < 2048) {if ((t -= 2) < 0) break;i.push(n >> 6 | 192, 63 & n | 128);} else if (n < 65536) {if ((t -= 3) < 0) break;i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);} else {if (!(n < 1114112)) throw new Error("Invalid code point");if ((t -= 4) < 0) break;i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);}}return i;}function L(e) {return o.toByteArray(function (e) {if ((e = function (e) {return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");}(e).replace(F, "")).length < 2) return "";for (; e.length % 4 != 0;) {e += "=";}return e;}(e));}function q(e, t, n, o) {for (var r = 0; r < o && !(r + n >= t.length || r >= e.length); ++r) {t[r + n] = e[r];}return r;}}).call(this, n(28));}, function (e, t, n) {"use strict";var o,r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),i = 64,s = {},a = 0,u = 0;function c(e) {var t = "";do {t = r[e % i] + t, e = Math.floor(e / i);} while (e > 0);return t;}function l() {var e = c(+new Date());return e !== o ? (a = 0, o = e) : e + "." + c(a++);}for (; u < i; u++) {s[r[u]] = u;}l.encode = c, l.decode = function (e) {var t = 0;for (u = 0; u < e.length; u++) {t = t * i + s[e.charAt(u)];}return t;}, e.exports = l;}, function (e, t) {var n = [].indexOf;e.exports = function (e, t) {if (n) return e.indexOf(t);for (var o = 0; o < e.length; ++o) {if (e[o] === t) return o;}return -1;};}, function (e, t, n) {"use strict";var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},r = n(26),i = n(13),s = n(85),a = n(50),u = n(51),c = (n(9)("socket.io-client:socket"), n(24)),l = n(45);e.exports = h;var f = { connect: 1, connect_error: 1, connect_timeout: 1, connecting: 1, disconnect: 1, error: 1, reconnect: 1, reconnect_attempt: 1, reconnect_failed: 1, reconnect_error: 1, reconnecting: 1, ping: 1, pong: 1 },p = i.prototype.emit;function h(e, t, n) {this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, n && n.query && (this.query = n.query), this.io.autoConnect && this.open();}i(h.prototype), h.prototype.subEvents = function () {if (!this.subs) {var e = this.io;this.subs = [a(e, "open", u(this, "onopen")), a(e, "packet", u(this, "onpacket")), a(e, "close", u(this, "onclose"))];}}, h.prototype.open = h.prototype.connect = function () {return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this);}, h.prototype.send = function () {var e = s(arguments);return e.unshift("message"), this.emit.apply(this, e), this;}, h.prototype.emit = function (e) {if (f.hasOwnProperty(e)) return p.apply(this, arguments), this;var t = s(arguments),n = { type: (this.flags.binary !== undefined ? this.flags.binary : l(t)) ? r.BINARY_EVENT : r.EVENT, data: t, options: {} };return n.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (this.ids, this.acks[this.ids] = t.pop(), n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), this.flags = {}, this;}, h.prototype.packet = function (e) {e.nsp = this.nsp, this.io.packet(e);}, h.prototype.onopen = function () {if ("/" !== this.nsp) if (this.query) {var e = "object" === o(this.query) ? c.encode(this.query) : this.query;this.packet({ type: r.CONNECT, query: e });} else this.packet({ type: r.CONNECT });}, h.prototype.onclose = function (e) {this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e);}, h.prototype.onpacket = function (e) {var t = e.nsp === this.nsp,n = e.type === r.ERROR && "/" === e.nsp;if (t || n) switch (e.type) {case r.CONNECT:this.onconnect();break;case r.EVENT:case r.BINARY_EVENT:this.onevent(e);break;case r.ACK:case r.BINARY_ACK:this.onack(e);break;case r.DISCONNECT:this.ondisconnect();break;case r.ERROR:this.emit("error", e.data);}}, h.prototype.onevent = function (e) {var t = e.data || [];null != e.id && t.push(this.ack(e.id)), this.connected ? p.apply(this, t) : this.receiveBuffer.push(t);}, h.prototype.ack = function (e) {var t = this,n = !1;return function () {if (!n) {n = !0;var o = s(arguments);t.packet({ type: l(o) ? r.BINARY_ACK : r.ACK, id: e, data: o });}};}, h.prototype.onack = function (e) {var t = this.acks[e.id];"function" == typeof t ? (e.id, e.data, t.apply(this, e.data), delete this.acks[e.id]) : e.id;}, h.prototype.onconnect = function () {this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();}, h.prototype.emitBuffered = function () {var e;for (e = 0; e < this.receiveBuffer.length; e++) {p.apply(this, this.receiveBuffer[e]);}for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) {this.packet(this.sendBuffer[e]);}this.sendBuffer = [];}, h.prototype.ondisconnect = function () {this.nsp, this.destroy(), this.onclose("io server disconnect");}, h.prototype.destroy = function () {if (this.subs) {for (var e = 0; e < this.subs.length; e++) {this.subs[e].destroy();}this.subs = null;}this.io.destroy(this);}, h.prototype.close = h.prototype.disconnect = function () {return this.connected && (this.nsp, this.packet({ type: r.DISCONNECT })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;}, h.prototype.compress = function (e) {return this.flags.compress = e, this;}, h.prototype.binary = function (e) {return this.flags.binary = e, this;};}, function (e, t, n) {"use strict";e.exports = function (e, t, n) {return e.on(t, n), { destroy: function destroy() {e.removeListener(t, n);} };};}, function (e, t) {var n = [].slice;e.exports = function (e, t) {if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");var o = n.call(arguments, 2);return function () {return t.apply(e, o.concat(n.call(arguments)));};};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.GoEasyDomainNumber = undefined;var o,r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),i = n(87),s = (o = i) && o.__esModule ? o : { "default": o },a = n(53);var u = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e);}return r(e, null, [{ key: "refreshNumber", value: function value() {var t = e.GOEASY_DOMAIN_NUMBER,n = a.LocalStorageDispatcher.localStorage(),o = Math.floor(Math.random() * (s["default"].maxNumber - 1) + 1);return null !== n && (o = parseInt(n.get(t)) || o), o > 0 && o < s["default"].maxNumber ? o += 1 : o == s["default"].maxNumber && (o = 1), null !== n && n.put(t, o), o;} }]), e;}();u.GOEASY_DOMAIN_NUMBER = "GOEASY_DOMAIN_NUMBER", t.GoEasyDomainNumber = u;}, function (e, t, n) {"use strict";var o = this && this.__values || function (e) {var t = "function" == typeof Symbol && Symbol.iterator,n = t && e[t],o = 0;if (n) return n.call(e);if (e && "number" == typeof e.length) return { next: function next() {return e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e };} };throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");};t.__esModule = !0, t.LocalStorageDispatcher = void 0;var r = n(88),i = function () {function e() {this.domain = null;this.domain = "undefined" != typeof location && /^(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/.test(location.host) ? location.host.split(".").slice(-2).join(".") : null;}return e.prototype.get = function (e) {var t = r.Cookie.get(e) || null;return JSON.parse(t);}, e.prototype.put = function (e, t) {var n = new Date(2030, 12, 31, 0, 0, 0, 0),o = this.domain;r.Cookie.set(e, JSON.stringify(t), n, o);}, e.prototype.remove = function (e) {var t = this.domain;r.Cookie.remove(e, t);}, e.prototype.support = function () {return "undefined" != typeof navigator && !0 === navigator.cookieEnabled;}, e;}(),s = function () {function e() {}return e.prototype.get = function (e) {var t = localStorage.getItem(e);return JSON.parse(t);}, e.prototype.put = function (e, t) {var n = localStorage.setItem(e, JSON.stringify(t));JSON.stringify(n);}, e.prototype.remove = function (e) {localStorage.removeItem(e);}, e.prototype.support = function () {return !("undefined" != typeof GameGlobal || "undefined" == typeof localStorage || !localStorage.setItem);}, e;}(),a = function () {function e() {}return e.prototype.get = function (e) {var t = uni.getStorageSync(e) || null;return JSON.parse(t);}, e.prototype.put = function (e, t) {uni.setStorageSync(e, JSON.stringify(t));}, e.prototype.remove = function (e) {uni.removeStorageSync(e);}, e.prototype.support = function () {return !("object" != typeof uni || !uni.getStorageSync);}, e;}(),u = function () {function e() {}return e.prototype.get = function (e) {var t = wx.getStorageSync(e) || null;return JSON.parse(t);}, e.prototype.put = function (e, t) {wx.setStorageSync(e, JSON.stringify(t));}, e.prototype.remove = function (e) {wx.removeStorageSync(e);}, e.prototype.support = function () {return !("object" != typeof wx || !wx.getStorageSync);}, e;}(),c = (function () {function e() {}e.prototype.get = function (e) {var t = my.getStorageSync(e) || null;return JSON.parse(t);}, e.prototype.put = function (e, t) {my.setStorageSync(e, JSON.stringify(t));}, e.prototype.remove = function (e) {my.removeStorageSync(e);}, e.prototype.support = function () {return !("undefined" == typeof my || !my.getStorageSync);};}(), function () {function e() {}e.prototype.get = function (e) {var t = qq.getStorageSync(e) || null;return JSON.parse(t);}, e.prototype.put = function (e, t) {qq.setStorageSync(e, JSON.stringify(t));}, e.prototype.remove = function (e) {qq.removeStorageSync(e);}, e.prototype.support = function () {return !("undefined" == typeof qq || !qq.getStorageSync);};}(), function () {function e() {}e.prototype.get = function (e) {var t = tt.getStorageSync(e) || null;return JSON.parse(t);}, e.prototype.put = function (e, t) {tt.setStorageSync(e, JSON.stringify(t));}, e.prototype.remove = function (e) {tt.removeStorageSync(e);}, e.prototype.support = function () {return !("object" != typeof tt || !tt.getStorageSync);};}(), function () {function e() {}e.prototype.get = function (e) {var t = swan.getStorageSync(e) || null;return JSON.parse(t);}, e.prototype.put = function (e, t) {swan.setStorageSync(e, JSON.stringify(t));}, e.prototype.remove = function (e) {swan.removeStorageSync(e);}, e.prototype.support = function () {return !("undefined" == typeof swan || !swan.getStorageSync);};}(), function () {function e() {this.api = e.dispatch(), this.api;}e.dispatch = function () {var e = new s(),t = new i();return e.support() ? e : t;}, e.prototype.get = function (e) {return this.api.get(e);}, e.prototype.put = function (e, t) {this.api.put(e, t);}, e.prototype.remove = function (e) {this.api.remove(e);}, e.prototype.support = function () {return "undefined" != typeof localStorage;};}(), function () {function e() {this.supportedStorage = null;var t = e.storages;t.push(new a()), t.push(new s()), t.push(new u()), t.push(new i()), this.dispatch(), this.supportedStorage;}return e.localStorage = function () {return this.instance.supportedStorage;}, e.prototype.dispatch = function () {var t, n;try {for (var r = o(e.storages), i = r.next(); !i.done; i = r.next()) {var s = i.value;if (s.support()) {this.supportedStorage = s;break;}}} catch (a) {t = { error: a };} finally {try {i && !i.done && (n = r["return"]) && n.call(r);} finally {if (t) throw t.error;}}}, e.storages = new Array(), e.instance = new e(), e;}());t.LocalStorageDispatcher = c;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o,r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),i = n(99),s = n(103),a = (o = s) && o.__esModule ? o : { "default": o };var u = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.requestBuilder = null, this.fileUploader = i.fileUploader, this.requestBuilder = new a["default"]();}return r(e, [{ key: "upload", value: function value(e, t, n, o) {var r = this;return new Promise(function (i, s) {r.requestBuilder.build(e, t, o).then(function (e) {i(r.doUpload(e, n));})["catch"](function (e) {s(e);});});} }, { key: "customizeUpload", value: function value(e, t) {this.doUpload(e, t);} }, { key: "doUpload", value: function value(e, t) {return this.fileUploader.upload(e, t);} }]), e;}();t["default"] = u;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t["default"] = function o(e, t, n, r, i) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, o), this.host = "", this.headers = {}, this.parameters = {}, this.file = {}, this.payload = {}, this.host = e, this.headers = t, this.parameters = n, this.file = r, this.payload = i;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}();var r = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e);}return o(e, [{ key: "build", value: function value(e, t) {} }, { key: "newFileName", value: function value(e) {return e && e.newFilename || "";} }]), e;}();t["default"] = r;}, function (e, t, n) {"use strict";t.__esModule = !0, t.SocketEvents = void 0, function (e) {e.IM_MESSAGE_RECEIVED = "IM_MESSAGE_RECEIVED";}(t.SocketEvents || (t.SocketEvents = {}));}, function (e, t, n) {"use strict";var _o8,r = this && this.__extends || (_o8 = function o(e, t) {return (_o8 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o8(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.PrivateMessage = void 0;var i = n(21),s = n(2),a = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.scene = function () {return s.Scene.PRIVATE;}, t.prototype.targetId = function () {return this.receiverId;}, t;}(i.AbstractMessage);t.PrivateMessage = a;}, function (e, t, n) {"use strict";var _o9,r = this && this.__extends || (_o9 = function o(e, t) {return (_o9 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o9(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.GroupMessage = void 0;var i = n(21),s = n(2),a = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.scene = function () {return s.Scene.GROUP;}, t.prototype.targetId = function () {return this.groupId;}, t;}(i.AbstractMessage);t.GroupMessage = a;}, function (e, t, n) {"use strict";var _o10,r = this && this.__extends || (_o10 = function o(e, t) {return (_o10 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o10(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.FileMessagePayloadImprover = void 0;var i = n(136),s = n(54),a = n(19),u = function (e) {function t() {var t = e.call(this) || this;return t.goEasyUploader = new s["default"](), t;}return r(t, e), t.prototype.improve = function (e) {var t = this,n = e.message;return new Promise(function (e, o) {var r,i = n.buildOptions.createOptions;r = n.type === a.MessageType.VIDEO ? n.payload.video.name : n.payload.name, t.goEasyUploader.upload(i.file, r, i.onProgress, n.type).then(function (o) {t.setPayload(o, n), e();})["catch"](function (e) {o(e);});});}, t.prototype.setPayload = function (e, t) {var n = e.content,o = void 0 === n ? {} : n;t.payload.url = o.url;}, t;}(i.AbstractPayloadImprover);t.FileMessagePayloadImprover = u;}, function (e, t, n) {"use strict";t.__esModule = !0, t.SortedInserter = void 0;var o = function () {function e() {}return e.prototype.insert = function (e, t) {var n = this.binarySearch(e, t);if (n >= 0) e.splice(n, 1, t);else {var o = -n - 1;e.splice(o, 0, t);}}, e.prototype.binarySearch = function (e, t) {for (var n = 0, o = e.length - 1; n <= o;) {var r = o + n >> 1,i = this.compare(t, e[r]);if (i > 0) n = r + 1;else {if (!(i < 0)) return r;o = r - 1;}}return -n - 1;}, e;}();t.SortedInserter = o;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(6),r = n(21),i = n(0),s = n(2),a = n(149),u = n(3),c = n(1),l = n(4),f = n(5),p = n(8),h = n(17),d = function () {function e() {}return e.deleteServerMessages = function (e) {var t = new a.DeleteMessageRequest(e);return t.times.length < 0 ? Promise.resolve() : new Promise(function (e, n) {var r = new u["default"]({ name: f.RocketTypes.IM_DELETE_MESSAGE, params: t, permission: c["default"].WRITE, singleTimeout: l.SocketTimeout.commonQuerySingle, totalTimeout: l.SocketTimeout.commonQueryTotal, success: function success(t) {200 === t.code ? e(t) : n(t);}, fail: function fail(e) {n(e);} });o.im._goEasySocket.emit(r);});}, e.validate = function (e) {if (p.CallbackUtils.validateCallbackOptions(e), !i.calibrator.isArray(e.messages) || i.calibrator.isEmpty(e.messages)) throw { code: 400, content: "messages requires non empty array" };var t = e.messages;if (t.length > 50) throw { code: 400, content: "a maximum of 50 messages can be deleted at a time" };for (var n = h.Target.byIMMessage(t[0]), o = 0; o < t.length; o++) {var a = t[o];if (!(a instanceof r.AbstractMessage)) throw { code: 400, content: "message[" + o + "] is not a correct message" };if (a.status === s.MessageStatus.SENDING) throw { code: 400, content: "message[" + o + "] is '" + a.status + "' and cannot be deleted" };if (o > 0) {var u = h.Target.byIMMessage(a);if (u.scene !== n.scene || u.id !== n.id) throw { code: 400, content: "each message must be from the same friend or group" };}}}, e;}();t["default"] = d;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(2),r = n(6),i = function () {function e() {}return e.conversationId = function (e, t, n) {var r = n;return e === o.Scene.PRIVATE && (r = t + ":" + n), r;}, e.targetId = function (e, t) {if (e === o.Scene.PRIVATE) {var n = t.split(":", 2);return n[0] === r.IM.userId ? n[1] : n[0];}return t;}, e;}();t["default"] = i;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(6),r = n(2),i = n(155),s = n(3),a = n(1),u = n(4),c = n(21),l = n(0),f = n(5),p = n(8),h = n(17),d = function () {function e() {}return e.recallServerMessages = function (e) {var t = new i.RecallMessageRequest(e);return 0 === t.times.length ? Promise.resolve() : new Promise(function (e, n) {var r = new s["default"]({ name: f.RocketTypes.IM_RECALL_MESSAGE, params: t, permission: a["default"].WRITE, singleTimeout: u.SocketTimeout.commonRequestSingle, totalTimeout: u.SocketTimeout.commonRequestTotal, fail: function fail(e) {n(e);}, success: function success(t) {200 === t.code ? e(t) : n(t);} });o.im._goEasySocket.emit(r);});}, e.validate = function (e) {p.CallbackUtils.validateCallbackOptions(e);var t,n = e.messages;if (!l.calibrator.isArray(n) || l.calibrator.isEmpty(n)) throw { code: 400, content: "messages requires non empty array" };if (n.length > 50) throw { code: 400, content: "a maximum of 50 messages can be recalled at a time" };for (var i = 0; i < n.length; i++) {var s = n[i];if (!(s instanceof c.AbstractMessage)) throw { code: 400, content: "message[" + i + "] is an illegal message object" };if (s.status !== r.MessageStatus.SUCCESS) throw { code: 400, content: "message[" + i + "] is '" + s.status + "' and cannot be recalled" };if (s.recalled) throw { code: 400, content: "message[" + i + "] has been recalled" };if (s.senderId !== o.IM.userId) throw { code: 400, content: "it is not allowed to recall messages sent by others" };if (i > 0) {var a = h.Target.byIMMessage(s);if (a.scene !== t.scene || a.id !== t.id) throw { code: 400, content: "each message must be from the same friend or group" };} else t = h.Target.byIMMessage(s);}}, e;}();t["default"] = d;}, function (e, t, n) {"use strict";t.__esModule = !0, t.PUBSUB_INTERNAL_EVENTS = void 0, function (e) {e.MESSAGE_RECEIVED = "PUBSUB_INTERNAL_MESSAGE_RECEIVED";}(t.PUBSUB_INTERNAL_EVENTS || (t.PUBSUB_INTERNAL_EVENTS = {}));}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = function E(e, t, n) {null === e && (e = Function.prototype);var o = Object.getOwnPropertyDescriptor(e, t);if (o === undefined) {var r = Object.getPrototypeOf(e);return null === r ? undefined : E(r, t, n);}if ("value" in o) return o.value;var i = o.get;return i === undefined ? undefined : i.call(n);},i = g(n(40)),s = g(n(94)),a = g(n(3)),u = g(n(1)),c = g(n(12)),l = g(n(95)),f = n(0),p = (n(27), n(4)),h = g(n(2)),d = n(23),y = n(96),m = n(97),v = n(5);function g(e) {return e && e.__esModule ? e : { "default": e };}var b = function (e) {function t(e, n) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t);var o = function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return o.ioSocket = null, o.sid = null, o.appKey = null, o.anonymous = !1, o.userId = null, o.userData = null, o.otp = null, o.artifactVersion = "0.0.0", o.uri = null, o.ioOpts = null, o.allowNotification = !1, o.reconnectingTimes = 0, o.messageObservers = {}, o.connectFailedObservers = [], o.connectingObservers = [], o.expiredReconnectedObservers = [], o.onConnectSuccess = f.noop, o.onConnectFailed = f.noop, o.onConnectProgress = f.noop, o.setUriAndOpts(e), o.extendOptions(n), o.ioSocket = new s["default"]({ onDisconnected: o.onIoDisconnected.bind(o), onReconnecting: o.onIoReconnecting.bind(o) }), o.ioSocket.addConnectedObserver(o.onIoReconnected.bind(o)), o.appKey = e.appkey, o.allowNotification = e.allowNotification, o.modules = e.modules, f.calibrator.isEmpty(n.id) ? (o.anonymous = !0, o.userId = y.AnonymousUserIdRepository.get()) : o.userId = n.id.toString(), o.artifactVersion = h["default"].version, o.addConnectedObserver(o.onConnectSuccess), o.addConnectFailedObserver(o.onConnectFailed), o.addConnectingObserver(o.onConnectProgress), o;}return function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}(t, i["default"]), o(t, [{ key: "extendOptions", value: function value(e) {if (f.calibrator.isFunction(e.onSuccess) && (this.onConnectSuccess = e.onSuccess), f.calibrator.isFunction(e.onFailed) && (this.onConnectFailed = e.onFailed), f.calibrator.isFunction(e.onProgress) && (this.onConnectProgress = e.onProgress), f.calibrator.isDef(e.data) && !f.calibrator.isObject(e.data)) throw { code: 400, content: "TypeError: data requires an object." };if ((f.calibrator.isDef(e.data) ? String(e.data).length : 0) > 300) {if (f.calibrator.isObject(e) && f.calibrator.isFunction(e.onFailed)) throw { code: 400, content: "user.data-length limit 300 byte." };} else this.userData = e.data;this.otp = e.otp || null;} }, { key: "setUriAndOpts", value: function value(e) {var t = !0;if (d.PlatformDetector.currentPlatform() === d.Platform.BROWSER) {var n = "://" + f.GoEasyDomainNumber.refreshNumber() + e.host,o = void 0;!0 === e.supportOldBrowser ? (o = ["polling", "websocket"], t = !1) : o = ["websocket"], !1 !== e.forceTLS && t ? this.uri = "https" + n + ":443" : this.uri = "http" + n + ":80", this.ioOpts = { transports: o, timeout: p.SocketTimeout.connect };} else this.uri = "https://wx-" + e.host + ":443", this.ioOpts = { transports: ["websocket"], reconnectionDelayMax: p.SocketTimeout.reconnectionDelayMax };} }, { key: "onIoReconnected", value: function value() {this.status === c["default"].RECONNECTING && this.authorize();} }, { key: "emit", value: function value(e) {r(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "emit", this).call(this, e);} }, { key: "doEmit", value: function value(e, t, n) {t.sid = this.sid, this.ioSocket.doEmit(e, t, n);} }, { key: "sendAck", value: function value(e, t) {this.ioSocket.io.emit(e, t);} }, { key: "connect", value: function value(e) {var n = this;r(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "connect", this).call(this), this.onConnecting(this.reconnectingTimes), this.ioSocket.connect({ uri: this.uri, opts: this.ioOpts }), e && e.supportNotification() && e.getRegIdPromise() ? e.getRegIdPromise().then(function (e) {n.regId = e, n.authorize();})["catch"](function (e) {console.warn("Failed to register the Manufacturers Push service：" + JSON.stringify(e)), n.authorize();}) : this.authorize();} }, { key: "disconnect", value: function value() {var e = this;return new Promise(function (t, n) {var o = function o() {e.status = c["default"].DISCONNECTED, e.ioSocket.disconnect(), t();};if (e.allowNotification) {var r = new a["default"]({ name: v.RocketTypes.manualDisconnect, params: {}, permission: u["default"].READ, singleTimeout: p.SocketTimeout.commonRequestSingle, totalTimeout: p.SocketTimeout.commonRequestTotal, fail: function fail(e) {n(e);}, success: o });e.emit(r);} else o();});} }, { key: "authorize", value: function value() {var e = { appkey: this.appKey, userId: this.userId, userData: JSON.stringify(this.userData), otp: this.otp, artifactVersion: this.artifactVersion, sid: this.sid, allowNT: this.allowNotification, regId: this.regId, modules: this.modules, a: this.anonymous, z: m.clientInfo.z };JSON.stringify(e);var t = new a["default"]({ name: v.RocketTypes.authorize, params: e, permission: u["default"].NONE, singleTimeout: p.SocketTimeout.commonInfiniteSingle, totalTimeout: p.SocketTimeout.commonInfiniteTotal, success: this.onAuthorizeSuccess.bind(this), fail: this.onAuthorizeFailed.bind(this) });this.ioSocket.emit(t);} }, { key: "onConnecting", value: function value() {this.notify(this.connectingObservers, this.reconnectingTimes);} }, { key: "onIoReconnecting", value: function value() {this.reconnectingTimes++, this.status == c["default"].CONNECTED || this.status == c["default"].EXPIRED_RECONNECTED || this.status == c["default"].RECONNECTING ? this.status = c["default"].RECONNECTING : this.status = c["default"].CONNECTING, this.onConnecting();} }, { key: "onIoDisconnected", value: function value() {this.status == c["default"].DISCONNECTING && (this.status = c["default"].DISCONNECTED, this.notify(this.disconnectedObservers)), this.notify(this.disconnectedObservers);} }, { key: "onAuthorizeSuccess", value: function value(e) {(!0 === this.anonymous && e.u && (y.AnonymousUserIdRepository.put(e.u), this.userId = e.u), this.status === c["default"].RECONNECTING) ? this.sid !== e.sid ? (this.status = c["default"].EXPIRED_RECONNECTED, this.notify(this.expiredReconnectedObservers)) : this.status = c["default"].RECONNECTED : (this.status = c["default"].CONNECTED, this.sid = e.sid);e.enablePublish && (this.permissions.find(function (e) {return e == u["default"].WRITE;}) || this.permissions.push(u["default"].WRITE)), e.enableSubscribe && (this.permissions.find(function (e) {return e == u["default"].READ;}) || this.permissions.push(u["default"].READ)), this.reconnectingTimes = 0, this.notify(this.connectedObservers);} }, { key: "onAuthorizeFailed", value: function value(e) {this.ioSocket.disconnect(), this.status = c["default"].CONNECT_FAILED;var t = { code: e.resultCode || 408, content: e.content || "Host unreachable or timeout" };this.notify(this.connectFailedObservers, t);} }, { key: "addConnectingObserver", value: function value(e) {f.calibrator.isFunction(e) && this.connectingObservers.push(e);} }, { key: "addConnectFailedObserver", value: function value(e) {f.calibrator.isFunction(e) && this.connectFailedObservers.push(e);} }, { key: "addExpiredReconnectedObserver", value: function value(e) {f.calibrator.isFunction(e) && this.expiredReconnectedObservers.push(e);} }, { key: "addMessageObserver", value: function value(e, t) {var n = this;this.ioSocket.io.on(e, function (t) {n.notifyMessageObservers(e, t);}), this.messageObservers[e] || (this.messageObservers[e] = []), this.messageObservers[e].push(new l["default"](t));} }, { key: "notifyMessageObservers", value: function value(e, t) {for (var n = this.messageObservers[e], o = 0; o < n.length; o++) {n[o].onMessage(e, t);}} }]), t;}();t["default"] = b;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o,r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),i = n(12),s = (o = i) && o.__esModule ? o : { "default": o };var a = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.socket = null, this.socket = t;}return r(e, [{ key: "emit", value: function value(e) {this.socket.status !== s["default"].CONNECT_FAILED && this.socket.status !== s["default"].DISCONNECTED ? (e.start(), this.doEmit(e)) : e.fail({ resultCode: "409", content: "Please connect first" });} }, { key: "doEmit", value: function value(e) {var t = this;if (e.isTimeout()) e.fail({ resultCode: 408, content: "Host unreachable or timeout" });else if (this.socket.status !== s["default"].CONNECT_FAILED) {if (this.authenticated()) {if (this.hasPermission(e)) {if (this.socket.status === s["default"].CONNECTED || this.socket.status === s["default"].RECONNECTED || this.socket.status === s["default"].EXPIRED_RECONNECTED) {if (!e.complete) {var n = setTimeout(function () {t.doEmit(e);}, e.singleTimeout);e.unique && (e.params.retried = e.retried), this.socket.doEmit(e.name, e.params, function (t) {clearTimeout(n), 200 === t.resultCode || 200 == t.code ? e.success(t) : e.fail(t);}), e.retried++;}} else setTimeout(function () {t.doEmit(e);}, 500);} else e.fail({ resultCode: 401, content: "No permission" });} else setTimeout(function () {t.doEmit(e);}, 500);} else e.fail({ resultCode: 408, content: "Failed to connect GoEasy." });} }, { key: "hasPermission", value: function value(e) {return !!this.socket.permissions.find(function (t) {return t === e.permission;});} }, { key: "authenticated", value: function value() {return this.socket.status === s["default"].CONNECTED || this.socket.status === s["default"].RECONNECTING || this.socket.status === s["default"].RECONNECTED || this.socket.status === s["default"].EXPIRED_RECONNECTED;} }]), e;}();t["default"] = a;}, function (e, t, n) {"use strict";var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},r = n(69),i = n(26),s = n(43);n(9)("socket.io-client");e.exports = t = u;var a = t.managers = {};function u(e, t) {"object" === (void 0 === e ? "undefined" : o(e)) && (t = e, e = undefined), t = t || {};var n,i = r(e),u = i.source,c = i.id,l = i.path,f = a[c] && l in a[c].nsps;return t.forceNew || t["force new connection"] || !1 === t.multiplex || f ? n = s(u, t) : (a[c] || (a[c] = s(u, t)), n = a[c]), i.query && !t.query && (t.query = i.query), n.socket(i.path, t);}t.protocol = i.protocol, t.connect = u, t.Manager = n(43), t.Socket = n(49);}, function (e, t, n) {"use strict";var o = n(41);n(9)("socket.io-client:url");e.exports = function (e, t) {var n = e;t = t || "undefined" != typeof location && location, null == e && (e = t.protocol + "//" + t.host);"string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e), /^(https?|wss?):\/\//.test(e) || (e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), n = o(e));n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443"));n.path = n.path || "/";var r = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;return n.id = n.protocol + "://" + r + ":" + n.port, n.href = n.protocol + "://" + r + (t && t.port === n.port ? "" : ":" + n.port), n;};}, function (e, t, n) {"use strict";e.exports = n(71), e.exports.parser = n(14);}, function (e, t, n) {"use strict";var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},r = n(44),i = n(13),s = (n(9)("engine.io-client:socket"), n(48)),a = n(14),u = n(41),c = n(24);function l(e, t) {if (!(this instanceof l)) return new l(e, t);t = t || {}, e && "object" === (void 0 === e ? "undefined" : o(e)) && (t = e, e = null), e ? (e = u(e), t.hostname = e.host, t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = u(t.host).host), this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = c.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.transportOptions = t.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = t.rejectUnauthorized === undefined || t.rejectUnauthorized, this.forceNode = !!t.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" == typeof self || this.isReactNative) && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open();}e.exports = l, l.priorWebsocketSuccess = !1, i(l.prototype), l.protocol = a.protocol, l.Socket = l, l.Transport = n(29), l.transports = n(44), l.parser = n(14), l.prototype.createTransport = function (e) {var t = function (e) {var t = {};for (var n in e) {e.hasOwnProperty(n) && (t[n] = e[n]);}return t;}(this.query);t.EIO = a.protocol, t.transport = e;var n = this.transportOptions[e] || {};return this.id && (t.sid = this.id), new r[e]({ query: t, socket: this, agent: n.agent || this.agent, hostname: n.hostname || this.hostname, port: n.port || this.port, secure: n.secure || this.secure, path: n.path || this.path, forceJSONP: n.forceJSONP || this.forceJSONP, jsonp: n.jsonp || this.jsonp, forceBase64: n.forceBase64 || this.forceBase64, enablesXDR: n.enablesXDR || this.enablesXDR, timestampRequests: n.timestampRequests || this.timestampRequests, timestampParam: n.timestampParam || this.timestampParam, policyPort: n.policyPort || this.policyPort, pfx: n.pfx || this.pfx, key: n.key || this.key, passphrase: n.passphrase || this.passphrase, cert: n.cert || this.cert, ca: n.ca || this.ca, ciphers: n.ciphers || this.ciphers, rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized, perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate, extraHeaders: n.extraHeaders || this.extraHeaders, forceNode: n.forceNode || this.forceNode, localAddress: n.localAddress || this.localAddress, requestTimeout: n.requestTimeout || this.requestTimeout, protocols: n.protocols || void 0, isReactNative: this.isReactNative });}, l.prototype.open = function () {var e;if (this.rememberUpgrade && l.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";else {if (0 === this.transports.length) {var t = this;return void setTimeout(function () {t.emit("error", "No transports available");}, 0);}e = this.transports[0];}this.readyState = "opening";try {e = this.createTransport(e);} catch (n) {return this.transports.shift(), void this.open();}e.open(), this.setTransport(e);}, l.prototype.setTransport = function (e) {e.name;var t = this;this.transport && (this.transport.name, this.transport.removeAllListeners()), this.transport = e, e.on("drain", function () {t.onDrain();}).on("packet", function (e) {t.onPacket(e);}).on("error", function (e) {t.onError(e);}).on("close", function () {t.onClose("transport close");});}, l.prototype.probe = function (e) {var t = this.createTransport(e, { probe: 1 }),n = !1,o = this;function r() {if (o.onlyBinaryUpgrades) {var e = !this.supportsBinary && o.transport.supportsBinary;n = n || e;}n || (t.send([{ type: "ping", data: "probe" }]), t.once("packet", function (e) {if (!n) if ("pong" === e.type && "probe" === e.data) {if (o.upgrading = !0, o.emit("upgrading", t), !t) return;l.priorWebsocketSuccess = "websocket" === t.name, o.transport.name, o.transport.pause(function () {n || "closed" !== o.readyState && (f(), o.setTransport(t), t.send([{ type: "upgrade" }]), o.emit("upgrade", t), t = null, o.upgrading = !1, o.flush());});} else {var r = new Error("probe error");r.transport = t.name, o.emit("upgradeError", r);}}));}function i() {n || (n = !0, f(), t.close(), t = null);}function s(e) {var n = new Error("probe error: " + e);n.transport = t.name, i(), o.emit("upgradeError", n);}function a() {s("transport closed");}function u() {s("socket closed");}function c(e) {t && e.name !== t.name && (e.name, t.name, i());}function f() {t.removeListener("open", r), t.removeListener("error", s), t.removeListener("close", a), o.removeListener("close", u), o.removeListener("upgrading", c);}l.priorWebsocketSuccess = !1, t.once("open", r), t.once("error", s), t.once("close", a), this.once("close", u), this.once("upgrading", c), t.open();}, l.prototype.onOpen = function () {if (this.readyState = "open", l.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) for (var e = 0, t = this.upgrades.length; e < t; e++) {this.probe(this.upgrades[e]);}}, l.prototype.onPacket = function (e) {if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (e.type, e.data, this.emit("packet", e), this.emit("heartbeat"), e.type) {case "open":this.onHandshake(JSON.parse(e.data));break;case "pong":this.setPing(), this.emit("pong");break;case "error":var t = new Error("server error");t.code = e.data, this.onError(t);break;case "message":this.emit("data", e.data), this.emit("message", e.data);} else this.readyState;}, l.prototype.onHandshake = function (e) {this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat));}, l.prototype.onHeartbeat = function (e) {clearTimeout(this.pingTimeoutTimer);var t = this;t.pingTimeoutTimer = setTimeout(function () {"closed" !== t.readyState && t.onClose("ping timeout");}, e || t.pingInterval + t.pingTimeout);}, l.prototype.setPing = function () {var e = this;clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function () {e.pingTimeout, e.ping(), e.onHeartbeat(e.pingTimeout);}, e.pingInterval);}, l.prototype.ping = function () {var e = this;this.sendPacket("ping", function () {e.emit("ping");});}, l.prototype.onDrain = function () {this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();}, l.prototype.flush = function () {"closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.writeBuffer.length, this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));}, l.prototype.write = l.prototype.send = function (e, t, n) {return this.sendPacket("message", e, t, n), this;}, l.prototype.sendPacket = function (e, t, n, o) {if ("function" == typeof t && (o = t, t = undefined), "function" == typeof n && (o = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {(n = n || {}).compress = !1 !== n.compress;var r = { type: e, data: t, options: n };this.emit("packetCreate", r), this.writeBuffer.push(r), o && this.once("flush", o), this.flush();}}, l.prototype.close = function () {if ("opening" === this.readyState || "open" === this.readyState) {this.readyState = "closing";var e = this;this.writeBuffer.length ? this.once("drain", function () {this.upgrading ? o() : t();}) : this.upgrading ? o() : t();}function t() {e.onClose("forced close"), e.transport.close();}function n() {e.removeListener("upgrade", n), e.removeListener("upgradeError", n), t();}function o() {e.once("upgrade", n), e.once("upgradeError", n);}return this;}, l.prototype.onError = function (e) {l.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e);}, l.prototype.onClose = function (e, t) {if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t), this.writeBuffer = [], this.prevBufferLen = 0;}}, l.prototype.filterUpgrades = function (e) {for (var t = [], n = 0, o = e.length; n < o; n++) {~s(this.transports, e[n]) && t.push(e[n]);}return t;};}, function (e, t, n) {"use strict";(function (t) {var o = n(73),r = n(30);e.exports = l;var i,s = /\n/g,a = /\\n/g;function u() {}function c() {return "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== t ? t : {};}function l(e) {if (o.call(this, e), this.query = this.query || {}, !i) {var t = c();i = t.___eio = t.___eio || [];}this.index = i.length;var n = this;i.push(function (e) {n.onData(e);}), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", function () {n.script && (n.script.onerror = u);}, !1);}r(l, o), l.prototype.supportsBinary = !1, l.prototype.doClose = function () {this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o.prototype.doClose.call(this);}, l.prototype.doPoll = function () {var e = this,t = document.createElement("script");this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function (t) {e.onError("jsonp poll error", t);};var n = document.getElementsByTagName("script")[0];n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t), this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function () {var e = document.createElement("iframe");document.body.appendChild(e), document.body.removeChild(e);}, 100);}, l.prototype.doWrite = function (e, t) {var n = this;if (!this.form) {var o,r = document.createElement("form"),i = document.createElement("textarea"),u = this.iframeId = "eio_iframe_" + this.index;r.className = "socketio", r.style.position = "absolute", r.style.top = "-1000px", r.style.left = "-1000px", r.target = u, r.method = "POST", r.setAttribute("accept-charset", "utf-8"), i.name = "d", r.appendChild(i), document.body.appendChild(r), this.form = r, this.area = i;}function c() {l(), t();}function l() {if (n.iframe) try {n.form.removeChild(n.iframe);} catch (t) {n.onError("jsonp polling iframe removal error", t);}try {var e = '<iframe src="javascript:0" name="' + n.iframeId + '">';o = document.createElement(e);} catch (t) {(o = document.createElement("iframe")).name = n.iframeId, o.src = "javascript:0";}o.id = n.iframeId, n.form.appendChild(o), n.iframe = o;}this.form.action = this.uri(), l(), e = e.replace(a, "\\\n"), this.area.value = e.replace(s, "\\n");try {this.form.submit();} catch (f) {}this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {"complete" === n.iframe.readyState && c();} : this.iframe.onload = c;};}).call(this, n(28));}, function (e, t, n) {"use strict";var o = n(29),r = n(24),i = n(14),s = n(30),a = n(47);n(9)("engine.io-client:polling");e.exports = c;var u = null != new (n(81))({ xdomain: !1 }).responseType;function c(e) {var t = e && e.forceBase64;u && !t || (this.supportsBinary = !1), o.call(this, e);}s(c, o), c.prototype.name = "polling", c.prototype.doOpen = function () {this.poll();}, c.prototype.pause = function (e) {var t = this;function n() {t.readyState = "paused", e();}if (this.readyState = "pausing", this.polling || !this.writable) {var o = 0;this.polling && (o++, this.once("pollComplete", function () {--o || n();})), this.writable || (o++, this.once("drain", function () {--o || n();}));} else n();}, c.prototype.poll = function () {this.polling = !0, this.doPoll(), this.emit("poll");}, c.prototype.onData = function (e) {var t = this;i.decodePayload(e, this.socket.binaryType, function (e, n, o) {if ("opening" === t.readyState && t.onOpen(), "close" === e.type) return t.onClose(), !1;t.onPacket(e);}), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : this.readyState);}, c.prototype.doClose = function () {var e = this;function t() {e.write([{ type: "close" }]);}"open" === this.readyState ? t() : this.once("open", t);}, c.prototype.write = function (e) {var t = this;this.writable = !1;var n = function n() {t.writable = !0, t.emit("drain");};i.encodePayload(e, this.supportsBinary, function (e) {t.doWrite(e, n);});}, c.prototype.uri = function () {var e = this.query || {},t = this.secure ? "https" : "http",n = "";return !1 !== this.timestampRequests && (e[this.timestampParam] = a()), this.supportsBinary || e.sid || (e.b64 = 1), e = r.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (n = ":" + this.port), e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e;};}, function (e, t, n) {"use strict";e.exports = Object.keys || function (e) {var t = [],n = Object.prototype.hasOwnProperty;for (var o in e) {n.call(e, o) && t.push(o);}return t;};}, function (e, t, n) {"use strict";t.byteLength = function (e) {var t = c(e),n = t[0],o = t[1];return 3 * (n + o) / 4 - o;}, t.toByteArray = function (e) {var t,n,o = c(e),s = o[0],a = o[1],u = new i(function (e, t, n) {return 3 * (t + n) / 4 - n;}(0, s, a)),l = 0,f = a > 0 ? s - 4 : s;for (n = 0; n < f; n += 4) {t = r[e.charCodeAt(n)] << 18 | r[e.charCodeAt(n + 1)] << 12 | r[e.charCodeAt(n + 2)] << 6 | r[e.charCodeAt(n + 3)], u[l++] = t >> 16 & 255, u[l++] = t >> 8 & 255, u[l++] = 255 & t;}2 === a && (t = r[e.charCodeAt(n)] << 2 | r[e.charCodeAt(n + 1)] >> 4, u[l++] = 255 & t);1 === a && (t = r[e.charCodeAt(n)] << 10 | r[e.charCodeAt(n + 1)] << 4 | r[e.charCodeAt(n + 2)] >> 2, u[l++] = t >> 8 & 255, u[l++] = 255 & t);return u;}, t.fromByteArray = function (e) {for (var t, n = e.length, r = n % 3, i = [], s = 0, a = n - r; s < a; s += 16383) {i.push(l(e, s, s + 16383 > a ? a : s + 16383));}1 === r ? (t = e[n - 1], i.push(o[t >> 2] + o[t << 4 & 63] + "==")) : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], i.push(o[t >> 10] + o[t >> 4 & 63] + o[t << 2 & 63] + "="));return i.join("");};for (var o = [], r = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s.length; a < u; ++a) {o[a] = s[a], r[s.charCodeAt(a)] = a;}function c(e) {var t = e.length;if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");var n = e.indexOf("=");return -1 === n && (n = t), [n, n === t ? 0 : 4 - n % 4];}function l(e, t, n) {for (var r, i, s = [], a = t; a < n; a += 3) {r = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), s.push(o[(i = r) >> 18 & 63] + o[i >> 12 & 63] + o[i >> 6 & 63] + o[63 & i]);}return s.join("");}r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63;}, function (e, t) {t.read = function (e, t, n, o, r) {var i,s,a = 8 * r - o - 1,u = (1 << a) - 1,c = u >> 1,l = -7,f = n ? r - 1 : 0,p = n ? -1 : 1,h = e[t + f];for (f += p, i = h & (1 << -l) - 1, h >>= -l, l += a; l > 0; i = 256 * i + e[t + f], f += p, l -= 8) {;}for (s = i & (1 << -l) - 1, i >>= -l, l += o; l > 0; s = 256 * s + e[t + f], f += p, l -= 8) {;}if (0 === i) i = 1 - c;else {if (i === u) return s ? NaN : (h ? -1 : 1) * Infinity;s += Math.pow(2, o), i -= c;}return (h ? -1 : 1) * s * Math.pow(2, i - o);}, t.write = function (e, t, n, o, r, i) {var s,a,u,c = 8 * i - r - 1,l = (1 << c) - 1,f = l >> 1,p = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,h = o ? 0 : i - 1,d = o ? 1 : -1,y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;for (t = Math.abs(t), isNaN(t) || t === Infinity ? (a = isNaN(t) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t += s + f >= 1 ? p / u : p * Math.pow(2, 1 - f)) * u >= 2 && (s++, u /= 2), s + f >= l ? (a = 0, s = l) : s + f >= 1 ? (a = (t * u - 1) * Math.pow(2, r), s += f) : (a = t * Math.pow(2, f - 1) * Math.pow(2, r), s = 0)); r >= 8; e[n + h] = 255 & a, h += d, a /= 256, r -= 8) {;}for (s = s << r | a, c += r; c > 0; e[n + h] = 255 & s, h += d, s /= 256, c -= 8) {;}e[n + h - d] |= 128 * y;};}, function (e, t) {var n = {}.toString;e.exports = Array.isArray || function (e) {return "[object Array]" == n.call(e);};}, function (e, t) {function n() {}e.exports = function (e, t, o) {var r = !1;return o = o || n, i.count = e, 0 === e ? t() : i;function i(e, n) {if (i.count <= 0) throw new Error("after called too many times");--i.count, e ? (r = !0, t(e), t = o) : 0 !== i.count || r || t(null, n);}};}, function (e, t, n) {"use strict";var o,r,i,s = String.fromCharCode;function a(e) {for (var t, n, o = [], r = 0, i = e.length; r < i;) {(t = e.charCodeAt(r++)) >= 55296 && t <= 56319 && r < i ? 56320 == (64512 & (n = e.charCodeAt(r++))) ? o.push(((1023 & t) << 10) + (1023 & n) + 65536) : (o.push(t), r--) : o.push(t);}return o;}function u(e, t) {if (e >= 55296 && e <= 57343) {if (t) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");return !1;}return !0;}function c(e, t) {return s(e >> t & 63 | 128);}function l(e, t) {if (0 == (4294967168 & e)) return s(e);var n = "";return 0 == (4294965248 & e) ? n = s(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (u(e, t) || (e = 65533), n = s(e >> 12 & 15 | 224), n += c(e, 6)) : 0 == (4292870144 & e) && (n = s(e >> 18 & 7 | 240), n += c(e, 12), n += c(e, 6)), n += s(63 & e | 128);}function f() {if (i >= r) throw Error("Invalid byte index");var e = 255 & o[i];if (i++, 128 == (192 & e)) return 63 & e;throw Error("Invalid continuation byte");}function p(e) {var t, n;if (i > r) throw Error("Invalid byte index");if (i == r) return !1;if (t = 255 & o[i], i++, 0 == (128 & t)) return t;if (192 == (224 & t)) {if ((n = (31 & t) << 6 | f()) >= 128) return n;throw Error("Invalid continuation byte");}if (224 == (240 & t)) {if ((n = (15 & t) << 12 | f() << 6 | f()) >= 2048) return u(n, e) ? n : 65533;throw Error("Invalid continuation byte");}if (240 == (248 & t) && (n = (7 & t) << 18 | f() << 12 | f() << 6 | f()) >= 65536 && n <= 1114111) return n;throw Error("Invalid UTF-8 detected");}e.exports = { version: "2.1.2", encode: function encode(e, t) {for (var n = !1 !== (t = t || {}).strict, o = a(e), r = o.length, i = -1, s = ""; ++i < r;) {s += l(o[i], n);}return s;}, decode: function decode(e, t) {var n = !1 !== (t = t || {}).strict;o = a(e), r = o.length, i = 0;for (var u, c = []; !1 !== (u = p(n));) {c.push(u);}return function (e) {for (var t, n = e.length, o = -1, r = ""; ++o < n;) {(t = e[o]) > 65535 && (r += s((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), r += s(t);}return r;}(c);} };}, function (e, t) {var n = void 0 !== n ? n : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,o = function () {try {return 2 === new Blob(["hi"]).size;} catch (e) {return !1;}}(),r = o && function () {try {return 2 === new Blob([new Uint8Array([1, 2])]).size;} catch (e) {return !1;}}(),i = n && n.prototype.append && n.prototype.getBlob;function s(e) {return e.map(function (e) {if (e.buffer instanceof ArrayBuffer) {var t = e.buffer;if (e.byteLength !== t.byteLength) {var n = new Uint8Array(e.byteLength);n.set(new Uint8Array(t, e.byteOffset, e.byteLength)), t = n.buffer;}return t;}return e;});}function a(e, t) {t = t || {};var o = new n();return s(e).forEach(function (e) {o.append(e);}), t.type ? o.getBlob(t.type) : o.getBlob();}function u(e, t) {return new Blob(s(e), t || {});}"undefined" != typeof Blob && (a.prototype = Blob.prototype, u.prototype = Blob.prototype), e.exports = o ? r ? Blob : u : i ? a : undefined;}, function (e, t, n) {"use strict";var o = n(82);e.exports = function (e) {var t = e.xdomain,n = e.xscheme,r = e.enablesXDR;try {if ("undefined" != typeof XMLHttpRequest && (!t || o)) return new XMLHttpRequest();} catch (i) {}try {if ("undefined" != typeof XDomainRequest && !n && r) return new XDomainRequest();} catch (i) {}if (!t) try {return new self[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");} catch (i) {}};}, function (e, t) {try {e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest();} catch (n) {e.exports = !1;}}, function (e, t, n) {"use strict";(function (t) {var o,r,i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},s = n(29),a = n(14),u = n(24),c = n(30),l = n(47);n(9)("engine.io-client:websocket");if ("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) if ("undefined" != typeof WebSocket) o = WebSocket;else if ("undefined" != typeof self) o = self.WebSocket || self.MozWebSocket;else try {r = n(84);} catch (h) {}var f = o || r;function p(e) {e && e.forceBase64 && (this.supportsBinary = !1), ("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) && (this.perMessageDeflate = e.perMessageDeflate, this.usingBrowserWebSocket = o && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (f = r)), s.call(this, e);}("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) && "undefined" == typeof GameGlobal || (f = function f(e) {var t = this;if (t.onopen = function () {}, t.onclose = function () {}, t.onmessage = function (e) {}, t.onerror = function (e) {}, "object" === ("undefined" == typeof tt ? "undefined" : i(tt)) && tt.getSystemInfo) {var n = tt.connectSocket({ url: e });t.send = function (e) {n.send({ data: e });}, t.close = function () {n.close();}, n.onOpen(function () {t.onopen();}), n.onError(function (e) {t.onerror(e);}), n.onMessage(function (e) {t.onmessage(e);}), n.onClose(function () {t.onclose();});} else if ("undefined" != typeof uni) {var o = uni.connectSocket({ url: e, complete: function complete() {} });t.send = function (e) {o.send({ data: e });}, t.close = function () {o.close();}, o.onOpen(function (e) {t.onopen();}), o.onError(function (e) {t.onerror(e);}), o.onMessage(function (e) {t.onmessage(e);}), o.onClose(function (e) {t.onclose();});} else {var r = wx.connectSocket({ url: e });t.send = function (e) {r.send({ data: e });}, t.close = function (e) {r.close({ code: 1e3 });}, r.onOpen(function () {t.onopen();}), r.onError(function (e) {t.onerror(e);}), r.onMessage(function (e) {t.onmessage(e);}), r.onClose(function (e) {t.onclose(e);});}}), e.exports = p, c(p, s), p.prototype.name = "websocket", p.prototype.supportsBinary = !1, p.prototype.doOpen = function () {if (this.check()) {var e,t,n = this.uri();("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) && (e = this.protocols), (t = "undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket ? { agent: this.agent, perMessageDeflate: this.perMessageDeflate } : { agent: this.agent }).pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (t.headers = this.extraHeaders), this.localAddress && (t.localAddress = this.localAddress);try {"undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket ? this.ws = this.usingBrowserWebSocket && !this.isReactNative ? e ? new f(n, e) : new f(n) : new f(n, e, t) : this.ws = new f(n);} catch (o) {return this.emit("error", o);}this.ws.binaryType === undefined && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();}}, p.prototype.addEventListeners = function () {var e = this;this.ws.onopen = function () {e.onOpen();}, this.ws.onclose = function () {e.onClose();}, this.ws.onmessage = function (t) {e.onData(t.data);}, this.ws.onerror = function (t) {e.onError("websocket error", t);};}, p.prototype.write = function (e) {var n = this;this.writable = !1;for (var o = e.length, r = 0, i = o; r < i; r++) {!function (e) {a.encodePacket(e, n.supportsBinary, function (r) {if ("undefined" == typeof uni && "undefined" == typeof wx || "undefined" != typeof WebSocket) {if (!n.usingBrowserWebSocket) {var i = {};if (e.options && (i.compress = e.options.compress), n.perMessageDeflate) ("string" == typeof r ? t.byteLength(r) : r.length) < n.perMessageDeflate.threshold && (i.compress = !1);}try {n.usingBrowserWebSocket ? n.ws.send(r) : n.ws.send(r, i);} catch (h) {}} else try {n.ws.send(r);} catch (h) {}--o || s();});}(e[r]);}function s() {n.emit("flush"), setTimeout(function () {n.writable = !0, n.emit("drain");}, 0);}}, p.prototype.onClose = function () {s.prototype.onClose.call(this);}, p.prototype.doClose = function () {"undefined" != typeof this.ws && this.ws.close();}, p.prototype.uri = function () {var e = this.query || {},t = this.secure ? "wss" : "ws",n = "";return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (n = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = l()), this.supportsBinary || (e.b64 = 1), (e = u.encode(e)).length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e;}, p.prototype.check = function () {return !(!f || "__initialize" in f && this.name === p.prototype.name);};}).call(this, n(46).Buffer);}, function (e, t) {}, function (e, t) {e.exports = function (e, t) {for (var n = [], o = (t = t || 0) || 0; o < e.length; o++) {n[o - t] = e[o];}return n;};}, function (e, t) {function n(e) {e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;}e.exports = n, n.prototype.duration = function () {var e = this.ms * Math.pow(this.factor, this.attempts++);if (this.jitter) {var t = Math.random(),n = Math.floor(t * this.jitter * e);e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;}return 0 | Math.min(e, this.max);}, n.prototype.reset = function () {this.attempts = 0;}, n.prototype.setMin = function (e) {this.ms = e;}, n.prototype.setMax = function (e) {this.max = e;}, n.prototype.setJitter = function (e) {this.jitter = e;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = { maxNumber: 5 };}, function (e, t, n) {"use strict";var o = this && this.__values || function (e) {var t = "function" == typeof Symbol && Symbol.iterator,n = t && e[t],o = 0;if (n) return n.call(e);if (e && "number" == typeof e.length) return { next: function next() {return e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e };} };throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");};t.__esModule = !0, t.Cookie = void 0;var r = function () {function e() {}return e.get = function (e) {var t,n,r = encodeURIComponent(e) + "=",i = document.cookie.split("; ");try {for (var s = o(i), a = s.next(); !a.done; a = s.next()) {var u = a.value;if (u.startsWith(r)) return decodeURIComponent(u.substring(r.length));}} catch (c) {t = { error: c };} finally {try {a && !a.done && (n = s["return"]) && n.call(s);} finally {if (t) throw t.error;}}return null;}, e.set = function (e, t, n, o, r, i) {void 0 === r && (r = "/"), void 0 === i && (i = !1);var s = encodeURIComponent(e) + "=" + encodeURIComponent(t);n instanceof Date && (s += "; expires=" + n.toGMTString()), r && (s += "; path=" + r), o && (s += "; domain=" + o), i && (s += "; secure"), document.cookie = s;}, e.remove = function (t, n, o, r) {void 0 === o && (o = "/"), void 0 === r && (r = !1), e.set(t, "", new Date(0), n, o, r);}, e;}();t.Cookie = r;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.UUID = undefined;var o,r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),i = n(90),s = (o = i) && o.__esModule ? o : { "default": o };var a = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e);}return r(e, null, [{ key: "get", value: function value() {return (0, s["default"])().replace(/-/g, "");} }]), e;}();t.UUID = a;}, function (e, t, n) {var o,r,i = n(91),s = n(92),a = 0,u = 0;e.exports = function (e, t, n) {var c = t && n || 0,l = t || [],f = (e = e || {}).node || o,p = e.clockseq !== undefined ? e.clockseq : r;if (null == f || null == p) {var h = i();null == f && (f = o = [1 | h[0], h[1], h[2], h[3], h[4], h[5]]), null == p && (p = r = 16383 & (h[6] << 8 | h[7]));}var d = e.msecs !== undefined ? e.msecs : new Date().getTime(),y = e.nsecs !== undefined ? e.nsecs : u + 1,m = d - a + (y - u) / 1e4;if (m < 0 && e.clockseq === undefined && (p = p + 1 & 16383), (m < 0 || d > a) && e.nsecs === undefined && (y = 0), y >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");a = d, u = y, r = p;var v = (1e4 * (268435455 & (d += 122192928e5)) + y) % 4294967296;l[c++] = v >>> 24 & 255, l[c++] = v >>> 16 & 255, l[c++] = v >>> 8 & 255, l[c++] = 255 & v;var g = d / 4294967296 * 1e4 & 268435455;l[c++] = g >>> 8 & 255, l[c++] = 255 & g, l[c++] = g >>> 24 & 15 | 16, l[c++] = g >>> 16 & 255, l[c++] = p >>> 8 | 128, l[c++] = 255 & p;for (var b = 0; b < 6; ++b) {l[c + b] = f[b];}return t || s(l);};}, function (e, t) {var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);if (n) {var o = new Uint8Array(16);e.exports = function () {return n(o), o;};} else {var r = new Array(16);e.exports = function () {for (var e, t = 0; t < 16; t++) {0 == (3 & t) && (e = 4294967296 * Math.random()), r[t] = e >>> ((3 & t) << 3) & 255;}return r;};}}, function (e, t) {for (var n = [], o = 0; o < 256; ++o) {n[o] = (o + 256).toString(16).substr(1);}e.exports = function (e, t) {var o = t || 0,r = n;return [r[e[o++]], r[e[o++]], r[e[o++]], r[e[o++]], "-", r[e[o++]], r[e[o++]], "-", r[e[o++]], r[e[o++]], "-", r[e[o++]], r[e[o++]], "-", r[e[o++]], r[e[o++]], r[e[o++]], r[e[o++]], r[e[o++]], r[e[o++]]].join("");};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}();var r = new (function (e) {function t() {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t), function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));}return function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}(t, Array), o(t, [{ key: "deleteByKey", value: function value(e, t, n) {var o = e.findIndex(function (e) {return e[t] == n;});o > -1 && e.splice(o, 1);} }, { key: "unshiftGuid", value: function value(e) {var t = !1,n = this.findIndex(function (t) {return t == e;});for (n > -1 && (t = !0, this.splice(n, 1)), this.unshift(e); this.length > 300;) {this.pop();}return t;} }]), t;}())();t.goEasyArray = r;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = s(n(40)),i = s(n(12));function s(e) {return e && e.__esModule ? e : { "default": e };}var a = function (e) {function t(e) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t);var n = function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return n.reconnectingObservers = [], n.addReconnectingObserver(e.onReconnecting), n.addDisconnectedObserver(e.onDisconnected), n;}return function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}(t, r["default"]), o(t, [{ key: "connect", value: function value(e) {(function n(e, t, o) {null === e && (e = Function.prototype);var r = Object.getOwnPropertyDescriptor(e, t);if (r === undefined) {var i = Object.getPrototypeOf(e);return null === i ? undefined : n(i, t, o);}if ("value" in r) return r.value;var s = r.get;return s === undefined ? undefined : s.call(o);})(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "connect", this).call(this), this.io = this.io.connect(e.uri, e.opts), this.initListener();} }, { key: "doEmit", value: function value(e, t, n) {this.io.emit(e, t, n);} }, { key: "initListener", value: function value() {var e = this;this.io.on("reconnecting", function (t) {e.status = i["default"].CONNECTING, e.notify(e.reconnectingObservers, t);}), this.io.on("connect", function () {e.status = i["default"].CONNECTED, e.notify(e.connectedObservers);}), this.io.on("disconnect", function () {e.status = i["default"].DISCONNECTED, e.notify(e.disconnectedObservers);}), this.io.on("connect_error", function (e) {});} }, { key: "addReconnectingObserver", value: function value(e) {this.reconnectingObservers.push(e);} }]), t;}();t["default"] = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(0);var i = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.callback = r.noop, this.guidList = [], this.callback = t;}return o(e, [{ key: "onMessage", value: function value(e, t) {if ("string" == typeof t && (t = JSON.parse(t)), t.i) {if (this.guidList.findIndex(function (e) {return e === t.i;}) > -1) return;this.guidList.unshift(t.i), this.guidList.length > 300 && this.guidList.pop();}this.callback(t);} }]), e;}();t["default"] = i;}, function (e, t, n) {"use strict";t.__esModule = !0, t.AnonymousUserIdRepository = void 0;var o = n(0),r = n(53),i = function () {function e() {}return e.get = function () {var t = e.storage;if (null !== t) {var n = t.get(e.ANONYMOUS_USER_ID_KEY);if (!o.calibrator.isEmpty(n)) return n.toString();}return null;}, e.put = function (t) {var n = e.storage;null !== n && n.put(e.ANONYMOUS_USER_ID_KEY, t.toString());}, e.storage = r.LocalStorageDispatcher.localStorage(), e.ANONYMOUS_USER_ID_KEY = "goeasy-anonymous-user-id", e;}();t.AnonymousUserIdRepository = i;}, function (e, t, n) {"use strict";t.__esModule = !0, t.clientInfo = void 0;var o = n(23),r = n(18),i = new (function () {function e() {this.platform = o.PlatformDetector.currentPlatform(), this.framework = r.FrameworkDetector.currentFramework(), this.z = this.toZ();}return e.prototype.toZ = function () {for (var e = JSON.stringify({ platform: this.platform, framework: this.framework }), t = "", n = 0; n < e.length; n++) {var o = e.charCodeAt(n);t += String.fromCharCode(o + 5);}return t;}, e;}())();t.clientInfo = i;}, function (e, t, n) {"use strict";t.__esModule = !0, t.ModuleTypes = void 0, t.ModuleTypes = { IM: "IM", PUBSUB: "PUBSUB" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.fileUploader = undefined;var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(100),i = n(101),s = n(102),a = n(18);function u(e, t, n) {return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;}var c = new (function () {function e() {var t;!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.uploader = (u(t = {}, a.Framework.UNIAPP, r.uniAppFileUploader), u(t, a.Framework.NATIVE_APPLET_WX, i.wxFileUploader), u(t, a.Framework.UNKNOWN, s.htmlFileUploader), t);}return o(e, [{ key: "upload", value: function value(e, t) {var n = a.FrameworkDetector.currentFramework();return this.uploader[n].upload(e, t);} }]), e;}())();t.fileUploader = c;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.uniAppFileUploader = undefined;var o,r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),i = n(32),s = (o = i) && o.__esModule ? o : { "default": o };var a = new (function (e) {function t() {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t), function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));}return function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}(t, s["default"]), r(t, [{ key: "upload", value: function value(e, t) {var n = this;try {return new Promise(function (o, r) {uni.uploadFile({ url: e.host, filePath: n.getTempFilePath(e), name: "file", formData: e.parameters, success: function success(t) {if (200 === t.statusCode) {var n = e.payload;n.message = t.errMsg, o({ code: 200, content: n });} else r({ code: t.statusCode, content: t.errMsg });}, fail: function fail(e) {r({ code: 500, content: e.errMsg });} }).onProgressUpdate(function (e) {t && t(e);});});} catch (o) {return new Promise(function (e, t) {t({ code: 500, content: o });});}} }, { key: "getTempFilePath", value: function value(e) {var t = e.file;return t.tempFilePath || t.fullPath || t.path;} }]), t;}())();t.uniAppFileUploader = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.wxFileUploader = undefined;var o,r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),i = n(32),s = (o = i) && o.__esModule ? o : { "default": o };var a = new (function (e) {function t() {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t), function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));}return function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}(t, s["default"]), r(t, [{ key: "upload", value: function value(e, t) {var n = this;try {return new Promise(function (o, r) {wx.uploadFile({ url: e.host, filePath: n.getTempFilePath(e), name: "file", formData: e.parameters, success: function success(t) {if (200 === t.statusCode) {var n = e.payload;n.message = t.errMsg, o({ code: 200, content: n });} else r({ code: t.statusCode, content: t.errMsg });}, fail: function fail(e) {r({ code: 500, content: e.errMsg });} }).onProgressUpdate(function (e) {t && t(e);});});} catch (o) {return new Promise(function (e, t) {t({ code: 500, content: o });});}} }, { key: "getTempFilePath", value: function value(e) {var t = e.file || e.fileRes;return t.path || t.tempFilePath;} }]), t;}())();t.wxFileUploader = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.htmlFileUploader = undefined;var o,r = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),i = n(32),s = (o = i) && o.__esModule ? o : { "default": o };var a = new (function (e) {function t() {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t), function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));}return function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}(t, s["default"]), r(t, [{ key: "upload", value: function value(e, t) {try {return new Promise(function (n, o) {var r = new XMLHttpRequest();for (var i in r.open("post", e.host, !0), e.headers) {r.setRequestHeader(i, e.headers[i]);}r.upload.onprogress = function (e) {t && t(e);}, r.upload.onloadstart = function (e) {t && t(e);}, r.upload.onloadend = function (e) {t && t(e);};var s = new FormData();for (var a in e.parameters) {"fileRes" == a ? s.append("file", e.parameters[a]) : s.append(a, e.parameters[a]);}r.send(s), r.onreadystatechange = function () {if (4 == r.readyState) if (r.status >= 200 && r.status < 300 || 304 == r.status) {var t = e.payload;t.message = r.responseText, n({ code: 200, content: t });} else o({ code: r.status, content: r.responseText });};});} catch (n) {return new Promise(function (e, t) {t({ code: 500, content: n });});}} }]), t;}())();t.htmlFileUploader = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = s(n(104)),i = s(n(108));function s(e) {return e && e.__esModule ? e : { "default": e };}var a = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.uploadTokenResolver = null, this.uploadTokenResolver = new i["default"]();}return o(e, [{ key: "build", value: function value(e, t, n) {var o = this;return new Promise(function (i, s) {o.uploadTokenResolver.resolve(t).then(function (t) {var o = t.content;i(new r["default"](o.vendor).build(o, e, n));})["catch"](function (e) {s(e);});});} }]), e;}();t["default"] = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = n(105),r = n(106),i = n(107);t["default"] = function s(e) {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, s), e == o.OssType.aliYun ? r.aliYunOSSRequestBuilder : i.qiNiuYunOSSRequestBuilder;};}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });t.OssType = { aliYun: "ALI", qiNiu: "QN" };}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.aliYunOSSRequestBuilder = undefined;var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = a(n(55)),i = a(n(56)),s = n(19);function a(e) {return e && e.__esModule ? e : { "default": e };}var u = function (e) {function t() {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t), function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));}return function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}(t, i["default"]), o(t, [{ key: "url", value: function value(e) {return e.host + "/" + e.dir + "/" + this.newFileName(e);} }, { key: "build", value: function value(e, t, n) {var o = { key: e.dir + "/" + this.newFileName(e), OSSAccessKeyId: e.accessKeyId, policy: e.policy, signature: e.signature, success_action_status: "200", fileRes: t };s.MessageType.FILE === n && (o = { key: e.dir + "/" + this.newFileName(e), OSSAccessKeyId: e.accessKeyId, policy: e.policy, signature: e.signature, success_action_status: "200", "Content-Disposition": "attachment;filename=" + t.name, fileRes: t });var i = { newFileName: this.newFileName(e), url: this.url(e) };return new r["default"](e.host, null, o, t, i);} }]), t;}();t["default"] = u;var c = new u();t.aliYunOSSRequestBuilder = c;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.qiNiuYunOSSRequestBuilder = undefined;var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = s(n(56)),i = s(n(55));function s(e) {return e && e.__esModule ? e : { "default": e };}var a = new (function (e) {function t() {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, t), function (e, t) {if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != typeof t && "function" != typeof t ? e : t;}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));}return function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);}(t, r["default"]), o(t, [{ key: "url", value: function value(e) {return e.downloadUrl;} }, { key: "build", value: function value(e, t) {var n = { key: this.newFileName(e), token: e.token, file: t },o = { newFileName: this.newFileName(e), url: this.url(e) };return new i["default"](e.host, null, n, t, o);} }]), t;}())();t.qiNiuYunOSSRequestBuilder = a;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = u(n(3)),i = u(n(1)),s = n(4),a = n(6);function u(e) {return e && e.__esModule ? e : { "default": e };}var c = function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e);}return o(e, [{ key: "resolve", value: function value(e) {return new Promise(function (t, n) {var o = new r["default"]({ name: "uploadToken", params: { filename: e }, permission: i["default"].WRITE, singleTimeout: s.SocketTimeout.commonRequestSingle, totalTimeout: s.SocketTimeout.commonRequestTotal, fail: function fail(e) {n(e);}, success: function success(e) {200 === e.code ? t(e) : n(e);} });a.im._goEasySocket.emit(o);});} }]), e;}();t["default"] = c;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(3),r = n(1),i = n(4),s = n(0),a = n(6),u = n(5),c = function () {function e() {}return e.prototype.subscribe = function (e) {var t = e.groupIds;return new Promise(function (n, c) {if (Array.isArray(t) && 0 != t.length) {for (var l = 0; l < t.length; l++) {if (!s.calibrator.isStringOrNumber(t[l])) return void c({ code: 400, content: "TypeError: groups item require string or number." });s.calibrator.isNumber(t[l]) && (t[l] = t[l].toString());}var f = new o["default"]({ name: u.RocketTypes.subscribeGroups, params: { groupIds: t, at: e.accessToken }, permission: r["default"].WRITE, singleTimeout: i.SocketTimeout.commonInfiniteSingle, totalTimeout: i.SocketTimeout.commonInfiniteTotal, success: function success() {n({ code: 200, content: "ok" });}, fail: function fail(e) {c({ code: e.resultCode || 408, content: e.content || "Failed to subscribe group message" });} });a.im._goEasySocket.emit(f);} else c({ code: 400, content: "TypeError: groups require array." });});}, e.prototype.unsubscribe = function (e) {return new Promise(function (t, n) {if (s.calibrator.isStringOrNumber(e)) {e = e.toString();var c = new o["default"]({ name: u.RocketTypes.unsubscribeGroup, params: { groupId: e }, permission: r["default"].READ, singleTimeout: i.SocketTimeout.commonRequestSingle, totalTimeout: i.SocketTimeout.commonRequestTotal, success: function success() {t({ code: 200, content: "ok" });}, fail: function fail(e) {n({ code: e.resultCode || 408, content: e.content || "Failed to unsubscribe group message" });} });a.im._goEasySocket.emit(c);} else n({ code: 400, content: "TypeError: channel require string or number." });});}, e;}();t["default"] = c;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = c(n(3)),i = c(n(1)),s = n(4),a = n(0),u = n(5);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.im = null, this.im = t;}return o(e, [{ key: "get", value: function value(e) {var t = this;return new Promise(function (n, o) {if (a.calibrator.isStringOrNumber(e)) {a.calibrator.isNumber(e) && (e = e.toString());var c = new r["default"]({ name: u.RocketTypes.imGroupOnlineCount, params: { groupId: e }, permission: i["default"].READ, singleTimeout: s.SocketTimeout.commonQuerySingle, totalTimeout: s.SocketTimeout.commonQueryTotal, fail: function fail(e) {o(e || { code: 408, content: "Failed to query online group users" });}, success: function success(e) {200 == e.code ? n(e) : o(e);} });t.im._goEasySocket.emit(c);} else o({ code: 400, content: "TypeError: groupId require string or number." });});} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = f(n(3)),i = f(n(1)),s = n(4),a = n(0),u = n(5),c = n(15),l = n(16);function f(e) {return e && e.__esModule ? e : { "default": e };}var p = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.im = null, this.im = t, t._goEasySocket.addMessageObserver(c.RemoteEvents.groupPresence, this.newMessageReceived.bind(this));}return o(e, [{ key: "presence", value: function value(e) {var t = this;return new Promise(function (n, o) {if (Array.isArray(e) && 0 != e.length) {for (var r = 0; r < e.length; r++) {if (!a.calibrator.isStringOrNumber(e[r])) return void o({ code: 400, content: "TypeError: groupIds item require string or number." });if (a.calibrator.isNumber(e[r]) && (e[r] = e[r].toString()), 0 == e[r].length) return void o({ code: 400, content: "TypeError: groupIds has empty item." });}var i = { groupIds: e };t.emitRocket(u.RocketTypes.subscribeGroupPresence, i, function () {n({ code: 200, content: "ok" });}, function (e) {o({ code: e.code || 408, content: e.content || "Failed to subscribe group message" });}, s.SocketTimeout.commonInfiniteSingle, s.SocketTimeout.commonInfiniteTotal);} else o({ code: 400, content: "TypeError: groupIds require array." });});} }, { key: "unPresence", value: function value(e) {var t = this;return new Promise(function (n, o) {if (a.calibrator.isStringOrNumber(e)) {a.calibrator.isNumber(e) && (e = e.toString());var r = { groupId: e };t.emitRocket(u.RocketTypes.unsubscribeGroupPresence, r, function () {n({ code: 200, content: "ok" });}, function (e) {o({ code: e.code || 408, content: e.content || "Failed to unsubscribe presence" });}, s.SocketTimeout.commonRequestSingle, s.SocketTimeout.commonRequestTotal);} else o({ code: 400, content: "TypeError: groupId require string or number." });});} }, { key: "emitRocket", value: function value(e, t, n, o, s, a) {var u = new r["default"]({ name: e, params: t, singleTimeout: s, totalTimeout: a, permission: i["default"].WRITE, success: n, fail: o });this.im._goEasySocket.emit(u);} }, { key: "newMessageReceived", value: function value(e) {var t = this,n = null;e.c && (n = JSON.parse(e.c)), n && n.events && n.events.map(function (e) {var o = e.userData ? JSON.parse(e.userData) : {},r = { time: e.time, action: e.action, groupOnlineCount: n.userAmount, groupId: n.groupId, id: e.userId, data: o };t.im._event.notify(l.ImApiEvents.GROUP_PRESENCE, r);});} }]), e;}();t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = f(n(3)),i = f(n(1)),s = n(4),a = n(0),u = n(5),c = n(15),l = n(16);function f(e) {return e && e.__esModule ? e : { "default": e };}var p = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.im = null, this.im = t, this.im._goEasySocket.addMessageObserver(c.RemoteEvents.userPresence, this.newMessageReceived.bind(this));}return o(e, [{ key: "presence", value: function value(e) {var t = this;return new Promise(function (n, o) {if (Array.isArray(e) && 0 != e.length) {for (var r = 0; r < e.length; r++) {if (!a.calibrator.isStringOrNumber(e[r])) return void o({ code: 400, content: "TypeError: userIds item require string or number." });if (a.calibrator.isNumber(e[r]) && (e[r] = e[r].toString()), 0 == e[r].length) return void o({ code: 400, content: "TypeError: userIds has empty item." });}var i = { userIds: e };t.emitRocket(u.RocketTypes.subscribeUserPresence, i, function () {n({ code: 200, content: "ok" });}, function (e) {o({ code: e.code || 408, content: e.content || "Failed to subscribe group message" });}, s.SocketTimeout.commonInfiniteSingle, s.SocketTimeout.commonInfiniteTotal);} else o({ code: 400, content: "TypeError: userIds require array." });});} }, { key: "unPresence", value: function value(e) {var t = this;return new Promise(function (n, o) {if (a.calibrator.isStringOrNumber(e)) {a.calibrator.isNumber(e) && (e = e.toString());var r = { userId: e };t.emitRocket(u.RocketTypes.unsubscribeUserPresence, r, function () {n({ code: 200, content: "ok" });}, function (e) {o({ code: e.code || 408, content: e.content || "Failed to unsubscribe presence" });}, s.SocketTimeout.commonRequestSingle, s.SocketTimeout.commonRequestTotal);} else o({ code: 400, content: "TypeError: id require string or number." });});} }, { key: "emitRocket", value: function value(e, t, n, o, s, a) {var u = new r["default"]({ name: e, params: t, singleTimeout: s, totalTimeout: a, permission: i["default"].WRITE, success: n, fail: o });this.im._goEasySocket.emit(u);} }, { key: "newMessageReceived", value: function value(e) {var t = this,n = [];e.c && (n = JSON.parse(e.c).events || []), n.map(function (e) {var n = e.userData ? JSON.parse(e.userData) : {},o = { time: e.time, action: e.action, id: e.userId, data: n };t.im._event.notify(l.ImApiEvents.USER_PRESENCE, o);});} }]), e;}();t["default"] = p;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = c(n(3)),i = c(n(1)),s = n(4),a = n(0),u = n(5);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.im = null, this.im = t;}return o(e, [{ key: "hereNow", value: function value(e) {var t = this;return new Promise(function (n, o) {if (e.userIds && Array.isArray(e.userIds) && 0 != e.userIds.length) {for (var c = 0; c < e.userIds.length; c++) {if (!a.calibrator.isStringOrNumber(e.userIds[c])) return void o({ code: 400, content: "TypeError: userIds item require string or number." });if (a.calibrator.isNumber(e.userIds[c]) && (e.userIds[c] = e.userIds[c].toString()), 0 == e.userIds[c].length) return void o({ code: 400, content: "TypeError: userIds has empty item." });}var l = new r["default"]({ name: u.RocketTypes.imHereNow, params: e, permission: i["default"].READ, singleTimeout: s.SocketTimeout.commonQuerySingle, totalTimeout: s.SocketTimeout.commonQueryTotal, fail: function fail(e) {o({ code: e.resultCode || 408, content: e.content || "Failed to query online users" });}, success: function success(e) {if (200 == e.code) {var t = e.content;e.content = t.map(function (e) {var t = e.userData ? JSON.parse(e.userData) : {};return { id: e.userId, data: t };}), n(e);} else o(e);} });t.im._goEasySocket.emit(l);} else o({ code: 400, content: "TypeError: userIds require array." });});} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = c(n(3)),i = c(n(1)),s = n(4),a = n(7),u = n(5);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.im = null, this.im = t;}return o(e, [{ key: "hereNow", value: function value(e) {var t = this;return new Promise(function (n, o) {if (a.calibrator.isStringOrNumber(e)) {a.calibrator.isNumber(e) && (e = e.toString());var c = new r["default"]({ name: u.RocketTypes.imGroupHereNow, params: { groupId: e }, permission: i["default"].READ, singleTimeout: s.SocketTimeout.commonQuerySingle, totalTimeout: s.SocketTimeout.commonQueryTotal, fail: function fail(e) {o({ code: e.resultCode || 408, content: e.content || "Failed to query online group users" });}, success: function success(e) {if (200 == e.code) {var t = e.content;e.content = t.map(function (e) {var t = e.userData ? JSON.parse(e.userData) : {};return { id: e.userId, data: t };}), n(e);} else o(e);} });t.im._goEasySocket.emit(c);} else o({ code: 400, content: "TypeError: groupId require string or number." });});} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.str = undefined;var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(31);var i = new (function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e);}return o(e, [{ key: "fileExtension", value: function value(e, t) {if (r.calibrator.isString(e)) try {var n = e.split(t);return n[n.length - 1];} catch (o) {throw Error(o);}} }]), e;}())();t.str = i;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(20),r = n(10),i = n(57),s = n(33),a = n(15),u = function () {function e(e) {this.builder = new s.RemoteAbbrMessageBuilder(), this.im = e, e._goEasySocket.addMessageObserver(a.RemoteEvents.imMessage, this.onMessageReceived.bind(this));}return e.prototype.onMessageReceived = function (e) {var t = this.builder.build(e);this.sendAck(t), r.GoEasyEventCenter.fire(i.SocketEvents.IM_MESSAGE_RECEIVED, e), r.GoEasyEventCenter.fire(o.IM_INTERNAL_EVENTS.MESSAGE_RECEIVED, t);}, e.prototype.sendAck = function (e) {this.im._goEasySocket.sendAck("imAck", { publishGuid: e.messageId });}, e;}();t["default"] = u;}, function (e, t, n) {"use strict";t.__esModule = !0, t.EmitterEventDriver = void 0;var o = n(13),r = function () {function e() {this.emitter = new o();}return e.prototype.on = function (e, t) {return this.emitter.on(e, t), this;}, e.prototype.once = function (e, t) {return this.emitter.once(e, t), this;}, e.prototype.off = function (e, t) {return this.emitter.off(e, t), this;}, e.prototype.fire = function (e, t) {return this.emitter.emit(e, t), this;}, e;}();t.EmitterEventDriver = r;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(3),r = n(1),i = n(4),s = n(2),a = n(5),u = n(6),c = n(7),l = function () {function e(e) {this.userData = new Map(), this.groupData = new Map(), this.userData.set(e.id, e.data);}return e.prototype.putData = function (e, t, n) {n || (n = {}), e === s.Scene.PRIVATE ? this.userData.set(t, n) : this.groupData.set(t, n);}, e.prototype.loadData = function (e, t) {var n = this;return new Promise(function (o, r) {var i = n.loadLocalData(e, t);c.calibrator.isUndef(i) ? n.loadServerData(e, t).then(function (e) {JSON.stringify(e), o(e);})["catch"](function (e) {r(e);}) : (JSON.stringify(i), o(i));});}, e.prototype.loadLocalData = function (e, t) {return s.Scene.PRIVATE === t ? this.userData.get(e) : this.groupData.get(e);}, e.prototype.loadServerData = function (e, t) {var n = this;return new Promise(function (s, c) {var l = { targetId: e, type: t },f = new o["default"]({ name: a.RocketTypes.imData, params: l, permission: r["default"].READ, singleTimeout: i.SocketTimeout.commonQuerySingle, totalTimeout: i.SocketTimeout.commonQueryTotal, success: function success(o) {if (200 === o.code) {var r = JSON.parse(o.content);n.putData(t, e, r), s(r);} else c(o);}, fail: function fail(e) {c(e);} });u.im._goEasySocket.emit(f);});}, e;}();t["default"] = l;}, function (e, t, n) {"use strict";t.__esModule = !0, t.iMMessageBuilder = void 0;var o = n(18),r = n(120),i = n(35),s = n(121),a = n(122),u = n(124),c = n(125),l = n(38),f = n(126),p = n(127),h = n(128),d = n(39),y = n(129),m = n(130),v = n(131),g = n(133),b = n(6),E = n(7),_ = n(2),S = n(59),w = n(58),O = new (function () {function e() {var e;this.framework = o.FrameworkDetector.currentFramework(), this.payloadBuilders = ((e = {})[o.Framework.UNIAPP] = { image: new c["default"](), file: new l["default"](), audio: new f["default"](), video: new p["default"](), text: new a.TextPayloadBuilder() }, e[o.Framework.NATIVE_APPLET_WX] = { image: new r["default"](), file: new i["default"](), audio: new s["default"](), video: new u["default"](), text: new a.TextPayloadBuilder() }, e[o.Framework.UNKNOWN] = { image: new h["default"](), file: new d["default"](), audio: new y["default"](), video: new m["default"](), text: new a.TextPayloadBuilder() }, e);}return e.prototype.buildMessage = function (e, t) {var n = this.payloadBuilders[this.framework][e],o = new g.LocalIMMessageBuildOptions(e, t);if (n) {var r = n.build(o);o.payload = r;} else {r = new v.CustomPayloadBuilder().build(o);o.payload = r.payload;}return this.build(o);}, e.prototype.build = function (e) {var t,n = e.type,o = e.payload,r = e.createOptions,i = r.to,s = r.notification;return this.validate(s), i.type === _.Scene.GROUP ? ((t = new S.GroupMessage()).groupId = i.id.toString(), t.senderData = b.IM.userData) : i.type === _.Scene.PRIVATE && ((t = new w.PrivateMessage()).read = !1, t.receiverId = i.id.toString()), t.senderId = b.IM.userId, t.messageId = E.UUID.get(), t.payload = o, t.timestamp = Date.now(), t.type = n, t.recalled = !1, t.status = _.MessageStatus.NEW, t.buildOptions = e, t;}, e.prototype.validate = function (e) {if (E.calibrator.isUndef(b.IM.userId)) throw Error("Please call connect() first.");if (e) {if (!E.calibrator.isObject(e)) throw Error("notification require an object.");if (E.calibrator.isEmpty(e.title)) throw Error("notification's title is empty.");if (E.calibrator.isEmpty(e.body)) throw Error("notification's body is empty.");if (e.title.length > 32) throw Error("notification's title over max length 32");if (e.body.length > 50) throw Error("notification's body over max length 50");}}, e;}())();t.iMMessageBuilder = O;}, function (e, t, n) {"use strict";var _o11,r = this && this.__extends || (_o11 = function o(e, t) {return (_o11 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o11(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(7),s = n(0),a = n(34),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new a.ImageMessagePayload();}, t.prototype.setPayload = function (t, n) {e.prototype.setPayload.call(this, t, n);var o = t.createOptions.file,r = n,a = o.path || o.tempFilePath,u = s.calibrator.isEmpty(o.name) || o.name === undefined ? a : o.name;r.name = "wx-image." + i.str.fileExtension(u, "."), r.contentType = "image/" + i.str.fileExtension(u, "."), r.url = a, r.size = o.size, t.complete = new Promise(function (e, t) {wx.getImageInfo({ src: r.url, success: function success(t) {r.width = t.width, r.height = t.height, e();}, fail: function fail(e) {t(e);} });});}, t.prototype.validate = function (t) {e.prototype.validate.call(this, t);}, t;}(n(35)["default"]);t["default"] = u;}, function (e, t, n) {"use strict";var _o12,r = this && this.__extends || (_o12 = function o(e, t) {return (_o12 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o12(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(36),s = n(0),a = n(7),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new i.AudioMessagePayload();}, t.prototype.setPayload = function (t, n) {e.prototype.setPayload.call(this, t, n);var o = t.createOptions.file,r = n,i = o.tempFilePath,u = s.calibrator.isEmpty(o.name) || o.name == undefined ? i : o.name,c = o.duration,l = o.fileSize;r.url = i, r.size = l, r.duration = c / 1e3, r.name = "wx-audio." + a.str.fileExtension(u, "."), r.contentType = "audio/" + a.str.fileExtension(u, "."), t.complete = Promise.resolve();}, t.prototype.validate = function (t) {e.prototype.validate.call(this, t);}, t;}(n(35)["default"]);t["default"] = u;}, function (e, t, n) {"use strict";var _o13,r = this && this.__extends || (_o13 = function o(e, t) {return (_o13 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o13(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.TextPayloadBuilder = void 0;var i = n(11),s = n(123),a = n(0),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new s.TextMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = t,o = e.createOptions;n.text = o.text, e.complete = Promise.resolve();}, t.prototype.validate = function (e) {if (a.calibrator.isEmpty(e.text)) throw { code: 400, content: "text is empty" };if (!a.calibrator.isString(e.text)) throw { code: 400, content: "TypeError: text requires string." };if ("" === e.text.trim()) throw { code: 400, content: "text is empty" };if (e.text.length > 2500) throw { code: 400, content: "Message text over max length 2500" };}, t;}(i.AbstractPayloadBuilder);t.TextPayloadBuilder = u;}, function (e, t, n) {"use strict";var _o14,r = this && this.__extends || (_o14 = function o(e, t) {return (_o14 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o14(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.TextMessagePayload = void 0;var i = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t.text = "", t;}return r(t, e), t;}(n(25).AbstractMessagePayload);t.TextMessagePayload = i;}, function (e, t, n) {"use strict";var _o15,r = this && this.__extends || (_o15 = function o(e, t) {return (_o15 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o15(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(37),s = n(0),a = n(7),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new i.VideoMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = e.createOptions.file,o = t,r = o.video,i = o.thumbnail,u = n.duration,c = n.height,l = n.size,f = n.tempFilePath,p = n.thumbTempFilePath,h = n.width,d = n.name,y = void 0 === d ? "" : d,m = s.calibrator.isEmpty(y) ? f : y;r.contentType = "video/" + a.str.fileExtension(m, "."), r.name = "wx-video." + a.str.fileExtension(m, "."), r.url = f, r.width = i.width = h, r.height = i.height = c, r.size = l, r.duration = u, i.url = p, i.contentType = "image/jpg", i.name = "wx-thumbnail.jpg", e.complete = Promise.resolve();}, t.prototype.validate = function (e) {if (!s.calibrator.isObject(e)) throw Error("it is an empty message.");if (!s.calibrator.isDef(e.file)) throw Error("file is empty.");}, t;}(n(11).AbstractPayloadBuilder);t["default"] = u;}, function (e, t, n) {"use strict";var _o16,r = this && this.__extends || (_o16 = function o(e, t) {return (_o16 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o16(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(7),s = n(0),a = n(34),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new a.ImageMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = t,o = e.createOptions.file;n.url = o.path, n.size = o.size;var r = s.calibrator.isEmpty(o.name) || o.name === undefined ? o.path : o.name;n.contentType = "image/" + i.str.fileExtension(r, "."), n.name = "uni-image." + i.str.fileExtension(r, "."), e.complete = new Promise(function (e, t) {uni.getImageInfo({ src: o.path, success: function success(t) {n.width = t.width, n.height = t.height, e();}, fail: function fail(e) {t(e);} });});}, t.prototype.validate = function (t) {e.prototype.validate.call(this, t);}, t;}(n(38)["default"]);t["default"] = u;}, function (e, t, n) {"use strict";var _o17,r = this && this.__extends || (_o17 = function o(e, t) {return (_o17 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o17(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(0),s = n(7),a = n(36),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new a.AudioMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = e.createOptions,o = t,r = n.file,a = r.tempFilePath,u = i.calibrator.isEmpty(r.name) || r.name == undefined ? a : r.name;o.url = a, o.name = "uni-audio." + s.str.fileExtension(u, "."), o.contentType = "audio/" + s.str.fileExtension(u, "."), e.complete = new Promise(function (e, t) {uni.getFileInfo({ filePath: a, success: function success(r) {var s = r.size;if (o.size = s, 0 === s) e();else if (i.calibrator.isDef(n.file.duration)) o.duration = n.file.duration / 1e3, e();else {var u = uni.createInnerAudioContext();u.src = a, u.onCanplay(function (n) {n.errCode ? (u.destroy(), t(n)) : (o.duration = u.duration, u.destroy(), e());}), u.onError(function (n) {u.destroy(), -99 === n.errCode ? e() : t(n);});}}, fail: function fail(e) {t(e);} });});}, t.prototype.validate = function (t) {e.prototype.validate.call(this, t);}, t;}(n(38)["default"]);t["default"] = u;}, function (e, t, n) {"use strict";var _o18,r = this && this.__extends || (_o18 = function o(e, t) {return (_o18 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o18(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(0),s = n(7),a = n(37),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new a.VideoMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = e.createOptions.file,o = t,r = o.video,a = o.thumbnail,u = n.duration,c = n.height,l = n.size,f = n.tempFilePath,p = n.width,h = n.name,d = void 0 === h ? "" : h,y = i.calibrator.isEmpty(d) ? f : d;r.size = l, r.width = p, r.height = c, r.url = f, r.duration = u, r.contentType = "video/" + s.str.fileExtension(y, "."), r.name = "uni-video." + s.str.fileExtension(y, "."), a.url = f, a.width = p, a.height = c, a.contentType = "image/jpg", a.name = "uni-thumbnail.jpg", e.complete = Promise.resolve();}, t.prototype.validate = function (e) {if (!i.calibrator.isObject(e)) throw Error("it is an empty message.");if (!i.calibrator.isDef(e.file)) throw Error("file is empty.");}, t;}(n(11).AbstractPayloadBuilder);t["default"] = u;}, function (e, t, n) {"use strict";var _o19,r = this && this.__extends || (_o19 = function o(e, t) {return (_o19 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o19(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(34),s = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new i.ImageMessagePayload();}, t.prototype.setPayload = function (t, n) {e.prototype.setPayload.call(this, t, n);var o = t.createOptions.file,r = n,i = window.URL || window.webkitURL,s = new Image();s.src = i.createObjectURL(o), t.complete = new Promise(function (e, t) {s.onload = function () {r.width = s.width, r.height = s.height, i.revokeObjectURL(s.src), e();}, s.onerror = function (e) {i.revokeObjectURL(s.src), t(e);};});}, t.prototype.validate = function (t) {e.prototype.validate.call(this, t);var n = ["gif", "jpg", "png", "jpeg"];if (!n.find(function (e) {return e === t.file.type.split("/")[1].toLowerCase();})) throw Error("Only " + n.join(",") + " is supported image.");}, t;}(n(39)["default"]);t["default"] = s;}, function (e, t, n) {"use strict";var _o20,r = this && this.__extends || (_o20 = function o(e, t) {return (_o20 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o20(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(36),s = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new i.AudioMessagePayload();}, t.prototype.setPayload = function (t, n) {e.prototype.setPayload.call(this, t, n);var o = t.createOptions.file,r = n,i = window.URL || window.webkitURL,s = document.createElement("audio");s.src = i.createObjectURL(o), t.complete = new Promise(function (e, t) {s.onloadedmetadata = function () {r.duration = s.duration, i.revokeObjectURL(s.src), e();}, s.onerror = function (e) {i.revokeObjectURL(s.src), t(e);};});}, t.prototype.validate = function (t) {e.prototype.validate.call(this, t);var n = ["mp3", "ogg", "wav", "wma", "ape", "acc", "mpeg"];if (!n.find(function (e) {return e === t.file.type.split("/")[1].toLowerCase();})) throw Error("Only " + n.join(",") + " is supported audio.");}, t;}(n(39)["default"]);t["default"] = s;}, function (e, t, n) {"use strict";var _o21,r = this && this.__extends || (_o21 = function o(e, t) {return (_o21 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o21(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = n(37),s = n(11),a = n(7),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new i.VideoMessagePayload();}, t.prototype.setPayload = function (e, t) {var n = this,o = e.createOptions.file,r = t,i = r.video,s = r.thumbnail,a = window.URL || window.webkitURL,u = document.createElement("video");u.src = a.createObjectURL(o), i.size = o.size, i.name = o.name, i.contentType = o.type, i.url = u.src, s.name = o.name, s.contentType = "image/jpg", e.complete = new Promise(function (e, t) {u.onloadedmetadata = function () {i.duration = u.duration, i.width = u.videoWidth, i.height = u.videoHeight, s.width = u.videoWidth, s.height = u.videoHeight, s.url = n.getThumbnailUrl(u), a.revokeObjectURL(u.src), e();}, u.onerror = function (e) {a.revokeObjectURL(u.src), t(e);};});}, t.prototype.getThumbnailUrl = function (e) {var t = document.createElement("canvas");return t.width = e.videoWidth, t.height = e.videoHeight, t.getContext("2d").drawImage(e, 0, 0, t.width, t.height), t.toDataURL("image/png");}, t.prototype.validate = function (e) {if (!a.calibrator.isObject(e)) throw Error("it is an empty message.");if (!(e.file instanceof File)) throw Error("wrong file type.");if (0 == e.file.size) throw Error("File size is 0.");if (e.file.size > 31457280) throw Error("message-length limit 30mib");var t = ["avi", "mov", "rmvb", "rm", "flv", "mp4", "3gp", "quicktime"];if (!t.find(function (t) {return t === e.file.type.split("/")[1].toLowerCase();})) throw Error("Only " + t.join(",") + " is supported video.");}, t;}(s.AbstractPayloadBuilder);t["default"] = u;}, function (e, t, n) {"use strict";var _o22,r = this && this.__extends || (_o22 = function o(e, t) {return (_o22 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o22(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.CustomPayloadBuilder = void 0;var i = n(11),s = n(132),a = n(0),u = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.create = function () {return new s["default"]();}, t.prototype.setPayload = function (e, t) {var n = e.createOptions;t.payload = n.payload, e.complete = Promise.resolve();}, t.prototype.validate = function (e) {var t = e.type,n = e.payload;if (a.calibrator.isEmpty(t)) throw Error("type is empty.");if (!a.calibrator.isString(t)) throw Error("type require a string");if (a.calibrator.isEmpty(n)) throw Error("payload is empty.");if (!a.calibrator.isPlainObject(n) && !a.calibrator.isStringOrNumber(n)) throw Error("payload require object | string | number.");}, t;}(i.AbstractPayloadBuilder);t.CustomPayloadBuilder = u;}, function (e, t, n) {"use strict";var _o23,r = this && this.__extends || (_o23 = function o(e, t) {return (_o23 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o23(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0;var i = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t;}(n(25).AbstractMessagePayload);t["default"] = i;}, function (e, t, n) {"use strict";t.__esModule = !0, t.LocalIMMessageBuildOptions = void 0;var o = function () {return function (e, t) {this.type = e, this.createOptions = t;};}();t.LocalIMMessageBuildOptions = o;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(3),r = n(1),i = n(4),s = n(135),a = n(6),u = n(138),c = n(0),l = n(10),f = n(20),p = n(2),h = n(21),d = n(5),y = function () {function e() {this.payloadImprover = new s.PayloadImprover();}return e.prototype.send = function (e) {var t = this;this.validate(e);var n = e.message,o = e.accessToken,r = n.buildOptions,i = r.createOptions,s = i.notification,u = i.to;u.data || (u.data = {}), a.im._dataCache.putData(u.type, u.id.toString(), u.data), n.status = p.MessageStatus.SENDING;var c = r.complete,l = this.payloadImprover.improve(e);Promise.all([c, l]).then(function () {t.doSend(n, u, s, o, e);})["catch"](function (t) {n.status = p.MessageStatus.FAIL, e.onFailed({ code: t.code || 400, content: t.content || t });});}, e.prototype.doSend = function (e, t, n, s, c) {var h = new u["default"](e, t, n, s);l.GoEasyEventCenter.fire(f.IM_INTERNAL_EVENTS.MESSAGE_SENDING, e);var y = new o["default"]({ name: d.RocketTypes.publishIM, params: h, unique: !0, permission: r["default"].WRITE, singleTimeout: i.SocketTimeout.commonRequestSingle, totalTimeout: i.SocketTimeout.commonRequestTotal, fail: function fail(t) {e.status = p.MessageStatus.FAIL, c.onFailed({ code: t.resultCode || 408, content: t.content || "Failed to send message." });}, success: function success(t) {200 == t.resultCode ? (e.status = p.MessageStatus.SUCCESS, e.timestamp = t.content.timestamp, e.clearUseLessAttribute(), l.GoEasyEventCenter.fire(f.IM_INTERNAL_EVENTS.MESSAGE_SEND_SUCCESS, e), c.onSuccess(e)) : (e.status = p.MessageStatus.FAIL, c.onFailed(t));} });a.im._goEasySocket.emit(y);}, e.prototype.validate = function (e) {var t = e.message,n = t.buildOptions.createOptions;if (!(t instanceof h.AbstractMessage)) throw new Error("it is invalid message");if (t.status !== p.MessageStatus.NEW) throw new Error("Please create a new message, a message can only be sent once");var o = n.to;if (!o) throw new Error("message require property to.");if (!o.type || o.type != p.Scene.GROUP && o.type != p.Scene.PRIVATE) throw new Error("message require property to.type");if (c.calibrator.isEmpty(o.id)) throw new Error("message require property to.id");if (!c.calibrator.isStringOrNumber(o.id)) throw new Error("to.id should be a string or number.");if (a.IM.userId === o.id) throw new Error("to.id can not be the same as your id.");if (o.data && c.calibrator.isFunction(o.data)) throw new Error("to.data can not be function");var r = n.notification;if (r) if (c.calibrator.isObject(r)) {if (c.calibrator.isEmpty(r.title)) throw new Error("notification title is required");if (!c.calibrator.isString(r.title)) throw new Error("notification title must be string");if (c.calibrator.isEmpty(r.body)) throw new Error("notification body is required");if (!c.calibrator.isString(r.body)) throw new Error("notification body must be string");} else if (c.calibrator.isPrimitive(r)) throw new Error("notification must be an json object");}, e;}();t["default"] = y;}, function (e, t, n) {"use strict";t.__esModule = !0, t.PayloadImprover = void 0;var o = n(60),r = n(137),i = n(19),s = function () {function e() {var e;this.improvers = ((e = {})[i.MessageType.FILE] = new o.FileMessagePayloadImprover(), e[i.MessageType.AUDIO] = new o.FileMessagePayloadImprover(), e[i.MessageType.IMAGE] = new o.FileMessagePayloadImprover(), e[i.MessageType.VIDEO] = new r.VideoMessagePayloadImprover(), e);}return e.prototype.improve = function (e) {var t = this.improvers[e.message.type];return t ? t.improve(e) : Promise.resolve();}, e;}();t.PayloadImprover = s;}, function (e, t, n) {"use strict";t.__esModule = !0, t.AbstractPayloadImprover = void 0;var o = function () {return function () {};}();t.AbstractPayloadImprover = o;}, function (e, t, n) {"use strict";var _o24,r = this && this.__extends || (_o24 = function o(e, t) {return (_o24 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o24(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());});t.__esModule = !0, t.VideoMessagePayloadImprover = void 0;var i = function (e) {function t() {return e.call(this) || this;}return r(t, e), t.prototype.setPayload = function (e, t) {e.content;var n = t.payload,o = "?x-oss-process=video/snapshot,t_0000,f_jpg,w_" + n.video.width + ",m_fast,ar_auto";n.video.url = e.content.url, n.thumbnail.url = e.content.url + o, n.video.name = e.content.newFileName;}, t;}(n(60).FileMessagePayloadImprover);t.VideoMessagePayloadImprover = i;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(19),r = function () {function e(e, t, n, o) {this.validate(e), this.mt = e.type, this.to = t.id.toString(), this.d = JSON.stringify(t.data), this.p = JSON.stringify(e.payload), n && (this.nt = n), o && (this.at = o), this.t = t.type, this.guid = e.messageId;}return e.prototype.validate = function (e) {if (e.type === o.MessageType.TEXT && JSON.stringify(e.payload).length > 3072) throw Error("message-length limit 3kb");}, e;}();t["default"] = r;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t.eventCenter = undefined;var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(0),i = n(16);var s = new (function () {function e() {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.subs = null, this.subs = Object.create(null);}return o(e, [{ key: "on", value: function value(e, t) {if (!r.calibrator.isString(e)) throw Error("eventType require a string.");if (!r.calibrator.isDef(i.ImApiEvents[e])) throw Error("event not found.");if (!r.calibrator.isFunction(t)) throw Error("event require a callback.");this.subs[e] = t;} }, { key: "notify", value: function value(e, t) {var n = this.subs[e];n && n(t);} }]), e;}())();t.eventCenter = s;}, function (e, t, n) {"use strict";var o = this && this.__awaiter || function (e, t, n, o) {return new (n || (n = Promise))(function (r, i) {function s(e) {try {u(o.next(e));} catch (t) {i(t);}}function a(e) {try {u(o["throw"](e));} catch (t) {i(t);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(s, a);}u((o = o.apply(e, t || [])).next());});},r = this && this.__generator || function (e, t) {var n,o,r,i,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return i = { next: a(0), "throw": a(1), "return": a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (n) throw new TypeError("Generator is already executing.");for (; s;) {try {if (n = 1, o && (r = 2 & i[0] ? o["return"] : i[0] ? o["throw"] || ((r = o["return"]) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {case 0:case 1:r = i;break;case 4:return s.label++, { value: i[1], done: !1 };case 5:s.label++, o = i[1], i = [0];continue;case 7:i = s.ops.pop(), s.trys.pop();continue;default:if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {s = 0;continue;}if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {s.label = i[1];break;}if (6 === i[0] && s.label < r[1]) {s.label = r[1], r = i;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(i);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}i = t.call(e, s);} catch (a) {i = [6, a], o = 0;} finally {n = r = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};t.__esModule = !0;var i = n(141),s = n(10),a = n(20),u = n(6),c = n(15),l = n(17),f = n(2),p = n(7),h = n(8),d = n(156),y = n(158),m = n(62),v = n(64),g = function () {function e() {var e = this;this.conversations = new i.Conversations(), this.topper = new y["default"](this.conversations), this.remover = new d["default"](this.conversations), u.im._goEasySocket.addMessageObserver(c.RemoteEvents.IM_MSG_READ, this.onRemoteMarkRead.bind(this)), u.im._goEasySocket.addMessageObserver(c.RemoteEvents.IM_MSG_DELETED, this.onRemoteMessageDeleted.bind(this)), u.im._goEasySocket.addMessageObserver(c.RemoteEvents.IM_MSG_RECALLED, this.onRemoteMessageRecalled.bind(this)), u.im._goEasySocket.addDisconnectedObserver(this.onDisconnected.bind(this)), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.MESSAGE_SENDING, function (t) {return e.onMessageSending(t);}), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.MESSAGE_SEND_SUCCESS, function (t) {return e.onMessageSendSuccess(t);}), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.MESSAGE_RECEIVED, function (t) {return e.onMessageReceived(t);}), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_DELETED, function (t) {return e.onRemoteMessageDeleted(t);}), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_READ, function (t) {return e.onRemoteMarkRead(t);}), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.UNREAD_MESSAGE_CHANGED, function () {return e.onUnreadMessageChanged();}), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, function (t) {return e.onMaxMessageChanged(t);}), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_RECALLED, function (t) {return e.onRemoteMessageRecalled(t);});}return e.prototype.latestConversations = function () {return this.conversations.latestConversations();}, e.prototype.history = function (e) {var t = this;this.transformOptions(e);var n = l.Target.byIds(e.userId, e.groupId),o = n.scene,r = n.id,i = this.conversations.findOrCreateConversation(o, r),s = i.maxMessageTime();i.history.loadHistory(e).then(function () {s !== i.maxMessageTime() && (t.conversations.correctPosition(i), i.initialData().then(function () {t.conversations.onUpdated();}));})["catch"](function (e) {console.error("Failed to load history:", e);});}, e.prototype.topPrivateConversation = function (e) {if (this.topper.validateOptions(f.Scene.PRIVATE, e)) {var t = l.Target.byScene(f.Scene.PRIVATE, e.userId),n = e.top;this.topper.top(t, n, e);}}, e.prototype.topGroupConversation = function (e) {if (this.topper.validateOptions(f.Scene.GROUP, e)) {var t = l.Target.byScene(f.Scene.GROUP, e.groupId),n = e.top;this.topper.top(t, n, e);}}, e.prototype.removePrivateConversation = function (e) {if (this.remover.validateOptions(f.Scene.PRIVATE, e)) {var t = l.Target.byScene(f.Scene.PRIVATE, e.userId);this.remover.remove(t, e);}}, e.prototype.removeGroupConversation = function (e) {if (this.remover.validateOptions(f.Scene.GROUP, e)) {var t = l.Target.byScene(f.Scene.GROUP, e.groupId);this.remover.remove(t, e);}}, e.prototype.onMessageSending = function (e) {var t = this,n = l.Target.byIMMessage(e),o = n.scene,r = n.id,i = this.conversations.findOrCreateConversation(o, r);i.history.saveMessage(e), this.conversations.correctPosition(i), i.initialData().then(function () {t.conversations.onUpdated();});}, e.prototype.onMessageSendSuccess = function (e) {var t = l.Target.byIMMessage(e),n = t.scene,o = t.id,r = this.conversations.findConversation(n, o);r.history.onMessageSendSuccess(e), this.conversations.correctPosition(r), this.conversations.onUpdated();}, e.prototype.onMessageReceived = function (e) {var t = this,n = l.Target.byIMMessage(e),o = n.scene,r = n.id,i = this.conversations.findOrCreateConversation(o, r);i.history.onMessageReceived(e) && (this.conversations.correctPosition(i), i.initialData().then(function () {t.conversations.onUpdated();}));}, e.prototype.privateMarkAsRead = function (e) {var t = l.Target.byScene(f.Scene.PRIVATE, e.userId);this.markAsRead(t, e);}, e.prototype.groupMarkAsRead = function (e) {var t = l.Target.byScene(f.Scene.GROUP, e.groupId);this.markAsRead(t, e);}, e.prototype.markAsRead = function (e, t) {return o(this, void 0, void 0, function () {var n;return r(this, function (o) {switch (o.label) {case 0:return h.CallbackUtils.validateCallbackOptions(t), this.validateTarget(e), n = this.conversations.findConversation(e.scene, e.id), p.calibrator.isDef(n) ? [4, n.history.markRead(t)] : [3, 2];case 1:return o.sent(), [3, 3];case 2:h.CallbackUtils.onFailed(t, { code: 400, content: "No unread message that could be marked." }), o.label = 3;case 3:return [2];}});});}, e.prototype.onRemoteMarkRead = function (e) {var t = l.Target.byMessageReadRemoteEvent(e),n = this.conversations.findConversation(t.scene, t.id);p.calibrator.isDef(n) && n.history.markByRemoteEvent(e);}, e.prototype.deleteMessage = function (e) {return o(this, void 0, void 0, function () {var t, n, o;return r(this, function (r) {switch (r.label) {case 0:return m["default"].validate(e), t = e.messages[0], n = l.Target.byIMMessage(t), o = this.conversations.findConversation(n.scene, n.id), p.calibrator.isDef(o) ? [4, o.history.deleteMessages(e)] : [3, 2];case 1:return r.sent(), [3, 3];case 2:throw { code: 400, content: "No message that could be deleted" };case 3:return [2];}});});}, e.prototype.onRemoteMessageDeleted = function (e) {var t = l.Target.byIMMessageDeletedEvent(e),n = this.conversations.findConversation(t.scene, t.id);p.calibrator.isDef(n) && n.history.syncDeletedMessage(e.deleterId, e.times);}, e.prototype.recallMessage = function (e) {return o(this, void 0, void 0, function () {var t, n, o;return r(this, function (r) {switch (r.label) {case 0:return v["default"].validate(e), t = e.messages[0], n = l.Target.byIMMessage(t), o = this.conversations.findConversation(n.scene, n.id), p.calibrator.isDef(o) ? [4, o.history.recallMessage(e)] : [3, 2];case 1:return r.sent(), [3, 3];case 2:throw { code: 400, content: "No message that could be recalled" };case 3:return [2];}});});}, e.prototype.onRemoteMessageRecalled = function (e) {var t = l.Target.byMessageRecalledRemoteEvent(e),n = this.conversations.findConversation(t.scene, t.id);p.calibrator.isDef(n) && n.history.syncRecalledMessage(e.times);}, e.prototype.onDisconnected = function () {this.conversations.expireAllMessageCaches();}, e.prototype.transformOptions = function (e) {if (h.CallbackUtils.validateCallbackOptions(e), !p.calibrator.isObject(e) || !p.calibrator.isDef(e.userId) && !p.calibrator.isDef(e.groupId)) throw { code: 400, content: "userId or groupId is required" };if (p.calibrator.isDef(e.userId) && p.calibrator.isDef(e.groupId)) throw { code: 400, content: "only contain userId or groupId" };p.calibrator.isUndef(e.limit) && (e.limit = 10), e.limit > 30 && (e.limit = 30), p.calibrator.isDef(e.userId) ? p.calibrator.isStringOrNumber(e.userId) || h.CallbackUtils.onFailed(e, { code: 400, content: "Failed to query history: userId require string or number" }) : p.calibrator.isStringOrNumber(e.groupId) || h.CallbackUtils.onFailed(e, { code: 400, content: "Failed to query history: groupId require string or number" });}, e.prototype.validateTarget = function (e) {var t = e.scene === f.Scene.PRIVATE ? "userId" : "groupId";if (p.calibrator.isUndef(e.id) || p.calibrator.isEmpty(e.id) || !p.calibrator.isStringOrNumber(e.id)) throw { code: 400, content: t + " requires string or number" };}, e.prototype.onUnreadMessageChanged = function () {this.conversations.onUpdated();}, e.prototype.onMaxMessageChanged = function (e) {var t = this.conversations.findConversation(e.scene, e.id);this.conversations.correctPosition(t), this.conversations.onUpdated();}, e;}();t["default"] = g;}, function (e, t, n) {"use strict";var _o25,r = this && this.__extends || (_o25 = function o(e, t) {return (_o25 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o25(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());}),i = this && this.__awaiter || function (e, t, n, o) {return new (n || (n = Promise))(function (r, i) {function s(e) {try {u(o.next(e));} catch (t) {i(t);}}function a(e) {try {u(o["throw"](e));} catch (t) {i(t);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(s, a);}u((o = o.apply(e, t || [])).next());});},s = this && this.__generator || function (e, t) {var n,o,r,i,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return i = { next: a(0), "throw": a(1), "return": a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (n) throw new TypeError("Generator is already executing.");for (; s;) {try {if (n = 1, o && (r = 2 & i[0] ? o["return"] : i[0] ? o["throw"] || ((r = o["return"]) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {case 0:case 1:r = i;break;case 4:return s.label++, { value: i[1], done: !1 };case 5:s.label++, o = i[1], i = [0];continue;case 7:i = s.ops.pop(), s.trys.pop();continue;default:if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {s = 0;continue;}if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {s.label = i[1];break;}if (6 === i[0] && s.label < r[1]) {s.label = r[1], r = i;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(i);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}i = t.call(e, s);} catch (a) {i = [6, a], o = 0;} finally {n = r = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};t.__esModule = !0, t.Conversations = void 0;var a = n(142),u = n(6),c = n(3),l = n(1),f = n(4),p = n(0),h = n(2),d = n(33),y = n(5),m = n(16),v = n(61),g = function () {function e() {this.list = new Array(), this.builder = new d.RemoteAbbrMessageBuilder();}return e.prototype.onUpdated = function () {this.loadLocalConversationsAsDtos().then(function (e) {u.im._event.notify(m.ImApiEvents.CONVERSATIONS_UPDATED, { unreadTotal: e.content.unreadTotal, conversations: e.content.conversations });});}, e.prototype.latestConversations = function () {return this.synchronized ? this.loadLocalConversationsAsDtos() : this.loadServerConversations();}, e.prototype.loadServerConversations = function () {var e = this;return new Promise(function (t, n) {var o = new c["default"]({ name: y.RocketTypes.imLastConversations, params: {}, permission: l["default"].READ, singleTimeout: f.SocketTimeout.commonQuerySingle, totalTimeout: f.SocketTimeout.commonQueryTotal, fail: function fail(e) {n(e);}, success: function success(o) {return i(e, void 0, void 0, function () {var e, r, i, a, c, l, f, p, d, y;return s(this, function (s) {if (200 === o.code) {for (e = o.content, r = 0; r < e.length; r++) {i = e[r], a = i.t, c = i.top, l = i.d ? JSON.parse(i.d) : {}, f = a === h.Scene.PRIVATE ? i.uid : i.g, u.im._dataCache.putData(a, f, l), (p = this.findOrCreateConversation(a, f)).top = c, p.data = l, (d = i.lmsg).t = a, y = this.builder.build(d), p.history.initMaxMessageAndOffsets(y, i.userOffsets), this.correctPosition(p);}this.synchronized = !0, this.loadLocalConversationsAsDtos().then(function (e) {t(e);});} else n(o);return [2];});});} });u.im._goEasySocket.emit(o);});}, e.prototype.loadLocalConversationsAsDtos = function () {var e = this;return new Promise(function (t, n) {for (var o = new Array(), r = e.list.length, i = 0; i < r; i++) {var s = e.list[i];if (s.history.messageCache.getMaxMessage()) {var a = s.toDto();o.push(a);}}t({ code: 200, content: { unreadTotal: e.getUnreadTotal(), conversations: o } });});}, e.prototype.findOrCreateConversation = function (e, t) {var n = this.findConversation(e, t);return p.calibrator.isUndef(n) && (n = new a.Conversation(e, t), this.insertOne(n)), n;}, e.prototype.findConversationIndex = function (e, t) {return this.list.findIndex(function (n) {return e === h.Scene.GROUP && t === n.targetId || e === h.Scene.PRIVATE && t === n.targetId;});}, e.prototype.findConversation = function (e, t) {var n = this.findConversationIndex(e, t);return this.list[n];}, e.prototype.removeLocalConversation = function (e) {var t = e.getTargetId(),n = e.getScene(),o = this.findConversationIndex(n, t);this.list.splice(o, 1);}, e.prototype.topLocalConversation = function (e, t) {e.top = t, this.correctPosition(e), this.onUpdated();}, e.prototype.getUnreadTotal = function () {var e = 0;return this.list.forEach(function (t) {e += t.history.messageCache.unreadAmount();}), e;}, e.prototype.insertOne = function (t) {e.sortedInserter.insert(this.list, t), this.list.length > e.CONVERSATIONS_MAX_LENGTH && (this.list = this.list.slice(0, e.CONVERSATIONS_MAX_LENGTH));}, e.prototype.correctPosition = function (e) {this.removeLocalConversation(e), this.insertOne(e);}, e.prototype.expireAllMessageCaches = function () {this.list.forEach(function (e) {e.history.expire();});}, e.CONVERSATIONS_MAX_LENGTH = 200, e.sortedInserter = new (function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.compare = function (e, t) {var n;if (e.top == t.top) {var o = e.maxMessageTime();n = t.maxMessageTime() - o;} else n = e.top ? -1 : 1;return 0 === n ? 0 : n > 0 ? 1 : -1;}, t;}(v.SortedInserter))(), e;}();t.Conversations = g;}, function (e, t, n) {"use strict";var o = this && this.__awaiter || function (e, t, n, o) {return new (n || (n = Promise))(function (r, i) {function s(e) {try {u(o.next(e));} catch (t) {i(t);}}function a(e) {try {u(o["throw"](e));} catch (t) {i(t);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(s, a);}u((o = o.apply(e, t || [])).next());});},r = this && this.__generator || function (e, t) {var n,o,r,i,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return i = { next: a(0), "throw": a(1), "return": a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (n) throw new TypeError("Generator is already executing.");for (; s;) {try {if (n = 1, o && (r = 2 & i[0] ? o["return"] : i[0] ? o["throw"] || ((r = o["return"]) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {case 0:case 1:r = i;break;case 4:return s.label++, { value: i[1], done: !1 };case 5:s.label++, o = i[1], i = [0];continue;case 7:i = s.ops.pop(), s.trys.pop();continue;default:if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {s = 0;continue;}if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {s.label = i[1];break;}if (6 === i[0] && s.label < r[1]) {s.label = r[1], r = i;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(i);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}i = t.call(e, s);} catch (a) {i = [6, a], o = 0;} finally {n = r = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};t.__esModule = !0, t.Conversation = void 0;var i = n(2),s = n(6),a = n(143),u = n(17),c = function () {function e(e, t) {this.top = !1, this.data = {}, this.scene = e, this.targetId = t, this.history = new a["default"](u.Target.byScene(e, t));}return e.prototype.toDto = function () {var e = new i.ConversationDTO();return e.type = this.scene, this.scene === i.Scene.PRIVATE ? e.userId = this.targetId : this.scene === i.Scene.GROUP && (e.groupId = this.targetId), e.lastMessage = this.history.messageCache.getMaxMessage(), e.unread = this.history.messageCache.unreadAmount(), e.top = this.top, e.data = this.data, e;}, e.prototype.initialData = function () {return o(this, void 0, void 0, function () {var e;return r(this, function (t) {switch (t.label) {case 0:return e = this, [4, this.getData()];case 1:return e.data = t.sent(), [2];}});});}, e.prototype.getData = function () {return s.im._dataCache.loadData(this.targetId, this.scene);}, e.prototype.getTargetId = function () {return this.targetId;}, e.prototype.getScene = function () {return this.scene;}, e.prototype.maxMessageTime = function () {return this.history.messageCache.maxTime();}, e;}();t.Conversation = c;}, function (e, t, n) {"use strict";var o = this && this.__awaiter || function (e, t, n, o) {return new (n || (n = Promise))(function (r, i) {function s(e) {try {u(o.next(e));} catch (t) {i(t);}}function a(e) {try {u(o["throw"](e));} catch (t) {i(t);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(s, a);}u((o = o.apply(e, t || [])).next());});},r = this && this.__generator || function (e, t) {var n,o,r,i,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return i = { next: a(0), "throw": a(1), "return": a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (n) throw new TypeError("Generator is already executing.");for (; s;) {try {if (n = 1, o && (r = 2 & i[0] ? o["return"] : i[0] ? o["throw"] || ((r = o["return"]) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {case 0:case 1:r = i;break;case 4:return s.label++, { value: i[1], done: !1 };case 5:s.label++, o = i[1], i = [0];continue;case 7:i = s.ops.pop(), s.trys.pop();continue;default:if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {s = 0;continue;}if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {s.label = i[1];break;}if (6 === i[0] && s.label < r[1]) {s.label = r[1], r = i;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(i);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}i = t.call(e, s);} catch (a) {i = [6, a], o = 0;} finally {n = r = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};t.__esModule = !0;var i = n(6),s = n(2),a = n(8),u = n(16),c = n(10),l = n(20),f = n(144),p = n(146),h = n(62),d = n(150),y = n(64),m = function () {function e(e) {this.expiredTime = 0, this.target = e, this.userOffsetService = new p["default"](e), this.messageCache = new f["default"](e, this.userOffsetService);}return e.prototype.initMaxMessageAndOffsets = function (e, t) {if (!this.messageCache.existsMessage(e.messageId)) {if (this.userOffsetService.updateUserOffsets(t), this.target.scene === s.Scene.PRIVATE) {var n = e;n.read = this.userOffsetService.isRead(n);}this.messageCache.saveMessage(e);}}, e.prototype.loadHistory = function (e) {return o(this, void 0, void 0, function () {var t;return r(this, function (n) {switch (n.label) {case 0:if (!(this.expiredTime > 0) || this.messageCache.isEmpty()) return [3, 4];n.label = 1;case 1:return n.trys.push([1, 3,, 4]), [4, this.updateByServerChange()];case 2:return n.sent(), [3, 4];case 3:return t = n.sent(), a.CallbackUtils.onFailed(e, t), [3, 4];case 4:return [4, this.messageCache.loadHistory(e)];case 5:return n.sent(), [2];}});});}, e.prototype.saveMessage = function (e) {this.messageCache.saveMessage(e);}, e.prototype.deleteMessages = function (e) {return o(this, void 0, void 0, function () {var t, n;return r(this, function (o) {switch (o.label) {case 0:return t = this.messageCache.getMaxMessage(), n = e.messages, [4, h["default"].deleteServerMessages(n)];case 1:return o.sent(), this.messageCache.deleteMessages(n), a.CallbackUtils.onSuccess(e), n.includes(t) && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target), [2];}});});}, e.prototype.syncDeletedMessage = function (e, t) {if (e === i.IM.userId) {var n = this.messageCache.getMaxMessage(),o = this.messageCache.findMessagesByTimes(t);this.messageCache.deleteMessages(o), i.im._event.notify(u.ImApiEvents.MESSAGE_DELETED, o), o.includes(n) && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target);}}, e.prototype.recallMessage = function (e) {return o(this, void 0, void 0, function () {var t, n;return r(this, function (o) {switch (o.label) {case 0:return t = this.messageCache.getMaxMessage(), n = e.messages, [4, y["default"].recallServerMessages(n)];case 1:return o.sent(), this.messageCache.recallMessages(n), a.CallbackUtils.onSuccess(e), n.includes(t) && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target), [2];}});});}, e.prototype.syncRecalledMessage = function (e) {var t = this.messageCache.getMaxMessage(),n = this.messageCache.findMessagesByTimes(e);n.length > 0 && (this.messageCache.recallMessages(n), i.im._event.notify(u.ImApiEvents.MESSAGE_RECALLED, n), this.existsUnreadMessage(n) ? c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.UNREAD_MESSAGE_CHANGED) : n.includes(t) && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target));}, e.prototype.existsUnreadMessage = function (e) {for (var t = this.userOffsetService.myOffset(), n = 0; n < e.length; n++) {if (t < e[n].timestamp) return !0;}return !1;}, e.prototype.expire = function () {this.messageCache.isEmpty() || (this.expiredTime = this.messageCache.maxSuccessMessageTime());}, e.prototype.updateByServerChange = function () {return o(this, void 0, void 0, function () {var e, t;return r(this, function (n) {switch (n.label) {case 0:return e = this.target.scene, t = this.target.id, [4, d.ChangeSynchronizer.sync(e, t, this.expiredTime, this.messageCache.minTime())];case 1:return n.sent(), this.expiredTime = 0, [2];}});});}, e.prototype.markRead = function (e) {return o(this, void 0, void 0, function () {var t, n, o;return r(this, function (r) {switch (r.label) {case 0:if (this.messageCache.isEmpty()) return a.CallbackUtils.onSuccess(e), [2];t = this.messageCache.maxSuccessMessageTime(), n = !1, r.label = 1;case 1:return r.trys.push([1, 3,, 4]), [4, this.userOffsetService.manualMark(t)];case 2:return n = r.sent(), [3, 4];case 3:return o = r.sent(), a.CallbackUtils.onFailed(e, o), [2];case 4:return n && (this.messageCache.markOthersSentRead(t), c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.UNREAD_MESSAGE_CHANGED)), a.CallbackUtils.onSuccess(e), [2];}});});}, e.prototype.markByRemoteEvent = function (e) {var t = e.time;e.markerId === i.IM.userId ? this.synchronizeUnreadAmountByOtherDevices(t) : this.markMySentMessagesRead(t);}, e.prototype.synchronizeUnreadAmountByOtherDevices = function (e) {this.userOffsetService.updateMyOffset(e) && (this.messageCache.markOthersSentRead(e), c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.UNREAD_MESSAGE_CHANGED));}, e.prototype.markMySentMessagesRead = function (e) {if (this.target.scene === s.Scene.PRIVATE) {this.userOffsetService.updateOffset(this.target.id, e);var t = this.messageCache.markMySentRead(e);t.length > 0 && i.im._event.notify(u.ImApiEvents.MESSAGE_READ, t), e === this.messageCache.maxSuccessMessageTime() && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target);}}, e.prototype.onMessageSendSuccess = function (e) {if (this.target.scene === s.Scene.PRIVATE) {var t = e;t.read || (t.read = this.userOffsetService.isRead(t), t.read && i.im._event.notify(u.ImApiEvents.MESSAGE_READ, [t]));}this.messageCache.correctPosition(e), this.userOffsetService.updateMyOffset(e.timestamp);}, e.prototype.onMessageReceived = function (e) {if (!this.messageCache.existsMessage(e.messageId)) {this.saveMessage(e);var t = e.timestamp;if (e.senderId == i.IM.userId) this.userOffsetService.updateMyOffset(t) && this.messageCache.markOthersSentRead(t);else if (this.target.scene === s.Scene.PRIVATE) {this.userOffsetService.updateOffset(this.target.id, t);var n = this.messageCache.markMySentRead(t);n.length > 0 && i.im._event.notify(u.ImApiEvents.MESSAGE_READ, n);}var o = this.target.scene;return o === s.Scene.PRIVATE ? i.im._event.notify(u.ImApiEvents.PRIVATE_MESSAGE_RECEIVED, e) : o === s.Scene.GROUP && i.im._event.notify(u.ImApiEvents.GROUP_MESSAGE_RECEIVED, e), !0;}return !1;}, e;}();t["default"] = m;}, function (e, t, n) {"use strict";var _o26,r = this && this.__extends || (_o26 = function o(e, t) {return (_o26 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_o26(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());}),i = this && this.__awaiter || function (e, t, n, o) {return new (n || (n = Promise))(function (r, i) {function s(e) {try {u(o.next(e));} catch (t) {i(t);}}function a(e) {try {u(o["throw"](e));} catch (t) {i(t);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(s, a);}u((o = o.apply(e, t || [])).next());});},s = this && this.__generator || function (e, t) {var n,o,r,i,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return i = { next: a(0), "throw": a(1), "return": a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (n) throw new TypeError("Generator is already executing.");for (; s;) {try {if (n = 1, o && (r = 2 & i[0] ? o["return"] : i[0] ? o["throw"] || ((r = o["return"]) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {case 0:case 1:r = i;break;case 4:return s.label++, { value: i[1], done: !1 };case 5:s.label++, o = i[1], i = [0];continue;case 7:i = s.ops.pop(), s.trys.pop();continue;default:if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {s = 0;continue;}if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {s.label = i[1];break;}if (6 === i[0] && s.label < r[1]) {s.label = r[1], r = i;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(i);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}i = t.call(e, s);} catch (a) {i = [6, a], o = 0;} finally {n = r = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}},a = this && this.__values || function (e) {var t = "function" == typeof Symbol && Symbol.iterator,n = t && e[t],o = 0;if (n) return n.call(e);if (e && "number" == typeof e.length) return { next: function next() {return e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e };} };throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");};t.__esModule = !0;var u = n(3),c = n(1),l = n(4),f = n(6),p = n(2),h = n(33),d = n(145),y = n(5),m = n(8),v = n(7),g = n(61),b = function () {function e(e, t) {this.builder = new h.RemoteAbbrMessageBuilder(), this.messages = new Array(), this.allLoaded = !1, this.target = e, this.userOffsetService = t;}return e.prototype.sliceOverlengthMessages = function () {this.messages.length > e.CACHE_MAX_LENGTH && (this.messages = this.messages.slice(-e.CACHE_MAX_LENGTH), !0 === this.allLoaded && (this.allLoaded = !1));}, e.prototype.unreadAmount = function () {var e,t,n = 0,o = this.userOffsetService.myOffset();try {for (var r = a(this.messages), i = r.next(); !i.done; i = r.next()) {var s = i.value;s.senderId !== f.IM.userId && s.timestamp > o && !s.recalled && (n += 1);}} catch (u) {e = { error: u };} finally {try {i && !i.done && (t = r["return"]) && t.call(r);} finally {if (e) throw e.error;}}return n;}, e.prototype.maxTime = function () {var e = this.getMaxMessage();return v.calibrator.isDef(e) ? e.timestamp : 0;}, e.prototype.getMaxMessage = function () {return this.messages[this.messages.length - 1];}, e.prototype.loadHistory = function (e) {return i(this, void 0, void 0, function () {var t, n, o, r, i, a, u, c;return s(this, function (s) {switch (s.label) {case 0:if (t = e.limit, n = e.lastTimestamp, o = this.loadLocalMessages(t, n), !1 !== this.allLoaded || o.length === t) return [3, 4];r = t - o.length, i = o[0] ? o[0].timestamp : n, a = { userId: e.userId, groupId: e.groupId, lastTimestamp: i, limit: r }, s.label = 1;case 1:return s.trys.push([1, 3,, 4]), [4, this.loadServerMessages(a)];case 2:return u = s.sent(), o = u.concat(o), [3, 4];case 3:return c = s.sent(), m.CallbackUtils.onFailed(e, c), [3, 4];case 4:return m.CallbackUtils.onSuccess(e, { code: 200, content: o }), [2];}});});}, e.prototype.loadLocalMessages = function (e, t) {var n = [],o = this.messages.length;if (t) {if (o > 0) {var r = this.messages[0].timestamp,i = this.messages[o - 1].timestamp;if (t >= r && t <= i) for (var s = o - 1; s >= 0; s--) {var a = this.messages[s];if (a.timestamp < t) {if (!(n.length < e)) break;n.unshift(a);}}}} else n = this.messages.slice(-e);return n;}, e.prototype.loadServerMessages = function (t) {var n = this,o = new d["default"](t);return new Promise(function (r, i) {var s = new u["default"]({ name: y.RocketTypes.IM_HISTORY, params: o, permission: c["default"].READ, singleTimeout: l.SocketTimeout.commonQuerySingle, totalTimeout: l.SocketTimeout.commonQueryTotal, fail: function fail(e) {i({ code: e.code || 408, content: e.content || "Failed to query message" });}, success: function success(o) {if (200 === o.code) {var s = o.content,a = s.messages;n.userOffsetService.updateUserOffsets(s.userOffsets);var u = n.convertServerMessages(a);n.messages.length < e.CACHE_MAX_LENGTH && (n.cacheServerMessages(t, u), a.length < t.limit && (n.allLoaded = !0)), r(u);} else i(o);} });f.im._goEasySocket.emit(s);});}, e.prototype.cacheServerMessages = function (e, t) {var n = this.messages[0],o = this.messages.length;(!e.lastTimestamp || o > 0 && n.timestamp === e.lastTimestamp) && (this.messages = t.concat(this.messages));}, e.prototype.findMessageByTime = function (e) {return this.messages.find(function (t) {return e === t.timestamp;});}, e.prototype.findMessagesByTimes = function (e) {var t = this,n = [];return e.forEach(function (e) {var o = t.findMessageByTime(e);v.calibrator.isDef(o) && n.push(o);}), n;}, e.prototype.existsMessage = function (e) {return this.findMessageIndexById(e) > -1;}, e.prototype.findMessageIndexById = function (e) {return this.messages.findIndex(function (t) {return e === t.messageId;});}, e.prototype.deleteMessage = function (e) {var t = this.findMessageIndexById(e);t >= 0 && this.messages.splice(t, 1);}, e.prototype.recallMessages = function (e) {var t = this;e.forEach(function (e) {var n = t.findMessageByTime(e.timestamp);v.calibrator.isDef(n) && (n.recalled = !0), e.recalled = !0;});}, e.prototype.isEmpty = function () {return 0 === this.messages.length;}, e.prototype.deleteMessages = function (e) {var t = this;e.forEach(function (e) {t.deleteMessage(e.messageId);});}, e.prototype.convertServerMessages = function (e) {var t = this,n = [];return e.forEach(function (e) {t.target.scene === p.Scene.PRIVATE ? (e.t = p.Scene.PRIVATE, e.r = e.s === f.IM.userId ? t.target.id : f.IM.userId) : (e.t = p.Scene.GROUP, e.r = t.target.id);var o = t.builder.build(e);if (!t.existsMessage(o.messageId)) {if (o.scene() === p.Scene.PRIVATE) {var r = o;r.read = t.userOffsetService.isRead(r);}n.push(o);}}), n;}, e.prototype.markOthersSentRead = function (e) {if (this.target.scene === p.Scene.PRIVATE) for (var t = this.messages.length - 1; t >= 0; t--) {var n = this.messages[t];if (n.senderId !== f.IM.userId && n.timestamp <= e) {if (n.read) break;n.read = !0;}}}, e.prototype.markMySentRead = function (e) {for (var t = new Array(), n = this.messages.length - 1; n >= 0; n--) {var o = this.messages[n],r = o;if (r.senderId === f.IM.userId && o.timestamp <= e && o.status === p.MessageStatus.SUCCESS) {if (r.read) break;r.read = !0, t.push(r);}}return t;}, e.prototype.saveMessage = function (t) {e.sortedInserter.insert(this.messages, t), this.sliceOverlengthMessages();}, e.prototype.maxSuccessMessageTime = function () {for (var e = this.messages.length - 1; e >= 0; e--) {if (this.messages[e].status === p.MessageStatus.SUCCESS) return this.messages[e].timestamp;}return 0;}, e.prototype.minTime = function () {return this.isEmpty() ? 0 : this.messages[0].timestamp;}, e.prototype.correctPosition = function (e) {this.deleteMessage(e.messageId), this.saveMessage(e);}, e.CACHE_MAX_LENGTH = 200, e.sortedInserter = new (function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.compare = function (e, t) {var n = e.timestamp - t.timestamp;return n > 0 ? 1 : 0 === n ? 0 : -1;}, t;}(g.SortedInserter))(), e;}();t["default"] = b;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = n(2),r = n(7),i = function () {return function (e) {r.calibrator.isDef(e.userId) ? (this.scene = o.Scene.PRIVATE, this.id = e.userId) : (this.scene = o.Scene.GROUP, this.id = e.groupId), this.id = this.id.toString(), this.lastTimestamp = e.lastTimestamp, this.limit = e.limit;};}();t["default"] = i;}, function (e, t, n) {"use strict";var o = this && this.__awaiter || function (e, t, n, o) {return new (n || (n = Promise))(function (r, i) {function s(e) {try {u(o.next(e));} catch (t) {i(t);}}function a(e) {try {u(o["throw"](e));} catch (t) {i(t);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(s, a);}u((o = o.apply(e, t || [])).next());});},r = this && this.__generator || function (e, t) {var n,o,r,i,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return i = { next: a(0), "throw": a(1), "return": a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (n) throw new TypeError("Generator is already executing.");for (; s;) {try {if (n = 1, o && (r = 2 & i[0] ? o["return"] : i[0] ? o["throw"] || ((r = o["return"]) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {case 0:case 1:r = i;break;case 4:return s.label++, { value: i[1], done: !1 };case 5:s.label++, o = i[1], i = [0];continue;case 7:i = s.ops.pop(), s.trys.pop();continue;default:if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {s = 0;continue;}if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {s.label = i[1];break;}if (6 === i[0] && s.label < r[1]) {s.label = r[1], r = i;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(i);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}i = t.call(e, s);} catch (a) {i = [6, a], o = 0;} finally {n = r = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};t.__esModule = !0;var i = n(6),s = n(3),a = n(1),u = n(4),c = n(2),l = n(147),f = n(5),p = n(148),h = function () {function e(e) {this.userOffsets = new p.UserOffsets(), this.target = e;}return e.prototype.isRead = function (e) {var t = e.timestamp;return e.senderId === i.IM.userId ? this.userOffsets.getOffset(e.receiverId) >= t : this.userOffsets.myOffset() >= t;}, e.prototype.manualMark = function (e) {return o(this, void 0, void 0, function () {var t;return r(this, function (n) {switch (n.label) {case 0:return this.userOffsets.markingTime = e, t = this.userOffsets.myOffset(), e > t ? [4, this.updateServerOffsets(e)] : [3, 2];case 1:if (n.sent(), e === this.userOffsets.markingTime) return this.userOffsets.updateMyOffset(e), [2, !0];n.label = 2;case 2:return [2, !1];}});});}, e.prototype.updateMyOffset = function (e) {return this.userOffsets.updateMyOffset(e);}, e.prototype.updateOffset = function (e, t) {this.userOffsets.updateOffset(e, t);}, e.prototype.updateServerOffsets = function (e) {return o(this, void 0, void 0, function () {var t, n;return r(this, function (o) {return (t = new l.ReadMessageMarkRequest()).lastTimestamp = e, t.lastConsumedTimestamp = this.userOffsets.myOffset(), n = f.RocketTypes.markGroupMessageAsRead, this.target.scene === c.Scene.PRIVATE ? (t.friendId = this.target.id, n = f.RocketTypes.markPrivateMessageAsRead) : t.groupId = this.target.id, [2, new Promise(function (e, o) {var r = new s["default"]({ name: n, params: t, permission: a["default"].WRITE, singleTimeout: u.SocketTimeout.commonRequestSingle, totalTimeout: u.SocketTimeout.commonRequestTotal, success: function success(t) {200 === t.code ? e(t) : o(t);}, fail: function fail(e) {o(e);} });i.im._goEasySocket.emit(r);})];});});}, e.prototype.updateUserOffsets = function (e) {this.userOffsets.updateUserOffsets(e);}, e.prototype.myOffset = function () {return this.userOffsets.myOffset();}, e;}();t["default"] = h;}, function (e, t, n) {"use strict";t.__esModule = !0, t.ReadMessageMarkRequest = void 0;var o = function () {return function () {};}();t.ReadMessageMarkRequest = o;}, function (e, t, n) {"use strict";t.__esModule = !0, t.UserOffsets = void 0;var o = n(7),r = n(6),i = function () {function e() {this.offsetMap = new Map(), this.markingTime = 0;}return e.prototype.updateOffset = function (e, t) {var n = this.offsetMap.get(e);return o.calibrator.isDef(n) ? t > n && (this.offsetMap.set(e, t), !0) : (this.offsetMap.set(e, t), !0);}, e.prototype.updateUserOffsets = function (e) {var t = this;e.forEach(function (e) {var n = e.userId,o = e.offset;t.updateOffset(n, o);});}, e.prototype.updateMyOffset = function (e) {return this.updateOffset(r.IM.userId, e);}, e.prototype.myOffset = function () {return this.getOffset(r.IM.userId);}, e.prototype.getOffset = function (e) {var t = this.offsetMap.get(e);return t || 0;}, e;}();t.UserOffsets = i;}, function (e, t, n) {"use strict";t.__esModule = !0, t.DeleteMessageRequest = void 0;var o = n(2),r = n(17),i = function () {return function (e) {var t = this;this.times = new Array();var n = e[0],i = r.Target.byIMMessage(n);this.scene = i.scene, this.targetId = i.id, e.forEach(function (e) {e.status === o.MessageStatus.SUCCESS && t.times.push(e.timestamp);}), this.times.sort(function (e, t) {return e < t ? -1 : e == t ? 0 : 1;});};}();t.DeleteMessageRequest = i;}, function (e, t, n) {"use strict";t.__esModule = !0, t.ChangeSynchronizer = void 0;var o = n(151),r = n(3),i = n(5),s = n(1),a = n(4),u = n(152),c = n(10),l = n(20),f = n(153),p = n(6),h = n(154),d = n(63),y = function () {function e() {}return e.sync = function (e, t, n, y) {var m = new o["default"](e, t, n, y);return new Promise(function (n, o) {var y = new r["default"]({ name: i.RocketTypes.IM_HISTORY_CHANGE, params: m, permission: s["default"].READ, singleTimeout: a.SocketTimeout.commonQuerySingle, totalTimeout: a.SocketTimeout.commonQueryTotal, fail: function fail(e) {o(e);}, success: function success(r) {if (200 === r.code) {var i = r.content;i.userOffsets.forEach(function (n) {var o = n.userId,r = n.offset,i = new u.ReadMessageMarkedRemoteEvent(e, o, t, r);c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_READ, i);});var s = i.deletedMessageTimes;if (s.length > 0) {var a = new f.MessageDeletedRemoteEvent(e, p.IM.userId, t, s);c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_DELETED, a);}if (i.recalled.length > 0) {var y = d["default"].conversationId(e, p.IM.userId, t),m = new h.MessageRecalledRemoteEvent(e, y, i.recalled);c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_RECALLED, m);}n(r);} else o(r);} });p.im._goEasySocket.emit(y);});}, e;}();t.ChangeSynchronizer = y;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = function () {return function (e, t, n, o) {this.scene = e, this.id = t, this.after = n, this.min = o;};}();t["default"] = o;}, function (e, t, n) {"use strict";t.__esModule = !0, t.ReadMessageMarkedRemoteEvent = void 0;var o = function () {return function (e, t, n, o) {this.scene = e, this.markerId = t, this.targetId = n, this.time = o;};}();t.ReadMessageMarkedRemoteEvent = o;}, function (e, t, n) {"use strict";t.__esModule = !0, t.MessageDeletedRemoteEvent = void 0;var o = function () {return function (e, t, n, o) {this.scene = e, this.deleterId = t, this.targetId = n, this.times = o;};}();t.MessageDeletedRemoteEvent = o;}, function (e, t, n) {"use strict";t.__esModule = !0, t.MessageRecalledRemoteEvent = void 0;var o = function () {return function (e, t, n) {this.scene = e, this.conversationId = t, this.times = n;};}();t.MessageRecalledRemoteEvent = o;}, function (e, t, n) {"use strict";t.__esModule = !0, t.RecallMessageRequest = void 0;var o = n(17),r = function () {return function (e) {var t = this;this.times = new Array();var n = e[0],r = o.Target.byIMMessage(n);this.scene = r.scene, this.targetId = r.id, e.forEach(function (e) {t.times.push(e.timestamp);}), this.times.sort(function (e, t) {return e < t ? -1 : e == t ? 0 : 1;});};}();t.RecallMessageRequest = r;}, function (e, t, n) {"use strict";var o = this && this.__awaiter || function (e, t, n, o) {return new (n || (n = Promise))(function (r, i) {function s(e) {try {u(o.next(e));} catch (t) {i(t);}}function a(e) {try {u(o["throw"](e));} catch (t) {i(t);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(s, a);}u((o = o.apply(e, t || [])).next());});},r = this && this.__generator || function (e, t) {var n,o,r,i,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return i = { next: a(0), "throw": a(1), "return": a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (n) throw new TypeError("Generator is already executing.");for (; s;) {try {if (n = 1, o && (r = 2 & i[0] ? o["return"] : i[0] ? o["throw"] || ((r = o["return"]) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {case 0:case 1:r = i;break;case 4:return s.label++, { value: i[1], done: !1 };case 5:s.label++, o = i[1], i = [0];continue;case 7:i = s.ops.pop(), s.trys.pop();continue;default:if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {s = 0;continue;}if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {s.label = i[1];break;}if (6 === i[0] && s.label < r[1]) {s.label = r[1], r = i;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(i);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}i = t.call(e, s);} catch (a) {i = [6, a], o = 0;} finally {n = r = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};t.__esModule = !0;var i = n(2),s = n(8),a = n(7),u = n(5),c = n(3),l = n(1),f = n(4),p = n(6),h = n(157),d = function () {function e(e) {this.conversations = e;}return e.prototype.remove = function (e, t) {return o(this, void 0, void 0, function () {var n;return r(this, function (o) {switch (o.label) {case 0:return o.trys.push([0, 2,, 3]), [4, this.removeServerConversation(e.scene, e.id)];case 1:return o.sent(), this.removeLocalConversation(e), s.CallbackUtils.onSuccess(t), [3, 3];case 2:return n = o.sent(), s.CallbackUtils.onFailed(t, n), [3, 3];case 3:return [2];}});});}, e.prototype.removeLocalConversation = function (e) {var t = e.scene,n = e.id,o = this.conversations.findConversation(t, n);a.calibrator.isDef(o) && (this.conversations.removeLocalConversation(o), this.conversations.onUpdated());}, e.prototype.removeServerConversation = function (e, t) {var n = new h["default"](e, t);return new Promise(function (e, t) {var o = new c["default"]({ name: u.RocketTypes.removeConversation, params: n, permission: l["default"].WRITE, singleTimeout: f.SocketTimeout.commonRequestSingle, totalTimeout: f.SocketTimeout.commonRequestTotal, success: function success(n) {200 == n.code ? e(n) : t(n);}, fail: function fail(e) {t(e);} });p.im._goEasySocket.emit(o);});}, e.prototype.validateOptions = function (e, t) {if (a.calibrator.isUndef(t)) throw { code: 400, content: "Failed to remove conversation: bad parameters" };if (!a.calibrator.isObject(t)) return s.CallbackUtils.onFailed(t, { code: 400, content: "Failed to remove conversation: bad parameters" }), !1;var n, o;e === i.Scene.PRIVATE ? (n = t.userId, o = "Failed to remove conversation: userId requires string or number") : (n = t.groupId, o = "Failed to remove conversation: groupId requires string or number");if (a.calibrator.isUndef(n) || a.calibrator.isEmpty(n) || !a.calibrator.isStringOrNumber(n)) return s.CallbackUtils.onFailed(t, { code: 400, content: o }), !1;var r = this.conversations.findConversation(e, n.toString());return !a.calibrator.isUndef(r) || (s.CallbackUtils.onFailed(t, { code: 400, content: "Failed to remove conversation: conversation doesn not exists" }), !1);}, e;}();t["default"] = d;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = function () {return function (e, t) {this.type = e, this.targetId = t;};}();t["default"] = o;}, function (e, t, n) {"use strict";var o = this && this.__awaiter || function (e, t, n, o) {return new (n || (n = Promise))(function (r, i) {function s(e) {try {u(o.next(e));} catch (t) {i(t);}}function a(e) {try {u(o["throw"](e));} catch (t) {i(t);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(s, a);}u((o = o.apply(e, t || [])).next());});},r = this && this.__generator || function (e, t) {var n,o,r,i,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return i = { next: a(0), "throw": a(1), "return": a(2) }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {return this;}), i;function a(i) {return function (a) {return function (i) {if (n) throw new TypeError("Generator is already executing.");for (; s;) {try {if (n = 1, o && (r = 2 & i[0] ? o["return"] : i[0] ? o["throw"] || ((r = o["return"]) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {case 0:case 1:r = i;break;case 4:return s.label++, { value: i[1], done: !1 };case 5:s.label++, o = i[1], i = [0];continue;case 7:i = s.ops.pop(), s.trys.pop();continue;default:if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {s = 0;continue;}if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {s.label = i[1];break;}if (6 === i[0] && s.label < r[1]) {s.label = r[1], r = i;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(i);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}i = t.call(e, s);} catch (a) {i = [6, a], o = 0;} finally {n = r = 0;}}if (5 & i[0]) throw i[1];return { value: i[0] ? i[1] : void 0, done: !0 };}([i, a]);};}};t.__esModule = !0;var i = n(2),s = n(8),a = n(7),u = n(5),c = n(3),l = n(1),f = n(4),p = n(6),h = n(159),d = function () {function e(e) {this.conversations = e;}return e.prototype.top = function (e, t, n) {return o(this, void 0, void 0, function () {var o;return r(this, function (r) {switch (r.label) {case 0:return r.trys.push([0, 2,, 3]), [4, this.topServerConversation(e, t)];case 1:return r.sent(), this.topLocalConversation(e, t), s.CallbackUtils.onSuccess(n), [3, 3];case 2:return o = r.sent(), s.CallbackUtils.onFailed(n, o), [3, 3];case 3:return [2];}});});}, e.prototype.topLocalConversation = function (e, t) {var n = e.scene,o = e.id,r = this.conversations.findConversation(n, o);a.calibrator.isDef(r) && this.conversations.topLocalConversation(r, t);}, e.prototype.topServerConversation = function (e, t) {var n = new h["default"](e.scene, t, e.id);return new Promise(function (e, t) {var o = new c["default"]({ name: u.RocketTypes.topConversation, params: n, permission: l["default"].WRITE, singleTimeout: f.SocketTimeout.commonRequestSingle, totalTimeout: f.SocketTimeout.commonRequestTotal, success: function success(n) {200 === n.code ? e(n) : t(n);}, fail: function fail(e) {t(e);} });p.im._goEasySocket.emit(o);});}, e.prototype.validateOptions = function (e, t) {if (a.calibrator.isUndef(t)) throw { code: 400, content: "Failed to top conversation: bad parameters" };if (!a.calibrator.isObject(t)) return s.CallbackUtils.onFailed(t, { code: 400, content: "Failed to top conversation: bad parameters" }), !1;var n, o, r, u;e === i.Scene.PRIVATE ? (n = (u = t).top, o = u.userId, r = "Failed to top conversation: userId requires string or number") : (n = (u = t).top, o = u.groupId, r = "Failed to top conversation: groupId requires string or number");if (a.calibrator.isUndef(o) || a.calibrator.isEmpty(o) || !a.calibrator.isStringOrNumber(o)) return s.CallbackUtils.onFailed(t, { code: 400, content: r }), !1;if (!a.calibrator.isBoolean(n)) return s.CallbackUtils.onFailed(t, { code: 400, content: "Failed to top conversation: top requires boolean" }), !1;var c = this.conversations.findConversation(e, o.toString());return a.calibrator.isUndef(c) ? (s.CallbackUtils.onFailed(t, { code: 400, content: "Failed to top conversation: conversation does not exists" }), !1) : c.top !== n || (s.CallbackUtils.onFailed(t, { code: 400, content: "Failed to top conversation: no change" }), !1);}, e;}();t["default"] = d;}, function (e, t, n) {"use strict";t.__esModule = !0;var o = function () {return function (e, t, n) {this.type = e, this.top = t, this.targetId = n;};}();t["default"] = o;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(0),i = c(n(3)),s = c(n(1)),a = n(4),u = n(5);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.pubSub = null, this.pubSub = t;}return o(e, [{ key: "get", value: function value(e, t) {if (r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop), r.calibrator.isDef(e.channel)) {r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString());var n = new i["default"]({ name: u.RocketTypes.historyMessages, permission: s["default"].READ, params: e, singleTimeout: a.SocketTimeout.commonQuerySingle, totalTimeout: a.SocketTimeout.commonQueryTotal, success: function success(t) {e.onSuccess({ code: t.resultCode || t.code || 200, content: t.content });}, fail: function fail(t) {e.onFailed({ code: t.resultCode || t.code, content: t.content });} });this.pubSub.goEasySocket.emit(n);} else e.onFailed(res);} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(0),i = c(n(3)),s = c(n(1)),a = n(4),u = n(5);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.pubSub = null, this.pubSub = t;}return o(e, [{ key: "byChannel", value: function value(e) {var t = { channels: [], includeUsers: !1, distinct: !1 };if (r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop), Array.isArray(e.channels)) for (var n = 0; n < e.channels.length; n++) {var o = e.channels[n];r.calibrator.isNumber(o) && (o = o.toString()), t.channels.push(o);}if (0 !== t.channels.length) {1 == e.includeUsers && (t.includeUsers = !0), 1 == e.distinct && (t.distinct = !0);var c = new i["default"]({ name: u.RocketTypes.hereNow, permission: s["default"].READ, params: t, singleTimeout: a.SocketTimeout.commonQuerySingle, totalTimeout: a.SocketTimeout.commonQueryTotal, success: function success(t) {var n = t.content,o = n.channels;for (var r in o) {if (o.hasOwnProperty(r)) {var i = o[r];i.users && (i.users = i.users.map(function (e) {return e.data = e.data ? JSON.parse(e.data) : {}, e;}));}}e.onSuccess({ code: t.resultCode || t.code || 200, content: n });}, fail: function fail(t) {e.onFailed({ code: t.resultCode || t.code || 200, content: t.content });} });this.pubSub.goEasySocket.emit(c);} else e.onFailed({ code: 408, content: "channels is required." });} }, { key: "byUserId", value: function value(e) {var t = { userIds: [], distinct: !0 };if (r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop), r.calibrator.isDef(e.userIds) && (t.userIds = e.userIds.map(function (e) {return e.toString();})), 0 == e.distinct && (t.distinct = !1), 0 === t.userIds.length) e.onFailed({ code: 400, content: "userIds is required" });else if (t.userIds.length > 500) e.onFailed({ code: 400, content: "userIds is over max length 500" });else {var n = new i["default"]({ name: u.RocketTypes.hereNowByUserIds, permission: s["default"].READ, params: t, singleTimeout: a.SocketTimeout.commonQuerySingle, totalTimeout: a.SocketTimeout.commonQueryTotal, success: function success(t) {var n = t.content;n = n.map(function (e) {var t = {};return t.id = e.userId, t.data = e.userData ? JSON.parse(e.userData) : {}, t;}), e.onSuccess({ code: t.resultCode || t.code || 200, content: n });}, fail: function fail(t) {e.onFailed({ code: t.resultCode || t.code || 200, content: t.content });} });this.pubSub.goEasySocket.emit(n);}} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(0),i = c(n(3)),s = c(n(1)),a = n(4),u = n(5);function c(e) {return e && e.__esModule ? e : { "default": e };}var l = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.pubSub = null, this.pubSub = t;}return o(e, [{ key: "publish", value: function value(e) {if (r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop), r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isEmpty(e.channel)) throw { code: 400, content: "channel is required." };if (r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString()), r.calibrator.isEmpty(e.message)) throw { code: 400, content: "message is required." };if (r.calibrator.isNumber(e.message) && (e.message = e.message.toString()), !r.calibrator.isString(e.message)) throw { code: 400, content: "TypeError: message requires string." };if (e.message.length > 2500) throw { code: 400, content: "Message over max length 2500." };if (r.calibrator.isObject(e.notification)) {if (r.calibrator.isEmpty(e.notification.title)) throw { code: 400, content: "notification.title is required." };if (!r.calibrator.isString(e.notification.title)) throw { code: 400, content: "TypeError: notification.title requires string." };if (e.notification.title.length > 32) throw { code: 400, content: "TypeError: notification.title over max length 32." };if (r.calibrator.isEmpty(e.notification.body)) throw { code: 400, content: "notification.body is required." };if (!r.calibrator.isString(e.notification.body)) throw { code: 400, content: "TypeError: notification.body must be string." };if (e.notification.body.length > 50) throw { code: 400, content: "notification.body over max length 50." };} else if (r.calibrator.isPrimitive(e.notification)) throw { code: 400, content: "TypeError: notification requires an object." };var t = { channel: e.channel, content: e.message, nt: e.notification, at: e.accessToken, guid: r.UUID.get() },n = new i["default"]({ name: u.RocketTypes.publish, params: t, unique: !0, singleTimeout: a.SocketTimeout.commonRequestSingle, totalTimeout: a.SocketTimeout.commonRequestTotal, permission: s["default"].WRITE, success: function success(t) {e.onSuccess({ code: 200, content: "ok" });}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);} }]), e;}();t["default"] = l;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(0),i = d(n(3)),s = d(n(1)),a = d(n(164)),u = n(4),c = d(n(12)),l = n(10),f = n(65),p = n(5),h = n(15);function d(e) {return e && e.__esModule ? e : { "default": e };}var y = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.subscriptions = [], this.pubSub = null, this.pubSub = t;}return o(e, [{ key: "initialGoEasySocket", value: function value() {var e = this.pubSub.goEasySocket;e.addMessageObserver(h.RemoteEvents.message, this.onNewMessage.bind(this)), e.addExpiredReconnectedObserver(this.onExpiredReconnected.bind(this)), e.addConnectedObserver(this.onReconnected.bind(this));} }, { key: "resubscribe", value: function value() {var e = this.subscriptions.slice(0);this.subscriptions = [];for (var t = 0; t < e.length; t++) {0 != e[t].channels.length && this.subscribe(e[t]);}} }, { key: "onExpiredReconnected", value: function value() {this.resubscribe();} }, { key: "onReconnected", value: function value() {this.pubSub.neverConnect || this.pubSub.goEasySocket.status == c["default"].RECONNECTED || this.resubscribe();} }, { key: "onNewMessage", value: function value(e) {if (!(e.n.indexOf("_presence") > -1)) {e.a && this.pubSub.goEasySocket.sendAck("ack", { publishGuid: e.i });var t = { time: e.t, channel: e.n, content: e.c };l.GoEasyEventCenter.fire(f.PUBSUB_INTERNAL_EVENTS.MESSAGE_RECEIVED, e), this.findSubscriptionByChannel(t.channel).onMessage(t);}} }, { key: "formatOptions", value: function value(e) {var t = !r.calibrator.isEmpty(e.channel),n = !r.calibrator.isEmpty(e.channels);if (this.formatCallback(e), r.calibrator.isFunction(e.onMessage) || (e.onMessage = r.noop), !t && !n) return e.onFailed({ code: 400, content: "channel is required" }), !1;if (!t || !n) {if (t && (r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString()), e.channels = [e.channel]), n) {if (!Array.isArray(e.channels) || 0 == e.channels.length) return void e.onFailed({ code: 400, content: "channels must be an array" });if (e.channels.length > 500) return e.onFailed({ code: 400, content: "channels over max length:500" }), !1;for (var o = 0, i = e.channels.length; o < i; o++) {if (r.calibrator.isNumber(e.channels[o]) && (e.channels[o] = e.channels[o].toString()), r.calibrator.isEmpty(e.channels[o])) return e.onFailed({ code: 400, content: "Channels array contains empty channel" }), !1;}}return !0;}e.onFailed({ code: 400, content: "subscribe to either channel or channels, not both" });} }, { key: "formatCallback", value: function value(e) {r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop);} }, { key: "subscribe", value: function value(e) {var t = this;if (this.formatOptions(e)) {var n = new i["default"]({ name: p.RocketTypes.subscribe, permission: s["default"].READ, singleTimeout: u.SocketTimeout.commonInfiniteSingle, totalTimeout: u.SocketTimeout.commonInfiniteTotal, params: { channels: e.channels, accessToken: e.accessToken }, success: function success() {var n = new a["default"]({ channels: e.channels, accessToken: e.accessToken, onSuccess: e.onSuccess, onFailed: e.onFailed, onMessage: e.onMessage });t.subscriptions.push(n), e.onSuccess({ code: 200, content: "ok" });}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);}} }, { key: "unsubscribe", value: function value(e) {var t = this;if (this.formatCallback(e), r.calibrator.isDef(e.channel)) {if (r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString()), this.findSubscriptionByChannel(e.channel)) {var n = new i["default"]({ name: p.RocketTypes.unsubscribe, params: { channel: e.channel }, permission: s["default"].READ, singleTimeout: u.SocketTimeout.commonRequestSingle, totalTimeout: u.SocketTimeout.commonRequestTotal, success: function success() {e.onSuccess({ code: 200, content: "ok" }), t.removeChannel(e.channel);}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);} else e.onFailed({ code: 400, content: "channel[" + e.channel + "] is not subscribed" });} else e.onFailed({ code: 400, content: "channel is required" });} }, { key: "removeChannel", value: function value(e) {for (var t = 0; t < this.subscriptions.length; t++) {for (var n = this.subscriptions[t].channels, o = 0; o < n.length; o++) {if (n[o] == e) {this.subscriptions[t].channels.splice(o, 1);break;}}}} }, { key: "findSubscriptionByChannel", value: function value(e) {for (var t = !1, n = null, o = this.subscriptions.length - 1; o >= 0; o--) {for (var r = this.subscriptions[o].channels, i = 0; i < r.length; i++) {if (r[i] == e) {t = !0, n = this.subscriptions[o];break;}}if (t) break;}return n;} }]), e;}();t["default"] = y;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}();var r = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.channels = [], this.accessToken = null, this.onSuccess = null, this.onFailed = null, this.onMessage = null, this.channels = t.channels, this.accessToken = t.accessToken, this.onSuccess = t.onSuccess, this.onFailed = t.onFailed, this.onMessage = t.onMessage;}return o(e, [{ key: "empty", value: function value() {} }]), e;}();t["default"] = r;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}(),r = n(0),i = p(n(3)),s = p(n(1)),a = n(4),u = p(n(166)),c = p(n(12)),l = n(5),f = n(15);function p(e) {return e && e.__esModule ? e : { "default": e };}var h = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.presenters = [], this.pubSub = null, this.pubSub = t;}return o(e, [{ key: "initialGoEasySocket", value: function value() {var e = this.pubSub.goEasySocket;e.addMessageObserver(f.RemoteEvents.message, this.onNewMessage.bind(this)), e.addExpiredReconnectedObserver(this.onExpiredReconnected.bind(this)), e.addConnectedObserver(this.onReconnected.bind(this));} }, { key: "resubscribe", value: function value() {var e = this.presenters.slice(0);this.presenters = [];for (var t = 0; t < e.length; t++) {for (var n = 0; n < e[t].channels.length; n++) {var o = e[t].channels[n].split("_presence");e[t].channels[n] = o[0];}0 != e[t].channels.length && this.subscribePresence(e[t]);}} }, { key: "onExpiredReconnected", value: function value() {this.resubscribe();} }, { key: "onReconnected", value: function value() {this.pubSub.neverConnect || this.pubSub.goEasySocket.status == c["default"].RECONNECTED || this.resubscribe();} }, { key: "onNewMessage", value: function value(e) {if (-1 != e.n.indexOf("_presence")) {var t = this.findPresenceByChannel(e.n);if (t) {var n = JSON.parse(e.c);n.events = n.events.map(function (e) {var t = e.userData ? JSON.parse(e.userData) : {};return { time: e.time, action: e.action, id: e.userId, data: t };}), t.onPresence(n);}}} }, { key: "formatOptions", value: function value(e) {var t = !r.calibrator.isEmpty(e.channel),n = !r.calibrator.isEmpty(e.channels);if (this.formatCallback(e), r.calibrator.isFunction(e.onPresence) || (e.onPresence = r.noop), !t && !n) return e.onFailed({ code: 400, content: "channel is required" }), !1;if (!t || !n) {if (t && (r.calibrator.isNumber(e.channel) && (e.channel = e.channel.toString()), e.channels = [e.channel]), n) {if (!Array.isArray(e.channels) || 0 == e.channels.length) return void e.onFailed({ code: 400, content: "channels must be an array" });if (e.channels.length > 500) return e.onFailed({ code: 400, content: "channels over max length:500" }), !1;for (var o = 0, i = e.channels.length; o < i; o++) {if (r.calibrator.isNumber(e.channels[o]) && (e.channels[o] = e.channels[o].toString()), r.calibrator.isEmpty(e.channels[o])) return e.onFailed({ code: 400, content: "Channels array contains empty channel" }), !1;}}return !0;}e.onFailed({ code: 400, content: "subscribe to either channel or channels, not both" });} }, { key: "formatCallback", value: function value(e) {r.calibrator.isFunction(e.onSuccess) || (e.onSuccess = r.noop), r.calibrator.isFunction(e.onFailed) || (e.onFailed = r.noop);} }, { key: "subscribePresence", value: function value(e) {var t = this;if (this.formatOptions(e)) {Array.isArray(e.channels) && (e.channels = e.channels.map(function (e) {return e += "_presence";}));var n = new i["default"]({ name: l.RocketTypes.subscribe, permission: s["default"].READ, singleTimeout: a.SocketTimeout.commonInfiniteSingle, totalTimeout: a.SocketTimeout.commonInfiniteTotal, params: { channels: e.channels }, success: function success() {var n = new u["default"]({ channels: e.channels, onSuccess: e.onSuccess, onFailed: e.onFailed, onPresence: e.onPresence });t.presenters.push(n), e.onSuccess({ code: 200, content: "ok" });}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);}} }, { key: "unsubscribePresence", value: function value(e) {var t = this;if (this.formatCallback(e), r.calibrator.isDef(e.channel)) {if (e.channel += "_presence", this.findPresenceByChannel(e.channel)) {var n = new i["default"]({ name: l.RocketTypes.unsubscribe, params: { channel: e.channel }, permission: s["default"].READ, singleTimeout: a.SocketTimeout.commonRequestSingle, totalTimeout: a.SocketTimeout.commonRequestTotal, success: function success() {e.onSuccess({ code: 200, content: "ok" }), t.removeChannel(e.channel);}, fail: function fail(t) {e.onFailed({ code: t.resultCode, content: t.content });} });this.pubSub.goEasySocket.emit(n);} else e.onFailed({ code: 400, content: "channel[" + e.channel + "] is not subscribed" });} else e.onFailed({ code: 400, content: "channel is required" });} }, { key: "removeChannel", value: function value(e) {for (var t = 0; t < this.presenters.length; t++) {for (var n = this.presenters[t].channels, o = 0; o < n.length; o++) {if (n[o] == e) {this.presenters[t].channels.splice(o, 1);break;}}}} }, { key: "findPresenceByChannel", value: function value(e) {for (var t = !1, n = null, o = this.presenters.length - 1; o >= 0; o--) {for (var r = this.presenters[o].channels, i = 0; i < r.length; i++) {if (r[i] == e) {t = !0, n = this.presenters[o];break;}}if (t) break;}return n;} }]), e;}();t["default"] = h;}, function (e, t, n) {"use strict";Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}return function (t, n, o) {return n && e(t.prototype, n), o && e(t, o), t;};}();var r = function () {function e(t) {!function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.channels = [], this.onSuccess = null, this.onFailed = null, this.onPresence = null, this.channels = t.channels, this.onSuccess = t.onSuccess, this.onFailed = t.onFailed, this.onPresence = t.onPresence;}return o(e, [{ key: "empty", value: function value() {} }]), e;}();t["default"] = r;}, function (e, t, n) {"use strict";var o = this && this.__read || function (e, t) {var n = "function" == typeof Symbol && e[Symbol.iterator];if (!n) return e;var o,r,i = n.call(e),s = [];try {for (; (void 0 === t || t-- > 0) && !(o = i.next()).done;) {s.push(o.value);}} catch (a) {r = { error: a };} finally {try {o && !o.done && (n = i["return"]) && n.call(i);} finally {if (r) throw r.error;}}return s;};t.__esModule = !0, t.GoEasyNotification = void 0;var r = n(27),i = n(0),s = n(10),a = n(65),u = n(18),c = n(23),l = n(6),f = n(2),p = n(57),h = function () {function e(e) {this.uniappPlugin = null, this.regIdPromise = null, this.onClickNotificationCallback = null, this.allowNotification = e, this.supportNotification() && (this.uniappPlugin = uni.requireNativePlugin("GoEasy-Uniapp"), this.uniappPlugin ? this.regIdPromise = this.askRegId() : console.warn("No GoEasy-Uniapp Native Plugin."));}return e.prototype.listenNewMessage = function () {var e = this;this.supportNotification() && (s.GoEasyEventCenter.on(p.SocketEvents.IM_MESSAGE_RECEIVED, function (t) {return e.onReceivedIMMessage(t);}), s.GoEasyEventCenter.on(a.PUBSUB_INTERNAL_EVENTS.MESSAGE_RECEIVED, function (t) {return e.onReceivedPubSubMessage(t);}));}, e.prototype.onReceivedIMMessage = function (e) {var t = this,n = e.nt;if (i.calibrator.isObject(n) && r.uniApp.runningBackend() && e.s !== l.IM.userId) {var s = e.i,a = e.ts,u = e.mt,c = e.s,p = e.r,h = e.r,d = e.t,y = { id: s, tm: a, t: u, sid: c, rid: p, gid: h, tt: d, nt: n, sd: null, gd: null };d === f.Scene.PRIVATE ? l.im._dataCache.loadData(c, d).then(function (e) {y.sd = JSON.stringify(e), t.createLocalNotification(y);})["catch"](function (e) {t.createLocalNotification(y);}) : d === f.Scene.GROUP ? Promise.all([l.im._dataCache.loadData(c, f.Scene.PRIVATE), l.im._dataCache.loadData(h, f.Scene.GROUP)]).then(function (e) {var n = o(e, 2),r = n[0],i = n[1];y.sd = JSON.stringify(r), y.gd = JSON.stringify(i), t.createLocalNotification(y);})["catch"](function (e) {t.createLocalNotification(y);}) : this.createLocalNotification(y);}}, e.prototype.onReceivedPubSubMessage = function (e) {if (i.calibrator.isObject(e.nt) && r.uniApp.runningBackend()) {var t = { tm: e.t, ch: e.n, ctt: e.c, nt: e.nt };this.createLocalNotification(t);}}, e.prototype.createLocalNotification = function (e) {JSON.stringify(e);var t = e.nt.t,n = e.nt.c,o = Object.assign({ title: t, body: n }, e, { g: 1 });JSON.stringify(o), delete o.nt, i.calibrator.isObject(o) && o.body && o.title ? "undefined" != typeof plus && plus.push.createMessage(o.body, JSON.stringify(o), { title: o.title }) : console.warn("The notification message must contain the <title> and <body> fields");}, e.prototype.askRegId = function () {var e = this,t = null,n = 0,o = function o() {return new Promise(function (r, i) {e.uniappPlugin.regId(function (e) {r(e);}, function (r) {if (!(1e6 === r.data.code && n <= 10)) return clearTimeout(t), i(r);t = setTimeout(function () {n++, e.regIdPromise = o();}, 3500);});});};return o();}, e.prototype.getRegIdPromise = function () {return this.regIdPromise;}, e.prototype.supportNotification = function () {var e = c.PlatformDetector.currentPlatform(),t = u.FrameworkDetector.currentFramework();return this.allowNotification && t === u.Framework.UNIAPP && (e === c.Platform.APP_ANDROID || e === c.Platform.APP_IOS);}, e.prototype.parseMessage = function (e) {return e.ch ? { channel: e.ch, content: e.ctt } : { messageId: e.id, timestamp: e.tm, type: e.t, senderId: e.sid, senderData: e.sd ? JSON.parse(e.sd) : undefined, toType: e.tt, groupId: e.gid, groupData: e.gd ? JSON.parse(e.gd) : undefined };}, e.prototype.listenPlusClickNotification = function () {var e = this;plus.push.addEventListener("click", function (t) {if (t && t.payload) try {var n = "string" == typeof t.payload ? JSON.parse(t.payload) : t.payload,o = e.parseMessage(n);plus.push.clear(), e.onClickNotificationCallback(o);} catch (r) {}});}, e.prototype.availableIntent = function (e) {return e && Object.keys(e).length && e.g && 1 === parseInt(e.g);}, e.prototype.extactIntentIfXiaoMi = function (e) {var t = /content=\{(\{.*\})\},/;if (e.key_message && t.exec(e.key_message)) {var n = e.key_message.match(t);e = n.length ? JSON.parse(n[1]) : null;}return e;}, e.prototype.getIntentData = function () {var e = this;this.uniappPlugin.getIntentData(function (t) {if (e.availableIntent(t)) {var n = e.parseMessage(t),o = c.PlatformDetector.currentPlatform();plus.push.clear(), o === c.Platform.APP_ANDROID && e.uniappPlugin.clearAll(), e.onClickNotificationCallback(n);}});}, e.prototype.onClickNotification = function (e) {if (this.supportNotification()) {if (!i.calibrator.isFunction(e)) throw new Error("The arguments must be a function.");null === this.onClickNotificationCallback ? (this.onClickNotificationCallback = e, this.listenPlusClickNotification(), this.uniappPlugin && this.getIntentData()) : console.warn("The onClickNotification event has been listened on. Please do not listen to it more than once.");} else console.warn("The current environment doesn't support or allowNotification is false.");}, e;}();t.GoEasyNotification = h;}])["default"];});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 37:
/*!****************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/amap-wx.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

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
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"人才直聘-求职招聘-前端模板【完整版】示例","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"人才直聘-求职招聘-前端模板【完整版】示例","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"人才直聘-求职招聘-前端模板【完整版】示例","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"人才直聘-求职招聘-前端模板【完整版】示例","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

/***/ 5:
/*!*********************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/pages.json ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 683:
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-load-more/components/uni-load-more/i18n/index.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 684));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 685));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 686));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 684:
/*!**************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-load-more/components/uni-load-more/i18n/en.json ***!
  \**************************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"Pull up to show more\",\"uni-load-more.contentrefresh\":\"loading...\",\"uni-load-more.contentnomore\":\"No more data\"}");

/***/ }),

/***/ 685:
/*!*******************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hans.json ***!
  \*******************************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉显示更多\",\"uni-load-more.contentrefresh\":\"正在加载...\",\"uni-load-more.contentnomore\":\"没有更多数据了\"}");

/***/ }),

/***/ 686:
/*!*******************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hant.json ***!
  \*******************************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉顯示更多\",\"uni-load-more.contentrefresh\":\"正在加載...\",\"uni-load-more.contentnomore\":\"沒有更多數據了\"}");

/***/ }),

/***/ 86:
/*!*********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/graceChecker.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
数据验证（表单验证）
来自 grace.hcoder.net 
作者 hcoder 深海
*/
module.exports = {
  error: '',
  check: function check(data, rule) {
    for (var i = 0; i < rule.length; i++) {
      if (!rule[i].checkType) {return true;}
      if (!rule[i].name) {return true;}
      if (!rule[i].errorMsg) {return true;}
      if (!data[rule[i].name]) {this.error = rule[i].errorMsg;return false;}
      switch (rule[i].checkType) {
        case 'string':
          var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'int':
          var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
          break;
        case 'between':
          if (!this.isNumber(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenD':
          var reg = /^-?[1-9][0-9]?$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenF':
          var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'same':
          if (data[rule[i].name] != rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'notsame':
          if (data[rule[i].name] == rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'email':
          var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'phoneno':
          var reg = /^1[0-9]{10,10}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'zipcode':
          var reg = /^[0-9]{6}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'reg':
          var reg = new RegExp(rule[i].checkRule);
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'in':
          if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
            this.error = rule[i].errorMsg;return false;
          }
          break;
        case 'notnull':
          if (data[rule[i].name] == null || data[rule[i].name].length < 1) {this.error = rule[i].errorMsg;return false;}
          break;}

    }
    return true;
  },
  isNumber: function isNumber(checkVal) {
    var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
    return reg.test(checkVal);
  } };

/***/ }),

/***/ 87:
/*!************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/config/formRule.config.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 
                                                                                                      * 应用表单校验相关配置
                                                                                                      * 依赖：graceChecker.js 进行校验
                                                                                                      * 
                                                                                                      * 使用：引入该js到页面，let res = graceChecker.check({phoneNo:"",code:""},formRule.loginRule)
                                                                                                      */var _default =

{
  /* 用户登录 */
  loginRule: [{
    name: "openId",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "登录的openId为空,请从所属公众号菜单打开链接" },
  {
    name: "phoneNo",
    checkType: "phoneno",
    checkRule: "",
    errorMsg: "手机号格式不正确" },
  {
    name: "code",
    checkType: "string",
    checkRule: "6",
    errorMsg: "请输入6位验证码" }],


  /* 发送验证码验证手机号 */
  sendCodeRule: [{
    name: "phoneNo",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "手机号不能为空" },
  {
    name: "phoneNo",
    checkType: "phoneno",
    checkRule: "",
    errorMsg: "手机号格式不正确" }],


  /*个人简历 */
  regContentRule: [{
    name: "content",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "内容不能为空" }],


  /*基本信息 */
  regResumeBaseRule: [
  // 	{
  // 	name: "avatar",
  // 	checkType: "notnull",
  // 	checkRule: "",
  // 	errorMsg: "头像不能为空"
  // },
  {
    name: "name",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "姓名不能为空" },

  {
    name: "sex",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "性别不能为空" },

  {
    name: "phone",
    checkType: "phoneno",
    checkRule: "",
    errorMsg: "联系方式格式不正确" },

  // {
  // 	name: "email",
  // 	checkType: "email",
  // 	checkRule: "",
  // 	errorMsg: "邮箱地址格式不正确"
  // },
  {
    name: "education",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "最高学历不能为空" },

  {
    name: "timeToWork",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "参加工作时间不能为空" },

  {
    name: "birthday",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "出生年月不能为空" }

  // {
  // 	name: "status",
  // 	checkType: "notnull",
  // 	checkRule: "",
  // 	errorMsg: "简历状态不能为空"
  // }
  ],



  /*求职期望 */
  regExpectRule: [{
    name: "jobType",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "求职类型不能为空" },
  {
    name: "postId",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "职位不能为空" },
  {
    name: "industryId",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "行业不能为空" },
  {
    name: "expectSalary",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "期望薪资不能为空" }],



  /*公司入驻 */
  regCompanyRule: [{
    name: "logo",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司Logo不能为空" },
  {
    name: "name",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司简称不能为空" },
  {
    name: "fullName",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司全称不能为空" },
  {
    name: "industryId",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "行业不能为空" },
  {
    name: "staffSize",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司规模不能为空" },

  {
    name: "nature",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司性质不能为空" },

  {
    name: "postName",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "担任职位不能为空" }],




  /*新增公司职位 */
  regPositionRule: [
  // {
  // 	name: "positionType",
  // 	checkType: "notnull",
  // 	checkRule: "",
  // 	errorMsg: "职位类型不能为空"
  // },
  {
    name: "postName",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "职位名称不能为空" },
  {
    name: "minEducation",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "学历不能为空" },
  {
    name: "salary",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "薪资要求不能为空" },
  {
    name: "descr",
    checkType: "职位描述",
    checkRule: "",
    errorMsg: "职位描述不能为空" },
  {
    name: "address",
    checkType: "工作地点",
    checkRule: "",
    errorMsg: "工作地点不能为空" },
  {
    name: "addressHouse",
    checkType: "工作点门牌号",
    checkRule: "",
    errorMsg: "工作点门牌号不能为空" }],





  /*公司入驻 */
  regCompanyAuthRule: [{
    name: "realName",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司名称不能为空" },
  {
    name: "legalPerson",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "法人姓名不能为空" },
  {
    name: "identity",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "信用代码不能为空" },
  {
    name: "businessLicense",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "营业执照不能为空" }],


  /*公司编辑 */
  regCompanyEditRule: [{
    name: "logo",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司Logo不能为空" },
  {
    name: "name",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司简称不能为空" },
  {
    name: "fullName",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司全称不能为空" },
  {
    name: "industryId",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "行业不能为空" },
  {
    name: "staffSize",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司规模不能为空" },

  {
    name: "natures",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "公司性质不能为空" }],





  /*外包任务 */
  addTaskRule: [{
    name: "name",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "项目名称不能为空" },
  {
    name: "money",
    checkType: "int",
    checkRule: "1,10",
    errorMsg: "预算金额格式不正确" },
  {
    name: "type",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "软件类型不能为空" },
  {
    name: "content",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "需求详情不能为空" }],



  /* 修改结算卡 */
  updataCustomerCardRule: [{
    name: "customerNo",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "商户编号为空" },
  {
    name: "userName",
    checkType: "string",
    checkRule: "1,3",
    errorMsg: "姓名应为1-3个字符" },
  {
    name: "idCard",
    checkType: "string",
    checkRule: "15,18",
    errorMsg: "身份证号格式不正确" },
  {
    name: "cardNo",
    checkType: "int",
    checkRule: "3,20",
    errorMsg: "银行卡号格式不正确" },
  {
    name: "cityNo",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "请选择开户地区" },
  {
    name: "bankName",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "未查询到银行名称" },
  {
    name: "phoneNo",
    checkType: "phoneno",
    checkRule: "",
    errorMsg: "手机号格式不正确" },
  {
    name: "settleCardImgId",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "请上传身份证和结算卡照片" },
  {
    name: "cardHolderIdImgId",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "请上传手持身份证合影照片" }],


  /* 信用卡添加 */
  ccAddRule: [{
    name: "cardNo",
    checkType: "int",
    checkRule: "3,20",
    errorMsg: "银行卡号格式不正确" },
  {
    name: "accountName",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "开户名称不能为空" },
  {
    name: "reservedPhoneNo",
    checkType: "phoneno",
    checkRule: "",
    errorMsg: "手机号格式不正确" },
  {
    name: "idCard",
    checkType: "string",
    checkRule: "15,18",
    errorMsg: "身份证号格式不正确" },
  {
    name: "bankName",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "银行名称不能为空" }] };exports.default = _default;

/***/ }),

/***/ 88:
/*!***************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/ossutil/uploadFile.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var env = __webpack_require__(/*! ./config.js */ 89); //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;

var base64 = __webpack_require__(/*! ./base64.js */ 90); //Base64,hmac,sha1,crypto相关算法
__webpack_require__(/*! ./hmac.js */ 91);
__webpack_require__(/*! ./sha1.js */ 93);
var Crypto = __webpack_require__(/*! ./crypto.js */ 92);

/*
                                      *上传文件到阿里云oss
                                      * type:0-图片，1-视频
                                      *@param - filePath :图片的本地资源路径
                                      *@param - dir:表示要传到哪个目录下
                                      *@param - successc:成功回调
                                      *@param - failc:失败回调
                                      */
var uploadFile = function uploadFile(type, filePath, dir, successc, failc) {
  if (!filePath || filePath.length < 9) {
    uni.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false });

    return;
  }

  //图片名字 可以自行定义，     这里是采用当前的时间戳 + 150内的随机数来给图片命名的
  var aliyunFileKey = null;
  if (type == 1) {
    aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.mp4';
  } else {
    aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
  }
  var aliyunServerURL = env.uploadImageUrl; //OSS地址，需要https
  var accessid = env.OSSAccessKeyId;
  var policyBase64 = getPolicyBase64();
  var signature = getSignature(policyBase64); //获取签名

  uni.uploadFile({
    url: aliyunServerURL, //开发者服务器 url
    filePath: filePath, //要上传文件资源的路径
    name: 'file', //必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200' },

    success: function success(res) {
      console.log(res);
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)));
        return;
      }
      successc(aliyunServerURL + aliyunFileKey);
    },
    fail: function fail(err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    } });

};

var getPolicyBase64 = function getPolicyBase64() {
  var date = new Date();
  date.setHours(date.getHours() + env.timeout);
  var srcT = date.toISOString();
  var policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
    ["content-length-range", 0, 800 * 1024 * 1024] // 设置上传文件的大小限制,800mb
    ] };


  var policyBase64 = base64.encode(JSON.stringify(policyText));
  console.log(policyBase64);
  return policyBase64;
};

var getSignature = function getSignature(policyBase64) {
  var accesskey = env.AccessKeySecret;

  var bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true });

  var signature = Crypto.util.bytesToBase64(bytes);
  console.log(signature);
  return signature;
};

module.exports = uploadFile;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 883:
/*!*****************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-forms/components/uni-forms/validate.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i') };


var FORMAT_MAPPING = {
  "int": 'integer',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number',
  "password": 'string'
  // "fileurls": 'array'
};

function formatMessage(args) {var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultMessage = ['label'];
  defaultMessage.forEach(function (item) {
    if (args[item] === undefined) {
      args[item] = '';
    }
  });

  var str = resources;
  for (var key in args) {
    var reg = new RegExp('{' + key + '}');
    str = str.replace(reg, args[key]);
  }
  return str;
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (type === 'object' && !Object.keys(value).length) {
    return true;
  }

  return false;
}

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string: function string(value) {
    return typeof value === 'string';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date: function date(value) {
    return value instanceof Date;
  },
  timestamp: function timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file: function file(value) {
    return typeof value.url === 'string';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern: function pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  idcard: function idcard(value) {
    return typeof value === 'string' && !!value.match(pattern.idcard);
  },
  'url-https': function urlHttps(value) {
    return this.url(value) && value.startsWith('https://');
  },
  'url-scheme': function urlScheme(value) {
    return value.startsWith('://');
  },
  'url-web': function urlWeb(value) {
    return false;
  } };var


RuleValidator = /*#__PURE__*/function () {

  function RuleValidator(message) {_classCallCheck(this, RuleValidator);
    this._message = message;
  }_createClass(RuleValidator, [{ key: "validateRule", value: function () {var _validateRule = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(

      fieldKey, fieldValue, value, data, allData) {var result, rules, hasRequired, message, i, rule, vt, now, resultExpr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                result = null;

                rules = fieldValue.rules;

                hasRequired = rules.findIndex(function (item) {
                  return item.required;
                });if (!(
                hasRequired < 0)) {_context.next = 8;break;}if (!(
                value === null || value === undefined)) {_context.next = 6;break;}return _context.abrupt("return",
                result);case 6:if (!(

                typeof value === 'string' && !value.length)) {_context.next = 8;break;}return _context.abrupt("return",
                result);case 8:



                message = this._message;if (!(

                rules === undefined)) {_context.next = 11;break;}return _context.abrupt("return",
                message['default']);case 11:


                i = 0;case 12:if (!(i < rules.length)) {_context.next = 35;break;}
                rule = rules[i];
                vt = this._getValidateType(rule);

                Object.assign(rule, {
                  label: fieldValue.label || "[\"".concat(fieldKey, "\"]") });if (!


                RuleValidatorHelper[vt]) {_context.next = 20;break;}
                result = RuleValidatorHelper[vt](rule, value, message);if (!(
                result != null)) {_context.next = 20;break;}return _context.abrupt("break", 35);case 20:if (!




                rule.validateExpr) {_context.next = 26;break;}
                now = Date.now();
                resultExpr = rule.validateExpr(value, allData, now);if (!(
                resultExpr === false)) {_context.next = 26;break;}
                result = this._getMessage(rule, rule.errorMessage || this._message['default']);return _context.abrupt("break", 35);case 26:if (!




                rule.validateFunction) {_context.next = 32;break;}_context.next = 29;return (
                  this.validateFunction(rule, value, data, allData, vt));case 29:result = _context.sent;if (!(
                result !== null)) {_context.next = 32;break;}return _context.abrupt("break", 35);case 32:i++;_context.next = 12;break;case 35:





                if (result !== null) {
                  result = message.TAG + result;
                }return _context.abrupt("return",

                result);case 37:case "end":return _context.stop();}}}, _callee, this);}));function validateRule(_x, _x2, _x3, _x4, _x5) {return _validateRule.apply(this, arguments);}return validateRule;}() }, { key: "validateFunction", value: function () {var _validateFunction = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


      rule, value, data, allData, vt) {var result, callbackMessage, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                result = null;_context2.prev = 1;

                callbackMessage = null;_context2.next = 5;return (
                  rule.validateFunction(rule, value, allData || data, function (message) {
                    callbackMessage = message;
                  }));case 5:res = _context2.sent;
                if (callbackMessage || typeof res === 'string' && res || res === false) {
                  result = this._getMessage(rule, callbackMessage || res, vt);
                }_context2.next = 12;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);

                result = this._getMessage(rule, _context2.t0.message, vt);case 12:return _context2.abrupt("return",

                result);case 13:case "end":return _context2.stop();}}}, _callee2, this, [[1, 9]]);}));function validateFunction(_x6, _x7, _x8, _x9, _x10) {return _validateFunction.apply(this, arguments);}return validateFunction;}() }, { key: "_getMessage", value: function _getMessage(


    rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message['default']);
    } }, { key: "_getValidateType", value: function _getValidateType(

    rule) {
      var result = '';
      if (rule.required) {
        result = 'required';
      } else if (rule.format) {
        result = 'format';
      } else if (rule.arrayType) {
        result = 'arrayTypeFormat';
      } else if (rule.range) {
        result = 'range';
      } else if (rule.maximum !== undefined || rule.minimum !== undefined) {
        result = 'rangeNumber';
      } else if (rule.maxLength !== undefined || rule.minLength !== undefined) {
        result = 'rangeLength';
      } else if (rule.pattern) {
        result = 'pattern';
      } else if (rule.validateFunction) {
        result = 'validateFunction';
      }
      return result;
    } }]);return RuleValidator;}();


var RuleValidatorHelper = {
  required: function required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null;
  },

  range: function range(rule, value, message) {var

    range =

    rule.range,errorMessage = rule.errorMessage;

    var list = new Array(range.length);
    for (var i = 0; i < range.length; i++) {
      var item = range[i];
      if (types.object(item) && item.value !== undefined) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }

    var result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }

    if (!result) {
      return formatMessage(rule, errorMessage || message['enum']);
    }

    return null;
  },

  rangeNumber: function rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }var


    minimum =



    rule.minimum,maximum = rule.maximum,exclusiveMinimum = rule.exclusiveMinimum,exclusiveMaximum = rule.exclusiveMaximum;
    var min = exclusiveMinimum ? value <= minimum : value < minimum;
    var max = exclusiveMaximum ? value >= maximum : value > maximum;

    if (minimum !== undefined && min) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMinimum ?
      'exclusiveMinimum' : 'minimum']);

    } else if (maximum !== undefined && max) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMaximum ?
      'exclusiveMaximum' : 'maximum']);

    } else if (minimum !== undefined && maximum !== undefined && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message['number'].range);
    }

    return null;
  },

  rangeLength: function rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    var min = rule.minLength;
    var max = rule.maxLength;
    var val = value.length;

    if (min !== undefined && val < min) {
      return formatMessage(rule, rule.errorMessage || message['length'].minLength);
    } else if (max !== undefined && val > max) {
      return formatMessage(rule, rule.errorMessage || message['length'].maxLength);
    } else if (min !== undefined && max !== undefined && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message['length'].range);
    }

    return null;
  },

  pattern: function pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null;
  },

  format: function format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }

    return null;
  },

  arrayTypeFormat: function arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }

    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }

    return null;
  } };var


SchemaValidator = /*#__PURE__*/function (_RuleValidator) {_inherits(SchemaValidator, _RuleValidator);var _super = _createSuper(SchemaValidator);

  function SchemaValidator(schema, options) {var _this;_classCallCheck(this, SchemaValidator);
    _this = _super.call(this, SchemaValidator.message);

    _this._schema = schema;
    _this._options = options || null;return _this;
  }_createClass(SchemaValidator, [{ key: "updateSchema", value: function updateSchema(

    schema) {
      this._schema = schema;
    } }, { key: "validate", value: function () {var _validate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(

      data, allData) {var result;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context3.next = 5;break;}_context3.next = 4;return (
                  this.invokeValidate(data, false, allData));case 4:result = _context3.sent;case 5:return _context3.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function validate(_x11, _x12) {return _validate.apply(this, arguments);}return validate;}() }, { key: "validateAll", value: function () {var _validateAll = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(


      data, allData) {var result;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context4.next = 5;break;}_context4.next = 4;return (
                  this.invokeValidate(data, true, allData));case 4:result = _context4.sent;case 5:return _context4.abrupt("return",

                result);case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function validateAll(_x13, _x14) {return _validateAll.apply(this, arguments);}return validateAll;}() }, { key: "validateUpdate", value: function () {var _validateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(


      data, allData) {var result;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context5.next = 5;break;}_context5.next = 4;return (
                  this.invokeValidateUpdate(data, false, allData));case 4:result = _context5.sent;case 5:return _context5.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function validateUpdate(_x15, _x16) {return _validateUpdate.apply(this, arguments);}return validateUpdate;}() }, { key: "invokeValidate", value: function () {var _invokeValidate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(


      data, all, allData) {var result, schema, key, value, errorMessage;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                result = [];
                schema = this._schema;_context6.t0 = _regenerator.default.keys(
                schema);case 3:if ((_context6.t1 = _context6.t0()).done) {_context6.next = 15;break;}key = _context6.t1.value;
                value = schema[key];_context6.next = 8;return (
                  this.validateRule(key, value, data[key], data, allData));case 8:errorMessage = _context6.sent;if (!(
                errorMessage != null)) {_context6.next = 13;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context6.next = 13;break;}return _context6.abrupt("break", 15);case 13:_context6.next = 3;break;case 15:return _context6.abrupt("return",


                result);case 16:case "end":return _context6.stop();}}}, _callee6, this);}));function invokeValidate(_x17, _x18, _x19) {return _invokeValidate.apply(this, arguments);}return invokeValidate;}() }, { key: "invokeValidateUpdate", value: function () {var _invokeValidateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(


      data, all, allData) {var result, key, errorMessage;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                result = [];_context7.t0 = _regenerator.default.keys(
                data);case 2:if ((_context7.t1 = _context7.t0()).done) {_context7.next = 13;break;}key = _context7.t1.value;_context7.next = 6;return (
                  this.validateRule(key, this._schema[key], data[key], data, allData));case 6:errorMessage = _context7.sent;if (!(
                errorMessage != null)) {_context7.next = 11;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context7.next = 11;break;}return _context7.abrupt("break", 13);case 11:_context7.next = 2;break;case 13:return _context7.abrupt("return",


                result);case 14:case "end":return _context7.stop();}}}, _callee7, this);}));function invokeValidateUpdate(_x20, _x21, _x22) {return _invokeValidateUpdate.apply(this, arguments);}return invokeValidateUpdate;}() }, { key: "_checkFieldInSchema", value: function _checkFieldInSchema(


    data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return '';
      }

      var noExistFields = keys.filter(function (key) {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields) },
      SchemaValidator.message.TAG + SchemaValidator.message['defaultInvalid']);
      return [{
        key: 'invalid',
        errorMessage: errorMessage }];

    } }]);return SchemaValidator;}(RuleValidator);


function Message() {
  return {
    TAG: "",
    default: '验证错误',
    defaultInvalid: '提交的字段{field}在数据库中并不存在',
    validateFunction: '验证无效',
    required: '{label}必填',
    'enum': '{label}超出范围',
    timestamp: '{label}格式无效',
    whitespace: '{label}不能为空',
    typeError: '{label}类型无效',
    date: {
      format: '{label}日期{value}格式无效',
      parse: '{label}日期无法解析,{value}无效',
      invalid: '{label}日期{value}无效' },

    length: {
      minLength: '{label}长度不能少于{minLength}',
      maxLength: '{label}长度不能超过{maxLength}',
      range: '{label}必须介于{minLength}和{maxLength}之间' },

    number: {
      minimum: '{label}不能小于{minimum}',
      maximum: '{label}不能大于{maximum}',
      exclusiveMinimum: '{label}不能小于等于{minimum}',
      exclusiveMaximum: '{label}不能大于等于{maximum}',
      range: '{label}必须介于{minimum}and{maximum}之间' },

    pattern: {
      mismatch: '{label}格式不匹配' } };


}


SchemaValidator.message = new Message();var _default =

SchemaValidator;exports.default = _default;

/***/ }),

/***/ 89:
/*!***********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/ossutil/config.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var fileHost = 'https://oss-cn-hangzhou.aliyuncs.com/'; //你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
var config = {
  //aliyun OSS config
  uploadImageUrl: 'https://xxxxxx.oss-cn-hangzhou.aliyuncs.com/', // 默认存在根目录，可根据需求改
  AccessKeySecret: 'xxxxxx', // AccessKeySecret 去你的阿里云上控制台上找
  OSSAccessKeyId: 'xxxxxxxxxxxxxxx', // AccessKeyId 去你的阿里云上控制台上找
  timeout: 876000 //这个是上传文件时Policy的失效时间
};
module.exports = config;

/***/ }),

/***/ 9:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 90:
/*!***********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/ossutil/base64.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function encode(str) {
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
    out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}
function decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1)
    break;
    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1)
    break;
    out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);
    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 == 61)
      return out;
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1)
    break;
    out += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);
    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 == 61)
      return out;
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1)
    break;
    out += String.fromCharCode((c3 & 0x03) << 6 | c4);
  }
  return out;
}


function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x0001 && c <= 0x007F) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
      out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
      out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
    } else {
      out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
      out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
    }
  }
  return out;
}
function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12:case 13:
        // 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
        break;
      case 14:
        // 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode((c & 0x0F) << 12 |
        (char2 & 0x3F) << 6 |
        (char3 & 0x3F) << 0);
        break;}

  }
  return out;
}


module.exports = {
  encode: encode,
  decode: decode,
  utf16to8: utf16to8,
  utf8to16: utf8to16 };

/***/ }),

/***/ 905:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);var _pages = _interopRequireDefault(__webpack_require__(/*! @/pages.json */ 906));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e32) {throw _e32;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e33) {didErr = true;err = _e33;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function n(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, n) {return e(n = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && n.path);} }, n.exports), n.exports;}var o = s(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),s = {},o = s.lib = {},r = o.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = o.WordArray = r.extend({ init: function init(e, n) {e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,s = this.sigBytes,o = e.sigBytes;if (this.clamp(), s % 4) for (var r = 0; r < o; r++) {var i = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;t[s + r >>> 2] |= i << 24 - (s + r) % 4 * 8;} else for (r = 0; r < o; r += 4) {t[s + r >>> 2] = n[r >>> 2];}return this.sigBytes += o, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = r.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, s = [], o = function o(t) {t = t;var n = 987654321,s = 4294967295;return function () {var o = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;return o /= 4294967296, (o += .5) * (e.random() > .5 ? 1 : -1);};}, r = 0; r < t; r += 4) {var a = o(4294967296 * (n || e.random()));n = 987654071 * a(), s.push(4294967296 * a() | 0);}return new i.init(s, t);} }),a = s.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], o = 0; o < n; o++) {var r = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;s.push((r >>> 4).toString(16)), s.push((15 & r).toString(16));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s += 2) {n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], o = 0; o < n; o++) {var r = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;s.push(String.fromCharCode(r));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s++) {n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;}return new i.init(n, t);} },l = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },h = o.BufferedBlockAlgorithm = r.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,s = n.words,o = n.sigBytes,r = this.blockSize,a = o / (4 * r),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * r,u = e.min(4 * c, o);if (c) {for (var l = 0; l < c; l += r) {this._doProcessBlock(s, l);}var h = s.splice(0, c);n.sigBytes -= u;}return new i.init(h, u);}, clone: function clone() {var e = r.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 });o.Hasher = h.extend({ cfg: r.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {h.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} });var d = s.algo = {};return s;}(Math), n);}),r = (s(function (e, t) {var n;e.exports = (n = o, function (e) {var t = n,s = t.lib,o = s.WordArray,r = s.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = r.extend({ _doReset: function _doReset() {this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var s = t + n,o = e[s];e[s] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);}var r = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],g = e[t + 3],p = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],k = e[t + 9],v = e[t + 10],T = e[t + 11],S = e[t + 12],P = e[t + 13],A = e[t + 14],I = e[t + 15],b = r[0],O = r[1],C = r[2],E = r[3];b = u(b, O, C, E, i, 7, a[0]), E = u(E, b, O, C, c, 12, a[1]), C = u(C, E, b, O, f, 17, a[2]), O = u(O, C, E, b, g, 22, a[3]), b = u(b, O, C, E, p, 7, a[4]), E = u(E, b, O, C, m, 12, a[5]), C = u(C, E, b, O, y, 17, a[6]), O = u(O, C, E, b, _, 22, a[7]), b = u(b, O, C, E, w, 7, a[8]), E = u(E, b, O, C, k, 12, a[9]), C = u(C, E, b, O, v, 17, a[10]), O = u(O, C, E, b, T, 22, a[11]), b = u(b, O, C, E, S, 7, a[12]), E = u(E, b, O, C, P, 12, a[13]), C = u(C, E, b, O, A, 17, a[14]), b = l(b, O = u(O, C, E, b, I, 22, a[15]), C, E, c, 5, a[16]), E = l(E, b, O, C, y, 9, a[17]), C = l(C, E, b, O, T, 14, a[18]), O = l(O, C, E, b, i, 20, a[19]), b = l(b, O, C, E, m, 5, a[20]), E = l(E, b, O, C, v, 9, a[21]), C = l(C, E, b, O, I, 14, a[22]), O = l(O, C, E, b, p, 20, a[23]), b = l(b, O, C, E, k, 5, a[24]), E = l(E, b, O, C, A, 9, a[25]), C = l(C, E, b, O, g, 14, a[26]), O = l(O, C, E, b, w, 20, a[27]), b = l(b, O, C, E, P, 5, a[28]), E = l(E, b, O, C, f, 9, a[29]), C = l(C, E, b, O, _, 14, a[30]), b = h(b, O = l(O, C, E, b, S, 20, a[31]), C, E, m, 4, a[32]), E = h(E, b, O, C, w, 11, a[33]), C = h(C, E, b, O, T, 16, a[34]), O = h(O, C, E, b, A, 23, a[35]), b = h(b, O, C, E, c, 4, a[36]), E = h(E, b, O, C, p, 11, a[37]), C = h(C, E, b, O, _, 16, a[38]), O = h(O, C, E, b, v, 23, a[39]), b = h(b, O, C, E, P, 4, a[40]), E = h(E, b, O, C, i, 11, a[41]), C = h(C, E, b, O, g, 16, a[42]), O = h(O, C, E, b, y, 23, a[43]), b = h(b, O, C, E, k, 4, a[44]), E = h(E, b, O, C, S, 11, a[45]), C = h(C, E, b, O, I, 16, a[46]), b = d(b, O = h(O, C, E, b, f, 23, a[47]), C, E, i, 6, a[48]), E = d(E, b, O, C, _, 10, a[49]), C = d(C, E, b, O, A, 15, a[50]), O = d(O, C, E, b, m, 21, a[51]), b = d(b, O, C, E, S, 6, a[52]), E = d(E, b, O, C, g, 10, a[53]), C = d(C, E, b, O, v, 15, a[54]), O = d(O, C, E, b, c, 21, a[55]), b = d(b, O, C, E, w, 6, a[56]), E = d(E, b, O, C, I, 10, a[57]), C = d(C, E, b, O, y, 15, a[58]), O = d(O, C, E, b, P, 21, a[59]), b = d(b, O, C, E, p, 6, a[60]), E = d(E, b, O, C, T, 10, a[61]), C = d(C, E, b, O, f, 15, a[62]), O = d(O, C, E, b, k, 21, a[63]), r[0] = r[0] + b | 0, r[1] = r[1] + O | 0, r[2] = r[2] + C | 0, r[3] = r[3] + E | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,s = 8 * this._nDataBytes,o = 8 * t.sigBytes;n[o >>> 5] |= 128 << 24 - o % 32;var r = e.floor(s / 4294967296),i = s;n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var l = c[u];c[u] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);}return a;}, clone: function clone() {var e = r.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, s, o, r, i) {var a = e + (t & n | ~t & s) + o + i;return (a << r | a >>> 32 - r) + t;}function l(e, t, n, s, o, r, i) {var a = e + (t & s | n & ~s) + o + i;return (a << r | a >>> 32 - r) + t;}function h(e, t, n, s, o, r, i) {var a = e + (t ^ n ^ s) + o + i;return (a << r | a >>> 32 - r) + t;}function d(e, t, n, s, o, r, i) {var a = e + (n ^ (t | ~s)) + o + i;return (a << r | a >>> 32 - r) + t;}t.MD5 = r._createHelper(c), t.HmacMD5 = r._createHmacHelper(c);}(Math), n.MD5);}), s(function (e, t) {var n, s, r;e.exports = (s = (n = o).lib.Base, r = n.enc.Utf8, void (n.algo.HMAC = s.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = r.parse(t));var n = e.blockSize,s = 4 * n;t.sigBytes > s && (t = e.finalize(t)), t.clamp();for (var o = this._oKey = t.clone(), i = this._iKey = t.clone(), a = o.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}o.sigBytes = i.sigBytes = s, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), s(function (e, t) {e.exports = o.HmacMD5;}));var i = "FUNCTION",a = "OBJECT",c = "CLIENT_DB";function u(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function l(e) {return "object" === u(e);}function h(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var d = "development" === "development",f = "mp-weixin";var g;switch (f) {case "h5":g = "web";break;case "app-plus":g = "app";break;default:g = f;}var p = h(undefined),m = h([]) || [],y = true;var _ = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 907).default || __webpack_require__(/*! uni-stat-config */ 907);_ = _e2.appid;}} catch (e) {}var w = {};function k(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var n, s;return n = w, s = e, Object.prototype.hasOwnProperty.call(n, s) || (w[e] = t), w[e];}"app" === g && (w = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var v = ["invoke", "success", "fail", "complete"],T = k("_globalUniCloudInterceptor");function S(e, t) {T[e] || (T[e] = {}), l(t) && Object.keys(t).forEach(function (n) {v.indexOf(n) > -1 && function (e, t, n) {var s = T[e][t];s || (s = T[e][t] = []), -1 === s.indexOf(n) && "function" == typeof n && s.push(n);}(e, n, t[n]);});}function P(e, t) {T[e] || (T[e] = {}), l(t) ? Object.keys(t).forEach(function (n) {v.indexOf(n) > -1 && function (e, t, n) {var s = T[e][t];if (!s) return;var o = s.indexOf(n);o > -1 && s.splice(o, 1);}(e, n, t[n]);}) : delete T[e];}function A(e, t) {return e && 0 !== e.length ? e.reduce(function (e, n) {return e.then(function () {return n(t);});}, Promise.resolve()) : Promise.resolve();}function I(e, t) {return T[e] && T[e][t] || [];}function b(e) {S("callObject", e);}var O = k("_globalUniCloudListener"),C = "response",E = "needLogin",R = "refreshToken",U = "clientdb",x = "cloudfunction",L = "cloudobject";function D(e) {return O[e] || (O[e] = []), O[e];}function N(e, t) {var n = D(e);n.includes(t) || n.push(t);}function q(e, t) {var n = D(e),s = n.indexOf(t);-1 !== s && n.splice(s, 1);}function F(e, t) {var n = D(e);for (var _e3 = 0; _e3 < n.length; _e3++) {(0, n[_e3])(t);}}var M = !1;var j = new Promise(function (e) {M && e(), function t() {if ("function" == typeof getCurrentPages) {var _t2 = getCurrentPages();_t2 && _t2[0] && (M = !0, e());}M || setTimeout(function () {t();}, 30);}();});function $() {return j;}function K(e, t) {return t ? function (n) {var _this = this;var s = !1;if ("callFunction" === t) {var _e4 = n && n.type || i;s = _e4 !== i;}var o = "callFunction" === t && !s;var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};var a = r.then(function () {return s ? Promise.resolve() : A(I(t, "invoke"), n);}).then(function () {return e.call(_this, n);}).then(function (e) {return s ? Promise.resolve(e) : A(I(t, "success"), e).then(function () {return A(I(t, "complete"), e);}).then(function () {return o && F(C, { type: x, content: e }), Promise.resolve(e);});}, function (e) {return s ? Promise.reject(e) : A(I(t, "fail"), e).then(function () {return A(I(t, "complete"), e);}).then(function () {return F(C, { type: x, content: e }), Promise.reject(e);});});if (!(n.success || n.fail || n.complete)) return a;a.then(function (e) {n.success && n.success(e), n.complete && n.complete(e), o && F(C, { type: x, content: e });}, function (e) {n.fail && n.fail(e), n.complete && n.complete(e), o && F(C, { type: x, content: e });});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var B = /*#__PURE__*/function (_Error) {_inherits(B, _Error);var _super = _createSuper(B);function B(e) {var _this2;_classCallCheck(this, B);_this2 = _super.call(this, e.message), _this2.errMsg = e.message || "", _this2.errCode = _this2.code = e.code || "SYSTEM_ERROR", _this2.requestId = e.requestId;return _this2;}return B;}( /*#__PURE__*/_wrapNativeSuper(Error));function H() {var e, t;try {if (uni.getLaunchOptionsSync) {if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1) return;var _uni$getLaunchOptions = uni.getLaunchOptionsSync(),_n = _uni$getLaunchOptions.scene,_s = _uni$getLaunchOptions.channel;e = _s, t = _n;}} catch (e) {}return { channel: e, scene: t };}var W;function z() {var e = uni.getLocale && uni.getLocale() || "en";if (W) return _objectSpread(_objectSpread({}, W), {}, { locale: e, LOCALE: e });var t = uni.getSystemInfoSync(),n = t.deviceId,s = t.osName,o = t.uniPlatform,r = t.appId,i = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];for (var _e5 = 0; _e5 < i.length; _e5++) {delete t[i[_e5]];}return W = _objectSpread(_objectSpread({ PLATFORM: o, OS: s, APPID: r, DEVICEID: n }, H()), t), _objectSpread(_objectSpread({}, W), {}, { locale: e, LOCALE: e });}var J = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), r(n, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (n, s) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), d && "web" === g && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return s(new B({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var o = e.data;if (o.error) return s(new B({ code: o.error.code, message: o.error.message, requestId: t }));o.result = o.data, o.requestId = t, delete o.data, n(o);} }));});} };var V = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} },Y = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };var _e6 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: Y, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: Y }, "zh-Hans"),X = _e6.t;var G = /*#__PURE__*/function () {function G(e) {_classCallCheck(this, G);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(X("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = V, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(G, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return J.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this3 = this;return Promise.resolve().then(function () {return _this3.hasAccessToken ? t ? _this3.requestWrapped(e) : _this3.requestWrapped(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this3.getAccessToken();}).then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});}) : _this3.getAccessToken().then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = J.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = J.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: s };} }, { key: "getAccessToken", value: function getAccessToken() {var _this4 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this4.setAccessToken(e.result.accessToken), _this4._getAccessTokenPromiseStatus = "fulfilled", t(_this4.accessToken)) : (_this4._getAccessTokenPromiseStatus = "rejected", n(new B({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this4._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this5 = this;var e = _ref.url,t = _ref.formData,n = _ref.name,s = _ref.filePath,o = _ref.fileType,r = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this5.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: o, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new B({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof r && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {r({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this6 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,n = _ref2$fileType === void 0 ? "image" : _ref2$fileType,s = _ref2.onUploadProgress,o = _ref2.config;if ("string" !== u(t)) throw new B({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });if (!(t = t.trim())) throw new B({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });if (/:\/\//.test(t)) throw new B({ code: "INVALID_PARAM", message: "cloudPath不合法" });var r = o && o.envType || this.config.envType;var i, a;return this.getOSSUploadOptionsFromPath({ env: r, filename: t }).then(function (t) {var o = t.result;i = o.id, a = "https://" + o.cdnDomain + "/" + o.ossPath;var r = { url: "https://" + o.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: o.accessKeyId, Signature: o.signature, host: o.host, id: i, key: o.ossPath, policy: o.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n };return _this6.uploadFileToOSS(Object.assign({}, r, { onUploadProgress: s }));}).then(function () {return _this6.reportOSSUpload({ id: i });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: a }) : s(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, n) {Array.isArray(e) && 0 !== e.length || n(new B({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return G;}();var Q = { init: function init(e) {var t = new G(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };var Z = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var ee;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(ee || (ee = {}));var te = function te() {};var ne = function ne() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t3 = function _t3() {throw new B({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });};return Object.defineProperty(e.promise, "then", { get: _t3 }), Object.defineProperty(e.promise, "catch", { get: _t3 }), e;}var t = new Promise(function (t, n) {e = function e(_e7, s) {return _e7 ? n(_e7) : t(s);};});return e.promise = t, e;};function se(e) {return void 0 === e;}function oe(e) {return "[object Null]" === Object.prototype.toString.call(e);}var re;function ie(e) {var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);var n;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e8 = _step.value;var _t4 = _e8.isMatch,_n2 = _e8.genAdapter,_s2 = _e8.runtime;if (_t4()) return { adapter: _n2(), runtime: _s2 };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(re || (re = {}));var ae = { adapter: null, runtime: void 0 },ce = ["anonymousUuidKey"];var ue = /*#__PURE__*/function (_te) {_inherits(ue, _te);var _super2 = _createSuper(ue);function ue() {var _this7;_classCallCheck(this, ue);_this7 = _super2.call(this), ae.adapter.root.tcbObject || (ae.adapter.root.tcbObject = {});return _this7;}_createClass(ue, [{ key: "setItem", value: function setItem(e, t) {ae.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return ae.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete ae.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete ae.adapter.root.tcbObject;} }]);return ue;}(te);function le(e, t) {switch (e) {case "local":return t.localStorage || new ue();case "none":return new ue();default:return t.sessionStorage || new ue();}}var he = /*#__PURE__*/function () {function he(e) {_classCallCheck(this, he);if (!this._storage) {this._persistence = ae.adapter.primaryStorage || e.persistence, this._storage = le(this._persistence, ae.adapter);var _t5 = "access_token_".concat(e.env),_n3 = "access_token_expire_".concat(e.env),_s3 = "refresh_token_".concat(e.env),_o = "anonymous_uuid_".concat(e.env),_r = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t5, accessTokenExpireKey: _n3, refreshTokenKey: _s3, anonymousUuidKey: _o, loginTypeKey: _r, userInfoKey: _i };}}_createClass(he, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var n = le(e, ae.adapter);for (var _e9 in this.keys) {var _s4 = this.keys[_e9];if (t && ce.includes(_e9)) continue;var _o2 = this._storage.getItem(_s4);se(_o2) || oe(_o2) || (n.setItem(_s4, _o2), this._storage.removeItem(_s4));}this._storage = n;} }, { key: "setStore", value: function setStore(e, t, n) {if (!this._storage) return;var s = { version: n || "localCachev1", content: t },o = JSON.stringify(s);try {this._storage.setItem(e, o);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var n = this._storage.getItem(e);if (!n) return "";if (n.indexOf(t) >= 0) {return JSON.parse(n).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return he;}();var de = {},fe = {};function ge(e) {return de[e];}var pe = function pe(e, t) {_classCallCheck(this, pe);this.data = t || null, this.name = e;};var me = /*#__PURE__*/function (_pe) {_inherits(me, _pe);var _super3 = _createSuper(me);function me(e, t) {var _this8;_classCallCheck(this, me);_this8 = _super3.call(this, "error", { error: e, data: t }), _this8.error = e;return _this8;}return me;}(pe);var ye = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, n) {if (n && n[e]) {var _s5 = n[e].indexOf(t);-1 !== _s5 && n[e].splice(_s5, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof me) return console.error(e.error), this;var n = "string" == typeof e ? new pe(e, t || {}) : e;var s = n.name;if (this._listens(s)) {n.target = this;var _e10 = this._listeners[s] ? _toConsumableArray(this._listeners[s]) : [];var _iterator2 = _createForOfIteratorHelper(_e10),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t6 = _step2.value;_t6.call(this, n);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function _e(e, t) {ye.on(e, t);}function we(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};ye.fire(e, t);}function ke(e, t) {ye.off(e, t);}var ve = "loginStateChanged",Te = "loginStateExpire",Se = "loginTypeChanged",Pe = "anonymousConverted",Ae = "refreshAccessToken";var Ie;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(Ie || (Ie = {}));var be = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],Oe = { "X-SDK-Version": "1.3.5" };function Ce(e, t, n) {var s = e[t];e[t] = function (t) {var o = {},r = {};n.forEach(function (n) {var _n$call = n.call(e, t),s = _n$call.data,i = _n$call.headers;Object.assign(o, s), Object.assign(r, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), o);else for (var _e11 in o) {i.append(_e11, o[_e11]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), r), s.call(e, t);};}function Ee() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, Oe), {}, { "x-seqid": e }) };}var Re = /*#__PURE__*/function () {function Re() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Re);var t;this.config = e, this._reqClass = new ae.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = ge(this.config.env), this._localCache = (t = this.config.env, fe[t]), Ce(this._reqClass, "post", [Ee]), Ce(this._reqClass, "upload", [Ee]), Ce(this._reqClass, "download", [Ee]);}_createClass(Re, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, n, s, o, r, i, a, _e12, _e13, _t7, _s6;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, o = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);r = this._cache.getStore(n);if (r) {_context5.next = 5;break;}throw new B({ message: "未登录CloudBase" });case 5:i = { refresh_token: r };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e12 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e12 || "REFRESH_TOKEN_EXPIRED" === _e12 || "INVALID_REFRESH_TOKEN" === _e12)) {_context5.next = 20;break;}if (!(this._cache.getStore(s) === Ie.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e12)) {_context5.next = 19;break;}_e13 = this._cache.getStore(o);_t7 = this._cache.getStore(n);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e13, refresh_token: _t7 });case 17:_s6 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_s6.refresh_token), this._refreshAccessToken()));case 19:we(Te), this._cache.removeStore(n);case 20:throw new B({ code: a.data.code, message: "\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code) });case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (we(Ae), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, n, s, o, r;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(n)) {_context6.next = 3;break;}throw new B({ message: "refresh token不存在，登录状态异常" });case 3:s = this._cache.getStore(e), o = this._cache.getStore(t), r = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(s, o);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}r = !1;case 12:return _context6.abrupt("return", (!s || !o || o < Date.now()) && r ? this.refreshAccessToken() : { accessToken: s, accessTokenExpire: o });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, n) {var s, o, r, _e14, i, _e15, _e16, a, c, u, l, h, d, f, g, p;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:s = "x-tcb-trace_".concat(this.config.env);o = "application/x-www-form-urlencoded";r = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === be.indexOf(e))) {_context7.next = 10;break;}_e14 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e14);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:r.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e15 in i) {i.hasOwnProperty(_e15) && void 0 !== i[_e15] && i.append(_e15, r[_e15]);}o = "multipart/form-data";} else {o = "application/json", i = {};for (_e16 in r) {void 0 !== r[_e16] && (i[_e16] = r[_e16]);}}a = { headers: { "content-type": o } };n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);c = this._localCache.getStore(s);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, l = t.inQuery, h = t.search;d = { env: this.config.env };u && (d.parse = !0), l && (d = _objectSpread(_objectSpread({}, l), d));f = function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var s = /\?/.test(t);var o = "";for (var _e17 in n) {"" === o ? !s && (t += "?") : o += "&", o += "".concat(_e17, "=").concat(encodeURIComponent(n[_e17]));}return /^http(s)?\:\/\//.test(t += o) ? t : "".concat(e).concat(t);}(Z, "//tcb-api.tencentcloudapi.com/web", d);h && (f += h);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:g = _context7.sent;p = g.header && g.header["x-tcb-trace"];if (!(p && this._localCache.setStore(s, p), 200 !== Number(g.status) && 200 !== Number(g.statusCode) || !g.data)) {_context7.next = 26;break;}throw new B({ code: "NETWORK_ERROR", message: "network request error" });case 26:return _context7.abrupt("return", g);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,n,_n4,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:n = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === be.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_n4 = _context8.sent;if (!_n4.data.code) {_context8.next = 12;break;}throw new B({ code: _n4.data.code, message: _n4.data.message });case 12:return _context8.abrupt("return", _n4.data);case 13:if (!n.data.code) {_context8.next = 15;break;}throw new B({ code: n.data.code, message: n.data.message });case 15:return _context8.abrupt("return", n.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,n = _this$_cache$keys3.accessTokenExpireKey,s = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }]);return Re;}();var Ue = {};function xe(e) {return Ue[e];}var Le = /*#__PURE__*/function () {function Le(e) {_classCallCheck(this, Le);this.config = e, this._cache = ge(e.env), this._request = xe(e.env);}_createClass(Le, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,n = _this$_cache$keys4.accessTokenExpireKey,s = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,n = _this$_cache$keys5.accessTokenKey,s = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(n, e), this._cache.setStore(s, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return Le;}();var De = /*#__PURE__*/function () {function De(e) {_classCallCheck(this, De);if (!e) throw new B({ code: "PARAM_ERROR", message: "envId is not defined" });this._envId = e, this._cache = ge(this._envId), this._request = xe(this._envId), this.setUserInfo();}_createClass(De, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new B({ code: "PARAM_ERROR", message: "ticket must be string" });return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new B({ code: "PARAM_ERROR", message: "username must be a string" });return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, n;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;n = e.users;return _context10.abrupt("return", (n.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: n, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, n, s, o, r, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;n = e.gender;s = e.avatarUrl;o = e.province;r = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: n, avatarUrl: s, province: o, country: r, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this9 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this9[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return De;}();var Ne = /*#__PURE__*/function () {function Ne(e) {_classCallCheck(this, Ne);if (!e) throw new B({ code: "PARAM_ERROR", message: "envId is not defined" });this._cache = ge(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,n = _this$_cache$keys6.accessTokenKey,s = _this$_cache$keys6.accessTokenExpireKey,o = this._cache.getStore(t),r = this._cache.getStore(n),i = this._cache.getStore(s);this.credential = { refreshToken: o, accessToken: r, accessTokenExpire: i }, this.user = new De(e);}_createClass(Ne, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === Ie.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === Ie.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === Ie.WECHAT || this.loginType === Ie.WECHAT_OPEN || this.loginType === Ie.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Ne;}();var qe = /*#__PURE__*/function (_Le) {_inherits(qe, _Le);var _super4 = _createSuper(qe);function qe() {_classCallCheck(this, qe);return _super4.apply(this, arguments);}_createClass(qe, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, n, s, o, _e18;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;n = this._cache.getStore(e) || void 0;s = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: n, refresh_token: s });case 8:o = _context13.sent;if (!(o.uuid && o.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(o.uuid);this.setRefreshToken(o.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:we(ve);we(Se, { env: this.config.env, loginType: Ie.ANONYMOUS, persistence: "local" });_e18 = new Ne(this.config.env);_context13.next = 19;return _e18.user.refresh();case 19:return _context13.abrupt("return", _e18);case 20:throw new B({ message: "匿名登录失败" });case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, n, s, o, r;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;n = _this$_cache$keys8.refreshTokenKey;s = this._cache.getStore(t);o = this._cache.getStore(n);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s, refresh_token: o, ticket: e });case 7:r = _context14.sent;if (!r.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(r.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:we(Pe, { env: this.config.env });we(Se, { loginType: Ie.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: r.refresh_token } });case 16:throw new B({ message: "匿名转化失败" });case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,n = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, Ie.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return qe;}(Le);var Fe = /*#__PURE__*/function (_Le2) {_inherits(Fe, _Le2);var _super5 = _createSuper(Fe);function Fe() {_classCallCheck(this, Fe);return _super5.apply(this, arguments);}_createClass(Fe, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, n;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new B({ param: "PARAM_ERROR", message: "ticket must be a string" });case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:n = _context15.sent;if (!n.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(n.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:we(ve);we(Se, { env: this.config.env, loginType: Ie.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new Ne(this.config.env));case 15:throw new B({ message: "自定义登录失败" });case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return Fe;}(Le);var Me = /*#__PURE__*/function (_Le3) {_inherits(Me, _Le3);var _super6 = _createSuper(Me);function Me() {_classCallCheck(this, Me);return _super6.apply(this, arguments);}_createClass(Me, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var n, s, o, r, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "email must be a string" });case 2:n = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 5:s = _context16.sent;o = s.refresh_token;r = s.access_token;i = s.access_token_expire;if (!o) {_context16.next = 22;break;}this.setRefreshToken(o);if (!(r && i)) {_context16.next = 15;break;}this.setAccessToken(r, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:we(ve);we(Se, { env: this.config.env, loginType: Ie.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new Ne(this.config.env));case 22:throw s.code ? new B({ code: s.code, message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ".concat(s.message) }) : new B({ message: "邮箱登录失败" });case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Me;}(Le);var je = /*#__PURE__*/function (_Le4) {_inherits(je, _Le4);var _super7 = _createSuper(je);function je() {_classCallCheck(this, je);return _super7.apply(this, arguments);}_createClass(je, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var n, s, o, r, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "username must be a string" });case 2:"string" != typeof t && (t = "", console.warn("password is empty"));n = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: Ie.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 6:s = _context19.sent;o = s.refresh_token;r = s.access_token_expire;i = s.access_token;if (!o) {_context19.next = 23;break;}this.setRefreshToken(o);if (!(i && r)) {_context19.next = 16;break;}this.setAccessToken(i, r);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:we(ve);we(Se, { env: this.config.env, loginType: Ie.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new Ne(this.config.env));case 23:throw s.code ? new B({ code: s.code, message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ".concat(s.message) }) : new B({ message: "用户名密码登录失败" });case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return je;}(Le);var $e = /*#__PURE__*/function () {function $e(e) {_classCallCheck(this, $e);this.config = e, this._cache = ge(e.env), this._request = xe(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), _e(Se, this._onLoginTypeChanged);}_createClass($e, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new qe(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new Fe(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Me(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new je(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new qe(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Me(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new je(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new qe(this.config)), _e(Pe, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, n, s, o;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === Ie.ANONYMOUS)) {_context23.next = 2;break;}throw new B({ message: "匿名用户不支持登出操作" });case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);if (s) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: s });case 7:o = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), we(ve), we(Se, { env: this.config.env, loginType: Ie.NULL, persistence: this.config.persistence }), o));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this10 = this;_e(ve, function () {var t = _this10.hasLoginState();e.call(_this10, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {_e(Te, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {_e(Ae, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {_e(Pe, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this11 = this;_e(Se, function () {var t = _this11.hasLoginState();e.call(_this11, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new Ne(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "username must be a string" });case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new Fe(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,n = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,n = _e$data.persistence,s = _e$data.env;s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return $e;}();var Ke = function Ke(e, t) {t = t || ne();var n = xe(this.config.env),s = e.cloudPath,o = e.filePath,r = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,l = _e$data2.fileId,h = _e$data2.cosFileId,d = e.requestId,f = { key: s, signature: c, "x-cos-meta-fileid": h, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: f, file: o, name: s, fileType: i, onUploadProgress: r }).then(function (e) {201 === e.statusCode ? t(null, { fileID: l, requestId: d }) : t(new B({ code: "STORAGE_REQUEST_FAIL", message: "STORAGE_REQUEST_FAIL: ".concat(e.data) }));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},Be = function Be(e, t) {t = t || ne();var n = xe(this.config.env),s = e.cloudPath;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},He = function He(_ref5, t) {var e = _ref5.fileList;if (t = t || ne(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t8 = _step3.value;if (!_t8 || "string" != typeof _t8) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var n = { fileid_list: e };return xe(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},We = function We(_ref6, t) {var e = _ref6.fileList;t = t || ne(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var n = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _s7 = _step4.value;"object" == typeof _s7 ? (_s7.hasOwnProperty("fileID") && _s7.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n.push({ fileid: _s7.fileID, max_age: _s7.maxAge })) : "string" == typeof _s7 ? n.push({ fileid: _s7 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var s = { file_list: n };return xe(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},ze = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, n, s, o;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return We.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:n = _context29.sent.fileList[0];if (!("SUCCESS" !== n.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(n) : new Promise(function (e) {e(n);}));case 6:s = xe(this.config.env);o = n.download_url;if (!(o = encodeURI(o), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", s.download({ url: o }));case 10:_context29.t0 = t;_context29.next = 13;return s.download({ url: o });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function ze(_x26, _x27) {return _ref8.apply(this, arguments);};}(),Je = function Je(_ref9, r) {var e = _ref9.name,t = _ref9.data,n = _ref9.query,s = _ref9.parse,o = _ref9.search;var i = r || ne();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new B({ code: "PARAM_ERROR", message: "函数名不能为空" }));var c = { inQuery: n, parse: s, search: o, function_name: e, request_data: a };return xe(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t9 = e.data.response_data;if (s) i(null, { result: _t9, requestId: e.requestId });else try {_t9 = JSON.parse(e.data.response_data), i(null, { result: _t9, requestId: e.requestId });} catch (e) {i(new B({ message: "response data must be json" }));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},Ve = { timeout: 15e3, persistence: "session" },Ye = {};var Xe = /*#__PURE__*/function () {function Xe(e) {_classCallCheck(this, Xe);this.config = e || this.config, this.authObj = void 0;}_createClass(Xe, [{ key: "init", value: function init(e) {switch (ae.adapter || (this.requestClient = new ae.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, Ve), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new Xe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || ae.adapter.primaryStorage || Ve.persistence;var n;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;de[t] = new he(e), fe[t] = new he(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), n = this.config, Ue[n.env] = new Re(n), this.authObj = new $e(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return _e.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return ke.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return Je.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return He.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return We.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return ze.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ke.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return Be.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Ye[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var n;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:n = Ye[e];if (n) {_context30.next = 3;break;}throw new B({ message: "\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C") });case 3:_context30.next = 5;return n.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = ie(e) || {},t = _ref11.adapter,n = _ref11.runtime;t && (ae.adapter = t), n && (ae.runtime = n);} }]);return Xe;}();var Ge = new Xe();function Qe(e, t, n) {void 0 === n && (n = {});var s = /\?/.test(t),o = "";for (var r in n) {"" === o ? !s && (t += "?") : o += "&", o += r + "=" + encodeURIComponent(n[r]);}return /^http(s)?:\/\//.test(t += o) ? t : "" + e + t;}var Ze = /*#__PURE__*/function () {function Ze() {_classCallCheck(this, Ze);}_createClass(Ze, [{ key: "post", value: function post(e) {var t = e.url,n = e.data,s = e.headers;return new Promise(function (e, o) {V.request({ url: Qe("https:", t), data: n, method: "POST", header: s, success: function success(t) {e(t);}, fail: function fail(e) {o(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, n) {var s = e.url,o = e.file,r = e.data,i = e.headers,a = e.fileType,c = V.uploadFile({ url: Qe("https:", s), name: "file", formData: Object.assign({}, r), filePath: o, fileType: a, header: i, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && r.success_action_status && (n.statusCode = parseInt(r.success_action_status, 10)), t(n);}, fail: function fail(e) {n(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Ze;}();var et = { setItem: function setItem(e, t) {V.setStorageSync(e, t);}, getItem: function getItem(e) {return V.getStorageSync(e);}, removeItem: function removeItem(e) {V.removeStorageSync(e);}, clear: function clear() {V.clearStorageSync();} };var tt = { genAdapter: function genAdapter() {return { root: {}, reqClass: Ze, localStorage: et, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Ge.useAdapters(tt);var nt = Ge,st = nt.init;nt.init = function (e) {e.env = e.spaceId;var t = st.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;return t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = K(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var ot = nt;function rt() {return { token: V.getStorageSync("uni_id_token") || V.getStorageSync("uniIdToken"), tokenExpired: V.getStorageSync("uni_id_token_expired") };}function it() {var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref12.token,t = _ref12.tokenExpired;e && V.setStorageSync("uni_id_token", e), t && V.setStorageSync("uni_id_token_expired", t);}function at() {if (!d || "web" !== g) return;uni.getStorageSync("__LAST_DCLOUD_APPID") !== _ && (uni.setStorageSync("__LAST_DCLOUD_APPID", _), console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), V.removeStorageSync("uni_id_token"), V.removeStorageSync("uniIdToken"), V.removeStorageSync("uni_id_token_expired"));}var ct = /*#__PURE__*/function (_G) {_inherits(ct, _G);var _super8 = _createSuper(ct);function ct() {_classCallCheck(this, ct);return _super8.apply(this, arguments);}_createClass(ct, [{ key: "getAccessToken", value: function getAccessToken() {var _this12 = this;return new Promise(function (e, t) {var n = "Anonymous_Access_token";_this12.setAccessToken(n), e(n);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };"auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = J.sign(n, this.config.clientSecret);var o = z();s["x-client-info"] = encodeURIComponent(JSON.stringify(o));var _rt = rt(),r = _rt.token;return s["x-client-token"] = r, { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: JSON.parse(JSON.stringify(s)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref13) {var _this13 = this;var e = _ref13.url,t = _ref13.formData,n = _ref13.name,s = _ref13.filePath,o = _ref13.fileType,r = _ref13.onUploadProgress;return new Promise(function (i, a) {var c = _this13.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: o, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new B({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof r && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {r({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref14) {var _this14 = this;var e = _ref14.filePath,t = _ref14.cloudPath,_ref14$fileType = _ref14.fileType,n = _ref14$fileType === void 0 ? "image" : _ref14$fileType,s = _ref14.onUploadProgress;if (!t) throw new B({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,r = _t$result.url,i = _t$result.formData,a = _t$result.name;o = t.result.fileUrl;var c = { url: r, formData: i, name: a, filePath: e, fileType: n };return _this14.uploadFileToOSS(Object.assign({}, c, { onUploadProgress: s }));}).then(function () {return _this14.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: o }) : s(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref15) {var e = _ref15.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.fileList;var t = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }]);return ct;}(G);var ut = { init: function init(e) {var t = new ct(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };function lt(_ref17) {var e = _ref17.data;var t;t = z();var n = JSON.parse(JSON.stringify(e || {}));if (Object.assign(n, { clientInfo: t }), !n.uniIdToken) {var _rt2 = rt(),_e19 = _rt2.token;_e19 && (n.uniIdToken = _e19);}return n;}function ht() {var _this15 = this;var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref18.name,t = _ref18.data;var _this$__dev__ = this.__dev__,n = _this$__dev__.localAddress,s = _this$__dev__.localPort,o = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],r = this.config.spaceId,i = "http://".concat(n, ":").concat(s, "/system/check-function"),a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);return new Promise(function (t, n) {V.request({ method: "POST", url: i, data: { name: e, platform: g, provider: o, spaceId: r }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.data;var _ref20 = e || {},t = _ref20.code,n = _ref20.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: n || "SYS_ERR" };}).then(function (_ref21) {var n = _ref21.code,s = _ref21.message;if (0 !== n) {switch (n) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e20 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e20), new Error(_e20);}case "SWITCH_TO_CLOUD":break;default:{var _e21 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e21), new Error(_e21);}}return _this15._callCloudFunction({ name: e, data: t });}return new Promise(function (e, n) {var s = lt.call(_this15, { data: t });V.request({ method: "POST", url: a, data: { provider: o, platform: g, param: s }, success: function success() {var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref22.statusCode,s = _ref22.data;return !t || t >= 400 ? n(new B({ code: s.code || "SYS_ERR", message: s.message || "request:fail" })) : e({ result: s });}, fail: function fail(e) {n(new B({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var dt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var ft = /[\\^$.*+?()[\]{}|]/g,gt = RegExp(ft.source);function pt(e, t, n) {return e.replace(new RegExp((s = t) && gt.test(s) ? s.replace(ft, "\\$&") : s, "g"), n);var s;}function mt(_ref23) {var e = _ref23.functionName,t = _ref23.result,n = _ref23.logPvd;if (this.__dev__.debugLog && t && t.requestId) {var _s8 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(n, "-request]").concat(_s8, "[/").concat(n, "-request]"));}}function yt(e) {var t = e.callFunction,n = function n(_n5) {var _this16 = this;var s = _n5.name;_n5.data = lt.call(e, { data: _n5.data });var o = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider];return t.call(this, _n5).then(function (e) {return e.errCode = 0, mt.call(_this16, { functionName: s, result: e, logPvd: o }), Promise.resolve(e);}, function (e) {return mt.call(_this16, { functionName: s, result: e, logPvd: o }), e && e.message && (e.message = function () {var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref24$message = _ref24.message,e = _ref24$message === void 0 ? "" : _ref24$message,_ref24$extraInfo = _ref24.extraInfo,t = _ref24$extraInfo === void 0 ? {} : _ref24$extraInfo,_ref24$formatter = _ref24.formatter,n = _ref24$formatter === void 0 ? [] : _ref24$formatter;for (var _s9 = 0; _s9 < n.length; _s9++) {var _n$_s = n[_s9],_o3 = _n$_s.rule,_r2 = _n$_s.content,i = _n$_s.mode,_a = e.match(_o3);if (!_a) continue;var _c = _r2;for (var _e22 = 1; _e22 < _a.length; _e22++) {_c = pt(_c, "{$".concat(_e22, "}"), _a[_e22]);}for (var _e23 in t) {_c = pt(_c, "{".concat(_e23, "}"), t[_e23]);}return "replace" === i ? _c : e + _c;}return e;}({ message: "[".concat(_n5.name, "]: ").concat(e.message), formatter: dt, extraInfo: { functionName: s } })), Promise.reject(e);});};e.callFunction = function (t) {var s;d && e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && m ? (e._callCloudFunction || (e._callCloudFunction = n, e._callLocalFunction = ht), s = ht) : s = n;var o = s.call(this, t);return Object.defineProperty(o, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), o;};}var _t = Symbol("CLIENT_DB_INTERNAL");function wt(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = _t, e.__ob__ = void 0, new Proxy(e, { get: function get(e, n, s) {if ("_uniClient" === n) return null;if (n in e || "string" != typeof n) {var _t10 = e[n];return "function" == typeof _t10 ? _t10.bind(e) : _t10;}return t.get(e, n, s);} });}function kt(e) {return { on: function on(t, n) {e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n);}, off: function off(t, n) {e[t] = e[t] || [];var s = e[t].indexOf(n);-1 !== s && e[t].splice(s, 1);} };}var vt = ["db.Geo", "db.command", "command.aggregate"];function Tt(e, t) {return vt.indexOf("".concat(e, ".").concat(t)) > -1;}function St(e) {switch (u(e)) {case "array":return e.map(function (e) {return St(e);});case "object":return e._internalType === _t || Object.keys(e).forEach(function (t) {e[t] = St(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}function Pt(e) {return e && e.content && e.content.$method;}var At = /*#__PURE__*/function () {function At(e, t, n) {_classCallCheck(this, At);this.content = e, this.prevStage = t || null, this.udb = null, this._database = n;}_createClass(At, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: St(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "_send", value: function _send(e, t) {var n = this.getAction(),s = this.getCommand();if (s.$db.push({ $method: e, $param: St(t) }), d) {var _e24 = s.$db.find(function (e) {return "collection" === e.$method;}),_t11 = _e24 && _e24.$param;_t11 && 1 === _t11.length && "string" == typeof _e24.$param[0] && _e24.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");}return this._database._callCloudFunction({ action: n, command: s });} }, { key: "isAggregate", get: function get() {var e = this;for (; e;) {var t = Pt(e),_n6 = Pt(e.prevStage);if ("aggregate" === t && "collection" === _n6 || "pipeline" === t) return !0;e = e.prevStage;}return !1;} }, { key: "isCommand", get: function get() {var e = this;for (; e;) {if ("command" === Pt(e)) return !0;e = e.prevStage;}return !1;} }, { key: "isAggregateCommand", get: function get() {var e = this;for (; e;) {var t = Pt(e),_n7 = Pt(e.prevStage);if ("aggregate" === t && "command" === _n7) return !0;e = e.prevStage;}return !1;} }, { key: "count", get: function get() {if (!this.isAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return It({ $method: "count", $param: St(Array.from(arguments)) }, e, this._database);};} }, { key: "remove", get: function get() {if (!this.isCommand) return function () {return this._send("remove", Array.from(arguments));};var e = this;return function () {return It({ $method: "remove", $param: St(Array.from(arguments)) }, e, this._database);};} }, { key: "set", get: function get() {if (!this.isCommand) return function () {throw new Error("JQL禁止使用set方法");};var e = this;return function () {return It({ $method: "set", $param: St(Array.from(arguments)) }, e, this._database);};} }]);return At;}();function It(e, t, n) {return wt(new At(e, t, n), { get: function get(e, t) {var s = "db";return e && e.content && (s = e.content.$method), Tt(s, t) ? It({ $method: t }, e, n) : function () {return It({ $method: t, $param: St(Array.from(arguments)) }, e, n);};} });}function bt(_ref25) {var e = _ref25.path,t = _ref25.method;return /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);this.param = Array.from(arguments);}_createClass(_class2, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class2;}();}var Ot = /*#__PURE__*/function (_ref26) {_inherits(Ot, _ref26);var _super9 = _createSuper(Ot);function Ot() {_classCallCheck(this, Ot);return _super9.apply(this, arguments);}_createClass(Ot, [{ key: "_callCloudFunction", value: function _callCloudFunction(_ref27) {var _this17 = this;var e = _ref27.action,t = _ref27.command,n = _ref27.multiCommand,s = _ref27.queryList;function o(e, t) {if (n && s) for (var _n8 = 0; _n8 < s.length; _n8++) {var _o4 = s[_n8];_o4.udb && "function" == typeof _o4.udb.setResult && (t ? _o4.udb.setResult(t) : _o4.udb.setResult(e.result.dataList[_n8]));}}var r = this;function i(e) {return r._callback("error", [e]), A(I("database", "fail"), e).then(function () {return A(I("database", "complete"), e);}).then(function () {return o(null, e), F(C, { type: U, content: e }), Promise.reject(e);});}var a = A(I("database", "invoke")),u = this._uniClient;return a.then(function () {return u.callFunction({ name: "DCloud-clientDB", type: c, data: { action: e, command: t, multiCommand: n } });}).then(function (e) {var _e$result = e.result,t = _e$result.code,n = _e$result.message,s = _e$result.token,r = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,a = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (a) for (var _e25 = 0; _e25 < a.length; _e25++) {var _a$_e = a[_e25],_t12 = _a$_e.level,_n9 = _a$_e.message,_s10 = _a$_e.detail,_o5 = console["app" === g && "warn" === _t12 ? "error" : _t12] || console.log;var _r3 = "[System Info]" + _n9;_s10 && (_r3 = "".concat(_r3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s10)), _o5(_r3);}if (t) {return i(new B({ code: t, message: n, requestId: e.requestId }));}e.result.errCode = e.result.code, e.result.errMsg = e.result.message, s && r && (it({ token: s, tokenExpired: r }), _this17._callbackAuth("refreshToken", [{ token: s, tokenExpired: r }]), _this17._callback("refreshToken", [{ token: s, tokenExpired: r }]), F(R, { token: s, tokenExpired: r }));var c = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];var _loop = function _loop(_t13) {var _c$_t = c[_t13],n = _c$_t.prop,s = _c$_t.tips;if (n in e.result) {var _t14 = e.result[n];Object.defineProperty(e.result, n, { get: function get() {return console.warn(s), _t14;} });}};for (var _t13 = 0; _t13 < c.length; _t13++) {_loop(_t13);}return function (e) {return A(I("database", "success"), e).then(function () {return A(I("database", "complete"), e);}).then(function () {return o(e, null), F(C, { type: U, content: e }), Promise.resolve(e);});}(e);}, function (e) {/fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");return i(new B({ code: e.code || "SYSTEM_ERROR", message: e.message, requestId: e.requestId }));});} }]);return Ot;}( /*#__PURE__*/function () {function _class3() {var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref28$uniClient = _ref28.uniClient,e = _ref28$uniClient === void 0 ? {} : _ref28$uniClient;_classCallCheck(this, _class3);this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = k("_globalUniCloudDatabaseCallback")), this.auth = kt(this._authCallBacks), Object.assign(this, kt(this._dbCallBacks)), this.env = wt({}, { get: function get(e, t) {return { $env: t };} }), this.Geo = wt({}, { get: function get(e, t) {return bt({ path: ["Geo"], method: t });} }), this.serverDate = bt({ path: [], method: "serverDate" }), this.RegExp = bt({ path: [], method: "RegExp" });}_createClass(_class3, [{ key: "getCloudEnv", value: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };} }, { key: "_callback", value: function _callback(e, t) {var n = this._dbCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "_callbackAuth", value: function _callbackAuth(e, t) {var n = this._authCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "multiSend", value: function multiSend() {var e = Array.from(arguments),t = e.map(function (e) {var t = e.getAction(),n = e.getCommand();if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");return { action: t, command: n };});return this._callCloudFunction({ multiCommand: t, queryList: e });} }]);return _class3;}());function Ct(e) {e.database = function (t) {if (t && Object.keys(t).length > 0) return e.init(t).database();if (this._database) return this._database;var n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return wt(new e(t), { get: function get(e, t) {return Tt("db", t) ? It({ $method: t }, null, e) : function () {return It({ $method: t, $param: St(Array.from(arguments)) }, null, e);};} });}(Ot, { uniClient: e });return this._database = n, n;};}var Et = "token无效，跳转登录页面",Rt = "token过期，跳转登录页面",Ut = { TOKEN_INVALID_TOKEN_EXPIRED: Rt, TOKEN_INVALID_INVALID_CLIENTID: Et, TOKEN_INVALID: Et, TOKEN_INVALID_WRONG_TOKEN: Et, TOKEN_INVALID_ANONYMOUS_USER: Et },xt = { "uni-id-token-expired": Rt, "uni-id-check-token-failed": Et, "uni-id-token-not-exist": Et, "uni-id-check-device-feature-failed": Et };function Lt(e, t) {var n = "";return n = e ? "".concat(e, "/").concat(t) : t, n.replace(/^\//, "");}function Dt() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";var n = [],s = [];return e.forEach(function (e) {!0 === e.needLogin ? n.push(Lt(t, e.path)) : !1 === e.needLogin && s.push(Lt(t, e.path));}), { needLoginPage: n, notNeedLoginPage: s };}function Nt(e) {return e.split("?")[0].replace(/^\//, "");}function qt() {return function (e) {var t = e && e.$page && e.$page.fullPath || "";return t ? ("/" !== t.charAt(0) && (t = "/" + t), t) : t;}(function () {var e = getCurrentPages();return e[e.length - 1];}());}function Ft() {return Nt(qt());}function Mt() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};if (!e) return !1;if (!(t && t.list && t.list.length)) return !1;var n = t.list,s = Nt(e);return n.some(function (e) {return e.pagePath === s;});}var jt = !!_pages.default.uniIdRouter;var _ref29 = function () {var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pages.default,_ref30$pages = _ref30.pages,e = _ref30$pages === void 0 ? [] : _ref30$pages,_ref30$subPackages = _ref30.subPackages,n = _ref30$subPackages === void 0 ? [] : _ref30$subPackages,_ref30$uniIdRouter = _ref30.uniIdRouter,s = _ref30$uniIdRouter === void 0 ? {} : _ref30$uniIdRouter,_ref30$tabBar = _ref30.tabBar,o = _ref30$tabBar === void 0 ? {} : _ref30$tabBar;var r = s.loginPage,_s$needLogin = s.needLogin,i = _s$needLogin === void 0 ? [] : _s$needLogin,_s$resToLogin = s.resToLogin,a = _s$resToLogin === void 0 ? !0 : _s$resToLogin,_Dt = Dt(e),c = _Dt.needLoginPage,u = _Dt.notNeedLoginPage,_ref31 = function () {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var t = [],n = [];return e.forEach(function (e) {var s = e.root,_e$pages = e.pages,o = _e$pages === void 0 ? [] : _e$pages,_Dt2 = Dt(o, s),r = _Dt2.needLoginPage,i = _Dt2.notNeedLoginPage;t.push.apply(t, _toConsumableArray(r)), n.push.apply(n, _toConsumableArray(i));}), { needLoginPage: t, notNeedLoginPage: n };}(n),l = _ref31.needLoginPage,h = _ref31.notNeedLoginPage;return { loginPage: r, routerNeedLogin: i, resToLogin: a, needLoginPage: [].concat(_toConsumableArray(c), _toConsumableArray(l)), notNeedLoginPage: [].concat(_toConsumableArray(u), _toConsumableArray(h)), loginPageInTabBar: Mt(r, o) };}(),$t = _ref29.loginPage,Kt = _ref29.routerNeedLogin,Bt = _ref29.resToLogin,Ht = _ref29.needLoginPage,Wt = _ref29.notNeedLoginPage,zt = _ref29.loginPageInTabBar;if (Ht.indexOf($t) > -1) throw new Error("Login page [".concat($t, "] should not be \"needLogin\", please check your pages.json"));function Jt(e) {var t = Nt(function (e) {var t = Ft(),n = e.charAt(0),s = e.split("?")[0];if ("/" === n) return s;var o = s.replace(/^\//, "").split("/"),r = t.split("/");r.pop();for (var _e26 = 0; _e26 < o.length; _e26++) {var _t15 = o[_e26];".." === _t15 ? r.pop() : "." !== _t15 && r.push(_t15);}return "" === r[0] && r.shift(), r.join("/");}(e));return !(Wt.indexOf(t) > -1) && (Ht.indexOf(t) > -1 || Kt.some(function (t) {return function (e, t) {return new RegExp(t).test(e);}(e, t);}));}function Vt(_ref32) {var e = _ref32.redirect;var t = Nt(e),n = Nt($t);return Ft() !== n && t !== n;}function Yt() {var _ref33 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref33.api,t = _ref33.redirect;if (!t || !Vt({ redirect: t })) return;var n = function (e, t) {return "/" !== e.charAt(0) && (e = "/" + e), t ? e.indexOf("?") > -1 ? e + "&uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e + "?uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e;}($t, t);zt ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo"), setTimeout(function () {uni[e]({ url: n });});}function Xt() {var _ref34 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref34.url;var t = { abortLoginPageJump: !1, autoToLoginPage: !1 },n = function () {var _rt3 = rt(),e = _rt3.token,t = _rt3.tokenExpired;var n;if (e) {if (t < Date.now()) {var _e27 = "uni-id-token-expired";n = { errCode: _e27, errMsg: xt[_e27] };}} else {var _e28 = "uni-id-check-token-failed";n = { errCode: _e28, errMsg: xt[_e28] };}return n;}();if (Jt(e) && n) {n.uniIdRedirectUrl = e;if (D(E).length > 0) return setTimeout(function () {F(E, n);}, 0), t.abortLoginPageJump = !0, t;t.autoToLoginPage = !0;}return t;}function Gt() {!function () {var e = qt(),_Xt = Xt({ url: e }),t = _Xt.abortLoginPageJump,n = _Xt.autoToLoginPage;t || n && Yt({ api: "redirectTo", redirect: e });}();var e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];var _loop2 = function _loop2(_t16) {var n = e[_t16];uni.addInterceptor(n, { invoke: function invoke(e) {var _Xt2 = Xt({ url: e.url }),t = _Xt2.abortLoginPageJump,s = _Xt2.autoToLoginPage;return t ? e : s ? (Yt({ api: n, redirect: e.url }), !1) : e;} });};for (var _t16 = 0; _t16 < e.length; _t16++) {_loop2(_t16);}}function Qt() {this.onResponse(function (e) {var t = e.type,n = e.content;var s = !1;switch (t) {case "cloudobject":s = function (e) {var t = e.errCode;return t in xt;}(n);break;case "clientdb":s = function (e) {var t = e.errCode;return t in Ut;}(n);}s && function () {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var t = D(E);$().then(function () {var n = qt();if (n && Vt({ redirect: n })) return t.length > 0 ? F(E, Object.assign({ uniIdRedirectUrl: n }, e)) : void ($t && Yt({ api: "navigateTo", redirect: n }));});}(n);});}function Zt(e) {!function (e) {e.onResponse = function (e) {N(C, e);}, e.offResponse = function (e) {q(C, e);};}(e), function (e) {e.onNeedLogin = function (e) {N(E, e);}, e.offNeedLogin = function (e) {q(E, e);}, jt && (k("uni-cloud-status").needLoginInit || (k("uni-cloud-status").needLoginInit = !0, $().then(function () {Gt.call(e);}), Bt && Qt.call(e)));}(e), function (e) {e.onRefreshToken = function (e) {N(R, e);}, e.offRefreshToken = function (e) {q(R, e);};}(e);}var en;var tn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",nn = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function sn() {var e = rt().token || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var n;try {n = JSON.parse((s = t[1], decodeURIComponent(en(s).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var s;return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;}en = "function" != typeof atob ? function (e) {if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !nn.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e += "==".slice(2 - (3 & e.length));for (var n, s, o = "", r = 0; r < e.length;) {t = tn.indexOf(e.charAt(r++)) << 18 | tn.indexOf(e.charAt(r++)) << 12 | (n = tn.indexOf(e.charAt(r++))) << 6 | (s = tn.indexOf(e.charAt(r++))), o += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === s ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);}return o;} : atob;var on = s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var n = "chooseAndUploadFile:ok",s = "chooseAndUploadFile:fail";function o(e, t) {return e.tempFiles.forEach(function (e, n) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref35) {var s = _ref35.onChooseFile,o = _ref35.onUploadProgress;return t.then(function (e) {if (s) {var _t17 = s(e);if (void 0 !== _t17) return Promise.resolve(_t17).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: n, tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var o = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = n;var r = t.tempFiles,i = r.length;var a = 0;return new Promise(function (n) {for (; a < s;) {c();}function c() {var s = a++;if (s >= i) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && n(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, o && o(e);} }).then(function (e) {u.url = e.fileID, s < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < i && c();});}});}(e, t, 5, o);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,n = e.sizeType,_e$sourceType = e.sourceType,r = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: n, sourceType: r, extension: i, success: function success(t) {e(o(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,n = e.compressed,r = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: n, maxDuration: r, sourceType: i, extension: a, success: function success(t) {var n = t.tempFilePath,s = t.duration,r = t.size,i = t.height,a = t.width;e(o({ errMsg: "chooseVideo:ok", tempFilePaths: [n], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: n, size: r, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: s, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,n = e.extension;return new Promise(function (e, r) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return r({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: n, success: function success(t) {e(o(t));}, fail: function fail(e) {r({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}),rn = n(on);var an = "manual";function cn(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, spaceInfo: { type: Object, default: function _default() {return {};} }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === an) return;var n = !1;var s = [];for (var _o6 = 2; _o6 < e.length; _o6++) {e[_o6] !== t[_o6] && (s.push(e[_o6]), n = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(n, s);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref36 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref36$getone = _ref36.getone,e = _ref36$getone === void 0 ? !1 : _ref36$getone,t = _ref36.success,n = _ref36.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {_this19.mixinDatacomLoading = !1;var _n$result = n.result,s = _n$result.data,o = _n$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = o), _this19.mixinDatacomHasMore = s.length < _this19.pageSize;var r = e ? s.length ? s[0] : void 0 : s;_this19.mixinDatacomResData = r, t && t(r);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, n && n(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var _n10;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var n = e.database(this.spaceInfo);var s = t.action || this.action;s && (n = n.action(s));var o = t.collection || this.collection;n = Array.isArray(o) ? (_n10 = n).collection.apply(_n10, _toConsumableArray(o)) : n.collection(o);var r = t.where || this.where;r && Object.keys(r).length && (n = n.where(r));var i = t.field || this.field;i && (n = n.field(i));var a = t.foreignKey || this.foreignKey;a && (n = n.foreignKey(a));var c = t.groupby || this.groupby;c && (n = n.groupBy(c));var u = t.groupField || this.groupField;u && (n = n.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());var l = t.orderby || this.orderby;l && (n = n.orderBy(l));var h = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,g = void 0 !== t.gettree ? t.gettree : this.gettree,p = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return g && (m.getTree = y), p && (m.getTreePath = y), n = n.skip(d * (h - 1)).limit(d).get(m), n;} } };}function un(e) {return function (t) {var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return e.customUI = t.customUI || e.customUI, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), "object" == typeof t.secretMethods && (e.secretMethods = t.secretMethods), e;}({ customUI: !1, loadingOptions: { title: "加载中...", mask: !0 }, errorOptions: { type: "modal", retry: !1 } }, n);var _n11 = n,s = _n11.customUI,o = _n11.loadingOptions,r = _n11.errorOptions,i = !s;return new Proxy({}, { get: function get(s, c) {return function () {var _ref37 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref37.fn,t = _ref37.interceptorName,n = _ref37.getCallbackArgs;return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31() {var _len,s,_key,o,r,i,_args31 = arguments;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:for (_len = _args31.length, s = new Array(_len), _key = 0; _key < _len; _key++) {s[_key] = _args31[_key];}o = n ? n({ params: s }) : {};_context31.prev = 2;_context31.next = 5;return A(I(t, "invoke"), _objectSpread({}, o));case 5:_context31.next = 7;return e.apply(void 0, s);case 7:r = _context31.sent;_context31.next = 10;return A(I(t, "success"), _objectSpread(_objectSpread({}, o), {}, { result: r }));case 10:return _context31.abrupt("return", r);case 13:_context31.prev = 13;_context31.t0 = _context31["catch"](2);i = _context31.t0;_context31.next = 18;return A(I(t, "fail"), _objectSpread(_objectSpread({}, o), {}, { error: i }));case 18:throw i;case 19:_context31.prev = 19;_context31.next = 22;return A(I(t, "complete"), i ? _objectSpread(_objectSpread({}, o), {}, { error: i }) : _objectSpread(_objectSpread({}, o), {}, { result: r }));case 22:return _context31.finish(19);case 23:case "end":return _context31.stop();}}}, _callee31, null, [[2, 13, 19, 23]]);}));}({ fn: function () {var _s11 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee33() {var l,_len2,u,_key2,h,_ref39,d,f,g,_yield,_e30,_e29,_args33 = arguments;return _regenerator.default.wrap(function _callee33$(_context33) {while (1) {switch (_context33.prev = _context33.next) {case 0:i && uni.showLoading({ title: o.title, mask: o.mask });for (_len2 = _args33.length, u = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {u[_key2] = _args33[_key2];}h = { name: t, type: a, data: { method: c, params: u } };"object" == typeof n.secretMethods && function (e, t) {var n = t.data.method,s = e.secretMethods[n];s && (t.secret = s);}(n, h);_context33.prev = 4;_context33.next = 7;return e.callFunction(h);case 7:l = _context33.sent;_context33.next = 13;break;case 10:_context33.prev = 10;_context33.t0 = _context33["catch"](4);l = { result: _context33.t0 };case 13:_ref39 = l.result || {}, d = _ref39.errCode, f = _ref39.errMsg, g = _ref39.newToken;if (!(i && uni.hideLoading(), g && g.token && g.tokenExpired && (it(g), F(R, _objectSpread({}, g))), d)) {_context33.next = 30;break;}if (!i) {_context33.next = 28;break;}if (!("toast" === r.type)) {_context33.next = 20;break;}uni.showToast({ title: f, icon: "none" });_context33.next = 28;break;case 20:if (!("modal" !== r.type)) {_context33.next = 22;break;}throw new Error("Invalid errorOptions.type: ".concat(r.type));case 22:_context33.next = 24;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32() {var _ref41,e,t,n,s,o,_args32 = arguments;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:_ref41 = _args32.length > 0 && _args32[0] !== undefined ? _args32[0] : {}, e = _ref41.title, t = _ref41.content, n = _ref41.showCancel, s = _ref41.cancelText, o = _ref41.confirmText;return _context32.abrupt("return", new Promise(function (r, i) {uni.showModal({ title: e, content: t, showCancel: n, cancelText: s, confirmText: o, success: function success(e) {r(e);}, fail: function fail() {r({ confirm: !1, cancel: !0 });} });}));case 2:case "end":return _context32.stop();}}}, _callee32);}))({ title: "提示", content: f, showCancel: r.retry, cancelText: "取消", confirmText: r.retry ? "重试" : "确定" });case 24:_yield = _context33.sent;_e30 = _yield.confirm;if (!(r.retry && _e30)) {_context33.next = 28;break;}return _context33.abrupt("return", s.apply(void 0, u));case 28:_e29 = new B({ code: d, message: f, requestId: l.requestId });throw _e29.detail = l.result, F(C, { type: L, content: _e29 }), _e29;case 30:return _context33.abrupt("return", (F(C, { type: L, content: l.result }), l.result));case 31:case "end":return _context33.stop();}}}, _callee33, null, [[4, 10]]);}));function s() {return _s11.apply(this, arguments);}return s;}(), interceptorName: "callObject", getCallbackArgs: function getCallbackArgs() {var _ref42 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref42.params;return { objectName: t, methodName: c, params: e };} });} });};}function ln(_x30, _x31) {return _ln.apply(this, arguments);}function _ln() {_ln = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee35(e, t) {var n, _e34, s;return _regenerator.default.wrap(function _callee35$(_context35) {while (1) {switch (_context35.prev = _context35.next) {case 0:n = "http://".concat(e, ":").concat(t, "/system/ping");_context35.prev = 1;_context35.next = 4;return s = { url: n, timeout: 500 }, new Promise(function (e, t) {V.request(_objectSpread(_objectSpread({}, s), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e34 = _context35.sent;return _context35.abrupt("return", !(!_e34.data || 0 !== _e34.data.code));case 8:_context35.prev = 8;_context35.t0 = _context35["catch"](1);return _context35.abrupt("return", !1);case 11:case "end":return _context35.stop();}}}, _callee35, null, [[1, 8]]);}));return _ln.apply(this, arguments);}function hn(e) {if (e.initUniCloudStatus && "rejected" !== e.initUniCloudStatus) return;var t = Promise.resolve();var n;n = 1, t = new Promise(function (e, t) {setTimeout(function () {e();}, n);}), e.isReady = !1, e.isDefault = !1;var s = e.auth();e.initUniCloudStatus = "pending", e.initUniCloud = t.then(function () {return s.getLoginState();}).then(function (e) {return e ? Promise.resolve() : s.signInAnonymously();}).then(function () {if (!d) return Promise.resolve();if ("app" === g) {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),_e31 = _uni$getSystemInfoSyn.osName,_t18 = _uni$getSystemInfoSyn.osVersion;"ios" === _e31 && function (e) {if (!e || "string" != typeof e) return 0;var t = e.match(/^(\d+)./);return t && t[1] ? parseInt(t[1]) : 0;}(_t18) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");}if (d && e.__dev__.debugInfo) {var _e$__dev__$debugInfo = e.__dev__.debugInfo,_t19 = _e$__dev__$debugInfo.address,_n12 = _e$__dev__$debugInfo.servePort;return function () {var _ref43 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee34(e, t) {var n, _s12, _o7;return _regenerator.default.wrap(function _callee34$(_context34) {while (1) {switch (_context34.prev = _context34.next) {case 0:_s12 = 0;case 1:if (!(_s12 < e.length)) {_context34.next = 11;break;}_o7 = e[_s12];_context34.next = 5;return ln(_o7, t);case 5:if (!_context34.sent) {_context34.next = 8;break;}n = _o7;return _context34.abrupt("break", 11);case 8:_s12++;_context34.next = 1;break;case 11:return _context34.abrupt("return", { address: n, port: t });case 12:case "end":return _context34.stop();}}}, _callee34);}));return function (_x32, _x33) {return _ref43.apply(this, arguments);};}()(_t19, _n12);}}).then(function () {var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref44.address,n = _ref44.port;if (!d) return Promise.resolve();var s = console["app" === g ? "error" : "warn"];if (t) e.__dev__.localAddress = t, e.__dev__.localPort = n;else if (e.__dev__.debugInfo) {var _t20 = "";"remote" === e.__dev__.debugInfo.initialLaunchType ? (e.__dev__.debugInfo.forceRemote = !0, _t20 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs") : _t20 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs", "web" === g && (_t20 += "\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"), 0 === g.indexOf("mp-") && (_t20 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), s(_t20);}}).then(function () {at(), e.isReady = !0, e.initUniCloudStatus = "fulfilled";}).catch(function (t) {console.error(t), e.initUniCloudStatus = "rejected";});}var dn = { tcb: ot, tencent: ot, aliyun: Q, private: ut };var fn = new ( /*#__PURE__*/function () {function _class4() {_classCallCheck(this, _class4);}_createClass(_class4, [{ key: "init", value: function init(e) {var t = {};var n = dn[e.provider];if (!n) throw new Error("未提供正确的provider参数");t = n.init(e), t.__dev__ = {}, t.__dev__.debugLog = d && ("web" === g && navigator.userAgent.indexOf("HBuilderX") > 0 || "app" === g);var s = p;d && s && !s.code && (t.__dev__.debugInfo = s), hn(t), t.reInit = function () {hn(this);}, yt(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {return t.call(this, e);};}(t), Ct(t), function (e) {e.getCurrentUserInfo = sn, e.chooseAndUploadFile = rn.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return cn(e);} }), e.importObject = un(e);}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {if (!t[e]) return;var n = t[e];t[e] = function () {return t.reInit(), n.apply(t, Array.from(arguments));}, t[e] = K(t[e], e).bind(t);}), t.init = this.init, t;} }]);return _class4;}())();(function () {var e = m;var t = {};if (e && 1 === e.length) t = e[0], fn = fn.init(t), fn.isDefault = !0;else {var _t21 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];var _n13;_n13 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : y ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t21.forEach(function (e) {fn[e] = function () {return console.error(_n13), Promise.reject(new B({ code: "SYS_ERR", message: _n13 }));};});}Object.assign(fn, { get mixinDatacom() {return cn(fn);} }), Zt(fn), fn.addInterceptor = S, fn.removeInterceptor = P, fn.interceptObject = b, d && "web" === g && (window.uniCloud = fn);})();var gn = fn;exports.default = gn;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 906:
/*!**************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/pages.json?{"type":"origin-pages-json"} ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": [{ "path": "pages/index/index", "style": { "navigationStyle": "custom", "navigationBarTitleText": "人才直聘", "enablePullDownRefresh": true } }, { "path": "pages/index/search", "style": { "navigationBarTitleText": "搜索" } }, { "path": "pages/company/list", "style": { "navigationBarTitleText": "公司列表", "enablePullDownRefresh": true } }, { "path": "pages/company/resumeList", "style": { "navigationBarTitleText": "简历列表", "enablePullDownRefresh": true } }, { "path": "pages/company/detail", "style": { "navigationBarTitleText": "公司详情" } }, { "path": "pages/user/user", "style": { "navigationBarTitleText": "我的" } }, { "path": "pages/user/userInfo", "style": { "navigationBarTitleText": "基本信息", "app-plus": { "titleNView": { "buttons": [{ "btnType": "EDIT", "text": "", "fontSize": "20px", "fontSrc": "/static/icomoon-local/fonts/icomoon.ttf" }] } } } }, { "path": "pages/chat/chat", "style": { "navigationBarTitleText": "消息" } }, { "path": "pages/chat/notice/notices", "style": { "navigationBarTitleText": "系统消息", "enablePullDownRefresh": true } }, { "path": "pages/chat/notice/noticeDetail", "style": { "navigationBarTitleText": "消息详情" } }, { "path": "pages/type/type", "style": { "navigationBarTitleText": "分类", "enablePullDownRefresh": true } }, { "path": "pages/chat/privateChat", "style": { "navigationBarTitleText": "", "enablePullDownRefresh": false, "navigationBarBackgroundColor": "#FFFFFF", "navigationBarTextStyle": "black" } }, { "path": "pages/user/service/robot", "style": { "navigationBarTitleText": "智能客服", "enablePullDownRefresh": true } }, { "path": "pages/index/selectCity", "style": { "navigationBarTitleText": "选择城市", "enablePullDownRefresh": false } }], "subPackages": [{ "root": "pages/login", "pages": [{ "path": "login", "style": { "navigationBarTitleText": "登录", "navigationBarBackgroundColor": "#FFFFFF", "navigationBarTextStyle": "black" } }, { "path": "xcxLogin", "style": { "navigationBarTitleText": "", "enablePullDownRefresh": false } }, { "path": "forgetPwd", "style": { "navigationBarTitleText": "忘记密码", "enablePullDownRefresh": false, "navigationBarBackgroundColor": "#FFFFFF", "navigationBarTextStyle": "black" } }, { "path": "loginPwd", "style": { "navigationBarTitleText": "", "enablePullDownRefresh": false, "navigationBarBackgroundColor": "#FFFFFF", "navigationBarTextStyle": "black" } }, { "path": "resetPwd", "style": { "navigationBarTitleText": "重置密码", "enablePullDownRefresh": false } }] }, { "root": "pages/user/finance", "pages": [{ "path": "wallet", "style": { "navigationBarTitleText": "我的钱包", "enablePullDownRefresh": false } }, { "path": "rule", "style": { "navigationBarTitleText": "提现规则", "enablePullDownRefresh": false } }, { "path": "withdraw", "style": { "navigationBarTitleText": "提现", "enablePullDownRefresh": false } }, { "path": "records", "style": { "navigationBarTitleText": "交易明细", "enablePullDownRefresh": true } }, { "path": "withdrawLog", "style": { "navigationBarTitleText": "提现申请", "enablePullDownRefresh": false } }] }, { "root": "pages/law", "pages": [{ "path": "law", "style": { "navigationBarTitleText": "技能知识", "enablePullDownRefresh": true } }, { "path": "lawDetail", "style": { "navigationBarTitleText": "技能知识详情", "enablePullDownRefresh": false } }] }, { "root": "pages/course", "pages": [{ "path": "list", "style": { "navigationBarTitleText": "课程列表", "enablePullDownRefresh": true } }, { "path": "detail", "style": { "navigationBarTitleText": "课程详情", "enablePullDownRefresh": false } }] }, { "root": "pages/position", "pages": [{ "path": "list", "style": { "navigationBarTitleText": "岗位列表", "enablePullDownRefresh": true } }, { "path": "detail", "style": { "navigationBarTitleText": "职位详情" } }, { "path": "search", "style": { "navigationBarTitleText": "职位搜索", "navigationBarBackgroundColor": "#FFFFFF", "navigationBarTextStyle": "black" } }, { "path": "shareList", "style": { "navigationBarTitleText": "共享用工", "enablePullDownRefresh": true } }, { "path": "taskList", "style": { "navigationBarTitleText": "外包任务", "enablePullDownRefresh": true } }, { "path": "taskDetail", "style": { "navigationBarTitleText": "外包任务详情", "enablePullDownRefresh": false } }, { "path": "taskApply", "style": { "navigationBarTitleText": "立即报名", "enablePullDownRefresh": false } }] }, { "root": "pages/common", "pages": [{ "path": "industry", "style": { "navigationBarTitleText": "行业选择" } }, { "path": "post", "style": { "navigationBarTitleText": "职位选择" } }] }, { "root": "pages/user/person", "pages": [{ "path": "resume", "style": { "navigationBarTitleText": "个人简历" } }, { "path": "resumeDetail", "style": { "navigationBarTitleText": "个人简历" } }, { "path": "edit-cert", "style": { "navigationBarTitleText": "" } }, { "path": "edit-edu", "style": { "navigationBarTitleText": "添加教育经历" } }, { "path": "edit-expect", "style": { "navigationBarTitleText": "添加求职期望" } }, { "path": "edit-pro", "style": { "navigationBarTitleText": "添加项目经历" } }, { "path": "edit-pro-content", "style": { "navigationBarTitleText": "" } }, { "path": "edit-skill", "style": { "navigationBarTitleText": "添加个人优势" } }, { "path": "edit-work", "style": { "navigationBarTitleText": "添加工作经历" } }, { "path": "edit-work-content", "style": { "navigationBarTitleText": "工作内容" } }, { "path": "resume-base-info", "style": { "navigationBarTitleText": "基本信息", "enablePullDownRefresh": false } }, { "path": "resume-file", "style": { "navigationBarTitleText": "附件简历", "enablePullDownRefresh": false } }, { "path": "resume-preview", "style": { "navigationBarTitleText": "简历预览", "enablePullDownRefresh": false } }, { "path": "resume-export", "style": { "navigationBarTitleText": "简历模板", "enablePullDownRefresh": false } }] }, { "root": "pages/user/company", "pages": [{ "path": "company", "style": { "navigationBarTitleText": "编辑公司信息" } }, { "path": "enter", "style": { "navigationBarTitleText": "公司入驻", "navigationStyle": "custom" } }, { "path": "positions", "style": { "navigationBarTitleText": "职位管理", "enablePullDownRefresh": true } }, { "path": "position-edit", "style": { "navigationBarTitleText": "新增职位" } }, { "path": "position-preview", "style": { "navigationBarTitleText": "职位预览", "enablePullDownRefresh": false } }, { "path": "tasks", "style": { "navigationBarTitleText": "外包任务管理", "enablePullDownRefresh": true } }, { "path": "task-preview", "style": { "navigationBarTitleText": "外包任务预览", "enablePullDownRefresh": false } }, { "path": "task-edit", "style": { "navigationBarTitleText": "外包任务编辑", "enablePullDownRefresh": false } }, { "path": "auth", "style": { "navigationBarTitleText": "公司认证", "enablePullDownRefresh": false } }] }, { "root": "pages/user/common", "pages": [{ "path": "aboutUs", "style": { "navigationBarTitleText": "关于我们" } }, { "path": "contactUs", "style": { "navigationBarTitleText": "联系我们" } }, { "path": "system", "style": { "navigationBarTitleText": "系统设置" } }, { "path": "promoCode", "style": { "navigationBarTitleText": "我的推广码" } }, { "path": "collect", "style": { "navigationBarTitleText": "我的收藏", "enablePullDownRefresh": true } }, { "path": "course", "style": { "navigationBarTitleText": "我的课程", "enablePullDownRefresh": true } }, { "path": "share", "style": { "navigationBarTitleText": "我的分享", "enablePullDownRefresh": true } }, { "path": "apply", "style": { "navigationBarTitleText": "我的投递", "enablePullDownRefresh": true } }, { "path": "task", "style": { "navigationBarTitleText": "外包任务", "enablePullDownRefresh": true } }, { "path": "visitme", "style": { "navigationBarTitleText": "谁看过我", "enablePullDownRefresh": true } }, { "path": "terms", "style": { "navigationBarTitleText": "用户协议", "enablePullDownRefresh": false } }, { "path": "privacy", "style": { "navigationBarTitleText": "隐私政策", "enablePullDownRefresh": false } }, { "path": "browse", "style": { "navigationBarTitleText": "浏览记录", "enablePullDownRefresh": true } }, { "path": "connected", "style": { "navigationBarTitleText": "已沟通过", "enablePullDownRefresh": true } }, { "path": "hideSetting", "style": { "navigationBarTitleText": "", "enablePullDownRefresh": true } }, { "path": "addShield", "style": { "navigationBarTitleText": "", "enablePullDownRefresh": false } }, { "path": "serviceCenter", "style": { "navigationBarTitleText": "客服中心", "enablePullDownRefresh": false } }, { "path": "office-preview", "style": { "navigationBarTitleText": "附件预览", "enablePullDownRefresh": false } }] }], "condition": { "current": 0, "list": [{ "name": "首页", "path": "pages/index/index", "query": "" }] }, "globalStyle": { "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#12ae85", "backgroundColor": "#fbf9fe" }, "tabBar": { "color": "#444444", "selectedColor": "#12ae85", "borderStyle": "black", "backgroundColor": "#ffffff", "list": [{ "pagePath": "pages/index/index", "iconPath": "static/icon/home_light.png", "selectedIconPath": "static/icon/home_fill_light.png", "text": "首页" }, { "pagePath": "pages/type/type", "iconPath": "static/icon/search.png", "selectedIconPath": "static/icon/search-fill.png", "text": "分类" }, { "pagePath": "pages/chat/chat", "iconPath": "static/icon/message_light.png", "selectedIconPath": "static/icon/message_fill_light.png", "text": "消息" }, { "pagePath": "pages/user/user", "iconPath": "static/icon/my_light.png", "selectedIconPath": "static/icon/my_fill_light.png", "text": "我的" }] } };exports.default = _default;

/***/ }),

/***/ 907:
/*!*************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/pages.json?{"type":"stat"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__91E4A5F" };exports.default = _default;

/***/ }),

/***/ 91:
/*!*********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/ossutil/hmac.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Crypto = __webpack_require__(/*! ./crypto.js */ 92);

(function () {

  // Shortcut
  var util = Crypto.util;

  Crypto.HMAC = function (hasher, message, key, options) {

    // Allow arbitrary length keys
    key = key.length > hasher._blocksize * 4 ?
    hasher(key, { asBytes: true }) :
    util.stringToBytes(key);

    // XOR keys with pad constants
    var okey = key,
    ikey = key.slice(0);
    for (var i = 0; i < hasher._blocksize * 4; i++) {
      okey[i] ^= 0x5C;
      ikey[i] ^= 0x36;
    }

    var hmacbytes = hasher(util.bytesToString(okey) +
    hasher(util.bytesToString(ikey) + message, { asString: true }),
    { asBytes: true });
    return options && options.asBytes ? hmacbytes :
    options && options.asString ? util.bytesToString(hmacbytes) :
    util.bytesToHex(hmacbytes);

  };

})();

module.exports = Crypto;

/***/ }),

/***/ 92:
/*!***********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/ossutil/crypto.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Crypto = {};

(function () {

  var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";


  // Crypto utilities
  var util = Crypto.util = {

    // Bit-wise rotate left
    rotl: function rotl(n, b) {
      return n << b | n >>> 32 - b;
    },

    // Bit-wise rotate right
    rotr: function rotr(n, b) {
      return n << 32 - b | n >>> b;
    },

    // Swap big-endian to little-endian and vice versa
    endian: function endian(n) {

      // If number given, swap endian
      if (n.constructor == Number) {
        return util.rotl(n, 8) & 0x00FF00FF |
        util.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++) {
        n[i] = util.endian(n[i]);}
      return n;

    },

    // Generate an array of any length of random bytes
    randomBytes: function randomBytes(n) {
      for (var bytes = []; n > 0; n--) {
        bytes.push(Math.floor(Math.random() * 256));}
      return bytes;
    },

    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      var bytes = [];
      for (var i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i));}
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      var str = [];
      for (var i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]));}
      return str.join("");
    },

    // Convert a string to big-endian 32-bit words
    stringToWords: function stringToWords(str) {
      var words = [];
      for (var c = 0, b = 0; c < str.length; c++, b += 8) {
        words[b >>> 5] |= str.charCodeAt(c) << 24 - b % 32;}
      return words;
    },

    // Convert a byte array to big-endian 32-bits words
    bytesToWords: function bytesToWords(bytes) {
      var words = [];
      for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
        words[b >>> 5] |= bytes[i] << 24 - b % 32;}
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function wordsToBytes(words) {
      var bytes = [];
      for (var b = 0; b < words.length * 32; b += 8) {
        bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);}
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function bytesToHex(bytes) {
      var hex = [];
      for (var i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join("");
    },

    // Convert a hex string to a byte array
    hexToBytes: function hexToBytes(hex) {
      var bytes = [];
      for (var c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));}
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function bytesToBase64(bytes) {

      // Use browser-native function if it exists
      if (typeof btoa == "function") return btoa(util.bytesToString(bytes));

      var base64 = [],
      overflow;

      for (var i = 0; i < bytes.length; i++) {
        switch (i % 3) {
          case 0:
            base64.push(base64map.charAt(bytes[i] >>> 2));
            overflow = (bytes[i] & 0x3) << 4;
            break;
          case 1:
            base64.push(base64map.charAt(overflow | bytes[i] >>> 4));
            overflow = (bytes[i] & 0xF) << 2;
            break;
          case 2:
            base64.push(base64map.charAt(overflow | bytes[i] >>> 6));
            base64.push(base64map.charAt(bytes[i] & 0x3F));
            overflow = -1;}

      }

      // Encode overflow bits, if there are any
      if (overflow != undefined && overflow != -1)
      base64.push(base64map.charAt(overflow));

      // Add padding
      while (base64.length % 4 != 0) {base64.push("=");}

      return base64.join("");

    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function base64ToBytes(base64) {

      // Use browser-native function if it exists
      if (typeof atob == "function") return util.stringToBytes(atob(base64));

      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");

      var bytes = [];

      for (var i = 0; i < base64.length; i++) {
        switch (i % 4) {
          case 1:
            bytes.push(base64map.indexOf(base64.charAt(i - 1)) << 2 |
            base64map.indexOf(base64.charAt(i)) >>> 4);
            break;
          case 2:
            bytes.push((base64map.indexOf(base64.charAt(i - 1)) & 0xF) << 4 |
            base64map.indexOf(base64.charAt(i)) >>> 2);
            break;
          case 3:
            bytes.push((base64map.indexOf(base64.charAt(i - 1)) & 0x3) << 6 |
            base64map.indexOf(base64.charAt(i)));
            break;}

      }

      return bytes;

    } };



  // Crypto mode namespace
  Crypto.mode = {};

})();

module.exports = Crypto;

/***/ }),

/***/ 93:
/*!*********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/common/ossutil/sha1.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Crypto = __webpack_require__(/*! ./crypto.js */ 92);

(function () {

  // Shortcut
  var util = Crypto.util;

  // Public API
  var SHA1 = Crypto.SHA1 = function (message, options) {
    var digestbytes = util.wordsToBytes(SHA1._sha1(message));
    return options && options.asBytes ? digestbytes :
    options && options.asString ? util.bytesToString(digestbytes) :
    util.bytesToHex(digestbytes);
  };

  // The core
  SHA1._sha1 = function (message) {

    var m = util.stringToWords(message),
    l = message.length * 8,
    w = [],
    H0 = 1732584193,
    H1 = -271733879,
    H2 = -1732584194,
    H3 = 271733878,
    H4 = -1009589776;

    // Padding
    m[l >> 5] |= 0x80 << 24 - l % 32;
    m[(l + 64 >>> 9 << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {

      var a = H0,
      b = H1,
      c = H2,
      d = H3,
      e = H4;

      for (var j = 0; j < 80; j++) {

        if (j < 16) w[j] = m[i + j];else
        {
          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
          w[j] = n << 1 | n >>> 31;
        }

        var t = (H0 << 5 | H0 >>> 27) + H4 + (w[j] >>> 0) + (
        j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
        j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
        j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
        (H1 ^ H2 ^ H3) - 899497514);

        H4 = H3;
        H3 = H2;
        H2 = H1 << 30 | H1 >>> 2;
        H1 = H0;
        H0 = t;

      }

      H0 += a;
      H1 += b;
      H2 += c;
      H3 += d;
      H4 += e;

    }

    return [H0, H1, H2, H3, H4];

  };

  // Package private blocksize
  SHA1._blocksize = 16;

})();

module.exports = Crypto;

/***/ }),

/***/ 936:
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/index.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 937));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 938));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 939));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 937:
/*!**************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/en.json ***!
  \**************************************************************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"shop\",\"uni-goods-nav.options.cart\":\"cart\",\"uni-goods-nav.buttonGroup.addToCart\":\"add to cart\",\"uni-goods-nav.buttonGroup.buyNow\":\"buy now\"}");

/***/ }),

/***/ 938:
/*!*******************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/zh-Hans.json ***!
  \*******************************************************************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"店铺\",\"uni-goods-nav.options.cart\":\"购物车\",\"uni-goods-nav.buttonGroup.addToCart\":\"加入购物车\",\"uni-goods-nav.buttonGroup.buyNow\":\"立即购买\"}");

/***/ }),

/***/ 939:
/*!*******************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/zh-Hant.json ***!
  \*******************************************************************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"店鋪\",\"uni-goods-nav.options.cart\":\"購物車\",\"uni-goods-nav.buttonGroup.addToCart\":\"加入購物車\",\"uni-goods-nav.buttonGroup.buyNow\":\"立即購買\"}");

/***/ }),

/***/ 975:
/*!**************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-popup/components/uni-popup/popup.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  data: function data() {
    return {};


  },
  created: function created() {
    this.popup = this.getParent();
  },
  methods: {
    /**
              * 获取父元素实例
              */
    getParent: function getParent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'uniPopup';
      var parent = this.$parent;
      var parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    } } };exports.default = _default;

/***/ }),

/***/ 976:
/*!*******************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-popup/components/uni-popup/i18n/index.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 977));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 978));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 979));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 977:
/*!******************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-popup/components/uni-popup/i18n/en.json ***!
  \******************************************************************************************************************************/
/*! exports provided: uni-popup.cancel, uni-popup.ok, uni-popup.placeholder, uni-popup.title, uni-popup.shareTitle, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-popup.cancel\":\"cancel\",\"uni-popup.ok\":\"ok\",\"uni-popup.placeholder\":\"pleace enter\",\"uni-popup.title\":\"Hint\",\"uni-popup.shareTitle\":\"Share to\"}");

/***/ }),

/***/ 978:
/*!***********************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-popup/components/uni-popup/i18n/zh-Hans.json ***!
  \***********************************************************************************************************************************/
/*! exports provided: uni-popup.cancel, uni-popup.ok, uni-popup.placeholder, uni-popup.title, uni-popup.shareTitle, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-popup.cancel\":\"取消\",\"uni-popup.ok\":\"确定\",\"uni-popup.placeholder\":\"请输入\",\"uni-popup.title\":\"提示\",\"uni-popup.shareTitle\":\"分享到\"}");

/***/ }),

/***/ 979:
/*!***********************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/人才直聘-求职招聘-前端模板【完整版】示例/uni_modules/uni-popup/components/uni-popup/i18n/zh-Hant.json ***!
  \***********************************************************************************************************************************/
/*! exports provided: uni-popup.cancel, uni-popup.ok, uni-popup.placeholder, uni-popup.title, uni-popup.shareTitle, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-popup.cancel\":\"取消\",\"uni-popup.ok\":\"確定\",\"uni-popup.placeholder\":\"請輸入\",\"uni-popup.title\":\"提示\",\"uni-popup.shareTitle\":\"分享到\"}");

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map