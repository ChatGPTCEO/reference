console.log("我是main.js")
import App from './App'
import store from './store'
import Common from './script/common'
import Config from 'script/config'
import HttpRequest from './script/httpRequest'

// import "./static/css/common.css"
// import "./static/css/icon.css"

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$Common = Common
Vue.prototype.$Config = Config
Vue.prototype.$store = store
Vue.prototype.$Request = HttpRequest
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
console.log(app)
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
