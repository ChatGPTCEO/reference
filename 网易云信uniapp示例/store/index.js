import Vue from 'vue'
import Vuex from 'vuex'
import im from './modules/im'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    provider: 'weixin',
    hasLogin: false,


  },
  mutations: {
    login(state) {
      state.hasLogin = true;
      uni.setStorageSync('hasLogin', true);
    },
    logout(state) {
      state.hasLogin = false
      state.userInfo = {}
    },

  },
  actions: {

  },
  modules: {
    im
  }
})

export default store