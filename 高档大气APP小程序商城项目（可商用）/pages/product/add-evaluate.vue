<template>
	<view>
		<view class="evaluate-box w-750 bg-white">
			<view class="row-ac flex-1 mx-3 py-3">
				<view style="width: 160rpx;">商品评价</view>
				<xiaoStarComponent @evaluateChange="evaluateChange($event, 'productScore')" isEvaluate :iconFontSize="20" :iconfMarginRight="15" />
			</view>
			<view class="flex-1 text-area mx-3">
				<textarea v-model="evaluateForm.content" style="min-height: 300rpx;padding: 20rpx;" auto-height placeholder="快来评价商品吧!!!" />
			</view>
			<view class="mt-2 ml-3">
				<view>上传图片</view>
				<!-- <view @click="chooseUploadFile">上传图片</view> -->
				<view class="row-ac flex-wrap mt-2">
					<view class="evaluate-img-box" v-for="(item, index) in evaluateForm.seeImages" :key="index">
						<image class="evaluate-img" :src="item"></image>
						<view class="iconfont icon-shanchu1 font-s-4 text-main-color row" @click="deleteImg(index)"></view>
					</view>
					<view class="img-box row"><view class="iconfont icon-jiahao" @click="chooseUploadFile"></view></view>
				</view>
			</view>
			<view class="user-info-item ml-3 mt-3 row-ac pb-3">
				<view class="label">是否匿名评论</view>
				<view class="content ml-3">
					<radio-group @change="radioChange">
						<label class="radio" v-for="(item, index) in anonymousList" :key="item.value" style="margin-right: 20rpx">
							<radio :value="item.value" :checked="index === current" />
							{{ item.name }}
						</label>
					</radio-group>
				</view>
			</view>
		</view>
		<view class="evaluate-logistics mt-2 w-750 bg-white">
			<view class="row-ac flex-1 mx-3 pt-5 pb-1">
				<view style="width: 200rpx;">商品符合度</view>
				<xiaoStarComponent @evaluateChange="evaluateChange($event, 'productAccord')" isEvaluate :iconFontSize="20" :iconfMarginRight="15" />
			</view>
			<view class="row-ac flex-1 mx-3 py-1">
				<view style="width: 200rpx;">服务态度</view>
				<xiaoStarComponent @evaluateChange="evaluateChange($event, 'serviceScore')" isEvaluate :iconFontSize="20" :iconfMarginRight="15" />
			</view>
			<view class="row-ac flex-1 mx-3 py-1">
				<view style="width: 200rpx;">快递配送速度</view>
				<xiaoStarComponent @evaluateChange="evaluateChange($event, 'expressTimeScore')" isEvaluate :iconFontSize="20" :iconfMarginRight="15" />
			</view>
			<view class="row-ac flex-1 mx-3 py-1">
				<view style="width: 200rpx;">快递员服务</view>
				<xiaoStarComponent @evaluateChange="evaluateChange($event, 'expressServerScore')" isEvaluate :iconFontSize="20" :iconfMarginRight="15" />
			</view>
			<view class="row-ac flex-1 mx-3  pt-1 pb-5">
				<view style="width: 200rpx;">快递包装</view>
				<xiaoStarComponent @evaluateChange="evaluateChange($event, 'expressPackScore')" isEvaluate :iconFontSize="20" :iconfMarginRight="15" />
			</view>
		</view>
		<view class="flex-1 row mt-5 pb-5"><view class="submit-evaluate row text-white" @click="submitEvaluate">提交评论</view></view>
	</view>
</template>

<script>
import xiaoStarComponent from '@/components/xiao-star-component/xiao-star-component.vue';
import { fileUploadUrl, createOrderEvaluateUrl } from '@/api/index';

export default {
	data() {
		return {
			evaluateForm: {
				orderId: '',
				productId: '',
				productName: '',
				skuId: '',
				skuName: '',
				content: '',
				isAnonymous: 1,
				productScore: 5,
				productAccord: 5,
				serviceScore: 5,
				expressTimeScore: 5,
				expressServerScore: 5,
				expressPackScore: 5,
				video: [],
				images: [],
				seeImages: []
			},
			current: 1,
			anonymousList: [
				{
					value: '0',
					name: '否'
				},
				{
					value: '1',
					name: '是'
				}
			],
			imageValue: []
		};
	},
	components: {
		xiaoStarComponent
	},
	onLoad(option) {
		this.initData(option);
	},
	methods: {
		initData(option) {
			this.getEvaluateInfo(option);
		},
		// 获取订单基本信息
		getEvaluateInfo(option) {
			console.log(option);
			this.evaluateForm.orderId = option.orderId;
			this.evaluateForm.productId = option.productId;
			this.evaluateForm.skuId = option.skuId;
			this.evaluateForm.skuName = option.skuName;
			this.evaluateForm.productName = option.productName;
		},
		// 选择星级
		evaluateChange(e, startItem) {
			this.evaluateForm[startItem] = e;
		},
		// 匿名选择
		radioChange: function(evt) {
			this.evaluateForm.isAnonymous = evt.target.value;
		},
		// 选择上传图片
		chooseUploadFile() {
			let url = this.$R.baseUrl();
			let that = this;
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera '], //从相册选择
				success: function(res) {
					console.log(res);
					that.evaluateForm.seeImages = res.tempFilePaths;

					res.tempFilePaths.forEach(item => {
						uni.uploadFile({
							url: url + fileUploadUrl,
							filePath: item,
							name: 'file',
							formData: {
								//'file': 'test'
							},
							// 请求头一定要加，否则 iOS 图片上传会失败
							header: {
								'content-type': 'multipart/form-data'
							},
							success: uploadFileRes => {
								console.log(uploadFileRes);
								console.log(JSON.parse(uploadFileRes.data));
								let result = JSON.parse(uploadFileRes.data);
								if (result.code !== 200) {
									console.log(result);
									uni.showToast({
										title: result.msg,
										icon: 'none'
									});
								} else {
									that.evaluateForm.images.push(result.data);
								}
							}
						});
					});
				}
			});
		},
		// 删除上传的图片
		deleteImg(index) {
			console.log(this.evaluateForm);
			this.evaluateForm.seeImages.splice(index, 1);
			this.evaluateForm.images.splice(index, 1);
		},
		// 提交评价
		submitEvaluate() {
			console.log(this.evaluateForm);
			this.$R.post(createOrderEvaluateUrl, this.evaluateForm).then(res => {
				uni.showToast({
					title: '评价成功',
					icon: 'none'
				});
				setTimeout(() => {
				  uni.navigateBack({
				    delta: 1
				  })
				}, 3000)
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}

.evaluate-box {
	border-radius: 0 0 15rpx 15rpx;

	.text-area {
		width: 690rpx;
		height: 300rpx;
		min-height: 300rpx;
		background-color: #f5f5f5;
		padding: 0;
		border-radius: 15rpx;
	}
}

.evaluate-logistics {
	border-radius: 15rpx 15rpx 0 0;
}

.submit-evaluate {
	width: 300rpx;
	height: 70rpx;
	background-color: $main-color;
	border-radius: 30rpx;
}

.img-box {
	width: 220rpx;
	height: 220rpx;
	border-radius: 10rpx;
	background-color: #f3f3f3;
	margin-right: 15rpx;
	margin-bottom: 15rpx;

	.iconfont {
		color: #c8c8c8;
		font-size: 60rpx;
	}
}
.evaluate-img-box {
	width: 220rpx;
	height: 220rpx;
	border-radius: 10rpx;
	margin-right: 15rpx;
	margin-bottom: 15rpx;
	.evaluate-img {
		width: 220rpx;
		height: 220rpx;
		border-radius: 10rpx;
	}
	.icon-shanchu1 {
		margin-top: -230rpx;
		position: relative;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-color: #7d7d7d;
		color: #ffffff;
		float: right;
	}
}
</style>
