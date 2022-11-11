<template>
	<view class="dialog-model">
		<view  class="model-bg" :style="{zIndex:options.zIndex}"></view>
		
		<view class="model-box animated fast" :style="{zIndex:options.zindex+1,background:options.bg}" :class="options.show   ? 'slideInUp' : 'slideOutDown'">
			<view class="model-main" :class="{noFooter:options.footer == false}">
				<view class="closed">
					<text @click="closed()" class="iconfont  ft20 cl-notice icon-close"></text>
				</view>
				<view class="lh20 ft16 cl-main ftw600 text-center">{{options.title}}</view>
				<view class="model-content mt16">
					<slot name="content"></slot>
				</view>
				<view class="model-footer mt16" v-if="options.footer == true">
					<slot name="footer"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			setting:{
				type:Object,
				default:function(){
					return new Object;
				}
			}
		},
		computed:{
			options(){
				let options =  {
					title:this.setting.title !== undefined ? this.setting.title : '弹出层',
					zIndex:this.setting.zIndex !== undefined ? this.setting.zIndex : 400,
					footer:this.setting.footer !== undefined ? this.setting.footer :false,
					show:this.setting.show !== undefined ? this.setting.show : false,
					bg:this.setting.bg !== undefined ? this.setting.bg : '#ffffff',
				};
				return options;
			},
		},
		data(){
			return {
				
			}
		},
		created(){		
			
		},
		methods:{
			closed(){
				this.$emit('closed');
			}
		}
	}
</script>

<style>
	.dialog-model{
		position: relative;
		z-index: 400;
	}
	.dialog-model .model-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.dialog-model .model-box{
		position: fixed;
		z-index: 401;
		background:#FFFFFF;
		left: 0;
		bottom: 0;
		width: 100%;
		
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.dialog-model .model-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
	}
	.dialog-model .model-main.noFooter{
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
	}
	
	.dialog-model .model-footer{
		background: #FFFFFF;
		box-shadow:0rpx -4rpx 16rpx 0rpx rgba(0,0,0,0.04);
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
	}
	
	.dialog-model .model-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
	.dialog-model .model-content{
		min-height: 400rpx;
		max-height: 1000rpx;
		overflow-y: scroll;
	}
</style>