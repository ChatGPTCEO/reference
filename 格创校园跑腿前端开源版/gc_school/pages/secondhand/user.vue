<template>
    <block>
        <!-- gc_school/pages/secondhand/user.wxml -->
        <image src="/static/images/mygoods_bg.png" style="width: 100%" mode="widthFix"></image>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">我的宝贝</view>
        </cu-custom>
        <!-- 用户信息 -->
        <view class="userinfo_box">
            <image class="avatar" :src="loginuserinfo.avatarUrl"></image>
            <view class="nickname">{{ loginuserinfo.nickName }}</view>
            <view class="num_box">
                <!-- <view class="num_item" bindtap="jump" data-url="/gc_school/pages/follow/index">
      <view class="num">{{data.user_fav_count}}</view>
      <view class="title">关注</view>
    </view> -->
                <view class="num_item" @tap="jump" data-url="/gc_school/pages/secondfav/index">
                    <view class="num">{{ data.stay }}</view>
                    <view class="title">收藏</view>
                </view>
                <view class="num_item" @tap="jump" data-url="/gc_school/pages/secondhand/footprint">
                    <view class="num">{{ data.footprint }}</view>
                    <view class="title">足迹</view>
                </view>
            </view>
        </view>

        <!-- 列表 -->
        <view class="menu">
            <view class="item" @tap="jump" data-url="/gc_school/pages/secondhand/my">
                <image src="/static/images/user/fabu.png"></image>
                <view class="name">我的发布</view>
                <text class="cuIcon-right text-black"></text>
            </view>
            <view class="item" @tap="jump" data-url="/gc_school/pages/secondhand/sale">
                <image src="/static/images/user/sale.png"></image>
                <view class="name">我卖出的</view>
                <text class="cuIcon-right text-black"></text>
            </view>
            <view class="item" @tap="jump" data-url="/gc_school/pages/secondhand/mybuy">
                <image src="/static/images/user/buy.png"></image>
                <view class="name">我买的宝贝</view>
                <text class="cuIcon-right text-black"></text>
            </view>
        </view>
    </block>
</template>

<script>
// gc_school/pages/secondhand/user.js
var app = getApp();
export default {
    data() {
        return {
            data: {
                fav_count: '',
                footprint_count: ''
            },

            loginuserinfo: {
                avatarUrl: '',
                nickName: ''
            },

            islogin: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (uni.getStorageSync('token')) {
            console.log('用户信息', uni.getStorageSync('userinfo'));
            this.setData({
                loginuserinfo: uni.getStorageSync('userinfo'),
                islogin: true
            });
			console.log(options,'---11---')
            this.getCount();
        } else {
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            });
            setTimeout(function () {
                uni.navigateBack({
                    delta: 1,

                    success() {
                        uni.removeStorage({
                            key: 'json'
                        });
                    },

                    fail() {
                        uni.navigateTo({
                            url: '/gc_school/pages/home/index'
                        });
                    }
                });
            }, 2000);
        }
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
        //数据统计接口
        getCount() {
            var self = this;
            app.globalData.util.request({
                url: 'Dmhmarketuser/collection',
                data: {
                    s_id:uni.getStorageSync('schoolId'),
                },

                success(res) {
                    console.log(res);
                    self.setData({
                        data: res.data.data
                    });
                }
            },true);
        },

        //跳转到我的发布
        jump(e) {
            uni.navigateTo({
                url: e.currentTarget.dataset.url
            });
        }
    }
};
</script>
<style>
/* gc_school/pages/secondhand/user.wxss */
page {
    background-color: white;
}
.bgmain {
    background-color: transparent;
}
/* 用户信息 */
.userinfo_box {
    margin: 30rpx 5%;
    background-color: white;
    border-radius: 20rpx;
    width: 90%;
    position: absolute;
    top: 15%;
    text-align: center;
    padding-bottom: 40rpx;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
}
.userinfo_box .avatar {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    margin-top: -60rpx;
    border: 8rpx solid white;
}
.userinfo_box .nickname {
    font-size: 30rpx;
    margin: 20rpx;
}
.num_box {
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
}
.num_item {
    width: 50%;
    /* width: 30%; */
    position: relative;
}
.num_item .num {
    font-size: 34rpx;
    font-weight: bold;
    line-height: 50rpx;
}
.num_item .title {
    font-size: 24rpx;
    color: #b7b7b7;
}
.num_item:after {
    content: '';
    width: 2rpx;
    height: 50rpx;
    background-color: #ebebeb;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.num_item:last-child:after {
    content: '';
    width: 1rpx;
    height: 40rpx;
    background-color: white;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

/* 菜单项 */
.menu {
    margin: 30rpx 5%;
    background-color: white;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07);
    border-radius: 20rpx;
}
.menu .item {
    padding: 20rpx;
    display: flex;
    align-items: center;
    border-radius: 20rpx;
    /* box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.07); */
}
.menu .item image {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
}
.menu .item .name {
    font-size: 30rpx;
    margin-left: 20rpx;
    flex-grow: 1;
}
.cuIcon-right {
    font-size: 36rpx;
}
</style>
