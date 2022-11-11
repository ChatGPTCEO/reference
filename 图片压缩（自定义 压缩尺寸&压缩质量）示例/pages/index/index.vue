<template>
	<view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>操作组</text>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="">
					<button @tap="selectPhoto" class="cu-btn round bg-green">选择照片</button>
					<button v-if="paths.length>0" @tap="compress" class="cu-btn round bg-red" style="margin: 0 10px;">单张压缩</button>
					<button v-if="paths.length>0" @tap="batchCompress" class="cu-btn round bg-orange">批量压缩</button>
				</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>预览图</text>
			</view>
		</view>
		<view class="cu-form-group padding-top-sm" v-if="compressPaths.length>0">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in compressPaths" :key="index">
					<image :src="item" mode="aspectFill" :data-index="index" @tap="preview"></image>
				</view>
			</view>
		</view>
		<view class="cu-list menu" v-else>
			<view class="cu-item">
				<view class="text-gray">暂无预览图</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>参数设置</text>
			</view>
		</view>

		<view class="cu-form-group">
			<view class="title">最大尺寸</view>
			<view>
				<radio-group class="block">
					<label>
						<radio class='radio' value="800" checked></radio>
						<text>800</text>
					</label>
					<label class="margin-left">
						<radio class='radio' value="1000"></radio>
						<text>1000</text>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">最小尺寸</view>
			<view>
				<radio-group class="block">
					<label>
						<radio class='radio' value="320"></radio>
						<text>320</text>
					</label>
					<label class="margin-left">
						<radio class='radio' value="640" checked></radio>
						<text>640</text>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">文件类型</view>
			<view>
				<radio-group class="block">
					<label>
						<radio class='radio' value="png" checked></radio>
						<text>png</text>
					</label>
					<label class="margin-left">
						<radio class='radio' value="jpg"></radio>
						<text>jpg</text>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">压缩质量</view>
			<view>
				<radio-group class="block">
					<label>
						<radio class='radio' value="0.85" checked></radio>
						<text>0.85</text>
					</label>
					<label class="margin-left">
						<radio class='radio' value="0.95"></radio>
						<text>0.95</text>
					</label>
				</radio-group>
			</view>
		</view>

		<helang-compress ref="helangCompress"></helang-compress>
	</view>
</template>

<script>
	import helangCompress from '../../components/helang-compress/helang-compress';

	export default {
		components: {
			helangCompress
		},
		data() {
			return {
				compressPaths: [],
				paths: [],
				params: {
					maxSize: 800,
					fileType: 'png',
					quality: 0.85,
					minSize: 640
				}
			}
		},
		methods: {
			// 选择照片
			selectPhoto() {
				uni.chooseImage({
					count: 9,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.paths = res.tempFilePaths;
					}
				});
			},
			// 单张压缩
			compress() {
				uni.showLoading({
					title: '压缩中',
					mask: true
				});

				this.$refs.helangCompress.compress({
					src: this.paths[0],
					maxSize: this.params.maxSize,
					fileType: this.params.fileType,
					quality: this.params.quality,
					minSize: this.params.minSize
				}).then((res) => {
					uni.hideLoading();
					uni.showToast({
						title: "压缩成功",
						icon: "success"
					})
					this.compressPaths = [res];
				}).catch((err) => {
					uni.hideLoading();
					uni.showToast({
						title: "压缩失败",
						icon: "none"
					})
				})
			},
			// 批量压缩
			batchCompress() {
				this.$refs.helangCompress.batchCompress({
					batchSrc: this.paths,
					maxSize: this.params.maxSize,
					fileType: this.params.fileType,
					quality: this.params.quality,
					minSize: this.params.minSize,
					progress: (res) => {
						uni.showLoading({
							title: `进度:${res.done+res.fail}/${res.count}`
						})
						console.log(res);
					}
				}).then((res) => {
					uni.hideLoading();
					uni.showToast({
						title: "压缩完成",
						icon: "success"
					})
					this.compressPaths = res;
				}).catch((err) => {
					uni.hideLoading();
					uni.showToast({
						title: "压缩失败",
						icon: "none"
					})
				})
			},
			preview(e) {
				const index = e.currentTarget.dataset.index;
				uni.previewImage({
					current:this.compressPaths[index],
					urls: this.compressPaths,
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "/colorui/icon.css";
	@import "/colorui/main.css";

	.img-list {
		>image {
			width: 200rpx;
			height: 200rpx;
			margin: 10px 10px 0 0;
			border: #d7d7d7 solid 1px;
		}
	}
</style>
