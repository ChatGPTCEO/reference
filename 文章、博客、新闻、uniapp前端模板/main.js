import Vue from 'vue'
import App from './App'

import * as Api from './config/api.js'
import * as Common from './config/common.js'
import * as Db from './config/db.js'

Vue.config.productionTip = false

Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
