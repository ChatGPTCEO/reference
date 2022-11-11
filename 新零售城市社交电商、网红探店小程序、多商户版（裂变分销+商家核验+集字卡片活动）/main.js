import Vue from 'vue'
import App from './App'

// 引入vuex
import store from './store'
// main.js
import uView from "uview-ui";
Vue.use(uView);
// utils
import util from 'utils/util'
Vue.prototype.$util = util;
//全局注入w-loading组件
import wLoading from "@/components/w-loading/w-loading.vue";
Vue.component('w-loading', wLoading)
//分享
let mpShare = require('node_modules/uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
// 请求全局封装
import httpInterceptor from '@/common/http.interceptor'
Vue.use(httpInterceptor, app)
app.$mount()
