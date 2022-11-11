<template>
	<view class="body-wrap">
		<!-- 消息列表 -->
		<view class="msg-list-wrap">
			<view class="msg-card" @click="readMsgPopupShow = true">
				<view class="left-info">
					<u-avatar src="/static/img/avatar1.jpg" size="48"></u-avatar>
					<view class="msg-content">
						<view class="title u-line-1">
							张老师 - 马栏山国际幼儿园
						</view>
						<view class="content u-line-1">
							您好，您的的预约已经通过，请按时到访哦~
						</view>
					</view>
				</view>
				<view class="right-info">
					<text class="date">3-8 12:15</text>
					<u-icon name="checkbox-mark" size="16"></u-icon>
				</view>
			</view>
			<view class="msg-card">
				<view class="left-info">
					<u-avatar src="/static/img/school_logo1.png" size="48"></u-avatar>
					<view class="msg-content">
						<view class="title u-line-1">
							马栏山国际幼儿园
						</view>
						<view class="content u-line-1">
							您好，您的的预约已经通过，请按时到访哦~
						</view>
					</view>
				</view>
				<view class="right-info">
					<text class="date">3-8 12:15</text>
					<u-icon name="checkbox-mark" size="16"></u-icon>
				</view>
			</view>
			<view class="msg-card">
				<view class="left-info">
					<u-avatar src="/static/img/avatar1.jpg" size="48"></u-avatar>
					<view class="msg-content">
						<view class="title u-line-1">
							张老师 - 马栏山国际幼儿园
						</view>
						<view class="content u-line-1">
							您好，您的的预约已经通过，请按时到访哦~
						</view>
					</view>
				</view>
				<view class="right-info">
					<text class="date">3-8 12:15</text>
					<u-icon name="checkbox-mark" size="16"></u-icon>
				</view>
			</view>
		</view>

		<!-- 阅读消息 -->
		<u-popup :show="readMsgPopupShow" round="20" mode="center" closeable closeOnClickOverlay
			@close="readMsgPopupShow = false">
			<view class="popup-slot-wrap">
				<view class="popup-title">
					阅读消息
				</view>
				<view class="popup-body">
					<view class="read-card">

						<view class="user-info-wrap">

							<view class="user-info">
								<u-avatar src="/static/img/avatar1.jpg" size="48"></u-avatar>
								<view class="left-info">
									<view class="title">
										张老师
									</view>
									<view class="content">
										马栏山国际幼儿园
									</view>
								</view>

							</view>
							<view class="right-info">
								<text class="date">3-8 12:15</text>
								<u-icon name="checkbox-mark" size="16"></u-icon>
							</view>
						</view>
						<view class="msg-wrap">
							您好，您的的预约已经通过，请按时到访哦~
						</view>
					</view>
				</view>
				<view class="popup-footer">
					<u-button text="取消" :customStyle="{marginRight:'10rpx'}" @click="readMsgPopupShow = false"></u-button>
					<u-button text="确认" type="success"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				readMsgPopupShow: false,
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.msg-list-wrap {
		background-color: #FFFFFF;
		padding: 24rpx;
		width: 700rpx;

		.msg-card {
			
			&:last-child {
				margin-bottom: 0rpx;
				border-bottom: none;
			}
			
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			border-bottom: 1rpx solid $u-border-color;
			margin-bottom: 20rpx;

			padding-bottom: 20rpx;

			.left-info {
				display: flex;
				align-items: center;

				.msg-content {
					margin-left: 20rpx;

					.title {
						font-size: $u-p;
						margin-bottom: 10rpx;
					}

					.content {
						max-width: 480rpx;
						color: $u-content-color;
						font-size: $u-p3;
					}
				}
			}

			.right-info {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: space-between;
				height: 80rpx;
				color: $u-content-color;

				.date {
					font-size: $u-sub;
				}
			}
		}
	}

	.popup-slot-wrap {
		width: 650rpx;
		min-height: 400rpx;
		// padding: 24rpx;

		.read-card {
			padding: 24rpx;
			min-height: 200rpx;

			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.user-info-wrap {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.user-info {
					margin-bottom: 20rpx;
					display: flex;


					.left-info {
						margin-left: 20rpx;

						.title {
							font-size: $u-p;
							margin-bottom: 10rpx;
						}

						.content {
							max-width: 480rpx;
							color: $u-content-color;
							font-size: $u-p3;
						}
					}


				}

				.right-info {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					justify-content: space-between;
					height: 80rpx;
					color: $u-content-color;

					.date {
						font-size: $u-sub;
					}
				}
			}

			.msg-wrap {
				color: $u-content-color;
				padding: 20rpx;
				border-radius: 10rpx;
				background-color: $u-bg-color;
			}
		}


	}
</style>
