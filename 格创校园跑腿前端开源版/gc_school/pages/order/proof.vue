<template>
    <block>
        <!-- gc_school/pages/order/proof.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">上传凭证</view>
        </cu-custom>

        <view class="padding">
            <view v-if="!img" @tap="choose" class="image">+</view>
            <image class="image" v-else :src="img" @tap="choose"></image>

            <view @tap="submit" class="submit">提交</view>
        </view>
    </block>
</template>

<script>
import addImage from '@/colorui/components/upload/upload';
import siteInfo from '@/siteinfo.js';
// gc_school/pages/order/proof.js
var app = getApp();
export default {
    components: {
        addImage
    },
    data() {
        return {
            id: '',
            img: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.id
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
    // onShareAppMessage: function () {
    // }
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        choose() {
            var that = this;
            uni.chooseImage({
                count: 1,

                success(res) {
                    console.log(res);
                    uni.uploadFile({
                        url: siteInfo.url+'Base/upload',
                        filePath: res.tempFiles[0]['path'],
                        header:{
                        	'Authorization':uni.getStorageSync('token')
                        },
                        name: 'file',
                        formData: {
                        	'wxapp_id':siteInfo.uniacid
                        },
                        success: (result) => {
                            console.log(result);
                            var data = JSON.parse(result.data).data;
                            console.log(data);
                            that.setData({
                                img: data
                            });
                        }
                    });
                }
            });
        },

        submit() {
            if (this.img == '') {
                app.globalData.util.message('请上传凭证', '', 'error');
                return false;
            } else {
                app.globalData.util.request({
                    url: 'Order/uploadProof',
                    data: {
                        o_id: this.id,
                        proof: this.img
                    },

                    success(res) {
                        console.log(res);

                        if (res.data.status == 200) {
                            uni.showToast({
                                title: '提交成功'
                            });
                            setTimeout(function () {
                                uni.navigateBack({
                                    delta: 1
                                });
                            }, 1000);
                        }
                    }
                },true);
            }
        }
    }
};
</script>
<style>
/* gc_school/pages/order/proof.wxss */
page {
    background: white;
}
.image {
    width: 30%;
    /* border-radius: 10rpx; */
    height: 200rpx;
    margin-right: 20rpx;
    font-size: 80rpx;
    color: #ff6344;
    background: #f2f2f2;
    text-align: center;
    line-height: 200rpx;
}
.submit {
    width: 84%;
    background: #ff6344;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
    margin: 80rpx auto;
    color: white;
    text-align: center;
}
</style>
