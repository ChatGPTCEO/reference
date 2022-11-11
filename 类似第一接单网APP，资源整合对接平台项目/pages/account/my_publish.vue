<template>
	<view>

    <customtop top_title="我的发布"></customtop>

    <scroll-view scroll-x="true" class="top_nav">
    	<view class="box">
    		<view
          class="item"
          :class="params.category_id == item.id ? 'on' : ''"
          v-for="(item, index) in categorys"
          @click="setCurrentCategory(item.id)"
        >
          {{item.name}}
        </view>
    	</view>
    </scroll-view>
    <view class="top_nav_blank"></view>

    <view class="my_publish_list container" v-if="!loading">

      <view class="items" v-if="data_list.length > 0">
        <view class="item" :class="item.top_status == 1 ? 'item_tips' : ''" v-for="(item, index) in data_list">
          <view class="tips" v-if="item.top_status == 1">置顶</view>
          <view class="top" @click="jumpPage('/pages/post/show?id=' + item.id)">
            <view class="title">{{item.title}}</view>
          </view>
          <ul class="type">
            <view class="type-item"><span class="first">合作编号：</span><span>{{item.id}}</span></view>
            <view class="type-item"><span class="first">合作类目：</span><span>{{item.category_name}}</span></view>
            <view class="type-item"><span class="first">发布时间：</span><span>{{item.created_at}}</span></view>
            <view class="type-item"><span class="first">更新时间：</span><span>{{item.refresh_date}}</span></view>
            <view class="type-item">
              <span class="first">审核状态：</span>
              <span v-if="item.status == 0">审核中</span>
              <span v-if="item.status == 1">已审核</span>
              <span v-if="item.status == 2">
                审核失败
                <i class="iconfont icon-wenhao icon_question" @click="showStatusMessage(item.audit_log.message != '' ? item.audit_log.message : '无留言');"></i>
              </span>
            </view>
          </ul>
          <view class="foot_info">
            <view class="btns">
              <span class="a" @click="jumpPage('/pages/post/top?id=' + item.id)">置顶</span>
              <span class="a" @click="refresh(item.id)">刷新</span>
              <i class="iconfont icon-anjianfengexian split_line"></i>
              <span class="a" @click="edit('/pages/post/edit?id=' + item.id)">编辑</span>
              <span class="a" @click="deleteFun(item.id)">删除</span>
            </view>
          </view>
        </view>
        <u-loadmore :status="loadmore_status" />
      </view>
      <u-empty
        v-if="data_list.length == 0"
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
      data_list: [],
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      status: '',
      params: {
        page_size: 15,
        page: 1,
        category_id: 0
      },
      categorys: [],
      config: {},
    }
  },

  onLoad: function () {
    request.post('/common/getConfig', this.params).then(res => {
      this.config = res.data;
    })

    uni.showLoading();
    this.getCategorys();
    this.getMyPostsPaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    getMyPostsPaginate: function() {
      request.post('/post/getPostsPaginate_my', this.params).then(res => {
        uni.hideLoading();
        this.loading = false;
        if (res.data.total == 0) return false;

        if (res.data.current_page == 1) {
          this.data_list = res.data.data;
        } else {
          this.data_list = this.data_list.concat(res.data.data);
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
        this.getMyPostsPaginate();
      }
    },

    getCategorys: function() {
      request.post('/common/getPublishData').then(res => {
        this.categorys = res.data;
      })
    },

    setCurrentCategory: function(id) {
      this.params.category_id = id;
      this.params.page = 1;
      this.data_list = [];
      this.loading = true;
      uni.showLoading();
      this.getMyPostsPaginate();
    },

    edit: function(url) {
      uni.showModal({
        title: '提示',
        content: '编辑后将重新审核，确认编辑？',
        success (res) {
          if (res.confirm) {
            uni.navigateTo({ url: url })
          }
        }
      })
    },

    // 刷新
    refresh: function(id) {
      let that = this;
      uni.showModal({
        title: '提示',
        content: '刷新一次将消耗 ' + that.config.refresh_gold + ' 金币，确认刷新？',
        success (res) {
          if (res.confirm) {
            uni.showLoading();
            request.post('/post/refresh', {id: id}).then((res) => {
              if (res.code == 200) {
                that.refreshAfter(id, {refresh_date: res.data.refresh_date});
                uni.showToast({ icon: 'success', title: '刷新成功', mask: true });
              } else if (res.code == 400) {
                uni.showToast({ title: res.message, icon: 'none',  mask: true });
                return false;
              } else {
                uni.showToast({ title: '操作失败', icon: 'none',  mask: true });
                return false;
              }
            });
          }
        }
      })
    },

    // 创建后
    createAfter: function() {
      this.data_list = [];
      this.params.page = 1;
      this.params.loadmore_finished = false;
      this.getMyPostsPaginate();
    },

    // 更新后
    updateAfter: function(id, params) {
      let data_list = this.data_list;
      if (!data_list.length > 0) return false;
      for (var i = 0; i < data_list.length; i++) {
        if (data_list[i].id == id) {
          data_list[i].title = params.title;
          data_list[i].status = 0;
          data_list[i].status_str = '审核中';
        }
      }
      this.data_list = data_list;
    },

    // 删除
    deleteFun: function(id) {
      let that = this;
      uni.showModal({
        title: '提示',
        content: '确认删除？',
        success (res) {
          if (res.confirm) {
            uni.showLoading({title: '加载中'});
            request.post('/post/delete', {id: id}).then((res) => {
              that.deleteAfter(id);
              uni.showToast({
                icon: 'success',
                title: '操作成功',
                mask: true
              });
            });
          }
        }
      })
    },

    // 刷新后
    refreshAfter: function(id, params) {
      let data_list = this.data_list;
      if (!data_list.length > 0) return false;
      for (var i = 0; i < data_list.length; i++) {
        if (data_list[i].id == id) {
          data_list[i].refresh_date = params.refresh_date;
        }
      }
      this.data_list = data_list;
    },

    // 删除后
    deleteAfter: function(id) {
      let data_list = this.data_list;
      if (!data_list.length > 0) return false;
      for (var i = 0; i < data_list.length; i++) {
        if (data_list[i].id == id) {
          data_list.splice(i, 1);
        }
      }
      this.data_list = data_list;
    },

    // 置顶后
    topAfter: function(id, params) {
      let data_list = this.data_list;
      if (!data_list.length > 0) return false;
      for (var i = 0; i < data_list.length; i++) {
        if (data_list[i].id == id) {
          data_list[i].top_status = params.top_status;
        }
      }
      this.data_list = data_list;
    },

    showStatusMessage: function(message) {
      uni.showModal({
        showCancel: false,
        confirmText: '我知道了',
        content: message
      })
    },

    jumpPage: function(url) {
      uni.navigateTo({
        url: url,
      })
    }
  }
}
</script>

<style>
page {
  padding-bottom: 60rpx;
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
	min-width:25%;
	max-width:25%;
	text-align:center;
	background-color: #fff;
}
.top_nav .item.on {
	color: #00B38A;
}

.my_publish_list {
	margin-top: 30rpx;
}
.items {
	margin: 0 auto;
	margin-bottom: 40rpx;
}
.items .item {
	background-color: #fff;
	margin-top: 30rpx;
	border-radius: 3px;
	overflow: hidden;
	padding: 30rpx;
	position: relative;
}
.items .item .title {}
.items .item .tips {
  position: absolute;
	width: 50px;
	height: 22px;
	line-height: 22px;
  background: #00B38A;
  border-radius: 13px 0px 0px 13px;
  font-size: 24rpx;
  color: #fff;
  text-align: center;
  right: 0;
}
.items .item.item_tips .title {
	max-width: 86%;
}
.items .item .type {
	color: #999;
	font-size: 24rpx;
	margin-bottom: -10rpx;
	overflow: hidden;
	border-top: 1px solid #f5f5f5;
	letter-spacing: 1px;
	padding: 30rpx 0;
	margin-top: 30rpx;
}
.items .item .type-item {
	margin-bottom: 10rpx;
	display: block;
	width: 100%;
}
.items .item .type-item.status .icon {
	margin-left: 6rpx;
}
.items .item .foot_info {
	padding-top: 30rpx;
	border-top: 1px solid #f5f5f5;
	font-size: 24rpx;
	overflow: hidden;
}
.items .item .foot_info .btns {
	float: right;
}
.items .item .foot_info .btns .a {
	margin-left: 5px;
  color: #999;
}
.items .item .foot_info .btns .split_line {
	margin-left: 5px;
	color: #999;
}
.icon_question {
  margin-left: 3px;
}
</style>
