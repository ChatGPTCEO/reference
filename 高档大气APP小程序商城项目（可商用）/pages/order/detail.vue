<template>
  <view class="">

    <view class="logistics-pop" v-if="logisticsPopStatus" @click="logisticsPopStatus = false">
      <view class="logistics-pop-center" @click.stop="">
        <scroll-view scroll-y>
          <view class="logistics-list">
            <view class="logistics-item" v-for="(item,index) in orderLogisticsInfo.list" :key="index">
              <view class="logistics-time">{{item.time}}</view>
              <view class="circle"></view>
              <view class="logistics-status">{{item.status}}</view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="detail-header w-100 d-f justify-center bg-color font-s-b">
      <view class="order-state">
        <text class="mr-1 font-w">√</text>
        <text v-if="orderDetail.statusCode === 'cancel'">已取消</text>
        <text v-if="orderDetail.statusCode === 'paid'">待付款</text>
        <text v-if="orderDetail.statusCode === 'delivery'">待发货</text>
        <text v-if="orderDetail.statusCode === 'delivered'">已发货</text>
        <text v-if="orderDetail.statusCode === 'received'">已收货</text>
      </view>
    </view>
    <view class="order-logistics bg-white rounded pt-2">
      <view class="row-ac ml-2" v-if="orderLogisticsInfo.list.length>0" @click="logisticsPopStatus = true">
        <view class="iconfont icon-daifahuo row logistics-icon rounded-50 bg-primary font-s-7"></view>
        <view class="font-s-4 flex-1 ml-1">
          <view class="in1line">{{nowLogisticsInfo.status}}</view>
          <view class="text-light-muted mt-1">{{nowLogisticsInfo.time}}</view>
        </view>
        <view class="iconfont icon-xiangxia mr-2 ml-3"></view>
      </view>
      <view class="row-ac ml-2" v-else>
        <view class="iconfont icon-daifahuo row logistics-icon rounded-50 bg-primary font-s-7"></view>
        <view class="font-s-4 flex-1 ml-1">
          | 暂无订单物流信息 |
        </view>
        <view class="iconfont icon-xiangxia mr-2 ml-3"></view>
      </view>
      <view class="row-ac ml-2 pb-2 mt-2">
        <view class="iconfont icon-daifahuo row logistics-icon rounded-50 bg-warning font-s-7"></view>
        <view class="font-s-4  flex-1 ml-1">
          <view class="">{{orderDetail.contactName}}
            <text class="ml-2 font-s-3 text-light-muted">{{orderDetail.contactPhone}}</text>
          </view>
          <view class=" mt-1">
            {{orderDetail.province}}{{orderDetail.city}}{{orderDetail.district}}{{orderDetail.address}}
          </view>
        </view>
      </view>
    </view>
    <view class="mt-2 bg-white ml-2 mr-2 rounded">
      <view class="row-ac pt-4" v-for="(item,index) in orderDetail.items" :key="index">
        <image :src="item.product_img" mode="" style="width: 120rpx;height: 120rpx;" class="rounded ml-2"></image>
        <view class="ml-2 flex-1">
          <view class="font-s-3">{{item.product_name}}</view>
          <view class="text-light-muted font-s-2">规格：{{item.sku}}</view>
        </view>
        <view class="mr-2 d-f flex-column align-end">
          <view class="font-s-5">
            <text class="font-s-1">￥</text>
            {{item.price}}
          </view>
          <view class="font-s-5 text-light-muted">
            <text class="font-s-2">X</text>
            {{item.amount}}
          </view>
        </view>
      </view>

      <view class="flex-1 d-f flex-column align-end mr-2 border-bottom pb-2">
        <view class="font-s-4">
          实付
          <text class="text-main-color">￥{{orderDetail.realTotalAmount}}</text>
          包邮
        </view>
        <!--<view class="text-light-muted font-s-2">使用优惠券2.88元;会员省0.12元</view>-->
      </view>
      <view class="row-ac pt-2 pb-2 font-s-4">
        <view class="flex-1 row">
          <text class="iconfont icon-lianxikefu text-primary mr-2 font-s-5"></text>
          联系卖家
        </view>
        <view class="flex-1 row">
          <text class="iconfont icon-wodepintuan text-primary mr-2 font-s-3"></text>
          再次购买
        </view>
      </view>
    </view>
    <view class="mt-2 bg-white ml-2 mr-2 rounded text-light-muted">
      <view class="font-s-5 pt-3 pl-2 pb-1">订单号:
        <text class="font-s-4 ml-3">{{orderDetail.no}}</text>
      </view>
      <view class="font-s-5 pt-2 pl-2 pb-1">支付方式:
        <text class="font-s-4 ml-3" v-if="orderDetail.paymentMethod==='wechat'">微信</text>
        <text class="font-s-4 ml-3" v-else>支付宝</text>
      </view>
      <view class="font-s-5 pt-2 pl-2 pb-1">下单时间:
        <text class="font-s-4 ml-3">{{orderDetail.createdAt}}</text>
      </view>
      <view class="font-s-5 pt-2 pl-2 pb-1">优惠信息:
        <text class="font-s-4 ml-3">已减 {{orderDetail.couponMoney}}</text>
      </view>
      <view class="font-s-5 pt-2 pl-2 pb-1">发货时间:
        <text class="font-s-4 ml-3">{{orderDetail.deliveryAt}}</text>
      </view>
      <view class="font-s-5 pt-2 pl-2 pb-1">快递方式:
        <text class="font-s-4 ml-3">{{orderDetail.expressName}}</text>
      </view>
      <view class="font-s-5 pt-2 pl-2 pb-3">快递单号:
        <text class="font-s-4 ml-3">{{orderDetail.expressNo}}</text>
      </view>
    </view>
    <view class="guess-you-like mt-2">
      <view class="row mb-2">
        <view class="flex-1 bg-hover-light ml-2" style="height: 2rpx;"></view>
        <view class="font-s-5 ml-2 mr-2">热门推荐</view>
        <view class="flex-1 bg-hover-light mr-2" style="height: 2rpx;"></view>
      </view>
      <product-list :list="hotGoodsList"></product-list>
    </view>
  </view>
</template>

<script>
import productList from '@/components/common/product-list' //商品列表公共组件
import { getHotGoods, getOrderDetailUrl, getOrderLogisticsUrl } from '@/api/index'

export default {
  components: {
    productList,
  },
  data () {
    return {
      hotGoodsList: [],
      orderId: '',
			orderNo:'',
      orderDetail: {},
      orderLogisticsInfo:{
        list:[]
      },
			nowLogisticsInfo:{},
      logisticsPopStatus:false
    }
  },
  onLoad (options) {
    this.initData(options)
  },
  methods: {
    initData (options) {
      this.orderId = options.orderId
			this.orderNo =options.orderNo
      this.getOrderDetail(this.orderId)
      this.getOrderLogistics(this.orderNo)
      this.getHotGoodsList()
    },
    // 获取订单详情
    getOrderDetail (orderId) {
      console.log(orderId)
      this.$R.get(getOrderDetailUrl + orderId).then(res => {
        console.log(res)
        this.orderDetail = res.data
        // 重新组织sku数据
        this.orderDetail.items.forEach(item => {
          item.sku = ''
          for (let i in item.productSkuNames) {
            console.log(i)
            item.sku += item.productSkuNames[i] + '  '
          }
        })
      })
    },
		getOrderLogistics(orderNo){
			// 获取物流详情
			this.$R.get(getOrderLogisticsUrl, { orderSn: orderNo }).then(res => {
				console.log(res)
        this.orderLogisticsInfo = res.data
        console.log(this.orderLogisticsInfo)
				if(this.orderLogisticsInfo.list.length>0){
          this.nowLogisticsInfo = this.orderLogisticsInfo.list[0]
        }
			})
		},
    getHotGoodsList () {
      this.$R.get(getHotGoods)
        .then((res) => {
          this.hotGoodsList = res.data.list
        })
    }
  }
}
</script>

<style lang="scss">
  page {
    background-color: $uni-bg-color-grey;
  }
  .logistics-pop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 999999;
    .logistics-pop-center{
      position: absolute;
      left: 55rpx;
      top: 200rpx;
      width: 600rpx;
      height: 700rpx;
      background-color: #ffffff;
      border-radius: 6rpx;
      padding: 20rpx;
      .logistics-list{
        height: 700rpx;
        .logistics-item{
          display: flex;
          position: relative;
          .logistics-time{
            font-size: 24rpx;
            color: #999999;
            width: 150rpx;
            margin-right: 20rpx;
            padding: 20rpx 0;
          }
          .circle{
            position: absolute;
            width: 30rpx;
            height: 30rpx;
            border-radius: 50%;
            left: 150rpx;
            top: 20rpx;
            background-color: #dddddd;
          }
          .logistics-status{
            border-left: 1px solid #dddddd;
            font-size: 26rpx;
            color: #666666;
            width: 410rpx;
            padding: 20rpx;
          }
        }
      }
    }
  }

  .detail-header {
    height: 230rpx;
    border-radius: 0 0 50rpx 50rpx;

    .order-state {
      margin-top: 30rpx;
    }

  }

  .order-logistics {
    width: 722rpx;
    margin: -80rpx 14rpx 0 14rpx;
  }

  .logistics-icon {
    width: 90rpx;
    height: 90rpx;
  }
</style>
