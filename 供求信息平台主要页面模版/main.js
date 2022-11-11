import Vue from 'vue'
import App from './App'
import store from './static/js/store/store.js';
import config from './static/js/config.js';
Vue.prototype.$config = config;
import http from './static/js/request.js';
Vue.prototype.$http  = http;

//权限相关的判断
import {common} from './static/js/mixin/common.js';
Vue.mixin(common);


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()