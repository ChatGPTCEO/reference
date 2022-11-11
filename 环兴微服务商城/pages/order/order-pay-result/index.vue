<template>
	<z-paging ref="paging" v-model="goodsList" @query="getGoodsList">
		<cu-custom slot="top" :isBack="false" bgColor="bg-red">
			<block slot="backText">返回</block>
			<block slot="content">支付结果</block>
		</cu-custom>
		<view class="margin-sm">
			<!-- v-if="orderInfo.payStatus == '1'" -->
			<view class="solids-bottom padding-xs flex align-center bg-white radius">
				<view class="flex-sub text-center">
					<view class="text-xsl">
						<text class="cuIcon-roundcheckfill text-green"></text>
					</view>
					<view class="padding">支付成功</view>
				</view>
			</view>
			<view class="cu-bar bg-white " style="min-height: 80rpx;">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 支付金额
				</view>
				<view class="action">
					<view class="text-red text-price text-xl">{{orderInfo.payPrice}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white " style="min-height: 80rpx;">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 订单编号
				</view>
				<view class="action">
					<view class="text-black text-price">{{orderInfo.orderNo}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white " style="min-height: 80rpx;">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 创建时间
				</view>
				<view class="action">
					<view class="text-black text-price">{{orderInfo.createTime}}</view>
				</view>
			</view>
			<view>
				<button class="cu-btn  block margin-sm  bottom-btn bg-red" @tap="orderDetailSub">查看订单</button>
				<button class="cu-btn  block margin-sm  bottom-btn line-gray" @tap="homeSub">返回首页</button>
			</view>
		</view>
		<view>
			<text class="flex justify-center align-center text-red text-xl text-bold margin-top-xl">商品推荐</text>
		</view>
		<goods-list :goodsList="goodsList"></goods-list>
	</z-paging>
</template>

<script>
	import GoodsList from "components/goods-list/index";
	export default {
		components: {
			GoodsList
		},
		data() {
			return {
				theme: getApp().globalData.theme,
				orderInfo: {},
				goodsList: []
			}
		},
		onLoad(option) {
			this.getOrderById(option.id);
		},
		methods: {
			getOrderById(id) {
				uni.$myRequest.orderById(id).then(res => {
					this.orderInfo = res.data
				})
			},
			getGoodsList(pageNo, pageSize) {
				this.$refs.paging.complete([]);
				uni.$myRequest.goodsSpuPage({
					current: pageNo,
					size: pageSize,
					descs: 'sales_volume'
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				});
			},
			homeSub() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			orderDetailSub() {
				uni.navigateTo({
					url: '/pages/order/order-detail/index?id=' + this.orderInfo.id
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
