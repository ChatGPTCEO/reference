<template>
  <qui-page :data-qui-theme="theme">
    <view class="notification-box">
      <view class="qui-at-member-page-box__hd__sc">
        <qui-icon class="icon-search" name="icon-search" size="30"></qui-icon>
        <input
          type="text"
          placeholder-class="input-placeholder"
          confirm-type="search"
          placeholder="搜索"
          @input="searchInput"
        />
      </view>
      <view class="addthethemw" v-for="item in 5" :key="item.id">
        <view class="addtheth_left">
          1.内含学习资料
        </view>
        <view class="addtheth_right">
          <view class="addth_botn">
            升序
          </view>
          <view class="addth_botn">
            降序
          </view>
          <view class="addth_botn">
            删除
          </view>
        </view>
      </view>
      <view class="bottom_button">
        <qui-button type="primary" size="minpink" id="TencentCaptcha">
          添加已有主题
        </qui-button>
        <qui-button type="primary" size="minpink" id="TencentCaptcha" class="button2">
          新建主题
        </qui-button>
      </view>
    </view>
  </qui-page>
</template>

<script>
export default {
  data() {
    return {
      navTitle: '', // 导航栏标题
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';

.notification-box {
  padding: 30rpx;
  color: --color(--qui-FC-333);
  // background-color: --color(--qui-BG-1);//因为重复申明的问题注释了
  background-color: #fff;
  transition: $switch-theme-time;
  .qui-at-member-page-box__hd__sc {
    display: flex;
    align-items: center;
    height: 90rpx;
    background: #fafafb;
    border-radius: 45rpx;
    .icon-search {
      margin: 0 10rpx;
      color: #bbb;
    }
  }
  .addthethemw {
    display: flex;
    margin: 40rpx 0;
    justify-content: space-between;
    align-items: center;
    font-family: 'PingFang SC';
    font-size: 26rpx;
    font-weight: 400;
    color: #333;
    border-bottom: 2rpx solid #eee;
    .addtheth_right {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .addth_botn {
    margin-left: 37rpx;
    font-family: 'PingFang SC';
    font-size: 26rpx;
    font-weight: 400;
    color: #999;
  }
  .bottom_button {
    display: flex;
    justify-content: space-between;
    margin-top: 50rpx;
  }
  .bottom_button /deep/ .qui-button--button:after {
    border: none;
  }
}
</style>
