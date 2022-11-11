<template>
    <block>
        <!-- gc_school/pages/vip/index.wxml -->
        <cu-custom bgColor="bgmains" :isBack="true">
            <view slot="content">商家会员</view>
        </cu-custom>

        <view class="box">
            <view :class="'item ' + (type == 1 ? 'active' : '')" @tap="current" data-type="1" :data-money="data.store_week_fee">
                <view class="name">周卡费用</view>
                <view>
                    ￥
                    <text>{{ data.store_week_fee }}</text>
                </view>
            </view>
            <view style="width: 16%"></view>
            <view :class="'item ' + (type == 2 ? 'active' : '')" @tap="current" data-type="2" :data-money="data.store_month_fee">
                <view class="name">月卡费用</view>
                <view>
                    ￥
                    <text>{{ data.store_month_fee }}</text>
                </view>
            </view>
        </view>

        <view v-if="userInfo.is_vip == 1" class="time">会员有效期至：{{ userInfo.dead_time }}</view>

        <view class="btns" @tap="submit">确认支付{{ money }}元</view>

        <view class="rule_line" v-if="false">
            开通前阅读
            <navigator url="/gc_school/pages/rule/index" class="rule" hover-class="none">《会员服务协议》</navigator>
        </view>
    </block>
</template>

<script>
// gc_school/pages/vip/index.js
var app = getApp();
export default {
    data() {
        return {
            money: 0.01,
            data: {
                store_week_fee: '',
                store_month_fee: ''
            },
            type: 1,
            userInfo: {
                is_vip: 0,
                dead_time: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        app.globalData.util.request({
            url: 'setting/view',

            success(res) {
				console.log(res)
                that.setData({
                    data: res.data.data.sys,
                    money: res.data.data.sys.store_week_fee
                });
            }
        },true);
        // this.getuserInfo();
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
        //获取用户信息
        // getuserInfo() {
        //     var that = this;
        //     app.globalData.util.request({
        //         url: 'entry/wxapp/UserInfo',
        //         data: {
        //             openid: uni.getStorageSync('openid')
        //         },

        //         success(res) {
        //             that.setData({
        //                 userInfo: res.data.data.info
        //             });
        //         }
        //     });
        // },

        current(e) {
            this.setData({
                type: e.currentTarget.dataset.type,
                money: e.currentTarget.dataset.money
            });
        },

        submit() {
            app.globalData.util.request({
                url: 'ZhBusiness/businessVipPay',
                data: {
                    money: this.money,
                    s_id: uni.getStorageSync('schoolId'),
                    type: this.type,
                    is_store: 1
                },

                success(res) {
					console.log(res.data.data.paydata)
                    uni.requestPayment({
                        timeStamp: res.data.data.paydata.timestamp,
                        nonceStr: res.data.data.paydata.nonceStr,
                        package: res.data.data.paydata.package,
                        signType: res.data.data.paydata.signType,
                        paySign: res.data.data.paydata.paySign,
                        success: function (res) {
                            console.log('success');
                            app.globalData.util.request({
                                url: 'entry/wxapp/testtest',
                                data: {}
                            });
                            uni.navigateTo({
                                url: '/gc_school/pages/user/index'
                            });
                        },
                        fail: function (res) {
					
                            console.log('fail',res);
                        }
                    });
                }
            },true);
        }
    }
};
</script>
<style>
/* gc_school/pages/vip/index.wxss */
page {
    background-color: white;
}
.bgmains {
    background-color: #ff6444;
    color: white;
}
.cuIcon-back {
    color: white;
}
.box {
    display: flex;
    margin-top: 120rpx;
    padding: 0 10%;
}

.item {
    flex: 1;
    height: 220rpx;
    text-align: center;
    /* line-height: 170rpx; */
    font-size: 30rpx;
    color: #dfaa4c;
    border-radius: 10rpx;
    border: 4rpx solid gray;
    /* box-shadow: 2rpx 2rpx 2rpx 2rpx #F9F9F9; */
}
.active {
    border: 4rpx solid #d2af56;
    background-color: #fdf1db;
}
.item .name {
    margin: 40rpx 0 20rpx;
    color: black;
}
.item text {
    font-size: 46rpx;
}
.btns {
    margin: 150rpx 10% 60rpx;
    width: 80%;
    height: 100rpx;
    line-height: 100rpx;
    background-color: #f5cf69;
    text-align: center;
    border-radius: 60rpx;
    font-size: 32rpx;
    font-weight: bold;
}
.time {
    margin-top: 100rpx;
    text-align: center;
    font-size: 32rpx;
}
.rule_line {
    display: flex;
    font-size: 30rpx;
    justify-content: center;
}
.rule {
    /* color: #747474; */
    /* color: #F5CF69; */
    font-weight: bold;
}
</style>
