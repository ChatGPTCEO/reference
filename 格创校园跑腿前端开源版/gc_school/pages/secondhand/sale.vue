<template>
    <block>
        <!-- gc_school/pages/secondhand/sale.wxml -->
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我卖出的</view>
        </cu-custom>

        <view class="trade_box">
            <view class="single-trade" v-for="(good, index) in dataList" :key="good.id">
                <view @tap="toDetail" class="trade2" :data-id="good.id" :data-status="good.status">
                    <image mode="aspectFill" class="bookimage" :src="good.market.image"></image>
                    <view class="second-left">
                        <view class="textdet">
                            <view class="text-bookname">{{ good.market.title }}</view>
                        </view>
                        <view class="price">￥{{ good.market.pay }}</view>
                    </view>
                </view>

                <view class="margin" v-if="good.status == 3">申请退款理由：{{ good.reason }}</view>

                <view class="trade3">
                    <view class="margin-tb-sm-my text-center">
                        <view class="sm button" v-if="good.paystate == 1">待完成</view>
                        <view class="sm button" v-if="good.paystate == 2">已完成</view>
                        <view v-if="good.paystate == 3" class="flex">
                            <view class="sm button refund" @tap="agree" data-type="1" :data-id="good.oid">同意退款</view>
                            <view class="sm button refund" @tap="agree" data-type="2" :data-id="good.oid">拒绝退款</view>
                        </view>
                        <view v-if="good.paystate == 4" :data-id="good.oid" :data-status="good.paystate" class="sm button">退款完成</view>
                    </view>
                </view>
            </view>
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
            loadmore: true,

            good: {
                id: '',
                status: '',
                img: '',
                name: '',
                price: '',
                reason: ''
            }
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
        agree(e) {
            console.log(e.currentTarget.dataset.id);
            console.log(e.currentTarget);
            var self = this;
            app.globalData.util.request({
                url: 'Dmhmarketorder/secondRefundOper',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    oid: e.currentTarget.dataset.id,
                    type: e.currentTarget.dataset.type
                },

                success(res) {
                    self.setData({
                        page: 1,
                        loadmore: true
                    });
					self.dataList = []; 	
                    self.getMylist();
                }
            },true);
        },

        getMylist() {
            var self = this;
            app.globalData.util.request({
                url: 'Dmhmarketorder/index',
                data: {
                    // openid: uni.getStorageSync('openid'),
                    page: self.page,
                    type: 1,
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
					console.log(res.data.data.list,'---')
                    if (res.data.data.list.length < 10) {
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
        delorder(e) {
            var self = this;
            console.log(e.currentTarget.dataset.id);
            uni.showModal({
                title: '提示',
                content: '确认执行此操作吗？',

                success(res) {
                    if (res.confirm) {
                        app.globalData.util.request({
                            url: 'entry/wxapp/delMyGoods',
                            data: {
                                id: e.currentTarget.dataset.id
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
                url: '/gc_school/pages/secondhand/orderdetail?id=' + e.currentTarget.dataset.id
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
/* .cu-bar .action:first-child{
  background-color: #FF6444;
  color: white;
} */
.bgmain {
    background-color: #ff6444;
    color: white;
}
.tab_contain {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1rpx solid #eee;
}

.tab_one {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 10rpx;
}

.tab_one view {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 30rpx;
    letter-spacing: 2rpx;
}

.tab_on {
    font-size: 32rpx;
    font-weight: 600;
    border-bottom: 4rpx solid #7acfa6;
}

.trade_box {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.trade_box .single-trade:last-child {
    border-bottom: none;
}

.single-trade {
    width: 100%;
    height: 100%;
    padding: 10rpx 10rpx 20rpx;
    background-color: white;
    border-radius: 6rpx;
    position: relative;
    /* box-shadow: 0 0 10rpx rgba(0,0,0,0.1); */
    /* padding-bottom: 20rpx; */
    border-bottom: 2rpx solid #c9c9c9;
}

.trade {
    width: 100%;
    height: 21px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin-top: 20rpx;
    margin-left: 20rpx;
    border-bottom: 1px solid rgba(128, 128, 128, 0.068);
}

.first {
    width: 80%;
    height: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.first view {
    font-size: 12px;
    padding-left: 12rpx;
}

.status {
    float: right;
    font-size: 12px;
}

.trade2 {
    height: 100%;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    margin-top: 10rpx;
    margin-left: 20rpx;
    align-items: center;
}

.text-coursename {
    padding-top: 10rpx;
    font-size: 27rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: 3rpx;
    line-height: 40rpx;
}

.text-bookname {
    font-size: 28rpx;
    font-weight: bold;
    /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
    /* letter-spacing: 3rpx; */
    /* line-height: 45rpx; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    /* height: 85rpx; */
}

.second-left {
    /* display: flex;
  flex-direction: row; */
    width: 100%;
}
.price {
    color: #ff2a00;
    font-size: 30rpx;
    font-weight: bold;
    line-height: 50rpx;
}

.count {
    font-size: 24rpx;
}

.bookimage {
    width: 170rpx;
    height: 150rpx;
    flex-shrink: 0;
    margin-right: 20rpx;
    border-radius: 10rpx;
}

.textdet {
    width: 100%;
    /* width: calc(80% - 100rpx); */
    display: flex;
    flex-direction: column;
}

.textdet view {
    padding-left: 10rpx;
}

.second-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 20%;
}

.second-right image {
    width: 35rpx;
    height: 35rpx;
}

.second-right view {
    font-size: 30rpx;
}

.trade3 {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 20rpx;
}

.third-left {
    font-size: 27rpx;
    float: left;
    color: darkgrey;
    padding-left: 20rpx;
}

.third-right {
    float: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.trade4 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
}

.price {
    padding-left: 10rpx;
}

.blank {
    width: 100%;
    height: 2px;
    color: grey;
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
.sm {
    font-size: 26rpx !important;
    margin-left: 15rpx;
}
.button {
    border-radius: 50rpx;
    background: white;
    color: black;
    border: 2rpx solid #cccccc;
    padding: 5rpx 20rpx;
    line-height: 50rpx;
}
.bg-orange {
    background-color: #ff6344 !important;
    color: white !important;
    border: 2rpx solid #ff6344;
}
.refund {
    background: #e54d42;
    color: white;
    border: none;
}
</style>
