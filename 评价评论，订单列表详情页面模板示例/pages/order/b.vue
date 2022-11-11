<template>
	<view class="page_order">
		<view>
			<u-subsection :list="list" :current="curNow" @change="sectionChange" activeColor="#25A785"
				bgColor="#eeeeee"></u-subsection>
		</view>
		<view class="order_card">
			<view class="card" v-for="(item,index) in pro">
				<view class="card_top">
					<view style="width: 80%;" class="font14">订单号：{{item.number}}</view>
					<view class="font14" style="color: #25A785;">待付款</view>
				</view>
				<u-line color="#eaeaea" :hairline="false"></u-line>
				<view class="card_medium">
					<image src="../../tupian/maomi.jpg" class="card_img"></image>
					<view class="med_right">
						<view class="font16 fontbold med_right1">{{item.name}}</view>
						<view class="font12 med_right2">预约时间：{{item.time}}</view>
						<view class="med_right3">
							<view class="font12">优惠:{{item.Discount}}</view>
							<view class="font12" style="margin-left: 20rpx;">实付：</view>
							<view class="font12 col_red">￥</view>
							<view class="font16 col_red">{{item.money}}</view>
						</view>
					</view>
				</view>
				<view class="card_btm">
					<u-button class="btm1" shape="circle">取消订单</u-button>
					<u-button class="btm2" shape="circle">立即付款</u-button>
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
					name:"专业疏通管道服务",
					number:"X45344354544321",
					time:"2021-12-10",
					Discount:"104元",
					money:"130.00"
				},
				{
					name:"专业疏通管道服务",
					number:"X45344354544321",
					time:"2021-12-10",
					Discount:"104元",
					money:"130.00"
				},
				{
					name:"专业疏通管道服务",
					number:"X45344354544321",
					time:"2021-12-10",
					Discount:"104元",
					money:"130.00"
				}
				],
				list: ['全部订单', '已完成订单', '未完成订单', '待评价'],
				curNow: 0
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style lang="scss">
	.page_order {
		width: 100vw;
		min-height: 100vh;

		.col_red {
			color: red;
		}
		.font12{
			font-size: 12px;
		}
		.font14{
			font-size: 14px;
		}
		.font16{
			font-size: 16px;
		}
		.order_card {
			width: 100vw;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			.card {
				width: 92%;
				height: 400rpx;
				margin-top: 30rpx;
				border-radius: 10px;
				background-color: white;
				box-shadow: 1px 1px 5px #d5d5d5;

				.card_top {
					display: flex;
					padding: 15rpx;
				}

				.card_medium {
					width: 95%;
					height: 220rpx;
					display: flex;
					align-items: center;
					padding: 15rpx;

					.card_img {
						height: 180rpx;
						width: 180rpx;
						border-radius: 10px;
					}

					.med_right {
						height: 180rpx;
						margin-left: 20rpx;

						.med_right1 {
							margin-bottom: 30rpx;
						}

						.med_right2 {
							color: #909090;
							margin-bottom: 25rpx;
							
						}

						.med_right3 {
							display: flex;
							align-items: center;
						}
					}
				}

				.card_btm {
					display: flex;
					height: 80rpx;
					width: 100%;
					align-items: center;

					.btm1 {
						height: 60rpx;
						width: 200rpx;
						background-color: #ffffff;
						color: #25A785;
						border: #25A785 1px solid;
						margin-left: 260rpx;
					}

					.btm2 {
						height: 60rpx;
						width: 200rpx;
						background-color: #25A785;
						color: white;
					}
				}
			}
		}
	}
</style>
