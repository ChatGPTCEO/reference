<template>
    <view class="container">
        <view class="list page">
            <view class="item" @tap="detail" :data-index="index" v-for="(item, index) in list" :key="index">
                <view class="title">
                    <view>{{ item.title }}</view>
                    <view>¥{{ item.zw_price }}/亩</view>
                </view>

                <view class="desc">
                    {{ item.desc }}
                </view>

                <view class="footer">
                    <view class="sm">{{ item.createtime }}</view>
                    <view class="sm none">|</view>
                    <view class="sm">
                        状态:
                        <text>{{ item.status }}</text>
                    </view>
                    <view class="sm none">|</view>
                    <view class="sm">
                        作物面积:
                        <text>{{ item.zw_range }}</text>
                        亩
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
var app = getApp(); // wx_tx/pages/mypublic/index.js

export default {
    data() {
        return {
            list: [],
            page: 1
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getList();
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
    onReachBottom: function () {
        this.getList();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        //详情跳转
        detail(e) {
            uni.navigateTo({
                url: '/wx_tx/pages/detail/index?id=' + this.list[e.currentTarget.dataset.index].id
            });
        },

        //获取列表
        getList() {
            const self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/MyFb',
                data: {
                    page: this.page,
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    if (this.page == 1) {
                        self.setData({
                            list: res.data.data.list
                        });
                    } else {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            self.setData({
                                list: [...self.list, res.data.data.list[i]]
                            });
                        }
                    }
                }
            });
        }
    }
};
</script>
<style>
.page {
    background-color: #fbfbfb;
}
.list {
    padding: 15rpx;
}
.list .item {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 15rpx;
    margin-bottom: 10rpx;
}
.list .item .title {
    font-size: 28rpx;
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10rpx;
}
.list .item .desc {
    width: 100%;
    color: #999999;
    margin-bottom: 10rpx;
    font-size: 26rpx;
}
.list .item .footer {
    width: 100%;
    color: #ccc;
    font-size: 22rpx;
    justify-content: center;
    display: flex;
}
.list .item .footer .sm {
    flex: 1;
    justify-content: center;
    text-align: center;
}
.list .item .footer .sm text {
    color: #64edac;
}
.list .item .footer .sm.none {
    flex: none;
}
.list .item .footer .sm:first-child {
    text-align: left;
}
</style>
