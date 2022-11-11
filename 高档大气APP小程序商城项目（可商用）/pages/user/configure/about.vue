<template>
	<view class="row flex-column ">
		
		<image :src="shopConfig.app_logo" class="app-logo py-3" style="margin-top: 150rpx;" mode=""></image>
		<view class="font-s-5 p-5" >
			{{ shopConfig.introduce}}
		</view>
		<view class="font-s-3 text-muted" style="padding-top: 350rpx;">{{ shopConfig.copyright }}</view>
		<view class="font-s-3 text-muted mt-1">ICP证：{{ shopConfig.record_number }}</view>
	</view>
</template>

<script>
	import { getConfigUrl } from '@/api/index'
	
	export default {
		data(){
			return{
				shopConfig:''
			}
		},
		onLoad(){
			this.initData();
		},
		methods:{
			initData(){
				this.getConfig();
			},
			getConfig(){
				this.$R.get(getConfigUrl).then(res =>{
					this.shopConfig = res.data;
				})
			}
		}
	}
</script>

<style>
	.app-logo{
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
</style>
