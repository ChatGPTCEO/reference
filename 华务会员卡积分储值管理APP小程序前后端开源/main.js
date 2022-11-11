import App from './App'
import uView from "uview-ui";
Vue.use(uView);
import loader from 'script/loader.js'
// #ifndef VUE3
import Vue from 'vue'

loader(Vue)
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