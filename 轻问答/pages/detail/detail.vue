<template>
	<view class="Qin-question-detail">
		<view class="detail_content">
			<view class="detail_title">
				jwt 过期刷新token之后，后面的请求咋办？
			</view>
			<view class="detail_user_info">
				<img src="static/img/user.png" alt="" srcset="">
				<view class="user_info">
					<text class="user_name">用户名</text>
					<text>发布时间：2022-08-15</text>
				</view>
			</view>
			<view>
				我使用的是spring-security+oauth2+jwt生成access_token和refresh_token，access_token设置成2小时过期，然后使用refresh_token获取新的access_token和refresh_token，这里都没问题，问题是，我获取完之后，之前的请求咋办？没有继续请求断了。
			</view>
		</view>
		<view class="detail_question">
			<view class="user_question_header">
				<view class="count_question">
					2个回答
				</view>
				<view class="send_question">
					撰写回答
				</view>
			</view>
			<view class="question_user_info">
				<img src="static/img/user.png" alt="" srcset="">
				<view class="user_info">
					<text class="user_name">用户名</text>
					<text>发布时间：2022-08-15</text>
				</view>
			</view>
			<view>
				你可以使用axios在错误拦截里继续之前的请求。
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		name: 'Qin-question-detail',
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.Qin-question-detail {
		.detail_content {
			padding: 20rpx;
			background-color: #fff;

			.detail_title {
				font-weight: bold;
				font-size: 40rpx;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #f0f0f0;
			}

			.detail_user_info {
				padding: 30rpx 0;
				display: flex;
				align-items: center;

				&>img {
					width: 60rpx;
					height: 60rpx;
				}

				.user_info {
					display: flex;
					flex-direction: column;
					font-size: 20rpx;
					margin-left: 25rpx;
					color: #c1c1c1;

					.user_name {
						font-weight: bold;
						font-size: 25rpx;
						color: #000;
					}
				}
			}
		}

		.detail_question {
			margin-top: 50rpx;
			padding: 20rpx;
			background-color: #fff;

			.user_question_header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #f0f0f0;

				.send_question {
					background-color: #00965e;
					color: #fff;
					font-size: 20rpx;
					width: 120rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
				}
			}

			.question_user_info {
				padding: 30rpx 0;
				display: flex;
				align-items: center;

				&>img {
					width: 60rpx;
					height: 60rpx;
				}

				.user_info {
					display: flex;
					flex-direction: column;
					font-size: 20rpx;
					margin-left: 25rpx;
					color: #c1c1c1;

					.user_name {
						font-weight: bold;
						font-size: 25rpx;
						color: #000;
					}
				}
			}
		}
	}
</style>
