<template>
	<view>
		<form @submit="submitSub" report-submit='true'>
			<view class="payment-top acea-row row-column row-center-wrapper">
				<span class="name">我的余额</span>
				<view class="pic">
					￥<span class="pic-font">{{ userinfo.now_money || '0.00' }}</span>
				</view>
			</view>
			<view class="payment">
				<view class="nav acea-row row-around row-middle">
					<view class="item" :class="active==index?'on':''" v-for="(item,index) in navRecharge" :key="index" @click="navRecharges(index)">{{item}}</view>
				</view>
				<view class='tip picList' v-if='!active'>
					<view class="pic-box pic-box-color acea-row row-center-wrapper row-column" :class="activePic == index ? 'pic-box-color-active' : ''"
					 v-for="(item, index) in picList" :key="index" @click="picCharge(index, item)">
						<view class="pic-number-pic">
							{{ item.data.price }}<span class="pic-number"> 元</span>
						</view>
						<view class="pic-number">赠送：{{ item.data.give }} 元</view>
					</view>
					<view class="pic-box pic-box-color acea-row row-center-wrapper" :class="rechar_id == 0 ? 'pic-box-color-active' : ''"
					 @click="picCharge(picList.length)">
						<input type="number" placeholder="其他" v-model="money" 
              class="pic-box-money pic-number-pic" :class="rechar_id == 0 ? 'pic-box-color-active' : ''" />
					</view>
					<view class="tips-box">
						<view class="tips mt-30">注意事项：</view>
						<view class="tips-samll" v-for="item in rechargeAttention" :key="item">
							{{ item }}
						</view>
					</view>

				</view>
				<view class="tip" v-else>
					<view class='input'><text>￥</text><input placeholder="0.00" type='number' placeholder-class='placeholder' :value="number"
						 name="number"></input></view>
					<view class="tips-title">
						<view style="font-weight: bold; font-size: 26rpx;">提示：</view>
						<view style="margin-top: 10rpx;">当前佣金为 <text class='font-color'>￥{{info.brokerage_price || 0}}</text></view>
					</view>
					<view class="tips-box">
						<view class="tips mt-30">注意事项：</view>
						<view class="tips-samll" v-for="item in rechargeAttention" :key="item">
							{{ item }}
						</view>
					</view>
				</view>
				<button class='but bg-color' form-type="submit"> {{active ? '立即转入': '立即充值' }}</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				navRecharge: ['账户充值', '佣金转入'],
				active: 0,
				number: '',
				from: '',
				isShowAuth: false, //是否隐藏授权
				picList: [],
				activePic: 0,
				money: "",
				numberPic: '',
				rechar_id: 0,
				rechargeAttention: [],
        info: {}
			};
		},
		computed: {
      hasLogin () {
        return this.$store.state.hasLogin
      },
      userinfo () {
        return this.$store.state.userInfo
      }
    },
		onLoad(options) {
      this.getInfo()
		},
		methods: {
      getInfo () {
        // 获取充值额度
        this.$u.get('/api/common/recharge_quota')
        .then(({ data }) => {
          this.picList = data.recharge_quota
          this.rechargeAttention = data.recharge_attention
          if (this.picList[0]) {
            this.rechar_id = this.picList[0].id;
            this.numberPic = this.picList[0].data.price;
          }
        })
        // 获取佣金
        this.$u.get('/api/user/spread_info')
        .then(({ data }) => {
          this.info = Object.assign(this.info, data)
        })
      },

			/**
			 * 选择金额
			 */
			picCharge(idx, item) {
				this.activePic = idx;
				if (item === undefined) {
					this.rechar_id = 0;
					this.numberPic = "";
				} else {
					this.money = "";
					this.rechar_id = item.id;
					this.numberPic = item.data.price;
				}
			},
      // 切换
			navRecharges: function(index) {
				this.active = index;
			},
      // 查询用户信息
      queryInfo () {
        return new Promise((resolve, reject) => {
          this.$u.get('/api/user')
          .then(({ data }) => {
            this.$store.commit('writeInfo', data)
            resolve(true)
          }).catch(() => {
            this.$store.commit('logOut')
            resolve(false)
            if (false) reject(false);
          })
        })
      },
			/*
			 * 用户充值
			 */
			submitSub: function(e) {
				let that = this
				let value = e.detail.value.number;
				// 转入余额
				if (that.active) {
					if (parseFloat(value) < 0 || parseFloat(value) == NaN || value == undefined || value == "") {
            return uni.showToast({
              title: '请输入金额',
              icon: 'none'
            })
					}
					uni.showModal({
						title: '转入余额',
						content: '转入余额后无法再次转出，确认是否转入余额',
						success(res) {
							if (res.confirm) {
                that.$u.post('/api/user/recharge/brokerage', {
                  brokerage: parseFloat(value),
                }).then(res => {
                  uni.showToast({
                    title: '转入成功'
                  })
                  that.queryInfo()
                  .then((res) => {
                    if (res) {
                      uni.navigateBack()
                    } else {
                      uni.redirectTo({
                        url: '/pages/login/login'
                      })
                    }
                  })
                }).catch(err => {
                  uni.showToast({
                    title: err,
                    icon: 'none'
                  })
                });
							} else if (res.cancel) {
                return uni.showToast({
                  title: '已取消'
                })
							}
						},
					})
				} else {
					if (this.rechar_id == 0) {
						
						if (parseFloat(that.money)=== 0) {
							return uni.showToast({
								title: '充值金额金额不能为0！',
                icon: 'none'
							});
						}
						if (!that.money) {
							return uni.showToast({
								title: '请填写充值金额！',
                icon: 'none'
							});
						}
						if (isNaN(that.money)) {
							return uni.showToast({
								title: '请填写正确的金额！',
                icon: 'none'
							});
						}
					}
					uni.showLoading({
						title: '正在支付',
						mask:true
					})
          this.$u.post('/api/user/recharge', {
            price: that.rechar_id == 0 ? that.money : that.numberPic,
            type: 'routine',
            recharge_id: this.rechar_id
          }).then((res) => {
						uni.hideLoading()
            let jsConfig = res.data.data;
            uni.requestPayment({
            	timeStamp: jsConfig.timestamp,
            	nonceStr: jsConfig.nonceStr,
            	package: jsConfig.package,
            	signType: jsConfig.signType,
            	paySign: jsConfig.paySign,
            	success: function(res) {
                uni.showToast({
                  title: '支付成功'
                })
                that.queryInfo()
                .then((res) => {
                  if (res) {
                    uni.navigateBack()
                  } else {
                    uni.redirectTo({
                      url: '/pages/login/login'
                    })
                  }
                })
            	},
            	fail: function() {
            		uni.showToast({
            		  title: '支付失败',
                  icon: 'none'
            		})
            	},
            	complete: function(res) {
            		if (res.errMsg == 'requestPayment:cancel') {
                  uni.showToast({
                    title: '取消支付',
                    icon: 'none'
                  })
                }
            	}
            }).catch(err => {
              uni.hideLoading();
              uni.showToast({
                title: err,
                icon: 'none'
              })
            });
          })
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.payment {
		position: relative;
		top: -60rpx;
		width: 100%;
		background-color: #fff;
		border-radius: 10rpx;
		padding-top: 25rpx;
		border-top-right-radius: 39rpx;
		border-top-left-radius: 39rpx;
	}

	.payment .nav {
		height: 75rpx;
		line-height: 75rpx;
		padding: 0 100rpx;
	}

	.payment .nav .item {
		font-size: 30rpx;
		color: #333;
	}

	.payment .nav .item.on {
		font-weight: bold;
		border-bottom: 4rpx solid #ffdd00;
	}

	.payment .input {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px dashed #dddddd;
		margin: 60rpx auto 0 auto;
		padding-bottom: 20rpx;
		font-size: 56rpx;
		color: #333333;
		flex-wrap: nowrap;

	}

	.payment .input text {
		padding-left: 106rpx;
	}

	.payment .input input {
		padding-right: 106rpx;
		width: 300rpx;
		height: 94rpx;
		text-align: center;
		font-size: 70rpx;
	}

	.payment .placeholder {
		color: #d0d0d0;
		height: 100%;
		line-height: 94rpx;
	}

	.payment .tip {
		font-size: 26rpx;
		color: #888888;
		padding: 0 30rpx;
		margin-top: 25rpx;
	}

	.payment .but {
		color: #333;
		font-size: 30rpx;
		width: 700rpx;
		height: 86rpx;
		border-radius: 50rpx;
		margin: 46rpx auto 0 auto;
		line-height: 86rpx;
	}

	.payment-top {
		width: 100%;
		height: 350rpx;
		background-color: #ffdd00;

		.name {
			font-size: 26rpx;
			color: rgba(0, 0, 0, 0.8);
			margin-top: -38rpx;
			margin-bottom: 30rpx;
		}

		.pic {
			font-size: 32rpx;
			color: #333;
      padding-right: 20rpx;
		}

		.pic-font {
			font-size: 78rpx;
			color: #333;
		}
	}

	.picList {
		display: flex;
		flex-wrap: wrap;
		margin: 30rpx 0;

		.pic-box {
			width: 32%;
			height: auto;
			border-radius: 20rpx;
			margin-top: 21rpx;
			padding: 20rpx 0;
			margin-right: 12rpx;
    
			&:nth-child(3n) {
				margin-right: 0;
			}
		}

		.pic-box-color {
			background-color: #f4f4f4;
			color: #656565;
		}

		.pic-number {
			font-size: 22rpx;
		}

		.pic-number-pic {
			font-size: 38rpx;
			margin-right: 10rpx;
			text-align: center;
      color: #333;
		}

		.pic-box-color-active {
			background-color: #ffdd00 !important;
			color: #333 !important;
		}
	}
  .bg-color {
    background-color: #ffdd00;
  }

	.tips-box {
    width: 100%;
		.tips {
			font-size: 28rpx;
			color: #333333;
			font-weight: 800;
			margin-bottom: 14rpx;
			margin-top: 20rpx;
		}

		.tips-samll {
			font-size: 24rpx;
			color: #333333;
			margin-bottom: 14rpx;
		}

		.tip-box {
			margin-top: 30rpx;
		}
	}

	.tips-title {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #333;
	}
  .acea-row.row-center-wrapper {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .acea-row.row-around {
    align-items: center;
    justify-content: space-around;
  }
  .acea-row {
    display: flex;
    flex-wrap: wrap;
  }
  .font-color, .font-color-red {
    color: red !important;
  }
</style>
