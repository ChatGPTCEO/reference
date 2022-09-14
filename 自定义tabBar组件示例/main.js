import Vue from 'vue'
import App from './App'

/**
 * 引入公共组件
 */
// 自定义tabBar
import tabBar from "./components/kang-tabBar/tabBar.vue"
Vue.component('tabBar', tabBar)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
