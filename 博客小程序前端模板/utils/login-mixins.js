import loginApi from '../api/loginApi.js'

export const loginMix = {
	created() {
		this.initWxUser()
	},
	data() {
		return {
			isLogin: false,
			hasTel: false,
			wxUserInfo: {}
		}
	},
	methods: {
		initWxUser() {
			let userInfo = getApp().globalData.wxUserInfo
			if (userInfo.id) {
				this.wxUserInfo = userInfo
				this.isLogin = true
				if (userInfo.tel) {
					this.hasTel = true
				}
			}
		},
		getUserProfile(e) {
			uni.getUserProfile({
				desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: (res) => {
					this.wxLogin(res);
				}
			})
		},
		wxLogin(data) {
			let that = this
			let callBack = {}
			callBack.encryptedData = data.encryptedData
			callBack.iv = data.iv
			callBack.success = (res) => {
				console.log(res)
				let userInfo = {}
				userInfo.id = res.id
				userInfo.wechatAvatar = res.wechatAvatar
				userInfo.tel = res.tel
				userInfo.nickName = res.nickName
				that.wxUserInfo = userInfo
				that.isLogin = true
				let app = getApp()
				app.globalData.isLogin = true
				app.globalData.wxUserInfo = userInfo
				if (userInfo.tel) {
					that.hasTel = true
					app.globalData.hasTel = true
				}
			}
			loginApi.decodeWxUserInfo(callBack)
		}
	}
}
