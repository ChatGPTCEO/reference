<template>
  <view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-140" @tap.stop="toUserinfo">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{name}}</view>
				<view class="u-font-14 u-tips-color">{{accountNum}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="phone" title="一键报警"></u-cell-item>
        <u-cell-item icon="bookmark" title="安全设置"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="kefu-ermai" title="用户反馈"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="系统设置" @click="toSetting"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator'
@Component({
  name: 'MinePage'
}) // 装饰器
export default class MinePage extends Vue {
	private pic: string = 'https://uviewui.com/common/logo.png'
  private show: boolean = true
  private name: string = '李帅武'
  private accountNum: string = 'shuaiwu123@foxmail.com'
  private toUserinfo () {
    uni.navigateTo({
      url: '/pages/mine/components/userinfo',
    })
  }
  private toSetting () {
    uni.navigateTo({
      url: '/pages/mine/components/setting',
    })
  }
}
</script>

<style lang="scss" scoped>
  .u-p-t-140 {
    padding-top: 140upx;
  }
</style>
