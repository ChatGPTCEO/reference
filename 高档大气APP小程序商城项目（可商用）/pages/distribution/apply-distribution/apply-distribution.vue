<template>
  <view>
    <view class="header-box">申请成为推广员</view>
    <view class="user-info-list">
      <view class="user-info-item">
        <view class="label">真实姓名</view>
        <view class="content">
          <input type="text" v-model="applyDistributionForm.realName" placeholder="请输入真实姓名"/>
        </view>
      </view>
      <view class="user-info-item">
        <view class="label">门店名称</view>
        <view class="content">
          <input type="text" v-model="applyDistributionForm.storeName" placeholder="请输入门店名称。如：李大白的小店"/>
        </view>
      </view>
      <view class="mt-2 row" @click="submitApplyDistribution">
        <view class="row bg-color font-s-5 rounded " style="width: 360rpx;height: 90rpx;">提交申请</view>
      </view>
    </view>
  </view>
</template>

<script>
import { checkIdCard } from '@/utils/util'
import {applyDistributionUrl} from '@/api/index'

export default {
  data () {
    return {
      applyDistributionForm: {
        idCard: '',
        realName: '',
        storeName: ''
      },
    }
  },
  methods: {
    submitApplyDistribution () {
      if (this.applyDistributionForm.realName == ''
        || this.applyDistributionForm.storeName == '') {
        return uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
      }
      this.$R.post(applyDistributionUrl,this.applyDistributionForm)
				.then(res=>{
					console.log(res)
					uni.showToast({
						title: '申请成功，系统正在审核！3秒后自动返回上一页',
						icon: 'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},3000)
				})
    },
  }
}
</script>

<style lang="scss">
  page {
    background-color: $uni-bg-color-grey;
  }
  .header-box {
    width: 100%;
    height: 416rpx;
    background-color: $bg-light-color;
    font-size: 60rpx;
    color: $uni-text-white-color;
    line-height: 416rpx;
    text-align: center;
  }

  .user-info-list {
    .user-info-item {
      background-color: #ffffff;
      border-radius: 8rpx;
      height: 80rpx;
      padding: 20rpx;
      color: #999999;
      border-bottom: 1px solid $uni-border-color;
			display: flex;
			justify-content: left;
      .label {
        height: 80rpx;
        line-height: 80rpx;
        vertical-align: top;
        margin-top: 2rpx;
        margin-right: 20rpx;
				width: 180rpx;
      }

      .content {
        height: 80rpx;
        line-height: 80rpx;
				width: 100%;
        input {
          display: inline-block;
          height: 80rpx;
          line-height: 80rpx;
					width: 100%;
        }
      }

    }
  }
</style>
