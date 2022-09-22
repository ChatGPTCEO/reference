<script>
	import API from '@/api/api.js'
	export default {
		globalData: {
			user: '',
			templates:'',
			bloginfo:'',
			
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.globalData.user = API.getUser();
			if (uni.getStorageSync('templates')) {
				this.globalData.templates = uni.getStorageSync('templates');
			}
			if (uni.getStorageSync('bloginfo')) {
				this.globalData.bloginfo = uni.getStorageSync('bloginfo');
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
