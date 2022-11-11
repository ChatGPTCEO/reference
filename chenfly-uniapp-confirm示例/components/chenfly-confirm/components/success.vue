<template>
	<uni-transition :duration="500" :mode-class="[modeClass]" :show="show" class="success">
		<view class="left">
			<uni-icons type="checkbox-filled" color="#fff" size="32"></uni-icons>
		</view>
		<view class="right">
			<view class="top">
				成功
			</view>
			<view class="bottom">
				{{message}}
			</view>
		</view>
	</uni-transition>
</template>

<script>
	export default{
		props: ['message','id'],
		data(){
			return{
				timeOut: null,
				modeClass: 'slide-bottom',
				show: true
			}
		},
		mounted() {
			let self = this;
			this.timeOut = setTimeout(function(){
				self.modeClass = 'slide-right';
				self.show = false;
				self.$confirmDel(self.id);
			},3000)
		},
		methods:{
			open(){
				this.show = true;
			}
		}
	}
</script>

<style lang="less" scoped>
	.success{
		width: 720rpx;
		height: 160rpx;
		margin-bottom: 32rpx;
		box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
		background-color: #FFFFFF;
		border-radius: 8px;
		display: flex;
		overflow: hidden;
		.left{
			width: 160rpx;
			background-color: #55B518;
			line-height: 160rpx;
			text-align: center;
		}
		.right{
			box-sizing: border-box;
			padding: 32rpx;
			.top{
				color: rgba(0, 0, 0, 0.65);
				font-size: 32rpx;
			}
			.bottom{
				color: #606367;
				font-size: 24rpx;
			}
		}
	}
</style>
