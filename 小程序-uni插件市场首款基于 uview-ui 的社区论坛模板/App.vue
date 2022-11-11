<script>
	export default {
			data() {
			  return {
				  openid:null,
				  user:null,
				  userInfo:null,
				  shopInfo:null,
				  spread:null,
				  src:0,
				  innerAudioContext:null,
			  } 
			 },
			onLaunch: function() {
				console.log('App Launch')
				
			},
			onShow: function() {
				
			},
			onHide: function() {
				console.log('App Hide')
			},
			
			playVoice(url,e) {
				
				
			},
		
		// 此处globalData为了演示其作用，不是uView框架的一部分
		globalData: {
			username: '商场'
		},
	
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "common/demo.scss";
</style>