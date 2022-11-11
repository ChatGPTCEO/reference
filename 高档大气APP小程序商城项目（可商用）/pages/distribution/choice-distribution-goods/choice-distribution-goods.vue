<template>
  <view>
    <!-- 加载动画 -->
    <orange-fullloading
      text="加载中"
      :loadshow="loadingStatus">
    </orange-fullloading>
    <view class="d-f">
      <!-- 左边 -->
      <view class="left-aside">
        <scroll-view class="scroll" scroll-y scroll-with-animation>
          <view class="category-list row" v-for="(item, index) in categoryList"
                :key="index" @click="leftMenuClick(item,index)" :id="'tab'+ index"
                :class="{active: tabarIndex == index}">
            <view class="underline"></view>
            <view class="category-name row font-s-5 flex-1">{{ item.cname }}</view>
          </view>
        </scroll-view>
      </view>
      <!-- 右边 -->
      <view class="right-aside">
        <view class="goods-list">
          <view class="goods-item d-f" v-for="item in distributeGoodsList" :key="item.id">
            <image :src="item.image.img" class="goods-img rounded ml-1"></image>
            <view class="goods-content">
              <view class="goods-title font-w font-s-4 in2line d-f align-stretch">{{ item.title }}</view>
              <view class="text-main-color font-s-3 price">
                <text class="font-s-4">￥</text>
                {{ item.price }}
              </view>
              <view class="text-main-color font-s-3 price">
                <text class="font-s-1">分销佣金</text>
                <text class="font-s-4">￥{{ (item.proportion*0.01*item.price).toFixed(2) }}</text>
              </view>
              <view class="add-distribute-box">
                <view class="btn bg-success font-s-3 text-white rounded" v-if="item.isChoose">已加入</view>
                <view class="btn bg-danger font-s-3 text-white rounded" v-else @click.stop="addMyShop(item)">加入小店</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCategory, getAllDistributeGoodsListUrl, addDistributeGoodsToMyShopUrl } from '@/api/index'

export default {
  data () {
    return {
      tabarIndex: 0,
      categoryList: [],
      distributeGoodsList: [],
      loadingStatus: true,
      distributeGoodsQueryInfo: {
        categoryId: '',
        pageSize: 10,
        page: 1,
        field: '',
        desc: '',
      },
      distributeGoodsTotal:'',
    }
  },
  onLoad () {
    this.initData()
  },
  // 上划加载
  onReachBottom () {
    this.onReachBottomHandle()
  },
  methods: {
    initData () {
      this.getCategoryList()
      // 异步延迟加载
      setTimeout(() => {
        this.loadingStatus = false
      })
    },
    onReachBottomHandle () {
      // 触底事件
      if(this.distributeGoodsTotal != this.distributeGoodsList.length){
        this.distributeGoodsQueryInfo.page++
        this.getAllDistributeGoodsList()
      }

    },
    // 获取分类列表
    getCategoryList () {
      this.$R.get(getCategory)
        .then((res) => {
          this.categoryList = res.data
          this.getAllDistributeGoodsList(this.categoryList[0].id)
        })
    },
    // 根据分类获取分销商品
    getAllDistributeGoodsList (categoryId) {
      if(categoryId){
        this.distributeGoodsQueryInfo.categoryId = categoryId
      }
      this.loadingStatus = true
      this.$R.get(getAllDistributeGoodsListUrl, this.distributeGoodsQueryInfo)
        .then((res) => {
          console.log(res)
          // this.distributeGoodsList = res.data.list
          this.distributeGoodsList = [...res.data.list, ...this.distributeGoodsList]
          this.distributeGoodsTotal = res.data.total
          // 异步延迟加载
          setTimeout(() => {
            this.loadingStatus = false
          })
        })
    },
    // 左侧列表点击事件
    leftMenuClick (item, index) {
      this.tabarIndex = index
      if (this.tabIndex === index) {
        return
      }
      this.distributeGoodsQueryInfo.page = 1
      this.distributeGoodsList = []
      this.getAllDistributeGoodsList(item.id)
    },
    // 加入我的小店
    addMyShop (item) {
      this.$R.post(addDistributeGoodsToMyShopUrl, { id: item.id })
        .then((res) => {
          uni.showToast({
            title: '加入我的小店成功'
          })
          item.isChoose = true
        })
    },
    // 跳转到商品详情页
    toProduct (item) {
      uni.navigateTo({
        url: '/pages/product/product?productId=' + item.productId
      })
    }
  }
}
</script>

<style lang="scss">
  page {
    height: 100%;
  }

  .left-aside {
    position: fixed;
    width: 200rpx;
    height: 100%;
    background-color: #f5f5f5;

    .scroll {
      height: 100%;
    }

    .category-list {
      width: 100%;
      height: 120rpx;

      .underline {
        width: 8rpx;
        height: 120rpx;
        border-radius: 4rpx;
        margin-right: 10rpx;
      }
    }

    .active {
      background: #FFFFFF;
    }

    .active .category-name {
      color: $bg-main-color !important;
    }

    .active .underline {
      background-color: $main-color;
    }
  }

  .right-aside {
    padding: 0 15rpx;
    background-color: #FFFFFF;
    margin-left: 200rpx;
    height: 100%;

    .goods-list {
      width: 100%;
      height: 100%;

      .goods-item {
        padding: 20rpx 0;
        border-bottom: 1rpx solid #dddddd;

        .goods-img {
          width: 158rpx;
          height: 158rpx;
        }

        .goods-content {
          width: 340rpx;
          margin-left: 20rpx;
          position: relative;

          .goods-title {
            width: 310rpx;
            height: 82rpx;
            font-size: 30rpx;
          }

          .price {
            line-height: 42rpx;
          }

          .add-distribute-box {
            position: absolute;
            right: 0;
            bottom: 0;

            .btn {
              width: 120rpx;
              text-align: center;
              height: 40rpx;
              line-height: 40rpx;
            }
          }
        }

      }
    }
  }
</style>
