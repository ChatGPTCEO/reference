(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/chat/groupChat/groupChat"],{

/***/ 53:
/*!***************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/GoEasy IM聊天和即时通讯示例/main.js?{"page":"pages%2Fchat%2FgroupChat%2FgroupChat"} ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _groupChat = _interopRequireDefault(__webpack_require__(/*! ./pages/chat/groupChat/groupChat.vue */ 54));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;createPage(_groupChat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 54:
/*!******************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/GoEasy IM聊天和即时通讯示例/pages/chat/groupChat/groupChat.vue ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./groupChat.vue?vue&type=template&id=36d9f321& */ 55);
/* harmony import */ var _groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./groupChat.vue?vue&type=script&lang=js& */ 57);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__["render"],
  _groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/chat/groupChat/groupChat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 55:
/*!*************************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/GoEasy IM聊天和即时通讯示例/pages/chat/groupChat/groupChat.vue?vue&type=template&id=36d9f321& ***!
  \*************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./groupChat.vue?vue&type=template&id=36d9f321& */ 56);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_template_id_36d9f321___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 56:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/will/Documents/GitHub/reference/GoEasy IM聊天和即时通讯示例/pages/chat/groupChat/groupChat.vue?vue&type=template&id=36d9f321& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    GoEasyAudioPlayer: function() {
      return __webpack_require__.e(/*! import() | components/GoEasyAudioPlayer/GoEasyAudioPlayer */ "components/GoEasyAudioPlayer/GoEasyAudioPlayer").then(__webpack_require__.bind(null, /*! @/components/GoEasyAudioPlayer/GoEasyAudioPlayer.vue */ 67))
    },
    CustomMessage: function() {
      return __webpack_require__.e(/*! import() | components/CustomMessage/CustomMessage */ "components/CustomMessage/CustomMessage").then(__webpack_require__.bind(null, /*! @/components/CustomMessage/CustomMessage.vue */ 74))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.messages, function(message, index) {
    var $orig = _vm.__get_orig(message)

    var m0 = _vm.renderMessageDate(message, index)
    var g0 =
      message.recalled && !(message.senderId !== _vm.currentUser.uuid)
        ? message.type === "text" && Date.now() - message.timestamp < 60 * 1000
        : null
    var g1 = !message.recalled
      ? _vm.messageSelector.messages.includes(message)
      : null
    var m1 =
      !message.recalled && message.type === "text"
        ? _vm.renderTextMessage(message)
        : null
    return {
      $orig: $orig,
      m0: m0,
      g0: g0,
      g1: g1,
      m1: m1
    }
  })

  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.actionPopup.visible = false
    }
  }

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 57:
/*!*******************************************************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/GoEasy IM聊天和即时通讯示例/pages/chat/groupChat/groupChat.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./groupChat.vue?vue&type=script&lang=js& */ 58);
/* harmony import */ var _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 58:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/will/Documents/GitHub/reference/GoEasy IM聊天和即时通讯示例/pages/chat/groupChat/groupChat.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;










































































































var _EmojiDecoder = _interopRequireDefault(__webpack_require__(/*! ../../../lib/EmojiDecoder */ 52));
var _restapi = _interopRequireDefault(__webpack_require__(/*! ../../../lib/restapi */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var GoEasyAudioPlayer = function GoEasyAudioPlayer() {__webpack_require__.e(/*! require.ensure | components/GoEasyAudioPlayer/GoEasyAudioPlayer */ "components/GoEasyAudioPlayer/GoEasyAudioPlayer").then((function () {return resolve(__webpack_require__(/*! ../../../components/GoEasyAudioPlayer/GoEasyAudioPlayer */ 67));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var CustomMessage = function CustomMessage() {__webpack_require__.e(/*! require.ensure | components/CustomMessage/CustomMessage */ "components/CustomMessage/CustomMessage").then((function () {return resolve(__webpack_require__(/*! ../../../components/CustomMessage/CustomMessage */ 74));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};
var recorderManager = uni.getRecorderManager();var _default =
{
  name: 'groupChat',
  components: {
    GoEasyAudioPlayer: GoEasyAudioPlayer,
    CustomMessage: CustomMessage },

  data: function data() {
    // 定义表情
    var emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
    var emojiMap = {
      '[么么哒]': 'emoji_3@2x.png',
      '[乒乓]': 'emoji_4@2x.png',
      '[便便]': 'emoji_5@2x.png',
      '[信封]': 'emoji_6@2x.png',
      '[偷笑]': 'emoji_7@2x.png',
      '[傲慢]': 'emoji_8@2x.png' };

    return {
      //聊天文本框
      content: '',
      group: null,
      currentUser: null,
      //群成员
      groupMembers: {},
      //消息记录
      messages: [],
      //是否加载完所有历史消息
      allHistoryLoaded: false,
      //定义表情列表
      emoji: {
        url: emojiUrl,
        map: emojiMap,
        visible: false,
        decoder: new _EmojiDecoder.default(emojiUrl, emojiMap) },

      //是否展示‘其他消息类型面板’
      otherTypesMessagePanelVisible: false,
      audio: {
        startTime: null,
        //语音录音中
        recording: false,
        //录音按钮展示
        visible: false },

      videoPlayer: {
        visible: false,
        url: '',
        context: null },

      // 展示自定义消息框
      customMessageFormVisible: false,

      // 展示消息删除弹出框
      actionPopup: {
        visible: false,
        message: null,
        recallable: false },

      // 消息选择
      messageSelector: {
        visible: false,
        messages: [] } };


  },
  onReady: function onReady() {
    this.videoPlayer.context = uni.createVideoContext('videoPlayer', this);
    uni.setNavigationBarTitle({
      title: this.group.name + '（' + Object.keys(this.groupMembers).length + '）' });

  },
  onShow: function onShow() {
    this.otherTypesMessagePanelVisible = false;
    this.emoji.visible = false;
  },
  onLoad: function onLoad(options) {
    //聊天对象
    var groupId = options.to;
    this.currentUser = uni.getStorageSync('currentUser');
    //从服务器获取最新的群信息
    this.group = _restapi.default.findGroupById(groupId);
    this.groupMembers = _restapi.default.findGroupMembers(groupId);

    this.initialGoEasyListeners();
    this.loadHistoryMessage(true);
    // 录音监听器
    this.initRecorderListeners();

  },
  onPullDownRefresh: function onPullDownRefresh(e) {
    this.loadHistoryMessage(false);
  },
  onUnload: function onUnload() {
    //退出聊天页面之前，清空监听器
    this.goEasy.im.on(this.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, function () {});
    this.goEasy.im.on(this.GoEasy.IM_EVENT.MESSAGE_DELETED, function () {});
  },
  methods: {
    //渲染文本消息，如果包含表情，替换为图片
    //todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
    renderTextMessage: function renderTextMessage(message) {
      return '<span class="text-content">' + this.emoji.decoder.decode(message.payload.text) + '</span>';
    },
    //像微信那样显示时间，如果有几分钟没发消息了，才显示时间
    //todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
    renderMessageDate: function renderMessageDate(message, index) {
      if (index === 0) {
        return this.formatDate(message.timestamp);
      } else {
        if (message.timestamp - this.messages[index - 1].timestamp > 5 * 60 * 1000) {
          return this.formatDate(message.timestamp);
        }
      }
      return '';
    },
    initialGoEasyListeners: function initialGoEasyListeners() {var _this = this;
      //监听群聊消息
      this.goEasy.im.on(this.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, function (message) {
        var groupId = message.groupId;
        if (groupId === _this.group.uuid) {
          _this.messages.push(message);
          //聊天时，收到消息标记为已读
          _this.markGroupMessageAsRead(groupId);
          //收到新消息，是滚动到最底部
          _this.scrollToBottom();
        }
      });
      //监听消息删除
      this.goEasy.im.on(this.GoEasy.IM_EVENT.MESSAGE_DELETED, function (deletedMessages) {
        deletedMessages.forEach(function (message) {
          var groupId = message.groupId;
          if (groupId && groupId === _this.group.uuid) {
            var index = _this.messages.indexOf(message);
            if (index > -1) {
              _this.messages.splice(index, 1);
            }
          }
        });
      });
    },
    initRecorderListeners: function initRecorderListeners() {var _this2 = this;
      // 监听录音开始
      recorderManager.onStart(function () {
        _this2.audio.recording = true;
        _this2.audio.startTime = Date.now();
      });
      //录音结束后，发送
      recorderManager.onStop(function (res) {
        var endTime = Date.now();
        _this2.audio.recording = false;
        var duration = endTime - _this2.audio.startTime;
        if (duration < 1000) {
          uni.showToast({
            icon: 'error',
            title: '录音时间太短',
            duration: 500 });

          return;
        }
        res.duration = duration;
        var audioMessage = _this2.goEasy.im.createAudioMessage({
          to: {
            id: _this2.group.uuid,
            type: _this2.GoEasy.IM_SCENE.GROUP,
            data: {
              name: _this2.group.name,
              avatar: _this2.group.avatar } },


          file: res,
          onProgress: function onProgress(progress) {
            console.log(progress);
          },
          notification: {
            title: _this2.currentUser.name + '发来一段语音',
            body: '[语音消息]' // 字段最长 50 字符
          } });

        _this2.sendMessage(audioMessage);
      });
      // 监听录音报错
      recorderManager.onError(function (res) {
        _this2.audio.recording = false;
        recorderManager.stop();
        uni.showToast({
          icon: 'none',
          title: '录音失败,请检查麦克风权限',
          duration: 1000 });

      });
    },
    sendMessage: function sendMessage(message) {
      this.messages.push(message);
      this.scrollToBottom();
      this.goEasy.im.sendMessage({
        message: message,
        onSuccess: function onSuccess(message) {
          console.log('发送成功.', message);
        },
        onFailed: function onFailed(error) {
          if (error.code === 507) {
            console.log('发送语音/图片/视频/文件失败，没有配置OSS存储，详情参考：https://www.goeasy.io/cn/docs/goeasy-2.x/im/message/media/send-media-message.html');
          } else {
            console.log('发送失败:', error);
          }
        } });

    },
    createTextMessage: function createTextMessage() {
      if (this.content.trim() !== '') {
        var body = this.content;
        if (this.content.length >= 50) {
          body = this.content.substring(0, 30) + '...';
        }
        var textMessage = this.goEasy.im.createTextMessage({
          text: this.content,
          to: {
            id: this.group.uuid,
            type: this.GoEasy.IM_SCENE.GROUP,
            data: {
              name: this.group.name,
              avatar: this.group.avatar } },


          notification: {
            title: this.currentUser.name + '发来一段文字',
            body: body // 字段最长 50 字符
          } });

        this.sendMessage(textMessage);
      }
      this.content = '';
    },
    createVideoMessage: function createVideoMessage() {var _this3 = this;
      uni.chooseVideo({
        success: function success(res) {
          var videoMessage = _this3.goEasy.im.createVideoMessage({
            to: {
              id: _this3.group.uuid,
              type: _this3.GoEasy.IM_SCENE.GROUP,
              data: {
                name: _this3.group.name,
                avatar: _this3.group.avatar } },


            file: res,
            onProgress: function onProgress(progress) {
              console.log(progress);
            },
            notification: {
              title: _this3.currentUser.name + '发来一个视频',
              body: '[视频消息]' // 字段最长 50 字符
            } });

          _this3.sendMessage(videoMessage);
        } });

    },
    createImageMessage: function createImageMessage() {var _this4 = this;
      uni.chooseImage({
        count: 9,
        success: function success(res) {
          res.tempFiles.forEach(function (file) {
            var imageMessage = _this4.goEasy.im.createImageMessage({
              to: {
                id: _this4.group.uuid,
                type: _this4.GoEasy.IM_SCENE.GROUP,
                data: {
                  name: _this4.group.name,
                  avatar: _this4.group.avatar } },


              file: file,
              onProgress: function onProgress(progress) {
                console.log(progress);
              },
              notification: {
                title: _this4.currentUser.name + '发来一张图片',
                body: '[图片消息]' // 字段最长 50 字符
              } });

            _this4.sendMessage(imageMessage);
          });
        } });

    },
    showActionPopup: function showActionPopup(message) {
      var MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
      this.messageSelector.messages = [message];
      if (Date.now() - message.timestamp < MAX_RECALLABLE_TIME && message.senderId === this.currentUser.uuid && message.status === 'success') {
        this.actionPopup.recallable = true;
      } else {
        this.actionPopup.recallable = false;
      }
      this.actionPopup.visible = true;
    },
    deleteSingleMessage: function deleteSingleMessage() {var _this5 = this;
      uni.showModal({
        content: '确认删除？',
        success: function success(res) {
          _this5.actionPopup.visible = false;
          if (res.confirm) {
            _this5.deleteMessage();
          }
        } });

    },
    deleteMultipleMessages: function deleteMultipleMessages() {var _this6 = this;
      if (this.messageSelector.messages.length > 0) {
        uni.showModal({
          content: '确认删除？',
          success: function success(res) {
            _this6.messageSelector.visible = false;
            if (res.confirm) {
              _this6.deleteMessage();
            }
          } });

      }
    },
    deleteMessage: function deleteMessage() {var _this7 = this;
      this.goEasy.im.deleteMessage({
        messages: this.messageSelector.messages,
        onSuccess: function onSuccess(result) {
          _this7.messageSelector.messages.forEach(function (message) {
            var index = _this7.messages.indexOf(message);
            if (index > -1) {
              _this7.messages.splice(index, 1);
            }
          });
          _this7.messageSelector.messages = [];
        },
        onFailed: function onFailed(error) {
          console.log('error:', error);
        } });

    },
    recallMessage: function recallMessage() {
      this.actionPopup.visible = false;
      this.goEasy.im.recallMessage({
        messages: this.messageSelector.messages,
        onSuccess: function onSuccess() {
          console.log('撤回成功');
        },
        onFailed: function onFailed(error) {
          console.log('撤回失败,error:', error);
        } });

    },
    editRecalledMessage: function editRecalledMessage(content) {
      if (this.audio.visible) {
        this.audio.visible = false;
      }
      this.content = content;
    },
    showCheckBox: function showCheckBox() {
      this.messageSelector.messages = [];
      this.messageSelector.visible = true;
      this.actionPopup.visible = false;
    },
    selectMessages: function selectMessages(e) {
      var selectedMessageIds = e.detail.value;
      var selectedMessages = [];
      this.messages.forEach(function (message) {
        if (selectedMessageIds.includes(message.messageId)) {
          selectedMessages.push(message);
        }
      });
      this.messageSelector.messages = selectedMessages;
    },
    loadHistoryMessage: function loadHistoryMessage(scrollToBottom) {var _this8 = this; //历史消息
      var lastMessageTimeStamp;
      var lastMessage = this.messages[0];
      if (lastMessage) {
        lastMessageTimeStamp = lastMessage.timestamp;
      }
      this.goEasy.im.history({
        groupId: this.group.uuid,
        lastTimestamp: lastMessageTimeStamp,
        limit: 10,
        onSuccess: function onSuccess(result) {
          uni.stopPullDownRefresh();
          var messages = result.content;
          if (messages.length === 0) {
            _this8.allHistoryLoaded = true;
          } else {
            _this8.messages = messages.concat(_this8.messages);
            if (scrollToBottom) {
              _this8.scrollToBottom();
              //收到的消息设置为已读
              _this8.markGroupMessageAsRead(_this8.group.uuid);
            }
          }
        },
        onFailed: function onFailed(error) {
          //获取失败
          console.log('获取历史消息失败:', error);
          uni.stopPullDownRefresh();
        } });

    },
    showMembers: function showMembers() {//显示群成员
      uni.navigateTo({
        url: '../groupChat/member?users=' + JSON.stringify(this.groupMembers) });

    },
    onRecordStart: function onRecordStart() {
      try {
        recorderManager.start();
      } catch (e) {
        uni.showModal({
          title: '录音错误',
          content: '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档' });

      }
    },
    onRecordEnd: function onRecordEnd() {
      try {
        recorderManager.stop();
      } catch (e) {
        console.log("e:", e);
      }
    },
    showImageFullScreen: function showImageFullScreen(e) {
      var imagesUrl = [e.currentTarget.dataset.url];
      uni.previewImage({
        urls: imagesUrl });

    },
    //语音录制按钮和键盘输入的切换
    switchAudioKeyboard: function switchAudioKeyboard() {
      this.audio.visible = !this.audio.visible;
      if (uni.authorize) {
        uni.authorize({
          scope: 'scope.record',
          fail: function fail() {
            uni.showModal({
              title: '获取录音权限失败',
              content: '请先授权才能发送语音消息！' });

          } });

      }
    },
    playVideo: function playVideo(e) {var _this9 = this;
      this.videoPlayer.visible = true;
      this.videoPlayer.url = e.currentTarget.dataset.url;
      this.$nextTick(function () {
        _this9.videoPlayer.context.requestFullScreen({
          direction: 0 });

        _this9.videoPlayer.context.play();
      });
    },
    onVideoFullScreenChange: function onVideoFullScreenChange(e) {
      //当退出全屏播放时，隐藏播放器
      if (this.videoPlayer.visible && !e.detail.fullScreen) {
        this.videoPlayer.visible = false;
        this.videoPlayer.context.stop();
      }
    },
    messageInputFocusin: function messageInputFocusin() {
      this.otherTypesMessagePanelVisible = false;
      this.emoji.visible = false;
    },
    showEmoji: function showEmoji() {
      this.emoji.visible = !this.emoji.visible;
      this.otherTypesMessagePanelVisible = false;
    },
    showOtherTypesMessagePanel: function showOtherTypesMessagePanel() {
      this.otherTypesMessagePanelVisible = !this.otherTypesMessagePanelVisible;
      this.emoji.visible = false;
    },
    chooseEmoji: function chooseEmoji(emojiKey) {
      this.content += emojiKey;
    },
    createCustomMessage: function createCustomMessage(data) {
      var customMessage = this.goEasy.im.createCustomMessage({
        type: 'order',
        payload: {
          number: data.number,
          goods: data.goods,
          price: data.price },

        to: {
          id: this.group.uuid,
          type: this.GoEasy.IM_SCENE.GROUP,
          data: {
            name: this.group.name,
            avatar: this.group.avatar } },


        notification: {
          title: this.currentUser.name + '发来一份订单',
          body: '[订单消息]' // 字段最长 50 字符
        } });

      this.sendMessage(customMessage);
      this.customMessageFormVisible = false;
    },
    showCustomMessageForm: function showCustomMessageForm() {
      this.customMessageFormVisible = true;
    },
    closeCustomMessageForm: function closeCustomMessageForm() {
      this.customMessageFormVisible = false;
    },
    scrollToBottom: function scrollToBottom() {
      setTimeout(function () {
        uni.pageScrollTo({
          scrollTop: 2000000,
          duration: 0 });

      }, 500);
    },
    markGroupMessageAsRead: function markGroupMessageAsRead(groupId) {
      this.goEasy.im.markGroupMessageAsRead({
        groupId: groupId,
        onSuccess: function onSuccess() {
          console.log('标记群聊已读成功');
        },
        onFailed: function onFailed(error) {
          console.log('标记群聊已读失败:', error);
        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[53,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/chat/groupChat/groupChat.js.map