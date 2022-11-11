<template>
	<view v-if="main">
		<view>
			<view class="jobcard">
				<text class="title">{{main.name}}</text>
				<text class="gender">性别：{{main.gender_text}}</text>
				<view class="info-tag">
					<u-image width="28rpx" height="28rpx" src="@/static/images/job.png"></u-image>
					<text style="margin-left: 10rpx;">期望职位：{{main.jobcategory.name}}</text>
				</view>
				<view class="tagbox">
					<view class="info-tag">
						<u-image width="28rpx" height="28rpx" src="@/static/images/job.png"></u-image>
						<text style="margin-left: 10rpx;">{{main.work_exp_text}}经验</text>
					</view>
					<view class="info-tag" style="margin-left: 30rpx;">
						<u-image width="28rpx" height="28rpx" src="@/static/images/job.png"></u-image>
						<text style="margin-left: 10rpx;">{{main.edu_text}}学历</text>
					</view>
				</view>
			</view>
			<view class="cont">
				<text class="cont-title">自我介绍</text>
				<text class="cont-text">{{main.content}}</text>
				<text class="cont-text">联系我时请告知是在【{{appName}}】信息服务平台看到的！</text>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="toolFbox">
			<view class="tool-item" @click="toCollect">
				<u-icon name="bookmark-fill" :color="main.is_collect?'#f44c01':'#333333'"></u-icon>
				<text>收藏</text>
			</view>
			<view class="tool-item" @click="shareShow = true">
				<u-icon name="share-fill"></u-icon>
				<text>分享</text>
			</view>
			<view class="tool-btn" @click="callPhone">
				<text>立即联系</text>
			</view>
		</view>
		<u-popup v-model="shareShow" border-radius="20" mode="center">
			<view class="shareCont">
				<view class="head">
					<view class="title">
						<text>分享</text>
					</view>
					<view class="close" @click="shareShow=false">
						<u-icon name="close" size="20" color="#ffffff"></u-icon>
					</view>
				</view>
				<view class="btnbox">
					<u-button type="primary" open-type="share">分享给好友</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		APP_NAME
	} from '../../env.js'
	export default {
		data() {
			return {
				id: 0,
				main: null,
				appName: APP_NAME,
				shareShow: false,
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.getMain();
		},
		onShareAppMessage() {
			return {
				title: this.main.title
			}
		},
		methods: {
			getMain() {
				this.$u.get('/addons/hicity/resume/main', {
					id: this.id
				}).then(res => {
					this.main = res;
				})
			},
			openMap() {
				uni.openLocation({
					latitude: parseFloat(this.main.work_lat),
					longitude: parseFloat(this.main.work_lng),
					address: this.main.work_address,
					success: function() {
						console.log('success');
					}
				});
			},
			toCollect() {
				this.$u.post('/addons/hicity/user/collect', {
					info_id: this.id,
					type: 'resume',
					title: this.main.name,
					image: '',
				}).then(res => {
					if (res) {
						this.main.is_collect = true;
					} else {
						this.main.is_collect = false;
					}
				})
			},
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.main.person_mobile
				});
			}
		}
	}
</script>
<style>
	page {
		background-color: white;
	}
</style>
<style lang="scss" scoped>
	.jobcard {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		margin: 20rpx;
		box-shadow: 0px 0px 20rpx #e6e6e6;
		border-radius: 20rpx;

		.title {
			font-size: 35rpx;
			color: #333333;
			font-weight: bold;
		}

		.gender {
			font-size: 28rpx;
			margin-top: 10rpx;
			color: #666666;
		}

		.price {
			font-size: 35rpx;
			color: #ff2d45;
			font-weight: bold;
			margin-top: 20rpx;
		}

		.tagbox {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.info-tag {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #666666;
		}

		.bot {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			font-size: 25rpx;
			color: #999999;
			margin-top: 20rpx;
		}
	}

	.labels {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		margin: 40rpx 20rpx;

		.label {
			font-size: 28rpx;
			color: #666666;
			background-color: #f8f8f8;
			padding: 5rpx 20rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}

	.cont {
		display: flex;
		flex-direction: column;
		margin: 0 20rpx;

		.cont-title {
			font-size: 35rpx;
			color: #333333;
			font-weight: bold;
		}

		.cont-text {
			margin-top: 20rpx;
			color: #666666;
			font-size: 28rpx;
			line-height: 45rpx;
		}

		.sitebox {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;

			.address {
				display: flex;
				flex-direction: row;
				align-items: center;

				.text {
					color: #666666;
					font-size: 30rpx;
					margin-left: 10rpx;
				}
			}

			.btn {
				padding: 5rpx 20rpx;
				font-size: 32rpx;
				color: #40c6bf;
				background-color: #ebf9f8;
				border-radius: 5rpx;
			}
		}
	}

	.toolFbox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20rpx;
		border-top: 1rpx solid #F8F8F8;

		.tool-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.tool-btn {
			width: 350rpx;
			height: 70rpx;
			background-color: #F44C01;
			color: white;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-radius: 40rpx;
		}
	}

	.shareCont {
		width: 350rpx;

		.head {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 80rpx;
			border-bottom: 1rpx solid #e6e6e6;

			.title {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 20rpx;
			}
		}

		.close {
			background-color: rgba(0, 0, 0, 0.5);
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		.btnbox {
			padding: 30rpx;
		}
	}
</style>
