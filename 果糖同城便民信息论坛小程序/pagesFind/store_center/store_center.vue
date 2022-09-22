<template>
	<view class="contview">
		<block v-if="auth=='1'">
			<u-empty text="您还没有入驻店铺哦!" icon-size="400" src="/static/images/shop.png">
				
				<u-button type="success" slot="bottom" @click="navTo('/pagesFind/add_store/add_store',true)">立即入驻
				</u-button>
				
			</u-empty>
			
			
		</block>
		<block v-if="store&&auth=='2'">
			<view class="store">
				<view style="height: 100rpx;"></view>
				<view class="cont">
					<view class="head">
						<u-image style="border: 3rpx solid #FFFFFF;border-radius: 50%;" width="180rpx" height="180rpx"
							shape="circle" :src="store.cover_image_full[0].url"></u-image>
						<text class="name">{{store.name}}</text>
					</view>
					<u-grid :col="2" :border="false">
						<u-grid-item>
							<text class="number">{{store.looknum}}</text>
							<view class="grid-text">浏览量</view>
						</u-grid-item>
						<u-grid-item>
							<text class="number">{{store.score}}</text>
							<view class="grid-text">综合评分</view>
						</u-grid-item>
					</u-grid>
					<view class="cell">
						<u-icon name="clock" size="30"></u-icon>
						<view class="open">
							<view class="">
								<text>营业时间：</text>
							</view>
							<view style="flex: 1;">
								<text>{{store.openweeks_text}} {{store.open_etime}}-{{store.open_stime}}</text>
							</view>
						</view>
					</view>
					<view class="cell" @click="openmap">
						<u-icon name="map" size="30"></u-icon>
						<view style="flex: 1;">
							<text style="margin-left: 20rpx;">{{store.address}}</text>
						</view>
						<u-icon name="arrow-right" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="menu">
				<u-grid :col="4" :border="false">
					<u-grid-item @click="navTo('/pagesFind/add_store/add_store',true)">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu1.png"></u-image>
						<view class="grid-text">修改资料</view>
					</u-grid-item>
					<u-grid-item @click="navTo('/pagesFind/storecomment/storecomment',true,{store_id:store.id})">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu2.png"></u-image>
						<view class="grid-text">店铺点评</view>
					</u-grid-item>
					<u-grid-item @click="navTo('/pagesFind/storemain/storemain',true,{id:store.id})">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu2.png"></u-image>
						<view class="grid-text">店铺主页</view>
					</u-grid-item>
					<u-grid-item @click="toShare">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu2.png"></u-image>
						<view class="grid-text">分享店铺</view>
					</u-grid-item>
				</u-grid>
			</view>
		</block>
		<u-modal v-model="modelShow5" content="请先缴费开通哦!" confirm-color="#f44c01" :show-cancel-button="true"
			confirm-text="前往开通" @confirm="$u.route('/pagesFind/store_pay/store_pay',{id:store.id})"></u-modal>
		<u-modal v-model="modelShow2" content="您的店铺已经被禁用，如有疑问请联系客服！" :show-cancel-button="true" confirm-text="前往开通">
			<!-- #ifndef MP-WEIXIN -->
			<u-button class="custom-style" hover-class="none" @click="callPhone" slot="confirm-button" type="primary">
				联系客服</u-button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<u-button class="custom-style" hover-class="none" open-type="contact" slot="confirm-button" type="primary">
				联系客服</u-button>
			<!-- #endif -->
		</u-modal>
		<u-modal v-model="modelShow3" content="您的店铺正在审核中,请耐心等待哦!" confirm-color="#f44c01"></u-modal>
		<u-modal v-model="modelShow4" content="店铺信息审核不通过,请前往修改资料!" confirm-color="#f44c01" :show-cancel-button="true"
			confirm-text="前往修改" @confirm="$u.route('/pagesFind/add_store/add_store')"></u-modal>
		<u-popup v-model="shareShow" :zoom="false" z-index="100" mode="center">
			<view class="modelcont">
				<view class="head">
					<view class="title">
						<text>店铺海报</text>
					</view>
					<view class="close" @click="shareShow=false">
						<u-icon name="close" color="#ffffff"></u-icon>
					</view>
				</view>
				<l-painter isRenderImage :board="base" @success="getpath" />
				<view class="savebtn" @click="saveImg">
					<text>保存图片</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		APP_MOBILE,
		APP_NAME
	} from '../../env.js'
	import {
		mapActions,
		mapState
	} from 'vuex'
	import lPainter from '@/uni_modules/lime-painter/components/lime-painter/'
	export default {
		components: {
			lPainter
		},
		data() {
			return {
				store: null,
				auth: null,
				modelShow5: false,
				modelShow3: false,
				modelShow2: false,
				modelShow4: false,
				shareShow: false,
				base: {},
				drawpath: '',
				qrcodeUrl: '',
			};
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin,
			})
		},
		onShow() {
			uni.showLoading({
				title: '加载中'
			})
			this.$u.get('/addons/hicity/store/getUserStore').then(res => {
				uni.hideLoading();
				if (res) {
					this.store = res;
					this.auth = '2';
					if (res.status == '5') {
						this.modelShow5 = true;
					} else if (res.status == '2') {
						this.modelShow2 = true;
					} else if (res.status == '3') {
						this.modelShow3 = true;
					} else if (res.status == '4') {
						this.modelShow4 = true;
					}
				} else {
					this.auth = '1';
				}
			})
		},
		methods: {
			navTo(path, toLogin, params = {}) {
				if (toLogin) {
					if (this.isLogin) {
						if (this.store&&this.store.status == '2') {
							this.modelShow2 = true;
						} else if (this.store&&this.store.status == '3') {
							this.modelShow3 = true;
						} else if (this.store&&this.store.status == '4') {
							this.modelShow4 = true;
						} else if (this.store&&this.store.status == '5') {
							this.modelShow5 = true;
						} else {
							this.$u.route(path, params);
						}
					} else {
						this.$u.route('/pages/login/login')
					}

				} else {
					this.$u.route(path, params)
				}
			},
			toShare() {
				if (this.isLogin) {
					if (this.store.status == '1') {
						this.getdraw();
					} else if (this.store.status == '2') {
						this.modelShow2 = true;
					} else if (this.store.status == '3') {
						this.modelShow3 = true;
					} else if (this.store.status == '4') {
						this.modelShow4 = true;
					} else if (this.store.status == '5') {
						this.modelShow5 = true;
					}
				} else {
					this.$u.route('/pages/login/login')
				}
			},
			getdraw() {
				if (this.qrcodeUrl) {
					this.shareShow = true;
					this.drawView()
				} else {
					this.$u.get('/addons/hicity/store/getStoreCode', {
						id: this.store.id,
					}).then(res => {
						if (res) {
							this.qrcodeUrl = res;
							this.shareShow = true;
							this.drawView()
						} else {
							this.shareShow = false;
							this.$u.toast('生成失败')
						}
					}).catch(err => {
						this.shareShow = false;
						this.$u.toast('生成失败')
					})
				}
			},
			drawView() {
				this.base = {
					width: '650rpx',
					height: '900rpx',
					background: '#F6F7FB',
					views: [{
							type: 'view',
							css: {
								left: '20rpx',
								top: '20rpx',
								background: '#fff',
								radius: '16rpx',
								width: '610rpx',
								height: '860rpx',
								shadow: '0 20rpx 48rpx rgba(0,0,0,.05)'
							}
						},
						{
							type: 'image',
							src: this.store.cover_image_full[0].url,
							mode: 'widthFix',
							css: {
								left: '40rpx',
								top: '40rpx',
								width: '570rpx',
								height: '570rpx',
								radius: '12rpx'
							}
						},
						{
							type: 'text',
							text: this.store.name,
							css: {
								maxLines: 2,
								color: '#333333',
								width: '395rpx',
								left: '40rpx',
								top: '630rpx',
								fontSize: '35rpx',
								fontWeight: 'bold'
							}
						},
						{
							type: 'text',
							text: '长按或扫描二维码',
							css: {
								maxLines: 2,
								width: '395rpx',
								color: '#666666',
								left: '40rpx',
								top: '730rpx',
								fontSize: '30rpx',
								lineHeight: '50rpx'
							}
						},
						{
							type: 'text',
							text: '在' + APP_NAME + '中查看本店更多信息吧！',
							css: {
								maxLines: 2,
								width: '395rpx',
								color: '#999999',
								left: '40rpx',
								top: '780rpx',
								fontSize: '26rpx',
								lineHeight: '50rpx'
							}
						},
						{
							type: 'image',
							src: this.qrcodeUrl,
							mode: 'widthFix',
							css: {
								left: '450rpx',
								top: '700rpx',
								width: '160rpx',
								height: '160rpx'
							}
						}
					]
				}
			},
			openmap() {
				if (this.store) {
					let latitude = parseFloat(this.store.lat);
					let longitude = parseFloat(this.store.lng);
					uni.openLocation({
						latitude: latitude,
						longitude: longitude,
						name: this.store.name,
						address: this.store.address,
						success: function() {
							console.log('success');
						}
					});
				}
			},
			// #ifndef MP-WEIXIN
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: APP_MOBILE
				});
			},
			// #endif
			saveImg() {
				var that = this;
				uni.authorize({
					scope: 'scope.writePhotosAlbum',
					success() {
						uni.saveImageToPhotosAlbum({
							filePath: that.path,
							success(res) {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
							}
						})
					},
					fail() {
						uni.showModal({
							title: '提示',
							content: '请先开启保存到相册权限！',
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
			},
			getpath(e) {
				this.path = e;
			}
		}
	}
</script>
<style lang="scss" scoped>
	page,
	.contview {
		height: 100%;
		width: 100%;
	}

	.store {
		display: flex;
		flex-direction: column;
		background-color: #FFA610;

		.cont {
			background-color: white;
			padding: 20rpx;
			margin: 20rpx;
			border-radius: 10rpx;

			.head {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-top: -100rpx;

				.name {
					font-size: 32rpx;
					font-weight: bold;
					margin-top: 10rpx;
				}
			}

			.number {
				font-size: 35rpx;
				font-weight: 600;
				color: #F44C01;
			}

			.grid-text {
				font-size: 28rpx;
				color: #666666;
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
	}

	.menu {
		background-color: white;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 10rpx;
	}

	.authCard {

		height: 100%;
		width: 100%;
	}

	.custom-style {
		color: #F44C01;
		background-color: white;
		height: 100rpx;
	}

	.savebtn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 90rpx;
		background-color: #F44C01;
		color: white;
	}

	.modelcont {
		height: 1070rpx;
		width: 650rpx;

		.head {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 80rpx;

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
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
	}
</style>
