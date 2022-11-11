<template>
  <view>
    <view class="prod-container" @click="toProduct">
      <image class="prod__img" v-if="groupBuyingDetail.img" :src="groupBuyingDetail.img.img"></image>
      <view class="prod-info">
        <view class="prod__title">{{groupBuyingDetail.title}}</view>
        <text class="prod_label">{{groupBuyingDetail.peopleCount}}人团</text>
        <view class="price">
          <view class="group__price">￥{{groupBuyingDetail.price}}</view>
          <view class="original__price">￥{{groupBuyingDetail.originalPrice}}</view>
        </view>
      </view>
    </view>
    <view class="active-tip">该商品所有用户均可开团</view>
		<view class="division__block"></view>
		<view class="group-container">
			<view class="group__count" v-if="groupBuyingDetail.userData">
				还差<text>{{groupBuyingDetail.peopleCount - groupBuyingDetail.userData.length}}</text>人成团
			</view>
			<view class="group__time">{{groupBuyingDetail.formatTime}}结束</view>
			<button class="btn__invitation" open-type="share" @click="shareGroup">邀请好友拼团</button>
		</view>
		<view class="division__block"></view>
		<view class="group-person" v-if="groupBuyingDetail.userData && groupBuyingDetail.userData.length">
			<view class="person-list">
				<view class="person-item" v-for="(item,index) in groupBuyingDetail.userData">
					<image class="person__header" v-if="item.image" :src="item.image"></image>
					<view class="tag" v-if="item.identity === 'head'">团长</view>
				</view>
			</view>
			<view class="start-time">
				<view class="text">参团时间</view>
				<view class="time">{{groupBuyingDetail.createdAt}}</view>
			</view>
		</view>
  </view>
</template>

<script>
import {
  getMyGroupBuyingDetailUrl
} from '@/api/index.js'
import { getYMDHMS } from '@/utils/util';
export default {
  data () {
    return {
      groupBuyingDetail: {}
    }
  },
  onLoad (option) {
    this.initData(option)
  },
  methods: {
    initData (option) {
      let uuid = option.uuid
      this.getGroupBuyingDetail(uuid)
    },
    getGroupBuyingDetail (uuid) {
      this.$R.get(getMyGroupBuyingDetailUrl + uuid).then(res => {
        this.groupBuyingDetail = res.data
				this.$set(this.groupBuyingDetail,'formatTime',getYMDHMS(this.groupBuyingDetail.endTime))
        console.log(this.groupBuyingDetail)
      })
    },
		// 分享
		shareGroup(){
    	this.onShareAppMessage()
		},
		onShareAppMessage() {
			return {
				title:'一起拼团，享受优惠吧', //分享标题名称
				path: `/pages/product/product?pageStatus=groupBuying&activityId=${this.groupBuyingDetail.collageId}&uuid=${this.groupBuyingDetail.uuid}`,
				imageUrl:this.groupBuyingDetail.img.img,// 分享封面图片
				success(res){ // 分享成功回调
					console.log(res)
				}
			}
		},
		// 跳转到商品拼团详情页
		toProduct(){
			uni.navigateTo({
				url: `/pages/product/product?pageStatus=groupBuying&activityId=${this.groupBuyingDetail.collageId}`,
			});
		}
  }
}
</script>

<style lang="less" scoped>
	.division__block{
		height: 20rpx;
		background-color: #f5f5f5;
		width: 100%;
	}
  .prod-container {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #ddd;

    .prod__img {
      width: 200rpx;
      height: 200rpx;
      margin-right: 20rpx;
    }

    .prod-info {
      width: 470rpx;

      .prod__title {
        font-size: 30rpx;
        color: #333;
        margin-bottom: 16rpx;
				overflow:hidden;
				text-overflow:ellipsis;
				display:-webkit-box;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
			}

      .prod_label {
        margin-top: 16rpx;
        font-size: 22rpx;
        color: #fff;
        height: 28rpx;
        line-height: 28rpx;
        padding: 0 10rpx;
        background-color: #fe2841;
      }

      .price {
        margin-top: 16rpx;
        display: flex;

        .group__price {
          font-size: 36rpx;
          color: #fe2841;
        }

        .original__price {
          text-decoration: line-through;
          font-size: 24rpx;
          color: #999;
          margin-top: 12rpx;
          margin-left: 20rpx;
        }
      }
    }
  }

  .active-tip {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 26rpx;
    color: #333;
    padding-left: 20rpx;
  }
	.group-container{
		text-align: center;
		.group__count{
			font-size: 40rpx;
			color: #333;
			padding-top: 20rpx;
			text{
				color: #fe2841;
			}
		}
		.group__time{
			font-size: 28rpx;
			color: #333;
			padding-top: 20rpx;
		}
		.btn__invitation{
			margin: 20rpx 40rpx 40rpx;
			text-align: center;
			background-color: #fe2841;
			color: #fff;
			height: 80rpx;
			line-height: 80rpx;
		}
	}
	.group-person{
		margin-top: 20rpx;
		.person-list{
			padding: 20rpx;
			display: flex;
			justify-content: space-around;
			border-bottom: 1px solid #ddd;
			.person-item{
				position: relative;
				.person__header{
					width: 100rpx;
					height: 100rpx;
					margin-right: 20rpx;
				}
				.tag{
					position: absolute;
					right: 0;
					bottom: 0;
					border-radius: 10rpx;
					background-color: #fe2841;
					color: #fff;
					height: 26rpx;
					line-height: 26rpx;
					font-size: 22rpx;
					padding: 0 10rpx;
				}
			}
		}
		.start-time{
			margin-top: 20rpx;
			line-height: 60rpx;
			color: #333;
			font-size: 26rpx;
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
		}
	}
</style>
