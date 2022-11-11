<template>
	<view class="submit-view-root">
		<view class="hor-sp-line" v-if="needTopSpLine"></view>
		<view class="content-view">
			<view class="need-input-sign" v-if="shouldInput">* </view>
			<text class="left-title" :style="'width:' + leftTitleWidth + 'rpx;'" :decode="true">{{title}}</text>
			<text style="flex-grow: 1;" v-if="shouldInput"></text>
			<text class="right-content" :style="'flex-grow:' + rightContentFlex + ';' " :decode="true"
				v-if="submitType == 0">{{rightShow}}</text>
			<view class="right-content" :style="'flex-grow:' + rightContentFlex + ';' " v-else-if="submitType == 1">
				<input class="input-content" @input="inputValue" maxlength="11" v-model="inputText"
					:placeholder=hintString placeholder-style="font-size: 30rpx;color: #9B9BA3;" type="inputType" />
				<image class="clear-icon" src="http://baiduappimages.jiwu.com/pfb/ic_clear.png" v-if="inputText"
					@tap="clearInput"></image>
			</view>

			<view class="right-content" :style="'flex-grow:' + rightContentFlex + ';' " v-else-if="submitType == 2">
				<slot></slot>
			</view>
		</view>
		<slot name="buttom"></slot>
		<view class="hor-sp-line" v-if="needBottomSpLine"></view>
	</view>
</template>

<script>
	export default {
		name: "submitView",
		data() {
			return {
				inputText: ""
			};
		},
		props: {
			needTopSpLine: {
				type: Boolean,
				default: false
			},
			needBottomSpLine: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: ""
			},
			rightShow: {
				type: String,
				default: ""
			},
			submitType: {
				type: Number,
				default: 0 // 0展示，  1 输入
			},
			shouldInput: {
				type: Boolean,
				default: false
			},
			leftTitleWidth: {
				type: Number,
				default: 120
			},
			rightContentFlex: {
				type: Number,
				default: 1
			},
			hintString: { //提示文字
				type: String,
				default: ''
			},
			inputType: { //提示文字
				type: String,
				default: 'text'
			}
		},
		watch: {
			rightShow: {
				handler(newVal, oldVal) {
					this.inputText = newVal
				},
				immediate: true
			}
		},
		methods: {
			inputValue: function(e) {
				this.inputText = e.mp.detail.value
				this.$emit("inputValue", {
					value: e.mp.detail.value
				})
			},
			clearInput: function() {
				this.inputText = ""
				this.$emit("inputValue", {
					value: ''
				})
			}
		}

	}
</script>

<style>
	.submit-view-root {
		display: flex;
		flex-direction: column;
		min-height: 100rpx;
		padding: 0rpx 30rpx;
	}

	.content-view {
		height: 98rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.left-title {
		width: 120rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #5af;
		display: flex;
		flex-shrink: 0;
	}

	.right-content {
		display: flex;
		flex-direction: row-reverse;
		flex-grow: 1;
		height: 100%;
		align-items: center;
		justify-content: space-between;
		margin-left: 60rpx;
	}

	.input-content {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		height: 100%;
		font-size: 30rpx;
		align-items: center;
	}

	.clear-icon {
		width: 30rpx;
		height: 30rpx;
		display: flex;
		flex-shrink: 0;
	}

	.need-input-sign {
		font-size: 30rpx;
		font-weight: bold;
		color: #FF1215;
	}
</style>
