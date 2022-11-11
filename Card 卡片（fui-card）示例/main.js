
import App from './App'
import fui from './common/fui-app'

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
Vue.prototype.fui = fui

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.fui = fui;
	return {
		app
	}
}
// #endif