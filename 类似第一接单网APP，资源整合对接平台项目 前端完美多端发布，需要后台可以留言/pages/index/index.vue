<template>
  <view>

    <customtop2></customtop2>

    <view v-if="!loading">
    	<view class="banner" v-if="banner_data.length > 0">
        <swiper class="swiper"
          circular
          :autoplay="true"
          :style="{height: `${swiper_height}`}"
        >
          <swiper-item
            v-for="(item, index) in banner_data"
            :key="index"
            @click="jumpPage(item.url_open_mode == 1 ? item.url : '/pages/index/out?url=' + item.url)"
          >
            <view class="swiper-item">
              <image class="img" mode="widthFix" :src="item.image" @load="onLoadImg"></image>
            </view>
          </swiper-item>
        </swiper>
    	</view>

    	<view class="sudoku" v-if="sudoku_data.length > 0">
    		<view class="container">
    			<view
    				class="item"
    				v-for="(item, index) in sudoku_data"
            :key="index"
    				@click="jumpPage(item.url_open_mode == 1 ? item.url : '/pages/index/out?url=' + item.url)"
    			>
    				<image class="img" :src="item.image" />
    				<view class="txt">{{item.title}}</view>
    			</view>
    		</view>
    	</view>


<view class="box flex-row">
  <text class="r">公告：平台禁止发布违法广告，发现直接封号，情节严重移交公安机关处理！推荐有礼可获得免费金币，成为会员每天赠送20张查看卡！</text>

</view>


     <view class="index_posts">
     <view class="container">
      <view class="index_title">
        <view class="txt">最新内容</view></view></view>
        
      </view>







      <view class="post_list">
        <view class="container">
          <view class="items" v-if="posts.length > 0">
            <view class="item" :class="item.top_status == 1 ? 'item_tips' : ''" v-for="(item, index) in posts" :key="index" @click="jumpPage('/pages/post/show?id=' + item.id)">
              <view class="tips" v-if="item.top_status == 1">置顶</view>
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
              <view class="tags">
                <view class="tag_item" v-for="(item_attr, index_attr) in item.attributes">
                  <view class="tag_title">{{item_attr.name}}：</view>
                  <view class="tag_values">
                    <span class="sp" :class="'sp' + item_v.rand_key" v-for="(item_v, index_v) in item_attr.values2" :key="index_v">{{item_v.name}}</span>
                  </view>
                </view>
              </view>
              <view class="item_foot">
                <view class="user_info">
                  <view class="avatar"><img :src="item.user_avatar"></view>
                  <view class="txtcontent">
                    <span class="name">{{item.user_nickname}}</span>
                    <span class="company">{{item.user_company}}</span>
                  </view>
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

    </view>

  </view>
</template>

<script>
import { request } from "@/utils/http.js"
import customtop2 from "@/components/customtop2.vue"

export default {
  components: { customtop2 },

  data() {
    return {
      loading: true,
      banner_data: [],
      sudoku_data: [],
      swiper_height: 0,
      posts: [],
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      params: {
        page_size: 15,
        page: 1,
      },
    }
  },

  onLoad() {
    uni.showLoading();

    request.post('/common/getConfig').then(res => {
      uni.setNavigationBarTitle({ title: res.data.app_name });
    })

    this.getBannserData();
    this.getSudokuData();
    this.getPostsPaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    onLoadImg: function(e) {
      //获取可使用窗口宽度
      var width = uni.getSystemInfoSync().windowWidth;
      //获取图片实际高度
      var imgheight = e.detail.height;
      //获取图片实际宽度
      var imgwidth = e.detail.width;
      var height = width * imgheight / imgwidth + "px";
      this.swiper_height = height;
    },

    getBannserData: function() {
      request.post('/common/getAdver', {code: 'wxapp_index_banner'}).then(res => {
        if (res.data.values) {
          this.banner_data = res.data.values;
        }
      })
    },

    getSudokuData: function() {
      request.post('/common/getAdver', {code: 'wxapp_sudoku'}).then(res => {
        if (res.data.values) {
          this.sudoku_data = res.data.values;
        }
      })
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

    switchTab: function(url) {
      uni.switchTab({ url: url })
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url })
    }
  }
}
</script>

<style>
.banner {
  background-color: #fff;
  overflow: hidden;
  width: 100%;
}
.banner .img {
  display: block;
  border: none;
  width: 100%;
  overflow: hidden;
}

.sudoku {
  background-color: #fff;
}
.sudoku .container {
  display: flex;
  flex-wrap: wrap;
  padding: 46rpx 0 0 0;
}
.sudoku .item {
  width: 20%;
  text-align: center;
  margin-bottom: 46rpx;
  font-size: 12px;
}
.sudoku .item image {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 5px;
}

.post_list {
  padding-bottom: 0;
}
</style>
