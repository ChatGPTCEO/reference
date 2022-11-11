<template>
	<!-- 快讯详情 -->
	<view class="xq_view_big">
		<view class="contitele">
			<text style="font-weight: bold;font-size: 16px;">{{listdatakx.title}}</text>
		</view>
		<view class="cont">
			<view class="" v-html="listdatakx.contents"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listdatakx:{},	
			}
		},
		onLoad() {
			
		},
		created() {
			this.$u.post('/Operate/zxData', {})
			.then( res =>{
				if(res.code ==200){
					this.listdatakx = res.data
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
