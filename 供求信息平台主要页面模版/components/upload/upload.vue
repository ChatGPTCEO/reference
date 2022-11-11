<template>
	<view>
		<view  @click="uploadAct" class="upload-item">
			<view class="upload-act-box flex center alcenter">
				<text class="iconfont icon-fabu ft32" :style="{color:tempColor}"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			value:{
				type:String,
				default:''
			},
		},
		data(){
			return {
				
			}
		},
		methods:{
			uploadAct(){ //上传图片
				uni.chooseImage({
					count:1,
					success:(p)=>{
						
					}
				});
			}
		}
	}
</script>

<style>
	.upload-item{
		width: 210rpx;
		height: 210rpx;
		background: rgba(71, 114, 255, 0.06);
		border-radius: 8rpx;
		margin-right: 30rpx;
		position: relative;
	}
	.upload-act-box{
		width: 210rpx;
		height: 210rpx;
	}
	.upload-item image{
		width: 210rpx;
		height: 210rpx;
		border-radius: 8rpx;
		background: #F2F2F2;
	}
	
</style>