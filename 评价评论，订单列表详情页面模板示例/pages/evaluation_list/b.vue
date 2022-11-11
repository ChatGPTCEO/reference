<template>
	<view class="page_liebiao2">
		<view class="kuang">
			<view class="pinglun" v-for="(item,index) in pro" >
				<view style="display: flex;">
				<view class="touxiang">
					<u--image :showLoading="true" shape="circle" :src="item.img" width="40px" height="40px" @click="click">
					</u--image>
				</view>
				<view class="name">{{item.name}}</view>
				<view class="shijian">{{item.data}}</view>
			</view>
			<view class="shangpin" >{{item.title}}</view>
			<view class="yuju">{{item.yuju}}</view>
			<view style="display: flex;justify-content: space-around;">
			<view class="tupian" ><u-album :urls="pic.piclist" multipleSize="115px"   ></u-album>
			</view>
			</view>
			<view class="tubiao" style="display: flex;">
				<u-icon name="thumb-up" size="25"></u-icon>
				<view>{{item.other}}</view>
			</view>
			</view>
			
		</view>
		  
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				pro:[{
					img:require('@/tupian/touxiang.jpg'),
					name:"猫咪",
					title:"款式:标配+1锂电池",
					yuju:"质量很好，好玩，非常适合小朋友",
					data:'2021-12-06',
					other:'6'
				},
				{
					img:require('@/tupian/touxiang.jpg'),
					name:"秩序册",
					title:"款式:标配+1锂电池",
					yuju:"飞机很好,飞超级高",
					other:'1',
					data:'2021-06-08'
				}
				],
				pic:{
					count:5,
					require:true,
					piclist:[
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/1.jpg',
					]
				}
				
				
			}
		},

	}
</script>

<style lang="scss">
	 
	
	
	
	.page_liebiao2 {
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;
		.tubiao{
			margin-left: 80%;
			margin-top: 10px;
		}
		.shijian{
			font-size: 10px;
			margin-top: 10px;
			color: #808080;
		}
		.tupian{
			margin-top: 10px;
			margin-left: -40px;
		}
		.yuju{
			margin-top: 10px;
			font-size: 15px;
		}
		.shangpin{
			margin-top: 10px;
			font-size: 12px;
			color: #909090;
		}
		.name{
			margin-top: 10px;
			margin-left: 10px;
			width: 60vw;
		}
		.pinglun {
			width: 100vw;
			height: 40vh;
			background-color: #ffffff;
			padding-left: 20px;
			padding-top: 10px;
			margin-top: 10px;
		}
		
		.kuang {
			width: 100vw;
			height: 100vh;
			background-color: #e8e8e8;
		}
	}
</style>
