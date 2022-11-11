import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state() {
		return {
			token: '',
			baseInfo: {},
			userInfo: {},
			hasLogin: false
		}
	},
	getters: {},
	mutations: {
		/**
		 * 写入网站信息
		 */
		writeBaseInfo(state, info) {
			state.baseInfo = info
		},
		/**
		 * 写入用户信息
		 * @param {Object} info 
		 */
		writeInfo(state, info) {
			state.userInfo = info
		},
		/**
		 * 登录
		 * @param {String} token
		 */
		login(state, token) {
			state.token = token
			state.hasLogin = true
			uni.setStorage({
				key: 'token',
				data: token
			})
		},
		// 退出登录
		logOut(state) {
			state.token = ''
			state.userInfo = {}
			state.hasLogin = false
			uni.removeStorage({
				key: 'token'
			})
		}
	},
	actions: {}
})

export default store
