<template>
    <block>
        <!-- gc_school/pages/vip/index.wxml -->
        <cu-custom bgColor="bgmains" :isBack="true">
            <view slot="content">VIP会员</view>
        </cu-custom>

        <view class="box">
            <view :class="'item ' + (type == 1 ? 'active' : '')" @tap="current" data-type="1" :data-money="data.user_month_fee">
                <view class="name">包月费用</view>
                <view>
                    ￥
                    <text>{{ data.user_month_fee }}</text>
                </view>
            </view>
            <view style="width: 16%"></view>
            <view :class="'item ' + (type == 2 ? 'active' : '')" @tap="current" data-type="2" :data-money="data.user_year_fee">
                <view class="name">包年费用</view>
                <view>
                    ￥
                    <text>{{ data.user_year_fee }}</text>
                </view>
            </view>
        </view>

        <view v-if="userInfo.is_vip == 1" class="time">会员有效期至：{{ userInfo.deadtime }}</view>


        <view class="rule_line align-center">
			<checkbox class="checkbox" :checked="check" @tap="checkagree"></checkbox>
            开通前阅读
            <navigator url="/gc_school/pages/rule/index" class="rule" hover-class="none">《会员服务协议》</navigator>
        </view>
		
        <view class="btns" @tap="submit">确认支付{{ money }}元</view>
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
                user_month_fee: '',
                user_year_fee: ''
            },
            type: 1,
            userInfo: {
                is_vip: 0,
                dead_time: ''
            },
			check:false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        app.globalData.util.request({
            url: 'Setting/view',
            success(res) {
                that.setData({
                    data: res.data.data.sys,
                    money: res.data.data.sys.user_month_fee
                });
            }
        });
        this.getuserInfo();
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
		//协议勾选
		checkagree() {
		    this.setData({
		        check: !this.check
		    });
		},
        //获取用户信息
        getuserInfo() {
            var that = this;
            app.globalData.util.request({
                url: 'WechatUser/view',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },
                success(res) {
                    that.setData({
                        userInfo: res.data.data
                    });
                }
            },true);
        },

        current(e) {
            this.setData({
                type: e.currentTarget.dataset.type,
                money: e.currentTarget.dataset.money
            });
        },

        submit() {
			if (!this.check) {
			    app.globalData.util.message('请先勾选协议', '', 'error');
			    return false;
			}
            app.globalData.util.request({
                url: 'Pay/pay',
                data: {
                    price: this.money,
                    type: this.type
                },

                success(res) {
					console.log("支付参数",res.data.data)
                    uni.requestPayment({
                        timeStamp: res.data.data.timeStamp.toString(),
                        nonceStr: res.data.data.nonceStr,
                        package: res.data.data.package,
                        signType: 'MD5',
                        paySign: res.data.data.paySign,
                        success: function (res) {
                            console.log('success');
                            uni.navigateTo({
                                url: '/gc_school/pages/user/index'
                            });
                        },
                        fail: function (res) {
                            console.log('fail');
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
.checkbox {
    transform: scale(0.8, 0.8);
    /* width: 100%; */
    /* text-align: center; */
}
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
	background-color: #e54d42 !important;
	border-color: #e54d42 !important;
	color: #ffffff !important;
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
    margin: 80rpx 10% 60rpx;
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
	margin-top: 200rpx;
}
.rule {
    /* color: #747474; */
    /* color: #F5CF69; */
    font-weight: bold;
}
</style>
