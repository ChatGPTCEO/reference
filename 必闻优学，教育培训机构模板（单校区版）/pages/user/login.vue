<template>
	<view class="page">
		<view class="header">
			<!-- #ifdef MP -->
			<view class="avatar"><open-data type="userAvatarUrl" default-avatar="vuex_user.avatar"></open-data></view>
			<view class="nickname"><open-data type="userNickName" lang="zh_CN"></open-data></view>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<view class="avatar"><u-avatar :src="vuex_user.avatar" size="100"></u-avatar></view>
			<!-- #endif -->
		</view>

		<u-line></u-line>

		<view class="body">
			<view class="title">{{ tipsTitle }}</view>
			<view class="tips">· {{ tipsContent }}</view>

			<u-button type="success" :custom-style="buttonStyle" @click="getUserProfile()" v-if="canIUseGetUserProfile && !getPhonenumberButtonShow">微信授权登录</u-button>
			<u-button type="success" :custom-style="buttonStyle" open-type="getUserInfo" @getuserinfo="getUserInfo()" v-if="!canIUseGetUserProfile && !getPhonenumberButtonShow">
				微信一键登录
			</u-button>
			<u-button v-if="getPhonenumberButtonShow" type="error" :custom-style="buttonStyle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber()">
				一键绑定手机号
			</u-button>
			<u-gap></u-gap>
			<u-button :custom-style="buttonStyle" @click="reLunchUser">取消</u-button>
		</view>

		<view class="footer">
			登录即代表同意
			<text class="agreement" @click="$u.route('/pages/article/read', { id: 1 })">《用户协议》</text>
		</view>

		<!-- modal -->
		<u-modal v-model="modalShow" :content="modalContent" :show-cancel-button="true" @cancel="modalCancel()" @confirm="modalConfirm()"></u-modal>

		<!-- uToust占位 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			buttonStyle: { width: '670rpx' },
			code: null,
			canIUseGetUserProfile: false,
			getPhonenumberButtonShow: false,
			tipsTitle: '登录后该小程序将获得以下权限',
			tipsContent: '获得你的公开信息（昵称、头像等）',
			modalType: 1,
			modalShow: false,
			modalContent: ''
		};
	},
	onLoad() {
		// 判断是否可以使用新的接口
		if (wx.getUserProfile !== undefined) {
			this.canIUseGetUserProfile = true;
		}

		// 本页面禁止分享
		wx.hideShareMenu();

		// console.log(this.vuex_user);
	},
	methods: {
		// 重载并进入用户页面
		reLunchUser() {
			uni.$u.route({
				type: 'reLaunch',
				url: 'pages/user/user'
			});
		},
		navigateBack() {
			uni.navigateBack();
		},
		// 新获取用户信息
		getUserProfile: function(res) {
			
		},

		//尝试兼容低运行库
		//获取用户信息
		getUserInfo: function(res) {
			
		},

		// 获取手机号
		getPhoneNumber: function(e) {
			
		},

		// 获取并设置手机号
		setUserPhoneNumber(encryptedData, iv, code) {
			
		},

		// 清空用户资料并返回首页
		clearUserInfo() {
			
		}
	}
};
</script>

<style lang="scss">
.page {
	background-color: #ffffff;
}

.header {
	padding-top: 25%;
	margin-bottom: 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		overflow: hidden;
		border: 1px solid $u-border-color;
		margin-bottom: 20rpx;
	}

	.nickname {
		font-size: $u-h2;
	}
}

.body {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 20rpx;
	margin: 40rpx 0;

	.title {
		font-size: $u-p;
		margin-bottom: 20rpx;
	}

	.tips {
		font-size: $u-p2;
		color: $u-tips-color;
		margin-bottom: 60rpx;
	}
}

.footer {
	position: relative;
	width: 690rpx;
	text-align: center;
	bottom: 10rpx;
	font-size: $u-p3;
	color: $u-content-color;
	.agreement {
		color: $u-primary-color;
	}
}
</style>
