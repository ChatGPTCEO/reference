<template>
	<view>

    <customtop top_title="查看记录"></customtop>

    <scroll-view scroll-x="true" class="top_nav">
    	<view class="box">
    		<view class="item" :class="params.type == 1 ? 'on' : ''" @click="setCurrentType(1)">我查看的</view>
        <view class="item" :class="params.type == 2 ? 'on' : ''" @click="setCurrentType(2)">查看我的</view>
    	</view>
    </scroll-view>
    <view class="top_nav_blank"></view>

    <view class="contact_log_list container" v-if="!loading">
      <view class="items" v-if="logs.length > 0">

        <view class="item" v-for="(item, index) in logs">
          <view class="date">
            <i class="iconfont icon-chakan icon"></i><span>{{item.created_at}}</span>
          </view>
          <view class="bd">
            <view class="item_line">
              <span class="first">内容编号：</span><span>{{item.post.id}}</span>
            </view>
            <view class="item_line">
              <span class="first">内容分类：</span><span>{{item.post.category_name}}</span>
            </view>
            <view class="item_line">
              <span class="first">内容标题：</span><span>{{item.post.title}}<span class="text-danger" v-if="item.post.status != 1">[内容已下架]</span></span>
            </view>
          </view>
          <view class="bd" v-if="params.type == 1">
            <view class="item_line">
              <span class="first">微信：</span>
              <span v-if="item.post.contact.weixin != ''">{{item.post.contact.weixin}}<u-icon class="u_icon" name="file-text" color="" size="" @click="copy(item.post.contact.weixin);"></u-icon></span>
              <span v-if="item.post.contact.weixin == ''">未填写</span>
            </view>
            <view class="item_line">
              <span class="first">手机：</span>
              <span v-if="item.post.contact.phone != ''">{{item.post.contact.phone}}<u-icon class="u_icon" name="file-text" color="" size="" @click="copy(item.post.contact.phone);"></u-icon></span>
              <span v-if="item.post.contact.phone == ''">未填写</span>
            </view>
            <view class="item_line">
              <span class="first">Q Q：</span>
              <span v-if="item.post.contact.qq != ''">{{item.post.contact.qq}}<u-icon class="u_icon" name="file-text" color="" size="" @click="copy(item.post.contact.qq);"></u-icon></span>
              <span v-if="item.post.contact.qq == ''">未填写</span>
            </view>
            <view class="item_line">
              <span class="first">电话：</span>
              <span v-if="item.post.contact.telphone != ''">{{item.post.contact.telphone}}<u-icon class="u_icon" name="file-text" color="" size="" @click="copy(item.post.contact.telphone);"></u-icon></span>
              <span v-if="item.post.contact.telphone == ''">未填写</span>
            </view>
          </view>
          <view class="bd" v-if="params.type == 2">
            <view class="item_line">
              <span class="first">用户：</span>
              <span>{{item.user.nickname}}</span>
            </view>
            <view class="item_line">
              <span class="first">微信：</span>
              <span v-if="item.user.weixin != ''">{{item.user.weixin}}<u-icon class="u_icon" name="file-text" color="" size="" @click="copy(item.user.weixin);"></u-icon></span>
              <span v-if="item.user.weixin == ''">未填写</span>
            </view>
            <view class="item_line">
              <span class="first">手机：</span>
              <span v-if="item.user.phone != ''">{{item.user.phone}}<u-icon class="u_icon" name="file-text" color="" size="" @click="copy(item.user.phone);"></u-icon></span>
              <span v-if="item.user.phone == ''">未填写</span>
            </view>
            <view class="item_line">
              <span class="first">Q Q：</span>
              <span v-if="item.user.qq != ''">{{item.user.qq}}<u-icon class="u_icon" name="file-text" color="" size="" @click="copy(item.user.qq);"></u-icon></span>
              <span v-if="item.user.qq == ''">未填写</span>
            </view>
            <view class="item_line">
              <span class="first">电话：</span>
              <span v-if="item.user.telphone != ''">{{item.user.telphone}}<u-icon class="u_icon" name="file-text" color="" size="" @click="copy(item.user.telphone);"></u-icon></span>
              <span v-if="item.user.telphone == ''">未填写</span>
            </view>
          </view>
        </view>
        <u-loadmore :status="loadmore_status" />

      </view>
      <u-empty
        v-if="logs.length == 0"
        mode="data"
        icon="http://cdn.uviewui.com/uview/empty/data.png"
        text="暂无记录~"
      >
      </u-empty>
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
      logs: [],
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      status: '',
      params: {
        type: 1,
        page_size: 15,
        page: 1,
      }
    }
  },

  onLoad: function (options) {
    if (options.type != undefined) this.params.type = options.type;

    uni.showLoading();
    this.getContactlogsPaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    getContactlogsPaginate: function() {
      request.post('/account/getContactlogsPaginate', this.params).then(res => {
        uni.hideLoading();
        this.loading = false;
        if (res.data.total == 0) return false;

        if (res.data.current_page == 1) {
          this.logs = res.data.data;
        } else {
          this.logs = this.logs.concat(res.data.data);
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

    getMore: function() {
      if (!this.loadmore_finished) {
        this.loadmore_status = 'loading';
        this.getContactlogsPaginate();
      }
    },

    setCurrentType(type) {
      uni.showLoading();
      this.params.type = type;
      this.params.page = 1;
      this.loading = true;
      this.logs = [];
      this.getContactlogsPaginate();
    },

    copy: function(content) {
      wx.setClipboardData({ data: content });
    },
  }
}
</script>

<style>
page {
  padding-bottom: 50rpx;
}
.top_nav {
	position: fixed;
	z-index: 99;
	box-shadow: 0 2px 12px rgb(100 101 102 / 12%);
  left: 0;
  font-size: 28rpx;
  color: #666;
}
.top_nav .box {
	background-color: #fff;
	height: 96rpx;
	line-height: 96rpx;
	width: 100%;
	white-space: nowrap;
	display: flex;
}
.top_nav_blank {
	height: 96rpx;
}
.top_nav .item {
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	min-width:50%;
	max-width:50%;
	text-align:center;
	background-color: #fff;
}
.top_nav .item.on {
	color: #00B38A;
}

.items .item {
	background-color: #fff;
	margin-top: 30rpx;
	border-radius: 3px;
	overflow: hidden;
	padding: 30rpx;
	position: relative;
}
.items .item .item_line {
	margin-bottom: 10px;
}
.items .item .date {
	font-size: 28rpx;
}
.items .item .date .icon {
	margin-right: 5px;
}
.items .item .bd {
	padding-top: 30rpx;
	margin-top: 30rpx;
	border-top: 1px solid #f5f5f5;
}
.items .item .bd .item_line {
	margin-bottom: 10px;
	font-size: 28rpx;
}
.items .item .bd .item_line:last-child {
	margin-bottom: 0;
}
.items .item .bd .item_line .copy_btn {
	margin-left: 5px;
}
.items .item .bd .item_line span {
	margin-right: 3px;
}
.items .item .bd .item_line span.first {
	color: #666;
}
.items .item .bd .item_line span .u_icon {
  margin-left: 3px;
}
.items .item .text-danger {
  margin-left: 3px;
}
</style>
