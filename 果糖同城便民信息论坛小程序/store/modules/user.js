export default {
	state: {
		isLogin: false,
		userInfo: null,
	},
	getters: {

	},
	mutations: {
		setUserInfo(state, data) {
			state.userInfo = data
		},
		setLogin(state, data) {
			state.isLogin = data
		},
	},
	actions: {
		loginOut({
			commit
		}) {
			commit('setLogin', false);
			commit('setUserInfo', null);
			uni.removeStorageSync('token');
			uni.removeStorageSync('userInfo');
		},
		login({
			commit
		}, userInfo) {
			commit('setLogin', true);
			commit('setUserInfo', userInfo);
			uni.setStorageSync('token', userInfo.token);
			uni.setStorageSync('userInfo', userInfo);
		},
		upUserInfo({
			commit
		}, userInfo) {
			commit('setUserInfo', userInfo);
			uni.setStorageSync('userInfo', userInfo);
		}
	}
}
