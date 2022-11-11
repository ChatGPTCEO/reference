<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="content">搜索</view>
        </cu-custom>

        <view class="">
            <view class="search_box bg-white">
                <input placeholder="输入物品搜索" @confirm="searchInput" />
            </view>
            <!-- 文章列表 -->
            <view class="padding-bottom" style="padding-bottom: 100rpx">
                <block v-if="dataList.length == 0">
                    <view class="text-center margin-top text-df">暂无数据~</view>
                </block>
                <block v-else>
                    <block key="index" v-for="(item, index) in dataList" :key="index">
                        <view class="article_box padding margin" @tap="toDetail" :data-id="item.info_id">
                            <view class="flex">
                                <image class="avatar" :src="item.avatar ? item.avatar : '/static/images/code/c17.png'"></image>
                                <view class="">
                                    <view class="nickname">{{ item.nickname }}</view>
                                    <view class="date">{{ item.time }}</view>
                                </view>
                            </view>
                            <view class="item text-lg text-bold">{{ item.title }}</view>
                            <view v-if="item.media_type == '1'" class="margin-top">
                                <video @tap.stop.prevent="play" style="width: 100%" :src="item.video"></video>
                            </view>
                            <view v-else-if="item.media_type == '2'" class="margin-top">
                                <block v-for="(img, index1) in item.image" :key="index1">
                                    <image @tap.stop.prevent="preview" mode="aspectFill" :data-img="img" :data-list="item.image" class="item_img" :src="img"></image>
                                </block>
                            </view>
                            <view class="item flex align-center text-bold">
                            	<image class="icon" src="../../../static/icon/lost/location.png"></image>
                            	{{item.type==1?'拾物地点':'丢失地点'}}：<text class="val">{{ item.address }}</text>
                            </view>
                            <view class="item flex align-center text-bold" v-if="item.pick_date">
                            	<image class="icon" src="../../../static/icon/lost/date.png"></image>
                            	{{item.type==1?'拾物时间':'丢失时间'}}：<text class="val">{{ item.pick_date }}</text>
                            </view>
                            <view class="item flex align-center text-bold" v-if="item.phone">
                            	<image class="icon" src="../../../static/icon/lost/phone.png"></image>
                            	联系电话：<text class="val">{{ item.phone }}</text>
                            </view>
                        </view>
                    </block>
                </block>
            </view>
        </view>
    </block>
</template>

<script>
// gc_school/pages/article/index.js
var app = getApp();
export default {
    data() {
        return {
            url: '',
            info: [1, 2, 3],
            index_swiperCurrent: 0,

            cateList: [
                {
                    name: '失物招领'
                },
                {
                    name: '寻物启事'
                }
            ],

            cate_index: 0,
            dataList: [],
            type: 1,
            is_loadmore: true,
            page: 1,
            slideList: [],
            freshen: true,
            kwd: '',
            img: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
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
        if (this.is_loadmore) {
            this.setData({
                page: this.page + 1
            });
            this.search(this.kwd);
        } else {
            uni.showToast({
                title: '没有更多数据了~',
                icon: 'none'
            });
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        //进入详情页面
        toDetail(e) {
            console.log(e.currentTarget.dataset.id);
            uni.navigateTo({
                url: '/gc_school/pages/lost/detail?id=' + e.currentTarget.dataset.id
            });
        },

        //图片预览
        preview(e) {
            this.setData({
                freshen: false
            });
            uni.previewImage({
                current: e.currentTarget.dataset.img,
                urls: e.currentTarget.dataset.list
            });
        },

        //搜索
        searchInput(e) {
            var kwd = e.detail.value.replace(/\s+/g, '');

            if (!kwd) {
                app.globalData.util.message('请输入物品', '', 'error');
                return;
            }

            this.setData({
                kwd: kwd,
                page: 1,
                dataList: [],
                is_loadmore: true
            });
            this.search(kwd);
        },

        //获取文章列表
        search(kwd) {
            var that = this;
            app.globalData.util.request({
                url: 'ZhInfo/searchInfo',
                method: 'GET',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    kwd: kwd,
                    page: that.page
                },

                success(res) {
                    console.log(res.data.data);

                    if (res.data.data.list.length < 5) {
                        that.setData({
                            is_loadmore: false
                        });
                    }

                    for (var i = 0; i < res.data.data.list.length; i++) {
                        that.dataList.push(res.data.data.list[i]);
                        that.setData({
                            dataList: that.dataList
                        });
                    }
                }
            },true);
        },

        upload() {
            var that = this;
            uni.chooseMedia({
                success(res) {
                    console.log(res);
                    console.log(res.type);
                    console.log(res.tempFiles[0]['tempFilePath']);
                    that.setData({
                        url: res.tempFiles[0]['tempFilePath']
                    }); // console.log(res)
                    // console.log(res.tempFilePaths[0])
                }
            });
        },

        play() {
            console.log('占位：函数 play 未声明');
        }
    }
};
</script>
<style>
page {
    background: #F7F5F6;
}
.search_box{
	padding: 10rpx 20rpx;
}
.contents {
    padding: 70rpx 0 30rpx 0;
    color: white;
    font-size: 30rpx;
    text-align: center;
    background: #ff6444;
    /* background: white; */
    /* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
}
.slide_box {
    position: relative;
    /* padding:20rpx 0; */
    background-color: white;
}
.swiper-box {
    /* padding: 10rpx 20rpx 10rpx 20rpx; */
}
.indicator-dots {
    width: 100%;
    position: absolute;
    bottom: 30rpx;
    left: 0;
    display: flex;
    justify-content: center;
}

.indicator-dots view {
    width: 12rpx;
    height: 12rpx;
    background: #d1d1d1;
    margin: 0 5rpx;
    border-radius: 50%;
}
.indicator-dots view.dots_on {
    background: white;
}
/* 分类 */
.cate_box {
}
.cate_item_box {
    margin-right: 20rpx;
    /* width: 75%; */
    overflow: scroll;
    height: 60rpx;
    width: 100%;
}
.cate_item {
    margin: 0 30rpx;
    font-size: 34rpx;
    color: #999999;
    position: relative;
    flex-shrink: 0;
    height: 40rpx;
    /* width: 50%; */
    /* text-align: center; */
}
.cate_active {
    color: black;
    font-weight: bold;
    font-size: 34rpx;
}
.cate_active::after {
    position: absolute;
    content: '';
    width: 60rpx;
    height: 2rpx;
    background: #ff6344;
    bottom: -10rpx;
    left: 0;
    right: 0;
    margin: 0 auto;
}
.label_box {
    /* width: 25%; */
    flex-shrink: 0;
}
.label_item {
    border: 2rpx solid #ff6344;
    padding: 5rpx 15rpx;
    color: #ff6344;
}
.label_item_active {
    background: #ff6344;
    color: white;
}

/* 文章列表 */
.article_box {
    margin-top: 40rpx;
	background-color: white;
    /* box-shadow: 0px 4px 20px 0px rgba(153, 153, 153, 0.1); */
    border-radius: 20rpx;
}
.article_box .avatar {
    width: 75rpx;
    height: 75rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}
.article_box .nickname {
    font-size: 30rpx;
    font-weight: bold;
}
.article_box .date {
    font-size: 24rpx;
    color: #999999;
}
.icon_item image {
    width: 35rpx;
    height: 35rpx;
}
.icon_item text {
    margin-left: 10rpx;
    color: #999999;
}
.btn {
    background: #ff6344;
    color: white;
    width: 70%;
    margin-left: 15%;
    padding: 30rpx;
    border-radius: 50rpx;
    position: fixed;
    bottom: 20rpx;
}
.item_img {
    width: 180rpx;
    height: 180rpx;
    margin-right: 20rpx;
}
.my_fixed {
    width: 90rpx;
    height: 90rpx;
    position: fixed;
    right: 0;
    bottom: 20%;
    background: #ff6344;
    border-radius: 50%;
    line-height: 90rpx;
    text-align: center;
    color: white;
}
input {
    /* border: 1rpx solid #FF6444; */
    height: 70rpx;
    width: 90%;
    border-radius: 50rpx;
    margin: 10rpx auto 15rpx;
    background: #f2f2f2;
    text-align: center;
    line-height: 70rpx;
    font-size: 28rpx;
    color: gray;
}
.item {
    font-size: 30rpx;
    /* line-height: 50rpx; */
    margin: 20rpx 0;
}
.icon{
	width: 30rpx;
	height: 30rpx;
	margin-right: 10rpx;
}
.val{
	color: #666666;
	font-size: 28rpx;
	/* font-weight: 200; */
}
</style>
