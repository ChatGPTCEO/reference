<template>
	<view class="recommended">
		<view class="card">
			<view class="card-item" @click="sheying">
				
					<u-icon size="100" name="../../../static/pub-detail/xiangji.png"></u-icon>
					<text class="text">约摄影师</text>
				
			</view>
			<view class="card-item" @click="shexiang">
					<u-icon class="icon" size="100" name="../../../static/pub-detail/shexiang.png"></u-icon>
					<text class="text">约摄像师</text>
			</view>
			<view class="card-item" @click="mote">
			
					<u-icon class="icon" size="100" name="../../../static/pub-detail/mote.png"></u-icon>
					<text class="text">约模特</text>
			</view>
			<view class="card-item" @click="shangjia">
				
					<u-icon class="icon" size="100" name="../../../static/pub-detail/shangjia.png"></u-icon>
					<text class="text">约商家</text>
				

			</view>
			<view class="card-item" @click="huazhuang">
				
					<u-icon class="icon" size="100" name="../../../static/pub-detail/huazhuang.png"></u-icon>
					<text class="text">约化妆师</text>
				
			</view>
			<view class="card-item" @click="xiutu">
				
					<u-icon class="icon" size="100" name="../../../static/pub-detail/ps.png"></u-icon>
					<text class="text">约修图师</text>
				
			</view>


		</view>

	</view>
	</view>
</template>


<script>
	export default {
		
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			sheying() {
				uni.navigateTo({
					url: "yuepai?title=约摄影师"
				})
			},
			shexiang() {
				uni.navigateTo({
					url: "yuepai?title=约摄像师"
				})
			},
			mote() {
				uni.navigateTo({
					url: "yuepai?title=约模特"
				})
			},
			shangjia() {
				uni.navigateTo({
					url: "yuepai?title=约商家"
				})
			},
			huazhuang() {
				uni.navigateTo({
					url: "yuepai?title=约化妆师"
				})
			},
			xiutu() {
				uni.navigateTo({
					url: "yuepai?title=约修图师"
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

	page {
		background-color: #EFEFEF;
	}

	.recommended {
		background-color: #eeeeee;

		.card {
			width: 100%;
			height: 85vh;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: 0;
			padding: 10rpx 30rpx;
			box-sizing: border-box;

			.card-item {
				display: flex;
				    align-items: center;
				    justify-content: space-around;
				//position: relative;
				width: 48%;
				height: 25vh;
				border: 1px solid;
				margin-top: 20rpx;
				background: #ffffff;
				//background-image: linear-gradient(to bottom right, #C973FF, #AEBAF8);
				border-radius: 15rpx;
				//text-align: center;

				.icon {
					//margin-top: 50rpx;
				}

				.text {
					    font-size: 35rpx;
					// position: absolute;
					// color: black;
					// bottom: 5px;
					// left: 10rpx;
					// font-size: 40rpx;
				}


			}
		}
	}
</style>
