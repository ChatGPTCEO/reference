<template>
  <view>

    <customtop top_title="会员特权"></customtop>

    <view class="container" v-if="!loading">

      <view class="vip_status luckbox" v-if="user.vip == 0">
        <view class="vip_status_icon">
          <img src="/static/images/vip.png">
        </view>
        <view class="user_name">{{user.nickname}}</view>
        <view class="description">未开通</view>
      </view>

      <view class="vip_status luckbox" v-if="user.vip == 1">
        <view class="vip_status_icon">
          <img src="/static/images/vip_on.png">
        </view>
        <view class="user_name">{{user.nickname}}</view>
        <view class="description">有效期：{{user.member_end_date}}</view>
      </view>

      <view class="gold_top luckbox">
        <view class="txt"><span>账户金币余额：</span><span class="gold">{{user.gold}}</span></view>
        <view class="btns"><span class="luckbtn luckbtn-default" @click="jumpPage('/pages/account/gold_pay');">充值</span></view>
      </view>

      <view class="luckbox vip_pay_itmes">
      	<view class="vip_pay items">

      		<view class="item"
            :class="month == item.month ? 'on' : ''"
            v-for="(item, index) in config.vip_exchange_data"
            @click="setMonth(item.month)"
          >
      			<view class="item_box">
      				<view class="date">{{item.date}}</view>
      				<view class="bd">
      					<span>{{item.gold}}</span>
      					<span>金币</span>
      				</view>
      			</view>
      		</view>

      	</view>
      	<view class="vip_pay_foot">
      		<button class="luckbtn luckbtn-payment" @click="exchangeMember()">兑换会员</button>
      	</view>
      </view>

    </view>

  </view>
</template>

<script>
import { request } from "@/utils/http.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      loading: true,
      user: {},
      config: {},
      month: 0,
    }
  },

  onShow: function () {
    this.getUser();
    request.post('/common/getConfig').then(res => {
      this.config = res.data;
      this.month = this.config.vip_exchange_data[0].month;
    })
  },

  methods: {
    getUser: function() {
      uni.showLoading();
      request.post('/user/getLoginUser').then(res => {
        this.loading = false;
        uni.hideLoading();
        this.user = res.data;
      })
    },

    setMonth: function(month) {
      this.month = month;
    },

    exchangeMember: function() {
      let that = this;
      uni.showModal({
      	title: '提示',
      	content: '确认兑换？',
      	success: function (res) {
      		if (res.confirm) {
            uni.showLoading();
            let params = { month: that.month };
            request.post('/payment/exchange_vip', params).then((res) => {
              uni.hideLoading();
              if (res.code == 400) {
                uni.showToast({ title: res.message, icon: 'none' });
                return false;
              }
              if (res.code == 4001) {
                uni.showModal({
                  title: '开通失败',
                  content: '金币不足，去获取金币',
                  success (res) {
                    if (res.confirm) {
                      uni.navigateTo({ url: "/pages/account/gold" })
                    }
                  }
                })
                return false;
              }
              if (res.code == 200) {
                uni.showToast({
                  title: '兑换成功',
                  duration: 1500,
                  success: function() {
                    setTimeout(function(){
                      that.getUser();
                    }, 1500)
                  }
                });
              }
            });
      		}
      	}
      });
    },

    jumpPage: function(url) {
      uni.navigateTo({
        url: url,
      })
    }
  }
}
</script>

<style>
page {
  padding-bottom: 50rpx;
}
.luckbox {
  margin-top: 30rpx;
}
.vip_status {
	text-align: center;
  padding-top: 40rpx !important;
  padding-bottom: 50rpx !important;
}
.vip_status_icon {
	text-align: center;
	margin-bottom: 10px;
}
.vip_status_icon img {
  width: 180rpx;
}
.vip_status .user_name {
	text-align: center;
	margin-bottom: 5px;
	letter-spacing: 2px;
}
.vip_status .description {
	color: #666;
	font-size: 24rpx;
}
.vip_pay_itmes {
  padding-bottom: 50rpx !important;
}
.vip_pay.items {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-bottom: -30rpx;
}
.vip_pay.items .item {
	border: 1px solid #eee;
	width: 240rpx;
	float: left;
	padding: 1rem;
	margin-bottom: 30rpx;
	text-align: center;
	border-radius: 3px;
}
.vip_pay.items .item.on {
	border: 1px solid #d8b66c;
}
.vip_pay.items .item .date {
	padding-bottom: 30rpx;
  border-bottom: 1px solid #eee;
  letter-spacing: 2px;
}
.vip_pay.items .item .bd {
	padding-top: 1rem;
}
.vip_pay.items .item .bd span:first-child {
	font-size: 1.75rem;
}
.vip_pay.items .item .bd span:last-child {
	font-size: 0.75rem;
	color: #999;
}
.vip_pay_foot {
  margin-top: 30rpx;
}

.gold_top {
  font-size: 28rpx;
}
.gold_top .gold {
	font-weight: 600;
}
.gold_top .txt {
	float: left;
  padding-top: 6px;
}
.gold_top .btns {
	float: right;
	font-size: 24rpx;
}
.gold_top .btns .luckbtn {
  width: 160rpx;
}
</style>
