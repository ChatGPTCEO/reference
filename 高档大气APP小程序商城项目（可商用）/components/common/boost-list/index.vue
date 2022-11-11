<template>
	<view>
		<view class="help-item bg-white flex-1" v-for="(item, index) in boostlist" :key="index"  @click="toProduct(item)">
			<view class="help-item-bg pt-1">
				<view class="box-img">
					
					<image :src="item.img.img" class="help-img" mode="aspectFill"></image>
					<view class="help-price-box text-white row-a-j-fc">
					     <view class="font-s-3 font-w">助力到手价</view>
						 <view class="font-s-6 font-w">{{ item.boostPrice | num1Filter }}<text class="font-s-1 ml-1">元</text></view>
					</view>
				</view>
				<view class="mx-1 flex-1 product-name font-s-6 font-w in1line my-2">{{ item.productName }}</view>
				<view class="product-price font-s-7 font-w ml-2"><text class="font-s-2">￥</text>{{ item.price }}</view>
				<view class="mx-2 flex-1 d-f justify-between align-end">
					<view class="font-s-4 font-w" style="color: #EF2D23;">结束时间:{{ item.activityAfter }}</view>
					<view class="launch-help row text-white" v-if="item.isUsed">已发起</view>
					<view class="launch-help row text-white" v-else>发起助力</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'boostcenterList',
		data(){
			return{

			}
		},
		props:{
			boostlist: {
				item:Object,
				type: Array,
				default() {
					return []
				}
			}
		},
		filters: {
			numFilter(value) {
				let realVal = parseFloat(value).toFixed(0);
				return realVal;
			},
			num1Filter(value) {
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		methods:{
			// 跳转到商品详情页
			toProduct(boostInfo) {
				if(boostInfo.isUsed){
					uni.navigateTo({
						url: `/pages/boost/boost-launch-detail?boostId=${boostInfo.boostInitiateId}`
					});
				}else {
					uni.navigateTo({
						url: `/pages/product/product?pageStatus=boost&boostId=${boostInfo.id}`
					});
				}

			},
		}
	}
</script>

<style lang="scss">
	.help-item{

		.help-item-bg{
			width: 660rpx;
			height: 610rpx;
			margin: 0 25rpx 5rpx 25rpx;
			.box-img{
				width: 650rpx;
				height: 368rpx;
				border: 5rpx #EF2D23 solid;
				border-radius: 10rpx;
				.help-img{
					width: 650rpx;
					height: 368rpx;
					border-radius: 10rpx;
					position: absolute;
				}
				.help-price-box{
					width: 170rpx;
					height: 100rpx;
					background-color:  #EF2D23;
					position: relative;
					z-index: 1;
					border-radius: 0 0 15rpx 0;
					view{
						line-height: 1.2;
					}
				}
			}
			.product-name{
				height: 46rpx;
			}
			.product-price{
				color: #EF2D23;
			}
			.launch-help{
				width: 150rpx;
				height: 62rpx;
				border-radius: 31rpx;
				background-color: #EF2D23;
			}
		}

	}
</style>
