import Vue from 'vue'
import App from '@/App.vue'
import uView from 'uview-ui'
import store from '@/store'

Vue.config.productionTip = false
Vue.use(uView)
Vue.prototype.$store = store
new App(store).$mount()
