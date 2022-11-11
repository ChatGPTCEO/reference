<template>
	<uni-transition :duration="50" :mode-class="[modeClass]" :show="show" class="confirm clearfix">
		<view class="left">
			<uni-icons v-if="type !== 'warning'" :type="iconType" :color="iconColor" size="32"></uni-icons>
			<image v-if="type === 'warning'" style="width: 32px;height: 32px;margin-top: 12px;" src="../assets/waring.svg" mode=""></image>
		</view>
		<view class="right">
			<view class="title">
				{{title}}
			</view>
			<view class="tip">
				{{message}}
			</view>
			<view class="footer" v-if="type === 'info'">
				<button type="default" class="button" @click="confirm">{{confirmText}}</button>
				<button type="default" class="button giveup" @click="cancel">{{cancelText}}</button>
			</view>
			<view class="close" v-else>
				<uni-icons type="clear" size="20" color="#606367" @click="closeFunc"></uni-icons>
			</view>
		</view>
	</uni-transition>
</template>

<script>
	export default{
		props:{
			message: String,
			type: String,
			id: [Number,String],
			closed:{
				type: Boolean,
				default: false
			},
			confirmText:{
				type: String,
				default: '确定'
			},
			cancelText:{
				type: String,
				default: '取消'
			}
		},
		data(){
			return{
				modeClass: 'slide-bottom',
				show: true,
				title: ''
			}
		},
		computed:{
			iconType(){
				if(this.type === 'info'){
					this.iconColor = this.themeColor;
					this.title = "信息";
					return 'info-filled';
				}else if(this.type === 'warning'){
					this.iconColor = '#EDBE54';
					this.title = "警告";
					return 'warning';
				}else if(this.type === 'error'){
					this.iconColor = '#F05151';
					this.title = "错误";
					return 'minus-filled'
				}
			}
		},
		watch:{
			type:{
				handler: function(val){
					if(val === 'info'){
						this.title = "信息";
					}else if(val === 'warning'){
						this.title = "警告";
					}else if(val === 'error'){
						this.title = "错误";
					}
				},
				deep: true,
				immediate: true
			}
		},
		mounted() {
			let self = this;
			if(this.type == "warning" && !this.closed){
				this.timeOut = setTimeout(function(){
					self.modeClass = 'slide-right';
					self.show = false;
					self.$confirmDel(self.id);
				},3000)
			}
		},
		methods:{
			cancel(){
				this.common();
				this.$emit('cancel');
			},
			confirm(){
				this.common();
				this.$emit('confirm');
			},
			closeFunc(){
				this.common();
				if(this.closed) this.$emit('closeFunc');
			},
			common(){
				this.modeClass = 'slide-right';
				this.show = false;
				this.$confirmDel(this.id);
			}
		}
	}
</script>

<style lang="less" scoped>
	.confirm{
		display: flex;
		width: 720rpx;
		// height: 360rpx;
		background-color: #FFFFFF;
		clear: both;
		margin-bottom: 32rpx;
		box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		.left{
			width: 160rpx;
			text-align: center;
			float: left;
			padding-top: 24rpx;
		}
		.right{
			float: left;
			padding: 32rpx;
			padding-left: 0;
			display: flex;
			height: 100%;
			box-sizing: border-box;
			flex-direction: column;
			.title{
				color: rgba(0, 0, 0, 0.65);
				font-size: 32rpx;
			}
			.tip{
				color: #606367;
				font-size: 24rpx;
				flex: 1;
				padding: 16rpx 0;
				margin: 16rpx 0;
			}
			.footer{
				display: flex;
				.button{
					height: 56rpx;
					line-height: 56rpx;
					font-size: 28rpx;
					color: #fff;
					width: 200rpx;
					margin-right: 32rpx;
					background-color: #498FE1;
					border-radius: 40px;
					&::after{
						border: 0;
					}
				}
				.giveup{
					background-color: #D7D9DC;
				}
			}
			.close{
				position: absolute;
				right: 8px;
				top: 0;
			}
		}
	}
	.clearfix::after{
		content: "\20";
		display: block;
		height: 0;
		clear: both;
	}
	.clearfix{
		zoom: 1;
	}
</style>
