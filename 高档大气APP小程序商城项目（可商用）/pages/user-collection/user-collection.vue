<template>
    <view>
        <!-- 浏览历史 -->
        <view v-if="pageStatus == 'history'">
            <view @click="clearHistory">清除浏览历史</view>
            <index-product-list :list="myHistoryList"></index-product-list>
        </view>

        <!-- 关注品牌 -->
        <template v-else-if="pageStatus == 'brand'">
            <view class="brand-list">
                <view class="brand-box" v-for="item in collectBrandList" :key="item.id">
                    <view class="brand-info clearfix">
                        <image class="brand-img fl" :src="item.square_log"></image>
                        <view class="brand-title fl">{{ item.brand_name }}</view>
                        <view class="brand-option fr">
                            <view class="more-option bg-color font-s-3" @click="toBrandGoods(item)">更多</view>
                        </view>
                    </view>
                    <scroll-view scroll-x>
                        <view class="brand-goods-list">
                            <view class="goods-item" v-for="goodsItem in item.product_list" :key="goodsItem.id">
                                <image class="goods-img" :src="goodsItem.slide_list.img"></image>
                                <view class="goods-title">{{ goodsItem.title }}</view>
                                <view class="goods-price text-main-color">{{ goodsItem.price }}</view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
            <!-- <view v-for="(item,index) in collectBrandList" :key="item.id">
                <view>品牌名{{item.brand_name}}</view>
                <view>英文名{{item.es}}</view>
                <view>介绍{{item.introduce}}</view>
                <view>封面
                    <image style="width: 100rpx;height: 100rpx" :src="item.cover"></image>
                </view>
                <view>长logo
                    <image style="width: 100rpx;height: 100rpx" :src="item.long_log"></image>
                </view>
                <view>圆logo
                    <image style="width: 100rpx;height: 100rpx" :src="item.square_log"></image>
                </view>
                <view>
                    <view>品牌商品</view>
                    <index-product-list :list="item.product_list"></index-product-list>

                </view>
            </view> -->
        </template>

        <!-- 收藏商品 -->
        <template v-else-if="pageStatus == 'collect'">
            <index-product-list :list="collectGoodsList"></index-product-list>
        </template>
    </view>
</template>

<script>
import {getUserHistoryUrl, clearUserHistoryUrl, getCollectGoodsListUrl, getCollectBrandListUrl} from '@/api/index';
import indexProductList from '@/components/common/product-list/index-product-list';

export default {
  components: {
    indexProductList
  },
  data() {
    return {
      pageStatus: 'history',
      queryInfo: {
        page: 1,
        size: 10
      },
      total: 0,
      myHistoryList: [],
      collectGoodsList: [],
      collectBrandList: []
    };
  },
  onLoad(option) {
    this.initData(option);
  },
  // 上划加载
  onReachBottom() {
    this.onReachBottomHandle();
  },

  methods: {
    initData(option) {
      this.getPageInfo(option);
    },
    onReachBottomHandle() {
      switch (this.pageStatus) {
        case 'history':
          if (this.total != this.myHistoryList.length) {
            this.queryInfo.page++;
            this.getMyHistoryList();
          }
          break;
        case 'collect':
          if (this.total != this.collectGoodsList.length) {
            this.queryInfo.page++;
            this.getCollectGoodsList();
          }
          break;
        case 'brand':
          if (this.total != this.collectBrandList.length) {
            this.queryInfo.page++;
            this.getCollectBrandList();
          }
          break;
      }
    },
    // 获取页面信息
    getPageInfo(option) {
      switch (option.pageType) {
        case 'history':
          this.pageStatus = 'history';
          uni.setNavigationBarTitle({
            title: '浏览历史'
          });
          this.getMyHistoryList();
          break;
        case 'collect':
          uni.setNavigationBarTitle({
            title: '我的收藏'
          });
          this.pageStatus = 'collect';
          this.getCollectGoodsList();
          break;
        case 'brand':
          uni.setNavigationBarTitle({
            title: '我的关注'
          });
          this.pageStatus = 'brand';
          this.getCollectBrandList();
          break;
      }
    },
    // 清除浏览历史
    clearHistory() {
      let that = this;
      uni.showModal({
        title: '提示',
        content: '确定要清除浏览吗？',
        success: function (res) {
          if (res.confirm) {
            that.$R.get(clearUserHistoryUrl).then(res => {
              console.log(res);
              uni.showToast({
                icon: 'none',
                title: '清除成功'
              });
              that.myHistoryList = [];
            });
          }
        }
      });
    },
    // 获取浏览记录列表
    getMyHistoryList() {
      this.$R.get(getUserHistoryUrl, this.queryInfo).then(res => {
        this.myHistoryList = [...this.myHistoryList, ...res.data.list];
      });
    },
    // 获取我的收藏列表
    getCollectGoodsList() {
      this.$R.get(getCollectGoodsListUrl, this.queryInfo).then(res => {
        this.collectGoodsList = [...this.collectGoodsList, ...res.data.list];
      });
    },
    // 获取我关注的品牌
    getCollectBrandList() {
      this.$R.get(getCollectBrandListUrl, this.queryInfo).then(res => {
        console.log(res);
        this.collectBrandList = [...this.collectBrandList, ...res.data.list];
      });
    },
    toBrandGoods(brandInfo){
      console.log(brandInfo);

      let newBrandInfo = {
        brandName:brandInfo.brand_name,
        cover:brandInfo.cover,
        es:brandInfo.es,
        id:brandInfo.id,
        introduce:brandInfo.introduce,
        longLog:brandInfo.long_log,
        squareLog:brandInfo.square_log,
      }
      newBrandInfo = JSON.parse(JSON.stringify(newBrandInfo))
      uni.navigateTo({
        url: `/pages/brand/brand-goods?brandId=${brandInfo.id}`,
      })
    },
  }
};
</script>

<style lang="scss">
    page {
        background-color: #f5f5f5;
    }

    .brand-list {
        margin: 10rpx 20rpx;

        .brand-box {
            border-radius: 10rpx;
            background-color: #ffffff;
            padding: 20rpx;
            margin-bottom: 20rpx;

            .brand-info {
                .brand-img {
                    width: 40rpx;
                    height: 40rpx;
                    display: block;
                    padding: 10rpx;
                    border: 1rpx solid #dddddd;
                    border-radius: 50%;
                    background-color: #ffffff;
                }

                .brand-title {
                    margin-left: 20rpx;
                    height: 62rpx;
                    line-height: 62rpx;
                    font-size: 32rpx;
                    color: #333333;
                }

                .brand-option {
                    .more-option {
                        height: 50rpx;
                        line-height: 50rpx;
                        width: 100rpx;
                        text-align: center;
                        border-radius: 25rpx;
                    }
                }
            }

            .brand-goods-list {
                display: flex;
                justify-content: start;
                margin-top: 20rpx;
                height: 348rpx;

                .goods-item {
                    margin-right: 24rpx;

                    .goods-img {
                        display: block;
                        width: 198rpx;
                        height: 198rpx;
                        padding: 10rpx;
                        border: 1px solid #dddddd;
                        border-radius: 10rpx;
                        background-color: #ffffff;
                    }

                    .goods-title {
                        font-size: 28rpx;
                        width: 220rpx;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-break: break-all;
                        color: #333333;
                        height: 50rpx;
                        line-height: 50rpx;
                        margin: 10rpx 0;
                    }

                    .goods-price {
                        font-size: 26rpx;
                        width: 220rpx;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
