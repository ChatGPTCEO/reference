<template>
  <view class="product-list-long">
    <view class="w-100 bg-white rounded mb-1 row-ac" style="height: 280rpx;" v-for="(item,index) in list" :key="index"
          @click="toProduct(item.id,type,item)">
      <image v-if="item.slide_list && item.slide_list.img" :src="item.slide_list.img" mode=""
             class="goods-img rounded ml-1"></image>
      <image v-else-if="item.img && item.img.img" :src="item.img.img" mode="" class="goods-img rounded ml-1"></image>
      <view class="ml-2 flex-1 mr-2">
        <view class="font-w font-s-5 in2line d-f align-stretch" style="height: 82rpx;">{{ item.title }}</view>
        <view class="font-s-4 text-light-grey">{{ item.promotion }}</view>
        <view class="row-ac-sb mt-5">
          <view>
            <view class="text-main-color font-s-6">
              <text class="font-s-4">￥</text>
              {{ item.price }}
            </view>
            <view></view>
          </view>
          <view v-if="type==='group'" class="buy-now bg-color row font-s-3 ">立即拼</view>
          <view v-else class="buy-now bg-color row font-s-3 ">立即购买</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'productList',
  data () {
    return {}
  },
  props: {
    item: Object,
    list: {
      type: Array,
      default () {
        return []
      }
    },
    // 哪个页面用的横向组件 拼团列表：group
    type: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    toProduct (productId, type,item) {
			console.log(item)
			switch (type) {
        case 'group':
					uni.navigateTo({
						url: `/pages/product/product?pageStatus=groupBuying&activityId=${item.id}`,
					});
          break
        default:
          uni.navigateTo({
            url: '/pages/product/product?productId=' + productId,
          });
          break
      }

    }
  }
}
</script>

<style lang="scss">
  .product-list-long {
    width: 722rpx;
    margin: 0 14rpx;

    .goods-img {
      width: 260rpx;
      height: 260rpx;
    }

    .buy-now {
      width: 120rpx;
      height: 50rpx;
      border-radius: 25rpx;
    }
  }
</style>
