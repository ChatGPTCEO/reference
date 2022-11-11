<template>
    <block>
        <!-- gc_school/pages/shop/order.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">订单列表</view>
        </cu-custom>

        <view class="tab_menu">
            <view :class="'item ' + (tab_index == 3 ? 'active' : '')" @tap="changeTab" data-index="3">待取货</view>
            <view :class="'item ' + (tab_index == 7 ? 'active' : '')" @tap="changeTab" data-index="7">待送达</view>
            <view :class="'item ' + (tab_index == 4 ? 'active' : '')" @tap="changeTab" data-index="4">已完成</view>
        </view>

        <view class="order_box">
            <block v-if="orderList.length > 0">
                <block v-for="(item, index) in orderList" :key="index">
                    <view class="order_item">
                        <view class="text-df text-grey">下单时间：{{ item.start_time }}</view>
                        <view class="text-df text-grey">用户姓名：{{ item.sh_name }}</view>
                        <view class="text-df text-grey">用户手机号：{{ item.sh_phone }}</view>
                        <view class="text-df">商品信息</view>
                        <block v-for="(good, index1) in item.good_details" :key="index1">
                            <view class="text-df">{{ good }}</view>
                        </block>
                        <view class="flex justify-between margin-top align-center">
                            <view class="text-df" style="line-height: 50rpx">
                                <!-- <view>抽成金额:￥{{item.store_money}}</view> -->
                                <!-- <view>商品价格:￥{{item.guess_prcie}}</view> -->
                                <!-- <view>商家实得:<text class="text-orange text-bold text-xl">￥{{my.tofixed(item.guess_prcie-item.store_money)}}</text></view> -->
                                <view>
                                    商品价格:
                                    <text class="text-orange text-bold text-xl">￥{{ my.tofixed(item.food_money) }}</text>
                                </view>
                            </view>
                            <!-- <view class="status">{{ item.status }}</view> -->
                        </view>
                    </view>
                </block>
            </block>
            <block v-else>
                <view class="empty">
                    <image class="" src="/static/images/store/empty.png" mode="widthFix"></image>
                    <view>暂无相关数据~</view>
                </view>
            </block>

            <view class="text-df text-center margin-bottom" v-if="!is_loadmore && orderList.length > 0">暂无更多数据~</view>
        </view>
    </block>
</template>
<script module="my" lang="wxs">
var tofixed = function(str) {
if(str =='NaN'){
		return 0;
}else{
		var pick = parseFloat(str).toFixed(2);
		console.log(pick);
  		return pick;
}

}
module.exports.tofixed = tofixed
</script>
<script>
// gc_school/pages/shop/order.js
var app = getApp();
export default {
    data() {
        return {
            orderList: [],
            tab_index: 3,
            is_loadmore: true,
            page: 1,
            good: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getOrder();
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
    // onShareAppMessage: function () {
    // }
    onReachBottom: function () {
        if (this.is_loadmore) {
            this.setData({
                page: this.page + 1
            });
            this.getOrder();
        }
    },
    /**
     * 用户点击右上角分享
     */ methods: {
        getOrder() {
            var that = this;
            app.globalData.util.request({
                url: 'ZhBusiness/businessOrderList',
				method: 'GET',
                data: {
                    page: this.page,
                    status: this.tab_index,
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    if (res.data.data.data.length < 5) {
                        that.setData({
                            is_loadmore: false
                        });
                    }
					console.log(res.data.data.data)
                    var datas = [...that.orderList, ...res.data.data.data];
                    that.setData({
                        orderList: datas
                    });
                }
            },true);
        },

        changeTab(e) {
            // console.log(e.currentTarget.dataset.index)
            this.setData({
                tab_index: e.currentTarget.dataset.index,
                page: 1,
                orderList: [],
                is_loadmore: true
            });
            this.getOrder();
        }
    }
};
</script>
<style>
/* gc_school/pages/shop/order.wxss */
page {
    background-color: white;
}
.tab_menu {
    display: flex;
    padding: 20rpx 0;
}
.tab_menu .item {
    font-size: 32rpx;
    width: 33.3%;
    text-align: center;
    line-height: 70rpx;
    border-bottom: 1rpx solid #f9f9f9;
    margin-bottom: 30rpx;
    position: relative;
    padding-bottom: 10rpx;
}
.active::after {
    content: '';
    position: absolute;
    width: 55rpx;
    height: 6rpx;
    transform: translateX(-50%);
    left: 50%;
    margin: 0 auto;
    bottom: 0;
    background-color: #ff6344;
}
.order_item {
    width: 90%;
    margin: 10rpx 0 50rpx 5%;
    padding: 30rpx;
    border-radius: 15rpx;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
}
.text-sm,
text-df {
    line-height: 55rpx;
}
.status {
    border: 1rpx solid #999999;
    padding: 5rpx 20rpx;
    color: #323232;
}
.empty {
    margin: 100rpx auto;
    text-align: center;
    font-size: 30rpx;
    color: gray;
}
.empty image {
    width: 300rpx;
    /* height: 200rpx; */
}
</style>
