<template>
    <view @touchmove.stop.prevent="preventTouchMove" class="container" v-if="isShowClone">
        <view class="loginBackModel"></view>
        <view class="LoginModel">
            <view class="content">
                <text class="title">青团社登录</text>
                <view class="quickBtn">
                    <open-button @initData="propsInitData" buttonName="一键登录" openType="getPhoneNumber"></open-button>
                </view>
                <button @tap="goLogin" class="numberBtn ptp_exposure" data-ptpid="efbb-142f-ab3b-19fa">手机号登录</button>
            </view>
            <view class="closeModel">
                <image lazyLoad @tap="closeModel" class="closeBtn ptp_exposure" data-ptpid="6672-1734-b3cd-86f4" src="https://qiniu-image.qtshe.com/closeShape.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
import openButton from '@/pages/components/openButton/openButton';
var app = getApp();
export default {
    components: {
        openButton
    },
    data() {
        return {};
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    mounted: function () {
    },
    methods: {
        preventTouchMove: function () {},
        closeModel: function () {},
        propsInitData: function () {},
        goLogin: function () {}
    },
    watch: {
        isShow: {
            handler: function (newVal, oldVal) {
                this.isShowClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './quickLogin.css';
</style>
