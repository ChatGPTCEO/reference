<template>
    <view>
        <!-- 加载动画 -->
        <orange-fullloading
                text="加载中"
                :loadshow="loadingStatus">
        </orange-fullloading>
        <view class="fixed-top bg-white w-100 row-ac" style="height: 80rpx;">
            <view class="flex-1 row-a-j-fc" v-for="(item,index) in orderState" :key="index" @click="clickOrder(index)"
                  :class="{active: orderIndex == index}">
                <view>{{ item.ordername }}</view>
                <view class="order-underline  mt-1 "></view>
            </view>
        </view>
        <view style="width: 100%;height: 90rpx;"></view>
        <view>
            <view class="mt-1 bg-white  mb-2" v-for="(item,index) in orderList" :key="item.id">
                <view class="row-ac-sb">
                    <view class="font-s-3 p-2">订单号:
                        <text class="text-muted ml-1">{{ item.no }}</text>
                    </view>
                    <view class="order-status">
                        <view v-if="item.statusCode === 'paid'" class="row bg-color mr-2 rounded font-s-4"
                              style="width: 100rpx;height: 50rpx;">未付款
                        </view>
                        <view v-else-if="item.statusCode === 'delivery'"
                              class="row bg-success text-white mr-2 rounded font-s-4"
                              style="width: 100rpx;height: 50rpx;">待发货
                        </view>
                        <view v-else-if="item.statusCode === 'delivered'"
                              class="row bg-success text-white mr-2 rounded font-s-4"
                              style="width: 100rpx;height: 50rpx;">已发货
                        </view>
                        <view v-else-if="item.statusCode === 'received'"
                              class="row bg-success text-white mr-2 rounded font-s-4"
                              style="width: 100rpx;height: 50rpx;">已收货
                        </view>
                    </view>
                </view>
                <view class="d-f ml-2 shop-list" v-for="(productItem,index) in item.product"
                      @tap="toGoods(productItem.productId)" :key="productItem.productId">
                    <image :src="productItem.productImg" mode="" style="width: 150rpx;height: 150rpx;"
                           class="rounded"></image>
                    <view class="ml-2 flex-1 ">
                        <view class="font-s-4 in2line">{{ productItem.productName }}</view>
                        <view class="font-s-3 text-muted" v-if="productItem.skuArr.length>0">已选：{{productItem.skuArr}}
                        </view>
                    </view>
                    <view>
                        <view class="mr-2 font-s-5 font-w">
                            <text class="font-s-3">￥</text>
                            {{ (productItem.price * productItem.amount).toFixed(2) }}
                        </view>
                        <view class="font-s-4 text-muted">*{{ productItem.amount }}</view>
                    </view>
                    <view class="list-border row text-main-color" v-if="item.statusCode === 'received'&& !productItem.isReviewed"
                          @tap.stop="toEvaluate(item,productItem)">评价商品
                    </view>
                </view>
                <view class="d-f justify-end mt-4 font-s-3 pb-3 mr-2">
                    <view class="list-border row" @tap="toOrderDetail(item)">订单详情</view>
                    <view class="list-border row" v-if="item.statusCode === 'received' || item.statusCode === 'paid'"
                          @tap="deleteOrder(index,item)">删除订单
                    </view>
                    <view class="list-border row" v-if="item.statusCode === 'delivered'"
                          @tap="receivingOrder(index,item)">确认收货
                    </view>
                    <view class="list-border row text-main-color" v-if="item.statusCode === 'paid'"
                          @click="toPay(item)">立即付款
                    </view>
                </view>
            </view>
        </view>
        <!--<view class="no-goods-img" v-else>
          <image src="/static/img/no_goods.png"></image>
        </view>-->
    </view>
</template>

<script>
import {searchOrderListUrl, deleteOrderByIdUrl, receivingOrderUrl, receivingOrderByDistributionUrl} from '@/api/index'

export default {
  data() {
    return {
      orderIndex: 0,
      orderState: this.$Management.orderState,
      // 订单列表
      orderList: [],
      // 查询条件
      queryInfo: {
        pageIndex: 10,
        page: 1,
        // 全部订单则不传 1=待付款 2=待发货 3=待收货 4=待评价
        status: ''
      },
      loadingStatus: true
    }
  },
  onLoad(options) {
    this.initData(options)
  },
  // 上划加载
  onReachBottom() {
    this.onReachBottomHandle()
  },
  methods: {
    async initData(options) {
      this.orderIndex = options.orderTypeId
      if (options.orderTypeId !== 0) {
        this.queryInfo.status = options.orderTypeId
      }
      await this.getOrderList()
      // 异步延迟加载
      setTimeout(() => {
        this.loadingStatus = false
      }, 100)
    },
    clickOrder(index) {
      if (this.orderIndex !== index) {
        this.orderList = []
        this.orderIndex = index
        this.queryInfo.page = 1
        switch (this.orderIndex) {
          case 0:
            this.queryInfo.status = ''
            this.getOrderList()
            break
          case 1:
            this.queryInfo.status = 1
            this.getOrderList()
            break
          case 2:
            this.queryInfo.status = 2
            this.getOrderList()
            break
          case 3:
            this.queryInfo.status = 3
            this.getOrderList()
            break
          case 4:
            this.queryInfo.status = 4
            this.getOrderList()
            break
        }
      }
    },
    // 获取订单列表
    async getOrderList() {
      if (this.queryInfo.page > 1) {
        await this.$R.get(searchOrderListUrl, this.queryInfo).then(res => {
          if (res.data.list.length === 0) {
            return uni.showToast({
              title: '别划了，我已经到底线了',
              icon: 'none',
              duration: 3000
            })
          }
          let oldOrderList = this.orderList
          this.orderList = res.data.list
          // 把sku列表对象转化为数组
          this.orderList.forEach(item => {
            item.product.forEach(childItem => {
              childItem.skuArr = []
              for (let j in childItem.productSkuNames) {
                childItem.skuArr.push(childItem.productSkuNames[j])
              }
              childItem.skuArr = childItem.skuArr.join('，')
            })
          })
          this.orderList = [...oldOrderList, ...this.orderList]
        })
      } else {
        await this.$R.get(searchOrderListUrl, this.queryInfo).then(res => {
          console.log(res)
          this.orderList = res.data.list
          // 把sku列表对象转化为数组
          this.orderList.forEach(item => {
            item.product.forEach(childItem => {
              childItem.skuArr = []
              for (let j in childItem.productSkuNames) {
                childItem.skuArr.push(childItem.productSkuNames[j])
              }
              childItem.skuArr = childItem.skuArr.join('，')
            })
          })
        })
      }

    },
    toPay(item) {
      uni.navigateTo({
        url: `/pages/order/pay/pay?payType=buyOrder&price=${item.totalAmount}&orderId=${item.no}`
      })
    },
    toEvaluate(item,productInfo){
      console.log(item);
      console.log(productInfo);
      uni.navigateTo({
        url: `/pages/product/add-evaluate?orderId=${item.id}&productId=${productInfo.productId}&skuId=${productInfo.productSkuId}&skuName=${productInfo.skuArr}&productName=${productInfo.productName}`
      })
    },
    // 跳转到商品详情页
    toGoods(id) {
      uni.navigateTo({
        url: '/pages/product/product?productId=' + id,
      })
    },
    // 触底事件
    onReachBottomHandle() {
      this.queryInfo.page++
      this.getOrderList()
    },
    // 删除订单
    deleteOrder(index, orderInfo) {
      let that = this
      uni.showModal({
        title: '提示',
        content: '确定要删除该订单吗？',
        success: function (res) {
          console.log(res)
          if (res.confirm) {
            that.$R.delete(deleteOrderByIdUrl + orderInfo.id).then(res => {
              console.log(res)
              uni.showToast({
                title: '删除成功！',
                icon: 'none'
              })
              that.orderList.splice(index, 1)
            });
          } else if (res.cancel) {

          }
        }
      });

    },
    toOrderDetail(orderInfo) {
      uni.navigateTo({
        url: `/pages/order/detail?orderId=${orderInfo.id}&orderNo=${orderInfo.no}`
      })
    },
    // 确认收货
    receivingOrder(index, orderInfo) {
      let that = this
      uni.showModal({
        title: '提示',
        content: '确认您已经收到宝贝？',
        success: function (res) {
          console.log(res)
          if (res.confirm) {
            if (orderInfo.type == 'distribute') {
              console.log('分销订单确认收货')
              // 推广的订单进行收货确认
              that.$R.put(receivingOrderByDistributionUrl + orderInfo.id).then(result => {
                console.log(result)
                uni.showToast({
                  title: '收货成功，请尽快给予宝贝评价哦！',
                  icon: 'none'
                })
              });
            } else {
              console.log('正常订单确认收货')
              // 正常的订单进行收货确认
              that.$R.put(receivingOrderUrl + orderInfo.id).then(result => {
                console.log(result)
                uni.showToast({
                  title: '收货成功，请尽快给予宝贝评价哦！',
                  icon: 'none'
                })

              });
            }
          } else if (res.cancel) {

          }
        },
        complete: function () {
          that.getOrderList()
        }
      });
    }
  }
}
</script>

<style lang="scss">

    // #ifdef H5
    .fixed-top {
        top: 100rpx
    }

    // #endif
    page {
        background-color: $uni-bg-color-grey;
    }

    .order-underline {
        width: 80rpx;
        height: 6rpx;
    }

    .active .order-underline {
        background-color: $bg-main-color;
    }

    .shop-list {
        margin-bottom: 20rpx;
    }

    .shop-list:last-child {
        margin-bottom: 0;
    }

    .list-border {
        width: 130rpx;
        height: 42rpx;
        border-radius: 21rpx;
        border: 1rpx solid;
        margin-right: 15rpx;
    }
</style>
