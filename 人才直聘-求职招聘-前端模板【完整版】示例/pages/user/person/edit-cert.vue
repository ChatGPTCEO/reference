<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-row border-bottom-1px">
				<view class="header">
					<text class="title">头像</text>
					<text class="tip">上传真实头像，BOSS回复率翻倍哦！</text>
				</view>
				<view class="head-img">
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">姓名</text>
				<view class="input-item">
					<m-input type="text" clearable v-model="params.userName" placeholder="请输入姓名" :maxLength="30">
					</m-input>
					<!-- <text class="yzb yzb-next"></text> -->
				</view>
			</view>

			<view class="input-row border-bottom-1px">
				<text class="title">性别</text>
				<radio-group @change="radioChange">
					<label class="radio">
						<radio value="1" checked="true" />
						男
					</label>
					<label class="radio">
						<radio value="2" />
						女
					</label>
				</radio-group>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">参加工作时间</text>
				<view class="picker">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{ date }}</view>
					</picker>
					<picker @change="bindPickerChange" :value="index" :range="workStatusArray">
						<view class="uni-input">{{workStatusArray[index]}}</view>
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">出生年月</text>
				<view class="picker">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{ date }}</view>
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
		</view>

		<view class="btn-row"><button type="primary" class="primary" @tap="register">保存</button></view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import mInput from '@/components/m-input/m-input.vue';
	import mCell from '@/components/m-cell/m-cell.vue';
	import mpvuePicker from '@/components/mpvue-picker/mpvue-picker.vue';
	import graceChecker from '@/common/graceChecker.js';
	import mUpimg from '@/components/m-upimg/m-upimg.vue';
	import mCodedialog from '@/components/m-codedialog/m-codedialog.vue';
	import formRuleConfig from '@/config/formRule.config.js';
	export default {
		components: {
			mInput,
			mCell,
			mpvuePicker,
			mUpimg,
			mCodedialog
		},
		computed: {
			...mapState(['openId', 'customerInfo']),
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
			return {
				date: currentDate
			};
		},
		onLoad(query) {
			this.initPage(query);
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value;
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

			// 点击注册按钮
			async register() {},
		}
	};
</script>

<style lang="scss" scoped>
	.input-group {
		border-radius: 10upx;
		margin-top: 10upx;
		overflow: hidden;
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
	}

	.border-bottom-1px {
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
		}

		.input-item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.picker {
			padding: 30upx 0;
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
		bottom: 10upx;
		width: 100%;
		box-sizing: border-box;

		button {
			background-color: $main-color;
			height: 90upx;
			line-height: 90upx;
			font-size: $font-size-34;
		}
	}
</style>
