<template>
	<view>
		<!-- <image src="/static/activity1.png" mode="aspectFit" class="topbg"></image> -->
		<view class="sk-info">
			<view class="count-down">
				<text class="text">{{ timestamp > 0 ? '活动倒计时:' : '活动已结束' }}</text>
				<u-count-down v-if="timestamp > 0" :timestamp="timestamp" separator="zh" font-size="35" color="#ff0000"
				 separator-color="#333" separator-size="24"></u-count-down>
			</view>
			<view class="shop-details">
				<view class="shopinfo" @click="toDetails">
					<view class="s-img">
						<u-image :src="info.image" width="180rpx" height="180rpx"></u-image>
					</view>
					<view class="s-info">
						<text class="s-title u-line-2">{{ info.store_name }}</text>
						<text class="s-small">已有{{ info.success_people }}人集卡成功</text>
						<text class="s-amount">价值:¥<text class="s-strong">{{ info.coupon_price }}</text></text>
						<view class="go-look">
							<text>查看商品</text>
							<u-icon name="arrow-right" size="24" color="#666"></u-icon>
						</view>
					</view>
				</view>
				<view class="ruletips">
					<text class="text">集卡成功可获得:
						<text class="red" v-if="Number(info.full_reduction) != 0">
							满{{ info.full_reduction }}减{{ info.coupon_price }}商品券
						</text>
						<text class="red" v-else>
							立减{{ info.coupon_price }}商品券
						</text>
					</text>
				</view>
				<view class="card-list" v-if="!cpj_id">
					<view class="card-item" v-for="(item, index) in havaList" :key="index" :class="[item.status ? 'active' : '']">
						<image src="/static/hb.png" mode="aspectFit" class="hbico"></image>
						<text class="card-text">{{ item.text }}</text>
						<view class="card-tips">
							<text v-if="item.status == 0">未获得</text>
							<view class="card-avatar" v-else>
								<!-- <u-avatar src="/static/avatar.png" size="40"></u-avatar> -->
								<text>{{item.status}}张</text>
							</view>
						</view>
					</view>
				</view>
				<view class="" v-if="!hasCpj && cpj_id">
					<button type="default" class="card-button" open-type="getUserInfo" v-if="!hasLogin" @getuserinfo="getuserinfo">立即助力</button>
					<button type="default" class="card-button" v-else @click="onSucHet">立即助力</button>
				</view>
				<view class="" v-else-if="hasCpj && cpj_id">
					<view class="card-button" @click="onJoinActivity">
						<text>已助力,参与活动</text>
					</view>
				</view>
				<template v-else-if="hasLogin">
					<template v-if="status.status == 1 && timestamp > 0">
						<view class="card-button" v-if="status.cpj_id" @click="onShare">
							<button class="no-text" open-type="share">立即分享集卡</button>
						</view>
						<view class="card-button" v-else @click="onJoinActivity">
							<text>立即参与集卡</text>
						</view>
					</template>
					<view class="card-button" v-else-if="status.status == 2">
						<view class="card-button" v-if="isArCpj" @click="onJoinActivity">
							<text>已集齐,参与活动</text>
						</view>
						<button class="no-text" v-else @click="toDetails">已成功，立即下单</button>
					</view>
					<view class="card-button" v-else-if="timestamp <= 0">
						<button @click="toActivity()" class="no-text">活动已结束,查看更多</button>
					</view>
					<view class="card-button" v-else @click="onJoinActivity" v-else>
						<text>立即参与集卡</text>
					</view>
				</template>
				<view v-else>
					<button type="default" class="card-button" open-type="getUserInfo" @getuserinfo="getuserinfo">立即参与集卡</button>
				</view>
			</view>
			<view class="sk-help">
				<view class="ic-title">
					<text class="text">集卡帮</text>
				</view>
				<scroll-view scroll-y="true" style="height: 240rpx;" v-if="myhelpusers.length">
					<view class="hl-list">
						<view class="u-margin-right-20 u-margin-top-10 fex-center" v-for="(item, index) in myhelpusers" :key="index">
							<u-avatar :src="item.helpuser.avatar" size="60"></u-avatar>
							<view class="u-line-1 text">{{ item.helpuser.nickname }}</view>
						</view>
					</view>
				</scroll-view>
				<view class="u-padding-top-20" v-else>
					<u-empty text="还没有人帮您集卡哦～" src="/static/empty-box.png" icon-size="300"></u-empty>
				</view>
			</view>
			<!--      <view class="details-content">
        <view class="ic-title">
          <text class="text">商品详情</text>
        </view>
        <view class="">
          <text>商品详情</text>
        </view>
      </view> -->
			<view class="rule-content">
				<view class="ic-title">
					<text class="text">集卡规则</text>
				</view>
				<view class="rule-text">
					<text class="text">
						活动期间参与集卡集{{ havaSize || havaList.length }}张卡送奖品券活动，通过使用微信进入小程序活动页面参与，每天进去都可以抽卡、还可以好友之间助力抽卡片，集齐所有{{ havaSize || havaList.length }}张卡片集卡领取商品券或红包(奖券存入你的账户优惠券内);
					</text>
					<text class="text">
						活动最终解释权归商家所有。
					</text>
				</view>
			</view>
		</view>
		<!-- 助力成功 -->
		<u-mask :show="showCards" :zoom="false">
			<view class="get-card">
				<view class="card-top">
					<image src="/static/card-top.png" mode="aspectFit" class="card-top-img"></image>
					<text class="text">助力成功</text>
				</view>
				<view class="card-content">
					<text class="hc-h3">您已成功为好友助力</text>

					<view class="get-btntext">
						<u-button type="warning" size="medium" ripple :hair-line="false" :custom-style="{color: '#333'}" @click="onJoinActivity">立即参加活动</u-button>
						<view class="cnl-btn" @click="showCards = false">
							<text>取消</text>
						</view>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCards: false,
				showHelp: false,
				hasCpj: false,
				id: 0,
				status: {},
				mytxt: [],
				myhelpusers: [],
				havaList: [],
				havaSize: 0,
				info: {},
				cpj_id: '',
				cp_id: '',
				product_id: '',
				coupon_id: '',
				isself: false,
				isArCpj: false,
				code: ''
			};
		},
		onLoad(options) {
			uni.login({
				provider: 'weixin',
				success: ({
					code
				}) => {
					this.code = code
				}
			})
			this.product_id = options.product_id
			this.coupon_id = options.coupon_id
			this.cp_id = options.cp_id
			this.cpj_id = options.cpj_id
			if (this.cpj_id) {
				this.showHelp = true
			}
			this.getInfo()
		},
		onShareAppMessage(res) {
			let imgUrl = this.info.image || ''
			if (imgUrl.indexOf('http') == -1 && imgUrl.indexOf('https')) {
				imgUrl = 'https:' + imgUrl
			}
			let tList = [
				'求求你帮我点一下~', '快帮我助力拿奖品吧~', '我想要这个,帮我点一下嘛~'
			]
			let tIndex = Math.floor(Math.random() * 3)
			return {
				title: tList[tIndex],
				path: `/pages/activity/details?cp_id=${this.cp_id}&cpj_id=${this.status.cpj_id}`,
				imageUrl: imgUrl,
				desc: this.info.title,
				content: this.info.store_name,
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			}
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin
			},
			timestamp() {
				let d = this.info.activite_endtime ? this.info.activite_endtime.replace(/\-/g, '/') : ''
				let endTime = new Date(d).getTime() / 1000
				let nowTime = new Date().getTime() / 1000
				return endTime - nowTime
			}
		},
		methods: {
			// 参与活动
			onJoinActivity() {
				this.$u.post('/api/store/product/joinProjectCoupon', {
					cp_id: this.cp_id
				}).then((res) => {
					uni.showToast({
						title: '参与成功'
					})
					this.hasCpj = false
					this.cpj_id = ''
					this.showCards = false
					setTimeout(() => {
						this.getInfo()
					}, 1000)
				})
			},
			// 授权登录
			getuserinfo(e) {
				if (e.detail.userInfo) {
					let params = e.detail
					params.code = this.code;
					params.spread_spid = this.spread; // 获取推广人ID
					params.spread_code = this.spread; // 获取推广人分享二维码ID
					// 登录
					// params.cache_key = uni.getStorageSync('cache_key') || ''
					this.$u.post('/api/auth/mp', params)
						.then(({
							data
						}) => {
							this.$store.commit('login', data.token)
							// uni.setStorage({
							//   key: 'cache_key',
							//   data: data.cache_key
							// })
							this.$u.get('/api/user')
								.then(({
									data
								}) => {
									// uni.showToast({
									//   title: '授权成功!'
									// })
									this.$store.commit('writeInfo', data)
									uni.removeStorage({
										key: 'spread'
									})
									// 参与活动
									if (this.cpj_id) {
										this.onSucHet()
									} else {
										this.onJoinActivity()
									}
								})
						})
				} else {
					uni.openSetting({
						success: (res) => {
							//console.log(res.authSetting)
							if (!res.authSetting) {
								uni.showToast({
									title: '授权失败!',
									icon: 'none'
								})
							}
						}
					})
				}
			},
			// 助力
			onSucHet() {
				this.$u.post('/api/store/product/joinPeopleProjectCoupon', {
					cpj_id: this.cpj_id
				}).then((res) => {
					this.showHelp = false
					this.showCards = true
					this.hasCpj = true
					// setTimeout(() => {
					//   this.$nextTick(() => {
					//     uni.showToast({
					//       title: '助力成功'
					//     })
					//   })
					// }, 300)
				}).catch((e) => {
					if (e.message.indexOf('已完成助力') > -1) {
						this.hasCpj = true
					} else {
						this.cpj_id = ''
						if (e.message.indexOf('活动已完成') > -1) {
							this.isArCpj = true
						}
					}
				})
			},
			getInfo() {
				// 分享请求
				if (this.cpj_id) {
					if (this.hasLogin) {
						this.$u.get('/api/store/product/getPowerJoinProjectCouponDetail', {
							cpj_id: this.cpj_id
						}).then(({
							data
						}) => {
							this.info = data.shop
							this.status = data.join
							this.myhelpusers = data.myhelpusers
							// this.isself = data.isself
							this.havaSize = this.info.activice_txt.length
							if (data.isself) {
								this.cpj_id = ''
								this.mytxt = data.mytxt
								let aCard = this.info.activice_txt.split('')
								this.havaSize = this.info.activice_txt.length
								this.havaList = []
								for (let i = 0; i < aCard.length; i++) {
									let nowStatus = 0
									for (let n = 0; n < this.mytxt.length; n++) {
										if (this.mytxt[n].text == aCard[i]) {
											nowStatus = this.mytxt[n].txtcount
											break;
										} else {
											continue;
										}
									}
									this.havaList.push({
										text: aCard[i],
										status: nowStatus
									})
								}
							}
							if (data.iszhu) {
								this.hasCpj = true
							}
						})
					} else {
						this.$u.get('/api/store/product/getJoinProjectCouponDetail', {
							cpj_id: this.cpj_id
						}).then(({
							data
						}) => {
							this.info = data.shop
							this.status = data.join
							this.myhelpusers = data.myhelpusers
							this.havaSize = this.info.activice_txt.length
						})
					}
					return null
				}

				// 直接请求
				if (this.hasLogin) {
					this.$u.get('/api/store/product/getPowerCouponProjectDetail', {
						cp_id: this.cp_id,
					}).then(({
						data
					}) => {
						this.info = data.shop
						this.status = data.join
						this.mytxt = data.mytxt
						this.myhelpusers = data.myhelpusers
						let aCard = this.info.activice_txt.split('')
						this.havaList = []
						for (let i = 0; i < aCard.length; i++) {
							let nowStatus = 0
							for (let n = 0; n < this.mytxt.length; n++) {
								if (this.mytxt[n].text == aCard[i]) {
									nowStatus = this.mytxt[n].txtcount
									break;
								} else {
									continue;
								}
							}
							this.havaList.push({
								text: aCard[i],
								status: nowStatus
							})
						}
					})
				} else {
					this.$u.get('/api/store/product/getCouponProjectdetail', {
						cp_id: this.cp_id,
					}).then(({
						data
					}) => {
						this.info = data
						let aCard = this.info.activice_txt.split('')
						this.havaList = []
						this.havaSize = this.info.activice_txt.length
						for (let i = 0; i < aCard.length; i++) {
							this.havaList.push({
								text: aCard[i],
								status: 0
							})
						}
					})
				}
			},
			toDetails() {
				this.$u.route({
					url: 'pages/goods/details',
					params: {
						id: this.info.product_id
					}
				})
			},
			//跳转集卡展示页
			toActivity() {
				this.$u.route({
					type: 'reLaunch',
					url: 'pages/activity/activity'
				})
			},
			onShare(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFDD00;
	}

	.topbg {
		// width: 698rpx;
		// height: 200rpx;
		display: block;
		margin: $gutter auto 0;
	}

	.sk-info {
		margin-top: 50rpx;
		position: relative;
		z-index: 10;
		padding: 0 40rpx 40rpx;

		.count-down {
			background-color: #fff;
			//width: 440rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: $uni-border-radius-lg;
			color: #ff0000;
			font-size: 24rpx;
			padding: 5rpx 0;
			border: 4rpx solid #ffdd00;
			box-shadow: 0 4rpx 6rpx rgba($color: #000000, $alpha: 0.3);
		}

		.shop-details {
			border-radius: $uni-border-radius-lg;
			background-color: #fff;
			margin-top: $gutter;
			padding: $gutter;
			border: 4rpx solid #ffdd00;

			.shopinfo {
				display: flex;

				.s-img {
					width: 180rpx;
					height: 180rpx;
					border-radius: $uni-border-radius-lg;
					overflow: hidden;
				}

				.s-info {
					margin-left: $gutter;
					flex: 1;
					display: flex;
					flex-direction: column;
					position: relative;

					.s-title {
						font-size: 28rpx;
						color: #333;
					}

					.s-small {
						font-size: 24rpx;
						color: #999;
						margin-top: 16rpx;
					}

					.s-amount {
						font-size: 24rpx;
						color: #ff0000;
						margin-top: 6rpx;

						.s-strong {
							font-size: 32rpx;
							margin-left: 2rpx;
						}
					}

					.go-look {
						position: absolute;
						right: 0;
						bottom: 6rpx;
						z-index: 10;
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}

		.card-list {
			position: relative;
			display: flex;
			flex-wrap: wrap;

			.card-item {
				width: 154rpx;
				height: 154rpx;
				margin-top: 20rpx;
				position: relative;

				.card-text {
					position: absolute;
					left: 50%;
					top: 36rpx;
					transform: translateX(-50%);
					font-size: 36rpx;
					color: #666;
					font-weight: bold;
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				}

				.card-tips {
					position: absolute;
					left: 0;
					bottom: 10rpx;
					color: #fff;
					width: 100%;
					text-align: center;
					font-size: 24rpx;

					.card-avatar {
						height: 40rpx;
					}
				}

				.hbico {
					width: 100%;
					height: 100%;
					-webkit-filter: grayscale(100%);
					-moz-filter: grayscale(100%);
					-ms-filter: grayscale(100%);
					-o-filter: grayscale(100%);
					filter: grayscale(100%);
					filter: gray;
					opacity: .8;
				}

				&.active {
					.hbico {
						-webkit-filter: grayscale(0%);
						-moz-filter: grayscale(0%);
						-ms-filter: grayscale(0%);
						-o-filter: grayscale(0%);
						filter: grayscale(0%);
						filter: none;
					}

					.card-text {
						color: #ff0000;
					}
				}
			}
		}

		.card-button {
			font-size: 30rpx;
			font-weight: 700;
			color: #fff;
			width: 100%;
			height: 80rpx;
			border-radius: 40rpx;
			background-image: -webkit-linear-gradient(left, #FBE219, #f3da17);
			background-image: linear-gradient(90deg, #FBE219 0, #f3da17);
			text-align: center;
			line-height: 80rpx;
			margin-top: 32rpx;

			.no-text {
				border: none;
				font-size: 30rpx;
				background: none;
				color: #fff;
				height: 80rpx;

				&::after {
					display: none;
				}
			}
		}

		.sk-help {
			@extend .shop-details;
		}

		.details-content {
			@extend .shop-details;
		}

		.rule-content {
			@extend .shop-details;
		}

		.ic-title {
			font-size: $uni-font-size-lg;
			color: #333;
			padding: $gutter;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.text {
				&::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 16rpx;
					background-color: $uni-color-warning;
					height: 10rpx;
					width: 140rpx;
					margin-left: -70rpx;
					z-index: 0;
					border-radius: 10rpx;
					box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.5);
				}
			}
		}

		.hl-list {
			display: flex;
			flex-wrap: wrap;
			margin-right: -20rpx;
		}

		.ruletips {
			font-size: 24rpx;
			color: #999;
			padding-top: 10rpx;
			margin-bottom: -10rpx;

			.red {
				color: rgba($color: #ff0000, $alpha: 0.5);
				text-shadow: 0 3rpx 3rpx rgba($color: #000000, $alpha: 0.1);
			}
		}
	}

	.rule-text {
		position: relative;

		.text {
			font-size: 24rpx;
			line-height: 2em;
			display: block;
			text-indent: 2em;
		}
	}

	/* 弹窗 */
	.big-box {
		position: absolute;
		width: 630rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin-top: -50rpx;

		.copy-box {
			//背景白
			padding: 30rpx;
			background-color: #FFFFFF;
			border-radius: 12rpx;
		}

		.titl-img {
			//头标
			display: flex;
			justify-content: center;
			margin-bottom: 30rpx;

			.img-above {
				width: 100%;
				height: 38rpx;
			}
		}

		.curren-but {
			//按钮
			width: 100%;

			.togethe-but {
				margin-left: 34rpx;
				margin-right: 34rpx;
			}
		}

		.sigin-box {
			//签到
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			color: #9B9B9B;
			margin-bottom: 30rpx;

			.sigin-num {
				color: #808080;
				font-size: 26rpx;
				font-weight: 600;
			}
		}

		.leave-box {
			//关闭按钮
			border: 2px #FFFFFF solid;
			width: 56rpx;
			height: 56rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			transform: rotate(45deg);
			margin-bottom: 30rpx;
			margin-left: auto;
		}



		.leave-butt {
			//底部两按钮
			display: flex;
			justify-content: space-between;

			.sign-but {
				border: 1px #FF6022 solid;
				width: 270rpx;
				height: 80rpx;
				background-color: #FFFFFF;
				color: #FF6022;
				font-size: 30rpx;
				border-radius: 12rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.continue-but {
				border: 1px #FF6022 solid;
				width: 270rpx;
				height: 80rpx;
				background-color: #FF6022;
				color: #FFFFFF;
				font-size: 30rpx;
				border-radius: 12rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}


		//帮TA补签
		.addition-box {
			border-radius: 12rpx;
			background-color: #FFFFFF;
			overflow: hidden;
		}

		.above-box {
			background-size: cover;
			width: 100%;
			height: 116rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			.ab-bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 0;
			}

			.above-in {
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;

				.ab-avatar {
					height: 56rpx;
				}

				.above-name {
					color: #FFFFFF;
					font-size: 30rpx;
					margin-left: 16rpx;
					width: 240rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					word-break: break-all;
				}

				.above-explain {
					color: #FFFFFF;
					font-size: 26rpx;
					margin-left: 8rpx;
				}
			}
		}

		.lower-box {
			background-color: #FFFFFF;
			padding: 30rpx;

			.lower-titl {
				display: flex;
				justify-content: center;
				align-items: center;

				.titl-tetx {
					color: #000000;
					font-size: 30rpx;
					font-weight: 600;
					margin: 0 30rpx;
				}
			}

			.rule-box {
				padding: 20rpx 0;

				.rule-article {
					color: #000000;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					margin: 10rpx 0;

					.spot {
						width: 6rpx;
						height: 6rpx;
						background-color: #FF6022;
						border-radius: 50%;
						margin-right: 16rpx;
					}
				}
			}

		}
	}

	.get-card {
		position: absolute;
		width: 540rpx;
		height: 340rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		display: flex;
		background-color: #fff;
		border-radius: 10rpx;

		.card-top {
			position: absolute;
			top: -60rpx;
			left: 5%;
			width: 90%;
			height: 140rpx;
			z-index: 10;

			.card-top-img {
				width: 100%;
				height: 140rpx;
			}

			.text {
				position: absolute;
				left: 0;
				top: 16rpx;
				text-align: center;
				color: #fff;
				z-index: 10;
				font-size: 46rpx;
				display: block;
				width: 100%;
				text-shadow: 0 2rpx 4rpx rgba($color: #000000, $alpha: 0.6);
			}
		}

		.card-content {
			position: relative;
			padding: 100rpx 30rpx 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.hc-h3 {
				font-size: 32rpx;
				text-shadow: 0 2rpx 4rpx rgba($color: #e22c27, $alpha: 0.4);
			}

			.c-infobox {
				position: relative;
				width: 100%;
				height: 300rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;

				.c-bg {
					position: relative;
					width: 300rpx;
					height: 300rpx;
				}

				.showinfo-size {
					position: absolute;
					bottom: 120rpx;
					left: 0;
					font-size: 90rpx;
					color: #333;
					text-shadow: 0 2rpx 4rpx rgba($color: #fff, $alpha: 0.6);
					width: 100%;
					text-align: center;
				}

				.show-get {
					position: absolute;
					bottom: 16rpx;
					left: 50%;
					width: 80rpx;
					height: 80rpx;
					margin-left: -40rpx;
					border-radius: 50%;
					border: 1rpx solid #FFDD00;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					font-size: 46rpx;
					color: #FFDD00;
					box-shadow: 0 3rpx 6rpx rgba($color: #000000, $alpha: 0.6);
				}
			}

			.get-btntext {
				text-align: center;
				width: 300rpx;
				// height: 120rpx;
				position: relative;
				margin-top: 40rpx;

				.btnbg {
					position: relative;
					width: 100%;
					height: 100%;
				}

				.cnl-btn {
					text-align: center;
					margin-top: 20rpx;
					color: #999;
				}

				.text {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 10;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}

	.fex-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #333;
		font-size: 20rpx;

		.text {
			height: 34rpx;
		}
	}
</style>
