import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app.js'
import im from './modules/im.js'
import random_chat from './modules/random_chat.js'

import config from '@/common/config.js'

import getters from './getters.js'

Vue.use(Vuex)
import user from '@/fake_data/user.js'
import messages from '@/fake_data/messages.js'

const store = new Vuex.Store({
	modules: {		
		app,
		im,
		random_chat
	},
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: !!uni.getStorageSync('token'),
		user:config.fake?user:{
			divide_groups:[],//我的分组（类似于qq的好友）
			groups:[],//我加的群
			friend_groups:[],//我和好友的群（就两个人）
		},
		token:uni.getStorageSync('token')||'',
		fake:config.fake
	},
	mutations: {
		login(state, token) {
			state.token = token ;
			state.hasLogin = true;
		},
		set_user(state,user) {
			state.user = user;
		},
		fake(state,fake) {
			state.fake = fake;
		},
		logout(state) {
			state.hasLogin = false;
		}
	},
	actions:{
		login({commit,state}, { ...params}) {
			return this._vm.$request.post('api.login',{...params}).then(res=>{
				if(res.data.code==0){
					commit('login',res.data.data.token)
					uni.setStorageSync('token',res.data.data.token)
					this.dispatch('getInfo')
				}
				return res;
			})
		},
		getInfo({commit,state}, { ...params}){
			return this._vm.$request.get('api.user.show',{...params}).then(res=>{
				if(res.data.code==0){
					commit('set_user',res.data.data.user)
				}
				return res;
			})
		},
		logout({commit,state}){
			commit('logout')
			commit('set_user',{
				divide_groups:[],
				groups:[],
				friend_groups:[],
			})//清除vuex user
			this.dispatch('im/messages',[])//清除vuex 信息
			this.dispatch('im/socket_open',false) //清除wbsocket状态
			uni.clearStorageSync()
			uni.reLaunch({
				url:'/pages/my/my.vue'
			})
			
		},
		user({commit,state},data){
			commit('set_user',data)
		},
		fake({commit,state},data){
			commit('fake',data)
		},
		initFakeData({commit,state}){
			commit('fake',true)
			commit('set_user',user)
			this.dispatch('im/messages',messages)
		}
	},
	getters
})

export default store
