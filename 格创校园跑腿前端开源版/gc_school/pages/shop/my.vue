<template>
    <block>
        <!-- gc_school/pages/shop/my.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的小店</view>
        </cu-custom>

        <!-- <view class="title text-center text-lg">欢迎您，老潼关肉夹馍</view> -->

        <view class="flex justify-between bg-white padding text-lg margin-bottom margin-top-sm">
            <view>所属学校</view>
            <view class="">{{ data.school_name?data.school_name:'学校不存在' }}</view>
        </view>

        <view class="list">
            <view class="list_item">
                <view>今日订单数</view>
                <view class="num">{{ data.order_day_num }}</view>
            </view>
            <view class="list_item">
                <view>总订单数</view>
                <view class="num">{{ data.order_num }}</view>
            </view>
            <view class="list_item">
                <view>总收入</view>
                <view class="num">{{ data.sumMoney }}</view>
            </view>
        </view>

        <view class="flex justify-between bg-white padding text-lg margin-bottom">
            <view>到期时间</view>
            <view class="text-red">{{ data.expire_time }}</view>
        </view>

        <view class="menu">
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/recharge">
                <image src="/static/images/store/recharge.png"></image>
                <view>会员充值</view>
            </view>
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/info">
                <image src="/static/images/store/store.png"></image>
                <view>店铺管理</view>
            </view>
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/order">
                <image src="/static/images/store/order.png"></image>
                <view>订单列表</view>
            </view>
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/cate">
                <image src="/static/images/store/cate.png"></image>
                <view>分类管理</view>
            </view>
            <view class="menu_item" @tap="jump" data-url="/gc_school/pages/shop/goods">
                <image src="/static/images/store/goods.png"></image>
                <view>商品管理</view>
            </view>
        </view>
    </block>
</template>

<script>
// gc_school/pages/shop/my.js
var app = getApp();
export default {
    data() {
        return {
            data: {
                today_count: 0,
                total_count: 0,
                total_sum: 0,
                school: '',

                store: {
                    deadtime: ''
                }
            },
            id: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log(options);

        if (options.id) {
            this.setData({
                id: options.id
            });
        }

        
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
		this.getStore();
	},
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
    // onShareAppMessage: function () {
    // }
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ 
	methods: {
        getStore() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhBusiness/index',
				method: 'GET',
                data: {
                    id: this.id
                },

                success(res) {
                    that.setData({
                        data: res.data.data
                    });
                }
            },true);
        },

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
/* gc_school/pages/shop/my.wxss */
page {
    /* background: white; */
}
.title {
    background: white;
    margin-top: -10rpx;
    line-height: 120rpx;
    margin-bottom: 30rpx;
}

.list {
    margin-top: -15rpx;
    background: white;
    display: flex;
    margin-bottom: 30rpx;
    padding: 40rpx 0 20rpx;
    text-align: center;
    font-size: 30rpx;
    line-height: 60rpx;
}
.list_item {
    width: 50%;
    border-right: 1rpx solid #f2f2f2;
    /* border: 1rpx solid #F2F2F2; */
}
.list_item .num {
    font-weight: bold;
    font-size: 36rpx;
}

.menu {
    display: flex;
    flex-wrap: wrap;
    background: white;
}
.menu_item {
    text-align: center;
    font-size: 30rpx;
    width: 50%;
    border-right: 1rpx solid #f2f2f2;
    border-bottom: 1rpx solid #f2f2f2;
    padding: 50rpx 0;
}
.menu_item image {
    width: 95rpx;
    height: 95rpx;
    margin-bottom: 20rpx;
}
</style>
