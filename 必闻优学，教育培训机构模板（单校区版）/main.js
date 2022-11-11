import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// vuex
import store from '@/store';
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView);

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

const app = new Vue({
	store,
    ...App
})
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif