<template>
	<view>
		<view class="nav-header" :style="{background:bg,color:color}">
			<view :style="{height:statusHeight + 'px'}"></view>
			<view class="nav-header-title flex alcenter space">
				<view class="nav-title-left flex alcenter">
					<view v-if="back" @click="backAct" class="iconfont icon-fanhui ft18"></view>
				</view>
				<view class="nav-title-center ft16 ftw600">
					{{title}}
				</view>
				<view class="nav-title-right"></view>
			</view>
		</view>
		<view v-if="showH">
			<view :style="{height:statusHeight + 'px'}"></view>
			<view style="height: 44px;"></view>
		</view>
	</view>
</template>

<script>
	let statusHeight = uni.getSystemInfoSync().statusBarHeight;
	export default{
		props:{
			showH:{
				type:Boolean,
				default:true
			},
			title:{
				type:String,
				default:'首页',
			},
			back:{
				type:Boolean,
				default:false
			},
			bg:{
				type:String,
				default:'#FFFFFF',
			},
			color:{
				type:String,
				default:'#000000',
			}
		},
		computed:{
			getLen(){
				let pages = getCurrentPages();
				return pages.length;
			}
		},
		data(){
			return {
				statusHeight:statusHeight
			}
		},
		created(){
		
		},
		methods:{
			backAct(){
				if(this.getLen > 1){
					uni.navigateBack({
						delta:1
					})
				}else{
					uni.reLaunch({
						url:'/pages/index'
					})	
				}
			}
		}
	}
</script>

<style>
	.nav-header{
		position: fixed;
		z-index: 1000;
		width: 100%;
	}
	.nav-header-title{
		height: 44px;
		line-height: 44px;
		width: 100%;
	}
	.nav-title-right{
		width: 150rpx;
	}
	.nav-title-left{
		width: 150rpx;
		padding-left: 24rpx;
	}
</style>