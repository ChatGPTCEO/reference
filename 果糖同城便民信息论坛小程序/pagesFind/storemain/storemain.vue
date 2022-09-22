<template>
	<view class="warp">
		<block v-if="main">
			<u-swiper height="300" :list="main.banner_images" mode="number"></u-swiper>
			<view class="store">
				<text class="name">{{main.name}}</text>
				<text class="score">综合评分：{{main.score}}</text>
				<view class="cell">
					<u-icon name="clock" size="30"></u-icon>
					<view class="open">
						<view class="">
							<text>营业时间：</text>
						</view>
						<view style="flex: 1;">
							<text>{{main.openweeks_text}} {{main.open_etime}}-{{main.open_stime}}</text>
						</view>
					</view>
				</view>
				<view class="cell" @click="openmap">
					<view style="flex: 1;">
						<u-icon name="map" size="30"></u-icon>
						<text style="margin-left: 20rpx;">{{main.address}}</text>
					</view>
					<u-icon name="arrow-right" size="30"></u-icon>
				</view>
			</view>
			<view class="comment" v-if="main.comment_count>0">
				<view class="head" @click="$u.route('/pagesFind/storecomment/storecomment',{store_id:main.id})">
					<text>网友评价（{{main.comment_count}}）</text>
					<u-icon name="arrow-right" color="#666666" size="30"></u-icon>
				</view>
				<view class="comlist" v-for="(item,index) in main.comment" :key="index">
					<view class="user">
						<u-image width="100rpx" height="100rpx" shape="circle" :src="item.user.avatar"></u-image>
						<view class="userinfo">
							<text>{{item.user.nickname}}</text>
							<text>{{item.createtime_text}}</text>
						</view>
						<text>评分：{{item.score}}</text>
					</view>
					<text class="comcont">{{item.content}}</text>
					<view class="comimg">
						<u-image v-for="(it,ix) in item.images" :key="ix" width="213rpx" height="213rpx"
							style="margin: 5rpx;" :src="it">
						</u-image>
					</view>
				</view>
				<view class="bot" @click="$u.route('/pagesFind/storecomment/storecomment',{store_id:main.id})">
					<text>查看全部评价</text>
				</view>
			</view>
			<view class="content">
				<view class="head">
					<text>店铺介绍</text>
				</view>
				<text class="cont">{{main.content}}</text>
			</view>
			<view style="height: 100rpx;"></view>
			<view class="toolFbox">
				<view class="tool-item" @click="toCom">
					<u-icon name="edit-pen-fill"></u-icon>
					<text>点评</text>
				</view>
				<view class="tool-item" @click="toCollect">
					<u-icon name="bookmark-fill" :color="main&&main.is_collect?'#f44c01':'#333333'"></u-icon>
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
		</block>
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
	export default {
		data() {
			return {
				src: '',
				main: null,
				shareShow: false,
			};
		},
		onLoad(e) {
			this.$u.get('/addons/hicity/store/main', {
				id: e.id
			}).then(res => {
				this.main = res;
			})
		},
		onShareAppMessage() {
			return {
				title: this.main.name,
			}
		},
		methods: {
			openmap() {
				if (this.main) {
					let latitude = parseFloat(this.main.lat);
					let longitude = parseFloat(this.main.lng);
					uni.openLocation({
						latitude: latitude,
						longitude: longitude,
						name: this.main.name,
						address: this.main.address,
						success: function() {
							console.log('success');
						}
					});
				}
			},
			toCom() {
				let params = {
					id: this.main.id,
					name: this.main.name,
					cover_image: this.main.cover_image
				};
				this.$u.route('/pagesFind/addcomment/addcomment', {
					params: encodeURIComponent(JSON.stringify(params))
				});
			},
			toCollect() {
				this.$u.post('/addons/hicity/user/collect', {
					info_id: this.main.id,
					type: 'store',
					title: this.main.name,
					image: this.main.cover_image ? this.main.cover_image : '',
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

<style lang="scss" scoped>
	.warp {
		padding: 20rpx;

		.store {
			display: flex;
			flex-direction: column;
			background-color: white;
			padding: 20rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;

			.name {
				font-size: 32rpx;
				font-weight: bold;
			}

			.score {
				font-size: 26rpx;
				margin-top: 10rpx;
			}

			.cell {
				padding: 10rpx 0;
				display: flex;
				flex-direction: row;
				align-items: flex-start;
				margin-top: 10rpx;
				color: #666666;

				.open {
					margin-left: 20rpx;
					display: flex;
					flex-direction: row;
				}
			}
		}

		.comment {
			display: flex;
			flex-direction: column;
			background-color: white;
			padding: 20rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;

			.head {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
			}

			.comlist {
				display: flex;
				flex-direction: column;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #e6e6e6;

				.user {
					display: flex;
					flex-direction: row;
					align-items: center;

					.userinfo {
						display: flex;
						flex-direction: column;
						line-height: 45rpx;
						flex: 1;
						margin-left: 20rpx;
					}
				}

				.comcont {
					font-size: 28rpx;
					margin-top: 20rpx;
				}

				.comimg {
					margin-top: 15rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: wrap;
				}
			}

			.bot {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding-top: 20rpx;
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			background-color: white;
			padding: 20rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
			min-height: 400rpx;

			.head {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
			}

			.cont {
				font-size: 28rpx;
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
		.btnbox{
			padding: 30rpx;
		}
	}
</style>
