<script>
	export default {
		onLaunch: function() {
			console.log("我是app.vue")			
			if (this.$Common.isLogin()) {
			  let sender = uni.getStorageSync("sender");
			  console.log(sender)
			  if (sender) {
				this.$store.commit("setPropName", {
					propName: 'sender',
					value: JSON.parse(sender)
				});
				
			  }
			  this.$Common.reLaunch("/chatSession/chatSession");
			}else{
				this.$Common.redirectTo("/index/index");
			}
			
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("@/static/iconfont/iconfont.css");
	@import url("@/static/css/common.css");
</style>
