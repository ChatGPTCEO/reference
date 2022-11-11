<template>
	<view>
		<view class="wrap" >
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item,index) in pro">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="20" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{item.store}}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="15"></u-icon>
									</view>
									<view class="right">{{item.right}}</view>
								</view>
								<view class="item" @click="jump_detail(132)" >
									<view class="left">
										<u--image :src="item.src" width="90px" height="100px"></u--image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{item.title}}</view>
										<view class="delivery-time">下单时间：{{item.time}}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{item.price}}
											<text class="decimal">.{{item.decimal}}</text>
										</view>
										<view class="number">x{{item.number}}</view>
									</view>
								</view>
								<view class="total">
									共{{item.total}}件商品 合计:
									<text class="total-price">
									￥{{item.price}}.
									<text class="decimal">{{item.decimal}}</text>
									</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				pro:[{
					store:"小王的店",
					right:"未支付",
					title:"荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
					time:"2021-12-10",
					price:"3999",
					decimal:"00",
					number:"1",
					total:"1",
					src:require('@/tupian/touxiang.jpg'),
				},
				{
					store:"小王的店",
					right:"未支付",
					title:"荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
					time:"2021-12-10",
					price:"3999",
					decimal:"00",
					number:"1",
					total:"1",
					src:require('@/tupian/touxiang.jpg'),
				},
				{
					store:"小王的店",
					right:"未支付",
					title:"荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
					time:"2021-12-10",
					price:"3999",
					decimal:"00",
					number:"1",
					total:"1",
					src:require('@/tupian/touxiang.jpg'),
				},
				],
				dataList: [],
				
				
			};
		},
	}
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color:  #f29100;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				width: 60%;

				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color:#f29100;
			}

			.evaluate {
				color: #f29100;
				border-color:  #f29100;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
		height: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
