<template>
  <view>

    <customtop top_title="充值金币"></customtop>

    <view class="container" v-if="!loading">
    	<view class="top_up_box">
    		<view class="item" :class="gold == item.gold ? 'on' : ''" v-for="(item, index) in gold_pay_data" @click="setGoldPayData(item.gold, item.price);">
    			<view class="item_box">
    				<view class="gold">{{item.gold}}金币</view>
    				<view class="money">¥{{item.price}}</view>
    			</view>
    		</view>
    	</view>

    	<view class="payment">

        <view class="items">-->
           <view class="item" :class="payment_way == 'alipay_wap' ? 'on' : ''" @click="setPaymentWay('alipay_wap')">
            <view class="left">
              <img class="icon" src="../../static/images/icon_alipay.png">
              <span class="txt">维护中...</span>
            </view>
            <i class="iconfont icon-yuanxingweixuanzhong"></i>
          </view>


           <view class="item" :class="payment_way == 'weixinpay' ? 'on' : ''" @click="setPaymentWay('weixinpay')">
            <view class="left">
              <img class="icon" src="../../static/images/icon_weixinpay.png">
              <span class="txt">微信支付</span>
            </view>
            <i class="iconfont icon-yuanxingweixuanzhong"></i>
           </view>




          <!-- 注释内容 <view class="item" :class="payment_way == 'wallet' ? 'on' : ''" @click="setPaymentWay('wallet')">
            <view class="left">
              <img class="icon" src="../../static/images/icon_wallet.png">
              <span class="txt">余额支付</span>
            </view>
            <i class="iconfont icon-yuanxingweixuanzhong"></i>
          </view>-->
        </view>
      </view>

      <view class="payment_foot">
        <view class="description">应付金额：<span class="price_color">{{price}}</span> 元</view>
        <button class="luckbtn luckbtn-payment btn_pay" @click="payFun">立即支付</button>
      </view>

    </view>

  </view>
</template>

<script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
import { request } from "@/utils/http.js"
import util from "@/utils/util.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      loading: true,
      gold_pay_data: [],
      gold: 0,
      price: 0,
      payment_way: 'alipay_wap'
    }
  },

  onLoad: function () {
    uni.showLoading();
    request.post('/common/getConfig').then(res => {
      uni.hideLoading();
      this.loading = false;
      this.gold_pay_data = res.data.gold_pay_data;
      this.gold = res.data.gold_pay_data[0].gold;
      this.price = res.data.gold_pay_data[0].price;
    })
  },

  methods: {
    setGoldPayData: function(gold, price) {
      this.gold = gold;
      this.price = price;
    },

    setPaymentWay: function(payment_way) {
      this.payment_way = payment_way;
    },

    payFun: function() {
      let that = this;
      uni.showModal({
        title: '提示',
        content: '确认充值？',
        success (res) {
          if (res.confirm) {
            uni.showLoading();
            let payment_way = that.payment_way;
            // 微信内打开
            if (payment_way == 'weixinpay') {
              if (util.is_wx()) {
                payment_way = 'weixinpay_jsapi_wxmp';
              } else {
                payment_way = 'weixinpay_h5';
              }
            }
            let params = {
              gold: that.gold,
              payment_way: payment_way
            };
            request.post('/payment/pay_gold', params).then((res) => {
              uni.hideLoading();
              if (res.code == 400) {
                uni.showToast({ title: res.message, icon: 'none' });
                return false;
              }
              if (payment_way == 'alipay_wap') {
                //window.location.href = res.data.url;
                // 调用submit方法
                document.querySelector('body').innerHTML = res.data;
                document.forms[0].submit();
              }
              if (payment_way == 'weixinpay_h5') {
                window.location.href = res.data.url;
                return false;
              }
              if (payment_way == 'weixinpay_jsapi_wxmp') {
                that.onBridgeReady(res.data.jsApiParams);
                return false;
              }
              if (payment_way == 'wallet') {
                uni.showToast({
                  title: '充值成功',
                  icon: 'success',
                  duration: 1500,
                  success: function () {
                    setTimeout(function() {
                      uni.navigateBack({ delta: 1 });
                    }, 1500);
                  }
                });
              }
            });
          }
        }
      })
    },

    onBridgeReady: function(jsApiParams) {
      WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        appId: jsApiParams.appId,
        timeStamp: jsApiParams.timeStamp,
        nonceStr: jsApiParams.nonceStr,
        package: jsApiParams.package,
        signType: jsApiParams.signType,
        paySign: jsApiParams.paySign
      },
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          uni.showToast({
            title: '充值成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function() {
                uni.navigateBack({ delta: 1 });
              }, 1500);
            }
          });
        }
      });
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
page {
  padding-bottom: 60rpx;
}
.top_up_box {
	overflow: hidden;
	margin-top: 50rpx;
}
.top_up_box .items {
  margin-bottom: -20rpx;
}
.top_up_box .item {
	width: 325rpx;
	height: 220rpx;
	border: 1px solid #eee;
	border-radius: 3px;
	float: left;
	margin-right: 20rpx;
	background-color: #fff;
	text-align: center;
	margin-bottom: 20rpx;
}
.top_up_box .item.on {
	border: 1px solid #d8b66c;
}
.top_up_box .item .item_box {
	padding-top: 70rpx;
}
.top_up_box .item:nth-child(2n) {
	margin-right: 0;
}
.top_up_box .item .gold {
	font-size: 36rpx;
	letter-spacing: 1px;
}
.top_up_box .item .money {
	font-size: 28rpx;
	color: #666;
	letter-spacing: 2px;
  margin-top: 5px;
}

.payment {
  background-color: #fff;
  padding: 0 30rpx;
  border-radius: 3px;
  margin-top: 30rpx;
}
.payment .item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
</style>
