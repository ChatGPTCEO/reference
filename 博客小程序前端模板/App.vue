<script>
	import userApi from '@/api/userApi.js'
	import myCache from '@/utils/myCache.js'
	export default {
		onLaunch: function() {
			console.log('App Launch======================================')
		},
		onShow: function() {
			let userToken = myCache.cache("userToken")
			if (userToken) {
				this.getUserInfo()
			}
		},
		onHide: function() {
			console.log('App Hide======================================')
		},
		methods: {
			async getUserInfo() {
				let res = await userApi.getUserInfoByToken()
				if (res.data) {
					this.globalData.isLogin = true
					this.globalData.userInfo = res.data
				}
			}
		},
		globalData: {
			systemInfo: null,
			isLogin: false,
			userInfo: {}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "@/common/base.css";
</style>
