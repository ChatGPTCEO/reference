<template>
	<view>
    <!-- <view class="status-bar"></view> -->
		<view class='my-promotion'>
			<view class="header">
				<!-- <view class='name acea-row row-center-wrapper'>
					<view>当前佣金</view>
				</view> -->
				<view class='num'>
          {{info.brokerage_price}}
          <navigator url='./record?type=1' hover-class="none" class='record'>
            提现记录
            <u-icon name="arrow-right" size="28" color="#999"></u-icon>
          </navigator>
        </view>
				<view class='profit acea-row row-between-wrapper'>
					<view class='item'>
						<view>昨日收益</view>
						<view class='money'>{{info.yesterday_brokerage}}</view>
					</view>
					<view class='item'>
						<view>累积已得</view>
						<view class='money'>{{info.total_brokerage}}</view>
					</view>
				</view>
			</view>
			<!-- #ifdef APP-PLUS || H5 -->
			<navigator url="/pages/wallet/withdrawal?type=0" hover-class="none" class='bnt bg-color'>立即提现</navigator>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<view @click="toRoute({
        url: 'pages/wallet/withdrawal',
        params: {
          type: 0
        }
      })" class='bnt bg-color'>立即提现</view>
			<!-- #endif -->
			<view class='list acea-row row-between-wrapper'>
				<navigator url='./card' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<u-icon name="grid" size="70" color="#e6c70a"></u-icon>
					<view class="u-margin-top-20">推广名片</view>
				</navigator>
				<navigator url='./promoterList' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<u-icon name="hourglass-half-fill" size="70" color="#e6c70a"></u-icon>
					<view class="u-margin-top-20">推广人统计</view>
				</navigator>
				<navigator url='./record?type=2' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<u-icon name="rmb-circle" size="70" color="#e6c70a"></u-icon>
					<view class="u-margin-top-20">佣金明细</view>
				</navigator>
				<navigator url='./order' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<u-icon name="file-text" size="70" color="#e6c70a"></u-icon>
					<view class="u-margin-top-20">推广人订单</view>
				</navigator>
				<navigator url='./promoterRank' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<u-icon name="account" size="70" color="#e6c70a"></u-icon>
					<view class="u-margin-top-20">推广人排行</view>
				</navigator>
				<navigator url='./commissionRank' hover-class="none" class='item acea-row row-center-wrapper row-column'>
					<u-icon name="level" size="70" color="#e6c70a"></u-icon>
					<view class="u-margin-top-20">佣金排行</view>
				</navigator>
			</view>
		</view>
    <u-modal v-model="showTips" 
      content="成为平台会员,即可获得合伙人身份,立即成为平台会员吧～" 
      confirm-text="开通会员"
      show-cancel-button
      confirm-color="#905600"
      @confirm="onConfirm"
      @cancel="onCancel"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        showTips: false,
        info: {
          brokerage_price: '0.00',
          yesterday_brokerage: '0.00',
          total_brokerage: '0.00'
        }
			};
		},
		computed: {
      userInfo () {
        return this.$store.state.userInfo
      },
      hasLogin () {
        return this.$store.state.hasLogin
      }
    },
    onShow() {
      if (this.hasLogin) {
        if (this.userInfo.is_promoter > 0) {
          this.getInfo();
		       this.showTips = false
        } else {
          this.showTips = true
        }
      } else {
        this.showTips = true
        // uni.navigateTo({
        //   url: '/pages/login/login'
        // })
      }
    },
    methods: {
      onCancel () {
        // uni.navigateBack()
        uni.switchTab({
          url: '../member/member'
        })
      },
      onConfirm () {
        uni.switchTab({
          url: '../member/member'
        })
      },
      getInfo () {
        this.$u.get('/api/user/spread_info')
        .then(({ data }) => {
          this.info = data
        })
      },
      toRoute (params) {
        this.$u.route(params)
      }
    }
	}
</script>

<style lang="scss">
page {
  background-color: $bg;
}
.status-bar {
  height: var(--status-bar-height);
  background-color: #ffdd00;
}
.my-promotion .header {
  background-color: #ffdd00;
  width: 100%;
  height: 250rpx;
}
.bg-color {
  background-color: #ffdd00!important;
  color: #333 !important;
  box-shadow: 0 0 0 20rpx $bg;
}
.acea-row {
  display: flex;
  flex-wrap: wrap;
}
.acea-row.row-center-wrapper {
  justify-content: center;
  align-items: center;
}
.acea-row.row-between-wrapper {
  justify-content: space-between;
}
.acea-row.row-column {
  flex-direction: column;
}
.my-promotion .header .name {
  font-size: 32rpx;
  color: #000;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.record {
  font-size: 26rpx;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: -40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.record .iconfont {
  font-size: 25rpx;
  margin-left: 10rpx;
  vertical-align: 2rpx;
}

.my-promotion .header .num {
  text-align: center;
  color: #333;
  // margin-top: 28rpx;
  font-size: 90rpx;
  font-family: 'Guildford Pro';
  min-height: 90rpx;
}

.my-promotion .header .profit {
  padding: 0 20rpx;
  margin-top: 35rpx;
  font-size: 24rpx;
  color: rgba(0, 0, 0, 0.5);
}

.my-promotion .header .profit .item {
  min-width: 200rpx;
  text-align: center;
}
.my-promotion .list {
  padding: 0 10px 25px 10px;
  margin-top: 5px;
}
.my-promotion .list .item {
  width: 172px;
  height: 120px;
  border-radius: 10px;
  background-color: #fff;
  margin-top: 10px;
  font-size: 15px;
  color: #666;
}

.my-promotion .header .profit .item .money {
  font-size: 34rpx;
  color: #333;
  margin-top: 5rpx;
}

.my-promotion .bnt {
  font-size: 28rpx;
  color: #fff;
  width: 258rpx;
  height: 68rpx;
  border-radius: 50rpx;
  text-align: center;
  line-height: 68rpx;
  margin: -32rpx auto 0 auto;
}

.my-promotion .list {
  padding: 0 20rpx 50rpx 20rpx;
  margin-top: 10rpx;
}

.my-promotion .list .item {
  width: 345rpx;
  height: 240rpx;
  border-radius: 20rpx;
  background-color: #fff;
  margin-top: 20rpx;
  font-size: 30rpx;
  color: #666;
}

.my-promotion .list .item .iconfont {
  font-size: 70rpx;
  background-image: linear-gradient(to right, #fc4d3d 0%, #e93323 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20rpx;
}
</style>
