<template>
	<view>

    <customtop :top_title="top_title"></customtop>

    <view class="container" v-if="!loading">

      <view class="luckbox flow">
        <view class="top"><span class="title">交易进度</span></view>
        <view class="bd">
          <view class="item"><span>当前进度：</span><span class="text-danger">{{danbao.status_str}}</span></view>

          <view v-if="danbao.status > 0">
            <view v-if="danbao.payer_user_finish_status == 1">
              <view class="item"><span>付款方确认：</span><span>已确认</span></view>
              <view class="item"><span>确认时间：</span><span>{{danbao.payer_user_finish_date}}</span></view>
            </view>
            <view v-if="danbao.payer_user_finish_status != 1">
              <view class="item"><span>付款方确认：</span><span>未确认</span></view>
            </view>
            <view v-if="danbao.payee_user_finish_status == 1">
              <view class="item"><span>收款方确认：</span><span>已确认</span></view>
              <view class="item"><span>确认时间：</span><span>{{danbao.payee_user_finish_date}}</span></view>
            </view>
            <view v-if="danbao.payee_user_finish_status != 1">
              <view class="item"><span>收款方确认：</span><span>未确认</span></view>
            </view>
          </view>

        </view>
      </view>

      <view class="luckbox flow">
        <view class="top"><span class="title">交易信息</span></view>
        <view class="bd">
          <view class="item"><span>当前身份：</span><span>{{danbao.current_identity}}</span></view>
          <view class="item"><span>订单编号：</span><span>{{danbao.id}}</span></view>
          <view class="item"><span>付款方手机：</span><span>{{danbao.payer_user_phone}}</span></view>
          <view class="item"><span>收款方手机：</span><span>{{danbao.payee_user_phone}}</span></view>
          <view class="item"><span>交易金额：</span><span>{{danbao.price}}</span></view>
          <view class="item"><span>发起时间：</span><span>{{danbao.created_date}}</span></view>
        </view>
      </view>

      <view class="luckbox flow">
        <view class="top"><span class="title">交易内容</span></view>
        <view class="bd">
          <rich-text :nodes="danbao.content"></rich-text>
        </view>
      </view>

      <view class="luckbox flow">
        <view class="top"><span class="title">操作处理</span></view>
        <view class="bd">

          <view v-if="danbao.status == 1">
            <view v-if="danbao.finish_ident == 0">
              <button class="luckbtn luckbtn-default">确认已完成</button>
            </view>
            <view v-if="danbao.finish_ident != 0">
              暂无操作提示
            </view>
          </view>

          <view v-if="danbao.status == 0">
            <view v-if="danbao.current_identity != '付款方'">
              暂无操作提示
            </view>
            <view v-if="danbao.current_identity == '付款方'">
              <view class="payment">
                <view class="items">
                  <view class="item" :class="payment_way == 'alipay_wap' ? 'on' : ''" @click="setPaymentWay('alipay_wap')">
                    <view class="left">
                      <img class="icon" src="../../static/images/icon_alipay.png">
                      <span class="txt">支付宝支付</span>
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
                  <view class="item" :class="payment_way == 'wallet' ? 'on' : ''" @click="setPaymentWay('wallet')">
                    <view class="left">
                      <img class="icon" src="../../static/images/icon_wallet.png">
                      <span class="txt">余额支付</span>
                    </view>
                    <i class="iconfont icon-yuanxingweixuanzhong"></i>
                  </view>
                </view>
              </view>

              <view class="payment_foot">
                <view class="description">应付金额：<span class="price_color">{{danbao.price}}</span> 元</view>
                <button class="luckbtn luckbtn-payment btn_pay" @click="payFun">立即支付</button>
              </view>
            </view>
          </view>

        </view>
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
      top_title: '担保交易详情',
      loading: true,
      danbao: {},
      payment_way: 'alipay_wap'
    }
  },

  onLoad(options) {
    uni.showLoading();
    this.id = options.id;
  },

  onShow: function() {
    this.getDanbao();
  },

  methods: {
    getDanbao: function() {
      request.post('/danbao/getDanbao', {id: this.id}).then(res => {
        this.loading = false;
        uni.hideLoading();
        this.danbao = res.data;
      })
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
              order_id: that.danbao.id,
              payment_way: payment_way
            };
            request.post('/payment/pay_order_danbao', params).then((res) => {
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

    setPaymentWay: function(payment_way) {
      this.payment_way = payment_way;
    },
  }
}
</script>

<style>
page {
  padding-bottom: 60rpx;
}
.luckbox {
  margin-top: 30rpx;
}
.flow .item {
	margin-bottom: 10px;
}
</style>
