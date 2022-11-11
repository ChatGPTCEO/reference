<template>
	<view class="chatlist">
		<!-- 头部 -->
		<view class="head">
			<view class="flex justify-between padding-left-sm padding-right-sm padding-bottom-sm align-end"
				style="background-image: linear-gradient(120deg, #66a6ff 0%, #1D8BF8 100%);padding-top:88rpx;">
				<view class="flex justify-start">
					<view class="round" style="line-height:0rpx;" @tap="avatarurl()">
						<image src="../../static/avatarurl.png" style="width:77rpx;height:77rpx;"></image>
					</view>
					<view class="flex justify-between flex-direction margin-left-sm">
						<view class="text-lg text-white">{{username}}</view>
						<view class="text-white text-xs"><text
								class="cuIcon-roundcheckfill text-green margin-right-xs"></text>On-Line<text
								class="cuIcon-right text-white"></text></view>
					</view>
				</view>
				<view class="text-white text-xs bg-red round padding-left-sm padding-right-sm"
					style="height:45rpx;line-height:45rpx;" @tap="loginout()">LoginOut</view>
			</view>
		</view>
		<!-- placeholder -->
		<view class="holder"></view>
		<!-- list -->
		<view v-for="(item,index) in list" :key="index" @tap="enter_list(item.username)">
			<view class="flex justify-between padding-sm list-con">
				<view class="flex justify-start">
					<view class='cu-avatar xl radius' style="background-image:url(../../static/avatarurl.png)">
					</view>
					<view class="flex flex-direction justify-center margin-left-sm">
						<view class="text-xl text-black margin-bottom-xs">{{item.username}}</view>
						<view class="text-df text-gray">[未读消息]</view>
					</view>
				</view>
				<view class="margin-top-xs text-gray text-sm">{{item.time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _;
	import IM from "../../components/IM.js/im.js";
	export default {
		data() {
			return {
				/*MySelf Name*/
				username: "",
				/*list*/
				list: [
					{username:"Seven_Chat",time:"2021-02-1"}
				]
			}
		},
		methods: {
			enter_list(e){
				uni.navigateTo({
					url:"../chatcon/chatcon?title="+e
				})
			},
			/*update avatarurl*/
			avatarurl() {
				uni.showToast({
					title: "暂不支持上传头像",
					icon: "none"
				})
			},

			/*loginout*/
			loginout() {
				uni.showModal({
					title: "Log out",
					content: "退出当前账号将不能进行对话、查看信息等操作。",
					confirmText: "OK",
					cancelText: "cancel",
					success(res) {
						if (res.confirm) {
							/*断开链接*/
							uni.closeSocket({
								success(res) {
									uni.showToast({
										title:"webscoket已关闭成功！",
										icon:"none"
									})
								},
								fail(err) {
									console.log("关闭失败", err)
								}
							})
							uni.redirectTo({
								url: "../index/index"
							})
							uni.clearStorageSync();
							return;
						}
						uni.showToast({
							title: "cancel",
							icon: "none"
						})
					}
				})
			},
		},

		onReady() {
			this.username = uni.getStorageSync("username");
		},
		onLoad() {
			_ = this;
		}
	}
</script>

<style lang="scss">
	.chatlist {
		.list-con {
			border-bottom: 1px solid #F5F5F5;
		}

		.head {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 7;
		}

		.holder {
			height: 180rpx;
		}
	}
</style>
