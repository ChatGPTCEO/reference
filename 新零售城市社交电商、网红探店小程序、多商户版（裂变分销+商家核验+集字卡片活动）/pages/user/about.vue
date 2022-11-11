<template>
	<view class="content">
    <!-- container -->
    <view class="container">
      <view class="about-us">
        <u-image :src="baseInfo.site_logo" mode="aspectFit" width="100rpx" height="100rpx" class="i-logo"></u-image>
        <text>
          {{ baseInfo.share_info }}
        </text>
      </view>
      <view class="cell-box">
        <u-cell-group :border="false">
          <u-cell-item title="当前版本" value="1.0.0" :arrow-right="false"></u-cell-item>
          <u-cell-item :border-bottom="false" title="个人ID" :value="userInfo.account" :arrow-right="false"></u-cell-item>
        </u-cell-group>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    computed: {
      baseInfo () {
        return this.$store.state.baseInfo
      },
      userInfo () {
        return this.$store.state.userInfo
      }
    }
	}
</script>

<style lang="scss">
page {
  background-color: $bg;
}
.cell-box {
  margin-bottom: $gutter;
  border-radius: $uni-border-radius-lg;
  overflow: hidden;
  width: 700rpx;
  margin: $gutter auto;
}
.about-us {
  width: 700rpx;
  min-height: 400rpx;
  margin: 60rpx auto 20rpx;
  background-color: #fff;
  padding: 40rpx;
  border-radius: $uni-border-radius-lg;
  border: 1px solid rgba(228, 231, 237, 1);
  font-size: $uni-font-size-base;
  color: #666;
  line-height: 40rpx;
  display: flex;
  flex-direction: column;
  .i-logo {
    margin: -80rpx auto 20rpx;
  }
}
</style>
