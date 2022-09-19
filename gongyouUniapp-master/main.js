import Vue from 'vue'
import App from './App'
import uview from'uview-ui';
Vue.use(uview);
let mpShare = require('uview-ui/libs/mixin/mpShare.js');

// 配置公共方法
import common from './common/common.js'
Vue.prototype.$noMultipleClicks = common.noMultipleClicks;


Vue.mixin(mpShare);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
