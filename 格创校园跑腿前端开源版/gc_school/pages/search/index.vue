<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">搜索</view>
        </cu-custom>
        <view class="search">
            <input placeholder="请输入关键词" @input="kwdinput" @confirm="searchs" />
            <view class="text" @tap="searchs">搜索</view>
        </view>
        <view class="nocontent" v-if="goodsList.length == 0">
            <image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
            <view class="blank_text">暂无数据哦~</view>
        </view>
        <view class="list">
            <view @tap="toDetail" class="list_item" :data-id="item.id" v-for="(item, index) in goodsList" :key="index">
                <navigator :url="'../details/details?id=' + item._id">
                    <view class="img">
                        <image mode="scaleToFill" :src="item.img[0]"></image>
                    </view>
                    <view class="info">
                        <view class="title">{{ item.name }}</view>
                        <view class="price">
                            <view class="p">￥{{ item.price }}</view>
                        </view>
                    </view>
                </navigator>

                <view class="clear"></view>
            </view>
        </view>
    </block>
</template>

<script>
//index.js
//获取应用实例
var app = getApp();
export default {
    data() {
        return {
            indicatorDots: true,
            common: '通用',
            currentIndex: 0,
            goodsList: [],
            kwd: '',
            showList: false
        };
    },
    onLoad: function () {
        // this.search();
    },
    methods: {
        search() {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/secondSearch',
                data: {
                    sid: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        goodsList: res.data.data
                    });
                }
            });
        },

        kwdinput(e) {
            console.log(e.detail.value);
            this.setData({
                kwd: e.detail.value
            });
        },

        searchs() {
            var self = this;

            if (self.kwd == '') {
                uni.showToast({
                    title: '请输入要搜索的内容',
                    icon: 'none'
                });
                return;
            }

            app.globalData.util.request({
                url: 'entry/wxapp/secondSearch',
                data: {
                    keywords: self.kwd,
                    sid: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        goodsList: res.data.data
                    });
                }
            });
        },

        //进入详情
        toDetail(e) {
            uni.navigateTo({
                url: '/gc_school/pages/seconddetail/index?id=' + e.currentTarget.dataset.id
            });
        },

        showlist: function () {
            if (this.showList) {
                this.setData({
                    showList: false
                });
            } else {
                this.setData({
                    showList: true
                });
            }
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
.clear {
    clear: both;
    overflow: hidden;
}

.menu {
    height: 40px;
}

.list {
    width: 100%;
    padding-bottom: 50rpx;
}

.search {
    width: 100%;
}

.m {
    width: 100%;
}

.list_item {
    margin-top: 10px;
    padding: 10px;
    height: 90px;
    border-bottom: 1px solid #e8e8e8;
    background-color: white;
    border-radius: 10px;
    margin-left: 10rpx;
    margin-right: 10rpx;
    position: relative;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
}

.list_item .img {
    float: left;
    width: 25%;
    height: 70px;
}

.list_item .img image {
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
}

.list_item .info {
    width: 75%;
    height: 70px;
    float: right;
}

.list_item .info .title {
    color: #333;
    margin-left: 10px;
    font-size: 32rpx;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.eye-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    justify-content: space-between;
}

.college {
    color: #333;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 80px;
}

.list_item .info .oldornew {
    color: #333;
    margin-left: 10px;
    font-size: 12px;
}

.list_item .info .price {
    color: #ff2727;
    margin-bottom: 10px;
    margin-left: 10px;
    font-size: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30rpx;
}

.p {
    margin-right: 110px;
}

.list_item .info .num {
    position: absolute;
    left: 0px;
    bottom: 10px;
    color: #747474;
    margin-left: 10px;
    font-size: 15px;
}

.eye {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.eye image {
    width: 40rpx;
    height: 40rpx;
    padding-right: 5px;
}

.eye.viewnum {
    font-size: 5px;
}

.buy {
    display: flex;
    width: 45rpx;
    height: 45rpx;
    float: right;
}

.goTop {
    height: 80rpx;
    width: 80rpx;
    position: fixed;
    bottom: 50rpx;
    right: 30rpx;
    background: white;
    border-radius: 50%;
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
.search {
    width: 100%;
    background-color: white;
    padding: 20rpx;
    display: flex;
}
.search input {
    background-color: #f8f7fa;
    width: 80%;
    padding: 10rpx;
    font-size: 28rpx;
    height: 70rpx;
    line-height: 70rpx;
}
.search .text {
    line-height: 70rpx;
    margin-left: 20rpx;
    width: 90rpx;
    height: 70rpx;
    text-align: center;
    color: white;
    background-color: #ff6444;
}
</style>
