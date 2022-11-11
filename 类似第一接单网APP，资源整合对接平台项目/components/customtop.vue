<template>
	<view>
    <view class="custom_top">
      <view class="item left">
        <i class="back iconfont icon-xiangzuo2" @click="goBack"></i>
        <i class="home iconfont icon-shouye" @click="goHome"></i>
      </view>
      <view class="item title">{{top_title}}</view>
      <view class="item"></view>
    </view>
    <view class="custom_top_blank"></view>
	</view>
</template>

<script>
export default {
  name:"customtop",

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
.custom_top .left .iconfont {
  font-weight: 600;
  font-size: 18px;
}
.custom_top .home {
  margin-left: 14px;
}
.custom_top .title {
  color: #333;
  font-weight: 500;
  text-align: center;
  font-size: 18px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>
