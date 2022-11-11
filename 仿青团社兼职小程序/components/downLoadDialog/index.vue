<template>
    <view>
        <ani-box :maskPtpid="'ac03-1bca-1aff-c6f3-' + type" v-if="show">
            <view disableScroll class="dialog-box">
                <block v-if="step === 1">
                    <image lazyLoad class="dialog-box-top" mode="widthFix" src="https://qiniu-image.qtshe.com/719signtop1.png"></image>
                    <view class="dialog-info-box">
                        <view class="dialog-title-new" v-if="type === 4">恭喜获得额外现金红包</view>
                        <view class="dialog-title-new" v-else>{{ type === 1 ? '签到' : type === 2 ? '答题' : type === 3 ? '步数兑换' : '' }}成功，获得 {{ peanGoods }} 青豆</view>
                        <view class="dialog-sibtitle-new" v-if="type !== 4">恭喜获得额外现金红包</view>
                        <view class="money-box">
                            <image class="money-icon" src="https://qiniu-image.qtshe.com/guide/guide_coin.png"></image>
                            <text class="money-text">¥{{ money }}元</text>
                        </view>
                        <button
                            @tap="stepToSuccess"
                            class="sign-btn-new animate-btn ptp_exposure"
                            :data-ptpid="'3ygs-1c0a-am8f-c0fb-' + type"
                            :id="'pid=3ygs-1c0a-am8f-c0fb-' + type"
                        >
                            去青团社APP领取提现
                        </button>
                    </view>
                </block>
                <block v-else>
                    <image lazyLoad class="guide-top" src="https://qiniu-image.qtshe.com/guide/guide_top_img.png"></image>
                    <view class="guide-info-box ptp_exposure" :data-ptpid="'oy0s-1xx9-1m8f-c0fb-' + type">
                        <view class="msg">口令复制成功</view>
                        <view class="withdraw">打开青团社APP去提现</view>
                        <view class="warn">还未安装青团社APP？</view>
                        <view class="download">
                            请前往应用市场搜索
                            <text>“青团社兼职”</text>
                            下载并安装
                        </view>
                    </view>
                </block>
                <view @tap="closeDialog" class="iconfont iconclose_round close-button" :data-ptpid="'30d7-1c2a-an8f-cdfb-' + type"></view>
            </view>
        </ani-box>
    </view>
</template>

<script>
import aniBox from '../aniBox/index';
export default {
    components: {
        aniBox
    },
    data() {
        return {
            step: 1
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        peanGoods: {
            type: Number,
            default: 0
        },
        type: {
            type: Number,
            default: 1
        },
        word: {
            type: String,
            default: ''
        },
        money: {
            type: Number,
            default: 0.5
        }
    },
    methods: {
        stepToSuccess: function () {
            this.copyText(this.word);
        },
        closeDialog: function () {
            this.$emit('reset');
            this.setData({
                step: 1
            });
        },
        copyText: function (e) {
            var that = this;
            uni.setClipboardData({
                data: e,
                success: function () {
                    that.setData({
                        step: 2
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
