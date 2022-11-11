<template>
  <view>

    <customtop top_title="推荐有礼"></customtop>

    <view class="container">

      <view class="luckbox user_invite_introduce">
        <view class="top"><span class="title">规则介绍</span></view>
        <view class="items">
          <view class="item">1，点击生成二维码分享海报</view>
          <view class="item">2，好友通过你的分享进行注册</view>
          <view class="item">3，你可获取 {{config.invite_user_gold}} 金币收益</view>
        </view>
        <view class="btns">
          <view class="luckbtn luckbtn-default" @click="createInviteCodeImage()">生成邀请码</view>
        </view>
        <view class="url_unify_box none">
          <view>你的专属链接：{{invite_url}}</view>
          <view class="luckbtn luckbtn-default" @click="copy(invite_url)">复制链接</view>
        </view>
      </view>

      <view class="luckbox" v-if="!loading">
        <view class="top"><span class="title">邀请记录</span></view>

        <view v-if="user_invites.length > 0">
          <uni-table border class="log_list">
          	<uni-tr>
          		<uni-th class="utable_th" width="100">用户昵称</uni-th>
          		<uni-th class="utable_th" width="40">奖励</uni-th>
          		<uni-th class="utable_th" width="120">邀请时间</uni-th>
          	</uni-tr>
          	<uni-tr v-for="(item, index) in user_invites">
          		<uni-td class="utable_td">{{item.nickname}}</uni-td>
          		<uni-td class="utable_td">{{item.gold}}</uni-td>
          		<uni-td class="utable_td">{{item.created_at}}</uni-td>
          	</uni-tr>
          </uni-table>
          <u-loadmore :status="loadmore_status" />
        </view>

        <u-empty
          v-if="user_invites.length == 0"
          mode="data"
          icon="http://cdn.uviewui.com/uview/empty/data.png"
          text="暂无记录~"
        >
        </u-empty>

      </view>
    </view>

    <u-popup
      mode="center"
      round="3"
      :show="invite_img_show"
      @close="onClose_invite_img"
    >
      <view class="invite_img">
        <image class="img" :src="invite_img" mode="widthFix" />
        <view class="description">长按保存图片</view>
      </view>
    </u-popup>

  </view>
</template>

<script>
import { request } from "@/utils/http.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      config: {},
      user_invites: [],
      loading: true,
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      params: {
        page_size: 15,
        page: 1,
      },
      invite_url: '',
      invite_img: '',
      invite_img_origin: '',
      invite_img_show: false
    }
  },

  onLoad: function() {
    uni.showLoading();
    request.post('/account/getInviteUrl').then(res => {
      this.invite_url = res.data;
    })

    request.post('/common/getConfig').then(res => {
      this.config = res.data;
    })
  },

  onShow: function() {
    this.getUserInvitePaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    getUserInvitePaginate: function() {
      request.post('/account/getUserInvitePaginate', this.params).then(res => {
        this.loading = false;
        uni.hideLoading();
        if (res.data.total == 0) return false;

        if (res.data.current_page == 1) {
          this.user_invites = res.data.data;
        } else {
          this.user_invites = this.user_invites.concat(res.data.data);
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
        this.getUserInvitePaginate();
      }
    },

    copy: function(content) {
      wx.setClipboardData({ data: content });
    },

    createInviteCodeImage: function() {
      uni.showLoading({ title: '生成中...' });
      request.post('/account/createInviteCodeImage_h5', {}, {responseType: 'arraybuffer'}).then(res => {
        uni.hideLoading()
        this.invite_img_origin = res;
        this.invite_img = 'data:image/png;base64,' + uni.arrayBufferToBase64(res);
        this.invite_img_show = true;
      })
    },

    onClose_invite_img() {
      this.invite_img_show = false;
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
page {
  padding-bottom: 30rpx;
}
.luckbox {
  margin-top: 30rpx;
}
.user_invite_introduce .items .item {
  margin-bottom: 5px;
  color: #666;
}
.url_unify_box {
  margin-top: 30rpx;
}
.url_unify_box .luckbtn {
  margin-top: 30rpx;
}
.btns {
  margin-top: 30rpx;
}

.invite_img {
  width: 690rpx;
}
.invite_img .img {
  width: 690rpx;
}
.invite_img .description {
  text-align: center;
  height: 90rpx;
  line-height: 90rpx;
  color: #666;
  font-size: 12px;
}
</style>
