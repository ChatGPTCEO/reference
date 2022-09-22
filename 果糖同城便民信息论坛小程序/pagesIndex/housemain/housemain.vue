<template>
	<view class="warp" v-if="main">
		<u-swiper v-if="main.banner_images.length>0" height="300" :list="main.banner_images" mode="number"></u-swiper>
		<view class="info">
			<text class="name">{{main.title}}</text>
			<text class="time">发布时间：{{main.createtime_text}}</text>
			<view class="label">
				<text class="item" v-for="(item,index) in main.labelconfig" :key="index">{{item.name}}</text>
			</view>
			<u-grid :col="3" :border="false">
				<u-grid-item>
					<view class="grid-params">{{main.rent}}万</view>
					<view class="grid-text">总价</view>
				</u-grid-item>
				<u-grid-item>
					<view class="grid-params">{{main.room}}室{{main.hall}}厅{{main.loo}}卫</view>
					<view class="grid-text">户型</view>
				</u-grid-item>
				<u-grid-item>
					<view class="grid-params">{{main.acreage}}㎡</view>
					<view class="grid-text">面积</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="content">
			<view class="head">
				<text>基本信息</text>
			</view>
			<view class="infolist">
				<text class="cell">楼层：<text class="text">{{main.floor}}层</text></text>
				<text class="cell">装修：<text class="text">{{main.decoration_text}}</text></text>
			</view>
			<view class="infolist">
				<text class="cell">朝向：<text class="text">{{main.towards}}</text></text>
				<text class="cell">类型：<text class="text">{{main.type_text}}</text></text>
			</view>
		</view>
		<view class="content" v-if="main.houseconfig.length>0">
			<view class="head">
				<text>租房配置</text>
			</view>
			<view class="label">
				<text class="item" v-for="(item,index) in main.houseconfig" :key="index">{{item.name}}</text>
			</view>
		</view>
		<view class="content">
			<view class="head">
				<text>联系人</text>
			</view>
			<view class="user">
				<!-- <u-image style="margin-right: 20rpx;" width="100rpx" height="100rpx" shape="circle" src="">
				</u-image> -->
				<view class="right">
					<text style="font-size: 30rpx;color: #333333;">{{main.person_name}}</text>
					<text style="color: #666666;font-size: 26rpx;margin-top: 10rpx;">联系我时，请说是在【{{appName}}】看到的！</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="head">
				<text>房屋描述</text>
			</view>
			<text class="cont">{{main.content}}</text>
		</view>
		<view style="height: 100rpx;"></view>
		
		<view class="toolFbox">
			<view class="tool-item" @click="toCollect">
				<u-icon name="bookmark-fill" :color="main.is_collect?'#ff5d37':'#333333'"></u-icon>
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
				src: '',
				id: 0,
				main: null,
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
				title: this.main.title
			}
		},
		methods: {
			getMain() {
				this.$u.get('/addons/hicity/house/main', {
					id: this.id
				}).then(res => {
					this.main = res;
				})
			},
			toCollect() {
				this.$u.post('/addons/hicity/user/collect', {
					info_id: this.id,
					type: 'house',
					title: this.main.title,
					image: this.main.banner_images && this.main.banner_images[0] ? this.main.banner_images[0] : '',
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

		.info {
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

			.time {
				color: #666666;
				font-size: 28rpx;
				margin-top: 15rpx;
			}

			.grid-params {
				color: #f44c01;
				font-size: 32rpx;
				font-weight: bold;
			}

			.grid-text {
				margin-top: 10rpx;
				color: #666666;
				font-size: 28rpx;
			}
		}

		.label {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 20rpx;

			.item {
				padding: 5rpx 20rpx;
				background-color: #F1F1F1;
				border-radius: 5rpx;
				font-size: 26rpx;
				color: #666666;
				margin-right: 15rpx;
				margin-bottom: 15rpx;
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
					display: flex;
					flex-direction: column;
				}
			}

			.infolist {
				display: flex;
				flex-direction: row;
				line-height: 50rpx;

				.cell {
					flex: 1;
					color: #666666;
					font-size: 28rpx;

					.text {
						color: #333333;
					}
				}
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
			background-color: #ff5d37;
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
