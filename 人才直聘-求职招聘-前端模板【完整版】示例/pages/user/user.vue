<template>
	<view>
		<view class="header">
			<view class="userinfo" @click="toLogin">
				<view class="face"><image :src="userInfo.avatar || '/static/img/default.png'"></image></view>
				<view class="info" v-if="hasLogin">
					<view class="username">{{ userInfo.name }}</view>
					<view v-if="userInfo.memberRole == 0" class="integral">{{ userInfo.phone }}</view>
					<view v-else-if="userInfo.company" class="integral">{{ userInfo.company }} . {{ userInfo.postName }}</view>
					<view v-else class="integral">未绑定公司</view>
				</view>
				<view class="info" v-else>
					<view class="username">未登录/注册</view>
					<view class="integral">点击可登录/注册</view>
				</view>
			</view>
			<view class="setting" @click="toSetting"><image src="../../static/HM-PersonalCenter/setting.png"></image></view>
		</view>

		<view class="w-list" v-if="userInfo.memberRole == 1">
			<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
				<uni-grid-item class="item" v-for="(item, index) in gridList2" @click.native="tapGrid2(item)" :key="index">
					<!-- <uni-icons class="icon" color="#12ae85" :type="item.icon" size="30"></uni-icons> -->
					<!-- <uni-icons class="icon" color="#12ae85" custom-prefix="yzb" :type="item.icon" size="30"></uni-icons> -->
					<text class="grid-icon yzb" :class="item.icon"></text>
					<text class="text">{{ item.text }}</text>
					<view v-if="item.badge" class="grid-dot"><uni-badge :text="item.badge" :type="item.type" /></view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="w-list" v-else>
			<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
				<uni-grid-item class="item" v-for="(item, index) in gridList" @click.native="tapGrid(item)" :key="index">
					<text class="grid-icon yzb" :class="item.icon"></text>
					<text class="text">{{ item.text }}</text>
					<view v-if="item.badge" class="grid-dot"><uni-badge :text="item.badge" :type="item.type" /></view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="list" v-if="!userInfo.memberRole || userInfo.memberRole == 0" v-for="(list, list_i) in severList" :key="list_i">
			<view class="li" v-for="(li, li_i) in list" @tap="toPage(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
				<view class="left">
					<view class="icons">
						<!-- <text class="yzb" :class="li.icon" :style="{ color: li.color }"></text> -->
						<image :src="li.icon"></image>
					</view>
					<view class="text">{{ li.name }}</view>
				</view>
				<text class="yzb yzb-next icon-next"></text>
			</view>
		</view>
		<view class="list" v-if="userInfo.memberRole && userInfo.memberRole == 1" v-for="(list, list_i) in severList2" :key="list_i">
			<view class="li" v-for="(li, li_i) in list" @tap="toPage2(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
				<view class="left">
					<view class="icons">
						<!-- <text class="yzb" :class="li.icon" :style="{ color: li.color }"></text> -->
						<image :src="li.icon"></image>
					</view>
					<view class="text">{{ li.name }}</view>
				</view>
				<view class="right">
					<text class="auth-result" :class="authState == '已认证' ? 'auth-success' : ''" v-if="li.name == '公司认证'">{{ authState }}</text>
					<text class="yzb yzb-next icon-next"></text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			authState: '待认证',
			gridList: [
				{
					text: '我的简历',
					icon: 'yzb-xialingyingicon-11',
					to: this.$mRoutesConfig.personReume
				},
				{
					text: '我的投递',
					icon: 'yzb-xinfeng',
					to: this.$mRoutesConfig.apply
				},
				{
					text: '已沟通过',
					icon: 'yzb-goutong1',
					to: this.$mRoutesConfig.connected
				},
				// {
				// 	text: '我的课程',
				// 	icon: 'yzb-zuoyeguanli',
				// 	to: this.$mRoutesConfig.course
				// },
				{
					text: '我的收藏',
					icon: 'yzb-shoucang1',
					to: this.$mRoutesConfig.collect
				}
			],
			gridList2: [
				{
					text: '公司主页',
					icon: 'yzb-gongsi',
					to: this.$mRoutesConfig.companyDetail,
					enter: true
				},
				{
					text: '收到简历',
					icon: 'yzb-xinfeng',
					to: this.$mRoutesConfig.apply,
					// badge: '3',
					type: 'error',
					enter: true
				},
				{
					text: '已沟通过',
					icon: 'yzb-goutong1',
					to: this.$mRoutesConfig.connected,
					// badge: '1',
					type: 'error',
					enter: true
				},
				{
					text: '我的收藏',
					icon: 'yzb-shoucang1',
					to: this.$mRoutesConfig.collect,
					enter: true
				}
			],
			severList: [
				[
					{ name: '附件简历', show: true, icon: '/static/img/my/upload.png', url: this.$mRoutesConfig.resumeFile },
					{ name: '我的钱包', show: true, icon: '/static/img/my/qianbao.png', url: this.$mRoutesConfig.wallet },
					{ name: '我的分享', icon: '/static/img/my/share.png', url: this.$mRoutesConfig.share },
					{ name: '外包任务', show: true, icon: '/static/img/my/list.png', url: this.$mRoutesConfig.task  },
					{ name: '我的课程', show: true, icon: '/static/img/my/love.png', url: this.$mRoutesConfig.collect },
					{ name: '浏览记录', show: true, icon: '/static/img/my/zixun.png', url: this.$mRoutesConfig.browse },
					{ name: '隐私设置', show: true, icon: '/static/img/my/faxian.png', url: this.$mRoutesConfig.hideSetting },
					{ name: '不感兴趣', show: true, icon: '/static/img/my/faxian.png', url: this.$mRoutesConfig.hideSetting },
					{ name: '我要招聘', show: true, icon: '/static/img/my/switch.png', url: 'zhaopin' }
				],
				[
					{ name: '客服中心', show: true, icon: '/static/img/my/contactus.png', url: this.$mRoutesConfig.robot },
					{ name: '关于我们', show: true, icon: '/static/img/my/aboutus.png', url: this.$mRoutesConfig.aboutUs },
					// { name: '帮助中心', show: true, icon: 'yzb-bangzhu1', url: null },
					// { name: '意见反馈', show: true, icon: 'yzb-yuangongfankui', url: null },
					{ name: '系统设置', show: true, icon: '/static/img/my/setting.png', url: this.$mRoutesConfig.system }
				]
			],
			severList2: [
				[
					{ name: '公司认证', show: true, auth: false, icon: '/static/img/my/auth.png', url: this.$mRoutesConfig.companyAuth },
					{ name: '公司管理', show: true, auth: false, icon: '/static/img/my/company.png', url: this.$mRoutesConfig.company },
					{ name: '职位管理', show: true, auth: true, icon: '/static/img/my/yijian.png', url: this.$mRoutesConfig.positions },
					{ name: '外包管理', show: true, auth:true, icon: '/static/img/my/list.png', url: this.$mRoutesConfig.tasks },
					{ name: '我要求职', show: false, auth: false, icon: '/static/img/my/switch.png', url: 'qiuzhi' }
				],
				[
					{ name: '客服中心', show: true, icon: '/static/img/my/contactus.png', url: this.$mRoutesConfig.robot },
					{ name: '关于我们', show: true, icon: '/static/img/my/aboutus.png', url: this.$mRoutesConfig.aboutUs },
					// { name: '联系我们', show: true, icon: '/static/img/my/contactus.png', url: this.$mRoutesConfig.contactUs },
					// { name: '帮助中心', show: true, icon: 'yzb-bangzhu1',url: null },
					// { name: '意见反馈', show: true, icon: 'yzb-yuangongfankui', url: null },
					{ name: '系统设置', show: true, icon: '/static/img/my/setting.png', url: this.$mRoutesConfig.system }
				]
			]
		};
	},
	onShow() {
		if (this.hasLogin) {
			this.getUserInfo();
		}
	},
	methods: {
		// 获取用户信息
		async getUserInfo() {
			let userInfo = await this.$apis.getUserInfo();
			if (userInfo == true) {
				uni.clearStorageSync();
				this.$store.commit('SET_LOGOUT');
				if (this.goEasy.getConnectionStatus() === 'connected') {
					console.log('do  disconnect');
					getApp().globalData.imService.disconnect();
				}
				return;
			}
			this.$store.commit('SET_USERINFO', userInfo);
			if (userInfo.memberRole == 1) {
				if (userInfo.companyId == 0) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.enter
					});
				} else {
					if (userInfo.companyAuth == 0) {
						this.authState = '待认证';
					} else if (userInfo.companyAuth == 1) {
						this.authState = '认证审核中';
					} else if (userInfo.companyAuth == 2) {
						this.authState = '认证失败';
					} else if (userInfo.companyAuth == 3) {
						this.authState = '已认证';
					}
				}
			} else if (userInfo.ifAddResume == false) {
				//暂无简历信息，强制添加
				this.$mRouter.push({
					route: this.$mRoutesConfig.userInfo
				});
			}
			this.updateTabbar();
		},
		
		updateTabbar(){
			if(this.userInfo.memberRole!=1){
				uni.setTabBarItem({
				  index: 1,
				  text: '职位',
				});
			}else{
				uni.setTabBarItem({
				  index: 1,
				  text: '简历',
				});
			}
		},

		//用户点击订单类型
		tapGrid(item) {
			console.log('tapGrid==', item);
			this.$mRouter.push({
				route: item.to,
				query: {
					id: 1
				}
			});
		},

		tapGrid2(item) {
			if (!this.userInfo.company) {
				uni.showToast({
					icon: 'none',
					title: '请先绑定公司'
				});
				return;
			}
			this.$mRouter.push({
				route: item.to,
				query: {
					id: 0
				}
			});
		},

		toLogin() {
			if (this.hasLogin) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.userInfo,
					query: {
						id: 1
					}
				});
			} else {
				
				this.$mRouter.push({
					//#ifdef MP-WEIXIN
					route: this.$mRoutesConfig.login,
					//#endif
					//#ifdef H5
					route: this.$mRoutesConfig.loginPwd,
					//#endif
					query: {
						id: 1
					}
				});
			}
		},

		async switchRole(role) {
			let res = await this.$apis.switchRole({ role: role });
			this.getUserInfo();
			console.log('res======', res);
			if (res.result) {
				// 存在，直接切换
				console.log('存在，直接切换');
				uni.showToast({
					icon: 'none',
					title: '切换成功'
				});
			} else {
				//不存在，跳转编辑
				console.log('不存在，跳转编辑');
				if (role == 0) {
					//跳转到简历编辑页面。
					this.$mRouter.push({
						route: this.$mRoutesConfig.personReume,
						query: {
							id: 1
						}
					});
				} else {
					// this.$mRouter.push({
					// 	route: this.$mRoutesConfig.enter
					// });
				}
			}
		},

		//用户点击列表项
		toPage(list_i, li_i) {
			let that = this;
			if (this.severList[list_i][li_i].url == 'zhaopin') {
				if(this.hasLogin){
					uni.showModal({
						title: '',
						content: '确定切换到招聘？',
						success: res => {
							if (res.confirm) {
								that.switchRole(1);
							}
						}
					});
				}else{
					this.$mRouter.push({
						route: this.$mRoutesConfig.login
					});
				}
				return;
			}
			this.$mRouter.push({
				route: this.severList[list_i][li_i].url,
				query: {
					name: this.severList[list_i][li_i].name
				}
			});
		},

		//用户点击列表项
		toPage2(list_i, li_i) {
			let that = this;
			if (this.severList2[list_i][li_i].url == 'qiuzhi') {
				uni.showModal({
					title: '',
					content: '确定切换到求职？',
					success: res => {
						if (res.confirm) {
							that.switchRole(0);
						}
					}
				});
				return;
			}
			if (list_i == 0 && !this.userInfo.company) {
				uni.showToast({
					icon: 'none',
					title: '请先绑定公司'
				});
				return;
			}
			if (this.severList2[list_i][li_i].auth && this.userInfo.companyAuth != 3) {
				uni.showToast({
					icon: 'none',
					title: '公司未认证'
				});
				return;
			}

			this.$mRouter.push({
				route: this.severList2[list_i][li_i].url,
				query: {
					id: 1
				}
			});
		},

		toSetting() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.system,
				query: {
					id: 1
				}
			});
		},

		toResume() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.personReume,
				query: {
					id: 1
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.header {
	&.status {
		padding-top: var(--status-bar-height);
	}
	background-color: #12ae85;
	width: 92%;
	height: 30vw;
	padding: 0 4%;
	display: flex;
	align-items: center;
	.userinfo {
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		.face {
			image {
				width: 150upx;
				height: 150upx;
				border-radius: 75upx;
			}
		}
		.info {
			display: flex;
			flex-direction: column;
			padding-left: 30upx;
			margin-top: -15upx;
			.username {
				width: 100%;
				color: #fff;
				font-size: 40upx;
				margin-left: 10upx;
			}
			.integral {
				display: flex;
				align-items: center;
				padding: 0 20upx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.1);
				border-radius: 20upx;
				font-size: 24upx;
			}
		}
	}
	.setting {
		flex-shrink: 0;
		width: 6vw;
		height: 6vw;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.hover {
	background-color: #eee;
}

.w-list {
	background-color: $main-color;
	width: 100%;
	height: 20vw;
	padding: 0 4%;
	// margin-bottom: calc(11vw + 40upx);
	margin-bottom: 20upx;
	display: flex;
	align-items: center;
	border-radius: 0 0 100% 100%;
	margin-top: -1upx;
	box-sizing: border-box;

	.grid {
		background-color: #ffffff;
		margin-bottom: 6upx;
		width: 100%;
		margin-top: -10upx;
		border-radius: 24upx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
		.icon {
			// height: 95upx;
		}
		.grid-dot {
			position: absolute;
			top: 5upx;
			right: 15upx;
		}
		.grid-icon {
			color: $main-color;
			font-size: 60upx;
			line-height: 100upx;
		}
	}

	.uni-grid .text {
		font-size: 30rpx;
		height: 25upx;
		line-height: 25upx;
		color: #817f82;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}
}
.list {
	width: 100%;
	border-bottom: solid 26upx #f8f8f8;
	.li {
		width: 92%;
		height: 100upx;
		padding: 0 4%;
		border-bottom: solid 1upx #ebeef5;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		&.noborder {
			border-bottom: 0;
		}
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.icons {
			display: flex;
			align-items: center;
			margin-right: 20upx;
			align-items: center;
			text {
				font-size: 40upx;
			}
			image {
				width: 40upx;
				height: 40upx;
			}
		}
		.text {
			width: 100%;
			color: #666;
		}
		.to {
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
		}
		.auth-result {
			min-width: 200upx;
			text-align: right;
			margin-right: 10upx;
			color: $main-color;
			// font-weight: bold;
		}
		.auth-success {
			color: $uni-color-success;
		}
		.icon-next {
			font-size: $font-size-34;
			color: $font-color-999;
		}
	}
}
</style>
