<template>
    <!-- index.wxml -->
    <view class="container">
        <view class="swiper">
            <swiper :indicator-dots="true" :autoplay="true" interval="3000" duration="1200">
                <swiper-item v-for="(item, index) in slide" :key="index">
                    <image class="nav-icon" mode="aspectFill" :src="item.thumb" />
                </swiper-item>
            </swiper>
        </view>
        <view class="nav">
            <block v-for="(item, index) in navs" :key="index">
                <navigator :class="'nav-item ' + ((index + 1) % 3 == 0 ? 'nav-item-no-border' : '')" :url="item.url" hover-class="navigator-hover">
                    <image class="nav-icon" :src="item.icon" />
                    <view class="nav-title">{{ item.name }}</view>
                </navigator>
            </block>
        </view>

        <view class="commend">
            <block v-for="(item, index) in commend" :key="index">
                <view class="commend-header-title">{{ item.name }}</view>

                <view class="commend-column">
                    <navigator class="commend-item" hover-class="navigator-hover" v-for="(subItem, index1) in item.article" :key="index1">
                        <image class="commend-thumb" :src="subItem.thumb" />

                        <view class="commend-title">{{ subItem.title }}</view>
                    </navigator>
                </view> 
            </block>
        </view>
    </view>
</template>

<script>
//index.js
//获取应用实例
var app = getApp();
export default {
    data() {
        return {
            navs: [],
            slide: [],
            commend: [],
            userInfo: {},

            subItem: {
                thumb: '',
                title: ''
            }
        };
    },
    onLoad: function () {
        var that = this;
        app.globalData.util.footer(that); //初始化导航数据

        app.globalData.util.request({
            url: 'wxapp/home/nav',
            cachetime: '30',
            success: function (res) {
                if (!res.data.message.errno) {
                    console.log(res.data.message.message);
                    that.setData({
                        navs: res.data.message.message
                    });
                }
            }
        });
        app.globalData.util.request({
            url: 'wxapp/home/slide',
            cachetime: '30',
            success: function (res) {
                if (!res.data.message.errno) {
                    that.setData({
                        slide: res.data.message.message
                    });
                }
            }
        });
        app.globalData.util.request({
            url: 'wxapp/home/commend',
            cachetime: '30',
            success: function (res) {
                if (!res.data.message.errno) {
                    that.setData({
                        commend: res.data.message.message
                    });
                }
            }
        });
    },
    methods: {}
};
</script>
<style>
.container {
    background: #e6e6e6;
}

.nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
    width: 100%;
}

.nav-item {
    width: 248rpx;
    height: 237rpx;
    border: #c9c9c9 solid 1px;
    color: #fff;
    flex-direction: column;
    text-align: center;
    border-left: none;
    border-top: none;
}

.nav-item.nav-item-no-border {
    border-right: none;
}

.nav-item .nav-icon {
    width: 118rpx;
    height: 118rpx;
    align-items: center;
    margin-top: 38rpx;
}

.nav-item .nav-title,
.commend-item .commend-title {
    color: #000;
    margin-top: 20rpx;
    font-size: 24rpx;
}

.swiper {
    width: 100%;
    height: 350rpx;
}

.swiper swiper {
    width: 100%;
    height: 100%;
}

.swiper image {
    width: 100%;
    height: 100%;
}

.commend {
    width: 100%;
    text-align: center;
    flex-wrap: wrap;
    margin-top: 20rpx;
    background: #fff;
}

.commend .commend-column {
    display: flex;
}

.commend .commend-header-title {
    text-align: left;
    line-height: 98rpx;
    font-size: 30rpx;
    padding-left: 15rpx;
}

.commend .commend-item {
    display: flex;
    flex-direction: column;
    border-right: #c9c9c9 solid 1px;
    padding-bottom: 60rpx;
    width: 372rpx;
}

.commend .commend-item image {
    width: 100%;
    height: 210rpx;
}
</style>
