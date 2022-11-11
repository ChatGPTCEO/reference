import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$toPage = url=>uni.navigateTo({url})
Vue.prototype.$toTab = url=>uni.switchTab({url})
Vue.prototype.$goBack = ()=>uni.navigateBack()

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
