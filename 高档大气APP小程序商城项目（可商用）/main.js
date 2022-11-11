import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//引入请求库
import $R from './utils/request/request.js'
Vue.prototype.$R = $R
//引入配置文件
import $Management from '@/config/management.js';
import $C from './config/index.config.js';
Vue.prototype.$Management = $Management
Vue.prototype.$C = $C

// 引入全局分享
import weChartShare from './utils/weChartShare.js'
Vue.mixin(weChartShare)


import $json from './json.js';
Vue.prototype.$json = $json

//引入状态存储
import store from './store/index.js'
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
