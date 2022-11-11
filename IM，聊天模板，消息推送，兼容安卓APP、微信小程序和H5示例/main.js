import Vue from 'vue'
import App from './App'
import Api from 'static/js/api.js'
import Util from 'static/js/util.js'
import Validate from 'static/js/validate.js'
import XBCIM from 'plugins/xbcim_sdk_1.0.0.min.js'

Vue.config.productionTip = false
Vue.prototype.$api = Api
Vue.prototype.$util = Util
Vue.prototype.$xbcim = XBCIM
Vue.prototype.$validate = Validate
Vue.prototype.goBack = ()=>{uni.navigateBack()}
Vue.prototype.toPage = (url)=>{uni.navigateTo({url})}
Vue.prototype.toTab = (url)=>{uni.switchTab({url})}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
