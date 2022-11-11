<template>
    <view class="container">
        <view class="user-info">
            <view class="info-item active">
                公司名称
                <input @input="getCompanyName" placeholder="请输入您的公司名称" type="text" :value="enterpriseName" />
            </view>
            <view class="info-item active">
                职位名称
                <input @input="getPositionName" placeholder="请输入您的职位名称" type="text" :value="positionName" />
            </view>
            <picker @change="chooseWorkData" :data-id="1" :end="endTime" fields="month" mode="date">
                <view class="info-item">
                    开始时间
                    <input disabled placeholder="请选择" type="text" :value="startTime" />
                </view>
            </picker>
            <picker @change="chooseWorkData" :data-id="2" :end="nowData" fields="month" mode="date">
                <view class="info-item">
                    结束时间
                    <input disabled placeholder="请选择" type="text" :value="endTime" />
                </view>
            </picker>
            <view class="info-item active change">工作内容</view>
            <textarea autoHeight @input="getWorkDesc" maxlength="200" placeholder="请详细描述您的具体工作内容" placeholderClass="pl-textarea" :value="practiceDesc"></textarea>
        </view>
        <view @tap="handleAddWorks" class="save-btn ptp_exposure" data-ptpid="e69d-1b6b-8bb6-68d7">保存</view>
        <view @tap="handleDeleteWorks" class="save-btn active ptp_exposure" data-ptpid="9687-1df5-924b-275f" v-if="userSchoolPracticeId">删除实习经历</view>
    </view>
</template>

<script>

var app = getApp();
var a = true;
export default {
    data() {
        return {
            nowData: '',
            enterpriseName: '',
            positionName: '',
            startTime: '',
            endTime: '',
            practiceDesc: '',
            userSchoolPracticeId: ''
        };
    },
    onLoad: function (e) {
		this.nowData = '';
    },
    methods: {
        handleAddWorks: function () {},

        handleDeleteWorks: function () {},

        chooseWorkData: function (e) {},

        getCompanyName: function (e) {
			this.enterpriseName = e.detail.value;
        },

        getPositionName: function (e) {
			this.positionName = e.detail.value;
        },

        getWorkDesc: function (e) {
			this.practiceDesc = e.detail.value;
        }
    }
};
</script>
<style>
	@import './practiceskill.scss';
</style>
