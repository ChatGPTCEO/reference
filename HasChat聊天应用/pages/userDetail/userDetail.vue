<template>
	<view class="detail-box" :style="{height:windowHeight + 'px'}">
		<scroll-view scroll-y class="detail-main" :style="{height:contentHeight + 'px'}">
			<view class="head">
				<view class="info-box">
					<view class="img-box">
						<image :src="revicer.Avatar" mode="widthFix"></image>
					</view>
					<view class="info-detail">
						<view class="name">
							{{revicer.NickName}}
						</view>
					</view>
				</view>
			</view>
			<view class="info-more">
				<view class="more-item">
					<view class="title">
						备注
					</view>
					<view class="value">
						{{revicer.Name}}
					</view>
				</view>
				<view class="more-item">
					<view class="title">
						个性签名
					</view>
					<view class="value">
						{{revicer.PersonalitySign}}
					</view>
				</view>
				<view class="more-item">
					<view class="title">
						地区
					</view>
					<view class="value">
						{{revicer.Region}}
					</view>
				</view>
				<view class="more-item">
					<view class="title">
						手机
					</view>
					<view class="value">
						{{revicer.Mobile}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="detail-bottom" :style="{height:bottomHeight + 'px'}">
			<view class="send-btn" @click="readySend">
				发送消息
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				revicer: this.$store.state.readyReciver,
				windowHeight: 0,
				contentHeight: 0,
				bottomHeight: 55
			}
		},
		mounted() {
			this.getTelephoneInfo();
		},
		methods: {
			//获取设备信息
			async getTelephoneInfo() {
				uni.getSystemInfo({
					success: (res) => {
						let titleHeight = uni.getSystemInfoSync().statusBarHeight + 45;
						this.windowHeight = res.windowHeight;
						this.contentHeight = this.windowHeight - this.bottomHeight - titleHeight;
					}
				})
			},
			readySend() {
				this.$store.commit('setPropName', {
					propName: 'sessionSelectId',
					value: this.$store.state.readyReciver.Id
				});
				this.$store.commit('setPropName', {
					propName: 'reciver',
					value: this.$store.state.readyReciver
				});
				let len =
					this.$store.state.sessionList.filter(
						(x) => x.Id == this.$store.state.readyReciver.Id
					)?.length ?? 0;
				if (len === 0) {
					let sessionList = this.$store.state.sessionList;
					sessionList.push(this.$store.state.readyReciver);
					this.$store.commit("setPropName", {
						propName: "sessionList",
						value: sessionList
					});

					let query = {
						SendId: this.$store.state.sender.Id,
						Revicer: this.$store.state.readyReciver,
					};
					this.$store.state.socket.emit("insertHistorySession", query);
				}
				this.$store.commit("changeReaded", this.$store.state.readyReciver.Id);
				this.$Common.navigateTo("/chatContent/chatContent");
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail-box {
		height: 100vh;
		width: 100%;
		background-color: #F6F7FD;

		.detail-main {
			height: 90vh;
			width: 100%;
			background-color: #F6F7FD;
			overflow-y: auto;

			.head {
				height: 150rpx;
				width: 100%;
				position: relative;
				background-color: #292d32;
				margin-bottom: 100rpx;

				.info-box {
					position: absolute;
					top: 100%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: #fff;
					height: 160rpx;
					width: 90%;
					border-radius: 10rpx;
					padding: 20rpx;
					display: flex;

					.img-box {
						width: 20%;
						height: 100%;

						image {
							width: 80%;
							border-radius: 20rpx;
						}
					}

					.info-detail {
						width: 70%;
						height: 100%;

						.name {
							font-size: 30rpx;
						}
					}
				}

			}

			.info-more {
				background-color: #fff;
				padding: 10rpx;
				font-size: 26rpx;

				.more-item {
					width: 100%;
					display: flex;
					padding: 14rpx 0;

					.title {
						width: 20%;
					}

					.value {
						width: 80%;
					}
				}
			}
		}

		.detail-bottom {
			height: 10vh;
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 10rpx;

			.send-btn {
				width: 80%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				border-radius: 60rpx;
				color: #fff;
				background-color: #292d32;
				margin: 0 auto;
			}
		}
	}
</style>
