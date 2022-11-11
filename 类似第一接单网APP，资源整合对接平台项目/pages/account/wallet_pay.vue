<template>
  <view>

    <customtop top_title="钱包充值"></customtop>

    <view class="container">

      <form class="luckform" @submit="formSubmit">
        <view class="items">
          <view class="top"><view class="title">充值金额</view></view>
          <view class="item weui-cell">
            <view class="weui-cell__bd">
              <input name="weixin" class="weui-input" type="text" v-model="form.price" placeholder="请输入充值金额" />
            </view>
          </view>
        </view>
      </form>

      <view class="payment">
        <view class="items">
         
          <view class="item" :class="payment_way == 'weixinpay' ? 'on' : ''" @click="setPaymentWay('weixinpay')">
            <view class="left">
              <img class="icon" src="../../static/images/icon_weixinpay.png">
              <span class="txt">微信支付</span>
            </view>
            <i class="iconfont icon-yuanxingweixuanzhong"></i>
          </view>
        </view>
      </view>

      <view class="payment_foot">
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
      form: {},
      payment_way: 'alipay_wap'
    }
  },
  methods: {
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
              price: that.form.price,
              payment_way: payment_way
            };
            request.post('/payment/pay_wallet', params).then((res) => {
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
                window.location.reload();
              }, 1500);
            }
          });
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
@import url("@/static/weui.min.css");
.luckform .items {
  margin-top: 30rpx;
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
.payment_foot {
  margin-top: 30rpx;
}
</style>
