<template>
	<view class="body-wrap">
		<!-- 活动信息 -->
		<view class="game-info-wrap">
			<!-- 头图 -->
			<u-image src="https://cdn.huiwenhuiyi.com/uploads/20220317/Fu10Im8UBsjMbuUgzjmtCYONcRvC.png"
				mode="aspectFill" width="100%" height="400rpx"></u-image>
			<!-- 核心信息 -->
			<view class="data-info-wrap box-shadow">
				<view class="title-wrap">
					<u-badge value="HOT" bgColor="#fa3534"></u-badge>
					<text class="title u-line-1">出炉啦！梨丁拉丝塔塔手作甜到你心</text>
				</view>
				<view class="tags-wrap">
					<view class="tag">
						<text class="tag-icon" style="background-color: #47D174;">退</text>
						<text class="u-m-l-5">支持退款</text>
					</view>
					<view class="tag">
						<text class="tag-icon" style="background-color: #47D174;">保</text>
						<text class="u-m-l-5">交易保障</text>
					</view>
				</view>
				<view class="data-info">
					<view class="date">
						<u-icon name="clock" size="16"></u-icon>
						<text class="u-m-l-5">2022年2月22日</text>
					</view>
					<view class="data">
						<view class="favorite">
							<u-icon name="star" size="16"></u-icon>
							<text class="u-m-l-5">999+</text>
						</view>
						<view class="like">
							<u-icon name="heart" size="16"></u-icon>
							<text class="u-m-l-5">999+</text>
						</view>
					</view>
				</view>
			</view>


			<!-- 活动信息 -->
			<view class="game-info-list">
				<view class="info-cell-wrap">
					<view class="left">
						<u-icon name="map" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-10">北京市海淀区大河庄园3-2-201</text>
					</view>
					<u-icon name="arrow-right" size="18" color="#dadbde"></u-icon>
				</view>
				<view class="info-cell-wrap">
					<view class="left">
						<u-icon name="account" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-10">已报名212组/限300组家庭报名</text>
					</view>
					<u-icon name="arrow-right" size="18" color="#dadbde"></u-icon>
				</view>
				<view class="info-cell-wrap">
					<view class="left">
						<u-icon name="rmb-circle" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-10">120cm以下儿童免费/成人50元每人</text>
					</view>
					<u-icon name="arrow-right" size="18" color="#dadbde"></u-icon>
				</view>
			</view>
		</view>

		<!-- 学校信息 -->
		<view class="school-card-wrap">
			<view class="school-info-wrap box-shadow">
				<!-- #ifndef MP -->
				<u-image class="triangle-tips" src="/static/icon/triangle.png" mode="aspectFit" width="60rpx"
					height="60rpx">
				</u-image>
				<!-- #endif -->
				<view class="title-info-wrap" @click="$u.route('pages/school/detail')">
					<u-avatar src="/static/img/school_logo1.png" size="48"></u-avatar>
					<view class="title-info">
						<view class="title">马栏山国际幼儿园</view>
						<view class="rate">
							<u-rate :value="4.7" allowHalf size="14" gutter="0" disabled></u-rate>
							<text>999+条点评</text>
						</view>
					</view>
				</view>

				<text class="des u-line-2">
					马栏山国际幼儿园成立于1991年5月，是马栏山地区首屈一指的幼儿教育学校，该园拥有蒙特梭利教师20余位，教学质量和成绩深受家长喜爱。
				</text>

				<view class="card-toolbar">
					<view class="favorite">
						<u-icon name="star" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-5">收藏</text>
					</view>
					<u-line length="40rpx" direction="col" :hairline="false" color="#dadbde"></u-line>
					<view class="dial">
						<u-icon name="phone" size="20" color="#FFBE59"></u-icon>
						<text class="u-m-l-5">联系Ta</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 图文介绍 -->
		<view class="des-content-wrap">
			<u-parse :content="content"></u-parse>
		</view>

		<!-- 底部工具栏 -->
		<view class="toolbar-wrap">
			<view class="left">
				<view class="favorite-btn" @click="collect">
					<u-icon name="star" size="22" color="#FFBE59"></u-icon>
					<text>收藏</text>
				</view>
				<view class="like-btn">
					<u-icon name="heart" size="22" color="#FFBE59"></u-icon>
					点赞
				</view>
			</view>
			<view class="right">
				<u-button text="我要报名" type="success" size="normal" shape="circle" :customStyle="{width: '100%'}"
					@click="$u.route('pages/game/signup')"></u-button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `<img src="https://cdn.huiwenhuiyi.com/uploads/20220317/FgN7Fze_S1Oty8t5KLpmlS0LYzKV.jpg">`,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.game-info-wrap {
		background-color: #FFFFFF;

		.data-info-wrap {
			position: relative;
			margin: -80rpx auto 20rpx;
			border-radius: 20rpx;
			width: 650rpx;
			padding: 24rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.title-wrap {
				display: flex;
				align-items: center;
				justify-content: left;
				margin-bottom: 10rpx;

				.title {
					color: $u-main-color;
					font-size: $u-p;
					margin-left: 10rpx;
					font-weight: bold;
				}
			}

			.tags-wrap {
				display: flex;
				align-items: center;
				justify-content: left;
				margin-bottom: 20rpx;
				color: #47D174;
				font-size: $u-p3;

				.tag {
					display: flex;
					align-items: center;
					justify-content: left;
					margin-right: 10rpx;

					.tag-icon {
						width: 36rpx;
						padding: 4rpx 0rpx;
						text-align: center;
						border-radius: 6rpx;
						color: #ffffff;
						font-size: 20rpx;
						line-height: 24rpx;
						margin-left: 5rpx;
					}
				}
			}

			.data-info {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.date,
				.data {
					display: flex;
					align-items: center;
					color: $u-tips-color;
					font-size: $u-p3;

					.favorite,
					.like {
						display: flex;
						align-items: center;
					}
				}
			}

		}

		.game-info-list {
			padding: 0 32rpx 24rpx;

			.info-cell-wrap {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $u-content-color;
				font-size: $u-p2;
				padding: 15rpx 24rpx;

				.left {
					display: flex;
					align-items: center;
				}
			}
		}
	}

	.school-card-wrap {
		padding: 32rpx;

		.school-info-wrap {
			background-color: #FFFFFF;
			padding: 32rpx;
			border-radius: 20rpx;
			position: relative;

			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.triangle-tips {
				position: absolute;
				left: 0;
				top: 0;
			}

			.title-info-wrap {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.title-info {
					margin-left: 20rpx;

					.title {
						color: $u-main-color;
						font-size: $u-p;
						font-weight: bold;
					}

					.rate {
						display: flex;
						align-items: center;

						text {
							color: $u-tips-color;
							margin-left: 10rpx;
							font-size: $u-p3;
						}
					}
				}
			}

			.des {
				color: $u-content-color;
				font-size: $u-p3;
				margin-bottom: 20rpx;
			}

			.card-toolbar {
				width: 100%;
				margin: 0 -32rpx -10rpx;
				padding: 15rpx 32rpx 0;
				border-top: 1px solid $u-border-color;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.favorite,
				.dial {
					display: flex;
					align-items: center;
					color: $u-content-color;
					font-size: $u-p3;
				}
			}
		}
	}

	.des-content-wrap {
		padding: 32rpx;
		margin-bottom: 100rpx;
		background-color: #FFFFFF;
	}
</style>
