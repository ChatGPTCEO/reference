import Vue from 'vue'
import App from './App'
import cuCustom from '@/components/colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
Vue.component('uni-number-box', uniNumberBox)

import myRequest from './utils/api.js'
Vue.config.productionTip = false
uni.$myRequest = myRequest //挂载到Vue的原型上
App.mpType = 'app'

const app = new Vue({
	...App
})

//挂载到全局，让所有页面都能接收
app.$mount()
