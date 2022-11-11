<template>
    <view class="container">
        <view class="header">
            <view class="header-img">
                <view class="header-image-left">
                    <image lazyLoad @tap="chooseImage" data-ptpid="4c7f-1f6c-b145-b80f" :src="avatarUrl + '?imageView2/0/w/180'" v-if="avatarUrl"></image>
                    <view class="header-name">{{ userName || (isLogin ? '暂无小主信息' : '登录开启赚钱之旅哦') }}</view>
                </view>
                <view @tap="signTap" class="header-image-right" data-ptpid="e758-138d-b914-343f">
                    {{ attendance ? '赚零花' : '来签到' }}
                </view>
            </view>
            <view class="num-box">
                <view @tap="goToQtb" class="num-item" data-ptpid="ef57-17f4-bbea-280f">
                    <view class="num-bold">{{ money }}元</view>
                    <view class="num-text">
                        立即提现
                        <view class="iconfont iconarrow"></view>
                    </view>
                </view>
                <view @tap="skipToQtsbean" class="num-item" data-ptpid="16ab-1b1b-b9b9-6d6f">
                    <view class="num-bold">{{ score }}青豆</view>
                    <view class="num-text">
                        立即兑换
                        <view class="iconfont iconarrow"></view>
                    </view>
                </view>
            </view>
        </view>
        <view class="resume-box">
            <view @tap="skipToResume" class="resume-inner-box" data-ptpid="4c4a-19f1-99b2-3a10">
                <view class="resume-text" v-if="!perfectResume">
                    悄悄告诉你，完善简历提高
                    <text>34%</text>
                    录取率~
                </view>
                <view class="resume-text" v-else>哇喔，太棒了！简历已完善</view>
                <view class="resume-btn">{{ !perfectResume ? '去完善' : '去查看' }}</view>
            </view>
        </view>
        <view class="job-box">
            <view @tap="gotoMyJob" class="job-item jobr" data-index="0" data-ptpid="0d7e-1bd6-8311-5701">
                <view class="num">{{ userApplyStatistics.allCount }}</view>
                <view class="text">全部</view>
            </view>
            <view @tap="gotoMyJob" class="job-item jobr" data-index="1" data-ptpid="525a-1b59-a630-5431">
                <view class="num">{{ userApplyStatistics.hasApplyCount }}</view>
                <view class="text">已报名</view>
            </view>
            <view @tap="gotoMyJob" class="job-item jobr" data-index="2" data-ptpid="13ba-13a5-98dc-aba6">
                <view class="num">{{ userApplyStatistics.applyOngoingCount }}</view>
                <view class="text">已录取</view>
            </view>
            <view @tap="gotoMyJob" class="job-item" data-index="3" data-ptpid="df41-1bae-b01e-8c13">
                <view class="num">{{ userApplyStatistics.applySuccessCount }}</view>
                <view class="text">已完成</view>
            </view>
        </view>
        <inner-banner className="mg32" :list="bannerList" ptpId="1ab7-1b95-8e0e-3b22"></inner-banner>
        <view class="nav-box">
            <view @tap="navTap" class="nav-item" :data-index="index" data-ptpid="58ac-1481-a7d3-b98e" v-for="(item, index) in navList" :key="item.name">
                <view class="nav-title">
                    <view :class="'iconfont ' + item.icon"></view>
                    {{ item.name }}
                </view>

                <view class="nav-icon">
                    <view v-if="item.num || item.num === 0">{{ item.num }}</view>
                    <view class="iconfont iconarrow"></view>
                </view>
            </view>
        </view>
        <view class="login-mask" v-if="!isLogin">
            <open-button @initData="loginSuccess" openType="getPhoneNumber" ptpId="mineLogin"></open-button>
        </view>
        <qts-dialog @reset="handleReset" :isDialog="isDialog" :signInfo="signInfo"></qts-dialog>
    </view>
</template>

<script>
import openButton from '@/pages/components/openButton/openButton';
import qtsDialog from '@/pages/components/qtsDialog/index';
import innerBanner from '@/components/innerBanner/index';
import downloadDialog from '@/components/downLoadDialog/index';

var n = ['https://qiniu-image.qtshe.com/719defaultAvatar1.png', 'https://qiniu-image.qtshe.com/719defaultAvatar2.png', 'https://qiniu-image.qtshe.com/719defaultAvatar3.png'];
var app = getApp();
export default {
    components: {
        openButton,
        qtsDialog,
        innerBanner,
        downloadDialog
    },
    data() {
        return {
            money: '0.00',
            score: 0,
            perfectResume: false,
            bannerList: [],
            navList: [
                {
                    icon: 'iconmy_collect_normal',
                    name: '我的收藏',
                    num: 0,
                    cb: function () {
                        uni.navigateTo({
                            url: '/pages/collect/collect'
                        });
                    }
                },
                {
                    icon: 'iconmy_people_normal',
                    name: '我要招聘',
                    cb: function () {
                        uni.navigateToMiniProgram({
                            appId: 'wx71ff0ba1e3426010',
                            path: 'pages/job/jobList/index'
                        });
                    }
                },
                {
                    icon: 'iconmy_new_normal',
                    name: '服务中心',
                    cb: function () {
						uni.navigateTo({
							url: '/pages/webview/webview?targetUrl=' + encodeURIComponent(l + '/service/index')
						});
					}
                },
                {
                    icon: 'iconmy_site_normal',
                    name: '用户设置',
                    cb: function () {
                        uni.navigateTo({
                            url: '/mine/setting/index'
                        });
                    }
                }
            ],
            userApplyStatistics: {
                allCount: 0,
                hasApplyCount: 0,
                applyOngoingCount: 0,
                applySuccessCount: 0
            },
            isDialog: false,
            signInfo: {
                attendanceNumber: '',
                attendanceIntegralList: '',
                attendanceTotal: '',
                beansList: ''
            },
            beansList: [5, 5, 5, 5, 50, 5, 100],
            attendance: false,
            userName: '',
            avatarUrl: 'https://qiniu-image.qtshe.com/719defaultAvatar2.png',
            isLogin: false
        };
    },
    onLoad: function () {
        uni.hideShareMenu();
    },
    onShow: function () {
        this.resourceBanner();
		this.isLogin = true;
    },
    onShareAppMessage: function () {
        return {
            title: '每日签到领青豆，爆款好物0元得>>',
            imageUrl: 'https://qiniu-image.qtshe.com/early1024/share_qiandao.png',
            path: '/pages/index/index?pt=8'
        };
    },
    methods: {
        checkToken: function (t) {},

        loginOutInit: function () {},

        getQtbaoMoney: function () {},

        checkNumber: function (t) {},

        getSignInfo: function (t) {},

        signTap: function () {},

        handleReset: function () {},

        resourceBanner: function () {},

        navTap: function (t) {},

        loginSuccess: function () {},

        chooseImage: function (t) {},

        getImage: function (t) {},

        goToQtb: function () {},

        skipToQtsbean: function () {},

        gotoMyJob: function (t) {},

		// 跳转到简历完善页面
        skipToResume: function () {
			uni.navigateTo({
			    url: '/mine/resume/resume',
				fail: function(err) {
					console.log(err);
				}
			});
		}
    }
};
</script>
<style lang="scss">
	@import './mine.scss';
</style>
