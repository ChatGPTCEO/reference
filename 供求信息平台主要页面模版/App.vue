<script>
	import Vue from 'vue'	
	export default {
		onLaunch: function(e) {
			const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
			if(extConfig.b2bId){
				this.$config.b2bId = extConfig.b2bId;
			}		
			uni.getLocation({
				success:(res)=>{
					let param = {
						lat : res.latitude,
						lng :  res.longitude
					};
					this.$store.commit('setLocation',param);
				},
				fail:()=>{
				}
			});
		},
		onShow: function() {
			
		},
		onHide: function() {
			
			
		}
	}
</script>

<style>
	@import url("./static/css/common.css");
</style>
