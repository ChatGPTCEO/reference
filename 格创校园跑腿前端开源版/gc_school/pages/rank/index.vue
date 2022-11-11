<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">排行榜</view>
        </cu-custom>

        <view class="container">
            <view class="mine_box" v-if="my != ''">
                <image :src="my.avatar" class="avatar"></image>
                <view class="flex-direction" style="width: 72%">
                    <view class="username">{{ my.nickname }}</view>
                    <view class="rank">
                        <view>排名：{{ my.ranks }}</view>
                        <view>总赚：{{ my.brokerage }}</view>
                    </view>
                </view>
            </view>
			
            <view class="flex-wrap bg-white">
                <view class="radius" v-for="(item, index) in list" :key="index">
                    <view class="flex align-center">
                        <view class="left">
                            <image :src="'/static/gc_school/resource/images/' + (index + 1) + '.png'" mode="withFix" v-if="index < 3" style="width: 70rpx; height: 70rpx"></image>
                            <text class="text-xl" v-if="index >= 3">{{ index + 1 }}</text>
                        </view>
                        <view class="flex align-center middle">
                            <view class="cu-avatar round margin-right" :style="'background-image:url(' + item.avatar + ')'">
                                <!-- <image src='/gc_school/resource/images/{{index+1}}.png' mode='withFix' wx:if="{{index<3}}" class="tagbg"></image> -->
                            </view>
                            <view>
                                <view style="width: 250rpx">
                                    <text class="text-sm">{{ item.nickname }}</text>
                                </view>
                            </view>
                        </view>
                        <view class="right">
                            <text class="text-red text-lg">
                                ￥
                                <text class="text-xl">{{ item.balance }}</text>
                            </text>
                            <!-- <view class="text-gray">月赚</view> -->
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            page: 1,
            showNodata: false,
            erranderId: 2,

            address: {
                available: []
            },

            my: [],
            list: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log(uni.getStorageSync('openid'));
        this.getData();
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
        this.setData({
            page: this.page + 1
        });
        this.getData();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        getData() {
            var self = this;
            app.globalData.util.request({
                url: 'ZhRankingList/index',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                },
				header:{
					'Authorization' : uni.getStorageSync('token')
				},
				method:'GET',
                success(res) {
                    console.log('1111', res.data.data.my);
					console.log("页码",self.page)
                    if (self.page == 1) {
                        self.setData({
                            list: res.data.data.list,
                            my: res.data.data.my
                        });
                    } else {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            self.setData({
                                list: [...self.list, res.data.data.list[i]]
                            });
                        }
                    }
					console.log("我的信息",self.my)
                }
            });
        },

        handleGet(e) {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/CouponGet',
                data: {
                    co_id: e.currentTarget.dataset.id,
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    self.getData();
                }
            });
        },

        handleUser(e) {
            var pages = getCurrentPages(); //获取当前页面信息栈

            var prevPage = pages[pages.length - 2];

            if (prevPage.route == 'gc_school/pages/public/index') {
                uni.navigateBack({
                    cupon: e.currentTarget.dataset.id
                });
            } else {
                uni.navigateBack();
            }
        }
    }
};
</script>
<style>
/* gc_school/pages/rank/index.wxss */
page {
    background: white;
}
.tagbg {
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    width: 60rpx;
    height: 60rpx;
}
.page-guide .tagbg {
    position: absolute;
    top: -20rpx;
    left: -20rpx;
    width: 60rpx;
    height: 60rpx;
}
.bgmain {
    background: #ff6344 !important;
    color: white;
}
.action {
    color: white !important;
}
.cu-avatar {
    height: 120rpx !important;
    width: 120rpx !important;
    border: 3px solid #f9f9f9;
    box-shadow: 2rpx 2rpx 10rpx lightgray;
}
.radius {
    border-bottom: 1px solid #f9f9f9;
    padding: 40rpx 10rpx;
}
.text-xxl {
    font-weight: bold;
}
.left {
    width: 20%;
    height: 60rpx;
    text-align: center;
    font-size: 30rpx;
}
.middle {
    width: 60%;
}
.right {
    width: 20%;
    text-align: right;
    margin-right: 20rpx;
}
.mine_box {
    padding: 40rpx;
    box-shadow: 2rpx 2rpx 6rpx lightgray;
    margin: 30rpx;
    border-radius: 10rpx;
    display: flex;
}
.avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    border: 3px solid #f9f9f9;
    box-shadow: 2rpx 2rpx 10rpx lightgray;
}
.username {
    margin: 30rpx 0 0 40rpx;
    font-size: 32rpx;
    font-weight: bold;
}
.rank {
    display: flex;
    margin: 20rpx 0 0 40rpx;
    justify-content: space-between;
    font-size: 30rpx;
}
.rank view:first-child {
    width: 50%;
    border-right: 2rpx solid lightgray;
}
</style>
