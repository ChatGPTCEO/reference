<template>
	<view>
		<dialog-model v-if="showVipDialog" :setting="dialogSetting" @closed="closedAct">
			<template slot="content">
				<view class="pd16_15">
					<view class="box noshadow pd16_15">
						<view class="notice-error">
							尊敬的商户您好，会员暂不支持在线开通。请添加您的专属客服为好友！！
						</view>
						<view class="mt16 flex alcenter space">
							<view class="flex alcenter kefu-box">
								<image style="width: 118rpx; height: 100rpx;" :src="statics.kefuImg"></image>
								<view class="ml5">
									<view class="ft14 cl-main ftw600">小帅</view>
									<view class="ft14 mt10 cl-main">15012345678</view>
								</view>
							</view>
							<image :show-menu-by-longpress="true" style="width: 200rpx; height: 200rpx;" :src="statics.qrcodeImg"></image>
						</view>
					</view>
				</view>
			</template>
			<template slot="footer">
				<view class="pd10_15 flex space">
					<view class="btn-mid plan" @click="telAct" data-phone="15012345678"><text class="iconfont icon-dianhua1 ft14 mr5"></text>拨打电话</view>
					<view class="btn-mid" @click="downLoad" :style="getBtnStyle"><text class="iconfont icon-xiazai ft14 mr5"></text>下载二维码</view>
				</view>
			</template>
		</dialog-model>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				showVipDialog:false,
				dialogSetting: {
					show:true,
					title:'开通会员',
					zIndex:400,
					footer:true,
					bg:'#f7f8f9'
				},
			
			}
		},
		created(){
			this.showVipDialog = true;
		},
		methods:{
			downLoad(){
				uni.downloadFile({
				    url: this.statics.qrcodeImg, //正式的时候替换成真实图片地址
				    success: (res) => {
				        if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath:res.tempFilePath,
								success:()=>{
									uni.showToast({
										icon:'success',
										title:'保存成功'
									});
								}
							});
				        }
				    },
					error:(res)=>{
						uni.showToast({
							icon:'none',
							title:'图片下载失败'
						});
					},
				});
			},
			closedAct(){
				this.dialogSetting.show = false;
				setTimeout(()=>{
					this.showVipDialog = false;
					this.$emit('closed');
				},400);
			},
		}
	}
</script>

<style>
	.notice-error{
		width: 100%;
		padding: 16rpx 20rpx;
		background-color: #fffbe6;
		border: 1px solid #ffe58f;
		font-size: 24rpx;
	}
	.kefu-box{
		border:1px solid #E2E2E2;
		border-radius: 16rpx;
		padding: 20rpx;
	}
</style>