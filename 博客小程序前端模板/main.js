import App from './App'
import Vue from 'vue'
import uView from 'uview-ui'
import install from './install.js'


Vue.config.productionTip = false
Vue.use(uView)
Vue.use(install);


uni.$u.config.unit = 'rpx'
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
