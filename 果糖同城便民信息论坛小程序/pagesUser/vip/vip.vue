<template>
	<view>
		<view class="userinfo">
			<view class="user">
				<u-avatar mode="circle" size="120" :src="userInfo.avatar"></u-avatar>
				<view class="info">
					<text>{{userInfo.nickname}}</text>
					<view class="vip">
						<image src="../../static/images/VIP1.png" mode="" style="width: 40rpx;height: 40rpx;">
						</image>
						<text class="viptext">{{userVip.name}}</text>
					</view>
				</view>
			</view>
			<view class="tip">
				<text class="" v-if="userVip.vip_time==0">开通会员，即可享受更多权益！！</text>
				<text v-else>你的会员将于{{userVip.vip_time}}到期哦！</text>
			</view>
		</view>
		
		
		<view class="card">
			<swiper class="swiper" :current="1" next-margin="40rpx" previous-margin="40rpx" @change="changeSwiper">
				<swiper-item v-for="(item,index) in list" :key="index">
					<view class="vip-card">
						<view class="head">
							<text>{{item.name}}</text>
						</view>
						<view class="cont">
							
							<u-row gutter="16" v-if="item.id!=1">
								<u-col span="4" v-for="(it,ix) in item.selpay" :key="ix">
									<view class="item" @click="selopen(item,it)">
										<view class="item-card u-shadow-warp"
										:style="{'borderColor':item.id==selvip.id&&selvip.month==it.month?'#ff9900':'#e6e6e6'}">
										
											<view class="item-month u-text-center">{{it.month}}个月</view>
											<view class="item-price u-text-center">￥{{it.price}}</view>
										</view>
										
									</view>
								</u-col>
							</u-row>
							
							
							<view class="order" v-if="item.id!=1">
								<view class="order-head">
									<text>支付方式</text>
								</view>
								<view class="pay" @click="selPay(1)">
									<view class="left">
										<u-image src="/static/images/pay_wx.png" width="30rpx" height="30rpx"></u-image>
										<text style="margin-left: 10rpx;">微信支付</text>
									</view>
									<u-icon name="checkmark-circle-fill" :color="pay_type==1?'#ff5d37':'#999999'"
										size="40"></u-icon>
								</view>
								<!-- #ifdef APP-PLUS -->
								<view class="pay" @click="selPay(2)">
									<view class="left">
										<u-image src="/static/images/pay_ali.png" width="30rpx" height="30rpx">
										</u-image>
										<text style="margin-left: 10rpx;">支付宝支付</text>
									</view>
									<u-icon name="checkmark-circle-fill" :color="pay_type==2?'#ff5d37':'#999999'"
										size="40"></u-icon>
								</view>
								<!-- #endif -->
							</view>
							
							
							<view v-if="item.id!=1" style="margin-top: 30rpx;margin-bottom: 30rpx;">
								<u-button type="warning" style="width: 600rpx;" @click="openVip">立即开通
								</u-button>
							</view>
							<u-divider color="#ffbc44">专享权益</u-divider>
							<u-grid :col="2" :border="false">
								<u-grid-item>
									<text class="grid-num">{{item.job_free_num}}</text>
									<view class="grid-text">招聘免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.job_free_num}}</text>
									<view class="grid-text">房源免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.car_free_num}}</text>
									<view class="grid-text">车辆免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.commodity_free_num}}</text>
									<view class="grid-text">物品免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.farming_free_num}}</text>
									<view class="grid-text">农林免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.transfer_free_num}}</text>
									<view class="grid-text">生意免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.promote_free_num}}</text>
									<view class="grid-text">推广免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.ask_free_num}}</text>
									<view class="grid-text">打听免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.carpool_free_num}}</text>
									<view class="grid-text">车找人免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.carpool_user_free_num}}</text>
									<view class="grid-text">人找车免费发布数/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.top_discount/10}}折</text>
									<view class="grid-text">置顶折扣/月</view>
								</u-grid-item>
								<u-grid-item>
									<text class="grid-num">{{item.over_push_price}}</text>
									<view class="grid-text">超过免费发布数价格/条</view>
								</u-grid-item>
							</u-grid>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		
		
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				userVip: {
					vip_id: 1,
					vip_time: 0,
					name: "普通会员"
				},
				list: [],
				selvip: {},
				pay_type: 1,
			};
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				isLogin: state => state.user.isLogin,
			})
		},
		onLoad() {
			this.$u.get('/addons/hicity/user/getVipConfig', {

			}).then(res => {
				this.list = res;
				this.selvip = {
					id: this.list[1].id,
					...this.list[1].selpay[0]
				}
			})
		},
		onShow() {
			if (this.isLogin) {
				this.$u.get('/addons/hicity/user/getUserVip', {

				}).then(res => {
					this.userVip = res
				})
			}
		},
		methods: {
			selopen(item, it) {
				let obj = {
					id: item.id,
					...it,
				}
				this.selvip = obj;
			},
			changeSwiper(e) {
				if (e.detail.current >= 1) {
					let obj = {
						id: this.list[e.detail.current].id,
						...this.list[e.detail.current].selpay[0],
					}
					this.selvip = obj;
				}
			},
			openVip() {
				this.$u.get('/addons/hicity/user/openVip', {
					...this.selvip
				}).then(res => {
					var that = this;
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes);
							that.$u.post('/addons/hicity/user/payOrder', {
								code: loginRes.code,
								order_no: res.order_no,
								pay_type: that.pay_type,
								//#ifdef MP-WEIXIN
								platform: 'mini_app_wx',
								//#endif
							}).then(payRes => {
								console.log(payRes)
								//#ifdef MP-WEIXIN
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: payRes.timeStamp,
									nonceStr: payRes.nonceStr,
									package: payRes.package,
									signType: payRes.signType,
									paySign: payRes.paySign,
									success: function(res) {
										// console.log('success:' + JSON.stringify(res));
										that.$u.route({
											url: '/pagesUser/pay_result/pay_result',
										});
									},
									fail: function(err) {
										// console.log('fail:' + JSON.stringify(err));
										that.$u.toast('支付取消')
									}
								});
								//#endif
							}).catch(err => {
								that.$u.toast('支付错误')
							})
						}
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userinfo {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 20rpx;
		margin: 0rpx 20rpx;
		border-radius: 20rpx;

		.user {
			display: flex;
			flex-direction: row;
			align-items: center;

			.info {
				margin-left: 20rpx;
				color: #333333;
				font-weight: 600;
				font-size: 32rpx;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				margin-right: 20rpx;

				.vip {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 24rpx;
					margin-top: 15rpx;

					.viptext {
						margin-left: 10rpx;
						color: #333333;
						font-weight: normal;
					}
				}
			}
		}

		.tip {
			font-size: 28rpx;
			color: #666666;
			margin: 20rpx;
		}
	}

	.card {
		.swiper {
			height: 1500rpx;

			.vip-card {
				display: flex;
				flex-direction: column;
				margin: 10rpx;
				background-color: white;
				border-radius: 20rpx;

				.head {
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 20rpx;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					color: #222222;
					font-size: 32rpx;
				}

				.cont {
					width: 100%;
					padding: 20rpx;
                    
					//价格卡片
					.item {
						width: 100%;
						.item-card {
							border: 1rpx solid #f2f6fc;
							border-radius: 12rpx;
							padding: 10rpx;
							height: 230rpx;
						}
						.item-month {
							margin-top: 30rpx;
						}
						.item-price {
							position: absolute;
							bottom: 30rpx;
							left: 0;
							right: 0;
							font-size: 28rpx;
							font-weight: bold;
						}
					}
					
				}

				.grid-num {
					font-size: 32rpx;
					color: #ffbc44;
				}

				.grid-text {
					font-size: 26rpx;
					color: #999999;
				}
			}
		}
	}

	.order {
		margin: 35rpx 20rpx;
		background-color: white;
		border: 1rpx solid #F8F8F8;
		padding: 20rpx;
		border-radius: 10rpx;

		.cell {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx 10rpx;
			font-size: 30rpx;

			.title {
				width: 180rpx;
				color: #666666;
			}

			.cont {
				display: flex;
				flex: 1;
				flex-direction: row;
				justify-content: flex-end;
				color: #F44C01;
				color: 32rpx;
			}
		}

		.order-head {
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #F8F8F8;
		}

		.pay {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;

			.left {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		}
	}
</style>
