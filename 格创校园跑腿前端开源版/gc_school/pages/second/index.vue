<template>
    <block>
        <view class="contents">二手市场</view>
        <!-- <van-search bindtap="onFocus" placeholder="请输入搜索关键词" value="{{value}}"></van-search> -->
        <!-- <view>
    <swiper autoplay="{{autoplay}}" class="swiper-box" duration="{{duration}}" indicatorDots="{{indicatorDots}}" interval="{{interval}}">
        <swiper-item >
            <image bindtap="previewImg" class="slide-image" data-index="{{index}}" lazyLoad="true" src="https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3de9ba8ee1194eef01f3a2979a8.jpg"></image>
        </swiper-item>
        <swiper-item >
            <image bindtap="previewImg" class="slide-image" data-index="{{index}}" lazyLoad="true" src="https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/9c16fdfaaf51f3de9ba8ee1194eef01f3a2979a8.jpg"></image>
        </swiper-item>
    </swiper>
</view> -->
        <view class="kind_contain">
            <view @tap="cateSelect" :class="'nav-item ' + (currentIndex == index ? 'tab-on' : '')" :data-index="index" v-for="(item, index) in cateList" :key="index">
                {{ item.name }}
            </view>
        </view>
        <view style="background: white; padding-bottom: 150rpx">
            <view @tap="toDetail" class="list_box" :data-id="item.id" v-for="(item, index) in goodsList" :key="index">
                <image class="list_poster" :src="item.img[0]"></image>

                <view class="list_content">
                    <view class="list_word">
                        <view class="list_title text-cut">{{ item.name }}</view>
                        <view class="list_author text-cut">
                            {{ item.college }}
                            <!-- <view class="eye">
                        <image lazyLoad="true" src="../../../../../../images/view.png"></image>
                        <view class="viewnum">12</view>
                    </view> -->
                        </view>
                    </view>
                    <view class="list_between">
                        <view class="list_price">￥{{ item.price }}元</view>
                        <view style="color: #cccccc; text-decoration: line-through; font-size: 12px; line-height: 40px">原价:{{ item.oldprice }}元</view>
                    </view>
                </view>
            </view>
            <view class="loadmore" v-if="!loadmore && goodsList.length > 0">暂无更多数据~</view>
        </view>
        <view class="nocontent" v-if="goodsList.length == 0">
            <image lazyLoad mode="aspectFit" src="/static/images/empty.png"></image>
            <view class="blank_text">暂无数据哦~</view>
        </view>

        <!-- <view class="cu-bar tabbar foot bgmain">
	<view class="action text-white">
		<navigator url='/gc_school/pages/home/index' open-type="redirect" hover-class='none'>
		<image id="cuIcon-homefills" src="/images/home.png"></image> 
		<view class="indedxs">首页</view>
		</navigator>
	</view>
	<view class="action text-white">
        <image id="cuIcon-homefills" src="/images/seconds_s.png"></image> 
        <view class="indedx">二手市场</view>
	</view>
    <view class="action text-white">
        <navigator url='/gc_school/pages/order/index' open-type="redirect" hover-class='none'>
            <image id="cuIcon-homefills" src="/images/myorder.png"></image> 
            <view class="indedxs">订单</view>
        </navigator>
	</view>
	<view class="action text-white">
		<navigator url='/gc_school/pages/user/index' open-type="redirect" hover-class='none'>
		<image id="cuIcon-homefills" src="/images/my.png"></image> 
			<view class="indedxs">我的</view>
		</navigator>
	</view>
</view> -->

        <view class="publish" @tap="publish" v-if="islog == true">发布</view>
        <view class="my" @tap="my" v-if="islog == true">我的</view>
        <view class="search" @tap="search">搜索</view>
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
            cateList: [],
            goodsList: [],
            islog: false,
            page: 1,
            loadmore: true,
            showList: false
        };
    },
    onLoad: function () {},
    onShow() {
        this.getCate();
        this.setData({
            currentIndex: 0,
            goodsList: [],
            page: 1,
            loadmore: true
        });

        if (uni.getStorageSync('openid')) {
            this.setData({
                islog: true
            });
        }
    },
    onReachBottom: function () {
        this.setData({
            page: this.page + 1
        });

        if (this.loadmore) {
            this.getGoods();
        }
    },
    methods: {
        getCate() {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/secondCate',
                data: {
                    sid: uni.getStorageSync('schoolId')
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        cateList: res.data.data
                    });
                    self.getGoods();
                }
            });
        },

        getGoods() {
            var self = this;
            console.log('分类', self.cateList);
            app.globalData.util.request({
                url: 'entry/wxapp/secondGoods',
                data: {
                    page: self.page,
                    sid: uni.getStorageSync('schoolId'),
                    cid: self.cateList[self.currentIndex].id
                },

                success(res) {
                    if (res.data.data.length < 8) {
                        self.setData({
                            loadmore: false
                        });
                    }

                    console.log(res.data.data);

                    if (this.page == 1) {
                        self.setData({
                            goodsList: res.data.data
                        });
                    } else {
                        for (var i = 0; i < res.data.data.length; i++) {
                            self.setData({
                                goodsList: [...self.goodsList, res.data.data[i]]
                            });
                        }
                    } // console.log(res.data.data)
                    // self.setData({
                    //   goodsList:res.data.data
                    // })
                }
            });
        },

        cateSelect(e) {
            this.setData({
                currentIndex: e.currentTarget.dataset.index,
                page: 1,
                loadmore: true
            });
            this.getGoods();
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
        },

        publish() {
            uni.navigateTo({
                url: '/gc_school/pages/addsecond/index'
            });
        },

        my() {
            uni.navigateTo({
                url: '/gc_school/pages/mysecond/index'
            });
        },

        search() {
            uni.navigateTo({
                url: '/gc_school/pages/search/index'
            });
        }
    }
};
</script>
<style>
.contents {
    padding: 70rpx 0 30rpx 0;
    color: white;
    font-size: 30rpx;
    text-align: center;
    background: #ff6444;
    /* background: white; */
    /* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
}
.bgmain {
    background-color: #fff !important;
}
.loadmore {
    display: flex;
    justify-content: center;
}

.loadmore image {
    width: 50rpx;
    height: 50rpx;
    margin-top: 20rpx;
}

.loadmore view {
    color: rgb(189, 184, 184);
    font-size: 30rpx;
}

page {
    background: white;
}

.slide-image {
    height: 100%;
    width: 100%;
    display: inline-block;
    overflow: hidden;
    border-radius: 50rpx;
}

.swiper-box {
    padding: 10rpx 20rpx 10rpx 20rpx;
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}

.space {
    width: 100%;
    height: 20rpx;
    background: #eee;
}

.kind_contain {
    /* width: 100%; */
    height: 90rpx;
    display: flex;
    border-bottom: 1rpx solid #eee;
    background: #fff;
    align-items: center;
    position: relative;
    z-index: 3;
    overflow-x: scroll;
    margin: 0 20rpx;
}

.nav {
    width: calc(100% - 180rpx);
    height: 100%;
    white-space: nowrap;
    display: flex;
    box-sizing: border-box;
}

.nav-item {
    /* width: 150rpx; */
    display: inline-block;
    font-size: 32rpx;
    margin-right: 20rpx;
    white-space: nowrap;
}

.nav-text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 4rpx;
    box-sizing: border-box;
}

.tab-on {
    color: #7acfa6;
    font-size: 32rpx !important;
    font-weight: 600;
    /* border-bottom: 4rpx solid #7acfa6!important; */
}

.kind_img {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.kind_img image {
    width: 32rpx;
    height: 32rpx;
}

.kindlist_box {
    position: absolute;
    width: 100%;
    top: 90rpx;
    left: 0rpx;
    border-bottom: 1rpx solid #eee;
    z-index: 3;
}

.kindlist_card {
    padding: 20rpx 20rpx 0 20rpx;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    background: #fff;
}

.list_grid {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.list_one {
    width: 25%;
    padding: 0 10rpx 20rpx 10rpx;
    display: flex;
    box-sizing: border-box;
}

.list_one view {
    width: 100%;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1rpx solid #eee;
    border-radius: 10rpx;
    font-size: 28rpx;
    letter-spacing: 2rpx;
}

.list-on {
    background: #7acfa6;
    color: #fff;
    border: none !important;
}

.list_box {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20rpx;
    box-sizing: border-box;
}

.list_poster {
    width: 150rpx;
    height: 150rpx;
    border-radius: 10rpx;
}

.list_content {
    height: 160rpx;
    width: calc(100% - 150rpx);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 10rpx;
    box-sizing: border-box;
}

.list_word {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
}

.list_title {
    width: 100%;
    font-size: 32rpx;
    letter-spacing: 3rpx;
    line-height: 45rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
}

.list_word .eye {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    float: right;
    align-items: center;
}

.list_word .eye image {
    width: 40rpx;
    height: 40rpx;
    padding-right: 5px;
}

.viewnum {
    font-size: 12px;
}

.list_author {
    padding-top: 10rpx;
    width: 100%;
    font-size: 27rpx;
    letter-spacing: 3rpx;
    line-height: 40rpx;
    color: rgb(129, 129, 129);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.list_between {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #eee;
    padding-bottom: 10rpx;
    padding-top: 0rpx;
}

.list_price {
    font-size: 32rpx;
    color: rgb(255, 0, 0);
    margin-right: 20rpx;
}

.list_time {
    font-size: 28rpx;
    letter-spacing: 2rpx;
    color: rgb(129, 129, 129);
}

.list_between image {
    width: 45rpx;
    height: 45rpx;
    margin-left: 20px;
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

.fixed {
    position: fixed;
    left: 0rpx;
    top: 0rpx;
}

.nofixed {
    height: 91rpx;
    width: 100%;
    background: #fff;
}
.indedx {
    color: #ff6444;
    font-size: 22rpx;
    padding: 10rpx 0 10rpx 0;
}

.indedxs {
    color: #010101;
    font-size: 22rpx;
    margin-top: 10rpx;
    padding: -1rpx 0 10rpx 0;
    box-sizing: border-box;
}
#cuIcon-homefills {
    width: 48rpx !important;
    position: relative !important;
    display: block !important;
    height: 48rpx !important;
    margin: 0 auto 10rpx !important;
    text-align: center !important;
    font-size: 40rpx !important;
}
#cuIcon-homefillt {
    width: 72rpx !important;
    position: absolute !important;
    display: block !important;
    height: 72rpx !important;
    margin: 0 auto 10rpx !important;
    text-align: center !important;
    font-size: 40rpx !important;
    top: 0;
    left: 0;
}
.publish {
    position: fixed;
    right: 20rpx;
    bottom: 30%;
    width: 100rpx;
    height: 100rpx;
    background-color: #7acfa6;
    text-align: center;
    line-height: 100rpx;
    border-radius: 50%;
    color: white;
}
.my {
    position: fixed;
    right: 20rpx;
    bottom: 20%;
    width: 100rpx;
    height: 100rpx;
    background-color: #ff6444;
    text-align: center;
    line-height: 100rpx;
    border-radius: 50%;
    color: white;
}
.search {
    position: fixed;
    right: 20rpx;
    bottom: 40%;
    width: 100rpx;
    height: 100rpx;
    background-color: #ff0000;
    text-align: center;
    line-height: 100rpx;
    border-radius: 50%;
    color: white;
}
</style>
