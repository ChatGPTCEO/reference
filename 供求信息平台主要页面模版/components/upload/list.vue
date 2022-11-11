<template>
	<view class="flex wrap">
		<view v-if="value.length < maxNum" @click="uploadAct" class="upload-item">
			<view class="upload-act-box flex center alcenter">
				<text class="iconfont icon-fabu ft32" :style="{color:tempColor}"></text>
			</view>
		</view>
		
		<view v-for="(item,index) in value" :key="index" :class="{mt16:index > getIndex}" class="upload-item">
			<image mode="aspectFill" :src="item"></image>
			<view @click="delAct" :data-index="index" class="del-act">
				<text class="iconfont icon-close ft12"></text>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default{
		props:{
			value:{
				type:Array,
				default:function(){
					return new Array;
				}
			},
			maxNum:{
				type:Number,
				default:9,
			}
		},
		data(){
			return {
				uploadIndex:0,
				uploadTmp:[],
			}
		},
		computed:{
			getIndex(){
				return  this.value.length == 9 ? 2 : 1;
			}
		},
		created(){
			
		},
		methods:{
			delAct(e){
				let index = parseInt(e.currentTarget.dataset.index);
				let photos = JSON.parse(JSON.stringify(this.value));
				photos.splice(index,1);
				this.$emit('input',photos);
			},
			uploadAct(){ //上传图片
				uni.chooseImage({
					count: this.maxNum - this.value.length,
					success:(p)=>{
						this.uploadTmp = p.tempFilePaths;
						uni.showLoading();
						this.uploadIng();
					}
				});
			},
			uploadIng(){
				if(this.uploadIndex == this.uploadTmp.length){
					this.uploadIndex = 0;
					this.uploadTmp = [];
					uni.hideLoading();
					return;
				}
				this.$http.upload(this.uploadTmp[this.uploadIndex]).then(res=>{
					this.uploadIndex = this.uploadIndex + 1;
					let photos = JSON.parse(JSON.stringify(this.value));
					photos.push(res);
					this.$emit('input',photos);
					this.uploadIng();
				}).catch(res=>{
					this.uploadIndex = this.uploadIndex + 1;
					this.uploadIng();
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
	.upload-item:nth-child(3n){
		margin-right: 0rpx;
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
	.upload-item .del-act{
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		width: 56rpx;
		height: 56rpx;
		background: rgba(0,0,0,.4);
		text-align: center;
		line-height: 56rpx;
		color:#FFFFFF;
		border-radius: 28rpx;
	}
</style>