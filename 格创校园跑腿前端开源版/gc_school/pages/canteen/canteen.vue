<template>
    <block>
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="backText"></view>
            <view slot="content">商家列表</view>
        </cu-custom>
        <view class="header"></view>
        <view class="search margin" @click="go('/gc_school/pages/canteen/list')">
            <image
                class="icon"
                src="/static/search.png"
                mode="scaleToFill"
            />
            <view class="input-placeholder">
                搜你喜欢
            </view>
            <!-- <input
                v-model="search_value"
                placeholder=""
                placeholder-class="input-placeholder"
            /> -->
        </view>

        <view class="slide_box padding-left padding-right margin-top" v-if="slideList.length > 0" style="max-height: 250rpx">
            <swiper circular :autoplay="autoplay" class="swiper-box" @change="index_swiperChange" :duration="duration" style="height: 240rpx">
                <swiper-item v-for="(item, index) in slideList" :key="index">
                    <image
                        style="height: 240rpx"
                        @tap="slideJump"
                        :data-url="item.url"
                        :data-type="item.url_type"
                        :class="index_swiperCurrent == index ? 'on slide-image' : ' slide-image'"
                        :data-index="index"
                        :lazyLoad="true"
                        :src="item.img"
						mode="widthFix"
                    ></image>
                </swiper-item>
            </swiper>
            <view class="indicator-dots">
                <block v-for="(item, index) in slideList" :key="index">
                    <view :class="index_swiperCurrent == index ? 'dots_on' : ''"></view>
                </block>
            </view>
        </view>
        <view class="navs flex margin">
            <block v-for="(item,index) in list" :key="index">
                <view class="nav" @click="go('/gc_school/pages/canteen/list?type_id='+item.type_id)">
                    <image
                        class="icon"
                        :src="item.type_image"
                        mode="scaleToFill"
                    />
                    {{item.type_name}}
                </view>
            </block>
        </view>
        <view class="tit padding-lr margin-top">
            附近商家
        </view>
        <block v-if="list.length > 0">
            <!-- <view class="cate_box">
                <view @tap="cateTab" :data-index="index" :class="'cate_item ' + (index == cate_index ? 'cate_active' : '')" v-for="(item, index) in list" :key="index">
                    {{ item.type_name }}
                </view>
            </view> -->
            <!-- <view class="cate_box">
                <view @tap="cateTab" :data-index="index" :class="'margin-right cate_item2 ' + (index == cate_index ? 'cate_active2' : '')" v-for="(item, index) in list" :key="index">
                    {{ item.type_name }}
                </view>
            </view> -->
        </block>

        <block v-if="goods.length > 0">
            <view class="padding-bottom-xl store_list" >
                <view class="goods_item padding flex" @tap="toStore" :data-id="item.business_id" 
                    v-for="(item, index) in goods" :key="index" v-if="1==2">
                    <image class="goods_img" :src="item.business_image"></image>

                    <view class="flex margin-left justify-between right_content">
                        <view>
                            <view class="name text-lg text-bold">{{ item.business_name }}</view>
                            <view class="text-sm text-grey">{{ item.business_address }}</view>
                        </view>
                        <view class="text-df" style="color: #00bb67">营业时间：{{ item.start_time }}-{{ item.end_time }}</view>
                    </view>
                    <view class="badge text-df" v-if="item.type == 1">校内</view>
                    <view class="badge text-df" v-else>校外</view>
                </view>
          
                <block v-for="(item,index) in goods" :key="index">
                    <view class="store margin-lr row padding box-shadow margin-top" @tap="toStore" :data-id="item.business_id" >
                        <image
                            class="main_img" 
                          
                            :src="(item.business_image==''||item.business_image=='undefined/undefined')?'https://test.fkynet.net/wximage/empty.jpg':item.business_image"
                        />
                        <view class="store_info margin-left-sm  padding-tb-xs ">
                            <view class="tit">
                                {{item.business_name }}
                            </view>
                            <image class="store_close" v-if="item.is_open==0" src="/static/icon/store_closes.png" mode="" />

                            <view class="flex margin-top-xs">
                                <!-- <view class="fen">4.6分</view> -->
                                <view class="sale">已售:{{item.sale_num}}</view>
                                <!-- <view class="time">45分钟</view> -->
                                <view class="mi" style="margin-left:auto;">{{item.juli}}km</view>
                            </view>
                            <view class="tags flex">
                                <view class="typenei" v-if="item.type == 1">校内</view>
                                <view class="typewai" v-else>校外</view>
                                <view class="tag">起送￥{{item.starting_fee}}</view>
                                <!-- <view class="tag">配送￥0.9</view> -->
                                
                            </view>
                        </view>
                    </view>
                </block>
            </view>
        </block>

        <block v-else>
            <view class="nodatas">
                <image src="/static/images/store/empty.png" style="width: 250rpx" mode="widthFix"></image>
                <view>暂无数据~</view>
            </view>
        </block>

        <view v-if="!is_loadmore && goods.length > 0" class="text-center margin-bottom text-df">没有更多数据了~</view>
		
		<image v-if="isTop" class="top_icon" src="/static/images/article/tops2.png" @tap="top"></image>
		
        <!-- <view class="tops" wx:if="{{list.length > 0}}">
	<block wx:for="{{list}}">
		<view class="contents" bindtap="bank_content" data-id="{{item.id}}">
			<image src="{{item.img}}"></image>
			<view class="title">{{item.name}}</view>
		</view>
	</block>
	
</view>
<view class="nodatas" wx:else>
	<image src="/images/nodata.png" style="width: 110rpx;height: 110rpx;"></image>
	<view>暂无数据~</view>
</view> -->
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            list: [],
            index_swiperCurrent: 0,
            goods: [],
            cate_index: 0,
            page: 1,
            is_loadmore: true,
            slideList: '',
            autoplay: 0,
            duration: '',
            search_value:"",
			isTop:false,
            navList:[
                {icon: '/static/nav/nav1.png',name:"早餐"},
                {icon: '/static/nav/nav2.png',name:"早餐"},
                {icon: '/static/nav/nav3.png',name:"早餐"},
                {icon: '/static/nav/nav4.png',name:"早餐"},
                {icon: '/static/nav/nav5.png',name:"早餐"},
            ]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    async onLoad(options) {
        var that = this;
		await this.getLocations()
        that.getSlide();
        var shcool_id = uni.getStorageSync('schoolId');
        app.globalData.util.request({
            url: 'ZhBusinesType/index',
			method: 'GET',
            data: {
                s_id: shcool_id
            },
            success(res) {
                if (res.data.status == 200) {
                    that.list =[
                        ... res.data.data.list,
                    ]
					if(res.data.data.list.length>0)
					{
						that.getStore();
					}
                }
            }
        });
    },
    onShow: function (e) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
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
            var page = this.page + 1;
            this.setData({
                page: page
            });
            this.getStore();
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
		onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
			if (e.scrollTop > 200) { //距离大于200时显示
				this.isTop = true
			} else { //距离小于200时隐藏
				this.isTop = false
			}
		},
		top() { //回到顶部
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
		},
        cateTab(e) {
            this.setData({
                cate_index: e.currentTarget.dataset.index,
                goods: [],
                page: 1,
                is_loadmore: true
            });
            this.getStore();
        },

        async getStore() {
            var that = this;
            uni.showLoading({
                title: '加载中'
            });
			
            app.globalData.util.request({
                url: 'ZhBusinesType/getBusiness',
				method: 'GET',
                data: {
					latitude: uni.getStorageSync('latitude'),
					longitude: uni.getStorageSync('longitude'),
                    // ...localtion,
                    // type_id: that.list[that.cate_index]['type_id'],
                    page: that.page,
					s_id: uni.getStorageSync('schoolId'),
                },

                success(res) {
                    uni.hideLoading({});
                    if (res.data.status == 200) {
                        if (res.data.data.data.length < 6) {
                            that.is_loadmore = false
                        }

                        var good = [...that.goods, ...res.data.data.data];
                        that.goods = good
                    }
                }
            });
        },

        toStore(e) {
            uni.navigateTo({
                url: '/gc_school/pages/foold/foold?id=' + e.currentTarget.dataset.id
            });
        },

        index_swiperChange: function (e) {
            this.setData({
                index_swiperCurrent: e.detail.current
            });
        },

        //轮播图跳转
        slideJump(e) {
            console.log(e);

            if (e.currentTarget.dataset.type == 1) {
                uni.navigateTo({
                    url: e.currentTarget.dataset.url
                });
            } else {
                if (e.currentTarget.dataset.type == 2) {
                    console.log('appid是', e.currentTarget.dataset.url);
                    uni.navigateToMiniProgram({
                        appId: e.currentTarget.dataset.url,
                        path: '',
                        extraData: {
                            foo: 'bar'
                        },
                        envVersion: 'release',

                        success(res) {
                            console.log('打开成功');
                        }
                    });
                } else if (e.currentTarget.dataset.type == 3){
                    uni.navigateTo({
                        url: '/gc_school/pages/webview/index?url=' + e.currentTarget.dataset.url
                    });
                }
            }
        },

        //获取轮播图
        getSlide() {
            var that = this;
            app.globalData.util.request({
                url: 'Slide/index',
                // method: 'POST',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    show_type: 5
                },
                success(res) {
                    that.slideList = res.data.data.list
                }
            });
        },

        bank_content: function (e) {
            uni.navigateTo({
                url: '../store/index?id=' + e.currentTarget.dataset.id // url: '../foold/foold?id=' + e.currentTarget.dataset.id,
            });
        }
    }
};
</script>
<style lang="scss">
    
@import "./main.scss";

page {
    background-color: white;
}
.tops {
    width: 100%;
    padding: 30rpx 30rpx;
    box-sizing: border-box;
    margin-top: 10rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.contents {
    width: 48%;
    /* display: flex; */
    /* border-bottom: 1px solid #e7e7e7; */
    align-items: center;
    /* padding-bottom: 20rpx; */
    justify-content: space-between;
    margin-bottom: 40rpx;
}
.contents image {
    width: 100%;
    height: 200rpx;
    border-radius: 10rpx;
}
image {
    /* width: 16rpx; */
    /* height: 30rpx; */
}
.title {
    font-size: 30rpx;
    width: 100%;
    margin-top: 20rpx;
}
.nodatas {
    // position: fixed;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    text-align: center;
    margin-top: 200rpx;
    color: #000000;
    font-size: 30upx;
}
.bgmain {
    background-color: #ff6344;
    color: white;
}
.cuIcon-back {
    color: white;
}
.cuIcon-right {
    font-size: 36rpx;
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

.cate_box {
    display: flex;
    white-space: nowrap;
    overflow-x: scroll;
    margin: 30rpx 30rpx 20rpx;
}
.cate_box .cate_item {
    background: #f9f9f9;
    color: black;
    font-size: 26rpx;
    padding: 15rpx 30rpx;
    margin: 0 35rpx 0 0;
    border-radius: 5rpx;
}
.cate_active {
    background: #fff0ed !important;
    color: #fe4f2d !important;
}
.goods_item {
    border-bottom: 1rpx solid #f2f2f2;
    position: relative;
}
.goods_img {
    width: 200rpx;
    height: 170rpx;
    border-radius: 20rpx;
    flex-shrink: 0;
}
.name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 500rpx;
}
.right_content {
    flex-direction: column;
    margin: 15rpx 20rpx;

    /* padding-bottom: 20rpx; */
    /* height: 180rpx; */
}
.right_content view {
    line-height: 50rpx;
}
.badge {
    width: 70rpx;
    height: 55rpx;
    background: red;
    text-align: center;
    line-height: 55rpx;
    color: white;
    position: absolute;
    border-radius: 20rpx;
}
.top_icon{
	position: fixed;
	right: 20rpx;
	bottom: 250rpx;
	background-color: white;
	border-radius: 50%;
	width: 95rpx !important;
	height: 95rpx !important;
	margin: auto;
}
</style>