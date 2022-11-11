<template>
	<!-- 快讯详情 -->
	<view class="xq_view_big">
		<view class="cont">
			<view class="" v-html="listdataxc.contents"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listdataxc:{},	
			}
		},
		onLoad() {
			
		},
		created() {
			this.$u.post('/Operate/xxData', {})
			.then( res =>{
				if(res.code ==200){
					this.listdataxc = res.data
					// console.log(this.listdataxc)
				}
			})		
		},
		methods:{
			
			
		}
	}
</script>

<style lang="scss" scoped>
.contitele{
	display: flex;
	justify-content: center;
}
.cont{
	width: 90%;
	margin-left: 5%;
	margin-top: 20rpx;
}
</style>
