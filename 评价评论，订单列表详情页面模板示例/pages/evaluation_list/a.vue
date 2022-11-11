<template>
	<view class="page_liebiao1">

		<view class="yonghu" v-for="(item,index) in pro">
			<view style="display: flex;">
				<view class="touxiang">
					<u--image :showLoading="true" shape="circle" :src="item.src" width="40px" height="40px"
						@click="clickImg"></u--image>
				</view>
				<view class="name">{{item.title}}</view>
				<view class="biaoqian">
					<u--image :src="item.img" width="20px" height="20px"></u--image>
				</view>
				<view class="shijian">{{item.other}}</view>
			</view>
			<view class="pingfen" style="display: flex;">
				<start :count="item.count" active-color="#ff0000" size="18" v-model="item.value"></start>
				<view style="font-size: 10px;margin-left: 10px; color: #808080;">
					{{item.content}}
				</view>
			</view>
			<view style="margin-top: 5px;margin-left: 15px;">{{item.content1}}</view>
			<view style="margin-left: 85%;display: flex;">{{item.content2}}
				<u-icon name="thumb-up" size="20"></u-icon>
			</view>
		</view>
		<view class="yonghu1" v-for="(item,index) in pro1">
			<view style="display: flex;">
				<view class="touxiang">
					<u--image :showLoading="true" shape="circle" :src="item.src" width="40px" height="40px"
						@click="click"></u--image>
				</view>
				<view class="name">{{item.title1}}</view>
				<view class="biaoqian" v-for="(item,index) in pro1">
					<u--image :src="item.img" width="20px" height="20px"></u--image>
				</view>
				<view class="shijian" >{{item.other}}</view>
			</view>
			<view class="pingfen" style="display: flex;">
				<start :count="item.count" active-color="#ff0000" size="18" v-model="item.value"></start>
				<view style="font-size: 10px;margin-left: 10px; color: #808080;">
					{{item.content1}}
				</view>
			</view>
			<view style="margin-top: 5px;margin-left: 15px;">{{item.content3}}</view>

			<view class="tupian">
				<u-album :urls="pic.piclist" multipleSize="100px"></u-album>
			</view>
			<view style="margin-left: 85%;display: flex;margin-top: 15px;">{{item.content4}}
				<u-icon name="thumb-up" size="20"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import start from '../../common/components/uni-rate.vue'
	export default {
		components: {
			start
		},
		data() {
			return {
				pro: [{
						src: require('@/tupian/touxiang.jpg'),
						img: require('@/tupian/svip.png'),
						title: "猫咪不见了",
						value: 0,
						count: 5,
						content: " [黑椒酸辣汤 36g]",
						content1: "太慢",
						content2: 0,
						other: "2021-11-23"
					},
					{
						src: require('@/tupian/touxiang.jpg'),
						img: require('@/tupian/svip.png'),
						title: "猫咪不见了",
						value: 0,
						count: 5,
						content: "[黑椒酸辣汤 36g]",
						content1: "飞快",
						content2: 5,
						other: "2021-11-02"
					}
				],
				pro1: [{
					src: require('@/tupian/touxiang.jpg'),
					img: require('@/tupian/svip.png'),
					title1: "猫咪12321",
					value: 0,
					count: 5,
					content1: "[香菇鸡茸汤 41g]",
					content3: "一般",
					content4: 5,
					other: "2021-11-15",
				}],
				pic: {
					count: 5,
					require: true,
					piclist: [
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/1.jpg',
					],
				}

			}
		},
		methods: {
			clickImg() {
				wx.previewImage({
					urls: ['https://cdn.uviewui.com/uview/album/1.jpg'],
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			}
		}

	}
</script>

<style lang="scss">
	.page_liebiao1 {
		width: 100vw;
		height: 100vh;
		background-color: #e8e8e8;
		padding-top: 1px;

		.tupian {
			margin-top: 20px;
			margin-left: 10px;
		}

		.shijian {
			font-size: 10px;
			
			margin-top: 10px;
			color: #808080;
		}

		.pingfen {
			margin-top: 10px;
			padding-left: 10px;
		}

		.biaoqian {
			margin-top: 5px;
			padding-left: 5px;
			width: 40%;
		}

		.name {
			margin-top: 10px;
			padding-left: 10px;

		}

		.yonghu {
			width: 93vw;
			height: 18vh;
			background-color: #ffffff;
			border-radius: 10px;
			padding-top: 10px;
			padding-left: 17px;
			margin-left: 4px;
			margin-top: 10px;

		}

		.yonghu1 {
			width: 93vw;
			height: 39vh;
			background-color: #ffffff;
			border-radius: 10px;
			margin-top: 10px;
			padding-left: 19px;
			padding-top: 20px;
			margin-left: 3.5px;
		}
	}
</style>
