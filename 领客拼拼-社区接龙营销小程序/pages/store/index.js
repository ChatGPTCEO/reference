import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};

const store = new Vuex.Store({
	state: {
		website:'http://121.37.168.33:9189',
		// website:'http://192.168.31.72:9189',
		merchant:'1',
	},
	mutations: {
		setMerchant(merchant){
			state.merchant = merchant
		}
	}
})

export default store
