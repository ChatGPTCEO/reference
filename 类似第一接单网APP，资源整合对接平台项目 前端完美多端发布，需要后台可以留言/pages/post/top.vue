<template>
  <view>

    <customtop top_title="置顶内容"></customtop>

    <view class="container" v-if="!loading">

      <view class="gold_top luckbox">
        <view class="txt"><span>账户金币余额：</span><span class="gold">{{user.gold}}</span></view>
        <view class="btns"><span class="luckbtn luckbtn-default" @click="jumpPage('/pages/account/gold_pay');">充值</span></view>
      </view>

      <view class="luckbox post_data">
        <view class="top"><span class="title">置顶内容</span></view>
        <view class="item"><span>内容编号：</span><span>{{post.id}}</span></view>
        <view class="item"><span>内容标题：</span><span>{{post.title}}</span></view>
        <view v-if="post.top_status == 1">
          <view class="item"><span>置顶状态：</span><span>置顶中</span></view>
          <view class="item"><span>结束时间：</span><span>{{post.top_end_date}}</span></view>
        </view>
        <view v-if="post.top_status == 0">
          <view class="item"><span>置顶状态：</span><span>未置顶</span></view>
        </view>
      </view>

      <view class="pydata_list">
        <view class="item" :class="day == item.day ? 'on' : ''" v-for="(item, index) in config.top_data" @click="setCurrentDay(item.day)">
          <view class="date">{{item.day}}天</view>
          <view class="content">
            <span>{{item.gold}}</span>
            <span>金币</span>
          </view>
        </view>
      </view>

      <view class="btn_box">
        <view class="luckbtn luckbtn-payment" @click="top">立即置顶</view>
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
      user: {},
      post: {},
      config: [],
      day: 0
    }
  },

  onLoad(options) {
    uni.showLoading();
    this.id = options.id;
    this.getPost_top();
    request.post('/common/getConfig', {id: this.id}).then(res => {
      this.config = res.data;
      this.day = res.data.top_data[0].day;
    })
  },

  onShow() {
    this.getUser();
  },

  methods: {
    top: function() {
      let that = this;
      uni.showModal({
        title: '提示',
        content: '确认操作？',
        success (res) {
          if (res.confirm) {
            uni.showLoading();
            let params = {
              post_id: that.id,
              day: that.day
            };
            request.post('/post/top', params).then((res) => {
              uni.hideLoading();
              if (res.code == 200) {
                uni.showToast({icon: 'success', title: '操作成功'})
                that.getPost_top();
                // 通知来源页
                var pages = getCurrentPages(); var prevPage = pages[pages.length - 2];
                if (prevPage.topAfter != undefined) prevPage.topAfter(that.id, {top_status: 1});
              } else if (res.code == 400) {
                uni.showToast({ title: res.message, icon: 'none' });
                return false;
              } else {
                uni.showToast({ title: '操作失败', icon: 'none' });
                return false;
              }
            });
          }
        }
      })
    },

    getPost_top: function() {
      request.post('/post/getPost_top', {id: this.id}).then(res => {
        uni.hideLoading();
        this.loading = false;
        this.post = res.data;
      })
    },

    setCurrentDay: function(day) {
      this.day = day;
    },

    getUser: function() {
      request.post('/user/getLoginUser').then(res => {
        this.user = res.data;
      })
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
.luckbox {
  margin-top: 30rpx;
}
.post_data .item {
	color: #666;
	margin-bottom: 5px;
  font-size: 28rpx;
}
.post_data .item:last-child {
	margin-bottom: 0;
}
.pydata_list {
	overflow: hidden;
	margin-top: 30rpx;
}
.pydata_list .item {
	width: 213rpx;
	height: 213rpx;
	border: 1px solid #eee;
	border-radius: 3px;
	float: left;
	margin-right: 20rpx;
	background-color: #fff;
	text-align: center;
	margin-bottom: 20rpx;
}
.pydata_list .item.on {
	border: 1px solid #d8b66c;
}
.pydata_list .item:nth-child(3n) {
	margin-right: 0;
}
.pydata_list .item .date {
	height: 60rpx;
  line-height: 60rpx;
  border-bottom: 1px solid #f5f5f5;
  font-size: 28rpx;
}
.pydata_list .item .content {
  height: 153rpx;
  line-height: 153rpx;
}
.pydata_list .item .content span:first-child {
	font-size: 56rpx;
}
.pydata_list .item .content span:last-child {
	font-size: 20rpx;
  color: #999;
}
.btn_box {
  margin-top: 30rpx;
}

.gold_top {
  font-size: 28rpx;
}
.gold_top .gold {
	font-weight: 600;
}
.gold_top .txt {
	float: left;
  padding-top: 6px;
}
.gold_top .btns {
	float: right;
	font-size: 24rpx;
}
.gold_top .btns .luckbtn {
  width: 160rpx;
}
</style>
