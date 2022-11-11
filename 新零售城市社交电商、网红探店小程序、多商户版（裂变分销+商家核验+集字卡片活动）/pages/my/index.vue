<template>
	<view>
		<!-- userinfo -->
		<view class="userinfo-box">
			<view class="user-avatar">
				<u-avatar size="100" :src="userInfo.avatar"></u-avatar>
			</view>
			<view class="user-info-rg" v-if="!hasLogin" @click="toRoute({url: 'pages/login/login'})">
				<text class="user-name">点击登录</text>
				<view class="user-id">
					<text class="text">用户ID: 000000</text>
				</view>
			</view>
			<view class="user-info-rg" v-else>
				<text class="user-name">{{ userInfo.nickname }}</text>
				<view class="user-id">
					<text class="text">用户ID: {{ userInfo.uid }}</text>
					<!-- <text class="copy" @click="copy(userInfo.uid)">复制</text> -->
				</view>
			</view>
		</view>
		<!-- vip -->
		<view class="order-start-vip" @click="toRoute({
      url: 'pages/member/member',
      type: 'tab'
    })">
			<u-icon name="/static/icon/index_icon_rank_0.png" size="20"
				:label="userInfo.is_promoter < 1 ? '普通用户' : 'VIP会员'" label-size="20" label-color="#d1b16b"></u-icon>
			<text class="text u-margin-left-10" v-if="userInfo.group_name">
				{{ userInfo.is_promoter < 1 ? 'VIP会员' : '' }}预计每年可省￥{{ Number(userInfo.group_name.cheap).toFixed(2) }}
			</text>
			<text class="text" v-else></text>
			<view class="ml-auto">
				<text class="text">{{ userInfo.group_id < 1 ? '立即开通' : '立即查看' }}</text>
				<u-icon name="arrow-right" color="d1b16b" size="20"></u-icon>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="order-gird" v-if="true">
			<view class="user-title">
				<u-section title="我的订单" sub-title="全部订单" :bold="false" :show-line="false" @click="toRoute({
            url: 'pages/user/order',
            params: {
              type: 0
            }
          })">
				</u-section>
			</view>
			<u-grid :col="4" :border="false">
				<u-grid-item v-for="(item, index) in orderGrid" :key="index" @click="toRoute({
            url: 'pages/user/order',
            params: {
              type: index+1
            }
          })">
					<u-badge v-if="item.nums" :count="item.nums" :offset="[20, 20]"></u-badge>
					<u-icon :name="item.icon" :size="56"></u-icon>
					<view class="grid-text">{{ item.text }}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- 收银台 -->
		<view class="order-gird" v-else>
			<view class="user-title">
				<u-section title="收银台" :right="false" :bold="false" :show-line="false"></u-section>
			</view>
			<u-grid :col="4" :border="false">
				<u-grid-item v-for="(item, index) in cashierGrid" :key="index" @click="toRoute({
            url: item.path
          })">
					<u-icon :name="item.icon" :size="56" color="#666"></u-icon>
					<view class="grid-text u-padding-top-10">{{ item.text }}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- 商家提现 -->
		<view class="wallet-box">
			<view class="user-title">
				<u-section title="我的钱包" sub-title="进入钱包" :bold="false" :show-line="false" @click="toRoute({
            url: 'pages/wallet/wallet'
          })">
				</u-section>
			</view>
			<view class="">
				<u-grid :col="2" :border="false">
					<u-grid-item v-for="(item, index) in walletInfo" :key="index" @click="toRoute({
              url: item.path
            })">
						<view class="grid-content bold">{{ item.content }}</view>
						<view class="grid-text">{{ item.text }}</view>
						<view class="grid-small">{{ item.label }}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- 我的店铺 -->
		<view class="apply-box" v-if="userInfo.service">
			<u-cell-group :border="false">
				<u-cell-item title="我的店铺" :border-bottom="false" center @click="toRoute({
          url: 'pages/store/store',
          params: {
            id: userInfo.service.mer_id
          }
        })"></u-cell-item>
			</u-cell-group>
		</view>
		<!-- 更多服务 -->
		<view class="more-service">
			<view class="user-title" style="border: none;">
				<u-section title="更多服务" :right="false" :bold="false" :show-line="false"></u-section>
			</view>
			<view class="more-grid">
				<u-grid :col="4" :border="false">
					<u-grid-item v-for="(item, index) in getmoreGrid" :key="index" @click="toRoute({
              url: item.url
            })">
						<u-icon :name="item.pic" :size="56"></u-icon>
						<view class="grid-text">{{item.name}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<ad unit-id="adunit-43ce3114fc526e9b" ad-type="video" ad-theme="white"></ad>
	</view>

</template>

<script>
	import AD from "../../utils/ad.js"
	export default {
		data() {
			return {
				show: false,
				walletInfo: [{
						text: '余额',
						label: '总计可用',
						content: 0,
						path: 'pages/wallet/wallet'
					},
					{
						text: '账单',
						label: '总计支出',
						content: 0,
						path: 'pages/wallet/bill'
					}
				],
				cashierGrid: [{
						text: '收银',
						icon: "rmb-circle",
						path: 'pages/wallet/bill'
					},
					{
						text: '流水',
						icon: "calendar",
						path: 'pages/wallet/bill'
					},
					{
						text: '账号',
						icon: "man-add",
						path: 'pages/store/account'
					},
					{
						text: '核单',
						icon: "scan",
						path: 'pages/order/verification'
					}
				],
				orderGrid: [{
						nums: 0,
						text: '待付款',
						icon: "/static/icon/g1.png"
					},
					{
						nums: 0,
						text: '待消费',
						icon: "/static/icon/g2.png"
					},
					{
						nums: 0,
						text: '待收货',
						icon: "/static/icon/g3.png"
					},
					{
						nums: 0,
						text: '待评价',
						icon: "/static/icon/g4.png"
					}
				],
				getmoreGrid: [],
				cheap: 0
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
		onLoad() {
			//加载激励广告
			AD.rewarded.load('adunit-f08b579d770eaec9',()=>{
				this.clickAd()
			});
		},
		onShow() {
			if (this.hasLogin) {
				this.getNums()
				this.moreGrid()
				this.getInfo().then(() => {
					this.walletInfo[0].content = this.userInfo.now_money || '0.00'
					this.walletInfo[1].content = this.userInfo.pay_price || '0.00'
				})
			}
		},
		methods: {
			// 获取个人中心图标
			moreGrid() {
				return new Promise((resolve) => {
					this.$u.get('/api/common/menus')
						.then(({
							data
						}) => {
							//console.log(data['menu'])
							this.getmoreGrid = data.menu
							resolve(true)
						}).catch(() => {

						})
				})
			},
			getInfo() {
				return new Promise((resolve) => {
					this.$u.get('/api/user')
						.then(({
							data
						}) => {
							this.$store.commit('writeInfo', data)
							resolve(true)
						}).catch(() => {
							this.$store.commit('logOut')
							resolve(true)
						})
				})
			},
			getNums() {
				this.$u.get('/api/order/number')
					.then(({
						data
					}) => {
						this.orderGrid[0].nums = data.noPay
						this.orderGrid[1].nums = data.noPostage
						this.orderGrid[2].nums = data.noDeliver
						this.orderGrid[3].nums = data.noComment
					})
			},
			copy(content) {
				uni.setClipboardData({
					data: content,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					},
					fail: (e) => {
						console.log(e)
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						})
					}
				})
			},
			toRoute(params) {
				if (this.hasLogin) {
					this.$u.route(params)
				} else {
					this.$u.route({
						url: 'pages/login/login'
					})
				}
			}
		}
	}
</script>


<style lang="scss">
	page {
		background-color: $bg;
	}

	.userinfo-box {
		display: flex;
		padding: $gutter;
		background-color: $uni-color-warning;
		align-items: center;
		padding-bottom: 100rpx;

		.user-avatar {
			width: 106rpx;
			height: 106rpx;
			margin-right: $gutter;
			border-radius: 50%;
			border: 3rpx solid #fff;
		}

		.user-info-rg {
			.user-name {
				font-size: $uni-font-size-xl;
			}

			.user-id {
				font-size: $uni-font-size-sm;
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				color: #666;
			}

			.copy {
				border: 1rpx solid #666;
				border-radius: 200rpx;
				padding: 0 12rpx;
				font-size: 16rpx;
				margin-left: 10rpx;
				height: 30rpx;
				line-height: 30rpx;
			}
		}
	}

	.order-gird {
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		margin: -50rpx $gutter 0;
	}

	.order-start-vip {
		margin: -70rpx $gutter 0;
		padding: 0 $gutter;
		background-color: #1B1F23;
		border-radius: $uni-border-radius-lg;
		height: 100rpx;
		font-size: 20rpx;
		color: #d1b16b;
		display: flex;
		align-items: center;
		padding-bottom: 50rpx;
	}

	.apply-box {
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		margin: $gutter;
	}

	.user-title {
		background-color: #fff;
		padding: $gutter;
		border-bottom: 1rpx solid $bg;
	}

	.more-service {
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		margin: $gutter;
	}

	.wallet-box {
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		margin: $gutter;
	}

	.grid-small {
		font-size: 24rpx;
		color: #999;
	}

	.grid-content {
		font-size: 36rpx;
		color: #333;
	}
</style>
