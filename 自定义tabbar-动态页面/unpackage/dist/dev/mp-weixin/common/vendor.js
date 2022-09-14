(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
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
    appId: "__UNI__CF99645",
    appName: "自定义tabbar-动态页面",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.5.3",
    uniRuntimeVersion: "3.5.3",
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
      appId: "__UNI__CF99645",
      appName: "自定义tabbar-动态页面",
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
      cidErrMsg = 'unipush is not enabled';
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
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
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
      if (Object({"VUE_APP_NAME":"自定义tabbar-动态页面","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

function processEventExtra(vm, extra, event) {
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
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
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
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
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
/* 2 */
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
/* 3 */
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
/* 4 */
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
        if (Object({"VUE_APP_NAME":"自定义tabbar-动态页面","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"VUE_APP_NAME":"自定义tabbar-动态页面","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"自定义tabbar-动态页面","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"VUE_APP_NAME":"自定义tabbar-动态页面","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
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
    'onPageResize'
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
/* 5 */
/*!**********************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
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
/* 12 */
/*!******************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 13));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 14));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 18));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 19));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 23));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 24));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 25));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 26));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 27));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 28));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 29));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 16));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 15));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 30));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 17));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 31));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 32));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 33));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 34));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 35));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 36);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 37));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 38));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 39));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */
/*!*****************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */
/*!*******************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/request/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 15));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 15 */
/*!************************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),
/* 16 */
/*!************************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/deepClone.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),
/* 17 */
/*!*******************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/test.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),
/* 18 */
/*!**************************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/queryParams.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),
/* 19 */
/*!********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/route.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 20 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 21);

/***/ }),
/* 21 */
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

module.exports = __webpack_require__(/*! ./runtime */ 22);

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
/* 22 */
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
/* 23 */
/*!*************************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),
/* 24 */
/*!***********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),
/* 25 */
/*!****************************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),
/* 26 */
/*!*******************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/guid.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),
/* 27 */
/*!********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/color.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),
/* 28 */
/*!************************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/type2icon.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),
/* 29 */
/*!**************************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/randomArray.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),
/* 30 */
/*!**********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/addUnit.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),
/* 31 */
/*!*********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/random.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),
/* 32 */
/*!*******************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/trim.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),
/* 33 */
/*!********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/toast.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 34 */
/*!************************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/getParent.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),
/* 35 */
/*!**********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/$parent.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),
/* 36 */
/*!******************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/sys.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 37 */
/*!***********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/debounce.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),
/* 38 */
/*!***********************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/function/throttle.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),
/* 39 */
/*!*******************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/config/config.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-15
var version = '1.8.5';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),
/* 40 */
/*!*******************************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/node_modules/uview-ui/libs/config/zIndex.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),
/* 41 */
/*!************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/util/util.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function _utilAlert(msg, iconType) {
  uni.showToast({
    title: msg == null ? "" : msg,
    icon: "none",
    duration: 1500 });

  return;
};

function _utilLoading(tip, mask) {
  uni.showLoading({
    title: tip ? tip : '加载中',
    mask: mask ? mask : false });


  setTimeout(function () {
    uni.hideLoading();
  }, 10000);
};
//['vuex_userInfo', 'vuex_token','vuex_deviceMode','vuex_loginParam'];
function _clearVuex(that) {
  console.log("清除缓存");
  that.$u.vuex('vuex_userInfo', {});
  that.$u.vuex('vuex_token', '');
}
function _resetShopCar(that) {
  console.log("清空购物车");
  that.$u.vuex('vuex_shopCar', [
  {
    shopId: 1,
    title: '京东自营',
    total: 0,
    goodsAmount: 0,
    selected: false,
    glist: [] }]);


}

//字节转换
function _byteConvert(bytes) {
  //console.log("字节量"+bytes);
  if (isNaN(bytes)) {
    return '';
  }
  var symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var exp = Math.floor(Math.log(bytes) / Math.log(2));
  if (exp < 1) {
    exp = 0;
  }
  var i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);
  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    bytes = bytes.toFixed(2);
  }
  return bytes + ' ' + symbols[i];
}

module.exports = {
  utilAlert: function utilAlert(msg, iconType) {
    return _utilAlert(msg, iconType);
  },
  utilLoading: function utilLoading(tip, mask) {
    return _utilLoading(tip, mask);
  },
  clearVuex: function clearVuex(that) {
    return _clearVuex(that);
  },
  byteConvert: function byteConvert(bytes) {
    return _byteConvert(bytes);
  },
  resetShopCar: function resetShopCar(that) {
    return _resetShopCar(that);
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 42 */
/*!**************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/store/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);

var lifeData = {};

try {
  // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
  lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
var saveStateKeys = ['vuex_userInfo', 'vuex_token', 'vuex_loginParam', 'currentTemplate'];

// 保存变量到本地存储中
var saveLifeData = function saveLifeData(key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    var tmp = uni.getStorageSync('lifeData');
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync('lifeData', tmp);
  }
};



var store = new _vuex.default.Store({
  state: {
    // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
    vuex_userInfo: lifeData.vuex_userInfo ? lifeData.vuex_userInfo : {},
    vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
    // 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
    vuex_version: '1.0',
    //登录信息
    vuex_loginParam: lifeData.vuex_loginParam ? lifeData.vuex_loginParam : {
      loginCode: '', // 卡号
      loginPasswd: '' // 密码
    },
    vuex_wxCode: '',
    templateList: [
    { templateName: '默认商城', templateId: '0' },
    { templateName: '模板1', templateId: '1' },
    { templateName: '模板2', templateId: '2' },
    { templateName: '模板3', templateId: '3' },
    { templateName: '模板4', templateId: '4' },
    { templateName: '退出登录', templateId: '-1' }],

    currentTemplate: lifeData.currentTemplater ? lifeData.currentTemplate : "0" },

  mutations: {
    $uStore: function $uStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      var nameArr = payload.name.split('.');
      var saveKey = '';
      var len = nameArr.length;
      if (nameArr.length >= 2) {
        var obj = state[nameArr[0]];
        for (var i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey]);
    } } });var _default =




store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 43 */
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
/* 44 */
/*!**************************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/common/http.interceptor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var noTokenApis = ["accountapi/passport/ssoLogin", "accountapi/passport/passwdlogin"];

var checkApi = function checkApi(url) {
  var flag = true;
  for (var i = 0; i < noTokenApis.length; i++) {
    var whiteApi = noTokenApis[i];
    if (url.indexOf(whiteApi) !== -1) {
      // console.log("当前请求不需要带token",url); 
      flag = false;
      break;
    }
  }
  return flag;
};

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
var install = function install(Vue, vm) {
  Vue.prototype.$u.http.setConfig({
    //method: 'POST',
    dataType: 'json',
    showLoading: true, // 是否显示请求中的loading
    loadingText: '请求中...', // 请求loading中的文字提示
    loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    // 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
    // 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
    originalData: true,
    // 设置自定义头部content-type
    header: {
      //'content-type': 'application/json;charset=UTF-8'
    } });

  // 请求拦截，配置Token等参数
  Vue.prototype.$u.http.interceptor.request = function (config) {
    // 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
    var flag = checkApi(config.url);
    if (flag) {
      //console.log("token",vm.vuex_token)
      config.header.Authorization = vm.vuex_token;
    }
    if (config.header.type == 'form') {
      //console.log("提交表单")
      config.header['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    } else {
      //console.log("提交json")
      config.header['content-type'] = 'application/json;charset=UTF-8';
    }
    //console.log("config",config);
    return config;
  };
  // 响应拦截，判断状态码是否通过
  Vue.prototype.$u.http.interceptor.response = function (res) {
    // 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
    // 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
    //console.log("响应体response",res);
    var responseCode = res.statusCode;
    if (responseCode == 200) {
      return res.data;
    } else
    if (responseCode == 401) {
      vm.$u.toast('身份验证失败，请重新登录');
      setTimeout(function () {
        console.log("===============此处应该跳转登录===========");
      }, 1500);
      return false;
    } else
    {
      console.log("响应失败response:", res);
      return false;
    }
  };
};var _default =

{
  install: install };exports.default = _default;

/***/ }),
/* 45 */
/*!******************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/common/http.api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


var _environment = _interopRequireDefault(__webpack_require__(/*! @/common/environment.js */ 46));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*
                                                                                                                                                                            接口统一管理配置
                                                                                                                                                                            */var BASE_API = _environment.default.BASE_API + "/";var multipartUrl = _environment.default.MULTIPART_API + "/";
var install = function install(Vue, vm) {
  // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
  var sys = {
    login: function login() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(BASE_API + 'accountapi/passport/passwdlogin', params, { 'type': 'form' });},
    getUserInfo: function getUserInfo() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(BASE_API + 'accountapi/passport/myinfo', params);},
    wxLogin: function wxLogin() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(BASE_API + 'accountapi/wx/login', params);},
    logout: function logout() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(BASE_API + 'logout', params);} };

  var attachment = {
    uploadFormatBase64: function uploadFormatBase64(params) {return vm.$u.post(BASE_API + 'sys/attachment/uploadFormatBase64', params);} };


  vm.$u.api = { sys: sys, attachment: attachment };
};var _default =
{
  install: install };exports.default = _default;

/***/ }),
/* 46 */
/*!*********************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/common/environment.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*开发环境*/
var dev = {





  BASE_API: 'http://127.0.0.1:8080/bbc-interface-boot',
  MULTIPART_API: 'http://127.0.0.1:8080/bbc-interface-boot' };



var test = {





  BASE_API: 'http://127.0.0.1/bbc-interface-boot',
  MULTIPART_API: 'http:/127.0.0.1/bbc-interface-boot' };


/*
                                                         =================注意根据需要改变环境================
                                                         H5 环境有配置代理,请在manifest.json源码视图里面最后面的代码块查看
                                                          */
var environment = test;var _default =
{
  BASE_API: environment.BASE_API,
  MULTIPART_API: environment.MULTIPART_API };exports.default = _default;

/***/ }),
/* 47 */
/*!*****************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/store/$u.mixin.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _vuex = __webpack_require__(/*! vuex */ 43);
var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
var $uStoreKey = [];
try {
  $uStoreKey = _store.default.state ? Object.keys(_store.default.state) : [];
} catch (e) {}

module.exports = {
  created: function created() {var _this = this;
    // 将vuex方法挂在到$u中
    // 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$u.vuex('user.name', '史诗')
    // 如果要修改vuex的state的version变量为1.0.1 => this.$u.vuex('version', '1.0.1')
    this.$u.vuex = function (name, value) {
      _this.$store.commit('$uStore', {
        name: name, value: value });

    };
  },
  computed: _objectSpread({},

  (0, _vuex.mapState)($uStoreKey)) };

/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/*!****************************************************!*\
  !*** D:/reference/自定义tabbar-动态页面/util/pagedata.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//获取底部tabbar
function _getBottomTabbarList(templateId) {
  var tabbarList = [];
  //默认
  if (templateId == "0") {
    tabbarList = [{
      title: '首页',
      icon: 'home',
      activeIcon: 'home-fill',
      activeColor: '#1EA0E1' },

    {
      title: '分类',
      icon: 'grid',
      activeIcon: 'grid-fill',
      activeColor: '#1EA0E1' },

    {
      title: '购物车',
      icon: 'shopping-cart',
      activeIcon: 'shopping-cart-fill',
      activeColor: '#1EA0E1' },

    {
      title: '我的',
      icon: 'account',
      activeIcon: 'account-fill',
      activeColor: '#1EA0E1' }];


  }
  //其他
  else {
      tabbarList = [{
        title: '首页',
        icon: 'home',
        activeIcon: 'home-fill',
        activeColor: '#ccaf8b' },

      {
        title: '我的',
        icon: 'account',
        activeIcon: 'account-fill',
        activeColor: '#ccaf8b' }];


    }
  return tabbarList;
}
//获取商品类别数据
function _getCategoryData() {
  var categoryData = {
    "data": [{
      "gcId": 652,
      "gcName": "数码",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 654,
        "gcName": "摄影摄像",
        "gcParentId": 652,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 831,
          "gcName": "数码相机",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 832,
          "gcName": "单反相机",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 833,
          "gcName": "摄像机",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 834,
          "gcName": "镜头",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 844,
          "gcName": "数码相框",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5012,
          "gcName": "微单相机",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7170,
          "gcName": "拍立得",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12342,
          "gcName": "运动相机",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12343,
          "gcName": "户外器材",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12344,
          "gcName": "影棚器材",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12415,
          "gcName": "冲印服务",
          "gcParentId": 654,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 828,
        "gcName": "影音娱乐",
        "gcParentId": 652,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 837,
          "gcName": "MP3/MP4",
          "gcParentId": 828,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 841,
          "gcName": "音箱/音响",
          "gcParentId": 828,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 842,
          "gcName": "耳机/耳麦",
          "gcParentId": 828,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 869,
          "gcName": "麦克风",
          "gcParentId": 828,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 962,
          "gcName": "专业音频",
          "gcParentId": 828,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5270,
          "gcName": "苹果配件",
          "gcParentId": 828,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12808,
          "gcName": "收音机",
          "gcParentId": 828,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13662,
          "gcName": "便携/无线音箱",
          "gcParentId": 828,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 829,
        "gcName": "数码配件",
        "gcParentId": 652,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 835,
          "gcName": "滤镜",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 836,
          "gcName": "闪光灯/手柄",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 845,
          "gcName": "存储卡",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 846,
          "gcName": "读卡器",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 847,
          "gcName": "相机包",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 848,
          "gcName": "三脚架/云台",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 851,
          "gcName": "相机清洁/贴膜",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 854,
          "gcName": "电池/充电器",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 10971,
          "gcName": "机身附件",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 10972,
          "gcName": "镜头附件",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12810,
          "gcName": "数码支架",
          "gcParentId": 829,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 981,
        "gcName": "虚拟商品",
        "gcParentId": 652,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 982,
          "gcName": "延保服务",
          "gcParentId": 981,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12345,
        "gcName": "智能设备",
        "gcParentId": 652,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12347,
          "gcName": "智能手环",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12348,
          "gcName": "智能手表",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12349,
          "gcName": "VR眼镜",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12350,
          "gcName": "运动跟踪器",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12351,
          "gcName": "健康监测",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12352,
          "gcName": "智能配饰",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12353,
          "gcName": "智能家居",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12354,
          "gcName": "体感车",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12355,
          "gcName": "其他配件",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12806,
          "gcName": "智能机器人",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12807,
          "gcName": "无人机",
          "gcParentId": 12345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12346,
        "gcName": "电子教育",
        "gcParentId": 652,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 838,
          "gcName": "电子词典",
          "gcParentId": 12346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 840,
          "gcName": "录音笔",
          "gcParentId": 12346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1203,
          "gcName": "电纸书",
          "gcParentId": 12346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12356,
          "gcName": "复读机",
          "gcParentId": 12346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12357,
          "gcName": "点读机/笔",
          "gcParentId": 12346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12358,
          "gcName": "学生平板",
          "gcParentId": 12346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12359,
          "gcName": "早教益智",
          "gcParentId": 12346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16961,
          "gcName": "翻译机",
          "gcParentId": 12346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16951,
        "gcName": "数码维修",
        "gcParentId": 652,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16953,
          "gcName": "无人机维修",
          "gcParentId": 16951,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16954,
          "gcName": "其他数码产品维修",
          "gcParentId": 16951,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 670,
      "gcName": "电脑、办公",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 671,
        "gcName": "电脑整机",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 672,
          "gcName": "笔记本",
          "gcParentId": 671,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 673,
          "gcName": "台式机",
          "gcParentId": 671,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 674,
          "gcName": "服务器/工作站",
          "gcParentId": 671,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 675,
          "gcName": "笔记本配件",
          "gcParentId": 671,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1105,
          "gcName": "游戏本",
          "gcParentId": 671,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2694,
          "gcName": "平板电脑",
          "gcParentId": 671,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5146,
          "gcName": "平板电脑配件",
          "gcParentId": 671,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12798,
          "gcName": "一体机",
          "gcParentId": 671,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 677,
        "gcName": "电脑组件",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 678,
          "gcName": "CPU",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 679,
          "gcName": "显卡",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 680,
          "gcName": "内存",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 681,
          "gcName": "主板",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 682,
          "gcName": "散热器",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 683,
          "gcName": "硬盘",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 684,
          "gcName": "刻录机/光驱",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 687,
          "gcName": "机箱",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 688,
          "gcName": "显示器",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 691,
          "gcName": "电源",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5008,
          "gcName": "声卡/扩展卡",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5009,
          "gcName": "装机配件",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11303,
          "gcName": "SSD固态硬盘",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11762,
          "gcName": "组装电脑",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18522,
          "gcName": "显示器支架",
          "gcParentId": 677,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 686,
        "gcName": "外设产品",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 689,
          "gcName": "键盘",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 690,
          "gcName": "鼠标",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 692,
          "gcName": "摄像头",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 693,
          "gcName": "移动硬盘",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 694,
          "gcName": "U盘",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 695,
          "gcName": "硬盘盒",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 696,
          "gcName": "游戏设备",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 698,
          "gcName": "手写板",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 826,
          "gcName": "鼠标垫",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1047,
          "gcName": "插座",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1048,
          "gcName": "UPS电源",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1049,
          "gcName": "线缆",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1050,
          "gcName": "电脑工具",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1051,
          "gcName": "电脑清洁",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12799,
          "gcName": "网络仪表仪器",
          "gcParentId": 686,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 699,
        "gcName": "网络产品",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 700,
          "gcName": "路由器",
          "gcParentId": 699,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 701,
          "gcName": "网卡",
          "gcParentId": 699,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 702,
          "gcName": "交换机",
          "gcParentId": 699,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 983,
          "gcName": "网络存储",
          "gcParentId": 699,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1098,
          "gcName": "5G/4G上网",
          "gcParentId": 699,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11304,
          "gcName": "网络盒子",
          "gcParentId": 699,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12370,
          "gcName": "网络配件",
          "gcParentId": 699,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 703,
        "gcName": "服务产品",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1009,
          "gcName": "京东服务",
          "gcParentId": 703,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 10969,
          "gcName": "延保服务",
          "gcParentId": 703,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12429,
          "gcName": "电脑办公设备保养",
          "gcParentId": 703,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 716,
        "gcName": "办公设备",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 717,
          "gcName": "打印机",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 718,
          "gcName": "传真设备",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 719,
          "gcName": "复合机",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 721,
          "gcName": "扫描仪",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 722,
          "gcName": "投影机",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 723,
          "gcName": "碎纸机",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 724,
          "gcName": "考勤机",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 725,
          "gcName": "验钞/点钞机",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 727,
          "gcName": "白板",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2601,
          "gcName": "保险柜/箱",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4839,
          "gcName": "装订/封装机",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5010,
          "gcName": "投影配件",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7373,
          "gcName": "收银机",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7374,
          "gcName": "安防监控",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7375,
          "gcName": "会议音频视频",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21083,
          "gcName": "条码扫描",
          "gcParentId": 716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 729,
        "gcName": "文具",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 728,
          "gcName": "计算器",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1449,
          "gcName": "学生文具",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2603,
          "gcName": "笔类",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4837,
          "gcName": "办公文具",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4840,
          "gcName": "文件管理",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7371,
          "gcName": "本册/便签",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7372,
          "gcName": "财会用品",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12376,
          "gcName": "画具画材",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21082,
          "gcName": "文房四宝",
          "gcParentId": 729,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12800,
        "gcName": "游戏设备",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12801,
          "gcName": "游戏机",
          "gcParentId": 12800,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12802,
          "gcName": "游戏耳机",
          "gcParentId": 12800,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12803,
          "gcName": "手柄/方向盘",
          "gcParentId": 12800,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12804,
          "gcName": "游戏软件",
          "gcParentId": 12800,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12805,
          "gcName": "游戏周边",
          "gcParentId": 12800,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16943,
        "gcName": "电脑办公安装",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16944,
          "gcName": "电脑安装",
          "gcParentId": 16943,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16945,
          "gcName": "办公设备安装",
          "gcParentId": 16943,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 21076,
        "gcName": "办公耗材",
        "gcParentId": 670,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 21077,
          "gcName": "刻录碟片",
          "gcParentId": 21076,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21078,
          "gcName": "纸类",
          "gcParentId": 21076,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21079,
          "gcName": "硒鼓",
          "gcParentId": 21076,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21080,
          "gcName": "墨盒",
          "gcParentId": 21076,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21081,
          "gcName": "色带",
          "gcParentId": 21076,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 737,
      "gcName": "家用电器",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 738,
        "gcName": "生活电器",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 745,
          "gcName": "吸尘器",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 747,
          "gcName": "取暖电器",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 748,
          "gcName": "加湿器",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 749,
          "gcName": "空气净化器",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 750,
          "gcName": "饮水机",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 751,
          "gcName": "电风扇",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 806,
          "gcName": "电话机",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 825,
          "gcName": "其它生活电器",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 897,
          "gcName": "清洁机",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 898,
          "gcName": "净水器",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1278,
          "gcName": "冷风扇",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1279,
          "gcName": "挂烫机/熨斗",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1283,
          "gcName": "除湿机",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12394,
          "gcName": "扫地机器人",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12395,
          "gcName": "干衣机",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14383,
          "gcName": "毛球修剪器",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17406,
          "gcName": "除螨仪",
          "gcParentId": 738,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 752,
        "gcName": "厨房小电",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 753,
          "gcName": "电饭煲",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 754,
          "gcName": "多用途锅",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 755,
          "gcName": "料理机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 756,
          "gcName": "豆浆机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 757,
          "gcName": "电磁炉",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 758,
          "gcName": "微波炉",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 759,
          "gcName": "电烤箱",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 760,
          "gcName": "电水壶/热水瓶",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 761,
          "gcName": "咖啡机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 762,
          "gcName": "酸奶机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 803,
          "gcName": "其它厨房电器",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 881,
          "gcName": "电压力锅",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 882,
          "gcName": "电饼铛",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 899,
          "gcName": "面包机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 901,
          "gcName": "果蔬解毒机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 902,
          "gcName": "煮蛋器",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9249,
          "gcName": "电炖锅",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12397,
          "gcName": "养生壶/煎药壶",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12398,
          "gcName": "电热饭盒",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13116,
          "gcName": "榨汁机/原汁机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13118,
          "gcName": "电烧烤炉",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13702,
          "gcName": "面条机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14381,
          "gcName": "空气炸锅",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14382,
          "gcName": "电陶炉",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14421,
          "gcName": "破壁机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15100,
          "gcName": "绞肉机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15124,
          "gcName": "打蛋器",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15125,
          "gcName": "厨师机/和面机",
          "gcParentId": 752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 794,
        "gcName": "大 家 电",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 798,
          "gcName": "平板电视",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 870,
          "gcName": "空调",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 878,
          "gcName": "冰箱",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 880,
          "gcName": "洗衣机",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12392,
          "gcName": "冷柜/冰吧",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12401,
          "gcName": "酒柜",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13701,
          "gcName": "中央空调",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14420,
          "gcName": "烘干机",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17152,
          "gcName": "移动空调",
          "gcParentId": 794,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1276,
        "gcName": "个护健康",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 739,
          "gcName": "剃须刀",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 740,
          "gcName": "电吹风",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 741,
          "gcName": "电动牙刷",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 742,
          "gcName": "剃/脱毛器",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 795,
          "gcName": "美容器",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 963,
          "gcName": "足浴盆",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 967,
          "gcName": "按摩器",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1287,
          "gcName": "理发器",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1289,
          "gcName": "电子秤",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1290,
          "gcName": "其它健康电器",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1291,
          "gcName": "按摩椅",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12400,
          "gcName": "卷/直发器",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14380,
          "gcName": "洁面仪",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14418,
          "gcName": "足疗机",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14419,
          "gcName": "眼部按摩仪",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17404,
          "gcName": "电动牙刷头",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17405,
          "gcName": "冲牙器",
          "gcParentId": 1276,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13297,
        "gcName": "厨卫大电",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1300,
          "gcName": "油烟机",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1301,
          "gcName": "消毒柜",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13117,
          "gcName": "洗碗机",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13298,
          "gcName": "燃气灶",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13690,
          "gcName": "电热水器",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13691,
          "gcName": "燃气热水器",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13881,
          "gcName": "集成灶",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13882,
          "gcName": "蒸箱",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18577,
          "gcName": "空气能热水器",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18578,
          "gcName": "太阳能热水器",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19958,
          "gcName": "嵌入式微蒸烤",
          "gcParentId": 13297,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14857,
        "gcName": "商用电器",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14858,
          "gcName": "商用烤箱",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14859,
          "gcName": "醒发箱",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14860,
          "gcName": "商用磨浆机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14861,
          "gcName": "封口/封杯机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14862,
          "gcName": "商用压面机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14863,
          "gcName": "商用电饼铛",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14864,
          "gcName": "肠粉机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14865,
          "gcName": "保温售饭台",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14868,
          "gcName": "商用开水器",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14869,
          "gcName": "果糖机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14870,
          "gcName": "香肠/热狗机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14872,
          "gcName": "商用绞肉机/切肉机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14873,
          "gcName": "展示柜",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14874,
          "gcName": "保鲜工作台",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14875,
          "gcName": "蒸柜",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14876,
          "gcName": "制冰机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14877,
          "gcName": "电炸炉",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14878,
          "gcName": "扒炉",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15101,
          "gcName": "商用和面机/打蛋机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15102,
          "gcName": "商用电磁炉",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15103,
          "gcName": "商用吸尘器",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17470,
          "gcName": "饮料机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17471,
          "gcName": "冰淇淋机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17472,
          "gcName": "刨冰/沙冰机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17473,
          "gcName": "爆米花机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17474,
          "gcName": "商用消毒柜",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17475,
          "gcName": "商用咖啡机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17476,
          "gcName": "商用净水设备",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17478,
          "gcName": "其它商用电器",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17479,
          "gcName": "商用电器配件",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17480,
          "gcName": "食品烘干机",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17482,
          "gcName": "商用电饭煲",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17483,
          "gcName": "煮面桶",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17484,
          "gcName": "工程电器/解决方案",
          "gcParentId": 14857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16962,
        "gcName": "家电服务",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16963,
          "gcName": "家电安装",
          "gcParentId": 16962,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16964,
          "gcName": "家电清洗",
          "gcParentId": 16962,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16965,
          "gcName": "家电维修",
          "gcParentId": 16962,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17394,
        "gcName": "家电配件",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17395,
          "gcName": "电视配件",
          "gcParentId": 17394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17396,
          "gcName": "洗衣机配件",
          "gcParentId": 17394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17397,
          "gcName": "冰箱配件",
          "gcParentId": 17394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17398,
          "gcName": "生活电器配件",
          "gcParentId": 17394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17399,
          "gcName": "空调配件",
          "gcParentId": 17394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17400,
          "gcName": "个护健康配件",
          "gcParentId": 17394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17401,
          "gcName": "厨房小电配件",
          "gcParentId": 17394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17402,
          "gcName": "烟机灶具配件",
          "gcParentId": 17394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17407,
        "gcName": "视听影音",
        "gcParentId": 737,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17408,
          "gcName": "播放器/DVD",
          "gcParentId": 17407,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17409,
          "gcName": "HIFI专区",
          "gcParentId": 17407,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17410,
          "gcName": "家庭影院",
          "gcParentId": 17407,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17411,
          "gcName": "迷你音响",
          "gcParentId": 17407,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17412,
          "gcName": "功放",
          "gcParentId": 17407,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17413,
          "gcName": "回音壁/Soundbar",
          "gcParentId": 17407,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17414,
          "gcName": "KTV音响",
          "gcParentId": 17407,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17415,
          "gcName": "麦克风",
          "gcParentId": 17407,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 1315,
      "gcName": "服饰内衣",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 1342,
        "gcName": "男装",
        "gcParentId": 1315,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1348,
          "gcName": "衬衫",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1349,
          "gcName": "T恤",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1350,
          "gcName": "针织衫",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3982,
          "gcName": "羽绒服",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9724,
          "gcName": "棉服",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9725,
          "gcName": "仿皮皮衣",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9726,
          "gcName": "羊绒衫",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9728,
          "gcName": "风衣",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9729,
          "gcName": "毛呢大衣",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9730,
          "gcName": "夹克",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9731,
          "gcName": "西服",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9732,
          "gcName": "卫衣",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9733,
          "gcName": "POLO衫",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9734,
          "gcName": "马甲/背心",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9735,
          "gcName": "牛仔裤",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9736,
          "gcName": "休闲裤",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9737,
          "gcName": "西裤",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9738,
          "gcName": "西服套装",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9739,
          "gcName": "大码男装",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9740,
          "gcName": "中老年男装",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9741,
          "gcName": "唐装/汉服",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9742,
          "gcName": "工装",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12001,
          "gcName": "真皮皮衣",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12002,
          "gcName": "加绒裤",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12003,
          "gcName": "卫裤/运动裤",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12004,
          "gcName": "短裤",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12005,
          "gcName": "设计师/潮牌",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12089,
          "gcName": "羊毛衫",
          "gcParentId": 1342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1343,
        "gcName": "女装",
        "gcParentId": 1315,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1354,
          "gcName": "衬衫",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1355,
          "gcName": "T恤",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1356,
          "gcName": "针织衫",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3983,
          "gcName": "羽绒服",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9705,
          "gcName": "棉服",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9706,
          "gcName": "毛呢大衣",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9707,
          "gcName": "真皮皮衣",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9708,
          "gcName": "风衣",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9710,
          "gcName": "卫衣",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9711,
          "gcName": "小西装",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9712,
          "gcName": "短外套",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9713,
          "gcName": "雪纺衫",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9714,
          "gcName": "马甲",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9715,
          "gcName": "牛仔裤",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9716,
          "gcName": "打底裤",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9717,
          "gcName": "休闲裤",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9718,
          "gcName": "正装裤",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9719,
          "gcName": "连衣裙",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9720,
          "gcName": "半身裙",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9721,
          "gcName": "中老年女装",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9722,
          "gcName": "大码女装",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9723,
          "gcName": "婚纱",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11985,
          "gcName": "打底衫",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11986,
          "gcName": "旗袍/汉服",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11987,
          "gcName": "加绒裤",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11988,
          "gcName": "吊带/背心",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11989,
          "gcName": "羊绒衫",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11991,
          "gcName": "短裤",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11993,
          "gcName": "皮草",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11998,
          "gcName": "仿皮皮衣",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11999,
          "gcName": "毛衣",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12000,
          "gcName": "设计师/潮牌",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21443,
          "gcName": "女装套装",
          "gcParentId": 1343,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1345,
        "gcName": "内衣",
        "gcParentId": 1315,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1364,
          "gcName": "文胸",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1365,
          "gcName": "吊带/背心",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1369,
          "gcName": "保暖内衣",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1371,
          "gcName": "睡衣/家居服",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9743,
          "gcName": "女式内裤",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9744,
          "gcName": "男式内裤",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9745,
          "gcName": "商务男袜",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9747,
          "gcName": "塑身美体",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9748,
          "gcName": "连裤袜/丝袜",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9749,
          "gcName": "美腿袜",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9751,
          "gcName": "抹胸",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9753,
          "gcName": "泳衣",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12006,
          "gcName": "情侣睡衣",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12008,
          "gcName": "文胸套装",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12009,
          "gcName": "少女文胸",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12010,
          "gcName": "休闲棉袜 ",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12012,
          "gcName": "内衣配件",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12013,
          "gcName": "打底裤袜",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12014,
          "gcName": "打底衫",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12015,
          "gcName": "秋衣秋裤",
          "gcParentId": 1345,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1346,
        "gcName": "服饰配件",
        "gcParentId": 1315,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1376,
          "gcName": "围巾/手套/帽子套装",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1378,
          "gcName": "袖扣",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9789,
          "gcName": "光学镜架/镜片",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9790,
          "gcName": "太阳镜",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9792,
          "gcName": "棒球帽",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9793,
          "gcName": "毛线帽",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9794,
          "gcName": "遮阳帽",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12017,
          "gcName": "老花镜",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12019,
          "gcName": "防辐射眼镜",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12020,
          "gcName": "游泳镜",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12021,
          "gcName": "女士丝巾/围巾/披肩",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12022,
          "gcName": "男士丝巾/围巾",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12023,
          "gcName": "鸭舌帽",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12024,
          "gcName": "贝雷帽",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12025,
          "gcName": "礼帽",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12026,
          "gcName": "真皮手套",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12027,
          "gcName": "毛线手套",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12028,
          "gcName": "防晒手套",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12030,
          "gcName": "非皮质腰带",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12033,
          "gcName": "钥匙扣",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12034,
          "gcName": "遮阳伞/雨伞",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12035,
          "gcName": "口罩",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12036,
          "gcName": "耳罩/耳包",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12038,
          "gcName": "毛线/布面料",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12039,
          "gcName": "领带/领结/领带夹",
          "gcParentId": 1346,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13529,
        "gcName": "洗衣服务",
        "gcParentId": 1315,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13530,
          "gcName": "服装洗护",
          "gcParentId": 13529,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 1316,
      "gcName": "美妆护肤",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 1381,
        "gcName": "面部护肤",
        "gcParentId": 1316,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1389,
          "gcName": "洁面",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1390,
          "gcName": "爽肤水/化妆水",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1391,
          "gcName": "乳液/面霜",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1392,
          "gcName": "面膜",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1396,
          "gcName": "套装/礼盒",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13544,
          "gcName": "卸妆",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13546,
          "gcName": "面部精华",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13547,
          "gcName": "眼霜/眼部精华",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13548,
          "gcName": "防晒",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16833,
          "gcName": "眼膜",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16834,
          "gcName": "唇膜/唇部精华",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16835,
          "gcName": "T区护理",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16836,
          "gcName": "润唇膏",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16837,
          "gcName": "其它面部护肤",
          "gcParentId": 1381,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1387,
        "gcName": "香水彩妆",
        "gcParentId": 1316,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1420,
          "gcName": "粉底液/膏",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1421,
          "gcName": "腮红/胭脂",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1422,
          "gcName": "眼影",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1423,
          "gcName": "眉笔/眉粉",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1424,
          "gcName": "睫毛膏/增长液",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1425,
          "gcName": "口红",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1426,
          "gcName": "彩妆套装",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1428,
          "gcName": "美甲产品",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11932,
          "gcName": "香水",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13549,
          "gcName": "眼线笔/眼线液",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16851,
          "gcName": "隔离霜/妆前乳",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16852,
          "gcName": "气垫BB/BB霜",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16853,
          "gcName": "气垫CC/CC霜",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16854,
          "gcName": "遮瑕",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16855,
          "gcName": "蜜粉/散粉",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16856,
          "gcName": "粉饼",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16857,
          "gcName": "唇彩唇蜜/唇釉",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16858,
          "gcName": "唇笔/唇线笔",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16859,
          "gcName": "其它彩妆",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16860,
          "gcName": "男士彩妆",
          "gcParentId": 1387,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16831,
        "gcName": "男士面部护肤",
        "gcParentId": 1316,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16838,
          "gcName": "剃须",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16839,
          "gcName": "男士卸妆",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16840,
          "gcName": "男士洁面",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16841,
          "gcName": "男士眼霜/眼部精华",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16842,
          "gcName": "男士面部精华",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16843,
          "gcName": "男士爽肤水/化妆水",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16844,
          "gcName": "男士乳液/面霜",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16845,
          "gcName": "男士防晒",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16846,
          "gcName": "男士面膜",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16847,
          "gcName": "男士T区护理",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16848,
          "gcName": "男士润唇膏",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16849,
          "gcName": "其它男士面部护肤",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16850,
          "gcName": "套装/礼盒",
          "gcParentId": 16831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16832,
        "gcName": "美妆工具",
        "gcParentId": 1316,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16861,
          "gcName": "化妆棉",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16862,
          "gcName": "假睫毛",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16863,
          "gcName": "双眼皮贴",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16864,
          "gcName": "化妆刷",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16865,
          "gcName": "粉扑/洗脸扑",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16866,
          "gcName": "睫毛夹",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16867,
          "gcName": "修眉刀",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16868,
          "gcName": "美甲工具",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16869,
          "gcName": "美妆工具套装",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16886,
          "gcName": "其他美妆工具",
          "gcParentId": 16832,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 1318,
      "gcName": "运动户外",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 1462,
        "gcName": "户外装备",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1472,
          "gcName": "背包",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1473,
          "gcName": "帐篷/垫子",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1474,
          "gcName": "睡袋/吊床",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1475,
          "gcName": "登山攀岩",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1476,
          "gcName": "户外照明",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1477,
          "gcName": "野餐用品",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1479,
          "gcName": "户外工具",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1480,
          "gcName": "望远镜",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2629,
          "gcName": "户外配饰",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2631,
          "gcName": "户外仪表",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2691,
          "gcName": "旅行装备",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5152,
          "gcName": "军迷用品",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12143,
          "gcName": "救援装备",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12145,
          "gcName": "极限户外",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12146,
          "gcName": "冲浪潜水",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13797,
          "gcName": "飞机游艇",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13803,
          "gcName": "烧烤用具",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17067,
          "gcName": "军迷装备",
          "gcParentId": 1462,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1463,
        "gcName": "健身训练",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1483,
          "gcName": "动感单车",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1484,
          "gcName": "跑步机",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12109,
          "gcName": "综合训练器",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12110,
          "gcName": "椭圆机",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12111,
          "gcName": "哑铃",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12112,
          "gcName": "仰卧板/收腹机",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12113,
          "gcName": "其他器械",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12858,
          "gcName": "甩脂机",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12859,
          "gcName": "踏步机",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13792,
          "gcName": "划船机",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13793,
          "gcName": "倒立机",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13794,
          "gcName": "拉力器/臂力器",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13795,
          "gcName": "跳绳",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13796,
          "gcName": "健腹轮",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14666,
          "gcName": "健身车",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14667,
          "gcName": "单双杠/引体向上",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14668,
          "gcName": "健身路径",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17510,
          "gcName": "杠铃",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17511,
          "gcName": "壶铃",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17513,
          "gcName": "律动机",
          "gcParentId": 1463,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1466,
        "gcName": "体育用品",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1694,
          "gcName": "乒乓球拍",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1695,
          "gcName": "羽毛球拍",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1696,
          "gcName": "网球拍",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1697,
          "gcName": "足球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1698,
          "gcName": "篮球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1699,
          "gcName": "排球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1700,
          "gcName": "高尔夫球杆套杆",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1701,
          "gcName": "台球桌",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5156,
          "gcName": "棒球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13805,
          "gcName": "其他田径用品",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15746,
          "gcName": "高尔夫球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15754,
          "gcName": "更多高尔夫服装",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15757,
          "gcName": "推杆练习器",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15758,
          "gcName": "高尔夫手套",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15760,
          "gcName": "其他高尔夫装备",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15781,
          "gcName": "台球杆",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15782,
          "gcName": "台球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15786,
          "gcName": "防滑粉",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15795,
          "gcName": "其他台球配件",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15796,
          "gcName": "接力棒",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15797,
          "gcName": "铅球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15798,
          "gcName": "跳箱/跳马",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15799,
          "gcName": "起跑器",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15800,
          "gcName": "跨栏架",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15801,
          "gcName": "跳高架",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15803,
          "gcName": "铁饼/标枪",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15804,
          "gcName": "排球网/球柱",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15807,
          "gcName": "其他体育用品",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15808,
          "gcName": "棒球棒",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15809,
          "gcName": "棒球手套",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15810,
          "gcName": "橄榄球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15837,
          "gcName": "乒乓底板",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15838,
          "gcName": "乒乓球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15839,
          "gcName": "乒乓球桌",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15840,
          "gcName": "乒乓球发球机",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15841,
          "gcName": "乒乓球拍胶皮",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15842,
          "gcName": "乒乓球挡板",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15843,
          "gcName": "乒乓球鞋",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15844,
          "gcName": "乒乓球服",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15845,
          "gcName": "乒乓球拍套/包",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15847,
          "gcName": "乒乓球网/架",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15848,
          "gcName": "乒乓球集球网",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15849,
          "gcName": "乒乓球袜",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15850,
          "gcName": "乒乓球胶水",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15851,
          "gcName": "其他乒乓球装备",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15852,
          "gcName": "足球护腿板",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15853,
          "gcName": "足球球门",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15854,
          "gcName": "守门员手套",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15855,
          "gcName": "足球网",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15858,
          "gcName": "裁判用品",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15859,
          "gcName": "足球训练背心",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15860,
          "gcName": "其他足球装备",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15861,
          "gcName": "足球袜",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15862,
          "gcName": "羽毛球包",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15863,
          "gcName": "羽毛球线",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15864,
          "gcName": "羽毛球手胶",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15865,
          "gcName": "其他羽球装备",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15866,
          "gcName": "羽毛球鞋",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15867,
          "gcName": "羽毛球服",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15868,
          "gcName": "羽毛球网架",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15869,
          "gcName": "羽毛球网",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15870,
          "gcName": "羽毛球袜",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15871,
          "gcName": "羽毛球蒸球机",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15872,
          "gcName": "网球包",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15873,
          "gcName": "网球线",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15874,
          "gcName": "网球手胶",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15875,
          "gcName": "其他网球装备",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15876,
          "gcName": "网球鞋",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15877,
          "gcName": "网球服",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15882,
          "gcName": "网球训练器",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15883,
          "gcName": "篮球架",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15884,
          "gcName": "其他篮球装备",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15885,
          "gcName": "篮球袜",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15886,
          "gcName": "篮球包",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15887,
          "gcName": "篮球框",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15888,
          "gcName": "羽毛球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15889,
          "gcName": "网球",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17064,
          "gcName": "高尔夫球帽",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17065,
          "gcName": "运动地胶",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17240,
          "gcName": "穿线机",
          "gcParentId": 1466,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 2628,
        "gcName": "户外鞋服",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12123,
          "gcName": "冲锋衣裤",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12124,
          "gcName": "速干衣裤",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12126,
          "gcName": "羽绒服/棉服",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12127,
          "gcName": "休闲衣裤",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12128,
          "gcName": "抓绒衣裤",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12129,
          "gcName": "软壳衣裤",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12130,
          "gcName": "T恤",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12131,
          "gcName": "户外风衣",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12132,
          "gcName": "功能内衣",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12133,
          "gcName": "军迷服饰",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12134,
          "gcName": "登山鞋",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12135,
          "gcName": "雪地靴",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12136,
          "gcName": "徒步鞋",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12137,
          "gcName": "越野跑鞋",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12138,
          "gcName": "休闲鞋",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12139,
          "gcName": "工装鞋",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12140,
          "gcName": "溯溪鞋",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12141,
          "gcName": "沙滩/凉拖",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12142,
          "gcName": "户外袜",
          "gcParentId": 2628,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12099,
        "gcName": "运动鞋包",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9754,
          "gcName": "休闲鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9755,
          "gcName": "帆布鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9756,
          "gcName": "跑步鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9757,
          "gcName": "篮球鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9758,
          "gcName": "足球鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9759,
          "gcName": "训练鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9761,
          "gcName": "拖鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9768,
          "gcName": "运动包",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12100,
          "gcName": "板鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12101,
          "gcName": "专项运动鞋",
          "gcParentId": 12099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12102,
        "gcName": "运动服饰",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9762,
          "gcName": "棉服",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9763,
          "gcName": "夹克/风衣",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9764,
          "gcName": "卫衣/套头衫",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9765,
          "gcName": "T恤",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9766,
          "gcName": "运动裤",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9767,
          "gcName": "套装",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12103,
          "gcName": "运动配饰",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12104,
          "gcName": "羽绒服",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12105,
          "gcName": "毛衫/线衫",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12107,
          "gcName": "健身服",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12108,
          "gcName": "运动背心",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15099,
          "gcName": "运动内衣",
          "gcParentId": 12102,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12115,
        "gcName": "骑行运动",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12116,
          "gcName": "折叠车",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12117,
          "gcName": "山地车",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12118,
          "gcName": "电动车",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12119,
          "gcName": "城市自行车",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12120,
          "gcName": "骑行服",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12121,
          "gcName": "穿戴装备",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12861,
          "gcName": "平衡车",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13791,
          "gcName": "电动滑板车",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13806,
          "gcName": "公路车",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13807,
          "gcName": "自行车配件",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16826,
          "gcName": "电动车零配件",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16827,
          "gcName": "电动车装备",
          "gcParentId": 12115,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12147,
        "gcName": "垂钓用品",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12148,
          "gcName": "钓竿",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12149,
          "gcName": "浮漂",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12150,
          "gcName": "钓箱钓椅",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12151,
          "gcName": "钓鱼配件",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12152,
          "gcName": "渔具包",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12153,
          "gcName": "辅助装备",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13799,
          "gcName": "鱼线",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13800,
          "gcName": "鱼饵",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13801,
          "gcName": "鱼线轮",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13802,
          "gcName": "钓鱼灯",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13904,
          "gcName": "钓鱼服饰",
          "gcParentId": 12147,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12154,
        "gcName": "游泳用品",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12155,
          "gcName": "泳镜",
          "gcParentId": 12154,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12156,
          "gcName": "泳帽",
          "gcParentId": 12154,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12157,
          "gcName": "游泳包防水包",
          "gcParentId": 12154,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12158,
          "gcName": "女士泳衣",
          "gcParentId": 12154,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12159,
          "gcName": "男士泳衣",
          "gcParentId": 12154,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12160,
          "gcName": "比基尼",
          "gcParentId": 12154,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12161,
          "gcName": "游泳配件",
          "gcParentId": 12154,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13798,
          "gcName": "游泳圈",
          "gcParentId": 12154,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15684,
        "gcName": "运动护具",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15685,
          "gcName": "运动护膝",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15686,
          "gcName": "运动护腰",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15687,
          "gcName": "运动护肘",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15688,
          "gcName": "运动护踝",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15689,
          "gcName": "护腕",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15690,
          "gcName": "运动护臀",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15691,
          "gcName": "运动护腿",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15692,
          "gcName": "运动护肩",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15693,
          "gcName": "护齿",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15694,
          "gcName": "护指",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15695,
          "gcName": "健身手套",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15696,
          "gcName": "髌骨带",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15697,
          "gcName": "助力带",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15698,
          "gcName": "紧身服/压缩衣",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15699,
          "gcName": "其他运动护具",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17060,
          "gcName": "运动肌肉贴",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17061,
          "gcName": "护臂",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17062,
          "gcName": "运动发带",
          "gcParentId": 15684,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15700,
        "gcName": "瑜伽舞蹈",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15702,
          "gcName": "瑜伽服套装",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15703,
          "gcName": "瑜伽服内衣",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15704,
          "gcName": "瑜伽服上衣",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15705,
          "gcName": "瑜伽服裤",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15706,
          "gcName": "瑜伽服外套",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15707,
          "gcName": "瑜伽短裤",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15708,
          "gcName": "瑜伽袜",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15709,
          "gcName": "瑜伽发带",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15712,
          "gcName": "芭蕾舞服",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15713,
          "gcName": "现代舞服",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15716,
          "gcName": "广场舞鞋",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15718,
          "gcName": "芭蕾舞鞋",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15722,
          "gcName": "舞蹈把杆",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15725,
          "gcName": "瑜伽垫",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15726,
          "gcName": "瑜伽柱",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15727,
          "gcName": "瑜伽球",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15728,
          "gcName": "瑜伽铺巾",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15730,
          "gcName": "瑜伽拉力带",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15731,
          "gcName": "瑜伽砖",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15732,
          "gcName": "瑜伽绳",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15733,
          "gcName": "瑜伽圈",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15734,
          "gcName": "瑜伽半圆球",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15735,
          "gcName": "瑜伽吊床",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15736,
          "gcName": "其他瑜伽用品",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15737,
          "gcName": "普拉提器械",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15738,
          "gcName": "其他舞蹈配件",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15739,
          "gcName": "瑜伽包",
          "gcParentId": 15700,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15763,
        "gcName": "马术/民俗运动",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15775,
          "gcName": "毽子",
          "gcParentId": 15763,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15777,
          "gcName": "拔河绳",
          "gcParentId": 15763,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15780,
          "gcName": "其他民俗用品",
          "gcParentId": 15763,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17040,
        "gcName": "冰上运动",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17041,
          "gcName": "速滑冰刀鞋",
          "gcParentId": 17040,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17051,
          "gcName": "冰球鞋",
          "gcParentId": 17040,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17122,
        "gcName": "武术搏击",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17123,
          "gcName": "跆拳道",
          "gcParentId": 17122,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17126,
          "gcName": "剑道",
          "gcParentId": 17122,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17127,
          "gcName": "摔跤",
          "gcParentId": 17122,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17128,
          "gcName": "其他武术装备",
          "gcParentId": 17122,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17129,
          "gcName": "拳击",
          "gcParentId": 17122,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17228,
        "gcName": "棋牌麻将",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17243,
          "gcName": "围棋",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17244,
          "gcName": "国际象棋",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17245,
          "gcName": "军棋/陆战棋",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17247,
          "gcName": "扑克",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17248,
          "gcName": "麻将",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17251,
          "gcName": "UNO牌",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17252,
          "gcName": "牌九",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17253,
          "gcName": "骰子/色子",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17254,
          "gcName": "筹码",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17257,
          "gcName": "其他棋牌麻将",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17258,
          "gcName": "狼人杀",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17260,
          "gcName": "中国象棋",
          "gcParentId": 17228,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17229,
        "gcName": "轮滑滑板",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17230,
          "gcName": "单排轮滑鞋",
          "gcParentId": 17229,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17233,
          "gcName": "轮滑包",
          "gcParentId": 17229,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17234,
          "gcName": "轮滑护具",
          "gcParentId": 17229,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17235,
          "gcName": "长板",
          "gcParentId": 17229,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17237,
          "gcName": "双翘板",
          "gcParentId": 17229,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17238,
          "gcName": "小鱼板",
          "gcParentId": 17229,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17239,
          "gcName": "其它轮滑滑板",
          "gcParentId": 17229,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17342,
        "gcName": "滑雪运动",
        "gcParentId": 1318,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17352,
          "gcName": "面罩/头套",
          "gcParentId": 17342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17368,
          "gcName": "更多滑雪用具",
          "gcParentId": 17342,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 1319,
      "gcName": "母婴",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 1523,
        "gcName": "奶粉",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 7052,
          "gcName": "婴幼儿奶粉",
          "gcParentId": 1523,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7054,
          "gcName": "孕妈奶粉",
          "gcParentId": 1523,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1524,
        "gcName": "营养辅食",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1533,
          "gcName": "米粉/菜粉",
          "gcParentId": 1524,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1534,
          "gcName": "果泥/果汁",
          "gcParentId": 1524,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1537,
          "gcName": "益生菌/初乳",
          "gcParentId": 1524,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1538,
          "gcName": "钙铁锌/维生素",
          "gcParentId": 1524,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1539,
          "gcName": "清火/开胃",
          "gcParentId": 1524,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7055,
          "gcName": "DHA",
          "gcParentId": 1524,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9399,
          "gcName": "面条/粥",
          "gcParentId": 1524,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12191,
          "gcName": "宝宝零食",
          "gcParentId": 1524,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1525,
        "gcName": "尿裤湿巾",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1546,
          "gcName": "拉拉裤",
          "gcParentId": 1525,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1548,
          "gcName": "婴儿湿巾",
          "gcParentId": 1525,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7057,
          "gcName": "婴儿尿裤",
          "gcParentId": 1525,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7058,
          "gcName": "成人尿裤",
          "gcParentId": 1525,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17309,
          "gcName": "婴儿纸尿片",
          "gcParentId": 1525,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1526,
        "gcName": "喂养用品",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1550,
          "gcName": "吸奶器",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1551,
          "gcName": "暖奶消毒",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1552,
          "gcName": "儿童餐具",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1553,
          "gcName": "牙胶安抚",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7060,
          "gcName": "奶瓶奶嘴",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7061,
          "gcName": "水壶/水杯",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12197,
          "gcName": "辅食料理机",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13286,
          "gcName": "围兜/防溅衣",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13287,
          "gcName": "食物存储",
          "gcParentId": 1526,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1527,
        "gcName": "洗护用品",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1555,
          "gcName": "洗发沐浴",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1556,
          "gcName": "宝宝护肤",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1557,
          "gcName": "洗衣液/皂",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1558,
          "gcName": "奶瓶清洗",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1559,
          "gcName": "日常护理",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1560,
          "gcName": "驱蚊防晒",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1562,
          "gcName": "座便器",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12341,
          "gcName": "婴儿理发器",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13288,
          "gcName": "洗澡用具",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13289,
          "gcName": "婴儿口腔清洁",
          "gcParentId": 1527,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1528,
        "gcName": "童车童床",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1563,
          "gcName": "婴儿推车",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1564,
          "gcName": "婴儿床",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1565,
          "gcName": "餐椅摇椅",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1566,
          "gcName": "自行车",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1567,
          "gcName": "电动车",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1568,
          "gcName": "学步车",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1569,
          "gcName": "三轮车",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4702,
          "gcName": "扭扭车",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12192,
          "gcName": "滑板车",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13293,
          "gcName": "婴儿床垫",
          "gcParentId": 1528,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 4979,
        "gcName": "赠品",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": null },
      {
        "gcId": 4997,
        "gcName": "妈妈专区",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 4998,
          "gcName": "孕妈装",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4999,
          "gcName": "防辐射服",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5000,
          "gcName": "孕产妇洗护",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5001,
          "gcName": "产后塑身",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5002,
          "gcName": "妈咪包/背婴带",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6319,
          "gcName": "孕期营养",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7062,
          "gcName": "文胸/内裤",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12198,
          "gcName": "待产护理",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12199,
          "gcName": "月子装",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13292,
          "gcName": "防溢乳垫",
          "gcParentId": 4997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6313,
        "gcName": "婴童寝居",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6315,
          "gcName": "婴儿鞋帽袜",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6316,
          "gcName": "婴童床品套件",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6317,
          "gcName": "安全防护",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13290,
          "gcName": "婴童睡袋/抱被",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13291,
          "gcName": "爬行垫",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15608,
          "gcName": "婴童布尿裤/尿布",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15609,
          "gcName": "婴童隔尿垫/巾",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15610,
          "gcName": "婴童浴巾/浴衣",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15611,
          "gcName": "婴童毛巾/口水巾",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15612,
          "gcName": "吸汗巾/垫背巾",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15613,
          "gcName": "婴童凉席/蚊帐",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15614,
          "gcName": "婴童枕芯/枕套",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15615,
          "gcName": "婴童被子/被套",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15616,
          "gcName": "婴童床单/床褥",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15617,
          "gcName": "婴童床围",
          "gcParentId": 6313,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 11842,
        "gcName": "童装",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3977,
          "gcName": "儿童配饰",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4937,
          "gcName": "亲子装",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11222,
          "gcName": "套装",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11223,
          "gcName": "T恤",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11224,
          "gcName": "裤子",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11225,
          "gcName": "裙子",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11226,
          "gcName": "羽绒服",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11227,
          "gcName": "内衣裤",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11228,
          "gcName": "礼服/演出服",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11843,
          "gcName": "户外/运动服",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14930,
          "gcName": "连体衣/爬服",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14931,
          "gcName": "棉服",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14933,
          "gcName": "毛衣/针织衫",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14934,
          "gcName": "衬衫",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14935,
          "gcName": "卫衣",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14936,
          "gcName": "外套/大衣",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14937,
          "gcName": "马甲",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14938,
          "gcName": "家居服",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14939,
          "gcName": "旗袍唐装/民族服装",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14940,
          "gcName": "袜子",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15239,
          "gcName": "婴儿礼盒",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15240,
          "gcName": "肚兜",
          "gcParentId": 11842,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12193,
        "gcName": "安全座椅",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12194,
          "gcName": "提篮式",
          "gcParentId": 12193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12195,
          "gcName": "安全座椅",
          "gcParentId": 12193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12196,
          "gcName": "增高垫",
          "gcParentId": 12193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14941,
        "gcName": "童鞋",
        "gcParentId": 1319,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14942,
          "gcName": "雨鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14943,
          "gcName": "学步鞋/步前鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14944,
          "gcName": "拖鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14945,
          "gcName": "布鞋/编织鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14946,
          "gcName": "皮鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14947,
          "gcName": "帆布鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14948,
          "gcName": "棉鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14949,
          "gcName": "凉鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14950,
          "gcName": "靴子",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14951,
          "gcName": "运动鞋",
          "gcParentId": 14941,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 1320,
      "gcName": "食品饮料",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 1581,
        "gcName": "地方特产",
        "gcParentId": 1320,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1589,
          "gcName": "新疆",
          "gcParentId": 1581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2644,
          "gcName": "北京",
          "gcParentId": 1581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2647,
          "gcName": "山西",
          "gcParentId": 1581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2653,
          "gcName": "福建",
          "gcParentId": 1581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2656,
          "gcName": "湖南",
          "gcParentId": 1581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2669,
          "gcName": "四川",
          "gcParentId": 1581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4693,
          "gcName": "东北",
          "gcParentId": 1581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12217,
          "gcName": "其他特产",
          "gcParentId": 1581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1583,
        "gcName": "休闲食品",
        "gcParentId": 1320,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1590,
          "gcName": "休闲零食",
          "gcParentId": 1583,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1591,
          "gcName": "坚果炒货",
          "gcParentId": 1583,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1592,
          "gcName": "肉干肉脯",
          "gcParentId": 1583,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1593,
          "gcName": "蜜饯果干",
          "gcParentId": 1583,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1594,
          "gcName": "糖果/巧克力",
          "gcParentId": 1583,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1595,
          "gcName": "饼干蛋糕",
          "gcParentId": 1583,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13757,
          "gcName": "熟食腊味",
          "gcParentId": 1583,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15050,
          "gcName": "膨化食品",
          "gcParentId": 1583,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1584,
        "gcName": "粮油调味",
        "gcParentId": 1320,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 2675,
          "gcName": "米",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2676,
          "gcName": "食用油",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2677,
          "gcName": "调味品",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2678,
          "gcName": "南北干货",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2679,
          "gcName": "方便食品",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2680,
          "gcName": "有机食品",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13760,
          "gcName": "烘焙原料",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13789,
          "gcName": "面",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13790,
          "gcName": "杂粮",
          "gcParentId": 1584,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 1585,
        "gcName": "饮料冲调",
        "gcParentId": 1320,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1601,
          "gcName": "冲饮谷物",
          "gcParentId": 1585,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1602,
          "gcName": "饮料",
          "gcParentId": 1585,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3986,
          "gcName": "咖啡/奶茶",
          "gcParentId": 1585,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9434,
          "gcName": "牛奶乳品",
          "gcParentId": 1585,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 10975,
          "gcName": "饮用水",
          "gcParentId": 1585,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12200,
          "gcName": "蜂蜜/柚子茶",
          "gcParentId": 1585,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12201,
          "gcName": "成人奶粉",
          "gcParentId": 1585,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 2641,
        "gcName": "食品礼券",
        "gcParentId": 1320,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 2642,
          "gcName": "月饼",
          "gcParentId": 2641,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4935,
          "gcName": "粽子",
          "gcParentId": 2641,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12216,
          "gcName": "卡券",
          "gcParentId": 2641,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 5019,
        "gcName": "进口食品",
        "gcParentId": 1320,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 5020,
          "gcName": "饼干蛋糕",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5021,
          "gcName": "糖果/巧克力",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5022,
          "gcName": "休闲零食",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5023,
          "gcName": "冲调品",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5024,
          "gcName": "米面调味",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12215,
          "gcName": "牛奶乳品",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15051,
          "gcName": "水",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15052,
          "gcName": "饮料",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15053,
          "gcName": "咖啡豆/咖啡粉",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15054,
          "gcName": "油",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15055,
          "gcName": "方便食品",
          "gcParentId": 5019,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12202,
        "gcName": "茗茶",
        "gcParentId": 1320,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12203,
          "gcName": "铁观音",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12204,
          "gcName": "普洱",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12205,
          "gcName": "龙井",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12206,
          "gcName": "绿茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12207,
          "gcName": "红茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12208,
          "gcName": "乌龙茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12209,
          "gcName": "花草茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12210,
          "gcName": "花果茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12211,
          "gcName": "养生茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12212,
          "gcName": "黑茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12213,
          "gcName": "白茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12214,
          "gcName": "其它茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17308,
          "gcName": "茉莉花茶",
          "gcParentId": 12202,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 1620,
      "gcName": "家居日用",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 1624,
        "gcName": "生活日用",
        "gcParentId": 1620,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1656,
          "gcName": "雨伞雨具",
          "gcParentId": 1624,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1657,
          "gcName": "浴室用品",
          "gcParentId": 1624,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1658,
          "gcName": "缝纫/针织用品",
          "gcParentId": 1624,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1660,
          "gcName": "洗晒/熨烫",
          "gcParentId": 1624,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1661,
          "gcName": "净化除味",
          "gcParentId": 1624,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11167,
          "gcName": "保暖防护",
          "gcParentId": 1624,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 11158,
        "gcName": "家装软饰",
        "gcParentId": 1620,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 11162,
          "gcName": "相框/照片墙",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11163,
          "gcName": "装饰字画",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11164,
          "gcName": "节庆饰品",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11165,
          "gcName": "手工/十字绣",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11166,
          "gcName": "装饰摆件",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11964,
          "gcName": "帘艺隔断",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11965,
          "gcName": "墙贴/装饰贴",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11966,
          "gcName": "钟饰",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11967,
          "gcName": "花瓶花艺",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11968,
          "gcName": "香薰蜡烛",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11969,
          "gcName": "创意家居",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17227,
          "gcName": "壁饰",
          "gcParentId": 11158,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13780,
        "gcName": "收纳用品",
        "gcParentId": 1620,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13781,
          "gcName": "收纳袋/包",
          "gcParentId": 13780,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13782,
          "gcName": "收纳柜",
          "gcParentId": 13780,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13783,
          "gcName": "收纳箱/盒",
          "gcParentId": 13780,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13784,
          "gcName": "防尘罩",
          "gcParentId": 13780,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13785,
          "gcName": "收纳架/篮",
          "gcParentId": 13780,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 1672,
      "gcName": "礼品",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 2599,
        "gcName": "礼品",
        "gcParentId": 1672,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1442,
          "gcName": "礼品文具",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1443,
          "gcName": "军刀军具",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1444,
          "gcName": "收藏品",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1445,
          "gcName": "工艺礼品",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4942,
          "gcName": "婚庆节庆",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5266,
          "gcName": "创意礼品",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6980,
          "gcName": "京东卡",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12078,
          "gcName": "美妆礼品",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12079,
          "gcName": "礼品定制",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13665,
          "gcName": "电子礼品",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13667,
          "gcName": "熏香",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17151,
          "gcName": "宗教用品",
          "gcParentId": 2599,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 2615,
        "gcName": "奢侈品",
        "gcParentId": 1672,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9186,
          "gcName": "箱包",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9187,
          "gcName": "钱包",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9188,
          "gcName": "服饰",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9189,
          "gcName": "腰带",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9190,
          "gcName": "太阳镜/眼镜框",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9191,
          "gcName": "配件",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11934,
          "gcName": "鞋靴",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11935,
          "gcName": "饰品",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11936,
          "gcName": "名品腕表",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11937,
          "gcName": "高档化妆品",
          "gcParentId": 2615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14226,
        "gcName": "火机烟具",
        "gcParentId": 1672,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14228,
          "gcName": "电子烟",
          "gcParentId": 14226,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14229,
          "gcName": "烟油",
          "gcParentId": 14226,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14230,
          "gcName": "打火机",
          "gcParentId": 14226,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14231,
          "gcName": "烟嘴",
          "gcParentId": 14226,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14232,
          "gcName": "烟斗",
          "gcParentId": 14226,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14233,
          "gcName": "烟盒",
          "gcParentId": 14226,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14227,
        "gcName": "鲜花速递",
        "gcParentId": 1672,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14234,
          "gcName": "鲜花",
          "gcParentId": 14227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14235,
          "gcName": "永生花",
          "gcParentId": 14227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14236,
          "gcName": "香皂花",
          "gcParentId": 14227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14237,
          "gcName": "卡通花束",
          "gcParentId": 14227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14238,
          "gcName": "干花",
          "gcParentId": 14227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17269,
          "gcName": "花材配件",
          "gcParentId": 14227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 1713,
      "gcName": "图书",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 3259,
        "gcName": "文学",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3336,
          "gcName": "中国文学",
          "gcParentId": 3259,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3262,
        "gcName": "艺术",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3374,
          "gcName": "鉴赏收藏",
          "gcParentId": 3262,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3263,
        "gcName": "童书",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12081,
          "gcName": "玩具书",
          "gcParentId": 3263,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3264,
        "gcName": "经济",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3419,
          "gcName": "通俗读物",
          "gcParentId": 3264,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3266,
        "gcName": "管理",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3439,
          "gcName": "人力资源管理",
          "gcParentId": 3266,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3441,
          "gcName": "企业管理与培训",
          "gcParentId": 3266,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3449,
          "gcName": "管理学",
          "gcParentId": 3266,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3450,
          "gcName": "管理工具书",
          "gcParentId": 3266,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3452,
          "gcName": "通俗读物",
          "gcParentId": 3266,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3454,
          "gcName": "领导学",
          "gcParentId": 3266,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3267,
        "gcName": "励志与成功",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3463,
          "gcName": "女性励志",
          "gcParentId": 3267,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3467,
          "gcName": "成功学",
          "gcParentId": 3267,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3472,
          "gcName": "自我调节",
          "gcParentId": 3267,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3477,
          "gcName": "性格/习惯",
          "gcParentId": 3267,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3269,
        "gcName": "健身与保健",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3498,
          "gcName": "家庭保健",
          "gcParentId": 3269,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3504,
          "gcName": "运动健身",
          "gcParentId": 3269,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3270,
        "gcName": "育儿/家教",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9266,
          "gcName": "家教方法",
          "gcParentId": 3270,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3271,
        "gcName": "旅游/地图",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3522,
          "gcName": "户外探险",
          "gcParentId": 3271,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3273,
        "gcName": "历史",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3554,
          "gcName": "历史研究与评论",
          "gcParentId": 3273,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3279,
        "gcName": "心理学",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3659,
          "gcName": "心灵疗愈/催眠",
          "gcParentId": 3279,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3281,
        "gcName": "社会科学",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3674,
          "gcName": "经典著作",
          "gcParentId": 3281,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3285,
        "gcName": "医学",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3758,
          "gcName": "护理学",
          "gcParentId": 3285,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3286,
        "gcName": "科学与自然",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6590,
          "gcName": "安全科学",
          "gcParentId": 3286,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3287,
        "gcName": "计算机与互联网",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3814,
          "gcName": "办公软件",
          "gcParentId": 3287,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4764,
          "gcName": "单片机与嵌入式",
          "gcParentId": 3287,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3288,
        "gcName": "体育/运动",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3826,
          "gcName": "棋牌",
          "gcParentId": 3288,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 3289,
        "gcName": "中小学教辅",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 3839,
          "gcName": "中小学课外读物",
          "gcParentId": 3289,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6592,
          "gcName": "字帖",
          "gcParentId": 3289,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 4758,
        "gcName": "杂志/期刊",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 4800,
          "gcName": "家居",
          "gcParentId": 4758,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 4855,
        "gcName": "进口原版",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 4859,
          "gcName": "Children's Books（儿童图书）",
          "gcParentId": 4855,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6929,
        "gcName": "港台图书",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6933,
          "gcName": "攝影/影視",
          "gcParentId": 6929,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6938,
          "gcName": "美容瘦身",
          "gcParentId": 6929,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9278,
        "gcName": "烹饪/美食",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9280,
          "gcName": "烘焙甜品",
          "gcParentId": 9278,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9282,
          "gcName": "茶酒饮品",
          "gcParentId": 9278,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9291,
        "gcName": "时尚/美妆",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9293,
          "gcName": "彩妆/美发/美甲",
          "gcParentId": 9291,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9301,
        "gcName": "家居",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9302,
          "gcName": "家装家饰",
          "gcParentId": 9301,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9305,
          "gcName": "宠物",
          "gcParentId": 9301,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9309,
        "gcName": "婚恋与两性",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9311,
          "gcName": "婚姻",
          "gcParentId": 9309,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 11047,
        "gcName": "大中专教材教辅",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 11050,
          "gcName": "高职高专教材",
          "gcParentId": 11047,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 11745,
        "gcName": "文化用品",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 11747,
          "gcName": "笔类/书写工具",
          "gcParentId": 11745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12775,
        "gcName": "绘画",
        "gcParentId": 1713,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12780,
          "gcName": "彩铅/铅笔画",
          "gcParentId": 12775,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13648,
          "gcName": "简笔画",
          "gcParentId": 12775,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 4053,
      "gcName": "文娱",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": null },
    {
      "gcId": 5025,
      "gcName": "钟表",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 5026,
        "gcName": "腕表",
        "gcParentId": 5025,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12417,
          "gcName": "智能手表",
          "gcParentId": 5026,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13668,
          "gcName": "欧美表",
          "gcParentId": 5026,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13669,
          "gcName": "日韩表",
          "gcParentId": 5026,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13672,
          "gcName": "德表",
          "gcParentId": 5026,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13673,
          "gcName": "瑞表",
          "gcParentId": 5026,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13674,
          "gcName": "国表",
          "gcParentId": 5026,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15674,
        "gcName": "时钟",
        "gcParentId": 5025,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15675,
          "gcName": "座钟",
          "gcParentId": 15674,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15676,
          "gcName": "挂钟",
          "gcParentId": 15674,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15677,
          "gcName": "闹钟",
          "gcParentId": 15674,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15678,
        "gcName": "钟表配件",
        "gcParentId": 5025,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15679,
          "gcName": "钟表配件",
          "gcParentId": 15678,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15680,
        "gcName": "钟表服务",
        "gcParentId": 5025,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15681,
          "gcName": "钟表维修",
          "gcParentId": 15680,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 6144,
      "gcName": "珠宝首饰",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 6145,
        "gcName": "黄金",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6147,
          "gcName": "黄金吊坠",
          "gcParentId": 6145,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6148,
          "gcName": "黄金手镯",
          "gcParentId": 6145,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6149,
          "gcName": "黄金戒指",
          "gcParentId": 6145,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6150,
          "gcName": "黄金耳饰",
          "gcParentId": 6145,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13065,
          "gcName": "黄金转运珠",
          "gcParentId": 6145,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13101,
          "gcName": "黄金项链",
          "gcParentId": 6145,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13908,
          "gcName": "黄金手链/脚链",
          "gcParentId": 6145,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6146,
        "gcName": "金银投资",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6151,
          "gcName": "投资金",
          "gcParentId": 6146,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6152,
          "gcName": "投资银",
          "gcParentId": 6146,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13531,
          "gcName": "投资收藏",
          "gcParentId": 6146,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6155,
        "gcName": "银饰",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6156,
          "gcName": "银吊坠/项链",
          "gcParentId": 6155,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6157,
          "gcName": "银手链/脚链",
          "gcParentId": 6155,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6158,
          "gcName": "银戒指",
          "gcParentId": 6155,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6159,
          "gcName": "宝宝银饰",
          "gcParentId": 6155,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11238,
          "gcName": "银手镯",
          "gcParentId": 6155,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13070,
          "gcName": "银耳饰",
          "gcParentId": 6155,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6160,
        "gcName": "钻石",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6161,
          "gcName": "裸钻",
          "gcParentId": 6160,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6162,
          "gcName": "钻戒",
          "gcParentId": 6160,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6163,
          "gcName": "钻石项链/吊坠",
          "gcParentId": 6160,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6164,
          "gcName": "钻石耳饰",
          "gcParentId": 6160,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6165,
          "gcName": "钻石手镯/手链",
          "gcParentId": 6160,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6167,
        "gcName": "翡翠",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6168,
          "gcName": "翡翠吊坠",
          "gcParentId": 6167,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6169,
          "gcName": "翡翠手镯",
          "gcParentId": 6167,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6170,
          "gcName": "翡翠戒指",
          "gcParentId": 6167,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6173,
          "gcName": "翡翠耳饰",
          "gcParentId": 6167,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6175,
          "gcName": "挂件/摆件/把件",
          "gcParentId": 6167,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6172,
        "gcName": "水晶玛瑙",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6176,
          "gcName": "项链/吊坠",
          "gcParentId": 6172,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6178,
          "gcName": "耳饰",
          "gcParentId": 6172,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6180,
          "gcName": "手镯/手链/脚链",
          "gcParentId": 6172,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6185,
          "gcName": "头饰/胸针",
          "gcParentId": 6172,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6187,
          "gcName": "摆件/挂件",
          "gcParentId": 6172,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6174,
        "gcName": "彩宝",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13071,
          "gcName": "琥珀/蜜蜡",
          "gcParentId": 6174,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13072,
          "gcName": "碧玺",
          "gcParentId": 6174,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13073,
          "gcName": "红宝石/蓝宝石",
          "gcParentId": 6174,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13074,
          "gcName": "坦桑石",
          "gcParentId": 6174,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13076,
          "gcName": "祖母绿",
          "gcParentId": 6174,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13077,
          "gcName": "其他天然宝石",
          "gcParentId": 6174,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6182,
        "gcName": "时尚饰品",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6188,
          "gcName": "项链",
          "gcParentId": 6182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6189,
          "gcName": "手链/脚链",
          "gcParentId": 6182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6190,
          "gcName": "戒指",
          "gcParentId": 6182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6191,
          "gcName": "耳饰",
          "gcParentId": 6182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6193,
          "gcName": "胸针",
          "gcParentId": 6182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6194,
          "gcName": "婚庆饰品",
          "gcParentId": 6182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6195,
          "gcName": "饰品配件",
          "gcParentId": 6182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13069,
          "gcName": "毛衣链",
          "gcParentId": 6182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12040,
        "gcName": "铂金",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12043,
          "gcName": "铂金项链",
          "gcParentId": 12040,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12044,
          "gcName": "铂金手镯/手链/脚链",
          "gcParentId": 12040,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12045,
          "gcName": "铂金戒指",
          "gcParentId": 12040,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12046,
          "gcName": "铂金耳饰",
          "gcParentId": 12040,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13786,
          "gcName": "铂金吊坠",
          "gcParentId": 12040,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12041,
        "gcName": "木手串/把件",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12047,
          "gcName": "小叶紫檀",
          "gcParentId": 12041,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12048,
          "gcName": "黄花梨",
          "gcParentId": 12041,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12049,
          "gcName": "沉香木",
          "gcParentId": 12041,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12050,
          "gcName": "金丝楠",
          "gcParentId": 12041,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12051,
          "gcName": "菩提",
          "gcParentId": 12041,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12052,
          "gcName": "其他",
          "gcParentId": 12041,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13080,
          "gcName": "橄榄核/核桃",
          "gcParentId": 12041,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13081,
          "gcName": "檀香",
          "gcParentId": 12041,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12042,
        "gcName": "珍珠",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12053,
          "gcName": "珍珠项链",
          "gcParentId": 12042,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12054,
          "gcName": "珍珠吊坠",
          "gcParentId": 12042,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12055,
          "gcName": "珍珠耳饰",
          "gcParentId": 12042,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12056,
          "gcName": "珍珠手链",
          "gcParentId": 12042,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12057,
          "gcName": "珍珠戒指",
          "gcParentId": 12042,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12058,
          "gcName": "珍珠胸针",
          "gcParentId": 12042,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13062,
        "gcName": "K金饰品",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13063,
          "gcName": "K金吊坠",
          "gcParentId": 13062,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13064,
          "gcName": "K金项链",
          "gcParentId": 13062,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13066,
          "gcName": "K金手镯/手链/脚链",
          "gcParentId": 13062,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13067,
          "gcName": "K金戒指",
          "gcParentId": 13062,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13068,
          "gcName": "K金耳饰",
          "gcParentId": 13062,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13915,
        "gcName": "发饰",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13916,
          "gcName": "发箍",
          "gcParentId": 13915,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13917,
          "gcName": "发带",
          "gcParentId": 13915,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13918,
          "gcName": "发圈/发绳",
          "gcParentId": 13915,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13919,
          "gcName": "发簪",
          "gcParentId": 13915,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13920,
          "gcName": "发饰套装",
          "gcParentId": 13915,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13962,
          "gcName": "发夹",
          "gcParentId": 13915,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 19933,
        "gcName": "和田玉",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 19937,
          "gcName": "和田玉项链",
          "gcParentId": 19933,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19938,
          "gcName": "和田玉吊坠",
          "gcParentId": 19933,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19939,
          "gcName": "和田玉手镯",
          "gcParentId": 19933,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19940,
          "gcName": "和田玉手链",
          "gcParentId": 19933,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19941,
          "gcName": "和田玉戒指",
          "gcParentId": 19933,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19942,
          "gcName": "和田玉耳饰",
          "gcParentId": 19933,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 19934,
        "gcName": "其它玉石",
        "gcParentId": 6144,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 19947,
          "gcName": "石英岩",
          "gcParentId": 19934,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19948,
          "gcName": "更多玉石",
          "gcParentId": 19934,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 6196,
      "gcName": "厨具",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 6197,
        "gcName": "烹饪锅具",
        "gcParentId": 6196,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6199,
          "gcName": "炒锅",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6200,
          "gcName": "平底锅/煎锅",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6201,
          "gcName": "高压锅",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6202,
          "gcName": "蒸锅",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6203,
          "gcName": "汤锅",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6204,
          "gcName": "奶锅",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6205,
          "gcName": "锅具套装",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6206,
          "gcName": "砂锅",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6207,
          "gcName": "水壶",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11976,
          "gcName": "火锅",
          "gcParentId": 6197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6198,
        "gcName": "刀剪菜板",
        "gcParentId": 6196,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6209,
          "gcName": "菜刀",
          "gcParentId": 6198,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6210,
          "gcName": "剪刀",
          "gcParentId": 6198,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6211,
          "gcName": "刀具套装",
          "gcParentId": 6198,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6212,
          "gcName": "砧板",
          "gcParentId": 6198,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11980,
          "gcName": "瓜果刀/刨",
          "gcParentId": 6198,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11981,
          "gcName": "多功能刀",
          "gcParentId": 6198,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6214,
        "gcName": "厨房配件",
        "gcParentId": 6196,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6215,
          "gcName": "保鲜盒",
          "gcParentId": 6214,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6216,
          "gcName": "烘焙/烧烤",
          "gcParentId": 6214,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6217,
          "gcName": "调料器皿",
          "gcParentId": 6214,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6218,
          "gcName": "饭盒/提锅",
          "gcParentId": 6214,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11977,
          "gcName": "厨房置物架",
          "gcParentId": 6214,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11978,
          "gcName": "厨房DIY/小工具",
          "gcParentId": 6214,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14222,
          "gcName": "厨房秤",
          "gcParentId": 6214,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16821,
          "gcName": "厨房储物器皿",
          "gcParentId": 6214,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6219,
        "gcName": "水具酒具",
        "gcParentId": 6196,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6220,
          "gcName": "塑料杯",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6221,
          "gcName": "玻璃杯",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6222,
          "gcName": "陶瓷/马克杯",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6223,
          "gcName": "保温杯",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6224,
          "gcName": "保温壶",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6225,
          "gcName": "酒杯/酒具",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6850,
          "gcName": "运动水壶",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11979,
          "gcName": "杯具套装",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15122,
          "gcName": "焖烧杯",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15242,
          "gcName": "水具/酒具配件",
          "gcParentId": 6219,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6227,
        "gcName": "餐具",
        "gcParentId": 6196,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6228,
          "gcName": "餐具套装",
          "gcParentId": 6227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6230,
          "gcName": "碗",
          "gcParentId": 6227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6231,
          "gcName": "筷子",
          "gcParentId": 6227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6232,
          "gcName": "一次性用品",
          "gcParentId": 6227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11975,
          "gcName": "果盘/果篮",
          "gcParentId": 6227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16822,
          "gcName": "盘/碟",
          "gcParentId": 6227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16823,
          "gcName": "刀/叉/勺",
          "gcParentId": 6227,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9182,
        "gcName": "酒店用品",
        "gcParentId": 6196,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9183,
          "gcName": "自助餐炉",
          "gcParentId": 9182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9184,
          "gcName": "酒店餐具",
          "gcParentId": 9182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9185,
          "gcName": "酒店水具",
          "gcParentId": 9182,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 11143,
        "gcName": "茶具",
        "gcParentId": 6196,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 11148,
          "gcName": "整套茶具",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11149,
          "gcName": "茶杯",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11150,
          "gcName": "茶壶",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11151,
          "gcName": "茶盘茶托",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11152,
          "gcName": "茶叶罐",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11153,
          "gcName": "茶具配件",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11154,
          "gcName": "茶宠摆件",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11155,
          "gcName": "咖啡具",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11156,
          "gcName": "其他",
          "gcParentId": 11143,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16817,
        "gcName": "咖啡具",
        "gcParentId": 6196,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16818,
          "gcName": "咖啡杯",
          "gcParentId": 16817,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16819,
          "gcName": "咖啡壶",
          "gcParentId": 16817,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16820,
          "gcName": "咖啡具套装",
          "gcParentId": 16817,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17264,
          "gcName": "磨豆机",
          "gcParentId": 16817,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17265,
          "gcName": "打奶器",
          "gcParentId": 16817,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17266,
          "gcName": "咖啡滤纸",
          "gcParentId": 16817,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17267,
          "gcName": "咖啡具配件",
          "gcParentId": 16817,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 6233,
      "gcName": "玩具乐器",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 6234,
        "gcName": "适用年龄",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6239,
          "gcName": "0-6个月",
          "gcParentId": 6234,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6240,
          "gcName": "6-12个月",
          "gcParentId": 6234,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6241,
          "gcName": "1-3岁",
          "gcParentId": 6234,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6242,
          "gcName": "3-6岁",
          "gcParentId": 6234,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6235,
        "gcName": "遥控/电动",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6245,
          "gcName": "遥控车",
          "gcParentId": 6235,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6246,
          "gcName": "遥控飞机",
          "gcParentId": 6235,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6247,
          "gcName": "遥控船",
          "gcParentId": 6235,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6248,
          "gcName": "机器人",
          "gcParentId": 6235,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6249,
          "gcName": "轨道/助力",
          "gcParentId": 6235,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6236,
        "gcName": "毛绒布艺",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6254,
          "gcName": "毛绒/布艺",
          "gcParentId": 6236,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6255,
          "gcName": "靠垫/抱枕",
          "gcParentId": 6236,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6237,
        "gcName": "娃娃玩具",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6257,
          "gcName": "换装娃娃",
          "gcParentId": 6237,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6258,
          "gcName": "卡通娃娃",
          "gcParentId": 6237,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6259,
          "gcName": "智能娃娃",
          "gcParentId": 6237,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6253,
        "gcName": "模型玩具",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6261,
          "gcName": "仿真模型",
          "gcParentId": 6253,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6262,
          "gcName": "拼插模型",
          "gcParentId": 6253,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6263,
          "gcName": "收藏爱好",
          "gcParentId": 6253,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6260,
        "gcName": "健身玩具",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6265,
          "gcName": "炫舞毯",
          "gcParentId": 6260,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6266,
          "gcName": "爬行垫/毯",
          "gcParentId": 6260,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6268,
          "gcName": "户外玩具",
          "gcParentId": 6260,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6269,
          "gcName": "戏水玩具",
          "gcParentId": 6260,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6264,
        "gcName": "潮玩/动漫",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6272,
          "gcName": "电影周边",
          "gcParentId": 6264,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6273,
          "gcName": "卡通周边",
          "gcParentId": 6264,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6274,
          "gcName": "网游周边",
          "gcParentId": 6264,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6271,
        "gcName": "益智玩具",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6276,
          "gcName": "摇铃/床铃",
          "gcParentId": 6271,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6277,
          "gcName": "早教启智",
          "gcParentId": 6271,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6278,
          "gcName": "拖拉玩具",
          "gcParentId": 6271,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7063,
          "gcName": "健身架",
          "gcParentId": 6271,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14211,
          "gcName": "魔方",
          "gcParentId": 6271,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6275,
        "gcName": "积木拼插",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6280,
          "gcName": "积木",
          "gcParentId": 6275,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6282,
          "gcName": "拼图",
          "gcParentId": 6275,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6284,
          "gcName": "磁力片/棒",
          "gcParentId": 6275,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6286,
          "gcName": "立体拼插",
          "gcParentId": 6275,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6279,
        "gcName": "绘画/DIY",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6281,
          "gcName": "手工彩泥",
          "gcParentId": 6279,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6283,
          "gcName": "绘画工具",
          "gcParentId": 6279,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6287,
          "gcName": "情景玩具",
          "gcParentId": 6279,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6289,
        "gcName": "创意减压",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6292,
          "gcName": "减压玩具",
          "gcParentId": 6289,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6293,
          "gcName": "创意玩具",
          "gcParentId": 6289,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6291,
        "gcName": "其它乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6306,
          "gcName": "电脑音乐",
          "gcParentId": 6291,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6308,
          "gcName": "工艺礼品乐器",
          "gcParentId": 6291,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18607,
        "gcName": "乐器配件",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18617,
          "gcName": "谱架/谱台",
          "gcParentId": 18607,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18618,
          "gcName": "琴弦",
          "gcParentId": 18607,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18619,
          "gcName": "拾音器",
          "gcParentId": 18607,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18620,
          "gcName": "调音器/节拍器",
          "gcParentId": 18607,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18621,
          "gcName": "乐器箱包",
          "gcParentId": 18607,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18622,
          "gcName": "变调夹",
          "gcParentId": 18607,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18623,
          "gcName": "其它乐器配件",
          "gcParentId": 18607,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18608,
        "gcName": "民族吹奏乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18625,
          "gcName": "巴乌",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18626,
          "gcName": "笛子",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18627,
          "gcName": "葫芦丝",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18628,
          "gcName": "唢呐",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18629,
          "gcName": "埙",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18630,
          "gcName": "笙",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18631,
          "gcName": "陶笛",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18632,
          "gcName": "箫",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18633,
          "gcName": "其它民族吹奏乐器",
          "gcParentId": 18608,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18609,
        "gcName": "民族打击乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18634,
          "gcName": "镲",
          "gcParentId": 18609,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18635,
          "gcName": "堂鼓",
          "gcParentId": 18609,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18636,
          "gcName": "快板",
          "gcParentId": 18609,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18637,
          "gcName": "腰鼓/秧歌鼓",
          "gcParentId": 18609,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18638,
          "gcName": "锣",
          "gcParentId": 18609,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18610,
        "gcName": "民族弹拨乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18641,
          "gcName": "古琴",
          "gcParentId": 18610,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18642,
          "gcName": "古筝",
          "gcParentId": 18610,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18644,
          "gcName": "琵琶",
          "gcParentId": 18610,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18646,
          "gcName": "阮",
          "gcParentId": 18610,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18647,
          "gcName": "三弦",
          "gcParentId": 18610,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18648,
          "gcName": "扬琴",
          "gcParentId": 18610,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18649,
          "gcName": "月琴",
          "gcParentId": 18610,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18611,
        "gcName": "民族拉弦乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18651,
          "gcName": "板胡",
          "gcParentId": 18611,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18652,
          "gcName": "二胡",
          "gcParentId": 18611,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18654,
          "gcName": "京胡/京二胡",
          "gcParentId": 18611,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18612,
        "gcName": "西洋打击乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18658,
          "gcName": "电子鼓",
          "gcParentId": 18612,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18659,
          "gcName": "架子鼓/爵士鼓",
          "gcParentId": 18612,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18660,
          "gcName": "静音鼓",
          "gcParentId": 18612,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18661,
          "gcName": "军鼓",
          "gcParentId": 18612,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18662,
          "gcName": "非洲鼓",
          "gcParentId": 18612,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18663,
          "gcName": "卡洪鼓/箱鼓",
          "gcParentId": 18612,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18664,
          "gcName": "其它西洋打击乐器",
          "gcParentId": 18612,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18613,
        "gcName": "西洋管乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18665,
          "gcName": "口琴",
          "gcParentId": 18613,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18667,
          "gcName": "单簧管/双簧管",
          "gcParentId": 18613,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18669,
          "gcName": "萨克斯",
          "gcParentId": 18613,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18670,
          "gcName": "短笛",
          "gcParentId": 18613,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18671,
          "gcName": "长笛",
          "gcParentId": 18613,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18672,
          "gcName": "竖笛",
          "gcParentId": 18613,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18674,
          "gcName": "小号",
          "gcParentId": 18613,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18614,
        "gcName": "西洋弦乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18678,
          "gcName": "大提琴",
          "gcParentId": 18614,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18680,
          "gcName": "小提琴",
          "gcParentId": 18614,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18682,
          "gcName": "贝斯",
          "gcParentId": 18614,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18683,
          "gcName": "吉他",
          "gcParentId": 18614,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18684,
          "gcName": "尤克里里",
          "gcParentId": 18614,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18685,
          "gcName": "其它西洋弦乐器",
          "gcParentId": 18614,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18615,
        "gcName": "键盘乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18686,
          "gcName": "钢琴",
          "gcParentId": 18615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18687,
          "gcName": "电子琴",
          "gcParentId": 18615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18688,
          "gcName": "手卷钢琴",
          "gcParentId": 18615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18689,
          "gcName": "口风琴",
          "gcParentId": 18615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18690,
          "gcName": "电钢琴",
          "gcParentId": 18615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18691,
          "gcName": "手风琴",
          "gcParentId": 18615,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18616,
        "gcName": "教学乐器",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18624,
          "gcName": "启蒙乐器",
          "gcParentId": 18616,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 21291,
        "gcName": "STEAM教玩具",
        "gcParentId": 6233,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 21292,
          "gcName": "水动力玩具",
          "gcParentId": 21291,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21293,
          "gcName": "空气动力玩具",
          "gcParentId": 21291,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21294,
          "gcName": "太阳能玩具",
          "gcParentId": 21291,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21297,
          "gcName": "电路开关玩具",
          "gcParentId": 21291,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 6728,
      "gcName": "汽车用品",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 6740,
        "gcName": "车载电器",
        "gcParentId": 6728,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6749,
          "gcName": "电源",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6752,
          "gcName": "车载吸尘器",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6753,
          "gcName": "车载冰箱",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6807,
          "gcName": "车载净化器",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6964,
          "gcName": "行车记录仪",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6965,
          "gcName": "车载影音",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9959,
          "gcName": "安全预警仪",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9961,
          "gcName": "倒车雷达",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9962,
          "gcName": "车载蓝牙",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11867,
          "gcName": "导航仪",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12408,
          "gcName": "驾驶辅助",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12409,
          "gcName": "车载电台",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13247,
          "gcName": "车载电器配件",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13248,
          "gcName": "车机导航",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13249,
          "gcName": "汽车音响",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13250,
          "gcName": "车载生活电器",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13983,
          "gcName": "车载充电器",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13991,
          "gcName": "逆变器",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14902,
          "gcName": "后视镜导航",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16912,
          "gcName": "HUD抬头显示",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21073,
          "gcName": "汽车充电装备",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21074,
          "gcName": "360全景影像",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21075,
          "gcName": "执法记录仪",
          "gcParentId": 6740,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6742,
        "gcName": "维修保养",
        "gcParentId": 6728,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6756,
          "gcName": "防冻液",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6766,
          "gcName": "雨刷",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6767,
          "gcName": "火花塞",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6768,
          "gcName": "卤素灯",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6769,
          "gcName": "维修配件",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6795,
          "gcName": "其它汽修工具",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9248,
          "gcName": "轮胎",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9964,
          "gcName": "底盘装甲/护板",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9971,
          "gcName": "蓄电池",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9988,
          "gcName": "后视镜",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11849,
          "gcName": "汽机油",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11850,
          "gcName": "添加剂",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11852,
          "gcName": "机油滤清器",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11859,
          "gcName": "刹车片",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11951,
          "gcName": "轮毂",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12406,
          "gcName": "改装配件",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13243,
          "gcName": "减震器",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13244,
          "gcName": "正时皮带",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13245,
          "gcName": "汽车喇叭",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13295,
          "gcName": "柴机油",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13992,
          "gcName": "变速箱油/滤",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14879,
          "gcName": "刹车盘/鼓",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14880,
          "gcName": "刹车油",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14881,
          "gcName": "刹车蹄",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14882,
          "gcName": "刹车卡钳",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14885,
          "gcName": "LED车灯",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14886,
          "gcName": "大灯总成",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14887,
          "gcName": "氙气灯",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14888,
          "gcName": "空调滤清器",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14889,
          "gcName": "空气滤清器",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14890,
          "gcName": "燃油滤清器",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16874,
          "gcName": "摩托车机油",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16875,
          "gcName": "其它辅助油",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16876,
          "gcName": "三滤套装",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16877,
          "gcName": "点火线圈",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16879,
          "gcName": "氧传感器",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16880,
          "gcName": "起动机/发电机",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16887,
          "gcName": "千斤顶",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16888,
          "gcName": "工具箱/工具车",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16889,
          "gcName": "胶带/双面胶",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16891,
          "gcName": "汽车维修设备",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16892,
          "gcName": "检修灯",
          "gcParentId": 6742,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6743,
        "gcName": "美容清洗",
        "gcParentId": 6728,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6757,
          "gcName": "玻璃水",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9974,
          "gcName": "补漆笔",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11875,
          "gcName": "车蜡",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11878,
          "gcName": "清洁剂",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11879,
          "gcName": "其它洗车工具",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11880,
          "gcName": "洗车配件",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13251,
          "gcName": "镀晶",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13252,
          "gcName": "洗车机",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13253,
          "gcName": "洗车水枪/枪头",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13254,
          "gcName": "洗车毛巾",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13296,
          "gcName": "打蜡机",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13979,
          "gcName": "汽车贴膜",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13980,
          "gcName": "底盘装甲",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14897,
          "gcName": "隐形车衣",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14898,
          "gcName": "镀膜",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14899,
          "gcName": "防雾剂/驱水剂",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14900,
          "gcName": "喷漆",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14901,
          "gcName": "车用掸子",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16932,
          "gcName": "洗车水管/接头",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16934,
          "gcName": "洗车海绵",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16935,
          "gcName": "洗车刷",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16936,
          "gcName": "洗车手套",
          "gcParentId": 6743,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6745,
        "gcName": "汽车装饰",
        "gcParentId": 6728,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6785,
          "gcName": "香水",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6798,
          "gcName": "车衣",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6972,
          "gcName": "后备箱垫",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11881,
          "gcName": "座垫",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11882,
          "gcName": "座套",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11883,
          "gcName": "脚垫",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11886,
          "gcName": "车内除味剂",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11887,
          "gcName": "头枕腰靠",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11888,
          "gcName": "挂件",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11889,
          "gcName": "其它功能小件",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11953,
          "gcName": "车身装饰件",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13255,
          "gcName": "方向盘套",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13984,
          "gcName": "车载支架",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13985,
          "gcName": "汽车装饰灯",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13986,
          "gcName": "踏板",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13987,
          "gcName": "行李架/箱",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13988,
          "gcName": "摆件",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13993,
          "gcName": "后视镜/圆镜",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13994,
          "gcName": "雨眉",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13995,
          "gcName": "车贴",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14904,
          "gcName": "车身装饰条",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14906,
          "gcName": "隔音隔热棉",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14907,
          "gcName": "排挡/手刹套",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14908,
          "gcName": "汽车钥匙扣/包",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14909,
          "gcName": "汽车炭包",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14910,
          "gcName": "扶手箱",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14911,
          "gcName": "车用收纳袋/盒",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14912,
          "gcName": "车载纸巾盒",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14913,
          "gcName": "车载烟灰缸",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14914,
          "gcName": "临时停车牌",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14915,
          "gcName": "汽车防滑垫",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14917,
          "gcName": "汽车除雪铲",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14918,
          "gcName": "遮阳挡/雪挡",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14919,
          "gcName": "汽车窗帘",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16893,
          "gcName": "司机护目镜",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16894,
          "gcName": "车载挂钩",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16895,
          "gcName": "导航/中控膜",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16900,
          "gcName": "仪表台防晒垫",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16901,
          "gcName": "方向盘助力球",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16902,
          "gcName": "车牌架/牌照托",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16903,
          "gcName": "密封条",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16905,
          "gcName": "车用衣服架",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16906,
          "gcName": "车载桌板",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16907,
          "gcName": "电子香薰",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16908,
          "gcName": "挡泥板",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16909,
          "gcName": "防撞胶条",
          "gcParentId": 6745,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6747,
        "gcName": "安全自驾",
        "gcParentId": 6728,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6796,
          "gcName": "应急救援",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6801,
          "gcName": "储物箱",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6804,
          "gcName": "保温箱",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9985,
          "gcName": "其它摩托车装备",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11898,
          "gcName": "自驾野营",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11954,
          "gcName": "胎压监测",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11955,
          "gcName": "防盗设备",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12407,
          "gcName": "充气泵",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13269,
          "gcName": "地锁",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13270,
          "gcName": "摩托车",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14060,
          "gcName": "灭火器",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14061,
          "gcName": "车载床",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14903,
          "gcName": "胎压计",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14920,
          "gcName": "拖车绳",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14921,
          "gcName": "搭火线",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14924,
          "gcName": "方向盘锁",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14925,
          "gcName": "GPS定位器",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14926,
          "gcName": "防滑链",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14927,
          "gcName": "安全锤",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14928,
          "gcName": "摩托车头盔",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14929,
          "gcName": "其它摩托车配件",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16916,
          "gcName": "摩托车风镜",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16917,
          "gcName": "摩托车手套",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16918,
          "gcName": "摩托车骑行服",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16919,
          "gcName": "摩托车骑行裤",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16920,
          "gcName": "摩托车骑行鞋",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16921,
          "gcName": "骑士包",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16922,
          "gcName": "摩托车雨衣",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16923,
          "gcName": "摩托车蓝牙装备",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16927,
          "gcName": "摩托车锁",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16928,
          "gcName": "摩托车尾箱",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17037,
          "gcName": "摩托车护具",
          "gcParentId": 6747,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12402,
        "gcName": "汽车服务",
        "gcParentId": 6728,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12405,
          "gcName": "保养维修",
          "gcParentId": 12402,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14952,
          "gcName": "保养套餐",
          "gcParentId": 12402,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 6994,
      "gcName": "宠物生活",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 6995,
        "gcName": "宠物主粮",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 7002,
          "gcName": "狗干粮",
          "gcParentId": 6995,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7003,
          "gcName": "猫干粮",
          "gcParentId": 6995,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21071,
          "gcName": "猫主食罐",
          "gcParentId": 6995,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21072,
          "gcName": "狗主食罐",
          "gcParentId": 6995,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6996,
        "gcName": "宠物零食",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 7006,
          "gcName": "狗零食",
          "gcParentId": 6996,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7009,
          "gcName": "猫零食",
          "gcParentId": 6996,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6997,
        "gcName": "医疗保健",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 7011,
          "gcName": "健骨补钙",
          "gcParentId": 6997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7012,
          "gcName": "护肤美毛",
          "gcParentId": 6997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7013,
          "gcName": "肠胃调理",
          "gcParentId": 6997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7015,
          "gcName": "奶粉",
          "gcParentId": 6997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7016,
          "gcName": "宠物驱虫",
          "gcParentId": 6997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11983,
          "gcName": "口/耳/眼清洁",
          "gcParentId": 6997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11984,
          "gcName": "医疗护理",
          "gcParentId": 6997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17316,
          "gcName": "强化免疫",
          "gcParentId": 6997,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6998,
        "gcName": "猫狗日用",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 7017,
          "gcName": "猫狗窝",
          "gcParentId": 6998,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7018,
          "gcName": "食具水具",
          "gcParentId": 6998,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7019,
          "gcName": "狗厕所",
          "gcParentId": 6998,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7020,
          "gcName": "猫砂",
          "gcParentId": 6998,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7021,
          "gcName": "清洁除味",
          "gcParentId": 6998,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7022,
          "gcName": "笼子/围栏",
          "gcParentId": 6998,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17317,
          "gcName": "尿垫",
          "gcParentId": 6998,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17318,
          "gcName": "猫砂盆",
          "gcParentId": 6998,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6999,
        "gcName": "猫狗玩具",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 7024,
          "gcName": "猫玩具",
          "gcParentId": 6999,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7025,
          "gcName": "狗玩具",
          "gcParentId": 6999,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7027,
          "gcName": "猫爬架",
          "gcParentId": 6999,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17320,
          "gcName": "猫抓板",
          "gcParentId": 6999,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 7000,
        "gcName": "猫狗出行",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 7028,
          "gcName": "牵引绳/胸背带",
          "gcParentId": 7000,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7029,
          "gcName": "航空箱/便携包",
          "gcParentId": 7000,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7030,
          "gcName": "宠物鞋服",
          "gcParentId": 7000,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7031,
          "gcName": "外出用品",
          "gcParentId": 7000,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17319,
          "gcName": "宠物配饰",
          "gcParentId": 7000,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 7001,
        "gcName": "洗护美容",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 7035,
          "gcName": "浴液",
          "gcParentId": 7001,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7036,
          "gcName": "护毛素",
          "gcParentId": 7001,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7037,
          "gcName": "美容用具",
          "gcParentId": 7001,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 7039,
          "gcName": "美容电器",
          "gcParentId": 7001,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13963,
        "gcName": "异宠用品",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13964,
          "gcName": "鼠类用品",
          "gcParentId": 13963,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13965,
          "gcName": "爬宠用品",
          "gcParentId": 13963,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13966,
          "gcName": "鸟类用品",
          "gcParentId": 13963,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13967,
          "gcName": "兔子用品",
          "gcParentId": 13963,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13968,
        "gcName": "水族",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13969,
          "gcName": "鱼缸/水族箱",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13970,
          "gcName": "鱼粮/饲料",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13971,
          "gcName": "过滤器/水泵",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13972,
          "gcName": "增氧设备",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13973,
          "gcName": "温控器材",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13974,
          "gcName": "水族药剂",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13975,
          "gcName": "造景装饰",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13976,
          "gcName": "清洁检测",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13977,
          "gcName": "水草用品",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17322,
          "gcName": "照明设备",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17323,
          "gcName": "滤材/配件",
          "gcParentId": 13968,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14374,
        "gcName": "宠物活体",
        "gcParentId": 6994,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14377,
          "gcName": "异宠活体",
          "gcParentId": 14374,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14378,
          "gcName": "水族活体",
          "gcParentId": 14374,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 9192,
      "gcName": "医药保健",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 9193,
        "gcName": "营养健康",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9200,
          "gcName": "美容养颜",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9201,
          "gcName": "增强免疫",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9202,
          "gcName": "骨骼健康",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9203,
          "gcName": "调节三高",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9205,
          "gcName": "明目益智",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9207,
          "gcName": "肠胃养护",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9208,
          "gcName": "补肾强身",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9209,
          "gcName": "改善睡眠",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9211,
          "gcName": "运动营养",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12162,
          "gcName": "缓解疲劳",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12163,
          "gcName": "减肥塑身",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12164,
          "gcName": "抗氧化",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12165,
          "gcName": "耐缺氧",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12168,
          "gcName": "改善贫血",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12170,
          "gcName": "清咽利喉",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12649,
          "gcName": "婴儿营养",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16873,
          "gcName": "养肝护肝",
          "gcParentId": 9193,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9194,
        "gcName": "营养成分",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9214,
          "gcName": "左旋肉碱",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9215,
          "gcName": "蛋白质",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9216,
          "gcName": "维生素/矿物质",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9221,
          "gcName": "鱼油/磷脂",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9224,
          "gcName": "番茄红素",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9225,
          "gcName": "胶原蛋白",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9226,
          "gcName": "辅酶Q10",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9227,
          "gcName": "葡萄籽",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12171,
          "gcName": "叶酸",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12172,
          "gcName": "益生菌",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12173,
          "gcName": "玛咖",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12174,
          "gcName": "膳食纤维",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12176,
          "gcName": "芦荟提取",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12177,
          "gcName": "牛初乳",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12178,
          "gcName": "酵素",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12622,
          "gcName": "保健酒饮",
          "gcParentId": 9194,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9195,
        "gcName": "传统滋补",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9229,
          "gcName": "冬虫夏草",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9230,
          "gcName": "人参/西洋参",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12179,
          "gcName": "燕窝",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12180,
          "gcName": "阿胶",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12182,
          "gcName": "养生茶饮",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12183,
          "gcName": "鹿茸",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12184,
          "gcName": "灵芝/孢子粉",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12185,
          "gcName": "药食同源",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12186,
          "gcName": "保健蜂产品",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12612,
          "gcName": "枸杞",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12613,
          "gcName": "三七",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12614,
          "gcName": "雪蛤",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12615,
          "gcName": "青钱柳",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12616,
          "gcName": "石斛/枫斗",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12617,
          "gcName": "当归",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12618,
          "gcName": "藏红花",
          "gcParentId": 9195,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9196,
        "gcName": "计生情趣",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1504,
          "gcName": "润滑液",
          "gcParentId": 9196,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9197,
        "gcName": "保健器械",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1508,
          "gcName": "养生器械",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1509,
          "gcName": "中医保健",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2687,
          "gcName": "家庭护理",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12187,
          "gcName": "血糖仪",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12188,
          "gcName": "制氧机",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12189,
          "gcName": "血压计",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12587,
          "gcName": "心电/血氧仪",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12588,
          "gcName": "体温计",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12590,
          "gcName": "胎心仪",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12591,
          "gcName": "理疗仪",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12593,
          "gcName": "雾化器",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12594,
          "gcName": "助听器",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12595,
          "gcName": "轮椅",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12596,
          "gcName": "拐杖",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12597,
          "gcName": "智能健康",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13892,
          "gcName": "呼吸机",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14223,
          "gcName": "护理床",
          "gcParentId": 9197,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12190,
        "gcName": "护理护具",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1517,
          "gcName": "口罩",
          "gcParentId": 12190,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1518,
          "gcName": "眼部保健",
          "gcParentId": 12190,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12602,
          "gcName": "眼罩/耳塞",
          "gcParentId": 12190,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12603,
          "gcName": "创可贴",
          "gcParentId": 12190,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12604,
          "gcName": "暖贴",
          "gcParentId": 12190,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12605,
          "gcName": "鼻喉护理",
          "gcParentId": 12190,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12632,
        "gcName": "中西药品",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12635,
          "gcName": "补气养血",
          "gcParentId": 12632,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13893,
        "gcName": "隐形眼镜",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13895,
          "gcName": "透明隐形",
          "gcParentId": 13893,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13897,
          "gcName": "彩色隐形",
          "gcParentId": 13893,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13899,
          "gcName": "护理液",
          "gcParentId": 13893,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13900,
          "gcName": "眼镜配件",
          "gcParentId": 13893,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14203,
        "gcName": "健康服务",
        "gcParentId": 9192,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14204,
          "gcName": "体检套餐",
          "gcParentId": 14203,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14205,
          "gcName": "口腔齿科",
          "gcParentId": 14203,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14206,
          "gcName": "基因检测",
          "gcParentId": 14203,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14208,
          "gcName": "美容塑形",
          "gcParentId": 14203,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 9847,
      "gcName": "家具",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 9848,
        "gcName": "卧室家具",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9863,
          "gcName": "床",
          "gcParentId": 9848,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9864,
          "gcName": "床垫",
          "gcParentId": 9848,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9865,
          "gcName": "床头柜",
          "gcParentId": 9848,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9866,
          "gcName": "简易衣柜",
          "gcParentId": 9848,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9867,
          "gcName": "斗柜",
          "gcParentId": 9848,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9868,
          "gcName": "梳妆台/凳",
          "gcParentId": 9848,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9869,
          "gcName": "穿衣镜 ",
          "gcParentId": 9848,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11972,
          "gcName": "衣柜",
          "gcParentId": 9848,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9849,
        "gcName": "客厅家具",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9870,
          "gcName": "沙发",
          "gcParentId": 9849,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9871,
          "gcName": "沙发床",
          "gcParentId": 9849,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9872,
          "gcName": "边桌/茶几",
          "gcParentId": 9849,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9873,
          "gcName": "电视柜",
          "gcParentId": 9849,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9874,
          "gcName": "屏风",
          "gcParentId": 9849,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9876,
          "gcName": "鞋柜",
          "gcParentId": 9849,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11142,
          "gcName": "凳子",
          "gcParentId": 9849,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9850,
        "gcName": "餐厅家具",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9877,
          "gcName": "餐桌",
          "gcParentId": 9850,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9878,
          "gcName": "餐边柜",
          "gcParentId": 9850,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9879,
          "gcName": "酒柜",
          "gcParentId": 9850,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9880,
          "gcName": "椅子",
          "gcParentId": 9850,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9851,
        "gcName": "书房家具",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9881,
          "gcName": "书架",
          "gcParentId": 9851,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9882,
          "gcName": "电脑椅",
          "gcParentId": 9851,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9883,
          "gcName": "书桌",
          "gcParentId": 9851,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11973,
          "gcName": "电脑桌",
          "gcParentId": 9851,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17077,
          "gcName": "书柜",
          "gcParentId": 9851,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17971,
          "gcName": "电竞椅",
          "gcParentId": 9851,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9852,
        "gcName": "储物家具",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9885,
          "gcName": "鞋架",
          "gcParentId": 9852,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9886,
          "gcName": "储物/收纳用品",
          "gcParentId": 9852,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9887,
          "gcName": "墙面搁架",
          "gcParentId": 9852,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9888,
          "gcName": "层架/置物架",
          "gcParentId": 9852,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17078,
          "gcName": "衣帽架",
          "gcParentId": 9852,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9853,
        "gcName": "阳台/户外",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9889,
          "gcName": "晾衣架",
          "gcParentId": 9853,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9890,
          "gcName": "花架/装饰架",
          "gcParentId": 9853,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9891,
          "gcName": "家用梯",
          "gcParentId": 9853,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9892,
          "gcName": "户外家具",
          "gcParentId": 9853,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11974,
          "gcName": "折叠床",
          "gcParentId": 9853,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17079,
          "gcName": "智能晾衣机",
          "gcParentId": 9853,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9854,
        "gcName": "商业办公",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9893,
          "gcName": "屏风工位",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9894,
          "gcName": "班台/班桌",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9895,
          "gcName": "桑拿/足浴/健身家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9896,
          "gcName": "会议台/桌",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12529,
          "gcName": "办公沙发",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12530,
          "gcName": "文件柜/办公柜",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12531,
          "gcName": "办公前台/收银台",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12532,
          "gcName": "货架/展示架",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12533,
          "gcName": "麻将机",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17211,
          "gcName": "办公椅",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17212,
          "gcName": "超市家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17213,
          "gcName": "服装店家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17214,
          "gcName": "娱乐/酒吧/KTV家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17215,
          "gcName": "发廊/美容家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17216,
          "gcName": "校园教学家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17217,
          "gcName": "医疗家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17486,
          "gcName": "阅览桌",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17487,
          "gcName": "吸烟亭",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17491,
          "gcName": "密集架",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17493,
          "gcName": "无障碍设施",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17495,
          "gcName": "餐饮沙发/卡座",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17498,
          "gcName": "酒店桌椅",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17499,
          "gcName": "酒店套房家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17500,
          "gcName": "酒店行李柜",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17501,
          "gcName": "酒店后厨家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17502,
          "gcName": "酒店大堂家具",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18581,
          "gcName": "办公桌",
          "gcParentId": 9854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13533,
        "gcName": "儿童家具",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13534,
          "gcName": "儿童床",
          "gcParentId": 13533,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13535,
          "gcName": "儿童床垫",
          "gcParentId": 13533,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13536,
          "gcName": "儿童衣柜",
          "gcParentId": 13533,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13537,
          "gcName": "儿童书桌",
          "gcParentId": 13533,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13538,
          "gcName": "儿童椅凳",
          "gcParentId": 13533,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13540,
          "gcName": "儿童桌椅套装",
          "gcParentId": 13533,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13541,
          "gcName": "儿童沙发",
          "gcParentId": 13533,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15106,
        "gcName": "套房家具",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15107,
          "gcName": "卧室套房",
          "gcParentId": 15106,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15108,
          "gcName": "客厅套房",
          "gcParentId": 15106,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 21035,
        "gcName": "红木家具",
        "gcParentId": 9847,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 21049,
          "gcName": "红木餐边柜",
          "gcParentId": 21035,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 9855,
      "gcName": "家装建材",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 9856,
        "gcName": "灯饰照明",
        "gcParentId": 9855,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9898,
          "gcName": "台灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9899,
          "gcName": "荧光灯源",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9900,
          "gcName": "壁灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9901,
          "gcName": "落地灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9902,
          "gcName": "手电筒/应急灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9903,
          "gcName": "LED灯源",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9904,
          "gcName": "吸顶灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9905,
          "gcName": "氛围照明",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9906,
          "gcName": "吊灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11949,
          "gcName": "筒灯/射灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11950,
          "gcName": "室外/庭院灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13820,
          "gcName": "杀菌灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17146,
          "gcName": "卤钨灯源",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17147,
          "gcName": "其它光源",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17148,
          "gcName": "镜前灯",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17149,
          "gcName": "灯具配件",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17150,
          "gcName": "其它照明",
          "gcParentId": 9856,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9857,
        "gcName": "厨房卫浴",
        "gcParentId": 9855,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9907,
          "gcName": "淋浴花洒",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9908,
          "gcName": "厨卫挂件",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9909,
          "gcName": "龙头",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9910,
          "gcName": "马桶",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9911,
          "gcName": "浴室柜",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9912,
          "gcName": "浴缸",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9913,
          "gcName": "水槽",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9914,
          "gcName": "净水软水",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9915,
          "gcName": "橱柜",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9916,
          "gcName": "陶瓷件组套",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9917,
          "gcName": "沐浴桶",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9918,
          "gcName": "厨卫配件",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11957,
          "gcName": "淋浴房",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13754,
          "gcName": "智能马桶盖",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13886,
          "gcName": "垃圾处理器",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13890,
          "gcName": "干手器",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17080,
          "gcName": "智能坐便器",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17489,
          "gcName": "浴霸",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17490,
          "gcName": "排气扇/换气设备",
          "gcParentId": 9857,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9858,
        "gcName": "五金工具",
        "gcParentId": 9855,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9919,
          "gcName": "机械锁",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9920,
          "gcName": "家用五金",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9921,
          "gcName": "手动工具",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9922,
          "gcName": "电动工具",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9923,
          "gcName": "测量工具",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9924,
          "gcName": "劳防用品",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9925,
          "gcName": "工具组套",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13753,
          "gcName": "仪器仪表",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13821,
          "gcName": "工具配件",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13822,
          "gcName": "气动工具",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13823,
          "gcName": "机电五金",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14404,
          "gcName": "电子锁",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17081,
          "gcName": "搬运/起重设备",
          "gcParentId": 9858,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9859,
        "gcName": "电工电料",
        "gcParentId": 9855,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9926,
          "gcName": "开关插座",
          "gcParentId": 9859,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9927,
          "gcName": "智能家居",
          "gcParentId": 9859,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9928,
          "gcName": "配电箱/断路器",
          "gcParentId": 9859,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9929,
          "gcName": "电线/电缆",
          "gcParentId": 9859,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9930,
          "gcName": "电料配件",
          "gcParentId": 9859,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13751,
          "gcName": "门铃",
          "gcParentId": 9859,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18594,
          "gcName": "电气控制",
          "gcParentId": 9859,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9860,
        "gcName": "墙地面材料",
        "gcParentId": 9855,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9932,
          "gcName": "壁纸",
          "gcParentId": 9860,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9933,
          "gcName": "瓷砖",
          "gcParentId": 9860,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9934,
          "gcName": "地板",
          "gcParentId": 9860,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 9861,
        "gcName": "装饰材料",
        "gcParentId": 9855,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9937,
          "gcName": "吊顶",
          "gcParentId": 9861,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9938,
          "gcName": "散热器",
          "gcParentId": 9861,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9939,
          "gcName": "门",
          "gcParentId": 9861,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9940,
          "gcName": "窗",
          "gcParentId": 9861,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9941,
          "gcName": "移门壁柜",
          "gcParentId": 9861,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11961,
          "gcName": "壁炉/壁挂炉/地暖",
          "gcParentId": 9861,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17084,
        "gcName": "基建材料",
        "gcParentId": 9855,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17086,
          "gcName": "木材/板材",
          "gcParentId": 17084,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17087,
          "gcName": "涂刷化工类辅料",
          "gcParentId": 17084,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17088,
          "gcName": "油漆/涂料",
          "gcParentId": 17084,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17089,
          "gcName": "管材管件",
          "gcParentId": 17084,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17090,
          "gcName": "型材",
          "gcParentId": 17084,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18593,
          "gcName": "化工产品",
          "gcParentId": 17084,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 9987,
      "gcName": "手机通讯",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 653,
        "gcName": "手机",
        "gcParentId": 9987,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 655,
          "gcName": "手机",
          "gcParentId": 653,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 830,
        "gcName": "手机配件",
        "gcParentId": 9987,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 862,
          "gcName": "手机耳机",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 863,
          "gcName": "蓝牙耳机",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 866,
          "gcName": "手机壳/保护套",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 867,
          "gcName": "手机贴膜",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 868,
          "gcName": "创意配件",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 1099,
          "gcName": "手机存储卡",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11301,
          "gcName": "便携/无线音响",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 11302,
          "gcName": "手机饰品",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12809,
          "gcName": "拍照配件",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12811,
          "gcName": "手机支架",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13657,
          "gcName": "手机电池",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13658,
          "gcName": "移动电源",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13659,
          "gcName": "苹果周边",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13660,
          "gcName": "充电器",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13661,
          "gcName": "数据线",
          "gcParentId": 830,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 6880,
        "gcName": "运营商",
        "gcParentId": 9987,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1195,
          "gcName": "办号卡",
          "gcParentId": 6880,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6881,
          "gcName": "合约机",
          "gcParentId": 6880,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12360,
          "gcName": "选号中心",
          "gcParentId": 6880,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12416,
          "gcName": "办套餐",
          "gcParentId": 6880,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12854,
        "gcName": "手机服务",
        "gcParentId": 9987,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12856,
          "gcName": "屏幕换新",
          "gcParentId": 12854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16940,
          "gcName": "电池换新",
          "gcParentId": 12854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16941,
          "gcName": "手机故障",
          "gcParentId": 12854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16942,
          "gcName": "保障服务",
          "gcParentId": 12854,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 18523,
        "gcName": "对讲机",
        "gcParentId": 9987,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 18524,
          "gcName": "模拟对讲机",
          "gcParentId": 18523,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18525,
          "gcName": "数字对讲机",
          "gcParentId": 18523,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18526,
          "gcName": "公网对讲机",
          "gcParentId": 18523,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 18527,
          "gcName": "对讲机配件",
          "gcParentId": 18523,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 11729,
      "gcName": "鞋靴",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 11730,
        "gcName": "流行男鞋",
        "gcParentId": 11729,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6906,
          "gcName": "正装鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6907,
          "gcName": "商务休闲鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6908,
          "gcName": "休闲鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6909,
          "gcName": "凉鞋/沙滩鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6910,
          "gcName": "传统布鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6911,
          "gcName": "拖鞋/人字拖",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6912,
          "gcName": "男靴",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6913,
          "gcName": "鞋配件",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9781,
          "gcName": "功能鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9782,
          "gcName": "雨鞋/雨靴",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9783,
          "gcName": "帆布鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12066,
          "gcName": "增高鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12067,
          "gcName": "工装鞋",
          "gcParentId": 11730,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 11731,
        "gcName": "时尚女鞋",
        "gcParentId": 11729,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 6914,
          "gcName": "单鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6915,
          "gcName": "鱼嘴鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6916,
          "gcName": "休闲鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6917,
          "gcName": "凉鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6918,
          "gcName": "布鞋/绣花鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 6920,
          "gcName": "雪地靴",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9769,
          "gcName": "踝靴",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9772,
          "gcName": "高跟鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9774,
          "gcName": "帆布鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9775,
          "gcName": "拖鞋/人字拖",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9776,
          "gcName": "女靴",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9777,
          "gcName": "雨鞋/雨靴",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9778,
          "gcName": "妈妈鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9779,
          "gcName": "鞋配件",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 9780,
          "gcName": "特色鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12060,
          "gcName": "马丁靴",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12061,
          "gcName": "坡跟鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12062,
          "gcName": "松糕鞋",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12063,
          "gcName": "内增高",
          "gcParentId": 11731,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 12218,
      "gcName": "生鲜",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 12221,
        "gcName": "水果",
        "gcParentId": 12218,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13554,
          "gcName": "苹果",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13555,
          "gcName": "橙子",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13556,
          "gcName": "奇异果/猕猴桃",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13557,
          "gcName": "车厘子/樱桃",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13560,
          "gcName": "火龙果",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13562,
          "gcName": "柚子",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13563,
          "gcName": "香蕉",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13564,
          "gcName": "牛油果",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13566,
          "gcName": "菠萝/凤梨",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13567,
          "gcName": "桔/橘",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13568,
          "gcName": "柠檬",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13570,
          "gcName": "桃/李/杏",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13571,
          "gcName": "更多水果",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14053,
          "gcName": "瓜",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15565,
          "gcName": "榴莲",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15566,
          "gcName": "百香果",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15568,
          "gcName": "椰青",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17303,
          "gcName": "石榴",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17305,
          "gcName": "枣",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17306,
          "gcName": "山竹",
          "gcParentId": 12221,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12222,
        "gcName": "海鲜水产",
        "gcParentId": 12218,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12240,
          "gcName": "海参",
          "gcParentId": 12222,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12241,
          "gcName": "鱼类",
          "gcParentId": 12222,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12242,
          "gcName": "虾类",
          "gcParentId": 12222,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12243,
          "gcName": "蟹类",
          "gcParentId": 12222,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12244,
          "gcName": "贝类",
          "gcParentId": 12222,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13580,
          "gcName": "海产礼盒",
          "gcParentId": 12222,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15618,
          "gcName": "软足类",
          "gcParentId": 12222,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13553,
        "gcName": "蔬菜",
        "gcParentId": 12218,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13575,
          "gcName": "根茎类",
          "gcParentId": 13553,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13578,
          "gcName": "半加工蔬菜",
          "gcParentId": 13553,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13581,
        "gcName": "猪牛羊肉",
        "gcParentId": 12218,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12247,
          "gcName": "猪肉",
          "gcParentId": 13581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13582,
          "gcName": "牛肉",
          "gcParentId": 13581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13583,
          "gcName": "羊肉",
          "gcParentId": 13581,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13586,
        "gcName": "禽肉蛋品",
        "gcParentId": 12218,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12250,
          "gcName": "蛋类",
          "gcParentId": 13586,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13587,
          "gcName": "鸡肉",
          "gcParentId": 13586,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13591,
        "gcName": "冷藏/冷冻食品",
        "gcParentId": 12218,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13594,
          "gcName": "面点",
          "gcParentId": 13591,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13595,
          "gcName": "火锅丸料",
          "gcParentId": 13591,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13596,
          "gcName": "方便菜",
          "gcParentId": 13591,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15123,
          "gcName": "西式烘焙",
          "gcParentId": 13591,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15246,
          "gcName": "肉制品",
          "gcParentId": 13591,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 13598,
        "gcName": "乳品冷饮",
        "gcParentId": 12218,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13601,
          "gcName": "冷藏饮料",
          "gcParentId": 13598,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13603,
          "gcName": "冰淇淋",
          "gcParentId": 13598,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13604,
          "gcName": "低温奶",
          "gcParentId": 13598,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15247,
          "gcName": "奶酪黄油",
          "gcParentId": 13598,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 12259,
      "gcName": "酒类",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 12260,
        "gcName": "白酒",
        "gcParentId": 12259,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 9435,
          "gcName": "白酒",
          "gcParentId": 12260,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14714,
        "gcName": "葡萄酒",
        "gcParentId": 12259,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15601,
          "gcName": "葡萄酒",
          "gcParentId": 14714,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14715,
        "gcName": "洋酒",
        "gcParentId": 12259,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14738,
          "gcName": "白兰地/干邑",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14739,
          "gcName": "威士忌",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14742,
          "gcName": "伏特加",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14743,
          "gcName": "力娇酒",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14744,
          "gcName": "朗姆酒",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14745,
          "gcName": "龙舌兰",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14746,
          "gcName": "金酒",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15604,
          "gcName": "清酒/烧酒",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15605,
          "gcName": "鸡尾酒/预调酒",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15606,
          "gcName": "其它洋酒",
          "gcParentId": 14715,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14716,
        "gcName": "啤酒",
        "gcParentId": 12259,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15602,
          "gcName": "啤酒",
          "gcParentId": 14716,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14717,
        "gcName": "黄酒/养生酒",
        "gcParentId": 12259,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14756,
          "gcName": "黄酒",
          "gcParentId": 14717,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14757,
          "gcName": "养生酒",
          "gcParentId": 14717,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14718,
        "gcName": "收藏酒/陈年老酒",
        "gcParentId": 12259,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15603,
          "gcName": "收藏酒/陈年老酒",
          "gcParentId": 14718,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 12473,
      "gcName": "农资园艺",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 12479,
        "gcName": "园林/农耕",
        "gcParentId": 12473,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14213,
          "gcName": "喷雾器",
          "gcParentId": 12479,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 12565,
        "gcName": "农药",
        "gcParentId": 12473,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12568,
          "gcName": "杀菌剂",
          "gcParentId": 12565,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12569,
          "gcName": "杀虫剂",
          "gcParentId": 12565,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17418,
        "gcName": "园艺用品",
        "gcParentId": 12473,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 17419,
          "gcName": "花盆花器",
          "gcParentId": 17418,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17420,
          "gcName": "园艺工具",
          "gcParentId": 17418,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17423,
          "gcName": "基质/营养土",
          "gcParentId": 17418,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 13314,
      "gcName": "处方药",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 13315,
        "gcName": "妇科专科用药",
        "gcParentId": 13314,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 13316,
          "gcName": "保胎助孕",
          "gcParentId": 13315,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 14065,
      "gcName": "工业品",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 14066,
        "gcName": "安防用品",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14067,
          "gcName": "化学品处理/存储",
          "gcParentId": 14066,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14068,
          "gcName": "消防器材",
          "gcParentId": 14066,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14069,
          "gcName": "安全器具",
          "gcParentId": 14066,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14954,
          "gcName": "应急处理",
          "gcParentId": 14066,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14955,
          "gcName": "监控设备",
          "gcParentId": 14066,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15661,
          "gcName": "安全警示标识",
          "gcParentId": 14066,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14070,
        "gcName": "标签包装",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14071,
          "gcName": "包装工具",
          "gcParentId": 14070,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14072,
          "gcName": "包装耗材",
          "gcParentId": 14070,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15660,
          "gcName": "标签打印耗材",
          "gcParentId": 14070,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14076,
        "gcName": "搬运存储",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14077,
          "gcName": "搬运设备",
          "gcParentId": 14076,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14078,
          "gcName": "存储设备",
          "gcParentId": 14076,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14079,
        "gcName": "中低压配电",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14081,
          "gcName": "断路器",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14962,
          "gcName": "连接器",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14963,
          "gcName": "保护器",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14964,
          "gcName": "变压器",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14965,
          "gcName": "电容器",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14966,
          "gcName": "电抗器",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14967,
          "gcName": "控制器",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14968,
          "gcName": "互感器",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14969,
          "gcName": "电力仪表",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14972,
          "gcName": "供电保护系统装置",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14973,
          "gcName": "防爆电气",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14976,
          "gcName": "控制柜箱",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14977,
          "gcName": "电缆桥架",
          "gcParentId": 14079,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14086,
        "gcName": "化学品",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14087,
          "gcName": "胶粘剂",
          "gcParentId": 14086,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14088,
          "gcName": "润滑剂",
          "gcParentId": 14086,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14089,
          "gcName": "防锈剂",
          "gcParentId": 14086,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14095,
          "gcName": "油漆涂料",
          "gcParentId": 14086,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14096,
          "gcName": "化学试剂",
          "gcParentId": 14086,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14097,
          "gcName": "金属加工液",
          "gcParentId": 14086,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14098,
          "gcName": "清洗剂",
          "gcParentId": 14086,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14980,
          "gcName": "工业检测试剂",
          "gcParentId": 14086,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14090,
        "gcName": "焊接用品",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14091,
          "gcName": "焊接设备",
          "gcParentId": 14090,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14092,
          "gcName": "焊接耗材",
          "gcParentId": 14090,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14099,
        "gcName": "个人防护",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14100,
          "gcName": "头部防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14101,
          "gcName": "眼脸部防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14102,
          "gcName": "听力防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14103,
          "gcName": "呼吸防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14104,
          "gcName": "手部防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14105,
          "gcName": "身体防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14106,
          "gcName": "足部防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14107,
          "gcName": "坠落防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15656,
          "gcName": "个人卫生",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15657,
          "gcName": "静电无尘",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15658,
          "gcName": "焊接防护",
          "gcParentId": 14099,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14108,
        "gcName": "金属加工",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14109,
          "gcName": "刃具",
          "gcParentId": 14108,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14111,
          "gcName": "磨具磨料",
          "gcParentId": 14108,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14112,
          "gcName": "机床",
          "gcParentId": 14108,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14981,
          "gcName": "钻/铣床",
          "gcParentId": 14108,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14982,
          "gcName": "小型机械",
          "gcParentId": 14108,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14984,
          "gcName": "金属加工配件",
          "gcParentId": 14108,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14113,
        "gcName": "清洁用品",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14114,
          "gcName": "清洁设备",
          "gcParentId": 14113,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14115,
          "gcName": "工业擦拭",
          "gcParentId": 14113,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14116,
          "gcName": "清洁化学品",
          "gcParentId": 14113,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14117,
          "gcName": "清洁工具",
          "gcParentId": 14113,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14987,
          "gcName": "洗手间用品",
          "gcParentId": 14113,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14988,
          "gcName": "地垫及矿棉板",
          "gcParentId": 14113,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14989,
          "gcName": "吸附用品",
          "gcParentId": 14113,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14990,
          "gcName": "垃圾处理设施",
          "gcParentId": 14113,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14126,
        "gcName": "公共设施",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14127,
          "gcName": "照明",
          "gcParentId": 14126,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14128,
          "gcName": "流体相关",
          "gcParentId": 14126,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14129,
          "gcName": "暖通",
          "gcParentId": 14126,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14130,
        "gcName": "紧固密封件",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14131,
          "gcName": "密封件",
          "gcParentId": 14130,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14132,
          "gcName": "紧固件",
          "gcParentId": 14130,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14133,
          "gcName": "小五金及其他",
          "gcParentId": 14130,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14134,
        "gcName": "气动液压",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14135,
          "gcName": "气动元件",
          "gcParentId": 14134,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14136,
          "gcName": "液压元件",
          "gcParentId": 14134,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14137,
        "gcName": "实验室用品",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14138,
          "gcName": "实验室试剂",
          "gcParentId": 14137,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14139,
          "gcName": "实验室耗材",
          "gcParentId": 14137,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14140,
          "gcName": "实验室设备",
          "gcParentId": 14137,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14141,
        "gcName": "动力传动",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 14142,
          "gcName": "轴承及其工具",
          "gcParentId": 14141,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14143,
          "gcName": "皮带",
          "gcParentId": 14141,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 14145,
          "gcName": "滑轨及其附件",
          "gcParentId": 14141,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17155,
          "gcName": "自动化零部件",
          "gcParentId": 14141,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 14993,
        "gcName": "起重设备",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15003,
          "gcName": "千斤顶",
          "gcParentId": 14993,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15004,
          "gcName": "起重葫芦",
          "gcParentId": 14993,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15005,
          "gcName": "搬运车",
          "gcParentId": 14993,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15006,
          "gcName": "脚手架",
          "gcParentId": 14993,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15007,
          "gcName": "起重滑车",
          "gcParentId": 14993,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15008,
          "gcName": "起重吊钳",
          "gcParentId": 14993,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15010,
          "gcName": "钢丝绳",
          "gcParentId": 14993,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15011,
          "gcName": "其它起重工具",
          "gcParentId": 14993,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15303,
        "gcName": "无源元件",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15304,
          "gcName": "电阻器",
          "gcParentId": 15303,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15306,
          "gcName": "热敏电阻",
          "gcParentId": 15303,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15307,
          "gcName": "电位器",
          "gcParentId": 15303,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15308,
          "gcName": "电子电容",
          "gcParentId": 15303,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15309,
          "gcName": "电感器",
          "gcParentId": 15303,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15310,
          "gcName": "滤波器",
          "gcParentId": 15303,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15311,
          "gcName": "铁氧体",
          "gcParentId": 15303,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15314,
          "gcName": "电子天线",
          "gcParentId": 15303,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15361,
        "gcName": "电子连接器",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15362,
          "gcName": "D-Sub连接器",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15363,
          "gcName": "IC与器件插座",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15364,
          "gcName": "板对板连接器",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15365,
          "gcName": "电源连接器",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15367,
          "gcName": "音视频连接器",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15375,
          "gcName": "圆形连接器",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15377,
          "gcName": "模块连接器",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15381,
          "gcName": "光纤连接器",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15382,
          "gcName": "背板连接器",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15383,
          "gcName": "射频互连",
          "gcParentId": 15361,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15386,
        "gcName": "模块电源",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15390,
          "gcName": "AC/DC转换器",
          "gcParentId": 15386,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15391,
          "gcName": "AC输入模块",
          "gcParentId": 15386,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15392,
          "gcName": "电子电池",
          "gcParentId": 15386,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15393,
          "gcName": "超级电容器",
          "gcParentId": 15386,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15394,
        "gcName": "传感器",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15396,
          "gcName": "电流传感器",
          "gcParentId": 15394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15399,
          "gcName": "光学传感器",
          "gcParentId": 15394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15401,
          "gcName": "压力传感器",
          "gcParentId": 15394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15404,
          "gcName": "环境传感器",
          "gcParentId": 15394,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15405,
        "gcName": "无线模块与适配器",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15406,
          "gcName": "射频模块",
          "gcParentId": 15405,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15407,
          "gcName": "识别模块",
          "gcParentId": 15405,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15409,
          "gcName": "通信与网络模块",
          "gcParentId": 15405,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15411,
        "gcName": "机电器件",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15412,
          "gcName": "屏幕",
          "gcParentId": 15411,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15413,
          "gcName": "摄像头",
          "gcParentId": 15411,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15414,
          "gcName": "声学器件",
          "gcParentId": 15411,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15415,
          "gcName": "开发板",
          "gcParentId": 15411,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15419,
          "gcName": "外壳组件",
          "gcParentId": 15411,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17039,
          "gcName": "电子开关",
          "gcParentId": 15411,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15673,
        "gcName": "工控自动化",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15816,
          "gcName": "按钮/指示灯",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15817,
          "gcName": "接触器",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15818,
          "gcName": "继电器",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15819,
          "gcName": "启动器",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15820,
          "gcName": "变频器",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15821,
          "gcName": "发电设备/电机",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15822,
          "gcName": "工控传感器",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15823,
          "gcName": "工控编码器",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15826,
          "gcName": "工业通讯",
          "gcParentId": 15673,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15827,
        "gcName": "电料辅件",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15828,
          "gcName": "电力金具",
          "gcParentId": 15827,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15829,
          "gcName": "安全工器具",
          "gcParentId": 15827,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15830,
          "gcName": "其他电料辅件",
          "gcParentId": 15827,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15831,
        "gcName": "电线电缆",
        "gcParentId": 14065,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15832,
          "gcName": "电气装备电缆",
          "gcParentId": 15831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15833,
          "gcName": "电力电缆",
          "gcParentId": 15831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15834,
          "gcName": "通信/光缆",
          "gcParentId": 15831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15835,
          "gcName": "裸线类",
          "gcParentId": 15831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15836,
          "gcName": "绕组线类",
          "gcParentId": 15831,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 15248,
      "gcName": "家纺",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 15249,
        "gcName": "床上用品",
        "gcParentId": 15248,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15251,
          "gcName": "三件套",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15252,
          "gcName": "四件套",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15253,
          "gcName": "多件套",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15254,
          "gcName": "羽绒/羽毛被",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15255,
          "gcName": "蚕丝被",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15256,
          "gcName": "羊毛/驼毛被",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15257,
          "gcName": "纤维被",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15258,
          "gcName": "棉花被",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15259,
          "gcName": "乳胶枕",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15260,
          "gcName": "记忆枕",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15261,
          "gcName": "花草枕",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15262,
          "gcName": "纤维枕",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15263,
          "gcName": "羽绒枕",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15264,
          "gcName": "蚕丝枕",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15265,
          "gcName": "蚊帐",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15266,
          "gcName": "牛皮席",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15267,
          "gcName": "草席/藤席",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15268,
          "gcName": "竹席",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15269,
          "gcName": "冰丝席",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15270,
          "gcName": "粗布凉席",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15271,
          "gcName": "其它凉席",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15272,
          "gcName": "床单/床笠",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15273,
          "gcName": "毛毯",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15274,
          "gcName": "床垫/床褥",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15275,
          "gcName": "被套",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15276,
          "gcName": "枕巾枕套",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15277,
          "gcName": "电热毯",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17393,
          "gcName": "水暖毯",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19865,
          "gcName": "床帘",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 19866,
          "gcName": "乳胶被",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21104,
          "gcName": "颈椎枕",
          "gcParentId": 15249,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15250,
        "gcName": "居家布艺",
        "gcParentId": 15248,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15278,
          "gcName": "毛巾",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15279,
          "gcName": "浴巾",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15280,
          "gcName": "毛巾礼盒套装",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15281,
          "gcName": "地毯",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15282,
          "gcName": "地垫",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15283,
          "gcName": "抱枕靠垫",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15284,
          "gcName": "桌布/罩件",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15285,
          "gcName": "沙发垫套",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15286,
          "gcName": "窗帘/窗纱",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17287,
          "gcName": "布料",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17288,
          "gcName": "坐垫",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17488,
          "gcName": "挂毯/壁毯",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 21306,
          "gcName": "一次性洗脸巾",
          "gcParentId": 15250,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 15901,
      "gcName": "家庭清洁/纸品",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 15902,
        "gcName": "清洁纸品",
        "gcParentId": 15901,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15908,
          "gcName": "抽纸",
          "gcParentId": 15902,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15909,
          "gcName": "卷纸",
          "gcParentId": 15902,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15910,
          "gcName": "手帕纸",
          "gcParentId": 15902,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15911,
          "gcName": "湿巾",
          "gcParentId": 15902,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15912,
          "gcName": "厨房纸巾",
          "gcParentId": 15902,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15913,
          "gcName": "湿厕纸",
          "gcParentId": 15902,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15914,
          "gcName": "其它纸品/湿巾",
          "gcParentId": 15902,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15903,
        "gcName": "清洁用具",
        "gcParentId": 15901,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15915,
          "gcName": "一次性清洁用品",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15916,
          "gcName": "垃圾袋/垃圾桶",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15917,
          "gcName": "拖把/扫把",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15918,
          "gcName": "脸盆/水桶",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15919,
          "gcName": "抹布/百洁布",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15920,
          "gcName": "手套/鞋套/围裙",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15921,
          "gcName": "清洁刷具",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15922,
          "gcName": "其它清洁工具",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15923,
          "gcName": "清洁用具配件",
          "gcParentId": 15903,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15904,
        "gcName": "衣物清洁",
        "gcParentId": 15901,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15924,
          "gcName": "洗衣液",
          "gcParentId": 15904,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15925,
          "gcName": "洗衣粉",
          "gcParentId": 15904,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15926,
          "gcName": "洗衣皂",
          "gcParentId": 15904,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15927,
          "gcName": "护理剂",
          "gcParentId": 15904,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15928,
          "gcName": "除菌剂",
          "gcParentId": 15904,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15929,
          "gcName": "其它衣物清洁",
          "gcParentId": 15904,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15905,
        "gcName": "家庭环境清洁",
        "gcParentId": 15901,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15930,
          "gcName": "洗洁精",
          "gcParentId": 15905,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15931,
          "gcName": "油污清洁剂",
          "gcParentId": 15905,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15932,
          "gcName": "除湿干燥剂",
          "gcParentId": 15905,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15933,
          "gcName": "洁厕剂",
          "gcParentId": 15905,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15934,
          "gcName": "家电清洁用品",
          "gcParentId": 15905,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15935,
          "gcName": "消毒液",
          "gcParentId": 15905,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15936,
          "gcName": "地板清洁剂",
          "gcParentId": 15905,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15937,
          "gcName": "其它清洁用品",
          "gcParentId": 15905,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15906,
        "gcName": "驱蚊驱虫",
        "gcParentId": 15901,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15938,
          "gcName": "驱蚊用品",
          "gcParentId": 15906,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15939,
          "gcName": "灭鼠/杀虫剂",
          "gcParentId": 15906,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 15907,
        "gcName": "皮具护理",
        "gcParentId": 15901,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 15940,
          "gcName": "皮具护理品",
          "gcParentId": 15907,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 15941,
          "gcName": "护理工具",
          "gcParentId": 15907,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 16750,
      "gcName": "个人护理",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 16751,
        "gcName": "洗发护发",
        "gcParentId": 16750,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16756,
          "gcName": "洗发水",
          "gcParentId": 16751,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16757,
          "gcName": "护发素",
          "gcParentId": 16751,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16758,
          "gcName": "发膜",
          "gcParentId": 16751,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16759,
          "gcName": "营养水",
          "gcParentId": 16751,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16760,
          "gcName": "护发精华",
          "gcParentId": 16751,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16761,
          "gcName": "洗护套装",
          "gcParentId": 16751,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16762,
          "gcName": "其它洗护发产品",
          "gcParentId": 16751,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16752,
        "gcName": "美发假发/造型",
        "gcParentId": 16750,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16763,
          "gcName": "染发产品",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16764,
          "gcName": "烫发产品",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16765,
          "gcName": "啫喱膏/水",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16766,
          "gcName": "发蜡/泥",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16767,
          "gcName": "弹力素",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16768,
          "gcName": "发胶",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16769,
          "gcName": "摩丝",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16770,
          "gcName": "蓬蓬粉",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16771,
          "gcName": "造型喷雾/乳",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16772,
          "gcName": "其它造型产品",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16774,
          "gcName": "发套假发",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16776,
          "gcName": "其它假发",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16777,
          "gcName": "美发工具",
          "gcParentId": 16752,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16753,
        "gcName": "身体护理",
        "gcParentId": 16750,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16778,
          "gcName": "润肤",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16779,
          "gcName": "沐浴露",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16780,
          "gcName": "香皂",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16781,
          "gcName": "浴盐",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16782,
          "gcName": "洗手液",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16783,
          "gcName": "护手霜",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16784,
          "gcName": "手膜",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16785,
          "gcName": "足膜",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16786,
          "gcName": "护足霜",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16787,
          "gcName": "足贴",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16788,
          "gcName": "足浴粉",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16789,
          "gcName": "花露水",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16790,
          "gcName": "走珠/止汗露",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16791,
          "gcName": "男士私处洗液",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16792,
          "gcName": "脱毛膏/工具",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16793,
          "gcName": "护理工具",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16794,
          "gcName": "身体护理套装",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16795,
          "gcName": "其它身体护理",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16796,
          "gcName": "纤体塑形",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16797,
          "gcName": "胸部护理",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16798,
          "gcName": "颈部护理",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16799,
          "gcName": "精油",
          "gcParentId": 16753,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16754,
        "gcName": "女性护理",
        "gcParentId": 16750,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16800,
          "gcName": "卫生巾",
          "gcParentId": 16754,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16801,
          "gcName": "卫生棉条",
          "gcParentId": 16754,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16802,
          "gcName": "卫生护垫",
          "gcParentId": 16754,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16803,
          "gcName": "私密护理",
          "gcParentId": 16754,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16804,
          "gcName": "女性护理套装",
          "gcParentId": 16754,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16805,
          "gcName": "其它女性护理产品",
          "gcParentId": 16754,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 16755,
        "gcName": "口腔护理",
        "gcParentId": 16750,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 16806,
          "gcName": "牙膏",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16807,
          "gcName": "牙粉",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16808,
          "gcName": "牙贴",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16809,
          "gcName": "牙刷",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16810,
          "gcName": "牙线/牙线棒",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16811,
          "gcName": "牙缝刷",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16812,
          "gcName": "漱口水",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16813,
          "gcName": "口喷",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16814,
          "gcName": "假牙清洁",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16815,
          "gcName": "口腔护理套装",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 16816,
          "gcName": "其它口腔护理产品",
          "gcParentId": 16755,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] },


    {
      "gcId": 17329,
      "gcName": "箱包皮具",
      "gcParentId": 0,
      "gcLevel": 1,
      "gcPic": null,
      "children": [{
        "gcId": 2575,
        "gcName": "潮流女包",
        "gcParentId": 17329,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 2580,
          "gcName": "钱包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5256,
          "gcName": "手拿包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5257,
          "gcName": "单肩包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5258,
          "gcName": "双肩包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5259,
          "gcName": "手提包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5260,
          "gcName": "斜挎包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12069,
          "gcName": "钥匙包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12070,
          "gcName": "卡包/零钱包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13764,
          "gcName": "化妆包",
          "gcParentId": 2575,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 2576,
        "gcName": "精品男包",
        "gcParentId": 17329,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 1455,
          "gcName": "商务公文包",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2584,
          "gcName": "男士钱包",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5262,
          "gcName": "男士手包",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12071,
          "gcName": "双肩包",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12072,
          "gcName": "单肩/斜挎包",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12073,
          "gcName": "钥匙包",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13542,
          "gcName": "卡包名片夹",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13762,
          "gcName": "手机包",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13763,
          "gcName": "证件包",
          "gcParentId": 2576,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 2577,
        "gcName": "功能箱包",
        "gcParentId": 17329,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 2587,
          "gcName": "登山包",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2588,
          "gcName": "旅行包",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 2589,
          "gcName": "拉杆箱",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3997,
          "gcName": "电脑包",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 3998,
          "gcName": "休闲运动包",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 4000,
          "gcName": "旅行配件",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 5265,
          "gcName": "书包",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 12076,
          "gcName": "腰包/胸包",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13543,
          "gcName": "拉杆包",
          "gcParentId": 2577,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] },

      {
        "gcId": 17330,
        "gcName": "箱包皮具配件",
        "gcParentId": 17329,
        "gcLevel": 2,
        "gcPic": null,
        "children": [{
          "gcId": 12029,
          "gcName": "男士皮带",
          "gcParentId": 17330,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 13761,
          "gcName": "箱包配件",
          "gcParentId": 17330,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17331,
          "gcName": "皮带礼盒",
          "gcParentId": 17330,
          "gcLevel": 3,
          "gcPic": null,
          "children": null },
        {
          "gcId": 17332,
          "gcName": "女士皮带",
          "gcParentId": 17330,
          "gcLevel": 3,
          "gcPic": null,
          "children": null }] }] }],



    "bizMessage": "操作成功",
    "bizCode": "000000",
    "success": true };

  return categoryData.data.slice(0, 6);
}

//获取购物车数据
function _getShopCarData() {
  var carData = [
  {
    goodsAmount: 8,
    selected: false,
    shopId: "1",
    title: "淘宝",
    total: 5,
    glist: [{
      category: null,
      createTime: "2022-04-12 12:03:47",
      id: "m8429",
      img: "/static/image/biscuit/1.jpg",
      limitCity: "",
      name: "饼干",
      number: 3,
      orgEmployeeId: "5a398d45be8946febade9cd506bf5491",
      price: 567,
      selected: false,
      skuType: 1,
      spuId: "m8429",
      stock: 56 },

    {
      category: null,
      createTime: "2022-03-31 16:43:00",
      id: "good-43m",
      img: "/static/image/biscuit/2.jpg",
      limitCity: "",
      name: "饼干比表洒洒",
      number: 2,
      orgEmployeeId: "098389a1a33b46f89708c2ac66c7d210",
      price: 9.9,
      selected: false,
      skuType: 1,
      spuId: "good-43m",
      stock: 500 },

    {
      category: null,
      createTime: "2022-03-31 16:43:00",
      id: "good-250",
      img: "/static/image/birthdayCake/8.jpg",
      limitCity: "",
      name: "生日蛋糕-女神蛋糕-小孩蛋糕-男士蛋糕-老人蛋糕",
      number: 2,
      orgEmployeeId: "098389a1a33b46f89708c2ac66c7d210",
      price: 5999.9,
      selected: false,
      skuType: 1,
      spuId: "good-43m",
      stock: 500 }] }];




  return carData;
}

module.exports = {
  getBottomTabbarList: function getBottomTabbarList(templateId) {
    return _getBottomTabbarList(templateId);
  },
  getCategoryData: function getCategoryData() {
    return _getCategoryData();
  },
  getShopCarData: function getShopCarData() {
    return _getShopCarData();
  } };

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map