<template>
	<view>
		<view class="store-bg">
			<u-image width="100%" height="300rpx" src="" v-if="false"></u-image>
		</view>
		<view class="store-card">
			<view class="inv-top">
				<u-cell-group :border="false">
					<u-cell-item :icon="info.mer_avatar" icon-size="150" :title="info.mer_name" :title-style="{fontSize: '32rpx', color: '#333'}"
					 :label="info.mer_address" center :arrow="false" :border-bottom="false" padding="20rpx 0 10rpx" hover-class="none">
						<view class="follow-number">
							<u-icon name="eye" size="32" color="#999"></u-icon>
							<text class="text">{{ info.care_count }}</text>
							<text class="smll">人关注</text>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
			<view class="u-margin-top-20">
				<u-alert-tips type="warning" show-icon icon="tags" :description="info.mer_info || '快说点什么吧~'"></u-alert-tips>
			</view>
			<view class="store-grid">
				<u-grid :col="4" :border="false">
					<u-grid-item @click="callPhone(info.service_phone || '')">
						<u-icon name="phone-fill" :size="46" color="#666"></u-icon>
						<view class="grid-text">电话</view>
					</u-grid-item>
					<u-grid-item @click="openLocation">
						<u-icon name="map-fill" :size="46" color="#666"></u-icon>
						<view class="grid-text u-line-1">约{{ userDistance }}km</view>
					</u-grid-item>
					<u-grid-item>
						<button type="default" open-type="share" class="no-btn"></button>
						<u-icon name="share-fill" :size="46" color="#666"></u-icon>
						<view class="grid-text">分享</view>
					</u-grid-item>
					<u-grid-item @click="onStar">
						<u-icon name="star-fill" :size="46" :color="info.care ? '#ffdd00' : '#666'"></u-icon>
						<view class="grid-text">{{ info.care ? '已收藏' : '收藏' }}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- tabs -->
		<view class="tabs-box">
			<u-tabs :list="tabsList" :current="tabsCurrent" bg-color="none" show-bar active-color="#333" :bar-style="{backgroundColor: '#f29100'}"
			 @change="tabsChange">
			</u-tabs>
		</view>
		<!-- shop list -->
		<view class="shop-list">
			<view class="s-title">
				<text class="text">到店套餐</text>
			</view>
			<view class="shop-item" v-for="(item, index) in list" @click="toDetails(item.product_id)">
				<advance-item :src="item.image" :title="item.store_name" :price="item.price" :old-price="item.ot_price" :show-label="false"
				 btn-text="抢购" @handle="toDetails(item.product_id)">
				</advance-item>
			</view>
		</view>
		<!-- other info -->
		<view class="shopcard-area">
			<view class="s-title">
				<text class="text">门店信息</text>
			</view>
			<view class="vtops">
				<text class="shopname u-line-1">{{ info.mer_name }}</text>
				<view class="vicons ml-auto">
					<view class="vt-ico" @click="callPhone(info.service_phone)">
						<u-icon name="phone-fill" size="28"></u-icon>
					</view>
					<view class="vt-ico" @click="openLocation">
						<u-icon name="map-fill" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="vbots">
				<text class="text">· {{ info.service_date || '-' }}</text>
				<text class="text">· {{ info.mer_address }}</text>
			</view>
		</view>
		<!-- <view class="cell-grid">
      <u-cell-group>
      	<u-cell-item icon="integral-fill" title="商家资质" center></u-cell-item>
      </u-cell-group>
    </view> -->
		<view class="foot-logo">
			<!-- <image :src="baseInfo.site_logo" mode="aspectFit" class="logo"></image> -->
			<text class="text">{{ baseInfo.site_name }}提供</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsList: [
					// {
					//   name: '优惠'
					// },
					{
						name: '到店套餐'
					}
				],
				tabsCurrent: 0,
				id: 0,
				info: {},
				list: [],
				userDistance: 0
			};
		},
		computed: {
			baseInfo() {
				return this.$store.state.baseInfo
			}
		},
		onLoad(options) {

			if (options.scene) {
				var scene = decodeURIComponent(options.scene);
				var obj = this.parseQuery(scene)
				this.id = obj.thirdid;

			} else
				this.id = options.id
			this.getInfo()
			this.getList()
		},
		onShareAppMessage(res) {
			return {
				title: '分享了一个商家',
				path: '/pages/goods/store?id=' + this.id
			}
		},
		methods: {

			parseQuery(query) {
				var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
				var obj = {};
				while (reg.exec(query)) {
					obj[RegExp.$1] = RegExp.$2;
				}
				return obj;
			},
			toDetails(id) {
				this.toRoute({
					url: 'pages/goods/details',
					params: {
						id: id
					}
				})
			},
			toRoute(params) {
				this.$u.route(params)
			},
			getList() {
				this.$u.get(`/api/store/merchant/product/lst/${this.id}`, {

				}).then(({
					data
				}) => {
					this.list = data.list
				})
			},
			onStar() {
				if (!this.info.care) {
					this.$u.post('/api/user/relation/create', {
						type_id: this.id,
						type: 10
					}).then((res) => {
						uni.showToast({
							title: res.message
						})
						this.getInfo()
					})
				} else {
					this.$u.post('/api/user/relation/delete', {
						type_id: this.id,
						type: 10
					}).then((res) => {
						uni.showToast({
							title: res.message
						})
						this.getInfo()
					})
				}
			},
			openLocation() {
				let longitudelatitude = this.info.longitudelatitude
				if (longitudelatitude) {
					longitudelatitude = longitudelatitude.split(',')
					uni.openLocation({
						latitude: Number(longitudelatitude[0]) || 0,
						longitude: Number(longitudelatitude[1]) || 0,
						name: this.info.mer_address
					})
				} else {
					uni.showToast({
						title: '商家未设地址',
						icon: 'none'
					})
					// uni.openLocation({
					//   name: this.info.mer_address
					// })
				}
			},
			// 计算距离
			calcDistance(la2, lo2) {
				let la1 = uni.getStorageSync('user_latitude')
				let lo1 = uni.getStorageSync('user_longitude')
				return new Promise((resolve) => {
					if (!la1) {
						resolve('0.00')
					} else {
						let La1 = la1 * Math.PI / 180.0;
						let La2 = la2 * Math.PI / 180.0;
						let La3 = La1 - La2;
						let Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
						let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(
							Lb3 / 2), 2)));
						s = s * 6378.137; //地球半径
						s = Math.round(s * 10000) / 10000;
						if (s > 7000) s -= 7000;
						resolve(s.toFixed(2))
					}
				})
			},
			callPhone(phone) {
				if (phone) {
					uni.makePhoneCall({
						phoneNumber: phone
					})
				} else {
					uni.showToast({
						title: '商家未设置号码',
						icon: 'none'
					})
				}
			},
			getInfo() {
				this.$u.get(`/api/store/merchant/detail/${this.id}`)
					.then(({
						data
					}) => {
						this.info = data
						let longitudelatitude = this.info.longitudelatitude
						if (longitudelatitude) {
							longitudelatitude = longitudelatitude.split(',')
							//console.log('精度:',longitudelatitude[0],"纬度:",longitudelatitude[1])
							this.calcDistance(longitudelatitude[0], longitudelatitude[1])
								.then((distance) => {
									this.userDistance = distance
								})
						}
					})
			},
			tabsChange(index) {
				this.tabsCurrent = index;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg;
	}

	.store-bg {
		position: relative;
		z-index: 0;
		width: 100%;
		min-height: 70rpx;
	}

	.store-card {
		margin: -50rpx $gutter 0;
		border-radius: $uni-border-radius-lg;
		min-height: 200rpx;
		overflow: hidden;
		box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.1);
		background-color: #fff;
		padding: $gutter $gutter 0;
		position: relative;
		z-index: 10;
	}

	.follow-number {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100rpx;
		line-height: 1.2em;
		border-radius: $uni-border-radius-base;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);
		margin: 10rpx;
		margin-left: auto;
		padding: 10rpx;

		.text {
			font-size: 24rpx;
			color: #333;
		}

		.small {
			font-size: 20rpx;
			color: #999;
		}
	}

	.store-grid {
		margin-top: 10rpx;

		.grid-text {
			font-size: $uni-font-size-base;
			color: #333;
			margin-top: 10rpx;
		}
	}

	.s-title {
		font-size: 42rpx;
		color: #333;
		padding: 0 0 $gutter;
	}

	.shopcard-area {
		display: flex;
		flex-direction: column;
		padding: $gutter;
		margin: $gutter;
		background-color: #fff;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);

		.vtops {
			display: flex;
			align-items: center;
			padding-bottom: 10rpx;
		}

		.vbots {
			font-size: $uni-font-size-sm;
			color: #999;
			display: flex;
			flex-direction: column;

			.text {
				margin-bottom: 10rpx;
			}
		}

		.shopname {
			font-size: $uni-font-size-lg;
			color: #333;
			flex: 1;
		}

		.vicons {
			display: flex;
			align-items: center;
		}

		.vt-ico {
			border-radius: 50%;
			border: 1rpx solid #333;
			width: 50rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: $gutter;
		}
	}

	.cell-grid {
		margin: $gutter;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
	}

	.tabs-box {
		padding: $gutter;
	}

	.shop-list {
		margin: 0 $gutter;
		padding: $gutter $gutter 10rpx;
		background-color: #fff;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);

		.shop-item {
			margin-bottom: $gutter;
		}
	}

	.foot-logo {
		padding: $gutter;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.text {
			font-size: 24rpx;
			color: #999;
			margin-top: $gutter;
		}

		.logo {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.no-btn {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		border: none;
		background: none !important;
		padding: 0;
		margin: 0;
		height: 100%;
		opacity: 0;
	}
</style>
