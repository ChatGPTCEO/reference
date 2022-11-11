<template>
	<view class="cut_con">
		<view v-show="cutShow">
			<tui-cropper-app ref="cutImage" lockRatio :width="width" :height="height" :imageUrl="cutImage" @cancle="cancleCut"
			 @cropper="cropper">
			</tui-cropper-app>
			<view class="cut_pix">
				<view @click="setOneToOne" class="pix_item">
					1:1裁切
				</view>
				<view @click="setFourToThree" class="pix_item">
					4:3裁切
				</view>
			</view>
		</view>
		<view class="image_con">
			<view @click="previewHandler(index)" class="image_item" v-for="(item, index) in overImage" :key="index">
				<image :src="item.path"></image>
				<view @click.stop="delHandler(item.path)" class="del">
					-
				</view>
			</view>
			<view v-if="addStatus" @click="chooseImage" class="add">
				<view>+</view>
				<view>添加图片</view>
			</view>
		</view>
	</view>
</template>
<script>
	import tuiCropperApp from "./tui-image-cropper/tui-image-cropper.vue";
	export default {
		components: {
			tuiCropperApp,
		},
		props: {
			// 最大上传个数
			maxUpload: {
				type: Number,
				default: 1,
			},
			// 上传文件api地址
			uploadUrl: {
				type: String,
			},
			// 上传文件FromData
			upFromData: {
				type: Object
			},
			// 上传文件header
			upHeader: {
				type: Object
			},
			// 默认4.3  1.1 
			ratio: {
				type: String,
				default: "1:1",
			},
		},
		mounted() {

		},
		data() {
			return {
				// 裁剪显示
				cutShow: false,
				// 裁剪图片
				cutImage: "",
				// 完成图片
				overImage: [],
				// 添加图片区域
				addStatus: false,
				// 上传完成key
				uploadKey: [],
				// 裁剪框宽px
				width: 280,
				// 裁剪框高px
				height: 280,
			};
		},
		watch: {
			ratio: {
				deep: true,
				immediate: true,
				handler(n, o) {
					if (n == "1:1") {
						this.height = 280;
						this.width = 280;
					} else {
						this.height = 210;
						this.width = 280;
					}
				},
			},
			// 监听是否完成上传个数
			overImage: {
				deep: true,
				immediate: true,
				handler(n, o) {
					if (this.overImage.length < this.maxUpload) {
						this.addStatus = true;
					} else {
						this.addStatus = false;
					}
				},
			},
		},
		methods: {
			// 1:1 裁切
			setOneToOne() {
				this.height = 280;
				this.width = 280;
				this.$nextTick(function() {
					this.$refs.cutImage.setCutPix();
				});
			},
			// 4:3 裁切
			setFourToThree() {
				this.height = 210;
				this.width = 280;
				this.$nextTick(function() {
					this.$refs.cutImage.setCutPix();
				});
			},
			// 选择图片
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: (e) => {
						var image = e.tempFilePaths[0];
						this.cutImage = image;
						this.cutShow = true;
					},
				});
			},
			// 删除handler
			async delHandler(e) {
				uni.showModal({
					title: "提示",
					content: "确定删除此项吗？",
					success: async (res) => {
						if (res.confirm) {
							const data = this.overImage;
							const datakey = this.uploadKey;
							this.overImage = await data.filter((item) => {
								return item.path != e;
							});
							this.uploadComelete();
						} else if (res.cancel) {}
					},
				});
			},
			// 预览图片
			previewHandler(index) {
				const images = this.overImage.map((item) => {
					return item.path;
				});
				uni.previewImage({
					urls: images,
					current: index,
				});
			},
			// 取消
			cancleCut() {
				this.cutShow = false;
			},
			// 完成裁切
			cropper(e) {
				uni.showLoading({
					title: '上传中'
				})
				uni.uploadFile({
					url: this.uploadUrl,
					filePath: e.url,
					name: "file",
					formData: this.upFromData,
					header: this.upHeader,
					success: (res) => {
						this.cutShow = false;
						const item = JSON.parse(res.data);
						item.path = e.url;
						this.overImage.push(item);
						this.uploadComelete();
						uni.hideLoading()
					},
					fail: (e) => {
						uni.hideLoading()
						this.cutShow = false;
					},
				});
			},
			// 完成上传
			uploadComelete() {
				const data = this.overImage;
				this.$emit("uploadComplete", data);
			},
		},
	};
</script>
<style scoped>
	.add {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #eee;
		background: #f4f5f6;
		font-size: 30rpx;
		width: 200rpx;
		height: 200rpx;
		margin: 10rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.image_con {
		display: flex;
		flex-wrap: wrap;
	}

	.image_item {
		width: 200rpx;
		height: 200rpx;
		margin: 10rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.image_item image {
		border-radius: 10rpx;
		width: 100%;
		height: 100%;
	}

	.del {
		position: absolute;
		top: 0;
		right: 0;
		width: 50rpx;
		height: 50rpx;
		background: red;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		align-items: center;
		cursor: pointer;
	}

	.cut_pix {
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 80rpx;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.pix_item {
		width: 180rpx;
		height: 60rpx;
		background: orange;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
		color: #ffffff;
		font-size: 28rpx;
	}

	.cut_con {
		position: relative;
	}
</style>
