<template>
    <block>
        <!-- gc_school/pages/shop/index.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的小店</view>
        </cu-custom>

        <view class="flex tongji justify-between">
            <view class="text-white">
                <view class="text-xxl">66.00</view>
                <view class="text-sm small">今日订单收入/元</view>
            </view>
            <view class="text-white">
                <view class="text-xxl">8</view>
                <view class="text-sm small">今日订单数量/单</view>
            </view>
        </view>

        <view class="store">门店管理</view>
        <view class="menu flex">
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/info">
                <image src="/static/images/dianpu.png"></image>
                <view>店铺管理</view>
            </view>
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/cate">
                <image src="/static/images/goods.png"></image>
                <view>分类管理</view>
            </view>
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/goods">
                <image src="/static/images/message.png"></image>
                <view>商品管理</view>
            </view>
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/order">
                <image src="/static/images/message.png"></image>
                <view>订单列表</view>
            </view>
        </view>

        <view class="box">
            <view class="box_item">
                <view class="grey text-df margin-bottom-sm">可提现余额</view>
                <view class="flex align-center justify-between">
                    <text class="text-xxl orange">26.00</text>
                    <view class="tixian">去提现</view>
                </view>
            </view>
            <view class="box_item flex align-center margin-top margin-bottom justify-between">
                <view class="text-df text-bold">总收入</view>
                <view class="text-lg text-bold">￥2340.90元</view>
            </view>
            <view class="box_item flex align-center margin-top margin-bottom justify-between">
                <view class="text-df text-bold">提现记录</view>
                <view class="cuIcon-right text-lg"></view>
            </view>
        </view>
    </block>
</template>

<script>
// gc_school/pages/shop/index.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log(options);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        jump(e) {
            console.log(e.currentTarget.dataset.url);

            if (e.currentTarget.dataset.url) {
                uni.navigateTo({
                    url: e.currentTarget.dataset.url
                });
            }
        }
    }
};
</script>
<style>
/* gc_school/pages/shop/index.wxss */
page {
}
.tongji {
    background: #ff6344;
    /* height: 200rpx; */
    width: 100%;
    padding: 90rpx 70rpx 30rpx;
    text-align: center;
    line-height: 44rpx;
    margin-top: -15rpx;
}
.small {
    color: white;
}
.store {
    border-bottom: 1rpx solid #ebebeb;
    background: white;
    font-size: 32rpx;
    padding: 30rpx 40rpx;
    color: #999999;
}
.menu {
    background: white;
    padding: 30rpx 40rpx;
}
.menu_item {
    font-size: 28rpx;
    text-align: center;
    flex: 1;
}
.menu_item image {
    width: 50rpx;
    height: 50rpx;
    margin-bottom: 15rpx;
}
.box {
    padding: 30rpx 40rpx;
}
.grey {
    color: #999999;
}
.box {
    background: white;
    margin-top: 30rpx;
}
.orange {
    color: #ffba20;
}
.box_item {
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #ebebeb;
}
.tixian {
    padding: 14rpx 28rpx;
    border: 1rpx solid #ffba20;
    border-radius: 10rpx;
    color: #ffba20;
}
</style>
