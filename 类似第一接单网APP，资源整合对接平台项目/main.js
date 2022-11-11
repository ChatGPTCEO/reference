import App from './App'

import uView from "uview-ui";
Vue.use(uView);

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
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

// import Vconsole from 'vconsole';
// let vConsole = new Vconsole();
// Vue.use(vConsole);

// import { request } from './utils/http.js'
// Vue.prototype.$request = request;

// import util from './utils/util.js'
// if (util.is_pc()) {
//   request.post('/common/getConfig').then(res => {
//     let app_url = res.data.app_url;
//     uni.showModal({
//     	title: '提示',
//     	content: '检测到当前为电脑端访问，是否切换到电脑版，使用更便捷',
//     	success: function (res) {
//     		if (res.confirm) {
//     			window.location.href = app_url;
//     		}
//     	}
//     });
//   })
// }
