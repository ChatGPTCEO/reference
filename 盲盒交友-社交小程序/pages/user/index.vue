<template>
	<view class="user">
		<!-- 头部 -->
		<view v-if="userInfo">
			<view :class="sex==0 ? 'img-b' : 'img-a'">
				<view class="users" >
					<view class="name">{{userInfo.name}} </view>
					<view class="name_id">ID：2022010{{userInfo.id}}</view>
					<view class="name_id">TIME：{{userInfo.ctime}}</view>
				</view>
			</view>
			<view class="order-status" >
				<view class="status-wrap">
					<view class="status-list">
						<view class="status-item" hover-class="btn-hover" v-for="(item, index) in orderStatusList"
							:key="index" @click="Jom(item.path)">
							<view class="item-icon">
								<u-icon :name="item.icon" size="28"></u-icon>
							</view>
							<view class="item-text">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="com-item">
				<view class="com-wrap">
					<view class="cell" v-for="(item, index) in serverList" :key="index" @click="Jom(item.url)">
						<view class="cell-left">
							<u-icon :name="item.ioc" size="28"></u-icon>
							<view class="cell-text">{{ item.title }}</view>
						</view>
						<view class="iconfont iconmore1"></view>
					</view>
				</view>
			</view>
			<view class="com-item">
				<view class="com-wrap">
					<view class="cell" v-for="(item, index) in serverList1" :key="index" @click="not(item)">
						<view class="cell-left">
							<u-icon :name="item.icon" size="28"></u-icon>
							<view class="cell-text">{{ item.title }}</view>
						</view>
						<view class="iconfont iconmore1"></view>
					</view>
				</view>
			</view>
			
			<view class="mod cdbh">
				<ad adpid="1552789692"></ad>
			</view>
		</view>
		<view v-if="!userInfo" class="goeng">
			<!-- <u-icon name="../../static/images/bind_wx.png" color="#2979ff" size="28"></u-icon> -->
			<image src="../../static/images/bind_wx.png" mode="widthFix" ></image>
			<view class="tips">为了您的账号安全，请绑定微信，绑定后可快捷登录</view>
			<button open-type="getUserProfile" lang="zh_CN" @tap="wxGetUserInfo" >微信一键登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null,
				sex: 0,
				xcxcode:null,
				orderStatusList: [{
						name: '我的花瓣',
						icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/qianbao.png',
						path: '/pages/user/qianbao?current=0'
					},
					{
						name: '使用记录',
						icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/zhichu.png',
						path: '/pages/user/qianbao?current=1'
					},
					{
						name: '收入记录',
						icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/shouru.png',
						path: '/pages/user/qianbao?current=0'
					}
				],
				currentIndex: 0,

				serverList: [],
				serverList1: [
					// {
					// 	title: '洽谈合作',
					// 	icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/hz.png',
					// 	path: '/pages/user/contact',
					// 	status: 0
					// },
					{
						title: '定制小程序',
						icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/dingzhi.png',
						status: 4
					},
					{
						title: '退出',
						icon: 'https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/tui.png',
						status: 5
					}
				]

			};
		},
		onLoad() {
			this.getmun()
		},
		onShow() {
			const sex = uni.getStorageSync('sex');
			if (sex) {
				this.sex = sex;
			}
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.userInfo=userInfo;
				this.getUserData();
			}else{
				this.Jom('/pages/user/information');
			}
			this.login()
		},
		methods: {
			Jom(path) {

				uni.$u.route({
					url: path
				})
			},
			not(itme) {
				let status = itme.status;
				if (status == 0) {
					this.Jom(itme.path)
				} else if (status == 4) {
					uni.navigateToMiniProgram({
						 appId: 'wxfc8b347b21d5f8ce', // 跳转目标小程序的id
						  path: 'pages/index/index', // 目标小程序的页面路径
						  success(res) {
							// 打开成功
						  }
						})
					
				}else if(status == 5){
					this.userInfo = null;
					uni.clearStorageSync();
					uni.setStorageSync('sex', 0);
					this.sex=0;
				}

			},
			
			//登录
			login() {
				let _self = this;
				// 1. wx 获取登录用户 code
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						_self.xcxcode = loginRes.code;
					},
					fail: () => {
						return false;
					}
				});
				return false;
			},
			//获取用户信息
			wxGetUserInfo() {
				let _self = this;
				uni.getUserProfile({
					provider: 'weixin',
					desc: '获取用户完整信息',
					success: (infoRes) => {
						console.log(infoRes.userInfo)
						uni.showLoading({title: '登录中',mask:true});
						// 2.提交数据到后台
						uni.$u.http.post('User/getOpenid', {
								"nickName":infoRes.userInfo.nickName,
								"code": _self.xcxcode,
								"logo": infoRes.userInfo.avatarUrl,
								"sex":infoRes.userInfo.sex
							})
							.then(res => {
								console.log(res)
								_self.userInfo=res.data
								
								uni.setStorageSync('userInfo', res.data);
								uni.hideLoading();
								if(res.data.sex=="1"){
									uni.setStorageSync('sex', 1);
									_self.sex=1;
								}else{
									uni.setStorageSync('sex', 0);
									_self.sex=0;
								}
									
									
							})
					},
					fail(res) {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none'
						});
					}
				});
			
				return false
			},
			getUserData() {
				let _self = this;
				uni.$u.http.post('User/byData', {
						"id":_self.userInfo.id
					})
					.then(res => {
						// console.log(res)
						_self.userInfo=res.data
						uni.setStorageSync('userInfo', res.data);
						uni.hideLoading();
						if(res.data.sex=="1"){
							uni.setStorageSync('sex', 1);
							_self.sex=1;
						}else{
							uni.setStorageSync('sex', 0);
							_self.sex=0;
						}
							
							
					})
			},
			getmun() {
				let _self = this;
				uni.$u.http.post('Menu/list', {})
					.then(res => {
						console.log(res)
						_self.serverList=res.data
							
							
					})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}

	.img-a {
		width: 100%;
		height: 550rpx;
		background-image: url("https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/nv.jpg");
		background-size: 100%;
	}

	.img-b {
		width: 100%;
		height: 550rpx;
		background-image: url("https://shopimges.oss-cn-hangzhou.aliyuncs.com/mimi/nan.jpg");
		background-size: 100%;
	}

	

	.btn-hover {
		background: #f2f2f2 !important;
	}

	.user {
		.user-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 15vh;
			padding: 30rpx;
			z-index: 9;
			// border-radius: 0 0 20% 20%;
			border-radius: 0 0 10rpx 10rpx;
			background-color: #3d9bf6;
			// background: url('https://handsel.oss-cn-shenzhen.aliyuncs.com/1588938371592.jpg') no-repeat;
			background-size: cover;

			.setting {
				color: #fff;
				position: absolute;
				top: 60rpx;
				left: 60rpx;
				font-size: 50rpx;
			}

			.info {
				position: absolute;
				text-align: center;

				.avatar {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}

				.nickname {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}

		.order-status {
			padding: 0 20rpx;
			margin-top: -10vw;

			.status-wrap {
				border-radius: 25rpx;
				overflow: hidden;

				.status-list {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					background: #fff;
					padding-top: 30rpx;
					padding-bottom: 30rpx;

					.status-item {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.item-icon {
							line-height: 1;
							font-size: 65rpx;
							color: #bbb;
						}

						.item-text {
							font-size: 28rpx;
							color: #FF7377;
							margin-top: 5rpx;
						}
					}
				}
			}
		}

		.com-item {
			padding-left: 20rpx;
			padding-right: 20rpx;
			margin-top: 20rpx;


			.com-wrap {
				border-radius: 25rpx;
				overflow: hidden;
			}
		}

		.cell {
			height: 80rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #f8f8f8;

			&:active {
				background: #f2f2f2;
			}

			&:last-child {
				border-bottom: none !important;
			}

			.cell-left {
				display: flex;
				align-items: center;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #666;
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}

			.iconfont {
				font-size: 40rpx;
				color: #999;
			}
		}
	}

	.goeng{
		background-color: #fff;
		padding: 20rpx;
		margin: 30vh 15vw;
		border-radius: 10rpx;
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
		text-align: center;
		image{
			width: 180rpx;
			
		}
		.tips{
			padding:10rpx 20rpx;
			text-align:center;
			font-size:30rpx;
			color:#333;
		}
		button {
			background-color: #007affc7;
			color: #fff;
			margin: 30rpx;
			font-size:30rpx;
		}
	}
	.users{
		padding:14vh 0 0 50vw ;
		color: #fff;
		font-weight: 600;
		letter-spacing:2rpx;
	}
	.name{
		font-size: 40rpx;
		line-height: 70rpx;
		
	}
	.name_id{
		font-size: 30rpx;
		line-height: 60rpx;
	}
	.mod{
		margin-top: 20rpx;
		border-radius:10rpx;
		border:1rpx solid  #e8e6e6;
		padding: 20rpx;
	}
</style>
