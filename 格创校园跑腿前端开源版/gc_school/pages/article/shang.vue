<!--
 * @name: 赞赏统计
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-03-28 17:46:07
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-03-28 18:07:14
-->
<template>
    <view>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">打赏数</view>
        </cu-custom>
        <block v-for="(item,index) in detail.reward_user_list" :key="index">
            <view class="shang row margin-lr margin-top padding">
                <image class="avatar" :src="item.avatar" mode="" />
                <view class="margin-left">
                    <view class="nickname">{{item.nickname}}</view>
                    <view class="time">{{item.pay_time}}</view>
                </view>
                <view class="price">￥{{item.price}}</view>
            </view>
        
        </block>
         <block v-if="detail.reward_user_list.length == 0">
            <view class="text-center margin-top text-df">暂无打赏数~</view>
        </block>
    </view>
</template>
<script>
var app = getApp();
export default {
    data() {
        return {
            shang:[],
            detail:{}
        }
    },
    onLoad(options)  {
        this.getDetail(options.art_id)
    },
    methods:{
        getDetail(id) {
				var that = this;
				app.globalData.util.request({
					url: 'ZhArticles/view',
					method: 'GET',
					data: {
						s_id: uni.getStorageSync('schoolId'),
						article_id: id,
						type:1
					},

					success(res) {
						console.log(res.data.data);
						that.setData({
							detail: res.data.data,
							// comment_list: res.data.data.comment
						});
					}
				}, true);
			},
    }
}
</script>
<style lang="scss">
    .shang{
        width: 690rpx;
        height: 150rpx;
        background: #FFFFFF;
        border-radius: 20rpx;
        .avatar{
            width: 90rpx;
            height: 90rpx;
            border-radius: 50%;
        }
        .nickname{
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #141414;
        }
        .time{
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
        }
        .price{
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FE0000;
            margin-left: auto;
        }
    }
</style>