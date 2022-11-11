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
    appId: "__UNI__78DC645",
    appName: "美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例",
    appVersion: "2.9.9",
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
      appId: "__UNI__78DC645",
      appName: "美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例",
      appVersion: "2.9.9",
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
      if (Object({"VUE_APP_NAME":"美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

/***/ 206:
/*!***********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例/third/qrcode.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

!function () {
  // alignment pattern
  var adelta = [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28]; // version block

  var vpat = [
  0xc94,
  0x5bc,
  0xa99,
  0x4d3,
  0xbf6,
  0x762,
  0x847,
  0x60d,
  0x928,
  0xb78,
  0x45d,
  0xa17,
  0x532,
  0x9a6,
  0x683,
  0x8c9,
  0x7ec,
  0xec4,
  0x1e1,
  0xfab,
  0x08e,
  0xc1a,
  0x33f,
  0xd75,
  0x250,
  0x9d5,
  0x6f0,
  0x8ba,
  0x79f,
  0xb0b,
  0x42e,
  0xa64,
  0x541,
  0xc69];
  // final format bits with mask: level << 3 | mask

  var fmtword = [
  0x77c4,
  0x72f3,
  0x7daa,
  0x789d,
  0x662f,
  0x6318,
  0x6c41,
  0x6976, //L
  0x5412,
  0x5125,
  0x5e7c,
  0x5b4b,
  0x45f9,
  0x40ce,
  0x4f97,
  0x4aa0, //M
  0x355f,
  0x3068,
  0x3f31,
  0x3a06,
  0x24b4,
  0x2183,
  0x2eda,
  0x2bed, //Q
  0x1689,
  0x13be,
  0x1ce7,
  0x19d0,
  0x0762,
  0x0255,
  0x0d0c,
  0x083b //H
  ]; // 4 per version: number of blocks 1,2; data width; ecc width

  var eccblocks = [
  1,
  0,
  19,
  7,
  1,
  0,
  16,
  10,
  1,
  0,
  13,
  13,
  1,
  0,
  9,
  17,
  1,
  0,
  34,
  10,
  1,
  0,
  28,
  16,
  1,
  0,
  22,
  22,
  1,
  0,
  16,
  28,
  1,
  0,
  55,
  15,
  1,
  0,
  44,
  26,
  2,
  0,
  17,
  18,
  2,
  0,
  13,
  22,
  1,
  0,
  80,
  20,
  2,
  0,
  32,
  18,
  2,
  0,
  24,
  26,
  4,
  0,
  9,
  16,
  1,
  0,
  108,
  26,
  2,
  0,
  43,
  24,
  2,
  2,
  15,
  18,
  2,
  2,
  11,
  22,
  2,
  0,
  68,
  18,
  4,
  0,
  27,
  16,
  4,
  0,
  19,
  24,
  4,
  0,
  15,
  28,
  2,
  0,
  78,
  20,
  4,
  0,
  31,
  18,
  2,
  4,
  14,
  18,
  4,
  1,
  13,
  26,
  2,
  0,
  97,
  24,
  2,
  2,
  38,
  22,
  4,
  2,
  18,
  22,
  4,
  2,
  14,
  26,
  2,
  0,
  116,
  30,
  3,
  2,
  36,
  22,
  4,
  4,
  16,
  20,
  4,
  4,
  12,
  24,
  2,
  2,
  68,
  18,
  4,
  1,
  43,
  26,
  6,
  2,
  19,
  24,
  6,
  2,
  15,
  28,
  4,
  0,
  81,
  20,
  1,
  4,
  50,
  30,
  4,
  4,
  22,
  28,
  3,
  8,
  12,
  24,
  2,
  2,
  92,
  24,
  6,
  2,
  36,
  22,
  4,
  6,
  20,
  26,
  7,
  4,
  14,
  28,
  4,
  0,
  107,
  26,
  8,
  1,
  37,
  22,
  8,
  4,
  20,
  24,
  12,
  4,
  11,
  22,
  3,
  1,
  115,
  30,
  4,
  5,
  40,
  24,
  11,
  5,
  16,
  20,
  11,
  5,
  12,
  24,
  5,
  1,
  87,
  22,
  5,
  5,
  41,
  24,
  5,
  7,
  24,
  30,
  11,
  7,
  12,
  24,
  5,
  1,
  98,
  24,
  7,
  3,
  45,
  28,
  15,
  2,
  19,
  24,
  3,
  13,
  15,
  30,
  1,
  5,
  107,
  28,
  10,
  1,
  46,
  28,
  1,
  15,
  22,
  28,
  2,
  17,
  14,
  28,
  5,
  1,
  120,
  30,
  9,
  4,
  43,
  26,
  17,
  1,
  22,
  28,
  2,
  19,
  14,
  28,
  3,
  4,
  113,
  28,
  3,
  11,
  44,
  26,
  17,
  4,
  21,
  26,
  9,
  16,
  13,
  26,
  3,
  5,
  107,
  28,
  3,
  13,
  41,
  26,
  15,
  5,
  24,
  30,
  15,
  10,
  15,
  28,
  4,
  4,
  116,
  28,
  17,
  0,
  42,
  26,
  17,
  6,
  22,
  28,
  19,
  6,
  16,
  30,
  2,
  7,
  111,
  28,
  17,
  0,
  46,
  28,
  7,
  16,
  24,
  30,
  34,
  0,
  13,
  24,
  4,
  5,
  121,
  30,
  4,
  14,
  47,
  28,
  11,
  14,
  24,
  30,
  16,
  14,
  15,
  30,
  6,
  4,
  117,
  30,
  6,
  14,
  45,
  28,
  11,
  16,
  24,
  30,
  30,
  2,
  16,
  30,
  8,
  4,
  106,
  26,
  8,
  13,
  47,
  28,
  7,
  22,
  24,
  30,
  22,
  13,
  15,
  30,
  10,
  2,
  114,
  28,
  19,
  4,
  46,
  28,
  28,
  6,
  22,
  28,
  33,
  4,
  16,
  30,
  8,
  4,
  122,
  30,
  22,
  3,
  45,
  28,
  8,
  26,
  23,
  30,
  12,
  28,
  15,
  30,
  3,
  10,
  117,
  30,
  3,
  23,
  45,
  28,
  4,
  31,
  24,
  30,
  11,
  31,
  15,
  30,
  7,
  7,
  116,
  30,
  21,
  7,
  45,
  28,
  1,
  37,
  23,
  30,
  19,
  26,
  15,
  30,
  5,
  10,
  115,
  30,
  19,
  10,
  47,
  28,
  15,
  25,
  24,
  30,
  23,
  25,
  15,
  30,
  13,
  3,
  115,
  30,
  2,
  29,
  46,
  28,
  42,
  1,
  24,
  30,
  23,
  28,
  15,
  30,
  17,
  0,
  115,
  30,
  10,
  23,
  46,
  28,
  10,
  35,
  24,
  30,
  19,
  35,
  15,
  30,
  17,
  1,
  115,
  30,
  14,
  21,
  46,
  28,
  29,
  19,
  24,
  30,
  11,
  46,
  15,
  30,
  13,
  6,
  115,
  30,
  14,
  23,
  46,
  28,
  44,
  7,
  24,
  30,
  59,
  1,
  16,
  30,
  12,
  7,
  121,
  30,
  12,
  26,
  47,
  28,
  39,
  14,
  24,
  30,
  22,
  41,
  15,
  30,
  6,
  14,
  121,
  30,
  6,
  34,
  47,
  28,
  46,
  10,
  24,
  30,
  2,
  64,
  15,
  30,
  17,
  4,
  122,
  30,
  29,
  14,
  46,
  28,
  49,
  10,
  24,
  30,
  24,
  46,
  15,
  30,
  4,
  18,
  122,
  30,
  13,
  32,
  46,
  28,
  48,
  14,
  24,
  30,
  42,
  32,
  15,
  30,
  20,
  4,
  117,
  30,
  40,
  7,
  47,
  28,
  43,
  22,
  24,
  30,
  10,
  67,
  15,
  30,
  19,
  6,
  118,
  30,
  18,
  31,
  47,
  28,
  34,
  34,
  24,
  30,
  20,
  61,
  15,
  30];
  // Galois field log table

  var glog = [
  0xff,
  0x00,
  0x01,
  0x19,
  0x02,
  0x32,
  0x1a,
  0xc6,
  0x03,
  0xdf,
  0x33,
  0xee,
  0x1b,
  0x68,
  0xc7,
  0x4b,
  0x04,
  0x64,
  0xe0,
  0x0e,
  0x34,
  0x8d,
  0xef,
  0x81,
  0x1c,
  0xc1,
  0x69,
  0xf8,
  0xc8,
  0x08,
  0x4c,
  0x71,
  0x05,
  0x8a,
  0x65,
  0x2f,
  0xe1,
  0x24,
  0x0f,
  0x21,
  0x35,
  0x93,
  0x8e,
  0xda,
  0xf0,
  0x12,
  0x82,
  0x45,
  0x1d,
  0xb5,
  0xc2,
  0x7d,
  0x6a,
  0x27,
  0xf9,
  0xb9,
  0xc9,
  0x9a,
  0x09,
  0x78,
  0x4d,
  0xe4,
  0x72,
  0xa6,
  0x06,
  0xbf,
  0x8b,
  0x62,
  0x66,
  0xdd,
  0x30,
  0xfd,
  0xe2,
  0x98,
  0x25,
  0xb3,
  0x10,
  0x91,
  0x22,
  0x88,
  0x36,
  0xd0,
  0x94,
  0xce,
  0x8f,
  0x96,
  0xdb,
  0xbd,
  0xf1,
  0xd2,
  0x13,
  0x5c,
  0x83,
  0x38,
  0x46,
  0x40,
  0x1e,
  0x42,
  0xb6,
  0xa3,
  0xc3,
  0x48,
  0x7e,
  0x6e,
  0x6b,
  0x3a,
  0x28,
  0x54,
  0xfa,
  0x85,
  0xba,
  0x3d,
  0xca,
  0x5e,
  0x9b,
  0x9f,
  0x0a,
  0x15,
  0x79,
  0x2b,
  0x4e,
  0xd4,
  0xe5,
  0xac,
  0x73,
  0xf3,
  0xa7,
  0x57,
  0x07,
  0x70,
  0xc0,
  0xf7,
  0x8c,
  0x80,
  0x63,
  0x0d,
  0x67,
  0x4a,
  0xde,
  0xed,
  0x31,
  0xc5,
  0xfe,
  0x18,
  0xe3,
  0xa5,
  0x99,
  0x77,
  0x26,
  0xb8,
  0xb4,
  0x7c,
  0x11,
  0x44,
  0x92,
  0xd9,
  0x23,
  0x20,
  0x89,
  0x2e,
  0x37,
  0x3f,
  0xd1,
  0x5b,
  0x95,
  0xbc,
  0xcf,
  0xcd,
  0x90,
  0x87,
  0x97,
  0xb2,
  0xdc,
  0xfc,
  0xbe,
  0x61,
  0xf2,
  0x56,
  0xd3,
  0xab,
  0x14,
  0x2a,
  0x5d,
  0x9e,
  0x84,
  0x3c,
  0x39,
  0x53,
  0x47,
  0x6d,
  0x41,
  0xa2,
  0x1f,
  0x2d,
  0x43,
  0xd8,
  0xb7,
  0x7b,
  0xa4,
  0x76,
  0xc4,
  0x17,
  0x49,
  0xec,
  0x7f,
  0x0c,
  0x6f,
  0xf6,
  0x6c,
  0xa1,
  0x3b,
  0x52,
  0x29,
  0x9d,
  0x55,
  0xaa,
  0xfb,
  0x60,
  0x86,
  0xb1,
  0xbb,
  0xcc,
  0x3e,
  0x5a,
  0xcb,
  0x59,
  0x5f,
  0xb0,
  0x9c,
  0xa9,
  0xa0,
  0x51,
  0x0b,
  0xf5,
  0x16,
  0xeb,
  0x7a,
  0x75,
  0x2c,
  0xd7,
  0x4f,
  0xae,
  0xd5,
  0xe9,
  0xe6,
  0xe7,
  0xad,
  0xe8,
  0x74,
  0xd6,
  0xf4,
  0xea,
  0xa8,
  0x50,
  0x58,
  0xaf];
  // Galios field exponent table

  var gexp = [
  0x01,
  0x02,
  0x04,
  0x08,
  0x10,
  0x20,
  0x40,
  0x80,
  0x1d,
  0x3a,
  0x74,
  0xe8,
  0xcd,
  0x87,
  0x13,
  0x26,
  0x4c,
  0x98,
  0x2d,
  0x5a,
  0xb4,
  0x75,
  0xea,
  0xc9,
  0x8f,
  0x03,
  0x06,
  0x0c,
  0x18,
  0x30,
  0x60,
  0xc0,
  0x9d,
  0x27,
  0x4e,
  0x9c,
  0x25,
  0x4a,
  0x94,
  0x35,
  0x6a,
  0xd4,
  0xb5,
  0x77,
  0xee,
  0xc1,
  0x9f,
  0x23,
  0x46,
  0x8c,
  0x05,
  0x0a,
  0x14,
  0x28,
  0x50,
  0xa0,
  0x5d,
  0xba,
  0x69,
  0xd2,
  0xb9,
  0x6f,
  0xde,
  0xa1,
  0x5f,
  0xbe,
  0x61,
  0xc2,
  0x99,
  0x2f,
  0x5e,
  0xbc,
  0x65,
  0xca,
  0x89,
  0x0f,
  0x1e,
  0x3c,
  0x78,
  0xf0,
  0xfd,
  0xe7,
  0xd3,
  0xbb,
  0x6b,
  0xd6,
  0xb1,
  0x7f,
  0xfe,
  0xe1,
  0xdf,
  0xa3,
  0x5b,
  0xb6,
  0x71,
  0xe2,
  0xd9,
  0xaf,
  0x43,
  0x86,
  0x11,
  0x22,
  0x44,
  0x88,
  0x0d,
  0x1a,
  0x34,
  0x68,
  0xd0,
  0xbd,
  0x67,
  0xce,
  0x81,
  0x1f,
  0x3e,
  0x7c,
  0xf8,
  0xed,
  0xc7,
  0x93,
  0x3b,
  0x76,
  0xec,
  0xc5,
  0x97,
  0x33,
  0x66,
  0xcc,
  0x85,
  0x17,
  0x2e,
  0x5c,
  0xb8,
  0x6d,
  0xda,
  0xa9,
  0x4f,
  0x9e,
  0x21,
  0x42,
  0x84,
  0x15,
  0x2a,
  0x54,
  0xa8,
  0x4d,
  0x9a,
  0x29,
  0x52,
  0xa4,
  0x55,
  0xaa,
  0x49,
  0x92,
  0x39,
  0x72,
  0xe4,
  0xd5,
  0xb7,
  0x73,
  0xe6,
  0xd1,
  0xbf,
  0x63,
  0xc6,
  0x91,
  0x3f,
  0x7e,
  0xfc,
  0xe5,
  0xd7,
  0xb3,
  0x7b,
  0xf6,
  0xf1,
  0xff,
  0xe3,
  0xdb,
  0xab,
  0x4b,
  0x96,
  0x31,
  0x62,
  0xc4,
  0x95,
  0x37,
  0x6e,
  0xdc,
  0xa5,
  0x57,
  0xae,
  0x41,
  0x82,
  0x19,
  0x32,
  0x64,
  0xc8,
  0x8d,
  0x07,
  0x0e,
  0x1c,
  0x38,
  0x70,
  0xe0,
  0xdd,
  0xa7,
  0x53,
  0xa6,
  0x51,
  0xa2,
  0x59,
  0xb2,
  0x79,
  0xf2,
  0xf9,
  0xef,
  0xc3,
  0x9b,
  0x2b,
  0x56,
  0xac,
  0x45,
  0x8a,
  0x09,
  0x12,
  0x24,
  0x48,
  0x90,
  0x3d,
  0x7a,
  0xf4,
  0xf5,
  0xf7,
  0xf3,
  0xfb,
  0xeb,
  0xcb,
  0x8b,
  0x0b,
  0x16,
  0x2c,
  0x58,
  0xb0,
  0x7d,
  0xfa,
  0xe9,
  0xcf,
  0x83,
  0x1b,
  0x36,
  0x6c,
  0xd8,
  0xad,
  0x47,
  0x8e,
  0x00];
  // Working buffers:
  // data input and ecc append, image working buffer, fixed part of image, run lengths for badness

  var strinbuf = [],
  eccbuf = [],
  qrframe = [],
  framask = [],
  rlens = []; // Control values - width is based on version, last 4 are from table.

  var version, width, neccblk1, neccblk2, datablkw, eccblkwid;
  var ecclevel = 2; // set bit to indicate cell in qrframe is immutable.  symmetric around diagonal

  function setmask(x, y) {
    var bt;

    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    } // y*y = 1+3+5...

    bt = y;
    bt *= y;
    bt += y;
    bt >>= 1;
    bt += x;
    framask[bt] = 1;
  } // enter alignment pattern - black to qrframe, white to mask (later black frame merged to mask)

  function putalign(x, y) {
    var j;
    qrframe[x + width * y] = 1;

    for (j = -2; j < 2; j++) {
      qrframe[x + j + width * (y - 2)] = 1;
      qrframe[x - 2 + width * (y + j + 1)] = 1;
      qrframe[x + 2 + width * (y + j)] = 1;
      qrframe[x + j + 1 + width * (y + 2)] = 1;
    }

    for (j = 0; j < 2; j++) {
      setmask(x - 1, y + j);
      setmask(x + 1, y - j);
      setmask(x - j, y - 1);
      setmask(x + j, y + 1);
    }
  } //========================================================================
  // Reed Solomon error correction
  // exponentiation mod N

  function modnn(x) {
    while (x >= 255) {
      x -= 255;
      x = (x >> 8) + (x & 255);
    }

    return x;
  }

  var genpoly = []; // Calculate and append ECC data to data block.  Block is in strinbuf, indexes to buffers given.

  function appendrs(data, dlen, ecbuf, eclen) {
    var i, j, fb;

    for (i = 0; i < eclen; i++) {strinbuf[ecbuf + i] = 0;}

    for (i = 0; i < dlen; i++) {
      fb = glog[strinbuf[data + i] ^ strinbuf[ecbuf]];
      if (fb != 255)
        /* fb term is non-zero */
        for (j = 1; j < eclen; j++) {strinbuf[ecbuf + j - 1] = strinbuf[ecbuf + j] ^ gexp[modnn(fb + genpoly[eclen - j])];} else
      for (j = ecbuf; j < ecbuf + eclen; j++) {strinbuf[j] = strinbuf[j + 1];}
      strinbuf[ecbuf + eclen - 1] = fb == 255 ? 0 : gexp[modnn(fb + genpoly[0])];
    }
  } //========================================================================
  // Frame data insert following the path rules
  // check mask - since symmetrical use half.

  function ismasked(x, y) {
    var bt;

    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }

    bt = y;
    bt += y * y;
    bt >>= 1;
    bt += x;
    return framask[bt];
  } //========================================================================
  //  Apply the selected mask out of the 8.

  function applymask(m) {
    var x, y, r3x, r3y;

    switch (m) {
      case 0:
        for (y = 0; y < width; y++) {for (x = 0; x < width; x++) {if (!(x + y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;}}

        break;

      case 1:
        for (y = 0; y < width; y++) {for (x = 0; x < width; x++) {if (!(y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;}}

        break;

      case 2:
        for (y = 0; y < width; y++) {
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }}

        break;

      case 3:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;

          for (r3x = r3y, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }

        break;

      case 4:
        for (y = 0; y < width; y++) {
          for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) {
              r3x = 0;
              r3y = !r3y;
            }

            if (!r3y && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }}

        break;

      case 5:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;

          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((x & y & 1) + !(!r3x | !r3y)) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }

        break;

      case 6:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;

          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((x & y & 1) + (r3x && r3x == r3y) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }

        break;

      case 7:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3) r3y = 0;

          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) r3x = 0;
            if (!((r3x && r3x == r3y) + (x + y & 1) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
          }
        }

        break;}


    return;
  } // Badness coefficients.

  var N1 = 3,
  N2 = 3,
  N3 = 40,
  N4 = 10; // Using the table of the length of each run, calculate the amount of bad image
  // - long runs or those that look like finders; called twice, once each for X and Y

  function badruns(length) {
    var i;
    var runsbad = 0;

    for (i = 0; i <= length; i++) {if (rlens[i] >= 5) runsbad += N1 + rlens[i] - 5;} // BwBBBwB as in finder

    for (i = 3; i < length - 1; i += 2) {
      if (
      rlens[i - 2] == rlens[i + 2] &&
      rlens[i + 2] == rlens[i - 1] &&
      rlens[i - 1] == rlens[i + 1] &&
      rlens[i - 1] * 3 == rlens[i] && ( // white around the black pattern? Not part of spec
      rlens[i - 3] == 0 || // beginning
      i + 3 > length || // end
      rlens[i - 3] * 3 >= rlens[i] * 4 ||
      rlens[i + 3] * 3 >= rlens[i] * 4))

      runsbad += N3;}

    return runsbad;
  } // Calculate how bad the masked image is - blocks, imbalance, runs, or finders.

  function badcheck() {
    var x, y, h, b, b1;
    var thisbad = 0;
    var bw = 0; // blocks of same color.

    for (y = 0; y < width - 1; y++) {
      for (x = 0; x < width - 1; x++) {
        if (
        qrframe[x + width * y] && qrframe[x + 1 + width * y] && qrframe[x + width * (y + 1)] && qrframe[x + 1 + width * (y + 1)] || // all black
        !(qrframe[x + width * y] || qrframe[x + 1 + width * y] || qrframe[x + width * (y + 1)] || qrframe[x + 1 + width * (y + 1)]))

          // all white
          thisbad += N2;}} // X runs

    for (y = 0; y < width; y++) {
      rlens[0] = 0;

      for (h = b = x = 0; x < width; x++) {
        if ((b1 = qrframe[x + width * y]) == b) rlens[h]++;else
        rlens[++h] = 1;
        b = b1;
        bw += b ? 1 : -1;
      }

      thisbad += badruns(h);
    } // black/white imbalance

    if (bw < 0) bw = -bw;
    var big = bw;
    var count = 0;
    big += big << 2;
    big <<= 1;

    while (big > width * width) {big -= width * width, count++;}

    thisbad += count * N4; // Y runs

    for (x = 0; x < width; x++) {
      rlens[0] = 0;

      for (h = b = y = 0; y < width; y++) {
        if ((b1 = qrframe[x + width * y]) == b) rlens[h]++;else
        rlens[++h] = 1;
        b = b1;
      }

      thisbad += badruns(h);
    }

    return thisbad;
  }

  function genframe(instring) {
    var x, y, k, t, v, i, j, m; // find the smallest version that fits the string

    t = instring.length;
    version = 0;

    do {
      version++;
      k = (ecclevel - 1) * 4 + (version - 1) * 16;
      neccblk1 = eccblocks[k++];
      neccblk2 = eccblocks[k++];
      datablkw = eccblocks[k++];
      eccblkwid = eccblocks[k];
      k = datablkw * (neccblk1 + neccblk2) + neccblk2 - 3 + (version <= 9);
      if (t <= k) break;
    } while (version < 40); // FIXME - insure that it fits insted of being truncated

    width = 17 + 4 * version; // allocate, clear and setup data structures

    v = datablkw + (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;

    for (t = 0; t < v; t++) {eccbuf[t] = 0;}

    strinbuf = instring.slice(0);

    for (t = 0; t < width * width; t++) {qrframe[t] = 0;}

    for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {framask[t] = 0;} // insert finders - black to frame, white to mask

    for (t = 0; t < 3; t++) {
      k = 0;
      y = 0;
      if (t == 1) k = width - 7;
      if (t == 2) y = width - 7;
      qrframe[y + 3 + width * (k + 3)] = 1;

      for (x = 0; x < 6; x++) {
        qrframe[y + x + width * k] = 1;
        qrframe[y + width * (k + x + 1)] = 1;
        qrframe[y + 6 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 6)] = 1;
      }

      for (x = 1; x < 5; x++) {
        setmask(y + x, k + 1);
        setmask(y + 1, k + x + 1);
        setmask(y + 5, k + x);
        setmask(y + x + 1, k + 5);
      }

      for (x = 2; x < 4; x++) {
        qrframe[y + x + width * (k + 2)] = 1;
        qrframe[y + 2 + width * (k + x + 1)] = 1;
        qrframe[y + 4 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 4)] = 1;
      }
    } // alignment blocks

    if (version > 1) {
      t = adelta[version];
      y = width - 7;

      for (;;) {
        x = width - 7;

        while (x > t - 3) {
          putalign(x, y);
          if (x < t) break;
          x -= t;
        }

        if (y <= t + 9) break;
        y -= t;
        putalign(6, y);
        putalign(y, 6);
      }
    } // single black

    qrframe[8 + width * (width - 8)] = 1; // timing gap - mask only

    for (y = 0; y < 7; y++) {
      setmask(7, y);
      setmask(width - 8, y);
      setmask(7, y + width - 7);
    }

    for (x = 0; x < 8; x++) {
      setmask(x, 7);
      setmask(x + width - 8, 7);
      setmask(x, width - 8);
    } // reserve mask-format area

    for (x = 0; x < 9; x++) {setmask(x, 8);}

    for (x = 0; x < 8; x++) {
      setmask(x + width - 8, 8);
      setmask(8, x);
    }

    for (y = 0; y < 7; y++) {setmask(8, y + width - 7);} // timing row/col

    for (x = 0; x < width - 14; x++) {
      if (x & 1) {
        setmask(8 + x, 6);
        setmask(6, 8 + x);
      } else {
        qrframe[8 + x + width * 6] = 1;
        qrframe[6 + width * (8 + x)] = 1;
      }} // version block

    if (version > 6) {
      t = vpat[version - 7];
      k = 17;

      for (x = 0; x < 6; x++) {
        for (y = 0; y < 3; y++, k--) {
          if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
            qrframe[5 - x + width * (2 - y + width - 11)] = 1;
            qrframe[2 - y + width - 11 + width * (5 - x)] = 1;
          } else {
            setmask(5 - x, 2 - y + width - 11);
            setmask(2 - y + width - 11, 5 - x);
          }}}
    } // sync mask bits - only set above for white spaces, so add in black bits

    for (y = 0; y < width; y++) {for (x = 0; x <= y; x++) {if (qrframe[x + width * y]) setmask(x, y);}} // convert string to bitstream
    // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)

    v = strinbuf.length; // string to array

    for (i = 0; i < v; i++) {eccbuf[i] = strinbuf.charCodeAt(i);}

    strinbuf = eccbuf.slice(0); // calculate max string length

    x = datablkw * (neccblk1 + neccblk2) + neccblk2;

    if (v >= x - 2) {
      v = x - 2;
      if (version > 9) v--;
    } // shift and repack to insert length prefix

    i = v;

    if (version > 9) {
      strinbuf[i + 2] = 0;
      strinbuf[i + 3] = 0;

      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 3] |= 255 & t << 4;
        strinbuf[i + 2] = t >> 4;
      }

      strinbuf[2] |= 255 & v << 4;
      strinbuf[1] = v >> 4;
      strinbuf[0] = 0x40 | v >> 12;
    } else {
      strinbuf[i + 1] = 0;
      strinbuf[i + 2] = 0;

      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 2] |= 255 & t << 4;
        strinbuf[i + 1] = t >> 4;
      }

      strinbuf[1] |= 255 & v << 4;
      strinbuf[0] = 0x40 | v >> 4;
    } // fill to end with pad pattern

    i = v + 3 - (version < 10);

    while (i < x) {
      strinbuf[i++] = 0xec; // buffer has room    if (i == x)      break;

      strinbuf[i++] = 0x11;
    } // calculate and append ECC
    // calculate generator polynomial

    genpoly[0] = 1;

    for (i = 0; i < eccblkwid; i++) {
      genpoly[i + 1] = 1;

      for (j = i; j > 0; j--) {genpoly[j] = genpoly[j] ? genpoly[j - 1] ^ gexp[modnn(glog[genpoly[j]] + i)] : genpoly[j - 1];}

      genpoly[0] = gexp[modnn(glog[genpoly[0]] + i)];
    }

    for (i = 0; i <= eccblkwid; i++) {genpoly[i] = glog[genpoly[i]];} // use logs for genpoly[] to save calc step
    // append ecc to data buffer

    k = x;
    y = 0;

    for (i = 0; i < neccblk1; i++) {
      appendrs(y, datablkw, k, eccblkwid);
      y += datablkw;
      k += eccblkwid;
    }

    for (i = 0; i < neccblk2; i++) {
      appendrs(y, datablkw + 1, k, eccblkwid);
      y += datablkw + 1;
      k += eccblkwid;
    } // interleave blocks

    y = 0;

    for (i = 0; i < datablkw; i++) {
      for (j = 0; j < neccblk1; j++) {eccbuf[y++] = strinbuf[i + j * datablkw];}

      for (j = 0; j < neccblk2; j++) {eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];}
    }

    for (j = 0; j < neccblk2; j++) {eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];}

    for (i = 0; i < eccblkwid; i++) {for (j = 0; j < neccblk1 + neccblk2; j++) {eccbuf[y++] = strinbuf[x + i + j * eccblkwid];}}

    strinbuf = eccbuf; // pack bits into frame avoiding masked area.

    x = y = width - 1;
    k = v = 1; // up, minus

    /* inteleaved data and ecc codes */

    m = (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;

    for (i = 0; i < m; i++) {
      t = strinbuf[i];

      for (j = 0; j < 8; j++, t <<= 1) {
        if (0x80 & t) qrframe[x + width * y] = 1;

        do {
          // find next fill position
          if (v) x--;else
          {
            x++;

            if (k) {
              if (y != 0) y--;else
              {
                x -= 2;
                k = !k;

                if (x == 6) {
                  x--;
                  y = 9;
                }
              }
            } else {
              if (y != width - 1) y++;else
              {
                x -= 2;
                k = !k;

                if (x == 6) {
                  x--;
                  y -= 8;
                }
              }
            }
          }
          v = !v;
        } while (ismasked(x, y));
      }
    } // save pre-mask copy of frame

    strinbuf = qrframe.slice(0);
    t = 0; // best

    y = 30000; // demerit
    // for instead of while since in original arduino code
    // if an early mask was "good enough" it wouldn't try for a better one
    // since they get more complex and take longer.

    for (k = 0; k < 8; k++) {
      applymask(k); // returns black-white imbalance

      x = badcheck();

      if (x < y) {
        // current mask better than previous best?
        y = x;
        t = k;
      }

      if (t == 7) break; // don't increment i to a void redoing mask

      qrframe = strinbuf.slice(0); // reset for next pass
    }

    if (t != k)
      // redo best mask - none good enough, last wasn't t
      applymask(t); // add in final mask/ecclevel bytes

    y = fmtword[t + (ecclevel - 1 << 3)]; // low byte

    for (k = 0; k < 8; k++, y >>= 1) {
      if (y & 1) {
        qrframe[width - 1 - k + width * 8] = 1;
        if (k < 6) qrframe[8 + width * k] = 1;else
        qrframe[8 + width * (k + 1)] = 1;
      }} // high byte

    for (k = 0; k < 7; k++, y >>= 1) {
      if (y & 1) {
        qrframe[8 + width * (width - 7 + k)] = 1;
        if (k) qrframe[6 - k + width * 8] = 1;else
        qrframe[7 + width * 8] = 1;
      }}

    return qrframe;
  }

  var _canvas = null;
  var api = {
    get ecclevel() {
      return ecclevel;
    },

    set ecclevel(val) {
      ecclevel = val;
    },

    get size() {
      return _size;
    },

    set size(val) {
      _size = val;
    },

    get canvas() {
      return _canvas;
    },

    set canvas(el) {
      _canvas = el;
    },

    getFrame: function getFrame(string) {
      return genframe(string);
    },
    //这里的utf16to8(str)是对Text中的字符串进行转码，让其支持中文
    utf16to8: function utf16to8(str) {
      var out, i, len, c;
      out = '';
      len = str.length;

      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);

        if (c >= 0x0001 && c <= 0x007f) {
          out += str.charAt(i);
        } else if (c > 0x07ff) {
          out += String.fromCharCode(0xe0 | c >> 12 & 0x0f);
          out += String.fromCharCode(0x80 | c >> 6 & 0x3f);
          out += String.fromCharCode(0x80 | c >> 0 & 0x3f);
        } else {
          out += String.fromCharCode(0xc0 | c >> 6 & 0x1f);
          out += String.fromCharCode(0x80 | c >> 0 & 0x3f);
        }
      }

      return out;
    },

    /**
        * 新增$this参数，传入组件的this,兼容在组件中生成
        */
    draw: function draw(str, canvas, cavW, cavH, $this, ecc) {
      var that = this;
      ecclevel = ecc || ecclevel;
      canvas = canvas || _canvas;

      if (!canvas) {
        console.warn('No canvas provided to draw QR code in!');
        return;
      }

      var size = Math.min(cavW, cavH);
      str = that.utf16to8(str); //增加中文显示

      var frame = that.getFrame(str),
      // 组件中生成qrcode需要绑定this
      ctx = wx.createCanvasContext(canvas, $this),
      px = Math.round(size / (width + 8));
      var roundedSize = px * (width + 8),
      offset = Math.floor((size - roundedSize) / 2);
      size = roundedSize; //ctx.clearRect(0, 0, cavW, cavW);

      ctx.setFillStyle('#ffffff');
      ctx.fillRect(0, 0, cavW, cavW);
      ctx.setFillStyle('#000000');

      for (var i = 0; i < width; i++) {
        for (var j = 0; j < width; j++) {
          if (frame[j * width + i]) {
            ctx.fillRect(px * (4 + i) + offset, px * (4 + j) + offset, px, px);
          }
        }
      }

      ctx.draw();
    } };

  module.exports = {
    api: api };
  // exports.draw = api;
}();

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
        if (Object({"VUE_APP_NAME":"美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"VUE_APP_NAME":"美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"VUE_APP_NAME":"美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
/*!******************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例/pages.json ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 89:
/*!**********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例/third/tools.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.stringToUint8Array = exports.Uint8ArrayToString = exports.numToString = exports.toNumber = exports.toLong = exports.transferToLong = exports.formatJson = void 0;var _long = _interopRequireDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'long'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var formatJson = function formatJson(obj) {
  var isLong = obj instanceof _long.default;

  if (isLong) {
    return obj;
  }

  var type = typeof obj;

  if (type === 'bool' || type === 'string' || type === 'number') {
    return obj;
  }

  if (Array.isArray(obj)) {
    var arrRet = [];
    obj.forEach(function (item) {
      arrRet.push(formatJson(item));
    });
    return arrRet;
  }

  var hashRet = {};
  var keys = Object.keys(obj);
  keys.forEach(function (key) {
    hashRet[key] = formatJson(obj[key]);
  });
  return hashRet;
};exports.formatJson = formatJson;

var transferToLong = function transferToLong(obj) {var
  low = obj.low,high = obj.high;

  if (typeof low !== 'undefined' && typeof high !== 'undefined') {
    var srret = new _long.default(low, high, true);
    return srret;
  }

  var type = typeof obj;

  if (type === 'bool' || type === 'string' || type === 'number') {
    return obj;
  }

  if (Array.isArray(obj)) {
    var arrRet = [];
    obj.forEach(function (item) {
      arrRet.push(transferToLong(item));
    });
    return arrRet;
  }

  var hashRet = {};
  var keys = Object.keys(obj);
  keys.forEach(function (key) {
    hashRet[key] = transferToLong(obj[key]);
  });
  return hashRet;
};exports.transferToLong = transferToLong;

var toNumber = function toNumber() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  if (typeof obj === 'string') {
    return obj - 0;
  }

  if (typeof obj === 'number') {
    return obj;
  }var

  low = obj.low,high = obj.high,_obj$unsigned = obj.unsigned,unsigned = _obj$unsigned === void 0 ? true : _obj$unsigned;

  if (typeof low !== 'undefined' && high !== 'undefined') {
    return new _long.default(low, high, unsigned).toNumber();
  }
};exports.toNumber = toNumber;

var toLong = function toLong(obj) {
  if (typeof obj === 'string') return _long.default.fromString(obj);var
  low = obj.low,high = obj.high,_obj$unsigned2 = obj.unsigned,unsigned = _obj$unsigned2 === void 0 ? true : _obj$unsigned2;

  if (typeof low !== 'undefined' && high !== 'undefined') {
    return new _long.default(low, high, unsigned);
  }

  if (typeof obj === 'number') {
    return _long.default.fromNumber(obj);
  }

  return new _long.default();
};exports.toLong = toLong;

var numToString = function numToString(obj) {
  if (typeof obj === 'undefined') {
    '';
  }

  if (typeof obj === 'string') return obj;
  if (typeof obj === 'number') return obj + '';

  if (typeof obj.low !== 'undefined' && typeof obj.high !== 'undefined') {
    return new _long.default(obj.low, obj.high, true).toString();
  }

  return new _long.default(obj).toString();
};exports.numToString = numToString;

var Uint8ArrayToString = function Uint8ArrayToString(fileData) {
  var dataString = '';

  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }

  return dataString;
};exports.Uint8ArrayToString = Uint8ArrayToString;

var stringToUint8Array = function stringToUint8Array(str) {
  var arr = [];

  for (var i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  var tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array;
};exports.stringToUint8Array = stringToUint8Array;

/***/ }),

/***/ 9:
/*!*******************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例/im/floo-2.0.0.uniapp.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e32) {throw _e32;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e33) {didErr = true;err = _e33;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}!function (e, t) { true ? module.exports = t() : undefined;}("undefined" != typeof self ? self : this, function () {return function (e) {var t = {};function n(o) {if (t[o]) return t[o].exports;var r = t[o] = { i: o, l: !1, exports: {} };return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports;}return n.m = e, n.c = t, n.d = function (e, t, o) {n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });}, n.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });}, n.t = function (e, t) {if (1 & t && (e = n(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var o = Object.create(null);if (n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var r in e) {n.d(o, r, function (t) {return e[t];}.bind(null, r));}return o;}, n.n = function (e) {var t = e && e.__esModule ? function () {return e.default;} : function () {return e;};return n.d(t, "a", t), t;}, n.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, n.p = "", n(n.s = 47);}([function (e, t, n) {e.exports = function () {var e = {};function t(t, n, o) {return "function" == typeof n ? (o = n, n = new e.Root()) : n || (n = new e.Root()), n.load(t, o);}function o(t, n) {return n || (n = new e.Root()), n.loadSync(t);}function r(t, n, o) {return "function" == typeof n ? (o = n, n = new e.Root()) : n || (n = new e.Root()), n.parseFromPbString(t, o);}function i() {e.converter._configure(), e.decoder._configure(), e.encoder._configure(), e.Field._configure(), e.MapField._configure(), e.Message._configure(), e.Namespace._configure(), e.Method._configure(), e.ReflectionObject._configure(), e.OneOf._configure(), e.parse._configure(), e.Reader._configure(), e.Root._configure(), e.Service._configure(), e.verifier._configure(), e.Type._configure(), e.types._configure(), e.wrappers._configure(), e.Writer._configure();}if (e.build = "minimal", e.Writer = n(19), e.encoder = n(28), e.Reader = n(26), e.util = n(1), e.rpc = n(24), e.roots = n(20), e.verifier = n(27), e.tokenize = n(23), e.parse = n(22), e.common = n(25), e.ReflectionObject = n(7), e.Namespace = n(9), e.Root = n(12), e.Enum = n(4), e.Type = n(6), e.Field = n(5), e.OneOf = n(10), e.MapField = n(16), e.Service = n(13), e.Method = n(17), e.converter = n(31), e.decoder = n(29), e.Message = n(18), e.wrappers = n(30), e.types = n(8), e.util = n(1), e.configure = i, e.load = t, e.loadSync = o, e.parseFromPbString = r, i(), arguments && arguments.length) for (var s = 0; s < arguments.length; s++) {var a = arguments[s];if (a.hasOwnProperty("exports")) return void (a.exports = e);}return e;}();}, function (e, t, n) {var o = e.exports,r = n(20);o.LongBits = n(15), o.Long = n(41), o.pool = n(42), o.float = n(43), o.asPromise = n(44), o.EventEmitter = n(45), o.path = n(46), o.base64 = n(21), o.utf8 = n(11), o.compareFieldsById = function (e, t) {return e.id - t.id;}, o.toArray = function (e) {if (e) {for (var t = Object.keys(e), n = new Array(t.length), o = 0; o < t.length;) {n[o] = e[t[o++]];}return n;}return [];}, o.toObject = function (e) {for (var t = {}, n = 0; n < e.length;) {var o = e[n++],r = e[n++];void 0 !== r && (t[o] = r);}return t;}, o.isString = function (e) {return "string" == typeof e || e instanceof String;};o.isReserved = function (e) {return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e);}, o.isObject = function (e) {return e && "object" == typeof e;}, o.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, o.oneOfGetter = function (e) {for (var t = {}, n = 0; n < e.length; ++n) {t[e[n]] = 1;}return function () {for (var e = Object.keys(this), n = e.length - 1; n > -1; --n) {if (1 === t[e[n]] && void 0 !== this[e[n]] && null !== this[e[n]]) return e[n];}};}, o.oneOfSetter = function (e) {return function (t) {for (var n = 0; n < e.length; ++n) {e[n] !== t && delete this[e[n]];}};}, o.merge = function (e, t, n) {for (var o = Object.keys(t), r = 0; r < o.length; ++r) {void 0 !== e[o[r]] && n || (e[o[r]] = t[o[r]]);}return e;}, o.decorateType = function (e, t) {if (e.$type) return t && e.$type.name !== t && (o.decorateRoot.remove(e.$type), e.$type.name = t, o.decorateRoot.add(e.$type)), e.$type;Type || (Type = n(6));var r = new Type(t || e.name);return o.decorateRoot.add(r), r.ctor = e, Object.defineProperty(e, "$type", { value: r, enumerable: !1 }), Object.defineProperty(e.prototype, "$type", { value: r, enumerable: !1 }), r;}, o.emptyArray = Object.freeze ? Object.freeze([]) : [], o.emptyObject = Object.freeze ? Object.freeze({}) : {}, o.longToHash = function (e) {return e ? o.LongBits.from(e).toHash() : o.LongBits.zeroHash;}, o.copy = function (e) {if ("object" != typeof e) return e;var t = {};for (var n in e) {t[n] = e[n];}return t;}, o.deepCopy = function e(t) {if ("object" != typeof t) return t;var n = {};for (var o in t) {n[o] = e(t[o]);}return n;}, o.ProtocolError = function (e) {function t(e, n) {if (!(this instanceof t)) return new t(e, n);Object.defineProperty(this, "message", { get: function get() {return e;} }), Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", { value: new Error().stack || "" }), n && merge(this, n);}return (t.prototype = Object.create(Error.prototype)).constructor = t, Object.defineProperty(t.prototype, "name", { get: function get() {return e;} }), t.prototype.toString = function () {return this.name + ": " + this.message;}, t;}, o.toJSONOptions = { longs: String, enums: String, bytes: String, json: !0 }, o.Buffer = null, o.newBuffer = function (e) {return "number" == typeof e ? new o.Array(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e);}, o.stringToBytes = function (e) {var t,n,o = [];t = e.length;for (var r = 0; r < t; r++) {(n = e.charCodeAt(r)) >= 65536 && n <= 1114111 ? (o.push(n >> 18 & 7 | 240), o.push(n >> 12 & 63 | 128), o.push(n >> 6 & 63 | 128), o.push(63 & n | 128)) : n >= 2048 && n <= 65535 ? (o.push(n >> 12 & 15 | 224), o.push(n >> 6 & 63 | 128), o.push(63 & n | 128)) : n >= 128 && n <= 2047 ? (o.push(n >> 6 & 31 | 192), o.push(63 & n | 128)) : o.push(255 & n);}return o;}, o.byteToString = function (e) {if ("string" == typeof e) return e;for (var t = "", n = e, o = 0; o < n.length; o++) {var r = n[o].toString(2),i = r.match(/^1+?(?=0)/);if (i && 8 == r.length) {for (var s = i[0].length, a = n[o].toString(2).slice(7 - s), u = 1; u < s; u++) {a += n[u + o].toString(2).slice(2);}t += String.fromCharCode(parseInt(a, 2)), o += s - 1;} else t += String.fromCharCode(n[o]);}return t;}, o.isInteger = Number.isInteger || function (e) {return "number" == typeof e && isFinite(e) && Math.floor(e) === e;}, Object.defineProperty(o, "decorateRoot", { get: function get() {return r.decorated || (r.decorated = new (n(12))());} });}, function (e, t, n) {var o, r, i;r = [n(0)], void 0 === (i = "function" == typeof (o = function o(e) {"use strict";return (e.roots.xsync || (e.roots.xsync = new e.Root())).addJSON({ im: { nested: { floo: { nested: { protobuf: { nested: { Frame: { fields: { vsn: { type: "VSN", id: 1 }, compress_method: { type: "CompressMethod", id: 2 }, command: { type: "Command", id: 3 }, payload: { type: "bytes", id: 4 }, encrypt_method: { type: "EncryptMethod", id: 5 }, encrypt_key: { type: "bytes", id: 6 }, check_sum: { type: "uint32", id: 7 }, tag: { type: "string", id: 8 } }, nested: { VSN: { values: { XSYNC_V1: 0, XSYNC_V2: 1 } }, Command: { values: { UNREAD: 0, SYNC: 1, NOTICE: 2, PROVISION: 3 } }, CompressMethod: { values: { NONE: 0, ZLIB: 1 } }, EncryptMethod: { values: { ENCRYPT_NONE: 0, AES_CBC_128: 1, AES_CBC_256: 2, CUSTOM: 3 } } } }, Status: { fields: { code: { type: "ErrorCode", id: 1 }, reason: { type: "string", id: 2 } }, nested: { ErrorCode: { values: { UNKNOWN: 0, OK: 1, FAIL: 2, UNKNOWN_COMMAND: 3, PB_PARSER_ERROR: 4, DECRYPT_FAILURE: 5, PUBLIC_KEY_CHANGED: 6, INVALID_TOKEN: 7, INVALID_PARAMETER: 8, UNAUTHORIZED: 9, USER_FROZEN: 10, USER_BANNED: 11, WORD_CENSORED: 12, TOO_MANY_DEVICES: 13, ENCRYPT_METHOD_UNSUPPORTED: 14, DEVICE_GUID_CONFLICT: 15, CHECK_SUM_FAILURE: 16, INVALID_LICENSE: 17, LICENSE_LIMIT: 18, APP_FROZEN: 19 } } } }, ConversationUnread: { fields: { xid: { type: "XID", id: 1 }, n: { type: "uint32", id: 2 }, type: { type: "ConvType", id: 3 } }, nested: { ConvType: { values: { UNKNOWN: 0, CHAT: 1, GROUPCHAT: 2 } } } }, UnreadUL: { fields: {} }, UnreadDL: { fields: { status: { type: "Status", id: 1 }, unread: { rule: "repeated", type: "ConversationUnread", id: 2 } } }, SyncUL: { fields: { xid: { type: "XID", id: 1 }, key: { type: "uint64", id: 2 }, meta: { type: "Meta", id: 3 }, is_full_sync: { type: "bool", id: 4 }, full_sync_num: { type: "sint32", id: 5 } } }, SyncDL: { fields: { status: { type: "Status", id: 1 }, metas: { rule: "repeated", type: "Meta", id: 2 }, next_key: { type: "uint64", id: 3 }, xid: { type: "XID", id: 4 }, client_mid: { type: "uint64", id: 5 }, server_mid: { type: "uint64", id: 6 }, server_time: { type: "uint64", id: 7 }, is_full_sync: { type: "bool", id: 8 }, prev_mid: { type: "uint64", id: 9 }, is_eager_sync: { type: "bool", id: 10 } } }, Notice: { fields: { xid: { type: "XID", id: 1 } } }, Provision: { fields: { status: { type: "Status", id: 1 }, xid: { type: "XID", id: 2 }, password: { type: "string", id: 5 }, token: { type: "string", id: 6 }, os_type: { type: "OsType", id: 7 }, sdk_vsn: { type: "string", id: 8 }, is_manual_login: { type: "bool", id: 9 }, device_guid: { type: "string", id: 10 }, device_notifier: { type: "string", id: 11 }, device_token: { type: "string", id: 12 }, device_info: { type: "string", id: 13 }, last_login_time: { type: "uint64", id: 14 } }, nested: { OsType: { values: { UNKNOWN: 0, IOS: 1, ANDR: 2, WIN: 3, OSX: 4, LINUX: 5, WEB: 6 } } } }, Meta: { fields: { id: { type: "uint64", id: 1 }, from: { type: "XID", id: 2 }, to: { type: "XID", id: 3 }, timestamp: { type: "uint64", id: 4 }, ns: { type: "NameSpace", id: 5 }, payload: { type: "bytes", id: 6 } }, nested: { NameSpace: { values: { UNKNOWN: 0, MESSAGE: 1, GROUP_NOTICE: 2, ROSTER_NOTICE: 3, USER_NOTICE: 4, INFO: 5, CONVERSATION: 6, PUSH: 7 } } } }, XID: { fields: { uid: { type: "uint64", id: 1 }, deviceSN: { type: "uint32", id: 2 } } } } } } } } } });}) ? o.apply(t, r) : o) || (e.exports = i);}, function (e, t) {e.exports = o;var n = null;try {n = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;} catch (e) {}function o(e, t, n) {this.low = 0 | e, this.high = 0 | t, this.unsigned = !!n;}function r(e) {return !0 === (e && e.__isLong__);}o.prototype.__isLong__, Object.defineProperty(o.prototype, "__isLong__", { value: !0 }), o.isLong = r;var i = {},s = {};function a(e, t) {var n, o, r;return t ? (r = 0 <= (e >>>= 0) && e < 256) && (o = s[e]) ? o : (n = c(e, (0 | e) < 0 ? -1 : 0, !0), r && (s[e] = n), n) : (r = -128 <= (e |= 0) && e < 128) && (o = i[e]) ? o : (n = c(e, e < 0 ? -1 : 0, !1), r && (i[e] = n), n);}function u(e, t) {if (isNaN(e)) return t ? v : m;if (t) {if (e < 0) return v;if (e >= h) return A;} else {if (e <= -g) return O;if (e + 1 >= g) return b;}return e < 0 ? u(-e, t).neg() : c(e % f | 0, e / f | 0, t);}function c(e, t, n) {return new o(e, t, n);}o.fromInt = a, o.fromNumber = u, o.fromBits = c;var d = Math.pow;function l(e, t, n) {if (0 === e.length) throw Error("empty string");if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return m;if ("number" == typeof t ? (n = t, t = !1) : t = !!t, (n = n || 10) < 2 || 36 < n) throw RangeError("radix");var o;if ((o = e.indexOf("-")) > 0) throw Error("interior hyphen");if (0 === o) return l(e.substring(1), t, n).neg();for (var r = u(d(n, 8)), i = m, s = 0; s < e.length; s += 8) {var a = Math.min(8, e.length - s),c = parseInt(e.substring(s, s + a), n);if (a < 8) {var p = u(d(n, a));i = i.mul(p).add(u(c));} else i = (i = i.mul(r)).add(u(c));}return i.unsigned = t, i;}function p(e, t) {return "number" == typeof e ? u(e, t) : "string" == typeof e ? l(e, t) : c(e.low, e.high, "boolean" == typeof t ? t : e.unsigned);}o.fromString = l, o.fromValue = p;var f = 4294967296,h = f * f,g = h / 2,y = a(1 << 24),m = a(0);o.ZERO = m;var v = a(0, !0);o.UZERO = v;var _ = a(1);o.ONE = _;var E = a(1, !0);o.UONE = E;var N = a(-1);o.NEG_ONE = N;var b = c(-1, 2147483647, !1);o.MAX_VALUE = b;var A = c(-1, -1, !0);o.MAX_UNSIGNED_VALUE = A;var O = c(0, -2147483648, !1);o.MIN_VALUE = O;var w = o.prototype;w.toInt = function () {return this.unsigned ? this.low >>> 0 : this.low;}, w.toNumber = function () {return this.unsigned ? (this.high >>> 0) * f + (this.low >>> 0) : this.high * f + (this.low >>> 0);}, w.toString = function (e) {if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix");if (this.isZero()) return "0";if (this.isNegative()) {if (this.eq(O)) {var t = u(e),n = this.div(t),o = n.mul(t).sub(this);return n.toString(e) + o.toInt().toString(e);}return "-" + this.neg().toString(e);}for (var r = u(d(e, 6), this.unsigned), i = this, s = "";;) {var a = i.div(r),c = (i.sub(a.mul(r)).toInt() >>> 0).toString(e);if ((i = a).isZero()) return c + s;for (; c.length < 6;) {c = "0" + c;}s = "" + c + s;}}, w.getHighBits = function () {return this.high;}, w.getHighBitsUnsigned = function () {return this.high >>> 0;}, w.getLowBits = function () {return this.low;}, w.getLowBitsUnsigned = function () {return this.low >>> 0;}, w.getNumBitsAbs = function () {if (this.isNegative()) return this.eq(O) ? 64 : this.neg().getNumBitsAbs();for (var e = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (e & 1 << t); t--) {;}return 0 != this.high ? t + 33 : t + 1;}, w.isZero = function () {return 0 === this.high && 0 === this.low;}, w.eqz = w.isZero, w.isNegative = function () {return !this.unsigned && this.high < 0;}, w.isPositive = function () {return this.unsigned || this.high >= 0;}, w.isOdd = function () {return 1 == (1 & this.low);}, w.isEven = function () {return 0 == (1 & this.low);}, w.equals = function (e) {return r(e) || (e = p(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && this.high === e.high && this.low === e.low;}, w.eq = w.equals, w.notEquals = function (e) {return !this.eq(e);}, w.neq = w.notEquals, w.ne = w.notEquals, w.lessThan = function (e) {return this.comp(e) < 0;}, w.lt = w.lessThan, w.lessThanOrEqual = function (e) {return this.comp(e) <= 0;}, w.lte = w.lessThanOrEqual, w.le = w.lessThanOrEqual, w.greaterThan = function (e) {return this.comp(e) > 0;}, w.gt = w.greaterThan, w.greaterThanOrEqual = function (e) {return this.comp(e) >= 0;}, w.gte = w.greaterThanOrEqual, w.ge = w.greaterThanOrEqual, w.compare = function (e) {if (r(e) || (e = p(e)), this.eq(e)) return 0;var t = this.isNegative(),n = e.isNegative();return t && !n ? -1 : !t && n ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1;}, w.comp = w.compare, w.negate = function () {return !this.unsigned && this.eq(O) ? O : this.not().add(_);}, w.neg = w.negate, w.add = function (e) {r(e) || (e = p(e));var t = this.high >>> 16,n = 65535 & this.high,o = this.low >>> 16,i = 65535 & this.low,s = e.high >>> 16,a = 65535 & e.high,u = e.low >>> 16,d = 0,l = 0,f = 0,h = 0;return f += (h += i + (65535 & e.low)) >>> 16, l += (f += o + u) >>> 16, d += (l += n + a) >>> 16, d += t + s, c((f &= 65535) << 16 | (h &= 65535), (d &= 65535) << 16 | (l &= 65535), this.unsigned);}, w.subtract = function (e) {return r(e) || (e = p(e)), this.add(e.neg());}, w.sub = w.subtract, w.multiply = function (e) {if (this.isZero()) return m;if (r(e) || (e = p(e)), n) return c(n.mul(this.low, this.high, e.low, e.high), n.get_high(), this.unsigned);if (e.isZero()) return m;if (this.eq(O)) return e.isOdd() ? O : m;if (e.eq(O)) return this.isOdd() ? O : m;if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();if (e.isNegative()) return this.mul(e.neg()).neg();if (this.lt(y) && e.lt(y)) return u(this.toNumber() * e.toNumber(), this.unsigned);var t = this.high >>> 16,o = 65535 & this.high,i = this.low >>> 16,s = 65535 & this.low,a = e.high >>> 16,d = 65535 & e.high,l = e.low >>> 16,f = 65535 & e.low,h = 0,g = 0,v = 0,_ = 0;return v += (_ += s * f) >>> 16, g += (v += i * f) >>> 16, v &= 65535, g += (v += s * l) >>> 16, h += (g += o * f) >>> 16, g &= 65535, h += (g += i * l) >>> 16, g &= 65535, h += (g += s * d) >>> 16, h += t * f + o * l + i * d + s * a, c((v &= 65535) << 16 | (_ &= 65535), (h &= 65535) << 16 | (g &= 65535), this.unsigned);}, w.mul = w.multiply, w.divide = function (e) {if (r(e) || (e = p(e)), e.isZero()) throw Error("division by zero");var t, o, i;if (n) return this.unsigned || -2147483648 !== this.high || -1 !== e.low || -1 !== e.high ? c((this.unsigned ? n.div_u : n.div_s)(this.low, this.high, e.low, e.high), n.get_high(), this.unsigned) : this;if (this.isZero()) return this.unsigned ? v : m;if (this.unsigned) {if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return v;if (e.gt(this.shru(1))) return E;i = v;} else {if (this.eq(O)) return e.eq(_) || e.eq(N) ? O : e.eq(O) ? _ : (t = this.shr(1).div(e).shl(1)).eq(m) ? e.isNegative() ? _ : N : (o = this.sub(e.mul(t)), i = t.add(o.div(e)));if (e.eq(O)) return this.unsigned ? v : m;if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();if (e.isNegative()) return this.div(e.neg()).neg();i = m;}for (o = this; o.gte(e);) {t = Math.max(1, Math.floor(o.toNumber() / e.toNumber()));for (var s = Math.ceil(Math.log(t) / Math.LN2), a = s <= 48 ? 1 : d(2, s - 48), l = u(t), f = l.mul(e); f.isNegative() || f.gt(o);) {f = (l = u(t -= a, this.unsigned)).mul(e);}l.isZero() && (l = _), i = i.add(l), o = o.sub(f);}return i;}, w.div = w.divide, w.modulo = function (e) {return r(e) || (e = p(e)), n ? c((this.unsigned ? n.rem_u : n.rem_s)(this.low, this.high, e.low, e.high), n.get_high(), this.unsigned) : this.sub(this.div(e).mul(e));}, w.mod = w.modulo, w.rem = w.modulo, w.not = function () {return c(~this.low, ~this.high, this.unsigned);}, w.and = function (e) {return r(e) || (e = p(e)), c(this.low & e.low, this.high & e.high, this.unsigned);}, w.or = function (e) {return r(e) || (e = p(e)), c(this.low | e.low, this.high | e.high, this.unsigned);}, w.xor = function (e) {return r(e) || (e = p(e)), c(this.low ^ e.low, this.high ^ e.high, this.unsigned);}, w.shiftLeft = function (e) {return r(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? c(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : c(0, this.low << e - 32, this.unsigned);}, w.shl = w.shiftLeft, w.shiftRight = function (e) {return r(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? c(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : c(this.high >> e - 32, this.high >= 0 ? 0 : -1, this.unsigned);}, w.shr = w.shiftRight, w.shiftRightUnsigned = function (e) {if (r(e) && (e = e.toInt()), 0 === (e &= 63)) return this;var t = this.high;return e < 32 ? c(this.low >>> e | t << 32 - e, t >>> e, this.unsigned) : c(32 === e ? t : t >>> e - 32, 0, this.unsigned);}, w.shru = w.shiftRightUnsigned, w.shr_u = w.shiftRightUnsigned, w.toSigned = function () {return this.unsigned ? c(this.low, this.high, !1) : this;}, w.toUnsigned = function () {return this.unsigned ? this : c(this.low, this.high, !0);}, w.toBytes = function (e) {return e ? this.toBytesLE() : this.toBytesBE();}, w.toBytesLE = function () {var e = this.high,t = this.low;return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24];}, w.toBytesBE = function () {var e = this.high,t = this.low;return [e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t];}, o.fromBytes = function (e, t, n) {return n ? o.fromBytesLE(e, t) : o.fromBytesBE(e, t);}, o.fromBytesLE = function (e, t) {return new o(e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24, e[4] | e[5] << 8 | e[6] << 16 | e[7] << 24, t);}, o.fromBytesBE = function (e, t) {return new o(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7], e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3], t);};}, function (e, t, n) {e.exports = i;var o = n(7);((i.prototype = Object.create(o.prototype)).constructor = i).className = "Enum";var r = n(9);function i(e, t, n, r, i) {if (o.call(this, e, n), t && "object" != typeof t) throw TypeError("values must be an object");if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = r, this.comments = i || {}, this.reserved = void 0, t) for (var s = Object.keys(t), a = 0; a < s.length; ++a) {"number" == typeof t[s[a]] && (this.valuesById[this.values[s[a]] = t[s[a]]] = s[a]);}}i.fromJSON = function (e, t) {var n = new i(e, t.values, t.options, t.comment, t.comments);return n.reserved = t.reserved, n;}, i.prototype.toJSON = function (e) {var t = !!e && Boolean(e.keepComments);return util.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", t ? this.comment : void 0, "comments", t ? this.comments : void 0]);}, i.prototype.add = function (e, t, n) {if (!util.isString(e)) throw TypeError("name must be a string");if (!util.isInteger(t)) throw TypeError("id must be an integer");if (void 0 !== this.values[e]) throw Error("duplicate name '" + e + "' in " + this);if (this.isReservedId(t)) throw Error("id " + t + " is reserved in " + this);if (this.isReservedName(e)) throw Error("name '" + e + "' is reserved in " + this);if (void 0 !== this.valuesById[t]) {if (!this.options || !this.options.allow_alias) throw Error("duplicate id " + t + " in " + this);this.values[e] = t;} else this.valuesById[this.values[e] = t] = e;return this.comments[e] = n || null, this;}, i.prototype.remove = function (e) {if (!util.isString(e)) throw TypeError("name must be a string");var t = this.values[e];if (null == t) throw Error("name '" + e + "' does not exist in " + this);return delete this.valuesById[t], delete this.values[e], delete this.comments[e], this;}, i.prototype.isReservedId = function (e) {return r.isReservedId(this.reserved, e);}, i.prototype.isReservedName = function (e) {return r.isReservedName(this.reserved, e);};}, function (e, t, n) {e.exports = c;var o,r,i,s,a = n(7);((c.prototype = Object.create(a.prototype)).constructor = c).className = "Field";var u = /^required|optional|repeated$/;function c(e, t, n, o, s, c, d) {if (i.isObject(o) ? (d = s, c = o, o = s = void 0) : i.isObject(s) && (d = c, c = s, s = void 0), a.call(this, e, c), !i.isInteger(t) || t < 0) throw TypeError("id must be a non-negative integer");if (!i.isString(n)) throw TypeError("type must be a string");if (void 0 !== o && !u.test(o = o.toString().toLowerCase())) throw TypeError("rule must be a string rule");if (void 0 !== s && !i.isString(s)) throw TypeError("extend must be a string");this.rule = o && "optional" !== o ? o : void 0, this.type = n, this.id = t, this.extend = s || void 0, this.required = "required" === o, this.optional = !this.required, this.repeated = "repeated" === o, this.map = !1, this.message = null, this.partOf = null, this.typeDefault = null, this.defaultValue = null, this.long = !!i.Long && void 0 !== r.long[n], this.bytes = "bytes" === n, this.resolvedType = null, this.extensionField = null, this.declaringField = null, this._packed = null, this.comment = d;}c.fromJSON = function (e, t) {return new c(e, t.id, t.type, t.rule, t.extend, t.options, t.comment);}, Object.defineProperty(c.prototype, "packed", { get: function get() {return null === this._packed && (this._packed = !1 !== this.getOption("packed")), this._packed;} }), c.prototype.setOption = function (e, t, n) {return "packed" === e && (this._packed = null), a.prototype.setOption.call(this, e, t, n);}, c.prototype.toJSON = function (e) {var t = !!e && Boolean(e.keepComments);return i.toObject(["rule", "optional" !== this.rule && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : void 0]);}, c.prototype.resolve = function () {if (this.resolved) return this;if (void 0 === (this.typeDefault = r.defaults[this.type]) && (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof s ? this.typeDefault = null : this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]), this.options && null != this.options.default && (this.typeDefault = this.options.default, this.resolvedType instanceof o && "string" == typeof this.typeDefault && (this.typeDefault = this.resolvedType.values[this.typeDefault])), this.options && (!0 !== this.options.packed && (void 0 === this.options.packed || !this.resolvedType || this.resolvedType instanceof o) || delete this.options.packed, Object.keys(this.options).length || (this.options = void 0)), this.long) this.typeDefault = i.Long.fromNumber(this.typeDefault, "u" === this.type.charAt(0)), Object.freeze && Object.freeze(this.typeDefault);else if (this.bytes && "string" == typeof this.typeDefault) {var e;i.utf8.write(this.typeDefault, e = i.newBuffer(i.utf8.length(this.typeDefault)), 0), this.typeDefault = e;}return this.map ? this.defaultValue = i.emptyObject : this.repeated ? this.defaultValue = i.emptyArray : this.defaultValue = this.typeDefault, this.parent instanceof s && (this.parent.ctor.prototype[this.name] = this.defaultValue), a.prototype.resolve.call(this);}, c.d = function (e, t, n, o) {return "function" == typeof t ? t = i.decorateType(t).name : t && "object" == typeof t && (t = i.decorateEnum(t).name), function (r, s) {i.decorateType(r.constructor).add(new c(s, e, t, n, { default: o }));};}, c._configure = function () {s = n(6), o = n(4), r = n(8), i = n(1);};}, function (e, t, n) {e.exports = v;var o,r,i,s,a,u,c,d,l,p,f,h,g,y,m = n(9);function v(e, t) {m.call(this, e, t), this.fields = {}, this.oneofs = void 0, this.extensions = void 0, this.reserved = void 0, this.group = void 0, this._fieldsById = null, this._fieldsArray = null, this._oneofsArray = null, this._ctor = null;}function _(e) {return e._fieldsById = e._fieldsArray = e._oneofsArray = null, delete e.encode, delete e.decode, delete e.verify, e;}((v.prototype = Object.create(m.prototype)).constructor = v).className = "Type", Object.defineProperties(v.prototype, { fieldsById: { get: function get() {if (this._fieldsById) return this._fieldsById;this._fieldsById = {};for (var e = Object.keys(this.fields), t = 0; t < e.length; ++t) {var n = this.fields[e[t]],o = n.id;if (this._fieldsById[o]) throw Error("duplicate id " + o + " in " + this);this._fieldsById[o] = n;}return this._fieldsById;} }, fieldsArray: { get: function get() {return this._fieldsArray || (this._fieldsArray = c.toArray(this.fields));} }, oneofsArray: { get: function get() {return this._oneofsArray || (this._oneofsArray = c.toArray(this.oneofs));} }, ctor: { get: function get() {return this._ctor || (this.ctor = v.generateConstructor(this));}, set: function set(e) {var t = e.prototype;t instanceof i || ((e.prototype = new i()).constructor = e, c.merge(e.prototype, t)), e.$type = e.prototype.$type = this, c.merge(e, i, !0), c.merge(e.prototype, i, !0), this._ctor = e;for (var n = 0; n < this.fieldsArray.length; ++n) {this._fieldsArray[n].resolve();}var o = {};for (n = 0; n < this.oneofsArray.length; ++n) {var r = this._oneofsArray[n].resolve().name,s = function (e) {for (var t = {}, n = 0; n < e.length; ++n) {t[e[n]] = 0;}return { setter: function setter(n) {if (!(e.indexOf(n) < 0)) {t[n] = 1;for (var o = 0; o < e.length; ++o) {e[o] !== n && delete this[e[o]];}}}, getter: function getter() {for (var e = Object.keys(this), n = e.length - 1; n > -1; --n) {if (1 === t[e[n]] && void 0 !== this[e[n]] && null !== this[e[n]]) return e[n];}} };}(this._oneofsArray[n].oneof);o[r] = { get: s.getter, set: s.setter };}n && Object.defineProperties(e.prototype, o);} } }), v.generateConstructor = function (e) {return function (t) {for (var n, o = 0; o < e.fieldsArray.length; o++) {(n = e._fieldsArray[o]).map ? this[n.name] = {} : n.repeated && (this[n.name] = []);}if (t) for (var r = Object.keys(t), i = 0; i < r.length; ++i) {null != t[r[i]] && (this[r[i]] = t[r[i]]);}};}, v.fromJSON = function (e, t) {var n = new v(e, t.options);n.extensions = t.extensions, n.reserved = t.reserved;for (var i = Object.keys(t.fields), a = 0; a < i.length; ++a) {n.add((void 0 !== t.fields[i[a]].keyType ? y.fromJSON : r.fromJSON)(i[a], t.fields[i[a]]));}if (t.oneofs) for (i = Object.keys(t.oneofs), a = 0; a < i.length; ++a) {n.add(s.fromJSON(i[a], t.oneofs[i[a]]));}if (t.nested) for (i = Object.keys(t.nested), a = 0; a < i.length; ++a) {var u = t.nested[i[a]];n.add((void 0 !== u.id ? r.fromJSON : void 0 !== u.fields ? v.fromJSON : void 0 !== u.values ? o.fromJSON : void 0 !== u.methods ? f.fromJSON : m.fromJSON)(i[a], u));}return t.extensions && t.extensions.length && (n.extensions = t.extensions), t.reserved && t.reserved.length && (n.reserved = t.reserved), t.group && (n.group = !0), t.comment && (n.comment = t.comment), n;}, v.prototype.toJSON = function (e) {var t = m.prototype.toJSON.call(this, e),n = !!e && Boolean(e.keepComments);return { options: t && t.options || void 0, oneofs: m.arrayToJSON(this.oneofsArray, e), fields: m.arrayToJSON(this.fieldsArray.filter(function (e) {return !e.declaringField;}), e) || {}, extensions: this.extensions && this.extensions.length ? this.extensions : void 0, reserved: this.reserved && this.reserved.length ? this.reserved : void 0, group: this.group || void 0, nested: t && t.nested || void 0, comment: n ? this.comment : void 0 };}, v.prototype.resolveAll = function () {for (var e = this.fieldsArray, t = 0; t < e.length;) {e[t++].resolve();}var n = this.oneofsArray;for (t = 0; t < n.length;) {n[t++].resolve();}return m.prototype.resolveAll.call(this);}, v.prototype.get = function (e) {return this.fields[e] || this.oneofs && this.oneofs[e] || this.nested && this.nested[e] || null;}, v.prototype.add = function (e) {if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this);if (e instanceof r && void 0 === e.extend) {if (this._fieldsById && this._fieldsById[e.id]) throw Error("duplicate id " + e.id + " in " + this);if (this.isReservedId(e.id)) throw Error("id " + e.id + " is reserved in " + this);if (this.isReservedName(e.name)) throw Error("name '" + e.name + "' is reserved in " + this);return e.parent && e.parent.remove(e), this.fields[e.name] = e, e.message = this, e.onAdd(this), _(this);}return e instanceof s ? (this.oneofs || (this.oneofs = {}), this.oneofs[e.name] = e, e.onAdd(this), _(this)) : m.prototype.add.call(this, e);}, v.prototype.remove = function (e) {if (e instanceof r && void 0 === e.extend) {if (!this.fields || this.fields[e.name] !== e) throw Error(e + " is not a member of " + this);return delete this.fields[e.name], e.parent = null, e.onRemove(this), _(this);}if (e instanceof s) {if (!this.oneofs || this.oneofs[e.name] !== e) throw Error(e + " is not a member of " + this);return delete this.oneofs[e.name], e.parent = null, e.onRemove(this), _(this);}return m.prototype.remove.call(this, e);}, v.prototype.isReservedId = function (e) {return m.isReservedId(this.reserved, e);}, v.prototype.isReservedName = function (e) {return m.isReservedName(this.reserved, e);}, v.prototype.create = function (e) {return new this.ctor(e);}, v.prototype.setup = function () {for (var e = this.fullName, t = [], n = 0; n < this.fieldsArray.length; ++n) {t.push(this._fieldsArray[n].resolve().resolvedType);}this.encode = l(this)({ Writer: a, types: t, util: c }), this.decode = p(this)({ Reader: u, types: t, util: c }), this.verify = d(this)({ types: t, util: c }), this.fromObject = g.fromObject(this)({ types: t, util: c }), this.toObject = g.toObject(this)({ types: t, util: c });var o = h[e];if (o) {var r = Object.create(this);r.fromObject = this.fromObject, this.fromObject = o.fromObject.bind(r), r.toObject = this.toObject, this.toObject = o.toObject.bind(r);}return this;}, v.prototype.encode = function (e, t) {return this.setup().encode(e, t);}, v.prototype.encodeDelimited = function (e, t) {return this.encode(e, t && t.len ? t.fork() : t).ldelim();}, v.prototype.decode = function (e, t) {return this.setup().decode(e, t);}, v.prototype.decodeDelimited = function (e) {return e instanceof u || (e = u.create(e)), this.decode(e, e.uint32());}, v.prototype.verify = function (e) {return this.setup().verify(e);}, v.prototype.fromObject = function (e) {return this.setup().fromObject(e);}, v.prototype.toObject = function (e, t) {return this.setup().toObject(e, t);}, v.d = function (e) {return function (t) {c.decorateType(t, e);};}, v._configure = function () {o = n(4), r = n(5), i = n(18), s = n(10), a = n(19), u = n(26), c = n(1), d = n(27), l = n(28), p = n(29), f = n(13), h = n(30), g = n(31), y = n(16);};}, function (e, t, n) {"use strict";var o, r;function i(e, t) {if (!o.isString(e)) throw TypeError("name must be a string");if (t && !o.isObject(t)) throw TypeError("options must be an object");this.options = t, this.name = e, this.parent = null, this.resolved = !1, this.comment = null, this.filename = null;}e.exports = i, i.className = "ReflectionObject", Object.defineProperties(i.prototype, { root: { get: function get() {for (var e = this; null !== e.parent;) {e = e.parent;}return e;} }, fullName: { get: function get() {for (var e = [this.name], t = this.parent; t;) {e.unshift(t.name), t = t.parent;}return e.join(".");} } }), i.prototype.toJSON = function () {throw Error();}, i.prototype.onAdd = function (e) {this.parent && this.parent !== e && this.parent.remove(this), this.parent = e, this.resolved = !1;var t = e.root;t instanceof r && t._handleAdd(this);}, i.prototype.onRemove = function (e) {var t = e.root;t instanceof r && t._handleRemove(this), this.parent = null, this.resolved = !1;}, i.prototype.resolve = function () {return this.resolved || this.root instanceof r && (this.resolved = !0), this;}, i.prototype.getOption = function (e) {if (this.options) return this.options[e];}, i.prototype.setOption = function (e, t, n) {return n && this.options && void 0 !== this.options[e] || ((this.options || (this.options = {}))[e] = t), this;}, i.prototype.setOptions = function (e, t) {if (e) for (var n = Object.keys(e), o = 0; o < n.length; ++o) {this.setOption(n[o], e[n[o]], t);}return this;}, i.prototype.toString = function () {var e = this.constructor.className,t = this.fullName;return t.length ? e + " " + t : e;}, i._configure = function (e) {r = n(12), o = n(1);};}, function (e, t, n) {"use strict";var o = e.exports,r = n(1),i = ["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes"];function s(e, t) {var n = 0,o = {};for (t |= 0; n < e.length;) {o[i[n + t]] = e[n++];}return o;}o.basic = s([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]), o.defaults = s([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, "", r.emptyArray, null]), o.long = s([0, 0, 0, 1, 1], 7), o.mapKey = s([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2), o.packed = s([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0]), o._configure = function () {r = n(1);};}, function (e, t, n) {e.exports = d;var o,r,i,s,a,u = n(7);function c(e, t) {if (e && e.length) {for (var n = {}, o = 0; o < e.length; ++o) {n[e[o].name] = e[o].toJSON(t);}return n;}}function d(e, t) {u.call(this, e, t), this.nested = void 0, this._nestedArray = null;}function l(e) {return e._nestedArray = null, e;}((d.prototype = Object.create(u.prototype)).constructor = d).className = "Namespace", d.fromJSON = function (e, t) {return new d(e, t.options).addJSON(t.nested);}, d.arrayToJSON = c, d.isReservedId = function (e, t) {if (e) for (var n = 0; n < e.length; ++n) {if ("string" != typeof e[n] && e[n][0] <= t && e[n][1] >= t) return !0;}return !1;}, d.isReservedName = function (e, t) {if (e) for (var n = 0; n < e.length; ++n) {if (e[n] === t) return !0;}return !1;}, Object.defineProperty(d.prototype, "nestedArray", { get: function get() {return this._nestedArray || (this._nestedArray = i.toArray(this.nested));} }), d.prototype.toJSON = function (e) {return i.toObject(["options", this.options, "nested", c(this.nestedArray, e)]);}, d.prototype.addJSON = function (e) {if (e) for (var t, n = Object.keys(e), i = 0; i < n.length; ++i) {t = e[n[i]], this.add((void 0 !== t.fields ? s.fromJSON : void 0 !== t.values ? o.fromJSON : void 0 !== t.methods ? a.fromJSON : void 0 !== t.id ? r.fromJSON : d.fromJSON)(n[i], t));}return this;}, d.prototype.get = function (e) {return this.nested && this.nested[e] || null;}, d.prototype.getEnum = function (e) {if (this.nested && this.nested[e] instanceof o) return this.nested[e].values;throw Error("no such enum: " + e);}, d.prototype.add = function (e) {if (!(e instanceof r && void 0 !== e.extend || e instanceof s || e instanceof o || e instanceof a || e instanceof d)) throw TypeError("object must be a valid nested object");if (this.nested) {var t = this.get(e.name);if (t) {if (!(t instanceof d && e instanceof d) || t instanceof s || t instanceof a) throw Error("duplicate name '" + e.name + "' in " + this);for (var n = t.nestedArray, i = 0; i < n.length; ++i) {e.add(n[i]);}this.remove(t), this.nested || (this.nested = {}), e.setOptions(t.options, !0);}} else this.nested = {};return this.nested[e.name] = e, e.onAdd(this), l(this);}, d.prototype.remove = function (e) {if (!(e instanceof u)) throw TypeError("object must be a ReflectionObject");if (e.parent !== this) throw Error(e + " is not a member of " + this);return delete this.nested[e.name], Object.keys(this.nested).length || (this.nested = void 0), e.onRemove(this), l(this);}, d.prototype.define = function (e, t) {if (i.isString(e)) e = e.split(".");else if (!Array.isArray(e)) throw TypeError("illegal path");if (e && e.length && "" === e[0]) throw Error("path must be relative");for (var n = this; e.length > 0;) {var o = e.shift();if (n.nested && n.nested[o]) {if (!((n = n.nested[o]) instanceof d)) throw Error("path conflicts with non-namespace objects");} else n.add(n = new d(o));}return t && n.addJSON(t), n;}, d.prototype.resolveAll = function () {for (var e = this.nestedArray, t = 0; t < e.length;) {e[t] instanceof d ? e[t++].resolveAll() : e[t++].resolve();}return this.resolve();}, d.prototype.lookup = function (e, t, n) {if ("boolean" == typeof t ? (n = t, t = void 0) : t && !Array.isArray(t) && (t = [t]), i.isString(e) && e.length) {if ("." === e) return this.root;e = e.split(".");} else if (!e.length) return this;if ("" === e[0]) return this.root.lookup(e.slice(1), t);var o = this.get(e[0]);if (o) {if (1 === e.length) {if (!t || t.indexOf(o.constructor) > -1) return o;} else if (o instanceof d && (o = o.lookup(e.slice(1), t, !0))) return o;} else for (var r = 0; r < this.nestedArray.length; ++r) {if (this._nestedArray[r] instanceof d && (o = this._nestedArray[r].lookup(e, t, !0))) return o;}return null === this.parent || n ? null : this.parent.lookup(e, t);}, d.prototype.lookupType = function (e) {var t = this.lookup(e, [s]);if (!t) throw Error("no such type: " + e);return t;}, d.prototype.lookupEnum = function (e) {var t = this.lookup(e, [o]);if (!t) throw Error("no such Enum '" + e + "' in " + this);return t;}, d.prototype.lookupTypeOrEnum = function (e) {var t = this.lookup(e, [s, o]);if (!t) throw Error("no such Type or Enum '" + e + "' in " + this);return t;}, d.prototype.lookupService = function (e) {var t = this.lookup(e, [a]);if (!t) throw Error("no such Service '" + e + "' in " + this);return t;}, d._configure = function () {o = n(4), r = n(5), i = n(1), s = n(6), a = n(13);};}, function (e, t, n) {e.exports = s;var o,r,i = n(7);function s(e, t, n, o) {if (Array.isArray(t) || (n = t, t = void 0), i.call(this, e, n), void 0 !== t && !Array.isArray(t)) throw TypeError("fieldNames must be an Array");this.oneof = t || [], this.fieldsArray = [], this.comment = o;}function a(e) {if (e.parent) for (var t = 0; t < e.fieldsArray.length; ++t) {e.fieldsArray[t].parent || e.parent.add(e.fieldsArray[t]);}}((s.prototype = Object.create(i.prototype)).constructor = s).className = "OneOf", s.fromJSON = function (e, t) {return new s(e, t.oneof, t.options, t.comment);}, s.prototype.toJSON = function (e) {var t = !!e && Boolean(e.keepComments);return r.toObject(["options", this.options, "oneof", this.oneof, "comment", t ? this.comment : void 0]);}, s.prototype.add = function (e) {if (!(e instanceof o)) throw TypeError("field must be a Field");return e.parent && e.parent !== this.parent && e.parent.remove(e), this.oneof.push(e.name), this.fieldsArray.push(e), e.partOf = this, a(this), this;}, s.prototype.remove = function (e) {if (!(e instanceof o)) throw TypeError("field must be a Field");var t = this.fieldsArray.indexOf(e);if (t < 0) throw Error(e + " is not a member of " + this);return this.fieldsArray.splice(t, 1), (t = this.oneof.indexOf(e.name)) > -1 && this.oneof.splice(t, 1), e.partOf = null, this;}, s.prototype.onAdd = function (e) {i.prototype.onAdd.call(this, e);for (var t = 0; t < this.oneof.length; ++t) {var n = e.get(this.oneof[t]);n && !n.partOf && (n.partOf = this, this.fieldsArray.push(n));}a(this);}, s.prototype.onRemove = function (e) {for (var t, n = 0; n < this.fieldsArray.length; ++n) {(t = this.fieldsArray[n]).parent && t.parent.remove(t);}i.prototype.onRemove.call(this, e);}, s.d = function () {for (var e = new Array(arguments.length), t = 0; t < arguments.length;) {e[t] = arguments[t++];}return function (t, n) {r.decorateType(t.constructor).add(new s(n, e)), Object.defineProperty(t, n, { get: r.oneOfGetter(e), set: r.oneOfSetter(e) });};}, s._configure = function () {o = n(5), r = n(1);};}, function (e, t, n) {"use strict";var o = e.exports;o.length = function (e) {for (var t = 0, n = 0, o = 0; o < e.length; ++o) {(n = e.charCodeAt(o)) < 128 ? t += 1 : n < 2048 ? t += 2 : 55296 == (64512 & n) && 56320 == (64512 & e.charCodeAt(o + 1)) ? (++o, t += 4) : t += 3;}return t;}, o.read = function (e, t, n) {if (n - t < 1) return "";for (var o, r = null, i = [], s = 0; t < n;) {(o = e[t++]) < 128 ? i[s++] = o : o > 191 && o < 224 ? i[s++] = (31 & o) << 6 | 63 & e[t++] : o > 239 && o < 365 ? (o = ((7 & o) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536, i[s++] = 55296 + (o >> 10), i[s++] = 56320 + (1023 & o)) : i[s++] = (15 & o) << 12 | (63 & e[t++]) << 6 | 63 & e[t++], s > 8191 && ((r || (r = [])).push(String.fromCharCode.apply(String, i)), s = 0);}return r ? (s && r.push(String.fromCharCode.apply(String, i.slice(0, s))), r.join("")) : String.fromCharCode.apply(String, i.slice(0, s));}, o.write = function (e, t, n) {for (var o, r, i = n, s = 0; s < e.length; ++s) {(o = e.charCodeAt(s)) < 128 ? t[n++] = o : o < 2048 ? (t[n++] = o >> 6 | 192, t[n++] = 63 & o | 128) : 55296 == (64512 & o) && 56320 == (64512 & (r = e.charCodeAt(s + 1))) ? (o = 65536 + ((1023 & o) << 10) + (1023 & r), ++s, t[n++] = o >> 18 | 240, t[n++] = o >> 12 & 63 | 128, t[n++] = o >> 6 & 63 | 128, t[n++] = 63 & o | 128) : (t[n++] = o >> 12 | 224, t[n++] = o >> 6 & 63 | 128, t[n++] = 63 & o | 128);}return n - i;};}, function (e, t, n) {e.exports = l;var o = n(9);((l.prototype = Object.create(o.prototype)).constructor = l).className = "Root";var r,i,s,a = n(5),u = n(4),c = n(10),d = n(1);function l(e) {o.call(this, "", e), this.deferred = [], this.files = [], this.names = [];}function p() {}l.fromJSON = function (e, t) {return e = "string" == typeof e ? JSON.parse(e) : e, t || (t = new l()), e.options && t.setOptions(e.options), t.addJSON(e.nested);}, l.prototype.resolvePath = d.path.resolve, l.prototype.parseFromPbString = function e(t, n, o) {"function" == typeof n && (o = n, n = void 0);var r = this;if (!o) return d.asPromise(e, r, t, n);var a = null;if ("string" == typeof t) a = JSON.parse(t);else {if ("object" != typeof t) return void console.log("pb格式转化失败");a = t;}function u(e, t) {if (o) {var n = o;o = null, n(e, t);}}function c(e, t) {try {if (d.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t)), d.isString(t)) {i.filename = e;var o,s = i(t, r, n),a = 0;if (s.imports) for (; a < s.imports.length; ++a) {l(o = s.imports[a]);}if (s.weakImports) {for (a = 0; a < s.weakImports.length; ++a) {o = s.weakImports[a];}l(o);}} else r.setOptions(t.options).addJSON(t.nested);} catch (e) {u(e);}u(null, r);}function l(e) {r.names.indexOf(e) > -1 || (r.names.push(e), e in s && c(e, s[e]));}c(a.name, a.pbJsonStr);}, l.prototype.load = function e(t, n, o) {"function" == typeof n && (o = n, n = void 0);var r = this;if (!o) return d.asPromise(e, r, t, n);var a = o === p;function u(e, t) {if (o) {var n = o;if (o = null, a) throw e;n(e, t);}}function c(e, t) {try {if (d.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t)), d.isString(t)) {i.filename = e;var o,s = i(t, r, n),c = 0;if (s.imports) for (; c < s.imports.length; ++c) {(o = r.resolvePath(e, s.imports[c])) && l(o);}if (s.weakImports) for (c = 0; c < s.weakImports.length; ++c) {(o = r.resolvePath(e, s.weakImports[c])) && l(o, !0);}} else r.setOptions(t.options).addJSON(t.nested);} catch (e) {u(e);}a || f || u(null, r);}function l(e, t) {var n = e.lastIndexOf("google/protobuf/");if (n > -1) {var i = e.substring(n);i in s && (e = i);}if (!(r.files.indexOf(e) > -1)) if (r.files.push(e), e in s) a ? c(e, s[e]) : (++f, setTimeout(function () {--f, c(e, s[e]);}));else if (a) {var l;try {l = d.fs.readFileSync(e).toString("utf8");} catch (e) {return void (t || u(e));}c(e, l);} else ++f, d.fetch(e, function (n, i) {--f, o && (n ? t ? f || u(null, r) : u(n) : c(e, i));});}var f = 0;d.isString(t) && (t = [t]);for (var h, g = 0; g < t.length; ++g) {(h = r.resolvePath("", t[g])) && l(h);}if (a) return r;f || u(null, r);}, l.prototype.loadSync = function (e, t) {if (!d.isNode) throw Error("not supported");return this.load(e, t, p);}, l.prototype.resolveAll = function () {if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function (e) {return "'extend " + e.extend + "' in " + e.parent.fullName;}).join(", "));return o.prototype.resolveAll.call(this);};var f = /^[A-Z]/;function h(e, t) {var n = t.parent.lookup(t.extend);if (n) {var o = new a(t.fullName, t.id, t.type, t.rule, void 0, t.options);return o.declaringField = t, t.extensionField = o, n.add(o), !0;}return !1;}l.prototype._handleAdd = function (e) {if (e instanceof a) void 0 === e.extend || e.extensionField || h(0, e) || this.deferred.push(e);else if (e instanceof u) f.test(e.name) && (e.parent[e.name] = e.values);else if (!(e instanceof c)) {if (e instanceof r) for (var t = 0; t < this.deferred.length;) {h(0, this.deferred[t]) ? this.deferred.splice(t, 1) : ++t;}for (var n = 0; n < e.nestedArray.length; ++n) {this._handleAdd(e._nestedArray[n]);}f.test(e.name) && (e.parent[e.name] = e);}}, l.prototype._handleRemove = function (e) {if (e instanceof a) {if (void 0 !== e.extend) if (e.extensionField) e.extensionField.parent.remove(e.extensionField), e.extensionField = null;else {var t = this.deferred.indexOf(e);t > -1 && this.deferred.splice(t, 1);}} else if (e instanceof u) f.test(e.name) && delete e.parent[e.name];else if (e instanceof o) {for (var n = 0; n < e.nestedArray.length; ++n) {this._handleRemove(e._nestedArray[n]);}f.test(e.name) && delete e.parent[e.name];}}, l._configure = function () {r = n(6), i = n(22), s = n(25), a = n(5), u = n(4), c = n(10), d = n(1);};}, function (e, t, n) {"use strict";e.exports = a;var o,r,i,s = n(9);function a(e, t) {s.call(this, e, t), this.methods = {}, this._methodsArray = null;}function u(e) {return e._methodsArray = null, e;}((a.prototype = Object.create(s.prototype)).constructor = a).className = "Service", a.fromJSON = function (e, t) {var n = new a(e, t.options);if (t.methods) for (var r = Object.keys(t.methods), i = 0; i < r.length; ++i) {n.add(o.fromJSON(r[i], t.methods[r[i]]));}return t.nested && n.addJSON(t.nested), n.comment = t.comment, n;}, a.prototype.toJSON = function (e) {var t = s.prototype.toJSON.call(this, e),n = !!e && Boolean(e.keepComments);return r.toObject(["options", t && t.options || void 0, "methods", s.arrayToJSON(this.methodsArray, e) || {}, "nested", t && t.nested || void 0, "comment", n ? this.comment : void 0]);}, Object.defineProperty(a.prototype, "methodsArray", { get: function get() {return this._methodsArray || (this._methodsArray = r.toArray(this.methods));} }), a.prototype.get = function (e) {return this.methods[e] || s.prototype.get.call(this, e);}, a.prototype.resolveAll = function () {for (var e = this.methodsArray, t = 0; t < e.length; ++t) {e[t].resolve();}return s.prototype.resolve.call(this);}, a.prototype.add = function (e) {if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this);return e instanceof o ? (this.methods[e.name] = e, e.parent = this, u(this)) : s.prototype.add.call(this, e);}, a.prototype.remove = function (e) {if (e instanceof o) {if (this.methods[e.name] !== e) throw Error(e + " is not a member of " + this);return delete this.methods[e.name], e.parent = null, u(this);}return s.prototype.remove.call(this, e);}, a.prototype.create = function (e, t, n) {for (var o, s = new i.Service(e, t, n), a = 0; a < this.methodsArray.length; ++a) {var u = r.lcFirst((o = this._methodsArray[a]).resolve().name).replace(/[^$\w_]/g, "");s[u] = r.codegen(["r", "c"], r.isReserved(u) ? u + "_" : u)("return this.rpcCall(m,q,s,r,c)")({ m: o, q: o.resolvedRequestType.ctor, s: o.resolvedResponseType.ctor });}return s;}, a._configure = function () {o = n(17), r = n(1), i = n(24);};}, function (e, t, n) {"use strict";var o = n(38),r = n(39),i = n(40);function s(e) {if ("string" != typeof e || 1 !== e.length) throw new TypeError("arrayFormatSeparator must be single character string");}function a(e, t) {return t.encode ? t.strict ? o(e) : encodeURIComponent(e) : e;}function u(e, t) {return t.decode ? r(e) : e;}function c(e) {var t = e.indexOf("#");return -1 !== t && (e = e.slice(0, t)), e;}function d(e) {var t = (e = c(e)).indexOf("?");return -1 === t ? "" : e.slice(t + 1);}function l(e, t) {return t.parseNumbers && !Number.isNaN(Number(e)) && "string" == typeof e && "" !== e.trim() ? e = Number(e) : !t.parseBooleans || null === e || "true" !== e.toLowerCase() && "false" !== e.toLowerCase() || (e = "true" === e.toLowerCase()), e;}function p(e, t) {s((t = Object.assign({ decode: !0, sort: !0, arrayFormat: "none", arrayFormatSeparator: ",", parseNumbers: !1, parseBooleans: !1 }, t)).arrayFormatSeparator);var n = function (e) {var t;switch (e.arrayFormat) {case "index":return function (e, n, o) {t = /\[(\d*)\]$/.exec(e), e = e.replace(/\[\d*\]$/, ""), t ? (void 0 === o[e] && (o[e] = {}), o[e][t[1]] = n) : o[e] = n;};case "bracket":return function (e, n, o) {t = /(\[\])$/.exec(e), e = e.replace(/\[\]$/, ""), t ? void 0 !== o[e] ? o[e] = [].concat(o[e], n) : o[e] = [n] : o[e] = n;};case "comma":case "separator":return function (t, n, o) {var r = "string" == typeof n && n.split("").indexOf(e.arrayFormatSeparator) > -1 ? n.split(e.arrayFormatSeparator).map(function (t) {return u(t, e);}) : null === n ? n : u(n, e);o[t] = r;};default:return function (e, t, n) {void 0 !== n[e] ? n[e] = [].concat(n[e], t) : n[e] = t;};}}(t),o = Object.create(null);if ("string" != typeof e) return o;if (!(e = e.trim().replace(/^[?#&]/, ""))) return o;var _iterator = _createForOfIteratorHelper(e.split("&")),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _r2 = _step.value;var _i3 = i(t.decode ? _r2.replace(/\+/g, " ") : _r2, "="),_i4 = _slicedToArray(_i3, 2),_e4 = _i4[0],_s = _i4[1];_s = void 0 === _s ? null : ["comma", "separator"].includes(t.arrayFormat) ? _s : u(_s, t), n(u(_e4, t), _s, o);}} catch (err) {_iterator.e(err);} finally {_iterator.f();}for (var _i = 0, _Object$keys = Object.keys(o); _i < _Object$keys.length; _i++) {var _e2 = _Object$keys[_i];var _n2 = o[_e2];if ("object" == typeof _n2 && null !== _n2) for (var _i2 = 0, _Object$keys2 = Object.keys(_n2); _i2 < _Object$keys2.length; _i2++) {var _e3 = _Object$keys2[_i2];_n2[_e3] = l(_n2[_e3], t);} else o[_e2] = l(_n2, t);}return !1 === t.sort ? o : (!0 === t.sort ? Object.keys(o).sort() : Object.keys(o).sort(t.sort)).reduce(function (e, t) {var n = o[t];return Boolean(n) && "object" == typeof n && !Array.isArray(n) ? e[t] = function e(t) {return Array.isArray(t) ? t.sort() : "object" == typeof t ? e(Object.keys(t)).sort(function (e, t) {return Number(e) - Number(t);}).map(function (e) {return t[e];}) : t;}(n) : e[t] = n, e;}, Object.create(null));}t.extract = d, t.parse = p, t.stringify = function (e, t) {if (!e) return "";s((t = Object.assign({ encode: !0, strict: !0, arrayFormat: "none", arrayFormatSeparator: "," }, t)).arrayFormatSeparator);var n = function n(_n3) {return t.skipNull && null == e[_n3] || t.skipEmptyString && "" === e[_n3];},o = function (e) {switch (e.arrayFormat) {case "index":return function (t) {return function (n, o) {var r = n.length;return void 0 === o || e.skipNull && null === o || e.skipEmptyString && "" === o ? n : null === o ? [].concat(_toConsumableArray(n), [[a(t, e), "[", r, "]"].join("")]) : [].concat(_toConsumableArray(n), [[a(t, e), "[", a(r, e), "]=", a(o, e)].join("")]);};};case "bracket":return function (t) {return function (n, o) {return void 0 === o || e.skipNull && null === o || e.skipEmptyString && "" === o ? n : null === o ? [].concat(_toConsumableArray(n), [[a(t, e), "[]"].join("")]) : [].concat(_toConsumableArray(n), [[a(t, e), "[]=", a(o, e)].join("")]);};};case "comma":case "separator":return function (t) {return function (n, o) {return null == o || 0 === o.length ? n : 0 === n.length ? [[a(t, e), "=", a(o, e)].join("")] : [[n, a(o, e)].join(e.arrayFormatSeparator)];};};default:return function (t) {return function (n, o) {return void 0 === o || e.skipNull && null === o || e.skipEmptyString && "" === o ? n : null === o ? [].concat(_toConsumableArray(n), [a(t, e)]) : [].concat(_toConsumableArray(n), [[a(t, e), "=", a(o, e)].join("")]);};};}}(t),r = {};for (var _i5 = 0, _Object$keys3 = Object.keys(e); _i5 < _Object$keys3.length; _i5++) {var _t2 = _Object$keys3[_i5];n(_t2) || (r[_t2] = e[_t2]);}var i = Object.keys(r);return !1 !== t.sort && i.sort(t.sort), i.map(function (n) {var r = e[n];return void 0 === r ? "" : null === r ? a(n, t) : Array.isArray(r) ? r.reduce(o(n), []).join("&") : a(n, t) + "=" + a(r, t);}).filter(function (e) {return e.length > 0;}).join("&");}, t.parseUrl = function (e, t) {t = Object.assign({ decode: !0 }, t);var _i6 = i(e, "#"),_i7 = _slicedToArray(_i6, 2),n = _i7[0],o = _i7[1];return Object.assign({ url: n.split("?")[0] || "", query: p(d(e), t) }, t && t.parseFragmentIdentifier && o ? { fragmentIdentifier: u(o, t) } : {});}, t.stringifyUrl = function (e, n) {n = Object.assign({ encode: !0, strict: !0 }, n);var o = c(e.url).split("?")[0] || "",r = t.extract(e.url),i = t.parse(r, { sort: !1 }),s = Object.assign(i, e.query);var u = t.stringify(s, n);u && (u = "?" + u);var d = function (e) {var t = "";var n = e.indexOf("#");return -1 !== n && (t = e.slice(n)), t;}(e.url);return e.fragmentIdentifier && (d = "#" + a(e.fragmentIdentifier, n)), "".concat(o).concat(u).concat(d);};}, function (e, t) {function n(e, t) {this.lo = e >>> 0, this.hi = t >>> 0;}e.exports = n;var o = n.zero = new n(0, 0);o.toNumber = function () {return 0;}, o.zzEncode = o.zzDecode = function () {return this;}, o.length = function () {return 1;};var r = n.zeroHash = "\0\0\0\0\0\0\0\0";n.fromNumber = function (e) {if (0 === e) return o;var t = e < 0;t && (e = -e);var r = e >>> 0,i = (e - r) / 4294967296 >>> 0;return t && (i = ~i >>> 0, r = ~r >>> 0, ++r > 4294967295 && (r = 0, ++i > 4294967295 && (i = 0))), new n(r, i);}, n.from = function (e) {return "number" == typeof e ? n.fromNumber(e) : "string" == typeof e || e instanceof String ? n.fromNumber(parseInt(e, 10)) : e.low || e.high ? new n(e.low >>> 0, e.high >>> 0) : o;}, n.prototype.toNumber = function (e) {if (!e && this.hi >>> 31) {var t = 1 + ~this.lo >>> 0,n = ~this.hi >>> 0;return t || (n = n + 1 >>> 0), -(t + 4294967296 * n);}return this.lo + 4294967296 * this.hi;}, n.prototype.toLong = function (e) {return { low: 0 | this.lo, high: 0 | this.hi, unsigned: Boolean(e) };};var i = String.prototype.charCodeAt;n.fromHash = function (e) {return e === r ? o : new n((i.call(e, 0) | i.call(e, 1) << 8 | i.call(e, 2) << 16 | i.call(e, 3) << 24) >>> 0, (i.call(e, 4) | i.call(e, 5) << 8 | i.call(e, 6) << 16 | i.call(e, 7) << 24) >>> 0);}, n.prototype.toHash = function () {return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);}, n.prototype.zzEncode = function () {var e = this.hi >> 31;return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0, this.lo = (this.lo << 1 ^ e) >>> 0, this;}, n.prototype.zzDecode = function () {var e = -(1 & this.lo);return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0, this.hi = (this.hi >>> 1 ^ e) >>> 0, this;}, n.prototype.length = function () {var e = this.lo,t = (this.lo >>> 28 | this.hi << 4) >>> 0,n = this.hi >>> 24;return 0 === n ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : n < 128 ? 9 : 10;};}, function (e, t, n) {e.exports = s;var o,r,i = n(5);function s(e, t, n, o, s, a) {if (i.call(this, e, t, o, void 0, void 0, s, a), !r.isString(n)) throw TypeError("keyType must be a string");this.keyType = n, this.resolvedKeyType = null, this.map = !0;}((s.prototype = Object.create(i.prototype)).constructor = s).className = "MapField", s.fromJSON = function (e, t) {return new s(e, t.id, t.keyType, t.type, t.options, t.comment);}, s.prototype.toJSON = function (e) {var t = !!e && Boolean(e.keepComments);return r.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : void 0]);}, s.prototype.resolve = function () {if (this.resolved) return this;if (void 0 === o.mapKey[this.keyType]) throw Error("invalid key type: " + this.keyType);return i.prototype.resolve.call(this);}, s.d = function (e, t, n) {return "function" == typeof n ? n = r.decorateType(n).name : n && "object" == typeof n && (n = r.decorateEnum(n).name), function (o, i) {r.decorateType(o.constructor).add(new s(i, e, t, n));};}, s._configure = function () {o = n(8), r = n(1);};}, function (e, t, n) {"use strict";e.exports = i;var o,r = n(7);function i(e, t, n, i, s, a, u, c) {if (o.isObject(s) ? (u = s, s = a = void 0) : o.isObject(a) && (u = a, a = void 0), void 0 !== t && !o.isString(t)) throw TypeError("type must be a string");if (!o.isString(n)) throw TypeError("requestType must be a string");if (!o.isString(i)) throw TypeError("responseType must be a string");r.call(this, e, u), this.type = t || "rpc", this.requestType = n, this.requestStream = !!s || void 0, this.responseType = i, this.responseStream = !!a || void 0, this.resolvedRequestType = null, this.resolvedResponseType = null, this.comment = c;}((i.prototype = Object.create(r.prototype)).constructor = i).className = "Method", i.fromJSON = function (e, t) {return new i(e, t.type, t.requestType, t.responseType, t.requestStream, t.responseStream, t.options, t.comment);}, i.prototype.toJSON = function (e) {var t = !!e && Boolean(e.keepComments);return o.toObject(["type", "rpc" !== this.type && this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", t ? this.comment : void 0]);}, i.prototype.resolve = function () {return this.resolved ? this : (this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), r.prototype.resolve.call(this));}, i._configure = function () {o = n(1);};}, function (e, t, n) {"use strict";var o;function r(e) {if (e) for (var t = Object.keys(e), n = 0; n < t.length; ++n) {this[t[n]] = e[t[n]];}}e.exports = r, r.create = function (e) {return this.$type.create(e);}, r.encode = function (e, t) {return arguments.length ? 1 == arguments.length ? this.$type.encode(arguments[0]) : this.$type.encode(arguments[0], arguments[1]) : this.$type.encode(this);}, r.encodeDelimited = function (e, t) {return this.$type.encodeDelimited(e, t);}, r.decode = function (e) {return this.$type.decode(e);}, r.decodeDelimited = function (e) {return this.$type.decodeDelimited(e);}, r.verify = function (e) {return this.$type.verify(e);}, r.fromObject = function (e) {return this.$type.fromObject(e);}, r.toObject = function (e, t) {return e = e || this, this.$type.toObject(e, t);}, r.prototype.toJSON = function () {return this.$type.toObject(this, o.toJSONOptions);}, r.set = function (e, t) {r[e] = t;}, r.get = function (e) {return r[e];}, r._configure = function () {o = n(1);};}, function (e, t, n) {e.exports = c;var o,r = n(1),i = n(11);function s(e, t, n) {this.fn = e, this.len = t, this.next = void 0, this.val = n;}function a() {}function u(e) {this.head = e.head, this.tail = e.tail, this.len = e.len, this.next = e.states;}function c() {this.len = 0, this.head = new s(a, 0, 0), this.tail = this.head, this.states = null;}function d(e, t, n) {t[n] = 255 & e;}function l(e, t) {this.len = e, this.next = void 0, this.val = t;}function p(e, t, n) {for (; e.hi;) {t[n++] = 127 & e.lo | 128, e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0, e.hi >>>= 7;}for (; e.lo > 127;) {t[n++] = 127 & e.lo | 128, e.lo = e.lo >>> 7;}t[n++] = e.lo;}function f(e, t, n) {t[n] = 255 & e, t[n + 1] = e >>> 8 & 255, t[n + 2] = e >>> 16 & 255, t[n + 3] = e >>> 24;}c.create = r.Buffer ? function () {return (c.create = function () {return new (void 0)();})();} : function () {return new c();}, c.alloc = function (e) {return new r.Array(e);}, r.Array !== Array && (c.alloc = r.pool(c.alloc, r.Array.prototype.subarray)), c.prototype._push = function (e, t, n) {return this.tail = this.tail.next = new s(e, t, n), this.len += t, this;}, l.prototype = Object.create(s.prototype), l.prototype.fn = function (e, t, n) {for (; e > 127;) {t[n++] = 127 & e | 128, e >>>= 7;}t[n] = e;}, c.prototype.uint32 = function (e) {return this.len += (this.tail = this.tail.next = new l((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len, this;}, c.prototype.int32 = function (e) {return e < 0 ? this._push(p, 10, o.fromNumber(e)) : this.uint32(e);}, c.prototype.sint32 = function (e) {return this.uint32((e << 1 ^ e >> 31) >>> 0);}, c.prototype.uint64 = function (e) {var t = o.from(e);return this._push(p, t.length(), t);}, c.prototype.int64 = c.prototype.uint64, c.prototype.sint64 = function (e) {var t = o.from(e).zzEncode();return this._push(p, t.length(), t);}, c.prototype.bool = function (e) {return this._push(d, 1, e ? 1 : 0);}, c.prototype.fixed32 = function (e) {return this._push(f, 4, e >>> 0);}, c.prototype.sfixed32 = c.prototype.fixed32, c.prototype.fixed64 = function (e) {var t = o.from(e);return this._push(f, 4, t.lo)._push(f, 4, t.hi);}, c.prototype.sfixed64 = c.prototype.fixed64, c.prototype.float = function (e) {return this._push(r.float.writeFloatLE, 4, e);}, c.prototype.double = function (e) {return this._push(r.float.writeDoubleLE, 8, e);};var h = r.Array.prototype.set ? function (e, t, n) {t.set(e, n);} : function (e, t, n) {for (var o = 0; o < e.length; ++o) {t[n + o] = e[o];}};c.prototype.bytes = function (e) {var t = e.length >>> 0;if (!t) return this._push(d, 1, 0);if (r.isString(e)) {var n = c.alloc(t = i.length(e));i.write(e, n, 0), e = n;}return this.uint32(t)._push(h, t, e);}, c.prototype.string = function (e) {var t = i.length(e);return t ? this.uint32(t)._push(i.write, t, e) : this._push(d, 1, 0);}, c.prototype.fork = function () {return this.states = new u(this), this.head = this.tail = new s(a, 0, 0), this.len = 0, this;}, c.prototype.reset = function () {return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new s(a, 0, 0), this.len = 0), this;}, c.prototype.ldelim = function () {var e = this.head,t = this.tail,n = this.len;return this.reset().uint32(n), n && (this.tail.next = e.next, this.tail = t, this.len += n), this;}, c.prototype.finish = function () {for (var e = this.head.next, t = this.constructor.alloc(this.len), n = 0; e;) {e.fn(e.val, t, n), n += e.len, e = e.next;}return t;}, c._configure = function () {o = n(15), n(21), i = n(11);};}, function (e, t) {e.exports = {};}, function (e, t, n) {"use strict";var o = e.exports;o.length = function (e) {var t = e.length;if (!t) return 0;for (var n = 0; --t % 4 > 1 && "=" === e.charAt(t);) {++n;}return Math.ceil(3 * e.length) / 4 - n;};for (var r = new Array(64), i = new Array(123), s = 0; s < 64;) {i[r[s] = s < 26 ? s + 65 : s < 52 ? s + 71 : s < 62 ? s - 4 : s - 59 | 43] = s++;}o.encode = function (e, t, n) {for (var o, i = null, s = [], a = 0, u = 0; t < n;) {var c = e[t++];switch (u) {case 0:s[a++] = r[c >> 2], o = (3 & c) << 4, u = 1;break;case 1:s[a++] = r[o | c >> 4], o = (15 & c) << 2, u = 2;break;case 2:s[a++] = r[o | c >> 6], s[a++] = r[63 & c], u = 0;}a > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, s)), a = 0);}return u && (s[a++] = r[o], s[a++] = 61, 1 === u && (s[a++] = 61)), i ? (a && i.push(String.fromCharCode.apply(String, s.slice(0, a))), i.join("")) : String.fromCharCode.apply(String, s.slice(0, a));};o.decode = function (e, t, n) {for (var o, r = n, s = 0, a = 0; a < e.length;) {var u = e.charCodeAt(a++);if (61 === u && s > 1) break;if (void 0 === (u = i[u])) throw Error("invalid encoding");switch (s) {case 0:o = u, s = 1;break;case 1:t[n++] = o << 2 | (48 & u) >> 4, o = u, s = 2;break;case 2:t[n++] = (15 & o) << 4 | (60 & u) >> 2, o = u, s = 3;break;case 3:t[n++] = (3 & o) << 6 | u, s = 0;}}if (1 === s) throw Error("invalid encoding");return n - r;}, o.test = function (e) {return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e);};}, function (e, t, n) {"use strict";var o, r, i, s, a, u, c, d, l, p, f;e.exports = O, O.filename = null, O.defaults = { keepCase: !1 };var h = /^[1-9][0-9]*$/,g = /^-?[1-9][0-9]*$/,y = /^0[x][0-9a-fA-F]+$/,m = /^-?0[x][0-9a-fA-F]+$/,v = /^0[0-7]+$/,_ = /^-?0[0-7]+$/,E = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,N = /^[a-zA-Z_][a-zA-Z_0-9]*$/,b = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,A = /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/;function O(e, t, n) {t instanceof r || (n = t, t = new r()), n || (n = O.defaults);var w,S,I,k,R,T = o(e, n.alternateCommentMode || !1),D = T.next,M = T.push,C = T.peek,U = T.skip,x = T.cmnt,G = !0,L = !1,P = t,j = n.keepCase ? function (e) {return e;} : f.camelCase;function B(e, t, n) {var o = O.filename;return n || (O.filename = null), Error("illegal " + (t || "token") + " '" + e + "' (" + (o ? o + ", " : "") + "line " + T.line + ")");}function F() {var e,t = [];do {if ('"' !== (e = D()) && "'" !== e) throw B(e);t.push(D()), U(e), e = C();} while ('"' === e || "'" === e);return t.join("");}function V(e) {var t = D();switch (t) {case "'":case '"':return M(t), F();case "true":case "TRUE":return !0;case "false":case "FALSE":return !1;}try {return function (e, t) {var n = 1;"-" === e.charAt(0) && (n = -1, e = e.substring(1));switch (e) {case "inf":case "INF":case "Inf":return n * (1 / 0);case "nan":case "NAN":case "Nan":case "NaN":return NaN;case "0":return 0;}if (h.test(e)) return n * parseInt(e, 10);if (y.test(e)) return n * parseInt(e, 16);if (v.test(e)) return n * parseInt(e, 8);if (E.test(e)) return n * parseFloat(e);throw B(e, "number", t);}(t, !0);} catch (n) {if (e && b.test(t)) return t;throw B(t, "value");}}function q(e, t) {var n, o;do {!t || '"' !== (n = C()) && "'" !== n ? e.push([o = J(D()), U("to", !0) ? J(D()) : o]) : e.push(F());} while (U(",", !0));U(";");}function J(e, t) {switch (e) {case "max":case "MAX":case "Max":return 536870911;case "0":return 0;}if (!t && "-" === e.charAt(0)) throw B(e, "id");if (g.test(e)) return parseInt(e, 10);if (m.test(e)) return parseInt(e, 16);if (_.test(e)) return parseInt(e, 8);throw B(e, "id");}function K() {if (void 0 !== w) throw B("package");if (w = D(), !b.test(w)) throw B(w, "name");P = P.define(w), U(";");}function Y() {var e,t = C();switch (t) {case "weak":e = I || (I = []), D();break;case "public":D();default:e = S || (S = []);}t = F(), U(";"), e.push(t);}function W() {if (U("="), k = F(), !(L = "proto3" === k) && "proto2" !== k) throw B(k, "syntax");U(";");}function H(e, t) {switch (t) {case "option":return $(e, t), U(";"), !0;case "message":return function (e, t) {if (!N.test(t = D())) throw B(t, "type name");var n = new i(t);Z(n, function (e) {if (!H(n, e)) switch (e) {case "map":!function (e) {U("<");var t = D();if (void 0 === p.mapKey[t]) throw B(t, "type");U(",");var n = D();if (!b.test(n)) throw B(n, "type");U(">");var o = D();if (!N.test(o)) throw B(o, "name");U("=");var r = new a(j(o), J(D()), t, n);Z(r, function (e) {if ("option" !== e) throw B(e);$(r, e), U(";");}, function () {ee(r);}), e.add(r);}(n);break;case "required":case "optional":case "repeated":X(n, e);break;case "oneof":!function (e, t) {if (!N.test(t = D())) throw B(t, "name");var n = new u(j(t));Z(n, function (e) {"option" === e ? ($(n, e), U(";")) : (M(e), X(n, "optional"));}), e.add(n);}(n, e);break;case "extensions":q(n.extensions || (n.extensions = []));break;case "reserved":q(n.reserved || (n.reserved = []), !0);break;default:if (!L || !b.test(e)) throw B(e);M(e), X(n, "optional");}}), e.add(n);}(e, t), !0;case "enum":return function (e, t) {if (!N.test(t = D())) throw B(t, "name");var n = new c(t);Z(n, function (e) {switch (e) {case "option":$(n, e), U(";");break;case "reserved":q(n.reserved || (n.reserved = []), !0);break;default:!function (e, t) {if (!N.test(t)) throw B(t, "name");U("=");var n = J(D(), !0),o = {};Z(o, function (e) {if ("option" !== e) throw B(e);$(o, e), U(";");}, function () {ee(o);}), e.add(t, n, o.comment);}(n, e);}}), e.add(n);}(e, t), !0;case "service":return function (e, t) {if (!N.test(t = D())) throw B(t, "service name");var n = new d(t);Z(n, function (e) {if (!H(n, e)) {if ("rpc" !== e) throw B(e);!function (e, t) {var n = t;if (!N.test(t = D())) throw B(t, "name");var o,r,i,s,a = t;U("("), U("stream", !0) && (r = !0);if (!b.test(t = D())) throw B(t);o = t, U(")"), U("returns"), U("("), U("stream", !0) && (s = !0);if (!b.test(t = D())) throw B(t);i = t, U(")");var u = new l(a, n, o, i, r, s);Z(u, function (e) {if ("option" !== e) throw B(e);$(u, e), U(";");}), e.add(u);}(n, e);}}), e.add(n);}(e, t), !0;case "extend":return function (e, t) {if (!b.test(t = D())) throw B(t, "reference");var n = t;Z(null, function (t) {switch (t) {case "required":case "repeated":case "optional":X(e, t, n);break;default:if (!L || !b.test(t)) throw B(t);M(t), X(e, "optional", n);}});}(e, t), !0;}return !1;}function Z(e, t, n) {var o = T.line;if (e && (e.comment = x(), e.filename = O.filename), U("{", !0)) {for (var r; "}" !== (r = D());) {t(r);}U(";", !0);} else n && n(), U(";"), e && "string" != typeof e.comment && (e.comment = x(o));}function X(e, t, n) {var o = D();if ("group" !== o) {if (!b.test(o)) throw B(o, "type");var r = D();if (!N.test(r)) throw B(r, "name");r = j(r), U("=");var a = new s(r, J(D()), o, t, n);Z(a, function (e) {if ("option" !== e) throw B(e);$(a, e), U(";");}, function () {ee(a);}), e.add(a), L || !a.repeated || void 0 === p.packed[o] && void 0 !== p.basic[o] || a.setOption("packed", !1, !0);} else !function (e, t) {var n = D();if (!N.test(n)) throw B(n, "name");var o = f.lcFirst(n);n === o && (n = f.ucFirst(n));U("=");var r = J(D()),a = new i(n);a.group = !0;var u = new s(o, r, n, t);u.filename = O.filename, Z(a, function (e) {switch (e) {case "option":$(a, e), U(";");break;case "required":case "optional":case "repeated":X(a, e);break;default:throw B(e);}}), e.add(a).add(u);}(e, t);}function $(e, t) {var n = U("(", !0);if (!b.test(t = D())) throw B(t, "name");var o = t;n && (U(")"), o = "(" + o + ")", t = C(), A.test(t) && (o += t, D())), U("="), z(e, o);}function z(e, t) {if (U("{", !0)) do {if (!N.test(R = D())) throw B(R, "name");"{" === C() ? z(e, t + "." + R) : (U(":"), "{" === C() ? z(e, t + "." + R) : Q(e, t + "." + R, V(!0)));} while (!U("}", !0));else Q(e, t, V(!0));}function Q(e, t, n) {e.setOption && e.setOption(t, n);}function ee(e) {if (U("[", !0)) {do {$(e, "option");} while (U(",", !0));U("]");}return e;}for (; null !== (R = D());) {switch (R) {case "package":if (!G) throw B(R);K();break;case "import":if (!G) throw B(R);Y();break;case "syntax":if (!G) throw B(R);W();break;case "option":if (!G) throw B(R);$(P, R), U(";");break;default:if (H(P, R)) {G = !1;continue;}throw B(R);}}return O.filename = null, { package: w, imports: S, weakImports: I, syntax: k, root: t };}O._configure = function () {o = n(23), r = n(12), i = n(6), s = n(5), a = n(16), u = n(10), c = n(4), d = n(13), l = n(17), p = n(8), f = n(1);};}, function (e, t) {e.exports = p;var n = /[\s{}=;:[\],'"()<>]/g,o = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,r = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,i = /^ *[*/]+ */,s = /^\s*\*?\/*/,a = /\n/g,u = /\s/,c = /\\(.?)/g,d = { 0: "\0", r: "\r", n: "\n", t: "\t" };function l(e) {return e.replace(c, function (e, t) {switch (t) {case "\\":case "":return t;default:return d[t] || "";}});}function p(e, t) {e = e.toString();var c = 0,d = e.length,p = 1,f = null,h = null,g = 0,y = !1,m = [],v = null;function _(e) {return Error("illegal " + e + " (line " + p + ")");}function E(t) {return e.charAt(t);}function N(n, o) {f = e.charAt(n++), g = p, y = !1;var r,u = n - (t ? 2 : 3);do {if (--u < 0 || "\n" === (r = e.charAt(u))) {y = !0;break;}} while (" " === r || "\t" === r);for (var c = e.substring(n, o).split(a), d = 0; d < c.length; ++d) {c[d] = c[d].replace(t ? s : i, "").trim();}h = c.join("\n").trim();}function b(t) {var n = A(t),o = e.substring(t, n);return /^\s*\/{1,2}/.test(o);}function A(e) {for (var t = e; t < d && "\n" !== E(t);) {t++;}return t;}function O() {if (m.length > 0) return m.shift();if (v) return function () {var t = "'" === v ? r : o;t.lastIndex = c - 1;var n = t.exec(e);if (!n) throw _("string");return c = t.lastIndex, w(v), v = null, l(n[1]);}();var i, s, a, f, h;do {if (c === d) return null;for (i = !1; u.test(a = E(c));) {if ("\n" === a && ++p, ++c === d) return null;}if ("/" === E(c)) {if (++c === d) throw _("comment");if ("/" === E(c)) {if (t) {if (f = c, h = !1, b(c)) {h = !0;do {if ((c = A(c)) === d) break;c++;} while (b(c));} else c = Math.min(d, A(c) + 1);h && N(f, c), p++, i = !0;} else {for (h = "/" === E(f = c + 1); "\n" !== E(++c);) {if (c === d) return null;}++c, h && N(f, c - 1), ++p, i = !0;}} else {if ("*" !== (a = E(c))) return "/";f = c + 1, h = t || "*" === E(f);do {if ("\n" === a && ++p, ++c === d) throw _("comment");s = a, a = E(c);} while ("*" !== s || "/" !== a);++c, h && N(f, c - 2), i = !0;}}} while (i);var g = c;if (n.lastIndex = 0, !n.test(E(g++))) for (; g < d && !n.test(E(g));) {++g;}var y = e.substring(c, c = g);return '"' !== y && "'" !== y || (v = y), y;}function w(e) {m.push(e);}function S() {if (!m.length) {var e = O();if (null === e) return null;w(e);}return m[0];}return Object.defineProperty({ next: O, peek: S, push: w, skip: function skip(e, t) {var n = S();if (n === e) return O(), !0;if (!t) throw _("token '" + n + "', '" + e + "' expected");return !1;}, cmnt: function cmnt(e) {var n = null;return void 0 === e ? g === p - 1 && (t || "*" === f || y) && (n = h) : (g < e && S(), g !== e || y || !t && "/" !== f || (n = h)), n;} }, "line", { get: function get() {return p;} });}p.unescape = l;}, function (e, t, n) {"use strict";e.exports = r;var o = n(1);function r(e, t, n) {if ("function" != typeof e) throw TypeError("rpcImpl must be a function");o.EventEmitter.call(this), this.rpcImpl = e, this.requestDelimited = Boolean(t), this.responseDelimited = Boolean(n);}(r.prototype = Object.create(o.EventEmitter.prototype)).constructor = r, r.prototype.rpcCall = function e(t, n, r, i, s) {if (!i) throw TypeError("request must be specified");var a = this;if (!s) return o.asPromise(e, a, t, n, r, i);if (a.rpcImpl) try {return a.rpcImpl(t, n[a.requestDelimited ? "encodeDelimited" : "encode"](i).finish(), function (e, n) {if (e) return a.emit("error", e, t), s(e);if (null !== n) {if (!(n instanceof r)) try {n = r[a.responseDelimited ? "decodeDelimited" : "decode"](n);} catch (e) {return a.emit("error", e, t), s(e);}return a.emit("data", n, t), s(null, n);}a.end(!0);});} catch (e) {return a.emit("error", e, t), void setTimeout(function () {s(e);}, 0);} else setTimeout(function () {s(Error("already ended"));}, 0);}, r.prototype.end = function (e) {return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;};}, function (e, t) {e.exports = r;var n,o = /\/|\./;function r(e, t) {o.test(e) || (e = "google/protobuf/" + e + ".proto", t = { nested: { google: { nested: { protobuf: { nested: t } } } } }), r[e] = t;}r("any", { Any: { fields: { type_url: { type: "string", id: 1 }, value: { type: "bytes", id: 2 } } } }), r("duration", { Duration: n = { fields: { seconds: { type: "int64", id: 1 }, nanos: { type: "int32", id: 2 } } } }), r("timestamp", { Timestamp: n }), r("empty", { Empty: { fields: {} } }), r("struct", { Struct: { fields: { fields: { keyType: "string", type: "Value", id: 1 } } }, Value: { oneofs: { kind: { oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"] } }, fields: { nullValue: { type: "NullValue", id: 1 }, numberValue: { type: "double", id: 2 }, stringValue: { type: "string", id: 3 }, boolValue: { type: "bool", id: 4 }, structValue: { type: "Struct", id: 5 }, listValue: { type: "ListValue", id: 6 } } }, NullValue: { values: { NULL_VALUE: 0 } }, ListValue: { fields: { values: { rule: "repeated", type: "Value", id: 1 } } } }), r("wrappers", { DoubleValue: { fields: { value: { type: "double", id: 1 } } }, FloatValue: { fields: { value: { type: "float", id: 1 } } }, Int64Value: { fields: { value: { type: "int64", id: 1 } } }, UInt64Value: { fields: { value: { type: "uint64", id: 1 } } }, Int32Value: { fields: { value: { type: "int32", id: 1 } } }, UInt32Value: { fields: { value: { type: "uint32", id: 1 } } }, BoolValue: { fields: { value: { type: "bool", id: 1 } } }, StringValue: { fields: { value: { type: "string", id: 1 } } }, BytesValue: { fields: { value: { type: "bytes", id: 1 } } } }), r("field_mask", { FieldMask: { fields: { paths: { rule: "repeated", type: "string", id: 1 } } } }), r.get = function (e) {return r[e] || null;};}, function (e, t, n) {e.exports = a;var o,r,i = n(1);function s(e, t) {return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len);}function a(e) {this.buf = e, this.pos = 0, this.len = e.length;}var u,c = "undefined" != typeof Uint8Array ? function (e) {if (e instanceof Uint8Array || Array.isArray(e)) return new a(e);if ("undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer) return new a(new Uint8Array(e));throw Error("illegal buffer");} : function (e) {if (Array.isArray(e)) return new a(e);throw Error("illegal buffer");};function d() {var e = new o(0, 0),t = 0;if (!(this.len - this.pos > 4)) {for (; t < 3; ++t) {if (this.pos >= this.len) throw s(this);if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e;}return e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0, e;}for (; t < 4; ++t) {if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e;}if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0, e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return e;if (t = 0, this.len - this.pos > 4) {for (; t < 5; ++t) {if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e;}} else for (; t < 5; ++t) {if (this.pos >= this.len) throw s(this);if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e;}throw Error("invalid varint encoding");}function l(e, t) {return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;}function p() {if (this.pos + 8 > this.len) throw s(this, 8);return new o(l(this.buf, this.pos += 4), l(this.buf, this.pos += 4));}a.create = i.Buffer ? function (e) {return (a.create = function (e) {return i.Buffer.isBuffer(e) ? new (void 0)(e) : c(e);})(e);} : c, a.prototype._slice = i.Array.prototype.subarray || i.Array.prototype.slice, a.prototype.uint32 = (u = 4294967295, function () {if (u = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return u;if (u = (u | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return u;if (u = (u | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return u;if (u = (u | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return u;if (u = (u | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return u;if ((this.pos += 5) > this.len) throw this.pos = this.len, s(this, 10);return u;}), a.prototype.int32 = function () {return 0 | this.uint32();}, a.prototype.sint32 = function () {var e = this.uint32();return e >>> 1 ^ -(1 & e) | 0;}, a.prototype.bool = function () {return 0 !== this.uint32();}, a.prototype.fixed32 = function () {if (this.pos + 4 > this.len) throw s(this, 4);return l(this.buf, this.pos += 4);}, a.prototype.sfixed32 = function () {if (this.pos + 4 > this.len) throw s(this, 4);return 0 | l(this.buf, this.pos += 4);}, a.prototype.float = function () {if (this.pos + 4 > this.len) throw s(this, 4);var e = i.float.readFloatLE(this.buf, this.pos);return this.pos += 4, e;}, a.prototype.double = function () {if (this.pos + 8 > this.len) throw s(this, 4);var e = i.float.readDoubleLE(this.buf, this.pos);return this.pos += 8, e;}, a.prototype.bytes = function () {var e = this.uint32(),t = this.pos,n = this.pos + e;if (n > this.len) throw s(this, e);return this.pos += e, Array.isArray(this.buf) ? this.buf.slice(t, n) : t === n ? new this.buf.constructor(0) : this._slice.call(this.buf, t, n);}, a.prototype.string = function () {var e = this.bytes();return r.read(e, 0, e.length);}, a.prototype.skip = function (e) {if ("number" == typeof e) {if (this.pos + e > this.len) throw s(this, e);this.pos += e;} else do {if (this.pos >= this.len) throw s(this);} while (128 & this.buf[this.pos++]);return this;}, a.prototype.skipType = function (e) {switch (e) {case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for (;;) {if (4 == (e = 7 & this.uint32())) break;this.skipType(e);}break;case 5:this.skip(4);break;default:throw Error("invalid wire type " + e + " at offset " + this.pos);}return this;}, a._configure = function () {o = n(15), r = n(11);var e = i.Long ? "toLong" : "toNumber";i.merge(a.prototype, { int64: function int64() {return d.call(this)[e](!1);}, uint64: function uint64() {return d.call(this)[e](!0);}, sint64: function sint64() {return d.call(this).zzDecode()[e](!1);}, fixed64: function fixed64() {return p.call(this)[e](!0);}, sfixed64: function sfixed64() {return p.call(this)[e](!1);} });};}, function (e, t, n) {var o, r;function i(e, t) {return e.name + ": " + t + (e.repeated && "array" !== t ? "[]" : e.map && "object" !== t ? "{k:" + e.keyType + "}" : "") + " expected";}function s(e, t, n, s) {var a = s.types;if (e.resolvedType) {if (e.resolvedType instanceof o) {if (Object.keys(e.resolvedType.values).indexOf(n) < 0) return i(e, "enum value");} else {var u = a[t].verify(n);if (u) return e.name + "." + u;}} else switch (e.type) {case "int32":case "uint32":case "sint32":case "fixed32":case "sfixed32":if (!r.isInteger(n)) return i(e, "integer");break;case "int64":case "uint64":case "sint64":case "fixed64":case "sfixed64":if (!(r.isInteger(n) || n && r.isInteger(n.low) && r.isInteger(n.high))) return i(e, "integer|Long");break;case "float":case "double":if ("number" != typeof n) return i(e, "number");break;case "bool":if ("boolean" != typeof n) return i(e, "boolean");break;case "string":if (!r.isString(n)) return i(e, "string");break;case "bytes":if (!(n && "number" == typeof n.length || r.isString(n))) return i(e, "buffer");}}function a(e, t) {switch (e.keyType) {case "int32":case "uint32":case "sint32":case "fixed32":case "sfixed32":if (!r.key32Re.test(t)) return i(e, "integer key");break;case "int64":case "uint64":case "sint64":case "fixed64":case "sfixed64":if (!r.key64Re.test(t)) return i(e, "integer|Long key");break;case "bool":if (!r.key2Re.test(t)) return i(e, "boolean key");}}function u(e) {return function (t) {return function (n) {var o;if ("object" != typeof n || null === n) return "object expected";var u,c = {};e.oneofsArray.length && (u = {});for (var d = 0; d < e.fieldsArray.length; ++d) {var l,p = e._fieldsArray[d].resolve(),f = n[p.name];if (!p.optional || null != f && n.hasOwnProperty(p.name)) if (p.map) {if (!r.isObject(f)) return i(p, "object");var h = Object.keys(f);for (l = 0; l < h.length; ++l) {if (o = a(p, h[l])) return o;if (o = s(p, d, f[h[l]], t)) return o;}} else if (p.repeated) {if (!Array.isArray(f)) return i(p, "array");for (l = 0; l < f.length; ++l) {if (o = s(p, d, f[l], t)) return o;}} else {if (p.partOf) {var g = p.partOf.name;if (1 === c[p.partOf.name] && 1 === u[g]) return p.partOf.name + ": multiple values";u[g] = 1;}if (o = s(p, d, f, t)) return o;}}};};}e.exports = u, u._configure = function () {o = n(4), r = n(1);};}, function (e, t, n) {var o, r;function i(e) {return function (t) {var n = t.Writer,i = t.types,s = t.util;return function (t, a) {a = a || n.create();for (var u = e.fieldsArray.slice().sort(s.compareFieldsById), c = 0; c < u.length; c++) {var d = u[c],l = e._fieldsArray.indexOf(d),p = d.resolvedType instanceof o ? "uint32" : d.type,f = r.basic[p],h = t[d.name];if (d.resolvedType instanceof o && "string" == typeof h && (h = i[l].values[h]), d.map) {if (null != h && t.hasOwnProperty(d.name)) for (var g = Object.keys(h), y = 0; y < g.length; ++y) {a.uint32((d.id << 3 | 2) >>> 0).fork().uint32(8 | r.mapKey[d.keyType])[d.keyType](g[y]), void 0 === f ? i[l].encode(h[g[y]], a.uint32(18).fork()).ldelim().ldelim() : a.uint32(16 | f)[p](h[g[y]]).ldelim();}} else if (d.repeated) {if (h && h.length) if (d.packed && void 0 !== r.packed[p]) {a.uint32((d.id << 3 | 2) >>> 0).fork();for (var m = 0; m < h.length; m++) {a[p](h[m]);}a.ldelim();} else for (var v = 0; v < h.length; v++) {void 0 === f ? d.resolvedType.group ? i[l].encode(h[v], a.uint32((d.id << 3 | 3) >>> 0)).uint32((d.id << 3 | 4) >>> 0) : i[l].encode(h[v], a.uint32((d.id << 3 | 2) >>> 0).fork()).ldelim() : a.uint32((d.id << 3 | f) >>> 0)[p](h[v]);}} else (!d.optional || null != h && t.hasOwnProperty(d.name)) && (d.optional || null != h && t.hasOwnProperty(d.name) || console.warn("注意啦!!!很大概率会报错 类型:", t.$type ? t.$type.name : "不晓得", "没有设置对应的属性:", d.name, "检查是不是proto文件属性设置为了required"), void 0 === f ? d.resolvedType.group ? i[l].encode(h, a.uint32((d.id << 3 | 3) >>> 0)).uint32((d.id << 3 | 4) >>> 0) : i[l].encode(h, a.uint32((d.id << 3 | 2) >>> 0).fork()).ldelim() : a.uint32((d.id << 3 | f) >>> 0)[p](h));}return a;};};}e.exports = i, i._configure = function () {o = n(4), r = n(8);};}, function (e, t, n) {var o, r, i;function s(e) {return "missing required '" + e.name + "'";}function a(e) {return function (t) {var n = t.Reader,a = t.types,u = t.util;return function (t, c) {t instanceof n || (t = n.create(t));for (var d, l = void 0 === c ? t.len : t.pos + c, p = new this.ctor(); t.pos < l;) {var f = t.uint32();if (e.group && 4 == (7 & f)) break;for (var h = f >>> 3, g = 0, y = !1; g < e.fieldsArray.length; ++g) {var m = e._fieldsArray[g].resolve(),v = m.name,_ = m.resolvedType instanceof o ? "int32" : m.type;if (h == m.id) {if (y = !0, m.map) t.skip().pos++, p[v] === u.emptyObject && (p[v] = {}), d = t[m.keyType](), t.pos++, null != r.long[m.keyType] ? null == r.basic[_] ? p[v]["object" == typeof d ? u.longToHash(d) : d] = a[g].decode(t, t.uint32()) : p[v]["object" == typeof d ? u.longToHash(d) : d] = t[_]() : null == r.basic[_] ? p[v] = a[g].decode(t, t.uint32()) : p[v] = t[_]();else if (m.repeated) {if (p[v] && p[v].length || (p[v] = []), null != r.packed[_] && 2 == (7 & f)) for (var E = t.uint32() + t.pos; t.pos < E;) {p[v].push(t[_]());} else null == r.basic[_] ? m.resolvedType.group ? p[v].push(a[g].decode(t)) : p[v].push(a[g].decode(t, t.uint32())) : p[v].push(t[_]());} else null == r.basic[_] ? m.resolvedType.group ? p[v] = a[g].decode(t) : p[v] = a[g].decode(t, t.uint32()) : p[v] = t[_]();break;}}y || (console.log("t", f), t.skipType(7 & f));}for (g = 0; g < e._fieldsArray.length; ++g) {var N = e._fieldsArray[g];if (N.required && !p.hasOwnProperty(N.name)) throw i.ProtocolError(s(N), { instance: p });}return p;};};}e.exports = a, a._configure = function () {o = n(4), r = n(8), i = n(1);};}, function (e, t, n) {var o,r = t;r[".google.protobuf.Any"] = { fromObject: function fromObject(e) {if (e && e["@type"]) {var t = this.lookup(e["@type"]);if (t) {var n = "." === e["@type"].charAt(0) ? e["@type"].substr(1) : e["@type"];return this.create({ type_url: "/" + n, value: t.encode(t.fromObject(e)).finish() });}}return this.fromObject(e);}, toObject: function toObject(e, t) {if (t && t.json && e.type_url && e.value) {var n = e.type_url.substring(e.type_url.lastIndexOf("/") + 1),r = this.lookup(n);r && (e = r.decode(e.value));}if (!(e instanceof this.ctor) && e instanceof o) {var i = e.$type.toObject(e, t);return i["@type"] = e.$type.fullName, i;}return this.toObject(e, t);} }, r._configure = function () {o = n(18);};}, function (e, t, n) {var o,r,i = e.exports;function s(e, t, n, i) {var s = i.m,a = i.d,u = i.types,c = i.ksi,d = void 0 !== c;if (e.resolvedType) {if (e.resolvedType instanceof o) {for (var l = d ? a[n][c] : a[n], p = e.resolvedType.values, f = Object.keys(p), h = 0; h < f.length; h++) {if (!(e.repeated && p[f[h]] === e.typeDefault || f[h] != l && p[f[h]] != l)) {d ? s[n][c] = p[f[h]] : s[n] = p[f[h]];break;}}} else {if ("object" != typeof (d ? a[n][c] : a[n])) throw TypeError(e.fullName + ": object expected");d ? s[n][c] = u[t].fromObject(a[n][c]) : s[n] = u[t].fromObject(a[n]);}} else {var g = !1;switch (e.type) {case "double":case "float":d ? s[n][c] = Number(a[n][c]) : s[n] = Number(a[n]);break;case "uint32":case "fixed32":d ? s[n][c] = a[n][c] >>> 0 : s[n] = a[n] >>> 0;break;case "int32":case "sint32":case "sfixed32":d ? s[n][c] = 0 | a[n][c] : s[n] = 0 | a[n];break;case "uint64":g = !0;case "int64":case "sint64":case "fixed64":case "sfixed64":r.Long ? d ? s[n][c] = r.Long.fromValue(a[n][c]).unsigned = g : s[n] = r.Long.fromValue(a[n]).unsigned = g : "string" == typeof (d ? a[n][c] : a[n]) ? d ? s[n][c] = parseInt(a[n][c], 10) : s[n] = parseInt(a[n], 10) : "number" == typeof (d ? a[n][c] : a[n]) ? d ? s[n][c] = a[n][c] : s[n] = a[n] : "object" == typeof (d ? a[n][c] : a[n]) && (d ? s[n][c] = new r.LongBits(a[n][c].low >>> 0, a[n][c].high >>> 0).toNumber(g) : s[n] = new r.LongBits(a[n].low >>> 0, a[n].high >>> 0).toNumber(g));break;case "bytes":"string" == typeof (d ? a[n][c] : a[n]) ? d ? r.base64.decode(a[n][c], s[n][c] = r.newBuffer(r.base64.length(a[n][c])), 0) : r.base64.decode(a[n], s[n] = r.newBuffer(r.base64.length(a[n])), 0) : (d ? a[n][c] : a[n]).length && (d ? s[n][c] = a[n][c] : s[n] = a[n]);break;case "string":d ? s[n][c] = String(a[n][c]) : s[n] = String(a[n]);break;case "bool":d ? s[n][c] = Boolean(a[n][c]) : s[n] = Boolean(a[n]);}}}function a(e, t, n, i) {var s = i.m,a = i.d,u = i.types,c = i.ksi,d = i.o,l = void 0 !== c;if (e.resolvedType) e.resolvedType instanceof o ? l ? a[n][c] = d.enums === String ? u[t].values[s[n][c]] : s[n][c] : a[n] = d.enums === String ? u[t].values[s[n]] : s[n] : l ? a[n][c] = u[t].toObject(s[n][c], d) : a[n] = u[t].toObject(s[n], d);else {var p = !1;switch (e.type) {case "double":case "float":l ? a[n][c] = d.json && !isFinite(s[n][c]) ? String(s[n][c]) : s[n][c] : a[n] = d.json && !isFinite(s[n]) ? String(s[n]) : s[n];break;case "uint64":p = !0;case "int64":case "sint64":case "fixed64":case "sfixed64":"number" == typeof s[n][c] ? l ? a[n][c] = d.longs === String ? String(s[n][c]) : s[n][c] : a[n] = d.longs === String ? String(s[n]) : s[n] : l ? a[n][c] = d.longs === String ? r.Long.prototype.toString.call(s[n][c]) : d.longs === Number ? new r.LongBits(s[n][c].low >>> 0, s[n][c].high >>> 0).toNumber(p) : s[n][c] : a[n] = d.longs === String ? r.Long.prototype.toString.call(s[n]) : d.longs === Number ? new r.LongBits(s[n].low >>> 0, s[n].high >>> 0).toNumber(p) : s[n];break;case "bytes":l ? a[n][c] = d.bytes === String ? r.base64.encode(s[n][c], 0, s[n][c].length) : d.bytes === Array ? Array.prototype.slice.call(s[n][c]) : s[n][c] : a[n] = d.bytes === String ? r.base64.encode(s[n], 0, s[n].length) : d.bytes === Array ? Array.prototype.slice.call(s[n]) : s[n];break;default:l ? a[n][c] = s[n][c] : a[n] = s[n];}}}i._configure = function () {o = n(4), r = n(1);}, i.fromObject = function (e) {var t = e.fieldsArray;return function (e) {return function (n) {if (n instanceof this.ctor) return n;if (!t.length) return new this.ctor();for (var i = new this.ctor(), a = 0; a < t.length; ++a) {var u,c = t[a].resolve(),d = c.name;if (c.map) {if (n[d]) {if ("object" != typeof n[d]) throw TypeError(c.fullName + ": object expected");i[d] = {};}var l = Object.keys(n[d]);for (u = 0; u < l.length; ++u) {s(c, a, d, r.merge(r.copy(e), { m: i, d: n, ksi: l[u] }));}} else if (c.repeated) {if (n[d]) {if (!Array.isArray(n[d])) throw TypeError(c.fullName + ": array expected");for (i[d] = [], u = 0; u < n[d].length; ++u) {s(c, a, d, r.merge(r.copy(e), { m: i, d: n, ksi: u }));}}} else (c.resolvedType instanceof o || null != n[d]) && s(c, a, d, r.merge(r.copy(e), { m: i, d: n }));}return i;};};}, i.toObject = function (e) {var t = e.fieldsArray.slice().sort(r.compareFieldsById);return function (n) {return t.length ? function (i, s) {s = s || {};for (var u, c, d = {}, l = [], p = [], f = [], h = 0; h < t.length; ++h) {t[h].partOf || (t[h].resolve().repeated ? l : t[h].map ? p : f).push(t[h]);}if (l.length && (s.arrays || s.defaults)) for (h = 0; h < l.length; ++h) {d[l[h].name] = [];}if (p.length && (s.objects || s.defaults)) for (h = 0; h < p.length; ++h) {d[p[h].name] = {};}if (f.length && s.defaults) for (h = 0; h < f.length; ++h) {if (c = (u = f[h]).name, u.resolvedType instanceof o) d[c] = s.enums = String ? u.resolvedType.valuesById[u.typeDefault] : u.typeDefault;else if (u.long) {if (r.Long) {var g = new r.Long(u.typeDefault.low, u.typeDefault.high, u.typeDefault.unsigned);d[c] = s.longs === String ? g.toString() : s.longs === Number ? g.toNumber() : g;} else d[c] = s.longs === String ? u.typeDefault.toString() : u.typeDefault.toNumber();} else u.bytes ? d[c] = s.bytes === String ? String.fromCharCode.apply(String, u.typeDefault) : Array.prototype.slice.call(u.typeDefault).join("*..*").split("*..*") : d[c] = u.typeDefault;}var y = !1;for (h = 0; h < t.length; ++h) {c = (u = t[h]).name;var m,v,_ = e._fieldsArray.indexOf(u);if (u.map) {if (y || (y = !0), i[c] && (m = Object.keys(i[c]).length)) for (d[c] = {}, v = 0; v < m.length; ++v) {a(u, _, c, r.merge(r.copy(n), { m: i, d: d, ksi: m[v], o: s }));}} else if (u.repeated) {if (i[c] && i[c].length) for (d[c] = [], v = 0; v < i[c].length; ++v) {a(u, _, c, r.merge(r.copy(n), { m: i, d: d, ksi: v, o: s }));}} else null != i[c] && i.hasOwnProperty(c) && a(u, _, c, r.merge(r.copy(n), { m: i, d: d, o: s })), u.partOf && s.oneofs && (d[u.partOf.name] = c);}return d;} : function () {return {};};};};}, function (e, t, n) {var o, r, i;r = [n(0)], void 0 === (i = "function" == typeof (o = function o(e) {"use strict";return (e.roots.messagebody || (e.roots.messagebody = new e.Root())).addJSON({ im: { nested: { floo: { nested: { protobuf: { nested: { MessageOperation: { fields: { type: { type: "OpType", id: 1 }, mid: { type: "uint64", id: 2 }, xid: { type: "XID", id: 3 } }, nested: { OpType: { values: { UNKNOWN: 0, READ_ACK: 1, READ_ALL: 2, READ_CANCEL: 3, DELIVER_ACK: 4, RECALL: 5, DELETE: 6, PLAY_ACK: 7 } } } }, MessageBody: { fields: { type: { type: "Type", id: 1 }, content: { type: "string", id: 4 }, ctype: { type: "ContentType", id: 5 }, operation: { type: "MessageOperation", id: 6 }, config: { type: "string", id: 7 }, attachment: { type: "string", id: 8 }, ext: { type: "string", id: 9 }, qos: { type: "QoS", id: 10 }, sender_name: { type: "string", id: 11 }, is_system: { type: "bool", id: 12 }, priority: { type: "uint32", id: 13 }, status: { type: "Status", id: 14 } }, nested: { Type: { values: { NORMAL: 0, OPER: 1, CHAT: 2, GROUPCHAT: 3 } }, ContentType: { values: { TEXT: 0, IMAGE: 1, AUDIO: 2, VIDEO: 3, FILE: 4, LOCATION: 5, COMMAND: 6, FORWARD: 7 } }, QoS: { values: { AT_LEAST_ONCE: 0, AT_MOST_ONCE: 1, EXACTLY_ONCE: 2 } }, Status: { values: { UNREAD: 0, DELIVERED: 1, READ: 2 } } } }, XID: { fields: { uid: { type: "uint64", id: 1 }, deviceSN: { type: "uint32", id: 2 } } } } } } } } } });}) ? o.apply(t, r) : o) || (e.exports = i);}, function (e, t, n) {var o, r, i;r = [n(0)], void 0 === (i = "function" == typeof (o = function o(e) {"use strict";return (e.roots.groupnotice || (e.roots.groupnotice = new e.Root())).addJSON({ im: { nested: { floo: { nested: { protobuf: { nested: { GroupNotice: { fields: { type: { type: "Type", id: 1 }, gid: { type: "XID", id: 2 }, from: { type: "XID", id: 3 }, to: { rule: "repeated", type: "XID", id: 4 }, content: { type: "string", id: 5 } }, nested: { Type: { values: { UNKNOWN: 0, PRESENCE: 1, ABSENCE: 2, CREATED: 3, DESTROYED: 4, JOINED: 5, LEAVED: 6, APPLYED: 7, APPLY_ACCEPTED: 8, APPLY_DECLINED: 9, INVITED: 10, INVITE_ACCEPTED: 11, INVITE_DECLINED: 12, KICKED: 13, BLOCKED: 14, UNBLOCKED: 15, OWNER_ASSIGNED: 16, ADMIN_GRANTED: 17, ADMIN_REVOKED: 18, MUTED: 19, UNMUTED: 20, BANNED: 21, UNBANNED: 22, INFO_UPDATED: 23, ANNOUNCEMENT_UPDATED: 24, MESSAGE_SETTING: 25, FILE_UPLOADED: 26, FILE_DELETED: 27, FILE_UPDATED: 28 } } } }, XID: { fields: { uid: { type: "uint64", id: 1 }, deviceSN: { type: "uint32", id: 2 } } } } } } } } } });}) ? o.apply(t, r) : o) || (e.exports = i);}, function (e, t, n) {var o, r, i;r = [n(0)], void 0 === (i = "function" == typeof (o = function o(e) {"use strict";return (e.roots.rosternotice || (e.roots.rosternotice = new e.Root())).addJSON({ im: { nested: { floo: { nested: { protobuf: { nested: { RosterNotice: { fields: { type: { type: "Type", id: 1 }, from: { type: "XID", id: 2 }, to: { rule: "repeated", type: "XID", id: 3 }, content: { type: "string", id: 4 }, roster_vsn: { type: "string", id: 5 } }, nested: { Type: { values: { UNKNOWN: 0, ADDED: 1, REMOVED: 2, ACCEPTED: 3, DECLINED: 4, APPLIED: 7, BLOCKED: 5, UNBLOCKED: 6, INFO_UPDATED: 8, MUTED: 9, UNMUTED: 10 } } } }, XID: { fields: { uid: { type: "uint64", id: 1 }, deviceSN: { type: "uint32", id: 2 } } } } } } } } } });}) ? o.apply(t, r) : o) || (e.exports = i);}, function (e, t, n) {var o, r, i;r = [n(0)], void 0 === (i = "function" == typeof (o = function o(e) {"use strict";return (e.roots.usernotice || (e.roots.usernotice = new e.Root())).addJSON({ im: { nested: { floo: { nested: { protobuf: { nested: { UserNotice: { fields: { type: { type: "Type", id: 1 }, content: { type: "string", id: 2 } }, nested: { Type: { values: { UNKNOWN: 0, PASSWORD_CHANGED: 1, FROZEN: 2, REMOVED: 3, KICK_BY_SAME_DEVICE: 4, KICKED_BY_OTHER_DEVICE: 5, INFO_UPDATED: 6, DEVICE_LOGIN: 7, DEVICE_LOGOUT: 8, DEVICE_ADDED: 9, DEVICE_REMOVED: 10, CLUSTER_CHANGED: 11 } } } } } } } } } } });}) ? o.apply(t, r) : o) || (e.exports = i);}, function (e, t, n) {var o, r, i;r = [n(0)], void 0 === (i = "function" == typeof (o = function o(e) {"use strict";return (e.roots.info || (e.roots.info = new e.Root())).addJSON({ im: { nested: { floo: { nested: { protobuf: { nested: { Info: { fields: { sdk_vsn: { type: "string", id: 1 }, network: { type: "Network", id: 2 }, content: { type: "string", id: 3 } }, nested: { Network: { values: { WIRE: 0, WIFI: 1, NET_2G: 2, NET_3G: 3, NET_4G: 4, NET_5G: 5, UNKNOWN: 6 } } } } } } } } } } });}) ? o.apply(t, r) : o) || (e.exports = i);}, function (e, t, n) {var o, r, i;r = [n(0)], void 0 === (i = "function" == typeof (o = function o(e) {"use strict";return (e.roots.conversation || (e.roots.conversation = new e.Root())).addJSON({ im: { nested: { floo: { nested: { protobuf: { nested: { Conversation: { fields: { type: { type: "Type", id: 1 }, operation: { type: "ConversationOperation", id: 2 } }, nested: { Type: { values: { UNKNOWN: 0, OPER: 1 } } } }, ConversationOperation: { fields: { type: { type: "OpType", id: 1 }, xid: { type: "XID", id: 2 } }, nested: { OpType: { values: { UNKNOWN: 0, DELETE: 1, DELETE_EVERYWHERE: 2 } } } }, XID: { fields: { uid: { type: "uint64", id: 1 }, deviceSN: { type: "uint32", id: 2 } } } } } } } } } });}) ? o.apply(t, r) : o) || (e.exports = i);}, function (e, t, n) {"use strict";e.exports = function (e) {return encodeURIComponent(e).replace(/[!'()*]/g, function (e) {return "%" + e.charCodeAt(0).toString(16).toUpperCase();});};}, function (e, t, n) {"use strict";var o = new RegExp("%[a-f0-9]{2}", "gi"),r = new RegExp("(%[a-f0-9]{2})+", "gi");function i(e, t) {try {return decodeURIComponent(e.join(""));} catch (e) {}if (1 === e.length) return e;t = t || 1;var n = e.slice(0, t),o = e.slice(t);return Array.prototype.concat.call([], i(n), i(o));}function s(e) {try {return decodeURIComponent(e);} catch (r) {for (var t = e.match(o), n = 1; n < t.length; n++) {t = (e = i(t, n).join("")).match(o);}return e;}}e.exports = function (e) {if ("string" != typeof e) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");try {return e = e.replace(/\+/g, " "), decodeURIComponent(e);} catch (t) {return function (e) {for (var t = { "%FE%FF": "��", "%FF%FE": "��" }, n = r.exec(e); n;) {try {t[n[0]] = decodeURIComponent(n[0]);} catch (e) {var o = s(n[0]);o !== n[0] && (t[n[0]] = o);}n = r.exec(e);}t["%C2"] = "�";for (var i = Object.keys(t), a = 0; a < i.length; a++) {var u = i[a];e = e.replace(new RegExp(u, "g"), t[u]);}return e;}(e);}};}, function (e, t, n) {"use strict";e.exports = function (e, t) {if ("string" != typeof e || "string" != typeof t) throw new TypeError("Expected the arguments to be of type `string`");if ("" === t) return [e];var n = e.indexOf(t);return -1 === n ? [e] : [e.slice(0, n), e.slice(n + t.length)];};}, function (e, t) {e.exports = o;var n = null;try {n = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;} catch (e) {}function o(e, t, n) {this.low = 0 | e, this.high = 0 | t, this.unsigned = !!n;}function r(e) {return !0 === (e && e.__isLong__);}o.prototype.__isLong__, Object.defineProperty(o.prototype, "__isLong__", { value: !0 }), o.isLong = r;var i = {},s = {};function a(e, t) {var n, o, r;return t ? (r = 0 <= (e >>>= 0) && e < 256) && (o = s[e]) ? o : (n = c(e, (0 | e) < 0 ? -1 : 0, !0), r && (s[e] = n), n) : (r = -128 <= (e |= 0) && e < 128) && (o = i[e]) ? o : (n = c(e, e < 0 ? -1 : 0, !1), r && (i[e] = n), n);}function u(e, t) {if (isNaN(e)) return t ? v : m;if (t) {if (e < 0) return v;if (e >= h) return A;} else {if (e <= -g) return O;if (e + 1 >= g) return b;}return e < 0 ? u(-e, t).neg() : c(e % f | 0, e / f | 0, t);}function c(e, t, n) {return new o(e, t, n);}o.fromInt = a, o.fromNumber = u, o.fromBits = c;var d = Math.pow;function l(e, t, n) {if (0 === e.length) throw Error("empty string");if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return m;if ("number" == typeof t ? (n = t, t = !1) : t = !!t, (n = n || 10) < 2 || 36 < n) throw RangeError("radix");var o;if ((o = e.indexOf("-")) > 0) throw Error("interior hyphen");if (0 === o) return l(e.substring(1), t, n).neg();for (var r = u(d(n, 8)), i = m, s = 0; s < e.length; s += 8) {var a = Math.min(8, e.length - s),c = parseInt(e.substring(s, s + a), n);if (a < 8) {var p = u(d(n, a));i = i.mul(p).add(u(c));} else i = (i = i.mul(r)).add(u(c));}return i.unsigned = t, i;}function p(e, t) {return "number" == typeof e ? u(e, t) : "string" == typeof e ? l(e, t) : c(e.low, e.high, "boolean" == typeof t ? t : e.unsigned);}o.fromString = l, o.fromValue = p;var f = 4294967296,h = f * f,g = h / 2,y = a(1 << 24),m = a(0);o.ZERO = m;var v = a(0, !0);o.UZERO = v;var _ = a(1);o.ONE = _;var E = a(1, !0);o.UONE = E;var N = a(-1);o.NEG_ONE = N;var b = c(-1, 2147483647, !1);o.MAX_VALUE = b;var A = c(-1, -1, !0);o.MAX_UNSIGNED_VALUE = A;var O = c(0, -2147483648, !1);o.MIN_VALUE = O;var w = o.prototype;w.toInt = function () {return this.unsigned ? this.low >>> 0 : this.low;}, w.toNumber = function () {return this.unsigned ? (this.high >>> 0) * f + (this.low >>> 0) : this.high * f + (this.low >>> 0);}, w.toString = function (e) {if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix");if (this.isZero()) return "0";if (this.isNegative()) {if (this.eq(O)) {var t = u(e),n = this.div(t),o = n.mul(t).sub(this);return n.toString(e) + o.toInt().toString(e);}return "-" + this.neg().toString(e);}for (var r = u(d(e, 6), this.unsigned), i = this, s = "";;) {var a = i.div(r),c = (i.sub(a.mul(r)).toInt() >>> 0).toString(e);if ((i = a).isZero()) return c + s;for (; c.length < 6;) {c = "0" + c;}s = "" + c + s;}}, w.getHighBits = function () {return this.high;}, w.getHighBitsUnsigned = function () {return this.high >>> 0;}, w.getLowBits = function () {return this.low;}, w.getLowBitsUnsigned = function () {return this.low >>> 0;}, w.getNumBitsAbs = function () {if (this.isNegative()) return this.eq(O) ? 64 : this.neg().getNumBitsAbs();for (var e = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (e & 1 << t); t--) {;}return 0 != this.high ? t + 33 : t + 1;}, w.isZero = function () {return 0 === this.high && 0 === this.low;}, w.eqz = w.isZero, w.isNegative = function () {return !this.unsigned && this.high < 0;}, w.isPositive = function () {return this.unsigned || this.high >= 0;}, w.isOdd = function () {return 1 == (1 & this.low);}, w.isEven = function () {return 0 == (1 & this.low);}, w.equals = function (e) {return r(e) || (e = p(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && this.high === e.high && this.low === e.low;}, w.eq = w.equals, w.notEquals = function (e) {return !this.eq(e);}, w.neq = w.notEquals, w.ne = w.notEquals, w.lessThan = function (e) {return this.comp(e) < 0;}, w.lt = w.lessThan, w.lessThanOrEqual = function (e) {return this.comp(e) <= 0;}, w.lte = w.lessThanOrEqual, w.le = w.lessThanOrEqual, w.greaterThan = function (e) {return this.comp(e) > 0;}, w.gt = w.greaterThan, w.greaterThanOrEqual = function (e) {return this.comp(e) >= 0;}, w.gte = w.greaterThanOrEqual, w.ge = w.greaterThanOrEqual, w.compare = function (e) {if (r(e) || (e = p(e)), this.eq(e)) return 0;var t = this.isNegative(),n = e.isNegative();return t && !n ? -1 : !t && n ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1;}, w.comp = w.compare, w.negate = function () {return !this.unsigned && this.eq(O) ? O : this.not().add(_);}, w.neg = w.negate, w.add = function (e) {r(e) || (e = p(e));var t = this.high >>> 16,n = 65535 & this.high,o = this.low >>> 16,i = 65535 & this.low,s = e.high >>> 16,a = 65535 & e.high,u = e.low >>> 16,d = 0,l = 0,f = 0,h = 0;return f += (h += i + (65535 & e.low)) >>> 16, l += (f += o + u) >>> 16, d += (l += n + a) >>> 16, d += t + s, c((f &= 65535) << 16 | (h &= 65535), (d &= 65535) << 16 | (l &= 65535), this.unsigned);}, w.subtract = function (e) {return r(e) || (e = p(e)), this.add(e.neg());}, w.sub = w.subtract, w.multiply = function (e) {if (this.isZero()) return m;if (r(e) || (e = p(e)), n) return c(n.mul(this.low, this.high, e.low, e.high), n.get_high(), this.unsigned);if (e.isZero()) return m;if (this.eq(O)) return e.isOdd() ? O : m;if (e.eq(O)) return this.isOdd() ? O : m;if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();if (e.isNegative()) return this.mul(e.neg()).neg();if (this.lt(y) && e.lt(y)) return u(this.toNumber() * e.toNumber(), this.unsigned);var t = this.high >>> 16,o = 65535 & this.high,i = this.low >>> 16,s = 65535 & this.low,a = e.high >>> 16,d = 65535 & e.high,l = e.low >>> 16,f = 65535 & e.low,h = 0,g = 0,v = 0,_ = 0;return v += (_ += s * f) >>> 16, g += (v += i * f) >>> 16, v &= 65535, g += (v += s * l) >>> 16, h += (g += o * f) >>> 16, g &= 65535, h += (g += i * l) >>> 16, g &= 65535, h += (g += s * d) >>> 16, h += t * f + o * l + i * d + s * a, c((v &= 65535) << 16 | (_ &= 65535), (h &= 65535) << 16 | (g &= 65535), this.unsigned);}, w.mul = w.multiply, w.divide = function (e) {if (r(e) || (e = p(e)), e.isZero()) throw Error("division by zero");var t, o, i;if (n) return this.unsigned || -2147483648 !== this.high || -1 !== e.low || -1 !== e.high ? c((this.unsigned ? n.div_u : n.div_s)(this.low, this.high, e.low, e.high), n.get_high(), this.unsigned) : this;if (this.isZero()) return this.unsigned ? v : m;if (this.unsigned) {if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return v;if (e.gt(this.shru(1))) return E;i = v;} else {if (this.eq(O)) return e.eq(_) || e.eq(N) ? O : e.eq(O) ? _ : (t = this.shr(1).div(e).shl(1)).eq(m) ? e.isNegative() ? _ : N : (o = this.sub(e.mul(t)), i = t.add(o.div(e)));if (e.eq(O)) return this.unsigned ? v : m;if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();if (e.isNegative()) return this.div(e.neg()).neg();i = m;}for (o = this; o.gte(e);) {t = Math.max(1, Math.floor(o.toNumber() / e.toNumber()));for (var s = Math.ceil(Math.log(t) / Math.LN2), a = s <= 48 ? 1 : d(2, s - 48), l = u(t), f = l.mul(e); f.isNegative() || f.gt(o);) {f = (l = u(t -= a, this.unsigned)).mul(e);}l.isZero() && (l = _), i = i.add(l), o = o.sub(f);}return i;}, w.div = w.divide, w.modulo = function (e) {return r(e) || (e = p(e)), n ? c((this.unsigned ? n.rem_u : n.rem_s)(this.low, this.high, e.low, e.high), n.get_high(), this.unsigned) : this.sub(this.div(e).mul(e));}, w.mod = w.modulo, w.rem = w.modulo, w.not = function () {return c(~this.low, ~this.high, this.unsigned);}, w.and = function (e) {return r(e) || (e = p(e)), c(this.low & e.low, this.high & e.high, this.unsigned);}, w.or = function (e) {return r(e) || (e = p(e)), c(this.low | e.low, this.high | e.high, this.unsigned);}, w.xor = function (e) {return r(e) || (e = p(e)), c(this.low ^ e.low, this.high ^ e.high, this.unsigned);}, w.shiftLeft = function (e) {return r(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? c(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : c(0, this.low << e - 32, this.unsigned);}, w.shl = w.shiftLeft, w.shiftRight = function (e) {return r(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? c(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : c(this.high >> e - 32, this.high >= 0 ? 0 : -1, this.unsigned);}, w.shr = w.shiftRight, w.shiftRightUnsigned = function (e) {if (r(e) && (e = e.toInt()), 0 === (e &= 63)) return this;var t = this.high;return e < 32 ? c(this.low >>> e | t << 32 - e, t >>> e, this.unsigned) : c(32 === e ? t : t >>> e - 32, 0, this.unsigned);}, w.shru = w.shiftRightUnsigned, w.shr_u = w.shiftRightUnsigned, w.toSigned = function () {return this.unsigned ? c(this.low, this.high, !1) : this;}, w.toUnsigned = function () {return this.unsigned ? this : c(this.low, this.high, !0);}, w.toBytes = function (e) {return e ? this.toBytesLE() : this.toBytesBE();}, w.toBytesLE = function () {var e = this.high,t = this.low;return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24];}, w.toBytesBE = function () {var e = this.high,t = this.low;return [e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t];}, o.fromBytes = function (e, t, n) {return n ? o.fromBytesLE(e, t) : o.fromBytesBE(e, t);}, o.fromBytesLE = function (e, t) {return new o(e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24, e[4] | e[5] << 8 | e[6] << 16 | e[7] << 24, t);}, o.fromBytesBE = function (e, t) {return new o(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7], e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3], t);};}, function (e, t) {e.exports = function (e, t, n) {var o = n || 8192,r = o >>> 1,i = null,s = o;return function (n) {if (n < 1 || n > r) return e(n);s + n > o && (i = e(o), s = 0);var a = t.call(i, s, s += n);return 7 & s && (s = 1 + (7 | s)), a;};};}, function (e, t) {function n(e) {return "undefined" != typeof Float32Array ? function () {var t = new Float32Array([-0]),n = new Uint8Array(t.buffer),o = 128 === n[3];function r(e, o, r) {t[0] = e, o[r] = n[0], o[r + 1] = n[1], o[r + 2] = n[2], o[r + 3] = n[3];}function i(e, o, r) {t[0] = e, o[r] = n[3], o[r + 1] = n[2], o[r + 2] = n[1], o[r + 3] = n[0];}function s(e, o) {return n[0] = e[o], n[1] = e[o + 1], n[2] = e[o + 2], n[3] = e[o + 3], t[0];}function a(e, o) {return n[3] = e[o], n[2] = e[o + 1], n[1] = e[o + 2], n[0] = e[o + 3], t[0];}e.writeFloatLE = o ? r : i, e.writeFloatBE = o ? i : r, e.readFloatLE = o ? s : a, e.readFloatBE = o ? a : s;}() : function () {function t(e, t, n, o) {var r = t < 0 ? 1 : 0;if (r && (t = -t), 0 === t) e(1 / t > 0 ? 0 : 2147483648, n, o);else if (isNaN(t)) e(2143289344, n, o);else if (t > 34028234663852886e22) e((r << 31 | 2139095040) >>> 0, n, o);else if (t < 11754943508222875e-54) e((r << 31 | Math.round(t / 1401298464324817e-60)) >>> 0, n, o);else {var i = Math.floor(Math.log(t) / Math.LN2);e((r << 31 | i + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -i) * 8388608)) >>> 0, n, o);}}function n(e, t, n) {var o = e(t, n),r = 2 * (o >> 31) + 1,i = o >>> 23 & 255,s = 8388607 & o;return 255 === i ? s ? NaN : r * (1 / 0) : 0 === i ? 1401298464324817e-60 * r * s : r * Math.pow(2, i - 150) * (s + 8388608);}e.writeFloatLE = t.bind(null, o), e.writeFloatBE = t.bind(null, r), e.readFloatLE = n.bind(null, i), e.readFloatBE = n.bind(null, s);}(), "undefined" != typeof Float64Array ? function () {var t = new Float64Array([-0]),n = new Uint8Array(t.buffer),o = 128 === n[7];function r(e, o, r) {t[0] = e, o[r] = n[0], o[r + 1] = n[1], o[r + 2] = n[2], o[r + 3] = n[3], o[r + 4] = n[4], o[r + 5] = n[5], o[r + 6] = n[6], o[r + 7] = n[7];}function i(e, o, r) {t[0] = e, o[r] = n[7], o[r + 1] = n[6], o[r + 2] = n[5], o[r + 3] = n[4], o[r + 4] = n[3], o[r + 5] = n[2], o[r + 6] = n[1], o[r + 7] = n[0];}function s(e, o) {return n[0] = e[o], n[1] = e[o + 1], n[2] = e[o + 2], n[3] = e[o + 3], n[4] = e[o + 4], n[5] = e[o + 5], n[6] = e[o + 6], n[7] = e[o + 7], t[0];}function a(e, o) {return n[7] = e[o], n[6] = e[o + 1], n[5] = e[o + 2], n[4] = e[o + 3], n[3] = e[o + 4], n[2] = e[o + 5], n[1] = e[o + 6], n[0] = e[o + 7], t[0];}e.writeDoubleLE = o ? r : i, e.writeDoubleBE = o ? i : r, e.readDoubleLE = o ? s : a, e.readDoubleBE = o ? a : s;}() : function () {function t(e, t, n, o, r, i) {var s = o < 0 ? 1 : 0;if (s && (o = -o), 0 === o) e(0, r, i + t), e(1 / o > 0 ? 0 : 2147483648, r, i + n);else if (isNaN(o)) e(0, r, i + t), e(2146959360, r, i + n);else if (o > 17976931348623157e292) e(0, r, i + t), e((s << 31 | 2146435072) >>> 0, r, i + n);else {var a;if (o < 22250738585072014e-324) e((a = o / 5e-324) >>> 0, r, i + t), e((s << 31 | a / 4294967296) >>> 0, r, i + n);else {var u = Math.floor(Math.log(o) / Math.LN2);1024 === u && (u = 1023), e(4503599627370496 * (a = o * Math.pow(2, -u)) >>> 0, r, i + t), e((s << 31 | u + 1023 << 20 | 1048576 * a & 1048575) >>> 0, r, i + n);}}}function n(e, t, n, o, r) {var i = e(o, r + t),s = e(o, r + n),a = 2 * (s >> 31) + 1,u = s >>> 20 & 2047,c = 4294967296 * (1048575 & s) + i;return 2047 === u ? c ? NaN : a * (1 / 0) : 0 === u ? 5e-324 * a * c : a * Math.pow(2, u - 1075) * (c + 4503599627370496);}e.writeDoubleLE = t.bind(null, o, 0, 4), e.writeDoubleBE = t.bind(null, r, 4, 0), e.readDoubleLE = n.bind(null, i, 0, 4), e.readDoubleBE = n.bind(null, s, 4, 0);}(), e;}function o(e, t, n) {t[n] = 255 & e, t[n + 1] = e >>> 8 & 255, t[n + 2] = e >>> 16 & 255, t[n + 3] = e >>> 24;}function r(e, t, n) {t[n] = e >>> 24, t[n + 1] = e >>> 16 & 255, t[n + 2] = e >>> 8 & 255, t[n + 3] = 255 & e;}function i(e, t) {return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;}function s(e, t) {return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;}e.exports = n(n);}, function (e, t, n) {"use strict";e.exports = function (e, t) {var n = new Array(arguments.length - 1),o = 0,r = 2,i = !0;for (; r < arguments.length;) {n[o++] = arguments[r++];}return new Promise(function (r, s) {n[o] = function (e) {if (i) if (i = !1, e) s(e);else {for (var t = new Array(arguments.length - 1), n = 0; n < t.length;) {t[n++] = arguments[n];}r.apply(null, t);}};try {e.apply(t || null, n);} catch (e) {i && (i = !1, s(e));}});};}, function (e, t, n) {"use strict";function o() {this._listeners = {};}e.exports = o, o.prototype.on = function (e, t, n) {return (this._listeners[e] || (this._listeners[e] = [])).push({ fn: t, ctx: n || this }), this;}, o.prototype.off = function (e, t) {if (void 0 === e) this._listeners = {};else if (void 0 === t) this._listeners[e] = [];else for (var n = this._listeners[e], o = 0; o < n.length;) {n[o].fn === t ? n.splice(o, 1) : ++o;}return this;}, o.prototype.emit = function (e) {var t = this._listeners[e];if (t) {for (var n = [], o = 1; o < arguments.length;) {n.push(arguments[o++]);}for (o = 0; o < t.length;) {t[o].fn.apply(t[o++].ctx, n);}}return this;};}, function (e, t) {var n = e.exports,o = n.isAbsolute = function (e) {return /^(?:\/|\w+:)/.test(e);},r = n.normalize = function (e) {var t = (e = e.replace(/\\/g, "/").replace(/\/{2,}/g, "/")).split("/"),n = o(e),r = "";n && (r = t.shift() + "/");for (var i = 0; i < t.length;) {".." === t[i] ? i > 0 && ".." !== t[i - 1] ? t.splice(--i, 2) : n ? t.splice(i, 1) : ++i : "." === t[i] ? t.splice(i, 1) : ++i;}return r + t.join("/");};n.resolve = function (e, t, n) {return n || (t = r(t)), o(t) ? t : (n || (e = r(e)), (e = e.replace(/(?:\/|^)[^/]+$/, "")).length ? r(e + "/" + t) : t);};}, function (e, t, n) {"use strict";n.r(t), n.d(t, "flooim", function () {return Qr;});var o = {};n.r(o), n.d(o, "STATIC_FRAME_VSN", function () {return p;}), n.d(o, "STATIC_FRAME_COMMAND", function () {return f;}), n.d(o, "STATIC_FRAME_COMPRESS_METHOD", function () {return h;}), n.d(o, "STATIC_FRAME_ERROR_STATUS", function () {return g;}), n.d(o, "STATIC_FRAME_OSTYPE", function () {return y;}), n.d(o, "STATIC_FRAME_ENCRYPTMETHOD", function () {return m;}), n.d(o, "STATIC_META_NAMESPACE", function () {return v;}), n.d(o, "STATIC_MESSAGE_OPTYPE", function () {return E;}), n.d(o, "STATIC_MESSAGE_TYPE", function () {return _;}), n.d(o, "STATIC_MESSAGE_CONTENT_TYPE", function () {return N;}), n.d(o, "STATIC_MESSAGE_QOS", function () {return b;}), n.d(o, "STATIC_GROUPNOTICE_TYPE", function () {return A;}), n.d(o, "STATIC_INFO_NETWORK", function () {return O;}), n.d(o, "STATIC_USERNOTICE_TYPE", function () {return S;}), n.d(o, "STATIC_ROSTERNONTICE_TYPE", function () {return w;}), n.d(o, "STATIC_CONVERSATION_TYPE", function () {return I;}), n.d(o, "STATIC_CONVERSATION_OPTYPE", function () {return k;}), n.d(o, "STATIC_MESSAGE_STATUS", function () {return R;});var r = {};n.r(r), n.d(r, "getServers", function () {return _e;}), n.d(r, "tokenUser", function () {return Ee;}), n.d(r, "tokenId", function () {return Ne;}), n.d(r, "userRegister", function () {return be;}), n.d(r, "userBindMobile", function () {return Ae;}), n.d(r, "userSendSms", function () {return we;}), n.d(r, "userNameCheck", function () {return Se;}), n.d(r, "userMobileBind", function () {return Ie;}), n.d(r, "userMobileBindSign", function () {return ke;}), n.d(r, "userMobileLogin", function () {return Re;}), n.d(r, "userUpdateMobile", function () {return Oe;}), n.d(r, "captchaImagePost", function () {return Te;}), n.d(r, "captchaSms", function () {return De;}), n.d(r, "rosterAccept", function () {return Me;}), n.d(r, "rosterApply", function () {return Ce;}), n.d(r, "rosterDecline", function () {return Ue;}), n.d(r, "rosterDelete", function () {return xe;}), n.d(r, "rosterExt", function () {return Ge;}), n.d(r, "rosterId", function () {return Le;}), n.d(r, "rosterList", function () {return Pe;}), n.d(r, "rosterListPost", function () {return je;}), n.d(r, "rosterName", function () {return Be;}), n.d(r, "rosterApplylist", function () {return Fe;}), n.d(r, "rosterBlockedlist", function () {return Ve;}), n.d(r, "rosterBlockedAdd", function () {return qe;}), n.d(r, "rosterBlockeRemove", function () {return Je;}), n.d(r, "groupAdminAdd", function () {return Ke;}), n.d(r, "groupAdminList", function () {return Ye;}), n.d(r, "groupAdminRemove", function () {return We;}), n.d(r, "groupAnnouncement", function () {return He;}), n.d(r, "groupAnnouncementDelete", function () {return Ze;}), n.d(r, "groupAnnouncementEdit", function () {return Xe;}), n.d(r, "groupAnnouncementList", function () {return $e;}), n.d(r, "groupCreate", function () {return ze;}), n.d(r, "groupDestroy", function () {return Qe;}), n.d(r, "groupInfo", function () {return et;}), n.d(r, "groupInfoAvatar", function () {return tt;}), n.d(r, "groupInfoDdscription", function () {return nt;}), n.d(r, "groupInfoName", function () {return ot;}), n.d(r, "groupMemberlist", function () {return rt;}), n.d(r, "groupMsgMutemode", function () {return it;}), n.d(r, "groupMsgNotdisturb", function () {return st;}), n.d(r, "groupPubliclist", function () {return at;}), n.d(r, "groupBannedList", function () {return ut;}), n.d(r, "groupBab", function () {return ct;}), n.d(r, "groupUnban", function () {return dt;}), n.d(r, "groupSettings", function () {return lt;}), n.d(r, "groupSettingsAllowmemberinvitation", function () {return pt;}), n.d(r, "groupSettingsAllowmembermodify", function () {return ft;}), n.d(r, "groupSettingsEnablereadack", function () {return ht;}), n.d(r, "groupSettingsHistoryvisible", function () {return gt;}), n.d(r, "groupSettingsRequireadminapproval", function () {return yt;}), n.d(r, "groupTransfer", function () {return mt;}), n.d(r, "groupUserjoined", function () {return vt;}), n.d(r, "groupApply", function () {return _t;}), n.d(r, "groupApplicationlist", function () {return Dt;}), n.d(r, "groupInvitationlist", function () {return Mt;}), n.d(r, "groupApplyHandle", function () {return Et;}), n.d(r, "groupBockedlist", function () {return Nt;}), n.d(r, "groupBlock", function () {return bt;}), n.d(r, "groupUnblock", function () {return At;}), n.d(r, "groupKick", function () {return Ot;}), n.d(r, "groupInvite", function () {return wt;}), n.d(r, "groupInviteHandle", function () {return St;}), n.d(r, "groupInfoBatch", function () {return It;}), n.d(r, "groupMembersDidpayname", function () {return kt;}), n.d(r, "groupLeave", function () {return Rt;}), n.d(r, "groupDisplayname", function () {return Tt;}), n.d(r, "groupFilelist", function () {return Ct;}), n.d(r, "groupFiledelete", function () {return Ut;}), n.d(r, "groupFileupload", function () {return xt;}), n.d(r, "userAuthmode", function () {return Gt;}), n.d(r, "userAvatar", function () {return Lt;}), n.d(r, "userMobile", function () {return Pt;}), n.d(r, "userNickname", function () {return jt;}), n.d(r, "userProfile", function () {return Bt;}), n.d(r, "userProfilePost", function () {return Ft;}), n.d(r, "userPush", function () {return Vt;}), n.d(r, "userPushDetail", function () {return qt;}), n.d(r, "userPushLimit", function () {return Jt;}), n.d(r, "userPushNickname", function () {return Kt;}), n.d(r, "userSettings", function () {return Yt;}), n.d(r, "userSettingsPost", function () {return Wt;}), n.d(r, "userSounds", function () {return Ht;}), n.d(r, "userVibratory", function () {return Zt;}), n.d(r, "bindDeviceToken", function () {return Xt;}), n.d(r, "unbindDeviceToken", function () {return $t;}), n.d(r, "fileForward", function () {return zt;}), n.d(r, "asyncFileUpload", function () {return Qt;}), n.d(r, "fileUploadAvatarUrl", function () {return en;}), n.d(r, "fileUploadGroupAvatarUrl", function () {return tn;}), n.d(r, "fileUploadChatFileUrl", function () {return nn;}), n.d(r, "fileDownloadChatFileUrl", function () {return on;}), n.d(r, "qrcode", function () {return rn;}), n.d(r, "qrlogin", function () {return sn;}), n.d(r, "qrcodeGroupsign", function () {return an;}), n.d(r, "qrcodeGroupinvite", function () {return un;}), n.d(r, "wxbind", function () {return cn;}), n.d(r, "wxlogin", function () {return dn;}), n.d(r, "getStaticContact", function () {return ln;}), n.d(r, "wechatUnbind", function () {return pn;}), n.d(r, "wechatIsbind", function () {return fn;}), n.d(r, "wechatBind", function () {return hn;});var i = {};n.r(i), n.d(i, "decode", function () {return ro;}), n.d(i, "encode", function () {return io;});var s = {};n.r(s), n.d(s, "decode", function () {return Fo;}), n.d(s, "encode", function () {return Vo;});var a = {};n.r(a), n.d(a, "decode", function () {return Ho;}), n.d(a, "encode", function () {return Zo;});var u = [];var c = { error: console.error, log: console.log, info: console.info, warn: console.warn, dir: console.dir, req: function req(e) {u.push(e), u.length > 5 && u.splice(-5);} },d = n(3),l = n.n(d);var p = { XSYNC_V1: 0, XSYNC_V2: 1 },f = { UNREAD: 0, SYNC: 1, NOTICE: 2, PROVISION: 3 },h = { NONE: 0, ZLIB: 1 },g = { UNKNOWN: 0, OK: 1, FAIL: 2, UNKNOWN_COMMAND: 3, PB_PARSER_ERROR: 4, DECRYPT_FAILURE: 5, PUBLIC_KEY_CHANGED: 6, INVALID_TOKEN: 7, INVALID_PARAMETER: 8, UNAUTHORIZED: 9, USER_FROZEN: 10, USER_BANNED: 11, WORD_CENSORED: 12, TOO_MANY_DEVICES: 13, ENCRYPT_METHOD_UNSUPPORTED: 14, DEVICE_GUID_CONFLICT: 15, CHECK_SUM_FAILURE: 16, INVALID_LICENSE: 17, LICENSE_LIMIT: 18, APP_FROZEN: 19 },y = { UNKNOWN: 0, IOS: 1, ANDR: 2, WIN: 3, OSX: 4, LINUX: 5, WEB: 6 },m = { ENCRYPT_NONE: 0, AES_CBC_128: 1, AES_CBC_256: 2, CUSTOM: 3 },v = { UNKNOWN: 0, MESSAGE: 1, GROUP_NOTICE: 2, ROSTER_NOTICE: 3, USER_NOTICE: 4, INFO: 5, CONVERSATION: 6 },_ = { NORMAL: 0, OPER: 1, CHAT: 2, GROUPCHAT: 3 },E = { UNKNOWN: 0, READ_ACK: 1, READ_ALL: 2, READ_CANCEL: 3, DELIVER_ACK: 4, RECALL: 5, DELETE: 6 },N = { TEXT: 0, IMAGE: 1, AUDIO: 2, VIDEO: 3, FILE: 4, LOCATION: 5, COMMAND: 6, FORWARD: 7 },b = { AT_LEAST_ONCE: 0, AT_MOST_ONCE: 1, EXACTLY_ONCE: 2 },A = { UNKNOWN: 0, PRESENCE: 1, ABSENCE: 2, CREATED: 3, DESTROYED: 4, JOINED: 5, LEAVED: 6, APPLYED: 7, APPLY_ACCEPTED: 8, APPLY_DECLINED: 9, INVITED: 10, INVITE_ACCEPTED: 11, INVITE_DECLINED: 12, KICKED: 13, BLOCKED: 14, UNBLOCKED: 15, OWNER_ASSIGNED: 16, ADMIN_GRANTED: 17, ADMIN_REVOKED: 18, MUTED: 19, UNMUTED: 20, BANNED: 21, UNBANNED: 22, INFO_UPDATED: 23, ANNOUNCEMENT_UPDATED: 24, MESSAGE_SETTING: 25, FILE_UPLOADED: 26, FILE_DELETED: 27, FILE_UPDATED: 28 },O = { WIRE: 0, WIFI: 1, NET_2G: 2, NET_3G: 3, NET_4G: 4, NET_5G: 5, UNKNOWN: 6 },w = { UNKNOWN: 0, ADDED: 1, REMOVED: 2, ACCEPTED: 3, DECLINED: 4, BLOCKED: 5, UNBLOCKED: 6, APPLIED: 7, INFO_UPDATED: 8, MUTED: 9, UNMUTED: 10 },S = { UNKNOWN: 0, PASSWORD_CHANGED: 1, FROZEN: 2, REMOVED: 3, KICK_BY_SAME_DEVICE: 4, KICKED_BY_OTHER_DEVICE: 5, INFO_UPDATED: 6, DEVICE_LOGIN: 7, DEVICE_LOGOUT: 8, DEVICE_ADDED: 9, DEVICE_REMOVED: 10, CLUSTER_CHANGED: 11 },I = { UNKNOWN: 0, OPER: 1 },k = { UNKNOWN: 0, DELETE: 1, DELETE_EVERYWHERE: 2 },R = { UNREAD: 0, DELIVERED: 1, READ: 2 },T = function T(e) {if (e instanceof l.a) return e.toString();var t = e.low,n = e.high,_e$unsigned = e.unsigned,o = _e$unsigned === void 0 ? !0 : _e$unsigned;if (void 0 !== t && void 0 !== n) {return new l.a(t, n, o).toString();}var r = typeof e;if ("boolean" === r || "string" === r || "number" === r) return e;if (Array.isArray(e)) {var _t3 = [];return e.forEach(function (e) {void 0 !== e && _t3.push(T(e));}), _t3;}var i = {};return Object.keys(e).forEach(function (t) {void 0 !== e[t] && (i[t] = T(e[t]));}), i;},D = function D(e) {var t = e.low,n = e.high,o = e.unsigned;if (void 0 !== t && void 0 !== n) {return new l.a(t, n, o);}var r = typeof e;if ("boolean" === r || "string" === r || "number" === r) return e;if (Array.isArray(e)) {var _t4 = [];return e.forEach(function (e) {_t4.push(D(e));}), _t4;}var i = {};return Object.keys(e).forEach(function (t) {i[t] = D(e[t]);}), i;},M = function M() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;if ("string" == typeof e) return e - 0;if ("number" == typeof e) return e;var t = e.low,n = e.high,_e$unsigned2 = e.unsigned,o = _e$unsigned2 === void 0 ? !0 : _e$unsigned2;return void 0 !== t && "undefined" !== n ? new l.a(t, n, o).toNumber() : void 0;},C = function C(e) {if ("string" == typeof e) return l.a.fromString(e);var t = e.low,n = e.high,_e$unsigned3 = e.unsigned,o = _e$unsigned3 === void 0 ? !0 : _e$unsigned3;return void 0 !== t && "undefined" !== n ? new l.a(t, n, o) : "number" == typeof e ? l.a.fromNumber(e) : new l.a();},U = function U(e) {return void 0 === e ? "" : "string" == typeof e ? e : "number" == typeof e ? e + "" : void 0 !== e.low && void 0 !== e.high ? new l.a(e.low, e.high, !0).toString() : new l.a(e).toString();},x = function x(e) {if (!e.payload) return e;var t = e.payload,_e$from = e.from,n = _e$from === void 0 ? {} : _e$from,_e$to = e.to,o = _e$to === void 0 ? {} : _e$to,_e$id = e.id,r = _e$id === void 0 ? {} : _e$id,i = e.status,s = e.timestamp,_t$content = t.content,a = _t$content === void 0 ? "" : _t$content,_t$attachment = t.attachment,u = _t$attachment === void 0 ? "" : _t$attachment,_t$ctype = t.ctype,c = _t$ctype === void 0 ? 0 : _t$ctype,d = t.ext,l = t.config,p = t.type;var f = null,h = null;try {f = JSON.parse(u);} catch (e) {}try {h = JSON.parse(l);} catch (e) {}var g = i || t.status,y = { id: U(r), from: U(n.uid), to: U(o.uid), content: a, type: Object.keys(N)[c].toLowerCase(), ext: d, status: g || R.UNREAD, timestamp: U(s || 0), toType: 2 == p ? "roster" : "group" };return f && (y.attach = f), h && (y.config = h), y;},G = function G() {var e = wx.getStorageSync("key_user_id");if (e) return e - 0;},L = function L(e) {return e % 31;},P = function P(e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;if (void 0 === t || void 0 === e) return void c.error("localstorage save error:", e, t);var r = e;if (n) {r = G() + "_" + e;}if (o > 0 && (r = r + "_" + L(o)), "string" == typeof t) return void wx.setStorageSync(r, t);var i;i = Array.isArray(t) ? { data: t } : t;try {var _e5 = JSON.stringify(i);_e5 && wx.setStorageSync(r, _e5);} catch (e) {c.error("stringify error:", e, r, t);}},j = function j(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;if (void 0 === e) return void c.error("localstorage get error:", e);var o = e;if (t) {o = G() + "_" + e;}n > 0 && (o = o + "_" + L(n));var r = wx.getStorageSync(o);if (!r) return;var i = r;try {i = JSON.parse(r);} catch (e) {}return i = D(i), i.data || i;},B = function B(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;var o = e;if (t) {o = G() + "_" + e;}n >= 0 && (o = o + "_" + L(n)), wx.removeStorageSync(o);},F = function F(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;var n;for (n = 0; n < 31; n++) {B(e, t, n);}},V = { saveJoinedGroups: function saveJoinedGroups(e) {if (!e) return;Array.isArray(e) || (e = [e]);var t = e.map(function (e) {return e.group_id || e;}),n = j("key_group_lists") || [],o = Array.from(new Set(t.concat(n)));P("key_group_lists", o);}, removeGroup: function removeGroup(e) {var t = j("key_group_lists") || [],n = t.findIndex(function (t) {return t === e;});n >= 0 && (t.splice(n, 1), P("key_group_lists", t));}, getJoinedGroups: function getJoinedGroups() {return j("key_group_lists");}, saveGroupInfo: function saveGroupInfo(e) {Array.isArray(e) || (e = [e]);var t = j("key_group_infos") || {};e.forEach(function (e) {var n = {},o = e.group_id;Object.keys(e).forEach(function (t) {void 0 !== e[t] && (n[t] = e[t]);}), t[o] = t[o] || {}, Object.assign(t[o], n);}), P("key_group_infos", t);}, getGroupInfo: function getGroupInfo(e) {var t = j("key_group_infos")[e] || {};return Object.assign(t, { group_id: e });}, getGroupInfoList: function getGroupInfoList() {var e = V.getJoinedGroups() || [],t = V.getAllGroupInfos() || {},n = [];return e.forEach(function (e) {var o = t[e] || {};n.push(Object.assign({}, o, { group_id: e }));}), n;}, getAllGroupInfos: function getAllGroupInfos() {return j("key_group_infos") || {};}, saveGroupMembers: function saveGroupMembers(e, t, n) {Array.isArray(t) || (t = [t]);var o = j("key_group_members") || {},r = o[e] || [];if (n) return o[e] = t, void P("key_group_members", o);t.forEach(function (e) {r.findIndex(function (t) {return t === e;}) < 0 && r.push(e);}), o[e] = r;}, removeGroupMembers: function removeGroupMembers(e, t) {var n = (j("key_group_members") || {})[e] || [];t.forEach(function (e) {var t = n.findIndex(function (t) {return t === e;});t >= 0 && n.splice(t, 1);}), P("key_group_members", n);}, getGroupMembers: function getGroupMembers(e) {return (j("key_group_members") || {})[e] || [];}, clear: function clear() {B("key_group_infos"), B("key_group_members"), B("key_group_lists");} };var q = V;var J = function J() {var e = j("key_user_id", !1);if (e) return e - 0;},K = function K() {B("key_user_id");},Y = function Y() {B("key_user_token");},W = function W() {B("key_user_aes_key");},H = function H() {B("key_user_device_sn");};var Z = { saveToken: function saveToken(e) {return P("key_user_token", e);}, getToken: function getToken() {return j("key_user_token");}, deleteToken: Y, getAesKey: function getAesKey() {return j("key_user_aes_key");}, saveAesKey: function saveAesKey(e) {return P("key_user_aes_key", e);}, deleteAesKey: W, saveDeviceSN: function saveDeviceSN(e) {return P("key_user_device_sn", e);}, getDeviceSN: function getDeviceSN() {var e = j("key_user_device_sn");return e || (e = 999999999 + Math.floor(214e4 * Math.random()) + ""), e - 0;}, deleteDeviceSN: H, saveUid: function saveUid(e) {if (!e) throw c.error("uid error:", e), new Error("uid is error ...");P("key_user_id", e + "", !1);}, getUid: J, removeUid: K, getDeviceGuid: function getDeviceGuid() {if (!J()) return "";var e = j("key_user_device_guid");return e || (e = J() + "_" + Math.floor(2147483648 * Math.random()), P("key_user_device_guid", e)), e;}, saveProfile: function saveProfile(e) {return P("key_user_profile", e);}, getProfile: function getProfile() {return j("key_user_profile");}, clear: function clear() {H(), W(), Y(), K();}, saveAppid: function saveAppid(e) {if (!e) throw c.error("Invalid appid :", e), new Error("Invalid appid ...");P("key_app_id", e + "", !1);}, getAppid: function getAppid() {return j("key_app_id", !1);} };var X = {},$ = function $(e) {return void 0 === X[e] && (X[e] = []), X[e];},z = function z(e, t) {var n = $(e).findIndex(function (e) {return e.toString() === t.toString();});n > -1 && $(e).splice(n, 1), $(e).push(t);},Q = function Q(e, t) {var n = $(e).findIndex(function (e) {return e.toString() === t.toString();});n >= 0 && X[e].splice(n, 1);},ee = function ee(e, t) {$(e).forEach(function (e) {e(t);});},te = { saveRecent: function saveRecent(e) {if (function (e) {var t = e.ext;var n = {};try {n = JSON.parse(t);} catch (e) {}if (void 0 !== n.input_status) {n.input_status;return !0;}return !1;}(e)) return;var t = e.from,n = e.to,o = e.type,r = e.toType,i = e.attach,s = e.ext,a = e.timestamp;var u = e.content;if (!u && !i) return void (s && s.typing && ee("onInputStatusMessage", { from: t, to: n, ext: s }));"text" != o && (u = o);var c = M(n);var d = Z.getUid();c === d && (c = M(t));var l = j("key_recent_store") || [],p = l.findIndex(function (e) {return e.type === r && e.id === c;});p > -1 && l.splice(p, 1), l.unshift({ type: r, id: c, content: u, ext: s, timestamp: a }), P("key_recent_store", l), ee("recentlistUpdate");}, saveUnreadRecent: function saveUnreadRecent(e, t) {e.forEach(function (e) {var n = t,o = j("key_recent_store") || [];var r = "",i = "";var s = o.findIndex(function (t) {return t.type === n && t.id === e;});s > -1 && (r = o[s].content, i = o[s].timestamp, o.splice(s, 1)), o.unshift({ type: n, id: e, content: r, timestamp: i }), P("key_recent_store", o);}), ee("recentlistUpdate");}, getRecents: function getRecents() {var e = j("key_recent_store") || [],t = e.filter(function (e) {return "roster" == e.type;}).map(function (e) {return e.id;});return ee("imGetRecent", t), e;}, getRecentById: function getRecentById(e) {var t = j("key_recent_store") || [],n = t.findIndex(function (t) {return t.id + "" == e + "";});if (n < 0) return { idx: n };var o = t[n].type;return { idx: n, id: e, type: o };}, deleteRecentById: function deleteRecentById(e) {var _te$getRecentById = te.getRecentById(e),t = _te$getRecentById.idx;if (t < 0) return;var n = j("key_recent_store") || [];n.splice(t, 1), P("key_recent_store", n);}, clear: function clear() {B("key_recent_store");} };var ne = te;var oe = function oe(e) {var t = e.payload;if (!t) return !1;var n = t.type,_t$operation = t.operation,o = _t$operation === void 0 ? {} : _t$operation;if (!o || n !== _.OPER) return !1;var r = o.type;return r === E.READ_ACK || r == E.READ_ALL;},re = function re(e, t) {var n = C(t.id);if (0 === e.length) e.push(t);else {var _o2 = e[0],_r3 = e[e.length - 1];if (-1 === n.comp(C(_o2.id))) e.unshift(t);else if (1 === n.comp(C(_r3.id))) e.push(t);else {var _o3 = 0,_r4 = 0;for (; _o3 < e.length;) {var _t5 = e[_o3],_i8 = n.comp(C(_t5.id));if (0 === _i8 && (_r4 = 1), 1 !== _i8) break;_o3++;}e.splice(_o3, _r4, t);}}return e;},ie = { saveSendingRosterMessage: function saveSendingRosterMessage(e) {var t = j("key_roster_sending_message") || [];t.push(e);var n = t.length;n > 100 && t.splice(0, n - 100), P("key_roster_sending_message", t);var o = e.to,r = e.id;ee("onSendingMessageStatusChanged", { status: "sending", uid: o.uid, mid: r });}, dealSendedRosterMessage: function dealSendedRosterMessage(e) {var t = e.client_mid,n = e.server_mid,o = j("key_roster_sending_message") || [];if (!n) {c.log("===================== there is something error:=============="), c.log(e);var _n4 = o.findIndex(function (e) {return M(e.id) === M(t);});if (_n4 > -1) {(j("key_roster_sending_message") || []).splice(_n4, 1);}return;}var r = o.findIndex(function (e) {return M(e.id) === M(t);});if (r > -1) {var _e6 = o[r];_e6.id = n;var _i9 = x(_e6);_i9.status = R.UNREAD, ie.saveRosterMessage(_i9), _i9.toType = "roster", ne.saveRecent(_i9), o.splice(r, 1), P("key_roster_sending_message", o), ee("onRosterMessage", _i9), oe(_i9) || ee("onSendingMessageStatusChanged", { status: "sent", mid: M(t) });}}, saveRosterMessage: function saveRosterMessage(e) {var t = e.from,n = e.to,o = e.type;if ("command" == o || "forward" == o) return;var r = M(t),i = M(Z.getUid()),s = M(n);var a = r === i ? s : r;var u = j("key_roster_message_store", !0, a) || {},c = u[a] || [];re(c, e), c.length > 100 ? u[a] = c.slice(c.length - 100) : u[a] = c, P("key_roster_message_store", u, !0, a);}, getRosterMessage: function getRosterMessage(e) {return (j("key_roster_message_store", !0, e) || {})[e] || [];}, saveFormatedRosterMessage: function saveFormatedRosterMessage(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];var n = j("key_roster_message_store", !0, e) || {};n[e] = t, P("key_roster_message_store", n, !0, e);}, getRosterUnreadMessageIdsByRosterid: function getRosterUnreadMessageIdsByRosterid(e) {var t = (j("key_roster_message_store", !0, e) || {})[e] || [],n = [];return t.forEach(function (e) {var _e$status = e.status,t = _e$status === void 0 ? R.READ : _e$status,o = e.id;t == R.UNREAD && n.push(o);}), n;}, deleteRosterMessageByRosterId: function deleteRosterMessageByRosterId(e) {var t = j("key_roster_message_store", !0, e) || {};t[e] && delete t[e], P("key_roster_message_store", t, !0, e);}, deleteSingleRosterMessage: function deleteSingleRosterMessage(e, t) {var n = j("key_roster_message_store", !0, e) || {},o = U(t),r = n[e] || [],i = r.findIndex(function (e) {return U(e.id) === o;});i > -1 && (r.splice(i, 1), n[e] = r, P("key_roster_message_store", n, !0, e));}, saveSendingGroupMessage: function saveSendingGroupMessage(e) {var t = j("key_group_sending_message") || [];t.push(e);var n = t.length;n > 100 && t.splice(0, n - 100), P("key_group_sending_message", t);var o = e.to,r = e.id;ee("onSendingMessageStatusChanged", { status: "sending", uid: o.uid, mid: r });}, dealSendedGroupMessage: function dealSendedGroupMessage(e) {var t = e.client_mid,n = e.server_mid,o = j("key_group_sending_message") || [],r = o.findIndex(function (e) {return M(e.id) === M(t);});if (r > -1) {var _e7 = o[r];_e7.id = n;var _i10 = x(_e7);_i10.status = R.UNREAD, ie.saveGroupMessage(_i10), _i10.toType = "group", ne.saveRecent(_i10), o.splice(r, 1), P("key_group_sending_message", o), ee("onGroupMessage", _i10), oe(_i10) || ee("onSendingMessageStatusChanged", { status: "sent", mid: M(t) });}}, saveGroupMessage: function saveGroupMessage(e) {var t = e.to,n = e.type;if ("command" == n || "forward" == n) return;var o = M(t),r = j("key_group_message_store", !0, o) || {},i = r[o] || [];re(i, e), i.length > 100 ? r[o] = i.slice(i.length - 100) : r[o] = i, P("key_group_message_store", r, !0, o);}, getGroupMessage: function getGroupMessage(e) {return (j("key_group_message_store", !0, e) || {})[e] || [];}, saveFormatedGroupMessage: function saveFormatedGroupMessage(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];var n = j("key_group_message_store", !0, e) || {};n[e] = t, P("key_group_message_store", n, !0, e);}, getGroupUnreadMessageIdsByGid: function getGroupUnreadMessageIdsByGid(e) {var t = (j("key_group_message_store", !0, e) || {})[e] || [],n = [];return t.forEach(function (e) {var _e$r = e.r,t = _e$r === void 0 ? !1 : _e$r,o = e.id;!t && n.push(o);}), n;}, deleteGroupMessageByGid: function deleteGroupMessageByGid(e) {var t = j("key_group_message_store", !0, e) || {};t[e] && delete t[e], P("key_group_message_store", t, !0, e);}, deleteSingleGroupMessage: function deleteSingleGroupMessage(e, t) {var n = j("key_group_message_store", !0, e) || {};t = U(t);var o = n[e] || [],r = o.findIndex(function (e) {return U(e.id) === t;});r > -1 && (o.splice(r, 1), n[e] = o, P("key_group_message_store", n, !0, e));}, getUnreadByRosterId: function getUnreadByRosterId(e) {var t = ie.getRosterMessage(e) || [];var n = 0;var o = Z.getUid();return t.forEach(function (e) {var t = e.from,r = e.status,i = M(t);i > 0 && i !== o && r != R.READ && n++;}), n;}, getUnreadByGroupId: function getUnreadByGroupId(e) {var t = ie.getGroupMessage(e) || [];var n = 0;var o = Z.getUid();return t.forEach(function (e) {var t = e.from,r = e.status,i = M(t);i > 0 && i !== o && r != R.READ && n++;}), n;}, getRosterMessageById: function getRosterMessageById(e, t) {var n = j("key_roster_message_store", !0, e) || {};for (var o in n) {var _e8 = n[o];if (_e8 && _e8.length) {var _n5 = _e8.find(function (e) {return e.id == t;});if (_n5) return _n5;}}}, getGroupMessageById: function getGroupMessageById(e, t) {var n = j("key_group_message_store", !0, e) || {};for (var o in n) {var _e9 = n[o];if (_e9 && _e9.length) {var _n6 = _e9.find(function (e) {return e.id == t;});if (_n6) return _n6;}}}, clear: function clear(e, t) {"group" == t ? ie.deleteGroupMessageByGid(e) : ie.deleteRosterMessageByRosterId(e);}, clearAll: function clearAll() {F("key_roster_message_store"), F("key_group_message_store");} };var se = ie;var ae = { saveNotice: function saveNotice(e) {var t = j("key_notice_store") || [];t.push(e);var n = t.length;n > 50 && t.splice(0, n - 50), P("key_notice_store", t);}, getNotice: function getNotice() {return j("key_notice_store") || [];}, removeNotice: function removeNotice() {} };var ue = { saveRosterList: function saveRosterList() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];Array.isArray(e) || (e = [e]);var t = e.map(function (e) {return e.roster_user_id || e.user_id || e;}),n = ue.getRosterList() || [];var o;o = Array.isArray(n) ? Array.from(new Set(n.concat(t))) : t, P("key_roster_lists", o), ue.saveRosterInfo(e);}, getRosterList: function getRosterList() {return j("key_roster_lists");}, getRosterInfoList: function getRosterInfoList() {var e = ue.getRosterList() || [],t = ue.getAllRosterInfos() || {},n = [];return e.forEach(function (e) {var o = t[e] || {};n.push(Object.assign({}, o, { user_id: e }));}), n;}, removeRoster: function removeRoster(e) {var t = ue.getRosterList(),n = t.indexOf(e);n >= 0 && t.splice(n, 1), P("key_roster_lists", t);}, removeRosterList: function removeRosterList() {return B("key_roster_lists");}, saveRosterInfo: function saveRosterInfo() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];Array.isArray(e) || (e = [e]);var t = ue.getAllRosterInfos() || {};e.forEach(function (e) {var n = e.user_id,o = {};Object.keys(e).forEach(function (t) {var n = e[t];void 0 !== n && (o[t] = n);}), n && (t[n] = t[n] || {}, Object.assign(t[n], o));}), P("key_roster_infos", t);}, getRosterInfo: function getRosterInfo(e) {var t = (j("key_roster_infos") || {})[e];return t && Object.assign(t, { user_id: e });}, getAllRosterInfos: function getAllRosterInfos() {return j("key_roster_infos");}, clear: function clear() {B("key_roster_infos"), B("key_roster_lists");} };var ce = ue,de = n(14),le = n.n(de);var pe = { errTimer: null, errCount: 0 },fe = "";z("refresh_ratel", function (e) {e && (fe = e);});var he = ["app_dns", "app/captcha/image", "app/captcha/sms", "app/captcha/sms_web", "app/user/info_pwd", "app/wechat_login", "mobile_bind_with_sign", "qr_code", "qr_login", "token/id", "token/user", "user/register"],ge = function ge(e) {var t = Z.getToken(),n = Z.getAppid();if (function (e) {var t = !0;return he.forEach(function (n) {e.indexOf(n) > -1 && (t = !1);}), t;}(e) && !t) throw ee("flooNotice", { category: "action", desc: "relogin" }), new Error("you should login ...");return { "access-token": t, app_id: n };},ye = function ye(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "get";var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;var i = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};c.log("========request=============", e, t, n, o, r);var s = function () {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];var n = [];return t.forEach(function (t) {if ("string" == typeof t && void 0 === e[t] && n.push(t + " can not be null.."), Array.isArray(t)) {var _o4 = !1;t.forEach(function (t) {void 0 !== e[t] && (_o4 = !0);}), _o4 || n.push(t.join("、") + " can not be all null");}}), n;}(n, o);if (s.length) {var _e10 = s.join(",");return Promise.reject(new Error(_e10));}var a = {};var u = t.toLowerCase();var d;"get" === u || "post" === u && r ? (e.indexOf("?") > 0 ? e += "&" : e += "?", e += le.a.stringify(n)) : ((d = n).group_id && (d.group_id = d.group_id - 0), d.user_id && (d.user_id = d.user_id - 0), d.new_owner && (d.new_owner = d.new_owner - 0), d.apply_approval && (d.apply_approval = d.apply_approval - 0), d.duration && (d.duration = d.duration - 0), d.limit && (d.limit = d.limit - 0), d.version && (d.version = d.version - 0), d.announcement_id && (d.announcement_id = d.announcement_id - 0), d.user_list && Array.isArray(d.user_list) && (d.user_list = d.user_list.map(function (e) {return e - 0;})), d.user_list && Array.isArray(d.user_list) && (d.user_list = d.user_list.map(function (e) {return e - 0;})), d.file_list && Array.isArray(d.file_list) && (d.file_list = d.file_list.map(function (e) {return e - 0;})), a = d);var l = i.headers || ge(e);if (e.indexOf("http") < 0 && (e = fe + e), i.operation && "upload_file" === i.operation) return new Promise(function (t, o) {var r = { url: e, header: l, filePath: n.filePath, formData: n.formData, name: n.name, success: function success(e) {me(), 200 === e.statusCode ? (console.log("Upload file success: ", e), t(e.tempFilePath)) : (console.error("Upload file error: ", e), o(e));}, fail: function fail(e) {ve(), o(e);} };wx.uploadFile(r);});if (i.operation && "download_file" === i.operation) return new Promise(function (t, n) {var o = { url: e, header: l, success: function success(e) {me(), 200 === e.statusCode ? (console.log("Download file success: ", e), t(e.tempFilePath)) : (console.error("Download file error: ", e), n(e));}, fail: function fail(e) {ve(), n(e);} };wx.downloadFile(o);});var p = i.content_type || "application/json";return l = Object.assign(l, { "Content-Type": p }), new Promise(function (n, o) {var r = { url: e, data: a, header: l, method: t, dataType: "json", success: function success(t) {me();var _t$data = t.data,r = _t$data === void 0 ? {} : _t$data;if (i.headers && 0 !== Object.keys(i.headers).length) {if ("boolean" == typeof r.data && r.data) return;if ("string" == typeof r.Status && "OK" === r.Status) return;return console.log("====== request got unkonwn response, ", t), Promise.reject({ config: i, url: e });}var s = r.data,a = r.code,u = r.message;200 === a ? (c.log("======request success, ", e, s), n(s)) : (402 === a && ee("flooNotice", { category: "action", desc: "relogin" }), c.req(e + "" == "" + u), o({ message: u, url: e, data: r }));}, fail: function fail(e) {ve(), o(e);}, complete: function complete() {} };wx.request(r);});};function me() {pe.errTimer && clearTimeout(pe.errTimer), pe.errTimer = null, pe.errCount = 0;}function ve() {pe.errTimer && clearTimeout(pe.errTimer), pe.errTimer = null, pe.errCount = pe.errCount + 1, pe.errCount >= 5 ? (pe.errCount = 0, ee("ratelError")) : pe.errTimer = setTimeout(function () {pe.errCount = 0;}, 18e5);}var _e = function _e(e, t) {return ye(e, "get", t, ["app_id"], !0);},Ee = function Ee(e) {return ye("/token/user", "post", e, [["mobile", "name"], "password"]);},Ne = function Ne(e) {return ye("/token/id", "post", e, ["user_id", "password"]);},be = function be(e) {return ye("/user/register/v2", "post", e, ["username", "password"]);},Ae = function Ae(e) {return ye("/app/user/mobile_bind", "post", e, ["captcha", "mobile"]);},Oe = function Oe(e) {return ye("/app/user/mobile_update", "post", e, ["mobile"]);},we = function we(e) {return ye("/app/captcha/sms", "get", e, ["mobile"], !0);},Se = function Se(e) {return ye("/app/user/name_check", "get", e, ["username"], !0);},Ie = function Ie(e) {return ye("/app/user/mobile_bind", "post", e, ["captcha", "mobile"]);},ke = function ke(e) {return ye("/app/user/mobile_bind_with_sign", "post", e, ["sign", "mobile"]);},Re = function Re(e) {return ye("/app/user/info_pwd", "get", e, ["captcha", "mobile"], !0);},Te = function Te(e) {return ye("/app/captcha/image", "post", e, []);},De = function De(e) {return ye("/app/captcha/sms_web", "get", e, ["captcha", "image_id", "mobile"], !0);},Me = function Me(e) {return ye("/roster/accept", "post", e, ["user_id"], !0);},Ce = function Ce(e) {return ye("/roster/apply", "post", e, ["user_id", "alias"]);},Ue = function Ue(e) {return ye("/roster/decline", "post", e, ["user_id"]);},xe = function xe(e) {return ye("/roster/delete", "post", e, ["user_id"], !0);},Ge = function Ge(e) {return ye("/roster/ext", "post", e, ["user_id", "ext"]);},Le = function Le(e) {return ye("/roster/id", "get", e, ["user_id"]);},Pe = function Pe(e) {return ye("/roster/list", "get", e, []);},je = function je(e) {return ye("/roster/list", "post", e, ["list"]);},Be = function Be(e) {return ye("/roster/name", "get", e, ["username"]);},Fe = function Fe(e) {return ye("/roster/apply/list", "get", e, ["cursor"], !0);},Ve = function Ve(e) {return ye("/roster/blocked_list", "get", e, [""], !0);},qe = function qe(e) {return ye("/roster/block", "post", e, ["user_id"], !0);},Je = function Je(e) {return ye("/roster/unblock", "post", e, ["user_id"], !0);},Ke = function Ke(e) {return ye("/group/admin/add", "post", e, ["group_id", "user_list"]);},Ye = function Ye(e) {return ye("/group/admin_list", "get", e, ["group_id"], !0);},We = function We(e) {return ye("/group/admin/remove", "post", e, ["group_id", "user_list"]);},He = function He(e) {return ye("/group/announcement", "get", e, ["announcement_id", "group_id"]);},Ze = function Ze(e) {return ye("/group/announcement/delete", "post", e, ["announcement_id", "group_id"], !0);},Xe = function Xe(e) {return ye("/group/announcement/edit", "post", e, ["group_id", "content", "title"]);},$e = function $e(e) {return ye("/group/announcement/list", "get", e, ["group_id"], !0);},ze = function ze(e) {return ye("/group/create", "post", e, ["name"]);},Qe = function Qe(e) {return ye("/group/destroy", "post", e, ["group_id"], !0);},et = function et(e) {return ye("/group/info", "get", e, ["group_id"]);},tt = function tt(e) {return ye("/group/info/avatar", "post", e, ["group_id", "value"]);},nt = function nt(e) {return ye("/group/info/description", "post", e, ["group_id", "value"]);},ot = function ot(e) {return ye("/group/info/name", "post", e, ["group_id", "value"]);},rt = function rt(e) {return ye("/group/member_list", "get", e, ["group_id"]);},it = function it(e) {return ye("/group/msg/mute_mode", "post", e, ["group_id", "msg_mute_mode"]);},st = function st(e) {return ye("/group/msg/not_disturb", "post", e, ["group_id", "value"]);},at = function at() {return ye("/group/public_list", "get", {}, []);},ut = function ut(e) {return ye("/group/banned_list", "get", e, ["group_id"]);},ct = function ct(e) {return ye("/group/ban", "post", e, ["group_id", "duration", "user_list"]);},dt = function dt(e) {return ye("/group/unban", "post", e, ["group_id", "user_list"]);},lt = function lt(e) {return ye("/group/settings", "get", e, ["group_id"]);},pt = function pt(e) {return ye("/group/settings/allow_member_invitation", "post", e, ["group_id", "value"]);},ft = function ft(e) {return ye("/group/settings/allow_member_modify", "post", e, ["group_id", "value"]);},ht = function ht(e) {return ye("/group/settings/enable_read_ack", "post", e, ["group_id", "value"]);},gt = function gt(e) {return ye("/group/settings/history_visible", "post", e, ["group_id", "value"]);},yt = function yt(e) {return ye("/group/settings/require_admin_approval", "post", e, ["group_id", "apply_approval"]);},mt = function mt(e) {return ye("/group/transfer", "post", e, ["group_id", "new_owner"]);},vt = function vt(e) {return ye("/group/user_joined", "get", e);},_t = function _t(e) {return ye("/group/apply", "post", e, ["group_id"]);},Et = function Et(e) {return ye("/group/apply/handle", "post", e, ["approval", "group_id", "user_id"]);},Nt = function Nt(e) {return ye("/group/blocked_list", "get", e, ["group_id"]);},bt = function bt(e) {return ye("/group/block", "post", e, ["user_list", "group_id"]);},At = function At(e) {return ye("/group/unblock", "post", e, ["user_list", "group_id"]);},Ot = function Ot(e) {return ye("/group/kick", "post", e, ["user_list", "group_id"]);},wt = function wt(e) {return ye("/group/invite", "post", e, ["user_list", "group_id"]);},St = function St(e) {return ye("/group/invite/handle", "post", e, ["approval", "user_id", "group_id"]);},It = function It(e) {return ye("/group/info/batch", "post", e, ["group_list"]);},kt = function kt(e) {return ye("/group/members/display_name", "post", e, ["group_id", "user_list"]);},Rt = function Rt(e) {return ye("/group/leave", "post", e, ["group_id"], !0);},Tt = function Tt(e) {return ye("/group/display_name", "post", e, ["group_id", "value"]);},Dt = function Dt(e) {return ye("/group/application_list", "post", e, ["group_list"]);},Mt = function Mt() {return ye("/group/invitation_list", "get", {}, []);},Ct = function Ct(e) {return ye("/group/file/list", "get", e, ["group_id"], !0);},Ut = function Ut(e) {return ye("/group/file/delete", "post", e, ["file_list", "group_id"]);},xt = function xt(e) {return ye("/group/file/upload", "post", e, ["name", "size", "url", "group_id"]);},Gt = function Gt(e) {return ye("/user/authmode", "post", e, ["value"], !0);},Lt = function Lt(e) {return ye("/user/avatar", "post", e, ["avatar"]);},Pt = function Pt(e) {return ye("/user/mobile", "post", e, ["mobile"], !0);},jt = function jt(e) {return ye("/user/nickname", "post", e, ["nick_name"], !0);},Bt = function Bt() {return ye("/user/profile", "get", {}, []);},Ft = function Ft(e) {return ye("/user/profile", "post", e, []);},Vt = function Vt(e) {return ye("/user/push", "post", e, ["value"]);},qt = function qt(e) {return ye("/user/push/detail", "post", e, ["value"]);},Jt = function Jt(e) {return ye("/user/push/limit", "post", e, ["no_push_end_hour", "no_push_start_hour"]);},Kt = function Kt(e) {return ye("/user/push/nickname", "post", e, ["value"]);},Yt = function Yt() {return ye("/user/settings", "get", {}, []);},Wt = function Wt(e) {return ye("/user/settings", "post", e, ["user_id"]);},Ht = function Ht(e) {return ye("/user/sounds", "post", e, ["value"]);},Zt = function Zt(e) {return ye("/user/vibratory", "post", e, ["value"]);},Xt = function Xt(e) {return ye("/user/token/bind", "post", e, ["device_sn", "device_token", "notifier_name"]);},$t = function $t(e) {return ye("/user/token/unbind", "post", e, [], !0);},zt = function zt(e) {return ye("/file/upload/forward", "get", e, ["file_sign", "access-token", "to_id", "to_type"], !0);},Qt = function Qt(e, t, n) {return ye(e, "post", t, [], !1, n);},en = function en(e) {return ye("/file/upload/avatar/user", "get", e, [], !0);},tn = function tn(e) {return ye("/file/upload/avatar/group", "get", e, ["group_id"], !0);},nn = function nn(e) {return ye("/file/upload/chat", "get", e, ["file_type", "to_id", "to_type"], !0);},on = function on(e, t, n) {return ye(e, "get", t, [], !0, n);},rn = function rn(e) {return ye("/app/qr_code", "get", e, []);},sn = function sn(e) {return ye("/app/qr_login", "get", e, ["qr_code"]);},an = function an(e) {return ye("/app/qrcode/group_sign", "get", e, ["group_id"], !0);},un = function un(e) {return ye("/app/qrcode/group_invite", "get", e, ["qr_info"], !0);},cn = function cn(e) {return ye("/user/bind_openid", "get", e, ["open_id"], !0);},dn = function dn(e) {return ye("/app/wechat_login", "get", e, ["code"], !0);},ln = function ln(e) {return ye("/app/support_staff", "get", e, [], !0);},pn = function pn() {return ye("/app/wechat/unbind", "post");},fn = function fn() {return ye("/app/wechat/is_bind", "get");},hn = function hn(e) {return ye("/app/wechat/bind", "post", e, ["open_id", "type"]);},gn = function gn() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};this.uid = e.uid || 0;var t = void 0 === e.deviceSN ? Z.getDeviceSN() : e.deviceSN;this.deviceSN = t;};gn.prototype.setUid = function (e) {this.uid = e;}, gn.prototype.setDeviceSN = function (e) {this.deviceSN = e;};var yn = gn;function mn(e) {var _e11 = e,_e11$operation = _e11.operation,t = _e11$operation === void 0 ? { type: E.UNKNOWN, mid: 0 } : _e11$operation;void 0 !== (e = Object.assign({}, { type: _.NORMAL, ctype: N.TEXT, content: "", operation: t }, e)).type && (this.type = e.type), void 0 !== e.from && (this.from = e.from), void 0 !== e.to && (this.to = e.to), void 0 !== e.content && (this.content = e.content), void 0 !== e.ctype && (this.ctype = e.ctype), void 0 !== e.operation && (this.operation = e.operation), void 0 !== e.config && (this.config = e.config), void 0 !== e.attachment && (this.attachment = e.attachment), void 0 !== e.ext && (this.ext = e.ext), void 0 !== e.qos && (this.qos = e.qos), void 0 !== e.sender_name && (this.sender_name = e.sender_name), void 0 !== e.is_system && (this.is_system = e.is_system), void 0 !== e.priority && (this.priority = e.priority);}mn.prototype = { setType: function setType(e) {this.type = e;}, setFrom: function setFrom(e) {this.from = e;}, setTo: function setTo(e) {this.to = e;}, setContent: function setContent(e) {this.content = e;}, setCtype: function setCtype(e) {this.ctype = e;}, setOperation: function setOperation(e) {this.operation = e;}, setConfig: function setConfig(e) {this.config = e;}, setAttachment: function setAttachment(e) {this.attachment = e;}, setExt: function setExt(e) {this.ext = e;}, setQos: function setQos(e) {this.qos = e;}, setSendername: function setSendername(e) {this.sender_name = e;}, setIssystem: function setIssystem(e) {this.is_system = e;}, setPriority: function setPriority(e) {this.priority = e;} };var vn = mn;function _n(e) {void 0 !== (e = Object.assign({}, { vsn: p.XSYNC_V1, compress_method: h.NONE }, e)).vsn && (this.vsn = e.vsn), void 0 !== e.compress_method && (this.compress_method = e.compress_method), void 0 !== e.command && (this.command = e.command), void 0 !== e.payload && (this.payload = e.payload), void 0 !== e.encrypt_method && (this.encrypt_method = e.encrypt_method), void 0 !== e.encrypt_key && (this.encrypt_key = e.encrypt_key), void 0 !== e.check_sum && (this.check_sum = e.check_sum), void 0 !== e.tag && (this.tag = e.tag);}_n.prototype = { setVsn: function setVsn(e) {this.vsn = e;}, setCompressmethod: function setCompressmethod(e) {this.compress_method = e;}, setCommond: function setCommond(e) {this.command = e;}, setPayload: function setPayload(e) {this.payload = e;}, setEncryptmethod: function setEncryptmethod(e) {this.encrypt_method = e;}, setEncryptkey: function setEncryptkey(e) {this.encrypt_key = e;}, setChecksum: function setChecksum(e) {this.check_sum = e;}, setTag: function setTag(e) {this.tag = e;} };var En = _n;function Nn(e) {void 0 !== (e = Object.assign({}, { encrypt_method: m.ENCRYPT_NONE, os_type: y.WEB }, e)).status && (this.status = e.status), void 0 !== e.xid && (this.xid = e.xid), void 0 !== e.encrypt_method && (this.encrypt_method = e.encrypt_method), void 0 !== e.encrypt_key && (this.encrypt_key = e.encrypt_key), void 0 !== e.password && (this.password = e.password), void 0 !== e.token && (this.token = e.token), void 0 !== e.os_type && (this.os_type = e.os_type), void 0 !== e.sdk_vsn && (this.sdk_vsn = e.sdk_vsn), void 0 !== e.is_manual_login && (this.is_manual_login = e.is_manual_login), void 0 !== e.device_guid && (this.device_guid = e.device_guid), void 0 !== e.device_notifier && (this.device_notifier = e.device_notifier), void 0 !== e.device_token && (this.device_token = e.device_token), void 0 !== e.device_info && (this.device_info = e.device_info), void 0 !== e.last_login_time && (this.last_login_time = e.last_login_time);}Nn.prototype = { setStatus: function setStatus(e) {this.status = e;}, setXid: function setXid(e) {this.xid = e;}, setEncryptmethod: function setEncryptmethod(e) {this.encrypt_method = e;}, setEncryptkey: function setEncryptkey(e) {this.encrypt_key = e;}, setPassword: function setPassword(e) {this.password = e;}, setToken: function setToken(e) {this.token = e;}, setOstype: function setOstype(e) {this.os_type = e;}, setSdkvsn: function setSdkvsn(e) {this.sdk_vsn = e;}, setIsmanuallogin: function setIsmanuallogin(e) {this.is_manual_login = e;}, setDeviceguid: function setDeviceguid(e) {this.device_guid = e;}, setDevicenotifier: function setDevicenotifier(e) {this.device_notifier = e;}, setDevicetoken: function setDevicetoken(e) {this.device_token = e;}, setDeviceinfo: function setDeviceinfo(e) {this.device_info = e;}, setLastlogintime: function setLastlogintime(e) {this.last_login_time = e;} };var bn = Nn;function An(e) {void 0 !== (e = Object.assign({}, e)).status && (this.status = e.status), void 0 !== e.metas && (this.metas = e.metas), void 0 !== e.next_key && (this.next_key = e.next_key), void 0 !== e.xid && (this.xid = e.xid), void 0 !== e.client_mid && (this.client_mid = e.client_mid), void 0 !== e.server_mid && (this.server_mid = e.server_mid), void 0 !== e.server_time && (this.server_time = e.server_time), void 0 !== e.is_full_sync && (this.is_full_sync = e.is_full_sync), void 0 !== e.prev_mid && (this.prev_mid = e.prev_mid), void 0 !== e.is_eager_sync && (this.is_eager_sync = e.is_eager_sync);}An.prototype = { setStatus: function setStatus(e) {this.status = e;}, setMetas: function setMetas(e) {this.metas = e;}, setNextkey: function setNextkey(e) {this.next_key = e;}, setXid: function setXid(e) {this.xid = e;}, setClientmid: function setClientmid(e) {this.client_mid = e;}, setServermid: function setServermid(e) {this.server_mid = e;}, setServertime: function setServertime(e) {this.server_time = e;}, setIsfullsync: function setIsfullsync(e) {this.is_full_sync = e;}, setPrevmid: function setPrevmid(e) {this.prev_mid = e;}, setIseagersync: function setIseagersync(e) {this.is_eager_sync = e;} };function On(e) {void 0 !== (e = Object.assign({}, e)).xid && (this.xid = e.xid), void 0 !== e.key && (this.key = e.key), void 0 !== e.meta && (this.meta = e.meta), void 0 !== e.is_full_sync && (this.is_full_sync = e.is_full_sync), void 0 !== e.full_sync_num && (this.full_sync_num = e.full_sync_num);}On.prototype = { setXid: function setXid(e) {this.xid = e;}, setKey: function setKey(e) {this.key = e;}, setMeta: function setMeta(e) {this.meta = e;}, setIsfullsync: function setIsfullsync(e) {this.is_full_sync = e;}, setFullsyncnum: function setFullsyncnum(e) {this.full_sync_num = e;} };var wn = On;function Sn(e) {void 0 !== (e = Object.assign({}, e)).id && (this.id = e.id), void 0 !== e.from && (this.from = e.from), void 0 !== e.to && (this.to = e.to), void 0 !== e.timestamp && (this.timestamp = e.timestamp), void 0 !== e.ns && (this.ns = e.ns), void 0 !== e.payload && (this.payload = e.payload);}Sn.prototype = { setId: function setId(e) {this.id = e;}, setFrom: function setFrom(e) {this.from = e;}, setTo: function setTo(e) {this.to = e;}, setTimestamp: function setTimestamp(e) {this.timestamp = e;}, setNs: function setNs(e) {this.ns = e;}, setPayload: function setPayload(e) {this.payload = e;} };var In = Sn;function kn(e) {void 0 !== e.type && (this.type = e.type), void 0 !== e.operation && (this.operation = e.operation);}kn.prototype = { setType: function setType(e) {this.type = e;}, setOperation: function setOperation(e) {this.operation = e;} };var Rn = kn;var Tn = Z.getDeviceSN(),Dn = Z.getDeviceGuid();z("userKicked", function () {c.log("user is kicked ... will new devicesn and guid, old Guid", Dn), Tn = 0, Dn = 999999999 + Math.floor(214e4 * Math.random()) + "", c.log("new Guid", Dn);}), z("temporary_deviceSN", function (e) {Tn = e;});var Mn = function Mn(e) {var t = new En();t.setCommond(f.SYNC);var n = new wn();return e.xid && n.setXid(e.xid), e.next_key && n.setKey(e.next_key), t.setPayload(n), t;},Cn = function Cn(e) {var t = e.gid,n = e.content,_e$type = e.type,o = _e$type === void 0 ? "text" : _e$type,r = e.attachment,i = e.ext,s = e.priority;var a = Object.keys(N).indexOf(o.toUpperCase());var u = new yn({ uid: Z.getUid() - 0, deviceSN: Tn }),c = new yn({ uid: t, deviceSN: 0 }),d = new En();d.setCommond(f.SYNC);var l = new wn(),p = new vn({ from: u, to: c, content: n, ctype: a, type: _.GROUPCHAT, ext: i });s > 0 && (p.priority = s), a > 0 && r && (p.attachment = JSON.stringify(r));var h = new In({ id: new Date().getTime(), from: u, to: c, payload: p, ns: v.MESSAGE, timestamp: new Date().getTime() });return l.setMeta(h), d.setPayload(l), d;},Un = function Un(e) {var t = e.uid,n = e.content,_e$type2 = e.type,o = _e$type2 === void 0 ? "text" : _e$type2,r = e.ext,i = e.attachment;ee("imSendRosterMessage", e);var s = Object.keys(N).indexOf(o.toUpperCase());var a = new yn({ uid: Z.getUid() - 0, deviceSN: Tn }),u = new yn({ uid: t - 0, deviceSN: 0 }),c = new En();c.setCommond(f.SYNC);var d = new wn(),l = new vn({ from: a, to: u, content: n, ctype: s, type: _.CHAT, ext: r });s > 0 && i && (l.attachment = JSON.stringify(i));var p = new In({ id: new Date().getTime(), from: a, to: u, payload: l, ns: v.MESSAGE, timestamp: new Date().getTime() });return d.setMeta(p), c.setPayload(d), c;},xn = function xn(e, t) {t = C(t);var n = new En();n.setCommond(f.SYNC);var o = new yn({ uid: Z.getUid(), deviceSN: Tn }),r = new yn({ uid: M(e), deviceSN: 0 }),i = new wn(),s = new vn({ from: o, to: r, ctype: N.COMMAND, type: _.OPER, operation: { type: E.READ_ACK, mid: t } }),a = new In({ id: new Date().getTime() + Math.floor(256 * Math.random()), from: o, to: r, payload: s, ns: v.MESSAGE });return i.setMeta(a), n.setPayload(i), n;},Gn = function Gn(e, t) {t = C(t);var n = new En();n.setCommond(f.SYNC);var o = new yn({ uid: Z.getUid(), deviceSN: Tn }),r = new yn({ uid: M(e), deviceSN: 0 }),i = new wn(),s = new vn({ ctype: N.COMMAND, type: _.OPER, operation: { type: E.RECALL, mid: t, xid: r } }),a = new In({ id: parseInt(new Date().getTime() + "" + Math.floor(256 * Math.random())), from: o, to: r, payload: s, ns: v.MESSAGE });return i.setMeta(a), n.setPayload(i), n;},Ln = function Ln(e, t) {var n = new En();n.setCommond(f.SYNC);var o = new yn({ uid: Z.getUid(), deviceSN: Tn }),r = new yn({ uid: M(e), deviceSN: 0 }),i = new wn(),s = new vn({ from: o, to: o, ctype: N.COMMAND, type: _.OPER, operation: { type: E.READ_ALL, xid: r, mid: t } }),a = new In({ id: parseInt(new Date().getTime() + "" + Math.floor(256 * Math.random())), from: o, to: o, payload: s, ns: v.MESSAGE });return i.setMeta(a), n.setPayload(i), n;},Pn = function Pn(e, t, n) {var o = n.content,r = n.attach,i = n.type;return e ? Un({ uid: e, content: o, type: i, attachment: r }) : Cn({ gid: t, content: o, type: i, attachment: r });},jn = {};var Bn = !1;var Fn = function Fn(e) {var _e$status2 = e.status,t = _e$status2 === void 0 ? {} : _e$status2,n = t.code,o = t.reason;if (n === g.OK) return !0;if (void 0 === t.code) return !0;if (n !== g.INVALID_TOKEN && n !== g.UNAUTHORIZED || ee("flooNotice", { category: "action", desc: "relogin" }), n !== g.USER_FROZEN && n !== g.INVALID_LICENSE && n !== g.LICENSE_LIMIT && n !== g.APP_FROZEN || ee("flooNotice", { category: "action", desc: "relogin_manually" }), n === g.USER_BANNED) {ee("flooError", { category: "USER_BANNED", desc: "用户被禁言" });} else if (n === g.USER_FROZEN) {ee("flooError", { category: "USER_FROZEN", desc: "用户被冻结，请联系App管理员。" });} else if (n === g.APP_FROZEN) {ee("flooError", { category: "APP_FROZEN", desc: "APP 被冻结，请登陆美信拓扑控制台查看详情。" });} else if (n === g.INVALID_LICENSE) {ee("flooError", { category: "LICENSE", desc: "无效 LICENSE，请确认服务已按时付费。" });} else if (n === g.LICENSE_LIMIT) {ee("flooError", { category: "LICENSE", desc: "超出 LICENSE 用户数限制，请购买更高规格服务。" });} else {ee("flooError", { category: n, desc: o });}var r = e.client_mid;return r && ee("onSendingMessageStatusChanged", { status: "failed", mid: M(r) }), c.error("ret error ......code:", n, "...reason:", o), !1;},Vn = function Vn(e) {var _e$unread = e.unread,t = _e$unread === void 0 ? [] : _e$unread;ee("imReceivedUnread", t), t.forEach(function (e) {var t = e.xid,n = e.n;n > 0 && ee("sendMessage", Mn({ xid: t, next_key: 0 }));});},qn = function qn(e) {var t = e.xid,_t$uid = t.uid,n = _t$uid === void 0 ? 0 : _t$uid;jn[n + ""] ? setTimeout(function () {jn[n] = !1, qn(e);}, 3e3) : (jn[n + ""] = !0, ee("sendMessage", function (e) {e.uid = e.uid || 0;var t = new En();t.setCommond(f.SYNC);var n = new wn();return n.setXid(e), t.setPayload(n), t;}(t)));},Jn = function Jn(e) {if (!Fn(e)) return ee("flooNotice", { category: "loginMessage", desc: "login socket failure ......" }), void ee("loginFail", "socket_failure");var _e$xid = e.xid,t = _e$xid === void 0 ? {} : _e$xid,n = t.deviceSN;ee("temporary_deviceSN", n), Bn || n && Z.saveDeviceSN(n), ee("flooNotice", { category: "loginMessage", desc: "login socket success....." }), ee("loginSuccess", {}), ee("sendMessage", { vsn: 0, compress_method: 0, command: 0 });},Kn = function Kn(e) {if (!Fn(e)) return;var _e$metas = e.metas,t = _e$metas === void 0 ? [] : _e$metas,n = e.xid,o = e.is_full_sync,r = e.client_mid;if (!o && r && C(r).gt(0)) return ee("receivedSendMessage", r), void setTimeout(function () {se.dealSendedRosterMessage(e), se.dealSendedGroupMessage(e);}, 20);var _e$next_key = e.next_key,i = _e$next_key === void 0 ? 0 : _e$next_key;if (0 === i || C(i).eq(0)) {var _n$uid = n.uid,_e12 = _n$uid === void 0 ? 0 : _n$uid;delete jn[_e12 + ""];}o ? (t && t.length && Yn(t), ee("onReceiveHistoryMsg", { next: i })) : (t.length && Yn(t), 0 === i || C(i).eq(0) || ee("sendMessage", Mn({ xid: n, next_key: i })));},Yn = function Yn() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];e.forEach(function (e) {var t = e.ns;t === v.UNKNOWN && c.log("received unknown message ...", e), t === v.MESSAGE && Hn(e), t === v.GROUP_NOTICE && Zn(e), t === v.ROSTER_NOTICE && Xn(e), t === v.USER_NOTICE && $n(e), t === v.CONVERSATION && Wn(e);});},Wn = function Wn(e) {var _e$payload = e.payload,t = _e$payload === void 0 ? {} : _e$payload,n = t.type,o = t.operation;if (n === I.OPER) {if (o.op_type == k.DELETE || o.op_type == k.DELETE_EVERYWHERE) {var _e13 = o.xid;ee("deleteConveration", { id: _e13.uid, source: "other_operation" });} else c.log("received unknown conversation operation: ", o);} else c.log("received unknown conversation: ", e);},Hn = function Hn(e) {var _e$payload2 = e.payload,t = _e$payload2 === void 0 ? {} : _e$payload2,n = t.type,o = t.operation;n === _.NORMAL && ee("messageNormal", e), n === _.CHAT && ee("imRosterMessage", e), n === _.GROUPCHAT && ee("imGroupMessage", e), n === _.OPER && (o.type === E.UNKNOWN && c.log("received unknown operation: ", e), e.isReceived = !0, ee("onActionMessage", e));},Zn = function Zn(e) {var _e$payload3 = e.payload,t = _e$payload3 === void 0 ? {} : _e$payload3,n = t.type;n === A.UNKNOWN && c.log("received unknown groupnotice: ", e), n === A.PRESENCE && ee("imGroupPresence", e), n === A.ABSENCE && ee("imGroupAbesence", e), n === A.CREATED && ee("imGroupCreated", e), n === A.DESTROYED && ee("imGroupDestoryed", e), n === A.JOINED && ee("imGroupJoined", e), n === A.APPLYED && ee("imGroupApplyed", e), n === A.APPLY_ACCEPTED && ee("imGroupApplyAccepted", e), n === A.APPLY_DECLINED && ee("imGroupApplyDeclined", e), n === A.INVITED && ee("imGroupInvited", e), n === A.INVITE_ACCEPTED && ee("imGroupInvitedAccepted", e), n === A.INVITE_DECLINED && ee("imGroupInvitedDeclined", e), n === A.KICKED && ee("imGroupKicked", e), n === A.BANNED && ee("imGroupBaned", e), n === A.UNBANNED && ee("imGroupUnbaned", e), n === A.OWNER_ASSIGNED && ee("imGroupOwnerAssigned", e), n === A.ADMIN_GRANTED && ee("imGroupAdminGranted", e), n === A.ADMIN_REVOKED && ee("imGroupAdminRevoked", e), n === A.BLOCKED && ee("imGroupBlocked", e), n === A.UNBLOCKED && ee("imGroupUnblocked", e), n === A.MUTED && ee("imGroupMuted", e), n === A.UNMUTED && ee("imGroupUnmuted", e), n === A.INFO_UPDATED && ee("imGroupInfoUpdated", e), n === A.ANNOUNCEMENT_UPDATED && ee("imGroupAnnouncementUpdated", e);},Xn = function Xn(e) {var _e$payload4 = e.payload,t = _e$payload4 === void 0 ? {} : _e$payload4,n = t.type;n === w.UNKNOWN && c.log("received unknown rosterNotice: ", e), n === w.ADDED && ee("imRosterAdded", e), n === w.REMOVED && ee("imRosterRemoved", e), n === w.ACCEPTED && ee("imRosterAccepted", e), n === w.DECLINED && ee("imRosterDeclined", e), n === w.BANNED && ee("imRosterBaned", e), n === w.UNBANNED && ee("imRosterUnbaned", e), n === w.INFO_UPDATED && ee("imRosterInfoUpdated", e);},$n = function $n(e) {var _e$payload5 = e.payload,t = _e$payload5 === void 0 ? {} : _e$payload5,n = t.type;n !== S.UNKNOWN && n !== S.PASSWORD_CHANGED && n !== S.FROZEN && n !== S.REMOVED && n !== S.KICKED_BY_OTHER_DEVICE && n !== S.DEVICE_REMOVED && n !== S.CLUSTER_CHANGED || (Z.deleteToken(), Z.deleteDeviceSN(), ee("flooNotice", { category: "action", desc: "relogin_manually" })), n === S.UNKNOWN && c.log("received unknown userNotice: ", e), n === S.KICK_BY_SAME_DEVICE && (Bn = !0, ee("userKicked")), ee("flooNotice", { category: "userNotice", desc: Object.keys(S)[n] });};var zn = function zn(e) {var _e$command = e.command,t = _e$command === void 0 ? 0 : _e$command,n = e.payload;t === f.UNREAD && Vn(n), t === f.SYNC && Kn(n), t === f.NOTICE && qn(n), t === f.PROVISION && Jn(n);},Qn = n(0),eo = n.n(Qn),to = n(2),no = n.n(to);var oo = eo.a.Root.fromJSON(no.a).lookupType("im.floo.protobuf.Provision"),ro = function ro(e) {return oo.decode(e);},io = function io(e) {return oo.encode(e).finish();};var so = eo.a.Root.fromJSON(no.a).lookupType("im.floo.protobuf.XID"),ao = function ao(e) {return so.encode(e).finish();};var uo = n(32),co = n.n(uo);var lo = eo.a.Root.fromJSON(co.a).lookupType("im.floo.protobuf.MessageBody"),po = function po(e) {return lo.decode(e);},fo = function fo(e) {return lo.encode(e).finish();};var ho = n(33),go = n.n(ho);var yo = eo.a.Root.fromJSON(go.a).lookupType("im.floo.protobuf.GroupNotice"),mo = function mo(e) {return yo.decode(e);},vo = function vo(e) {e.from = ao(e.from);var t = [];return (e.to || []).forEach(function (e) {t.push(ao(e));}), e.to = t, yo.encode(e).finish();};var _o = n(34),Eo = n.n(_o);var No = eo.a.Root.fromJSON(Eo.a).lookupType("im.floo.protobuf.RosterNotice"),bo = function bo(e) {return No.decode(e);},Ao = function Ao(e) {return No.encode(e).finish();};var Oo = n(35),wo = n.n(Oo);var So = eo.a.Root.fromJSON(wo.a).lookupType("im.floo.protobuf.UserNotice"),Io = function Io(e) {return So.decode(e);},ko = function ko(e) {return So.encode(e).finish();};var Ro = n(36),To = n.n(Ro);var Do = eo.a.Root.fromJSON(To.a).lookupType("im.floo.protobuf.Info"),Mo = function Mo(e) {return Do.decode(e);},Co = function Co(e) {return Do.encode(e).finish();};var Uo = n(37),xo = n.n(Uo);var Go = eo.a.Root.fromJSON(xo.a).lookupType("im.floo.protobuf.Conversation"),Lo = function Lo(e) {return Go.decode(e);},Po = function Po(e) {return Go.encode(e).finish();};var jo = eo.a.Root.fromJSON(no.a).lookupType("im.floo.protobuf.Meta");var Bo = eo.a.Root.fromJSON(no.a).lookupType("im.floo.protobuf.SyncUL"),Fo = function Fo(e) {return Bo.decode(e);},Vo = function Vo(e) {e.meta && (e.meta = function (e) {var t = e.ns,n = e.payload;return t === v.MESSAGE && (e.payload = fo(n)), t === v.GROUP_NOTICE && (e.payload = vo(n)), t === v.ROSTER_NOTICE && (e.payload = Ao(n)), t === v.USER_NOTICE && (e.payload = ko(n)), t === v.INFO && (e.payload = Co(n)), t === v.CONVERSATION && (e.payload = Po(n)), jo.create(e);}(e.meta));return Bo.encode(e).finish();};var qo = eo.a.Root.fromJSON(no.a).lookupType("im.floo.protobuf.UnreadDL"),Jo = eo.a.Root.fromJSON(no.a).lookupType("im.floo.protobuf.SyncDL");var Ko = eo.a.Root.fromJSON(no.a).lookupType("im.floo.protobuf.Notice"),Yo = function Yo(e) {return { xid: function (e) {return so.decode(e);}(e) };};var Wo = eo.a.Root.fromJSON(no.a).lookupType("im.floo.protobuf.Frame"),Ho = function Ho(e) {e = new Uint8Array(e);var t = Wo.decode(e),n = t.command,o = t.payload;return n === f.UNREAD ? t.payload = function (e) {return qo.decode(e);}(o) : n === f.SYNC ? t.payload = function (e) {var t = Jo.decode(e),_t$metas = t.metas,n = _t$metas === void 0 ? [] : _t$metas,o = [];return n.forEach(function (e) {var t = e.ns,n = e.payload;t === v.MESSAGE && (e.payload = po(n)), t === v.GROUP_NOTICE && (e.payload = mo(n)), t === v.ROSTER_NOTICE && (e.payload = bo(n)), t === v.USER_NOTICE && (e.payload = Io(n)), t === v.INFO && (e.payload = Mo(n)), t === v.CONVERSATION && (e.payload = Lo(n)), o.push(e);}), t.metas = o, t;}(o) : n === f.NOTICE ? t.payload = Yo(o) : n === f.PROVISION && (t.payload = ro(o)), t;},Zo = function Zo(e) {var t = e.payload,n = e.command;t && (n === f.UNREAD ? e.payload = function (e) {return qo.encode(e).finish();}(t) : n === f.SYNC ? e.payload = Vo(t) : n === f.NOTICE ? e.payload = function (e) {return Ko.encode(e).finish();}(t) : n === f.PROVISION && (e.payload = io(t)));return Wo.encode(e).finish();};eo.a.util.Long = l.a, eo.a.configure();var Xo = i.encode,$o = a.encode,zo = a.decode,Qo = s.encode;var er = {};var tr = 0,nr = null;var or = "normal";var rr = null;z("refresh_fireplace", function (e) {er = Object.assign({ fireplace: e }, er);}), z("loginSuccess", function () {tr = 0, nr && clearInterval(nr), nr = setInterval(function () {dr({ vsn: 0, compress_method: 0, command: 0 });}, 5e4);}), z("sendMessage", function (e) {dr(e);}), z("userKicked", function () {or = "kick";}), z("reconnect", function (_ref) {var e = _ref.reason;c.warn("socket reconnect due to ", e, " user status: ", or), "normal" === or && sr();});var ir = function ir() {var _er = er,e = _er.fireplace;c.log("................................. will connect : ", e), ee("flooNotice", { category: "loginMessage", desc: "socket connecting..." }), rr = wx.connectSocket({ url: e, tcpNoDelay: !0, timeout: 1e4 + 2e4 * tr, success: function success() {c.info("================= Success connect to", e), ee("flooNotice", { category: "loginMessage", desc: "socket connect success..." });}, fail: function fail(t) {c.error("================= Failed to connect ", e, " error: ", t), ee("reconnect", { reason: "ConnectFail" });} }), rr.onOpen(function () {c.log("=================  socket connected "), ur();}), rr.onMessage(function (e) {cr(e.data);}), rr.onError(function (e) {c.error("=================  socket error: ", e), rr.close();}), rr.onClose(function (e) {c.error("=================  socket disconnected due to ", e), ee("reconnect", { reason: "closed_by_peer" });});},sr = function sr() {tr >= 5 ? (tr = 0, ee("fireplaceError")) : tr++, ar();},ar = function ar() {var e = Math.floor(9e3 * Math.random()) + 1e3;c.error("================= socket will reconnect in ", e, " ms (", tr, ")"), setTimeout(function () {ir();}, e);},ur = function ur() {c.log("=============== sending proversion =========="), ee("flooNotice", { category: "loginMessage", desc: "logining socket service..." }), ee("sendMessage", function (e) {var t = new yn({ uid: e.uid - 0, deviceSN: Tn }),n = new bn();Dn || (Dn = Z.getDeviceGuid()), n.setXid(t), n.setToken(e.token), n.setDeviceguid(Dn), n.setSdkvsn("2.0.0"), n.setEncryptmethod(m.AES_CBC_128), n.setEncryptkey(Z.getAesKey()), n.setDeviceinfo("Uniapp");var o = new En();return o.setCommond(f.PROVISION), o.setPayload(n), o;}({ token: Z.getToken(), uid: Z.getUid() }));},cr = function cr(e) {var t = function (e) {return zo(e);}(e);c.info("RECV :" + JSON.stringify(T(t))), zn(t);},dr = function dr(e) {c.info("SEND :" + JSON.stringify(T(e)));var t = $o(e),n = new ArrayBuffer(t.length),o = new Uint8Array(n);t.forEach(function (e, t) {o[t] = e;}), rr.send({ data: n, fail: function fail(e) {var t = e.errMsg;c.error("=============== fail to send message, err: ", t), rr.close(), ee("reconnect", { reason: "SendFail" });} });};var lr = Object.assign(r, { connect: function connect(e) {er = e, tr = 0, or = "normal", ir();}, sendMessage: dr, disConnect: function disConnect() {or = "logout", rr && rr.close();} });var pr = { asyncGetRosterIdList: function asyncGetRosterIdList(e) {return e ? lr.rosterList({}).then(function (e) {return ce.saveRosterList(e), e.map(function (e) {return e.user_id || e;});}) : Promise.resolve(ce.getRosterList());}, asyncGetRosterInfo: function asyncGetRosterInfo(e, t) {var n = ce.getRosterInfo(e);return n && n.username && !t ? Promise.resolve(n) : lr.rosterListPost({ list: [e] }).then(function (t) {return ce.saveRosterInfo(t), ee("onRosterInfoUpdate", [e]), t.length && t[0] || {};});}, asyncRegester: function asyncRegester(e) {return lr.userRegister(e);}, asnycGetRosterListDetailByIds: function asnycGetRosterListDetailByIds(e) {if (!e || !e.length) return Promise.resolve({});var t = ce.getAllRosterInfos(),n = [];e.forEach(function (e) {var o = t[e];o && o.username || n.push(e);});var o = Array.from(new Set(n));return o.length ? lr.rosterListPost({ list: o }).then(function (e) {return ce.saveRosterInfo(e), ee("onRosterInfoUpdate", o), e;}) : Promise.resolve();}, asyncGetUserProfile: function asyncGetUserProfile(e) {var t = Z.getProfile();return t && (t.name || t.mobile) && !e ? Promise.resolve(t) : lr.userProfile().then(function (e) {return Z.saveProfile(e), e;});}, getRosterMessageByRid: function getRosterMessageByRid(e) {return se.getRosterMessage(e);}, readRosterMessage: function readRosterMessage(e, t) {ee("imReadRosterMessage", { roster_id: e, mid: t });}, asyncDeleteRoster: function asyncDeleteRoster(e) {return lr.rosterDelete(e).then(function (t) {return ce.removeRoster(e.user_id), ne.deleteRecentById(e.user_id), ee("onRosterListUpdate"), t;});}, getAllRosterDetail: function getAllRosterDetail() {return ce.getAllRosterInfos();}, recallMessage: function recallMessage(e, t) {var n = Gn(e, t);ee("swapSendMessage", T(n)), ee("sendMessage", n);}, deleteMessage: function deleteMessage(e, t) {var n = function (e, t) {t = C(t);var n = new En();n.setCommond(f.SYNC);var o = new yn({ uid: Z.getUid(), deviceSN: Tn }),r = new yn({ uid: M(e), deviceSN: 0 }),i = new wn(),s = new vn({ ctype: N.COMMAND, type: _.OPER, operation: { type: E.DELETE, mid: t, xid: r } }),a = new In({ id: parseInt(new Date().getTime() + "" + Math.floor(256 * Math.random())), from: o, to: o, payload: s, ns: v.MESSAGE });return i.setMeta(a), n.setPayload(i), n;}(e, t);ee("swapSendMessage", T(n)), ee("sendMessage", n);}, getUnreadCount: function getUnreadCount(e) {return se.getUnreadByRosterId(e);}, unreadMessage: function unreadMessage(e, t) {var n = function (e, t) {t = C(t);var n = new En();n.setCommond(f.SYNC);var o = new yn({ uid: Z.getUid(), deviceSN: Tn }),r = new yn({ uid: M(e), deviceSN: 0 }),i = new wn(),s = new vn({ ctype: N.COMMAND, type: _.OPER, operation: { type: E.READ_CANCEL, mid: t, xid: r } }),a = new In({ id: parseInt(new Date().getTime() + "" + Math.floor(256 * Math.random())), from: o, to: o, payload: s, ns: v.MESSAGE });return i.setMeta(a), n.setPayload(i), n;}(e, t);ee("swapSendMessage", T(n)), ee("sendMessage", n);}, getRosterInfo: function getRosterInfo(e) {return ce.getRosterInfo(e);}, asyncGetApplyList: lr.rosterApplylist, asyncGetBlockedlist: lr.rosterBlockedlist, asyncBlockeAdd: lr.rosterBlockedAdd, asyncBlockeRemove: lr.rosterBlockeRemove, asyncApply: lr.rosterApply, asyncAccept: lr.rosterAccept, asyncDecline: lr.rosterDecline, asyncUpdateRosterExt: lr.rosterExt, asyncSearchRosterByName: lr.rosterName, asyncSearchRosterById: lr.rosterId };z("imRostersGroupslistReady", function (e) {var t = e.rosters;ce.saveRosterList([].concat(t)), yr(t);});var fr = {},hr = function hr(e) {return new Date().getTime() - (fr[e] || 0) < 1e3;},gr = function gr(e) {var t = new Date().getTime();fr[e] = t;},yr = function yr() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];Array.isArray(e) || (e = [e]);var t = ce.getAllRosterInfos() || {},n = [];e.forEach(function (e) {if ((e = e.user_id || e) > 0) {var _o5 = t[e] || {},_r5 = _o5.avatar,_i11 = _o5.nick_name,_s2 = _o5.username;_r5 || _i11 || _s2 || e && !hr(e) && n.push(e) && gr(e);}}), n.length && _r(n);},mr = function mr() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;if (Array.isArray(e) || (e = [e]), t) return void Er(e);var n = q.getAllGroupInfos() || {},o = [];e.forEach(function (e) {var t = e.group_id || e;if (e > 0) {var _e14 = n[t] || {},_r6 = _e14.name;_r6 || o.push(t);}}), o.length && Er(o);},vr = [],_r = function _r() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var t = e.filter(function (e) {return vr.indexOf(e) < 0;});t.length && je({ list: t }).then(function (e) {t.forEach(function (t) {e.findIndex(function (e) {return e.user_id == t;}) < 0 && vr.push(t);}), ce.saveRosterInfo(e), ee("onRosterInfoUpdate");});},Er = function Er() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];e.length && It({ group_list: e }).then(function (e) {q.saveGroupInfo(e), ee("onGroupListUpdate");});},Nr = function Nr(e, t, n, o) {if (n) {var _t6 = q.getGroupMembers(e);if (!_t6 || !_t6.length) return;}void 0 !== t && (Array.isArray(t) || (t = [t]), kt({ group_id: e, user_list: t }).then(function (t) {if (!t || !t.length) return;var n = [],r = ce.getAllRosterInfos();t.forEach(function (e) {r[e.user_id] && r[e.user_id].username ? (e.display_name = e.display_name || r[e.user_id].username, e.avatar = r[e.user_id].avatar) : n.push(e.user_id);}), n.length ? je({ list: n }).then(function (n) {ce.saveRosterInfo(n);var r = ce.getAllRosterInfos();t = t.map(function (e) {return e.display_name || (e.display_name = e.display_name || r[e.user_id].username), e.avatar = r[e.user_id].avatar, e;}), q.saveGroupMembers(e, t, o), ee("onGroupMemberChanged", e);}) : (q.saveGroupMembers(e, t, o), ee("onGroupMemberChanged", e));}));},br = function br(e, t) {var n = q.getGroupMembers(e);if (!n || 0 === n.length) return;var o = n.findIndex(function (e) {return e.user_id === t;});o >= 0 && (n.splice(o, 1), q.saveGroupMembers(e, n, !0), ee("onGroupMemberChanged", e));};z("imRostersGroupslistReady", function (e) {var t = e.groups;q.saveJoinedGroups([].concat(t)), mr(t);}), z("imRosterMessage", function (e) {var t = x(e),_t$ext = t.ext,n = _t$ext === void 0 ? "" : _t$ext,o = t.from,r = t.to;var i = {};try {i = JSON.parse(n);} catch (e) {}if (void 0 !== i.input_status && o != Z.getUid()) ee("onInputStatusMessage", { ext: n, from: o, to: r });else {se.saveRosterMessage(t), t.toType = "roster", ne.saveRecent(t);var _e15 = Z.getUid() == o ? r : o;yr(_e15), ee("onUnreadChange", _e15);}ee("onRosterMessage", t);}), z("imSendRosterMessage", function (e) {yr(e.uid);}), z("imGetRecent", function (e) {yr(e);}), z("imGroupMessage", function (e) {var t = x(e);se.saveGroupMessage(t), t.toType = "group", ne.saveRecent(t);var n = Z.getUid(),o = t.config;o && o.mentionList && o.mentionList.indexOf(n) >= 0 && ee("onMentionMessage", t), ee("onGroupMessage", t);}), z("imReceivedUnread", function (e) {var t = e.filter(function (e) {return 1 === e.type;}).map(function (e) {return M(e.xid.uid);}),n = e.filter(function (e) {return 2 === e.type;}).map(function (e) {return M(e.xid.uid);});Ar(t), yr(t), Or(n), mr(n);});var Ar = function Ar(e) {var t = ce.getAllRosterInfos() || {},n = [];e.forEach(function (e) {var o = t[e] || {},r = o.avatar,i = o.nick_name,s = o.username;r || i || s || e && !hr(e) && n.push(e) && gr(e);}), n.length ? je({ list: n }).then(function (t) {ce.saveRosterInfo(t), ne.saveUnreadRecent(e, "roster");}) : ne.saveUnreadRecent(e, "roster");},Or = function Or(e) {var t = q.getAllGroupInfos() || {},n = [];e.forEach(function (e) {var o = t[e] || {},r = o.name;r || e && n.push(e);}), n.length ? It({ group_list: n }).then(function (t) {q.saveGroupInfo(t), ee("onGroupListUpdate"), ne.saveUnreadRecent(e, "group");}) : ne.saveUnreadRecent(e, "group");};z("imRosterAdded", function (e) {var t = e.payload,_t$to = t.to,n = _t$to === void 0 ? [] : _t$to,o = t.from,r = Z.getUid();1 === n.length && M(n[0].uid) === r && (yr([M(o.uid)]), ce.saveRosterList(M(o.uid)), ee("onRosterListUpdate", e));}), z("imRosterRemoved", function (e) {var t = e.payload,n = t.from,_t$to2 = t.to,o = _t$to2 === void 0 ? [] : _t$to2,r = Z.getUid();if (M(n.uid) === r && 1 === o.length) {var _t7 = M(o[0].uid);ce.removeRoster(_t7), ae.saveNotice(e), ne.deleteRecentById(_t7), se.deleteRosterMessageByRosterId(_t7), ee("onRosterRemoved", e);}}), z("imRosterAccepted", function (e) {var t = e.payload,n = t.from,_t$to3 = t.to,o = _t$to3 === void 0 ? [] : _t$to3,r = Z.getUid(),i = M(n.uid);if (1 === o.length) {var _t8 = M(o[0].uid);i === r ? (ae.removeNotice(e), ce.saveRosterList(_t8), yr(_t8)) : _t8 === r && (ce.saveRosterList(i), yr(i)), ee("onRosterAccepted", e);}}), z("imRosterDeclined", function (e) {var t = e.payload,n = t.from,_t$to4 = t.to,o = _t$to4 === void 0 ? [] : _t$to4,r = Z.getUid(),i = M(n.uid);if (1 === o.length) {var _t9 = M(o[0].uid);i === r ? (ae.removeNotice(e), ae.saveNotice(e)) : _t9 === r && ae.saveNotice(e), ee("onRosterDeclined", e);}}), z("imRrosterBaned", function (e) {ee("onRosterNotice", e);}), z("imRosterUnbaned", function (e) {ee("onRosterNotice", e);}), z("imRosterInfoUpdated", function (e) {var t = e.payload,n = t.from,_t$content2 = t.content,o = _t$content2 === void 0 ? "{}" : _t$content2,r = M(n.uid);var i = {};try {i = JSON.parse(o);} catch (e) {}if (Object.keys(i).length) {var _e16 = Object.assign({}, ce.getRosterInfo(r), i);ce.saveRosterInfo([_e16]), ee("onRosterInfoUpdated"), ee("onRosterListUpdate");}}), z("imGroupCreated", function (e) {var t = e.payload,n = t.gid,o = t.from,r = Z.getUid(),i = M(n.uid),s = M(o.uid);q.saveJoinedGroups(i), s !== r && yr(s), mr(i), ee("onGroupListUpdate", e), ee("onGroupCreated", e);}), z("imGroupDestoryed", function (e) {var t = e.payload,n = t.gid,o = t.from,r = Z.getUid(),i = M(n.uid),s = M(o.uid);s !== r && yr(s), q.removeGroup(i), ae.saveNotice(e), ne.deleteRecentById(n), se.deleteGroupMessageByGid(n), ee("onGroupListUpdate"), ee("onGroupDestoryed", e);}), z("imGroupJoined", function (e) {var t = e.payload,n = t.gid,o = t.from,_t$to5 = t.to,r = _t$to5 === void 0 ? [] : _t$to5,i = M(o.uid),s = Z.getUid(),a = M(n.uid),u = [];r.forEach(function (e) {u.push(M(e.uid));}), i === s ? (q.saveJoinedGroups(a), mr(a), ee("onGroupListUpdate")) : (Nr(a, i, !0), yr(i), ee("onGroupMemberChanged", a)), ee("onGroupJoined", e);}), z("imGroupApplyed", function (e) {var t = e.payload,n = t.from,o = M(n.uid);o !== Z.getUid() && (yr([o]), ae.saveNotice(e));}), z("imGroupApplyAccepted", function (e) {var t = e.payload,n = t.gid,o = t.from,_t$to6 = t.to,r = _t$to6 === void 0 ? [] : _t$to6,i = M(o.uid),s = Z.getUid(),a = M(n.uid),u = [];r.forEach(function (e) {u.push(M(e.uid));}), i === s ? (ae.removeNotice(e), yr(u), Nr(a, u, !0), ee("onGroupMemberChanged", a)) : (q.saveJoinedGroups(a), mr(a), yr(i), ee("onGroupListUpdate")), ee("onGroupApplyAccepted", e);}), z("imGroupApplyDeclined", function (e) {var t = e.payload,n = t.from,o = t.to,r = M(n.uid),i = Z.getUid(),s = [];o.forEach(function (e) {s.push(M(e.uid));}), r === i ? yr(s) : ae.saveNotice(e), ee("onGroupApplyDeclined", e);}), z("imGroupInvited", function (e) {var t = e.payload,n = t.gid,o = t.from,_t$to7 = t.to,r = _t$to7 === void 0 ? [] : _t$to7,i = M(o.uid),s = Z.getUid(),a = M(n.uid),u = [];r.forEach(function (e) {u.push(M(e.uid));}), i === s ? yr(u) : u.findIndex(function (e) {return e === s;}) > -1 ? (yr(i), mr(a), ae.saveNotice(e)) : yr(u), ee("onGroupNotice", e);}), z("imGroupInvitedAccepted", function (e) {var t = e.payload,n = t.gid,o = t.from,_t$to8 = t.to,r = _t$to8 === void 0 ? [] : _t$to8,i = M(o.uid),s = Z.getUid(),a = M(n.uid),u = [];r.forEach(function (e) {u.push(M(e.uid));}), i === s ? (ae.removeNotice(e), q.saveJoinedGroups(a), mr(a), ee("onGroupListUpdate")) : (Nr(a, i, !0), yr(i), ee("onGroupMemberChanged", a)), ee("onGroupInvitedAccepted", e);}), z("imGroupInvitedDeclined", function (e) {var t = e.payload,n = t.gid,o = t.from,r = M(o.uid),i = Z.getUid(),s = M(n.uid);r === i ? (ae.removeNotice(e), ae.saveNotice(e), mr(s)) : yr(r), ee("onGroupInvitedDeclined", e);}), z("imGroupKicked", function (e) {e = Object.assign({}, e);var _e17 = e,t = _e17.payload,n = t.gid,_t$to9 = t.to,o = _t$to9 === void 0 ? [] : _t$to9,r = Z.getUid(),i = M(n.uid),s = [];o.forEach(function (e) {s.push(M(e.uid));}), s.findIndex(function (e) {return e === r;}) > -1 ? (q.removeGroup(i), ae.saveNotice(e), ne.deleteRecentById(n), se.deleteGroupMessageByGid(n), ee("onGroupListUpdate")) : br(i, s);}), z("imGroupBlocked", function (e) {var t = e.payload,n = t.gid,_t$to10 = t.to,o = _t$to10 === void 0 ? [] : _t$to10,r = Z.getUid(),i = M(n.uid),s = [];o.forEach(function (e) {s.push(M(e.uid));}), s.findIndex(function (e) {return e === r;}) > -1 ? (q.removeGroup(i), ae.saveNotice(e), ne.deleteRecentById(n), se.deleteGroupMessageByGid(n), ee("onGroupListUpdate")) : (yr(s), br(i, s));}), z("imGroupUnblocked", function (e) {var t = e.payload,_t$to11 = t.to,n = _t$to11 === void 0 ? [] : _t$to11,o = [];n.forEach(function (e) {o.push(M(e.uid));}), yr(o);}), z("imGroupOwnerAssigned", function (e) {var t = e.payload,n = t.from,_t$to12 = t.to,o = _t$to12 === void 0 ? [] : _t$to12,r = M(n.uid),i = Z.getUid(),s = [];o.forEach(function (e) {s.push(M(e.uid));}), r !== i && s.push(r), yr(s), ee("onGroupOwnerAssigned", e);}), z("imGroupAdminGranted", function (e) {var t = e.payload,n = t.from,_t$to13 = t.to,o = _t$to13 === void 0 ? [] : _t$to13,r = M(n.uid),i = Z.getUid(),s = [];o.forEach(function (e) {s.push(M(e.uid));}), r !== i && s.push(r), yr(s), ee("onGroupAdminGranted", e);}), z("imGroupAdminRevoked", function (e) {var t = e.payload,n = t.from,_t$to14 = t.to,o = _t$to14 === void 0 ? [] : _t$to14,r = M(n.uid),i = Z.getUid(),s = [];o.forEach(function (e) {s.push(M(e.uid));}), r !== i && s.push(r), yr(s), ee("onGroupAdminRevoked", e);}), z("imGroupMuted", function (e) {ee("onGroupMuted", e);}), z("imGroupUnblocked", function (e) {ee("onGroupUnblocked", e);}), z("imGroupBaned", function (e) {ee("onGroupBaned", e);}), z("imGroupUnbaned", function (e) {ee("onGroupUnbaned", e);}), z("imGroupInfoUpdated", function (e) {var t = e.payload,n = t.gid,_t$content3 = t.content,o = _t$content3 === void 0 ? "{}" : _t$content3,r = M(n.uid);var i = {};try {i = JSON.parse(o);} catch (e) {}if (Object.keys(i).length) {var _e18 = Object.assign({}, q.getGroupInfo(r), i);q.saveGroupInfo([_e18]), ee("onGroupListUpdate");}}), z("imGroupAnnouncementUpdated", function (e) {var t = e.payload,n = t.gid,o = M(n.uid);mr(o, !0), ee("onGroupAnnouncementUpdated", e);}), z("imReadRosterMessage", function (e) {var t = e.roster_id,n = e.mid,o = e.isReceived;var r = !1;if (n) {var _e19 = se.getRosterMessageById(t, n);if (wr(_e19) && !o) {r = !0;var _e20 = xn(t, n);ee("sendMessage", _e20);}} else {var _e21 = se.getRosterMessage(t);var _n7;if (_e21.forEach(function (e) {if (wr(e) && !o) {r = !0;var _n8 = xn(t, e.id);ee("sendMessage", _n8);}_n7 = e.id;}), se.saveFormatedRosterMessage(t, _e21), !o && r) {var _e22 = Ln(t, _n7);ee("sendMessage", _e22);}}r && ee("onUnreadChange", t);});var wr = function wr(e) {var t = !1;var n = Sr(e, R.READ);if (e && n) {var _n9 = Z.getUid(),_o6 = M(e.from);_o6 > 0 && _o6 != _n9 && (t = !0);}return t;},Sr = function Sr(e, t) {var n = !1;if (e && e.status != t) {var _o7 = e;_o7.status = t, se.saveRosterMessage(x(_o7)), n = !0;}return n;};z("imReadGroupMessage", function (e) {var t = e.group_id,n = e.mid,o = e.isReceived;var r = !1;if (n) {var _e23 = se.getGroupMessageById(t, n);if (Ir(_e23) && !o) {r = !0;var _t10 = U(_e23.from),_o8 = xn(_t10, n);ee("sendMessage", _o8);}} else {var _e24 = se.getGroupMessage(t);var _n10;if (_e24.forEach(function (e) {if (Ir(e) && !o) {r = !0;var _t11 = U(e.from),_n11 = xn(_t11, e.id);ee("sendMessage", _n11);}_n10 = e.id;}), se.saveFormatedGroupMessage(t, _e24), !o && r) {var _e25 = Ln(t, _n10);ee("sendMessage", _e25);}}r && ee("onUnreadChange", t);});var Ir = function Ir(e) {var t = !1;var n = kr(e, R.READ);if (e && n) {var _n12 = Z.getUid(),_o9 = M(e.from);_o9 > 0 && _o9 != _n12 && e.config && e.config.groupMemberList && (t = !0);}return t;},kr = function kr(e, t) {var n = !1;if (e && e.status != t) {var _o10 = e;_o10.status = t, se.saveGroupMessage(x(_o10)), n = !0;}return n;},Rr = function Rr(e, t) {var n = [];n = t ? se.getGroupMessage(e) : se.getRosterMessage(e), n.length > 0 && ne.saveRecent(n[n.length - 1]);};z("onActionMessage", function (e) {var t = e.payload,n = e.from,o = e.to,r = e.isReceived,i = t.type,_t$operation2 = t.operation,s = _t$operation2 === void 0 ? {} : _t$operation2,a = Z.getUid() + "",u = o ? U(o.uid) : 0,c = U(n.uid),d = a + "" == c + "" ? u : c,l = -1 != q.getJoinedGroups().indexOf(u - 0);if (i !== _.OPER) return;var p = s.type,f = s.mid,h = s.xid;var g;g = l ? se.getGroupMessageById(d, f) : se.getRosterMessageById(d, f), p === E.READ_ACK ? (!l && wr(g), l && Ir(g)) : p === E.DELIVER_ACK ? (!l && Sr(g, R.DELIVERED), l && kr(g, R.DELIVERED)) : p === E.RECALL ? (!l && se.deleteSingleRosterMessage(d, f), l && se.deleteSingleGroupMessage(d, f), Rr(d, l), ee("onMessageRecalled", { uid: d, mid: f })) : p === E.DELETE ? (!l && se.deleteSingleRosterMessage(h.uid, f), l && se.deleteSingleGroupMessage(h.uid, f), Rr(h.uid, l), ee("onMessageDeleted", { uid: h.uid, mid: f })) : p === E.READ_CANCEL ? (!l && Sr(g, R.UNREAD), l && kr(g, R.UNREAD), ee("onMessageCanceled", { uid: d, mid: f })) : p === E.READ_ALL && (l ? ee("imReadGroupMessage", { group_id: h.uid, mid: f, isReceived: r }) : ee("imReadRosterMessage", { roster_id: h.uid, mid: f, isReceived: r }));var y = U(h && h.uid ? h.uid : d);ee("onMessageStatusChanged", { uid: y, mid: U(f) }), ee("onUnreadChange", y);});var Tr = {};z("swapSendMessage", function (e) {var t = e.payload,n = t.meta,o = n.id;Tr[U(o)] = e;}), z("receivedSendMessage", function (e) {e = U(e);var t = Tr[e];if (t) {var _e26 = t.payload,_n13 = _e26.meta,_o11 = _n13.payload,_r7 = _o11.type;_r7 === _.OPER && ee("onActionMessage", _n13);}}), z("deleteConversation", function (_ref2) {var e = _ref2.id,t = _ref2.source;ee("flooNotice", { category: "conversation_deleted", desc: { id: e, source: t } });var _ne$getRecentById = ne.getRecentById(e),n = _ne$getRecentById.idx,o = _ne$getRecentById.type;n < 0 || ("group" == o ? se.deleteGroupMessageByGid(e) : se.deleteRosterMessageByRosterId(e), ne.deleteRecentById(e));});var Dr = Nr;var Mr = { asyncGetGroupInfo: function asyncGetGroupInfo(e, t) {e -= 0;var n = q.getGroupInfo(e) || {};return n.name && !t ? Promise.resolve(n) : lr.groupInfo({ group_id: e }).then(function (e) {return q.saveGroupInfo([e]), e;});}, asyncGetJoinedGroups: function asyncGetJoinedGroups(e) {return e ? lr.groupUserjoined({}).then(function (e) {return Array.isArray(e) ? e : q.getGroupInfoList();}) : Promise.resolve(q.getGroupInfoList());}, openGroup: function openGroup(e) {lr.groupMemberlist({ group_id: e }).then(function (t) {q.saveGroupMembers(e, t);var n = t.map(function (e) {return e.user_id;});n.length && Dr(e, n, !1, !0), ee("onGroupMemberChanged", e);});}, getAllGroupDetail: function getAllGroupDetail() {return q.getAllGroupInfos();}, asyncGetGroupMembers: function asyncGetGroupMembers(e) {return lr.groupMemberlist({ group_id: e }).then(function (t) {q.saveGroupMembers(e, t);var n = t.map(function (e) {return e.user_id;});return n.length && Dr(e, n, !1, !0), n;});}, getGroupMembers: function getGroupMembers(e) {return q.getGroupMembers(e) || [];}, asyncGetGroupListDetail: function asyncGetGroupListDetail(e) {return e && e.length ? lr.groupInfoBatch({ group_list: e }).then(function (e) {return q.saveGroupInfo(e), e;}) : Promise.resolve({});}, getGruopMessage: function getGruopMessage(e) {return se.getGroupMessage(e);}, readGroupMessage: function readGroupMessage(e, t) {ee("imReadGroupMessage", { group_id: e, mid: t });}, recallMessage: function recallMessage(e, t) {var n = Gn(e, t);ee("sendMessage", n), ee("swapSendMessage", n);}, getUnreadCount: function getUnreadCount(e) {return se.getUnreadByGroupId(e);}, asyncGetAdminList: lr.groupAdminList, asyncAdminAdd: lr.groupAdminAdd, asyncAdminRemove: lr.groupAdminRemove, asyncGetAnouncementById: lr.groupAnnouncement, asyncAnouncementDelete: lr.groupAnnouncementDelete, asyncAnnouncementEdit: lr.groupAnnouncementEdit, asyncGetAnnouncementList: lr.groupAnnouncementList, asyncCreate: lr.groupCreate, asyncDestroy: lr.groupDestroy, asyncGetInfo: function asyncGetInfo(e) {return e.group_id || (e = { group_id: e }), lr.groupInfo(e);}, asyncUpdateAvatar: lr.groupInfoAvatar, asyncUpdateDescription: lr.groupInfoDdscription, asyncUpdateName: lr.groupInfoName, asyncGetMemberList: function asyncGetMemberList(e) {return e.group_id || (e = { group_id: e }), lr.groupMemberlist(e);}, asyncGroupMsgMutemode: lr.groupMsgMutemode, asyncGetPublicList: lr.groupPubliclist, asyncUpdateMsgNotDisturb: lr.groupMsgNotdisturb, asyncGroupBannedList: lr.groupBannedList, asyncGroupBab: lr.groupBab, asyncGroupUnban: lr.groupUnban, asyncGetSettings: lr.groupSettings, asyncUpdateAllowMemberInvitation: lr.groupSettingsAllowmemberinvitation, asyncUpdateAllowMemberModify: lr.groupSettingsAllowmembermodify, asyncUpdateEnableReadack: lr.groupSettingsEnablereadack, asyncUpdateHistoryVisible: lr.groupSettingsHistoryvisible, asyncUpdateRequireadminapproval: lr.groupSettingsRequireadminapproval, asyncOwnerTransfer: lr.groupTransfer, asyncGetUserJoined: lr.groupUserjoined, asyncApply: lr.groupApply, asyncApplyHandle: lr.groupApplyHandle, asyncGroupBockedlist: lr.groupBockedlist, asyncGroupBlock: lr.groupBlock, asyncGroupUnblock: lr.groupUnblock, asyncKick: lr.groupKick, asyncGetInvitationList: lr.groupInvitationlist, asyncInvite: lr.groupInvite, asyncInviteHandle: lr.groupInviteHandle, asyncGetMemberDisplayName: lr.groupMembersDidpayname, asyncLeave: lr.groupLeave, asyncUpdateDisplayName: lr.groupDisplayname, asncGetApplicationList: lr.groupApplicationlist, asyncGetFileList: lr.groupFilelist, asyncFileDelete: lr.groupFiledelete, asyncFileUpload: lr.groupFileupload };var Cr = { getToken: function getToken() {return Z.getToken();}, getUid: function getUid() {return Z.getUid();}, getAppid: function getAppid() {return Z.getAppid();}, getConversationList: function getConversationList() {return ne.getRecents();}, deleteToken: Z.deleteToken, getDeviceSN: function getDeviceSN() {return Z.getDeviceSN();}, asyncBindDeviceToken: lr.bindDeviceToken, asyncUnbindDeviceToken: lr.unbindDeviceToken, asyncTokenUser: lr.tokenUser, asyncTokenId: lr.tokenId, asyncRegister: lr.userRegister, asyncUserBindMobile: lr.userBindMobile, asyncUserUpdateMobile: lr.userUpdateMobile, asyncUserSendSms: lr.userSendSms, asyncCaptchaSms: lr.captchaSms, asyncUserNameCheck: lr.userNameCheck, asyncUserMobileBind: lr.userMobileBind, asyncUserMobileBindSign: lr.userMobileBindSign, asyncUserMobileLogin: lr.userMobileLogin, asyncCaptchaImagePost: lr.captchaImagePost, asyncUpdateAuthmode: lr.userAuthmode, asyncUpdateAvatar: lr.userAvatar, asyncUpdateMobile: lr.userMobile, asyncUpdateNickName: lr.userNickname, asyncGetProfile: lr.userProfile, asyncUpdateProfile: lr.userProfilePost, asyncGetSettings: lr.userSettings, asyncUpdateSettings: lr.userSettingsPost };var Ur = function Ur(e, t) {return t && e ? e + "_" + t : "";},xr = function xr(e) {if (!e) return {};var t = jr("ws"),n = Lr(e),o = n.clusters,r = n.clusterIndex,i = n.ratelIndex,s = n.fireIndex;if (!o || !o.length) return {};var a = o[r],u = a.ratel[i];var c;if (c = a.webim ? a.webim[s] : a.ws[s], !u || !c) return {};var d = u.protocol + "://" + u.host;var l = "https";l = t ? "https" === c.protocol ? "wss" : "ws" : c.protocol;return { ratel: d, fireplace: l + "://" + c.host };};z("ratelError", function () {c.log("Ratel error, should try next in list");var e = jr("app_id");(function (e) {var t = Lr(e);var n = t.clusters,o = t.clusterIndex,r = t.ratelIndex,i = t.fireIndex;n[o].ratel.length > r + 1 ? (r++, Pr(e, { clusters: n, clusterIndex: o, ratelIndex: r, fireIndex: i })) : Gr(e);})(e);var _ref3 = xr(e) || {},t = _ref3.ratel;ee("refresh_ratel", t);});z("fireplaceError", function () {var e = jr("app_id");c.log("Fireplace error, should try next in list, appid: ", e), function (e) {var t = Lr(e);var n = t.clusters,o = t.clusterIndex,r = t.ratelIndex,i = t.fireIndex;var s = n[o];var a;a = s.webim ? s.webim : s.ws, a.length > i + 1 ? (i++, Pr(e, { clusters: n, clusterIndex: o, ratelIndex: r, fireIndex: i })) : Gr(e);}(e);var _ref4 = xr(e) || {},t = _ref4.fireplace;ee("refresh_fireplace", t);});var Gr = function Gr(e) {var t = Lr(e);var n = t.clusters,o = t.clusterIndex;for (; n.length > o + 1;) {o++;var _t12 = n[o];var _r8 = void 0;if (_r8 = _t12.webim ? _t12.webim : _t12.ws, _r8.length >= 0) return void Pr(e, { clusters: n, clusterIndex: o, ratelIndex: 0, fireIndex: 0 });}ee("retrieve_dns");},Lr = function Lr(e) {return j(Ur("key_dns_infos", e), !1) || {};},Pr = function Pr(e, t) {P(Ur("key_dns_infos", e), t, !1);},jr = function jr(e) {return e ? j(Ur("key_dns_config", e), !1) : "";},Br = function Br(e, t) {e && t && P(Ur("key_dns_config", e), t, !1);};z("retrieve_dns", function () {var e = jr("dns_server"),t = jr("app_id"),n = jr("ws");c.warn("Retrieve DNS for appid: ", t), Fr(e, t, n);});var Fr = function Fr(e, t, n) {Br("dns_server", e), Br("app_id", t), Br("ws", n);var o = xr(t);return o.ratel ? Promise.resolve(o) : _e(e, { app_id: t }).then(function (e) {return c.info("DNS SUCCESS: ", e), function (e, t) {if (!e) return {};var n = t.version,o = t.dns_list,r = o.findIndex(function (e) {return 0 == e.group_level;});if (r < 0) return c.error("DNS ERROR: no available clusters (version:", n, ")"), {};var i = { clusters: o[r].clusters, clusterIndex: 0, ratelIndex: 0, fireIndex: 0 };Pr(e, i);}(t, e), xr(t);});};var Vr = { asyncGetDns: Fr, getServers: xr };var qr = function qr(_ref5) {var _ref5$url = _ref5.url,e = _ref5$url === void 0 ? "" : _ref5$url,_ref5$params = _ref5.params,t = _ref5$params === void 0 ? {} : _ref5$params;if (!e) return "";var n = Z.getToken(),o = Z.getAppid();return t = Object.assign(t, { "access-token": n, app_id: o }), e.indexOf("?") > 0 ? e += "&" : e += "?", e + le.a.stringify(t);},Jr = function Jr(_ref6) {var _ref6$url = _ref6.url,e = _ref6$url === void 0 ? "" : _ref6$url,_ref6$type = _ref6.type,t = _ref6$type === void 0 ? "" : _ref6$type,_ref6$params = _ref6.params,n = _ref6$params === void 0 ? {} : _ref6$params;if (console.log("Download chat file: ", t, " ", e), !e) return "";return lr.fileDownloadChatFileUrl(e, n, { operation: "download_file" });};var Kr = { getStaticVars: function getStaticVars() {return o;}, sendRosterMessage: function sendRosterMessage(e) {var t = Un(e),n = t.payload.meta;se.saveSendingRosterMessage(n), lr.sendMessage(t);}, sendGroupMessage: function sendGroupMessage(e) {var t = Cn(e),n = t.payload.meta;se.saveSendingGroupMessage(n), lr.sendMessage(t);}, sendMentionMessage: function sendMentionMessage(e) {var t = function (e) {var t = e.gid,n = e.txt,o = e.mentionAll,r = e.mentionList,i = e.mentionedMessage,s = e.pushMessage,a = e.senderNickname;var u = N.TEXT;var c = new yn({ uid: Z.getUid() - 0, deviceSN: Tn }),d = new yn({ uid: t, deviceSN: 0 }),l = new En();l.setCommond(f.SYNC);var p = new wn(),h = new vn({ from: c, to: d, content: n, ctype: u, type: _.GROUPCHAT });h.config = JSON.stringify({ mentionAll: o, mentionList: r, mentionedMessage: i, pushMessage: s, senderNickname: a });var g = new In({ id: new Date().getTime(), from: c, to: d, payload: h, ns: v.MESSAGE });return p.setMeta(g), l.setPayload(p), l;}(e),n = t.payload.meta;se.saveSendingGroupMessage(n), lr.sendMessage(t);}, sendInputStatusMessage: function sendInputStatusMessage(e, t) {var n = function (e, t) {var n = N.TEXT;var o = new yn({ uid: Z.getUid() - 0, deviceSN: Tn }),r = new yn({ uid: e - 0, deviceSN: 0 }),i = new En();i.setCommond(f.SYNC);var s = new wn(),a = new vn({ from: o, to: r, ctype: n, type: _.CHAT, ext: JSON.stringify({ input_status: t }), qos: b.AT_MOST_ONCE }),u = new In({ id: new Date().getTime(), from: o, to: r, payload: a, ns: v.MESSAGE });return s.setMeta(u), i.setPayload(s), i;}(e, t);lr.sendMessage(n);}, sendMessage: lr.sendMessage, getNoticeMessage: ae.getNotice(), getMessageStatus: function getMessageStatus(e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;var o = {};o = n ? se.getGroupMessageById(e, t) : se.getRosterMessageById(e, t);var r = Object.keys(R)[o.status];return r ? r.toLowerCase() : void 0;}, forwardMessage: function forwardMessage(e) {var t = e.uid,n = e.mid,o = e.gid;var r = void 0;r = t ? se.getRosterMessageById(t, n) : se.getGroupMessageById(o, n);var i = r.attach;if (i && i.url) {var _e27 = i.url.split("sign=")[1];var _n14 = Z.getToken();lr.fileForward({ file_sign: _e27, "access-token": _n14, to_id: (t || o) - 0, to_type: t ? 1 : 2 }).then(function (e) {r.attach.url = e;var n = Pn(t, o, r),i = n.payload.meta;t ? se.saveSendingRosterMessage(i) : se.saveSendingGroupMessage(i), lr.sendMessage(n);});} else {var _e28 = Pn(t, o, r),_n15 = _e28.payload.meta;t ? se.saveSendingRosterMessage(_n15) : se.saveSendingGroupMessage(_n15), lr.sendMessage(_e28);}}, asyncFileUpload: function asyncFileUpload(e) {return new Promise(function (t, n) {var o = e.group_id,r = e.to_id,i = e.toType,s = e.file,a = e.fileType,u = e.chatType;var d = "";d = "rosterAvatar" === i ? "fileUploadAvatarUrl" : "chat" == i ? "fileUploadChatFileUrl" : "fileUploadGroupAvatarUrl";var l = {},p = Z.getToken();"groupAvatar" === i && (l["access-token"] = p);a && (l.file_type = ["file", "audio", "image", "video", "audio-mp3"].indexOf(a) + 100), l < 100 && (l.file_type = ["shareFile", "shareAudio", "shareImage", "shareVideo"].indexOf(a) + 200), o && (l.group_id = o), "group" == u && (l.to_type = 2), "roster" == u && (l.to_type = 1), r && (l.to_id = r), lr[d](l).then(function (e) {var n = { filePath: s, name: "file" };e.oss_body_param && e.oss_body_param.key && (n = Object.assign(n, { formData: { OSSAccessKeyId: e.oss_body_param.OSSAccessKeyId, policy: e.oss_body_param.policy, signature: e.oss_body_param.signature, callback: e.oss_body_param.callback, key: e.oss_body_param.key } }));lr.asyncFileUpload(e.upload_url, n, { operation: "upload_file" }).then(function () {t({ url: e.download_url });}).catch(function (e) {c.error("Fail to upload file due to ", e);});}).catch(function (e) {n(e);});});}, requireHistoryMessage: function requireHistoryMessage(e, t, n) {var o = function (e, t, n) {t = C(t);var o = new En();o.setCommond(f.SYNC);var r = new yn({ uid: M(e), deviceSN: 0 }),i = new wn();return i.setXid(r), i.setKey(M(t)), i.setFullsyncnum(n), i.setIsfullsync(!0), o.setPayload(i), o;}(e, t, n);lr.sendMessage(o);}, makeSearch: function makeSearch(e) {var t = [],n = [];(ce.getRosterInfoList() || []).forEach(function (n) {var o = !1;var r = n.user_id,i = n.username,s = n.avatar;(se.getRosterMessage(r) || []).forEach(function (n) {if (o) return;var _n$payload = n.payload,a = _n$payload === void 0 ? {} : _n$payload,_a$content = a.content,u = _a$content === void 0 ? "" : _a$content;u.indexOf(e) >= 0 && (o = !0, t.push({ user_id: r, username: i, avatar: s, content: u }));}), o || i.indexOf(e) >= 0 && t.push({ user_id: r, username: i, avatar: s });});return q.getGroupInfoList().forEach(function (t) {var o = !1;var r = t.group_id,i = t.name;(se.getGroupMessage(r) || []).forEach(function (t) {if (o) return;var _t$payload = t.payload,s = _t$payload === void 0 ? {} : _t$payload,_s$content = s.content,a = _s$content === void 0 ? "" : _s$content;a.indexOf(e) >= 0 && (o = !0, n.push({ group_id: r, name: i, content: a }));}), o || i.indexOf(e) >= 0 && n.push({ group_id: r, name: i });}), { rosterArr: t, groupArr: n };}, asyncGetUserAvatarUploadUrl: lr.fileUploadAvatarUrl, asyncGetGroupAvatarUploadUrl: lr.fileUploadGroupAvatarUrl, asyncGetFileUploadChatFileUrl: lr.fileUploadChatFileUrl, asyncQrcode: lr.qrcode, asyncQrlogin: lr.qrlogin, asyncQrcodeGroupsign: lr.qrcodeGroupsign, asyncQrcodeGroupinvite: lr.qrcodeGroupinvite, asyncWxlogin: lr.wxlogin, asyncWxbind: lr.wxbind, asyncGetStaticContact: lr.getStaticContact, getImage: function getImage(_ref7) {var _ref7$avatar = _ref7.avatar,e = _ref7$avatar === void 0 ? "" : _ref7$avatar,_ref7$type = _ref7.type,t = _ref7$type === void 0 ? "roster" : _ref7$type,_ref7$thumbnail = _ref7.thumbnail,n = _ref7$thumbnail === void 0 ? !0 : _ref7$thumbnail,_ref7$sdefault = _ref7.sdefault,o = _ref7$sdefault === void 0 ? "" : _ref7$sdefault;if (/^\//.test(e)) return e;if (!e) return "roster" === t ? o || "/static/image/roster.png" : o || "/static/image/group.png";var r = e,i = {};if (0 !== e.indexOf("http")) {var _t13 = Z.getAppid();var _ref8 = Vr.getServers(_t13) || {},_n16 = _ref8.ratel;!/\/$/.test(_n16) && _n16.length > 5 && (r = _n16 + "/file/download/avatar"), i = Object.assign(i, { object_name: e });}return n && (i = Object.assign(i, { image_type: 2 })), qr({ url: r, type: "image", params: i });}, getAudio: function getAudio(_ref9) {var e = _ref9.url,_ref9$type = _ref9.type,t = _ref9$type === void 0 ? "audio" : _ref9$type;return qr({ url: e, type: t, params: { format: "mp3" } });}, getChatFile: qr, downloadAudio: function downloadAudio(_ref10) {var _ref10$url = _ref10.url,e = _ref10$url === void 0 ? "" : _ref10$url,_ref10$type = _ref10.type,t = _ref10$type === void 0 ? "audio" : _ref10$type;return Jr({ url: e, type: t, params: { format: "mp3" } });}, getServers: Vr.getServers, asyncWechatUnbind: lr.wechatUnbind, asyncWechatIsbind: lr.wechatIsbind, asyncWechatBind: lr.wechatBind, deleteConversation: function deleteConversation(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;ee("deleteConversation", { id: e, other_devices: t, source: "user_operation" });var n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;var n = k.DELETE;t && (n = k.DELETE_EVERYWHERE);var o = new yn({ uid: Z.getUid() - 0, deviceSN: Tn }),r = new yn({ uid: e }),i = new Rn({ type: I.OPER, operation: { xid: r, type: n } }),s = new In({ id: new Date().getTime(), from: o, payload: i, ns: v.CONVERSATION }),a = new wn();a.setMeta(s);var u = new En();return u.setCommond(f.SYNC), u.setPayload(a), u;}(e, t);lr.sendMessage(n);} };var Yr = {},Wr = null,Hr = !1,Zr = !1;var Xr = function Xr(_ref11) {var _ref11$autoLogin = _ref11.autoLogin,e = _ref11$autoLogin === void 0 ? !0 : _ref11$autoLogin,_ref11$dnsServer = _ref11.dnsServer,t = _ref11$dnsServer === void 0 ? "https://dns.maximtop.com/v2/app_dns" : _ref11$dnsServer,_ref11$appid = _ref11.appid,n = _ref11$appid === void 0 ? "welovemaxim" : _ref11$appid,_ref11$ws = _ref11.ws,o = _ref11$ws === void 0 ? !1 : _ref11$ws;Z.saveAppid(n), Vr.asyncGetDns(t, n, o).then(function (o) {var r = o.ratel,i = o.fireplace;if (!r || !i) return c.log("DNS error, check the server: ", t), void ee("flooError", { category: "DNS_FAILED", desc: t });if ($r(n), Yr = { appid: n, baseUrl: r, autoLogin: e, fireplace: i }, Xr.baseUrl = Yr.baseUrl, Hr = !0, Wr) {var _Wr = Wr,_e29 = _Wr.type;return "login" == _e29 && Xr.login(Wr.opt), "qrlogin" == _e29 && Xr.qrlogin(Wr.opt), void ("tokenLogin" == _e29 && Xr.tokenLogin(Wr.user_id, Wr.token));}if (Yr.autoLogin) {Zr = !0;var _e30 = Z.getUid(),_t14 = Z.getToken();if (_e30 && _t14) {var _e31 = pr.asyncGetRosterIdList(!0),_t15 = Mr.asyncGetJoinedGroups(!0);Promise.all([_e31, _t15]).then(function (e) {var t = e[0],n = e[1];ee("imRostersGroupslistReady", { rosters: t, groups: n }), c.log("get roster, group over .... will io connect"), lr.connect(Yr);}).catch(function (e) {ee("flooNotice", { category: "loginMessage", desc: "get roster list failure:" + e.message });});}}}).catch(function (e) {console.log("flooim init error, please retry later: ", e);});},$r = function $r(e) {c.log("setup servers for app: ", e);var _ref12 = Vr.getServers(e) || {},t = _ref12.ratel,n = _ref12.fireplace;ee("refresh_ratel", t), ee("refresh_fireplace", n);};Xr.login = function (e) {console.log("webim.login", e, "sdkOk:", Hr), Hr ? (ee("flooNotice", { category: "loginMessage", desc: "getting token..." }), lr.tokenUser(e).then(function (e) {var t = e.token,n = e.user_id,o = e.public_key;Z.saveUid(n), Z.saveToken(t), Z.saveAesKey(o);var r = pr.asyncGetRosterIdList(!0),i = Mr.asyncGetJoinedGroups(!0);console.log("Get token success"), Zr = !0, ee("flooNotice", { category: "loginMessage", desc: "token sucecc, getting roster lists.." }), Promise.all([r, i]).then(function (e) {var o = e[0],r = e[1];ee("imRostersGroupslistReady", { rosters: o, groups: r }), c.log("get roster, group over .... will io connect"), Yr = Object.assign({ uid: n, token: t }, Yr), lr.connect(Yr), Wr = null;}).catch(function (e) {ee("flooNotice", { category: "loginMessage", desc: "get roster list failure:" + e.message });});}).catch(function (e) {ee("loginFail", "token failure:" + e.message);})) : Wr = { type: "login", opt: e };}, Xr.qrlogin = function (e) {console.log("webim.qrlogin", e), Hr ? (ee("flooNotice", { category: "loginMessage", desc: "getting token..." }), lr.tokenId(e).then(function (e) {var t = e.token,n = e.user_id,o = e.public_key;Z.saveUid(n), Z.saveToken(t), Z.saveAesKey(o);var r = pr.asyncGetRosterIdList(!0),i = Mr.asyncGetJoinedGroups(!0);ee("flooNotice", { category: "loginMessage", desc: "token sucecc, getting roster lists.." }), Zr = !0, Promise.all([r, i]).then(function (e) {var o = e[0],r = e[1];ee("imRostersGroupslistReady", { rosters: o, groups: r }), c.log("get roster, group over .... will io connect"), Yr = Object.assign({ uid: n, token: t }, Yr), lr.connect(Yr), Wr = null;}).catch(function (e) {ee("flooNotice", { category: "loginMessage", desc: "get roster list failure:" + e.message });});}).catch(function (e) {ee("loginFail", "token failure:" + e.message);})) : Wr = { type: "qrlogin", opt: e };}, Xr.tokenLogin = function (e, t, n) {if (console.log("webim.tokenLogin", e, t), !Hr) return void (Wr = { type: "tokenLogin", user_id: e, token: t });Z.saveUid(e), Z.saveToken(t), Z.saveAesKey(n);var o = pr.asyncGetRosterIdList(!0),r = Mr.asyncGetJoinedGroups(!0);ee("flooNotice", { category: "loginMessage", desc: "token sucecc, getting roster lists.." }), Zr = !0, Promise.all([o, r]).then(function (n) {var o = n[0],r = n[1];ee("imRostersGroupslistReady", { rosters: o, groups: r }), c.log("get roster, group over .... will io connect"), Yr = Object.assign({ uid: e, token: t }, Yr), lr.connect(Yr), Wr = null;}).catch(function (e) {ee("flooNotice", { category: "loginMessage", desc: "get roster list failure:" + e.message });});}, Xr.idLogin = function (e) {lr.tokenId(e).then(function (e) {var t = e.token,n = e.user_id,o = e.public_key;Z.saveUid(n), Z.saveToken(t), Z.saveAesKey(o);var r = pr.asyncGetRosterIdList(!0),i = Mr.asyncGetJoinedGroups(!0);ee("flooNotice", { category: "loginMessage", desc: "token success, getting roster lists.." }), Zr = !0, Promise.all([r, i]).then(function (e) {var o = e[0] || [];o.push(n);var r = e[1];ee("imRostersGroupslistReady", { rosters: o, groups: r }), c.log("get roster, group over .... will io connect"), Yr = Object.assign({ uid: n, token: t }, Yr), lr.connect(Yr), Wr = null;}).catch(function (e) {ee("flooNotice", { category: "loginMessage", desc: "get roster list failure:" + e.message });});}).catch(function (e) {ee("loginFail", "token failure:" + e.message);});}, Xr.wxlogin = function () {}, Xr.cleanup = function () {c.log("FLOO: IM logout, cleanup the data."), ne.clear(), ce.clear(), q.clear(), Z.clear(), se.clearAll();}, Xr.isLogin = function () {return Zr && Z.getUid() && Z.getToken();}, Xr.on = Xr.listen = function (e, t) {if (t) z(e, t);else {Object.keys(e).forEach(function (t) {z(t, e[t]);});}}, Xr.off = function (e, t) {if (t) Q(e, t);else {Object.keys(e).forEach(function (t) {Q(t, e[t]);});}}, Xr.logout = function () {lr.disConnect(), Xr.cleanup();}, Xr.isReady = function () {return Hr;}, Xr.disConnect = lr.disConnect;var zr = Xr;function Qr(e) {return new zr(e), zr;}zr.rosterManage = pr, zr.groupManage = Mr, zr.userManage = Cr, zr.sysManage = Kr;t.default = Qr;}]).default;});

/***/ }),

/***/ 95:
/*!***********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/美信拓扑即时通讯 IM SDK，为 App 添加聊天功能示例/third/moment.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js
(function (global, factory) {
   true ?
  module.exports = factory() :
  undefined;
})(this, function () {
  'use strict';

  var hookCallback;

  function hooks() {
    return hookCallback.apply(null, arguments);
  } // This is done to register the method called with moment()
  // without creating circular dependencies.

  function setHookCallback(callback) {
    hookCallback = callback;
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }

  function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
  }

  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k;

      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          return false;
        }
      }

      return true;
    }
  }

  function isUndefined(input) {
    return input === void 0;
  }

  function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
  }

  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  }

  function map(arr, fn) {
    var res = [],
    i;

    for (i = 0; i < arr.length; ++i) {
      res.push(fn(arr[i], i));
    }

    return res;
  }

  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }

    if (hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }

    return a;
  }

  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
  }

  function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      meridiem: null,
      rfc2822: false,
      weekdayMismatch: false };

  }

  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags();
    }

    return m._pf;
  }

  var some;

  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function some(fun) {
      var t = Object(this);
      var len = t.length >>> 0;

      for (var i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true;
        }
      }

      return false;
    };
  }

  function isValid(m) {
    if (m._isValid == null) {
      var flags = getParsingFlags(m);
      var parsedParts = some.call(flags.parsedDateParts, function (i) {
        return i != null;
      });
      var isNowValid =
      !isNaN(m._d.getTime()) &&
      flags.overflow < 0 &&
      !flags.empty &&
      !flags.invalidMonth &&
      !flags.invalidWeekday &&
      !flags.weekdayMismatch &&
      !flags.nullInput &&
      !flags.invalidFormat &&
      !flags.userInvalidated && (
      !flags.meridiem || flags.meridiem && parsedParts);

      if (m._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
      }

      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
    }

    return m._isValid;
  }

  function createInvalid(flags) {
    var m = createUTC(NaN);

    if (flags != null) {
      extend(getParsingFlags(m), flags);
    } else {
      getParsingFlags(m).userInvalidated = true;
    }

    return m;
  } // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.

  var momentProperties = hooks.momentProperties = [];

  function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject;
    }

    if (!isUndefined(from._i)) {
      to._i = from._i;
    }

    if (!isUndefined(from._f)) {
      to._f = from._f;
    }

    if (!isUndefined(from._l)) {
      to._l = from._l;
    }

    if (!isUndefined(from._strict)) {
      to._strict = from._strict;
    }

    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm;
    }

    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC;
    }

    if (!isUndefined(from._offset)) {
      to._offset = from._offset;
    }

    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from);
    }

    if (!isUndefined(from._locale)) {
      to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
      for (i = 0; i < momentProperties.length; i++) {
        prop = momentProperties[i];
        val = from[prop];

        if (!isUndefined(val)) {
          to[prop] = val;
        }
      }
    }

    return to;
  }

  var updateInProgress = false; // Moment prototype object

  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);

    if (!this.isValid()) {
      this._d = new Date(NaN);
    } // Prevent infinite loop in case updateOffset creates new moment
    // objects.

    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }

  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  }

  function absFloor(number) {
    if (number < 0) {
      // -0 -> 0
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  }

  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
    value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }

    return value;
  } // compare two arrays, return the number of differences

  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
    lengthDiff = Math.abs(array1.length - array2.length),
    diffs = 0,
    i;

    for (i = 0; i < len; i++) {
      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
        diffs++;
      }
    }

    return diffs + lengthDiff;
  }

  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
      console.warn('Deprecation warning: ' + msg);
    }
  }

  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function () {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }

      if (firstTime) {
        var args = [];
        var arg;

        for (var i = 0; i < arguments.length; i++) {
          arg = '';

          if (typeof arguments[i] === 'object') {
            arg += '\n[' + i + '] ';

            for (var key in arguments[0]) {
              arg += key + ': ' + arguments[0][key] + ', ';
            }

            arg = arg.slice(0, -2); // Remove trailing comma and space
          } else {
            arg = arguments[i];
          }

          args.push(arg);
        }

        warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
        firstTime = false;
      }

      return fn.apply(this, arguments);
    }, fn);
  }

  var deprecations = {};

  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }

    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }

  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  function set(config) {
    var prop, i;

    for (i in config) {
      prop = config[i];

      if (isFunction(prop)) {
        this[i] = prop;
      } else {
        this['_' + i] = prop;
      }
    }

    this._config = config; // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.

    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
  }

  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig),
    prop;

    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop];
        } else {
          delete res[prop];
        }
      }
    }

    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        // make sure changes to properties don't modify parent config
        res[prop] = extend({}, res[prop]);
      }
    }

    return res;
  }

  function Locale(config) {
    if (config != null) {
      this.set(config);
    }
  }

  var keys;

  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function keys(obj) {
      var i,
      res = [];

      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i);
        }
      }

      return res;
    };
  }

  var defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L' };


  function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
  }

  var defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A' };


  function longDateFormat(key) {
    var format = this._longDateFormat[key],
    formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
      return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
      return val.slice(1);
    });
    return this._longDateFormat[key];
  }

  var defaultInvalidDate = 'Invalid date';

  function invalidDate() {
    return this._invalidDate;
  }

  var defaultOrdinal = '%d';
  var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

  function ordinal(number) {
    return this._ordinal.replace('%d', number);
  }

  var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years' };


  function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
  }

  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  var aliases = {};

  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
  }

  function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  }

  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
    normalizedProp,
    prop;

    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);

        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }

    return normalizedInput;
  }

  var priorities = {};

  function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
  }

  function getPrioritizedUnits(unitsObj) {
    var units = [];

    for (var u in unitsObj) {
      units.push({
        unit: u,
        priority: priorities[u] });

    }

    units.sort(function (a, b) {
      return a.priority - b.priority;
    });
    return units;
  }

  function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
    zerosToFill = targetLength - absNumber.length,
    sign = number >= 0;
    return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }

  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
  var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
  var formatFunctions = {};
  var formatTokenFunctions = {}; // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }

  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;

    if (typeof callback === 'string') {
      func = function func() {
        return this[callback]();
      };
    }

    if (token) {
      formatTokenFunctions[token] = func;
    }

    if (padded) {
      formatTokenFunctions[padded[0]] = function () {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }

    if (ordinal) {
      formatTokenFunctions[ordinal] = function () {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }
  }

  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, '');
    }

    return input.replace(/\\/g, '');
  }

  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
    i,
    length;

    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }

    return function (mom) {
      var output = '',
      i;

      for (i = 0; i < length; i++) {
        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
      }

      return output;
    };
  } // format date using native date object

  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
  }

  function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;

    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }

    return format;
  }

  var match1 = /\d/; //       0 - 9

  var match2 = /\d\d/; //      00 - 99

  var match3 = /\d{3}/; //     000 - 999

  var match4 = /\d{4}/; //    0000 - 9999

  var match6 = /[+-]?\d{6}/; // -999999 - 999999

  var match1to2 = /\d\d?/; //       0 - 99

  var match3to4 = /\d\d\d\d?/; //     999 - 9999

  var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999

  var match1to3 = /\d{1,3}/; //       0 - 999

  var match1to4 = /\d{1,4}/; //       0 - 9999

  var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999

  var matchUnsigned = /\d+/; //       0 - inf

  var matchSigned = /[+-]?\d+/; //    -inf - inf

  var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

  var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

  var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
  // any word (or two) characters or numbers including two/three word month in arabic.
  // includes scottish gaelic two word and hyphenated months

  var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
  var regexes = {};

  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ?
    regex :
    function (isStrict, localeData) {
      return isStrict && strictRegex ? strictRegex : regex;
    };
  }

  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
  } // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript

  function unescapeFormat(s) {
    return regexEscape(
    s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    }));

  }

  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  var tokens = {};

  function addParseToken(token, callback) {
    var i,
    func = callback;

    if (typeof token === 'string') {
      token = [token];
    }

    if (isNumber(callback)) {
      func = function func(input, array) {
        array[callback] = toInt(input);
      };
    }

    for (i = 0; i < token.length; i++) {
      tokens[token[i]] = func;
    }
  }

  function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token);
    });
  }

  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token);
    }
  }

  var YEAR = 0;
  var MONTH = 1;
  var DATE = 2;
  var HOUR = 3;
  var MINUTE = 4;
  var SECOND = 5;
  var MILLISECOND = 6;
  var WEEK = 7;
  var WEEKDAY = 8; // FORMATTING

  addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
  });
  addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
  });
  addFormatToken(0, ['YYYY', 4], 0, 'year');
  addFormatToken(0, ['YYYYY', 5], 0, 'year');
  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year'); // ALIASES

  addUnitAlias('year', 'y'); // PRIORITIES

  addUnitPriority('year', 1); // PARSING

  addRegexToken('Y', matchSigned);
  addRegexToken('YY', match1to2, match2);
  addRegexToken('YYYY', match1to4, match4);
  addRegexToken('YYYYY', match1to6, match6);
  addRegexToken('YYYYYY', match1to6, match6);
  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
  }); // HELPERS

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }

  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  } // HOOKS

  hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  }; // MOMENTS

  var getSetYear = makeGetSet('FullYear', true);

  function getIsLeapYear() {
    return isLeapYear(this.year());
  }

  function makeGetSet(unit, keepTime) {
    return function (value) {
      if (value != null) {
        set$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get(this, unit);
      }
    };
  }

  function get(mom, unit) {
    return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
  }

  function set$1(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
      if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
      } else {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
      }
    }
  } // MOMENTS

  function stringGet(units) {
    units = normalizeUnits(units);

    if (isFunction(this[units])) {
      return this[units]();
    }

    return this;
  }

  function stringSet(units, value) {
    if (typeof units === 'object') {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units);

      for (var i = 0; i < prioritized.length; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit]);
      }
    } else {
      units = normalizeUnits(units);

      if (isFunction(this[units])) {
        return this[units](value);
      }
    }

    return this;
  }

  function mod(n, x) {
    return (n % x + x) % x;
  }

  var indexOf;

  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function indexOf(o) {
      // I know
      var i;

      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i;
        }
      }

      return -1;
    };
  }

  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN;
    }

    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  } // FORMATTING

  addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
  });
  addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
  });
  addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
  }); // ALIASES

  addUnitAlias('month', 'M'); // PRIORITY

  addUnitPriority('month', 8); // PARSING

  addRegexToken('M', match1to2);
  addRegexToken('MM', match1to2, match2);
  addRegexToken('MMM', function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
  });
  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict); // if we didn't find a month name, mark the date as invalid.

    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = input;
    }
  }); // LOCALES

  var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');

  function localeMonths(m, format) {
    if (!m) {
      return isArray(this._months) ? this._months : this._months['standalone'];
    }

    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
  }

  var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');

  function localeMonthsShort(m, format) {
    if (!m) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
    }

    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
  }

  function handleStrictParse(monthName, format, strict) {
    var i,
    ii,
    mom,
    llc = monthName.toLocaleLowerCase();

    if (!this._monthsParse) {
      // this is not used
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];

      for (i = 0; i < 12; ++i) {
        mom = createUTC([2000, i]);
        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    } // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse

    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);

      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
        this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
      }

      if (!strict && !this._monthsParse[i]) {
        regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex

      if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
        return i;
      } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
        return i;
      } else if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  } // MOMENTS

  function setMonth(mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
      // No op
      return mom;
    }

    if (typeof value === 'string') {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value); // TODO: Another silent failure?

        if (!isNumber(value)) {
          return mom;
        }
      }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));

    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);

    return mom;
  }

  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get(this, 'Month');
    }
  }

  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }

  var defaultMonthsShortRegex = matchWord;

  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsShortRegex')) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }

      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  }

  var defaultMonthsRegex = matchWord;

  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsRegex')) {
        this._monthsRegex = defaultMonthsRegex;
      }

      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
  }

  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var shortPieces = [],
    longPieces = [],
    mixedPieces = [],
    i,
    mom;

    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);
      shortPieces.push(this.monthsShort(mom, ''));
      longPieces.push(this.months(mom, ''));
      mixedPieces.push(this.months(mom, ''));
      mixedPieces.push(this.monthsShort(mom, ''));
    } // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.

    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);

    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }

    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  }

  function createDate(y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date; // the date constructor remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      date = new Date(y + 400, m, d, h, M, s, ms);

      if (isFinite(date.getFullYear())) {
        date.setFullYear(y);
      }
    } else {
      date = new Date(y, m, d, h, M, s, ms);
    }

    return date;
  }

  function createUTCDate(y) {
    var date; // the Date.UTC function remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      var args = Array.prototype.slice.call(arguments); // preserve leap years using a full 400 year cycle, then reset

      args[0] = y + 400;
      date = new Date(Date.UTC.apply(null, args));

      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
    } else {
      date = new Date(Date.UTC.apply(null, arguments));
    }

    return date;
  } // start-of-first-week - start-of-year

  function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    fwd = 7 + dow - doy,
    // first-week day local weekday -- which local weekday is fwd
    fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  } // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday

  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
    weekOffset = firstWeekOffset(year, dow, doy),
    dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
    resYear,
    resDayOfYear;

    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year);
    } else {
      resYear = year;
      resDayOfYear = dayOfYear;
    }

    return {
      year: resYear,
      dayOfYear: resDayOfYear };

  }

  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
    week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
    resWeek,
    resYear;

    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1;
    } else {
      resYear = mom.year();
      resWeek = week;
    }

    return {
      week: resWeek,
      year: resYear };

  }

  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
    weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  } // FORMATTING

  addFormatToken('w', ['ww', 2], 'wo', 'week');
  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek'); // ALIASES

  addUnitAlias('week', 'w');
  addUnitAlias('isoWeek', 'W'); // PRIORITIES

  addUnitPriority('week', 5);
  addUnitPriority('isoWeek', 5); // PARSING

  addRegexToken('w', match1to2);
  addRegexToken('ww', match1to2, match2);
  addRegexToken('W', match1to2);
  addRegexToken('WW', match1to2, match2);
  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
  }); // HELPERS
  // LOCALES

  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }

  var defaultLocaleWeek = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 6th is the first week of the year.
  };

  function localeFirstDayOfWeek() {
    return this._week.dow;
  }

  function localeFirstDayOfYear() {
    return this._week.doy;
  } // MOMENTS

  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
  }

  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
  } // FORMATTING

  addFormatToken('d', 0, 'do', 'day');
  addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
  });
  addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
  });
  addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
  });
  addFormatToken('e', 0, 0, 'weekday');
  addFormatToken('E', 0, 0, 'isoWeekday'); // ALIASES

  addUnitAlias('day', 'd');
  addUnitAlias('weekday', 'e');
  addUnitAlias('isoWeekday', 'E'); // PRIORITY

  addUnitPriority('day', 11);
  addUnitPriority('weekday', 11);
  addUnitPriority('isoWeekday', 11); // PARSING

  addRegexToken('d', match1to2);
  addRegexToken('e', match1to2);
  addRegexToken('E', match1to2);
  addRegexToken('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict); // if we didn't get a weekday name, mark the date as invalid

    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = input;
    }
  });
  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
  }); // HELPERS

  function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
      return input;
    }

    if (!isNaN(input)) {
      return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);

    if (typeof input === 'number') {
      return input;
    }

    return null;
  }

  function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
      return locale.weekdaysParse(input) % 7 || 7;
    }

    return isNaN(input) ? null : input;
  } // LOCALES

  function shiftWeekdays(ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n));
  }

  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');

  function localeWeekdays(m, format) {
    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
  }

  var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');

  function localeWeekdaysShort(m) {
    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }

  var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');

  function localeWeekdaysMin(m) {
    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }

  function handleStrictParse$1(weekdayName, format, strict) {
    var i,
    ii,
    mom,
    llc = weekdayName.toLocaleLowerCase();

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];

      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);

      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
      }

      if (!this._weekdaysParse[i]) {
        regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex

      if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  } // MOMENTS

  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();

    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, 'd');
    } else {
      return day;
    }
  }

  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
  }

  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    } // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }

  var defaultWeekdaysRegex = matchWord;

  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }

      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }

  var defaultWeekdaysShortRegex = matchWord;

  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysShortRegex')) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }

      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }

  var defaultWeekdaysMinRegex = matchWord;

  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysMinRegex')) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }

      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }

  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var minPieces = [],
    shortPieces = [],
    longPieces = [],
    mixedPieces = [],
    i,
    mom,
    minp,
    shortp,
    longp;

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);
      minp = this.weekdaysMin(mom, '');
      shortp = this.weekdaysShort(mom, '');
      longp = this.weekdays(mom, '');
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    } // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.

    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);

    for (i = 0; i < 7; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
  } // FORMATTING

  function hFormat() {
    return this.hours() % 12 || 12;
  }

  function kFormat() {
    return this.hours() || 24;
  }

  addFormatToken('H', ['HH', 2], 0, 'hour');
  addFormatToken('h', ['hh', 2], 0, hFormat);
  addFormatToken('k', ['kk', 2], 0, kFormat);
  addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });

  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
  }

  meridiem('a', true);
  meridiem('A', false); // ALIASES

  addUnitAlias('hour', 'h'); // PRIORITY

  addUnitPriority('hour', 13); // PARSING

  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }

  addRegexToken('a', matchMeridiem);
  addRegexToken('A', matchMeridiem);
  addRegexToken('H', match1to2);
  addRegexToken('h', match1to2);
  addRegexToken('k', match1to2);
  addRegexToken('HH', match1to2, match2);
  addRegexToken('hh', match1to2, match2);
  addRegexToken('kk', match1to2, match2);
  addRegexToken('hmm', match3to4);
  addRegexToken('hmmss', match5to6);
  addRegexToken('Hmm', match3to4);
  addRegexToken('Hmmss', match5to6);
  addParseToken(['H', 'HH'], HOUR);
  addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
  });
  addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
  }); // LOCALES

  function localeIsPM(input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return (input + '').toLowerCase().charAt(0) === 'p';
  }

  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;

  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? 'pm' : 'PM';
    } else {
      return isLower ? 'am' : 'AM';
    }
  } // MOMENTS
  // Setting the hour should keep the time, because the user explicitly
  // specified which hour they want. So trying to maintain the same hour (in
  // a new timezone) makes sense. Adding/subtracting hours does not follow
  // this rule.

  var getSetHour = makeGetSet('Hours', true);
  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse };
  // internal storage for locale config files

  var locales = {};
  var localeFamilies = {};
  var globalLocale;

  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
  } // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root

  function chooseLocale(names) {
    var i = 0,
    j,
    next,
    locale,
    split;

    while (i < names.length) {
      split = normalizeLocale(names[i]).split('-');
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split('-') : null;

      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join('-'));

        if (locale) {
          return locale;
        }

        if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
          //the next array item is better than a shallower substring of this one
          break;
        }

        j--;
      }

      i++;
    }

    return globalLocale;
  }

  function loadLocale(name) {
    var oldLocale = null; // TODO: Find a better way to register and load all the locales in Node

    if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
      try {
        oldLocale = globalLocale._abbr;
        var aliasedRequire = require;
        !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
        getSetGlobalLocale(oldLocale);
      } catch (e) {}
    }

    return locales[name];
  } // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.

  function getSetGlobalLocale(key, values) {
    var data;

    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }

      if (data) {
        // moment.duration._locale = moment._locale = data;
        globalLocale = data;
      } else {
        if (typeof console !== 'undefined' && console.warn) {
          //warn user if arguments are passed but the locale could not be set
          console.warn('Locale ' + key + ' not found. Did you forget to load it?');
        }
      }
    }

    return globalLocale._abbr;
  }

  function defineLocale(name, config) {
    if (config !== null) {
      var locale,
      parentConfig = baseConfig;
      config.abbr = name;

      if (locales[name] != null) {
        deprecateSimple(
        'defineLocaleOverride',
        'use moment.updateLocale(localeName, config) to change ' +
        'an existing locale. moment.defineLocale(localeName, ' +
        'config) should only be used for creating a new locale ' +
        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');

        parentConfig = locales[name]._config;
      } else if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
          parentConfig = locales[config.parentLocale]._config;
        } else {
          locale = loadLocale(config.parentLocale);

          if (locale != null) {
            parentConfig = locale._config;
          } else {
            if (!localeFamilies[config.parentLocale]) {
              localeFamilies[config.parentLocale] = [];
            }

            localeFamilies[config.parentLocale].push({
              name: name,
              config: config });

            return null;
          }
        }
      }

      locales[name] = new Locale(mergeConfigs(parentConfig, config));

      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function (x) {
          defineLocale(x.name, x.config);
        });
      } // backwards compat for now: also set the locale
      // make sure we set the locale AFTER all child locales have been
      // created, so we won't end up with the child locale set.

      getSetGlobalLocale(name);
      return locales[name];
    } else {
      // useful for testing
      delete locales[name];
      return null;
    }
  }

  function updateLocale(name, config) {
    if (config != null) {
      var locale,
      tmpLocale,
      parentConfig = baseConfig; // MERGE

      tmpLocale = loadLocale(name);

      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }

      config = mergeConfigs(parentConfig, config);
      locale = new Locale(config);
      locale.parentLocale = locales[name];
      locales[name] = locale; // backwards compat for now: also set the locale

      getSetGlobalLocale(name);
    } else {
      // pass null for config to unupdate, useful for tests
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;
        } else if (locales[name] != null) {
          delete locales[name];
        }
      }
    }

    return locales[name];
  } // returns locale data

  function getLocale(key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }

    if (!key) {
      return globalLocale;
    }

    if (!isArray(key)) {
      //short-circuit everything else
      locale = loadLocale(key);

      if (locale) {
        return locale;
      }

      key = [key];
    }

    return chooseLocale(key);
  }

  function listLocales() {
    return keys(locales);
  }

  function checkOverflow(m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
      overflow =
      a[MONTH] < 0 || a[MONTH] > 11 ?
      MONTH :
      a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ?
      DATE :
      a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ?
      HOUR :
      a[MINUTE] < 0 || a[MINUTE] > 59 ?
      MINUTE :
      a[SECOND] < 0 || a[SECOND] > 59 ?
      SECOND :
      a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ?
      MILLISECOND :
      -1;

      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }

      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }

      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }

      getParsingFlags(m).overflow = overflow;
    }

    return m;
  } // Pick the first defined of two or three arguments.

  function defaults(a, b, c) {
    if (a != null) {
      return a;
    }

    if (b != null) {
      return b;
    }

    return c;
  }

  function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());

    if (config._useUTC) {
      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }

    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  } // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]

  function configFromArray(config) {
    var i,
    date,
    input = [],
    currentDate,
    expectedWeekday,
    yearToUse;

    if (config._d) {
      return;
    }

    currentDate = currentDateArray(config); //compute day of the year from weeks and weekdays

    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    } //if the day of the year is set, figure out what it is

    if (config._dayOfYear != null) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
        getParsingFlags(config)._overflowDayOfYear = true;
      }

      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    } // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything

    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    } // Zero out whatever was not defaulted, including time

    for (; i < 7; i++) {
      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    } // Check for 24:00:00.000

    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
      config._nextDay = true;
      config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay(); // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.

    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
      config._a[HOUR] = 24;
    } // check for mismatching day of week

    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
      getParsingFlags(config).weekdayMismatch = true;
    }
  }

  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
    w = config._w;

    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4; // TODO: We need to take the current isoWeekYear, but that depends on
      // how we interpret now (local, utc, fixed offset). So create
      // a now version of current config (take local/utc/offset flags, and
      // create now).

      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);

      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      var curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year); // Default to current week.

      week = defaults(w.w, curWeek.week);

      if (w.d != null) {
        // weekday -- low day numbers are considered next week
        weekday = w.d;

        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else if (w.e != null) {
        // local weekday -- counting starts from beginning of week
        weekday = w.e + dow;

        if (w.e < 0 || w.e > 6) {
          weekdayOverflow = true;
        }
      } else {
        // default to beginning of week
        weekday = dow;
      }
    }

    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
      getParsingFlags(config)._overflowWeekday = true;
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config._a[YEAR] = temp.year;
      config._dayOfYear = temp.dayOfYear;
    }
  } // iso 8601 regex
  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)

  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
  var isoDates = [
  ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
  ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
  ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
  ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
  ['YYYY-DDD', /\d{4}-\d{3}/],
  ['YYYY-MM', /\d{4}-\d\d/, false],
  ['YYYYYYMMDD', /[+-]\d{10}/],
  ['YYYYMMDD', /\d{8}/], // YYYYMM is NOT allowed by the standard
  ['GGGG[W]WWE', /\d{4}W\d{3}/],
  ['GGGG[W]WW', /\d{4}W\d{2}/, false],
  ['YYYYDDD', /\d{7}/]];
  // iso time formats and regexes

  var isoTimes = [
  ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
  ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
  ['HH:mm:ss', /\d\d:\d\d:\d\d/],
  ['HH:mm', /\d\d:\d\d/],
  ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
  ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
  ['HHmmss', /\d\d\d\d\d\d/],
  ['HHmm', /\d\d\d\d/],
  ['HH', /\d\d/]];

  var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i; // date from iso format

  function configFromISO(config) {
    var i,
    l,
    string = config._i,
    match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
    allowTime,
    dateFormat,
    timeFormat,
    tzFormat;

    if (match) {
      getParsingFlags(config).iso = true;

      for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break;
        }
      }

      if (dateFormat == null) {
        config._isValid = false;
        return;
      }

      if (match[3]) {
        for (i = 0, l = isoTimes.length; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            // match[2] should be 'T' or space
            timeFormat = (match[2] || ' ') + isoTimes[i][0];
            break;
          }
        }

        if (timeFormat == null) {
          config._isValid = false;
          return;
        }
      }

      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return;
      }

      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = 'Z';
        } else {
          config._isValid = false;
          return;
        }
      }

      config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
      configFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  } // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3

  var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];

    if (secondStr) {
      result.push(parseInt(secondStr, 10));
    }

    return result;
  }

  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);

    if (year <= 49) {
      return 2000 + year;
    } else if (year <= 999) {
      return 1900 + year;
    }

    return year;
  }

  function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.
    replace(/\([^)]*\)|[\n\t]/g, ' ').
    replace(/(\s\s+)/g, ' ').
    replace(/^\s\s*/, '').
    replace(/\s\s*$/, '');
  }

  function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
      // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
      weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();

      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config).weekdayMismatch = true;
        config._isValid = false;
        return false;
      }
    }

    return true;
  }

  var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60 };


  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset];
    } else if (militaryOffset) {
      // the only allowed military tz is Z
      return 0;
    } else {
      var hm = parseInt(numOffset, 10);
      var m = hm % 100,
      h = (hm - m) / 100;
      return h * 60 + m;
    }
  } // date and time from ref 2822 format

  function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));

    if (match) {
      var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);

      if (!checkWeekday(match[1], parsedArray, config)) {
        return;
      }

      config._a = parsedArray;
      config._tzm = calculateOffset(match[8], match[9], match[10]);
      config._d = createUTCDate.apply(null, config._a);

      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

      getParsingFlags(config).rfc2822 = true;
    } else {
      config._isValid = false;
    }
  } // date from iso format or fallback

  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return;
    }

    configFromISO(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }

    configFromRFC2822(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    } // Final attempt, use Input Fallback

    hooks.createFromInputFallback(config);
  }

  hooks.createFromInputFallback = deprecate(
  'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
  'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
  'discouraged and will be removed in an upcoming major release. Please refer to ' +
  'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
  function (config) {
    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
  });
  // constant that refers to the ISO standard

  hooks.ISO_8601 = function () {}; // constant that refers to the RFC 2822 form

  hooks.RFC_2822 = function () {}; // date from string and format string

  function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return;
    }

    if (config._f === hooks.RFC_2822) {
      configFromRFC2822(config);
      return;
    }

    config._a = [];
    getParsingFlags(config).empty = true; // This array is used to make a Date, either with `new Date` or `Date.UTC`

    var string = '' + config._i,
    i,
    parsedInput,
    tokens,
    token,
    skipped,
    stringLength = string.length,
    totalParsedInputLength = 0;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0]; // console.log('token', token, 'parsedInput', parsedInput,
      //         'regex', getParseRegexForToken(token, config));

      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));

        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped);
        }

        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      } // don't parse if it's not a known token

      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false;
        } else {
          getParsingFlags(config).unusedTokens.push(token);
        }

        addTimeToArrayFromToken(token, parsedInput, config);
      } else if (config._strict && !parsedInput) {
        getParsingFlags(config).unusedTokens.push(token);
      }
    } // add remaining unparsed input length to the string

    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;

    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string);
    } // clear _12h flag if hour is <= 12

    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
      getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem; // handle meridiem

    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
    configFromArray(config);
    checkOverflow(config);
  }

  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
      // nothing to do
      return hour;
    }

    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
      // Fallback
      isPm = locale.isPM(meridiem);

      if (isPm && hour < 12) {
        hour += 12;
      }

      if (!isPm && hour === 12) {
        hour = 0;
      }

      return hour;
    } else {
      // this is not supposed to happen
      return hour;
    }
  } // date from string and array of format strings

  function configFromStringAndArray(config) {
    var tempConfig, bestMoment, scoreToBeat, i, currentScore;

    if (config._f.length === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }

    for (i = 0; i < config._f.length; i++) {
      currentScore = 0;
      tempConfig = copyConfig({}, config);

      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }

      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);

      if (!isValid(tempConfig)) {
        continue;
      } // if there is any input that was not parsed add a penalty for that format

      currentScore += getParsingFlags(tempConfig).charsLeftOver; //or tokens

      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;

      if (scoreToBeat == null || currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }

    extend(config, bestMoment || tempConfig);
  }

  function configFromObject(config) {
    if (config._d) {
      return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
      return obj && parseInt(obj, 10);
    });
    configFromArray(config);
  }

  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));

    if (res._nextDay) {
      // Adding is smart enough around DST
      res.add(1, 'd');
      res._nextDay = undefined;
    }

    return res;
  }

  function prepareConfig(config) {
    var input = config._i,
    format = config._f;
    config._locale = config._locale || getLocale(config._l);

    if (input === null || format === undefined && input === '') {
      return createInvalid({
        nullInput: true });

    }

    if (typeof input === 'string') {
      config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
      config._d = input;
    } else if (isArray(format)) {
      configFromStringAndArray(config);
    } else if (format) {
      configFromStringAndFormat(config);
    } else {
      configFromInput(config);
    }

    if (!isValid(config)) {
      config._d = null;
    }

    return config;
  }

  function configFromInput(config) {
    var input = config._i;

    if (isUndefined(input)) {
      config._d = new Date(hooks.now());
    } else if (isDate(input)) {
      config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
      configFromString(config);
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function (obj) {
        return parseInt(obj, 10);
      });
      configFromArray(config);
    } else if (isObject(input)) {
      configFromObject(config);
    } else if (isNumber(input)) {
      // from milliseconds
      config._d = new Date(input);
    } else {
      hooks.createFromInputFallback(config);
    }
  }

  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined;
    }

    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
      input = undefined;
    } // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423

    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
  }

  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
  }

  var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  });
  var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }); // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.

  function pickBy(fn, moments) {
    var res, i;

    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }

    if (!moments.length) {
      return createLocal();
    }

    res = moments[0];

    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i];
      }
    }

    return res;
  } // TODO: Use [].sort instead?

  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isBefore', args);
  }

  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isAfter', args);
  }

  var now = function now() {
    return Date.now ? Date.now() : +new Date();
  };

  var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

  function isDurationValid(m) {
    for (var key in m) {
      if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
        return false;
      }
    }

    var unitHasDecimal = false;

    for (var i = 0; i < ordering.length; ++i) {
      if (m[ordering[i]]) {
        if (unitHasDecimal) {
          return false; // only allow non-integers for smallest unit
        }

        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
          unitHasDecimal = true;
        }
      }
    }

    return true;
  }

  function isValid$1() {
    return this._isValid;
  }

  function createInvalid$1() {
    return createDuration(NaN);
  }

  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
    years = normalizedInput.year || 0,
    quarters = normalizedInput.quarter || 0,
    months = normalizedInput.month || 0,
    weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
    days = normalizedInput.day || 0,
    hours = normalizedInput.hour || 0,
    minutes = normalizedInput.minute || 0,
    seconds = normalizedInput.second || 0,
    milliseconds = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput); // representation for dateAddRemove

    this._milliseconds =
    +milliseconds +
    seconds * 1e3 + // 1000
    minutes * 6e4 + // 1000 * 60
    hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately

    this._days = +days + weeks * 7; // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.

    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();

    this._bubble();
  }

  function isDuration(obj) {
    return obj instanceof Duration;
  }

  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1;
    } else {
      return Math.round(number);
    }
  } // FORMATTING

  function offset(token, separator) {
    addFormatToken(token, 0, 0, function () {
      var offset = this.utcOffset();
      var sign = '+';

      if (offset < 0) {
        offset = -offset;
        sign = '-';
      }

      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
    });
  }

  offset('Z', ':');
  offset('ZZ', ''); // PARSING

  addRegexToken('Z', matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
  }); // HELPERS
  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']

  var chunkOffset = /([\+\-]|\d\d)/gi;

  function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
      return null;
    }

    var chunk = matches[matches.length - 1] || [];
    var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  } // Return a moment from input, that is local/utc/zone equivalent to model.

  function cloneWithOffset(input, model) {
    var res, diff;

    if (model._isUTC) {
      res = model.clone();
      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf(); // Use low-level api, because this fn is low-level api.

      res._d.setTime(res._d.valueOf() + diff);

      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }

  function getDateOffset(m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
  } // HOOKS
  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.

  hooks.updateOffset = function () {}; // MOMENTS
  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.

  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
    localAdjust;

    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    if (input != null) {
      if (typeof input === 'string') {
        input = offsetFromString(matchShortOffset, input);

        if (input === null) {
          return this;
        }
      } else if (Math.abs(input) < 16 && !keepMinutes) {
        input = input * 60;
      }

      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }

      this._offset = input;
      this._isUTC = true;

      if (localAdjust != null) {
        this.add(localAdjust, 'm');
      }

      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(this, createDuration(input - offset, 'm'), 1, false);
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null;
        }
      }

      return this;
    } else {
      return this._isUTC ? offset : getDateOffset(this);
    }
  }

  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== 'string') {
        input = -input;
      }

      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }

  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }

  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;

      if (keepLocalTime) {
        this.subtract(getDateOffset(this), 'm');
      }
    }

    return this;
  }

  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
      var tZone = offsetFromString(matchOffset, this._i);

      if (tZone != null) {
        this.utcOffset(tZone);
      } else {
        this.utcOffset(0, true);
      }
    }

    return this;
  }

  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }

    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }

  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }

  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }

    var c = {};
    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
      var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }

    return this._isDSTShifted;
  }

  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }

  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }

  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  } // ASP.NET json date format regex

  var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/; // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
  // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
  // and further modified to allow for strings containing both week and day

  var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function createDuration(input, key) {
    var duration = input,
    // matching against regexp is expensive, do it on demand
    match = null,
    sign,
    ret,
    diffRes;

    if (isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months };

    } else if (isNumber(input)) {
      duration = {};

      if (key) {
        duration[key] = input;
      } else {
        duration.milliseconds = input;
      }
    } else if (!!(match = aspNetRegex.exec(input))) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
      };
    } else if (!!(match = isoRegex.exec(input))) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign),
        M: parseIso(match[3], sign),
        w: parseIso(match[4], sign),
        d: parseIso(match[5], sign),
        h: parseIso(match[6], sign),
        m: parseIso(match[7], sign),
        s: parseIso(match[8], sign) };

    } else if (duration == null) {
      // checks for null or undefined
      duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
      diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
      ret._locale = input._locale;
    }

    return ret;
  }

  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;

  function parseIso(inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.')); // apply sign while we're at it

    return (isNaN(res) ? 0 : res) * sign;
  }

  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;

    if (base.clone().add(res.months, 'M').isAfter(other)) {
      --res.months;
    }

    res.milliseconds = +other - +base.clone().add(res.months, 'M');
    return res;
  }

  function momentsDifference(base, other) {
    var res;

    if (!(base.isValid() && other.isValid())) {
      return {
        milliseconds: 0,
        months: 0 };

    }

    other = cloneWithOffset(other, base);

    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }

    return res;
  } // TODO: remove 'name' arg after deprecation is removed

  function createAdder(direction, name) {
    return function (val, period) {
      var dur, tmp; //invert the arguments, but complain about it

      if (period !== null && !isNaN(+period)) {
        deprecateSimple(
        name,
        'moment().' +
        name +
        '(period, number) is deprecated. Please use moment().' +
        name +
        '(number, period). ' +
        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');

        tmp = val;
        val = period;
        period = tmp;
      }

      val = typeof val === 'string' ? +val : val;
      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this;
    };
  }

  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
    days = absRound(duration._days),
    months = absRound(duration._months);

    if (!mom.isValid()) {
      // No op
      return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
      setMonth(mom, get(mom, 'Month') + months * isAdding);
    }

    if (days) {
      set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }

    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }

    if (updateOffset) {
      hooks.updateOffset(mom, days || months);
    }
  }

  var add = createAdder(1, 'add');
  var subtract = createAdder(-1, 'subtract');

  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
  }

  function calendar$1(time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
    sod = cloneWithOffset(now, this).startOf('day'),
    format = hooks.calendarFormat(this, sod) || 'sameElse';
    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  }

  function clone() {
    return new Moment(this);
  }

  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() > localInput.valueOf();
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
  }

  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() < localInput.valueOf();
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
  }

  function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from),
    localTo = isMoment(to) ? to : createLocal(to);

    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false;
    }

    inclusivity = inclusivity || '()';
    return (
      (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (
      inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units)));

  }

  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
    inputMs;

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
  }

  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }

  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }

  function diff(input, units, asFloat) {
    var that, zoneDelta, output;

    if (!this.isValid()) {
      return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
      return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);

    switch (units) {
      case 'year':
        output = monthDiff(this, that) / 12;
        break;

      case 'month':
        output = monthDiff(this, that);
        break;

      case 'quarter':
        output = monthDiff(this, that) / 3;
        break;

      case 'second':
        output = (this - that) / 1e3;
        break;
      // 1000

      case 'minute':
        output = (this - that) / 6e4;
        break;
      // 1000 * 60

      case 'hour':
        output = (this - that) / 36e5;
        break;
      // 1000 * 60 * 60

      case 'day':
        output = (this - that - zoneDelta) / 864e5;
        break;
      // 1000 * 60 * 60 * 24, negate dst

      case 'week':
        output = (this - that - zoneDelta) / 6048e5;
        break;
      // 1000 * 60 * 60 * 24 * 7, negate dst

      default:
        output = this - that;}


    return asFloat ? output : absFloor(output);
  }

  function monthDiff(a, b) {
    // difference in months
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
    // b is in (anchor - 1 month, anchor + 1 month)
    anchor = a.clone().add(wholeMonthDiff, 'months'),
    anchor2,
    adjust;

    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor2 - anchor);
    } //check for negative zero, return zero if negative zero

    return -(wholeMonthDiff + adjust) || 0;
  }

  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

  function toString() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  function toISOString(keepOffset) {
    if (!this.isValid()) {
      return null;
    }

    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;

    if (m.year() < 0 || m.year() > 9999) {
      return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    if (isFunction(Date.prototype.toISOString)) {
      // native implementation is ~50x faster, use it when we can
      if (utc) {
        return this.toDate().toISOString();
      } else {
        return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
      }
    }

    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  }
  /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */

  function inspect() {
    if (!this.isValid()) {
      return 'moment.invalid(/* ' + this._i + ' */)';
    }

    var func = 'moment';
    var zone = '';

    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
      zone = 'Z';
    }

    var prefix = '[' + func + '("]';
    var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }

  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }

    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }

  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        to: this,
        from: time }).

      locale(this.locale()).
      humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }

  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        from: this,
        to: time }).

      locale(this.locale()).
      humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  } // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.

  function locale(key) {
    var newLocaleData;

    if (key === undefined) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);

      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }

      return this;
    }
  }

  var lang = deprecate(
  'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
  function (key) {
    if (key === undefined) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  });


  function localeData() {
    return this._locale;
  }

  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR; // actual modulo - handles negative numbers (for dates before 1970):

  function mod$1(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
  }

  function localStartOfDate(y, m, d) {
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return new Date(y, m, d).valueOf();
    }
  }

  function utcStartOfDate(y, m, d) {
    // Date.UTC remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return Date.UTC(y, m, d);
    }
  }

  function startOf(units) {
    var time;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year(), 0, 1);
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
        break;

      case 'month':
        time = startOfDate(this.year(), this.month(), 1);
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date());
        break;

      case 'hour':
        time = this._d.valueOf();
        time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;

      case 'minute':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_MINUTE);
        break;

      case 'second':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_SECOND);
        break;}


    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function endOf(units) {
    var time;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;

      case 'month':
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;

      case 'hour':
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;

      case 'minute':
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
        break;

      case 'second':
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        break;}


    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
  }

  function unix() {
    return Math.floor(this.valueOf() / 1000);
  }

  function toDate() {
    return new Date(this.valueOf());
  }

  function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  }

  function toObject() {
    var m = this;
    return {
      years: m.year(),
      months: m.month(),
      date: m.date(),
      hours: m.hours(),
      minutes: m.minutes(),
      seconds: m.seconds(),
      milliseconds: m.milliseconds() };

  }

  function toJSON() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }

  function isValid$2() {
    return isValid(this);
  }

  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }

  function invalidAt() {
    return getParsingFlags(this).overflow;
  }

  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict };

  } // FORMATTING

  addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
  });

  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
  }

  addWeekYearFormatToken('gggg', 'weekYear');
  addWeekYearFormatToken('ggggg', 'weekYear');
  addWeekYearFormatToken('GGGG', 'isoWeekYear');
  addWeekYearFormatToken('GGGGG', 'isoWeekYear'); // ALIASES

  addUnitAlias('weekYear', 'gg');
  addUnitAlias('isoWeekYear', 'GG'); // PRIORITY

  addUnitPriority('weekYear', 1);
  addUnitPriority('isoWeekYear', 1); // PARSING

  addRegexToken('G', matchSigned);
  addRegexToken('g', matchSigned);
  addRegexToken('GG', match1to2, match2);
  addRegexToken('gg', match1to2, match2);
  addRegexToken('GGGG', match1to4, match4);
  addRegexToken('gggg', match1to4, match4);
  addRegexToken('GGGGG', match1to6, match6);
  addRegexToken('ggggg', match1to6, match6);
  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
  });
  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
  }); // MOMENTS

  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }

  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
  }

  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }

  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;

    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }

  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;

    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);

      if (week > weeksTarget) {
        week = weeksTarget;
      }

      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }

  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
    date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
  } // FORMATTING

  addFormatToken('Q', 0, 'Qo', 'quarter'); // ALIASES

  addUnitAlias('quarter', 'Q'); // PRIORITY

  addUnitPriority('quarter', 7); // PARSING

  addRegexToken('Q', match1);
  addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
  }); // MOMENTS

  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  } // FORMATTING

  addFormatToken('D', ['DD', 2], 'Do', 'date'); // ALIASES

  addUnitAlias('date', 'D'); // PRIORITY

  addUnitPriority('date', 9); // PARSING

  addRegexToken('D', match1to2);
  addRegexToken('DD', match1to2, match2);
  addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
  });
  addParseToken(['D', 'DD'], DATE);
  addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
  }); // MOMENTS

  var getSetDayOfMonth = makeGetSet('Date', true); // FORMATTING

  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'); // ALIASES

  addUnitAlias('dayOfYear', 'DDD'); // PRIORITY

  addUnitPriority('dayOfYear', 4); // PARSING

  addRegexToken('DDD', match1to3);
  addRegexToken('DDDD', match3);
  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
  }); // HELPERS
  // MOMENTS

  function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
  } // FORMATTING

  addFormatToken('m', ['mm', 2], 0, 'minute'); // ALIASES

  addUnitAlias('minute', 'm'); // PRIORITY

  addUnitPriority('minute', 14); // PARSING

  addRegexToken('m', match1to2);
  addRegexToken('mm', match1to2, match2);
  addParseToken(['m', 'mm'], MINUTE); // MOMENTS

  var getSetMinute = makeGetSet('Minutes', false); // FORMATTING

  addFormatToken('s', ['ss', 2], 0, 'second'); // ALIASES

  addUnitAlias('second', 's'); // PRIORITY

  addUnitPriority('second', 15); // PARSING

  addRegexToken('s', match1to2);
  addRegexToken('ss', match1to2, match2);
  addParseToken(['s', 'ss'], SECOND); // MOMENTS

  var getSetSecond = makeGetSet('Seconds', false); // FORMATTING

  addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
  });
  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
  });
  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
  });
  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
  }); // ALIASES

  addUnitAlias('millisecond', 'ms'); // PRIORITY

  addUnitPriority('millisecond', 16); // PARSING

  addRegexToken('S', match1to3, match1);
  addRegexToken('SS', match1to3, match2);
  addRegexToken('SSS', match1to3, match3);
  var token;

  for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
  }

  function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
  }

  for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
  } // MOMENTS

  var getSetMillisecond = makeGetSet('Milliseconds', false); // FORMATTING

  addFormatToken('z', 0, 0, 'zoneAbbr');
  addFormatToken('zz', 0, 0, 'zoneName'); // MOMENTS

  function getZoneAbbr() {
    return this._isUTC ? 'UTC' : '';
  }

  function getZoneName() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  }

  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;
  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
  proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
  proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
  proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
  proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

  function createUnix(input) {
    return createLocal(input * 1000);
  }

  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }

  function preParsePostFormat(string) {
    return string;
  }

  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$1(format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
  }

  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined;
    }

    format = format || '';

    if (index != null) {
      return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];

    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, 'month');
    }

    return out;
  } // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)

  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;

      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    }

    var locale = getLocale(),
    shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
      return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];

    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }

    return out;
  }

  function listMonths(format, index) {
    return listMonthsImpl(format, index, 'months');
  }

  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
  }

  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  }

  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  }

  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  }

  getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function ordinal(number) {
      var b = number % 10,
      output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    } });
  // Side effect imports

  hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
  hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
  var mathAbs = Math.abs;

  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }

  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  } // supports only 2.0-style add(1, 's') or add(duration)

  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1);
  } // supports only 2.0-style subtract(1, 's') or subtract(duration)

  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1);
  }

  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }

  function bubble() {
    var milliseconds = this._milliseconds;
    var days = this._days;
    var months = this._months;
    var data = this._data;
    var seconds, minutes, hours, years, monthsFromDays; // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166

    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0;
    } // The following code bubbles up values, see the tests for
    // examples of what that means.

    data.milliseconds = milliseconds % 1000;
    seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24); // convert days to months

    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays)); // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
  }

  function daysToMonths(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
  }

  function monthsToDays(months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
  }

  function as(units) {
    if (!this.isValid()) {
      return NaN;
    }

    var days;
    var months;
    var milliseconds = this._milliseconds;
    units = normalizeUnits(units);

    if (units === 'month' || units === 'quarter' || units === 'year') {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);

      switch (units) {
        case 'month':
          return months;

        case 'quarter':
          return months / 3;

        case 'year':
          return months / 12;}

    } else {
      // handle milliseconds separately because of floating point math errors (issue #1867)
      days = this._days + Math.round(monthsToDays(this._months));

      switch (units) {
        case 'week':
          return days / 7 + milliseconds / 6048e5;

        case 'day':
          return days + milliseconds / 864e5;

        case 'hour':
          return days * 24 + milliseconds / 36e5;

        case 'minute':
          return days * 1440 + milliseconds / 6e4;

        case 'second':
          return days * 86400 + milliseconds / 1000;
        // Math.floor prevents floating point math errors here

        case 'millisecond':
          return Math.floor(days * 864e5) + milliseconds;

        default:
          throw new Error('Unknown unit ' + units);}

    }
  } // TODO: Use this.as('ms')?

  function valueOf$1() {
    if (!this.isValid()) {
      return NaN;
    }

    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  }

  function makeAs(alias) {
    return function () {
      return this.as(alias);
    };
  }

  var asMilliseconds = makeAs('ms');
  var asSeconds = makeAs('s');
  var asMinutes = makeAs('m');
  var asHours = makeAs('h');
  var asDays = makeAs('d');
  var asWeeks = makeAs('w');
  var asMonths = makeAs('M');
  var asQuarters = makeAs('Q');
  var asYears = makeAs('y');

  function clone$1() {
    return createDuration(this);
  }

  function get$2(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
  }

  function makeGetter(name) {
    return function () {
      return this.isValid() ? this._data[name] : NaN;
    };
  }

  var milliseconds = makeGetter('milliseconds');
  var seconds = makeGetter('seconds');
  var minutes = makeGetter('minutes');
  var hours = makeGetter('hours');
  var days = makeGetter('days');
  var months = makeGetter('months');
  var years = makeGetter('years');

  function weeks() {
    return absFloor(this.days() / 7);
  }

  var round = Math.round;
  var thresholds = {
    ss: 44,
    // a few seconds to seconds
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month
    M: 11 // months to year
  }; // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize

  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  function relativeTime$1(posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds = round(duration.as('s'));
    var minutes = round(duration.as('m'));
    var hours = round(duration.as('h'));
    var days = round(duration.as('d'));
    var months = round(duration.as('M'));
    var years = round(duration.as('y'));
    var a = seconds <= thresholds.ss && ['s', seconds] ||
    seconds < thresholds.s && ['ss', seconds] ||
    minutes <= 1 && ['m'] ||
    minutes < thresholds.m && ['mm', minutes] ||
    hours <= 1 && ['h'] ||
    hours < thresholds.h && ['hh', hours] ||
    days <= 1 && ['d'] ||
    days < thresholds.d && ['dd', days] ||
    months <= 1 && ['M'] ||
    months < thresholds.M && ['MM', months] ||
    years <= 1 && ['y'] || ['yy', years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
  } // This function allows you to set the rounding function for relative time strings

  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round;
    }

    if (typeof roundingFunction === 'function') {
      round = roundingFunction;
      return true;
    }

    return false;
  } // This function allows you to set a threshold for relative time strings

  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false;
    }

    if (limit === undefined) {
      return thresholds[threshold];
    }

    thresholds[threshold] = limit;

    if (threshold === 's') {
      thresholds.ss = limit - 1;
    }

    return true;
  }

  function humanize(withSuffix) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
  }

  var abs$1 = Math.abs;

  function sign(x) {
    return (x > 0) - (x < 0) || +x;
  }

  function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days = abs$1(this._days);
    var months = abs$1(this._months);
    var minutes, hours, years; // 3600 seconds -> 60 minutes -> 1 hour

    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60; // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js

    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
      // this is the same as C#'s (Noda) and python (isodate)...
      // but not other JS (goog.date)
      return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
    return (
      totalSign +
      'P' + (
      Y ? ymSign + Y + 'Y' : '') + (
      M ? ymSign + M + 'M' : '') + (
      D ? daysSign + D + 'D' : '') + (
      h || m || s ? 'T' : '') + (
      h ? hmsSign + h + 'H' : '') + (
      m ? hmsSign + m + 'M' : '') + (
      s ? hmsSign + s + 'S' : ''));

  }

  var proto$2 = Duration.prototype;
  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
  proto$2.lang = lang; // Side effect imports
  // FORMATTING

  addFormatToken('X', 0, 0, 'unix');
  addFormatToken('x', 0, 0, 'valueOf'); // PARSING

  addRegexToken('x', matchSigned);
  addRegexToken('X', matchTimestamp);
  addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
  });
  addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
  }); // Side effect imports

  hooks.version = '2.24.0';
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto; // currently HTML5 input type only supports 24-hour formats

  hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
    // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
    // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
    // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',
    // <input type="date" />
    TIME: 'HH:mm',
    // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',
    // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',
    // <input type="time" step="0.001" />
    WEEK: 'GGGG-[W]WW',
    // <input type="week" />
    MONTH: 'YYYY-MM' // <input type="month" />
  };
  return hooks;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/module.js */ 96)(module)))

/***/ }),

/***/ 96:
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map