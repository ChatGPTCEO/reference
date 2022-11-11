<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的足迹</view>
        </cu-custom>

        <view class="box">
            <block v-for="(item, index) in dataList" :key="index">
                <view class="item" @click="toDetail(item.m_id)" :data-id="item.gid">
                    <image mode="aspectFill" :src="item.image"></image>
                    <view class="name">{{ item.title }}</view>
                    <view class="price">￥{{ item.pay }}</view>
                    <view class="time">{{ item.create_time }}</view>
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
                url: 'Dmhfootprint/index',
                data: {
                    // openid: uni.getStorageSync('openid'),
					s_id: uni.getStorageSync('schoolId'),
                    page: self.page,
                    type: 2,
                    psize: 15
                },

                success(res) {
                    if (res.data.data.list.length < 15) {
                        self.setData({
                            loadmore: false
                        });
                    }

                    if (this.page == 1) {
                        self.setData({
                            dataList: res.data.data.list
                        });
                    } else {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            self.setData({
                                dataList: [...self.dataList, res.data.data.list[i]]
                            });
                        }
                    } // self.setData({
                    //   dataList:res.data.data
                    // })
                }
            },true);
        },

        //删除订单
        cancelFav(e) {
            var self = this;
            console.log(e.currentTarget.dataset.id);
            uni.showModal({
                title: '提示',
                content: '确认取消收藏吗？',

                success(res) {
                    if (res.confirm) {
                        // app.util.request({
                        //   url: "entry/wxapp/delMyGoods",
                        //   data: {
                        //     id: e.currentTarget.dataset.id
                        //   },
                        //   success(res) {
                        self.setData({
                            page: 1,
                            loadmore: true
                        });
                        self.getMylist(); //   }
                        // })
                    }
                }
            });
        },

        //进入详情
        toDetail(e) {
            uni.navigateTo({
                url: '/gc_school/pages/secondhand/detail?id=' + e
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
    padding: 30rpx 20rpx;
    display: flex;
    flex-flow: wrap;
    /* justify-content: space-between; */
}
.item {
    width: 30%;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
    margin: 20rpx 0 20rpx 2.5%;
    border-radius: 10rpx;
    /* float: left; */
}
.item image {
    width: 100%;
    height: 220rpx;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
}
.item .name {
    font-size: 30rpx;
    margin: 10rpx 10rpx 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.item .price {
    font-size: 30rpx;
    color: #ff6344;
    font-weight: bold;
    margin: 10rpx;
}
.item .time {
    font-size: 22rpx;
    color: #919191;
    margin: 10rpx;
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
