<template>
	<view>
		<z-paging ref="paging" v-model="orderList" @query="getOrderList" :auto="false">
			<cu-custom slot="top" :isBack="true" bgColor="bg-red">
				<block slot="backText">返回</block>
				<block slot="content">订单列表</block>
			</cu-custom>
			<scroll-view slot="top" scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==tabCur?'text-red cur':''" v-for="(item,index) in list"
						:key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view>
			<view class="bg-white radius margin-xs" v-for="(item,index) in orderList">
				<navigator hover-class="none" :url="'/pages/order/order-detail/index?id=' + item.id">
					<view class="flex p-xs margin-bottom-sm mb-sm solid-bottom"
						v-for="(itemChild,indexChild) in item.orderItemList" :key="indexChild">
						<view class="basis-xs margin-xs padding-sm radius">
							<view class="cu-avatar radius xl" :style="'background-image:url(' + itemChild.picUrl + ')'">
							</view>
						</view>
						<view class="basis-xl margin-xs padding-sm radius">
							<view class="hx-overflow-2">
								{{itemChild.spuName}}
							</view>
							<view class="flex justify-between align-end">
								<view class="text-bold text-df text-price text-red">{{itemChild.salesPrice}}</view>
								<view> x{{itemChild.buyQuantity}}</view>
							</view>
						</view>
					</view>
					<view class="flex justify-end padding-xs">
						<view>
							<text>总价</text>
							<text class="text-price"> {{item.totalPrice}}</text>
						</view>
						<view v-if="item.couponPrice >0" class="padding-left-xs">
							<text>,优惠</text>
							<text class="text-price"> {{item.couponPrice}}</text>
						</view>
						<view class="padding-lr-xs">
							<text>,实付</text>
							<text class="text-price text-bold text-red text-lg"> {{item.payPrice}}</text>
						</view>
					</view>
				</navigator>
				<view class="flex border justify-end">
					<order-operation :orderInfo="item" @orderDel="orderDel($event,index)"
						@orderReceiver="orderReceiver($event,index)" @orderCancel="orderCancel($event,index)">
					</order-operation>
				</view>
			</view>

		</z-paging>
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
				orderList: [],
				list: ['全部', '待付款', '待发货', '待收货', '待评价'],
				status: 0,
				tabCur: 0
			}
		},
		onLoad(option) {
			console.log(option.status)
			getApp().initPage().then(res => {
				if (option.status) {
					this.status = option.status;
					this.tabCur = option.status;
				}

			})
		},
		onShow() {
			this.$nextTick(function() {
				this.$refs.paging.reload();
			})
		},
		methods: {
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.status = e.currentTarget.dataset.id;
				this.$refs.paging.reload();
			},
			getOrderList(pageNo, pageSize) {
				uni.$myRequest.orderPage({
					current: pageNo,
					size: pageSize,
					status: this.status == 0 ? '' : this.status,
					descs: 'create_time'
				}).then(res => {
					this.$refs.paging.complete(res.data.records);
				});
			},
			sectionChange(index) {
				this.status = index
				this.$refs.paging.reload();
			},
			orderDel(item, index) {
				this.orderList.splice(index, 1);
			},
			orderReceiver(item, index) {
				this.$refs.paging.reload();
			},

			orderCancel(item, index) {
				console.log(index);
				uni.$myRequest.orderById(item.id).then(res => {
					this.orderList[index] = res.data;
				})

			},


		}
	}
</script>

<style lang="scss">
	.item-bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 20rpx;


		.price {
			color: red;
		}

		.pay-price {
			font-size: 38rpx;
		}
	}
</style>
