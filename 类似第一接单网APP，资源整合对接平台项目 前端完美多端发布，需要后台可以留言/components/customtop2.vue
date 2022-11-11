<template>
	<view>
    <view class="custom_top">
      <view class="item left">
        <img class="logo" src="../static/images/logo.png" @click="goHome" />
      </view>
      <view class="item"></view>
      <view class="item right">
        <i class="home iconfont icon-sousuoxiao" @click="goSearch"></i>
      </view>
    </view>
    <view class="custom_top_blank"></view>
	</view>
</template>

<script>
export default {
  name:"customtop2",

  data() {
    return {

    };
  },

  props: {
    top_title: {
      type: String
    },
  },

  methods: {
    goBack: function() {
      uni.navigateBack();
    },

    goHome: function() {
      uni.switchTab({ url: '/pages/index/index' });
    },

    goSearch: function() {
      uni.navigateTo({ url: '/pages/index/search' });
    },
  }
}
</script>

<style>
.custom_top_blank {
  height: 54px;
}
.custom_top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  height: 53px;
  line-height: 53px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  padding: 0 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.custom_top .item {
  flex: 1;
}
.custom_top .left .logo {
  height: 35px;
  vertical-align: middle;
}
.custom_top .right {
  text-align: right;
}
.custom_top .right .iconfont {
  font-weight: 600;
  font-size: 18px;
}
</style>
