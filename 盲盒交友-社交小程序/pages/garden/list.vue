<template>
	<view class="list-box">
		<view class="bode_y" v-for="(item,index) in listData" :key="index">
			<image :src="item.ioc" mode="widthFix" class="huodong" @click="yian({item})"></image>
		</view>
		<view v-if="listData.length==0">
			<u-empty
			        mode="history"
			        icon="http://cdn.uviewui.com/uview/empty/history.png"
			>
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData:[]
			}
		},
		onShow() {
			console.log('组件加载') 
			this.getlist();
		},
		methods: {
			yian(itme){
				const userInfo = uni.getStorageSync('userInfo');
				if (userInfo) {
					uni.$u.route({
						url: "/pages/garden/details?id="+itme.item.id
					})
						
				}else{
					uni.$u.toast('未登录')
				}
				
				
			},
			getlist(){
				uni.$u.http.post('Chat/homeList',{})
				 .then(res => {
					// console.log(res)
					this.listData=res.data
				})
			},
			
			
		},
		
	}
</script>

<style>
	.list-box{
		margin-top: 20rpx;
	}
	.bode_y{
		padding: 10rpx 20rpx;
	}
	.huodong{
		width: 100%;
		border-radius: 15rpx;
		box-shadow: 10rpx 10rpx 20rpx #bababa;
	}
</style>
