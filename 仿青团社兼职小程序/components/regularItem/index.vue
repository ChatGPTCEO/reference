<template>
    <view>
        <inner-slider :list="item.componentData" :ptpId="'innerSlider-' + listIndex + '-' + (index + 1)" v-if="item.componentName === 'innerSlider'"></inner-slider>
        <inner-banner :list="item.componentData" :ptpId="'innerBanner-' + listIndex + '-' + (index + 1)" v-else-if="item.componentName === 'innerBanner'"></inner-banner>
        <block v-else-if="item.componentName === 'innerRankList'">
            <inner-rank
                :ptpId="'innerRank-' + listIndex + '-' + (index + 1)"
                :rankList="item.componentData.rankingList"
                v-if="item.componentData && item.componentData.rankingList"
            ></inner-rank>
        </block>
        <class-list :classData="item.componentData" v-else-if="item.componentName === 'classList'"></class-list>
        <view @tap="handleTapFresh" class="fresh-button ptp_exposure" data-ptpid="b33d-19b7-a285-2f9a" id="pid=b33d-19b7-a285-2f9a" v-else-if="item.componentName === 'refreshBtn'">
            <image lazyLoad src="https://qiniu-image.qtshe.com/newHomePage/fresh.png"></image>
            点击刷新更多优质岗位
        </view>
        <anchor-list :hostList="item.componentData" v-else-if="item.componentName === 'anchorList'"></anchor-list>
        <inner-like :likeList="item.componentData" v-else-if="item.componentName === 'innerLikeArea'"></inner-like>
        <view
            @tap="showJobDetail"
            :class="'regular-item ' + (isRank && index < 4 ? 'mb44' : '') + ' ptp_exposure'"
            :data-algorithmStrategyId="item.algorithmStrategyId"
            :data-businessId="item.partJobId"
            data-businessType="1"
            :data-dataSource="item.dataSource"
            :data-distance="item.distance"
            :data-index="index"
            :data-keywords="keywords"
            :data-listTag="1"
            :data-partjobid="item.partJobId"
            :data-ptpid="ptpId"
            :data-remark="remark ? 'tagType_' + recommendLabelType + '&' + remark : recommendLabelType"
            :data-sourceid="item.sourceId"
            v-else
        >
            <block v-if="item.descArea.labelName && !isRank">
                <view class="regular-gradient" :style="'background:linear-gradient(314deg, #FFFFFF 0%, #FFFFFF 40% ,' + item.descArea.background + ' 100%)'"></view>
                <view
                    @tap.stop.prevent="_universalJump"
                    class="regular-desc ellipsis ptp_exposure"
                    :data-businessId="item.partJobId"
                    data-businessType="0"
                    :data-item="item.descArea"
                    data-ptpid="8m72-mk82-ss34-dea1"
                    :data-remark="'param_' + item.descArea.param + '&jumpKey_' + item.descArea.jumpKey"
                    :id="'pid=8m72-mk82-ss34-dea1|bid=' + item.partJobId + '|bt=0|r=param_' + item.descArea.param + '&jumpKey_' + item.descArea.jumpKey"
                >
                    <image :src="item.descArea.icon"></image>
                    <view class="ellipsis">{{ item.descArea.labelName }}</view>
                </view>
            </block>
            <view class="regular-ranking" v-if="isRank && index <= 4">
                <view class="regular-num">{{ index + 1 }}</view>
                <view class="regular-num-des" v-if="index <= 2">{{ index === 0 ? '本周最热' : 'Top' + index + 1 }}</view>
            </view>
            <view class="regular-title-box">
                <view class="regular-title ellipsis">{{ item.title }}</view>
                <view class="regular-salary">
                    {{ item.salaryDescCount }}
                    <text v-if="item.unit">/{{ item.unit }}</text>
                </view>
            </view>
            <view class="regular-tag-list" v-if="item.labels && item.labels.length && item.jobLineType !== 2">
                <view
                    :class="'regular-tag-item ' + (item.specialIcon ? 'special' : 'normal')"
                    :style="item.specialIcon ? 'background-image:url(' + item.specialIcon + ')' : ''"
                    v-for="(item, index) in item.labels"
                    :key="item.labelName"
                >
                    <view class="regular-tag-content">{{ item.labelName }}</view>
                </view>
            </view>
            <block v-if="item.jobLineType === 2">
                <view class="regular-address ellipsis" v-if="item.gateLabel">
                    <image class="icon_jl icon_gate" :src="item.gateLabel.icon"></image>
                    <view class="regular-disdance">{{ item.gateLabel.lines }}</view>
                    <view class="regular-addText ellipsis">| 距{{ item.gateLabel.station_name }}站{{ item.gateLabel.distance }}米</view>
                </view>
                <view class="regular-address ellipsis" v-else>
                    <image class="icon_jl" src="https://qiniu-image.qtshe.com/newLabel/icon_jl.png"></image>
                    <view class="regular-disdance" v-if="item.distance">{{ item.distance }}</view>
                    <view class="regular-addText ellipsis">{{ item.distance ? '|' : '' }} {{ item.addressDetail || '不限工作地点' }}</view>
                </view>
            </block>
            <view class="regular-company">
                <view class="regular-company-inner">
                    <view class="regular-header">
                        <image class="icon_jl" :src="item.companyLogo" v-if="item.companyLogo"></image>
                        <view :class="'regular-word ' + (item.companyType.key === '2' ? 'orange' : '')" v-else>{{ item.newCompanyNameCharAt }}</view>
                    </view>
                    <view class="regular-company-name ellipsis">{{ item.newCompanyName }}</view>
                    <image class="icon_corner" src="https://qiniu-image.qtshe.com/newLabel/icon_qy.png" v-if="item.companyType.key === '1'"></image>
                    <image class="icon_corner" src="https://qiniu-image.qtshe.com/newLabel/icon_gr.png" v-else></image>
                </view>
                <view class="regular-join" v-if="!(isRank && index <= 2)">立即报名</view>
            </view>
            <view class="regular-status" v-if="isRank && index <= 2">
                <view class="regular-browse" :style="item.labelRankingAttachParams.icon ? 'background-image:url(' + item.labelRankingAttachParams.icon + ')' : ''">
                    {{ item.labelRankingAttachParams.desc || '' }}
                </view>
                <image class="regular-btn" src="https://qiniu-image.qtshe.com/newLabel/icon_bm1.png" v-if="!item.applyStatus"></image>
                <image class="regular-btn" src="https://qiniu-image.qtshe.com/newLabel/icon_ybm1.png" v-else></image>
            </view>
        </view>
    </view>
</template>

<script>
getApp();


export default {
    data() {
        return {
            item: {},
            channel: '',
            recommendLabelType: ''
        };
    },
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        ptpId: {
            type: String,
            default: ''
        },
        type: {
            type: Number,
            default: 0
        },
        index: {
            type: Number,
            default: 0
        },
        dotShow: {
            type: Boolean,
            default: true
        },
        isJobList: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            default: ''
        },
        listIndex: {
            type: Number,
            default: 0
        },
        needSelfClick: {
            type: Boolean,
            default: false
        },
        keywords: {
            type: String,
            default: ''
        },
        noMarginBottom: {
            type: Boolean,
            default: false
        },
        lazyload: {
            type: Boolean,
            default: true
        },
        page: {
            type: String,
            default: ''
        },
        isRank: {
            type: Boolean,
            default: false
        },
        remark: {
            type: String,
            default: ''
        }
    },
    methods: {
        _universalJump: function (a) {},
        init: function (e) {
            var a = '';

            if ((e = JSON.parse(JSON.stringify(e))).labelList && e.labelList.descLabels && e.labelList.descLabels.length) {
                e.labels = e.labelList.descLabels.map(function (e) {
                    if (e.labelStyle) {
                        e.labelStyle = JSON.parse(e.labelStyle || '{}');
                    }

                    return e;
                });
            }

            if (e.companyType && '2' === e.companyType.key) {
                e.newCompanyName = e.companyName || '';
                e.newCompanyNameCharAt = e.newCompanyName.charAt(0);
            } else {
                e.newCompanyName = e.brandName || e.companyName || '';
            }

            e.newCompanyNameCharAt = e.newCompanyName.charAt(0);
            e.descArea = {};

            if (2 === e.listStyle) {
                e.descArea = {
                    icon: 'https://qiniu-image.qtshe.com/newLabel/icon_face.png',
                    labelName: e.newJobIntroduction || '',
                    background: '#FFF2E5'
                };
            } else {
                if (3 === e.listStyle) {
                    e.descArea = {
                        icon: 'https://qiniu-image.qtshe.com/newLabel/class.png',
                        labelName: e.newJobIntroduction || '',
                        background: '#E5FCFF'
                    };
                }
            }

            if (e.labelRecommendNewList) {
                var t = e.labelRecommendNewList;
                var l = t.subwayLabels;
                var n = void 0 === l ? [] : l;
                var s = t.rankingLabels;
                var i = void 0 === s ? [] : s;
                if (n.length) {
                    var r = {};

                    try {
                        r = JSON.parse(n[0].tagParams || '{}');
                    } catch (e) {}

                    r.icon = (n[0] && n[0].icon) || '';
                    r.lines = r.lines && r.lines.replace(new RegExp(',', 'g'), '、');
                    e.gateLabel = r;
                    a = 'gateway';
                }

                if (i.length && !e.descArea.labelName) {
                    var o = i[0];
                    var p = {};
                    try {
                        p = JSON.parse(o.tagParams || '{}');
                    } catch (e) {}

                    if (1 !== o.tagType) {
                        var c = {
                            jumpKey: o.jumpKey,
                            param: o.param,
                            background: o.backgroundColor || '#FFF2E5',
                            icon: o.icon || ''
                        };

                        if (2 === o.tagType && p.schoolName) {
                            c.labelName = '入选「' + p.schoolName + '校友热推榜」第' + p.ranking + '名';
                        } else {
                            if (3 === o.tagType && p.business_area) {
                                c.labelName = '入选「' + p.business_area + '热推榜」第' + p.job_rnk + '名';
                            } else {
                                if (4 === o.tagType && p.label_name) {
                                    c.labelName = '入选「' + p.label_name + '热推榜」第' + p.job_rnk + '名';
                                }
                            }
                        }

                        e.descArea = c;
                    }
                }
            }

            if (e.specialLabel) {
                if (e.labels) {
                    e.labels.unshift(e.specialLabel);
                } else {
                    e.labels = [e.specialLabel];
                }
            }

            if (e.salary && e.salary.indexOf('/') > -1) {
                e.salaryDescCount = e.salary.split('/')[0];
                e.unit = e.salary.split('/')[1];
            } else {
                e.salaryDescCount = e.salary;
            }
			this.item = e;
			this.recommendLabelType = a;
        },
        jumpBannerLink: function (a) {},
        handleTapFresh: function () {},
        classTap: function (e) {},
        showJobDetail: function (e) {}
    },
    watch: {
        data: {
            handler: function (e) {
                this.init(e);
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
