<template>
  <view>
    <!-- 加载动画 -->
    <orange-fullloading
      text="加载中"
      :loadshow="loadingStatus">
    </orange-fullloading>
    <view class="choices w-100 row-ac bg-white fixed-top">
      <view class="flex-1 p-2 row" @click="comprehensiveClick" :class="{ active: choiceIndex == -1 }">
        <text class="choice-name row">综合</text>
      </view>
      <view class="flex-1 p-2 row" v-for="(item, index) in choicelist" :key="index"
            @click="clickChoice(item,index)"
            :class="{ active: choiceIndex == index }">
        <text class="choice-name row">{{ item.choicename }}</text>
        <text class="triangle-up" v-show="!item.searchStatus"></text>
        <text class="triangle-down" v-show="item.searchStatus"></text>
      </view>
      <view class="flex-1 p-2 row">
        <text class="choice-name row">筛选</text>
      </view>
    </view>
    <view class="product-list">
      <product-list :list="hotGoodsList" v-if="tapProductlist == true"></product-list>
      <product-list-long :list="hotGoodsList" v-else></product-list-long>
    </view>
  </view>
</template>

<script>
import productList from '@/components/common/product-list'
import productListLong from '@/components/common/product-list/product-list-long.vue'
import { getCategoryList } from '@/api/index'

export default {
  components: {
    productList,
    productListLong
  },
  // 上划加载
  onReachBottom() {
    this.onReachBottomHandle();
  },
  data () {
    return {
      tapProductlist: true,
      choiceIndex: -1,
      choicelist: [
        { choicename: '销量', searchStatus: false },
        { choicename: '价格', searchStatus: false },
      ],
      hotGoodsList: [],
      hotGoodsTotal:0,
      getCategoryQueryInfo: {
        categoryId: '',
        pageSize: 10,
        page: 1,
        // 搜索条件 soldCount=销量排序 price=价格排序
        field: '',
        // 排序顺序 desc=升序 asc=降序
        desc: ''
      },
      loadingStatus: true
    }
  },
  onLoad (options) {
    console.log(options)
    this.initData(options)
  },
  methods: {
    async initData (options) {
      switch (options.type) {
        case 'category':
          // 如果类型是分类，那么调用获取分类接口的方法
          this.getCategoryQueryInfo.categoryId = options.id
         await this.getCategoryGoodsList()
          break
        default:
          // 如果是其他，调用获取热门商品的方法
          await  this.getHotGoodsList()
          break
      }
      // 异步延迟加载
      setTimeout(() => {
        this.loadingStatus = false
      }, 100)
    },
    onReachBottomHandle() {
      // 触底事件
      if (this.hotGoodsTotal != this.hotGoodsList.length) {
        this.getCategoryQueryInfo.page++;
        this.getCategoryGoodsList();
      }
    },
    //监听搜索框事件
    onNavigationBarSearchInputClicked (e) {
      uni.navigateTo({
        url: '/pages/index/search/search'
      })
    },
    //监听右上角商品列表排列方式事件
    onNavigationBarButtonTap (e) {
      uni.showToast({
        title: '切换排列方式',
        icon: 'none'
      })
      this.tapProductlist = !this.tapProductlist
    },
    // 综合点击事件
    comprehensiveClick () {
      // 重置查询条件
      this.hotGoodsList = []
      this.getCategoryQueryInfo.pageSize = 10
      this.getCategoryQueryInfo.page = 1
      this.getCategoryQueryInfo.field = ''
      this.getCategoryQueryInfo.desc = ''
      this.choiceIndex = -1
      this.getCategoryGoodsList()
    },
    // 顶部销量、价格点击事件
    clickChoice (searchItem, index) {
      console.log(searchItem)
      if (this.choiceIndex != index) {
        this.choiceIndex = index
        this.changeQueryObj(searchItem.choicename, searchItem.searchStatus)
        this.getCategoryGoodsList()
      } else {
        searchItem.searchStatus = !searchItem.searchStatus
        this.changeQueryObj(searchItem.choicename, searchItem.searchStatus)
        this.getCategoryGoodsList()
      }
    },
    // 获取分类商品
    getCategoryGoodsList () {
      this.$R.get(getCategoryList, this.getCategoryQueryInfo).then(res => {
        console.log(res)
        this.hotGoodsList = [...this.hotGoodsList,...res.data.list]
        this.hotGoodsTotal = res.data.total
        console.log(this.hotGoodsTotal)
      })
    },
    // 组织查询条件参数
    changeQueryObj (queryName, searchStatus) {
      if (queryName === '销量' && !searchStatus) {
        this.hotGoodsList = []
        this.getCategoryQueryInfo.pageSize = 10
        this.getCategoryQueryInfo.page = 1
        this.getCategoryQueryInfo.field = 'soldCount'
        this.getCategoryQueryInfo.desc = 'desc'
      } else if (queryName === '销量' && searchStatus) {
        this.hotGoodsList = []
        this.getCategoryQueryInfo.pageSize = 10
        this.getCategoryQueryInfo.page = 1
        this.getCategoryQueryInfo.field = 'soldCount'
        this.getCategoryQueryInfo.desc = 'asc'
      } else if (queryName === '价格' && !searchStatus) {
        this.hotGoodsList = []
        this.getCategoryQueryInfo.pageSize = 10
        this.getCategoryQueryInfo.page = 1
        this.getCategoryQueryInfo.field = 'price'
        this.getCategoryQueryInfo.desc = 'desc'
      } else {
        this.hotGoodsList = []
        this.getCategoryQueryInfo.pageSize = 10
        this.getCategoryQueryInfo.page = 1
        this.getCategoryQueryInfo.field = 'price'
        this.getCategoryQueryInfo.desc = 'asc'
      }
    }
  }
}
</script>

<style lang="scss">

  .triangle-up {
    visibility: hidden;
  }

  .triangle-down {
    visibility: hidden;
  }

  .choices {
    .choice-name {
      width: 90rpx;
      height: 38rpx;
      border-radius: 19rpx;
    }

    .active .choice-name {
      color: $bg-main-color;

    }

    .active {
      .triangle-up {
        visibility: visible;
      }

      .triangle-down {
        visibility: visible;
      }
    }

  }

  .product-list {
    margin-top: 100rpx;
  }


</style>
