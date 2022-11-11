<template>
    <block>
        <!-- gc_school/pages/secondhand/buy.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">下单</view>
        </cu-custom>
        <form @submit.stop.prevent="formSubmit">
            <view class="padding">
                <view class="detail_box flex">
                    <image :src="data.image" class="img"></image>
					<view>
                    <view class="shop-title" style="height: 70%;">{{ data.title }}</view>
					<view style="height: 30%;" class="pays flex">￥{{ data.pay }} <view class="prices" style="margin-left: 16rpx;">￥{{data.price}}</view></view>
					</view>
                </view>
                <view class="info_box margin-top-lg">
                   
                    <view class="info_item">
                        <view class="item_title">联系人</view>
                        <input name="linkman" placeholder="请输入联系人姓名"  style="text-align: right;"  />
                    </view>
					<view class="info_item">
					    <view class="item_title">联系电话</view>
					    <input name="phone" placeholder="请输入联系电话" style="text-align: right;" />
					</view>
                    <!-- <view class="info_item">
        <view class="item_title">取货地址</view>
        <input placeholder="请输入取货地址" />
      </view> -->
                    <textarea name="remark" placeholder="请输入交易地点等其他信息"></textarea>
                </view>
            </view>
			<view style="padding: 0 30rpx;">
            <view class="bottom flex dibu">
                <view class="text-df heji" style="color: #FFFFFF;margin-left: 30rpx;">
                    合计金额：
                    <text class="text-red text-xl text-bold pays" style="color: #FFFFFF;" >￥{{ data.pay }}</text>
                </view>
                <button class="sure"  formType="submit">确认购买</button>
                <!-- <view class="sure" formType="submit">确认购买</view> -->
            </view>
			</view>
        </form>
    </block>
</template>

<script>
// gc_school/pages/secondhand/buy.js
var app = getApp();
export default {
    data() {
        return {
            data: {
                img: '',
                name: '',
                price: ''
            },

            id: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.id
        });
        this.getDetail();
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
        getDetail() {
            var self = this;
            app.globalData.util.request({
                url: 'Dmhmarketgoods/view',
                data: {
                    m_id: self.id,
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        data: res.data.data
                    });
                }
            });
        },

        formSubmit(e) {
            var linkman = e.detail.value.linkman.replace(/\s+/g, '');
            var phone = e.detail.value.phone;
            var remark = e.detail.value.remark.replace(/\s+/g, '');
            var myreg = /^1[3456789]\d{9}$/;

            if (!myreg.test(phone)) {
                app.globalData.util.message('请输入正确的手机号', '', 'error');
                return;
            }

            if (!linkman) {
                app.globalData.util.message('请输入联系人姓名', '', 'error');
                return;
            }

            console.log(e.detail.value.linkman.replace(/\s+/g, ''));
            var self = this;
            app.globalData.util.request({
                url: 'Dmhmarketorder/pay',
                data: {
                    id: self.id,
                    s_id: uni.getStorageSync('schoolId'),
                    linkman: linkman, 
                    phone: phone,
                    remark: remark,
					u_id:self.data.u_id
                },

                success(res) {
					console.log(res.data.data,'---')
                    uni.requestPayment({
                        timeStamp: res.data.data.timeStamp.toString(),
                        nonceStr: res.data.data.nonceStr,
                        package: res.data.data.package,
                        signType: 'MD5',
                        paySign: res.data.data.paySign,
                        success: function (resu) {
                            app.globalData.util.request({
                                url: 'MsgSubscribe/toSeller',
                                data: {
                                    ordersn: res.data.data.ordersn
                                }
                            });
                            setTimeout(function () {
                                uni.redirectTo({
                                    url: '/gc_school/pages/secondhand/mybuy'
                                });
                            }, 2000);
                        },
                        fail: function (res) {
                            console.log(res,'---11--');
                            // app.globalData.util.request({
                            //     url: 'entry/wxapp/secondCancel',
                            //     data: {
                            //         id: self.id
                            //     },

                            //     success(res) {
                            //         uni.redirectTo({
                            //             url: '/gc_school/pages/secondhand/index'
                            //         });
                            //     }
                            // });
                        }
                    });
                }
            },true);
        }
    }
};
</script>
<style>
/* gc_school/pages/secondhand/buy.wxss */
page {
    /* background: white; */
}
.bgmain {
    background-color: #ff6444;
    color: white;
}
.img {
    width: 180rpx;
    height: 180rpx;
    border-radius: 20rpx;
    margin-right: 20rpx;
    flex-shrink: 0;
}
.detail_box,
.info_box {
    background-color: white;
    border-radius: 20rpx;
    padding: 20rpx;
}
.info_box {
    padding-bottom: 50rpx;
}
.info_item {
    display: flex;
    font-size: 30rpx;
    border-bottom: 1rpx solid #f2f2f2;
    padding: 20rpx 20rpx 20rpx;
}
.item_title {
    flex-shrink: 0;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #323232;
	line-height: 18rpx;
}
input {
    /* border: 1rpx solid black; */
    width: 100%;
    padding-left: 20rpx;
}
textarea {
    border: 1rpx solid #f2f2f2;
    width: 100%;
    margin-top: 40rpx;
    padding: 20rpx;
    border-radius: 10rpx;
}
.bottom {
    background-color: white;
    position: fixed;
    bottom: 0;
    width: 92%;
    height: 120rpx;
    /* padding: 10rpx 30rpx; */
    line-height: 100rpx;
    justify-content: space-between;
}
.sure {
    background-color: #ff6444;
    width: 220rpx;
    color: white;
	height: 100%;
    /* border-radius: 50rpx; */
    /* margin-top: 10rpx; */
    /* height: 90rpx; */
	border-top-right-radius:90rpx;
	border-bottom-right-radius:90rpx;
    /* line-height: 90rpx; */
    /* text-align: center; */
	
    /* font-size: 30rpx; */
    margin-right: 0;
	font-size: 34rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #FFFFFF;
	line-height: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.dibu{
	background: #222222;
	border-radius: 45px;
}
.heji{
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.pays{
	font-size: 40rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #FFFFFF;
	line-height: 44rpx;
}
.shop-title{
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #141414;
	line-height: 44rpx;
	overflow:hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
	height: 58rpx;
}
.pays{
	font-size: 36rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #F42E2F;
}
.prices{
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 500;
	text-decoration: line-through;
	color: #999999;
}
</style>
