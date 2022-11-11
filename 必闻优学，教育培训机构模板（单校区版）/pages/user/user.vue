<template>
	<view class="body-wrap">

		<!-- 个人信息 -->
		<view class="userinfo-card">
			<view v-if="isLogin" class="userinfo-card__header">
				<view class="userinfo-card__header__left">
					<u-avatar src="/static/img/avatar3.jpg" size="56"></u-avatar>
					<text class="nickname">花儿为何这样红</text>
				</view>
				<view class="userinfo-card__header__right">
					<u-button type="success" size="mini" text="管理学生信息" shape="circle"
						@click="adminStudentsPopupShow =  true">
					</u-button>
				</view>
			</view>
			<view v-if="!isLogin" class="userinfo-card__header">
				<view class="userinfo-card__header__left">
					<u-avatar src="/static/logo.png" size="56"></u-avatar>
					<text class="nickname">请先登录</text>
				</view>
				<view class="userinfo-card__header__right">
					<u-button type="success" size="mini" text="登录/注册" shape="circle" @click="$u.route('pages/user/login')">
					</u-button>
				</view>
			</view>
			<view class="userinfo-card__footer">
				<view class="userinfo-card__footer__item" @click="$u.route('pages/user/msg/list')">
					<view class="userinfo-card__footer__item__data">
						0
					</view>
					<view class="userinfo-card__footer__item__name">
						未读消息
					</view>
				</view>
				<view class="userinfo-card__footer__item" @click="$u.route('pages/schedule/list')">
					<view class="userinfo-card__footer__item__data">
						3
					</view>
					<view class="userinfo-card__footer__item__name">
						报名课程
					</view>
				</view>
				<view class="userinfo-card__footer__item">
					<view class="userinfo-card__footer__item__data">
						3
					</view>
					<view class="userinfo-card__footer__item__name">
						参加活动
					</view>
				</view>
				<view class="userinfo-card__footer__item" @click="$u.route('pages/user/score')">
					<view class="userinfo-card__footer__item__data">
						99
					</view>
					<view class="userinfo-card__footer__item__name">
						积分
					</view>
				</view>

			</view>
		</view>

		<!-- 会员卡 -->
		<view class="vip-card-wrap">
			<view class="vip-card">
				<view class="vip-card__left">
					<text class="vip-card__left__title">升级会员</text>
					<text class="vip-card__left__sub">享受99+项福利</text>
				</view>
				<u-button type="warning" shape="circle" text="立即开通" size="mini"
					:customStyle="{width:'150rpx',margin:'0'}">
				</u-button>
			</view>
		</view>

		<!-- 浏览历史 -->
		<view class="card-list-wrap">
			<view class="card-header">
				<text class="title">浏览历史</text>
				<u-icon name="arrow-right" size="18"></u-icon>
			</view>
			<!-- 横向滚动列表 -->
			<scroll-view scroll-x="true" :show-scrollbar="false" class="scrollx-body-wrap">
				<view class="history-card-body" @click="$u.route('pages/course/detail')">
					<view class="image-wrap">
						<text class="tag">课程</text>
						<u-image src="/static/img/school_logo1.png" mode="aspectFill" width="250rpx" height="180rpx"
							radius="10">
						</u-image>
					</view>
					<view class="title u-line-1">寒假夏令营</view>
				</view>
				
				<view class="history-card-body">
					<view class="image-wrap">
						<text class="tag">课程</text>
						<u-image src="/static/img/school_logo1.png" mode="aspectFill" width="250rpx" height="180rpx"
							radius="10">
						</u-image>
					</view>
					<view class="title u-line-1">寒假夏令营</view>
				</view>
				<view class="history-card-body">
					<view class="image-wrap">
						<text class="tag">课程</text>
						<u-image src="/static/img/school_logo1.png" mode="aspectFill" width="250rpx" height="180rpx"
							radius="10">
						</u-image>
					</view>
					<view class="title u-line-1">寒假夏令营</view>
				</view>
			</scroll-view>
		</view>

		<!-- 菜单列表 -->
		<view class="menu-list-wrap">
			<u-cell-group>
				<u-cell icon="clock-fill" title="上课记录" size="large" :isLink="true"></u-cell>
				<u-cell icon="integral-fill" title="会员等级" size="large" :isLink="true"></u-cell>
				<u-cell icon="server-man" title="联系客服" size="large" :isLink="true"></u-cell>
				<u-cell icon="setting-fill" title="设置" size="large" :isLink="true"></u-cell>
			</u-cell-group>
		</view>

		<!-- 管理学生信息弹出层 -->
		<u-popup :show="adminStudentsPopupShow" round="20" closeable closeOnClickOverlay
			@close="adminStudentsPopupShow = false">
			<view class="popup-slot-wrap">
				<view class="popup-title">
					管理学生信息
				</view>
				<view class="popup-body">
					<view class="student-list-wrap">
						<view class="student-wrap">
							<view class="student-info">
								<u-avatar src="/static/img/avatar1.jpg" size="48"></u-avatar>
								<view class="info-wrap">
									<view class="name">
										王大花
									</view>
									<view class="rel">
										本人
									</view>
								</view>
							</view>
							<u-button type="warning" text="默认" size="mini" :customStyle="{width:'120rpx',margin:'0'}">
							</u-button>
						</view>
						<view class="student-wrap">
							<view class="student-info">
								<u-avatar src="/static/img/avatar3.jpg" size="48"></u-avatar>
								<view class="info-wrap">
									<view class="name">
										张小花
									</view>
									<view class="rel">
										女儿
									</view>
								</view>
							</view>
							<u-button type="success" text="设为默认" size="mini" :customStyle="{width:'120rpx',margin:'0'}">
							</u-button>
						</view>
					</view>
					<u-button type="success" text="新增学生信息"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				adminStudentsPopupShow: false,
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.body-wrap {
		min-height: auto;
	}

	.userinfo-card {
		padding: 32rpx 44rpx;
		background-color: #ffffff;

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 32rpx;

			&__left {
				display: flex;
				align-items: center;

				.nickname {
					color: $u-main-color;
					font-size: $u-p;
					font-weight: bold;
					margin-left: 20rpx;
				}
			}
		}

		&__footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 24rpx;

			&__item {
				display: flex;
				flex-direction: column;
				align-items: center;

				&__data {
					color: $u-main-color;
					font-size: 44rpx;
					font-weight: bold;
				}

				&__name {
					color: $u-tips-color;
					font-size: $u-p3;
				}
			}
		}
	}

	.vip-card-wrap {
		padding: 0 32rpx;
		background-color: #FFFFFF;

		.vip-card {
			padding: 20rpx 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			background-image: linear-gradient(45deg, #2b273e, #423b5e);

			&__left {
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				&__title {
					color: #FFFFFF;
					font-size: $u-p;
					font-weight: bold;
				}

				&__sub {
					color: $u-tips-color;
					font-size: $u-p3;
				}
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
		box-shadow: 0 -20rpx 15rpx rgba($color: #000000, $alpha: 0.2);

		// border-top: 1rpx solid $u-border-color;
		// border-bottom: 1rpx solid $u-border-color;
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

		// 课程、教师滑动
		.scrollx-body-wrap {
			white-space: nowrap;

			.history-card-body {
				display: inline-block;
				margin-right: 24rpx;

				.image-wrap {
					position: relative;

					.tag {
						color: #ffffff;
						background-color: $uni-color-error;
						font-size: $u-sub;
						position: absolute;
						z-index: 1;
						left: 0;
						padding: 6rpx 12rpx;
						border-top-left-radius: 10rpx;
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
					color: $u-content-color;
					text-align: left;
					margin-top: 10rpx;
					font-size: $u-p2;
				}
			}

			.course-card-body:last-child,
			.teacher-card-body:last-child {
				margin-right: 0rpx;
			}
		}
	}

	.menu-list-wrap {
		background-color: #FFFFFF;
	}

	.student-list-wrap {
		min-height: 20vh;
		margin-bottom: 50rpx;

		.student-wrap {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.student-info {
				width: 100%;
				display: flex;
				align-items: center;

				.info-wrap {
					margin-left: 20rpx;

					.name {
						font-size: $u-p2;
					}

					.rel {
						color: $u-tips-color;
						font-size: $u-sub;
					}
				}
			}
		}
	}
</style>
