import App from './App';
import * as filters from './we7/resource/js/filters.js'// * as必须携带

// Api函数polyfill（目前为实验版本，如不需要，可删除！）';
import Polyfill from './polyfill/polyfill';
Polyfill.init();

// 全局mixins，用于实现setData等功能，请勿删除！';
import Mixin from './polyfill/mixins';
import main from './middleware/main'
import footer from '@/components/footer/footer'
Vue.component('pt-footer', footer)
// #ifndef VUE3
import Vue from 'vue';

// Vue.prototype.color = '#FF6444';

// Vue.prototype.configInfo =main


Vue.mixin(Mixin);
Vue.config.productionTip = false;
App.mpType = 'app';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const app = new Vue({
    ...App
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
    const app = createSSRApp(App);
    app.mixin(Mixin);
    return {
        app
    };
}
// #endif
