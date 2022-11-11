<template>
    <block>
        <!-- gc_school/pages/rule/index.wxml -->
        <cu-custom bgColor="bgmains" :isBack="true">
            <view slot="content">会员服务协议</view>
        </cu-custom>

        <view class="box">
            <!-- <template is="wxParse" :data="wxParseData:fee_content.nodes"/> -->
            <mp-html :content="article_fee_content"></mp-html>
        </view>
    </block>
</template>

<script>
// gc_school/pages/rule/index.js
var app = getApp();
export default {
    data() {
        return {
            data: {},
            article_fee_content: ''
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
                    data: res.data.data.sys
                });
                //WxParse.wxParse('fee_content', 'html', that.data.data.fee_content, that, 0)
                that.article_fee_content = that.escape2Html(that.data.vip_content);
                console.log(that.data.fee_content);
            }
        });
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
    methods: {}
};
</script>
<style>
/* gc_school/pages/rule/index.wxss */
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
    padding: 20rpx 30rpx;
}
</style>
