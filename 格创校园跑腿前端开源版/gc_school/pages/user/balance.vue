<template>
	<scroll-view scroll-y class="scrollPage">
	    <cu-custom bgColor="bgmain" :isBack="true">
	        <view slot="content">余额</view>
	    </cu-custom>
		
		<view class="padding-lg padding-bottom-sm" style="position: relative;">
			<image src="../../../static/images/user/balance-bg.png" mode="widthFix"></image>
			<view class="text-white content">
				<view class="text-lg30">可用余额</view>
				<view class="text-bold" style="font-size: 75rpx;">{{userInfo.balance}}</view>
				<view class="flex justify-between margin-top" style="width: 80%;">
					<view>
						<view class="text-lg30">昨日收入</view>
						<view class="text-xl">{{userInfo.yesterday}}</view>
					</view>
					<view>
						<view class="text-lg30">总收入</view>
						<view class="text-xl">{{userInfo.brokerage}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white margin-lg flex align-center justify-between padding border-radius20" @click="link('/gc_school/pages/user/accountlog')">
			<view class="text-lg text-black">余额明细</view>
			<text class="cuIcon-right text-gray"></text>
		</view>
		<view class="bg-white margin-lg flex align-center justify-between padding border-radius20" @click="link('/gc_school/pages/replay/index')">
			<view class="text-lg text-black">余额提现</view>
			<text class="cuIcon-right text-gray"></text>
		</view>
		
	</scroll-view>
</template>

<script>
	var app = getApp();
	export default {
	    data() {
	        return {
				userInfo:{}
			}
		},
		onLoad() {
			if (uni.getStorageSync('token')) {
			    this.getUser();
			}
		},
		methods:{
			link(url)
			{
				uni.navigateTo({
					url:url
				})
			},
			getUser() {
			    const self = this;
			    app.globalData.util.request({
			        url: 'WechatUser/view',
			        data: {
			            s_id: uni.getStorageSync('schoolId')
			        },
			        success(res) {
						console.log(res.data.data)
						self.userInfo = res.data.data
			        }
			    },true);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F5F6;
	}
	.bgmain{
		background-color: white;
		color: black;
	}
	.content{
		position: absolute;
		top: 20%;
		left: 10%;
		width: 80%;
	}
	.text-lg30{
		opacity: 0.9;
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}
	.border-radius20{
		border-radius: 20rpx;
	}
</style>
