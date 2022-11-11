<template>
	<view>
		<view class="head tab-right-active">
			<view class="container head-bottom" :class="{ selectOne: tabIndex == 1, selectTow: tabIndex == 2 }">

				<view class="tab">
					<view class="t-top" @click="choose_address">
						<view class="t-top-box">
							<block v-if="!addressData">
								<text class="txt1">暂无收货地址</text>
								<i style="text-align: right;" class="hxicon-right icon1"></i>
							</block>
							<block v-else>
								<view>
									<view style="font-weight: 800;">{{ addressData.name }}&nbsp;{{ addressData.mobile }}
									</view>
									<view style="text-align: right;"><i class="hxicon-right"></i></view>
								</view>
								<view>{{ addressData.province }}{{ addressData.city }} {{ addressData.detail }}</view>
							</block>
						</view>
					</view>
					<view class="t-bb"></view>
				</view>
			</view>
		</view>
		<view class="b-r m-t container p12"  v-for="(item,index) in pro">
			<view class="store">
				<view class="name">
					<text></text>
					<text ></text>
				</view>
				
				<view class="goods-box">
					
						<view class="goods-item">
							<view class="left">
								<image :src="item.src" mode="aspectFit"></image>
							</view>
							<view class="right">
								<view class="row1">
									{{item.name}}
									
									<view class="price">
										<text class="fh">￥</text>
										<text>{{item.money}}</text>
									</view>
								</view>
								<view class="row3">
									<text>x{{item.quantity}}</text>
								</view>
							</view>
						</view>
				
				</view>
				<view class="p-bb b-b"></view>
				<view class="flex-rl totalbox">
					<view class="left">
						<text>备注</text>
						<i class="hxicon-question"></i>
					</view>
					<view class="right" style="font-size: 14px;">
						<view class="yh"></view>
						<view class="total" style="display: flex;">
							{{item.remarks}}
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
				
				<view class="flex-rl totalbox" @click="choose_coupon">
					<view class="left">
						<text>优惠券</text>
						<i class="hxicon-question"></i>
					</view>
					<view class="right">
						
						<view class="total" >
							<!-- <text class="fh"></text> -->
							<view style="font-size: 14px; display: flex;">
								 有 {{item.coupon}}  张可用
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-rl totalbox">
					<view class="left">
						<text>会员折扣</text>
						<i class="hxicon-question"></i>
					</view>
					<view class="right">
						<view class="yh"></view>
						<view class="total" style="font-size: 14px;">
							<!-- <text class="fh"></text> -->
							<text>{{item.discount}}折</text>
						</view>
					</view>
				</view>

				<view class="flex-rl totalbox">
					<view class="left">
						<text>总金额</text>
						<i class="hxicon-question"></i>
					</view>
					<view class="right">
						<view class="yh">
						</view>
						<view class="total" style="font-size: 14px;">
							<text>￥</text>
							<text>{{item.money}}</text>
						</view>
					</view>
				</view>

				<view class="flex-rl totalbox">
					<view class="left">
						<text>优惠规则</text>
						<i class="hxicon-question"></i>
					</view>
					<view class="right">
						<view class="yh">
							<text class="txt">已优惠</text>
							<text class="fh">￥</text>
							<text class="num">{{item.Discount}}</text>
						</view>
						<view class="total">
							<text class="txt">小计</text>
							<text class="fh">￥</text>
							<text class="num">{{item.money}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="body-end"></view>

		<view class="foot" v-for="(item,index) in pro">
			<view class="left">
				<view class="price">
					<text class="fh">￥</text>
					<text class="txt">{{item.money}}</text>
				</view>
				
			</view>
			<view class="right" @click="submit"><text>提交订单</text></view>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				pro:[{
					src: require('@/tupian/touxiang.jpg'),
					name:"菌满堂野生菌火锅",
					money:"235.00",
					quantity:"2",
					remarks:"打包",
					coupon:"20",
					discount:"2",
					Discount:"0"
				}],
				getimg: this.$getimg,
				tabIndex: 1,
				addressData: null, 

			};
		},


	};
</script>

<style lang="scss">
	.u-checkbox__label.data-v-54acf820 {
		margin: 0px !important;
		// margin-left: 10px;
	}

	.coupon_box {
		background: #fff;
		width: 100%;
		height: auto;
		display: table;
		padding: 6upx 26upx 26upx 26upx;
	}

	.pop_item {
		width: 100%;
		height: 50%;
		background-color: #ffffff;
	}

	.coupon_list {
		height: 40px;
	}

	.b-r {
		border-radius: 6px;
	}

	.m-t {
		margin-top: 6px;
	}

	.p-bb {
		margin: 16px 0;
		height: 1px;
		//background:  #E4E7ED;
	}

	.flex-rl {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.container {
		// margin-left: 12px;
		margin-right: 12px;
		background-color: #ffffff;
	}

	.p12 {
		padding: 12px;
	}

	.head {
		// background: linear-gradient(to bottom, #ffc107, #f1f1f1);

		padding-top: 20px;

		.tab-box {
			position: relative;
			height: 40px;
			margin: 0 12px;

			.item {
				position: absolute;
				top: 0;
				bottom: 0;
				height: 40px;
				text-align: center;
				font-size: 14px;

				width: 50%;

				.tit-box {
					position: relative;
					height: 36px;
					line-height: 36px;
					border-top-left-radius: 6px;
					border-top-right-radius: 6px;
					background-color: rgba(#ffffff, 0.6);
					width: 100%;
				}
			}

			.item:first-child {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: flex-end;
				left: 0;
			}

			.item:last-child {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: flex-end;
				right: 0;
			}

			.active {
				height: 40px;
				width: 51%;
				font-weight: bold;

				.tit-box {
					height: 40px;
					line-height: 40px;
					background-color: rgba(#ffffff, 1);
				}
			}

			.left .tit-box {
				margin-left: 12px;
				margin-right: -12px;
				padding-right: 12px;
			}

			.right .tit-box {
				flex-shrink: 0;
				margin-right: 12px;
				margin-left: -12px;
				padding-left: 12px;
			}

			.left.active .tit-box {
				margin: 0;
			}

			.right.active .tit-box {
				margin: 0;
			}

			.left.active .tit-box:after {
				content: '';
				position: absolute;
				right: -12px;
				bottom: 0;
				border-top: 12px solid transparent;
				border-right: 12px solid transparent;
				border-bottom: 36px solid #ffffff;
			}

			.right.active .tit-box:after {
				content: '';
				position: absolute;
				left: -12px;
				bottom: 0;
				border-top: 12px solid transparent;
				border-left: 12px solid transparent;
				border-bottom: 36px solid #ffffff;
			}
		}

		.head-bottom {
			overflow: hidden;
			background: #ffffff;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;

			.tab {
				.t-top {
					&-box {
						margin: 0;
						padding: 12px;

						.txt1 {
							font-size: 18px;
							color: #888;
						}

						.icon1 {
							margin-left: 8px;
							color: #bbb;
						}
					}

					&-box:active {
						background-color: #f5f5f5;
					}
				}

				.t-bb {
					margin: 0 12px;
					height: 0.5px;
					background-color: #e4e7ed;
				}

				.t-bottom {
					padding: 12px;

					.row1 {
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						//padding: 12px 0 0;
						.left {
							font-size: 14px;
							font-weight: bold;
						}

						.right {
							font-size: 14px;
							color: #ff9800;

							i {
								margin-left: 8px;
								color: #bbb;
							}
						}
					}

					.row2 {
						margin-top: 6px;
						font-size: 12px;
						color: #ff9800;
					}
				}
			}
		}

		.head-bottom.selectOne {
			border-top-left-radius: 0;
			border-top-right-radius: px;
		}

		.head-bottom.selectTow {
			border-top-left-radius: 6px;
			border-top-right-radius: 0;
		}
	}

	.store {
		display: flex;
		flex-direction: column;

		.name {
			padding: 4px 0 0px;
			font-size: 14px;
		}

		.goods-box {
			.goods-item {
				margin-top: 20px;
				display: flex;
				flex-direction: row;

				.left {
					width: 60px;
					height: 60px;

					image {
						border-radius: 4px;
						// overflow: hidden;
						width: 100%;
						height: 100%;
						background-color: #f1f1f1;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					padding-left: 14px;
					height: 30px;

					.row1 {
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.tit {
							font-size: 14px;
							color: #333333;
							font-weight: bold;
							flex: 1;
							flex-wrap: wrap;

							.zk {
								padding: 1px 3px;
								font-size: 10px;
								margin-right: 8px;
								border-radius: 4px;
								background-color: #f9221d;
								color: #ffffff;
							}
						}

						.old-price {
							padding-left: 12px;
							font-size: 14px;
							color: #888888;
							font-weight: bold;

							.lt {
								text-decoration: line-through;
							}

							.fh {
								font-size: 10px;
							}
						}

						.price {
							font-size: 16px;
							padding-left: 12px;
							color: #333333;
							font-weight: bold;

							.fh {
								font-size: 10px;
							}
						}
					}

					.row2 {}

					.row3 {
						font-size: 10px;
						color: #888888;
					}
				}
			}

			.goods-item:first-child {
				margin: 0;
			}
		}

		.peisong {
			.right {
				font-size: 14px;
				font-weight: bold;
			}

			.left {
				font-size: 16px;
				font-weight: bold;

				.fh {
					font-size: 10px;
				}
			}
		}

		.zhekou-box {
			.zhekou {
				display: flex;
				flex-direction: column;
				margin-top: 12px;

				.row1 {
					align-items: center;

					.left {
						display: flex;
						flex-direction: row;
						align-items: center;
						height: 20px;
						line-height: 20px;

						i {
							font-size: 16px;
							color: #ff5722;
						}

						.tit {
							font-weight: bold;
							margin-left: 6px;
							font-size: 14px;
							color: #333;
						}
					}

					.right {
						.tag1 {
							font-weight: bold;
							font-size: 14px;
							color: #ff5722;
						}
					}
				}

				.row2 {
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					color: #888;
				}
			}

			.zhekou:first-child {
				margin: 0;
			}
		}

		.totalbox {
			align-items: flex-end;
			margin: 5px 0;
			height: 30px;
			line-height: 30px;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 14px;
				color: #888;

				[class*='hxicon-'] {
					color: #aaa;
					margin-left: 4px;
					font-size: 16px;
				}
			}

			.right {
				display: flex;
				flex-direction: row;
				align-items: flex-end;

				.yh {
					color: #ff5722;

					.txt {
						color: #000;
						font-size: 15px;
					}

					.fh {
						font-weight: bold;
						margin-left: 3px;
						font-size: 13px;
					}

					.num {
						font-weight: bold;
						font-size: 18px;
					}
				}

				.total {
					margin-left: 16px;
					color: #333;

					.txt {
						font-size: 15px;
					}

					.fh {
						margin-left: 3px;
						font-size: 12px;
						font-weight: bold;
					}

					.num {
						font-weight: 900;
						font-size: 22px;
					}
				}
			}
		}
	}

	.privacy {
		display: flex;
		flex-direction: column;

		.row1 {
			align-items: flex-end;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;

				.icon1 {
					color: #444;
					font-size: 24px;
				}

				.icon2 {
					color: #aaa;
					margin-left: 6px;
					font-size: 16px;
				}

				.txt {
					color: #333;
					margin-left: 6px;
					font-weight: bold;
					font-size: 14px;
				}
			}

			.right {}
		}

		.row2 {
			margin-top: 4px;
			color: #888;
			font-size: 12px;
		}

		.row3 {
			margin-top: 8px;
			font-size: 12px;
			color: #ff9800;
		}
	}

	.other-box {
		display: flex;
		flex-direction: column;

		.row {
			align-items: center;

			.left {
				font-size: 14px;
				color: #333;
				font-weight: bold;
				flex: 1;
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
				// flex-wrap: wrap;
				width: 60%;
				font-size: 14px;
				display: flex;
				flex-direction: row;
				color: #aaa;

				[class*='hxicon-'] {
					position: relative;
					top: 2px;
					font-size: 14px;
				}
			}
		}
	}

	.body-end {
		height: 100px;
	}

	.foot {
		z-index: 11;
		position: fixed;
		display: flex;
		flex-direction: row;
		border-radius: 50px;
		overflow: hidden;
		bottom: 12px;
		left: 12px;
		right: 12px;
		height: 50px;

		.left {
			padding: 0 18px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #222222;
			flex: 1;

			.price {
				display: flex;
				flex-direction: row;
				align-items: baseline;
				color: #fff;
				height: 25px;
				line-height: 25px;

				.fh {
					font-weight: bold;
					font-size: 12px;
				}

				.txt {
					font-size: 22px;
					font-weight: bold;
				}
			}

			.discount {
				margin-left: 2px;
				font-size: 10px;
				color: #bbb;
			}
		}

		.right {
			display: flex;
			align-items: center;
			color: #222;
			font-weight: bold;
			font-size: 16px;
			padding-left: 15px;
			padding-right: 15px;
			transition: all 0.3s;
			background: linear-gradient(45deg, #ffeb3b, #ffc107);
		}

		.right:active {
			background: linear-gradient(45deg, #e0ce31, #e4ad06);
		}
	}

	.flex-start {
		display: flex;
		justify-content: flex-start;

		>view {
			height: 100%;

			&:first-child {
				width: 100rpx;
				flex-shrink: 0;
			}

			&:last-child {
				width: 100%;
			}
		}
	}
</style>
