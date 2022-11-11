<template>
	<view class="u-content">
		<u-parse :content="txt"></u-parse>
	</view>
</template>
 
<script>
	
	export default {
		data() {
			return {
				txt:""
			}
		},
		onLoad(e) {
			this.getdata(e.id)
		},
		methods:{
			getdata(id){
				let _self = this;
				uni.$u.http.post('Menu/bydata', {id:id})
					.then(res => {
						console.log(res)
						uni.setNavigationBarTitle({
							title: res.data[0].title
						})
						_self.txt=res.data[0].txt
							
							
					})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
    .u-content {
        padding: 30rpx;
    }
</style>
