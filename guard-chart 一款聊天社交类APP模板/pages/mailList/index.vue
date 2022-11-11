<template>
  <view class="content">
    <view class="u-m-b-20">
			<u-cell-group>
				<u-cell-item class="new-people" icon="bell" title="新朋友">
          <u-badge type="error" :count="newCount" :offset="badgeOffset"></u-badge>
        </u-cell-item>
        <u-cell-item icon="heart" title="特别关注"></u-cell-item>
			</u-cell-group>
		</view>
    <u-index-list :scrollTop="scrollTop" class="index-list">
      <view v-for="(item, index) in indexList" :key="index">
        <u-index-anchor :index="item.letter" />
        <template v-for="(item2, index2) in item.data">
          <view class="list-cell" :key="index2">
            <image :src="item2.avatar"/><text>{{item2.name}}</text>
          </view>
        </template>
      </view>
      <u-divider class="index-list-divider">没有更多了</u-divider>
    </u-index-list>
    <!-- action-sheet -->
    <action-sheet ref="actionSheet"/>
  </view>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Ref} from 'vue-property-decorator'
import ActionSheet from '@/components/ActionSheet.vue'
@Component({
  name: 'MailList',
  components: { ActionSheet }
}) // 装饰器
export default class MailListPage extends Vue {
  @Ref('actionSheet') actionSheetRef: any
  private indexList: Array<object> = [
    {
      letter: 'A',
      data: [
        {
          name: 'A。李四',
          uuid: '0001',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。张三',
          uuid: '0002',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: 'A。王五',
          uuid: '0003',
          avatar: 'https://uviewui.com/common/logo.png'
        }
      ]
    }, {
      letter: 'B',
      data: [
        {
          name: '白娘子',
          uuid: '0004',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '白雪公主',
          uuid: '0005',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }, {
          name: '拜了个拜123',
          uuid: '0006',
          avatar: 'https://uviewui.com/common/logo.png'
        }
      ]
    }
  ]
  private scrollTop: number = 0
  private newCount: number = 2
  private badgeOffset: Array<number> = [36, 80]
  onPageScroll(e: any) {
    this.scrollTop = e.scrollTop
  }
  onNavigationBarButtonTap (event: any) {
    if (event['index'] === 0) {
      this.actionSheetRef.open()
    }
  }  
	mounted () {
    
  }
}
</script>

<style lang='scss' scoped>
  page {
    height: 100%!important;
  }
  .content {
    height: 100%;
  }
  .index-list {
    padding-bottom: 100upx;
  }
  .list-cell {
    padding: 20upx;
    border-bottom: 1px solid rgb(241, 235, 235);
    image {
      width: 120rpx;
      flex: 0 0 120rpx;
      height: 120rpx;
      border-radius: 8rpx;
      margin-left: 12rpx;
      vertical-align: middle;
    }
    text {
      vertical-align: middle;
      margin-left: 20upx;
    }
  }
  .index-list-divider {
    margin-top: 30upx!important;
  }
  .new-people {
    position: relative;
  }
</style>
