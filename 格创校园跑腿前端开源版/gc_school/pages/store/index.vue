<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="backText"></view>
            <view slot="content">商家列表</view>
        </cu-custom>
        <view class="tops" v-if="list.length > 0">
            <view
                class="contents"
                @tap="parseEventDynamicCode(item.is_open == 1 ? 'bank_content' : '')"
                :data-click="item.is_click"
                :data-id="item.id"
                v-for="(item, index) in list"
                :key="index"
            >
                <view class="title">{{ item.name }}</view>

                <view v-if="item.is_open == 1 ? 1 : 0" class="cuIcon-right"></view>

                <view v-if="item.is_open == 1 ? 0 : 1" style="color: red">已打烊</view>

                <!-- <image src="../../../image/fan.png"></image> -->
            </view>
        </view>
        <view class="nodatas" v-else>
            <image src="/static/images/nodata.png" style="width: 110rpx; height: 110rpx"></image>
            <!-- <image src="http://tongxuebangshou.denajia.com/nullDate.png" style="width: 160rpx;height: 140rpx;"></image> -->
            <view>暂无数据~</view>
        </view>
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            list: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        var shcool_id = uni.getStorageSync('schoolId');
        app.globalData.util.request({
            url: 'entry/wxapp/store',
            data: {
                // school_id:shcool_id,
                rest_id: options.id
            },

            success(res) {
                console.log('12121', res);

                if (res.data.errno == 0) {
                    that.setData({
                        list: res.data.data
                    });
                }
            }
        });
    },
    onShow: function (e) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
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
        bank_content: function (e) {
            console.log(e);
            {
                if (e.currentTarget.dataset.click == 1) {
                    uni.navigateTo({
                        // url: '../store/store?id=' + e.currentTarget.dataset.id,
                        url: '../foold/foold?id=' + e.currentTarget.dataset.id
                    });
                } else {
                    uni.showToast({
                        title: '该商家下暂无商品',
                        icon: 'none'
                    });
                }
            }
        }
    }
};
</script>
<style>
page {
    background-color: white;
}
.tops {
    width: 100%;
    padding: 30rpx 30rpx;
    box-sizing: border-box;
    margin-top: 10rpx;
}
.contents {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    align-items: center;
    padding-bottom: 20rpx;
    justify-content: space-between;
    margin-bottom: 40rpx;
}
image {
    width: 16rpx;
    height: 30rpx;
}
.title {
    font-size: 30rpx;
    width: 85%;
}
.nodatas {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #000000;
    font-size: 30upx;
}
.bgmain {
    background-color: #ff6344;
    color: white;
}
.cuIcon-back {
    color: white;
}
.cuIcon-right {
    font-size: 36rpx;
}
</style>
