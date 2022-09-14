"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "tabbar",
  props: ["index"],
  data() {
    return {
      tabbarIndex: 0,
      data: [
        {
          text: "\u9996\u9875",
          iconPath: "/static/image/home.png",
          selectedIconPath: "/static/image/home-active.png",
          pagePath: "/pages/index/index"
        },
        {
          text: "\u8F6C\u8BA9",
          iconPath: "/static/image/transfer.png",
          selectedIconPath: "/static/image/transfer-active.png",
          pagePath: "/pages/find/find"
        },
        {
          text: "",
          iconPath: "",
          selectedIconPath: "",
          pagePath: ""
        },
        {
          text: "\u6C42\u8D2D",
          iconPath: "/static/image/looking.png",
          selectedIconPath: "/static/image/looking-active.png",
          pagePath: "/pages/msg/msg"
        },
        {
          text: "\u6211\u7684",
          iconPath: "/static/image/user.png",
          selectedIconPath: "/static/image/user-active.png",
          pagePath: "/pages/me/me"
        }
      ]
    };
  },
  mounted() {
    this.tabbarIndex = this.index;
    common_vendor.index.hideTabBar();
  },
  methods: {
    tabbarItemClick(tab, index) {
      console.log(tab, index);
      common_vendor.index.switchTab({
        url: tab.pagePath
      });
    },
    midClick() {
      console.log("\u70B9\u51FB\u4E86\u4E2D\u95F4");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.midClick && $options.midClick(...args)),
    b: common_vendor.f($data.data, (tab, index, i0) => {
      return {
        a: $data.tabbarIndex == index ? tab.selectedIconPath : tab.iconPath,
        b: common_vendor.t(tab.text),
        c: common_vendor.n($data.tabbarIndex == index ? "ynq-tabbar-text-select" : ""),
        d: index,
        e: common_vendor.o(($event) => $options.tabbarItemClick(tab, index), index)
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8ad7aaf8"], ["__file", "D:/reference/\u4E2A\u6027\u5316\u81EA\u5B9A\u4E49tabbar/components/tabbar/tabbar.vue"]]);
wx.createComponent(Component);
