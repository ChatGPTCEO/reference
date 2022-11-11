<template>
	<view>
		<view class="list">
			<text class="time">出发时间：{{main.go_time_text}}</text>
			<view class="cell">
				<u-image width="30rpx" height="30rpx" :src="require('../images/start.png')"></u-image>
				<text class="label">出发城市：</text>
				<text>{{main.start_area}}-{{main.start_address}}</text>
			</view>
			<view class="cell">
				<u-image width="30rpx" height="30rpx" :src="require('../images/end.png')"></u-image>
				<text class="label">到达城市：</text>
				<text>{{main.end_area}}-{{main.end_address}}</text>
			</view>
			<view class="cell" v-if="main.type=='1'">
				<u-image width="30rpx" height="30rpx" :src="require('../images/path.png')"></u-image>
				<text class="label">车型：</text>
				<text>{{main.car_type}}</text>
			</view>
			<view class="cell" v-if="main.type=='1'">
				<u-image width="30rpx" height="30rpx" :src="require('../images/path.png')"></u-image>
				<text class="label">车牌号：</text>
				<text>{{main.car_number}}</text>
			</view>
			<view class="cell" v-if="main.type=='1'">
				<u-image width="30rpx" height="30rpx" :src="require('../images/path.png')"></u-image>
				<text class="label">空余座位：</text>
				<text>{{main.seat_num}}个</text>
			</view>
			<view class="cell" v-if="main.type=='2'">
				<u-image width="30rpx" height="30rpx" :src="require('../images/path.png')"></u-image>
				<text class="label">乘车人数：</text>
				<text>{{main.person_num}}人</text>
			</view>
		</view>
		<view class="content">
			<view class="head">
				<text>联系人</text>
			</view>
			<view class="user">
				<!-- <u-image width="100rpx" height="100rpx" shape="circle" src="">
				</u-image> -->
				<view class="right">
					<text style="font-size: 30rpx;color: #333333;">{{main.person_name}}</text>
					<text style="color: #666666;font-size: 26rpx;margin-top: 10rpx;">联系我时，请说是在【{{appName}}】看到的！</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="head">
				<text>备注信息</text>
			</view>
			<text class="cont">{{main.content}}</text>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="toolFbox">
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
				main: {},
				appName: APP_NAME,
				shareShow: false,
			};
		},
		onLoad(e) {
			this.id = e.id;
			this.getMain();
		},
		onShareAppMessage() {
			return {
				title: '拼车信息-车找人-人找车'
			}
		},
		methods: {
			getMain() {
				this.$u.get('/addons/hicity/carpool/main', {
					id: this.id
				}).then(res => {
					this.main = res;
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

<style lang="scss" scoped>
	.list {
		display: flex;
		flex-direction: column;
		background-color: white;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;

		.time {
			font-size: 35rpx;
			font-weight: 600;
			padding: 10rpx;
		}

		.cell {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10rpx;

			.label {
				padding-left: 20rpx;
				padding-right: 10rpx;
				font-size: 30rpx;
			}
		}

		.bot {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.btn {
				border: 1px solid #fe9c01;
				padding: 8rpx 20rpx;
				border-radius: 30rpx;
				color: #fe9c01;
			}
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 20rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		min-height: 250rpx;

		.head {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			font-size: 32rpx;
			font-weight: bold;
		}

		.cont {
			font-size: 28rpx;
		}

		.user {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 30rpx;
			color: #333333;

			.right {
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
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
