<template>
    <view>
        <ani-box maskPtpid="317a-1175-9073-2155" :visible="isDialog">
            <view @touchmove.stop.prevent="preventDefault" class="dialog-box" v-if="dialogId === 1">
                <image lazyLoad class="dialog-box-top" mode="widthFix" src="https://qiniu-image.qtshe.com/719signtop1.png"></image>
                <view class="dialog-info-box">
                    <view class="dialog-title">已累计签到{{ signInfo.attendanceTotal }}天</view>
                    <view class="dialog-sibtitle">
                        明天签到{{ signInfo.attendanceNumber === 4 || signInfo.attendanceNumber === 6 ? '最高' : '' }}可获得
                        <text>{{ signInfo.attendanceNumber === 7 ? '5' : signInfo.beansList[signInfo.attendanceNumber] }}青豆</text>
                        ，记得要来鸭！
                    </view>
                    <view class="sign-content">
                        <view class="sign-list" v-for="(item, index) in signInfo.beansList" :key="index">
                            <view class="sign-tips ignoreT2" v-if="index === 4 || index === 6"></view>

                            <view :class="'sign-item ' + (index <= signInfo.attendanceNumber - 1 ? 'active' : '')">
                                <image lazyLoad class="sign-arrow" src="https://qiniu-image.qtshe.com/719signtrue.png" v-if="index <= signInfo.attendanceNumber - 1"></image>
                                <block v-else>
                                    <view :class="'sign-text ' + (signInfo.attendanceNumber - 1 <= index ? 'active' : '')">{{ item }}</view>
                                    <image
                                        lazyLoad
                                        class="sign-image"
                                        :src="index === 4 || index === 6 ? 'https://qiniu-image.qtshe.com/719signgif.png' : 'https://qiniu-image.qtshe.com/719signscore.png'"
                                    ></image>
                                </block>
                            </view>

                            <view class="time-item" v-if="index <= signInfo.attendanceNumber - 1">已领取</view>

                            <view class="time-item" v-else>第{{ index + 1 }}天</view>
                        </view>
                    </view>
                    <button class="sign-btn" hoverClass="none" openType="share">立即分享</button>
                </view>
                <view @tap="closeDialog" class="iconfont iconclose_round close-button" data-ptpid="32d7-19ea-a58f-cdfb" data-type="subscribe"></view>
            </view>
            <view @touchmove.stop.prevent="preventDefault" class="dialog-box" v-if="dialogId === 2">
                <image lazyLoad class="dialog-box-top mb78" mode="widthFix" src="https://qiniu-image.qtshe.com/719signtop2.png"></image>
                <view class="dialog-info-box pt50">
                    <view class="dialog-title">呼朋唤友一起来</view>
                    <view class="dialog-sibtitle">邀请好友一起来更快开启礼包奖励鸭！</view>
                    <image lazyLoad class="dialog-score-image" src="https://qiniu-image.qtshe.com/719dialogscore.png"></image>
                    <view class="dialog-score">
                        分享奖励青豆
                        <text>+{{ rewardScore }}</text>
                    </view>
                    <button @tap="closeDialog" class="sign-btn" data-ptpid="7567-1135-8740-7651" hoverClass="none" openType="share">立即分享</button>
                </view>
                <view @tap="closeDialog" class="iconfont iconclose_round close-button" data-ptpid="7c2e-1a1c-9765-1933"></view>
            </view>
            <view @touchmove.stop.prevent="preventDefault" class="dialog-box" v-if="dialogId === 3">
                <image lazyLoad class="dialog-box-top" mode="widthFix" src="https://qiniu-image.qtshe.com/719signtop1.png"></image>
                <view class="dialog-info-box">
                    <view class="dialog-title">签到成功</view>
                    <view class="dialog-sibtitle">团团发现你是新用户，为你准备了大礼包！</view>
                    <image lazyLoad class="dialog-score-image" src="https://qiniu-image.qtshe.com/719dialogscore.png"></image>
                    <view class="dialog-score">
                        奖励青豆
                        <text>+{{ signInfo.number || 3 }}</text>
                    </view>
                    <button @tap="skipNoviceArea" class="sign-btn" data-ptpid="64c7-1121-821a-2652" hoverClass="none">马上领取现金红包</button>
                </view>
                <view @tap="closeDialog" class="iconfont iconclose_round close-button" data-ptpid="a019-1b2a-8deb-e99d"></view>
            </view>
            <view @touchmove.stop.prevent="preventDefault" class="dialog-success" v-if="dialogId === 4">
                <view class="dialog-success-title">获得奖励</view>
                <view class="dialog-success-image">
                    <image lazyLoad class="dialog-success-light" src="https://qiniu-image.qtshe.com/719dialoglight.png"></image>
                    <image lazyLoad class="dialog-success-score" src="https://qiniu-image.qtshe.com/719dialogscore.png"></image>
                </view>
                <view class="dialog-success-text">
                    奖励青豆
                    <text>+{{ rewardScore }}</text>
                </view>
            </view>
        </ani-box>
    </view>
</template>

<script>
import aniBox from '@/components/aniBox/index';

export default {
    components: {
        aniBox
    },
    data() {
        return {
            current: 0
        };
    },
    props: {
        isDialog: {
            type: Boolean,
            default: false
        },
        dialogId: {
            type: Number,
            default: 1
        },
        rewardScore: {
            type: Number,
            default: 2
        },
        signInfo: {
            type: Object,
            default: () => ({
                integralNumber: 0,
                beansList: [5, 5, 5, 5, 50, 5, 100],
                attendanceNumber: 1,
                number: 3,
                keep: false,
                attendanceTotal: 0
            })
        }
    },
    methods: {
        openVideoAd: function () {
            this.$emit('openVideoAd');
        },
        closeDialog: function (t) {},
        skipNoviceArea: function () {},
        preventDefault: function () {}
    }
};
</script>
<style lang="scss">
	@import './index.scss';
</style>
