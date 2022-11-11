<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的发布</view>
        </cu-custom>
        <!-- <view class="tab_contain">
  <view bindtap="changeTab" class="tab_one" data-id="{{index}}" wx:for="{{tab}}" wx:key="id">
    <view class="{{tabid==item.id?'tab_on':''}}">{{item.name}}</view>
  </view>
</view> -->
        <view class="trade_box">
            <view class="single-trade" v-for="(good, index) in dataList" :key="good.id">
                <view @tap="toDetail" class="trade2" :data-id="good.id" :data-status="good.status">
                    <view class="second-left">
                        <image class="bookimage" :src="good.img[0]"></image>
                        <view class="textdet">
                            <view class="text-bookname">{{ good.name }}</view>
                        </view>
                        <view class="second-right">
                            <view>￥{{ good.price }}</view>
                        </view>
                    </view>
                </view>

                <view class="trade3">
                    <view class="third-left">
                        <view>{{ good.addtime }}</view>
                    </view>
                    <view class="third-right">
                        <view class="margin-tb-sm-my text-center">
                            <button @tap="toCurdetails" class="cu-btn bg-green shadow sm" :data-buyerflag="good.buyer_flag" :data-id="good._id">{{ good.status }}</button>
                        </view>
                        <!-- <view class="margin-tb-sm-my text-center">
            <button bindtap="cancelcommit" class="cu-btn bg-green shadow sm" data-id="{{good._id}}" wx:if="{{!good.buyer_flag&!good.cancelcommit}}">确认取消订单</button>
        </view> -->
                        <view class="margin-tb-sm-my text-center">
                            <button @tap="delorder" class="cu-btn bg-green shadow sm" :data-id="good.id">删除</button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="nocontent" v-if="goodsList.length == 0">
            <image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
            <view class="blank_text">暂无数据哦~</view>
        </view>
    </block>
</template>

<script>
// gc_school/pages/mysecond/index.js
var app = getApp();
export default {
    data() {
        return {
            tab: [
                {
                    name: '正在交易',
                    id: 0
                },
                {
                    name: '已经购买',
                    id: 1
                },
                {
                    name: '已经卖出',
                    id: 2
                },
                {
                    name: '取消订单',
                    id: 3
                }
            ],

            tabid: 0,
            dataList: [],

            good: {
                id: '',
                status: '',
                img: '',
                name: '',
                price: '',
                addtime: '',
                buyer_flag: '',
                _id: ''
            },

            goodsList: []
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
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        getMylist() {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/mySecond',
                data: {
                    openid: uni.getStorageSync('openid')
                },

                success(res) {
                    self.setData({
                        dataList: res.data.data
                    });
                }
            });
        },

        //删除订单
        delorder(e) {
            var self = this;
            console.log(e.currentTarget.dataset.id);
            uni.showModal({
                title: '提示',
                content: '确认删除吗？',

                success(res) {
                    if (res.confirm) {
                        app.globalData.util.request({
                            url: 'entry/wxapp/delMyGoods',
                            data: {
                                id: e.currentTarget.dataset.id
                            },

                            success(res) {
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
        },

        toCurdetails() {
            console.log('占位：函数 toCurdetails 未声明');
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

.single-trade {
    width: 90%;
    height: 100%;
    margin: 10rpx;
    background-color: white;
    border-radius: 6rpx;
    position: relative;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    padding-bottom: 20rpx;
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
    align-items: center;
    margin-top: 10rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
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
    font-size: 32rpx;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: 3rpx;
    line-height: 45rpx;
}

.second-left {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.bookimage {
    width: 100rpx;
    height: 100rpx;
}

.textdet {
    width: calc(80% - 100rpx);
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
    margin-left: 20rpx;
    margin-right: 20rpx;
    justify-content: space-between;
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
</style>
