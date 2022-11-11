<template>
    <view class="container">
        <view class="user-headimg">
            <image
                lazyLoad
                @tap="chooseImage"
                class="ptp_exposure"
                data-ptpid="ae77-1552-9840-d212"
                mode="aspectFill"
                :src="resumeVo.headImg || 'https://qiniu-image.qtshe.com/default-avatar20190717.png'"
            ></image>
            <text @tap="chooseImage" class="ptp_exposure" data-ptpid="7aa2-1655-8435-042b">修改头像</text>
        </view>
        <view class="resume-tips">
            <text>基本信息（必填）</text>
            <text>输入真实姓名能提高录取率哦</text>
        </view>
        <view class="user-info">
            <view class="info-item active">
                姓名
                <input @input="getUserName" maxlength="10" placeholder="请输入姓名" type="text" :value="name" />
            </view>
            <picker @change="chooseUserInfo" :data-id="1" :range="sexArray">
                <view class="info-item">
                    性别
                    <input disabled placeholder="请选择性别" type="text" :value="sexMent" />
                </view>
            </picker>
            <picker @change="chooseUserInfo" :data-id="2" :end="nowData" mode="date">
                <view class="info-item">
                    生日
                    <input disabled placeholder="请选择生日" type="text" :value="birthday" />
                </view>
            </picker>
            <picker @change="chooseUserInfo" :data-id="3" :range="professionArray">
                <view class="info-item">
                    职业
                    <input disabled placeholder="请选择职业" type="text" :value="professionMent" />
                </view>
            </picker>
            <view class="info-item active">
                电话
                <input @input="getMobile" maxlength="11" placeholder="请输入电话" type="number" :value="mobile" v-if="!mobile" />
                <view v-else>{{ mobile }}</view>
            </view>
        </view>
        <view class="resume-tips">选填信息</view>
        <view class="user-info">
            <view class="info-item active">
                微信
                <input @input="getWechat" maxlength="20" placeholder="请输入微信号" type="text" :value="wechatContact" />
            </view>
            <view class="info-item active">
                QQ
                <input @input="getQQment" maxlength="11" placeholder="请输入QQ号" style="margin-left: 88rpx" type="number" :value="qqContact" />
            </view>
        </view>
        <view class="resume-tips">教育经历（必填）</view>
        <view @tap="skipToEduction" class="info-item ptp_exposure" data-ptpid="7949-1ddf-9f65-90d9" v-if="!userEducation">完善教育经历</view>
        <view @tap="skipToEduction" class="education-info ptp_exposure" data-ptpid="ef7d-1c81-abb9-41cf" v-else>
            <view class="education-detail">
                <view class="education-name">{{ userEducation.schoolName }}</view>
                <view class="education-year">
                    <text v-if="userEducation.startYear">{{ userEducation.startYear }}年入学</text>
                </view>
            </view>
        </view>
        <view @tap="upDataUserInfo" class="save-btn ptp_exposure" data-ptpid="b253-1eef-a857-2f53">下一步</view>
    </view>
</template>

<script>

var app = getApp();
export default {
    data() {
        return {
            hasToken: true,
            sexArray: ['男', '女'],
            professionArray: ['学生党', '上班族'],

            resumeVo: {
                headImg: ''
            },

            nowData: '',
            name: '',
            mobile: '',
            birthday: '',
            qqContact: '',
            profession: '',
            wechatContact: '',
            openResume: '',
            sex: '',
            sexMent: '',
            professionMent: '',

            userEducation: {
                schoolName: '',
                startYear: ''
            }
        };
    },
    onLoad: function () {
        let that = this;
        let e = new Date();
		this.nowData = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
    },
    onShow: function () {
        this.initData();
        this.getSimple();
		
		this.userEducation = '';
    },
    methods: {
        getSimple: function () {
            uni.setNavigationBarTitle({
                title: '简历完善度' + 10 + '%'
            });
        },

        initData: function () {
            
        },
		// 下一步
        upDataUserInfo: function () {
			uni.navigateTo({
			    url: '/mine/person/person'
			});
		},

        chooseImage: function (a) {},

        getImage: function (e, s) {},

        chooseUserInfo: function (a) {},
		// 跳转到选择学校
        skipToEduction: function (a) {
			uni.navigateTo({
			    url: '/mine/education/education'
			});
		},

        getUserName: function (a) {},

        getMobile: function (a) {},

        getWechat: function (a) {},

        getQQment: function (a) {}
    }
};
</script>
<style lang="scss" scoped>
	@import './resume.scss';
</style>
