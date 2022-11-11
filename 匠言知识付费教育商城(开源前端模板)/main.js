/**
 * 匠言知识付费v2.0.0
 * Author: 山西匠言网络科技有限公司
 * 这不是一个免费软件，它受限于许可条款，你可以访问https://www.zsfzxkc.cn/获取更多详细信息。
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
import Vue from 'vue'
import App from './App'
// #ifdef H5
import jwx from '@/request/jwx.js'
Vue.prototype.$jwx = jwx
// #endif
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
