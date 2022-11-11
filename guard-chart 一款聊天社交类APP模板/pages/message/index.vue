<template>
  <view class="content">
    <u-swipe-action :show="item.show" :index="index" 
			v-for="(item, index) in list" :key="item.id" 
			@click="click" @open="open"
			:options="options"
		>
			<view class="item u-border-bottom">
				<view class="list-cell" @tap.stop="doMessage(item)">
          <image :src="item.avatar"/>
          <view>
            <text>{{item.name}}</text>
            <text>{{item.message}}</text>
          </view>
          <text class="list-time">{{item.time}}</text>
          <u-badge v-if="!item.isRead" type="error" :is-dot="true" :offset="badgeOffset"></u-badge>
        </view>
			</view>
		</u-swipe-action>
    <u-divider class="index-list-divider">没有更多了</u-divider>
    <!-- action-sheet -->
    <action-sheet ref="actionSheet"/>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref} from 'vue-property-decorator'
import ActionSheet from '@/components/ActionSheet.vue'
@Component({
  name: 'MessagePage',
  components: { ActionSheet }
}) // 装饰器
export default class MessagePage extends Vue {
  @Ref('actionSheet') actionSheetRef: any
  private list: Array<object> = [
    {
      id: 1,
      name: '我最可爱的媳妇儿',
      accountNum: '123@gmail.com',
      avatar: 'https://cdn.uviewui.com/uview/common/logo.png',
      message: '吃饭了吗？',
      time: '2021/06/06 1:55',
      isRead: false,
      show: false
    },
    {
      id: 2,
      name: '甜心honey',
      accountNum: '233@gmail.com',
      avatar: 'https://cdn.uviewui.com/uview/common/logo.png',
      message: '吃饭了吗？吃饭了吗？吃饭了吗？吃饭了吗？吃饭了吗？吃饭了吗？吃饭了吗？吃饭了吗？',
      time: '2021/06/06 1:55',
      isRead: true,
      show: false
    }
  ]
  private badgeOffset: Array<number> = [36, 600]
  private disabled: boolean = false
	private btnWidth: number = 180
	private show: boolean = false
	private	options: Array<object> = [
    {
      text: '置顶',
      style: {
        backgroundColor: '#007aff'
      }
    },
    {
      text: '删除',
      style: {
        backgroundColor: '#dd524d'
      }
    }
  ]
  private click(index: number, index1: number) {
    if(index1 == 1) {
      // 删除
    } else {
      // 置顶
    }
  }
  private open(index: number) {
    (<any>this.list[index]).show = true;
    this.list.map((val, idx) => {
      if(index != idx) (<any>this.list[idx]).show = false
    })
  }
  private onNavigationBarButtonTap (event: any) {  
    if (event['index'] === 0) {
      this.actionSheetRef.open()
    }
  }
  /* 打开聊天窗口 */
  private doMessage (params: any) {
    uni.navigateTo({
      url: '/pages/message/components/msgChart?data=' + JSON.stringify(params)
    })
  }
	mounted () {
    
  }
}
</script>

<style lang="scss" scoped>
  page {
    height: 100%!important;
  }
  .content {
    height: 100%;
    padding-bottom: 100upx;
  }
  .list-cell {
    position: relative;
    padding: 20upx;
    border-bottom: 1px solid rgb(241, 235, 235);
    display: flex;
    flex-direction: row;
    image {
      width: 120rpx;
      flex: 0 0 120rpx;
      height: 120rpx;
      border-radius: 8rpx;
      margin-left: 12rpx;
      vertical-align: middle;
    }
    >view {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20upx;
      text {
        &:nth-child(1) {
          font-weight: bold;
          font-size: 30upx;
        }
        &:nth-child(2) {
          font-size: 26upx;
          color: rgb(112, 109, 109);
          display: inline-block;
          width: 500upx;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
      }
    }
  }
  .index-list-divider {
    margin-top: 30upx!important;
  }
  .list-time {
    position: absolute;
    right: 40upx;
    top: 20upx;
    font-size: 26upx;
    color: rgb(112, 109, 109);
  }
</style>
