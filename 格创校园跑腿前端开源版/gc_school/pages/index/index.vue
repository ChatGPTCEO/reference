<template>
    <block>
        <!-- <cu-custom bgColor="bgmain" id="vont">
    <view slot="content">首页</view>
</cu-custom> -->

        <view class="container">
            <!--     <view class="modal" wx:if="{{getUseInfo}}">
        <view class="m_box tc">
            <view class="title">提示</view>
            <view class="fs30 p20">请先开启用户授权</view>
            <view class="border_top_2">
                <button bindgetuserinfo="getUsetInfo" class="m_btn" openType="getUserInfo">确定</button>
            </view>
        </view>
    </view> -->
            <view class="content">首页</view>
            <view class="cu-bar search bgmain" id="tops">
                <view class="cu-avatar round" :style="'background-image:url(' + userInfo.avatarUrl + ');'"></view>
                <view class="search-form round">
                    <text class="cuIcon-search"></text>
                    <navigator url="/gc_school/pages/order/index" hover-class="none">
                        <input type="text" placeholder="订单查询" disabled confirm-type="search" />
                    </navigator>
                </view>
                <view class="cu-form-group">
                    <picker @change="PickerChange" :value="index" :range="school" range-key="s_name">
                        <view class="picker">
                            {{ school[index].s_name ? school[index].s_name : '选择学校' }}
                        </view>
                    </picker>
                </view>
            </view>

            <view class="page-guide">
                <view class="shop-wrapper">
                    <view class="shop">
                        <view class="shop-banner">
                            <view class="swiper-container">
                                <swiper :autoplay="true" :circular="true" class="swiper-wrapper" :interval="sysparment.speed || 3000">
                                    <view hoverClass="none" :url="item.linkurl" v-for="(item, index) in schoolInfo.school.thums" :key="index">
                                        <swiper-item class="swiper-slide" id="swipers" @tap="openview" :data-url="url + item" :style="'background-image:url(' + (url + item) + ')'">
                                            <image :src="item.img" class="slide-image" width="355" />
                                        </swiper-item>
                                    </view>
                                </swiper>
                            </view>
                        </view>

                        <view class="good-edit">
                            <view class="good-input">
                                <view :class="'good-input-content ' + (showText ? '' : 'active')">
                                    <textarea @input="onGoodsInfo" class="good-input-textarea" maxlength="100" :placeholder="homeitem.params.placeholder" :value="note"></textarea>
                                    <view
                                        @tap="onJsEvent"
                                        class="good-input-submit"
                                        data-type="1"
                                        data-event-type="jsUrl"
                                        :data-url="homeitem.params.submiturl + '&note=' + extra.note"
                                    ></view>
                                </view>
                            </view>

                            <view class="bg-white" id="cus">
                                <view class="action">
                                    <!-- <text class="cuIcon-title text-yellow"></text> -->
                                    <view class="titl">想让你同学帮你做点什么</view>
                                </view>
                                <!-- <scroll-view scroll-x="true" :scroll-into-view="toView">
							<div class="tab-container">
								<div class="tab-item">
									<image bind:tap="onJsEvent" data-type='1' data-url="{{item.linkurl}}" src="/images/code/get_courier.png"></image>
									<image bind:tap="onJsEvent" data-type='2' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="/images/code/post_courier.png"></image>
									<image bind:tap="onJsEvent" data-type='3' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="/images/code/food.png"></image>
									<image bind:tap="onJsEvent" data-type='4' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="/images/code/dai.png"></image>
								</div>
							</div>
						</scroll-view> -->
                                <view class="tab-container">
                                    <view class="tab-item">
                                        <image @tap="onJsEvent" data-type="1" :data-url="item.linkurl" src="https://gcwe7.link1024.com/web/img/home/get_courier.png"></image>
                                        <image
                                            @tap="onJsEvent"
                                            data-type="2"
                                            data-event-type="jsUrl"
                                            :data-url="item.linkurl"
                                            src="https://gcwe7.link1024.com/web/img/home/post_courier.png"
                                        ></image>
                                        <image
                                            @tap="onJsEvent"
                                            data-type="3"
                                            data-event-type="jsUrl"
                                            :data-url="item.linkurl"
                                            src="https://gcwe7.link1024.com/web/img/home/food.png"
                                        ></image>
                                        <image
                                            @tap="onJsEvent"
                                            data-type="4"
                                            data-event-type="jsUrl"
                                            :data-url="item.linkurl"
                                            src="https://gcwe7.link1024.com/web/img/home/dai.png"
                                        ></image>
                                    </view>
                                </view>
                            </view>

                            <!-- <view class="grid col-2 padding-left-sm padding-right-sm padding-bottom-sm bg-white">

						<view class="ctt padding-right-sm padding-bottom-sm">
							<view class="bgmain padding radius text-center light " bind:tap="onJsEvent" data-type='1' data-url="{{item.linkurl}}">
								<view class="text-df">取快递</view>
								<view class='sm'>顺丰菜鸟</view>
								<image></image>
							</view>
						</view>
						<view class="ctt padding-bottom-sm">
							<view class="bgmain padding radius text-center light" bind:tap="onJsEvent" data-type='2' data-event-type="jsUrl" data-url="{{item.linkurl}}">
								<view class="text-df">寄快递</view>
								<view class='sm'>顺丰申通</view>
							</view>
						</view>
						<view class="ctt padding-right-sm">
							<view class="bgmain padding radius text-center light " bind:tap="onJsEvent" data-type='3' data-event-type="jsUrl" data-url="{{item.linkurl}}">
								<view class="text-df">食堂超市</view>
								<view class='sm'>代买代拿</view>
							</view>
						</view>
						<view class="ctt ">
							<view class="bgmain padding radius text-center light" bind:tap="onJsEvent" data-type='4' data-event-type="jsUrl" data-url="{{item.linkurl}}">
								<view class="text-df">无所不能/外卖代拿</view>
								<view class='sm'>外卖代拿</view>
							</view>
						</view>
					</view> -->
                        </view>
                        <view class="contents">
                            <view class="content_top">
                                <view class="crol">
                                    <text class="">
                                        排行榜
                                        <text class="text-sm">赠人玫瑰手留余香</text>
                                    </text>
                                </view>
                                <view class="geng">
                                    <navigator :url="'/gc_school/pages/rank/index?s_id=' + s_id" hover-class="none">
                                        <text class="text-grey">查看更多</text>
                                    </navigator>
                                </view>
                            </view>
                            <view class="cont_con" v-for="(item, index) in schoolInfo.rank" :key="index">
                                <view class="img">
                                    <image :src="item.pic"></image>
                                    <view class="names">
                                        <view>{{ item.username }}</view>
                                        <view class="moneyst">月赚</view>
                                    </view>
                                </view>

                                <view class="money">¥{{ item.money }}</view>
                            </view>
                        </view>

                        <view class="contents">
                            <view class="content_top">
                                <view class="crol">
                                    <text class="">最新订单</text>
                                </view>
                            </view>
                            <view class="block" style="width: 100%; margin: auto" v-if="list.length > 0">
                                <view
                                    id="lops"
                                    class="flex bg-white align-center padding-bottom justify-between"
                                    style="border-bottom: 1rpx solid #f3eded; padding: 10rpx 0 16rpx 0"
                                    @tap="detail"
                                    :data-index="index"
                                    v-for="(item, index) in list"
                                    :key="index"
                                >
                                    <view style="width: 70%">
                                        <view class="padding-tb-sm">
                                            <view class="text-df text-cut" id="text-df">{{ item.desc }}</view>
                                        </view>
                                        <view class="ft">
                                            <view class="cu-tag sm radius" id="bgmain">
                                                {{ item.type }}
                                            </view>
                                            <view class="cu-tag sm radius" id="radius">
                                                {{ item.createtime }}
                                            </view>
                                            <view class="cu-tag sm radius" id="radius">
                                                {{ item.start_time }}
                                            </view>
                                        </view>
                                    </view>

                                    <view class="align-center text-center">
                                        <text class="text-yellow text-xl" id="text-xl">¥{{ item.total }}</text>
                                        <view class="margin-top-sm" v-if="item.status == '待接单'">
                                            <button class="cu-btn sm bg-yellow" id="cu-btn">待抢单</button>
                                        </view>
                                        <view class="margin-top-sm" v-if="item.status != '待接单'">
                                            <button class="cu-btn sm bgmain" id="cu-btn">{{ item.status }}</button>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <!-- <view class="bg-white margin-top" style='width: 100%;margin: auto;' id="ustp">
					<view class='action'>
						<text class=''>最新订单</text>
					</view>

				<!-- </view> -->

                        <view class="grid flex-1 col-1 bg-white nodata" style="padding: 100rpx auto; margin: auto; text-align: center; width: 90%" v-if="list.length == 0">
                            <view class="padding-sm">
                                <view class="padding radius text-center light">
                                    <text class="cuIcon-infofill lg text-lg text-main" style="font-size: 50rpx"></text>
                                    <view class="text-main">暂无数据</view>
                                </view>
                            </view>
                        </view>

                        <!-- <view class="cu-bar bg-white">
                    <view class="action">
                        <text class="cuIcon-titles text-yellow"></text>
                        <text class="text-df text-bold">抢单中心</text>
                    </view>
                </view> -->
                    </view>
                </view>
            </view>
        </view>

        <view class="cu-tabbar-height"></view>
        <view class="cu-bar tabbar foot bgmain">
            <view class="action text-white">
                <navigator url="/gc_school/pages/index/index" open-type="redirect" hover-class="none">
                    <image id="cuIcon-homefills" src="/static/images/code/icon-home1.png"></image>
                    <view class="indedx">首页</view>
                </navigator>
            </view>
            <view class="action text-gray add-action">
                <navigator url="/gc_school/pages/order/index" open-type="redirect" hover-class="none">
                    <view class="cu-btn cuIcon-add bgmain shadow"><image id="cuIcon-homefillt" src="/static/images/code/fans.png"></image></view>
                    <!-- <image id="cuIcon-homefillt" src="/images/code/fabu.png"></image></button> -->
                    <view class="indedxs">我的发布</view>
                </navigator>
            </view>
            <view class="action text-gray">
                <navigator url="/gc_school/pages/user/index" open-type="redirect" hover-class="none">
                    <image id="cuIcon-homefills" src="/static/images/code/wode2.png"></image>
                    <view class="indedxt">我的</view>
                </navigator>
            </view>
        </view>

        <!-- <import src="/gc_school/pages/templates/footer.wxml" />
<template is="footerWx" data="{{...tabBar}}" /> -->
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000,
            showText: true,
            getUseInfo: false,
            status: 0,
            page: 1,
            url: app.globalData.siteInfo.appimg,

            schoolInfo: {
                school: {
                    thums: []
                },

                rank: []
            },

            school: [{}],
            index: 0,
            address: {},
            schooindex: 0,
            s_id: '',
            top: uni.getStorageSync('CustomBar'),
            StatusBar: uni.getStorageSync('StatusBar'),
            note: '',

            sysparment: {
                speed: ''
            },

            list: '',
            city: '',

            userInfo: {
                avatarUrl: ''
            },

            homeitem: {
                params: {
                    placeholder: '',
                    submiturl: ''
                }
            },

            extra: {
                note: ''
            }
        };
    },
    onLoad: function (options) {
        console.log(app.globalData.siteInfo.appimg); // 页面初始化 options为页面跳转所带来的参数
        const that = this;
        that.getPage();
        that.setData({
            address: uni.getStorageSync('city')
        });
        this.getSysparment();
        uni.getStorage({
            key: 'useInfo',
            success: function (data) {
                if ('true' == data.data) {
                    that.setData({
                        getUseInfo: false
                    });
                }

                if (!uni.getStorageSync('openid')) {
                    that.getGetUid(data.data);
                } else {
                    that.getPage();
                }
            },
            fail: function () {
                that.setData({
                    getUseInfo: true
                });
            }
        });
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        uni.removeStorage({
            key: 'json'
        });
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    onReachBottom: function () {
        this.getOrderData();
    },
    methods: {
        openview(e) {
            console.log(e);
            uni.previewImage({
                current: e.currentTarget.dataset.url,
                urls: [e.currentTarget.dataset.url]
            });
        },

        onChangeShowText: function () {
            this.setData({
                showText: !this.showText
            });
        },

        onGoodsInfo: function (t) {
            this.setData({
                note: t.detail.value
            });
        },

        onJsEvent: function (e) {
            uni.navigateTo({
                url: '/gc_school/pages/public/index?type=' + e.currentTarget.dataset.type + '&showText=' + this.note
            });
        },

        PickerChange(e) {
            console.log(e);
            this.setData({
                index: e.detail.value,
                schoolInfo: this.school[parseInt(e.detail.value)],
                s_id: this.school[parseInt(e.detail.value)].s_id
            });
            uni.setStorageSync('schoolId', this.school[parseInt(e.detail.value)].s_id);
            uni.setStorageSync('schoolIndex', parseInt(e.detail.value));
            this.getSchoolInfo(this.school[parseInt(e.detail.value)].s_id);
        },

        //详情跳转
        detail(e) {
            console.log(e.currentTarget.dataset.index);
            uni.navigateTo({
                url: '/gc_school/pages/order/detail?id=' + this.list[e.currentTarget.dataset.index].o_id
            });
        },

        //获取列表
        getSysparment() {
            const self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/Sysparment',
                data: {
                    page: this.page,
                    openid: uni.getStorageSync('openid')
                },

                success(res) {
                    self.setData({
                        sysparment: res.data.data
                    });
                }
            });
        },

        //获取列表
        getList() {
            const self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/IndexList',
                data: {
                    page: this.page,
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    console.log('11111', res);

                    if (this.page == 1) {
                        self.setData({
                            list: res.data.data.list
                        });
                    } else {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            self.setData({
                                list: [...self.list, res.data.data.list[i]]
                            });
                        }
                    }
                }
            });
        },

        //获取经纬度
        getLocation(callback) {
            var self = this;
            uni.getLocation({
                success: function (res) {
                    console.log(res);
                    uni.request({
                        url: 'https://api.map.baidu.com/geocoder/v2/?ak=p3ksM8ObxtYWHUsGWo8CWNqI&location=' + res.latitude + ',' + res.longitude + '&output=json',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success: function (params) {
                            var params = params.data.result;
                            uni.setStorageSync('city', params);
                            self.setData({
                                city: params.addressComponent.city
                            });
                            callback();
                        }
                    });
                }
            });
        },

        //获取用户信息
        getUsetInfo: function (data) {
            if ('getUserInfo:ok' == data.detail.errMsg) {
                this.setData({
                    getUseInfo: true
                });
                uni.setStorage({
                    key: 'useInfo',
                    data: 'true'
                });
                this.getGetUid(data.detail.userInfo);
            } else {
                this.setData({
                    getUseInfo: true
                });
            }
        },

        //获取学校列表
        getSchool() {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/SchoolList',
                data: {
                    openid: uni.getStorageSync('openid') ? uni.getStorageSync('openid') : 'nologinuser',
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    var index = uni.getStorageSync('schoolIndex') ? uni.getStorageSync('schoolIndex') : 0;
                    self.setData({
                        school: res.data.data.list,
                        index: uni.getStorageSync('schoolIndex') ? uni.getStorageSync('schoolIndex') : 0,
                        s_id: res.data.data.list[index].s_id
                    });
                    uni.setStorageSync('schoolId', res.data.data.list[index].s_id);
                    self.getSchoolInfo(res.data.data.list[index].s_id);
                }
            });
        },

        //获取学校列表
        getSchoolInfo(id) {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/SchoolIndex',
                data: {
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat,
                    s_id: id
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        schoolInfo: res.data.data
                    });
                    self.getOrderData();
                }
            });
        },

        //获取用户状态
        getPage() {
            var self = this;
            self.getLocation(() => {
                //更新用户状态
                app.globalData.util.request({
                    url: 'entry/wxapp/UserInfoUpdate',
                    data: {
                        openid: uni.getStorageSync('openid'),
                        nickname: uni.getStorageSync('userinfo').nickName,
                        avatar: uni.getStorageSync('userinfo').avatarUrl
                    },

                    success(res) {
                        app.globalData.util.footer(self);
                        self.setData({
                            userInfo: uni.getStorageSync('userinfo')
                        });
                        self.getSchool();
                    }
                });
            });
        },

        //获取用户openid
        getGetUid: function (a) {
            var that = this;
            uni.login({
                success: function (data) {
                    if (data.code) {
                        app.globalData.util.request({
                            url: 'entry/wxapp/GetUid',
                            data: {
                                code: data.code
                            },
                            success: function (data) {
                                console.log(data.data.data.openid);
                                that.setData({
                                    getUseInfo: false
                                });
                                uni.setStorageSync('openid', data.data.data.openid);
                                uni.getUserInfo({
                                    success: function (params) {
                                        var userInfo = params.userInfo;
                                        uni.setStorageSync('userinfo', userInfo);
                                        that.getPage();
                                    }
                                });
                            }
                        });
                    }
                }
            });
        },

        getDateDiff(dateTimeStamp, dateStr) {
            var result = '';
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - dateTimeStamp;

            if (diffValue < 0) {
                return;
            }

            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;

            if (monthC >= 1) {
                result = '' + parseInt(monthC) + '月前';
            } else {
                if (weekC >= 1) {
                    result = '' + parseInt(weekC) + '周前';
                } else {
                    if (dayC >= 1) {
                        result = '' + parseInt(dayC) + '天前';
                    } else {
                        if (hourC >= 1) {
                            result = '' + parseInt(hourC) + '小时前';
                        } else {
                            if (minC >= 1) {
                                result = '' + parseInt(minC) + '分钟前';
                            } else {
                                result = '刚刚';
                            }
                        }
                    }
                }
            }

            console.log(result);
            console.log(dateStr);

            if (result == '') {
                return dateStr;
            } else {
                return result;
            }
        },

        getDateTimeStamp(dateStr) {
            dateStr = dateStr;
            var da = Date.parse(dateStr.replace(/-/gi, '/'));
            return this.getDateDiff(da, dateStr);
        },

        getOrderData() {
            const self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/OrderWiteList',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    page: this.page,
                    status: this.type,
                    openid: uni.getStorageSync('openid'),
                    lon: uni.getStorageSync('city').location.lng,
                    lat: uni.getStorageSync('city').location.lat
                },

                success(res) {
                    for (var i = 0; i < res.data.data.order.length; i++) {
                        // res.data.data.order[i].start_time = self.getDateTimeStamp(res.data.data.order[i].start_time)
                        res.data.data.order[i].createtime = self.getDateTimeStamp(res.data.data.order[i].createtime);
                    }

                    if (this.page == 1) {
                        self.setData({
                            list: res.data.data.order
                        });
                    } else {
                        for (var i = 0; i < res.data.data.order.length; i++) {
                            self.setData({
                                list: [...self.list, res.data.data.list[i]]
                            });
                        }
                    }
                }
            });
        }
    }
};
</script>
<style>
.location {
    display: flex;
    background-color: #64edac;
    color: #fff;
    align-items: center;
    padding: 15rpx 10rpx;
    font-size: 26rpx;
}

.location image {
    width: 50rpx;
    margin-right: 10rpx;
}

.page-guide {
    box-sizing: border-box;
    padding-bottom: 100rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    margin-top: -100rpx;
}

.content {
    padding: 70rpx 0 30rpx 0;
    color: #fff;
    font-size: 30rpx;
    text-align: center;
    background-image: linear-gradient(to right, #0396ff, #23afe4, #abdcff) !important;
}

#tops {
    padding-bottom: 150rpx;
    border-radius: 0 0 30% 30%;
    background-image: linear-gradient(to right, #0396ff, #23afe4, #abdcff);
}

.page-guide .nav {
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #fafafa;
    height: 44px;
    font-size: 16px;
}

.page-guide .nav .nav-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    text-align: center;
}

.page-guide .nav .nav-item.active {
    color: #ff2d4b;
}

.page-guide .nav .nav-item.active:after {
    position: absolute;
    content: ' ';
    top: 39px;
    left: 50%;
    transform: translate(-50%);
    height: 2px;
    width: 33px;
    display: block;
    background: #ff2d4b;
    border-radius: 999px;
}

.page-guide .shop-wrapper {
    width: 100%;
    flex: 1;
}

.page-guide .shop-wrapper .shop {
    /* background: #fff; */
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: transform 0.2s linear;
    transition: transform 0.2s linear, -webkit-transform 0.2s linear;
}

.page-guide .shop-wrapper .shop-banner {
    /* position: relative; */
    width: 100%;
    height: 143px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    bottom: 100rpx;
    border-radius: 20rpx;
    /* border: 1px solid #000; */
}

.swiper-slide {
    background-size: cover;
    background-position: center;
}

.page-guide .shop-wrapper .shop-banner .rider-nearby-content {
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 90px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    align-items: center;
    width: 142px;
    height: 25px;
    background-color: #623c15;
    border-radius: 55px;
    line-height: 18px;
    white-space: nowrap;
    padding: 0 11px;
    color: #fff;
    font-size: 13px;
    z-index: 100;
    box-sizing: border-box;
}

.page-guide .shop-wrapper .shop-banner .rider-nearby-icon {
    display: inline-block;
    width: 20px;
    height: 17px;
    background-image: url('https://xs01.meituan.net/banma_paotui/dist/images/paotui-rider.png');
    background-size: 20px 17px;
    margin-right: 6px;
}

.page-guide .shop-wrapper .shop-banner .rider-nearby-content .num {
    color: #f6ce00;
}

.page-guide .shop-wrapper .shop-banner .swiper-container {
    height: 100%;
    width: 100%;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.page-guide .shop-wrapper .swiper-container .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    box-sizing: content-box;
}

.page-guide .shop-wrapper .swiper-container .swiper-wrapper .swiper-slide {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
}

/* .page-guide image {
    width: 100%;
    height: 100%;
    display: block;
} */

/* .page-guide .shop-wrapper .good-edit {
    width: 93%;
	margin: 20rpx auto;
    left: 50%;
    background: #fff;
    box-shadow: 0 0 56px 0 rgba(0,0,0,.14);
    padding: 17px 11px 0 17px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;

} */

.page-guide .shop-wrapper .good-edit .good-input {
    position: relative;
    flex: 1;
    padding: 0 6px;
}

.page-guide .shop-wrapper .good-edit .good-input-placeholder.active {
    display: inline-flex;
}

.page-guide .shop-wrapper .good-edit .good-input-placeholder {
    width: 100%;
    height: 110px;
    line-height: 1;
    color: #999;
    font-size: 18px;
    align-items: flex-start;
    display: none;
}

.page-guide .shop-wrapper .good-edit .good-input-icon {
    width: 16px;
    height: 18px;
    margin-right: 7px;
}

.page-guide .shop-wrapper .good-edit .good-input-content {
    height: 110px;
    width: 100%;
    padding-bottom: 7px;
    justify-content: center;
    align-items: center;
    display: none;
}

.page-guide .shop-wrapper .good-edit .good-input-content.active {
    display: flex;
}

.page-guide .shop-wrapper .good-edit .good-input-content .good-input-textarea {
    flex: 1;
    height: 100%;
    color: #333;
    resize: none;
    border: none;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 18px;
    padding-left: 6px;
    line-height: 26px;
}

.page-guide .shop-wrapper .good-edit .good-input-content .good-input-submit {
    width: 73px;
    height: 72px;
    margin-top: 18px;
    background-image: url('https://xs01.meituan.net/banma_paotui/dist/images/good-submit.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 15px;
}

.paotui-order {
    position: fixed;
    bottom: 80px;
    right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    text-align: center;
    border: 1px solid #87ceeb;
    /* background: #fff; */
    z-index: 9999;
}

.paotui-order .icon {
    color: #87ceeb;
    font-size: 24px;
}

.paotui-order .order-text {
    color: #87ceeb;
    font-size: 12px;
    margin-top: -8px;
}

.page-guide .tagbg {
    position: absolute;
    top: -20rpx;
    left: -20rpx;
    width: 60rpx;
    height: 60rpx;
}

.good-edit {
    width: 100%;
    margin: auto;
    border-radius: 10rpx;
    overflow: hidden;
    margin-bottom: 30rpx;
    margin-top: 20rpx;
    /* padding: 10rpx 15rpx; */
    box-sizing: border-box;
}

.good-edit .bgmain {
    background-color: #f2f2f2;
    color: #878787;
}

.good-edit .text-df {
    /* font-size: 30rpx; */
}

.good-edit .text-df {
    /* font-size: 30rpx; */
}

.good-edit .text-sm {
    font-size: 24rpx;
}

.rank .t-right {
    text-align: right;
    /* display: block; */
    /* font-size: 30rpx; */
}

scroll-view {
    width: 100%;
    white-space: nowrap;
}

.tab-container {
    width: 100%;
}

.tab-item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.tab-item > image {
    width: 47% !important;
    height: 170rpx;
    margin-top: 30rpx;
}

#cus {
    padding: 10rpx 15rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
}

.titl {
    padding: 30rpx 0;
    color: #010101;
    font-size: 28rpx;
}

.contents {
    width: 100%;
    padding: 10rpx 15rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
    background-color: #fff;
    margin-bottom: 30rpx;
}

.content_top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.crol {
    color: #010101;
    font-size: 28rpx;
    padding: 30rpx 0 20rpx;
}

.geng {
    color: #7a7a7a;
    font-size: 24rpx;
}

.cont_con {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    padding: 0 8rpx;
}

.img {
    display: flex;
    align-items: center;
}

.img > image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
}

.names {
    padding-left: 20rpx;
    color: #676767;
    font-size: 26rpx;
}

.money {
    color: #ed0e0e;
    font-size: 26rpx;
}

.moneyst {
    padding-top: 10rpx;
}

#ustp {
    width: 100%;
    padding: 10rpx 15rpx;
    box-sizing: border-box;
}

#lops {
    padding: 0 8rpx;
    box-sizing: border-box;
}

#bgmain {
    background-color: #12a6ee;
    color: #fff;
}

#text-xl {
    color: #ed0e0e;
    font-size: 24rpx;
}

#cu-btn {
    background-color: #e4e4e4;
    padding: 6rpx 10rpx;
    color: #12a6ee !important;
    font-size: 20rpx;
}

#text-df {
    color: #676767;
    font-size: 24rpx;
}

#radius {
    background-color: #e4e4e4;
    color: #fff;
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

.indedx {
    color: #12a6ee;
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

.indedxt {
    color: #010101;
    font-size: 22rpx;
    padding: 10rpx 0 10rpx 0;
}

.bgmain {
    background-color: #fff !important;
}

#swipers {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translate(0%, 0px) translateZ(0px);
}
</style>
