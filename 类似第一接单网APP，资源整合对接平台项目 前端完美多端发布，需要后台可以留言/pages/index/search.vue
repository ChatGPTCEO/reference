<template>
	<view>

    <customtop top_title="搜索"></customtop>

    <view class="search">
      <view class="container">
        <view class="search_box">
          <view class="icon"><i class="iconfont icon-sousuoxiao icon"></i></view>
          <view class="input">
            <input class="weui-input" type="text" :value="params.k" placeholder="请输入搜索内容" @input="getKeywordValue" @confirm="toSearch" />
          </view>
        </view>
        <view class="search_right none">取消</view>
      </view>
    </view>
    <view class="search_blnak"></view>

    <view class="post_list" v-if="!loading">
      <view class="container">
        <view class="items" v-if="posts.length > 0">
          <view class="item" v-for="(item, index) in posts" @click="jumpPage('/pages/post/show?id=' + item.id)">
            <view class="top">
              <view class="title">{{item.title}}</view>
            </view>
            <view class="types">
              <view class="type_item">
                <span>编号：</span><span>{{item.id}}</span>
              </view>
              <view class="type_item">
                <span>类目：</span><span>{{item.category_name}}</span>
              </view>
            </view>
            <view class="item_foot">
              <view class="user_info">
                <view class="avatar"><img :src="item.user_avatar"></view>
                <span class="name">{{item.user_nickname}}</span>
              </view>
            </view>
          </view>
          <u-loadmore :status="loadmore_status" />
        </view>

        <u-empty
          v-if="posts.length == 0"
          mode="data"
          icon="http://cdn.uviewui.com/uview/empty/data.png"
          text="暂无内容~"
        >
        </u-empty>
      </view>
    </view>

    <view class="search_hot" v-if="loading">
    	<view class="container">
    		<view class="title">热门搜索</view>
    		<view class="items">
    			<span class="item" v-for="(item, index) in search_hot" @click="setK(item)">{{item}}</span>
    		</view>
    	</view>
    </view>

	</view>
</template>

<script>
import { request } from "@/utils/http.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      loading: true,
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      posts: [],
      params: {
        page_size: 15,
        page: 1,
        k: ''
      },
      search_hot: [],
    }
  },

  onLoad: function (options) {
    request.post('/common/getSearchHot').then(res => {
      this.search_hot = res.data;
    })
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    setK: function(k) {
      this.params.k = k;
      uni.showLoading();
      this.getPostsPaginate();
    },

    getMore: function() {
      if (!this.loadmore_finished) {
        this.loadmore_status = 'loading';
        this.getPostsPaginate();
      }
    },

    getPostsPaginate: function() {
      let params = this.params;
      request.post('/post/getPostsPaginate', params).then(res => {
        uni.hideLoading();
        this.loading = false;
        if (res.data.total == 0) return false;

        if (res.data.current_page == 1) {
          this.posts = res.data.data;
        } else {
          this.posts = this.posts.concat(res.data.data);
        }

        if (this.params.page == res.data.last_page) {
          this.loadmore_finished = true;
          this.loadmore_status = 'nomore';
          return false;
        }

        let params = this.params;
        params.page = parseInt(res.data.current_page) + parseInt(1);
        this.loadmore_status = 'loadmore';
        this.loadmore_finished = false;
        this.params = params;
      })
    },

    getKeywordValue: function(e) {
      this.params.k = e.target.value;
    },

    toSearch: function() {
      wx.showLoading();
      this.posts = [];
      this.params.page = 1;
      this.getPostsPaginate();
    },
    
    jumpPage: function(url) {
      uni.navigateTo({ url: url })
    }
  }
}
</script>

<style>
page {
  padding-bottom: 30rpx;
}
.search_blnak {
	height: 136rpx
}
.search {
	position: fixed;
	left: 0;
	z-index: 99;
	box-shadow: 0 2px 12px rgb(100 101 102 / 12%);
  width: 100%;
  background-color: #fff;
  padding: 15px 0 17px 0;
}
.search .container {
	display: flex;
	align-items: center;
  flex-wrap: nowrap;
}
.search_box {
  background-color: #f7f8fa;
  color: #666;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 3px;
  padding: 0 10px;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex: 1;
}
.search_box .icon {
  margin-right: 6px;
}
.search_box .input {
  flex: 1;
}
.search_right {
	margin-left: 10px;
	font-size: 28rpx;
	color: #666;
}

.search_hot {
	padding: 20px 0 20px 0;
	color: #666;
}
.search_hot .title {
	letter-spacing: 3px;
}
.search_hot .items {
	margin-top: 15px;
	margin-left: -10px;
}
.search_hot .items .item {
	background-color: #fff;
	padding: 5px 10px;
	margin-left: 10px;
	margin-bottom: 10px;
	display: inline-block;
	font-size: 28rpx;
	border-radius: 3px;
}
</style>
