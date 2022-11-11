<template>
  <view class="content">
    <u-navbar
      title="社区"
      is-fixed
      :is-back="false"
      title-color="rgb(0, 0, 0)"
      :border-bottom="false"
      :background="{ background: 'rgb(248, 248, 248)' }">
      <view slot="right" class="nav-search">
        <u-icon name="/static/img/search.png" size="42"></u-icon>
      </view>
    </u-navbar>
    <!-- 发布按钮 -->
    <view class="send-menu" @tap="release">
      <view class="icon xiangji"></view>
    </view>
    <!-- 信息 -->
    <u-tabs class="tab-style" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
    <!-- 广场 -->
    <view v-show="current === 1">
      <ListCard/>
      <ListCard/>
      <!-- end -->
      <u-divider class="index-list-divider">没有更多了</u-divider>
    </view>
    <!-- 发布动态 -->
    <u-popup
      v-model="showModel"
      :closeable="false"
      close-icon-pos="top-left"
      mode="bottom"
      width="750rpx"
      height="100%">
      <view :style="[{marginTop: `${statusBarHeight}px`}]">
        <u-navbar
          title="新动态"
          back-icon-size="28"
          back-icon-name="close"
          :custom-back="() => {showModel = false}">
          <view slot="right" class="nav-search-btn">
            <u-button type="primary" size="mini" ripple shape="circle">发布</u-button>
          </view>
        </u-navbar>
        <textarea
          height="50upx"
          v-model="textMsg"
          @focus="textareaFocus"
          placeholder="分享你的心情~（最多200字）"
          :maxlength="200"
          style="overflow: auto;padding: 0 30upx;"
        />
        <u-upload
          class="upload-img"
          ref="uUpload"
          :action="action"
          :auto-upload="false"
          width="166upx"
          height="166upx"
        ></u-upload>
        <view class="u-m-t-20">
          <u-cell-group>
            <u-cell-item icon="map-fill" title="你在哪里"></u-cell-item>
          </u-cell-group>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator'
import ListCard from './components/card.vue'
@Component({
  name: 'CommunityPage',
  components: { ListCard }
}) // 装饰器
export default class CommunityPage extends Vue {
  @Watch('showModel')
  showModelChange (newVal: boolean) {
    if (newVal) {
      uni.hideTabBar()
    } else {
      uni.showTabBar()
    }
  }
	private list: Array<object> = [{
    name: '好友'
  }, {
    name: '广场'
  }, {
    name: '本地'
  }]
  private current: number = 1
  private showModel: Boolean = false
  private statusBarHeight: number = 0
  private textMsg: any = ''
  private action: string = ''
  change(index: number) {
    this.current = index
  }

  /* 打开发布消息弹窗 */
  private release () {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
    this.showModel = true
  }

  /* 获取输入框焦点 */
  private textareaFocus () {}
}
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    padding-bottom: 160upx;
    position: relative;
  }
  .index-list-divider {
    margin-top: 60upx!important;
  }
  .tab-style {
    position: sticky;
    top: 135upx;
    z-index: 9999;
  }
  /* #ifdef H5 */
  .tab-style {
    position: sticky;
    top: 80upx;
    z-index: 9999;
  }
  /* #endif */
  .send-menu {
    padding: 10upx;
    background-color: #2979ff;
    width: 90upx;
    height: 90upx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    box-shadow: 1px 3px 13px #939090;
    position: fixed;
    right: 60upx;
    bottom: 120upx;
    z-index: 10;
    >view {
      font-size: 40upx;
      color: #ffffff;
    }
  }
  .nav-search {
    margin-right: 30upx;
  }
  .nav-search-btn {
    margin-right: 30upx;
  }
</style>
<style>
  .upload-img .u-delete-icon {
    background-color: #2979ff!important;
  }
</style>
