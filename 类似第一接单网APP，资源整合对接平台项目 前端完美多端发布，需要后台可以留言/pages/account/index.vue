<template>
	<view class="account_index container" v-if="!loading">

    <customtop2></customtop2>

		<view class="top">
      <view class="left" @click="jumpPage('/pages/account/login_password')" v-if="!logined">
        <view class="avatar"><img src="/static/images/user_avatar_default.png"></view>
        <view class="info">
          <view class="name">立即登录<i class="iconfont icon-xiangyou-copy"></i></view>
          <view class="tags">
            <span>点击登录</span>
          </view>
        </view>
      </view>

      <view class="left" @click="jumpPage('/pages/account/user_info')" v-if="logined">
        <view class="avatar"><img :src="user.avatar"></view>
        <view class="info">
          <view class="name">{{user.nickname}}<i class="iconfont icon-xiangyou-copy"></i></view>
          <view class="tags">
            <i class="iconfont icon-xingbienvxianxing sex-icon woman" v-if="user.sex == '女'"></i>
            <i class="iconfont icon-xingbienanxianxing sex-icon man" v-if="user.sex == '男'"></i>
          </view>
        </view>
      </view>

      <view class="right"></view>
    </view>

    <view class="money">
      <view class="item" @click="jumpPage(logined ? '/pages/account/gold' : '/pages/account/login_password')">
        <img src="/static/images/gold.png">
        <view class="txt">金币</view>
      </view>
      <view class="item" @click="jumpPage(logined ? '/pages/account/vip' : '/pages/account/login_password')">
        <img src="/static/images/vip.png">
        <view class="txt">会员</view>
      </view>
      <view class="item" @click="qiandao">
        <img src="/static/images/qiandao.png">
        <view class="txt">签到</view>
      </view>
    </view>

    <view class="items">
      <view class="item" @click="jumpPage(logined ? '/pages/account/user_info' : '/pages/account/login_password')">
        <view class="left"><i class="iconfont icon-guanyu"></i>个人信息</view>
        <view class="right"><i class="iconfont icon-xiangyou-copy"></i></view>
      </view>
      <view class="item" @click="jumpPage(logined ? '/pages/account/user_password' : '/pages/account/login_password')">
        <view class="left"><i class="iconfont icon-mima1"></i>设置密码</view>
        <view class="right"><i class="iconfont icon-xiangyou-copy"></i></view>
      </view>
      <view class="item" @click="jumpPage(logined ? '/pages/account/user_contact' : '/pages/account/login_password')">
        <view class="left"><i class="iconfont icon-ziyuan"></i>联系方式</view>
        <view class="right"><i class="iconfont icon-xiangyou-copy"></i></view>
      </view>
      <!--<view class="item" @click="jumpPage(logined ? '/pages/account/wallet' : '/pages/account/login_password')">
        <view class="left"><i class="iconfont icon-qianbao"></i>我的钱包</view>
        <view class="right"><i class="iconfont icon-xiangyou-copy"></i></view>
      </view>-->
    </view>

    <view class="items">
      <view class="item" @click="jumpPage(logined ? '/pages/account/my_publish' : '/pages/account/login_password')">
        <view class="left"><i class="iconfont icon-icon_fabu"></i>我的发布</view>
        <view class="right"><i class="iconfont"></i></view>
      </view>
      <view class="item" @click="jumpPage(logined ? '/pages/account/contact_log' : '/pages/account/login_password')">
        <view class="left"><i class="iconfont icon-shijian"></i>查看记录</view>
        <view class="right"><i class="iconfont"></i></view>
      </view>
    </view>

    <view class="items">
      <view class="item" @click="jumpPage(logined ? '/pages/account/user_invite' : '/pages/account/login_password')">
        <view class="left"><i class="iconfont icon-tuijian"></i>推荐有礼</view>
        <view class="right"><i class="iconfont"></i></view>
      </view>
      <view class="item" @click="jumpPage('/pages/article/show?id=9')">
        <view class="left"><i class="iconfont icon-lianxiren"></i>关于我们</view>
        <view class="right"><i class="iconfont"></i></view>
      </view>
      <view class="item" @click="jumpPage('/pages/article/show?id=2')">
        <view class="left"><i class="iconfont icon-ziyuan"></i>联系我们</view>
        <view class="right"><i class="iconfont"></i></view>
      </view>
      <view class="item" @click="jumpPage('/pages/article/show?id=3')">
        <view class="left"><i class="iconfont icon-guanyuliushu"></i>用户协议</view>
        <view class="right"><i class="iconfont"></i></view>
      </view>
    </view>

    <view class="items">
      <view class="item about">{{config.app_name}} Version {{config.version}}</view>
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
      logined: false,
      user: {},
      config: {},
    }
  },

  onLoad: function(options) {
    uni.showLoading();
    request.post('/common/getConfig').then(res => {
      this.config = res.data;
    })
  },

  onShow: function () {
    this.getUser();
  },

  methods: {
    getUser: function() {
      request.post('/user/getLoginUser').then(res => {
        uni.hideLoading();
        this.loading = false;
        if (res.data.id) {
          this.logined = true;
          this.user = res.data;
        } else {
          this.logined = false;
        }
      })
    },

    qiandao: function() {
      uni.showLoading();
      request.post('/account/qiandao').then(res => {
        uni.hideLoading();
        uni.showModal({
          showCancel: false,
          confirmText: '我知道了',
          content: res.message
        })
      })
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
@import url("index.css");
</style>
