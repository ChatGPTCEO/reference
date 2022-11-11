<template>
	<view class="body-wrap">
		<!-- 顶部占位 -->
		<u-status-bar bgColor="#ffffff"></u-status-bar>
		<!-- 顶部自定义导航搜索框 -->
		<u-navbar :title="title" bgColor="#FFBE59">
			<view class="u-nav-slot" slot="left">
				<view class="weather-wrap">
					<text class="custom-icon custom-icon-xiaoyu u-iconfont-44" style="color: #fff;"></text>
					<view class="weather-info">
						<text class="weather u-line-1">小雨</text>
						<text class="temperature">19℃</text>
					</view>
				</view>
			</view>
			<view class="u-nav-slot" slot="center">
				<view class="searchbar"
					@click="$u.route({ url: 'pages/index/search', animationType: 'fade-in', animationDuratioin: 0 })">
					<u-icon name="search" size="16" color="#909193"></u-icon>
					<text class="u-font-24">点击搜索课程</text>
				</view>
			</view>
		</u-navbar>

		<!-- 头部功能区 -->
		<view class="header-function">
			<view class="fuction-item" @click="orderGiftPopupShow = true">
				<text class="custom-icon custom-icon-lihe"></text>
				<text class="function-name">预约有礼</text>
			</view>
			<view class="fuction-item" @click="$u.route('pages/schedule/list')">
				<text class="custom-icon custom-icon-rili"></text>
				<text class="function-name">课程表</text>
			</view>
			<view class="fuction-item" @click="$u.route('pages/user/msg/list')">
				<view class="badge-wrap">
					<u-badge value="1"></u-badge>
				</view>
				<text class="custom-icon custom-icon-xiaoxizhongxin"></text>
				<text class="function-name">通知提醒</text>
			</view>
			<view class="fuction-item" @click="$u.route('pages/user/user')">
				<text class="custom-icon custom-icon-profile"></text>
				<text class="function-name">个人中心</text>
			</view>
		</view>
		
		<!-- 通知栏 -->
		<view class="noticebar-warp">
			<u-line color="#fff"></u-line>
			<u-notice-bar text="必闻优学开课啦" bgColor="#FFBE59" color="#FFFFFF"></u-notice-bar>
		</view>

		<!-- 人气课程 -->
		<view class="card-list-wrap">
			<view class="card-header">
				<text class="title">人气课程</text>
				<u-icon name="arrow-right" size="18" @click="$u.route('pages/course/list')"></u-icon>
			</view>
			<view class="hot-course-list">
				<!-- 左右版 -->
				<view class="left-swiper-wrap" @click="$u.route('pages/course/detail')">
					<u-swiper indicator :list="hotcourseSwiperList" height="400rpx" radius="10"></u-swiper>
				</view>
				<view class="right-image-list">
					<view class="hot-course-card">
						<u-image src="https://cdn.huiwenhuiyi.com/uploads/20220317/FlBc0uXtaK5Gc26Lq6GEvgb-sNFX.jpg"
							mode="aspectFill" width="330rpx" height="190rpx" radius="10"></u-image>
						<view class="title"><text>思博篮球训练中心</text></view>
					</view>
					<view class="hot-course-card">
						<u-image src="https://cdn.huiwenhuiyi.com/uploads/20220317/FnGjnPj_AjtEYFJuiLqgs7RMVnd-.jpg"
							mode="aspectFill" width="330rpx" height="190rpx" radius="10"></u-image>
						<view class="title"><text>景润自习室</text></view>
					</view>
				</view>
			</view>

		</view>

		<!-- 教师列表 -->
		<view class="card-list-wrap">
			<view class="card-header" @click="$u.route('pages/teacher/list')">
				<text class="title">优秀教师</text>
				<u-icon name="arrow-right" size="18"></u-icon>
			</view>
			<!-- 横向滚动的教师信息列表 -->
			<scroll-view scroll-x="true" :show-scrollbar="false" class="scrollx-body-wrap">
				<view class="teacher-card-body box-shadow" @click="$u.route('pages/teacher/detail')">
					<view class="avatar-wrap">
						<u-avatar src="/static/img/teacher5.jpg" size="56"></u-avatar>
					</view>
					<view class="name u-line-1">张老师</view>
					<view class="experience">
						7年教龄
					</view>
					<view class="info">
						学龄前幼儿辅导
					</view>
				</view>
				<view class="teacher-card-body box-shadow" @click="$u.route('pages/teacher/detail')">
					<view class="avatar-wrap">
						<u-avatar src="/static/img/teacher2.jpg" size="56"></u-avatar>
					</view>
					<view class="name u-line-1">王老师</view>
					<view class="experience">
						12年教龄
					</view>
					<view class="info">
						学龄前幼儿辅导
					</view>
				</view>
				<view class="teacher-card-body box-shadow" @click="$u.route('pages/teacher/detail')">
					<view class="avatar-wrap">
						<u-avatar src="/static/img/teacher3.jpg" size="56"></u-avatar>
					</view>
					<view class="name u-line-1">刘老师</view>
					<view class="experience">
						17年教龄
					</view>
					<view class="info">
						学龄前幼儿辅导
					</view>
				</view>
				<view class="teacher-card-body box-shadow" @click="$u.route('pages/teacher/detail')">
					<view class="avatar-wrap">
						<u-avatar src="/static/img/teacher1.jpg" size="56"></u-avatar>
					</view>
					<view class="name u-line-1">赵老师</view>
					<view class="experience">
						6年教龄
					</view>
					<view class="info">
						学龄前幼儿辅导
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 热门活动 -->
		<view class="card-list-wrap">
			<view class="card-header" @click="$u.route('pages/game/list')">
				<text class="title">热门活动</text>
				<u-icon name="arrow-right" size="18"></u-icon>
			</view>
			<view class="game-swiper-wrap">
				<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="300"
					:current="currentGameItem" @change="changeGameItem" style="height: 500rpx;">
					<swiper-item>
						<view class="game-card-wrap">
							<u-image src="https://cdn.huiwenhuiyi.com/uploads/20220317/Fu10Im8UBsjMbuUgzjmtCYONcRvC.png"
								mode="aspectFill" width="100%" height="350rpx" radius="10"></u-image>
							<!-- 活动信息卡片 -->
							<view class="game-card-info box-shadow">
								<view class="game-title">
									<u-badge value="HOT" bgColor="#fa3534"></u-badge>
									<text class="title u-line-1">出炉啦！梨丁拉丝塔塔手作甜到你心</text>
								</view>
								<view class="game-info">
									<view class="rate-wrap">
										<text class="u-font-24">趣味指数</text>
										<u-rate :value="3.7" size="14" gutter="2" allowHalf disabled></u-rate>
									</view>
									<view>
										<u-button size="mini" type="success" shape="circle" text="立即查看"
											:customStyle="{width: '250rpx',height: '50rpx'}"
											@click="$u.route('pages/game/detail')"></u-button>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="game-card-wrap">
							<u-image src="https://cdn.huiwenhuiyi.com/uploads/20220317/FrxbbaF2uZB0u0yFQ3FrvVvSbfyo.png"
								mode="aspectFill" width="100%" height="350rpx" radius="10"></u-image>
							<!-- 活动信息卡片 -->
							<view class="game-card-info box-shadow">
								<view class="game-title">
									<u-badge value="HOT" bgColor="#fa3534"></u-badge>
									<text class="title u-line-1">趣味乐高文具盒手作</text>
								</view>
								<view class="game-info">
									<view class="rate-wrap">
										<text class="u-font-24">趣味指数</text>
										<u-rate :value="5" size="14" gutter="2" allowHalf disabled></u-rate>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="game-card-wrap">
							<u-image src="https://cdn.huiwenhuiyi.com/uploads/20220317/Fr0jH1qEzZXk2bxy46ej-B8MBDyq.png"
								mode="aspectFill" width="100%" height="350rpx" radius="10"></u-image>
							<!-- 活动信息卡片 -->
							<view class="game-card-info box-shadow">
								<view class="game-title">
									<u-badge value="HOT" bgColor="#fa3534"></u-badge>
									<text class="title u-line-1">虎头虎脑，开启小老虎零钱包手作之旅~</text>
								</view>
								<view class="game-info">
									<view class="rate-wrap">
										<text class="u-font-24">趣味指数</text>
										<u-rate :value="5" size="14" gutter="2" allowHalf disabled></u-rate>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 全部课程 -->
		<view class="course-card-list-wrap">
			<u-image src="https://cdn.huiwenhuiyi.com/uploads/20220317/Ftx-VNayUIGQBHazoH7zxcp_Rf3Y.png"
				mode="aspectFit" width="100%" height="320rpx"
				:customStyle="{zIndex:'0',position:'absolute',top:'0',left:'0'}"></u-image>
			<view class="card-header">
				<text class="title">全部课程</text>
			</view>

			<!-- 课程卡片 -->
			<view class="course-card-list">
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo2.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">津舞门舞蹈培训</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字
						</view>

						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo1.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">马栏山国际幼儿园</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字

						</view>

						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo2.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">津舞门舞蹈培训</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字

						</view>

						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo1.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">马栏山国际幼儿园</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字

						</view>

						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
				<view class="course-card-wrap box-shadow" @click="$u.route('pages/course/detail')">
					<view class="course-image-wrap">
						<u-image src="/static/img/school_logo2.png" mode="aspectFill" width="250rpx" height="200rpx"
							radius="10">
						</u-image>
					</view>
					<view class="course-info-wrap">
						<view class="course-title-wrap">
							<text class="course-title u-line-1">津舞门舞蹈培训</text>
						</view>
						<view class="des-warp">
							这里是一段课程简介文字

						</view>

						<view class="course-tags-wrap">
							<text class="tag">标签</text>
							<text class="tag">标签2</text>
							<text class="tag">标签3</text>
							<text class="tag">标签4</text>
						</view>
					</view>
				</view>
			</view>
		</view>

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

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				functionFixed: false,
				headerSwiperList: ['https://cdn.huiwenhuiyi.com/uploads/20220317/FjqfY1A0udTFqpPxtnW-1L7UmrUE.png',
					'https://cdn.huiwenhuiyi.com/uploads/20220317/FmjQK2w-NkDX1lz45J3TmvcT4pg1.png',
					'https://cdn.huiwenhuiyi.com/uploads/20220317/FmA6V6Z1M1h9iOvAHXsqGHUY-97S.png'
				],
				currentGameItem: 0, // 当前活动卡片index,
				hotcourseSwiperList: ['https://cdn.huiwenhuiyi.com/uploads/20220317/FgCJtBKK-PKGV5O9Rf4zYk1LJjGC.jpg',
					'https://cdn.huiwenhuiyi.com/uploads/20220317/FlBc0uXtaK5Gc26Lq6GEvgb-sNFX.jpg',
					'https://cdn.huiwenhuiyi.com/uploads/20220317/FnGjnPj_AjtEYFJuiLqgs7RMVnd-.jpg'
				],
				orderGiftPopupShow: false,
			};
		},
		onLoad() {},
		methods: {
			// 滑动活动卡片
			changeGameItem(e) {
				// console.log(e);
			},
			scan() {
				// #ifdef H5
				uni.$u.toast('H5平台不支持扫一扫');
				return;
				// #endif
				uni.scanCode({
					onlyFromCamera: true, // 只允许从相机扫码
					success(res) {
						console.log(res);
					},
					fail(res) {
						uni.$u.toast(res.errMsg);
						console.log(res);
					},
				});
			}
		}
	};
</script>

<style lang="scss">
	.body-wrap {
		overflow: visible;
	}

	.location-wrap {
		width: 130rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
	}

	.searchbar {
		width: 320rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $u-tips-color;
		font-size: $u-p2;
		background-color: $u-bg-color;
		padding: 16rpx;
		margin-left: -30rpx; // 让出右侧胶囊的位置
		height: 30rpx;
		border-radius: 50rpx;
	}

	.weather-wrap {
		display: flex;
		align-items: center;
		width: 150rpx;

		.weather-info {
			margin-left: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			color: #ffffff;
			font-size: 20rpx;
		}
	}

	// 头部
	.header-function {
		margin-top: 44px;
		padding: 10rpx 32rpx 24rpx;
		background-color: $u-primary-color;
		display: flex;
		justify-content: space-between;

		.fuction-item {
			padding: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #ffffff;
			position: relative;

			.badge-wrap {
				position: absolute;
				right: 0;
			}

			.custom-icon {
				font-size: 80rpx;
			}

			.function-name {
				font-size: $u-p3;
			}
		}
	}

	.header-content {
		width: 100%;
		padding: 24rpx;
		background-color: #ffffff;
		margin-bottom: 24rpx;

		.swiper-wrap {
			width: 700rpx;
			margin-bottom: 24rpx;
		}

		.cate-list {
			width: 700rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.cate-item {
				width: 120rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-weight: bold;
				font-size: $u-p3;
				margin-bottom: 24rpx;
			}
		}
	}

	// 通用列表外包裹
	.card-list-wrap {
		padding: 24rpx;
		margin-bottom: 24rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		align-items: center;

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

		// 活动轮播列表
		.game-swiper-wrap {
			width: 100%;
			height: 420rpx;
			border-radius: 20rpx;

			.game-card-wrap {
				width: 100%;
				position: relative;

				.game-card-info {
					width: 600rpx;
					margin: 0 auto;
					padding: 24rpx;
					background-color: #ffffff;
					position: absolute;
					bottom: -60rpx;
					left: 25rpx;
					border-radius: 20rpx;

					.game-title {
						display: flex;
						align-items: center;
						justify-content: left;
						margin-bottom: 10rpx;

						.title {
							font-size: $u-p2;
							margin-left: 10rpx;
							font-weight: bold;
						}
					}

					.game-info {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.rate-wrap {
							display: flex;
							justify-content: left;
						}
					}
				}
			}
		}

		// 人气课程图片列表
		.hot-course-list {
			width: 100%;
			padding: 0 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left-swiper-wrap {
				width: 350rpx;
			}

			.right-image-list {
				height: 400rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.hot-course-card {
					position: relative;

					.title {
						width: 300rpx;
						padding: 10rpx 15rpx;
						border-bottom-left-radius: 20rpx;
						border-bottom-right-radius: 20rpx;
						background-color: rgba($color: #000000, $alpha: 0.3);
						position: absolute;
						bottom: 0;
						color: #FFFFFF;
						font-size: $u-p2;
					}
				}
			}
		}

		// 课程、教师滑动
		.scrollx-body-wrap {
			white-space: nowrap;

			.course-card-body {
				display: inline-block;
				width: 180rpx;
				margin-right: 32rpx;

				.image-wrap {
					position: relative;

					.tag {
						color: #ffffff;
						background-color: $uni-color-error;
						font-size: $u-sub1;
						position: absolute;
						z-index: 1;
						left: 0;
						padding: 4rpx 10rpx;
						border-bottom-right-radius: 10rpx;
					}

					image {
						width: 100%;
						height: 180rpx;
						display: block;
						border-radius: 10rpx;
					}
				}

				.title {
					color: $u-main-color;
					text-align: left;
					margin-top: 10rpx;
					font-size: $u-p2;
				}

				.info {
					text-align: left;
					color: $u-tips-color;
					font-size: $u-p3;
				}
			}

			.course-card-body:last-child,
			.teacher-card-body:last-child {
				margin-right: 0rpx;
			}

			.teacher-card-body {
				display: inline-block;
				width: 160rpx;
				margin-right: 24rpx;
				text-align: center;
				border-radius: 20rpx;
				padding: 24rpx;
				border: 1rpx solid $u-border-color;

				.avatar-wrap {
					display: flex;
					justify-content: center;
				}

				.name {
					margin-top: 10rpx;
					color: $u-main-color;
					font-size: $u-p2;
					font-weight: bold;
				}

				.experience {
					color: $u-content-color;
					font-size: $u-p3;
				}

				.info {
					color: $u-tips-color;
					font-size: $u-sub;
					margin-bottom: 10rpx;
				}
			}
		}
	}

	// 课程列表外包裹
	.course-card-list-wrap {
		background-color: #fefefe;
		position: relative;

		.card-header {
			width: 100%;
			height: 300rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.title {
				margin-top: -100rpx;
				font-size: $u-p;
				color: #FFFFFF;
				font-weight: bold;
				padding: 24rpx;
			}
		}

		.course-card-list {
			padding: 24rpx;
			margin-top: -110rpx;
			position: relative;

			.course-card-wrap {
				padding: 24rpx;
				display: flex;
				align-items: flex-start;
				border-radius: 20rpx;
				background-color: #ffffff;
				margin-bottom: 24rpx;

				.course-image-wrap {
					margin-right: 24rpx;
				}

				.course-info-wrap {
					height: 195rpx;
					width: 100%;
					position: relative;
					align-items: left;

					.course-title-wrap,
					.des-warp {
						display: flex;
						align-items: center;
						justify-content: left;

						.course-title {
							font-size: $u-p;
							font-weight: bold;
						}
					}

					.course-title-wrap {
						margin-bottom: 20rpx;
					}

					.des-warp {
						display: flex;
						justify-content: left;
						font-size: $u-p3;
						color: $u-content-color;
					}

					.course-tags-wrap {
						position: absolute;
						left: 0;
						bottom: 0;

						.tag:last-child {
							margin-right: 0;
						}

						.tag {
							padding: 4rpx 8rpx;
							border-radius: 20rpx;
							border: 1px solid $u-tips-color;
							color: $u-tips-color;
							font-size: 20rpx;
							margin-right: 10rpx;
						}
					}
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
	}
</style>
