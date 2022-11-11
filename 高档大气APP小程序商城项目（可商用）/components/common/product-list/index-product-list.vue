<template>
	<view class="category-like row-af-js-fw" >
		<view class="goods-list">
			<view class="cate-like" v-for="(item,index) in goodsList.leftArr" :key="index" @click="toProduct(item)">
				<image :src="item.slide_list.img" class="cate-like" lazy-load></image>
				<view class="cate-text in2line mx-2 flex-1 font-s-4">{{ item.title }}</view>
				<view class="cate-item row-ac mt-2 mx-2 flex-1">
					<view class="cate-price font-w font-s-6"><text class="font-s-1">￥</text>{{item.price | numFilter }}</view>
					<view class="cate-tariff font-s-1 ml-2">原价￥{{item.marketPrice || item.market_price | numFilter }}</view>
				</view>
                <!-- <view v-if="item.grade_price || item.gradePrice">会员价{{item.grade_price || item.gradePrice}}</view> -->
			</view>
		</view>
		<view class="goods-list">
			<view class="cate-like" v-for="(item,index) in goodsList.rightArr" :key="index" @click="toProduct(item)">
				<image :src="item.slide_list.img" class="cate-like" lazy-load></image>
				<view class="cate-text in2line mx-2 flex-1 font-s-4">{{ item.title }}</view>
				<view class="cate-item row-ac mt-2 mx-2 flex-1">
					<view class="cate-price font-w font-s-6 "><text class="font-s-1">￥</text>{{item.price | numFilter }}</view>
					<view class="cate-tariff font-s-1 ml-2">原价￥{{item.marketPrice || item.market_price | numFilter }}</view>
				</view>
               <!-- <view v-if="item.grade_price || item.gradePrice">会员价{{item.grade_price || item.gradePrice}}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'productList',
		data(){
			return{

			}
		},
		props:{
			list: {
				item:Object,
				type: Array,
				default() {
					return []
				}
			}
		},
		filters: {
			numFilter(value) {
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		methods:{
			toProduct(item){
				if(item.productId){
					uni.navigateTo({
						url: '/pages/product/product?productId='+item.productId
					});
				}else {
					uni.navigateTo({
						url: '/pages/product/product?productId='+item.id
					});
				}

			},
			// 把商品列表分割成两份，用作瀑布流
			waterfallFlow (arr) {
			  if (arr.length <= 0) {
			    return false
			  }
				let allArr={
					leftArr:[],
					rightArr:[]
				}
			  let leftArr = []
			  arr.forEach((item,index)=>{
					if(index%2==0){
						allArr.leftArr.push(item)
					}else{
						allArr.rightArr.push(item)
					}
				})
			  return allArr
			}
		},
		computed:{
			goodsList(){
				let allArr = this.waterfallFlow(this.list)
				return allArr
			}
		},

	}
</script>

<style lang="scss">
	.category-like{
		width: 710rpx;
		margin: 0 20rpx;
		.cate-like{
			position: relative;
			width: 346rpx;
			height: 550rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			margin-bottom: 15rpx;
			image{
				height: 346rpx;
				width: 346rpx;
				border-radius: 12rpx 12rpx 0 0;
			}
			.cate-text{
				height: 78rpx;
			}
			.cate-item{
				.cate-price{
					color: #f83434;
				}
				.cate-tariff{
					color: #676767;
					text-decoration: line-through;
				}
			}
			.cate-comment{
				margin-top: 8rpx;
				margin-left: 14rpx;
				font-size: 24rpx;
				color: #676767;
			}

		}
	}
</style>
