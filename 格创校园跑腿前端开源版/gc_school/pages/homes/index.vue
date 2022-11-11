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
            <!-- <view class="content"> -->
            <!-- 首页 -->
            <!-- </view> -->
            <!-- <view class="cu-form-group"> -->
            <view class="school">
                <picker @change="PickerChange" :value="index" :range="school" range-key="s_name">
                    <view class="picker">
                        <text class="cuIcon-locationfill"></text>
                        {{ school[index].s_name ? school[index].s_name : '选择学校' }}
                        <text class="cuIcon-unfold"></text>
                    </view>
                </picker>
            </view>

            <view class="search bgmain">
                <swiper style="height: 192px" :autoplay="true" :current="current">
                    <block v-if="schoolInfo.school.thums.length > 0">
                        <block v-for="(item, index) in schoolInfo.school.thums" :key="index">
                            <swiper-item>
                                <block v-if="item.img">
                                    <image :src="item.img" mode="widthFix" @tap="slideJump" :data-url="item.url" :data-type="item.url_type"></image>
                                </block>
                                <block v-else>
                                    <image src="/static/images/banners.jpg" mode="widthFix"></image>
                                </block>
                            </swiper-item>
                        </block>
                    </block>
                    <block v-else>
                        <swiper-item>
                            <image src="/static/images/banners.jpg" mode="widthFix"></image>
                        </swiper-item>
                    </block>
                    <!-- <swiper-item>
				<image src="http://ztcp.mync.xyz/themes/adsw/public/assets/images/bgs.png" mode="widthFix"></image>
			</swiper-item> -->
                </swiper>
                <!-- <view style="position:absolute;top:20%;left:5%;width:100%"> -->
                <!-- 张三三 -->
                <swiper class="newest_toast" :vertical="true" :autoplay="true" :circular="true" easing-function="easeInOutCubic" v-if="sysparment.is_home_slide == 1">
                    <swiper-item v-for="(item, index) in dataList" :key="index">
                        <view class="item" v-for="(items, index1) in item" :key="index1">
                            <image :src="items.nickimg"></image>

                            <view class="word">{{ items.nickname }}{{ items.time }}下单成功</view>
                        </view>

                        <!-- <view class="item">
						<image src="https://thirdwx.qlogo.cn/mmopen/vi_32/xae4hTNAedxI8kAYgR9otafscGzghKoMxLhiaiaLhn0PrIwLOgemlNy8gTiaw911ZG5yVNUc9ibsB2oJHRvvLf4Hrg/132"></image>
						<view>张三几分钟前下单成功</view>
					</view> -->
                    </swiper-item>
                    <!-- <swiper-item>
					<view  class="item">
						<image src="https://thirdwx.qlogo.cn/mmopen/vi_32/xae4hTNAedxI8kAYgR9otafscGzghKoMxLhiaiaLhn0PrIwLOgemlNy8gTiaw911ZG5yVNUc9ibsB2oJHRvvLf4Hrg/132"></image>
						<view>李四几分钟前下单成功</view>
					</view>
					<view  class="item">
						<image src="https://thirdwx.qlogo.cn/mmopen/vi_32/xae4hTNAedxI8kAYgR9otafscGzghKoMxLhiaiaLhn0PrIwLOgemlNy8gTiaw911ZG5yVNUc9ibsB2oJHRvvLf4Hrg/132"></image>
						<view>李四几分钟前下单成功</view>
					</view>
				</swiper-item> -->
                </swiper>
                <!-- </view> -->

                <!-- <image src="http://ztcp.mync.xyz/themes/adsw/public/assets/images/bgs.png" mode="widthFix"></image> -->
                <!-- <navigator url='/gc_school/pages/order/index' hover-class='none' open-type="navigateTo">
			<view class="search_box">
				<input placeholder="订单查询" class="search_input" disabled />
				<text class="cuIcon-titles" style="font-size:36rpx !important;color:#D2D2D2"></text>
				<text class="cuIcon-search text-black"></text>
			</view>
		</navigator> -->

                <view class="good-edit">
                    <view class="bg-white" id="cus">
                        <view class="titl" style="padding-top: 10rpx" @tap="test">
                            <text class="cuIcon-titles text-yellow"></text>
                            {{ sys.modules_title || '想让你同学帮你做点什么' }}
                        </view>
                        <!-- <image src="https://xypt.gcshop.cc/attachment/images/2/2021/04/tUz5BJWP4t485vpevE5PFepEtL5EKm.jpg" style="width:100rpx;height:100rpx;"></image> -->
                        <view class="tab-container">
                            <view class="tab-item">
                                <block v-if="schoolInfo.modules.length == 0">
                                    <image @tap="onJsEvent" data-type="1" data-url="" src="/static/images/qu.png" data-id="0"></image>
                                    <image @tap="onJsEvent" data-type="2" data-event-type="jsUrl" data-url="" data-id="0" src="/static/images/ji.png"></image>
                                    <image @tap="onJsEvent" data-type="3" data-event-type="jsUrl" data-url="" data-id="0" src="/static/images/shi.png"></image>
                                    <image @tap="onJsEvent" data-type="4" data-event-type="jsUrl" data-url="" data-id="0" src="/static/images/wanneng.png"></image>
                                </block>
                                <block v-else>
                                    <block v-for="(item, index) in schoolInfo.modules" :key="index">
                                        <image
                                            v-if="item.url_type == 1"
                                            @tap="onJsEvent"
                                            :data-type="index + 1"
                                            :data-url="item.param"
                                            :data-id="item.id"
                                            :src="item.img == '' ? '/images/wanneng.png' : item.img"
                                        ></image>

                                        <image v-else @tap="toOther" :data-appid="item.param" :src="item.img == '' ? '/images/wanneng.png' : item.img"></image>
                                    </block>
                                </block>

                                <!-- <image bind:tap="onJsEvent" data-type='1' data-url="{{item.linkurl}}" src="{{sysparment.left1==''?'/images/qu.png':sysparment.left1}}"></image>
              <image bind:tap="onJsEvent" data-type='2' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="{{sysparment.right1==''?'/images/ji.png':sysparment.right1}}"></image>
              <image bind:tap="onJsEvent" data-type='3' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="{{sysparment.left2==''?'/images/shi.png':sysparment.left2}}"></image>
							<image bind:tap="onJsEvent" data-type='4' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="{{sysparment.right2==''?'/images/wai.png':sysparment.right2}}"></image> -->

                                <!-- <image bind:tap="onJsEvent" data-type='1' data-url="{{item.linkurl}}" src="/images/qu.png"></image>
              <image bind:tap="onJsEvent" data-type='2' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="{{sysparment.right1}}"></image>
              <image bind:tap="onJsEvent" data-type='3' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="{{sysparment.right}}"></image>
              <image bind:tap="onJsEvent" data-type='4' data-event-type="jsUrl" data-url="{{item.linkurl}}" src="/images/wai.png"></image> -->
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="page-guide">
                <view class="shop-wrapper">
                    <view class="shop">
                        <view class="contents" v-if="sysparment.is_rank_show == 1">
                            <navigator :url="'/gc_school/pages/rank/index?s_id=' + s_id" hover-class="none">
                                <view class="content_top" style="justify-content: space-between">
                                    <view class="crol">
                                        <text class="cuIcon-titles text-orange"></text>
                                        <text class="titl">排行榜</text>
                                    </view>
                                    <view class="geng">
                                        <text class="text-grey cuIcon-right"></text>
                                    </view>
                                </view>
                            </navigator>
                            <view class="cont_con" v-for="(item, index) in schoolInfo.rank" :key="index">
                                <view class="img">
                                    <image :src="item.pic"></image>
                                    <view class="names">
                                        <view>{{ item.username }}</view>
                                        <!-- <view class="moneyst">月赚</view> -->
                                    </view>
                                </view>

                                <view class="names">
                                    <view class="money">¥{{ item.money }}</view>
                                    <!-- <view class="moneyst">月赚</view> -->
                                </view>
                            </view>
                        </view>

                        <view class="contents">
                            <view class="content_top">
                                <view class="crol" @tap="order_change" data-index="0">
                                    <text class="cuIcon-titles text-orange"></text>
                                    <text :class="'titl ' + (order_index == 0 ? 'text-orange' : '')">最新订单</text>
                                </view>
                                <view class="crol" @tap="order_change" data-index="1">
                                    <text class="cuIcon-titles text-orange"></text>
                                    <text :class="'titl ' + (order_index == 1 ? 'text-orange' : '')">历史订单</text>
                                </view>
                            </view>
                            <view v-if="order_index == 0">
                                <view class="block" style="width: 100%; margin: auto" v-if="list.length > 0">
                                    <view
                                        id="lops"
                                        class="flex bg-white align-center padding-bottom justify-between"
                                        style="border-bottom: 1rpx solid #f3eded"
                                        @tap="detail"
                                        :data-index="index"
                                        v-for="(item, index) in list"
                                        :key="index"
                                    >
                                        <view style="width: 70%">
                                            <view class="padding-tb-sm" style="display: flex">
                                                <image v-if="item.type == '寄件'" src="/static/images/jiicon.png" class="type_icon"></image>
                                                <image v-else-if="item.type == '取件'" src="/static/images/quicon.png" class="type_icon"></image>
                                                <image v-else-if="item.type == '超市食堂'" src="/static/images/shiicon.png" class="type_icon"></image>
                                                <image v-else-if="item.type == '无所不能/饮品'" src="/static/images/waiicon.png" class="type_icon"></image>
                                                <view class="text-df text-cut" id="text-df">{{ item.desc }}</view>
                                            </view>
                                            <view class="ft">
                                                <!-- <view class="cu-tag sm radius" id="bgmain">
											{{item.type}}
										</view> -->
                                                <view class="cu-tag sm radius" id="radius">
                                                    {{ item.createtime }}
                                                </view>
                                                <view class="cu-tag sm radius" id="radius">送达时间：{{ item.start_time }}</view>
                                            </view>
                                        </view>

                                        <view class="align-center text-center">
                                            <view class="text-yellow text-xl" id="text-xl">¥{{ item.total }}</view>
                                            <view class="" v-if="item.status == '待接单'">
                                                <button class="cu-btn sm bgmain" id="cu-btn">待抢单</button>
                                            </view>
                                            <view class="" v-if="item.status != '待接单'">
                                                <button class="cu-btn sm bgmain" id="cu-btn">{{ item.status }}</button>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view class="text-center text-df" v-if="list.length >= 10">更多订单请前往抢单中心查看</view>
                            </view>
                            <view v-else>
                                <view class="block" style="width: 100%; margin: auto" v-if="history.length > 0">
                                    <view
                                        id="lops"
                                        class="flex bg-white align-center padding-bottom justify-between"
                                        style="border-bottom: 1rpx solid #f3eded"
                                        :data-index="index"
                                        v-for="(item, index) in history"
                                        :key="index"
                                    >
                                        <view style="width: 70%">
                                            <view class="padding-tb-sm" style="display: flex">
                                                <image v-if="item.type == '寄件'" src="/static/images/jiicon.png" class="type_icon"></image>
                                                <image v-else-if="item.type == '取件'" src="/static/images/quicon.png" class="type_icon"></image>
                                                <image v-else-if="item.type == '超市食堂'" src="/static/images/shiicon.png" class="type_icon"></image>
                                                <image v-else-if="item.type == '无所不能/饮品'" src="/static/images/waiicon.png" class="type_icon"></image>
                                                <view class="text-df text-cut" id="text-df">{{ item.desc }}</view>
                                            </view>
                                            <view class="ft">
                                                <!-- <view class="cu-tag sm radius" id="bgmain">
											{{item.type}}
										</view> -->
                                                <view class="cu-tag sm radius" id="radius" v-if="item.createtime">
                                                    {{ item.createtime }}
                                                </view>
                                                <view class="cu-tag sm radius" id="radius">送达时间：{{ item.start_time }}</view>
                                            </view>
                                        </view>

                                        <view class="align-center text-center">
                                            <view class="text-yellow text-xl" id="text-xl">¥{{ item.total }}</view>
                                            <view class="" v-if="item.status == '待接单'">
                                                <button class="cu-btn sm bgmain" id="cu-btn">待抢单</button>
                                            </view>
                                            <view class="" v-if="item.status != '待接单'">
                                                <button class="cu-btn sm bgmain" id="cu-btn">{{ item.status }}</button>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view class="text-center text-df" v-if="history.length >= 10">更多订单请前往抢单中心查看</view>
                            </view>
                        </view>

                        <!-- <view class="bg-white margin-top" style='width: 100%;margin: auto;' id="ustp">
					<view class='action'>
						<text class=''>最新订单</text>
					</view>

				<!-- </view> -->

                        <view
                            class="grid flex-1 col-1 bg-white nodata"
                            style="padding: 100rpx auto; margin: auto; text-align: center; width: 90%; margin-bottom: 50rpx"
                            v-if="(list.length == 0 && order_index == 0) || (history.length == 0 && order_index == 1)"
                        >
                            <view class="padding-sm">
                                <view class="padding radius text-center light">
                                    <text class="cuIcon-infofill lg text-lg" style="font-size: 50rpx"></text>
                                    <view class="text-lg padding-tb-sm'">暂无数据</view>
                                    <!-- <text class="cuIcon-infofill lg text-lg text-main" style='font-size:50rpx'></text>
							<view class="text-main">暂无数据</view> -->
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

        <view class="cover" v-if="is_show_toast && sysparment.is_show_toast == 1">
            <view class="toast">
                <!-- <template is="wxParse" :data="wxParseData:toast_content.nodes"/> -->
                <mp-html :content="article_toast_content"></mp-html>
            </view>
            <view class="sure" @tap="close">我知道了</view>
        </view>
        <block v-if="sysparment.home_adv">
            <view v-if="sysparment.home_adv_type == 0">
                <ad :unit-id="sysparment.home_adv"></ad>
            </view>
            <view v-else>
                <ad :unit-id="sysparment.home_adv" ad-type="video" ad-theme="white"></ad>
            </view>
        </block>
        <!-- <import src="/gc_school/pages/templates/footer.wxml" />
<template is="footerWx" data="{{...tabBar}}" /> -->
    </block>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            indicatorDots: false,
            autoplay: true,
            interval: 5000,
            duration: 1000,
            showText: true,
            getUseInfo: false,
            status: 0,
            page: 1,
            url: app.globalData.siteInfo.appimg,
            index: 0,
            address: {},
            schooindex: 0,
            s_id: '',
            rank: [],
            slide: [],
            top: uni.getStorageSync('CustomBar'),
            StatusBar: uni.getStorageSync('StatusBar'),
            list: [],

            location: {
                lng: '',
                lat: ''
            },

            current: 0,
            modules: [],

            schoolInfo: {
                modules: [],

                school: {
                    thums: []
                },

                rank: []
            },

            is_show_toast: true,
            dataList: [],
            order_index: 0,
            history: [],
            note: '',
            school: '',
            sys: '',

            sysparment: {
                is_home_slide: 0,
                is_rank_show: 0,
                is_show_toast: 0,
                home_adv: '',
                home_adv_type: 0
            },

            tmps: {},
            city: '',
            userInfo: '',
            article_toast_content: ''
        };
    },
    onLoad: function (options) {
        // app.util.request({
        // 	url:'entry/wxapp/alymsg',
        // 	success(res){
        // 		console.log(res)
        // 	}
        // })
        console.log(app.globalData.siteInfo.appimg); // 页面初始化 options为页面跳转所带来的参数

        const that = this;
        that.getPage();
        that.setData({
            address: uni.getStorageSync('city')
        }); // this.getSysparment()

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
                    // self.getPage()
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
    onShareAppMessage: function () {
        // return {
        //   title: '自定义标题',
        //   path: '/page/user?id=123',
        // }
    },
    onShareTimeline: function () {},
    onShow: function () {
        this.getOrderData();
        this.getHistoryList(); // 页面显示

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
        // this.getOrderData()
    },
    methods: {
        openview(e) {
            console.log(e);
            uni.previewImage({
                current: e.currentTarget.dataset.url,
                urls: [e.currentTarget.dataset.url]
            });
        },

        urlFun() {
            uni.navigateTo({
                url: '/gc_school/pages/url/index?url=https://www.baidu.com'
            });
        },

        order_change(e) {
            console.log(e.currentTarget.dataset.index);
            this.setData({
                order_index: e.currentTarget.dataset.index
            });
        },

        jie() {
            var self = this;
            uni.showModal({
                title: '提示',
                content: '允许接收订阅消息',

                success(res) {
                    if (res.confirm) {
                        uni.getSetting({
                            success(res) {
                                console.log(res.authSetting);
                            }
                        });
                        uni.requestSubscribeMessage({
                            tmplIds: [self.sysparment.template_id],

                            // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                            success(res) {
                                console.log('已授权接收订阅消息');
                                app.globalData.util.request({
                                    url: 'entry/wxapp/sendSubscribeMessage',
                                    data: {
                                        ordersn: '3583202103171811593073'
                                    }
                                });
                                uni.navigateTo({
                                    // url: '/schoolrun/pages/shop/index?id='+id+'&openid='+openid+'&name='+name+'&status='+status,
                                });
                            }
                        });
                    } else {
                    }
                }
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
            console.log(e.currentTarget.dataset.url);

            if (e.currentTarget.dataset.url != '') {
                uni.navigateTo({
                    url: e.currentTarget.dataset.url + '&id=' + e.currentTarget.dataset.id
                });
            } else {
                uni.navigateTo({
                    url: '/gc_school/pages/public/index?type=' + e.currentTarget.dataset.type + '&showText=' + this.note + '&id=' + e.currentTarget.dataset.id
                });
            }
        },

        PickerChange(e) {
            console.log(e);
            this.setData({
                index: e.detail.value,
                schoolInfo: this.school[parseInt(e.detail.value)],
                s_id: this.school[parseInt(e.detail.value)].s_id,
                current: 0
            });
            uni.setStorageSync('schoolId', this.school[parseInt(e.detail.value)].s_id);
            uni.setStorageSync('schoolIndex', parseInt(e.detail.value));
            this.getSchoolInfo(this.school[parseInt(e.detail.value)].s_id);
            this.getOrderData();
            this.getHistoryList();
            this.setData({
                dataList: []
            });
            this.getSysparment(); //全局加载变量设置为真，信息圈的列表需要重新加载

            app.globalData.isload = true;
        },

        //跳转其他小程序
        toOther(e) {
            console.log(e.currentTarget.dataset.appid);
            uni.navigateToMiniProgram({
                appId: e.currentTarget.dataset.appid,
                path: '',
                extraData: {
                    foo: 'bar'
                },
                envVersion: 'release',

                success(res) {
                    // 打开成功
                    console.log('打开成功');
                }
            });
        },

        //详情跳转
        detail(e) {
            console.log(e.currentTarget.dataset.index);

            if (this.list[e.currentTarget.dataset.index].status != '已完成') {
                uni.navigateTo({
                    url: '/gc_school/pages/order/detail?id=' + this.list[e.currentTarget.dataset.index].o_id
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
                        s_id: res.data.data.list[index].s_id,
                        sys: res.data.data.sys
                    }); // console.log("学校信息",res.data.data.list[index])
                    // console.log("学校信息",res.data.data.list[index].thums)

                    uni.setStorageSync('schoolId', res.data.data.list[index].s_id);
                    self.getSchoolInfo(res.data.data.list[index].s_id);
                    self.getOrderData();
                    self.getHistoryList();
                    self.getSysparment(); // console.log("学校信心",self.data.school)
                }
            });
        },

        //获取学校列表
        getSchoolInfo(id) {
            var self = this; // self.getOrderData()
            // self.getRank()

            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/SchoolIndex',
                data: {
                    openid: uni.getStorageSync('openid'),
                    s_id: id
                },

                success(res) {
                    console.log(res.data.data);
                    self.setData({
                        schoolInfo: res.data.data
                    });
                    self.getOrderData();
                    self.getHistoryList(); // self.getRank()
                }
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
                } else {
                    uni.navigateTo({
                        url: '/gc_school/pages/webview/index?url=' + e.currentTarget.dataset.url
                    });
                }
            }
        },

        //获取列表
        getSysparment() {
            const self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/Sysparment',
                data: {
                    page: this.page,
                    openid: uni.getStorageSync('openid'),
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    var tmp = res.data.data.list;
                    console.log(res.data);
                    var dataList = self.dataList;

                    for (var n = 0; n < tmp.length; n += 2) {
                        dataList.push(tmp.slice(n, n + 2));
                    }

                    self.setData({
                        dataList: dataList
                    });
                    console.log('规格的', dataList); // if(res.data.data.sys.is_show_toast==1)
                    // {
                    // 	self.setData({
                    // 		is_show_toast:true
                    // 	})
                    // }

                    //WxParse.wxParse('toast_content', 'html', res.data.data.sys.toast_content, self, 0)
                    self.article_toast_content = self.escape2Html(res.data.data.sys.toast_content);
                    self.setData({
                        sysparment: res.data.data.sys // modules:res.data.data.homes
                    }); // app.util.request({
                    // 	url: 'entry/wxapp/sendSubscribeMessage',
                    // 	data: {
                    // 			ordersn:'3583202103171811593073'
                    // 	},
                    // })
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

        close() {
            this.setData({
                is_show_toast: false
            });
        },

        //获取经纬度
        getLocation(callback) {
            var self = this;
            uni.getLocation({
                type: 'gcj02',
                success: function (res) {
                    console.log('打印位置', res); // wx.request({
                    // 	url: "https://api.map.baidu.com/geocoder/v2/?ak=p3ksM8ObxtYWHUsGWo8CWNqI&location=" + res.latitude + "," + res.longitude + "&output=json",
                    // 	header: {
                    // 		"Content-Type": "application/json"
                    // 	},
                    // success: function (params) {
                    // 	console.log("经纬度",params)

                    self.setData({
                        tmps: {
                            location: {
                                lng: res.longitude,
                                lat: res.latitude
                            }
                        }
                    });
                    setTimeout(() => {
                        console.log('location的值', self.tmps);
                        uni.setStorageSync('city', self.tmps);
                        self.setData({
                            city: self.location
                        });
                        callback();
                    }, 2000); // wx.setStorageSync("city", (params))
                    // self.setData({
                    // 	city: params
                    // })
                    // }
                    // });
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

        //获取排行榜列表
        getRank() {
            var self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/rank',
                data: {
                    s_id: uni.getStorageSync('schoolId')
                },

                success(res) {
                    // console.log("打印排行榜",res)
                    self.setData({
                        rank: res.data.data
                    });
                }
            });
        },

        //获取用户状态
        getPage() {
            var self = this;
            self.getLocation(() => {
                console.log('lplp'); //更新用户状态

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
                        }); // self.getRank()
                        // if(!wx.getStorageSync('schoolId')){

                        self.getSchool(); // }
                        // else{
                        // }
                        // console.log("学校信心",self.data.school)
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
                result = '' + parseInt(monthC) + '个月前';
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
            } // console.log(result)
            // console.log(dateStr)

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
                    page: 1,
                    status: this.type,
                    openid: uni.getStorageSync('openid') // lon: wx.getStorageSync('city').location.lng,
                    // lat: wx.getStorageSync('city').location.lat,
                },

                success(res) {
                    for (var i = 0; i < res.data.data.order.length; i++) {
                        // res.data.data.order[i].start_time = self.getDateTimeStamp(res.data.data.order[i].start_time)
                        res.data.data.order[i].createtime = self.getDateTimeStamp(res.data.data.order[i].createtime);
                        var temp = res.data.data.order[i].desc;
                        res.data.data.order[i].desc.replace(/[0-9]*(\.[0-9]*)?/g, function (e) {
                            var te = e;

                            if (Number(e)) {
                                if (e.toString().length > 3) {
                                    var d = e.substr(0, 2) + '****' + e.substr(6);
                                } else {
                                    var d = e.substr(0, 1) + '**';
                                }

                                temp = temp.replace(te, d); // console.log(temp)
                            }
                        });
                        res.data.data.order[i].desc = temp;
                    } // if(res.data.data.order.length>0){

                    self.setData({
                        list: res.data.data.order
                    }); // }
                    // if (this.data.page == 1) {
                    // 	self.setData({
                    // 		list: res.data.data.order
                    // 	})
                    // } else {
                    // 	for (var i = 0; i < res.data.data.order.length; i++) {
                    // 		self.setData({
                    // 			list: [
                    // 				...self.data.list,
                    // 				res.data.data.order[i]
                    // 			]
                    // 		})
                    // 	}
                    // }
                }
            });
        },

        //获取历史订单
        getHistoryList() {
            const self = this;
            app.globalData.util.request({
                url: 'entry/wxapp/historyList',
                data: {
                    s_id: uni.getStorageSync('schoolId'),
                    page: 1,
                    status: this.type,
                    openid: uni.getStorageSync('openid')
                },

                success(res) {
                    for (var i = 0; i < res.data.data.order.length; i++) {
                        // res.data.data.order[i].start_time = self.getDateTimeStamp(res.data.data.order[i].start_time)
                        res.data.data.order[i].createtime = self.getDateTimeStamp(res.data.data.order[i].createtime);
                        var temp = res.data.data.order[i].desc;
                        res.data.data.order[i].desc.replace(/[0-9]*(\.[0-9]*)?/g, function (e) {
                            var te = e;

                            if (Number(e)) {
                                if (e.toString().length > 3) {
                                    var d = e.substr(0, 2) + '****' + e.substr(6);
                                } else {
                                    var d = e.substr(0, 1) + '**';
                                }

                                temp = temp.replace(te, d); // console.log(temp)
                            }
                        });
                        res.data.data.order[i].desc = temp;
                    }

                    self.setData({
                        history: res.data.data.order
                    });
                }
            });
        },

        test() {
            console.log('占位：函数 test 未声明');
        }
    }
};
</script>
<style>
.search_box {
    padding: 0 20rpx;
    /* padding:15rpx 20rpx; */
    width: 94%;
    margin: 0 3%;
    /* border:1px solid lightgray; */
    border-radius: 10rpx;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    background: white;
    margin-top: -40rpx;
    z-index: 999;
    position: absolute;
    font-size: 42rpx;
    line-height: 70rpx;
    height: 70rpx;
    justify-content: space-between;
}
.search_input {
    width: 85%;
    color: black !important;
    font-size: 30rpx;
    margin-top: 16rpx;
}
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
    /* padding-bottom: 100rpx; */
    /* padding: 0 30rpx; */
    box-sizing: border-box;
    margin-top: 30rpx;
}

.content {
    padding: 70rpx 0 30rpx 0;
    color: black;
    font-size: 30rpx;
    text-align: center;
    background: #fff0d8;
    /* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF) !important; */
}

#tops {
    padding-bottom: 150rpx;
    /* border-radius: 0 0 30% 30%; */
    /* background-image: linear-gradient(to right, #0396FF, #23AFE4, #ABDCFF); */
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
    width: 48% !important;
    height: 170rpx;
    margin-top: 30rpx;
}

#cus {
    padding: 10rpx 25rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
}

.titl {
    padding: 40rpx 0 10rpx 0;
    color: #010101;
    font-size: 32rpx;
    font-weight: bold;
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
    color: #ff6445;
    font-size: 36rpx;
    font-weight: bold;
}
.order_box {
    height: 150rpx;
    margin: 10rpx 20rpx;
    box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.1);
}
.moneyst {
    padding-top: 10rpx;
    color: #9a9a9a;
    float: right;
}

#ustp {
    width: 100%;
    padding: 10rpx 15rpx;
    box-sizing: border-box;
}

#lops {
    padding: 0 20rpx 30rpx;
    box-sizing: border-box;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    margin: 30rpx 10rpx;
    border-radius: 16rpx;
}

#bgmain {
    background-color: #12a6ee;
    color: #fff;
}

#text-xl {
    color: #00bc6a;
    font-size: 36rpx;
    margin-top: 30rpx;
    font-weight: bold;
}

#cu-btn {
    background-color: #e4e4e4;
    padding: 6rpx 10rpx;
    color: black !important;
    font-size: 24rpx;
}

#text-df {
    color: #676767;
    font-size: 32rpx;
    font-weight: 500;
    max-width: 400rpx;
}
.type_icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
}
.ft {
    margin-left: 50rpx;
}
#radius {
    background-color: #fbf6f2;
    color: #ff6444;
}

#cuIcon-homefills {
    width: 48rpx !important;
    position: relative !important;
    display: block !important;
    height: 48rpx !important;
    margin: 0 auto !important;
    /* margin: 0 auto 10rpx !important; */
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
    color: #ff6444;
    font-size: 22rpx;
    padding: 10rpx 0 10rpx 0;
}

.indedxs {
    color: #010101;
    font-size: 22rpx;
    margin-top: 10rpx;
    padding: 10rpx 0 10rpx 0;
    /* padding: -1rpx 0 10rpx 0; */
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
.school {
    /* background-color:#FFF0D8; */
    /* background-color: #F1D14D; */
    background-color: #ff6444;
    padding: 30rpx;
    font-size: 30rpx;
    padding-top: 80rpx;
    color: white;
    /* position: absolute;
  top: 10rpx;
  z-index: 99; */
}

.cover {
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    padding: 160rpx 40rpx 40rpx;
}
.toast {
    max-height: 80%;
    overflow-y: scroll;
    color: white;
}
.sure {
    background: #ff6444;
    color: white;
    padding: 20rpx;
    margin: 100rpx auto;
    width: 200rpx;
    text-align: center;
    border-radius: 10rpx;
}
.newest_toast {
    color: black;
    height: 125rpx;
    position: absolute;
    top: 20%;
    left: 3%;
    width: 400rpx;
}
.newest_toast image {
    width: 35rpx;
    height: 35rpx;
    border-radius: 50%;
    margin-right: 10rpx;
    margin-top: 10rpx;
    flex-shrink: 0;
}
.newest_toast .item {
    color: white;
    display: flex;
    background: rgba(192, 192, 192, 0.8);
    line-height: 50rpx;
    border-radius: 30rpx;
    padding: 0 10rpx;
    max-width: 320rpx !important;
    font-size: 22rpx;
    margin-top: 10rpx;
}
.newest_toast .item .word {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.text-orange {
    color: var(--orange) !important;
}
</style>
