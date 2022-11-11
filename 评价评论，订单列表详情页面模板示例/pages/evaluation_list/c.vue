<template>
	<view class="page_liebiao3">
		<view class="kuang">
			<view class="zan" v-for="(item,index) in pro" style="display: flex;">
				<view style="display: flex;">
				<view class="touxiang"><u--image :showLoading="true" shape="circle" :src="item.src" width="40px" height="40px" @click="click"></u--image></view>
			<view style="margin-left: 10px;">
			<view class="name">{{item.name}}</view>
			<view class="riqi" style="font-size: 12px; color: #9c9c9c;margin-top: 5px;">{{item.data}}</view>
			<view  style="display: flex;width: 35vw; margin-top: 20px;">
			<u-icon name="chat"></u-icon>
			<view  style="font-size: 14px;">{{item.sentence}}</view>
			</view>
			</view>
			</view>
			<view class="tupian" ><u-album :urls="pic.piclist" singleSize="130px" ></u-album>
			</view>
			</view>
			</view>
		</view>
</template>

<script>
	export default {
		data(){
			return{
				pro:[{
					src:require('@/tupian/touxiang.jpg'),
					name:"欧先森",
					data:"2029/3/30",
					sentence:'不错哟'
				},
				{
					src:require('@/tupian/touxiang.jpg'),
					name:"欧先森",
					data:"2029/3/30",
					sentence:'不错不错'
				},
				{
					src:require('@/tupian/touxiang.jpg'),
					name:"猫咪",
					data:"2029/06/30",
					sentence:'不错哟'
				}
				],
				pic:{
					count:5,
					require:true,
					piclist:[
					'https://cdn.uviewui.com/uview/album/1.jpg',
				],
				}
				}
				}
				}
</script>

<style lang="scss">
	.page_liebiao3{
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;
		.tupian{
			margin-left: 15px;
			
		}
		.pj{
			margin-left: 40px;
		}
		.zan{
			width: 91vw;
			height: 16vh;
			background-color: #ffffff;
			border-radius: 10px;
			padding-left: 15px;
			padding-top: 20px;
			margin-top: 10px;
		}
		.kuang{
			width: 95vw;
			height: 100vh;
			background-color: #F8F8F8;
			margin-left: 10px;
			padding-top: 10px;
			
		}
		
	}
</style>
