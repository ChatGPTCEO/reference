<template>
	<view>
    
    <customtop top_title="担保交易"></customtop>
    
    <view class="my_publish_list container" v-if="!loading">

      <view class="items" v-if="danbaos.length > 0">
        <view class="item" v-for="(item, index) in danbaos">
          <view class="top">
            <view class="title">{{item.content}}</view>
          </view>
          <ul class="type">
            <view class="type-item"><span class="first">交易编号：</span><span>{{item.id}}</span></view>
            <view class="type-item"><span class="first">交易金额：</span><span>¥{{item.price}}</span></view>
            <view class="type-item"><span class="first">交易状态：</span><span>{{item.status_str}}</span></view>
            <view class="type-item"><span class="first">当前身份：</span><span>{{item.current_identity}}</span></view>
          </ul>
          <view class="foot_info">
            <view class="btns">
              <span class="a" @click="jumpPage('/pages/danbao/show?id=' + item.id)">查看详情</span>
            </view>
          </view>
        </view>
        <u-loadmore :status="loadmore_status" />
      </view>

      <u-empty
        v-if="danbaos.length == 0"
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
      danbaos: [],
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      params: {
        page_size: 15,
        page: 1,
      },
    }
  },

  onLoad: function() {
    uni.showLoading();
    this.getDanbaosPaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    getDanbaosPaginate: function() {
      request.post('/danbao/getDanbaosPaginate', this.params).then(res => {
        this.loading = false;
        uni.hideLoading();
        if (res.data.total == 0) return false;

        if (res.data.current_page == 1) {
          this.danbaos = res.data.data;
        } else {
          this.danbaos = this.danbaos.concat(res.data.data);
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
        this.getWalletLogsPaginate();
      }
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
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
  background: #f4645f;
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
	font-size: 28rpx;
	overflow: hidden;
}
.items .item .foot_info .btns {
	float: right;
}
.items .item .foot_info .btns .a {
	margin-left: 5px;
  color: #666;
}
.items .item .foot_info .btns .split_line {
	margin-left: 5px;
	color: #666;
}
</style>
