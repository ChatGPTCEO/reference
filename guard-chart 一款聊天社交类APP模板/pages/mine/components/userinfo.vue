<template>
  <view>
    <u-cell-group>
      <u-cell-item title="头像" :arrow="false">
        <view class="u-m-r-10" slot="right-icon">
          <u-avatar :src="pic" size="80"></u-avatar>
        </view>
      </u-cell-item>
      <u-cell-item title="昵称" :value="name"></u-cell-item>
      <u-cell-item title="二维码名片"></u-cell-item>
    </u-cell-group>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator'
@Component({
  name: 'UserInfoPage'
}) // 装饰器
export default class UserInfoPage extends Vue {
	private pic: string = 'https://uviewui.com/common/logo.png'
  private name: string = '李帅武'
}
</script>

<style lang="scss" scoped>
  .u-p-t-140 {
    padding-top: 140upx;
  }
</style>