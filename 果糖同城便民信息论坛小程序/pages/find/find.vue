<template>
	<view>
		<view class="banner" v-if="initData">
			<u-swiper :list="initData.find_banner" height="260"></u-swiper>
		</view>
		<view class="gird" v-if="initData">
			<swiper class="swiper" :indicator-dots="true">
				<swiper-item class="swiper-item" v-for="(item,index) in initData.find_menu" :key="index">
					<u-grid :col="4" :border="false">
						<u-grid-item style="background: rgba(0,0,0,0);" @click="$u.route(it.path,{id:it.id})"
							v-for="(it,ix) in item" :key="ix">
							
						    <view class="u-icon-shopbag-fill newicon-normal"></view>
							
							<view class="grid-text">{{it.name}}</view>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="u-text-center u-font-34 u-m-t-30 u-m-b-30">好店推荐</view>
		
		
		<view class="list">
			<view class="list-item" v-for="(item,index) in storeList" :key="index"
				@click="$u.route('/pagesFind/storemain/storemain',{id:item.id})">
				<view class="">
					<u-image width="185rpx" height="185rpx" :src="item.cover_image"></u-image>
				</view>
				<view class="list-item-left">
					<view class="list-item-title">
						<text>{{item.name}}</text>
					</view>
					<view class="list-item-bio">
						<view class="bio">
							<text>{{item.childcategory.name}}</text>
						</view>
						<view class="juli" v-if="item.distance">
							<text>{{item.distance}}km</text>
						</view>
					</view>
					<view class="list-item-site">
						<text>地址：{{item.address}}</text>
					</view>
				</view>
			</view>
		</view>
		<view style="background-color: white;" v-if="storeList.length==0">
			<u-empty text="暂无数据" mode="list"></u-empty>
		</view>
		<!-- #ifdef H5 -->
		<view style="height: 44px"></view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		groupArray
	} from '../../common/tools.js'
	import {
		APP_NAME
	} from '../../env.js'
	export default {
		data() {
			return {
				// noticeList: [
				// 	'寒雨连江夜入吴',
				// 	'平明送客楚山孤',
				// 	'洛阳亲友如相问',
				// 	'一片冰心在玉壶'
				// ],
				initData: null,
				storeList: [],
				search: {
					page: 1,
					lat: '',
					lng: '',
				}
			}
		},
		onLoad() {
			if (!uni.getStorageSync('initData')) {
				this.$u.get('/addons/hicity/index/init', {

				}).then(res => {
					uni.setStorageSync('initData', res);
					let arr = groupArray(res.find_menu, 8);
					res.find_menu = arr;
					this.initData = res;
				})
			} else {
				let res = uni.getStorageSync('initData');
				let arr = groupArray(res.find_menu, 8);
				res.find_menu = arr;
				this.initData = res;
			}
			this.getStoreList()
			var that = this;
			//#ifdef MP
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation({
						type: 'wgs84',
						success: function(res) {
							that.search.lat = res.latitude;
							that.search.lng = res.longitude;
							that.getStoreList()
						}
					});
				},
				fail() {
					uni.showModal({
						title: '提示',
						content: '您没有开启定位权限,请前往开启！',
						success: function(res) {
							if (res.confirm) {
								uni.openSetting({
									success(res) {
										console.log(res.authSetting)
									}
								});
							}
						}
					});
				}
			})
			//#endif
			//#ifdef H5
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					that.search.lat = res.latitude;
					that.search.lng = res.longitude;
					that.getStoreList()
				}
			});
			//#endif
		},
		onShareAppMessage() {
			return {
				title: APP_NAME,
				path: '/pages/find/find'
			}
		},
		methods: {
			getStoreList() {
				this.$u.get('/addons/hicity/store/list', this.search).then(res => {
					this.storeList = res
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner {
		margin: 20rpx;
	}

	.notice {
		margin: 0 20rpx 20rpx 20rpx;
	}

	.swiper {
		height: 380rpx;
		border-radius: 20rpx;
	}

	.swiper-item {
		border-radius: 20rpx;
	}

	.gird {
		margin: 0 20rpx;
		background-color: white;
		border-radius: 20rpx;
	}

	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		color: #333333;
		font-weight: 600;
		margin: 20rpx 0;
	}

	.list {
		background-color: white;
		margin: 20rpx;
		border-radius: 20rpx;

		.list-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;
			border-bottom: 1rpx solid #e6e6e6;

			.list-item-left {
				display: flex;
				flex-direction: column;
				min-height: 185rpx;
				margin-left: 20rpx;
				justify-content: space-between;
				flex: 1;

				.list-item-title {
					font-size: 32rpx;
					color: #333333;
				}

				.list-item-bio {
					font-size: 25rpx;
					color: red;
					margin-top: 18rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.bio {
						background-color: #FBF4E5;
						padding: 2rpx 10rpx;
					}

					.juli {
						color: #999999;
					}
				}

				.list-item-site {
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					margin-top: 18rpx;
					color: #666666;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
