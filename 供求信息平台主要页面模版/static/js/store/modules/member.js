const state = {
  member: uni.getStorageSync('member-info') ? uni.getStorageSync('member-info') : null, //数据缓存 在 登录后更新 在要支付的地方 重新加载
  mToken:uni.getStorageSync('member-token') ? uni.getStorageSync('member-token') : null,
  parentId:0,	
};
const mutations = {
	setParentId(state,param){
		state.parentId = param;
	},
	setMember(state,param){
		state.member = param;
		if(null === param){
			uni.removeStorageSync('member-token');
			uni.removeStorageSync('member-info');
			state.mToken = null;
		}else{
			uni.setStorageSync('member-info',param);
		}
	},
	setToken(state,param){
		state.mToken = param;
		uni.setStorageSync('member-token',param);
	},
	updateMember(state,param){
		let member = state.member;
		state.member = Object.assign(member,param);
		uni.setStorageSync('member-info',state.member);
	},
	
};
export default {
  state,
  mutations
}