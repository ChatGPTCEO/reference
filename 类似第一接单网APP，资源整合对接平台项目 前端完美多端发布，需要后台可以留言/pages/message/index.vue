<template>
  <view>
    <customtop2></customtop2>

    <scroll-view scroll-x="true" class="top_nav">
    	<view class="box">
    		<view class="item" :class="params.type == 'post' ? 'on' : ''" @click="setCurrentType('post')">合作消息</view>
    		<view class="item" :class="params.type == 'system' ? 'on' : ''" @click="setCurrentType('system')">系统消息</view>
    	</view>
    </scroll-view>
    <view class="top_nav_blank"></view>

    <view class="list" v-if="!loading && logined">
      <view class="items" v-if="messages.length > 0">
        <u-swipe-action>

          <u-swipe-action-item
            :options="options1"
            @click="delAction(item.id)"
            v-for="(item, index) in messages"
            :key="index"
          >
            <view class="item" @click="jumpPage(item.url)">
              <view class="content">
                {{item.content}}
              </view>
              <view class="foot">
                <span class="date">{{item.created_at}}</span>
              </view>
            </view>
          </u-swipe-action-item>

        </u-swipe-action>
        <u-loadmore :status="loadmore_status" />
      </view>


      <u-empty
        v-if="messages.length == 0"
        mode="data"
        icon="http://cdn.uviewui.com/uview/empty/data.png"
        text="暂无消息~"
      >
      </u-empty>
    </view>

    <view v-if="!loading && !logined" class="login_box">
      <view class="description">点击登录查看消息~</view>
      <view class="luckbtn luckbtn-default" @click="jumpPage('/pages/account/login_password')">立即登录</view>
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
      messages: [],
      loading: true,
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      params: {
        page_size: 15,
        page: 1,
        type: 'post',
      },
      logined: false,
      options1: [{
        text: '删除',
        style: {
          backgroundColor: '#f56c6c'
        }
      }],
    }
  },

  onShow: function() {
    uni.showLoading();
    this.getUser();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    getUser: function() {
      request.post('/user/getLoginUser').then(res => {
        this.loading = false;
        uni.hideLoading();
        if (res.data.id) {
          this.logined = true;
          this.getMessagesPaginate();
        } else {
          this.logined = false;
        }
      })
    },

    getMore: function() {
      if (!this.loadmore_finished) {
        this.loadmore_status = 'loading';
        this.getMessagesPaginate();
      }
    },

    getMessagesPaginate: function() {
      let params = this.params;
      request.post('/common/getMessagesPaginate', params).then(res => {
        uni.hideLoading();
        this.loading = false;
        if (res.data.total == 0) return false;

        if (res.data.current_page == 1) {
          this.messages = res.data.data;
        } else {
          this.messages = this.messages.concat(res.data.data);
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

    delAction(id) {
      let that = this;
      uni.showModal({
        content: '确定删除该消息？',
        success (res) {
          if (res.confirm) {
            uni.showLoading();
            request.post('/common/deleteMessage', {id: id}).then((res) => {
              that.deleteAfter(id);
              uni.showToast({
                icon: 'none',
                title: '删除成功',
                mask: true
              });
            });
          }
        }
      })
    },

    // 删除后
    deleteAfter: function(id) {
      for (var i = 0; i < this.messages.length; i++) {
        if (this.messages[i].id == id) {
          this.messages.splice(i, 1);
        }
      }
    },

    setCurrentType: function(type) {
      this.params.type = type;
      if (!this.logined) return false;
      uni.showLoading();
      this.params.page = 1;
      this.messages = [];
      this.loading = true;
      this.getMessagesPaginate();
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
.top_nav {
	position: fixed;
	z-index: 99;
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

.login_box {
  position: fixed;
  top: -100rpx;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 690rpx;
  height: 200rpx;
  text-align: center;
}
.login_box .description {
  margin-bottom: 28rpx;
  font-size: 28rpx;
  color: #666;
  letter-spacing: 1px;
}
.login_box .luckbtn {
  width: 300rpx;
  margin: 0 auto;
}

.list {
  margin-top: 30rpx;
}
.list .top {
  padding: 30rpx 30rpx;
  letter-spacing: 2px;
}
.list .top .icon {
  margin-right: 5px;
}
.list .items .item {
  padding: 30rpx 30rpx;
  border-top: 1px solid #f5f5f5;
  color: #666;
  background-color: #fff;
}
.list .items .item .content {
  line-height: 1.6;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
.list .items .item .type_tag {
  background-color: #00B38A;
  color: #fff;
  font-size: 28rpx;
  padding: 2px 5px;
  border-radius: 3px;
  margin-right: 3px;
}
.list .items .item .foot {
  font-size: 24rpx;
  margin-top: 5px;
  color: #999;
}
</style>
