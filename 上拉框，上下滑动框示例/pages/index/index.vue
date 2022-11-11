<template>
  <view class="container-circle"
    :style="{height:windowHeight+'px',backgroundImage:`linear-gradient(rgba(51, 51, 51, .4), rgba(51, 51, 51, .4)),url(${themeUrl})`}"
    @click.stop.prevent="onClickContent">
    <!-- 自定义navbar -->
    <!-- <view class="navbar" style="height: 0px;">
      <view class="custom-navbar" style="height: 100px;background-color: red;z-index: 299;position: fixed;top: 0;width: 100%;
        display: flex;justify-content: center;align-items: center;color: white;">
        自定义导航栏
      </view>
    </view> -->

    <!-- 自定义tabbar -->
    <!-- <view class="tabbar" style="z-index: 999;position: fixed;bottom: 0;width: 100%;">
      <view class="custom-tabbar"
        style="height: 120px;background-color: green;display: flex;justify-content: center;align-items: center;color: white;">
        自定义tabbar
      </view>
    </view> -->
    <view class="tea-record">
      <view class="title">
        最近一次饮茶品种
      </view>
      <view class="theme-name">
        <text>Daydream</text>
        <view class="entry-icon" @click.stop="onChangeTouchDisable">
          点此禁用/开启滑动
        </view>
      </view>
      <view class="bottom-box">
        <view class="cup-icon">
          <image class="icon-cup" src="../../static/circle/icon-cup.png" mode=""></image>
        </view>
        <view class="drink-times">
          本周饮茶杯数:
          <text>4杯</text>
        </view>
      </view>
    </view>
    <!-- 开箱即用 -->
    <you-touchbox ref="touchBox" :disable="isTouchDisable" @get-end-detail="getEndDetail">
      <!-- 设置自定义样式 -->
      <!-- <you-touchbox customStyle="border-radius:25px;background:red;"> -->

      <!-- 设置高度，initTop用来设置首次加载时的高度，所以一般设为和minTop或maxTop一致，默认为与minTop一致 -->
      <!-- <you-touchbox initTop="max" minTop="100" maxTop="50" customStyle="border-radius:25px 25px 0 0;"> -->
      <!-- <you-touchbox initTop=".5" minTop=".1" maxTop=".89" customStyle="border-radius:25px 25px 0 0;"> -->
      <!-- <you-touchbox initTop="200" minTop="100" maxTop="50" customStyle="border-radius:25px 25px 0 0;"> -->

      <!-- 关闭自动复位 -->
      <!-- <you-touchbox :auto="false" :minTop=".3" customStyle="border-radius:25px 25px 0 0;"> -->

      <!-- 关闭滑动范围限制 -->
      <!-- <you-touchbox :limit="false" customStyle="border-radius:25px 25px 0 0;"> -->

      <!-- 自定义安全区域，请开启上方的自定义导航栏，tabbar,并关闭原声的 -->
      <!-- <you-touchbox initTop="1" minTop="50" :customSafeArea="{h5Top:100,wxTop:'menuBtn',bottom:120}"> -->
      <view style="padding: 0 50rpx;display: flex;flex-direction: column;height: 100%;" @click.stop>
        <view class="floor-header">
          热门系列茶
        </view>
        <scroll-view :scroll-y="isScrollY" style="flex: 1;height:1px;">
          <view class="floor-one">
            <view v-for="item in hotThemeListData" class="floor-item" :key="item.url"
              :style="{backgroundImage:'url('+ item.url+')'}" @click="onClickHotTea(item)">
              <view class="mask-box" style="background-color: rgba(51,51,51,.3);">
                <view class="text-box">
                  <view class="title">
                    {{item.title}}
                  </view>
                  <view class="subtitle">
                    {{item.subTitle}}
                  </view>
                </view>
              </view>
            </view>
            <view v-for="(item,index) in hotThemeListData" class="floor-item" :key="index"
              :style="{backgroundImage:'url('+ item.url+')'}" @click="onClickHotTea(item)">
              <view class="mask-box" style="background-color: rgba(51,51,51,.3);">
                <view class="text-box">
                  <view class="title">
                    {{item.title}}
                  </view>
                  <view class="subtitle">
                    {{item.subTitle}}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="floor-header">
          为你推荐
        </view>
        <view class="floor-two">
          <view v-for="(item,index) in foryouListData" :key="item.url" :style="{background:'url('+ item.url+')'}"
            class="floor-item">
            <view class="mask-box">
              <view class="title">
                {{item.name}}
              </view>
            </view>
          </view>
        </view>
        <view style="height: 20px;"></view>
      </view>
    </you-touchbox>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isTouchDisable: false, // 是否禁用滑动
        windowHeight: null,
        themeUrl: 'https://s2.loli.net/2022/02/26/l9b4TRreZAXod2k.png', // 主题背景
        show: false,
        title: '',
        content: '',
        showConfrimBtn: true,
        confirmText: '',
        isScrollY: false,
        hotThemeListData: [{
            url: 'https://s2.loli.net/2022/02/28/1RodruO6BkiXEKT.png',
            themeUrl: 'https://s2.loli.net/2022/02/26/l9b4TRreZAXod2k.png',
            title: 'DAYDREAM',
            subTitle: '蓝天白云'
          },
          {
            url: 'https://s2.loli.net/2022/02/28/DuYILFBscbGlSpx.png',
            themeUrl: 'https://s2.loli.net/2022/02/28/BTbaZAdyUfr1LtJ.png',
            title: 'WONDERLAND',
            subTitle: '海洋沙滩'
          },
          {
            url: 'https://s2.loli.net/2022/02/28/F68fLmZxBDrd7C2.png',
            themeUrl: 'https://s2.loli.net/2022/02/28/u7SHDVIy5Lj6olM.png',
            title: 'FROZEN ERA',
            subTitle: '雪山冰川'
          },
          {
            url: 'https://s2.loli.net/2022/02/28/Z6gbRxT94GSuQLO.png',
            themeUrl: 'https://s2.loli.net/2022/02/28/SZd1VC74R2NPtzX.png',
            title: 'GENTLE UNIVERSE',
            subTitle: '极光星空'
          }
        ],
        foryouListData: [{
          url: 'https://s2.loli.net/2022/02/28/9LipY2cRZuU35hm.png',
          name: '周边推荐'
        }, {
          url: 'https://s2.loli.net/2022/02/28/LyfD8UZCbshN21n.png',
          name: '浅谈茶文化'
        }]
      }
    },
    onReady() {
      this.windowHeight = uni.getSystemInfoSync().windowHeight
    },
    methods: {
      // 点击了热门茶系列
      onClickHotTea(item) {
        this.themeUrl = item.themeUrl
      },
      // 点击了页面
      onClickContent() {
        // 开关
        this.close = !this.close
        if (this.close) {
          this.$refs.touchBox.setBottom(0)
        } else {
          this.$refs.touchBox.setBottom(.5)
        }
      },
      getEndDetail({
        minTop,
        maxTop,
        curTop
      }) {
        // console.log(minTop, maxTop, curTop);
        if (curTop == maxTop) this.isScrollY = true
        else this.isScrollY = false
      },
      onChangeTouchDisable() {
        this.isTouchDisable = !this.isTouchDisable
        uni.showToast({
          title: this.isTouchDisable ? '已禁用滑动' : '已开启滑动',
          icon: 'none'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-circle {
    background-position: center -110px;
    background-repeat: no-repeat;
  }

  .left_back {
    display: flex;
    padding-left: 24rpx;

    image {
      width: 48rpx;
      height: 48rpx;
      padding-right: 14rpx;
    }

    text {
      font-size: 36rpx;
      font-weight: 0;
      line-height: 48rpx;
      color: #FFFFFF;
    }
  }

  .tea-record {
    padding: 30px 50rpx;

    .title {
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 0.0034000000000000002em;
      color: #FFFFFF;
    }

    .theme-name {
      @include flex-y-c;
      margin-top: 10px;
      height: 34px;
      font-size: 36px;
      line-height: 44px;
      color: #FFFFFF;
      text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;

      .entry-icon {
        @include flex-xy-c;
        padding: 0 10px;
        // margin-left: 20px;
        // margin-bottom: -10px;
        // width: 40px;
        height: 30px;
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0px 1px 7px rgba(100, 100, 100, 0.4);
        font-size: 12px;
      }
    }

    .bottom-box {
      @include flex-sb;
      margin-top: 150rpx;

      .cup-icon {
        @include flex-xy-c;
        width: 45px;
        height: 35px;
        border-radius: 28px;
        background: #333333;
        box-shadow: 0px 1px 7px rgba(51, 51, 51, 0.5);

        .icon-cup {
          width: 12px;
          height: 15px;
        }
      }

      .drink-times {
        @include flex-xy-c;
        width: 125px;
        height: 35px;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0px 1px 7px rgba(100, 100, 100, 0.4);
        font-size: 10px;
        line-height: 14px;
        color: #FFFFFF;

        text {
          margin-left: 5px;
          font-size: 14px;
          line-height: 20px;
          color: #FFFFFF;
        }
      }
    }
  }

  .drag-bar {
    @include flex-xy-c;
    height: 15px;

    .drag-icon {
      width: 45px;
      height: 5px;
      border-radius: 25px;
      background: rgba(51, 51, 51, 0.2);
    }
  }

  .floor-header {
    margin-bottom: 12.56rpx;
    height: 18px;
    font-size: 12px;
    line-height: 18px;
    color: #666666;
  }

  .floor-two {
    display: flex;
    justify-content: space-between;

    .floor-item {
      width: 314rpx;
      height: 160rpx;
      border-radius: 50rpx;
      background: rgba(51, 51, 51, 0.6);
    }
  }

  .floor-item {
    margin-bottom: 20rpx;
    height: 160rpx;
    border-radius: 50rpx;
    background: rgba(51, 51, 51, 0.3);
    text-align: center;
    background-position: center;
    background-size: cover;
  }

  .mask-box {
    @include flex-xy-c;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.6);
    border-radius: 25px;
  }

  .title {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
  }

  .subtitle {
    height: 20px;
    font-size: 10px;
    line-height: 20px;
    letter-spacing: 0.01em;
    color: #FFFFFF;
  }
</style>
