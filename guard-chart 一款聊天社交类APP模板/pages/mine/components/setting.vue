<template>
  <view>
    <u-cell-group>
      <u-cell-item title="修改密码"></u-cell-item>
      <u-cell-item title="关于Guard"></u-cell-item>
    </u-cell-group>
    <view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="退出" @click="toLogin"></u-cell-item>
			</u-cell-group>
		</view>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator'
@Component({
  name: 'Setting'
}) // 装饰器
export default class SettingPage extends Vue {
	private toLogin () {
    uni.navigateTo({
      url: '/pages/login/index',
    })
  }
}
</script>

<style lang="scss" scoped>
  .u-p-t-140 {
    padding-top: 140upx;
  }
</style>