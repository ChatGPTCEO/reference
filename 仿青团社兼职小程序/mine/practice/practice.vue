<template>
    <view class="container">
        <view class="resume-p">完善以下信息是找实习工作的第一步哦～</view>
        <view class="user-info">
            <view class="info-item active">
                邮箱
                <input @input="getEmail" placeholder="请填写你的邮箱" type="text" :value="email" />
            </view>
            <view @tap="skipToSkill" class="info-item change ptp_exposure" data-ptpid="76e1-157d-b9fb-9538">
                技能证书
                <input disabled placeholder="请添加你的技能证书" type="text" v-if="userCertificates.length === 0" />
            </view>
            <view class="jobtype-list" v-if="userCertificates.length !== 0">
                <view class="jobtype-item" v-for="(item, index) in userCertificates" :key="item.userCertificateId">{{ item.name }}</view>
            </view>
        </view>
        <view class="resume-tips">校园经历</view>
        <view @tap="skipToSchoolSkill" class="work-resume ptp_exposure" data-ptpid="f2f2-1cc2-8cd6-7cb3" v-if="userSchoolPractices.length === 0">
            <view class="create-works">添加校园经历</view>
        </view>
        <view class="education-contaner" v-else>
            <view class="education-info" v-for="(item, index) in userSchoolPractices" :key="item.userSchoolPracticeId">
                <view class="education-detail">
                    <view class="education-name">{{ item.enterpriseName }}</view>
                    <view class="education-year">
                        <text>{{ item.startTime }} - {{ item.endTime }}</text>
                        <text>{{ item.positionName }}</text>
                    </view>
                    <view class="education-year" style="margin-top: 16rpx">{{ item.practiceDesc }}</view>
                </view>

                <view @tap="skipToSchoolSkill" class="education-edit ptp_exposure" :data-index="index" :data-param="item" data-ptpid="6643-1a39-9fdf-5fec">编辑</view>
            </view>
            <view @tap="skipToSchoolSkill" class="create-add ptp_exposure" data-ptpid="0198-127a-acdc-3d57" v-if="userSchoolPractices.length < 3">添加校园经历</view>
        </view>
        <view class="resume-tips">实习经历</view>
        <view @tap="skipToPracticeSkill" class="work-resume ptp_exposure" data-ptpid="31b7-10dc-8f2c-03fb" v-if="socialPractices.length === 0">
            <view class="create-works">添加实习经历</view>
        </view>
        <view class="education-contaner" v-else>
            <view class="education-info" v-for="(item, index) in socialPractices" :key="item.userSchoolPracticeId">
                <view class="education-detail">
                    <view class="education-name">{{ item.enterpriseName }}</view>
                    <view class="education-year">
                        <text>{{ item.startTime }} - {{ item.endTime }}</text>
                        <text>{{ item.positionName }}</text>
                    </view>
                    <view class="education-year" style="margin-top: 16rpx">{{ item.practiceDesc }}</view>
                </view>

                <view @tap="skipToPracticeSkill" class="education-edit ptp_exposure" :data-index="index" :data-param="item" data-ptpid="f77f-19eb-94b5-e7d3">编辑</view>
            </view>
            <view @tap="skipToPracticeSkill" class="create-add ptp_exposure" data-ptpid="e3a1-1d05-8dea-187c" v-if="socialPractices.length < 3">添加实习经历</view>
        </view>
        <view class="info-item active mt32 change">
            <view class="info-title">简历开放给商家</view>
            <qts-switch @change="onSwitchChange" :value="openResume"></qts-switch>
        </view>
        <view class="info-item active mt32 change">
            <view class="info-title">是否有直播经验</view>
            <view class="exp">
                <view @tap="chooseExp" :class="'exp-item ' + (hasAnchorExperience === 1 ? 'active' : '')" :data-exp="1" data-ptpid="fb4f-1471-8431-ad63">
                    <image lazyLoad mode="scaleToFill" src="https://qiniu-image.qtshe.com/2020610_radioActive.png" v-if="hasAnchorExperience === 1"></image>
                    <image lazyLoad mode="scaleToFill" src="https://qiniu-image.qtshe.com/2020610_radio.png" v-else></image>
                    <view>是</view>
                </view>
                <view @tap="chooseExp" :class="'exp-item margin-left-80 ' + (hasAnchorExperience === 2 ? 'active' : '')" :data-exp="2" data-ptpid="e07a-1464-af92-2f54">
                    <image lazyLoad mode="scaleToFill" src="https://qiniu-image.qtshe.com/2020610_radioActive.png" v-if="hasAnchorExperience === 2"></image>
                    <image lazyLoad mode="scaleToFill" src="https://qiniu-image.qtshe.com/2020610_radio.png" v-else></image>
                    <view>否</view>
                </view>
            </view>
        </view>
        <view @tap="handleSaveResume" class="save-btn ptp_exposure" data-ptpid="3c80-126e-8512-453b">完成</view>
    </view>
</template>

<script>
import qtsSwitch from '@/pages/components/switch/index';

var app = getApp();
export default {
    components: {
        qtsSwitch
    },
    data() {
        return {
            email: '',
            isClick: true,
            userCertificates: [],
            openResume: false,
            socialPractices: [],
            userSchoolPractices: [],
            qqContact: '',
            wechatContact: '',
            hasAnchorExperience: 0
        };
    },
    onLoad: function () {},
    onShow: function () {
        this.initData();
        this.getSimple();
    },
    methods: {
        getEmail: function (a) {
			this.email = a.detail.value;
        },

        skipToSkill: function () {
            uni.navigateTo({
                url: '/mine/skill/skill'
            });
        },

        getSimple: function () {
            uni.setNavigationBarTitle({
                title: '简历完善度' + 80 + '%'
            });
        },

        skipToSchoolSkill: function (a) {
            var e = a.currentTarget.dataset.param;

            if (e) {
                uni.navigateTo({
                    url: '/mine/schoolskill/schoolskill?param=' + encodeURIComponent(JSON.stringify(e))
                });
            } else {
                uni.navigateTo({
                    url: '/mine/schoolskill/schoolskill'
                });
            }
        },

        skipToPracticeSkill: function (a) {
            var e = a.currentTarget.dataset.param;

            if (e) {
                uni.navigateTo({
                    url: '/mine/practiceskill/practiceskill?param=' + encodeURIComponent(JSON.stringify(e))
                });
            } else {
                uni.navigateTo({
                    url: '/mine/practiceskill/practiceskill'
                });
            }
        },

        initData: function () {},

		// 保存数据，回到个人中心
        handleSaveResume: function () {
			uni.switchTab({
			    url: '/pages/mine/mine'
			});
		},

        onSwitchChange: function (a) {
            var e = a.detail.value;
			this.openResume = e;
        },

        chooseExp: function (a) {
            var e = a.currentTarget.dataset.exp;
			this.hasAnchorExperience = e;
        }
    }
};
</script>
<style lang="scss">
	@import './practice.scss';
</style>
