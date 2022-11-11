<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-row border-bottom-1px" @click="uploadImgs">
				<view class="header">
					<text class="title">头像</text>
					<text class="tip">上传真实头像，回复率翻倍哦！</text>
				</view>
				<view class="head-img"><image :src="resumeInfo.avatar || '/static/img/default.png'"></image></view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">
					<text class="yzb yzb-bitian" />
					姓名
				</text>
				<view class="input-item">
					<m-input type="text" v-model="resumeInfo.name" placeholder="请输入姓名" :maxLength="30"></m-input>
					<!-- <text class="yzb yzb-next"></text> -->
				</view>
			</view>

			<view class="input-row border-bottom-1px">
				<text class="title">
					<text class="yzb yzb-bitian" />
					性别
				</text>
				<radio-group @change="radioChange" v-model="resumeInfo.sex">
					<label class="radio">
						<radio :value="'1'" :checked="resumeInfo.sex == '1'" />
						男
					</label>
					<label class="radio">
						<radio :value="'2'" :checked="resumeInfo.sex == '2'" />
						女
					</label>
				</radio-group>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">
					<text class="yzb yzb-bitian" />
					联系方式
				</text>
				<view class="input-item">
					<m-input type="text" v-model="resumeInfo.phone" placeholder="请输入联系方式" :maxLength="20"></m-input>
					<!-- <text class="yzb yzb-next"></text> -->
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">
					<!-- <text class="yzb yzb-bitian" /> -->
					邮箱地址
				</text>
				<view class="input-item"><m-input type="text" v-model="resumeInfo.email" placeholder="请输入邮箱地址" :maxLength="50"></m-input></view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">
					<text class="yzb yzb-bitian" />
					最高学历
				</text>
				<view class="picker">
					<picker @change="bindPickerChange" :value="resumeInfo.education" :range="array">
						<!-- <view class="uni-input">{{ resumeInfo.education}}</view> -->
						<input class="padding-10" disabled="true" placeholder="请选择学历" :value="resumeInfo.education" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">
					<text class="yzb yzb-bitian" />
					参加工作时间
				</text>
				<view class="picker">
					<picker mode="date" :value="resumeInfo.timeToWork" :start="startDate" :end="endDate" @change="bindDateChange">
						<!-- <view class="uni-input">{{ resumeInfo.timeToWork }}</view> -->
						<input class="padding-10" disabled="true" placeholder="请选择参加工作时间" :value="resumeInfo.timeToWork" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">
					<text class="yzb yzb-bitian" />
					出生年月
				</text>
				<view class="picker">
					<picker mode="date" :value="resumeInfo.birthday" :start="startDate" :end="endDate" @change="bindBirthdayChange">
						<!-- <view class="uni-input">{{ resumeInfo.birthday }}</view> -->
						<input class="padding-10" disabled="true" placeholder="请选择出生年月" :value="resumeInfo.birthday" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<!-- <view class="input-row border-bottom-1px">
				<text class="title"><text class="yzb yzb-bitian"/>简历状态</text>
				<radio-group @change="radioChange2" v-model="resumeInfo.status">
					<label class="radio">
						<radio :value="1" :checked="resumeInfo.status == 1" />
						开启
					</label>
					<label class="radio">
						<radio :value="0" :checked="resumeInfo.status == 0" />
						关闭
					</label>
				</radio-group>
			</view> -->
		</view>

		<view class="btn-row"><button type="primary" class="primary" @tap="update">保存</button></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import mInput from '@/components/m-input/m-input.vue';
import mCell from '@/components/m-cell/m-cell.vue';
import mpvuePicker from '@/components/mpvue-picker/mpvue-picker.vue';
import graceChecker from '@/common/graceChecker.js';
import mUpimg from '@/components/m-upimg/m-upimg.vue';
import mCodedialog from '@/components/m-codedialog/m-codedialog.vue';
import formRuleConfig from '@/config/formRule.config.js';
import uploadImage from '@/common/ossutil/uploadFile';
export default {
	components: {
		mInput,
		mCell,
		mpvuePicker,
		mUpimg,
		mCodedialog
	},
	computed: {
		...mapState(['userInfo']),

		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},

	data() {
		const currentDate = this.getDate({
			format: true
		});
		const start = this.getDate('start');
		return {
			date: currentDate,
			array: ['高中以下', '高中', '中专/技校', '大专', '本科', '硕士', '博士'],
			tmpImageUrl: '',
			resumeInfo: {
				avatar: '',
				birthday: start,
				timeToWork: currentDate,
				name: '',
				sex: 1,
				education: null,
				phone: '',
				email: '',
				status: 0
			}
		};
	},
	onLoad() {
		this.resumeInfo.avatar = this.userInfo.avatar;
		this.resumeInfo.phone = this.userInfo.mobile;
		this.getResumeInfo();
	},
	methods: {
		async getResumeInfo() {
			let re = await this.$apis.getResumeInfo();
			if (re) {
				this.resumeInfo = re;
			}
		},

		bindPickerChange: function(e) {
			this.resumeInfo.education = this.array[e.target.value];
		},

		bindBirthdayChange: function(e) {
			this.resumeInfo.birthday = e.target.value;
		},

		bindDateChange: function(e) {
			this.resumeInfo.timeToWork = e.target.value;
		},

		radioChange(val) {
			this.resumeInfo.sex = val.detail.value;
			console.log('radioChange', val);
		},
		radioChange2(val) {
			this.resumeInfo.status = val.detail.value;
			console.log('radioChange2', val);
		},

		// 选择图片
		uploadImgs() {
			let that = this;
			uni.chooseImage({
				success(res) {
					let tempFilePaths = res.tempFilePaths;
					that.tmpImageUrl = tempFilePaths[0];
					that.uploadFile();
				}
			});
		},

		// 上传图片
		uploadFile() {
			uni.showLoading({
				title: '图片上传中'
			});
			let that = this;
			uploadImage(0, this.tmpImageUrl, 'job/user/', result => {
				console.log('图片上传结果：', result);
				that.resumeInfo.avatar = result;
				uni.hideLoading();
			});
		},

		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		// 更新
		async update() {
			let checkRes = graceChecker.check(this.resumeInfo, formRuleConfig.regResumeBaseRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			let res = await this.$apis.updateResumeBasic(this.resumeInfo);
			if (res) {
				// this.$mRouter.push({
				// 	route: this.$mRoutesConfig.personReume
				// });
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.yzb-bitian {
	color: $font-color-red;
}

.input-group {
	border-radius: 10upx;
	margin-top: 10upx;
	overflow: hidden;
	margin-bottom: 120upx;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
	background: #fff;
	justify-content: space-between;
	align-items: center;
	padding: 15upx 10upx;
}

.input-row .title {
	width: 25%;
	padding: 20upx 0;
	padding-left: 20upx;
	line-height: 50upx;
	color: $font-color-333;
}

.border-bottom-1px {
	// border-bottom: 1upx solid $border-color-light;
	position: relative;
	&::after {
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 0;
		left: 20upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e2e2e2;
	}
}

.header {
	display: flex;
	flex-direction: column;
	.tip {
		font-size: $uni-font-size-sm;
		color: $font-color-666;
		margin-left: 20upx;
	}
}

.head-img {
	margin-right: 15upx;
	image {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}
}

radio-group {
	margin-right: 10upx;
}

.radio {
	margin-left: 20upx;
}

.input-column {
	display: flex;
	flex-direction: column;
	background-color: $bgcolor_white;
	padding: 30upx 20upx 10upx 20upx;

	.title {
		margin-left: 10upx;
		color: $font-color-333;
	}

	.input-item {
		// display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.picker {
		padding: 30upx 0 20upx 0;
		margin-left: 10upx;
		position: relative;
		picker {
			font-size: $uni-font-size-lg;
			width: 100%;
			position: absolute;
		}
	}
	.yzb-next {
		float: right;
		color: $font-color-999;
	}
}

.content {
	background: $bgcolor_white;
}

.btn-row {
	position: fixed;
	bottom: 0upx;
	width: 100%;
	z-index: 99;
	box-sizing: border-box;
	background-color: #fff;
	button {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		border-radius: 0;
	}
}
</style>
