import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
//注册全局组件
import zhouWeiNavBar from "@/components/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);

const app = new Vue({
    ...App
})
app.$mount()
