<template>
	<view>
		<view class="py-2 flex-1 row-ac mx-3">
			<view class="iconfont icon-zanmianxing" style="color: #f1a541;font-size: 40rpx;"></view>
			<view class="font-s-7 font-w ml-1">精品<text class="" style="color: #ec7348;">推荐</text></view>
		</view>
		<view class="selected-list row-af-js-fw">
			<view class="selected-item" v-for="(item,index) in recommendList" :key="index" @click="toProduct(item.id)">
				<view class="product-img-box mx-2 my-2">
					<image :src="item.slide_list.img" mode="" class="product-img"></image>
				</view>
				<view class="mx-3 flex-1 product-title in1line font-s-4 font-w">{{ item.title }}</view>
				<view class="text-light-grey font-s-2 mx-3 flex-1 in1line product-promotion">{{ item.promotion }}</view>
				<view class="product-price font-s-5 ml-3 mt-2"><text class="font-s-2">￥</text>{{ item.price }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { recommendGoods } from '@/api/index.js'
	
	export default {
		components: {
			
		},
		 filters: {},
		data(){
			return{
				recommendList:[],
				queryInfo:{
					size: 10,
					page: 1,
					field: '',
					desc: ''
				},
				recommendTotal: 0,
			}
		},
		onLoad() {
		  this.initData()
		},
		// 上划加载
		onReachBottom() {
		  this.onReachBottomHandle();
		},
		methods:{
			initData() {
			  this.getRecommend();
			},
			// 上滑加载
			onReachBottomHandle() {
			  if (this.recommendTotal != this.recommendList.length) {
			    this.queryInfo.page++;
			    this.getRecommend();
			  }
			},
			getRecommend() {
			  this.$R.get(recommendGoods, this.queryInfo)
			    .then((res) => {
			      this.recommendList = [...this.recommendList, ...res.data.list]
			      this.recommendTotal = res.data.total
			    })
			},
			toProduct(productId) {
			  uni.navigateTo({
			    url: '/pages/product/product?productId=' + productId,
			  });
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f8fb;
	}
	.selected-list{
		width: 710rpx;
		margin: 0 20rpx;
		.selected-item{
			width: 346rpx;
			height: 498rpx;
			background-color: #FFFFFF;
			border-radius: 23rpx;
			margin-bottom: 18rpx;
			.product-img-box{
				width: 306rpx;
				height: 306rpx;
				border-radius: 23rpx;
				background-color: #f6fafd;
				.product-img{
					width: 306rpx;
					height: 306rpx;
					border-radius: 23rpx;
				}
			}
			.product-title{
				height: 36rpx;
			}
			.product-promotion{
				height: 30rpx;
			}
			.product-price{
				color: #e5553c;
			}
		}
	}
</style>
