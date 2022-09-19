<template>
	<view style="width: 100%;">
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<u-toast ref="uToast" />
			<view class="userinfo">
				<view class="face" @click="modify">
					<image :src="userinfo.ava"></image>
				</view>
				<view class="info">
					<view class="username">{{userinfo.username}}
						<u-icon v-if="userinfo.gender == '男'" size="40" name="../../../static/boy.png"></u-icon>
						<u-icon v-if="userinfo.gender == '女'" size="40" name="../../../static/girl.png"></u-icon>
					</view>
					<view class="integral">积分:{{userinfo.integral}}</view>
				</view>
			</view>
			<view class="setting">
				<u-button v-if="userinfo.status == 0" type="success" shape="circle" size="mini" @click="qiandao">签到</u-button>
				<u-button v-if="userinfo.status == 1" type="primary" disabled="true" shape="circle" size="mini">已签到</u-button>
			</view>

			<view class="fans">
				<view class="fan" @click="fans(0)">
					粉丝：{{userinfo.fans}}
				</view>
				<view class="fan" @click="fans(1)">
					关注：{{userinfo.follow}}
				</view>
			</view>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" hover-class="hover" @click="quanzi(openid)">
					<view class="icon">
						<image src="../../static/xiaoyuan1.png"></image>
					</view>
					我的圈子
				</view>
				<view class="label" hover-class="hover" @click="yuepai(openid)">
					<view class="icon">
						<image src="../../static/xiangji.png"></image>
					</view>
					我的约拍
				</view>

				<view class="label" hover-class="hover" @click="zuopin(openid)">
					<view class="icon">
						<image src="../../static/xiangce.png"></image>
					</view>
					我的作品
				</view>

				<view class="label" hover-class="hover" @click="info(openid)">
					<view class="icon">
						<image src="../../static/my2.png"></image>
					</view>
					个人主页
				</view>
			</view>
		</view>


		<view class="list">
			<view class="li" hover-class="hover" @click="modify">
				<view class="icon">
					<image src="../../static/ziliao.png"></image>
				</view>
				<view class="text">个人资料</view>
				
			</view>

			<view class="li" hover-class="hover" @click="good">
				<view class="icon">
					<image src="../../static/dianzan.png"></image>
				</view>
				<view class="text">我的收藏</view>
				
			</view>
			<view class="li" hover-class="hover" @click="about">
				<view class="icon">
					<image src="../../static/guanyu.png"></image>
				</view>
				<view class="text">关于我们</view>
			</view>
			
			<view class="li" hover-class="hover" @click="logout">
				<view class="icon">
					<image src="../../static/logout.png"></image>
				</view>
				<view class="text">退出登录</view>
				
			</view>
			
			<!-- <view class="li" hover-class="hover" @click="gz">
				<view class="icon">
					<image src="../../static/guanzhu.png"></image>
				</view>
				<view class="text">关注公众号</view>
				
			</view> -->
		
			<!-- <view class="li" hover-class="hover" @click="help">
				<view class="icon">
					<image src="../../static/help.png"></image>
				</view>
				<view class="text">帮助中心</view>
				
			</view> -->
		</view>
	</view>
</template>
<script>
	import * as api from '@/api/api.js'
	export default {
		data() {
			return {
				openid: '',
				inverted: true,
				ava: null,
				username: null,
				gender: null,
				userinfo: {
					username: '',
					ava: '',
					gender: '',
					integral: '',
					fans: '',
					follow: '',
					status: ''
				}
			};
		},
		onLoad() {
			//加载
			this.init();
			//this.login();
		},
		onShow() {
			this.init(); 
		},
		methods: {
			about(){
				uni.navigateTo({
					url: 'about'
				})
			},
			//签到
			qiandao() {
				if (this.userinfo.status == 0) {
					api.request({
						url: '/userInfo/qianDaoById',
						method: 'GET',
						data: {
							userId: this.openid
						},
					}).then( res =>{
						if (res.data.data == 1) {
							this.$refs.uToast.show({
								title: '签到成功,积分+1',
								type: 'success'
							})
							this.init();
						} else if (res.data.data == 0) {
							this.$refs.uToast.show({
								title: '签到失败',
								type: 'error'
							})
						}
					})
				} else {
					this.$refs.uToast.show({
						title: '您今天已完成签到！',
						type: 'warning'
					})
				}
			},
			fans(res) {
				uni.navigateTo({
					url: 'fans?current=' + res
				})
			},
		
			modify() {
				uni.navigateTo({
					url: 'modify/modify'
				})
			},
			good() {
				uni.navigateTo({
					url: '../good/mine'
				})
			},
			//信息初始化
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.openid = res.data.userId;
						api.request({
						url:'/userInfo/findUserInfoById',
						method: 'GET',
						data: {
							userId: this.openid,
						},
						}).then(res=>{
							this.userinfo.username = res.data.data.nickName
							this.userinfo.ava = res.data.data.avatarUrl;
							this.userinfo.gender = res.data.data.gender;
							this.userinfo.integral = res.data.data.integral;
							this.userinfo.fans = res.data.data.fans;
							this.userinfo.follow = res.data.data.follow;
							this.userinfo.status = res.data.data.status;
							// console.log(res.data[0].nickName)
						})
					},
					fail: (res) => {
					/* 	uni.navigateTo({
							url: 'login'
						}) */
					}
				})
			},
			quanzi(res) {
				uni.navigateTo({
					url: '../quanzi/mine?id=' + res
				})
			},
			yuepai(res) {
				uni.navigateTo({
					url: '../yuepai/mine?id=' + res
				})
			},
			zuopin(res) {
				uni.navigateTo({
					url: '../zuopin/mine?id=' + res
				})
			},
			info(res) {
				uni.navigateTo({
					url: 'userinfo/userinfo?uid=' + res
				})
			},
			modify() {
				uni.navigateTo({
					url: 'modify/modify'
				})
			},
			
			logout(){
				uni.removeStorage({
					key:'token',
					
				})
				uni.removeStorage({
					key:'userInfo',
					success: (res) => {
						uni.reLaunch({
							url:'../login/login'
						})
					},
					fail: (res) => {
						uni.reLaunch({
							url:'../login/login'
						})
					}
				})
			},
			login() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						//console.log(res.data);
						that.userinfo.username = res.data.username;
						that.userinfo.ava = res.data.avatarUrl;
						that.userinfo.gender = res.data.gender;
					},
					fail: function() {
						uni.navigateTo({
							url: 'login'
						})
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		position: relative;
		background: #554d84;
		//background-image: linear-gradient(to top right, #f7797d, #fbd786);
		width:100%;
		height:35vw;
		//padding:0 4%;
		display:flex;
		align-items:center;

		.userinfo {
			position: absolute;
			top: 45rpx;
			left: 25rpx;
			//width: 100%;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 15vw;
				height: 15vw;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;

				.username {
					width: 100%;
					color: #fff;
					font-size: 40upx
				}

				.integral {
					display: flex;
					align-items: center;
					padding: 0 20upx;
					height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx
				}
			}
		}

		.setting {
			flex-shrink: 0;
			width: 17vw;
			height: 10vw;
			position: absolute;
			right: 70rpx;
			top: 65rpx;


			image {
				width: 100%;
				height: 100%
			}
		}

		.fans {
			position: absolute;
			display: flex;
			width: 100%;
			bottom: 30rpx;

			.fan {
				flex: auto;
				height: 100%;
				text-align: center;
				color: white;
				font-size: 30rpx;
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: #554d84;
		width: 100%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			width: 100%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 26upx;

				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}

					image {
						width: 7vw;
						height: 7vw;
						z-index: 9;
					}
				}
			}
		}
	}



	.list {
		width: 100%;
		border-bottom: solid 26upx #f1f1f1;

		.li {
			width: 100%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
</style>
