<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的关注</view>
        </cu-custom>

        <view class="box">
            <block v-for="(item, index) in dataList" :key="index">
                <view class="item">
                    <image :src="item.nickimg"></image>
                    <view class="info">
                        <view class="name">{{ item.nickname }}</view>
                        <view class="num">{{ item.follow_count }}人关注</view>
                    </view>
                    <view class="cancel_btn" @tap.stop.prevent="cancelFav" :data-id="item.gid">取消关注</view>
                </view>
            </block>
        </view>

        <view class="nocontent" v-if="dataList.length == 0">
            <image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
            <view class="blank_text">暂无数据哦~</view>
        </view>

        <view v-if="!loadmore && dataList.length > 0" class="nomore">没有更多数据了~</view>
    </block>
</template>

<script>
// gc_school/pages/mysecond/index.js
var app = getApp();
export default {
    data() {
        return {
            tabid: 0,
            dataList: [],
            page: 1,
            loadmore: true
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getMylist();
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
        this.setData({
            page: this.page + 1
        });

        if (this.loadmore) {
            this.getMylist();
        }
    },
    /**
     * 用户点击右上角分享
     */ methods: {
        getMylist() {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/followUser',
                data: {
                    openid: uni.getStorageSync('openid'),
                    page: self.page
                },

                success(res) {
                    if (res.data.data.length < 12) {
                        self.setData({
                            loadmore: false
                        });
                    }

                    if (this.page == 1) {
                        self.setData({
                            dataList: res.data.data
                        });
                    } else {
                        for (var i = 0; i < res.data.data.length; i++) {
                            self.setData({
                                dataList: [...self.dataList, res.data.data[i]]
                            });
                        }
                    } // self.setData({
                    //   dataList:res.data.data
                    // })
                }
            });
        },

        //取消关注
        cancelFav(e) {
            var self = this;
            console.log(e.currentTarget.dataset.id);
            uni.showModal({
                title: '提示',
                content: '确认取消关注吗？',

                success(res) {
                    if (res.confirm) {
                        app.globalData.util.request({
                            url: 'entry/wxapp/goodsFav',
                            data: {
                                id: e.currentTarget.dataset.id,
                                openid: uni.getStorageSync('openid'),
                                type: 2
                            },

                            success(res) {
                                self.setData({
                                    page: 1,
                                    loadmore: true
                                });
                                self.getMylist();
                            }
                        });
                    }
                }
            });
        },

        toDetail(e) {
            uni.navigateTo({
                url: '/gc_school/pages/seconddetail/index?id=' + e.currentTarget.dataset.id
            });
        },

        changeTab: function (t) {
            this.setData({
                tabid: t.currentTarget.dataset.id
            });
            this.getlist();
        }
    }
};
</script>
<style>
page {
    background-color: white;
}
.cu-bar .action:first-child {
    background-color: white;
    color: black;
}
.bgmain {
    background-color: white;
    color: black;
}
.box {
    /* padding: 30rpx 20rpx; */
    /* justify-content: space-between; */
}
.item {
    width: 100%;
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid rgba(201, 201, 201, 0.6);
    /* border-bottom: 2rpx solid #C9C9C9; */
    display: flex;
    /* float: left; */
    /* justify-content: space-between; */
    align-items: center;
}
.item .info {
    flex-grow: 1;
}
.item image {
    flex-shrink: 0;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 10rpx;
}
.item .name {
    font-size: 28rpx;
    margin: 10rpx;
    overflow: hidden;
    white-space: nowrap;
    max-width: 400rpx;
    text-overflow: ellipsis;
}
.item .num {
    font-size: 22rpx;
    color: #919191;
    margin: 10rpx;
}
.item .cancel_btn {
    border: 2rpx solid #c8c8c8;
    border-radius: 50rpx;
    padding: 10rpx 15rpx;
    font-size: 25rpx;
}
.nocontent {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
}

.nocontent image {
    width: 150rpx;
    height: 150rpx;
}

.blank_text {
    padding-top: 10rpx;
    font-size: 32rpx;
    letter-spacing: 2rpx;
    color: #c6c6c8;
}
</style>
