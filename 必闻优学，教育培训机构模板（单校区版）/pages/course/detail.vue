<template>
	<view class="body-wrap">
		<!-- 顶部轮播图 -->
		<view class="header-swiper-warp">
			<u-swiper :list="headerSwiperList" indicator height="400rpx" radius="0"></u-swiper>
		</view>

		<!-- 课程基础信息 -->
		<view class="base-info-wrap">
			<view class="title-wrap">
				<text class="title u-line-1">少儿英语启蒙课</text>
				<text class="sub-title u-line-1">让孩子赢在起跑线</text>
			</view>
			<u-line margin="30rpx 0"></u-line>
			<view class="list-wrap">
				<view class="info-cell-wrap">
					<view class="left">
						<u-icon name="bookmark-fill" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-10">课程目的</text>
					</view>
					<text class="right-info u-line-1">培养孩子英语语感</text>
				</view>
				<view class="info-cell-wrap">
					<view class="left">
						<u-icon name="account-fill" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-10">适用人群</text>
					</view>
					<text class="right-info u-line-1">学龄前儿童</text>
				</view>
				<view class="info-cell-wrap">
					<view class="left">
						<u-icon name="plus-people-fill" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-10">上课人数</text>
					</view>
					<text class="right-info u-line-1">不限/定制</text>
				</view>
				<view class="info-cell-wrap">
					<view class="left">
						<u-icon name="grid-fill" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-10">适合基础</text>
					</view>
					<text class="right-info u-line-1">零基础</text>
				</view>
			</view>
		</view>
		
		<!-- 学校简介 -->
		<view class="card-list-wrap">
			<view class="card-header" @click="$u.route('pages/school/detail')">
				<text class="title">所属学校</text>
				<u-icon name="arrow-right" size="18"></u-icon>
			</view>
			<view class="school-card-wrap">
				<view class="school-des-wrap">
					<u-avatar src="/static/img/school_logo1.png" shape="square" size="56"></u-avatar>
					<text class="des" :class="desToggle?'u-line-3':''"
						@click="desToggle = !desToggle">马栏山国际幼儿园成立于1991年5月，是马栏山地区首屈一指的幼儿教育学校，该园拥有蒙特梭利教师20余位，教学质量和成绩深受家长喜爱。</text>
				</view>
			</view>
		</view>

		<!-- 课程详情 -->
		<view class="card-list-wrap">
			<view class="card-header">
				<text class="title">课程详情</text>
				<u-icon name="arrow-right" size="18"></u-icon>
			</view>
			<view class="des-content-wrap">
				<u-parse :content="content"></u-parse>
			</view>
		</view>

		<!-- 对冲工具栏高度 -->
		<u-gap height="50"></u-gap>

		<!-- 以下是各种弹出层 -->

		<!-- 预约领礼品弹出层 -->
		<u-popup :show="orderGiftPopupShow" round="20" closeOnClickOverlay closeable
			@close="orderGiftPopupShow = false">
			<view class="popup-slot-wrap">
				<view class="popup-title">
					领取预约优惠
				</view>
				<view class="popup-body">
					<view class="coupon-card-wrap">
						<view class="list u-line-1">
							<text class="name">免费试听</text>
							<text class="info">线上预约免费试听幼儿英语课程1节</text>
						</view>
						<view class="list u-line-1">
							<text class="name">到店礼</text>
							<text class="info">本月到店可领取精美儿童DIY大礼包一份</text>
						</view>
					</view>
					<view class="contact-tips-info">
						<text class="u-m-b-10">预约后学校将通过电话联系您</text>
						<view class="phone-wrap">
							<text class="u-m-r-20">180****1234</text>
							<text class="u-m-r-5">修改</text>
							<u-icon name="arrow-right" size="12"></u-icon>
						</view>

					</view>
					<view class="buy-tips-info">
						<view class="info">
							<u-icon name="checkmark-circle" size="10"></u-icon>
							<text class="u-m-l-5">无强行推销</text>
						</view>
						<view class="info">
							<u-icon name="checkmark-circle" size="10"></u-icon>
							<text class="u-m-l-5">不泄露用户手机号码</text>
						</view>
					</view>
				</view>
				<view class="popup-footer">
					<u-button type="success" text="立即预约"></u-button>
				</view>
			</view>
		</u-popup>

		<!-- 底部工具栏 -->
		<view class="toolbar-wrap">
			<view class="left">
				<view class="favorite-btn">
					<u-icon name="star" size="22" color="#FFBE59"></u-icon>
					<text>收藏</text>
				</view>
				<view class="like-btn">
					<u-icon name="share" size="22" color="#FFBE59"></u-icon>
					分享
				</view>
			</view>
			<view class="right">
				<u-button text="免费预约" type="success" size="normal" shape="circle" :customStyle="{width: '100%'}"
					@click="orderGiftPopupShow = true">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headerSwiperList: ['/static/img/school_logo1.png', '/static/img/school_logo2.png'],
				desToggle:true,
				content: `<img src="https://cdn.huiwenhuiyi.com/uploads/20220317/FgN7Fze_S1Oty8t5KLpmlS0LYzKV.jpg">`,
				orderGiftPopupShow: false,
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.base-info-wrap {
		background-color: #FFFFFF;
		padding: 24rpx 32rpx;
		margin-bottom: 24rpx;

		.title-wrap {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 20rpx;

			.title {
				color: $u-main-color;
				font-size: 36rpx;
				font-weight: bold;
			}

			.sub-title {
				color: $u-content-color;
				font-size: $u-p2;
			}
		}

		.list-wrap {
			background-color: #FFFFFF;

			

			.info-cell-wrap {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $u-content-color;
				font-size: $u-p2;
				padding: 15rpx 0;
				
				&:first-child {
					padding-top: 0;
				}

				.left {
					display: flex;
					align-items: center;
				}
			}
			
			.right-info {
				max-width: 500rpx;
			}
		}
	}


	.card-list-wrap {

		background-color: #FFFFFF;
		padding: 32rpx;
		margin-bottom: 24rpx;

		.card-header {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.title {
				font-size: $u-p;
				font-weight: bold;
			}
		}
		
		.des-content-wrap {
			// padding: 0 24rpx;
		}
		
		// 学校简介
		.school-card-wrap {
		
			.school-des-wrap {
				display: flex;
				align-items: flex-start;
				// border: 1rpx solid $u-border-color;
				border-radius: 20rpx;
				// padding: 24rpx;
				background-color: #FFFFFF;
				font-size: $u-p2;
				color: $u-main-color;
				// margin-bottom: 20rpx;
		
				.des {
					margin-left: 20rpx;
				}
			}
		
			.date-info {
				display: flex;
				// flex-direction: column;
				align-items: center;
				margin-bottom: 20rpx;
		
				.date-title {
					font-weight: bold;
					color: $u-main-color;
					font-size: $u-p2;
					margin-right: 10rpx;
				}
		
				.date {
					font-size: $u-p2;
					color: $u-content-color;
				}
			}
		
			.tags-wrap {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				font-size: $u-p2;
				color: $u-tips-color;
				margin-bottom: -20rpx;
		
				.tag {
					min-width: 175rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 20rpx;
				}
			}
		}
		
		
	}


	// 弹出层
	.popup-body {

		// 弹出优惠信息
		.coupon-card-wrap {
			border-radius: 10rpx;
			background-color: rgba($color: $u-primary-light-color, $alpha: 0.3);
			padding: 24rpx;
			font-size: $u-p2;
			margin-bottom: 20rpx;

			
			.list {
				margin-bottom: 10rpx;
				
				&:last-child {
					margin-bottom: 0rpx;
				}
				

				.name {
					font-weight: bold;
					margin-right: 20rpx;
				}
			}
		}

		.contact-tips-info {
			color: $u-main-color;
			font-size: $u-p2;
			margin-bottom: 20rpx;

			.phone-wrap {
				display: flex;
				align-items: center;

			}
		}

		.buy-tips-info {
			display: flex;
			align-items: center;
			color: $u-tips-color;
			font-size: $u-p3;

			// padding: 20rpx 0;
			.info {
				display: flex;
				align-items: center;
				margin-right: 20rpx;
			}
		}


		// 弹出层券
		.tikect-list-wrap {
			min-height: 500rpx;
			max-height: 80vh;
			overflow-y: scroll;

			.ticket-card-wrap {
				background-color: #fff;

				display: flex;
				align-items: center;

				margin-bottom: 20rpx;

				.ticket-left,
				.ticket-right {
					padding: 24rpx;
					border: 1rpx solid $u-border-color;
					height: 120rpx;
				}

				.ticket-left {
					width: 200rpx;
					border-right: 4rpx dashed $u-border-color;
					border-top-left-radius: 10rpx;
					border-bottom-left-radius: 10rpx;

					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;



					color: $u-content-color;

					.price-wrap {
						color: $u-error;

						.sub {
							font-size: $u-sub;
						}

						.price {
							font-weight: bold;
							font-size: $u-hd;
						}
					}

					.name {
						font-size: $u-p2;
					}
				}

				.ticket-right {
					width: 500rpx;
					border-left: 0;
					border-top-right-radius: 10rpx;
					border-bottom-right-radius: 10rpx;


					display: flex;
					align-items: center;
					justify-content: space-between;

					.info-wrap {
						.name {
							font-weight: bold;
							color: $u-main-color;
							font-size: $u-p;
							margin-bottom: 20rpx;
						}

						.tips {
							color: $u-tips-color;
							font-size: $u-p3;
							margin: 20rpx 0 10rpx 0;
						}

						.date {
							color: $u-content-color;
							font-size: $u-p2;
						}
					}
				}
			}
		}

	}
</style>
