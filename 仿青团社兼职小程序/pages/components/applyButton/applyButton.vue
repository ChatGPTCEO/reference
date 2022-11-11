<template>
    <view class="foot-box">
        <view class="foot-agreement" v-if="agreementVo.result === 2">
            <view class="foot-agreement-left">
                <text class="ellipsis">团团建议先阅读</text>
                <text @tap="jumpToAgreement" class="foot-agreement-green ellipsis ptp_exposure" data-ptpid="m1dr-oerp-qafg-nvde">《{{ agreementVo.title }}》</text>
                哦～
            </view>
        </view>
        <view class="foot-apply" v-if="partJobVoClone.template.templateId !== 16 && partJobVoClone.template.templateId !== 13">
            <view class="relative">
                <view @tap="collect" class="shareCode ptp_exposure" data-ptpid="63bf-1709-ae9f-e11b">
                    <view :class="'shareview-image iconfont ' + collectImgClone"></view>
                    <view class="shareview">收藏</view>
                </view>
                <open-button @initData="onCollectClicked" class="login-mask" openType="getPhoneNumber" ptpId="63bf-1709-ae9f-e11b-0" v-if="!hasToken"></open-button>
            </view>
            <view @tap="jumpToReport" class="applybtn ptp_exposure" data-ptpid="b9e6-1750-b71f-2f5e" v-if="partJobVoClone.hasApply && partJobVoClone.buttonStatus !== 9">
                查看报名
            </view>
            <view class="applybtn gray" v-if="partJobVoClone.buttonStatus === 3">已结束</view>
            <view class="applybtn gray" v-if="partJobVoClone.buttonStatus === 4">已暂停</view>
            <view class="relative">
                <open-button @initData="onPromptlyClicked" class="login-mask" openType="getPhoneNumber" ptpId="26ca-1dd6-b35f-b3d0-0" v-if="!hasToken"></open-button>
                <view @tap="onPromptly" class="applybtn ptp_exposure" data-ptpid="26ca-1dd6-b35f-b3d0" id="pid=26ca-1dd6-b35f-b3d0" v-if="partJobVoClone.buttonStatus === 6">
                    {{ agreementVo.result === 2 ? '我已同意，立即报名' : '立即报名' }}
                </view>
                <view @tap="onPromptly" class="applybtn yellow ptp_exposure" data-ptpid="e43c-1674-9609-8478" v-if="partJobVoClone.buttonStatus === 7">
                    <view>排队报名</view>
                    <view class="applybtn-desc" v-if="partJobVoClone.queueCount >= 20">（前面有{{ partJobVoClone.queueCount }}人待录取）</view>
                </view>
            </view>
        </view>
        <view class="foot-apply" v-if="partJobVoClone.template.templateId === 13">
            <view class="apply-price" v-if="partJobVoClone.jobFeeVO.rushStatus === 1">¥ {{ partJobVoClone.jobFeeVO.feeRushPrice }}</view>
            <view
                @tap="jumpToReport"
                :class="'course-apply-btn ' + (partJobVoClone.jobFeeVO.rushStatus !== 1 ? 'width-686' : '') + ' ptp_exposure'"
                data-ptpid="b9e6-1750-b71f-2f5e"
                v-if="partJobVoClone.hasApply && partJobVoClone.buttonStatus !== 9"
            >
                查看报名
            </view>
            <view :class="'course-apply-btn ' + (partJobVoClone.jobFeeVO.rushStatus !== 1 ? 'width-686' : '') + ' gray'" v-if="partJobVoClone.buttonStatus === 3">已结束</view>
            <view :class="'course-apply-btn ' + (partJobVoClone.jobFeeVO.rushStatus !== 1 ? 'width-686' : '') + ' gray'" v-if="partJobVoClone.buttonStatus === 4">已暂停</view>
            <view class="relative" v-if="partJobVoClone.buttonStatus === 6">
                <open-button @initData="onPromptlyClicked" class="login-mask" openType="getPhoneNumber" ptpId="dkfi-dp01-cjgf-k2jf-0" v-if="!hasToken"></open-button>
                <view
                    @tap="onPromptly"
                    :class="'course-apply-btn ' + (partJobVoClone.jobFeeVO.rushStatus !== 1 ? 'width-686' : '') + ' ptp_exposure'"
                    data-ptpid="9f71-dk1n-zbcn-du1n"
                    v-if="partJobVoClone.jobFeeVO.rushStatus === 1"
                >
                    {{ partJobVoClone.jobFeeVO.buttons.btn2 }}
                </view>
                <view
                    @tap="onPromptly"
                    :class="'course-apply-btn ' + (partJobVoClone.jobFeeVO.rushStatus !== 1 ? 'width-686' : '') + ' ptp_exposure'"
                    data-ptpid="dkfi-dp01-cjgf-k2jf"
                    v-else
                >
                    {{ partJobVoClone.jobFeeVO.buttons.btn1 }}
                </view>
            </view>
            <view
                @tap="payHandle"
                :class="'course-apply-btn ' + (partJobVoClone.jobFeeVO.rushStatus !== 1 ? 'width-686' : '') + ' ptp_exposure'"
                data-ptpid="127f-1kfp-0281-jkd1"
                v-if="partJobVoClone.buttonStatus === 9"
            >
                待支付
            </view>
            <view class="relative" v-if="partJobVoClone.buttonStatus === 7">
                <open-button @initData="onPromptlyClicked" class="login-mask" openType="getPhoneNumber" ptpId="e43c-1674-9609-8478-0" v-if="!hasToken"></open-button>
                <view
                    @tap="onPromptly"
                    :class="'course-apply-btn ' + (partJobVoClone.jobFeeVO.rushStatus !== 1 ? 'width-686' : '') + ' column ptp_exposure'"
                    data-ptpid="e43c-1674-9609-8478"
                >
                    <view>排队报名</view>
                    <view class="applybtn-desc" v-if="partJobVoClone.queueCount >= 20">（前面有{{ partJobVoClone.queueCount }}人待录取）</view>
                </view>
            </view>
        </view>
        <view class="foot-apply" v-if="partJobVoClone.template.templateId === 16">
            <view
                @tap="jumpToReport"
                class="apply-btn ptp_exposure"
                data-ptpid="b9e6-1750-b71f-2f5e"
                id="pid=b9e6-1750-b71f-2f5e"
                v-if="partJobVoClone.hasApply && partJobVoClone.buttonStatus !== 9"
            >
                查看报名
            </view>
            <view class="apply-btn gray" v-if="partJobVoClone.buttonStatus === 3">已结束</view>
            <view class="apply-btn gray" v-if="partJobVoClone.buttonStatus === 4">已暂停</view>
            <view class="relative">
                <open-button @initData="onPromptlyClicked" class="login-mask" openType="getPhoneNumber" ptpId="9f71-dk1n-zbcn-du1n-0" v-if="!hasToken"></open-button>
                <view @tap="onPromptly" class="apply-btn ptp_exposure" data-ptpid="9f71-dk1n-zbcn-du1n" v-if="partJobVoClone.buttonStatus === 6">
                    {{ agreementVo.result === 2 ? baseInfo.noProtocolBtnText || baseInfo.btnText : baseInfo.btnText }}
                </view>
                <view @tap="onPromptly" class="apply-btn column ptp_exposure" data-ptpid="e43c-1674-9609-8478" v-if="partJobVoClone.buttonStatus === 7">
                    <view>排队报名</view>
                    <view class="applybtn-desc" v-if="partJobVoClone.queueCount >= 20">（前面有{{ partJobVoClone.queueCount }}人待录取）</view>
                </view>
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
        return {
            partJobFavoriteId: '',

            partJobVoClone: {
                jobFeeVO: {
                    buttons: {
                        btn2: '',
                        btn1: ''
                    }
                }
            },
			collectImgClone: ''
        };
    },
	watch: {
	    partJobVo: {
	        handler: function (newVal, oldVal) {
	            this.partJobVoClone = newVal;
	        },
	        immediate: true,
	        deep: true
	    },
	    collectImg: {
	        handler: function (newVal, oldVal) {
				this.collectImgClone = newVal;
	        },
	        immediate: true,
			deep: true
	    }
	},
    props: {
        hasToken: {
            type: Boolean,
            default: false
        },
        isShow: {
            type: Boolean,
            default: false
        },
        partJobVo: {
            type: Object,
            default: () => ({})
        },
        collectImg: {
            type: String,
            default: ''
        },
        buttonTitle: {
            type: String,
            default: '立即报名'
        },
        baseInfo: {
            type: Object,
            default: () => ({})
        },
        agreementVo: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        onLoginSuccess: function () {
            this.$emit('loginSuccess');
        },
        onCollectClicked: function () {
            this.$emit('loginSuccess');
            this.collect();
        },
        onPromptlyClicked: function () {
            this.$emit('loginSuccess');
            this.onPromptly();
        },
        onPromptly: function () {
            this.$emit('promptly');
        },
        payHandle: function () {
            this.$emit('pay');
        },
        collect: function () {},
        jumpToReport: function () {},
        jumpToAgreement: function () {},
        cancelHandle: function () {}
    },
};
</script>
<style lang="scss">
	@import './applyButton.scss';
</style>
