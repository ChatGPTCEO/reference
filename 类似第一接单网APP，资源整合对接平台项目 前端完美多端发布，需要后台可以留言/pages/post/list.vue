<template>
	<view>
    <customtop :top_title="top_title"></customtop>

    <view class="condition">
    	<view class="box container">
        <view class="left_box">
          <view class="items">
            <view class="item" :class="(!params.order || params.order == '' ? 'on' : '')" @click="bindtapSetOrderParams('order', '')">默认</view>
            <view class="item" :class="(params.order == 1 ? 'on' : '')" @click="bindtapSetOrderParams('order', 1)">最新</view>
          </view>
        </view>
        <view class="right_box" v-if="category" @click="onShow_screen_popup();">
        	<view class="screen_switch" :class="JSON.stringify(params_search) != '{}' ? 'on' : ''" bindtap="onShow_screen_popup">
            <u-icon name="grid-fill" size="14" color="" class="icon"></u-icon><span>筛选</span>
          </view>
        </view>
    	</view>
    </view>
    <view class="condition_blank"></view>

    <view class="post_list" v-if="!loading">
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

    <u-popup
      mode="right"
      customStyle="width: 400rpx; height: 100%;"
      :show="screen_popup_show"
      @close="onClose_screen_popup"
    >
      <view class="screen_popup" v-if="category">
        <view class="box">
          <view class="items" v-for="(item, index) in category.attributes" :key="index">
            <view class="item">
              <view class="title">{{item.name}}</view>
              <view class="options">
                <span
                  v-for="(item_option, index_option) in item.options"
                  :key="index"
                  :class="(params_search['at_' + item.id] == item_option.id) ? 'on' : ''"
                  @click="bindtapSetSearchParams('at_' + item.id, item_option.id)"
                >
                  {{item_option.value}}
                </span>
              </view>
            </view>
          </view>
        </view>
        <view class="btns">
          <view class="btn" @click="bindtapResetSearch">重置</view>
          <view class="btn" @click="bindtapSearch">确定</view>
        </view>
      </view>
    </u-popup>

	</view>
</template>

<script>
import { request } from "@/utils/http.js"
import util from '@/utils/util.js';
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      top_title: '',
      loading: true,
      category: {},
      posts: [],
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      params: {
        page_size: 15,
        page: 1,
        order: '',
      },
      params_search: {},
      screen_popup_show: false,
    }
  },

  onLoad: function (options) {
    let array = Object.assign(this.params, options);
    if (options.category_id) {
      this.getCategory();
      delete options.category_id;
    }
    let array_params_search = Object.assign(this.params_search, options);
    this.params = array;
    this.params_search = array_params_search;
    uni.showLoading();
    this.getPostsPaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    getCategory: function() {
      request.post('/post/getCategory', {id: this.params.category_id}).then(res => {
        this.top_title = res.data.name;
        uni.setNavigationBarTitle({ title: res.data.name });
        this.category = res.data;
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

    bindtapSetOrderParams: function(key, value = '') {
      this.params.page = 1;
      this.params[key] = value;
      this.loading = true;
      this.posts = [];
      uni.showLoading();
      this.getPostsPaginate();
    },

    bindtapSetSearchParams: function(key, value) {
      this.params_search[key] = value;
      this.$forceUpdate();
    },

    bindtapResetSearch: function() {
      let params = this.params;
      this.params_search = {};
      this.onClose_screen_popup();

      let array = {};
      array.page = 1;
      array.category_id = params.category_id;
      array.order = params.order;
      this.params = array;
      this.loading = true;
      this.posts = [];
      uni.showLoading();
      this.getPostsPaginate();
    },

    bindtapSearch: function() {
      let params = this.params;
      let params_search = this.params_search;
      params = Object.assign(params, params_search);
      params.page = 1;

      this.params = params;
      this.loading = true;
      this.posts = [];
      uni.showLoading();
      this.getPostsPaginate();
      this.onClose_screen_popup();
    },

    onShow_screen_popup() {
      this.screen_popup_show = true;
    },

    onClose_screen_popup() {
      this.screen_popup_show = false;
    },

    switchTab: function(url) {
      uni.switchTab({ url: url });
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
@import url("list.css");
</style>
