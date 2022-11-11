<template>
	<view style="overflow-x: hidden;" class="">

		<!-- 头部个人信息 -->
		<view class="info">
			<image class="info-bg" src="/static/info-bg.png" mode=""></image>

			<view class="info-content">
				<view class="info-avatar">
					<u-avatar size="86" :src="userInfo.avatar || ''"></u-avatar>
				</view>
				<view class="info-name" v-if="hasLogin">
					<text class="info-name">{{ userInfo.nickname }}</text>
					<template v-if="userInfo.group_id < 1">
						<text class="info-level" v-if="info.group">开通VIP会员预计每年可省¥{{ info.group.cheap }}</text>
					</template>
					<template v-else>
						<text class="info-level" :style="{color: '#CFB386'}" v-if="info.group">
							VIP会员有效期至：{{ userInfo.group_enddate }}
						</text>
					</template>
				</view>
				<view class="info-name" v-else @click="toRoute({
            url: 'pages/login/login'
          })">
					<text class="info-name">未登录</text>
					<text class="info-level">升级商卡会员享额外特权</text>
				</view>
			</view>

			<view class="info-asset">
				<view class="info-asset-item">
					<text class="iai-title">下单数</text>
					<text class="iai-value">{{ userInfo.pay_count || 0 }}</text>
				</view>
				<view class="info-asset-item">
					<text class="iai-title">优惠券</text>
					<text class="iai-value">{{ userInfo.total_coupon || 0 }}</text>
				</view>
				<view class="info-asset-item">
					<text class="iai-title">余额</text>
					<text class="iai-value">{{ userInfo.now_money || 0 }}</text>
				</view>
			</view>
		</view>
		<!-- 选择套餐 -->
		<view class="selt-vip" v-if="userInfo.group_id < 1">
			<view class="s-title">
				<text>选择套餐</text>
				<text class="small">多城市通用</text>
			</view>
			<view class="vipbox">
				<view class="vip-item" v-for="(item, index) in aSeltVipList" :key="index" :class="[nowSeltVip == item ? 'active' : '']"
				 @click="onSeltVip(item)">
					<text class="vsmall">{{ item }}个月</text>
					<text class="money">¥<text class="strong" v-if="info.group">{{ (info.group.needmoney * item) }}</text></text>
				</view>
			</view>
		</view>
		<template v-if="userInfo.group_id < 1">
			<view class="mx-3 my-5 py-2  d-flex a-center j-center bg-yellow rounded-36" @click="upStar">
				立即开通 ¥{{ info.group ? (info.group.needmoney * nowSeltVip).toFixed(2) : '' }}
			</view>
			<!-- <u-button type="warning" shape="circle" ripple :custom-style="{color: '#333'}" @click="upStar">立即开通 ¥{{ info.group ? (info.group.needmoney * nowSeltVip).toFixed(2) : '' }}</u-button> -->
			<text class="tip font-26" @tap="showWriteCode = true">使用激活码兑换</text>
		</template>
		<template v-else>
			<view class="update" v-if="hasLogin">
				<u-button type="warning" shape="circle" ripple :custom-style="{color: '#333'}">
					您已是VIP会员，预计每年可省¥{{ info.group.cheap }}
				</u-button>
			</view>
			<view class="update" v-else>
				<u-button type="warning" shape="circle" ripple :custom-style="{color: '#333'}" @click="toRoute({
            url: 'pages/login/login'
          })">
					授权登录
				</u-button>
			</view>
		</template>
		<!-- banner广告组件 -->
		<ad unit-id="adunit-81777b0cbd5a4555"></ad>
		<view class="box">
			<!-- 会员特权 -->
			<view class="d-flex j-center px-3 mt-5 mb-3">
				<view class="position-relative" style="width: 190rpx;">
					<view class="d-flex bg-yellow rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;width: 190rpx;"></view>
					<view class="d-flex j-center position-absolute bottom-0 left-0 font-700 font-35" style="width: 190rpx;">
						会员特权
					</view>
				</view>
			</view>
			<view class=" d-flex a-center mb-2" v-for="(item, index) in member" :key="index">
				<view class="ml-3 ">
					<u-icon :name="item.img" size="60"></u-icon>
				</view>
				<view class="ml-2 ">
					<view class="font-700 font-28 ">{{item.title.split(":")[0]}}</view>
					<view class="text-ellipsis font-26 text-muted" style="width: 570rpx;">{{item.title.split(":")[1]}}</view>

				</view>
			</view>
		</view>
		<view class="box">
			<!-- 会员说明 -->
			<view class="d-flex j-center px-5 pt-5 mb-3">
				<view class="position-relative" style="width: 190rpx;">
					<view class="d-flex bg-yellow rounded-12 position-absolute bottom-0 left-0 w-100" style="height: 16rpx;width: 190rpx;"></view>
					<view class="d-flex j-center position-absolute bottom-0 left-0 font-700 font-35" style="width: 190rpx;">
						会员说明
					</view>
				</view>
			</view>
			<view class="px-2 mb-2">
				<view class="font-26 text-muted">
					{{ info.explain || '' }}
				</view>
			</view>
		</view>
		<view class="level">
			<view class="level-rate">
				<text class="level-rate-text1">当前返利比例</text>
				<text class="level-rate-text2">{{ (info.rate || 0) * 100 }}%</text>
			</view>

			<view class="level-info">
				<image class="level-info-icon" src="~@/static/vip.png" mode=""></image>
				<text class="level-info-text">当前返佣金额</text>
				<text class="level-info-integral">{{ user.brokerage_price }}</text>
			</view>

			<view class="level-distance">
				<!-- <text class="level-distance-text">距V1会员还有1250点</text> -->
				<view class="button level-distance-button" hover-class="hover" @click="toRoute({
            url: 'pages/share/share',
            type: 'tab'
          })">
					<text class="button-text">查看详情</text>
				</view>
			</view>
		</view>

		<!-- 选择支付 -->
		<u-popup v-model="showPayType" mode="bottom" length="36%" border-radius="20" closeable>
			<view>
				<view class="paytype-title">
					<text>选择支付方式</text>
				</view>
				<view class="">
					<u-cell-group>
						<u-cell-item icon="weixin-circle-fill" title="微信支付" icon-size="60" :icon-style="{color: 'green'}" label="微信快捷支付"
						 @click="onPaySubmit('routine')">
						</u-cell-item>
						<u-cell-item icon="rmb-circle-fill" title="余额支付" icon-size="60" :icon-style="{color: '#f29100'}" @click="onPaySubmit('balance')">
							<view class="" slot="label">
								<text>可用余额：<text class="orange-m">¥{{ userInfo.now_money }}</text></text>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</u-popup>
		<!-- 激活码 -->
		<u-modal v-model="showWriteCode" title="激活码激活" ref="uModal" show-cancel-button confirm-color="#e1aa1b" :async-close="true"
		 @confirm="confirmWriteCode">
			<view class="u-padding-20">
				<u-input placeholder="请输入激活码" v-model="inCode" :border="true" maxlength="16"></u-input>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		filters: {
			toFixed(price) {
				return Number(price).toFixed(0)
			}
		},
		data() {
			return {
				nowSeltVip: 1,
				showPayType: false,
				info: {},
				user: {},
				inCode: '',
				showWriteCode: false,
				current: 0,
				privilegeList: [{
						pic: '/static/coin.png',
						text: '每日金币'
					},
					{
						pic: '/static/quan.png',
						text: '大额神券'
					},
					{
						pic: '/static/red-bag.png',
						text: '更多返利'
					},
					{
						pic: '/static/goods.png',
						text: '精选商品'
					},
					{
						pic: '/static/speed.png',
						text: '极速到账'
					},
					{
						pic: '/static/share.png',
						text: '分享领券'
					},
					{
						pic: '/static/active.png',
						text: '专享活动'
					},
					{
						pic: '/static/birthday.png',
						text: '生日折扣'
					},
					{
						pic: '/static/notic.png',
						text: '上架提醒'
					},
					{
						pic: '/static/kefu.png',
						text: '专属客服'
					}
				],
				aSeltVipList: [1, 3, 12],
				member: []
			}
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin
			},
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			onSeltVip(item) {
				this.nowSeltVip = item || 1
			},
			onPaySubmit(pay) {
				this.$u.post('/api/user/pay_vip', {
					pay_type: pay,
					monthnum: this.nowSeltVip
				}).then((res) => {
					if (pay != 'routine') {
						this.showPayType = false
						uni.showToast({
							title: res.message
						})
						this.getInfo()
						// 重新获取用户信息
						setTimeout(() => {
							this.$u.get('/api/user')
								.then(({
									data
								}) => {
									this.$store.commit('writeInfo', data)
								}).catch(() => {
									this.$store.commit('logOut')
								})
						}, 1000)
					} else {
						let config = res.data.result.config
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: config.timestamp,
							nonceStr: config.nonceStr,
							package: config.package,
							signType: config.signType,
							paySign: config.paySign,
							success: () => {
								this.showPayType = false
								this.getInfo()
								// 重新获取用户信息
								setTimeout(() => {
									this.$u.get('/api/user')
										.then(({
											data
										}) => {
											this.$store.commit('writeInfo', data)
										}).catch(() => {
											this.$store.commit('logOut')
										})
								}, 1000)
							},
							fail: () => {
								uni.showToast({
									title: '支付失败',
									icon: 'none'
								})
							}
						})
					}
				})
			},
			getInfo() {
				this.$u.get('/api/store/product/bag/explain')
					.then(({
						data
					}) => {
						console.log(data);
						this.member = data.data
						// let _msg = data.data
						// this.member = _msg.map((e) => e.title.split("："))
						// console.log("处理后会员：", this.member);

						this.info = data
						this.user = data.user
						uni.setStorage({
							key: 'memberInfo',
							data: data.group
						})
					})
			},
			toRoute(params) {
				this.$u.route(params)
			},
			confirmWriteCode() {
				if (!this.inCode) {
					uni.showToast({
						title: '请输入激活码',
						icon: 'none'
					})
					this.$refs.uModal.clearLoading();
					return null
				}
				this.$u.post('/api/user/pay_vip_code', {
					code: this.inCode
				}).then((res) => {
					uni.showToast({
						title: res.msg || '激活成功'
					})
					this.inCode = ''
					this.showWriteCode = false
					setTimeout(() => {
						// 重新获取用户信息
						this.$u.get('/api/user')
							.then(({
								data
							}) => {
								this.$store.commit('writeInfo', data)
							}).catch(() => {
								this.$store.commit('logOut')
							})
					}, 1000)
				}).catch(() => {
					this.$refs.uModal.clearLoading();
				})
			},
			rechargeChange(index) {
				this.current = index
			},
			upStar() {
				if (this.hasLogin) {
					this.showPayType = true
				} else {
					this.toRoute({
						url: 'pages/login/login'
					})
				}
			},
			privilegeClick(index) {
				// uni.showToast({
				// 	icon: "none",
				// 	title: `点击了「${this.privilegeList[index].text}」`
				// })
			},
			back() {
				uni.showToast({
					icon: "none",
					title: "返回"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "/common/dev-yuchen.css";

	page {
		background-color: #f0f0f0;
	}

	.box {
		margin: 50rpx $gutter;
		padding: 50rpx $gutter;
		background-color: #ffffff;
		border-radius: $uni-border-radius-lg;
		font-size: 20rpx;
		color: #d1b16b;
	}

	.main-title {
		padding: 30rpx 30rpx;
		font-size: 34rpx;
		color: #1C1C1C;
	}

	.tip {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #A5A3A2;
	}

	.rmb {
		font-size: 26rpx;
		color: #E3BE83;
	}

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 400rpx;
		z-index: -2;

		&-img {
			width: 100%;
			height: 100%;
		}
	}

	.hover {
		opacity: 0.7;
	}

	.nav {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 44px;
		padding: 0 30rpx;
		background-image: url('~@/static/nav-bg.png');
		background-size: 100%;
		z-index: 99;

		&-back {
			width: 20rpx;
			height: 40rpx;
		}

		&-title {
			color: #FFFFFF;
			font-size: 42rpx;
		}

		&-space {
			width: 70rpx;
			height: 40rpx;
		}
	}

	.info {
		position: relative;
		padding: 15rpx;
		width: 730rpx;
		height: 360rpx;

		&-bg {
			position: absolute;
			width: 730rpx;
			height: 360rpx;
			z-index: -1;
		}

		&-content {
			padding: 70rpx 50rpx 0 50rpx;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		&-avatar {
			margin-right: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 85rpx;
			height: 85rpx;
			background-color: #fff;
			padding: 1rpx;
			border-radius: 50%;

			&-pic {
				width: 83rpx;
				height: 83rpx;
			}
		}

		&-name {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			font-size: 35rpx;
		}

		&-level {
			margin-top: 15rpx;
			font-size: 24rpx;
		}

		&-asset {
			padding: 0 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&-item {
				display: flex;
				flex-direction: column;
			}
		}
	}

	.iai {
		&-title {
			margin-bottom: 20rpx;
			margin-right: 100rpx;
			font-size: 24rpx;
			color: #CFB386;
		}

		&-value {
			font-size: 35rpx;
			color: #FFFFFF;
		}
	}

	.recharge {
		position: relative;
		margin-bottom: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		&-tag {
			position: absolute;
			top: -2rpx;
			left: -2rpx;
			width: 170rpx;
			height: 36rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background-image: url('~@/static/tag.png');
			background-size: 100%;

			&-text {
				font-size: 20rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}

		&-item {
			position: relative;
			padding: 40rpx 0;
			margin-left: 15rpx;
			width: 200rpx;
			height: 230rpx;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: solid 2rpx #F2F2F3;
			border-radius: 12rpx;

			&-active {
				border-color: #EDD2A9;
				background-color: #FBF1E5;
			}

			&-duration {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				color: #1C1C1C;
			}

			&-price {
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: baseline;

				&-text {
					font-size: 48rpx;
					color: #E3BE83;
				}
			}

			&-des {
				font-size: 22rpx;
				color: #A5A3A2;
			}
		}
	}


	.update {
		margin: 35rpx 30rpx 20rpx 30rpx;
	}

	.privilege {
		padding: 0 30rpx;
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;

		&-item {
			margin: 0 $gutter 30rpx;
			display: flex;
			align-items: center;

			&-pic {
				width: 80rpx;
				height: 80rpx;
			}

			&-text {
				font-size: 28rpx;
				color: #383738;
				padding-left: 20rpx;
			}
		}
	}

	.level {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 466rpx;
		background-image: url('~@/static/vip-bg.png');
		background-size: 100%;

		&-rate {
			position: absolute;
			top: 43rpx;
			left: 33rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&-text1 {
				margin-right: 20rpx;
				color: #1C1C1C;
				font-size: 34rpx;
			}

			&-text2 {
				font-size: 34rpx;
				color: #C07C07;
			}
		}

		&-info {
			// position: absolute;
			// top: 188rpx;
			// left: 350rpx;
			margin-top: 70rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			&-icon {
				margin-bottom: 20rpx;
				width: 48rpx;
				height: 38rpx;
			}

			&-text {
				margin-bottom: 20rpx;
				font-size: 26rpx;
				color: #292929;
			}

			&-integral {
				font-size: 40rpx;
				color: #C07C07;
			}
		}

		&-distance {
			position: absolute;
			left: 30rpx;
			right: 30rpx;
			bottom: 35rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			&-text {
				font-size: 26rpx;
				color: #292929;
			}

			&-button {
				padding: 0 30rpx;
				height: 60rpx;
				margin: 0 auto;
			}
		}
	}

	.explain-box {
		padding: 0 30rpx 30rpx;
	}

	.paytype-title {
		position: relative;
		text-align: center;
		padding: 26rpx 0;
		font-size: 32rpx;
		font-weight: bold;
	}

	.orange-m {
		color: #f29100;
	}

	.selt-vip {
		display: flex;
		flex-direction: column;
		padding: $gutter $gutter 0;

		.s-title {
			font-size: 36rpx;
			color: #333;
			padding: 0 $gutter;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.small {
				font-size: 24rpx;
				color: #999;
			}
		}

		.vipbox {
			display: flex;
			justify-content: space-between;
			padding: $gutter $gutter 0;

			.vip-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 200rpx;
				height: 220rpx;
				border: 1rpx solid #eee;
				border-radius: 10rpx;

				.vsmall {
					font-size: 24rpx;
					color: #666;
				}

				.money {
					font-size: 32rpx;
					color: red;
					margin-top: 10rpx;
					font-weight: bold;

					.strong {
						font-size: 58rpx;
					}
				}

				&.active {
					background-color: rgba($color: #e8b025, $alpha: 0.1);
					border-color: #e8b025;

					.money {
						color: #a1601a;
					}
				}
			}
		}
	}
</style>
