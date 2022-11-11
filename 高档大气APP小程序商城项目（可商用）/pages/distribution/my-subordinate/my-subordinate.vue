<template>
  <view>
    <!-- 加载动画 -->
    <orange-fullloading
      text="加载中"
      :loadshow="loadingStatus">
    </orange-fullloading>

    <view class="subordinate-list">
      <view class="subordinate-item d-f justify-start" v-for="item in mySubordinateList"
            :key="item.id" @click="seeMyLowest(item)">
        <image :src="item.image" class="header border rounded-50"></image>
        <view class="other-info">
          <view class="name-level">
            <view class="name">{{item.name}}</view>
            <view class="level">
              <view class="text-success" v-if="item.levelId ==1">{{item.levelName}}</view>
              <view class="text-info" v-else-if="item.levelId ==2">{{item.levelName}}</view>
              <view class="text-warning" v-else>{{item.levelName}}</view>
            </view>
          </view>
          <view class="phone">{{item.mobile}}</view>
          <view class="time">{{item.created_at}}</view>
        </view>
        <view class="lowest-num" v-if="isLowestStatus">
          下级（{{item.lowestLevelNums}}）人 >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mySubordinateListUrl } from '@/api/index'

export default {
  data () {
    return {
      mySubordinateList: [],
      loadingStatus: true,
      queryInfo: {
        distributeUserId:'',
        pageSize: 10,
        page: 1,
        field: '',
        desc: '',
      },
      total: 0,
      isLowestStatus:true
    }
  },
  onLoad () {
    this.initData()
  },
  // 上划加载
  onReachBottom () {
    this.onReachBottomHandle()
  },
  methods: {
    initData () {
      this.getMySubordinateList()
      // 异步延迟加载
      setTimeout(() => {
        this.loadingStatus = false
      }, 100)
    },
    onReachBottomHandle () {
      console.log(1)
      // 触底事件
      if (this.total != this.profitList.length) {
        this.queryInfo.page++
        this.getMySubordinateList()
      }
    },
    // 获取我的下级列表
    getMySubordinateList (id) {
      if(id){
        this.queryInfo.distributeUserId = id
      }else {
        let distributionUserInfo = uni.getStorageSync('distributionUserInfo')
        this.queryInfo.distributeUserId = distributionUserInfo.id
      }

      this.$R.get(mySubordinateListUrl,this.queryInfo)
        .then(res => {
          console.log(res)
          this.mySubordinateList = [...this.mySubordinateList,...res.data.list]
        })
    },
    // 查看我的下级
    seeMyLowest(item){
      if(this.isLowestStatus){
        this.isLowestStatus = false
        this.mySubordinateList = []
        this.queryInfo.page = 1
        this.getMySubordinateList(item.id)
      }
    }
  }
}
</script>

<style lang="scss">
  page {
    background-color: $uni-bg-color-grey;
  }
	
  .subordinate-list {
    padding: 20rpx;

    .subordinate-item {
      background-color: $uni-bg-color;
      padding: 20rpx;
      margin-top: 20rpx;
      border-radius: 20rpx;
      position: relative;
      .header {
        width: 140rpx;
        height: 140rpx;
      }

      .other-info {
        margin-left: 30rpx;
        .name-level{
          height: 60rpx;
          line-height: 60rpx;
          .name{
            display: inline-block;
            font-size: 28rpx;
            color: #333333;
            font-weight: bold;
          }
          .level{
            display: inline-block;
            font-size: 30rpx;
            margin-left: 10rpx;
          }
        }
        .phone{
          font-size: 26rpx;
          height: 46rpx;
          line-height: 46rpx;
          color: #333333;
        }
        .time{
          font-size: 22rpx;
          height: 46rpx;
          line-height: 46rpx;
          color: #999999;
        }
      }
      .lowest-num{
        position: absolute;
        right: 20rpx;
        height: 40rpx;
        line-height: 40rpx;
        top: 50%;
        margin-top: -20rpx;
        font-size: 26rpx;
      }
    }
  }
</style>
