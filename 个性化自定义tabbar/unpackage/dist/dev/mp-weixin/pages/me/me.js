"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  }
};
if (!Array) {
  const _easycom_tabbar2 = common_vendor.resolveComponent("tabbar");
  _easycom_tabbar2();
}
const _easycom_tabbar = () => "../../components/tabbar/tabbar.js";
if (!Math) {
  _easycom_tabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      index: "4"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/reference/\u4E2A\u6027\u5316\u81EA\u5B9A\u4E49tabbar/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
