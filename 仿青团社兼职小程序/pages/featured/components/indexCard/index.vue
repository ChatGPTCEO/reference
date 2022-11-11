<template>
    <view>
        <view
            @tap="parseEventDynamicCode(info.firstAnswer ? '' : 'jumpToConfigList')"
            :class="'card-box ' + (hideAnimation ? 'fadeIn' : '') + ' ptp_exposure'"
            data-ptpid="6ce3-1ffd-a500-c118"
        >
            <image lazyLoad class="qaTopImg" src="https://oss-img.qtshe.com/zlh-qaImageNew.png"></image>
            <view class="qaTitle cardpdleft" :style="info.title.length > 20 ? 'font-size:30rpx' : ''">{{ info.title }}</view>
            <view
                class="top-ques-box ellipsis cardpdleft"
                :style="'width:80%;padding-right:10rpx;' + (alreadyAns ? 'flex-direction:column;margin-bottom:12rpx;' : 'flex-direction:row;')"
            >
                <view class="optionsTitleWidth" style="display: flex; justify-content: space-between" v-if="alreadyAns">
                    <view class="percentText" v-for="(item, index) in percentageData" :key="item.content">
                        <view class="point textWidth" :style="index === 0 ? 'color: #FCFF00;' : 'color: #00FF95;'">
                            <block v-if="item.show">
                                <image lazyLoad class="textWidth-image" src="https://qiniu-image.qtshe.com/featured/selected.png"></image>
                                <view style="margin-right: 6rpx; display: inline">已选</view>
                            </block>
                            <view class="ellipsis optionsWidth">{{ item.content }}</view>
                            <text class="textWidth-text">{{ item.percentage }}%</text>
                        </view>
                    </view>
                </view>
                <view class="progressItem" v-if="alreadyAns">
                    <view class="progressLeft" :style="'width:' + progressLeftWidth + '%;'"></view>
                    <view class="progressRight" :style="'width:' + progressRightWidth + '%;'"></view>
                </view>
                <block v-else>
                    <view
                        @tap.stop.prevent="parseEventDynamicCode(info.firstAnswer ? 'chooseOption' : 'jumpToConfigList')"
                        :class="'item ' + (index === 1 ? 'round-connerRight' : 'round-conner') + ' ptp_exposure'"
                        :data-businessId="item.id"
                        :data-businessType="10"
                        :data-index="index"
                        data-ptpid="2328-1ac1-ac4a-184a"
                        v-for="(item, index) in info.optionList"
                        :key="item.id"
                    >
                        <view class="item-text ellipsis">{{ item }}</view>
                    </view>
                </block>
            </view>
            <view class="awardTag">
                答题获得
                <text class="awardTag-text">{{ info.score }}</text>
                青豆
            </view>
            <view class="card-bottom cardpdleft">
                <view class="num-box">
                    <view class="num-if">
                        <view class="image-list" v-if="info.headImgs.length">
                            <image lazyLoad class="image-list-image" :src="item + '?imageView2/0/w/75'" v-for="(item, index) in info.headImgs" :key="index"></image>
                        </view>
                        <view class="num">{{ info.voterTurnout }}人参与</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="login-mask" v-if="!isLogin">
            <open-button @initData="loginSuccess" openType="getPhoneNumber" ptpId="2020Login"></open-button>
        </view>
    </view>
</template>

<script>
import openButton from '@/pages/components/openButton/openButton';
var app = getApp();


var a = null;
var n = null;
export default {
    components: {
        openButton
    },
    data() {
        return {
            percentageData: [],
            progressLeftWidth: 0,
            progressRightWidth: 0,
            alreadyAns: false
        };
    },
    props: {
        info: {
            type: Object,
            default: () => ({})
        },
        hideAnimation: {
            type: Boolean,
            default: false
        },
        isLogin: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        loginSuccess: function () {
            this.$emit('freshAllData');
        },
        countDown: function (t) {
            var that = this;
            a = setInterval(function () {
                that.setData({
                    progressLeftWidth: that.progressLeftWidth + 1
                });

                if (that.progressLeftWidth === t) {
                    clearInterval(a);
                }
            }, 1000 / t);
        },
        countDownRight: function (t) {
            var that = this;
            n = setInterval(function () {
                that.setData({
                    progressRightWidth: that.progressRightWidth + 1
                });

                if (that.progressRightWidth === t) {
                    clearInterval(n);
                }
            }, 1000 / t);
        },
        jumpToConfigList: function () {
            if (app.globalData.userData.token) {
                uni.navigateTo({
                    url: '/qaconfig/index/index'
                });
            } else {
                this.jumpToLogin();
            }
        },
        chooseOption: function (a) {
            var that = this;
            uni.showLoading({
                title: '提交中',
                icon: 'none'
            });
            app.globalData
                .ajax({
                    url: '/activityCenter/answer/article/submit',
                    data: {
                        id: this.info.id,
                        numOrders: a.currentTarget.dataset.index + 1,
                        answerFrom: 1
                    }
                })
                .then(function (t) {
                    uni.hideLoading();

                    if (t.success) {
                        switch (t.data.result) {
                            case 1:
                                that.setData(
                                    {
                                        alreadyAns: true
                                    },
                                    function () {
                                        that.getPersentDetail();
                                        that.$emit('refreshData');
                                    }
                                );
                                setTimeout(function () {
                                    that.setData({
                                        alreadyAns: false
                                    });
                                }, 2500);
                                break;

                            case 2:
                            case 3:
                                that.jumpToConfigList();
                        }
                    } else {
                        e.toast(t.msg || '服务器错误，请稍后重试');
                    }
                })
                .catch(function (t) {
                    uni.hideLoading();
                    e.toast(t.msg || '服务器错误，请稍后重试');
                });
        },
        jumpToLogin: function () {
            uni.navigateTo({
                url: '/pages/login/login'
            });
        },
        getPersentDetail: function () {
            var that = this;
            app.globalData
                .ajax({
                    url: '/activityCenter/answer/article/detail',
                    data: {
                        id: this.info.id
                    }
                })
                .then(function (t) {
                    if (t.success) {
                        that.setData(
                            {
                                percentageData: t.data.optionList
                            },
                            function () {
                                that.countDown(Math.floor(Number(t.data.optionList[0].percentage)));
                                that.countDownRight(Math.floor(Number(t.data.optionList[1].percentage)));
                            }
                        );
                    } else {
                        e.toast(t.msg || '服务器错误，请稍后重试');
                    }
                })
                .catch(function (t) {
                    e.toast(t.msg || '服务器错误，请稍后重试');
                });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
