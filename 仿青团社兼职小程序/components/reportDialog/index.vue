<template>
    <view>
        <block v-if="visible">
            <view :class="'qts-mask ' + (reportVisibleClone ? 'show' : 'hidden')">
                <view @tap="closeReportDialog" class="qts-mask-bg ptp_exposure" :data-ptpid="isPartDetails ? '28a6-1ebc-b0f5-dae7' : 'dhg1-fh2g-h3bf-fh1b'"></view>
                <view :class="'qts-mask-main ' + (isPartDetails ? '' : 'pb-32') + ' ' + (reportVisibleClone ? 'popup' : '')">
                    <view
                        @tap="closeReportDialog"
                        class="qts-close-wrap ptp_exposure"
                        :data-ptpid="isPartDetails ? '5983-1650-a367-446c' : 'fj2y-cn2b-27dh-lvoh'"
                        v-if="partJobVo.template.templateId !== 6"
                    >
                        <image class="qts-mask-close" src="https://qiniu-image.qtshe.com/20190812_maskClose.png"></image>
                    </view>
                    <block v-if="partJobVo.template.templateId === 16 || partJobVo.template.templateId === 11">
                        <view class="qts-mask-title">温馨提示</view>
                        <view class="qts-mask-text">{{ reportDialogText }}</view>
                    </block>
                    <block v-else>
                        <view class="qts-mask-title">确认工作信息</view>
                        <view class="qts-mask-notice" v-if="partJobVo.jobLineType === 2 && !hasLatitude">你未开启定位，请注意确认工作地点</view>
                        <view>
                            <block
                                v-if="
                                    partJobVo.needHealth ||
                                    partJobVo.diploma !== 0 ||
                                    partJobVo.sexRequire.key !== '0' ||
                                    (partJobVo.needHeight && partJobVo.heightRequire !== '不限')
                                "
                            >
                                <view class="qts-mask-item">工作要求</view>
                                <view class="qts-mask-tips">
                                    <block v-if="partJobVo.requireList.length">
                                        <view class="qts-tips-item" v-for="(item, index) in partJobVo.requireList" :key="item">{{ item }}</view>
                                    </block>
                                </view>
                            </block>
                            <view class="qts-mask-item">工作地点</view>
                            <view class="qts-mask-address">
                                <view class="qts-mask-address-detail">{{ partJobVo.addressDetail }}</view>
                                <view v-if="partJobVo.jobLineType === 2 && partJobVo.distance">{{ partJobVo.distance.distance }}</view>
                                <view v-if="partJobVo.jobLineType === 2 && !partJobVo.distance">{{ partJobVo.publishTown.townName }}</view>
                            </view>
                            <view class="qts-mask-item">工作时间</view>
                            <view class="qts-mask-time">{{ partJobVo.jobDateDesc }} {{ partJobVo.jobTime }}</view>
                            <block v-if="famousList.length > 0">
                                <view class="qts-mask-text">{{ recommendTips }}</view>
                                <view class="qts-famous-recommend">
                                    <view
                                        :class="'qts-recommend-item ' + (index === famousList.length - 1 ? 'qts-no-border' : '')"
                                        v-for="(item, index) in famousList"
                                        :key="index"
                                    >
                                        <image
                                            @tap="selectJob"
                                            class="qts-recommend-icon"
                                            :data-index="index"
                                            :data-ptpid="isPartDetails ? '4bb9-10fb-9cd9-76b8' : '27fg-v2hc-29fj-ol2n'"
                                            src="https://qiniu-image.qtshe.com/20190812_checkActive.png"
                                            v-if="item.status"
                                        ></image>

                                        <image
                                            @tap="selectJob"
                                            class="qts-recommend-icon"
                                            :data-index="index"
                                            :data-ptpid="isPartDetails ? '4bb9-10fb-9cd9-76b8' : '27fg-v2hc-29fj-ol2n'"
                                            src="https://qiniu-image.qtshe.com/20190812_check.png"
                                            v-else
                                        ></image>

                                        <view
                                            @tap="selectJob"
                                            :class="'qts-recommend-main ' + (index === famousList.length - 1 ? 'qts-no-border' : '') + ' ptp_exposure'"
                                            :data-index="index"
                                            :data-ptpid="isPartDetails ? '4bb9-10fb-9cd9-76b8' : '27fg-v2hc-29fj-ol2n'"
                                        >
                                            <view class="qts-recommend-content">
                                                <view class="qts-recommend-title">{{ item.title }}</view>
                                                <view class="qts-recommend-distance">{{ item.addressDetail }} {{ item.distance }}</view>
                                            </view>
                                            <view class="qts-recommend-salary">{{ item.salary }}</view>
                                        </view>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </block>
                    <view class="qts-apply-content" v-if="tips">{{ tips }}</view>
                    <view class="qts-mask-button-disable" v-if="tips">确认报名</view>
                    <view @tap="applyValidate" class="qts-mask-button ptp_exposure" :data-ptpid="isPartDetails ? 'bdbf-1c9e-ba25-8d88' : 'f827-fjb1-fh3b-vj3b'" v-else>
                        确认报名
                    </view>
                </view>
            </view>
            <view disableScroll class="qts-mask-bg" v-if="successVisible">
                <view class="qts-success-box">
                    <image class="qts-success-pic" mode="scaleToFill" src="https://qiniu-image.qtshe.com/20210107_icon.png"></image>
                    <image
                        @tap="closeReportDialog"
                        class="qts-success-close ptp_exposure"
                        :data-ptpid="isPartDetails ? '8fdh-zkfb-wyu1-vol1' : '28fh-28f6-fj2b-vm3h'"
                        mode="scaleToFill"
                        src="https://qiniu-image.qtshe.com/20210107_close.png"
                    ></image>
                    <view class="qts-success-title">{{ partJobVo.jobFeeVO && partJobVo.jobFeeVO.rushStatus === 1 ? '抢购成功' : '领取成功' }}</view>
                    <view class="qts-success-text">
                        {{ partJobVo.jobFeeVO && partJobVo.jobFeeVO.rushStatus === 1 ? '名额锁定成功，快快联系老师听课吧！' : '预约成功，快去联系老师锁定名额吧！' }}
                    </view>
                    <view @tap="copyContact" class="qts-success-button ptp_exposure" :data-ptpid="isPartDetails ? 'fu1n-zlje-27fh-zbf1' : '38fh-20fj-fl2j-73gf'" v-if="contactNo">
                        复制商家联系方式
                    </view>
                </view>
            </view>
            <pay-dialog
                @cancel="cancelPayHandle"
                @success="successPayHandle"
                :isPartDetails="isPartDetails"
                :money="partJobVo.jobFeeVO.feeRushPrice"
                :show="payVisible"
            ></pay-dialog>
        </block>
    </view>
</template>

<script>
import payDialog from '@/pages/components/payDialog/index';

export default {
    components: {
        payDialog
    },
    data() {
        return {
            tips: '',
            applyId: '',
            sendData: {},
            payVisible: false,
            successVisible: false,
            contactWay: '',
            contactNo: '',

            famousList: {
                length: 0
            }
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        partJobId: {
            type: String,
            default: ''
        },
        reportVisible: {
            type: Boolean,
            default: false
        },
        partJobVo: {
            type: Object,
            default: () => ({})
        },
        famousJobList: {
            type: Array,
            default: () => []
        },
        hasLatitude: {
            type: Boolean,
            default: false
        },
        recommendTips: {
            type: String,
            default: ''
        },
        authorizedKey: {
            type: String,
            default: ''
        },
        shareUserId: {
            type: String,
            default: ''
        },
        source: {
            type: String,
            default: ''
        },
        isPartDetails: {
            type: Boolean,
            default: false
        },
        fromRecommend: {
            type: Boolean,
            default: false
        },
        agreementVo: {
            type: Object,
            default: () => ({})
        },
        isDirect: {
            type: Boolean,
            default: false
        },
        reportDialogText: {
            type: String,
            default: '报名后需要参与课程学习，技能提升后才会有就业机会哦～'
        }
    },
    beforeMount: function () {},
    methods: {
        cancelPayHandle: function () {},
        successPayHandle: function () {},
        queryMobile: function () {},
        selectJob: function (e) {},
        saveAgreeMent: function () {},
        applyValidate: function () {},
        goApplyJob: function (t, a, s, o) {},
        normalApply: function () {},
        closeReportDialog: function () {},
        copyContact: function () {},
        signUserContacted: function () {}
    },
    watch: {
        reportVisible: {
            handler: function (newVal, oldVal) {
                this.reportVisibleClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
	@import './index.scss';
</style>
