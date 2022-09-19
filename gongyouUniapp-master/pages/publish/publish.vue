<template>
	<view class="recommended">
		<u-notice-bar type="error" mode="horizontal" :list="list"></u-notice-bar>
		<view class="card">
			<view class="card-item" @click="quanzi">
				<view style="margin-left: 30rpx;">
					<u-icon size="170" name="http://mrliblog.work/xiaoyuan.png"></u-icon>
				</view>

				<view class="text1" style="margin-left: 25rpx;">发布圈子动态
					<view class="text">
						您可以分享自己的日常，记录美好生活
					</view>
				</view> 
			</view>
			<view class="card-item" @click="yuepai">
				<view style="margin-left: 30rpx;">
					<u-icon size="150" name="http://mrliblog.work/xiangji.png"></u-icon>
				</view>

				<view class="text1">发布约拍需求
					<view class="text">
						您可以发布约拍需求。约摄影师，约模特，约商家，约化妆师，约修图师
					</view>
				</view>
			</view>
			<view class="card-item" @click="zuopin">
				<view style="margin-left: 30rpx;">
					<u-icon size="150" name="http://mrliblog.work/xiangce.png"></u-icon>
				</view>

				<view class="text1">
					发布作品相册
					<view class="text">
						您可以上传自己的作品相册或照片，来提高自己的吸引力
					</view>
				</view>
			</view>
			<view class="card-item" @click="changdi">
				<view style="margin-left: 30rpx;">
					<u-icon size="150" name="http://mrliblog.work/didian.png"></u-icon>
				</view>

				<view class="text1">发布拍摄场地
					<view class="text">
						您可以分享自己知道的比较适合的约拍的场地，帮助他人创作
					</view>
				</view>
			</view>


		</view>
	</view>
</template>


<script>
	
	//VM：协调者调度器
	export default {
		//Model所有的数据
		data() {
			return {
				list:[
					'严禁发布违法违规内容！！！否则将追究法律责任！！！'
				]
			}
		},
		onLoad() {
			//this.init();
		},
		onShow() {
			//this.init();
		},
		methods: {
			//信息初始化
			init() {
				uni.getStorage({
					key: 'userinfo',
					fail: (res) => {
						uni.navigateTo({
							url: '../user/login'
						})
					}
				})
			},
			quanzi() {
				uni.navigateTo({
					url: 'quanzi'
				})
			},
			yuepai() {
				//console.log('11')
				
				//直接跳转到发布
				uni.navigateTo({
					//已经做更改   url: 'detail'
					url: 'yuepai'
				})
			},
			zuopin() {
				uni.navigateTo({
					url: 'zuopin'
				})
			},
			changdi() {
				uni.navigateTo({
					url: 'changdi'
				})
			}

		}
	}
</script>


<style lang="scss" scoped>
	@keyframes fade-in {
		0% {
			opacity: 0;
		}

		/*初始状态 透明度为0*/
		40% {
			opacity: 0;
		}

		/*过渡状态 透明度为0*/
		100% {
			opacity: 1;
		}

		/*结束状态 透明度为1*/
	}

	@-webkit-keyframes fade-in {

		/*针对webkit内核*/
		0% {
			opacity: 0;
		}

		40% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.recommended {
		animation: fade-in;
		/*动画名称*/
		animation-duration: 1.5s;
		/*动画持续时间*/
		-webkit-animation: fade-in 1.5s;
		/*针对webkit内核*/
	}



	.recommended {
		.card {
			width: 100%;
			height: 100vh;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: 0;
			padding: 10rpx 30rpx;
			box-sizing: border-box;
			background: #eeeeee;

			.card-item {
				//position: relative;
				background: #ffffff;
				width: 100%;
				height: 22vh;
				//border: 1px solid red;
				margin-top: 20rpx;
				//background-image: linear-gradient(to top right, #f7797d, #fbd786);
				border-radius: 15rpx;
				box-shadow: 0 0 5px 3px #c8c8c8;
				display: flex;
				align-items: center;

				.text1 {
					margin-left: 45rpx;
					font-size: 40rpx;
					margin-top: -25rpx;

					.text {
						font-size: 25rpx;
						color: gray;
					}
				}




















			}
		}
	}
</style>
