<template>
    <view :class="'pop-up ' + (show ? 'show' : 'hide')">
        <view @tap="close" class="pop-up-mask ptp_exposure" data-ptpid="1fkl-vm1a-vieo-9fh2" v-if="show"></view>
        <view :class="'pop-box ' + (isPartDetails ? 'pb' : '')">
            <view class="pop-box-title">现金支付</view>
            <view @tap="close" class="iconfont iconclose pop-box-close ptp_exposure" data-ptpid="fk13-fu28-zfo1-82hf"></view>
            <view class="pop-box-select">
                <view>微信</view>
                <view class="iconfont iconradio_selected pop-box-icon"></view>
            </view>
            <view class="pop-box-tips">
                <text>需支付：</text>
                <text class="pop-box-tips-red">{{ money }}元</text>
            </view>
            <view class="pop-box-agreement">
                <image @tap="selectHandle" class="pop-box-agreement-icon" src="https://qiniu-image.qtshe.com/20210617_selectActive.png" v-if="select"></image>
                <image @tap="selectHandle" class="pop-box-agreement-icon" src="https://qiniu-image.qtshe.com/20210617_select.png" v-else></image>
                <view>本人确认</view>
                <view @tap="jumpToAgreement" class="pop-box-agreement-text" data-ptpid="ufn1-vm1a-vo2m-vu2b">《支付相关协议》</view>
            </view>
            <view @tap="payHandle" class="pop-box-button ptp_exposure" data-ptpid="du1g-f8h1-ch1n-vhm1">确认支付</view>
        </view>
    </view>
</template>

<script>

export default {
    data() {
        return {
            select: true
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        money: {
            type: Number,
            default: 0.01
        },
        isPartDetails: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close: function () {},
        payHandle: function () {},
        jumpToAgreement: function () {},
        selectHandle: function () {}
    }
};
</script>
<style lang="scss">
	@import './index.scss';
</style>
