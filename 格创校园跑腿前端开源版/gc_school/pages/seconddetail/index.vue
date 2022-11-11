<template>
    <block>
        <!-- <scroll-view class="container" > -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">详情</view>
        </cu-custom>
        <van-search showAction @tap.native="onFocus" placeholder="请输入搜索关键词" :value="value"></van-search>
        <view>
            <swiper :autoplay="autoplay" class="picture" :duration="duration" :indicatorDots="indicatorDots" :interval="interval">
                <swiper-item v-for="(item, index) in data.img" :key="index">
                    <image @tap="previewImage" class="slide-image" :data-index="index" mode="scaleToFill" :src="item"></image>
                </swiper-item>
            </swiper>
        </view>
        <view class="first clear">
            <view class="price">￥{{ data.price }}元</view>
            <text style="color: #cccccc; text-decoration: line-through; font-size: 12px; line-height: 40px">原价：{{ data.oldprice }}元</text>
        </view>
        <view class="second">
            <view class="name">{{ data.name }}</view>
        </view>
        <!-- <view style="border-top:1px solid #F6F6F6;background: #fff; padding:5px 15px;">
        <view class="clearfix flex grey gridXt">
            <text class="subc">适用学院:放入</text>
            <text class="subg">年级:3</text>
        </view>
    </view> -->
        <view class="pj_box">
            <view class="detail_card detail_border">
                <view class="detail_title">发布日期</view>
                <view class="detail_content">{{ data.addtime }}</view>
            </view>
            <view class="detail_card detail_border">
                <view class="detail_title">新旧程度</view>
                <view class="detail_content">{{ data.degree }}</view>
            </view>
            <view class="detail_card detail_border">
                <view class="detail_title">详细描述</view>
                <view class="detail_content_d">{{ data.content }}</view>
            </view>
        </view>
        <!-- </scroll-view> -->
        <van-goods-action class="bottom">
            <!-- <view class="t_card">
        <image src="/images/message(2).png"></image>
        <text>联系卖家</text>
        <button bindtap="tochat" class="t_button" data-aopenid="{{ownerid}}"></button>
    </view>
    <view class="t_card">
        <image src="/images/share.png"></image>
        <text>分享</text>
        <button class="t_button" openType="share"></button>
    </view>
    <view class="t_card">
        <image src="/images/shoucang.png"></image>
        <text>收藏</text>
        <button bindtap="collect" class="t_button" data-id="{{id}}"></button>
    </view> -->
            <view class="add-cart sub f16">
                <button @tap="makecall" class="add-cart-btn" :data-phone="data.phone" :disabled="selfflag">联系卖家</button>
            </view>
        </van-goods-action>
    </block>
</template>

<script>
// gc_school/pages/seconddetail/index.js
var app = getApp();
export default {
    data() {
        return {
            data: {
                img: [],
                price: '',
                oldprice: '',
                name: '',
                addtime: '',
                degree: '',
                content: '',
                phone: ''
            },

            indicatorDots: true,
            value: '',
            autoplay: 0,
            duration: '',
            interval: '',
            selfflag: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log(options);
        this.getDetail(options.id);
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
        getDetail(id) {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/goodsDetail',
                data: {
                    id: id,
                    openid: uni.getStorageSync('openid')
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        data: res.data.data
                    });
                }
            });
        },

        //图片预览
        previewImage: function (t) {
            var e = this.data.img;
            var n = t.target.dataset.index;
            uni.previewImage({
                urls: e,
                current: e[n],
                fail: function (t) {
                    uni.showToast({
                        title: '出错啦，请重试！',
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        },

        makecall(e) {
            console.log(e);

            if (uni.getStorageSync('openid') == '') {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none'
                });
                return;
            } else {
                uni.makePhoneCall({
                    phoneNumber: e.currentTarget.dataset.phone,
                    success: function () {
                        console.log('成功拨打电话');
                    }
                });
            }
        },

        onFocus() {
            console.log('占位：函数 onFocus 未声明');
        }
    }
};
</script>
<style>
.cu-bar .action:first-child {
    background-color: #ff6444;
    color: white;
}
.bgmain {
    background-color: #ff6444;
    color: white;
}
.picture {
    width: 100%;
    height: 300px;
}

.container {
    height: 100%;
}

.bottom {
    width: 100%;
    background: #fff;
    opacity: 1;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    display: flex;
    padding: 10rpx;
    border-top: 1rpx solid #eee;
    align-items: center;
    box-sizing: border-box;
    z-index: 8;
}

.clear {
    clear: both;
    overflow: hidden;
}

.slide-image {
    width: 100%;
    height: 100%;
}

.flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
}

.flex > .sub {
    -webkit-box-flex: 1;
    flex: 1;
    overflow: hidden;
}

.second {
    background: #fff;
    padding: 10px 15px;
    font-size: 15px;
}

.pj_box {
    margin-top: 10px;
    padding: 0 15px;
    font-size: 13px;
    background: #fff;
}

.detail {
    width: 100%;
    height: 148rpx;
    display: flex;
    padding: 24rpx;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.detail image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
}

.des_box {
    height: 100%;
    width: 450rpx;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding: 10rpx 0;
}

.user_name {
    font-size: 32rpx;
    letter-spacing: 2rpx;
    text-indent: 1.45em;
}

.local_box {
    display: flex;
    align-items: center;
}

.detail_card {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx 0;
    justify-content: space-between;
}

.detail_border {
    border-bottom: 1rpx solid #eee;
}

.detail_title {
    width: 20%;
    font-size: 28rpx;
    letter-spacing: 2rpx;
    line-height: 45rpx;
}

.detail_content {
    width: 78%;
    font-size: 27rpx;
    letter-spacing: 2rpx;
    line-height: 44rpx;
    color: #616161;
    word-break: break-all;
}

.detail_content_d {
    width: 78%;
    font-size: 27rpx;
    letter-spacing: 2rpx;
    line-height: 44rpx;
    color: #616161;
    word-break: break-all;
    padding-bottom: 40px;
}

.sex {
    width: 100rpx;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sex image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}

.local_box image {
    width: 20px;
    height: 20px;
}

.first {
    border-bottom: 1px solid #f6f6f6;
    background: #fff;
    padding: 0px 15px;
}

.price {
    float: left;
    height: 15px;
    line-height: 30px;
    color: #ff6666;
    font-size: 17px;
    margin: 5px;
}

.shoucang {
    text-align: center;
    font-size: 12px;
    color: #999;
    width: 50px;
    line-height: 30px;
    overflow: hidden;
    float: right;
}

.price em {
    font-size: 12px;
    margin-left: 20px;
}

.flex {
    position: relative;
    width: auto;
    margin: 0 -15px;
    padding: 3px 15px 0;
}

.subc {
    font-size: 13px;
    width: 80%;
}

.subg {
    font-size: 13px;
    width: 20%;
}

.add-cart {
    width: 90%;
    height: 100%;
    display: flex;
    padding-left: 30px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

.add-cart-btn {
    width: 90%;
    height: 80rpx;
    background: #ff6444;
    color: white;
    letter-spacing: 4rpx;
    font-size: 32rpx;
    border-radius: 35rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.t_card {
    position: relative;
    width: 20%;
    height: 100rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.t_card image {
    width: 60rpx;
    height: 80rpx;
    padding-top: 10rpx;
}

.t_card text {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: calc(100% - 45rpx);
    width: 100%;
    font-size: 24rpx;
    text-align: center;
    white-space: nowrap;
    padding-top: 5rpx;
    color: DimGray;
}

.t_button {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0rpx;
    top: 0rpx;
    opacity: 0.01;
    z-index: 9;
}
</style>
