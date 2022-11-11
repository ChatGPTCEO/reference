<template>
    <view>
        <block v-if="openType === 'getUserInfo'">
            <button @tap="getUserProfile" :class="qtsclass + ' ptp_exposure'" data-ptpid="7b59-17c0-90ab-cfc1" hoverClass="none" v-if="canIUseGetUserProfile">
                {{ buttonName }}
            </button>
            <button @getuserinfo="queryUserInfo" :class="qtsclass + ' ptp_exposure button'" :data-ptpid="ptpId || 'userInfo'" hoverClass="none" openType="getUserInfo" v-else>
                {{ buttonName }}
            </button>
        </block>
        <button @getphonenumber="getPhoneNumber" :class="qtsclass + ' ptp_exposure button'" :data-ptpid="ptpId || 'login'" hoverClass="none" openType="getPhoneNumber" v-else>
            {{ buttonName }}
        </button>
    </view>
</template>

<script>
var app = getApp();

export default {
    data() {
        return {
            canIUseGetUserProfile: false
        };
    },
    props: {
        openType: {
            type: String,
            default: ''
        },
        isRegister: {
            type: Number,
            default: 1
        },
        buttonName: {
            type: String,
            default: ''
        },
        businessId: {
            type: Number,
            default: 0
        },
        qtsclass: {
            type: String,
            default: ''
        },
        ptpId: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: '用于设置您的头像信息'
        }
    },
    created: function () {},
    mounted: function () {
		if (uni.getUserProfile) {
			this.canIUseGetUserProfile = true;
		}
	},
    methods: {
        getUserProfile: function () {},
        queryUserInfo: function (a) {},
        postUserInfo: function (t, a) {},
        upLoadImage: function (t) {},
        getPhoneNumber: function (e) {},
        noRegisterDate: function (t) {},
        sessionKeyOutofDate: function (a) {},
        inviteFriend: function () {}
    }
};
</script>
<style lang="scss" scoped>
	@import './openButton.scss';
</style>
