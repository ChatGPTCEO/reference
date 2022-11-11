<template>
    <view class="container">
        <view class="user-info">
            <view @tap="chooseSchool" class="info-item ptp_exposure" data-ptpid="2023-138a-8ce1-fe37">
                <view class="info-title">学校</view>
                <input disabled placeholder="请选择" type="text" :value="schoolName" />
            </view>
            <picker @change="chooseEduction" :data-id="1" :range="educationArray">
                <view class="info-item">
                    <view class="info-title">学历</view>
                    <input disabled placeholder="请选择" type="text" :value="education" />
                </view>
            </picker>
            <picker @change="chooseEduction" :data-id="2" :end="nowData" fields="year" mode="date">
                <view class="info-item">
                    <view class="info-title">入学年份</view>
                    <input disabled placeholder="请选择" type="text" :value="startYear" />
                </view>
            </picker>
            <view class="info-item active">
                <view class="info-title">专业</view>
                <input @input="getMajor" placeholder="请选择输入您的专业" type="text" :value="major" />
            </view>
        </view>
        <view @tap="parseEventDynamicCode(userEducationId ? 'upDateEducation' : 'addEducation')" class="save-btn ptp_exposure" data-ptpid="4d6d-1acc-a19e-daa8">保存</view>
    </view>
</template>

<script>

var app = getApp();
export default {
    data() {
        return {
            education: '',
            major: '',
            schoolName: '',
            schoolType: '',
            userEducationId: '',
            educationType: '',
            educationArray: ['其他', '高中/职高/技校', '专科', '本科', '硕士', '博士'],
            educations: ['OTHER', 'HIGH_SCHOOL', 'COLLEGE', 'UNDERGRADUATE', 'MASTER_DEGREE', 'DOCTOR'],
            nowData: '',
            schoolId: '',
            startYear: ''
        };
    },
    onLoad: function (a) {
        this.initData();
    },
    onShow: function () {},
    onUnload: function () {},
    methods: {
        initData: function () {},

        addEducation: function () {},

        upDateEducation: function () {},

        chooseEduction: function (a) {},

        chooseSchool: function () {
            uni.navigateTo({
                url: '/mine/schoolsearch/schoolsearch'
            });
        },

        getMajor: function (a) {
			this.major = a.detail.value;
        }
    }
};
</script>
<style lang="scss">
	@import './education.scss';
</style>
