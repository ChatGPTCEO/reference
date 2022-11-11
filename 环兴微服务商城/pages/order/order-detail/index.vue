<template>
	<view>
		<cu-custom slot="top" :isBack="true" bgColor="bg-red">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</cu-custom>
		<view class="bg-white margin-xs  padding">
			<view class="text-red">
				{{orderInfo.statusDesc}}
			</view>
			<view v-if="orderInfo.status == '1'">
				请在30分钟内付款，超时订单自动取消
			</view>
		</view>
		<view class="bg-white margin-xs  padding flex">
			<view class="basis-xs  flex align-center justify-center">
				<view class="cuIcon-location text-red text-xl"></view>
			</view>
			<view class="basis-xl">
				<view class="content">
					<view class="text-bold">{{orderInfo.orderLogistics.detailAddress}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{orderInfo.orderLogistics.addresseeName}} {{orderInfo.orderLogistics.telephone}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white radius-xl margin-xs">
			<view v-for="(item,index) in orderInfo.orderItemList" class="flex">
				<view class="basis-xs margin-xs padding-sm radius">
					<view class="cu-avatar radius xl" :style="'background-image:url(' + item.picUrl + ')'">
					</view>
				</view>
				<view class="basis-xl margin-xs padding-sm radius">
					<view class="hx-overflow-2">
						{{item.spuName}}
					</view>
					<view class="flex justify-between align-end">
						<view class="text-bold text-df text-price text-red">{{item.salesPrice}}</view>
						<view> x{{item.buyQuantity}}</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top" style="min-height: 80rpx;">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 商品总价
				</view>
				<view class="action">
					<view class="text-black text-price">{{orderInfo.totalPrice}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white" style="min-height: 80rpx;">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 运费
				</view>
				<view class="action">
					<view class="text-black text-price">{{orderInfo.freightPrice}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white" style="min-height: 80rpx;">
				<view class="action">
					<text class="cuIcon-title text-red"></text> 优惠金额
				</view>
				<view class="action">
					<view class="text-black text-price">{{orderInfo.couponPrice}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" style="min-height: 80rpx;">
				<view class="action">
					<text class="cuIcon-title text-red"></text> {{orderInfo.isPay == '1'? '已支付' :'需付款'}}
				</view>
				<view class="action">
					<view class="text-red text-price text-bold">{{orderInfo.payPrice}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white" style="min-height: 80rpx;">
				<view class="action">
					订单编号
				</view>
				<view class="action">
					<view class="text-black">{{orderInfo.orderNo}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white" style="min-height: 80rpx;">
				<view class="action">
					创建时间
				</view>
				<view class="action">
					<view class="text-black">{{orderInfo.createTime}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white" style="min-height: 80rpx;" v-if="orderInfo.cancelTime">
				<view class="action">
					取消时间
				</view>
				<view class="action">
					<view class="text-black">{{orderInfo.cancelTime}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white" style="min-height: 80rpx;" v-if="orderInfo.deliverTime">
				<view class="action">
					发货时间
				</view>
				<view class="action">
					<view class="text-black">{{orderInfo.deliverTime}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white" style="min-height: 80rpx;" v-if="orderInfo.receiverTime">
				<view class="action">
					收货时间
				</view>
				<view class="action">
					<view class="text-black">{{orderInfo.receiverTime}}</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="cu-bar bg-white tabbar border foot justify-end">
			<order-operation :orderInfo="orderInfo" :isPay="isPay" @orderDel="orderDel($event,index)"
				@orderReceiver="orderReceiver($event,index)" @orderCancel="orderCancel($event,index)"></order-operation>
		</view>
	</view>
</template>

<script>
	import orderOperation from 'components/order-operation/index'
	export default {
		components: {
			orderOperation
		},
		data() {
			return {
				theme: getApp().globalData.theme,
				orderInfo: {},
				timeData: {},
				isPay: false
			}
		},
		onLoad(option) {
			if (option.isPay) {
				this.isPay = option.isPay
			}
			getApp().initPage().then(res => {
				this.getOrderDetail(option.id)
			})
		},
		methods: {
			getOrderDetail(id) {
				uni.$myRequest.orderById(id).then(res => {
					this.orderInfo = res.data
				})
			},
			orderCancel(item, index) {
				this.getOrderDetail(item.id)
			},
			orderDel(item, index) {
				uni.navigateBack({
					delta: 1
				});
			},
			orderReceiver(item, index) {
				this.getOrderDetail(item.id)
			}
		}
	}
</script>

<style lang="scss">
</style>
