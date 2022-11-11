<template>
  <view>
    <!-- 加载动画 -->
    <orange-fullloading
      text="加载中"
      :loadshow="loadingStatus">
    </orange-fullloading>
    <view class="w-100 bg-color" style="height: 380rpx;">
      <view class="pl-2" style="padding-top: 120rpx;">
        <view class="iconfont icon-back2-01 font-s-6" @click="navBack"></view>
      </view>
      <view class="" style="text-align: center;">
        <view class="mt-4 font-s-5">支付金额</view>
        <view class="font-s-8 mt-1">
          <text class="font-s-5">￥</text>
          {{createOrderInfo.realTotalAmount || orderToPayMethod.price || 0}}
        </view>
      </view>
    </view>
    <view class="pay-mode">
      <view class="row-ac-sb border p-3 mb-2 rounded" v-for="(item,index) in payMethodList"
            @click="payDefault(index,item)" :key="item.id">
        <view class="row-ac">
          <view class="iconfont font-s-9" :class="item.icon" :style="'color: '+item.color"></view>
          <view class="ml-5">{{item.text}}
            <text class="font-s-3 text-main-color">{{item.tip}}</text>
          </view>
        </view>
        <view class="row choice text-white rounded-50 iconfont icon-gouxuan"
              :class="item.checked == true ? 'bg-color' : 'bg-white'"></view>
      </view>
    </view>
    <view class="w-100 row fixed-bottom" style="height: 120rpx;">
      <view class="bg-color row rounded font-s-5" @click="beforePay" style="width: 280rpx;height: 80rpx;">确认支付</view>
    </view>
  </view>
</template>

<script>
import {
  createOrderUrl, createOrderByCartUrl, weChatPayUrl,
  createOrderBySeckillUrl, createOrderByDistributionUrl,createOrderByGroupBuyingUrl
} from '@/api/index'

export default {
  data () {
    return {
      // #ifdef MP-WEIXIN
      payMethodList: [
        {
          id: 1,
          icon: 'icon-weixinzhifu2',
          color: '#28A745',
          text: '微信支付',
          tip: '(推荐)',
          checked: true,
        }, {
          id: 3,
          icon: 'icon-qianbao',
          color: '#dc3545',
          text: '余额支付',
          tip: '',
          checked: false,
        }
      ],
      // #endif

      // #ifdef APP-PLUS || H5
      payMethodList: [
        {
          id: 1,
          icon: 'icon-weixinzhifu2',
          color: '#28A745',
          text: '微信支付',
          tip: '(推荐)',
          checked: true,
        }, {
          id: 2,
          icon: 'icon-zhifubaozhifu1',
          color: '#007BFF',
          text: '支付宝支付',
          tip: '',
          checked: false,
        },
        {
          id: 3,
          icon: 'icon-qianbao',
          color: '#dc3545',
          text: '余额支付',
          tip: '',
          checked: false,
        }
      ],
      // #endif
      payMethodId: 1,
      orderInfo: {},
      // 系统在哪个平台上面运行，默认是APP
      providerValue: 'APP',
      // 从上个页面传来的订单信息
      methodGoodsInfo: {},
      pageType: '',
      // 创建订单接口返回的信息
      createOrderInfo: {},
      beforePayResult: {},
      // 直接从订单管理点击去付款
      orderToPay: false,
      // 从订单管理点击去付款的参数
      orderToPayMethod: {},
      loadingStatus: true,
      distributionUserCenterInfo: {}
    }
  },
  onLoad (options) {
    this.initData(options)
  },
  methods: {
    initData (options) {
      if (options.payType === 'buyNow') {
        // 商品详情页直接购买创建订单
        this.methodGoodsInfo = this.$store.state.toPayHttpObj
        this.pageType = 'buyNow'
        this.createOrder('buyNow', this.methodGoodsInfo)
      } else if (options.payType === 'buyCart') {
        // 购物车页面直接购买创建订单
        let httpObj = {
          addressId: options.addressId,
          receiveId: options.receiveId,
          envelopesReceiveId:options.envelopesReceiveId,
          cartId: options.cartId.split(',').map(Number)
        }
        this.pageType = 'buyCart'
        this.createOrder('buyCart', httpObj)
      } else if (options.payType === 'buyOrder') {
        // 订单页面进入
        this.orderToPay = true
        this.orderToPayMethod.out_trade_no = options.orderId
        this.orderToPayMethod.price = options.price
      } else if (options.payType === 'seckill') {
        // 商品详情页直接购买创建订单
        this.methodGoodsInfo = this.$store.state.toPayHttpObj
        this.pageType = 'seckill'
        this.createOrder('seckill', this.methodGoodsInfo)
      }else if (options.payType === 'groupBuying') {
        // 商品详情页直接购买创建订单
        this.methodGoodsInfo = this.$store.state.toPayHttpObj
        console.log(this.methodGoodsInfo)
        this.pageType = 'groupBuying'
        this.createOrder('groupBuying', this.methodGoodsInfo)
      }
      // 异步延迟加载
      setTimeout(() => {
        this.loadingStatus = false
      }, 300)
      this.getProvider()
    },
    // 获取当前是哪个平台
    getProvider () {
      let that = this
      uni.getProvider({
        service: 'oauth',
        success: function(res) {
          if (res.provider.length == 1) {
            // 如果是微信小程序
            that.providerValue = 'weChat'
          } else {
            that.providerValue = 'APP'
          }
        }
      })
    },

    // 创建订单
    async createOrder (type, orderInfo) {
      this.distributionUserCenterInfo = uni.getStorageSync('distributionUserCenterInfo')
      if (this.distributionUserCenterInfo.isDistribute && type === 'buyNow') {
        console.log('推广员下单')
        // 如果是推广员，走生成分销订单接口
        await this.$R.post(createOrderByDistributionUrl, orderInfo)
          .then(res => {
            this.createOrderInfo = res.data
            // 如果后台返回购买的商品是非推广的商品，继续走原来的下单
            if (res.code === 44001) {
              console.log('正常下单')
              if (type === 'buyNow') {
                this.$R.post(createOrderUrl, orderInfo)
                  .then(res => {
                    this.createOrderInfo = res.data
                  })
              } else if (type === 'buyCart') {
                this.$R.post(createOrderByCartUrl, orderInfo)
                  .then(res => {
                    this.createOrderInfo = res.data
                  })
              }
            else if (type === 'seckill') {
                this.$R.post(createOrderBySeckillUrl, orderInfo)
                  .then(res => {
                    this.createOrderInfo = res.data
                  })
              }
              else if (type === 'groupBuying') {
                if(orderInfo.sku && orderInfo.sku[0]){
                  if(!orderInfo.sku[0].uuid){
                    this.$set(orderInfo.sku[0],'uuid','')
                  }
                }
                this.$R.post(createOrderByGroupBuyingUrl, orderInfo)
                  .then(res => {
                    this.createOrderInfo = res.data
                  })
              }
            }
          })
      }
      else {
        // 否则走正常下单接口
        console.log('正常下单')
        if (type === 'buyNow') {
          await this.$R.post(createOrderUrl, orderInfo)
            .then(res => {
              this.createOrderInfo = res.data
            })
        } else if (type === 'buyCart') {
          await this.$R.post(createOrderByCartUrl, orderInfo)
            .then(res => {
              this.createOrderInfo = res.data
            })
        }
      else if (type === 'seckill') {
          await this.$R.post(createOrderBySeckillUrl, orderInfo)
            .then(res => {
              this.createOrderInfo = res.data
            })
        } else if (type === 'groupBuying') {
          console.log(orderInfo)
          if(orderInfo.sku && orderInfo.sku[0]){
            if(!orderInfo.sku[0].uuid){
              this.$set(orderInfo.sku[0],'uuid','')
            }
          }
          await this.$R.post(createOrderByGroupBuyingUrl, orderInfo)
            .then(res => {
              this.createOrderInfo = res.data
            })
        }
      }
    },
    // 选择支付方式
    payDefault (index, item) {
      this.payMethodList.forEach(item => {
        item.checked = false
      })
      this.payMethodId = this.payMethodList[index].id
      this.payMethodList[index].checked = true
    },
    navBack () {
      uni.navigateBack({
        delta: 1
      })
    },
    // 预下单
    async beforePay () {
      let httpObj = {}
      // #ifdef MP-WEIXIN
      if (this.orderToPay) {
        httpObj = {
          // 类型：JSAPI—JSAPI支付（或小程序支付）
          trade_type: 'JSAPI',
          // 咱们自己商城的订单号
          out_trade_no: this.orderToPayMethod.out_trade_no,
          // 用户的openid
          openid: uni.getStorageSync('weChatOpenId'),
        }
      } else {
        httpObj = {
          // 类型：JSAPI—JSAPI支付（或小程序支付）
          trade_type: 'JSAPI',
          // 咱们自己商城的订单号
          out_trade_no: this.createOrderInfo.no,
          // 用户的openid
          openid: uni.getStorageSync('weChatOpenId'),
        }
      }
      await this.$R.post(weChatPayUrl, httpObj)
        .then(res => {
          this.beforePayResult = res.data
          this.pay()
        })
      // #endif

      // #ifdef APP-PLUS
      // APP支付
      if (this.orderToPay) {
        httpObj = {
          // 类型：JSAPI—JSAPI支付（或小程序支付）
          trade_type: 'APP',
          // 咱们自己商城的订单号
          out_trade_no: this.orderToPayMethod.out_trade_no,
        }
      } else {
        httpObj = {
          trade_type: 'APP',
          // 咱们自己商城的订单号
          out_trade_no: this.createOrderInfo.no,
        }
      }
      console.log(httpObj)
      await this.$R.post(weChatPayUrl, httpObj)
        .then(res => {
          console.log(res)
          this.beforePayResult = res.data
          this.pay()
        })
      // #endif
    },
    // 支付
    pay () {
      let that = this
      if (this.payMethodId === 1) {
        console.log(this.providerValue)
        console.log(this.beforePayResult)
        // #ifdef MP-WEIXIN

        // 微信支付——微信 小程序支付
        uni.requestPayment({
          // 支付方式，微信支付
          provider: 'wxpay',
          // 时间戳
          timeStamp: this.beforePayResult.timeStamp,
          // 随机字符串
          nonceStr: this.beforePayResult.nonceStr,
          // 数据包
          package: this.beforePayResult.package,
          // 签名算法
          signType: this.beforePayResult.signType,
          // 签名
          paySign: this.beforePayResult.paySign,
          success: (res) => {
            uni.showToast({
              title: '支付成功，2秒后将自动返回上一页',
              'icon': 'none'
            })
            this.closePage()
          },
          fail: (err) => {
            uni.showToast({
              title: '支付失败',
              'icon': 'none'
            })
          }
        })
        // #endif

        // #ifdef APP-PLUS
        // 微信支付——APP支付
        console.log(this.beforePayResult)
        // APP内微信支付
        uni.requestPayment({
          // 支付方式，微信支付
          provider: 'wxpay',
          // 微信、支付宝订单数据
          orderInfo: this.beforePayResult,
          success: (res) => {
            uni.showToast({
              title: '支付成功，2秒后将自动返回上一页',
              'icon': 'none'
            })
            this.closePage()
          },
          fail: (err) => {
            uni.showToast({
              title: 'APP端微信支付失败',
              'icon': 'none'
            })
          }
        })
        // #endif
      } else if (this.payMethodId === 2) {
        if (this.providerValue === 'weChat') {
          return uni.showToast({
            title: '微信小程序不支持支付宝支付',
            'icon': 'none'
          })
        }
        // TODO 因为暂时没有支付宝支付，所以先返回
        uni.showToast({
          title: '支付宝支付开发中',
          'icon': 'none'
        })
      } else {
        // 余额支付
        uni.showToast({
          title: '余额不足',
          'icon': 'none'
        })
      }
    },
    closePage () {
      switch (this.pageType) {
        case 'buyNow':
        case 'buyCart':
        case 'seckill':
          setTimeout(() => {
            uni.navigateBack({
              delta: 2
            })
          }, 3000)
          break
        case 'buyOrder':
          setTimeout(() => {
            uni.navigateBack({
              delta: 2
            })
          }, 3000)
          break
      }
    }
  }
}
</script>

<style lang="scss">
  .pay-mode {
    width: 600rpx;
    margin: 180rpx 75rpx 0 75rpx;

    .choice {
      width: 40rpx;
      height: 40rpx;
    }
  }
</style>
