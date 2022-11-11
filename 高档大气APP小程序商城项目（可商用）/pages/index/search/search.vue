<template>
  <view>
    <view class="common-search w-100 mt-1 row-ac">
      <view class=" bg-white row-ac  flex-1"
            :class="focusstate ? 'search-input-box justify-center' : 'search-input-box-two'">
        <view class="iconfont icon-sousuo ml-2"></view>
        <input type="text" value="" class="search-input p-0 border-radius" v-model="searchInfo" placeholder="请输入搜索商品"
               @click="inputClick"/>
      </view>
      <view class="search-text row bg-color" v-if="!focusstate" @click="tosearch">搜索</view>
    </view>
    <view class="ml-4 py-3 text-light-muted" v-if="searchHistoryList.length == 0">--暂无搜索结果--</view>
    <view class="search-history bg-white rounded">
      <view class="history-list p-2" v-if="searchHistoryList.length > 0">
        <view class="font-w">搜索历史</view>
        <view class="row-ac-fw mt-2">
          <view class="history-item p-1 bg-light mr-2 mb-2 rounded font-s-4 text-light-muted"
                v-for="(item,index) in searchHistoryList" :key="index" @click="searchHistoryClick(item)">
            {{item}}
          </view>
        </view>
      </view>
    </view>
    <template v-if="searchlist.length > 0">
      <!--<view class="mt-9 mx-4 row py-3">
        <view class="border-bottom flex-1"></view>
        <view class="px-3">热门推荐</view>
        <view class="border-bottom flex-1"></view>
      </view>-->
      <product-list :pageType="pageType" :list="searchlist" @selectProd="selectProd"></product-list>
    </template>
    <view class="no-goods-img" v-else>
      <image src="/static/img/no_goods.png"></image>
    </view>

    <view class="option-prod" v-if="pageType === 'relationProd'">
      <view class="btn" @click="confirmSelectProd">确认</view>
    </view>
  </view>
</template>
<script>
import productList from '@/components/common/product-list' //商品列表公共组件
import { getHotGoods, productSearchUrl } from '@/api/index'

export default {
  data () {
    return {
      focusstate: true,
      searchInfo: '',
      searchlist: [],
			justSearch:'',
      searchQueryInfo: {
        pageIndex: 10,
        page: 1,
        keyword: ''
      },
      searchHistoryList: [],
      pageType:'',
      selectProdInfo:{}
    }
  },
  onLoad (options) {
    console.log(options)
    if(options.type && options.type==='relationProd'){
      this.pageType = 'relationProd'
    }
    this.initData()
  },
	onReachBottom(){
  	this.reachBottomSearch()
	},
  components: {
    productList
  },
  methods: {
    initData () {
      this.getSearch()
      this.getHistoryList()
    },
    //暂时数据，后期有搜索内容传入再更改
    getSearch () {
      this.$R.get(getHotGoods)
        .then((res) => {
          this.searchlist = res.data.list
        })
    },
		// 获取历史搜索记录
    getHistoryList () {
      this.searchHistoryList = uni.getStorageSync('searchHistoryList')
    },
    // 清除历史搜索
    oldDelete () {
      uni.showModal({
        content: '确定清除历史搜索记录？',
        success: res => {
          if (res) {
            res.data
          }
        }
      })
    },
		// 搜索历史点击事件
		searchHistoryClick(item){
			this.searchInfo = item
			this.tosearch();
		},
    // 查询按钮点击事件
    tosearch (type) {
			this.focusstate = true
      this.searchQueryInfo.keyword = this.searchInfo
			if(type !== 'bottom'){
				this.searchQueryInfo.page = 1
			}
			if(this.searchQueryInfo.page === 1){
				this.searchlist = []
			}
			this.justSearch = this.searchInfo
			console.log(this.searchHistoryList)
			if(this.searchHistoryList == ''){
				this.searchHistoryList = []
			}
			// 向搜索历史第一条插入数据
			if(this.searchInfo.toString() != ''){
				this.searchHistoryList.unshift(this.searchInfo)
			}
			if(this.searchHistoryList.length>11){
				// 只保存10个
				this.searchHistoryList.splice(11,1)
			}
			// 去重
			this.searchHistoryList = [...new Set(this.searchHistoryList)]
			uni.setStorageSync('searchHistoryList', this.searchHistoryList);
      this.$R.get(productSearchUrl, this.searchQueryInfo)
        .then((res) => {
          console.log(res)
          this.searchlist = [...this.searchlist,...res.data.list]
        })
      this.searchInfo = ''
    },
		// 触底事件
		reachBottomSearch(){
			++this.searchQueryInfo.page
			this.searchInfo = this.justSearch
			this.tosearch('bottom')
		},
    //点击搜索显示搜索按纽
		inputClick () {
      this.focusstate = false
    },
    // 选择的商品信息
    selectProd(prodInfo){
      console.log(prodInfo)
      this.selectProdInfo = prodInfo
    },
    // 确定商品信息
    confirmSelectProd(){
      this.$store.commit('setUserSelectProdItem',this.selectProdInfo)
      // 关闭当前页面，返回上一页
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>
<style lang="scss">
  page {
    background-color: $uni-bg-color-grey;
  }

  .common-search {
    width: 710rpx;
    height: 70rpx;
    margin: 15rpx 20rpx;

    .search-input-box {
      width: 100%;
      height: 70rpx;
      border-radius: 35rpx;

      .iconfont {
        font-size: 38rpx;
        color: #909090;
      }

      .search-input {
        height: 70rpx;
      }
    }

    .search-input-box-two {
      width: 590rpx;
      height: 70rpx;
      border-radius: 35rpx 0 0 35rpx;

      .iconfont {
        font-size: 38rpx;
        color: #909090;
      }

      .search-input {
        height: 70rpx;

      }
    }

    .search-text {
      width: 120rpx;
      height: 70rpx;
      border-radius: 0 35rpx 35rpx 0;
      float: right;
      right: 0;
    }
  }

  .search-history {
    width: 722rpx;
    margin: 0 14rpx 20rpx;
  }

  .option-prod{
    position: fixed;
    bottom: 0;
    .btn{
      background: $bg-main-color;
      position: 20rpx;
      width: 300rpx;
      height: 80rpx;
      color: #fff;
    }
  }

</style>
