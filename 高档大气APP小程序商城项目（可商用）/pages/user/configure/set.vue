<template>
	<view class="w-100 bg-white">
		<view class="ml-2 mr-2 border-bottom flex-1 row-ac-sb pt-3 pb-3" v-for="(item,index) in setList" :key="index" @click="toSet(item.url)">
			<view class="">{{ item.title }}</view>
			<view class="iconfont icon-xiangxia font-s-4 text-light-grey"></view>
		</view>
		<view class="mt-5 row" @click="logout">
			<view class="row bg-color font-s-5 rounded " style="width: 360rpx;height: 90rpx;">退出登陆</view>
		</view>
	</view>
</template>

<script>
import { logout } from '@/api/index';
import {mapState} from 'vuex';

export default{
	data(){
		return{
			setList:this.$Management.setList
		}
	},
	methods:{
		logout(){
			uni.showModal({
				content: '是否要退出登陆',
				success: res => {
					if (res.confirm) {
						// 从缓存中移除用户信息
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');
						uni.removeStorageSync('distributionUserCenterInfo');
						uni.removeStorageSync('distributionUserInfo');
						uni.removeStorageSync('defaultAddress');
						uni.removeStorageSync('weChatOpenId');
						this.$store.commit('setUserToken','')
						// vuex中的收货地址也清空

						uni.navigateBack({
							delta: 1
						});
						uni.showToast({
							title: '退出登陆成功'
						});
					}
				}
			});
		},
		toSet(url){
			uni.navigateTo({
				url
			});
		}
	}

}
</script>

<style>
</style>
