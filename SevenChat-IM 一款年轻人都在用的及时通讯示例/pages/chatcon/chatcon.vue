<template>
	<view class="content">
		<view class="padding-top-xl bg-blue"></view>
		<view class="cu-bar bg-blue text-white">
			<view class="action" @tap="back()">
				<text class="cuIcon-back text-white"></text> 返回
			</view>
			<view class="content text-bold">
				与{{title}}聊天中...
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}" :scroll-top="scrollTop">
			<view v-for="(item,index) in list" :key="index">
				{{item}}
			</view>
		</scroll-view>
		<!-- 发送 -->
		<view class="send">
			<view class="send_box">
				<view class="input"><input type="text" placeholder="请输入要发送的内容" v-model="values" cursor-spacing="10" />
				</view>
				<view class="btn" @tap="send()">发送</view>
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
				/*聊天信息*/
				list: [],
				/*发送内容*/
				values: '',
				/*scrollHeight*/
				scrollHeight: "",
				/*标题*/
				title: "",
				/*滚动距离*/
				scrollTop: 0
			}
		},
		onLoad(e) {
			_ = this;
			/*修改标题*/
			this.title = e.title;
			//执行websocket
			_.connectSocketInit();	
		},
		created() {
			const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
			this.scrollHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (300);
		},
		// 关闭websocket【必须在实例销毁之前关闭,否则会是underfined错误】
		beforeDestroy() {
			this.closeSocket();
		},
		methods: {
			/*发送消息*/
			send() {
				if (this.values) {
					// 注：只有连接正常打开中，才能正常成功发送消息
					var message = {};  //json格式要发送的消息
					uni.sendSocketMessage({
						data: message,
						success(res) {
							console.log(res+"消息发送成功");
						}
					});
					return;
				}
				uni.showToast({
					title: "不允许发送空白信息",
					icon: "none"
				})
			},

			connectSocketInit() {
					//链接websocket
					IM.connectSocketInit();
					// 注：只有连接正常打开中 ，才能正常收到消息
					uni.onSocketMessage((res) => {
						console.log(res)
						let message = eval("(" + res.data + ")");   //根据返回的信息进行判断
					});
				// });


				//监听WebSocket错误
				uni.onSocketError(function(res) {
					uni.showToast({
						title:"WebSocket连接打开失败，请检查！",
						icon:"none"
					})
				});
			},

			// 关闭websocket
			closeSocket() {
				uni.closeSocket({
					success(res) {
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},

			/*返回*/
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.send {
		background-color: white;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 1px solid #dfdfdf;
		padding: 20rpx 20rpx 20rpx 20rpx;

		.send_box {
			display: flex;
			justify-content: space-around;
			align-items: center;

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.input {
			border-bottom: 1px solid #dfdfdf;
			width: 64%;
			padding: 10rpx 0;
		}

		.btn {
			width: 16%;
			background-color: #1D8BF8;
			color: white;
			text-align: center;
			padding: 12rpx 0;
			border-radius: 8rpx;
		}
	}

	.left,
	.right {
		image {
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>
