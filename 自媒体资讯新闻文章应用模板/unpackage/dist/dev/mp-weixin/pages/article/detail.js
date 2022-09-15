(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/article/detail"],{

/***/ 34:
/*!******************************************************************************!*\
  !*** D:/reference/自媒体资讯新闻文章应用模板/main.js?{"page":"pages%2Farticle%2Fdetail"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/article/detail.vue */ 35));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 35:
/*!***********************************************************!*\
  !*** D:/reference/自媒体资讯新闻文章应用模板/pages/article/detail.vue ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=7e72117a&scoped=true& */ 36);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 38);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_id_7e72117a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&id=7e72117a&scoped=true&lang=scss& */ 41);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs





/* normalize component */

var component = Object(_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7e72117a",
  null,
  false,
  _detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/article/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 36:
/*!******************************************************************************************************!*\
  !*** D:/reference/自媒体资讯新闻文章应用模板/pages/article/detail.vue?vue&type=template&id=7e72117a&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=7e72117a&scoped=true& */ 37);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_7e72117a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 37:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/reference/自媒体资讯新闻文章应用模板/pages/article/detail.vue?vue&type=template&id=7e72117a&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    parser: function() {
      return Promise.all(/*! import() | components/parser/parser */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/parser/parser")]).then(__webpack_require__.bind(null, /*! @/components/parser/parser.vue */ 213))
    },
    loading: function() {
      return __webpack_require__.e(/*! import() | components/loading/loading */ "components/loading/loading").then(__webpack_require__.bind(null, /*! @/components/loading/loading.vue */ 199))
    },
    uniPopup: function() {
      return __webpack_require__.e(/*! import() | components/uni-popup/uni-popup */ "components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/components/uni-popup/uni-popup.vue */ 223))
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
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 38:
/*!************************************************************************************!*\
  !*** D:/reference/自媒体资讯新闻文章应用模板/pages/article/detail.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 39);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 39:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/reference/自媒体资讯新闻文章应用模板/pages/article/detail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




































































































































































var _util = _interopRequireDefault(__webpack_require__(/*! @/common/util.js */ 23));
var _wechatMP = _interopRequireDefault(__webpack_require__(/*! @/common/sdk/wechatMP.js */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var parser = function parser() {Promise.all(/*! require.ensure | components/parser/parser */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/parser/parser")]).then((function () {return resolve(__webpack_require__(/*! @/components/parser/parser.vue */ 213));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var pageLoading = function pageLoading() {__webpack_require__.e(/*! require.ensure | components/loading/pageLoading */ "components/loading/pageLoading").then((function () {return resolve(__webpack_require__(/*! @/components/loading/pageLoading.vue */ 185));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var iconfont = function iconfont() {__webpack_require__.e(/*! require.ensure | components/iconfont/iconfont */ "components/iconfont/iconfont").then((function () {return resolve(__webpack_require__(/*! @/components/iconfont/iconfont.vue */ 164));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var loading = function loading() {__webpack_require__.e(/*! require.ensure | components/loading/loading */ "components/loading/loading").then((function () {return resolve(__webpack_require__(/*! @/components/loading/loading.vue */ 199));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniPopup = function uniPopup() {__webpack_require__.e(/*! require.ensure | components/uni-popup/uni-popup */ "components/uni-popup/uni-popup").then((function () {return resolve(__webpack_require__(/*! @/components/uni-popup/uni-popup.vue */ 223));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =
{
  components: {
    parser: parser,
    pageLoading: pageLoading,
    loading: loading,
    iconfont: iconfont,
    uniPopup: uniPopup },

  data: function data() {
    return {
      id: 0,
      info: { comment: { count: 0, list: [] } },
      showAddComment: false,
      showCommenBar: true,
      addCommentFocus: false,
      commentContent: '',
      replyCommentId: 0,
      replyNickname: '',
      page_index: 1,
      page_size: 10,
      hasMoreData: false,
      showPageLoading: true,
      currentUrl: '',
      shareUrl: '',
      showShareTip: false,
      showH5Share: false,
      showBrowserShareTip: false };

  },
  onShow: function onShow(e) {
    this.$initPageTitle(); //初始化页面标题
    if (this.page_index > 1) {
      this.page_index = 1;
      this.getData();
    }

    /*来源是登录时更新*/
    var source = uni.getStorageSync('source');
    if (source == 'login') {
      uni.removeStorageSync('source');
      this.loadData();
    }

    /*当前页面*/
    if (!uni.getStorageSync('source')) {
      uni.setStorageSync('source', 'article/detail');
    }
  },
  onLoad: function onLoad(e) {
    if (e.id > 0) {
      this.id = e.id;
    }



    this.getData();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    uni.showLoading({
      title: '刷新中' });

    this.page_index = 1;
    this.getData();
  },
  onReachBottom: function onReachBottom(e) {
    if (this.hasMoreData) {
      this.getComment();
    }
  },
  /*小程序分享*/
  onShareAppMessage: function onShareAppMessage() {
    return {
      path: '/pages/article/detail?id=' + this.info.id,
      success: function success(e) {},
      title: this.info.title,
      imageUrl: this.info.photo_url };

  },
  methods: {
    /*加载数据*/
    loadData: function loadData() {
      this.getData();
    },

    /*获取文章详情*/
    getData: function getData() {var _this = this;
      this.$app.request({
        url: this.$api.article.detail,
        data: {
          id: this.id,
          page_size: this.page_size },

        method: 'POST',
        dataType: 'json',
        success: function success(res) {
          console.log('res');
          if (res.code == 0) {
            _this.info = res.data;
            uni.setNavigationBarTitle({
              title: _this.info.title });

            _this.$initPageTitle();
            _this.showPageLoading = false;
            if (res.data.comment.page > _this.page_index) {
              _this.hasMoreData = true;
            } else {
              _this.hasMoreData = false;
            }
            _this.page_index += 1;
            _this.initMPShare(); //公众号分享
          } else {
            _this.$alert(res.msg);
          }
        },
        complete: function complete(res) {
          uni.stopPullDownRefresh();
          uni.hideLoading();
        } });

    },

    /*点赞*/
    like: function like() {var _this2 = this;
      this.$app.request({
        url: this.$api.article.like,
        data: {
          article_id: this.id },

        method: 'POST',
        dataType: 'json',
        success: function success(res) {
          console.log('res');
          if (res.code == 0) {
            _this2.info.is_like = !_this2.info.is_like;
            var msg = _this2.info.is_like ? '点赞成功' : '已取消点赞';
            _this2.$alert(msg, 'success');
          } else {
            _this2.$alert(res.msg, 'warning');
          }
        } });

    },

    /*评论点赞*/
    commentLike: function commentLike(comment_id, index) {var _this3 = this;
      this.$app.request({
        url: this.$api.article.commentLike,
        data: {
          comment_id: comment_id },

        method: 'POST',
        dataType: 'json',
        success: function success(res) {
          if (res.code == 0) {
            if (_this3.info.comment.list[index].is_like) {
              _this3.info.comment.list[index].is_like = false;
              _this3.info.comment.list[index].like_count -= 1;
            } else {
              _this3.info.comment.list[index].is_like = true;
              _this3.info.comment.list[index].like_count += 1;
            }
            var msg = _this3.info.comment.list[index].is_like ? '点赞成功' : '已取消点赞';
            _this3.$alert(msg);
          } else {
            _this3.$alert(res.msg);
          }
        } });

    },

    /*收藏*/
    favorite: function favorite() {var _this4 = this;
      this.$app.request({
        url: this.$api.article.favorite,
        data: {
          article_id: this.id },

        method: 'POST',
        dataType: 'json',
        success: function success(res) {
          console.log('res');
          if (res.code == 0) {
            _this4.info.is_favorite = !_this4.info.is_favorite;
            var msg = _this4.info.is_favorite ? '收藏成功' : '已取消收藏';
            _this4.$alert(msg, 'success');
          } else {
            _this4.$alert(res.msg, 'warning');
          }
        } });

    },

    /*初始化添加评论*/
    initAddComment: function initAddComment(status) {var _this5 = this;
      if (status) {
        this.$app.initLogin();
      }
      this.showAddComment = status;
      this.commentContent = '';
      if (this.replyCommentId > 0) {
        this.replyCommentId = 0;
        this.replyNickname = '';
      }
      setTimeout(function () {
        _this5.addCommentFocus = status;
      }, 200);
    },

    /*添加评论或回复*/
    addCommentOrReply: function addCommentOrReply() {
      if (this.commentContent == '') {
        this.$alert('评论内容不能为空');
        return;
      }
      if (this.replyCommentId > 0) {
        this.addReply();
      } else {
        this.addComment();
      }
    },

    /*添加评论*/
    addComment: function addComment() {var _this6 = this;
      this.$app.request({
        url: this.$api.article.addComment,
        data: {
          article_id: this.id,
          content: this.commentContent,
          page_size: this.page_size },

        method: 'POST',
        dataType: 'json',
        success: function success(res) {
          if (res.code == 0) {
            _this6.info.comment = res.data;
            _this6.showAddComment = false;
            _this6.commentContent = '';
            _this6.$alert('评论成功');
          } else {
            _this6.$alert(res.msg);
          }
        } });

    },

    /*初始化回复*/
    initAddReply: function initAddReply(comment_id, nickname) {
      this.initAddComment(true);
      this.replyCommentId = comment_id;
      this.replyNickname = nickname;
    },

    /*添加回复*/
    addReply: function addReply() {var _this7 = this;
      if (this.commentContent == '') {
        this.$alert('回复内容不能为空');
        return;
      }
      this.$app.request({
        url: this.$api.article.addReply,
        data: {
          comment_id: this.replyCommentId,
          content: this.commentContent,
          page_size: this.page_size },

        method: 'POST',
        dataType: 'json',
        success: function success(res) {
          if (res.code == 0) {
            _this7.info.comment = res.data;
            _this7.showAddComment = false;
            _this7.replyCommentId = 0;
            _this7.replyNickname = '';
            _this7.commentContent = '';
            _this7.$alert('评论成功');
          } else {
            _this7.$alert(res.msg);
          }
        } });

    },

    /*获取评论*/
    getComment: function getComment() {var _this8 = this;
      this.$app.request({
        url: this.$api.article.comment,
        data: {
          article_id: this.id,
          page_index: this.page_index,
          page_size: this.page_size },

        method: 'POST',
        dataType: 'json',
        success: function success(res) {
          if (res.code == 0) {
            console.log(_this8.info.comment);
            _this8.info.comment.list = _this8.info.comment.list.concat(res.data.list);
            _this8.info.comment.count = res.data.count;
            if (res.data.page > _this8.page_index) {
              _this8.hasMoreData = true;
            } else {
              _this8.hasMoreData = false;
            }
            _this8.page_index += 1;
          } else {
            _this8.$alert(res.msg);
          }
        },
        complete: function complete(res) {
          uni.stopPullDownRefresh();
          uni.hideLoading();
        } });

    },

    /*打开外部链接*/
    openLink: function openLink(url) {
      console.log(url);
      window.location.href = url;
    },

    /*关闭H5分享*/
    closeH5Share: function closeH5Share() {
      this.showH5Share = false;
    },

    /*关闭微信分享提示*/
    closeShareTip: function closeShareTip() {
      this.showShareTip = false;
    },
    /*显示浏览器分享提示*/
    showBrowserShareTips: function showBrowserShareTips() {
      this.showH5Share = false;
      this.showBrowserShareTip = true;
    },
    /*关闭浏览器分享提示*/
    closeBrowserShareTip: function closeBrowserShareTip() {
      this.showBrowserShareTip = false;
    },

    /*分享*/
    share: function share() {








      console.log('share');


      uni.showShareMenu();

    },

    /*初始化公众号分享*/
    initMPShare: function initMPShare() {
















    },

    /*跳转至评论详情*/
    redirectCommentDetail: function redirectCommentDetail(id, replyCount) {
      if (replyCount > 0) {
        uni.navigateTo({
          url: 'commentDetail?id=' + id });

      }
    },

    /*复制*/
    copyText: function copyText(text) {var _this9 = this;
      uni.setClipboardData({
        data: text,
        success: function success(res) {
          _this9.$alert('原文链接已复制', 'success');
        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 41:
/*!*********************************************************************************************************************!*\
  !*** D:/reference/自媒体资讯新闻文章应用模板/pages/article/detail.vue?vue&type=style&index=0&id=7e72117a&scoped=true&lang=scss& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_7e72117a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&id=7e72117a&scoped=true&lang=scss& */ 42);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_7e72117a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_7e72117a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_7e72117a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_7e72117a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_7e72117a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 42:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/reference/自媒体资讯新闻文章应用模板/pages/article/detail.vue?vue&type=style&index=0&id=7e72117a&scoped=true&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[34,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/article/detail.js.map