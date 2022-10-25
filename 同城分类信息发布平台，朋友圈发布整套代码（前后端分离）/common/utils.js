
const install = (Vue, vm) => {

	//小程序登录
	const mpLogin = ()=>{
			uni.getUserProfile({
				desc: '登录管理',
				success(profile) {
					uni.login({
						async success(e) {
							e.nickname = profile.userInfo.nickName
							e.avatar = profile.userInfo.avatarUrl
							e.gender = profile.userInfo.gender
							const res = await vm.$u.api.mpLogin(e)
							if (res.code == 1) {
								vm.$u.vuex('vuex_token', res.data.token)
								vm.$u.vuex('vuex_user', res.data)
								uni.showToast({title: res.msg})
							}else{
								vm.$u.toast(res.msg)
							}
						}
					})
				},
				fail() {
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
			})
	}
	// 判断是否登录
	const isLogin = () => {
		if (!vm.vuex_token) {
			uni.showModal({
				title: '提示',
				content: '请登录后操作',
				confirmText: '登录',
				success(res) {
					if (res.confirm) {
						//#ifdef H5
						vm.$u.route('/pages/user/login')
						//#endif
						//#ifdef MP-WEIXIN
						 mpLogin()
						//#endif 
						} 
					 if (res.cancel) {
						uni.switchTab({
							url:'/pages/index/index'
						})
					}
				}
			})
		}
		//#ifdef MP-WEIXIN
			uni.checkSession({
				fail() {
					vm.$u.vuex('vuex_token', null)
					vm.$u.vuex('vuex_user', {})
				}
			})
		//#endif
	}
	// 图片字符串转换为数组
	const strToarr = (images) => {
		var arr = images.split(',');
		arr.forEach((item, index) => {
			arr[index] = vm.$u.http.config.baseUrl + item
		})
		return arr;
	}
	//更新用户信息
	const updateUser = async ()=>{
		const res = await vm.$u.api.userInfo();
		// 缓存用户信息
		vm.$u.vuex('vuex_user',res.data)
	}
	//获取未读消息数
	const unreadCount = async (type)=>{
		const res = await vm.$u.api.message({type:type,page:0})
		var unread = res.data.total.filter(val=>{
			return val.status==0
		})
		if (unread.length > 0) {
			getApp().globalData.unread =unread.length
			uni.setTabBarBadge({
				index: 3,
				text: unread.length.toString()
			})
		}
		if(type==2){
			return res.data.limit
		}
	}
	
	Vue.prototype.utils = {
		mpLogin,
		isLogin,
		strToarr,
		updateUser,
		unreadCount
	}
}
export default {
	install
}
